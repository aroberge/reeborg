'''Reeborg Console

Copyright information at the end'''

import sys
import traceback
from browser import document, window

RUR = window['RUR']
console = document['py_console']


def write(data):
    console.value += str(data)

sys.stdout.write = sys.stderr.write = write


def cursorToEnd():
    pos = len(console.value)
    console.setSelectionRange(pos, pos)
    console.scrollTop = console.scrollHeight


def get_col(area):
    # returns the column num of cursor
    sel = console.selectionStart
    lines = console.value.split('\n')
    for line in lines[:-1]:
        sel -= len(line) + 1
    return sel


def myMouseClick(event):
    cursorToEnd()


def myKeyPress(event):
    global current
    if event.keyCode == 9:  # tab key
        event.preventDefault()
        console.value += "    "
    elif event.keyCode == 13:  # return
        src = console.value
        repl.set_currentLine(src)
        if repl.status == 'main' and not repl.currentLine.strip():
            console.value += '\n>>> '
            event.preventDefault()
            return
        console.value += '\n'
        repl.process_code(src)
        cursorToEnd()
        event.preventDefault()
window['myKeyPress'] = myKeyPress


def myKeyDown(event):
    if event.keyCode == 37:  # left arrow
        sel = get_col(console)
        if sel < 5:
            event.preventDefault()
            event.stopPropagation()
    elif event.keyCode == 36:  # line start
        pos = console.selectionStart
        col = get_col(console)
        console.setSelectionRange(pos - col + 4, pos - col + 4)
        event.preventDefault()
    elif event.keyCode == 38:  # up
        if repl.current > 0:
            pos = console.selectionStart
            col = get_col(console)
            # remove current line
            console.value = console.value[:pos - col + 4]
            repl.current -= 1
            console.value += repl.history[repl.current]
        event.preventDefault()
    elif event.keyCode == 40:  # down
        if repl.current < len(repl.history) - 1:
            pos = console.selectionStart
            col = get_col(console)
            # remove current line
            console.value = console.value[:pos - col + 4]
            repl.current += 1
            console.value += repl.history[repl.current]
        event.preventDefault()
    elif event.keyCode == 8:  # backspace
        src = console.value
        lstart = src.rfind('\n')
        if (lstart == -1 and len(src) < 5) or (len(src) - lstart < 6):
            event.preventDefault()
            event.stopPropagation()

console.bind('keypress', myKeyPress)
console.bind('keydown', myKeyDown)
console.bind('click', myMouseClick)


class Interpreter():
    def __init__(self):
        self.restart()

    def restart(self):
        self.status = "main"
        self.current = 0
        self.history = []
        self.currentLine = ''
        console.value = ">>> "
        console.focus()
        cursorToEnd()
        self.editor_ns = {'__name__': 'Reeborg console'}
        lang = document.documentElement.lang
        if lang == 'en':
            exec("from reeborg_en import *", self.editor_ns)
            self.editor_ns["done"] = RUR.rec.check_current_world_status
        elif lang == 'fr':
            exec("from reeborg_fr import *", self.editor_ns)
            self.editor_ns["termine"] = RUR.rec.check_current_world_status

    def set_currentLine(self, src):
        if self.status == "main":
            self.currentLine = src[src.rfind('>>>') + 4:]
        elif self.status == "multiline":
            self.currentLine = src[src.rfind('>>>') + 4:]
            self.currentLine = self.currentLine.replace('\n... ', '\n')
        else:
            self.currentLine = src[src.rfind('...') + 4:]
        if self.currentLine.strip().startswith("repeat "):
            print("\n    SyntaxError: repeat is not a Python keyword", end='')
            self.currentLine = ''

    def handle_syntax_error(self, msg):
        msg = str(msg)
        if (msg == 'invalid syntax : triple string end not found' or
                msg.startswith('Unbalanced bracket')):
            console.value += '... '
            self.status = "multiline"
        elif msg == 'eval() argument must be an expression':
            try:
                exec(self.currentLine, self.editor_ns)
            except:
                traceback.print_exc()
            console.value += '>>> '
            self.status = "main"
        elif msg == 'decorator expects function':
            console.value += '... '
            self.status = "block"
        else:
            traceback.print_exc()
            console.value += '>>> '
            self.status = "main"

    def process_statement(self, src):
        try:
            _ = self.editor_ns['_'] = eval(self.currentLine, self.editor_ns)
            if _ is not None:
                write(repr(_)+'\n')
            console.value += '>>> '
            self.status = "main"
        except IndentationError:
            console.value += '... '
            self.status = "block"
        except SyntaxError as msg:
            self.handle_syntax_error(msg)
        except Exception as e:
            if e.__name__ in ['ReeborgError', 'WallCollisionError']:
                print("{}: {}".format(e.__name__,
                      RUR.translate(getattr(e, 'reeborg_shouts'))))
            else:
                exc = __BRYTHON__.current_exception
                print("{}: {}".format(e.__name__, exc.args[0]))
            console.value += '>>> '
            self.status = "main"

    def process_block(self, src):
        block = src[src.rfind('>>>') + 4:].splitlines()
        block = [block[0]] + [b[4:] for b in block[1:]]
        block_src = '\n'.join(block)
        # status must be set before executing code in globals()
        self.status = "main"
        try:
            _ = exec(block_src, self.editor_ns)
            if _ is not None:
                print(repr(_))
        except:
            traceback.print_exc()
        console.value += '>>> '

    def process_code(self, src):
        self.history.append(self.currentLine)
        self.current = len(self.history)
        if self.status == "main" or self.status == "multiline":
            self.process_statement(src)
        elif self.currentLine == "":  # end of block
            self.process_block(src)
        else:
            console.value += '... '

repl = Interpreter()
window["restart_repl"] = repl.restart

_copyright = """Copyright (c) 2015, André Roberge andre.roberge@gmail.com
All Rights Reserved.

Copyright (c) 2012, Pierre Quentel pierre.quentel@gmail.com
All Rights Reserved.

Copyright (c) 2001-2013 Python Software Foundation.
All Rights Reserved.

Copyright (c) 2000 BeOpen.com.
All Rights Reserved.

Copyright (c) 1995-2001 Corporation for National Research Initiatives.
All Rights Reserved.

Copyright (c) 1991-1995 Stichting Mathematisch Centrum, Amsterdam.
All Rights Reserved."""

_license = """Copyright (c) 2012, André Roberge andre.roberge@gmail.com
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer. Redistributions in binary
form must reproduce the above copyright notice, this list of conditions and
the following disclaimer in the documentation and/or other materials provided
with the distribution.
Neither the name of the <ORGANIZATION> nor the names of its contributors may
be used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
"""
