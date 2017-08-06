from browser import window
from preprocess import transform
from common import __import_en

__import_en(globals())

src = transform(window.library.getValue())
exec(src)
