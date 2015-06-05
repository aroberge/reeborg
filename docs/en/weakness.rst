Current weaknesses
==================

The current version of Reeborg's World still has room for improvement.
Feel free to report any suggestions for improvements at
https://github.com/aroberge/reeborg/issues


Inadequate support for input()
------------------------------

Explain limitations here with link to issue filed for Brython

Occasional problems with code highlighting
------------------------------------------

Show one example, by using a print() with a triple quoted string,
comparing the code and the result.

Lack of clear and simple to follow programming tutorial
-------------------------------------------------------

Give a link to the old tutorial

Better, more interesting graphics
---------------------------------

Show some image from CodeCombat or others.


User Interface can be too confusing
-----------------------------------

Explain the problem faced in trying to keep the UI simple while attempting
to give easy access to advanced features.  This can result in too many
"floating windows".

No gamification
----------------

Given the design decision that has been made to **not** save any
information from users on the site and not requiring any login,
coupled with the absense of a clear and well-defined tutorial,
no gamification is currently possible.  http://en.wikipedia.org/wiki/Gamification

Given enough, well-designed tasks readily available, it would be
possible to implement a per browser based approach (using either cookies
or local storage) for gamification.  Alternatively, one could have a way to
save the current "accomplishment status"  (encoded in some way as to help
prevent "cheating")) in a file, and load such file so that the status
could be transported to update the status in another browser.

Not easy to create a copy on a school's website
-----------------------------------------------

Ideally, there should be a simple single-file (zipped) containing a
all relevant files that could be used to make a copy of the entire
site on a school's website.   This has not been done yet.


Feedback for programming errors could be improved
-------------------------------------------------

Currently, if a Python program fails with some types
of errors like `SyntaxError`, `IndentationError`, or `NameError`, some
limited analysis is performed in an attempt to identify some
common mistakes (e.g. missing colons, or missing parentheses).
This could be expanded to cover more types of errors and identify
more potential problems.

It has been suggested that if a program runs successfully, but a given
task has not been accomplished successfully, that a program be analyzed
to look at common errors (e.g. writing `if object_here:`, which would
be treated as being always `True`  instead of `if object_here():`) and
report if any such errors are identified.
