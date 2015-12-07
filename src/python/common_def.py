import sys
from browser import window
from highlight import insert_highlight_info
from preprocess import transform


def _write(data):
    window.RUR.output._write(str(data))


def __write(data):
    window.RUR.output.write(str(data))


def __write_err(data):
    window.RUR.output._write("<b style='color:red'>" + str(data) + "</b>")


previous_watch_values = {}


def filter_user_vars(variables, system_default_vars):
    return variables - system_default_vars


def __watch(args, loc={}):
    global previous_watch_values
    old = "<span class='watch_name'>{}</span>: <span class='watch_value'>{}</span>"  # NOQA
    new = "<span class='changed_value'>{}</span>: <span class='changed_value'>{}</span>"  # NOQA
    changed = "<span class='watch_name'>{}</span>: <span class='changed_value'>{}</span>"  # NOQA
    current_watch_values = {}
    out = []
    for arg in args:
        if arg in ['system_default_vars', 'line_info']:
            continue
        try:
            value = str(eval(arg, globals(), loc))
            current_watch_values[arg] = value
        except:
            continue
        if arg not in previous_watch_values:
            out.append(new.format(arg, value))
        elif value != str(previous_watch_values[arg]):
            out.append(changed.format(arg, value))
        else:
            out.append(old.format(arg, value))
    window.RUR.output.watch_variables("<br>".join(out))
    previous_watch_values = current_watch_values


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
        window.print_html("".join(out))


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
            pass              # string prototype extension, can cause problems
    print("\n".join(out))


def generic_translate_python(src, lib, lang_import, highlight,
                             pre_code='', post_code=''):
    ''' Translate Python code into Javascript and execute

        src: source code in editor
        lib: string - language specific lib
             (e.g. "library" in English, "biblio" in French)
             already imported in html file
        lang_import: something like "from reeborg_en import *"
    '''
    sys.stdout.write = __write
    sys.stderr.write = __write_err
    if lib in sys.modules:
        del sys.modules[lib]

    globals_ = {}
    globals_.update(globals())
    globals_['dir_py'] = dir_py
    globals_['Help'] = Help
    globals_['__watch'] = __watch
    globals_['__v'] = None
    globals_['previous_watch_values'] = {}

    src = transform(src)
    exec(lang_import, globals_)
    # globals_['system_default_vars'] = set([key for key in globals_])

    if highlight:
        temp_src, problem = insert_highlight_info(src)
        if not problem:
            src = temp_src
        else:
            window.RUR.ui.highlight()
            window.jQuery("#highlight-impossible").show()
    if hasattr(window.RUR, "__debug"):
        window.console.log("processed source:")
        window.console.log(src)

    # include v again to reset its value
    __v = "system_default_vars = set(locals().keys())\n"
    src = "help=Help\n" + pre_code + "\n" + __v + src + "\n" + post_code
    try:
        exec(src, globals_)
    except Exception as e:
        window.RUR.__python_error = e
