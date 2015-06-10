More advanced programming
=========================

Having more than one type of objects makes it possible to learn more
advanced programming concept in a natural way.  Here we have a brief
look at what is possible to do.

Worlds with multiple types of objects
-------------------------------------

As we have seen, when Reeborg is instructed to ``take()`` or ``put()``
an object, he can do so with no ambiguity when there is only one
type of objects.  But what if Reeborg carries two (or more) different
types of objects and we ask him to ``put()`` one down?

|put_error|

.. |put_error| image:: ../images/put_error.gif


As we can see, doing so causes Reeborg to complain.  To have Reeborg
accomplish the task properly, we need to specify which type
of object using a function *argument* - in this case, a Python string
with the name of the object.

|put_ok|

.. |put_ok| image:: ../images/put_ok.gif

facing_south()  using variables and return values.

Object-Oriented Programming
---------------------------

object creation; different robot models, inheritance (fixing reeborg)


self.facing_south() using comparison with RUR.SOUTH


Really advanced programming
----------------------------

Python's standard library with JSON example to obtain the state of the
world as a dict.

Mention view_source and inspect, etc.
