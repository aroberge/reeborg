Reading exercise
================

Remember the following?

.. important::

    **Rule # 2**
        Write your computer programs to make them easy for **people** to
        read and understand.

Can you figure out on your own what the following program does, without
copying it in the editor and having Reeborg obey the instructions?::

    def a():
        turn_left()
        turn_left()

    def b():
        turn_left()
        a()

    def c():
        move()
        move()

    def d():
        c()
        b()

    def e():
        d()
        d()
        d()
        d()

    turn_left()
    e()
    b()

Not so easy, is it?

.. topic:: Test it!

    Once you think you have figured out what the above code does, copy it in
    the editor and run it to confirm your understanding.

This should help you to understand why it is important to write programs
for humans, by choosing function names that are meaningful.
