Listen to me ... or else ....
=============================

While learning how to program may be fun, you should not spend all your
time in front of the computer. ``if`` it rains, keep reading, otherwise,
go outside and play! (Yes, even you grandpa!)

Two choices...
--------------

Let's rewrite the sentence that starts with ``if`` above.::

    if it rains,
        keep reading,
    otherwise,
        go outside and play

If this were Javascript, we might have written it like this instead::

    if ( it_rains() ) {
        keep_reading();
    } else {
        go_outside_and_play();
    }

Yes, Javascript includes the possibility of more than one choice with
the keyword ``else``. Let's use it with another example. Reeborg can see
if there's a wall right in front him. Consider world **Around 1**. You will
use a new condition, ``front_is_clear()`` which Reeborg uses to
determine if there's a wall in front of him or not, together with the
``if/else`` pair to write a program that will guide Reeborg around the
world. Something like the following::


    function move_or_turn () {
        if ( front_is_clear() ) {
            // something
        } else {
            // something else
        }
    }

    repeat(move_or_turn, 40);
    
.. topic:: Try it!

    Write a program using the code above so that Reeborg goes around world
    **Around 1**.  
    After you are done, can you modify the program (by adding one line) so
    that Reeborg deposits a token at each corner?

How to think about ``if/else``
------------------------------

We have seen how ``function``\ s and ``if`` statements could be thought
of as being (sometimes) equivalent to inserting a code block; the
exception was when the condition of the ``if`` statement was ``false``,
in which case we ignored the code block which is equivalent to deleting
it. ``if/else`` statements can be thought as inserting one or the other
code block. Thus::

    move();
    if ( true ) {
        turn_right();
    } else {
        turn_left();
    }
    move();

is equivalent to::

    move();
    turn_right();
    move();

whereas::

    move();
    if ( false ) {
        turn_right();
    } else {
        turn_left();
    }
    move();

is equivalent to::

    move();
    turn_left();
    move();

