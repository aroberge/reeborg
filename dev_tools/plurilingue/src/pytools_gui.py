'''Might as well use easygui_qt since I created it ...'''

import easygui_qt as ez
import pytools

METHODS = {"create_template": pytools.create_template,
           "py2json": pytools.py2json,
           "json2py": pytools.json2py
           }

method = ez.get_choice("What method?", choices=list(METHODS.keys()))
infile = ez.get_file_names("Input file (method = %s)" % method)[0]
outfile = ez.get_save_file_name("Output file (method = %s)" % method)

if method == "json2py":
    template = ez.get_file_names("Get template")[0]
    pytools.json2py(infile, template, outfile)
else:
    METHODS[method](infile, outfile)
