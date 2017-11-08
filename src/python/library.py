from browser import window
from preprocess import transform
from common import _import_en

_import_en(globals())

src = transform(window.library.getValue())
exec(src)
