Putting it all together!
========================

You now know how to fix Reeborg. So, you have to do it.
In your library, define a new class of robots, using 
the following outline as a model::

    class RepairedRobot(UsedRobot):

        def __init__(self, x=1, y=1, orientation='e', tokens=0, leaky=False):
            pass
            
        def turn_right(self, no_frame=False):
            pass
            
        def turn_around(self):
            pass

        def is_facing_south(self):
            pass
        
        def is_facing_east(self):
            pass
        
        def is_facing_west(self):
            pass  
        
        def face_south(self):
            pass
            
        def face_east(self):
            pass

        def face_north(self):
            pass
            
        def face_west(self):
            pass

        def left_is_clear(self):
            pass

Then, you can test your code by running the following
program (you should probably just copy it from here
and paste the result in the Python editor.)

.. code-block:: py3

    import my_lib
    select_challenge("repaired")
    think(0)

    class TestRobot(RepairedRobot):
        def follow_left_wall(self):
            if self.left_is_clear():
                self.turn_left()
                self.move()
            elif self.front_is_clear():
                self.move()
            elif self.right_is_clear():
                self.turn_right()
            else:
                self.turn_around()      

        def follow_right_wall(self):
            if self.right_is_clear():
                self.turn_right()
                self.move()
            elif self.front_is_clear():
                self.move()
            elif self.left_is_clear():
                self.turn_left()
            else:
                self.turn_around()

    reeborg = TestRobot(leaky=True)


    while not reeborg.token_here():
        reeborg.follow_left_wall()

    while not reeborg.object_here() == "star":
        reeborg.follow_right_wall()
    reeborg.turn_left()

    while not reeborg.object_here() == "triangle":
        reeborg.move()

    reeborg.move()
    reeborg.move()
    reeborg.face_east()
    reeborg.move()
    reeborg.face_west()
    reeborg.move()
    reeborg.move()

    while not reeborg.is_facing_south():
        reeborg.turn_left()
    reeborg.move()
    reeborg.turn_right()

    while not reeborg.object_here() == "square":
        reeborg.move()

    reeborg.face_north()
    while not reeborg.at_goal():
        reeborg.move()

The result should look like the image below. 
Pay close attention to the details of the trace left by the
oil leak and make sure your result looks identical.     

|image0|

.. |image0| image:: ../../src/images/test_result.png


Congratulations!
----------------

I assume that you did manage to reproduce the image above.
If so, you have made much progress in understanding
Object-Oriented Programming using Python and are ready
to move on to another tutorial.