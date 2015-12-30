
더 많은 재귀
==============

생각해봤던 마지막 프로그램은 다음과 같다::

    def go_home():
        if not at_goal():
            move()
            go_home()
        turn_left()

    # 지금 실행한다!
    go_home()      # 첫번째 호출

지금까지, 아마도 어떻게 동작하는지 알아냈을 것이다;
최소한으로, 프로그램을 실행했어야만 된다!
**Home 1** 세상에서 상기 프로그램을 실행한다고 가정하고,
프로그램을 분석해보자.
늘 그렇드싱, 명령어 하나를 생각해보자::

    go_home()

상기 명령어는 정의된 함수 몸통부분으로 교체된다::

    if not at_goal():
        move()
        go_home()    # 두번째 호출
    turn_left()

리보그가 아직 목적지에 도달하지 않았기 때문에,
``if``문 코드 덩어리가 실행된다::

    move()
    go_home()        # 두번째 호출
    turn_left()

다시 한번, ``go_home()``을 정의된 함수 몸통으로 교체한다::

    move()
    if not at_goal():
        move()
        go_home()    # third call
    turn_left()
    turn_left()

그리고, 한번더 수행되면::

    move()
    move()
    if not at_goal():
        move()
        go_home()    # 4번째 호출
    turn_left()
    turn_left()
    turn_left()

두번째 ``move()`` 명령어 다음에,
리보그가 목적지에 도달해서, ``if`` 문장 코드 덩어리는 실행되지 않는다::

    move()
    move()
    if not at_goal():
        move()      # 호출되지 않음
        go_home()   # 호출되지 않음
    turn_left()
    turn_left()
    turn_left()

.. note::

   ``go_home`` 은 세번 호출된다... 리보그는 왼쪽으로 세번 회전한다.
   아마도 리보그가 횟수를 세는데 사용할 무언가가 된다... 이점을 기억한다!

그렇기 때문에, 목적지에 도착한 후에, 프로그램을 종료하기 전에
리보그는 왼쪽으로 세번 회전한다. (아마도 축하 공연?)

.. topic:: 시도해 보기!

   상기 프로그램을 실행해서, 재귀 프로그램이 실제로 마지막에 리보그를 세번 회전하게 되는 것을 확인한다.

또다른 테스트
----------------------

다시 동일한 세상을 사용해서,
다음 프로그램을 실행하면, 리보그가 마지막으로 향하는 방향을 알아낼 수 있을까?

.. code-block:: py3

    def go_home():
        move()
        if not at_goal():
            go_home()
            turn_left()
        turn_left()

    # 지금 실행한다!
    go_home()

.. topic:: 직접 작성해 본다!

    실행하지 않고 상기 프로그램이 해독한다.
    그리고 나서, 리보그를 실행해서 이해한 것을 점검한다.
    프로그램을 실행하기 전에, 리보그가 이미 목적지에 도착해 있다면, 무슨 일이 벌어질까?


