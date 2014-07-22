Repeat
======

Often, we will find that we want to repeat a series of instructions a
fixed number of times. There is a way in Javascript to do so ... but it
has too many new concepts to explain at this time. I will just show you
the code, and immediately introduce ``repeat()``, a simpler replacement
for it, unique to Reeborg's World. 
Later, when you know more about Javascript, I will explain how
``repeat()`` is defined in terms of the standard way. The standard way
is known as a **for loop** and is written as follows::

    for (var i = 0; i < n; i++){
        // some instructions here
    }

.. note::

   Remember that ``take("token")`` could more simply be written as ``take()``.

Now that you have seen this cryptic code which includes two Javascript
keywords, ``for`` and ``var``, let's introduce instead ``repeat()``. We
will use the example ``get_money()`` from the previous newspaper
delivery example::

    function get_money() {
        take("token");
        take("token");
        take("token");
        take("token");
        take("token");
    }

Inside ``get_money()``, we repeat 5 times the command ``take()``.
Using ``repeat()``, we can rewrite the above as follows::

    function get_money() {
        repeat(take, 5);
    }

Note that I have **not** included the parentheses ``()`` for
``take`` inside ``repeat()``. If I had to specify the *argument*
``"token"``, I would not have been able to use ``repeat`` as it makes
use only of the name of the function, without calling it using ``()``.
Now, by using ``repeat()`` we have yet
another way to eliminate repetitions in our code. 

.. topic:: Try it!

    Change your program for the newspaper problem so that
    you use ``repeat()`` wherever it would shorten the code. If you did not save it,
    go back to the previous lesson and redo it using ``repeat()``.

