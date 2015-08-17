A token of appreciation
=======================

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

Being more specific
-------------------

When you ask Reeborg to ``take()`` or ``put()`` something, he knows you
are taking about tokens, his favourite objects. However, there are other
objects that exist in Reeborg's world. So, if you want to be more
specific, you can write instead::

    take("token")
    put('token')

Note that the word **token** is surrounded by quotes, either single or
double quotes. Try it out!

.. topic:: Try it!

   Write a program to solve world **Tokens 2** and using ``take("token")``
   instead of simply ``take()``.
