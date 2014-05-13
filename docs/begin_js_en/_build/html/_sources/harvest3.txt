More harvesting challenges
==========================

Reeborg's aunt is a fruit farmer. In her fields, many types of fruits
can be found. On a given day, only a certain kind of fruit needs to be
harvested. Have a look at worlds **Harvest 5a**, **Harvest 5b**, **Harvest 5c** and
**Harvest 5d**. As he enters the field, Reeborg sees the type of fruit that
needs to be harvested as his aunt put a sample there. He picks it up and
proceed to harvest all fruits of the similar type.

Reeborg uses the function ``object_here()`` which return one of
``"star", "triangle", "square"`` or ``"token"`` depending if one these
objects is found, or return zero otherwise.

There is also a
function ``token_here()`` that returns either the number of tokens found
at the current location. Using
these, you can complete the following outline of a solution that will
work for each of these four worlds.

.. code-block:: javascript

    var selection;
    think(0);  // optional; so it does not take too long...

    function harvest_one_row (fruit) {
        while (front_is_clear()) {
            if (object_here() === fruit) {
                take(fruit);
            }
            move();
        }
    }

    function go_back_to_beginning_of_row() {
        ...
    }

    function move_to_next_row() {
        ...
    }

    function go_to_first_row() {
        ...
    }

    function complete_one_row() {
        harvest_one_row(selection);
        go_back_to_beginning_of_row();
        move_to_next_row();
    }

    move();
    selection = object_here();
    take(selection);
    go_to_first_row();
    repeat(complete_one_row, 6);
    
There are two new things in the above code which makes is a bit difficult.
First, we define some functions that take an **argument**, in 
this case ``fruit``.  Second, we test to see if two quantities 
are equal by using three consecutive equal signs: ``===``.

.. topic:: Try it!

    Complete the above program so that it works in all four worlds:
    **Harvest 5a**, **Harvest 5b**, **Harvest 5c** and **Harvest 5d**.

