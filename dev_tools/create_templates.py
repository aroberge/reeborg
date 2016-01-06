
def command_template():
    '''Creates a template file containing all function definitions extracted
       from commands.js
    '''
    with open("../src/js/commands.js", encoding="utf-8") as infile:
        content = infile.read().splitlines()
        fn_names = []

        for line in content:
            if line.startswith("RUR."):          # RUR._at_goal_ = function...
                full_name = line.split("=")[0].strip()      # RUR._at_goal_
                full_name = full_name.replace("RUR._", "")  # at_goal_
                fn_names.append(full_name[:-1])             # at_goal

    with open("commands.template", 'w', encoding="utf-8") as template:
            template.write("\n".join(fn_names))

if __name__ == '__main__':
    command_template()
