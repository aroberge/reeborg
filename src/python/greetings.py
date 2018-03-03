'''test for Brython issue 3.5 rc1'''
class Greetings:
    default = None
    def __init__(self):
        print("Greetings initiated.")
    def hello(self):
        print("Hello!")
    def bonjour(self):
        print("bonjour")

fns = ['hello', 'bonjour']

_func_body = """\
def {name}():
    if {obj} is None:
        {obj} = {init}
    return {obj}.{name}()
"""
def _make_global_funcs(functions, cls, obj, init):
    print("executing _make_global_funcs")
    for methodname in functions:
        def_str = _func_body.format(obj=obj, init=init, name=methodname)
        exec(def_str, globals())

_make_global_funcs(fns, Greetings, 'Greetings.default', 'Greetings()')
print("greetings imported")