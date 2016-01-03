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

조약한 방식으로 리보그가 남쪽을 지향하고 있는지 아닌지를 판단할 수 있는 방법을 살펴봤다.
다음에 더 나은 방식이 있다:

.. code-block:: py3

    class CompassNeedle(UsedRobot):

        def is_facing_south(self):
            return self.body.orientation == RUR.SOUTH

    reeborg = CompassNeedle()
    while not reeborg.is_facing_south():
        reeborg.turn_left()


그렇게 해서, 이제 리보그를 고치는 방법을 살펴봤다.


.. warning::

   다음은 정말 호기심 많고, 알려지지 않는 것에 마추치기를 두려워하지 않는 학습자를 위한 것이다.


코드 탐색하기
------------------

리보그 코드는 GitHub에 있다. 
하지만, 저자가 일부 함수를 여러분을 대신해서 작성했기 때문에,
코드를 탐색하려고 GitHub에 갈 필요는 없다.
예를 들어, 다음과 같이 프로그램을 실행하면:

.. code-block:: py3

    r = UsedRobot()
    inspect(r)

Python/Brython이 이해되는 ``inspect`` 는 자바스크립트 함수로, 
객체 메쏘드와 속성을 볼 수 있도록 작성했다.
지금 당장, 그다지 많은 것을 알려주지는 않는다.
상기 명령어를 실행할 때, 얻은 결과가 다음에 나와 있다::

    __class__
    body

.. note::

   로봇 명칭으로 단일 문자 ``r`` 을 사용했다. 왜냐하면, 매우 짧은 프로그램으로 
   기술적인 명칭이 필요하지 않아서 그렇다.

메쏘드나 속성인지 알 수가 없다.
``__class__`` 는 밑줄 문자 두개로 시작하고 끝난ㄷ;
파이썬 세계에서 고급 프로그래머를 위해서 **대체로** 예약된 내부 파이썬 코드를 
표기하는 관례다. 다른 하나는 ``body`` 다.
그래서 ``r.body`` 가 *어떤 것* 인지 알게 된다.
다음 코드를 실행한다::

    r = UsedRobot()
    inspect(r.body)

상기 명령어를 실행하면 다음을 보게 된다::

    x
    y
    objects
    orientation
    _is_leaky
    _prev_x
    _prev_y
    _prev_orientation

의미를 이전 설명을 통해서 아마도 인식하게 될 것 같다.

어떤 메쏘드도 볼 수 없고, 속성만 볼 수 있음에 주목한다.
실제 메쏘드를 보기 위해서,
언어를 자바스크립트로 전환할 필요가 있다.
(리보그 세상 최상단에서 언어를 전환할 수 있다.)


자바스크립트 !??
------------------------

다음 코드를 실행한 것을 기억하는가?

.. code-block:: py3

    r = UsedRobot()
    inspect(r)

자바스크립트로 상응하는 것을 수행한다.

리보그 세상 윈도우의 최상단에, **Additional options** 을 클릭하고,
파이썬 대신에 자바스크립트를 선택한다.
그리고 나서, 다음 코드를 실행한다:

.. code-block:: javascript

   var r = new UsedRobot();
   inspect(r);

다음에 코드를 실행할 때 출력결과가 나와 있다::

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

그래서, 이중 밑줄로 시작되고 끝나는 것은 아무것도 없다.
파이썬 코드에서처럼 ``body`` 가 보인다.
하지만, ``at_goal()``, ``move()`` 와 많이 친숙한 메쏘드도 볼 수 있다.

이제, 코드를 자세히 살펴볼 준비가 되었다.

.. topic:: 직적 수행해보기!

   다음 자바스크립트 코드를 실행해 보고, 출력된 결과를 살펴보라.

   .. code-block:: javascript

       var r = new UsedRobot();
       view_source(r.turn_left);

   코드가 정확하게 위에 작성된 것과 같은지 확인한다.
   ``inspect`` 대신에 ``view_source`` 를 사용한 것에 주목한다.
   실행하면 밝혀지듯이, 이번 경우에는 전혀 도움이 되지 않는다.

출력된 결과는 다음과 같다.

.. code-block:: javascript

   function () {
           RUR.control.turn_left(this.body);
       }

다음 추측은 다음과 같이 실행하는 것이다.

.. code-block:: javascript

   view_source(RUR.control.turn_left);

상기 코드를 수행한 뒤에, 다음을 보게 된다:

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

그래서, 상기 코드가 실제로 리보그가 좌회전하게 되는 코드다.
앞에서 언급했듯이,
다소 차이가 나는 것을 볼 수도 있다. 그래서, 스스로 직접 수행해 봐야만 된다.

이제, 소스코드를 찾아보지 않고도, 리보그 세상을 움직이는 비밀코드를 얻는 방법을 알게 되었다.


한번 이동 ``move()`` 에 관해서
--------------------------------------

리보그 세상은 처음부터 다수 로봇을 다룰 수 있고, **그리고**
단지 로봇 한대로 단순한 프로그램을 초보자가 작성하기 쉽게 설계되었다.
로봇은 실제로 세상정보가 기술된 자바스크립트 배열(파이썬 리스트와 유사)에 포함되어 있고,
``move()`` 같은 명령어는 해당 배열 0번째 요소를 참조한다.

빈 세상에서 시작할 때, 로봇 배열은 비어있다.
로봇을 생성하면, 첫번째로 0번 요소로, 로봇이 배열에 추가된다.
로봇이 두대인 있는 첫번째 예제에서, 
`move()`` 명령어가 ``reeborg.move()`` 명령어와 동치가 되는 이유가 된다.

