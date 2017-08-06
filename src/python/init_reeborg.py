# pylint: skip-file
from browser import window
from _importlib import optimize_import_for_path
optimize_import_for_path(window.RUR.BASE_URL + '/src/python', 'py')
from common import __generic_translate_python
window['translate_python'] = __generic_translate_python
import py_repl
