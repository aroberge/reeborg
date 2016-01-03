객체지향 프로그래밍
===========================

.. note::
   
   이번 학습의 목적이 객체지향 프로그램(Object-Oriented Programming)을
   가르치는 것이 아니라, 리보그 세상에서 객체지향 프로그래밍을 사용해서
   어떤 작업을 수행할 수 있는지 단순히 암시하는데 있다.


객체지향 프로그래밍
---------------------------

빈 세상에서 출발한다고 가정하자.
표준위치(x=1, y=1)에서 동쪽을 향한 로봇을 생성하고 나서,
다음 프로그램처럼 한발짝 앞으로 나가게 한다:

.. code-block:: py3

    reeborg = UsedRobot()
    reeborg.move()

리보그를 소개할 때 처음에 언급한 것이 설명되어 있다:
기름이 새고 여러 곳이 망가져 있다.
중고 ``UsedRobot`` 으로 신상 ``NewShinyRobot`` 로봇이 아니라는 점이 전혀 놀랍지 않다.

이제, 리보그를 다른 지점에서 출발시키고, 다른 방향을 향하고 있고...
아마도 (다른 객체는 아니고) 일부 토큰을 지니게 한다. 다음 프로그램을 실행해 본다:

.. code-block:: py3

    reeborg = UsedRobot(2, 3, 'w', 4)
    while reeborg.carries_object("token"):
        put()
    reeborg.turn_left()
    reeborg.move()

``'w'`` 대신에, ``'e'``, ``'s'``, ``'n'`` 을 시도해 볼 수도 있다.
어떤 의미인지는 충분히 유추할 것으로 확신한다.

로봇 다수
---------------

다른 색다른 것을 시도할 시간이다.
그런데, 이번 학습에는 그림이 하나도 없다는 것을 알아챘을 것이다.
의도적으로 그런 것이다: 저자는 여러분이 색다른 것을 시도하고, 색다른 것을 시도할 것에 대한
지침만 제시할 뿐이다.

.. code-block:: py3

    reeborg = UsedRobot(2, 3, 'w', 4)
    reeborg.set_model(0)                 # 오리지날 로봇! :-)
    while reeborg.carries_object("token"):
        put()
    reeborg.turn_left()
    reeborg.move()

    karel = UsedRobot(5, 5, 'n')
    karel.set_model(3)
    karel.turn_left()
    karel.move()

    # 이제 놀랄 시간!
    move()

마지막 ``move()`` 명령어에 주목?
어떤 로봇이 이동하는지 주목한다.
마지막에 저자가 설명할 것이다 - 그때까지 여전히 관심이 있다면 말이다.


신형 로봇
-------------

다음 코드를 돌려본다:

.. code-block:: py3

    class BetterRobot(UsedRobot):

        def turn_right(self):
            self.turn_left()
            self.turn_left()
            self.turn_left()

    reeborg = BetterRobot()
    reeborg.turn_right()

지금까지 좋다... 하지만 그다지 향상되지는 않았다. 더욱 잘 할 수 있다.


Four important ingredients for designing a better robot
--------------------------------------------------------

Before I show you the code required to make Reeborg turn right just
as easily as it turns left, I need to explain three different
implementation details of Reeborg's World.

First, when you see a robot executing commands, its program has long
finished its execution.  Each time some specific action is performed,
a recording of the state of the entire world is done **without
anything happening on the screen**. Once the program
has finished its execution, the recording is played back to you which
you then see as an animation.  Thus, if we are to design some new
commands, we will need to somehow record the state of the world,
and do it only once so that it appears to be done in a single step,
and not having right turns being three left turns.

Secondly, when you see the oil leak being drawn, it is being drawn
from one position to the next, as a straight line segment.
It also is drawn is such a way that you can see where Reeborg has made
a single turn or three turns, and if it retraced its steps, as
lines are drawn at slightly different location depending on Reeborg's
direction of movement.

Third ... well, I'll start by telling you a little story, and then
give you the real explanation.

Reeborg has a brain and a body.  It does not make much sense to talk
about the orientation of its brain ... but it does when it comes
to its body.  Thus, its body can be assigned coordinates
like ``x`` and ``y`` as well as an ``orientation``.
In Object-Oriented notation, we will refer to this as

.. code-block:: python

    self.body.x
    self.body.y
    self.body.orientation

instead of the usual

.. code-block:: python

    self.x
    self.y
    self.orientation

Now, that's the nice story.  And if you are familiar with Object-Oriented
programming with Python, you are probably telling yourself that this is
a very much unnecessary complication.

The real explanation is much more complicated, and may risk to bore you,
but it will be brief.

.. note::

   Python programmers use a convention where variable names that start
   with an underscore, like ``_prev_x`` are meant to indicate that they are "private" and
   should normally not be changed by another programmer.

Reeborg's code was first written in Javascript.  And you can use
Javascript to write programs for Reeborg, just as easily as you
can using Python.

Using Brython, I wrote a class that communicates with the Javascript
"backend".  If I had written the code the second way (``self.x`` instead
of ``self.body.x``), when I would have changed the value of self.x
for a ``move()`` function ... the object to which ``self.x`` would have referred
to would no longer be the coordinate of a robot, but rather an integer.

However, by writing the code the way I did, ``self.body`` refers to
a Javascript object, and ``self.body.x`` refers to an attribute of this
object.  Changing this attribute does not change what object
``self.body`` is referring to.

Fourth, ``orientation`` is actually an integer taking the
values 0 to 3.

So, let's put these four ingredients together to write a better
robot that can properly turn right.

