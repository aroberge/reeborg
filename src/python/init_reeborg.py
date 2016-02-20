from browser import window
from _importlib import optimize_import_for_path
optimize_import_for_path('/src/python', 'py')
from common import generic_translate_python
window['translate_python'] = generic_translate_python
import py_repl
