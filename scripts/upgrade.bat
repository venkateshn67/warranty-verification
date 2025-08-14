@echo off
set PROFILE=%1
if "%PROFILE%"=="" set PROFILE=new_testnet
aptos move publish --profile %PROFILE% --named-addresses warranty_system=%APTOS_ACCOUNT% --assume-yes