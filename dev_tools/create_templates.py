import plurilingue.src.pytools as pytools
import colorama
colorama.init()
ok = colorama.Fore.GREEN
error = colorama.Fore.RED
error2 = colorama.Fore.YELLOW
error3 = colorama.Fore.MAGENTA

def from_commands_js():
    '''Creates a template list containing all function definitions extracted
       from commands.js
    '''
    with open("../src/js/commands.js", encoding="utf-8") as infile:
        content = infile.read().splitlines()
        fn_names = []

        for line in content:
            if line.startswith("RUR."):          # RUR._at_goal_ = function...
                full_name = line.split("=")[0].strip()      # RUR._at_goal_
                if full_name == "RUR._UR":
                    continue
                full_name = full_name.replace("RUR._", "")  # at_goal_
                fn_names.append(full_name[:-1])             # at_goal
    return fn_names

def from_py(lang):
    '''Creates a template list containing all basic function definitions,
       that should be defined in commands.js, from a reeborg_xx.py file for
       comparison with the result from from_commands_js.
    '''

    content = pytools.create_template("../src/python/reeborg_%s.py" % lang)
    fn_names = []

    for line in content:
        if line.rstrip() in ["py:__head", "#py:UR.__init__",
                             "#py:UR.__str__", "#py:UR"]:
            continue
        if line.startswith("#py:python_specific"):
            break
        fn_names.append(line.replace("#py:", ""))

    return fn_names


if __name__ == '__main__':
    commands = from_commands_js()
    py_defs = from_py("en")
    if len(commands) != len(py_defs):
        print(error, "definition lists for en not the same size\n")
        for item in commands:
            if item not in py_defs:
                print(error2, item, "missing in Python file")
        for item in py_defs:
            if item not in commands:
                print(error3, item, "missing in commands.js")
    else:
        print(ok, "definition lists are of the same size")

    py_defs = from_py("fr")
    if len(commands) != len(py_defs):
        print(error, "definition lists for en not the same size\n")
        for item in commands:
            if item not in py_defs:
                print(error2, item, "missing in Python file")
        for item in py_defs:
            if item not in commands:
                print(error3, item, "missing in commands.js")
    else:
        print(ok, "definition lists are of the same size")
