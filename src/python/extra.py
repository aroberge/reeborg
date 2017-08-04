'''Before this can be imported, one needs to install code with
   RUR.set_extra_content'''
from browser import window
from common import import_en, import_fr

# Defining _watch_ and system_default_vars is only needed
# to prevent an error if a user defines some code for the extra module
# using RUR.set_extra_content(python_code) with "watch variable" enabled
# as some call to _watch_ may be added to python_code if it spans multiple
# lines
system_default_vars = None
def _watch_(*arg, **kwd):
    pass


human_language = window['RUR'].state.human_language
if human_language.endswith("en"):
    import_en(globals())
elif human_language.endswith("fr"):
    import_fr(globals())
else:
    raise NotImplementedError("Unkown language %s" % human_language)

exec(window.extra_editor.getValue())
