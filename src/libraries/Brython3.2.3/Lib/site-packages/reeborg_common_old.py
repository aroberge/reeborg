from browser import window

class ReeborgError(Exception):
    def __init__(self, value):
        self.reeborg_shouts = value

    def __str__(self):
        return repr(self.reeborg_shouts)

window['ReeborgError'] = ReeborgError

# simple help replacement as it is not working correctly imo
def Help(obj=None):
    '''Usage: help(obj)'''
    if obj is None:
        print(Help.__doc__)
        return
    out = []
    try:
        out.append("<h2>{}</h2>".format(obj.__name__))
        if hasattr(obj, "__doc__"):
            out.append("<p>{}</p>".format(obj.__doc__))
        else:
            out.append("<p>No docstring found.</p>")
    except:
        pass

    for attr in dir(obj):
        if attr == "__class__":
            continue
        if hasattr(getattr(obj, attr), "__doc__"):
            if getattr(obj, attr).__doc__:
                out.append("<h3>{}</h3>".format(attr))
                doc = "<p>{}</p>".format(getattr(obj, attr).__doc__)
                out.append(doc.replace("\n", "<br>"))
    if not out:
        raise ReeborgError("This object has no docstring.")
    else:
        window.narration("".join(out))
window['Help'] = Help


def dir_py(obj):
    '''Prints all "public" attributes of an object, one per line, identifying
       which ones are callable by appending parentheses to their name.'''
    out = []
    for attr in dir(obj):
        try:
            if not attr.startswith("__"):
                if callable(getattr(obj, attr)):
                    out.append(attr+"()")
                else:
                    out.append(attr)
        except AttributeError:  # javascript extension, as in supplant()
            pass                # string prototype extension, can cause problems
    print("\n".join(out))
window['dir_py'] = dir_py
