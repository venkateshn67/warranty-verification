@echo off
set SC_ADDR=%1
set PROFILE=%2
if "%PROFILE%"=="" set PROFILE=new_testnet
if "%SC_ADDR%"=="" (
    echo Usage: set_roles.bat ^<service_center_address^> [profile]
    exit /b 1
)
aptos move run --profile %PROFILE% --function-id %APTOS_ACCOUNT%::warranty_nft::add_service_center --args address:%SC_ADDR%