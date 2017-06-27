To take full advantage of this documentation, you should be familiar
with Reeborg's World, having written programs to solve various programming
"puzzles", preferably using Python.  Ideally, you should have already used
the graphical world editor to create your own worlds.

## How?

You should start by reading {@tutorial getting_started} and
possibly {@tutorial editors}.  After doing this, and if you had already
created worlds before reading this documentation, you might be able
to read the various sections in almost any order. The topics covered in
{@tutorial getting_started} include
  - Using the menu-driven world editor
  - Creating a world using programming methods
  - {@link RUR#add_wall} and {@link RUR#add_final_position}


You may have noticed that this documentation does **not** include a list
of available commands for Reeborg, such as `move()`, `put()`,
`set_trace_style()`, etc.  {@tutorial naming_convention}
explains how to do this, after going through a brief explanation of
the basic naming convention followed for some functions described
in the rest of this documentation. Note that the `help()` function mentioned
as available from the Python REPL can also be used in a program
written in the code editor. The topics covered include
  - Basic naming convention (`is_TYPE`, `add_TYPE` and `remove_TYPE`).
  - Find available "things" using {@link RUR#show_all_things}
  - Find documentation on robot commands using the Python REPL and `help()`.

Using the menu-driven world editor, it is easy to add objects and specify
goals for Reeborg. {@tutorial objects} explains how to do the same thing
using the advanced programming interface. You need to know how to do
this if you want to learn to add your own objects later on.
The topics covered include
  - Adding a number of objects at a location, or adding a wall
  - Adding objects or walls as goal
  - Configuration helper for colour blind users
  - {@link RUR#add_object}, {@link RUR#add_wall} and {@link RUR#configure_red_green}

Using the menu-driven world editor, some dialogs give you the possibility
to specify random values, such as a range of objects possibly found
at a given location, or random selection of initial or final position
for Reeborg. You can find out how to do the same using the programming
interface by reading {@tutorial random}.

Adding some graphical elements such as background tiles and decorative
objects can be used to make more interesting looking worlds. You likely already
know how to do this using the menu-driven world editor. It is
possible to do the same as explained in {@tutorial background}.

### More advanced

So far, essentially all the examples we have shown could have been created
using the menu-driven world editor. For many of the examples provided below,
this will be no longer the case.

In {@tutorial custom_goals}, we show how to create a world which requires
Reeborg to follow a pre-determined path, and give feedback to the user as
to whether or not the task has been accomplished.

Sometimes, it is useful to provide a picture showing the desired
solution, but without giving too many hints as to how it can be
accomplished. One way to do so is explained in {@tutorial show_path}.

{@tutorial animated} needs some explanation and at least one more tutorial
introducing animation before.

## Why?

You might have some question as to why I make certain suggestions,
or as to the reasoning behind some design decisions.

{@tutorial motivation}

Perhaps you tried to have Reeborg writing some html code (using
`print_html`) containing some non-breaking spaces inserted explicitly ...
and found that it did not work as intended. If so, read {@tutorial nobreak}

## Reference type documents

With many different possible types of "objects" that need to be drawn
(background tiles, goals, decorative objects, objects that can be picked up, robots, etc.),
it has been found useful to use multiple canvases for each type of objects,
with each canvas sitting at a certain "depth",
thus ensuring that objects that are drawn on a given canvas appear on top of objects drawn on canvases "below".
This has also made it possible to create interactions with different "classes" of objects in a predictable way.
{@tutorial canvases} provides more details about the layered canvas structure used.
