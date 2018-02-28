from browser import window
from preprocess import transform
from common import _import_fr

_import_fr(globals())

src = transform(window.library.getValue())
try:
    exec(src, globals_)
except Exception as e:
    window.RUR.__python_error = e
