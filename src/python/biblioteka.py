from browser import window
from preprocess import transform

lang = window.RUR.state.human_language
RUR = window.RUR
if lang.endswith("pl"):
    from common import _import_pl

    _import_pl(globals())
    src = transform(window.library.getValue())
    try:
        exec(src)
    except Exception as e:
        window.RUR.__python_error = e
elif lang.endswith("lt"):
    from common import _import_lt

    _import_lt(globals())
    src = transform(window.library.getValue())
    try:
        exec(src)
    except Exception as e:
        window.RUR.__python_error = e

else:
   alert("Unrecognized language in biblioteka. Please report.")