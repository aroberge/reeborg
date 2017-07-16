Below is a list of example worlds with an ultra-brief summary of what
they illustrate, together with the command you need to execute to
load the world, so that you can simply copy, paste into the editor (or the REPL)
and run the program. In all cases, after loading the world, you should
click on **World Info** to see more details.

Note: if you copy the code `World(...)` in the Python or Javascript editor
and run it, only the content of the Onload editor will be excuted
when (re)loading the world.  To see the effect of any code in the Pre editor,
you will then need to click on the "run" button.

By contrast, if you copy the code `World(...)` as a line in the Python REPL,
both the content of the Onload editor **and** that of the Pre editor will
be executed.  The reason for this is that there would be otherwise no reasonable way
for you to execute the content of the Pre editor.


### add_remove_is_get.json

This world shows how to add and remove different type of "things",
and use `assert` statements to show what the output from
`is_X` and `get_Y` would be.

    World("worlds/examples/add_remove_is_get.json", "Artefacts")

You might want to add a `pause()` instruction in the editor prior to
running the code, so that you can see more clearly what happens.

### animated_all.json

This world shows the 5 different ways one can animate an image (background tile,
object, etc., but not robot). This example is written using Javascript, but
can easily be reproduced in Python.

    World("worlds/examples/animated_all.json", "Animated")

### colors.json

This world shows the different syntax that can be used to indicate a color
(name, rgb, rgba, hsl, hsla, #-notation). It also illustrates the use
of simpler commands like `paint_square()` and `color_here()` which could
be useful in end-user's programs.

    World("worlds/examples/colors.json", "Colors")

### protection_bridge.json, protection_objects.json and protection_example.json

Bridges can protect from otherwise fatal background tiles. Similarly,
objects carried can sometimes protect against fatal background tiles and
fatal obstacles: this is illustrated in the following two worlds.

    World("worlds/examples/protection_bridge.json", "Protection: bridge")

    World("worlds/examples/protection_objects.json", "Protection: objects")

For the second example, make sure to read the code in the **World Info**
so that you can add some appropriate code in the editor to see the
result.

Finally, for perhaps a more realistic example, have a look at

    World("worlds/examples/protection_example.json", "Protection: example")

This last world was saved with some code in the editor which is shown
in the **World Info** by writing INSERT_EDITOR in the description editor.

### simple_path.json, simple_path_explained.json and simple_path_grid.json

simple\_path.json shows a world that could be given to a student as a simple
programming task; the content of **World Info** is limited to what is needed
by the student.

By contrast, the content of **World Info** simple\_path\_explained.json includes
the code explaining 1) how `move` is redefined to keep track of the path followed,
2) how `done` is redefined to prevent the user from ending a program before
the code in the Post editor is run and 3) how a custom test is added
in the Post editor to verify that the desired path has been followed.

    World("worlds/examples/simple_path.json", "Simple path")

    World("worlds/examples/simple_path_explained.json", "Simple path explained")

Finally, beginners may find it difficult not to see the grid which is hidden
by the background tiles.  We can change a settings to show the grid as
illustrated in simple\_path\_grid.json.

    World("worlds/examples/simple_path_grid.json", "Simple path with grid")

### boring_path.json and nice_path.json

boring\_path.json shows a basic world with the "look and feel" of a traditional
"Karel the robot" presentation. nice\_path.json shows a world that is functionally
identical, but that looks very different.

    World("worlds/examples/boring_path.json", "Boring path")
    World("worlds/examples/nice_path.json", "Nice path")

Like was done for `simple_path_grid.json`, with `nice_path.json`
one could set `RUR.state.visible_grid` to `True` to show the grid.