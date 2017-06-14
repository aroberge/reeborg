When programming using Javascript, only a single editor is shown.
When programming using Python, two editors are shown: a **Python Code**
editor, and a **library** editor, each shown in its own tab.  There are also
four more editors available, each intended for a specific purpose.
When programming using Python, if you change the mode to edit the world,
you will see the following:
![editors][editors]

[editors]: ../../src/images/editors.png

When creating a world, it is possible to save it with some content included
for each of these editors.  For example, here's what it might look like
if we wanted to include the content of 4 of these editors in a world definition.

![editors2][editors2]

[editors2]: ../../src/images/editors2.png

Below we explain the purpose of each of these editors.

## The Python or Javascript code editor

This editor is where a user enters a program to be executed.

As you might see if you try to load some of the examples world provided
in this documentation, it is possible to include the content of this editor
as part of a world definition. When this is the case, and the content of
the editor differs from what is currently found in the editor, the user
is asked to confirm that the content of the editor is to be replaced.

When a program is run without syntax errors, the content of this editor
is saved in the browser's local storage, so that it can be "remembered"
when a new browser session is started.

Below, we refer to this editor as the **main editor**.

## the library editor

The purpose of this editor is to provide an opportunity to learn about
Python's `import` statement, and realise that a library "module" is just
a regular program.  It is also a useful place for a beginner to save
some commonly used function.

The name `library` is in lower case, reflecting its use in a Python program
as in
```python
import library
from library import turn_right
```
In French, `biblio` is used instead, as shown in the editor tab when
using that language for the user interface.

Like for the main editor,
it is possible to include the content of the library editor
as part of a world definition. When this is the case, and the content of
the editor differs from what is currently found in the editor, the user
is asked to confirm that the content of the editor is to be replaced.

When a program is run without syntax errors, the content of this editor
is saved in the browser's local storage, so that it can be "remembered"
when a new browser session is started.

## The Pre editor

This editor can contain code (in the same language as the code in the
main editor) that is to be run together with the user's program.

Before a program (entered in the Python Code editor) is run,
it is concatenated with the code found in the **Pre** editor,
followed by the code found in the **Post** editor.
[_For Python, there is additional processing of the code done so that lines
about to be executed can be highlighted in the editor,
and to allow the variable "watch"._]
This additional code can be used to add additional requirements for a task
which could not be done using the
menu-driven World editor.

## The Post editor

See the **Pre editor**.

## The Description (desc) editor

The Description editor is intended to provide some explanation for a
given world, like a task to be accomplished. The content of this editor
is assumed to be some html code.

The processed content of this editor can be viewed by the user when they
click on the **World info** button.

After the new world is loaded, if you click on **World Info**,

![world_info][world_info]

[world_info]: ../../src/images/world_info.png

You can automatically include in this editor the content of the
Pre, Post, or Onload editor by inserting respectively the string

INSERT\_PRE, INSERT\_POST, or INSERT_ONLOAD.

An example of this is provided if you load a world using
the following instruction:

```
World("worlds/examples/simple_path_explain.json", "path_explain")
```

and then click on the **World Info** button.

### Even more info

Let's assume that you have clicked (once) on the **World Info** button so
that the window/dialog is showing.  If you click on a grid square in the
world, you might see some additional info specific to that location
appearing at the bottom of the world info window/dialog.  For example,
with the `"path_explain"` world mentioned above, if you click on a grid square,
you should at the very least get the information about which type of
background (grass or gravel) is present at that location.

## The Onload editor

The content of this editor **must** be some Javascript code.
Whenever a world is loaded, or reloaded, this code is executed
using Javascript's `eval()`.  This can be used to specify which
programming language or programming mode must be used for a given world,
as well as for dynamically creating world features, including new objects
represented by custom images.
