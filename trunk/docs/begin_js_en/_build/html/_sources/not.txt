Not ... true!
=============

Reeborg is upset. It's **not** raining; it's **not** snowing. Yet, he
cannot go outside and practise for his hurdles race.

Why, do you ask? It's because Reeborg is waiting for you to learn about
Javascript **not**.

Time to be negative.
--------------------

Some programming language, like Python, indicate that something is not
true by writing ``not True`` which, in Python, is synonymous of
``False``. Javascript, like quite a few other languages, uses a
convention where **negation** is represented by a symbol ``!``

The exclamation mark indicates negation in Javascript. However, instead
of appearing at the end of something, like a sentence, it has to appear
before something, like some statement that would be normally either
``true`` or ``false``. Thus ``!true`` is the same thing as ``false``,
and ``!false`` is the same thing as ``true``.

Please, make Reeborg happy
--------------------------

You have already written a program that enables Reeborg to jump hurdles;
parts of it went something like this::

    function run_jump_or_finish () {
        if ( at_goal() ){
            // something
        } else if ( front_is_clear() ){
            // something
        } else {
            // something
        }
    }

.. topic:: Try it!

    Make Reeborg happy by re-writing this program in three other versions,
    by choosing different combinations of the negation symbol ``!`` **and**
    different combinations of ``if/else``. 

You should use the three code samples below but pay close
attention to where the negation symbol occur **and** to what is actually
included in each code block.::

    // first choice:

    function run_jump_or_finish () {
        if ( at_goal() ){
            // something
        } else if ( !front_is_clear() ){
            // something
        } else {
            // something
        }
    }

    // second choice ... trickier

    function run_jump_or_finish () {
        if ( !at_goal() ){
            if ( front_is_clear() ){
                // something
            } else {
                // something
            }
        } else {
            // something
        }
    }

    // third choice:

    function run_jump_or_finish () {
        if ( !at_goal() ){
            if ( !front_is_clear() ){
                // something
            } else {
                // something
            }
        } else {
            // something
        }
    }

