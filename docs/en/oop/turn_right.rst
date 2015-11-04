Many right turns
================

Select the world Empty which has no robot in it. Next define the
following function::

    def turn_right(robot):
        robot.turn_left()
        robot.turn_left()
        robot.turn_left()

Note how we pass the variable ``robot`` as an argument to the function
and how we use it inside the function; this variable will be the robot's
name.

After defining this function, you can use it as follows::

    Reeborg = UsedRobot()
    Erdna = UsedRobot(4, 3)  # creating a robot at a different location!

    Reeborg.move()
    turn_right(Reeborg)
    Erdna.turn_left()
    turn_right(Erdna)

.. topic:: Try it!

   Define ``turn_right`` and use it with a program like the one written just
   above.

This works ... but it does not look right since the *function* that is
used to make the robots turn right uses a different syntax from the
*method* that is used to make them turn left. There has to be a better way...


Derived classes
---------------

``UsedRobot`` is an example of a Python ``class``.  You can think of a
"class" as a collection of objects that have common methods (functions) and
attributes.  What I am going to show
you now is to create a new ``class`` that inherits from an existing one.
After having done that, we'll see how we can create new classes that do more
than simply inheriting from existing ones.

.. topic:: Try this!

   Try the following code::

        class UsedRobotClone(UsedRobot):
            pass

        Reeborg = UsedRobotClone()
        Erdna = UsedRobotClone(4, 3)

        # As before, we define a function to make right turns

        def turn_right(robot):
            robot.turn_left()
            robot.turn_left()
            robot.turn_left()

        Reeborg.move()
        turn_right(Reeborg)
        Erdna.turn_left()
        turn_right(Erdna)

   It should do the exact same thing as the previous example, even though
   we use a different ``class`` to create new robots.

``pass`` is a Python keyword that means "do nothing".  It is inserted when we
do not want to do anything special but need something so that the block
structure (indentation) is interpreted correctly by Python.

Time to do a little be more than just creating a clone of the existing class.

Designing a new class
---------------------

I will show you first how we can fix our robot so that it knows how to turn right,
and explain what I did afterwords.

.. code-block:: py3

    class RepairedRobot(UsedRobot):
        def turn_right( this_RepairedRobot ):
            for i in range(3):
                this_RepairedRobot.turn_left()


Here's how we can then use this new class of objects::

    new_Reeborg = RepairedRobot()
    new_Erdna = RepairedRobot(4, 3)

    new_Reeborg.turn_left()    # as before
    new_Reeborg.turn_right()   # new method!

    new_Erdna.turn_right()     # this one works too!

.. topic:: Try it!

   Try the above code and make sure it works.  **However**, you might want
   to choose a slightly shorter name than ``this_RepairedRobot``.


Explanation
~~~~~~~~~~~


The Python keyword ``class`` indicates that we are going to define a new
type of function, one that creates objects.
What follows class is ``RepairedRobot(UsedRobot)``.
``RepairedRobot`` is the name of our new class;
by writing ``UsedRobot`` between the parentheses,
we ensure that the new class ``RepairedRobot`` inherits all the methods and
attributes that ``UsedRobot`` had. Thus, when we write::

    new_Reeborg = RepairedRobot()

we create a new robot "named" ``new_Reeborg`` which can do (at least all)
the same things that the old::

    Reeborg = UsedRobot()

could do.

Next, inside the new class, as indicated by the indented block,
we define a new method, ``turn_right()``.
By defining it inside the class, we take the first step to insure that all the
robots that are created by calling ``RepairedRobot()`` will be able to turn right!

The second step that is required is to tell Python that the method will
"belong" to the particular object that has been created.
To do so, we used above the variable ``this_RepairedRobot``
which will refer to new_Reeborg, new_Erdna, etc., depending on what object is created.
When we write::

    new_Reeborg = RepairedRobot()

Python creates a new instance of the class ``RepairedRobot`` and defines
all the methods, effectively replacing the first argument of the method
(``this_RepairedRobot``) by the name of the instance (``new_Reeborg``).

Now, ``this_RepairedRobot`` is rather a long name to type.
By convention, another variable name is used: ``self``.
Thus, to follow the normal convention, I should have written::

    class RepairedRobot(UsedRobot):
        def turn_right(self):
            for i in range(3):
                self.turn_left()

.. important::

   It is extremely important that you try the code for the ``RepairedRobot``
   class, either using ``self`` or ``this_RepairedRobot``
   before moving on to the next lesson.



