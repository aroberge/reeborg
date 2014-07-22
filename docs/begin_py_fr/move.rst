
.. highlight:: javascript

This tutorial assumes that you are using the *strict* version of Javascript.

First program
=============

So, you just had Reeborg take its very first step. In the editor panel, there is a
single instruction::

    move();

``move()`` is an example of a Javascript **function**. 
A function has a name; in this case, it is ``move``.  
Valid names must start with either a letter or the underscore character "_"
and may contain letters, numbers or the underscore character "_".
The name of the function is followed by ``()``. This tells Reeborg (Javascript)
that the function must be *executed* or *called* (which are two synonyms).
Finally, to resolve any ambiguity, we add a semi-colon, ``;`` to indicate
to Javascript that this is the end of the instruction that Reeborg
must execute.

.. topic:: Try this!

    Add a second ``move()`` instruction so that Reeborg takes two steps instead
    of only one.


Dealing with eRRoRs
-------------------

When writing computer programs, you will likely make many errors.  
To see how Reeborg react to some errors, I will ask you to intentionally
introduce one error in the program.


.. topic:: Try this!

    Change ``move();`` to ``Move();`` (with an uppercase M) and try to
    execute the program.

What happened?
~~~~~~~~~~~~~~

Javascript, the language that Reeborg understands, is "case sensitive";
that is, lowercase letters have a different meanings than uppercase
ones. Now that you see how Reeborg deals with errors, go back, 
fix the program and run the corrected version.

Once you have run it successfully, all previous indications that
something was wrong with the program will have disappeared. So, make
sure that this is the case.

Now, delete the semi-colon (;) at the end of the ``move()`` instruction
and run the program again. You will find that Reeborg complains that
there is a missing semi-colon but nonetheless understands enough to do
what you expect it to do. Missing semi-colons can sometimes cause
Reeborg to misunderstand your intentions; so make sure to include them
when Reeborg complains even if Reeborg appears to be doing the right
thing.

.. topic:: Try this!

   Just this one time, select the non-strict version of Javascript, 
   and have Reeborg take two steps, with two
   instructions on separate lines but without including any semi-colons.


What happened?
~~~~~~~~~~~~~~

Behind the scene, Javascript can sometimes insert automatically the
required semi-colons so that the programs make sense.  It just so
happened that it produced the right result in this case. 
However, sometimes the semi-colons are inserted at the incorrect place which
create some hidden errors.  For this reason, I urge you to use the **strict**
version of Javascript which will make sure that such errors are avoided.

Rule #1
-------

Did you try all that I suggested to you above?  If not,
I urge you to go back to do it.  You see, the most important rule you
must follow if you wish to learn programming is the following:

.. important::

    Rule # 1
        Learning about computer programming is like learning to play
        a musical instrument: you have to **do it**, not simply read
        about it.


Every time I suggest you try something, I have a reason for doing
so.  Sometimes it will not be apparent right away, but I really encourage
you to try it.  I would even suggest to you that you should do more
than what I suggest and try different things just to explore further.