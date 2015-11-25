import sys
from browser import window
from highlight import insert_highlight_info
from preprocess import transform


def _write(data):
    window.RUR.control._write(str(data))


def __write(data):
    window.RUR.control.write(str(data))


def __write_err(data):
    window.RUR.control.write("<b style='color:red'>" + str(data) + "</b>")

sys.stdout.write = __write
sys.stderr.write = __write_err


def Help(obj=None):
    '''Usage: help(obj)'''   # yes: lowercase!!!
    if obj is None:
        print(Help.__doc__)
        return
    out = []
    try:
        out.append("<h2>{}</h2>".format(obj.__name__))
        if hasattr(obj, "__doc__"):
            doc = "<p>{}</p>".format(str(obj.__doc__))
            out.append(doc.replace("\n", "<br>"))
        else:
            out.append("<p>No docstring found.</p>")
    except Exception as e:
        window.console.log("exception in Help", e.__name__)

    for attr in dir(obj):
        if attr == "__class__":
            continue
        if hasattr(getattr(obj, attr), "__doc__"):
            if getattr(obj, attr).__doc__:
                out.append("<h3>{}</h3>".format(attr))
                doc = "<p>{}</p>".format(getattr(obj, attr).__doc__)
                out.append(doc.replace("\n", "<br>"))
    if not out:
        raise AttributeError("This object has no docstring.")
    else:
        window.narration("".join(out))


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


def generic_translate_python(src, lib, lang_import, highlight,
                             pre_code='', post_code=''):
    ''' Translate Python code into Javascript and execute

        src: source code in editor
        lib: string - language specific lib (e.g. "library" in English, "biblio" in French)
             already imported in html file
        lang_import: something like "from reeborg_en import *"
    '''
    if lib in sys.modules:
        del sys.modules[lib]

    globals_ = {}
    globals_.update(globals())
    globals_['dir_py'] = dir_py
    globals_['Help'] = Help

    src = transform(src)
    exec(lang_import, globals_)

    if highlight:
        temp_src, problem = insert_highlight_info(src)
        if not problem:
            src = temp_src
        else:
            exec("RUR.ui.highlight('{}')".format(problem), globals_)
            window.jQuery("#highlight-impossible").show()
    if hasattr(window.RUR, "__debug"):
        window.console.log("processed source:")
        window.console.log(src)

    src = "help=Help\n" + pre_code + "\n" + src + "\n" + post_code
    exec(src, globals_)
