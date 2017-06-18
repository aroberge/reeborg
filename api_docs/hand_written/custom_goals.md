Using the graphical world editor, you can specify various goal, such as
a desired final position.  Using some programming methods, it is possible
to add to these goals.  In this section, we see a basic example.

If you have Reeborg's World loaded in your browser, run the following program:
```
World("worlds/examples/simple_path.json", "path")
```

Otherwise, you can simply click on the link below which will load the exact same world:

[http://reeborg.ca/reeborg.html?lang=en&mode=python&url=worlds/examples/simple_path.json&name=path](http://reeborg.ca/reeborg.html?lang=en&mode=python&url=worlds/examples/simple_path.json&name=path)

After the new world is loaded, if you click on **World Info**,

![world_info][world_info]

[world_info]: ../../src/images/world_info.png


you will see something like the following

![simple_path1][simple_path1]

[simple_path1]: ../../src/images/simple_path1.png

where the path shown is actually this animated gif

![simple_path][simple_path]

[simple_path]: ../../src/images/simple_path.gif

So, the goal is not only to reach a set final position, but to do so
following a known path.

Before going further, you may want to write test programs that reach the required destination with or without following the instructions.
Note that this example will only work if you use Python for your program,
using either the editor, the Blockly interface or the Python REPL.
[_In fact, if you try to change the programming mode to Javascript, you will
see that it changes back automatically the Python default. **Try it.**_]

As an example, you could try to "cheat" and reach the final position
following a different path:

```python
for i in range(9):
    move()
turn_left()
move()
move()
#done()

```

Try it, both as is and by uncommenting the `done()` instruction which,
according to the instructions given, you are not allowed to use.

## Explanation

After having tried the above, you may want to load the following world:

```
World("worlds/examples/simple_path_explain.json")
```

If you then click on **World Info**, you will see something that looks
somewhat similar to the following image.

![simple_path2][simple_path2]

[simple_path2]: ../../src/images/simple_path_explain.png

The text on the image above is likely to small to read; furthermore, the
world has changed since the above image has been created; clicking on
**World Info** will always show up to date information for this world.

### A closer look

Before going further, if you have not already done so, you might want to
read {@tutorial editors} and come back here afterwards.


The content of the **Description** editor (shortened to **Desc.** on the editor tab) is what is shown at the top of the **World Info** window.
In the case of the second example we have shown, here was the content of that editor
when this document was written.

```xml
Have Reeborg follow the gravel path as indicated.
<br><img src='src/images/simple_path.gif'><br>
Note that you are not allowed to use
<code>done()</code> to end the execution of your program.
<br>

<h3>Explanation</h3>

This world contains some Python code.
To ensure that the proper mode is selected, the onload editor
contains the following code:

INSERT_ONLOAD

To ensure that the correct path is followed, we have
the following code in the pre editor
INSERT_PRE
running before the user's program, and the code
INSERT_POST
running after the user's program.
```

The important thing to note here are the strings `INSERT_ONLOAD`, `INSERT_PRE` and `INSERT_POST`
which are replaced by the content of the various editors.


## Important consideration

When you design a custom goal, like we do here with the verification
in the **Post** editor that the correct path has been followed,
it is important to prevent the students to use `done()`, otherwise the
code in the **Post** editor could be bypassed and, as long as Reeborg
ends up at the desired final position, the goal would have been
determined to be accomplished.  For example, try the following:

```python
for i in range(9):
    move()
turn_left()
move()
move()
RUR._done_()  ## cheating!!
```

If you have read carefully the content of the **Pre** editor for
the `simple_path_explain` world, you might have been able to
guess that using `RUR._done_()` was a way to cheat for this world.
