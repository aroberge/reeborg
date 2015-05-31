An other way to repeat
======================

Here we present a different way to repeat a given instruction, one that
is more specific to the instruction that we want to repeat. Suppose we
want to *turn right* or *turn around* but want to have a single function
name to remember. One way to do it is as follows::

    function turn(nb){
        for (var i = 0; i < nb; i++) {
            turn_left();
        }
    }

Using this definition, ``turn_right()`` would be written as ``turn(3)``
and ``turn_around()`` would be written as ``turn(2)``. Try it!

Having a default behaviour
--------------------------

Remember how ``take()`` and ``take("token")`` are equivalent? Would it
be nice to have something similar for ``turn()`` where ``turn()``, with
no argument, would be equivalent to a single ``turn_left()``
instruction?

This can be accomplished as follows::

    function turn(nb){
        nb = nb || 1;
        for (var i = 0; i < nb; i++) {
            turn_left();
        }
    }

In the code above, we make use of the **logical OR operator**, ``||``,
which we will see in more details later. Consider this as a simple
example to whet your appetite. A quick explanation is as follows:

-  ``a || b`` is equal to ``b`` if ``a`` is ``false`` or ``undefined``.
-  If the function *argument* is not specified, it is ``undefined``;
   when this happens, ``nb`` take the value 1.
-  Note that, if a number less than 1 or a string is passed as an
   argument, the ``for`` loop is skipped and Reeborg does not turn.

.. topic:: Try it!

   Write programs that make use of the code samples above.

