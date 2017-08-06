from browser import window
from preprocess import transform
from common import __import_fr

__import_fr(globals())

src = transform(window.library.getValue())
exec(src)
