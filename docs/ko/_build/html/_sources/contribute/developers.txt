Information for developers
==========================

.. topic:: There are no unit tests

   I know, I know ...

   In the meantime, you can select "Additional menu" and look
   at the various choices.  When this document was last updated,
   there were two functional tests for Python and one for Javascript for
   the English version of the site (and one each for the French version).

Reeborg's World code is on Github
https://github.com/aroberge/reeborg

Currently, there are two English versions: a development version, and an
older "stable" version; the French version exists only as an adaptation
of the development version.  I will focus here on describing how to
find the relevant files to work on the English development version.

.. warning::

    Before you do any serious work on it,
    you might want to get in touch with me to make sure that the information
    given here is really up to date.


The main html file is https://github.com/aroberge/reeborg/blob/master/world_dev.html

By commenting/uncommenting some lines, you can change it so that it can work
without any Internet access, using local version of files instead of CDN ones.
If you look at the source, it
should be obvious which ones need to be changed; four global string replacements
(probably only 2 if you use some regex-based string replacement assuming your
editor supports it)
are all that is needed to switch from one mode to another.

The main Javascript files are in https://github.com/aroberge/reeborg/tree/master/src/js
The code is split up in various files, which are then concanetated into a single
one (https://github.com/aroberge/reeborg/blob/master/src/js/reeborg_dev.js) which
is the one loaded by the html file.  This concatenation is done using
a Windows batch file (combine_js.bat).  I have not found the need
to write a cross-platform solution (using a Python script) to do this.

Note that no minification is done.  My original motivation was to make
it easier to explore the code.  For example, in Reeborg's World,
select **Javascript** as a
programming language and run the following program::

    view_source(RUR.control.turn_left)

You will see the code of that function extracted from the source and
inserted into a CodeMirror instance with formatting intact.
If you attempt to do the same from Python, you will see some Javascript
code translated by Brython ... which will be less than useful.

Human-language specific Javascript files are found in
https://github.com/aroberge/reeborg/tree/master/src/lang

Some Python files that are required are found deep in a subdirectory
of the Brython distribution
https://github.com/aroberge/reeborg/tree/master/src/libraries/brython/Lib/site-packages

Using the javascript console in the browser, if you work with Python
and define::

    RUR.__debug = any_value   # I suggest to use false

the modified version of the user's program, including the highlighting
information will be printed to the console; this could be helpful
if errors occur when highlighting is turned on, but not if it is turned off.

If ``RUR.__debug`` is set to any "true" value, additional information
is printed to the Javascript console.  I use this occasionnally if I want
to roughly "trace" a program's execution, to help find an error.

The information given above is probably enough to get you started.
Please feel free to contact me if you have any questions.

