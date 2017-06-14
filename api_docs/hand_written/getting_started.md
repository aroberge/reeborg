While the menu driven *World editor* dialog makes it possible to create
your own worlds, it is limited to create worlds with pre-defined objects.  Furthermore, it
creates static worlds which are then interacted with through a user's program.
A world creator may wish to introduce additional interactivity by changing
the state of the world when a user's program has achieved a partial goal,
like reaching a pre-defined position.  The functions documented here are
intended to give world creators all the flexibility they need to create
their own worlds.

In this very short tutorial, you will first create and save a "world" using
the menu driven *World editing dialog* and then create the same "world"
running a program that makes use of available methods instead.
Finally, we will show how to dynamically create a similar "world"
using the **Onload editor**.
It is important that you do this so that you can understand the more
complex examples provided elsewhere in this documentation.


## Menu-driven World editor _vs_ Programming methods.

In what follows, I will show you how to create a world first using the Menu-driven editor,
and then using Javascript/Python methods.
An animated gif is shown, illustrating the result at each step.
Note that, as Reeborg's World changes, the interface may look a bit different from what you will see on these images.
If you find the difference too important to follow with the new interface, please contact me and
I will update this documentation.

If you want, you can right-click on each image to open it in another tab and view it at a larger scale.


### Using the World editor

Let's create a simple world, with Reeborg already in it, and have three walls surround the home location which Reeborg would have to reach to complete the programming task.

1. Start with a simple world with Reeborg already in it; the world **Alone** appearing first in the menu is the recommended choice.
2. Navigate the menus to open the Menu-driven World editor; note how the appearance of the world changes, indicating we are in "edit mode".
3. Use the menu to add 3 walls an set a location as the final desired position.
4. Save the world in the browser (local storage).
5. Dismiss the World editor; note how the world's appearance changes back to its normal state.
6. By saving it in the browser, the world has been added to the html selector; worlds stored in the browser appear with a pale yellow background in the html selector.
7. (not shown on image) Save the world in a .json file.

![editor][editor_link]

[editor_link]: ../../src/images/create_world.gif

### Using the Javascript methods

Let's reproduce the same world using the Javascript methods instead.
In the animated gif, I have run these as instructions in a Python program instead of a Javascript one.

1. Start again with the same simple world with Reeborg already in it.
2. Enter the program required to create the 3 walls and the final position for Reeborg to reach.
```
RUR.add_wall("east", 4, 2)
RUR.add_wall("north", 4, 2)
RUR.add_wall("west", 4, 2)
RUR.add_final_position("house", 4, 2)
```
3. Run the program. Note how the various "things" are added ... and how we get an error dialog at the end indicating that Reeborg has **not** accomplished the required task. Do not reload the world.
4. Navigate the menus to open the World editor.
   - Note how the world we saved previously is mentioned, with a button allowing us to delete it from the browser's memory (local storage) if we wish.
5. Save the world in the browser, and dismiss the World edit window.
6. Like before, by saving it in the browser, the world has now been added to the html selector.
7. (not shown on image) Save the world in a .json file, with a different
name as the previous one.

![methods][methods_link]

[methods_link]: ../../src/images/create_world2.gif

#### Compare the worlds

You should have two differently named world (.json) files. Their contents
should be identical.  You should confirm this using a "diff" program
on your computer, or an online tool,
such as [https://www.diffchecker.com/](https://www.diffchecker.com/).


### Dynamically create the world

Before reading this section, you might want to make a small detour
and read the brief tutorial {@tutorial editors}.

1. Start again with the same simple world with Reeborg already in it.
2. Select the **Onload editor**. You may have to move some dialogs/windows
   around the screen, and possibly minimize them.
3. Enter the following code in the Onload editor
```
RUR.add_wall("east", 4, 2)
RUR.add_wall("north", 4, 2)
RUR.add_wall("west", 4, 2)
RUR.add_final_position("house", 4, 2)
```
   You do not need to execute this code. The content of the Onload editor is
   automatically executed whenever a world is loaded or reloaded.
4. Make sure that the option to save the content of the Onload editor
   is selected, and save the world in the browser.
5. Like in the previous cases, by saving it in the browser, the world has now been added to the html selector.
6. [optional] Save the world in a .json file, with a different
name as the previous ones.


If you switch between each of the three worlds you have saved in your browser,
they should all look the same, no matter which method was used to create it.

# Next

The following links to another tutorial {@tutorial objects}.
