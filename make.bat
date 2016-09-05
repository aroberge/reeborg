python make_offline.py
call npm run build
call npm run test-dot
call madge -c src\js
python run_qunit_test.py
