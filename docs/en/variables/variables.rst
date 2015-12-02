
.. note::

    In English, the word *synonym* is used to describe different words
    that have hte same meaning. It can be useful to think of *variables*
    as being *synonyms* for a given object.



Many names for the same object
------------------------------

In a previous example, when talking about *refinements*,
we got a solution for the world **Around 4** that was as follows::

    from library import turn_right

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

Then, we define new functions to better describe the core of
this solution, thus reducing the need to add comments.
One of these functions, which is the only one we will retain as is,
was the following::

    def follow_right_wall():
        if right_is_clear():
            turn_right()
            move()
        elif front_is_clear():
            move()
        else:
            turn_left()

.. important::

    Remember: comments are ignored by Python.  It is therefore always
    preferable to write a program so that its intent is clear from
    the way the code itself is written.

Let us now use another way to combine this function with the rest
of the program written in a clear way using variables.
For exmple, instead of writing::

    # We mark the starting point by putting down a token
    put()

we write::

    mark_starting_point = put
    mark_starting_point()

Similarly, instead of writing::

    # We find a clear direction and start moving
    while not front_is_clear():
        turn_left()
    move()

we write::

    path_is_blocked = wall_in_front  # use this instead of "not front_is_clear"

    while path_is_blocked:
        turn_left()

    move()

Also, instead of writing::

    '''  We know we will have gone around the world
    when we come back to the place we put the token
    down. ''''

    while not object_here():
       ...

we write::

    back_to_starting_point = object_here

    while not back_to_starting_point():
        ...


So, let's put all these changes together and rewrite our program,
first by defining our new vocabulary (variables) and then using it::


    from library import turn_right

    mark_starting_point = put
    path_is_blocked = wall_in_front
    back_to_starting_point = object_here

    def follow_right_wall():
        if right_is_clear():
            turn_right()
            move()
        elif front_is_clear():
            move()
        else:
            turn_left()

    # end of definitions -- begin actual program

    mark_starting_point()
    while path_is_blocked():
        turn_left()
    move()

    while not back_to_starting_point():
        follow_right_wall()

Much fewer comments than before, yet the meaning of the program is
still very clear.  One significant advantage of using well chosen
variables (names) instead of comments is that Python will execute
the code but **not** the comment; so if the code is wrong, we will
see it right away; if the comments are wrong, Python cannot tell us.
