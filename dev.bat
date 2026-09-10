@echo off
setlocal EnableExtensions
title PediMilestones - Dev server
cd /d "%~dp0"

REM ===========================================================================
REM  Run the app locally.
REM
REM    dev.bat            asks which mode you want
REM    dev.bat demo       seeded demo data, no Firebase, no account needed
REM    dev.bat firebase   your real Firebase project (needs .env)
REM
REM  Leave this window open while you work. Ctrl+C stops the server.
REM ===========================================================================

if not exist "package.json" (
  echo  [X] Run dev.bat from the project folder ^(next to package.json^).
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo  [X] Node.js is not installed. Run setup.bat first.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo  [..] Dependencies missing - installing them now
  call npm install
  if errorlevel 1 ( pause & exit /b 1 )
)

set "MODE=%~1"
if not "%MODE%"=="" goto :run

echo.
echo  ===========================================================
echo    How do you want to run it?
echo  ===========================================================
echo.
echo    [1]  Demo mode      seeded data in your browser, no Firebase
echo                        sign in: parent@demo.in / doctor@demo.in
echo                        password: demo1234
echo.
echo    [2]  Firebase mode  your real project, reads .env
echo.
set "CHOICE="
set /p "CHOICE=  Choose 1 or 2 (default 1): "
if "%CHOICE%"=="2" ( set "MODE=firebase" ) else ( set "MODE=demo" )

:run
echo.
if /i "%MODE%"=="firebase" (
  if not exist ".env" (
    echo  [X] No .env file. Run setup.bat, or start in demo mode instead.
    pause
    exit /b 1
  )
  echo  [..] Starting in FIREBASE mode - http://localhost:5173
  echo       Press Ctrl+C to stop.
  echo.
  call npm run dev
) else (
  echo  [..] Starting in DEMO mode - http://localhost:5173
  echo       Sign in: parent@demo.in or doctor@demo.in / demo1234
  echo       Press Ctrl+C to stop.
  echo.
  call npm run dev:demo
)

pause
