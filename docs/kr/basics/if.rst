만약 ...면 좋을텐데
====================

만약 리보그가 스스로 의사결정을 한기만 한다면, 프로그램 작성하는 것이 훨씬 더 단순해질텐데...
**잠시만!** 제가 여러분에게 말하지 않았나요: 리보그는 스스로 의사결정을 할 수 있어요.

파이썬 키워드: ``if``
--------------------------

.. index:: ! if
.. index:: ! True
.. index:: ! False
.. index:: ! 참
.. index:: ! 거짓

.. topic:: 직접 해보세요!

    적절한 세상(아마도 **Alone** )을 선택하고, 리보그가 아래 프로그램을 실행하게 만든다.

.. code-block:: python

    if True:
        move()

    if False:
        turn_left()

``True`` 와 ``False`` 도 파이썬 키워드다.
이 둘을 서로 바꿔서 프로그램을 실행하고 무슨 일이 발생하는지 살펴보라.

``if`` 문장
----------------

소위 ``if`` **문장(statement)** 은 ``function`` 와 다소 유사한 패턴을 따른다:

.. code-block:: python

    def some_name():
        # 코드 덩어리

    if some_condition:
        # 코드 덩어리

``if`` 문장을 생각하는 방법
------------------------------------

함수를 설명할 때, 함수 **호출** 을 프로그램 특정 지점에 함수 정의에 대한 코드 덩어리를 삽입하는 것에 상응하는 방법으로 설명했다.
따라서::

    move()
    turn_right()  # function call
    move()

상기 코드는 다음과 동치관계가 된다.::

    move()
    # turn_right() 함수 내부 코드 덩어리 시작
    turn_left()
    turn_left()
    turn_left()
    # 코드 덩이리 끝
    move()

``if`` 문장을 *조건부* 삽입 (혹은 **삭제** !)를 갖는다는 점을 제외하고, 유사하게 생각할 수 있다. 
그래서::

    move()
    if True:
        turn_left()
        turn_left()
    move()

상기 코드는 다음과 동치관계가 된다.::

    move()
    turn_left()
    turn_left()
    move()

반면에::

    move()
    if False:
        turn_left()
        turn_left()
    move()

상기 코드는 다음과 동치관계가 된다.::

    move()
    move()



Note that thinking of it this way does not mean that such a deletion
would be done permanently: if, somehow, our program *looped back* and
repeated this part of the code again, the ``if`` statement would be
reevaluated each time to decide whether or not to execute the lines of
code inside the code block.

We can represent the above using a flowchart:

.. figure:: ../../../flowcharts/if.jpg
   :align: center

More useful that you might think...
-----------------------------------

.. note::

    The general term used to describe a function that gives a result
    equivalent to ``True`` or ``False`` in an ``if`` statement is **condition**::

       if condition:
           ...

.. index:: object_here(), done()

Having to specify ``True`` or ``False`` does not help Reeborg decide on
its own. However, there are special functions that Reeborg recognizes
that allow to decide things for himself. The first of these is
``object_here()`` which tells Reeborg that there is at least one object at
the grid position where he is located. For example, if we want to ask
Reeborg to collect tokens, one part of the code could be::

    if object_here():
        take()

Have a look at worlds **Tokens 1** and **Tokens 2**. In both cases, and assuming
that Reeborg moves forward in a straight line, when he finds a token,
all he as to do is:

#. take it
#. move to the next grid
#. put the token down
#. move one more step
#. and he is ``done()``

where I have introduced a new command that Reeborg understands:
``done()``. Actually, you should think of this command as Reeborg saying
it himself and declaring that he has finished.

Let's write the outline of a program that will work in both worlds
**Tokens 1** and **Tokens 2**::

    def move_until_done():
        move()
        if object_here():
            # something
            # something else
            # something else again
            # yet one more
            done()

    repeat 42:
        move_until_done()


Why 42? ... well, I just want to be sure that Reeborg will take enough
steps no matter what world he is in. So far, all the worlds are small
enough that this should be fine. I agree, it does not seem very smart
... We'll see how to fix that later.

.. topic:: Try it!

    Copy the above in the Code editor, filling in the missing
    commands, and test your program on both worlds **Tokens 1** and **Tokens 2**.

.. admonition:: For educators

    The function ``object_here()`` returns a list of object types (as strings)
    found at a given location.  For example, if there are stars and tokens
    at the same location, ``object_here()`` could return ``["star", "token"]``
    or ``["token", "star"]``. If no object is present, an empty list is
    returned.  As you likely already know, Python treats an empty list as
    being equivalent to ``False`` in an ``if`` statement, and a non-empty
    list as equivalent to ``True``.

    If many objects could potentially be found in a given world, and we
    are interested in only one object type, we can specify it as a function
    argument::

        if object_here("token"):
            take("token")

    ``object_here("token")`` will either return an empty list or the list
    ``["token"]``.
