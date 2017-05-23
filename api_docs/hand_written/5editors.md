We have seen previously how clicking on the **World Info** button would open a dialog window giving us information about the content of a world.

If you have Reeborg's World loaded in your browser, run the following program:
```
World("worlds/examples/simple_path.json", "path")
```

Otherwise, you can simply click on the link below which will load the exact same world:

[http://reeborg.ca/reeborg.html?lang=en&mode=python&url=worlds/examples/simple_path.json&name=path](http://reeborg.ca/reeborg.html?lang=en&mode=python&url=worlds/examples/simple_path.json&name=path)

If you click on **World Info**, you will see something like the following

![simple_path1][simple_path1]

[simple_path1]: ../../src/images/simple_path1.png

where the path shown is actually this animated gif

![simple_path][simple_path]

[simple_path]: ../../src/images/simple_path.gif

Before going further, you may want to write test programs that reach the required destination with or without following the instructions. Note that this example will only work if you use Python for your program.

## A second look

After having looked at the above, load the following world:

```
World("worlds/examples/simple_path1.json", "path1")
```

Make sure to include the **1** in the url (and the name _path1_, although that is less important).  If you then click on **World Info**, you will see something like

![simple_path2][simple_path2]

[simple_path2]: ../../src/images/simple_path2.png

where we have only shown part of the contents. If you read the code included in the description, you will see how we have redefined `move` prior to having the user's code being executed and, after the user's code has been executed, compare the path followed with a hard-coded path.

## A closer look

If we change the mode to edit the world, we see the following:
![editors][editors]

[editors]: ../../src/images/editors.png

Insted of just two editor (Python code, and Library), we now have 6 editors. Furthermore, the World editor dialog indicates that the content of 3 of these editors is included in this world definition.

![editors2][editors2]

[editors2]: ../../src/images/editors2.png

The content of the **Description** editor (shortened to **Desc.** on the editor tab) is what is shown at the top of the **World Info** window. In the case of the second example we have shown, here is the content of that editor:

```html
Have Reeborg follow the gravel path as indicated.<br>
<img src='src/images/simple_path.gif'.<br>

<h3>Explanation</h3>

To ensure that the correct path is followed, we have
the following code
INSERT_PRE
running before the user's program, and the code
INSERT_POST
running after.
```

Before the content is shown, the string `INSERT_PRE` is replaced by the content of the "Pre" editor, and similarly for `INSERT_POST`. (There is a third possibility, which is `INSERT_ONLOAD`, which was not used in this example since that editor contained no code for this particular world.)

Using the **Description** makes it possible for a student to read details about the task to accomplish without having to refer to a document (e.g. tutorial) found elsewhere.

Before a program (entered in the Python Code editor) is run, it is concatenated with the code found in the **Pre** editor, followed by the code found in the **Post** editor.  [_For Python, there is additional processing of the code done so that lines about to be executed can be highlighted in the editor, and to allow the variable "watch"._]  This can be used to add additional requirements for a task (like it was done in this example) which could not be done using the menu-driven editor. It can also be used to modify the interactions with the world as we will see later.

## The Onload editor

When a world is loaded, any **Javascript** code found in the **Onload** editor will be executed using `eval()`.
[This editor cannot contain Python code.]
This makes it possible to modify Reeborg's World in many ways, from adding new objects and other artefacts, to changing the image used for the robot, and many more changes including possibly hiding some elements (e.g. various buttons used to activate dialogs) and simplify the user interface.
We will see later a few examples showing the usefulness of this editor.