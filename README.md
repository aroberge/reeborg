Information for developers
==========================

This project lives on http://reeborg.ca. Permission is given to make copies
on some other site, but I would request that you contact me to inform me
so that I can add the information about where Reeborg is used and so that
I can keep you abreast of any new development.

Whenever possible, all javascript objects have been made part of a main
one called RUR (for Reeborg the Used Robot) to avoid conflicts with user-defined
names.

An html page will typically only load two javascript file that have been
created here (some plugins have been copied from elsewhere) :

reeborg.js
reeborg_proglang_humlang.js

where  proglang is short for programming language and humlang means human
language.  Thus a Javascript version for English speakers would include
the file

reeborg_js_en.js

whereas a Python version for French speakers would include instead

reeborg_py_fr.js

The main file is reeborg.js.  It is the result of the concatenation of
all the (other) files found in src/js.  (As of this writing, it is actually
in src/new_js as I am rewriting the entire project to make it more efficient
and avoid memory leaks.)

In almost each subfile, a namespace is introduced so that functions can
easily be located when they occur elsewhere.  Here are the names used:

RUR.rec in recorder.js
RUR.world in world.js
RUR.robot in robot.js
RUR.vis_world in visible_world.js
RUR.vis_robot in visible_robot.js
RUR.we in world_editor.js
RUR.storage in storage.js
RUR.ui in ui.js
RUR.runner in runner.js


"constants" are in all caps and are in constants.js

The file doc_ready.js is run only when the page is loaded; its uses the idiom:

$(document).ready(function() { ... }


