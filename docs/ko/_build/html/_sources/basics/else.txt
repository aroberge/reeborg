제말을 들어보세요... 그렇지 않다면...
========================================

.. index:: ! else

프로그램을 작성하는 것을 배우는 것이 재미있을지 모르지만, 컴퓨터 앞에서 많은 시간을 보내고 싶지는 않을 것입니다.
``if``, 만약 비가 내린다면, 책을 읽고, 그렇지 않다면 밖으로 나가서 노세요! 예 심지어 할아버지도 말입니다.


선택지가 두개...
------------------

윗 문장을 ``if`` 만약을 갖는 문장으로 다시 작성합니다::

    if 만약 비가 내린다면, 
        책을 계속 읽고,
    그렇지 않다면, 
        밖으로 나서 나가서 논다.

상기 문장이 파이썬이라면, 대신 다음과 같이 작성할 수 있다:

.. code-block:: python

    if it_rains():
        keep_reading()
    else:
        go_outside_and_play()

넵, 파이썬에는 키워드 ``else``로, 하나 이상 가능성을 포함할 수 있다.
이것을 사용하는 다른 예제를 살펴보자. 리보그가 본인 앞에 바로 벽이 있는지를 알 수 있다.
**Around 1** 세상을 생각해보자. 새로운 조건 ``front_is_clear()``을 사용해서 
리보그 앞에 벽이 있는지 없는지를 판단할 수 있고, ``if/else`` 짝을 함께 사용해서
세상을 돌아다니는데 리보그를 안내하는 프로그램을 작성할 수 있따.
코드는 다음과 같다:

.. code-block:: python


    def move_or_turn ():
        if front_is_clear():
            # 무언가 수행한다.
        else:
            # 다른 무언가 수행한다.

    repeat 40:
        move_or_turn()

.. topic:: 시도해 보기!

    상기 코드를 사용하는 프로그램을 작성해서 리보그가 **Around 1** 세상을 돌아다니게 한다.
    이것을 작성한 다음에, (한줄 추가해서) 프로그램을 변형해서 리보그가 각 코너에 토큰을 놓도록 한다.

.. hint::

    .. code-block:: python

        def turn_or_move():
            if front_is_clear():
                move()
            else:
                turn_left()
                put()

        repeat 40:
            turn_or_move()
   

``if/else`` 관해서 생각하는 방법
------------------------------------

``def`` 와 ``if`` 문을 코드 덩어리를 삽입하는 것과 (때때로) 동치되는 것으로 것으로 봤다;
예외가 ``if`` 문 조건이 ``거짓(False)`` 일 경운데, 이런 경우 코드 덩어리가 무시되어서 삭제하는 것과 동치가 된다.
따라서, ``if/else`` 문장은 한 코드 덩어리 혹은 다른 코드 덩어리를 경우에 따라서 삽입하는 것으로 볼 수 있다.
따라서, 

.. code-block:: python

    move()
    if True:
        turn_right()
    else:
        turn_left()
    move()

상기 코드는 다음에 상응한다.

.. code-block:: python

    move()
    turn_right()
    move()

반면에, 

.. code-block:: python

    move()
    if False:
        turn_right()
    else:
        turn_left()
    move()

상기 코드는 다음에 상응한다.

.. code-block:: python

    move()
    turn_left()
    move()

상기 내용을 다음과 같은 순서도로 표현할 수 있다:

.. figure:: ../../../flowcharts/else.jpg
   :align: center