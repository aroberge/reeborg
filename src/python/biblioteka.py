from browser import window
from preprocess import transform
from common import _import_pl

_import_pl(globals())

RUR = window.RUR   # line added
src = transform(window.library.getValue())
try:
    exec(src)
except Exception as e:
    window.RUR.__python_error = e
