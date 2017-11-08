# pylint: skip-file
'''The purpose of this file is to enable code from the editor
   to be imported when using the REPL.'''

from browser import window
from preprocess import transform
from common import _import_en

_import_en(globals())

src = transform(window.editor.getValue())
exec(src)
