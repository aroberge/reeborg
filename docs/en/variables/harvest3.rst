More harvesting challenges
==========================

Reeborg's aunt is a fruit farmer. In her fields, many types of fruits
can be found. On a given day, only a certain kind of fruit needs to be
harvested. Have a look at worlds **Harvest 4a**, **Harvest 4b**, **Harvest 4c** and
**Harvest 4d**. As he enters the field, Reeborg sees the type of fruit that
needs to be harvested as his aunt put a sample there. He picks it up and
proceed to harvest all fruits of the similar type.

.. todo::

    To fully understand this section, one needs to know about Python lists,
    and, in particular, list indexing
    which is something I have not covered yet.  I need to do this.
    Also, in the example below, I need to separate out and have something like::

        objects = object_here()
        selection = objects[0]

        # followed by

        selection = object_here()[0]

Reeborg uses the function ``object_here()`` which return a **list** containing
the names of the objects found at that location; for the **Harvest 4** worlds,
the possible objects are ``"apple, "banana", "orange"`` or ``"strawberry"``
depending if one these objects is found.


.. warning::

    There are two new things in the code below which makes is a bit difficult to
    understand when you read it for the first time.
    First, we define a new function that takes an **argument**, in
    this case ``fruit``.  Second, we test to see if two quantities
    are equal by using two consecutive equal signs: ``==``.


.. code-block:: py3

    think(0)  # optional; so it does not take too long...

    def harvest_one_row (fruit):
        while front_is_clear():
            if object_here() == fruit:
                take(fruit)
            move()

    def go_back_to_beginning_of_row():
        ...

    def move_to_next_row():
        ...

    def go_to_first_row():
        ...

    def complete_one_row():
        harvest_one_row(selection)
        go_back_to_beginning_of_row()
        move_to_next_row()

    move()
    selection = object_here()[0]   # select the object name from the list
    take(selection)
    go_to_first_row()
    for i in range(6):
        complete_one_row()


.. topic:: Try it!

    Complete the above program so that it works in all four worlds:
    **Harvest 4a**, **Harvest 4b**, **Harvest 4c** and **Harvest 4d**.

