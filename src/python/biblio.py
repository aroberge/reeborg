from browser import window
from preprocess import transform
from common import import_fr

import_fr(globals())

src = transform(window.library.getValue())
exec(src)
