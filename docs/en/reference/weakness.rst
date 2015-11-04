Current weaknesses
==================

The current version of Reeborg's World still has room for improvement.
Feel free to report any suggestions for improvements at
https://github.com/aroberge/reeborg/issues


Inadequate support for input()
------------------------------

``input()`` typically cannot be used successfully with programs in Reeborg's
World.  The reason for this is rather technical.

Javascript is single-threaded with no equivalent to Python's
``time.sleep()`` function.  In order to implement control over
the speed of the animation (including pausing) as the robot performes a task,
the strategy used in Reeborg's World is to run the entire program at once,
recording each new world state with additional information (including whether or not
a pause has been requested, and if the desired animation speed has been
changed).    After the program execution has been completed,
these "recording frames" are then played back at the requested
speed using Javascript ``setTimeout``.

``input()`` is implemented using Javascript ``prompt()`` which is a modal
widget that interrupts the main Javascript thread.  Any call to ``input()``
occurs during the program execution, thus before the animation has started.
So, if one wanted to prompt the user for a choice, say after the Nth step,
using ``input()``, the user would have no way to know what the state of the
world would be at that point since only the initial state of the world
would be shown at that point.

Skulpt, an incomplete version of Python 2, apparently uses something called
*suspensions* to allow pausing the program's interpretation.
(https://github.com/skulpt/skulpt/search?utf8=%E2%9C%93&q=suspension)
If Brython were to implement a similar approach, using ``input()`` effectively
in robot programs could become a possibility.

Occasional problems with code highlighting
------------------------------------------

When highlighting is enabled/requested, the program run is not simply that
written by the user but includes some additional information so that
the line about to be executed can be highlighted in the code editor.
This additional information is inserted by a simple program
(https://github.com/aroberge/reeborg/blob/master/src/libraries/brython/Lib/site-packages/highlight.py)
which only perform a superficial analysis of the user's program.
This information is used during the playback
(https://github.com/aroberge/reeborg/blob/master/src/js/recorder.js#L109).

In the absence of a robust highlighting procedure, it may very well happen
that requesting code highlighting will result in the insertion of lines
of code that will raise Exceptions when the Python program is executed.

This highlighting is only available for Python programs.


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

Not trivially easy to create a copy on a school's website
-----------------------------------------------------------

Ideally, there should be a simple single-file (zipped) containing a
all relevant files that could be used to make a copy of the entire
site on a school's website: this could be required by some
schools which limit access to a small number of external sites.
However, I have not received any such request yet.


Feedback for programming errors could be improved
-------------------------------------------------

Currently, if a Python program fails with some types
of errors like ``SyntaxError``, ``IndentationError``, or ``NameError``, some
limited analysis is performed in an attempt to identify some
common mistakes (e.g. missing colons, or missing parentheses).
This could be expanded to cover more types of errors and identify
more potential problems.

It has been suggested that if a program runs successfully, but a given
task has not been accomplished successfully, that a program be analyzed
to look at common errors (e.g. writing ``if object_here:``, which would
be treated as being always ``True``  instead of ``if object_here():``) and
report if any such errors are identified.
