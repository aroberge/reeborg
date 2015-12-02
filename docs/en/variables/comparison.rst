Comparison operators
====================

It is sometimes very useful to compare objects. Let's do this with numbers.

.. topic:: Try this!

    .. code-block:: py3

        print("2 == 2 is", 2 == 2)  # are the two numbers equal?
        print("2 == 3 is", 2 == 3)

        print("2 != 2 is", 2 != 2)  # are the two numbers different?
        print("2 != 3 is", 2 != 3)

        print("2 < 3 is", 2 < 3)  # is the first number smaller than the second?
        print("3 < 2 is", 3 < 2)
        print("2 < 2 is", 2 < 2)

        print("2 > 3 is", 2 > 3)  # is the first number greater than the second?
        print("3 > 2 is", 3 > 2)
        print("2 > 2 is", 2 > 2)

        print("2 <= 3 is", 2 <= 3)  # is the first number smaller than or equal to the second?
        print("3 <= 2 is", 3 <= 2)
        print("2 <= 2 is", 2 <= 2)

        print("2 >= 3 is", 2 >= 3)  # is the first number greater than or equal the second?
        print("3 >= 2 is", 3 >= 2)
        print("2 >= 2 is", 2 >= 2)

Picking up the leaves!
----------------------

Reeborg is finally ready to pick up the leaves in the special world.
Run the following program::

    World("http://reeborg.ca/worlds/not_storm1.json",
          "Not Storm 1")

As you know, this selects the world in which Reeborg has to pickup
an unknown number of leaves and put them down in the compost bin,
all without being able to use ``carries_object()``.

.. topic:: Write a program to do this!

    Have Reeborg count the number of leaves, perhaps using a variable named
    ``number_of_leaves``, initially set to zero.
    Increment its value by one each time Reeborg picks up a leaf.
    When Reeborg is ready to put them in the bin, use something like::

        while number_of_leaves > 0:
            # put down a leaf
            # decrement the variable

