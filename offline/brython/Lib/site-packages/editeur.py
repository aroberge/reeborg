from browser import window
from preprocess import transform
from reeborg_fr import *  # NOQA
src = transform(window.editor.getValue())
exec(src)
