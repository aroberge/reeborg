@echo off
rem This batch file is used to run each unit test in isolation.
cd tests/unit_tests
call :treeProcess
goto :back

:treeProcess
rem recursive unit tests
for %%f in (*.tests.js) do node %%f | faucet
for /D %%d in (*) do (
    cd %%d
    call :treeProcess
    cd ..
)
exit /b

:back
cd ../..
exit /b