@echo off
set "JAVA_HOME=C:\Users\admin\jdk-17"
set "ANDROID_HOME=C:\Users\admin\Android\Sdk"
set "GRADLE_USER_HOME=D:\gradle_home"
set "_JAVA_OPTIONS="
set "PATH=C:\Users\admin\Android\Sdk\cmake\3.22.1\bin;C:\Users\admin\jdk-17\bin;%PATH%"

cd /d "%~dp0"
echo Starting Gradle assembleRelease without _JAVA_OPTIONS...
call gradlew.bat assembleRelease --console=plain
if %ERRORLEVEL% equ 0 (
    echo BUILD SUCCESSFUL
) else (
    echo BUILD FAILED with code %ERRORLEVEL%
)
