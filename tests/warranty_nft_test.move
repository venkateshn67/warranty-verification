#[test_only]
module warranty_system::warranty_nft_tests {
    use std::string;
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use warranty_system::warranty_nft;

    #[test_only]
    fun setup_accounts(aptos: &signer): (signer, signer, signer, signer) {
        // Use warranty_system address for admin to match deployment
        let admin = account::create_account_for_test(@warranty_system);
        let company = account::create_account_for_test(@0x2);
        let seller = account::create_account_for_test(@0x3);
        let customer = account::create_account_for_test(@0x4);
        timestamp::set_time_has_started_for_testing(aptos);
        (admin, company, seller, customer)
    }

    #[test(aptos = @aptos_framework)]
    fun test_basic_flow(aptos: &signer) {
        let (admin, company, seller, _customer) = setup_accounts(aptos);

        // Initialize
        warranty_nft::initialize(&admin);

        // Company self-register + verify
        let company_addr = signer::address_of(&company);
        warranty_nft::company_self_register(&company, string::utf8(b"Acme Co"));
        warranty_nft::verify_company(&admin, company_addr);

        // Verify company state
        let (name, total_products, is_verified) = warranty_nft::get_company_info(company_addr);
        assert!(name == string::utf8(b"Acme Co"), 1);
        assert!(total_products == 0, 2);
        assert!(is_verified, 3);

        // Register seller
        warranty_nft::register_seller(&seller);
        let seller_addr = signer::address_of(&seller);
        let (rep_points, total_sales, avg_speed) = warranty_nft::get_seller_stats(seller_addr);
        assert!(rep_points == 0, 4);
        assert!(total_sales == 0, 5);
        assert!(avg_speed == 0, 6);
    }

    #[test(aptos = @aptos_framework)]
    fun test_admin_functions(aptos: &signer) {
        let (admin, _company, _seller, _customer) = setup_accounts(aptos);

        // Initialize
        warranty_nft::initialize(&admin);

        // Test service center management
        let service_center = @0x5;
        warranty_nft::add_service_center(&admin, service_center);
        
        // Verify service center was added
        assert!(warranty_nft::is_service_center(service_center), 7);
        
        // Remove service center
        warranty_nft::remove_service_center(&admin, service_center);
        assert!(!warranty_nft::is_service_center(service_center), 8);
    }
}