import json

py_head = "py:__head"

def create_template(infile, outfile=None):
    '''Creates a template file containing all the keys extracted
       from a python file.

       See ../test/utf8_test.py for a python infile and
           ../test/utf8_test.template for the corresponding template file.
    '''
    with open(infile, encoding="utf-8") as py_file:
        py_content = py_file.read().splitlines()
        content = [py_head]

        for line in py_content:
            if "#py:" in line:
                key = "#py:" + line.split("#py:")[1]
                content.append(key)

    if outfile is None:
        return content
    elif outfile == "print":
        print("\n".join(content))
    else:
        with open(outfile, 'w', encoding="utf-8") as template:
            template.write("\n".join(content))


def py2json(infile, outfile=None):
    '''Given a Python file, creates a corresponding json file.'''
    with open(infile, encoding="utf-8") as py_file:
        py_content = py_file.read().splitlines()
        content = {}
        key = py_head
        value = []
        for line in py_content:
            if "#py:" in line:
                content[key] = "\\n".join(value)
                key = "#py:" + line.split("#py:")[1]
                value = [line]
            else:
                value.append(line)
        content[key] = "\\n".join(value)

    if outfile is None:
        return content
    elif outfile == "print":
        print(repr(content).encode("utf-8"))
    else:
        with open(outfile, 'w', encoding="utf-8") as json_file:
            json.dump(content, json_file, ensure_ascii=False, indent=2)


def json2py(infile, template, outfile=None):
    '''Given a json file and a template, reconstructs a Python file.'''
    with open(infile, encoding="utf-8") as json_file:
        content = json.load(json_file)

    with open(template) as tmpl, open(outfile, 'w', encoding="utf-8") as out:
        out.write(content[py_head].replace("\\n", "\n"))
        out.write("\n")
        keys = tmpl.read().splitlines()
        for key in keys:
            if key == py_head:
                continue
            out.write(content[key].replace("\\n", "\n"))
            out.write("\n")


if __name__ == '__main__':
    import sys
    METHODS = {"create_template": create_template,
               "py2json": py2json,
               "json2py": json2py
               }

    USAGE = """Usage:
    python pytools.py method infile [template] [outfile or print]
    where method is one of [%s]
    and template is a required file name for json2py.
    """ % ', '.join(METHODS.keys())
    try:
        method = sys.argv[1]
        infile = sys.argv[2]
        if method == "json2py":
            template = sys.argv[3]
            try:
                outfile = sys.argv[4]
            except:
                outfile = None
            try:
                json2py(infile, template, outfile)
            except Exception as e:
                print("error", e)
                sys.exit()
        else:
            try:
                outfile = sys.argv[3]
            except:
                outfile = None
            try:
                METHODS[method](infile, outfile)
            except Exception as e:
                print("error", e)
                sys.exit()
    except Exception as e:
        print(USAGE)
