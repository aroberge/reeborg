A token of appreciation
=======================

.. index:: take(), put()

Reeborg likes to collect tokens. When he finds one on the ground, most
often he takes it; sometimes he puts one down as well. The commands for
having him do so can be simply written as follows::

    take()
    put()

Select world **Tokens 1**. There is a token right next to Reeborg. Note the
number 1 in red next to it: the number will change depending on the number of
tokens at that location.  The fact that the number is written in red indicates
that this does not correspond to the expected final result.
Next square, we see the a token in shades of grey. This tells us that we should have Reeborg
put one token at that location. Once this is done, we can see that it
has been done correctly by, the number of tokens should be written in green.
Finally, after the grey token, there is a pale green square: this indicates where
Reeborg should end up after having accomplished its task.

.. topic:: Try it!

   Write a program to accomplish this task. Can your program also work,
   without any changes for world **Tokens 2**? The answer should be no, for now
   ... but, later, you will learn how to write a single program that can
   work properly for both worlds.

.. topic:: Try something else!

    What happens if Reeborg attempts to put down a token when he does not
    carry one? What happens if Reeborg attempts to take a token where there
    is none to be found?

.. admonition:: For educators

    For the first tasks mentioned in this tutorial, worlds have been
    designed such that only one type of object is present.
    When more than one type of objects are present, it is sometimes
    required to include a function argument specifying which
    object is to be handled, as in::

        take("token")
        put('token')

