Information for translators
===========================

.. note::

   Currently, the English development is currently taking place with a different
   html document than the one referred to here.


.. figure:: ../../images/korean.png
   :figwidth: 30%
   :align: right

   *Samsung Korea has produced books and distributed them for free to students
   using RUR-PLE (the desktop program, precursor
   to Reeborg's World) in South Korea as a means to teach them
   about "computational thinking".*



There are 5 different possible translations tasks into a different (human)
language.  Before you start on any translation, you should get in touch with me
to ensure that your work is not being duplicated.


1. Use the current English (or French) version of the website
but enhanced by having available robot commands in language X.

For example, if you go to http://reeborg.ca/world.html,
you can type and run the following program:

.. code-block:: python

    from reeborg_fr import *

    move()
    avance()   # French equivalent

For this level of tranlsation, all that is needed is a ``reeborg_xx.py`` file,
where ``xx`` is the standard two-letter code for a given language.

Before starting this work, you might want to see if Reeborg's World (i.e. Brython)
support the character set used by your language: Brython's unicode support
is not as complete as that of the standard Python distribution, nor as
complete as Javascript itself.  One way to verify, is to define
a function into your own language.  For example, I chose not to use
accented letters in French when writing instructions.  However, Brython would
allow me to do the following:

.. code-block:: python

    def tourne_à_droite():       # notice the accent on à
        for i in range(3):
            tourne_a_gauche()


If you go to https://github.com/aroberge/reeborg/tree/master/src/libraries/brython/Lib/site-packages
you will see three such language files
(one for English, one for French, and the third, incomplete and most likely buggy one for Spanish).
You can use either the English or the French one as a model.

2. Translate the English messages provided by Reeborg.
There are two examples of such files
(translation_en.js and translation_fr.js) located here at
https://github.com/aroberge/reeborg/tree/master/src/lang.

.. figure:: ../../images/korean2.png
   :figwidth: 30%
   :align: left

3. Do the equivalent to 1 above, but for Javascript instead of Python;
these files (reeborg_en.js and reeborg_fr.js) are also located in
https://github.com/aroberge/reeborg/tree/master/src/lang.

4. Have a special world page with interface in a different language.
These are html files located in https://github.com/aroberge/reeborg
The English version is world.html and the French version is monde.html


5. Translate the current
documentation.

6. Create a new default world menu and possibly translate/adapt
the existing worlds.