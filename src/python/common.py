import sys
from browser import window, console
try:
    from highlight import insert_highlight_info
except Exception as e:
    print("problem in common.py")

from preprocess import transform

REEBORG_EN = {}
exec("from reeborg_en import *", REEBORG_EN)
REEBORG_FR = {}
exec("from reeborg_fr import *", REEBORG_FR)

def import_en(namespace):
    ReeborgOK_saved = window['ReeborgOK_en']
    ReeborgOk_saved = window['ReeborgOk_en']
    ReeborgError_saved = window['ReeborgError_en']
    WallCollisionError_saved = window['WallCollisionError_en']
    MissingObjectError_saved = window['MissingObjectError_en']

    namespace.update(REEBORG_EN)

    window['ReeborgOK_en'] = ReeborgOK_saved
    window['ReeborgOk_en'] = ReeborgOk_saved
    window['ReeborgError_en'] = ReeborgError_saved
    window['WallCollisionError_en'] = WallCollisionError_saved
    window['MissingObjectError_en'] = MissingObjectError_saved

def import_fr(namespace):
    ReeborgOK_saved = window['ReeborgOK_fr']
    ReeborgOk_saved = window['ReeborgOk_fr']
    ReeborgError_saved = window['ReeborgError_fr']
    WallCollisionError_saved = window['WallCollisionError_fr']
    MissingObjectError_saved = window['MissingObjectError_fr']

    namespace.update(REEBORG_FR)

    window['ReeborgOK_fr'] = ReeborgOK_saved
    window['ReeborgOk_fr'] = ReeborgOk_saved
    window['ReeborgError_fr'] = ReeborgError_saved
    window['WallCollisionError_fr'] = WallCollisionError_saved
    window['MissingObjectError_fr'] = MissingObjectError_saved

def _add_watch(expr):
    window.RUR.watched_expressions.append(expr)

window.RUR.add_watch = _add_watch

def _write(data):
    window.RUR.output._write(str(data))


def __write(data):
    window.RUR.output.write(str(data))


def __write_err(data):
    window.RUR.output._write("<b style='color:red'>" + str(data) + "</b>")

def html_escape(obj):
    return str(obj).replace("&", "&amp").replace("<", "&lt;").replace(">", "&gt;")


old = "<span class='watch_name'>%s:</span> <span class='watch_value'>%s</span>"  # NOQA
new = "<span class='changed_name'>%s:</span> <span class='changed_value'>%s</span>"  # NOQA
changed = "<span class='watch_name'>%s:</span> <span class='changed_value'>%s</span>"  # NOQA
div = "<div>%s</div>"
title = "<span class='watch_title'>%s</span>"
previous_watch_values = {}


def append_watch(arg, value, out):
    global previous_watch_values
    if arg not in previous_watch_values:
        out.append(div % (new % (arg, value)))
    elif value != previous_watch_values[arg]:
        out.append(div % (changed % (arg, value)))
    else:
        out.append(div % (old % (arg, value)))


def _watch_(default, loc={}, gl={}):
    global previous_watch_values
    ignore = ['system_default_vars', 'line_info']
    current_watch_values = {}
    out = []
    no_new_local = True
    for arg in loc:
        if arg in default or arg in ignore:
            continue
        else:
            if no_new_local:
                no_new_local = False
                out.append(title % window.RUR.translate("Local variables"))
            value = html_escape(loc[arg])
            current_watch_values[arg] = value
        append_watch(arg, value, out)

    no_new_global = True
    for arg in gl:
        if arg in default or arg in ignore:
            continue
        # elif arg in loc and (loc[arg] == gl[arg]):
        #     continue
        else:
            if no_new_global:
                no_new_global = False
                if not no_new_local:
                    out.append("")
                out.append(title % window.RUR.translate("Global variables"))
            value = html_escape(gl[arg])
            current_watch_values[arg] = value
        append_watch(arg, value, out)

    no_new_expr = True
    for arg in window.RUR.watched_expressions:
        if no_new_expr:
            no_new_expr = False
            out.append(title % window.RUR.translate("Watched expressions"))
        try:
            value = html_escape(eval(arg, gl, loc))
        except Exception as e:
            value = repr(e)
        current_watch_values[arg] = value
        append_watch(arg, value, out)

    window.RUR.output.watch_variables("".join(out))
    previous_watch_values = current_watch_values


