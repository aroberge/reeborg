다시 장애물!
==================

.. index:: ! elif

리보그는 캐나다에서 살고 있는데, 캐나다는 비가 오거나 밝거나 눈이 내릴 수도 있다. 
통상 한번에 세가지 사건이 발생하지 않지만, 그러는 경우도 있다...
세가지 경우 중에 한가지만 발생한다고 가정하자. 그러고 나면, 리보그는 다음 선택지에 마주하게 된다::

    if it_rains():
        play_indoors()
    elif it_snows():
        go_skiing()
    else:
        go_swimming() # 충분히 덥다고 가정!

두번째 선택으로 ``elif`` ("else if"를 의미) 사용에 주목한다.
예를 들어, 우박, 천둥, 안개, 이슬비 등과 같은 또다른 가능한 기상 현상을 생각하고 있다면,
부가적인 ``elif: ...`` 코드 덩어리를 사용하는 선택지를 추가할 수 있따.

아래에 리보그가 직면한 선택을 시각적으로 표현하고 있다:

.. figure:: ../../../flowcharts/elif.jpg
   :align: center


``if/elif/ ... /else`` 문장에 대해서 생각하는 방법 
---------------------------------------------------------------

일련의 ``if/elif/ ... /else`` 문장은 ``참(True)`` 으로 평가되는 **첫번째** 코드 덩어리를 
삽입하는 것과 상응한다. 따라서::

    if False:
        do_1()
    elif True:
        do_2()
    elif True:
        do_3()
    else:
        do_4()

상기 코드는 다음에 상응한다::

    do_2()

반면에::

    if False:
        do_1()
    elif False:
        do_2()
    elif False:
        do_3()
    else:
        do_4()

상기 코드는 다음에 상응한다::

    do_4()

등등.

장애물로 돌아가서
---------------------

.. index:: front_is_clear()

방금 두 학습 전에, **Hurdles 1** 과 **Hurdles 2** 세상에 동작하지만, **Hurdles 3** 세상에는 
동작하지 않는 프로그램을 작성했다.
작성한 프로그램은 아마도 다음과 같을 것이다.

.. code-block:: python

   def jump_over_hurdle():
        # 적절한 정의

   def move_and_jump_until_done():
        move()
        if at_goal():
            done()
        jump_over_hurdle()

    repeat 42:
        move_and_jump_until_done()

**Hurdles 3** 세상에서 동작하지 않는 이유는 장애물이 동일 간격으로 되어 있다는 가정으로 
작성되었기 때문이다.
코드를 변경하는데 신규 조건 ``front_is_clear()`` 와 키워드 ``else`` 를 사용해보자.

빠진 부분에 적절한 코드를 채워넣기만 하면, 위에서 언급된 세상에 동작하는 새로운 프로그램이 다음에 있다.

.. code-block:: python

   def jump_over_hurdle():
        # 적절한 정의

   def run_jump_or_finish ():
        if at_goal():
            # 무언가 수행한다.
        elif front_is_clear():
            # 무언가 수행한다.
        else:
            # 무언가 수행한다.

    repeat 42:
        run_jump_or_finish()

``if/elif/else`` 문장구조에 주목한다; 앞에서 언급했듯이,
세가지 독립적인 선택지를 봐야 한다: 세가지 선택지 중에 단 하나만 실행될 것이다.

.. hint::

    .. code-block:: python

        def move_and_jump_until_done():
            if at_goal():
                done()
            elif front_is_clear():
                move()
            else:        
                jump_over_hurdle()

.. topic:: 직접 수행해 보기!

    그러한 프로그램을 작성해 보고, 제대로 동작하는지 확실히 한다.

어떤 것도 변경하지 않고, 상기 프로그램이 **Hurdles 4** 세상에 돌아갈까? ...
코드를 살펴보고 나면, 대답은 아니요라고 결론내릴 것 같다.
직접 시도해서 확인할 수도 있다. **Hurdles 4** 세상 뿐만 아니라 다른 세가지 세상에서 
리보그가 달릴 수 있는 프로그램을 작성할 때까지 시간이 ``한동안(while)`` 걸릴 것이다.
