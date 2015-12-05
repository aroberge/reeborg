from browser import window
from preprocess import transform
from reeborg_fr import *
src = transform(window.editor.getValue())
exec(src)
