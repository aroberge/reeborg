Reeborg's diary
===============

Click on the **World** button at the top to hide Reeborg's world; click
also on the **Diary** button to reveal Reeborg's diary, the place where
our favourite robot writes.

Have Reeborg execute the following program::

    print(42)

You should see that Reeborg wrote the answer to the ultimate question
about life, the universe and everything [#]_ in his diary.

.. [#] At least according to *The Hitchhiker's guide to the Galaxy*

Writing text
------------

In programming terms, a *character* is any letter, number or symbol that
can be printed and a *string of characters*, or simply *string*, is any
combination of character that can be printed. For example, try the
following::

    print("Hello world!")
    print('Hello again.')

Note that the quotes that surround the *string* have to be the same,
either double quotes like ", or single quotes like '. To have a string
that contains some quote characters, we can either surround it by quotes
of a different type or use the *escape character* ``\``::

    print("Let's go.")
    print('Let\'s go.')

We can combine strings using the ``+`` symbol::

    print("Goodbye! " + "And thanks for all the fish.")

We can also start on a new line using the following *escape sequence*:
``\n``::

    print("Thank you. \nTry again")

.. topic:: Try it!

    Make sure you try to run the above code samples or some similar.


Reeborg knows mathematics
-------------------------

.. topic:: Try this!

    Try running the following program and look at the output in Reeborg's
    diary.

    .. code-block:: py3

        print( 2 + 3 )  # adding numbers
        print( 2 * 3 )  # multiplying numbers
        print( 3 - 2 )  # subtracting numbers
        print( 6 / 2 )  # dividing numbers
        print( 1 + 3 * 2 ) # multiplication is done before addition
        print( (1 + 3) * 2 )  # using parentheses to change normal order of operations

Using variables
---------------

We have already seen the idea of using different names (variables) as synonyms.
Let's use this idea again as explore
mathematical operations some more::

    length = 4;
    width = 6;
    area = length * width;  # area of a rectangle
    print(area)  # will output 24

.. topic:: Try it!

    Make up your own examples and run them.

A word of caution
-----------------

.. important::

   The *character* "2" is not the same as the *number* 2.

Finally, note that spaces around operators, like ``+``, are ignored by
Python; however they often make a program easier to read for humans.

