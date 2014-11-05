# original code from https://code.google.com/p/pseudo-pdb/
# by Jurgis Pralgauskis
# MIT license like the rest of Reeborg's World code.
# Adapted by André Roberge

''' Draft explanation of what this module is about:

   This module contains functions that take a code sample and eventually
   insert function calls before each line of code; these function calls
   have the original line number of the line of code to be executed
   (with some exceptions) allowing for source code in an editor to
   have the line of code about to be executed properly identified
   and highlighted.
   '''

DEBUG = False

def rchop_by_set(mystr, separators):
    """ Splits a string into 2 parts without using regexp
        and return the first part (before a known separator)
    """
    for char in mystr:
        if char in separators:
            return mystr.split(char)[0]

def repr_tracepoint( tc ):
    '''Determines how to represent trace point function'''
    tracecall_name = '_tp'
    return tc['indent'] + tracecall_name +  '(%d)'%tc['target_lineno']


########################################################################
#               The Code parsing and so on
########################################################################

class InsertTracer():
    def __init__(self, src):
        src = src.replace('\t', '    ')  # standard tab spacing - just in case they are used
        self.lines = src.split("\n")
        self.indentation_stack = [ dict(cause='', cause_lineno=0, indent='') ]
        self.trace_calls = []  # dict( when='before|after', place_lineno=, target_lineno=.., indent=.. )

    def process(self):
        self.create_trace_calls()
        return self.construct_result()

    def create_trace_calls(self):
        for nr, line in enumerate(self.lines):
            if not line.strip():  # ignore empty lines
                continue

            line_wo_indent = line.lstrip()
            indent = line[:-len(line_wo_indent)]
            #TODO -- guarantee that it takes first word OK
            #~ first_word = line and line_wo_indent.split()[0] # was a bug with "else:"
            first_word = rchop_by_set(line, ' ([{:\'"\\')  ############ possibly add # to see if first character - if so, simply return as comment

            if self.indentation_stack[-1]['indent'] == None:  # if it was'nt set/known
                self.indentation_stack[-1]['indent'] = indent

            if self.trace_calls and self.trace_calls[-1]['indent'] is None: # and  self.trace_calls[-1]['when']=='after'
                self.trace_calls[-1]['indent'] = indent

            if first_word in 'for while if elif else def class try except finally with'.split():
                if first_word in 'else elif except finally'.split():
                    when='after'
                else:
                    when='before'
                self.trace_calls.append(
                    dict(
                        when=when,
                        place_lineno=nr,
                        target_lineno=nr,
                        indent=indent if when=='before' else None,
                        cause=first_word,
                    )
                )
                self.indentation_stack.append( dict( cause=first_word, cause_lineno=nr, indent=None ) )
            else:  # for ordinary statements
               self.trace_calls.append(
                    dict(
                        when='before',
                        place_lineno=nr,
                        target_lineno=nr,
                        indent=indent
                    )
                )
            # check unindent
            if self.indentation_stack[-1]['indent']:
                while indent < self.indentation_stack[-1]['indent']:
                    last_indent = self.indentation_stack.pop()
                    if last_indent['cause'] in 'for while'.split():   # TODO: "for" might not be needed here (though in C++ it should)
                        self.trace_calls.append(
                            dict(  # could inject "before current nr" but, less confusion -- "after previous nr"
                                when='after',
                                place_lineno=nr-1,  # might happen to be empty line -- but it's ok
                                target_lineno=last_indent['cause_lineno'],
                                indent=last_indent['indent']
                            )
                        )

    def construct_result(self):
        # for each line -- separate, what goes before, what -- after
        restructured_trace_calls = {}

        for tc in self.trace_calls:
            key = tc['place_lineno']
            if not key in restructured_trace_calls:
                restructured_trace_calls[key] = {'before':[], 'after':[] }

            restructured_trace_calls[key][tc['when']].append( dict(
                    indent=tc['indent'],
                    target_lineno=tc['target_lineno'])
                )

        result = []
        for nr, line in enumerate(self.lines):
            # before
            if nr in restructured_trace_calls:
                for tc in restructured_trace_calls[nr]['before']:
                    result.append(  repr_tracepoint( tc ) )

            # the line
            if DEBUG:
                line += ' '*(20-len(line)) +'# %s'%nr  # add line original numbers
            result.append( line )
            # after
            if nr in restructured_trace_calls:
                for tc in restructured_trace_calls[nr]['after']:
                    result.append( repr_tracepoint( tc )  )

        return '\n'.join(result)



