'''easylaunch.py, as its name indicates, is meant to make it easy
to launch a local/offline version of Reeborg; by local/offline, we mean
a verion which does not need Internet access.  

This script requires Python 3 to run.  If Python is configured to run
files with names ending with ".py" by default, it might work simply
by double-clicking on this script.  If it does work this way on your computer
(or your students' computers), you might want to create a shortcut (Windows),
also known as alias (Mac OSX), on the desktop. Otherwise, you (or your students) 
will likely need to run it from a terminal window.

Before I explain further, I should recognize Christophe Bal who created
an early prototype of this script and gave me suggestions for useful
additions.

If you are using this in a teaching environment, you might want to
add your own worlds, and have them appear in the menu.  Similarly, if you
use Reeborg in French, or Korean, you might want to have it start in that
language by default.  I have included additional comments in the code
below showing the various changes you might want to make to the script
to suit your preferences.

To create a custom world menu, make a copy of the file reeborg_menu.txt,
change its content so that it is to your satisfaction, and put it
on your desktop (or tell your students to do the same.)
'''
import json
import os
from pathlib import Path
import socket
from subprocess import Popen
from webbrowser import open_new_tab



#####
## How Python is invoked on the command line;
## you might need "python3" instead of "python" 
#####
python_name = "python"


######
## The valid choices for mode below are
## "python", "javascript", "blockly-js", "blockly-py", "py-repl"
##
## However, if we need to create a custom menu, we must have code to run
## from the editor, which limits the choices to either "python" or "javascript".
#####
mode = "python"

## The human programming language and UI language combination to choose:
lang = "en" # one of "en", "fr", "ko-en", "fr-en", "en-fr"


#=====End of use customization=================================================



def find_free_port(start=8001):
    '''Finds a free port on which to serve files for Reeborg's World.'''
    # Historical note: this function was first used in Crunchy, 10+ years ago
    free_port = None
    test_socket = socket.socket()
    test_port = start

    while not free_port and (test_port < 65536):
        try:
            test_socket.bind(('127.0.0.1', test_port))
            free_port = test_port
        except socket.error:
            test_port += 1
    test_socket.close()
    return free_port


def create_menu(reeborg_menu_source, reeborg_menu, begin_menu_template):
    with open(reeborg_menu_source) as f:
        lines = f.read().splitlines()

    menu = []
    for line in lines:
        if line.strip().startswith("#") or not line.strip():
            continue
        path, name = line.split(",")
        menu.append('["%s\", "%s"]' % (path, name))

    editor_content = begin_menu_template + ','.join(menu) + "])"
    json_obj = {"editor": editor_content}

    with open(reeborg_menu, "w") as menu_file:
        menu_file.write(json.dumps(json_obj))

port = find_free_port()
if port is None:
    raise Exception("Impossible to launch a local server : no free port found.")

reeborg_root = str(Path(__file__).parent)
reeborg_menu = os.path.join(reeborg_root, "reeborg_menu.json")
os.chdir(reeborg_root)


Popen([python_name, "-m", "http.server", str(port)])


if lang.endswith("en"):
    begin_menu_template = 'MakeCustomMenu(['
elif lang.endswith("fr"):
    begin_menu_template = 'MenuPersonnalise(['
else:
    print("invalid language; will revert to English as default.")
    lang = "en"


reeborg_menu_source = Path(os.path.join(os.path.expanduser("~"), 
                                   "Desktop", 
                                   "reeborg_menu.txt"))
if reeborg_menu_source.is_file():
    create_menu(str(reeborg_menu_source), reeborg_menu, begin_menu_template)

if Path(reeborg_menu).is_file():
    url = "&url=reeborg_menu.json"
else:
    url = ''


url = "http://localhost:{0}/reeborg_offline.html?mode={1}&lang={2}{3}".format(port, mode, lang, url)
open_new_tab(url)
