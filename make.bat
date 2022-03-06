@ECHO OFF

REM Create offline version as well as integrated version to use with QUnit
py dev_tools/make_offline.py

REM Combine all javascript files and run some unit tests
call npm run build

REM Madge can find circular dependencies
call madge -c src\js 
IF %ERRORLEVEL% NEQ 0 (
  @ECHO ON
  exit /B
)

REM Run the integrated tests with a custom server
py dev_tools/run_qunit_test.py

@ECHO ON
