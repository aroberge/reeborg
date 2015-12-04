Lists
==========

Run the following program, first to select the correct world,
and a second time to run the rest of it.

.. code-block:: python3

    World("/worlds/many.json", "Many")
    move()
    print(object_here())

The result likely looks as follows::

    ['token', 'triangle', 'banana', 'carrot']

.. note::

    There is also a Python function named ``list`` which can be used to
    create lists!  You have seen that we can use the ``=`` sign to assign a name
    to an object; you should avoid using ``list`` as the name of a variable
    since this would prevent you from using the ``list()`` function in Python.

This is an example of a Python **list**.
A Python list is represented by square brackets, ``[ ]``,
that contains zero, one, or many items.  In the example
above, the list contains 4 items, each of which is
a Python string.   Using the "bracket notation", I could create a list containing
different types of objects::

    a_list = [1, "Reeborg", move]

Accessing list elements
-----------------------

When you saw the first newspaper delivery task, you read the following:

    In computer programming, we generally start counting at zero instead of 1.
    Since these worlds refer to three famous
    people in computer science, I thought it would be appropriate
    to number these worlds starting at zero.

Given a list, we can retrieve a single element using a bracket notation.

.. topic:: Try this!

    Try the following program::

        odd_numbers = [1, 3, 5, 7]
        print( odd_numbers[0] )
        print( odd_numbers[1] )
        print( odd_numbers[3] )
        print( "length = ", len(odd_numbers))

    The Python function ``len()`` gives us the length of the list, which
    is equal to the total number of items of that list.

    The number in brackets which is used to get a single item from the
    list is called the **index** of that item.

Sometimes, it is useful to get the last element of a list, or the one before
that.  One could use the ``len()`` function to figure out the position of the
last item, but Python has a convenient shortcut.

.. topic:: Try this!

    Try the following program::

        odd_numbers = [1, 3, 5, 7]
        print( odd_numbers[-1] )  # last item
        print( odd_numbers[-2] )  # second last item

    Notice how including a minus sign can be used as a convenient way to get
    item starting at the end of a list.

Using lists as conditions
-------------------------

When used as a condition, in an ``if`` or a ``while`` statement, lists behave
differently depending on whether or not they have items in them.

.. topic:: Figure it out by yourself!

    Run the following program::

        # Only one of the following is correct.

        if []:
            print("An empty list is considered to be equivalent to True,")
        elif ['Reeborg']:
            print("An empty list is considered to be equivalent to False.")
            print("But a non-empty list is considered to be equivalent to True.")
        elif [1, 2, 3, 4, 5]:
            print("A list is considered to be equivalent to True",
                  "ONLY if it contains many items")
        else:
            print("Perhaps lists are always considered to be False ...")

    As you know, branches that contain a condition considered to be ``False``
    are skipped; the first branch that contain a ``True`` condition is the
    one that is executed.


More harvesting challenges
--------------------------

.. topic:: First, a quick test

    Run the following program, that will print the first type of objects found by
    Reeborg.  Then change the program to print the second type of objects found.

    .. code-block:: python3

        World("/worlds/many.json", "Many")
        move()
        print(object_here()[0])

Reeborg's aunt is a fruit farmer. In her fields, many types of fruits
can be found. On a given day, only a certain kind of fruit needs to be
harvested.
Have a look at worlds **Harvest 4a**, **Harvest 4b**, **Harvest 4c** and
**Harvest 4d**. As he enters the field, Reeborg sees the type of fruit that
needs to be harvested as his aunt put a sample there. He picks it up and
proceed to harvest all fruits of the similar type.

Reeborg uses the function ``object_here()`` which, as we saw,
returns a **list** containing the names of the objects found at that location;
for the **Harvest 4** worlds, the possible objects are
``"apple", "banana", "orange"`` or ``"strawberry"``.

Below is an incomplete program that would make Reeborg accomplish
the required task in any of the four worlds mentioned.
We use the variable ``FRUIT`` which we wrote using uppercase letters
since it is the same variable used inside and outside some functions;
it is essentially a **global** variable. However, since we do **not**
assign it a value inside a function using the ``=`` sign,
we do not need to use the ``global`` keyword.

.. code-block:: py3

    def harvest_one_row ():
        while front_is_clear():
            if object_here()[0] == FRUIT:
                take(FRUIT)
            move()

    def go_back_to_beginning_of_row():
        pass

    def move_to_next_row():
        pass

    def go_to_first_row():
        pass

    def complete_one_row():
        harvest_one_row()
        go_back_to_beginning_of_row()
        move_to_next_row()

    move()
    FRUIT = object_here()[0]
    take(FRUIT)
    go_to_first_row()
    repeat 6:
        complete_one_row()


.. topic:: Your turn!

    Complete the above program so that it works in all four worlds:
    **Harvest 4a**, **Harvest 4b**, **Harvest 4c** and **Harvest 4d**.

One last experiment
-------------------

Sometimes, when a program becomes too big,
it makes sense to put it into many files.
Here, your programs are not in files: they are in the
Code Editor but parts of them can also be in the library.
Imagine that your program above is so big that it has to be broken up
in two pieces.  Put the definition of the function
``harvest_one_row()`` in the library, and import it into the main
program using

.. code-block:: py3

    from library import harvest_one_row

Does your program still work? Does using the ``global`` keyword makes it work?
The result of these experiments might point out some problems when using
global variables, that is variable used inside a function but defined elsewhere.
