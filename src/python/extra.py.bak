'''Before this can be imported, one needs to install code with
   RUR.set_extra_content'''
from browser import window
from common import _import_en, _import_fr, _import_cn, _import_pl, _import_de, _import_ko, _import_pt

# Defining __watch and system_default_vars is only needed
# to prevent an error if a user defines some code for the extra module
# using RUR.set_extra_content(python_code) with "watch variable" enabled
# as some call to __watch may be added to python_code if it spans multiple
# lines
system_default_vars = None
def __watch(*arg, **kwd):
    pass


human_language = window['RUR'].state.human_language
if human_language.endswith("en"):
    _import_en(globals())
elif human_language.endswith("fr"):
    _import_fr(globals())
elif human_language.endswith("cn"):
    _import_cn(globals())
elif human_language.endswith("pl"):
    _import_pl(globals())
elif human_language.endswith("de"):
    _import_de(globals())    
elif human_language.endswith("ko"):
    _import_ko(globals())
elif human_language.endswith("pt"):
    _import_pt(globals())  
else:
    raise NotImplementedError("Unkown language %s" % human_language)

exec(window.extra_editor.getValue())
