from browser import window
from preprocess import transform
from reeborg_en import *
src = transform(window.library.getValue())
exec(src)
