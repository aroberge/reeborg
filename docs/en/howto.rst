Special features
================



Easy world creation
-------------------

explain.

Creation of Test-Driven Learning tasks
**************************************

Related to Easy world creation; include as subtopic?


Ability to incorporate pre- and post-code
******************************************

explain and refer to teacher's blurb for more info.



Worlds with random number and/or position of elements
******************************************************

Library
-------

explain

Easy collaboration with TogetherJS
----------------------------------

explain

Sharing of programs with permalinks
-----------------------------------

explain other means as well (saving files)

Web version with access to vast standard library
-------------------------------------------------

explain, and perhaps use the JSON example

Easy progression from simple function to OOP
--------------------------------------------

Give examples

Possibility to write programs using different languages
-------------------------------------------------------

Support for Python, Javascript and CoffeeScript.  Other languages
could be supported as well if they have a javascript transpiler.

Easy support for multiple human languages
-----------------------------------------

Mention also Guido van Robot

Possibility to integrate within a Learning Management System
------------------------------------------------------------

One teacher in Lithuania has made Reeborg's World accessible within Moodle
for students tasks that are then marked automatically.  Ideally, such use
should be made with local copies of Reeborg's World.



Changing the User Interface
---------------------------

If you know Javascript, html and css, and possibly how to use the jQuery library,
you can customize the look of Reeborg's World by running code
with a specially crafted permalink; the changes made will
remain until the site is reloaded.  For example,
if you run the program::

    Permalink("simple_ui")

almost every item menu from the top bar will be removed with
the exclusion of "Help" and "World info".  You simply have to run
the program::

    Permalink("normal_ui")

to recover the normal User Interface.

If you want to make your own changes, you might want to
open Reeborg's World into a separate tab and enable the javascript console.
Then, use Javascript/jQuery commands in the console to change the UI as desired.
Copy **all** of your required code (not forgetting semi-colons...) into the textarea below.

For example, suppose you wanted to hide the choice of programming
language selection; you could do so using the following jQuery code:

..code-block:: javascript

    $("#header-child form").hide();

You can use the above as an example and copy it into the textarea below
and then click the "Create permalink code" button; the result will
appear below the button.  Note that you need to create all the UI
changes into a single conversion.  Once you have the result, copy it
and *append it* to a "normal" permalink created within Reeborg's
World; your new permalink, when used to update Reeborg's world,
will make the required changes to the UI.


.. raw:: html
   :file: css_mod.html

If you need help with making changes to the User Interface, please do not hesitate to contact me.



