# Inspired from https://code.google.com/p/pseudo-pdb/ by Jurgis Pralgauskis
# However, bearing very little resemblance to the above
#
# André Roberge

try:
    from browser import window
    print = window.console.log
except:
    pass

_watching = False
_highlight = True

def extract_first_word(mystr, separators):
    """ Splits a string into 2 parts without using regexp
        and return the first part (before a known word separator)
    """
    for i, char in enumerate(mystr):
        if char in separators:
            return mystr[:i], mystr[i:]
    return mystr, ''


def tracing_line(indent, current_group, last_line=False, skip_watch=False):
    '''Construct the tracing line'''
    tracecall_name = 'RUR.set_lineno_highlight'
    watch_string = "__watch(system_default_vars, loc=locals(), gl=globals())\n"
    if _watching and not skip_watch:
        watch_info = indent + watch_string
    else:
        watch_info = ''
    if last_line:
        return watch_info
    if _highlight:
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
            elif char in ['(', ')', '[', ']', '{', '}', '#']:
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
    in_decorator = False
    for nb, line in enumerate(lines):
        if line.endswith("\\"):
            return "Continuation line with backslash"  # we do not handle this
        if (paren_count == square_count == curly_count ==
                triple_double == triple_single == 0) and not in_decorator:
            new_group = []
        paren_count += line.count('(') - line.count(')')
        square_count += line.count('[') - line.count(']')
        curly_count += line.count('{') - line.count('}')
        triple_single += line.count("'''")
        triple_single %= 2
        triple_double += line.count('"""')
        triple_double %= 2

        # we want to treat lines like
        # @decorator_1
        #  ...
        # @decorator_n
        # def ...
        #
        # as a single group, to avoid instructions being inserted between
        # these lines

        if in_decorator:
            if line.strip().startswith("def "):
                in_decorator = False
        elif line.strip().startswith("@"):
            in_decorator = True
        new_group.append(nb)
        if (paren_count == square_count == curly_count ==
                triple_double == triple_single == 0) and not in_decorator:
            line_info.append(new_group)

    if (paren_count == square_count == curly_count ==
            triple_double == triple_single == 0) and not in_decorator:
        return line_info
    else:
        return False


def is_assignment(line):
    '''assume only one assignment symbol in line'''
    assignments = ["+=", "-=", "*=", "@=", "/=", "//=", "%=", "**=",
                   ">>=", "<<=", "&=", "^=", "|="]
    for assignment in assignments:
        if assignment in line:
            found = assignment
            break
    else:
        return False

    parts = line.split(found)
    lhs = parts[0].strip()
    try:
        return lhs.isidentifier()  # Brython can raise an error for some reason
    except:
        return False


def insert_highlight_info(src, highlight=True, var_watch=False):
    global _watching, _highlight
    if not src:
        return '\n', False
    _watching = var_watch
    _highlight = highlight
    line_info = check_balanced_brackets(src)
    if not line_info:
        return src, True
    elif line_info == "Continuation line with backslash":
        return src, line_info
    src = src.replace('\t', '    ')
    lines = src.split("\n")
    new_lines = []
    use_next_indent = False
    saved_lineno_group = None

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
        first_word, remaining = extract_first_word(line_wo_indent, ' #=([{:\'"\\')
        if use_next_indent:
            if saved_lineno_group[-1] >= lineno:  # pylint: disable=E1136
                new_lines.append(line)
                continue
            new_lines.append(tracing_line(indent, saved_lineno_group))
            use_next_indent = False

        if first_word in 'def class'.split():
            if lineno <= current_group[-1]:  # likely inside a decorator group
                new_lines.append(line)
                continue
            new_lines.append(tracing_line(indent, current_group))
            new_lines.append(line)
        elif first_word in '''pass continue break if from import
                            del return raise try with yield'''.split():
            new_lines.append(tracing_line(indent, current_group))
            new_lines.append(line)
        elif first_word in 'for while'.split():
            new_lines.append(tracing_line(indent, current_group))
            new_lines.append(line)
            use_next_indent = True
            saved_lineno_group = current_group
        elif first_word in 'else except finally'.split():
            new_lines.append(line)
            use_next_indent = True
            saved_lineno_group = current_group
        elif first_word == 'elif':
            new_lines.append(indent + first_word +
                             tracing_line(' ', current_group, skip_watch=True) +
                             ' and' + remaining)
        elif is_assignment(line_wo_indent):
            new_lines.append(tracing_line(indent, current_group))
            new_lines.append(line)
        elif not first_word and remaining[0] == "#":
            new_lines.append(line)
        else:
            if lineno == current_group[0]:
                new_lines.append(tracing_line(indent, current_group))
            new_lines.append(line)


    new_lines.append(tracing_line('', '', last_line=True))
    return '\n'.join(new_lines), False

if __name__ == '__main__':
    import test_highlight as src

    result = insert_highlight_info(src.test_four_instructions)
    print(result)
