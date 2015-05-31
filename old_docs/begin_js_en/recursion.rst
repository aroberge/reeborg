
Recursion
=========

If you look up on the Internet for a definition of recursion, you will
often see something like the following:

**Recursion**
    See recursion.

This is wrong, wrong, *wrong*, **wrong** .... WRONG!

If you were a computer program, trying to parse the above definition,
you would get stuck in an infinite loop. Since you are reading this, it
means that either you did not behave like a computer and got stuck in an
infinite loop OR that you did not read everything here and, in
particular, skipped over the above definition.

Recursion is sometimes described as being difficult to grasp. Do not
believe this. If you understand loops, you can understand recursion.

So, what is recursion you ask?...

Recursion is the process of repeating items in a self-similar way. For
computer programs, it means repeating instructions - like in a loop.
And, like in a loop, we do not want to get stuck forever.

The simplest example is that of a single recursive function, that is a
function that calls itself.::

    function recursive(){
        if (!completed_task()){
            ...
            recursive();  // the same function is called ...
        }

Let's consider a real program for Reeborg to execute. 

.. topic:: Try this!

    Select **Home 1** and have Reeborg do the following::

        function go_home(){
            if (!at_goal()) {
                move()
                go_home();
            }
        }

        // now do it!
        go_home();

Once you have tried the above and tried to understood it, go to the
next lesson where we will review it and consider a slightly trickier example.