def default_help():
    '''list available commands'''
    exclude = ["toString", "window", "RUR", "say", "face_au_nord", "narration"]
    lang = window.RUR.state.human_language
    if lang in ['en', 'fr_en', 'ko_en']:
        import reeborg_en  # NOQA
        reeborg_en.dir_py = dir_py
        dir_py(reeborg_en, exclude=exclude)
    elif lang in ['fr', 'en_fr']:
        import reeborg_fr  # NOQA
        reeborg_fr.dir_py = dir_py
        dir_py(reeborg_fr, exclude=exclude)
    else:
        print("Unrecognized language; please file an issue!")


#TODO: use textwrap.dedent to improve format of help.

def Help(obj=None):
    '''Usage: help(obj)'''   # yes: lowercase!!!
    out = []
    if obj is None:
        default_help()
        return
    try:
        out.append("<h2>{}</h2>".format(obj.__name__))
        if hasattr(obj, "__doc__"):
            doc = "<pre>{}</pre>".format(str(obj.__doc__))
            out.append(doc)
        else:
            out.append("<p>No docstring found.</p>")
    except Exception as e:
        window.console.log("exception in Help", e.__name__)

    for attr in dir(obj):
        if attr == "__class__" or attr.startswith("__"):
            continue
        try:
            if hasattr(getattr(obj, attr), "__doc__"):
                if getattr(obj, attr).__doc__:
                    out.append("<h3>{}</h3>".format(attr))
                    doc = "<pre>{}</pre>".format(getattr(obj, attr).__doc__)
                    out.append(doc)
        except AttributeError:
            pass
    if not out:
        raise AttributeError("This object has no docstring.")
    else:
        window.print_html("".join(out), True)
window["Help"] = Help


def dir_py(obj, exclude=None):
    '''Prints all "public" attributes of an object, one per line, identifying
       which ones are callable by appending parentheses to their name.'''
    out = []
    for attr in dir(obj):
        try:
            if exclude:
                if attr in exclude:
                    continue
            if not attr.startswith("__"):
                if callable(getattr(obj, attr)):
                    out.append(attr + "()")
                else:
                    out.append(attr)
        except AttributeError:  # javascript extension, as in supplant()
            pass              # string prototype extension, can cause problems
    window.print_html(html_escape("\n".join(out)).replace("\n", "<br>"), True)


def generic_translate_python(src, highlight=False, var_watch=False, pre_code='',
                             post_code=''):
    ''' RUR.translate Python code into Javascript and execute

        src: source code in editor
        highlight: determines if the code will be highlighted as it is run
        var_watch: determines if some variable watch will take place
        pre_code: code included with world definition and prepended to user code
        post_code: code included with world definition and appended to user code
    '''
    sys.stdout.write = __write
    sys.stderr.write = __write_err

    # reeborg_en and reeborg_fr define some attributes to window; these
    # could have been redefined when running a Javascript program; so it
    # is important to ensure that they have their proper definition by forcing
    # a fresh import each time.
    # Similarly, library or biblio's content might have changed by the user
    # since the program was run last time
    for mod in ["library", "biblio"]:
        if mod in sys.modules:
            del sys.modules[mod]

    globals_ = {}
    globals_.update(globals())
    globals_['dir_py'] = dir_py
    globals_['Help'] = Help
    globals_['_watch_'] = _watch_
    globals_['_v_'] = None
    globals_['previous_watch_values'] = {}

    src = transform(src)
    # sometimes, when copying from documentation displayed in the browsers
    # some nonbreaking spaces are inserted instead of regular spaces.
    # We make the assumption that nonbreaking spaces should never appear
    # in source code - which is not necessarily valid...
    if '\xa0' in src:
        src = src.replace('\xa0', ' ')
        window.console.warn("Some nonbreaking spaces were replaced in the Python code.")

    # lang_import: something like "from reeborg_en import *" already defined in html file
    lang_import = window.RUR.from_import
    if lang_import == "from reeborg_en import *":
        globals_.update(REEBORG_EN)
    elif lang_import == "from reeborg_fr import *":
        globals_.update(REEBORG_FR)
    else:
        raise Exception("unknown import %s" % lang_import)

    if highlight or var_watch:
        try:
            temp_src, problem = insert_highlight_info(src, highlight=highlight,
                                                      var_watch=var_watch)
            if not problem:
                src = temp_src
            else:
                window.RUR.toggle_highlight()
                window.jQuery("#highlight-impossible").show()
        except Exception as e:
            window.RUR.__python_error = e
            window.console.log("problem with hightlight:", e)
            return
    if hasattr(window.RUR, "__debug"):
        window.console.log("processed source:")
        window.console.log(src)

    # include v again to reset its value
    _v_ = "system_default_vars = set(locals().keys())\n"
    src = "help=Help\n" + pre_code + "\n" + _v_ + src + "\n" + post_code
    try:
        exec(src, globals_)
    except Exception as e:
        window.RUR.__python_error = e
