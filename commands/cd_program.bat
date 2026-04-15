@echo off
chcp 65001 >nul
title 项目启动器
cls

echo ========================================
echo         项目启动器
echo ========================================
echo.
echo [1] GameStorm (新项目)
echo [2] GameStorm-old (旧项目)
echo.
choice /c 12 /n /m "请选择项目 (1 或 2): "

if errorlevel 2 goto old_project
if errorlevel 1 goto new_project

:new_project
cd /d "%USERPROFILE%\Desktop\GameStorm"
echo.
echo 已进入: %cd%
echo.
echo [1] pnpm dev_client
echo [2] pnpm dev_server
echo.
choice /c 12 /n /m "请选择启动方式 (1 或 2): "

if errorlevel 2 (
    echo.
    echo 正在启动 dev_server...
    pnpm dev_server
) else (
    echo.
    echo 正在启动 dev_client...
    pnpm dev_client
)
goto end

:old_project
cd /d "%USERPROFILE%\Desktop\GameStorm-old"
echo.
echo 已进入: %cd%
echo.
echo [1] mall
echo [2] admin
echo [3] server
echo.
choice /c 123 /n /m "请选择进入的目录 (1/2/3): "

if errorlevel 3 (
    cd server
) else if errorlevel 2 (
    cd admin
) else (
    cd mall
)

echo.
echo 当前目录: %cd%
echo.
echo 正在启动 pnpm dev...
pnpm dev
goto end

:end
echo.
pause