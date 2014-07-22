Rule number 2
=============

I have already mentioned the first rule for learning how to program: you
must write programs (and test them) and not simply read about
programming. Now, I am about to tell you the second rule which is one of
the best-kept secret for writing good computer programs.

.. important::

    **Rule # 2**

        Write your computer programs to make them easy for **people** to
        read and understand.

That's right, write your computer programs so that other people, just
like you, would find them easy to read on their own, and figure out what
they do. Yes, computer languages are designed to allow you to
communicate with computers, just as human languages have evolved to
allow humans to communicate with each other. But computer languages,
which are much simpler than human languages, are often used by
programmers to share their work with other programmers.

Comments
--------

I present to you the first tool you can use to write computer programs
that are easier for people to understand: *comments*.

Comments are notes made by a programmer which are ignored by the
computer; they are meant to be read and understood only by humans.

When using Javascript, one can write comments in one of two ways:

-  By enclosing an arbitrary quantity of text between ``/*`` and ``*/``.
-  By writing some text preceded by ``//`` on any given line.

I will first write a simple program without any comments followed by a
second version with comments added and a third version ... slightly less
readable; however, I will make the same error in all three programs. Can
you spot it more easily in the first program, the second, or the third?

.. code-block:: javascript

    move();
    move();
    turn_left();
    put();
    move();
    move();
    turn_left();
    put();
    move();
    turn_left();
    put();
    move();
    move();
    turn_left();
    put();

Contrast the above program with the same one, from Reeborg's point of
view, but with comments added for humans; you will be able so recognize
comments as they appear in a different colour and font style.

.. code-block:: javascript

    /* This is an example of
    a simple program where Reeborg draws a square,
    leaving a token behind at each corner. */

    move();  // Javascript commands have to end with a semi-colon
    move();
    turn_left(); // Reeborg only knows to turn left
    put("token");  // we assume that Reeborg carries enough tokens

    // we repeat the above three more times to complete the square
    move();
    move();
    turn_left();
    put("token");

    move();
    turn_left();
    put("token");

    move();
    move();
    turn_left();
    put("token");

The above are not particularly good comments, but at least one of them
should have helped you find what was wrong with the program. You might
think this is cheating; however, how can you guess the intent behind
some lines of code in a program on their own? The addition of comments
explaining what a given program should do can be very helpful in finding
mistakes.

Note that in addition to comments, I have used blank lines to separate
some "logical" blocks of code, to help see the pattern better. Together,
the use of comments and insertion of blank lines can make a program much
easier to read.

Furthermore, while it does not make any difference to Reeborg, I have
made sure to specify that it was ``"token"`` that I wanted Reeborg
``put``; this makes it more clear to human readers.

Finally, let me rewrite the **same** program in a way that is much
harder to read for humans, but that is just as easily understood by
Reeborg.

.. code-block:: javascript

    move();move();turn_left();
    put();move();move();turn_left();
    put();move();turn_left();put();
    move();move();turn_left();put();

By choosing world **Alone** and copying/pasting each program in turn in the
editor, you can verify that they all make Reeborg perform exactly the
same task!

Now, which one is easier to read?
