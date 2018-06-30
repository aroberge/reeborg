'''A collection of useful decorators'''

from browser import window
from common import _import_en, _import_fr, _import_cn

human_language = window['RUR'].state.human_language
if human_language.endswith("en"):
    _import_en(globals())
elif human_language.endswith("fr"):
    _import_fr(globals())
    position_here = position_ici
elif human_language.endswith("cn"):
    _import_cn(globals())
    position_here = 此处的坐标
else:
    raise NotImplementedError("Unkown language %s" % human_language)


def ensure_position_sequence(fn, path, message):
    '''redefine an action so that it is performed only
       at a predefined set of locations'''
    def wrapper():
        fn()
        try:
            x, y = path[0]
        except IndexError:
            raise ReeborgError(message)

        if position_here() != (x, y):
            raise ReeborgError(message)
        del path[0]

    wrapper.__name__ = fn.__name__
    wrapper.__doc__ = fn.__doc__
    return wrapper
