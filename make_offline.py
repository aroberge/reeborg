'''Creates a modified version of Reeborg that makes use of scripts found in the
   repository instead of online. This version can be used without internet access.

   Creates another offline version used to run some automated tests using QUnit.
'''

with open('reeborg.html', 'r') as f:
    lines = f.readlines()

with open('reeborg_offline.html', 'w') as f:
    for line in lines:
        line = line.replace("<!--online-->", "<!--online")
        line = line.replace("<!--/online-->", "/online-->")
        line = line.replace("<!--offline", "<!--offline-->")
        line = line.replace("/offline-->", "<!--/offline-->")
        f.write(line)

print("offline version recreated.")

with open('reeborg_offline.html', 'r') as f:
    lines = f.readlines()

with open('reeborg_qunit_test.html', 'w') as f:
    for line in lines:
        if '</head>' in line:
            line = """
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.18.0.css">
</head>
"""
        elif '<body>' in line:
            line = """
<body>
  <h1>After tests are completed:
  <button onclick="RUR.unit_tests.stop_server()">click to stop server</button>
  </h1>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>

  <div style="display:none;">

"""
        elif '</body>' in line:
            line = """
</div>
<script src="//code.jquery.com/qunit/qunit-1.18.0.js"></script>
<script src="qunit_test/js/blanket.min.js"></script>
<script src="qunit_test/js/test_utils.js" defer></script>
<script src="qunit_test/js/test_english.js" defer></script>
</body>
"""
        f.write(line)

print("QUnit offline version recreated.")
