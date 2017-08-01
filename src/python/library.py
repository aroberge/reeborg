from browser import window
from preprocess import transform
from common import import_en

import_en(globals())

src = transform(window.library.getValue())
exec(src)
