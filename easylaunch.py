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

This script requires Python 3 to run.  If Python is configured to run
files with names ending with ".py" by default, it might work simply
by double-clicking on this script.  If it does work this way on your computer
(or your students' computers), you might want to create a shortcut (Windows),
also known as alias (Mac OSX), on the desktop. Otherwise, you (or your students) 
will likely need to run it from a terminal window.

Configuration
-------------

There are five variables below that you might need to set for your use.

To create a custom world menu, make a copy of the file reeborg_menu.txt,
change its content so that it is to your satisfaction, and put it
on your desktop (and/or tell your students to do the same.) 
You can use a different name if you wish (this is one of the five
varibles you can change).

When using this option, Reeborg's World will start, asking the user if she
wishes to replace the content of the editor; THE ANSWER IS YES!
Then, the code in the editor should be run, so that the new world menu
can be created.

I would like to thank Christophe Bal for writing a basic prototype of 
easylaunch.py with the suggestion that it would be nice to be able to create
a special world menu by default.
'''
import json
import os
from pathlib import Path
import socket
from subprocess import Popen
from webbrowser import open_new_tab


#===========================================
# How Python (version 3.x) is invoked on the command line on your computer.
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
reeborg_menu_text = "reeborg_menu.txt"


# location of the desktop from the root directory for the user;
# It is assumed that the above file is put on the desktop, making it easy
# to change when needed.
desktop = "Desktop"  # tested on Windows; should work on Mac OSX and Linux


# Location of the source file to use to create special menus.
# You should not need to change anything, but it is shown here in case
# you really want to change the default location.
reeborg_menu_source = Path(os.path.join(os.path.expanduser("~"), 
                                   desktop, 
                                   reeborg_menu_text))

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


def create_menu(reeborg_menu_source, reeborg_menu, lang):
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

    with open(reeborg_menu_source) as f:
        lines = f.read().splitlines()

    menu = []
    for line in lines:
        if line.strip().startswith("#") or not line.strip():
            continue
        path, name = line.split(",")
        menu.append('["%s\", "%s"]' % (path, name))

    editor_content = begin_program + ','.join(menu) + "])"
    json_obj = {"editor": editor_content}

    with open(reeborg_menu, "w") as menu_file:
        menu_file.write(json.dumps(json_obj))


if __name__ == '__main__':
    port = find_free_port()
    if port is None:
        raise Exception("Impossible to launch a local server : no free port found.")

    # make sure that the local web server will start in the root
    # directory of Reeborg's content
    reeborg_root = str(Path(__file__).parent)
    os.chdir(reeborg_root)
    Popen([python_name, "-m", "http.server", str(port)])

    # Create program to be run to set customized world menu, if needed
    reeborg_menu = os.path.join(reeborg_root, "reeborg_menu.json")
    if reeborg_menu_source.is_file():
        create_menu(str(reeborg_menu_source), reeborg_menu, lang)
    if Path(reeborg_menu).is_file():
        url = "&url=reeborg_menu.json"
    else:
        url = ''

    # Open the default web browser with the chosen initial values
    url_str = "http://localhost:{0}/reeborg_offline.html?mode={1}&lang={2}{3}"
    url = url_str.format(port, mode, lang, url)
    open_new_tab(url)
