# Inspired from https://code.google.com/p/pseudo-pdb/ by Jurgis Pralgauskis
# However, bearing very little resemblance to the above
#
# MIT license like the rest of Reeborg's World code.
# André Roberge

try:
    from browser import window
    print = window.console.log
except:
    pass

_watch = False
_highlight = True

def extract_first_word(mystr, separators):
    """ Splits a string into 2 parts without using regexp
        and return the first part (before a known word separator)
    """
    for i, char in enumerate(mystr):
        if char in separators:
            return mystr[:i], mystr[i:]
    return mystr, ''


def tracing_line(indent, current_group, frame=False, last_line=False):
    '''Construct the tracing line'''
    global _watch, _highlight
    tracecall_name = 'RUR.set_lineno_highlight'
    watch_string = "_watch_(system_default_vars, loc=locals(), gl=globals())\n"
    if _watch:
        watch_info = indent + watch_string
    else:
        watch_info = ''
    if last_line:
        return watch_info
    if _highlight:
        if frame:
            trace = indent + tracecall_name + '(%s, True)' % current_group
        else:
            trace = indent + tracecall_name + '(%s)' % current_group
    else:
        trace = ''
    return watch_info + trace


def replace_brackets_and_sharp(src):
    '''replace ()[]{} and # by spaces inside strings'''
    new_src = []
    quote = None
    in_string = False
    for char in src:
        if in_string:
            if char == quote:
                in_string = False
                quote = None
            elif char in ['(', ')', '[', ']', '{', '}']:
                char = ' '
        elif char == '"' or char == "'":
            quote = char
            in_string = True
        new_src.append(char)
    return ''.join(new_src)


def remove_comments(src):
    # only remove comments that start with a '#'
    lines = src.split("\n")
    new_lines = []
    for line in lines:
        if '#' in line:
            line = line.split('#')[0]
        new_lines.append(line)
    return '\n'.join(new_lines)


def check_balanced_brackets(src):
    src = replace_brackets_and_sharp(src)
    src = remove_comments(src)
    lines = src.split("\n")
    line_info = []
    paren_count = 0
    square_count = 0
    curly_count = 0
    triple_double = 0
    triple_single = 0
    for nb, line in enumerate(lines):
        if line.endswith("\\"):
            return "Continuation line with backslash"  # we do not handle this
        if (paren_count == square_count == curly_count ==
                triple_double == triple_single == 0):
            new_group = []
        paren_count += line.count('(') - line.count(')')
        square_count += line.count('[') - line.count(']')
        curly_count += line.count('{') - line.count('}')
        triple_single += line.count("'''")
        triple_single %= 2
        triple_double += line.count('"""')
        triple_double %= 2
        new_group.append(nb)
        if (paren_count == square_count == curly_count ==
                triple_double == triple_single == 0):
            line_info.append(new_group)

    if (paren_count == square_count == curly_count ==
            triple_double == triple_single == 0):
        return line_info
    else:
        return False

# Some instructions already result in a frame recording;
# there is no need for these to record an extra frame.
RECORDING = ["move", "avance",
             "turn_left", "tourne_a_gauche",
             "take", "prend",
             "put", "depose",
             "build_wall", "construit_un_mur",
             "write", "ecrit",
             "repeat", "repete",
             "pause",
             "print",
             "narration",
             "clear_print"]


def insert_highlight_info(src, highlight=True, var_watch=False):  # NOQA
    global _watch, _highlight
    _watch = var_watch
    _highlight = highlight
    line_info = check_balanced_brackets(src)
    if not line_info:
        return src, True
    elif line_info == "Continuation line with backslash":
        return src, line_info
    src = src.replace('\t', '    ')
    lines = src.split("\n")
    new_lines = [tracing_line('', [0], frame=True)]
    use_next_indent = False
    saved_lineno_group = None
    skip_docstring = 0

    line_info.reverse()
    current_group = line_info.pop()
    for lineno, line in enumerate(lines):
        if lineno > current_group[-1]:
            current_group = line_info.pop()

        if not line.strip():
            new_lines.append(line)
            continue

        line_wo_indent = line.lstrip()
        indent = line[:-len(line_wo_indent)]
        first_word, remaining = extract_first_word(line_wo_indent, ' #=([{:\'"\\')  # NOQA
        if use_next_indent:
            if saved_lineno_group[-1] >= lineno:
                new_lines.append(line)
                continue
            new_lines.append(tracing_line(indent, saved_lineno_group, frame=True))  # NOQA
            use_next_indent = False

        if first_word in 'def class'.split():
            new_lines.append(tracing_line(indent, current_group, frame=True))
            new_lines.append(line)
            skip_docstring = 2
        elif first_word in '''pass continue break if from import
                            del return raise try with yield'''.split():
            new_lines.append(tracing_line(indent, current_group, frame=True))
            new_lines.append(line)
        elif first_word in 'for while'.split():
            new_lines.append(tracing_line(indent, current_group, frame=True))
            new_lines.append(line)
            use_next_indent = True
            saved_lineno_group = current_group
        elif first_word in 'else except finally'.split():
            new_lines.append(line)
            use_next_indent = True
            saved_lineno_group = current_group
        elif first_word == 'elif':
            new_lines.append(indent + first_word +
                             tracing_line(' ', current_group, frame=True) +
                             ' and' + remaining)
        elif '=' in line_wo_indent:
            new_lines.append(tracing_line(indent, current_group, frame=True))
            new_lines.append(line)
        elif not first_word and remaining[0] == "#":
            new_lines.append(line)
        elif first_word in RECORDING:
            new_lines.append(tracing_line(indent, current_group))
            new_lines.append(line)
        else:
            if lineno == current_group[0] and skip_docstring <= 0:
                new_lines.append(tracing_line(indent, current_group, frame=True))  # NOQA
            new_lines.append(line)

        skip_docstring -= 1

    new_lines.append(tracing_line(indent, '', last_line=True))
    return '\n'.join(new_lines), False

if __name__ == '__main__':
    import test_highlight as src

    result = insert_highlight_info(src.test_four_instructions)
    print(result)
    # print("\n", result==src.test_single_move_result)
