Darn bugs!
==========

Nobody likes to talk about computer bugs. But, unfortunately, you must
learn about them and, especially, how to get rid of them.

What is a bug?
--------------

The origin of the word **bug** in computer jargon is often attributed to
an actual incident where a moth was found inside Harvard University's
Mark II computer; apparently this moth had caused the computer to stop
working. It was found by the team headed by renowned computer scientist,
mathematician, and young naval officer Grace Murray Hopper, who went on
to invent the concept of compiler languages in computer programming. Dr.
Grace Hopper eventually rose in the U.S. naval hierarchy to the rank of
Rear Admiral.

The moth was preserved, taped into Hopper's log book, as shown below.
Interestingly, the log book included a note saying, "First actual case
of bug being found." as you can see.

|image0|

Picture adapted from the public archive of the `U.S. Naval Historical Center 
<http://www.history.navy.mil/photos/pers-us/uspers-h/g-hoppr.htm>`__
                                                                                                                                                 

Actually, the word bug in a technological context is attributed by the
Oxford English Dictionary to Thomas Edison. According to the Oxford
Dictionary, the following text can apparently be found in the March 11,
1889 edition of the Pall Mall Gazette:

    Mr. Edison, I was informed, had been up the two previous nights
    discovering 'a bug' in his phonograph - an expression for solving a
    difficulty, and implying that some imaginary insect has secreted
    itself inside and is causing all the trouble.

It thus appears that the original 'bug', though it was indeed an insect,
was in fact imaginary.

Unfortunately, computer bugs, while they are not insects, are also not
imaginary.

Dealing with bugs
-----------------

In computer jargon, a bug is an error that causes a program to behave in
an unexpected way. If you are writing computer programs, you are going
to have bugs in them sooner or later - everybody does. Good programmers
seek to "remove" bugs or "fix" them as soon as they find that their
program behaves unexpectedly.

Not so good programmers state that "bugs" are not really bugs but that
they are "features" of their programs. **You** are going to be a good
programmer, unlike the maker of Reeborg, whose program is littered with
bugs.

#. Reeborg has an oil leak. Oil leaks are damaging for the environment
   and inconvenient for Reeborg who must replenish its supplies when
   it's not busy accomplishing tasks. The maker of Reeborg claims that
   it is a feature, as it enables you to follow Reeborg's path, just
   like any programmer can learn to "trace" a program. You will learn
   how to fix Reeborg's leak later. More advanced techniques to trace bugs, 
   like using what is known as a *debugger*,
   are beyond the scope of these lessons.
#. Reeborg's steering mechanism is not handled properly by Reeborg's
   program: it can only turn left. The maker of Reeborg, once again,
   claims that this is a feature as it present you with an opportunity
   to learn about functions. Reeborg disagrees. You will soon learn how
   to program a *workaround solution*, enabling Reeborg to turn right,
   although in a wasteful fashion. Much later, you will learn how to
   truly fix Reeborg so that it can turn right just as easily as it can
   turn left.
#. Reeborg has a compass, enabling him to determine which direction he
   is facing. Unfortunately, yet again, the program that enables Reeborg
   to get the information from the compass has a bug: it only tells
   Reeborg if he is facing North ... or not. Once again, you will first
   learn how to implement a workaround solution and later how to fix
   permanently Reeborg and get rid of what its maker calls a "feature".
#. Reeborg can see if a wall is in front of him, and can also turn its
   head to the right to see if there is a wall there. However, a
   software "glitch" (which is another weasel term that software
   manufacturers use to avoid having to say that their product has a
   bug) prevents Reeborg's program from properly registering a wall when
   it turns its head left.

Sometimes to find the cause of bugs, it can help to break the normal
flow of the program. To this end you may do one or more of the
following:

#. You can *pause* a program as it is running by pressing the **pause**
   button. This is similar to what people refer to as
   setting a *breakpoint* in a computer program
#. Instead of actually pressing the pause button, you can type in the
   instruction ``pause();`` at any point inside a program and Reeborg
   will pause, awaiting your permission to continue.
#. You can *step through* a program, one instruction at a time, by
   pressing the *execute one instruction and pause*, or **step** button.
#. You can change the speed of execution at any point inside a program;
   I will explain how you can do this later.
#. You can have Reeborg write some information at any given point inside
   a program; again, I will explain how you can do this later.
#. At the top of Reeborg's world appears some information about the position and
   number of tokens (to be explained later) carried by the first few
   robots in the world (yes, you can have multiple robots...).
#. Finally, you can stop a program at any point by pressing the **stop**
   button; this unfortunately may not work if you create
   what is known as an infinite loop, outside of Reeborg's control. If
   worse comes to worst, you can always just reload the web page.

.. |image0| image:: ../../src/images/first_bug.jpg
