Using the graphical world editor, you can specify various goal, such as
a desired final position.  Using some programming methods, it is possible
to add to these goals.

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
World("worlds/examples/simple_path_explain.json", "path_explain")
```

If you then click on **World Info**, you will see something like

![simple_path2][simple_path2]

[simple_path2]: ../../src/images/simple_path_explain.png

The text on the image above is likely to small to read; furthermore, it has
been changed slightly since the above image has been created; clicking on
**World Info** will always show up to date information for this world.

### A closer look

If we change the mode to edit the world, we see the following:
![editors][editors]

[editors]: ../../src/images/editors.png

Insted of just two editor (Python code, and Library), we now have 6 editors. Furthermore, the World editor dialog indicates that the content of 4 of these editors is included in this world definition.

![editors2][editors2]

[editors2]: ../../src/images/editors2.png

The content of the **Description** editor (shortened to **Desc.** on the editor tab) is what is shown at the top of the **World Info** window. In the case of the second example we have shown, here is the content of that editor:

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

Before the content is shown, the string `INSERT_ONLOAD` is replaced by the content of the "Onload" editor, and similarly for `INSERT_PRE` and `INSERT_POST`.

Using the **Description editor** makes it possible to tell students about
the details of a given task to accomplish without having to refer them
to a separate document (e.g. tutorial) found elsewhere.

### The Onload editor

By either looking at the window for the World Info, or at the Onload editor
itself, we can see that the content of the Onload editor is the following
[at least when this documentation was written]:
```javascript
// Since Python code is included in the
// pre and post editors, we need to ensure
// that Python is set as the programming language.
if (!(RUR.state.input_method == "py-repl" ||
    RUR.state.input_method == "python" ||
    RUR.state.input_method == "blockly-py")) {
    RUR.onload_set_programming_mode("python");
}

```
The content of this editor **must** be some Javascript code.
Whenever a world is loaded, or reloaded, this code is executed
using Javascript's `eval()`.  In this example, we use the content
of this editor to ensure that the programming mode is set to allow
Python code.

### The Pre editor

The content of the Pre editor is the following Python code:
```python
def done():
    '''Prevents the user from avoiding the test run in the
       post-code editor.'''
    raise ReeborgError("You are not allowed to use done().")

_path_followed = []
_old_move = move

def move():
    reeborg = default_robot()
    _old_move()
    _path_followed.append((reeborg.body.x, reeborg.body.y))

```

By redefining `done()`, we prevent the user from terminating the program
immediately after Reeborg reaches its final destination; this ensures that
the code in the "Post" editor will be evaluated.


We have also redefined `move` prior to having the user's code
being executed and, after the user's code has been executed,
so as to record the path followed and eventually
compare it with a hard-coded path.

Before a program (entered in the Python Code editor) is run,
it is concatenated with the code found in the **Pre** editor,
followed by the code found in the **Post** editor.
[_For Python, there is additional processing of the code done so that lines
about to be executed can be highlighted in the editor,
and to allow the variable "watch"._]
This additional code can be used to add additional requirements for a task
(like it was done in this example) which could not be done using the
menu-driven World editor.

### The Post editor

The content of the Post editor is as follows:
```python
_desired_path = [
    (2,1), (3,1), (4,1), (5,1),
    (6,1), (6,2), (6,3), (6,4),
    (6,5), (5,5), (4,5), (4,4), (4,3),
    (5,3), (6,3), (7,3), (8,3), (9,3), (10,3)]

if _desired_path != _path_followed:
    raise ReeborgError("Desired path not followed!")

```
If no error is raised, the normal goal evaluation to see if the final (goal)
position has been reached, and the appropriate dialog is shown.
