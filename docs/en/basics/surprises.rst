Surprises
=========

Change the program we just wrote so that::

    mark_starting_point_and_move()

    while not found_starting_point():
        follow_right_wall()

becomes::

    while not at_goal():
        follow_right_wall()

.. topic:: Try it!

    Run this program with the following hurdle races **Hurdles 1**,
    **Hurdles 2** and **Hurdles 3**. 

You will find that this program, which is quite
different than the ones you had written before to solve the hurdles
challenges, works just as well.

.. topic:: Try this!

    Now, try it with **Hurdles 4**. 
    
Surprise! It works whereas the previous program did not! Can you understand why
it works?

.. topic:: Try these!

    Run the same modified program again with both **Maze 1** or **Maze 2**.

As you will see, this simple program can find the exit to the mazes!

Amazing!

