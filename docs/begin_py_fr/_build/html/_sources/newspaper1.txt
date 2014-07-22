
Newspaper delivery
==================

Reeborg has a new job: he delivers the *Northern Star* newspaper. Many
of Reeborg's customers do not live on the ground floor of their
building. For each of these customers, Reeborg has to do the following

#. Pick up a single copy of the newspaper (it would be too heavy to
   carry them all up the stairs).
#. Climb up the required number of floors to reach the customer's door.
#. Get the money (tokens) left by the customer.
#. Leave a copy of the newspaper (simply nicknamed the *star*) behind.
#. Climb down to the ground level

While Reeborg has many clients, I only included two with their
corresponding worlds:

-  The nice Ms. Ada Lovelace, who lives on the third floor of her
   building, always leaves a couple of extra tokens as a gift to
   Reeborg; hers is world **Newspaper 1**.
-  The old curmudgeon Mr. Charles Babbage, who lives on the fifth floor,
   always pays the exact amount, leaving no tip for Reeborg; his world
   is **Newspaper 2**

.. topic:: Try it!

    With the help of the following two instructions::

        take("star")   // pick it up to carry
        put("star")  // put it down

    make Reeborg complete at least one delivery. Pay attention to the two
    instructions written above and make sure, when you need to use them, to
    write them exactly the same way.

.. important::

   Save your program; you will come back and use it again soon.

At this point , it may appear impossible to write a single program that
could handle both deliveries. However, you will soon find out how to do so.

