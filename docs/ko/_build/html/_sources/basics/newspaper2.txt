

신문배달 재방문
============================

신문배달 연습문제로 되돌아 가자; **Newspaper 0** 세상에 나온 리차드 패티스 교수님께 
신문배달하는 것을 생각해보자. 주석이 몇개 추가되고, 해당 문제에 대한 해답이 아래에 나와 있다.

.. code-block:: python
   :linenos:

    take() # 별(star) 신문을 집는다.

    # 일층으로 올라간다
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()
    move()
    move()

    # 이층으로 올라간다
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()
    move()
    move()

    # 삼층으로 올라간다
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()
    move()
    move()

    put() # 신문을 내려놓는다

    # 뒤돌아 선다
    turn_left()
    turn_left()

    # 한층 내려온다
    move()
    move()
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()

    # 한층 내려온다
    move()
    move()
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()

    # 한층 내려온다
    move()
    move()
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()

상기 해답은 꽤 길다... 타이핑할 때 실수를 저지르기 쉽다.
함수로 만들 수 있는 반복되는 코드 부분이 일부 있음에 주목한다.
이미 ``turn_right()`` 와 ``turn_around()`` 함수를 정의했다;
이미 정의한 함수를 사용하고 몇가지를 더 정의하자.

.. code-block:: python
   :linenos:

    from library import turn_right, turn_around

    def climb_up_one_floor():
        turn_left()
        move()
        turn_right()
        move()
        move()

    def climb_up_three_floors():
        climb_up_one_floor()
        climb_up_one_floor()
        climb_up_one_floor()

    def climb_down_one_floor():
        move()
        move()
        turn_left()
        move()
        turn_right()

    def climb_down_three_floors():
        climb_down_one_floor()
        climb_down_one_floor()
        climb_down_one_floor()


    # === 함수 정의 끝 ===

    take()  # 별 신문을 집는다.
    climb_up_three_floors()
    put() # 신문을 놓는다.
    turn_around()
    climb_down_three_floors()

각 함수는 5개가 되지 않는 명령어를 담고 있다; 
이전에 했던 것처럼 전체 명령어 목록을 확인하는 것보다 각 함수가 해야 되는 것을 수행하는지 확인하는 것이 훨씬 더 쉽다.
함수가 무엇을 수행하는지 알고나면, 함수를 사용해서 5 줄 가량되는 온전한 프로그램을 작성할 수 있게 된다.
다시 프로그램이 올바르다는 것을 확인하기가 더 수월해진다.
반복을 회피하는 함수를 사용해서, 결국 읽기 훨씬 더 쉬운 더 짧은 프로그램을 만들게 되었다.

.. topic:: 여러분 차례!

    상기 신문배달 프로그램을 작성해서 올바르게 동작하는지 확실히 하라.
    프로그램이 완료되면, 이제 더 단순하게 프로그램을 만들 수 있는 또다른 기법을 배울 준비를 마쳤다.

``climb_up_one_floor()``, ``climb_up_three_floors`` 같은 함수는 해당 문제에만 특정되기 때문에,
라이브러리(library)에 작성한 함수를 저장하는 것이 아마도 좋은 생각은 **아니다.** ;
본인 라이브러리에 너무 많은 함수를 갖고 싶지는 않고 항상 라이브러리에만 있는 함수만 기억했으면 한다.
만약 다른 프로그램에서 함수를 수도 없이 사용하고자 한다면, 라이브러리에 함수를 담아 두는 것은 좋은 생각이 된다.
