import sys
from browser import window
try:
    from highlight import insert_highlight_info
except Exception as e:
    print("problem in common_def")
from preprocess import transform

def _add_watch(expr):
    window.RUR.watched_expressions.append(expr)

window.RUR.add_watch = _add_watch

lang = window.document.documentElement.lang
if lang == 'en':
    import reeborg_en
elif lang == 'fr':
    import reeborg_fr
else:
    import reeborg_en

def _write(data):
    window.RUR.output._write(str(data))


def __write(data):
    window.RUR.output.write(str(data))


def __write_err(data):
    window.RUR.output._write("<b style='color:red'>" + str(data) + "</b>")

def html_escape(obj):
    return str(obj).replace("&", "&amp"
                  ).replace("<", "&lt;"   # NOQA
                  ).replace(">", "&gt;")  # NOQA


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
        if arg in default or arg in loc or arg in ignore:
            continue
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
    if lang == 'en':
        dir_py(reeborg_en, exclude=exclude)
    elif lang == 'fr':
        dir_py(reeborg_fr, exclude=exclude)
    else:
        dir_py(reeborg_en, exclude=exclude)


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
        if attr == "__class__":
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
        window.print_html("".join(out))
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
    window["print_html"](html_escape("\n".join(out)).replace("\n", "<br>"))


def generic_translate_python(src, highlight, var_watch, pre_code='',
                             post_code=''):
    ''' RUR.translate Python code into Javascript and execute

        src: source code in editor
        highlight: determines if the code will be highlighted as it is run
        var_watch: determines if some variable watch will take place
        pre_code: code included with world definition and prepended to user code
        post_code: code included with world definition and appended to user code
    '''
    # lib: string - language specific lib
    #      (e.g. "library" in English, "biblio" in French)
    #      already imported in html file
    lib = window.RUR.library_name
    # lang_import: something like "from reeborg_en import *"
    lang_import = window.RUR.from_import
    sys.stdout.write = __write
    sys.stderr.write = __write_err
    if lib in sys.modules:
        del sys.modules[lib]

    globals_ = {}
    globals_.update(globals())
    globals_['dir_py'] = dir_py
    globals_['Help'] = Help
    globals_['_watch_'] = _watch_
    globals_['_v_'] = None
    globals_['previous_watch_values'] = {}

    src = transform(src)
    exec(lang_import, globals_)
    # globals_['system_default_vars'] = set([key for key in globals_])

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
