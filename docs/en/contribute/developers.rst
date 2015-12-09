Information for developers
==========================

.. topic:: There are only a few unit tests

   More details will be provided soon.

   In the meantime, you can select "Additional menu" and look
   at the various choices.  When this document was last updated,
   there were two functional tests for Python and one for Javascript for
   the English version of the site (and one each for the French version).

Reeborg's World code is on Github
https://github.com/aroberge/reeborg

.. warning::

    Before you do any serious work on it,
    you might want to get in touch with me to make sure that the information
    given here is really up to date.


The main html file is https://github.com/aroberge/reeborg/blob/master/world.html

By commenting/uncommenting some lines, you can change it so that it can work
without any Internet access, using local version of files instead of CDN ones.
If you look at the source, it should be obvious which ones need to be changed.

The main Javascript files are in
https://github.com/aroberge/reeborg/tree/master/src/js
The code is split up in various files,
which are then concanetated into a single
one (https://github.com/aroberge/reeborg/blob/master/src/js/reeborg_dev.js)
which is the one loaded by the html file.  This concatenation is done using
a Windows batch file (combine_js.bat).  I have not found the need
to write a cross-platform solution (using a Python script) to do this.

Note that no minification is done.  My original motivation was to make
it easier to explore the code.  For example, in Reeborg's World,
select **Javascript** as a
programming language and run the following program::

    view_source_js(RUR.control.turn_left)

You will see the code of that function extracted from the source and
inserted into a CodeMirror instance with formatting intact.
If you attempt to do the same from Python, you will see some Javascript
code translated by Brython ... which will be less than useful.

Human-language specific Javascript files are found in
https://github.com/aroberge/reeborg/tree/master/src/lang

If you work with Python, use the javascript console in the browser
and define::

    RUR.__debug = any_value   # I suggest to use false

As a result, the modified version of the user's program,
including the highlighting information will be printed to the console;
this could be helpful if errors occur when highlighting is turned on,
but not if it is turned off.

If ``RUR.__debug`` is set to any `true` value, additional information
is printed to the Javascript console.  I use this occasionnally if I want
to roughly "trace" a program's execution, to help find an error.

The information given above is probably enough to get you started.
Please feel free to contact me if you have any questions.

Conventions used
----------------

Four spaces should be used for indentation.  Note that some javascript files
may be using two spaces; when refactoring code, you should change this for
the functions you are working on.

When creating different language versions of some files (for example:
reeborg_en.py and reeborg_fr.py), functions (or methods) should be ordered
alphabetically in the English version and the version written in the other
language should follow the order of the English version.  This is to facilitate
comparison between languages and identifying missing information.
In order to understand what I mean, here is an English version of a function
found in reeborg_en.py::

    def move():
        """Move forward, by one grid position."""
        RUR._move_()

and the corresponding one in reeborg_fr.py::

    def avance():
        """Avance d'une case"""
        RUR._move_()

Notice the common inner code::

    RUR._move_()

By using a graphical difftool on the two files, the inner code should (mostly)
match up, which, in turn, should make it easier to confirm that both files
provide the same features.
