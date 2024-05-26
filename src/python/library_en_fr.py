from browser import window
from preprocess import transform

# The following is done only for testing purpose.
# Usually, the "library" tab will have a unique name
# for that language. For example, in French, it is
# named "biblio" which is short for "bibliothèque".
# However, it can happen that two languages (for example Polish and Lithuanian)
# use the same word for "library". In this case, we need to have a way
# to use the relevant code.

# For testing purpose, this file include code that can
# be used in either English or French.

lang = window.RUR.state.human_language

RUR = window.RUR
if lang.endswith("fr"):
    # This block contains the code found in biblio.py
    from common import _import_fr

    _import_fr(globals())
    RUR = window.RUR   # line added
    src = transform(window.library.getValue())
    try:
        exec(src)
    except Exception as e:
        window.RUR.__python_error = e

else:
    # this block contains the code found in library.py
    from common import _import_en

    _import_en(globals())
    RUR = window.RUR   # line added
    src = transform(window.library.getValue())
    try:
        exec(src)
    except Exception as e:
        window.RUR.__python_error = e
