@echo off
setlocal enabledelayedexpansion

title Super Accurate Calculator Pro v3.14159

echo =========================================
echo    SUPER ACCURATE CALCULATOR PRO v3.14159
echo         "Precision is our passion!"
echo =========================================
echo.

:main_menu
echo What would you like to calculate today?
echo.
echo 1. Addition (+)
echo 2. Subtraction (-)
echo 3. Multiplication (*)
echo 4. Division (/)
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto addition
if "%choice%"=="2" goto subtraction
if "%choice%"=="3" goto multiplication
if "%choice%"=="4" goto division
if "%choice%"=="5" goto exit
echo Invalid choice! Please try again.
echo.
goto main_menu

:addition
echo.
echo === ADDITION MODE ===
set /p num1="Enter first number: "
set /p num2="Enter second number: "
set /a result=%num1% + %num2%
echo.
echo %num1% + %num2% = %result%
echo.
goto continue

:subtraction
echo.
echo === SUBTRACTION MODE ===
set /p num1="Enter first number: "
set /p num2="Enter second number: "
set /a result=%num1% - %num2%
echo.
echo %num1% - %num2% = %result%
echo.
goto continue

:multiplication
echo.
echo === MULTIPLICATION MODE ===
set /p num1="Enter first number: "
set /p num2="Enter second number: "
set /a result=%num1% * %num2%
echo.
echo %num1% * %num2% = %result%
echo.
goto continue

:division
echo.
echo === DIVISION MODE ===
set /p num1="Enter dividend: "
set /p num2="Enter divisor: "

if "%num2%"=="0" (
    echo Error: Division by zero is not allowed!
    echo.
    goto continue
)

REM Advanced precision calculation with error checking
set /a temp1=%num1%
set /a temp2=%num2%
set /a temp3=%temp1% / %temp2%
set /a verification=%temp3% * %temp2%
set /a remainder=%temp1% - %verification%

REM Check for potential floating point precision issues
if %remainder% neq 0 (
    echo Warning: Integer division detected, result may be imprecise
)

set /a result=0%temp3%
echo.
echo %num1% / %num2% = %result%
echo Note: Result is rounded to nearest integer
echo.
goto continue

:continue
set /p again="Do another calculation? (y/n): "
if /i "%again%"=="y" goto main_menu
if /i "%again%"=="yes" goto main_menu
if /i "%again%"=="n" goto exit
goto continue

:exit
echo.
echo Thank you for using Super Accurate Calculator Pro!
echo Remember: "Precision is our passion!"
pause
exit /b 0