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


신형 로봇을 설계하는데 필요한 네가지 재료
--------------------------------------------------------

리보그가 왼쪽으로 회전하는 것만큼 오른쪽 회전을 하는데 필요한 코드를 보여주기 전에,
리보그 세상에 대한 세가지 다른 구현방식을 설명할 필요가 있다.

먼저, 로봇이 명령어를 실행하는 것을 보면, 프로그램은 이미 오래전에 실행을 마쳤다.
특정한 동작이 수행될 때, 전체 세상을 기록하는 작업이 **화면에 어떤 것도 표시되지 않고**
수행된다. 프로그램이 실행을 마치게 되면, 기록된 것이 재생되어
애니메이션으로 사용자에게 보여지게 된다. 
따라서, 새로운 명령어를 설계할 때, 세상 상태정보를 기록하고, 단지 한번 수행할 필요가 있다. 
그래서 명령어가 우회전이 세번 왼쪽으로 회전하는 것이 아니라, 
단일 절차로 수행되는 것으로 보이게 된다.

둘째로, 기름이 세는 것이 화면에 나타날 때, 
한 지점에서 다른 지점으로 두 지점을 연결한 직선으로 그려지게 된다.
리보그가 회전 한번 혹은 3번 회전할 때 이러한 방식으로 그려진 선을 보게된다.
만약 한걸음 뒤로 물러서게 되면, 리보그 이동방향에 따라 약간 다른 지점에 직선이 그려지게 된다.

세째로... 작은 이야기를 들여주고 나서, 실제 설명을 할 것이다.

리보그는 머리와 몸통을 갖추고 있다.
머리 방향에 관해서 얘기를 하는 것은 그다지 의미가 없다...
하지만, 몸통에 대해서는 방향이 의미가 있다.
따라서, 몸통에 ``지향 방향(orientation)`` 뿐만 아니라 
``x`` 와 ``y`` 같은 좌표를 할당될 수 있다.
객체지향 표기법으로, 다음과 같이 지칭할 수 있다:

.. code-block:: python

    self.body.x
    self.body.y
    self.body.orientation

일반적인 표기법 대신에

.. code-block:: python

    self.x
    self.y
    self.orientation

이제, 멋진 이야기가 되었다.
파이썬 객체지향 프로그래밍에 친숙하다면, 아마도 이런 것이 
훨씬 불필요하게 복잡하다고 느낄 수도 있다.

실제 설명은 훨씬 더 복작하고, 여러분을 졸립게 할 수 있지만, 간략하게는 다음과 같다.

.. note::

   파이썬 프로그래머가 ``_prev_x`` 처럼 밑줄로 시작되는 변수명을 사용하는 관례가 있다.
   밑줄로 시작되는 변수는 "비공개(private)" 변수로 다른 프로그래머에 의해 일반적으로 변경될 수 않음을 나타낸다.

리보그 코드는 먼저 자바스크립트로 작성되었다.
그래서 자바스크립트를 사용해서 
파이썬을 사용해서 프로그램을 작성할 수 있는 것처럼,
리보그 프로그램을 작성할 수 있다.

Brython을 사용해서, 저자는 자바스크립트 "백엔드(backend)"로 
의사소통하는 클래스를 작성했다.
두번째 방식(``self.body.x`` 대신에 ``self.x``)으로 코드를 작성하게 되면,
``move()`` 함수에 대해서 ``self.x`` 값을 변경하게 될 때...
``self.x`` 가 지칭하는 객체는 더이상 로봇의 좌표가 아니라 정수 좌표가 된다.

하지만, 저자가 작성한 방식으로 코드를 작성하게 되면, 
``self.body`` 는 자바스크립트 객체를 참조하게 되고, 
``self.body.x`` 는 객체의 속성을 참조하게 된다.
속성을 변경하는 것이 ``self.body`` 가 참조하는 객체를 변경하지 않는다. 

넷째로, 지향 방향 ``orientation`` 은 실제로 0에서 3 사이 값을 취하는 정수다.

그래서, 상기 네가지 재료를 함께 넣어서, 적절히 우회전하는 신형 로봇을 작성하게 된다.

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

시도해 보기!

그런데, 다양한 속성에 대해 어떤 명칭을 사용해야 되는지 추측하는 방법에 대해서 궁금증이 있다면,
읽어보면 방법을 찾게 될 것이다.


기름 누수 고치기
-------------------------------------

다음 코드를 시도해 본다:

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

그래서, 기름이 새는 로봇을 고치는 방법에 대해서 상기 코드가 충분한 정보를 제공하고 있다.

.. code-block:: py3

    class RepairedRobot(UsedRobot):
        def __init__(self, x=1, y=1, orientation='e', tokens=0, leaky=False):
            super().__init__(x=x, y=y, orientation=orientation, tokens=tokens)
            self.body._is_leaky = leaky

    fixed = RepairedRobot(3, 3)
    leaky = RepairedRobot(5, 5, leaky=True)

    fixed.move()
    leaky.move()


남쪽 지향하기
-------------------------



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
