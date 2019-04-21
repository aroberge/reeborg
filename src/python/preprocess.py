# Warning: highly experimental and untested code
# preprocess code to make a simpler iteration syntax
loop_keyword = 'repeat '  # include space after


def transform(text):
    try:
        nb = text.count(loop_keyword)
        if nb == 0:
            return text
    except:
        return text

    var_names = get_unique_variable_names(text, nb)

    processed_lines = []
    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith(loop_keyword):
            stripped = stripped.split("#")[0] # remove any comment.
            if ':' in stripped:
                stripped = stripped.replace(loop_keyword, '')
                stripped = stripped.replace(':', '')
                index = line.find(loop_keyword)
                try:
                    n = int(stripped)
                    line = ' '*index + 'for ' + var_names.pop() + ' in range(%s):' % n
                except:  # make sure we capture everything so as to avoid
                        # exposing weird error messages to students.
                    pass
        processed_lines.append(line)
    result = '\n'.join(processed_lines)
    return result


def get_unique_variable_names(text, nb):
    base_name = 'ITERATION_VARIABLE'
    var_names = []
    i = 0
    j = 0
    while j < nb:
        tentative_name = base_name + str(i)
        if text.count(tentative_name) == 0:
            var_names.append(tentative_name)
            j += 1
        i += 1
    return var_names
