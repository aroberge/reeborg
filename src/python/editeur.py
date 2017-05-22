# pylint: skip-file
'''The purpose of this file is to enable code from the editor
   to be imported when using the REPL.'''
from browser import window
from preprocess import transform
from reeborg_fr import *  # NOQA
src = transform(window.editor.getValue())
exec(src)
