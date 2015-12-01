Rule number 4
=============

In the preceding lessons, we have designed a program that works in many
more situations than just the original one we considered. (We could come
up with other situations where it would not work ... but we have done
enough for this exercise.) This program, before we forget, is to allow
Reeborg to explore his world, going around once. While the program is
rather short, and its structure should be clear at this point, it might
not be so obvious to someone who just happened to see it for the first
time. It's probably a good idea either to add comments and/or to
introduce more meaningful words. Let's start by adding comments,
somewhat more verbose than we think we might need::

    # We mark the starting point by putting down a token
    put()

    # We find a clear direction and start moving
    while not front_is_clear():
        turn_left()
    move()

    '''  We know we will have gone around the world
    when we come back to the place we put the token
    down. ''''

    while not object_here():
        if right_is_clear():  # keep to the right
            turn_right()
            move()
        elif front_is_clear():    # move ... following the right wall
            move()
        else:
            turn_left()  # follow the wall by turning left

While this sort of clarifies our intent for each instruction, it is
not really that helpful in summarizing the method (also known as the
*algorithm*) used in solving the problem. Therefore, these comments
might not be as helpful to another reader as we might have wished.
Reading over the comments, we note that the program has two parts:
#. mark the starting point;
#. follow the right wall until we come back to the start.


Let's rewrite this program so that these two parts become clearer,
and writing the comments differently::

    ''' This program instructs Reeborg to go around his world
        counterclockwise, stopping when he comes
        back to his starting point. '''

    def mark_starting_point_and_move():
        put()
        while not front_is_clear():
            turn_left()
        move()

    def follow_right_wall():
        if right_is_clear():
            turn_right()
            move()
        elif front_is_clear():
            move()
        else:
            turn_left()

    found_starting_point = object_here

    #######
    ##  End of definitions above; program execution below .
    #######

    mark_starting_point_and_move()

    while not found_starting_point():
        follow_right_wall()

Isn't this much clearer?

**Note: you might want to make a copy of** ``follow_right_wall()`` **in your
library so that you can use it if you need it again.**

Conclusion
----------

We started with a simple problem to solve (going around a rectangular
world) and, by improving little by little (also called *stepwise
refinement*), we manage to write a program that could be used to solve
many different problems. At each step, we kept the changes small, and
made sure we had a working solution, before considering more complex
problems. We also used more descriptive names for parts of the
*algorithm* which made the program easier to read and, hopefully, to
understand. This is a strategy you should use when writing your own
programs:

.. index:: Rule # 4

.. important::

    **Rule # 4**
        Steps to follow when writing a program:

        #. start simple;
        #. introduce small changes, one at a time;
        #. make sure that each of the changes you have introduced do not
           invalidate the work you have done before;
        #. add descriptive comments that don't simply repeat what each instruction does; and
        #. choose descriptive names.

The last two parts are essentially the same as Rule # 2.

Now, make sure you have the working program in the editor before moving
to next lesson.

