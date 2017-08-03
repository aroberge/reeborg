'''Before this can be imported, one needs to install code with
   RUR.set_extra_content'''
from browser import window
from common import import_en, import_fr

human_language = window['RUR'].state.human_language
if human_language.endswith("en"):
    import_en(globals())
elif human_language.endswith("fr"):
    import_fr(globals())
else:
    raise NotImplementedError("Unkown language %s" % human_language)

exec(window['RUR'].get_extra_content())
