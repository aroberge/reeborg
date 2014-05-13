Reeborg's diary
===============

Click on the **World** button at the top to hide Reeborg's world; click
also on the **Diary** button to reveal Reeborg's diary, the place where
our favourite robot writes.

Have Reeborg execute the following program::

    write(42);

You should see that Reeborg wrote the answer to the ultimate question
about life, the universe and everything [#]_ in his diary.

.. [#] At least according to *The Hitchhiker's guide to the Galaxy*

Writing text
------------

In programming terms, a *character* is any letter, number or symbol that
can be printed and a *string of characters*, or simply *string*, is any
combination of character that can be printed. For example, try the
following::

    write("Hello world!");
    write('Hello again.');

Note that the quotes that surround the *string* have to be the same,
either double quotes like ", or single quotes like '. To have a string
that contains some quote characters, we can either surround it by quotes
of a different type or use the *escape character* ``\``::

    write("Let's go.");
    write('Let\'s go.');

We can combine strings using the ``+`` symbol::

    write("Goodbye! " + "And thanks for all the fish.");

We can also start on a new line using the following *escape sequence*:
``\n``::

    write("Thank you. \nTry again");

.. topic:: Try it!

    Make sure you try to run the above code samples or some similar.


Reeborg knows mathematics
-------------------------

.. topic:: Try this!

    Try running the following program and look at the output in Reeborg's
    diary.

    .. code-block:: javascript

        write( 2 + 3 );  // adding numbers
        write( 2 * 3 );  // multiplying numbers
        write( 3 - 2 );  // subtracting numbers
        write( 6 / 2 );  // dividing numbers
        write( 1 + 3 * 2 ); // multiplication is done before addition
        write( (1 + 3) * 2 );  // using parentheses to change normal order of operations

Using variables
---------------

We have already seen the ``var`` keyword. Let's use it again as explore
mathematical operations some more::

    var length, width, area;
    length = 4;
    width = 6;
    area = length * width;  // area of a rectangle
    write(area);  // will output 24

.. topic:: Try it!

    Make up your own examples and run them.

A word of caution
-----------------

.. warning::

    Combining strings and numbers can yield unexpected results::

        write("2" + 2);

.. important::

   The *character* "2" is not the same as the *number* 2.

Finally, note that spaces around operators, like ``+``, are ignored by
Javascript; however they often make a program easier to read for humans.

