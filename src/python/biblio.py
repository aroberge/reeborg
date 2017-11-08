from browser import window
from preprocess import transform
from common import _import_fr

_import_fr(globals())

src = transform(window.library.getValue())
exec(src)
