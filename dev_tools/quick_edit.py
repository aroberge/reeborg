r'''This facilitates editing world editor contents without having to use
Reeborg's world.

Since json does not support multiline strings, when worlds are saved, 
the content of editors is saved into an array
whose content is individual lines without \n; when worlds are retrieved,
the content is recreated by joining the lines.
[Without doing this, the entire content of an editor would be in
a single string, making it near-impossible to edit using traditional tools.]

This program allows to do essentially the same. One can paste an array
containing lines of text, have it join them into a single string with
\n added back, for easier editing, and recreate the array when done.
'''

import tkinter
from tkinter import scrolledtext, messagebox, Menu

root = tkinter.Tk(className="Split-join editor")
editor = scrolledtext.ScrolledText(root, width=100, height=60)

def about():
    label = messagebox.showinfo("About", __doc__)

def split():
    content = editor.get("1.0", "end")  # 1.0 = row.column format (tkinter)
    content = content.split("\n")
    new_content = "[\n"
    for item in content:
        if item:
            new_content += '"' + str(item) + '",\n'
    new_content = new_content[:-2] + "\n]"  # drop last comma
    editor.delete("1.0", "end")
    editor.insert("1.0", new_content)

def join():
    content = eval(editor.get("1.0", "end"))
    content = "\n".join(content)
    editor.delete("1.0", "end")
    editor.insert("1.0", content)

menu = Menu(root)
root.config(menu=menu)
commands_menu = Menu(menu)

menu.add_cascade(label="Commands", menu=commands_menu)
commands_menu.add_command(label="Split", command=split)
commands_menu.add_command(label="Join", command=join)

help_menu = Menu(menu)
menu.add_cascade(label="Help", menu=help_menu)
help_menu.add_command(label="About...", command=about)


editor.pack()
root.mainloop()
