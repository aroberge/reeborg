from browser import window
from preprocess import transform
from common import _import_pt

_import_pt(globals())

src = transform(window.library.getValue())
try:
    exec(src)
except Exception as e:
    window.RUR.__python_error = e