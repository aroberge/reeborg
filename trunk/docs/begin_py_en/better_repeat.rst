
A better **repeat()**
=====================

.. note::

    This lesson covers some very advanced concepts. If you do not
    fully grasp them the first time around, you should feel free to continue
    with the other lessons.

You have seen how we can use our function ``repeat()`` to reduce the
number of lines of code needed to accomplish the same thing. For
example, if we want to simulate a right turn, we can write
``repeat(turn_left, 3)``, thus replacing three instructions with one.
The problem with doing this in general is that it does not make the code
much more readable since we do not introduce descriptive names. A better
approach that we have seen is to use ``repeat()`` inside a well-named
function definition like this::

    function turn_right (){
        repeat(turn_left, 3);
    }

However, we can do this differently. First, we have just seen how
``repeat()`` is defined::

    function repeat (fn, n){
        for (var i = 0; i < n; i++) {
            fn();
        }
    }

Second, we need to remember what the ``return`` statement does in a
function. For example::

    function some_function (){
        // some lines of code
        return something;
    }

    var a = some_function();
    // a will now be a synonym for "something"

Just like we can have functions as arguments of other functions, we can
``return`` functions!

.. code-block:: javascript

    function better_repeat (fn, n){
        return function () {
            for (var i = 0; i < n; i++){
                fn();
            }
        };
    }

    // now, use it to define a new way to turn right
    var my_turn_right = better_repeat(turn_left, 3);

    my_turn_right();  // and use it!

.. topic:: Try it!

   See how you can create a new function using the ``better_repeat()`` function.

Extending this idea
-------------------

In addition to things that need to be repeated, we can also extend this
idea to conditions that need to be tested for...

.. code-block:: javascript

    function do_while(fn, condition) {
        return function() {
            while (condition()) {
                fn();
            }
        };
    }

    var walk_to_the_wall = do_while(move, front_is_clear);
    walk_to_the_wall();

.. topic:: Try it!

    Try the above.  Then, when you are done, you might want to define
    ``do_while_not(fn, condition)`` where we are doing something until a
    condition is **not** satisfied.
