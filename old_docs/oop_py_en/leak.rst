Fixing the leak
===============



As you know, Reeborg has an oil leak. 
It is time to fix it. 
Let's go back and review the code that
determines the oil leak.

.. code-block:: py3

    r = UsedRobot()
    inspect(r.body)

You should see something like::

    x
    y
    tokens
    orientation
    _is_leaky
    _prev_x
    _prev_y
    _prev_orientation
    triangle
    square
    star

We recognize the private (i.e. starting with an underscore character) 
variable ``is_leaky``.  Let's see what value it has.

.. code-block:: py3

    r = UsedRobot()
    print(r.body._is_leaky)

And the result is ``True``.  This suggest that we can take
care of the leak by assigning the value of ``False`` to this variable.
Let's do a quick test.

.. topic:: Try this!

   Select world **Empty** and run the following code::

        r = UsedRobot()

        reeborg.body._is_leaky = False
        reeborg.move()
        reeborg.body._is_leaky = True
        reeborg.move()
        reeborg.body._is_leaky = False
        reeborg.move()
        reeborg.body._is_leaky = True
        reeborg.move()

The above test should have confirmed our hypothesis. 
(Remember to try it; I might have changed the code powering Reeborg's site since this tutorial
was written.)  So, all we need to do when creating a robot it so immediately
set its ``_is_leaky`` body attribute to ``False``, as follows::

    r = UsedRobot()
    r.body._is_leaky = False

This is not very elegant.  One would think that it should be possible to do it
when creating the robot instance ... and indeed that is the case.  Let's see how.

Introducing ``__init__``
------------------------

Python has a special method named ``__init__`` that is called when an instance
is created.  Let's quit the robot world (you can close the World panel but keep
the Diary open) for a short while to learn about this special method.

.. topic:: Try this!

    Run the following code::

        class MyClass(object):
            def __init__(self):
                self.x = 1
    
        my_object = MyClass()
        print(my_object.x)


By running the above code, you might think that you know what to do to fix
our robot so that it is not leaky.

.. topic:: Try this!

    Does the following code fixes the leak?

    .. code-block:: py3

        class FixedRobot(UsedRobot):
            def __init__(self):
                self.body._is_leaky = False

        r = FixedRobot()
        r.move()

More about ``__init__``
-----------------------

As you just saw (you should really run the above code), it did not work
at all.  In fact, as you saw, no robot was created.  (You might need
to use world **Empty** to see this clearly.)  So, let's not be so
hasty this time: we will look at a few more examples of creating classes
before going back to the robot world.

.. topic:: Try this!

    Run the following code::

        class MyClass(object):
            def __init__(self, x):
                self.x = x
    
        my_object = MyClass(1)
        print(my_object.x)
        #my_other_object = MyClass()
        #print(my_other_object.x)

    If you uncomment the last two lines, it will not work; make sure
    your try it.

Positional arguments
~~~~~~~~~~~~~~~~~~~~

What we have used in the above code is known as a *positional argument*.
To understand the name better, try the following example 

.. topic:: Try this!

    .. code-block:: py3

        def my_function(x, y, z):
            print(x, y, z)
            print(z, x, y)    

        my_function(1, 2, 3)

        class MyClass(object):
            def __init__(self, x, y):
                self.x = x
                self.y = y
    
        my_object = MyClass(4, 5)
        print(my_object.x)
        print(my_object.y)

Positional arguments are required.  If we want an optional argument,
we use a *named* argument, which is an argument that is given
an optional value.  

.. important::

   Positional argument must be listed first, followed by named arguments.
   When calling a function or method, if the argument name is not given,
   its value is determine by the position at which it occurs.


.. topic:: Try this!

    Run the following code::

        def test(a, b, c=3, d=4):
            print(a, b, c, d)

        test(1, 2)
        test(1, 2, 5, 6)
        test(1, 2, d=7)
        test(1, 2, d=8, c=9)  # different order of named arguments

Derived classes
~~~~~~~~~~~~~~~

It is time to go back to classes.

.. topic:: Try this!

    Try to guess the result before you run the following code::

        class MyClass(object):
            def __init__(self, x=1):
                self.x = x
                self.y = True

            def print_me(self):
                print(self.x, self.y)

        class MyOtherClass(MyClass):
            pass

        class YetAnotherClass(MyClass):
            def __init__(self, x=1):
                self.x = x
                self.y = False

        a = MyClass()
        a.print_me()

        b = MyClass(2)
        b.print_me()

        c = MyOtherClass(3)
        c.print_me()

        d = YetAnotherClass()
        d.print_me()

This approach **suggests** that, all we need to do when we want to change
the initialisation of derived classes is to **recopy** all of the
content of the parent's ``__init__`` method and change what we
need to change.  However, remember **Rule #3** of the beginner's
tutorial:

.. important::

    **Rule # 3**
        When writing computer programs, do not repeat yourself.
        I repeat: **do not repeat yourself!**

Python has a special function that can help us avoiding repetition;
it is called ``super`` and can be used as shown in the following
example that you must try.

.. topic:: Try this!

    Run the following code::

        class MyClass(object):
            def __init__(self, x=1):
                self.x = x
                self.y = True

            def print_me(self):
                print(self.x, self.y)


        class YetAnotherClass(MyClass):
            def __init__(self, my_x=4):
                super().__init__(x=my_x)
                self.print_me()   # x and y from parent
                self.y = False

        d = YetAnotherClass()
        d.print_me()

In the above example, I used a variable ``my_x`` for the derived class; this is
not right but it was to help you understand the proper way of writing 
the code as it has the weird assignement: ``x=x`` in the list of arguments.

.. topic:: Try this!

    Run the following code::

        class MyClass(object):
            def __init__(self, x=1):
                self.x = x
                self.y = True

            def print_me(self):
                print(self.x, self.y)


        class YetAnotherClass(MyClass):
            def __init__(self, x=1):
                super().__init__(x=x)
                self.print_me()   # x and y from parent
                self.y = False

        d = YetAnotherClass()
        d.print_me()

We are now ready to go back to fix Reeborg's leak.  However,
before we do so, I should mention another special Python method:
``__str__``.

As you saw in the above code, we found it useful to write a special
method to print all the relevant information about our instances.
Python has a standardized way to do this using ``__str__``.  
In this special method, programmers create a **string** of characters
that is used when printing information they deem to be useful
about a given instance of a class.


.. topic:: Try this!

    Run the following code::

        class MyClass(object):
            def __init__(self, x=1):
                self.x = x
                self.y = True

            def __str__(self):
                return str(self.x) + " " + str(self.y)

        a = MyClass()
        print(a)

    Note that we made use of the special function ``str`` which converts
    its argument into a string of caracters.

Finally fixing the leak
-----------------------

We are finally ready to fix the oil leak.  We know that we
want to change the value of a single attribute (``_is_leaky``)
while keeping everything else the same.
This is how we can do it.

.. topic:: Try this!

    Fix the leak as follows in the world **Empty**::

        class RepairedRobot(UsedRobot):
            def __init__(self, x=1, y=1, orientation='e', tokens=0, leaky=False):
                super().__init__(x=x, y=y, orientation=orientation, tokens=tokens)
                self.body._is_leaky = leaky

        fixed = RepairedRobot(3, 3)
        leaky = RepairedRobot(5, 5, leaky=True)

        fixed.move()
        leaky.move()


Note that, rather than simply fixing the leak once and for all, we chose to
add another named argument to give us the option to have a leaky robot.
This can be useful when writing programs: we activate the leak while
debugging the program, and turn it off when everything is working correctly.