.. code-block:: py3

    class RepairedRobot(UsedRobot):

        def turn_right(self):

            # save previous values to know from where to start drawing
            self.body._prev_orientation = self.body.orientation
            self.body._prev_x = self.body.x
            self.body._prev_y = self.body.y

            # mimic two previous left turns for prior orientation
            self.body._prev_orientation += 2
            self.body._prev_orientation %= 4

            # do right turn
            self.body.orientation += 3
            self.body.orientation %= 4

            # record the new state of the world only once!
            RUR.rec.record_frame()

Try it out!

By the way, if you wonder how one could have possibly guessed which
names to use for the various attributes, just read on and you will
find out how.


Fixing the leak
---------------

Try the following:

.. code-block:: py3

    r = UsedRobot()

    reeborg.body._is_leaky = False
    reeborg.move()
    reeborg.body._is_leaky = True
    reeborg.move()
    reeborg.body._is_leaky = False
    reeborg.move()
    reeborg.body._is_leaky = True
    reeborg.move()


So, this tells us enough to see how to implement a robot
whose leak can be fixed at will.

.. code-block:: py3

    class RepairedRobot(UsedRobot):
        def __init__(self, x=1, y=1, orientation='e', tokens=0, leaky=False):
            super().__init__(x=x, y=y, orientation=orientation, tokens=tokens)
            self.body._is_leaky = leaky

    fixed = RepairedRobot(3, 3)
    leaky = RepairedRobot(5, 5, leaky=True)

    fixed.move()
    leaky.move()


Facing south
------------

We saw a clumsy way to have Reeborg determine if it was facing
South or not.  Here's a better way:

.. code-block:: py3

    class CompassNeedle(UsedRobot):

        def is_facing_south(self):
            return self.body.orientation == RUR.SOUTH

    reeborg = CompassNeedle()
    while not reeborg.is_facing_south():
        reeborg.turn_left()



So now you know how to fix Reeborg.


.. warning::

   The following is for those that are really curious and not afraid
   to confront the unknown.


Exploring the code
------------------

Reeborg's code is on Github.  However, you do not need to go
there to explore the code as I wrote some convenience functions
for you.  For example, running the following program:

.. code-block:: py3

    r = UsedRobot()
    inspect(r)

``inspect`` is a Javascript function, understood by Python/Brython,
that I wrote to enable you to see an
object's methods and attributes. Right now, it does not tell us much.
Here is what I get when I do this::

    __class__
    body

.. note::

   I use a single letter ``r`` for the robot name as this is a very short
   program and I don't need a descriptive name.

We do not know if they are methods or attributes.  ``__class__`` starts
and ends with two underscore characters; this is a convention in the Python
world to denote some internal Python code that is **mostly** reserved
for advanced programmers.  The other is ``body``.
So, we know that ``r.body`` is
*something*.  Run the following code::

    r = UsedRobot()
    inspect(r.body)

You should see something like::

    x
    y
    objects
    orientation
    _is_leaky
    _prev_x
    _prev_y
    _prev_orientation

which you will likely recognize from the previous explanation.

Note that we don't see any methods, only attributes.  To see the actual
methods, we need to switch the language to Javascript (you can do
so at the very top of Reeborg's World.)

Javascript !??
--------------

Remember when you ran this code?

.. code-block:: py3

    r = UsedRobot()
    inspect(r)

We are going to do the equivalent with Javascript.

At the very top of the Reeborg's World window, click on
**Additional options** and select
Javascript instead of Python.  Then run the following code:

.. code-block:: javascript

   var r = new UsedRobot();
   inspect(r);

Here is what I see when I do this::

    body
    at_goal()
    at_goal_orientation()
    build_wall()
    front_is_clear()
    has_token()
    is_facing_north()
    move()
    put()
    token_here()
    right_is_clear()
    object_here()
    take()
    turn_left()


So, nothing that starts and end with a double underscore, and we see
``body`` as we had in the
Python code, but will also see some familiar methods like
``at_goal()``, ``move()`` and many others.

Now we are ready to look at some code.

.. topic:: Do this!

   Execute the following Javascript code and look at the printed result.

   .. code-block:: javascript

       var r = new UsedRobot();
       view_source(r.turn_left);

   Make sure the code is exactly as written above.  Note that I use
   ``view_source`` instead of ``inspect`` which, as it turns out, would
   not help me at all in this case.

Based on the result that I see printed,

.. code-block:: javascript

   function () {
           RUR.control.turn_left(this.body);
       }

my next guess is to execute the following.

.. code-block:: javascript

   view_source(RUR.control.turn_left);

After doing so, I see the following:

.. code-block:: javascript

   function (robot){
       "use strict";
       robot._prev_orientation = robot.orientation;
       robot._prev_x = robot.x;
       robot._prev_y = robot.y;
       robot.orientation += 1;  // could have used "++" instead of "+= 1"
       robot.orientation %= 4;
       RUR.control.sound_id = "#turn-sound";
       RUR.rec.record_frame("debug", "RUR.control.turn_left");
   }

So, this is the actual code that makes Reeborg turn left.
As mentioned above, you might see something slightly different, so
you should really try on your own.

So now you know how to get at the secret code powering Reeborg's World
without having to look for the source code repository.


About the single ``move()``
---------------------------

Reeborg's World has been designed right from the start to work
with multiple robots AND to make it easier for beginners to
write simple programs with only one robot.  Robots are actually
included in a Javascript Array (similar to a Python list) in the
world description and an instruction like ``move()`` refers to the
zeroth element of this array.

When you start with an empty world, the robot array is empty.  As
you create robot, they get added, with the first one being
the zeroth element.  This is why, in the first example above
where we have two robots, ``move()`` is equivalent to
``reeborg.move()``.
