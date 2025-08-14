module warranty_system::warranty_nft {
    use std::string::{Self, String};
    use std::signer;
    use std::vector;
    use std::option;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::object::{Self};
    use aptos_token_objects::token::{Self, Token};
    use aptos_token_objects::collection;

    //
    // Error codes
    //
    const E_NOT_OWNER: u64 = 1;
    const E_NOT_COMPANY: u64 = 2;
    const E_WARRANTY_EXPIRED: u64 = 3;
    const E_INVALID_TOKEN: u64 = 4;
    const E_NOT_ADMIN: u64 = 5;
    const E_UNAUTHORIZED: u64 = 6;
    const E_ALREADY_EXISTS: u64 = 7;
    const E_NOT_FOUND: u64 = 8;

    //
    // Core admin/roles storage (lives at @warranty_system)
    //
    struct Roles has key {
        admin: address,
        service_centers: vector<address>, // allow-list for repairs / extensions
    }

    //
    // Company resource (one per company account)
    //
    struct Company has key {
        name: String,
        total_products: u64,
        is_verified: bool,
    }

    //
    // Seller resource (one per seller account)
    //
    struct Seller has key {
        reputation_points: u64,
        total_sales: u64,
        average_sale_speed: u64, // seconds between receipt and sale
    }

    //
    // Warranty token metadata stored under the token object address
    //
    struct WarrantyToken has key {
        product_id: String,
        product_name: String,
        company_address: address,
        warranty_months: u8,
        manufacture_date: u64,
        current_owner: address,
        seller_address: address,
        purchase_date: u64,    // set at first sale
        metadata_url: String,  // full URL per token
    }

    //
    // Collection info (lives at @warranty_system so any caller can read)
    //
    struct CollectionInfo has key {
        collection_name: String,
        base_metadata_url: String,
    }

    //
    // Events (lives at @warranty_system)
    //
    #[event]
    struct WarrantyMinted has copy, drop, store {
        token_address: address,
        product_id: String,
        company: address,
        seller: address,
        manufacture_date: u64,
    }

    #[event]
    struct WarrantyTransferred has copy, drop, store {
        token_address: address,
        from: address,
        to: address,
        ts: u64,
    }

    #[event]
    struct WarrantyExtended has copy, drop, store {
        token_address: address,
        old_months: u8,
        extra_months: u8,
        new_months: u8,
        extended_by: address, // service center or company
        ts: u64,
    }

    //
    // Internal helpers
    //
    fun only_admin(caller: address) acquires Roles {
        let r = borrow_global<Roles>(@warranty_system);
        assert!(caller == r.admin, E_NOT_ADMIN);
    }

    public fun is_service_center(addr: address): bool acquires Roles {
        if (!exists<Roles>(@warranty_system)) { return false };
        let r = borrow_global<Roles>(@warranty_system);
        let i = 0;
        let n = vector::length(&r.service_centers);
        while (i < n) {
            if (*vector::borrow(&r.service_centers, i) == addr) { return true };
            i = i + 1;
        };
        false
    }

    fun push_unique_service_center(vec: &mut vector<address>, addr: address) {
        let i = 0;
        let n = vector::length(vec);
        while (i < n) {
            if (*vector::borrow(vec, i) == addr) { abort E_ALREADY_EXISTS };
            i = i + 1;
        };
        vector::push_back(vec, addr);
    }

    fun is_valid_warranty(w: &WarrantyToken): bool {
        if (w.purchase_date == 0) { return false };
        // Approx months as 30 days
        let end_time = w.purchase_date + ((w.warranty_months as u64) * 2592000);
        let now = timestamp::now_seconds();
        now <= end_time
    }

    //
    // Initialize the system (publish Roles, Events, Collection)
    //
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);

        // Roles + service center list
        move_to(admin, Roles {
            admin: admin_addr,
            service_centers: vector::empty<address>(),
        });

        // NFT collection
        let collection_name = string::utf8(b"Warranty NFT Collection");
        let base_url = string::utf8(b"https://warranty-system.com/metadata/");

        collection::create_unlimited_collection(
            admin,
            string::utf8(b"Digital warranty certificates for products"),
            collection_name,
            option::none(),
            base_url,
        );

        move_to(admin, CollectionInfo {
            collection_name,
            base_metadata_url: base_url,
        });
    }

    //
    // Admin role management
    //
    public entry fun add_service_center(admin: &signer, sc_addr: address) acquires Roles {
        only_admin(signer::address_of(admin));
        let roles = borrow_global_mut<Roles>(@warranty_system);
        push_unique_service_center(&mut roles.service_centers, sc_addr);
    }

    public entry fun remove_service_center(admin: &signer, sc_addr: address) acquires Roles {
        only_admin(signer::address_of(admin));
        let roles = borrow_global_mut<Roles>(@warranty_system);
        let i = 0;
        let n = vector::length(&roles.service_centers);
        while (i < n) {
            if (*vector::borrow(&roles.service_centers, i) == sc_addr) {
                vector::swap_remove(&mut roles.service_centers, i);
                return
            };
            i = i + 1;
        };
        abort E_NOT_FOUND
    }

    //
    // Company + Seller registration (gated by admin for company verification)
    //
    public entry fun register_company(admin: &signer, company: address, name: String) acquires Roles {
        only_admin(signer::address_of(admin));
        assert!(!exists<Company>(company), E_ALREADY_EXISTS);
        // NO-OP: kept for backward compatibility
        name; company;
    }

    public entry fun company_self_register(company_signer: &signer, name: String) {
        let addr = signer::address_of(company_signer);
        assert!(!exists<Company>(addr), E_ALREADY_EXISTS);
        move_to(company_signer, Company {
            name,
            total_products: 0,
            is_verified: false,
        });
    }

    public entry fun verify_company(admin: &signer, company_addr: address) acquires Roles, Company {
        only_admin(signer::address_of(admin));
        assert!(exists<Company>(company_addr), E_NOT_COMPANY);
        let c = borrow_global_mut<Company>(company_addr);
        c.is_verified = true;
    }

    public entry fun register_seller(seller: &signer) {
        let addr = signer::address_of(seller);
        assert!(!exists<Seller>(addr), E_ALREADY_EXISTS);
        move_to(seller, Seller {
            reputation_points: 0,
            total_sales: 0,
            average_sale_speed: 0,
        });
    }

    //
    // Mint warranty to seller (company only, and must be verified)
    //
    public entry fun mint_warranty_to_seller(
        company: &signer,
        seller_address: address,
        product_id: String,
        product_name: String,
        warranty_months: u8,
    ) acquires Company, CollectionInfo {
        let company_address = signer::address_of(company);
        assert!(exists<Company>(company_address), E_NOT_COMPANY);
        let company_data = borrow_global_mut<Company>(company_address);
        assert!(company_data.is_verified, E_UNAUTHORIZED);

        company_data.total_products = company_data.total_products + 1;

        let collection_info = borrow_global<CollectionInfo>(@warranty_system);
        let current_time = timestamp::now_seconds();

        // Token name "Warranty-<product_id>"
        let token_name = string::utf8(b"Warranty-");
        string::append(&mut token_name, product_id);

        // Build per-token metadata URL = base + / + product_id + .json
        let full_url = collection_info.base_metadata_url;
        string::append_utf8(&mut full_url, b"/");
        string::append(&mut full_url, product_id);
        string::append_utf8(&mut full_url, b".json");

        let token_constructor_ref = token::create_named_token(
            company,
            collection_info.collection_name,
            string::utf8(b"Digital warranty certificate"),
            token_name,
            option::none(),
            full_url,
        );

        let token_signer = object::generate_signer(&token_constructor_ref);
        let token_address = signer::address_of(&token_signer);

        move_to(&token_signer, WarrantyToken {
            product_id,
            product_name,
            company_address,
            warranty_months,
            manufacture_date: current_time,
            current_owner: seller_address,
            seller_address,
            purchase_date: 0,
            metadata_url: full_url,
        });

        // Transfer token object to seller
        let token_object = object::address_to_object<Token>(token_address);
        object::transfer(company, token_object, seller_address);

        // Emit event
        event::emit(WarrantyMinted {
            token_address,
            product_id,
            company: company_address,
            seller: seller_address,
            manufacture_date: current_time,
        });
    }

    //
    // First sale to end-customer (seller -> customer)
    //
    public entry fun sell_to_customer(
        seller: &signer,
        token_address: address,
        customer_address: address,
    ) acquires WarrantyToken, Seller {
        let seller_addr = signer::address_of(seller);

        // Must own the token to sell
        assert!(
            object::is_owner(object::address_to_object<Token>(token_address), seller_addr),
            E_NOT_OWNER
        );

        let now = timestamp::now_seconds();
        let w = borrow_global_mut<WarrantyToken>(token_address);

        // Set current owner and purchase_date only first time (if not already set)
        w.current_owner = customer_address;
        if (w.purchase_date == 0) {
            w.purchase_date = now;
        };

        // Update seller stats if exists
        if (exists<Seller>(seller_addr)) {
            let s = borrow_global_mut<Seller>(seller_addr);
            let prev_total = s.total_sales;
            s.total_sales = prev_total + 1;

            let sale_speed = now - w.manufacture_date;
            let new_avg =
                if (prev_total == 0) { sale_speed }
                else { (s.average_sale_speed * prev_total + sale_speed) / (prev_total + 1) };
            s.average_sale_speed = new_avg;

            if (sale_speed < 86400) { // < 1 day
                s.reputation_points = s.reputation_points + 100;
            } else if (sale_speed < 604800) { // < 1 week
                s.reputation_points = s.reputation_points + 50;
            } else {
                s.reputation_points = s.reputation_points + 10;
            };
        };

        // Transfer token to customer
        let token_object = object::address_to_object<Token>(token_address);
        object::transfer(seller, token_object, customer_address);

        // Emit transfer event
        event::emit(WarrantyTransferred {
            token_address,
            from: seller_addr,
            to: customer_address,
            ts: now,
        });
    }

    //
    // Transfer warranty (customer -> new owner). Disallow if expired.
    //
    public entry fun transfer_warranty(
        current_owner: &signer,
        token_address: address,
        new_owner_address: address,
    ) acquires WarrantyToken {
        let owner_addr = signer::address_of(current_owner);
        assert!(
            object::is_owner(object::address_to_object<Token>(token_address), owner_addr),
            E_NOT_OWNER
        );

        let w = borrow_global_mut<WarrantyToken>(token_address);
        // No transfer after expiry
        assert!(is_valid_warranty(w), E_WARRANTY_EXPIRED);

        w.current_owner = new_owner_address;

        let token_object = object::address_to_object<Token>(token_address);
        object::transfer(current_owner, token_object, new_owner_address);

        // Emit transfer event
        event::emit(WarrantyTransferred {
            token_address,
            from: owner_addr,
            to: new_owner_address,
            ts: timestamp::now_seconds(),
        });
    }

    //
    // Extend warranty (by company or allow-listed service center)
    //
    public entry fun extend_warranty(
        caller: &signer,
        token_address: address,
        extra_months: u8
    ) acquires WarrantyToken, Roles {
        let caller_addr = signer::address_of(caller);

        let w = borrow_global_mut<WarrantyToken>(token_address);
        // Only company that minted (by address) OR allow-listed service center
        let auth =
            (exists<Company>(caller_addr) && w.company_address == caller_addr)
            || is_service_center(caller_addr);
        assert!(auth, E_UNAUTHORIZED);

        let old = w.warranty_months;
        let new_val = old + extra_months;
        w.warranty_months = new_val;

        // Emit extended event
        event::emit(WarrantyExtended {
            token_address,
            old_months: old,
            extra_months,
            new_months: new_val,
            extended_by: caller_addr,
            ts: timestamp::now_seconds(),
        });
    }

    //
    // View functions
    //
    #[view]
    public fun get_warranty_info(token_address: address): (
        String, String, address, u8, u64, address, u64, bool, String
    ) acquires WarrantyToken {
        assert!(exists<WarrantyToken>(token_address), E_INVALID_TOKEN);
        let w = borrow_global<WarrantyToken>(token_address);
        let valid = is_valid_warranty(w);
        (
            w.product_id,
            w.product_name,
            w.company_address,
            w.warranty_months,
            w.manufacture_date,
            w.current_owner,
            w.purchase_date,
            valid,
            w.metadata_url,
        )
    }

    #[view]
    public fun verify_warranty(token_address: address): bool acquires WarrantyToken {
        if (!exists<WarrantyToken>(token_address)) { return false };
        let w = borrow_global<WarrantyToken>(token_address);
        is_valid_warranty(w)
    }

    #[view]
    public fun get_seller_stats(seller_address: address): (u64, u64, u64) acquires Seller {
        if (!exists<Seller>(seller_address)) { return (0, 0, 0) };
        let s = borrow_global<Seller>(seller_address);
        (s.reputation_points, s.total_sales, s.average_sale_speed)
    }

    #[view]
    public fun get_company_info(company_address: address): (String, u64, bool) acquires Company {
        if (!exists<Company>(company_address)) { return (string::utf8(b""), 0, false) };
        let c = borrow_global<Company>(company_address);
        (c.name, c.total_products, c.is_verified)
    }

    #[view]
    public fun is_service_center_view(addr: address): bool acquires Roles {
        is_service_center(addr)
    }

    #[view]
    public fun get_collection_info(): (String, String) acquires CollectionInfo {
        let c = borrow_global<CollectionInfo>(@warranty_system);
        (c.collection_name, c.base_metadata_url)
    }
}