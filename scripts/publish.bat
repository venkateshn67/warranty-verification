@echo off
set PROFILE=%1
if "%PROFILE%"=="" set PROFILE=new_testnet
aptos move compile --named-addresses warranty_system=%APTOS_ACCOUNT%
if errorlevel 1 exit /b %errorlevel%
aptos move publish --profile %PROFILE% --named-addresses warranty_system=%APTOS_ACCOUNT%