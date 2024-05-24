from browser import window
from preprocess import transform
from common import _import_de

_import_de(globals())

RUR = window.RUR
src = transform(window.library.getValue())
try:
    exec(src)
except Exception as e:
    window.RUR.__python_error = e
