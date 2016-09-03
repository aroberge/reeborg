from browser import window
from preprocess import transform
from reeborg_en import *  # NOQA
src = transform(window.editor.getValue())
exec(src)
