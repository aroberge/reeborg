'''Creates a modified version of Reeborg that makes use of scripts found in the
   repository instead of online. This version can be used without internet access.

   Creates two other versions used to run some automated tests using QUnit.
'''
import time


def make_offline():
    '''makes offline version which can be run without internet access.'''
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

make_offline()

# Next, we use this offline version to create a version that will
# be used to run some integration tests using QUnit.
# We also do the same with the online version, for completeness.
#
# The basic idea is to use the current offline version (html file)
# but hide all the UI specific to Reeborg's World.
# Then we add a div required to display the results from
# the QUnit tests.  We also add a button used to stop the custom
# server we use to run the tests. Since this is run from
# a command line, using the custom server and button gives us a nice way to
# return to the command line without having to use ctrl-c which I have found
# to be unreliable.


online = 'reeborg_qunit_online.html'
offline = 'reeborg_qunit_offline.html'

qunit_css = """
<link rel="stylesheet" href="qunit-2.3.2.css">
</head>
"""

qunit_body_addition = """
<body>
  <h1>After tests are completed:
  <button onclick="stop_server();window.location.reload();">click to stop server</button>
  <a href="%s">online</a> - <a href="%s">offline</a>
  </h1>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <div style="display:none;">
""" % (online, offline)

qunit_scripts = """
</div>
<script>
    var test_utils = {};
    window.localStorage.clear();
</script>
<script type="text/javascript" src="qunit-2.3.2.js"></script>
<script>QUnit.config.hidepassed = true;
QUnit.config.collapse = false;</script>
<script type="text/javascript" src="js/test_utils.js" defer></script>
<script type="text/javascript" src="js/test_world_creation.js" defer></script>
<script type="text/javascript" src="js/all_qunit_tests.js" defer></script>
<script type="text/javascript" src="tutorial_en/test_tutorial_en.js" defer></script>
<script type="text/javascript" src="tutorial_fr/test_tutorial_fr.js" defer></script>
<script type="text/javascript" src="js/api_tests.js" defer></script>
<script type="text/javascript" src="vincent_maille/maille_qunit.js" defer></script>
<script type="text/javascript" src="jsdoc/advanced_world_creation.js" defer></script>
<script type="text/javascript" src="js/world_api/walls.tests.js" defer></script>
</body>
"""


def make_qunit_version(infile, outfile):
    '''Makes versions (online/offline) that run functional tests with qunit.'''
    with open(infile, 'r') as f:
        lines = f.readlines()

    with open("tests/integration_tests/" + outfile, 'w') as f:
        for line in lines:
            if '</head>' in line:
                line = qunit_css
            elif '<body>' in line:
                line = qunit_body_addition
            elif "src/" in line and not "brython" in line:
                line = line.replace("src/", "../../src/")
            elif "build/" in line:
                line = line.replace("build/reeborg.js", "../../build/reeborg.js?v=%s" % time.time())
            elif "offline/" in line:
                line = line.replace("offline/", "../../offline/")
            elif '</body>' in line:
                line = qunit_scripts
            f.write(line)

make_qunit_version('reeborg_offline.html', offline)
print("QUnit offline version recreated.")

make_qunit_version('reeborg.html', online)
print("QUnit online version recreated.")
