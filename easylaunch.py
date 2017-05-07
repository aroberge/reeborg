'''IMPORTANT: read this entirely for optimal use.

Francophones: si vous avez de la difficulté à comprendre le tout, n'hésitez
pas à me contacter avec vos questions.

Possible scenario for users of this script
------------------------------------------

You teach programming in a school with limited Internet access, making it
difficult to use the online version of Reeborg's World.

    [If you do not already know this, there is a complete version of
    Reeborg's world in a single zip file, in a separate repository. It is not
    updated on a regular basis ... but I can create an updated version any time
    upon request. Alternatively, you can clone the content of this
    repository.]

You might like to have a "world menu" with your own worlds, rather than using
the default that come with Reeborg's World.

You might want Reeborg's World to start with the UI in a different language
than the English default, or select a different programming mode to start.

    Important: if a user changes language using the language selector, the
    world menus are reconstructed to use the default values, and any
    customization of that menu will be lost.

If all or parts of this scenario applies to you, easylaunch.py might be your
best solution.

easylaunch.py, as its name indicates, is meant to make it easy
to launch a local/offline version of Reeborg; by local/offline, we mean
a verion which does not need Internet access.  

This script requires Python 3.4 or newer to run.  If Python is configured to run
files with names ending with ".py" by default, it might work simply
by double-clicking on this script.  If it does work this way on your computer
(or your students' computers), you might want to create a shortcut (Windows),
also known as alias (Mac OSX), on the desktop. Otherwise, you (or your students) 
will likely need to run it from a terminal window.

Configuration
-------------

There are up to six variables below that you might need to set for your use.

If you wish to use a custom world menu, there are two different possible
scenarios: one where a single custom world menu is used every time by
your students; the other where you might want to easily change the custom menu.

The file that creates a custom menu is found at the root of Reeborg's
distribution. (Its default name is reeborg_menu.json.) This file, whose
content is difficult to write correctly by hand, is created from a simpler
file (default name: reeborg_menu.txt) assumed (by default) to be found on 
the desktop.

If you wish to have your students always use the same world menu,
create the file reeborg_menu.json by running this script with your version
of reeborg_menu.txt on your computer. Afterwords, simply distribute the
modified reeborg distribution to your students computers.

Alternatively, if you wish to have your students use different custom
world menus at different times, you simply need to give them a new
version of reeborg_menu.txt to put on their own desktop.

When using a custom world menu, Reeborg's World will start, asking the user 
if she wishes to replace the content of the editor; THE ANSWER IS YES!
Then, the code in the editor should be run, so that the new world menu
can be created.

I would like to thank Christophe Bal for writing a basic prototype of 
easylaunch.py with the suggestion that it would be nice to be able to create
a special world menu by default.
'''
import json
import os
import socket
import sys
from pathlib import Path
from subprocess import Popen
from webbrowser import open_new_tab

if sys.version_info < (3, 4):
    print("Python 3.4 or newer is required.")
    sys.exit()


#===========================================
# How Python is invoked on the command line on your computer.
# You might need "python3" instead of "python".
python_name = "python"


#===========================================
# The default programming mode; the valid choices for mode below
# "python", "javascript", "blockly-js", "blockly-py", "py-repl"
#
# However, if you need to create a custom menu, it is required to have code to
# run from the editor, which limits the initial choice to either 
# "python" or "javascript".
mode = "python"


# The UI language and human programming language combination to choose:
# 
lang = "en" # one of "en", "fr", "ko-en", "fr-en", "en-fr"
#
# when a four-letter code is used, the first two refer to the language for
# the UI, and the last two for the language used for programming
# e.g. move() in English vs avance() in French.


# Name of the source file to use to create special menu
menu_text = "reeborg_menu.txt"

# location of the desktop from the root directory for the user;
# It is assumed that the above file is put on the desktop, making it easy
# to change when needed.
desktop = "Desktop"  # tested on Windows; should work on Mac OSX and Linux

# Location of the source file to use to create special menus.
# You should not need to change anything, but it is shown here in case
# you really want to change the default location.
menu_source = Path(os.path.expanduser("~")) / desktop / menu_text

# Name of the json file that will be imported at the beginning to
# create the custom world menu; this file is normally created from
# menu_text's content.
menu_json = "reeborg_menu.json"

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


def create_menu(menu_source, reeborg_menu, lang):
    '''Creates a special world file (json format) which can be loaded
       and whose effect is to include a program in the editor. When running
       this program, the world menu will change.'''

    if lang.endswith("en"):
        begin_program = 'MakeCustomMenu(['
    elif lang.endswith("fr"):
        begin_program = 'MenuPersonnalise(['
    else:
        print("invalid language; will revert to English as default.")
        begin_program = 'MakeCustomMenu(['

    with open(menu_source) as f:
        lines = f.read().splitlines()

    menu = []
    for line in lines:
        if line.strip().startswith("#") or not line.strip():
            continue
        path, name = line.split(",")
        menu.append('["%s", "%s"]' % (path, name))

    editor_content = begin_program + ','.join(menu) + "])"
    json_obj = {"editor": editor_content}

    with open(reeborg_menu, "w") as menu_file:
        # we need to use json.dumps to get properly escaped double quotes
        menu_file.write(json.dumps(json_obj))


if __name__ == '__main__':
    port = find_free_port()
    if port is None:
        raise Exception("Cannot launch a local server: no free port found.")

    # make sure that the local web server will start in the root
    # directory of Reeborg's content
    reeborg_root = str(Path(__file__).parent)
    os.chdir(reeborg_root)
    Popen([python_name, "-m", "http.server", str(port)])

    # Create program to be run to set customized world menu, if needed
    reeborg_menu = os.path.join(reeborg_root, menu_json)
    if menu_source.is_file():
        create_menu(str(menu_source), reeborg_menu, lang)

    # We might have a custom menu included by default in the distribution
    if Path(reeborg_menu).is_file():
        url = "&url=%s" % menu_json
    else:
        url = ''

    # Open the default web browser with the chosen initial values
    url_str = "http://localhost:{0}/reeborg_offline.html?mode={1}&lang={2}{3}"
    url = url_str.format(port, mode, lang, url)
    open_new_tab(url)
