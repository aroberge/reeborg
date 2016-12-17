'''Creates a modified version of Reeborg that makes use of scripts found in the
   repository instead of online. This version can be used without internet access.

   Creates another offline version used to run some automated tests using QUnit.
'''

# First we create the version that can be run without internet access
try:
    with open('reeborg.html', 'r') as f:
        lines = f.readlines()
except FileNotFoundError:
    import sys
    print("This script is meant to run from the base directory of the project.")
    sys.exit()

with open('reeborg_offline.html', 'w') as f:
    for line in lines:
        line = line.replace("<!--online-->", "<!--online")
        line = line.replace("<!--/online-->", "/online-->")
        line = line.replace("<!--offline", "<!--offline-->")
        line = line.replace("/offline-->", "<!--/offline-->")
        f.write(line)

print("offline version recreated.")

# Next, we use this offline version to create a version that will
# be used to run some integration tests using QUnit.
#
# The basic idea is to use the current offline version (html file)
# but hide all the UI specific to Reeborg's World.
# Then we add a div required to display the results from
# the QUnit tests.  We also add a button used to stop the custom
# server we use to run the tests. Since this is run from
# a command line, it gives us a nice way to return to the
# command line without having to use ctrl-c which I have found
# to be unreliable.
#

qunit_css = """
<link rel="stylesheet" href="qunit-2.0.1.css">
</head>
"""
qunit_body_addition = """
<body>
  <h1>After tests are completed:
  <button onclick="RUR.unit_tests.stop_server();window.location.reload();">click to stop server</button>
  </h1>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <div style="display:none;">
"""
qunit_scripts = """
</div>
<script type="text/javascript" src="qunit-2.0.1.js"></script>
<script type="text/javascript" src="js/test_utils.js" defer></script>
<script type="text/javascript" src="js/all_qunit_tests.js" defer></script>
</body>
"""


with open('reeborg_offline.html', 'r') as f:
    lines = f.readlines()

with open('tests/functional_tests/reeborg_qunit_offline.html', 'w') as f:
    for line in lines:
        if '</head>' in line:
            line = qunit_css
        elif '<body>' in line:
            line = qunit_body_addition
        elif "src/" in line:
            line = line.replace("src/", "../../src/")
        elif "build/" in line:
            line = line.replace("build/", "../../build/")
        elif "offline/" in line:
            line = line.replace("offline/", "../../offline/")
        elif '</body>' in line:
            line = qunit_scripts
        f.write(line)

print("QUnit offline version recreated.")
