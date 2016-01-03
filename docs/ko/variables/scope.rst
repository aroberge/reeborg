Scope: local vs global
======================

First, a friendly reminder:

.. important::

    Rule # 1
        Learning about computer programming is like learning to play
        a musical instrument: you have to **do it**, not simply read
        about it.

Now that I have your attention, it is important that you try these
on your own before reading further.

.. topic:: Run these programs

    First run the following::

        # First program
        a = 2

        def test():
            a = 3
            print("inside test: ", a)

        test()

    Then, this one::

        # Second program
        a = 2

        def test():
            print("inside test", a)

        test()
        print("after test", a)

    And another one::

        # Third program
        a = 2

        def test():
            print("inside test", a)
            a = 3

        test()
        print("after test", a)

    And yet one more::

        # Fourth program
        a = 2

        def test():
            global a
            print("inside test", a)
            a = 3

        test()
        print("after test", a)


What is going on? ...

The need for scope
------------------

.. index:: scope
.. index:: ! global



As I am writing this, the main program file that powers Reeborg's World,
https://github.com/aroberge/reeborg/blob/master/src/js/reeborg_dev.js,
contains approximately 6000 lines of code: this is likely quite a bit more
than the programs you have written so far!  People working in collaboration
will write programs that contains hundreds of thousands if not millions
lines of code.  As you can imagine, it is impossible to find meaningful
names for variables that would have a unique meaning throughout
entire programs.  Suppose you and I collaborate to write a really, really
long program.  If I define the variable ``length`` to be ``32`` and
you define a variable with the same name elsewhere and give it the value ``45``,
we could have a problem when using this variable.

Python, and most other programming languages, has a solution for this problem:
variables that are defined within a function, are known only within this function.
Thus, if you write a function and use a variable named ``length`` and
I write another function and also use a variable named ``length``, these
will be treated as being different variables by Python.

We say that these variables are **local** to the function, or that
they have a **local scope**.

Let's look back at the first program above.  We define a variable named
``a`` inside a function ``test()``.  This variable is considered to be
**local** to that function; giving it a value does not affect the value
of the variable ``a`` **outside** that function: the two variables are
considered to be different.

In the second program, we do **not** define a variable ``a`` inside
the function ``test()``; that is, we do not have a line like::

   a = something

inside that function.   When we ``print`` the value of the variable,
Python recognizes that it is a variable likely defined outside the
function (known as the **global** scope in Python), looks up in this
global scope, finds a variable with that name, and uses it.

.. note::

    Believe it or not, the description here is a simplification.
    There is another Python keyword, ``nonlocal``, that refers to
    some intermediate scope between **local** and **global**.
    However, you will not need to use it for any of the programs
    in Reeborg's World.

In the third program, Python finds that there is a variable ``a`` local
to the function (which means it is defined inside the function) since there
is a line::

    a = something   # with something equal to 3 here...

So, Python determines that, inside the function, ``a`` always refer
to the **local** variable.  Since we attempt to print its value
before we assign it, Python tells us it cannot do this.

Finally, in the fourth program, we have added the line::

    global a

``global`` is a Python keyword that tells Python that the variable
``a`` is the one defined outside the function  (in the *global* scope).
So, it already has a known value when the line::

    print("inside test", a)

is executed.  The following line, ``a = 3``, changes the value of
``a`` so that, after executing ``test()``, ``a`` has this new value.

.. important::

    Many people find the concept of **scope** confusing the first time
    they see it.  You may want to run the 4 programs again (and again!)
    and read the explanation a few times.

    Then, even if it is not entirely clear, you can safely move on
    to the next section.  As you write more programs, the concept of
    scope will become more familiar.