
Using the Library
=================

When programmer make use of a given function in different programs,
rather than redefining it in each program they write, they put them in
special programs called **libraries** and they have a way to ensure that
their other programs can use the functions that are found in the
library.

You are going to use the function ``turn_right()`` **a lot!** Instead of
rewriting it each time (remember Rule # 3), what you are going to do is
to write it **once** (more) but, this time, instead of writing it in the
editor with the **Javascript Code** tab, you will click on the **Library** tab and
write it there. Oh, and you should also write ``turn_around()`` there as
well.

Then, when you want to use the functions defined in your library, you will
simply type ``import_lib()`` in the Javascript Code editor.

.. topic:: Do this!

   After writing the functions ``turn_right()`` and ``turn_around()`` in
   the library, go back to the Javascript Code editor (so you no longer see your
   functions) and write a short
   program that nonetheless uses them to make sure that they work as
   expected. If they don't, go back and fix them.  Remember to use
   ``import_lib()`` in your main program.

From now on, whenever you define a function that you use more than once,
add it to your library so that you don't have to redefine it every time.

Reading exercise
----------------

Remember the following?

.. important::

    **Rule # 2**
        Write your computer programs to make them easy for **people** to
        read and understand.

Can you figure out on your own what the following program does, without
copying it in the editor and having Reeborg obey the instructions?::

    function a () {
        turn_left();
        turn_left();
    }

    function b (){
        turn_left();
        a();
    }

    function c (){
        move();
        move();
    }

    function d (){
        c();
        b();
    }

    function e () {
        d();
        d();
        d();
        d();
    }

    turn_left();
    e();
    b();

Not so easy, is it? 

.. topic:: Test it!

    Once you think you have figured out what the above code does, copy it in
    the editor and run it to confirm your understanding.

This should help you to understand why it is important to write programs
for humans, by choosing function names that are meaningful.
