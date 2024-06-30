# pylint: skip-file
'''Reeborg Console - adapted from Brython's console'''

import sys
from browser import document, window
from common import _import_en, _import_de, _import_fr, _import_cn, print_dir, _import_ko, _import_pt
RUR = window['RUR']


def print_exc(exc=None):
    if exc is None:
        exc = __BRYTHON__.current_exception  # NOQA
    if isinstance(exc, SyntaxError):
        print('\n module %s line %s' % (exc.args[1], exc.args[2]))
        offset = exc.args[3]
        print('\n  ' + exc.args[4])
        print('\n  ' + offset * ' ' + '^')
    else: # limit traceback to user code
        user_traceback = False
        for line in exc.info:
            if user_traceback:
                print(line)
            if "print_exc" in line:
                user_traceback = True
    print('\n' + exc.__name__, end='')
    if hasattr(exc, "args") and len(exc.args) > 0:
        print(': %s' % exc.args[0])
    print('\n')


class PyConsole:
    def __init__(self):
        self.textarea = document['py-console']

    def refresh(self):
        self.textarea.value = ">>> "
        self.cursor_to_end()
        self.textarea.focus()

    def append(self, txt):
        self.textarea.value += txt

    def prompt(self):
        self.textarea.value += ">>> "

    def more(self):
        self.textarea.value += "... "

    def get_text(self):
        # sometimes, when copying from documentation displayed in the browsers
        # some nonbreaking spaces are inserted instead of regular spaces.
        # We make the assumption that nonbreaking spaces should never appear
        # in source code - which is not necessarily valid...
        src = self.textarea.value
        if '\xa0' in src:
            src = src.replace('\xa0', ' ')
            self.textarea.value = src
            window.console.warn("replaced nonbreaking spaces in process_code")
        return src

    def cursor_to_end(self):
        pos = len(self.textarea.value)
        self.textarea.setSelectionRange(pos, pos)
        self.textarea.scrollTop = self.textarea.scrollHeight

    def get_col(self):
        # returns the column num of cursor
        sel = self.textarea.selectionStart
        lines = self.textarea.value.split('\n')
        for line in lines[:-1]:
            sel -= len(line) + 1
        return sel

    def selection_start(self):
        return self.textarea.selectionStart

    def set_selection_range(self, pos, col):
        self.textarea.setSelectionRange(pos, col)

    def remove_current_line(self):
        pos = self.selection_start()
        col = self.get_col()
        self.textarea.value = self.textarea.value[:pos - col + 4]

py_console = PyConsole()
sys.stdout.write = sys.stderr.write = py_console.append


def myMouseClick(event):
    py_console.cursor_to_end()


def myKeyPress(event):
    if event.keyCode == 9:  # tab key
        event.preventDefault()
        py_console.append(' ' * 4)
    elif event.keyCode == 13:  # return
        src = py_console.get_text()
        repl.set_current_line(src)
        py_console.append('\n')
        if repl.status == 'main' and not repl.current_line.strip():
            py_console.prompt()
            event.preventDefault()
            return
        repl.process_code(src)
        py_console.cursor_to_end()
        event.preventDefault()
window['myKeyPress'] = myKeyPress


def myKeyDown(event):
    if event.keyCode == 37:  # left arrow
        sel = py_console.get_col()
        if sel < 5:
            event.preventDefault()
            event.stopPropagation()
    elif event.keyCode == 36:  # line start
        pos = py_console.selection_start()
        col = py_console.get_col()
        py_console.set_selection_range(pos - col + 4, pos - col + 4)
        event.preventDefault()
    elif event.keyCode == 38:  # up
        if repl.current > 0:
            py_console.remove_current_line()
            repl.current -= 1
            py_console.append(repl.history[repl.current])
        event.preventDefault()
    elif event.keyCode == 40:  # down
        if repl.current < len(repl.history) - 1:
            py_console.remove_current_line()
            repl.current += 1
            py_console.append(repl.history[repl.current])
        event.preventDefault()
    elif event.keyCode == 8:  # backspace
        src = py_console.get_text()
        lstart = src.rfind('\n')
        if (lstart == -1 and len(src) < 5) or (len(src) - lstart < 6):
            event.preventDefault()
            event.stopPropagation()

py_console.textarea.bind('keypress', myKeyPress)
py_console.textarea.bind('keydown', myKeyDown)
py_console.textarea.bind('click', myMouseClick)


class Interpreter():

    def __init__(self):
        self.initialized = False
        try:
            self.restart()
            self.initialized = True
        except:
            py_console.append("Problem in attempting to (re)start Interpreter")

    def restart(self):
        py_console.refresh()
        sys.stdout.write = sys.stderr.write = py_console.append
        for item in ["editor", "editeur", "library", "biblio"]:
            if item in sys.modules:
                del sys.modules[item]
        self.status = "main"
        self.current = 0
        self.history = []
        self.current_line = ''

        self.namespace = {'__name__': 'Reeborg console'}
        try:
            lang = document.documentElement.lang
        except:
            lang = 'en'
        if lang == 'en':
            _import_en(self.namespace)
            self.namespace["done"] = self.done
            self.namespace["World"] = self.world
        elif lang == 'de':
            _import_de(self.namespace)
            self.namespace["ende"] = self.done
            self.namespace["Welt"] = self.world
        elif lang == 'fr':
            _import_fr(self.namespace)
            self.namespace["termine"] = self.done
            self.namespace["Monde"] = self.world
        elif lang == 'pt':
            _import_pt(self.namespace)
            self.namespace["pronto"] = self.done
            self.namespace["Mundo"] = self.world
        elif lang == 'cn':
            _import_cn(self.namespace)
            self.namespace["完成"] = self.done
            self.namespace["世界"] = self.world
        self.namespace["__help"] = window["__help"]
        self.namespace["init"] = window.RUR.world_init
        self.namespace["print_dir"] = print_dir
        # Ensure my help replaces Brython's builtin
        exec("__BRYTHON__.builtins.help = __help", self.namespace)
        if self.initialized:
            self.run_pre()

    def run_pre(self):
        if hasattr(RUR.CURRENT_WORLD, "pre"):
            pre = RUR.CURRENT_WORLD.pre
            if isinstance(pre, list):
                pre = '\n'.join(pre)
            try:
                exec(pre, self.namespace)
            except Exception as e:
                window.console.log("Error when executing pre:", e)

    def done(self):
        '''If a goal is set in this world, calling done() will
        show if the goal has been accomplished in a standard dialog from
        Reeborg's World.

        Since custom goals can be created in post_code, any such
        code will also be run when calling done.
        '''
        RUR.hide_end_dialogs() # hide previously shown dialogs
        if hasattr(RUR.CURRENT_WORLD, "post"):
            post = RUR.CURRENT_WORLD.post
            if isinstance(post, list):
                post = '\n'.join(post)
            exec(post, self.namespace) # may raise an exception
        RUR.rec.check_current_world_status()


    def world(self, *args):
        '''Selects the appropriate world.
        If it exists, gives a positive feedback and restarts the REPL.
        '''
        try:
            RUR._World_(*args)
        except Exception as e:
            if hasattr(e, "reeborg_success"):
                self.restart()
                print(e.reeborg_success)
            elif hasattr(e, "reeborg_failure"):
                print(e.reeborg_failure)
            else:
                raise e

    def set_current_line(self, src):
        if self.status == "main":
            self.current_line = src[src.rfind('>>>') + 4:]
        elif self.status == "multiline":
            self.current_line = src[src.rfind('>>>') + 4:]
            self.current_line = self.current_line.replace('\n... ', '\n')
        else:
            self.current_line = src[src.rfind('...') + 4:]
        if self.current_line.strip().startswith("repeat "):
            print("\n    SyntaxError: repeat is not a Python keyword", end='')
            self.current_line = ''

    def handle_syntax_error(self, msg):
        msg = str(msg)
        if (msg == 'invalid syntax : triple string end not found' or
                msg.startswith('Unbalanced bracket')):
            py_console.more()
            self.status = "multiline"
        elif msg == 'eval() argument must be an expression':
            try:
                exec(self.current_line, self.namespace)
            except:
                print_exc()
            py_console.prompt()
            self.status = "main"
        elif msg == 'decorator expects function':
            py_console.more()
            self.status = "block"
        else:
            print_exc()
            py_console.append("\n")
            py_console.prompt()
            self.status = "main"

    def process_statement(self):
        try:
            _ = self.namespace['_'] = eval(self.current_line, self.namespace)
            if _ is not None:
                py_console.append(repr(_) + '\n')
            py_console.prompt()
            self.status = "main"
        except IndentationError:
            py_console.more()
            self.status = "block"
        except SyntaxError as msg:
            self.handle_syntax_error(msg)
        except NameError as e:
            py_console.append("NameError: %s\n" % e.args[0])
            py_console.prompt()
            self.status = "main"
        except AttributeError as e:
            py_console.append("AttributeError: %s\n" % e.args[0])
            py_console.prompt()
            self.status = "main"
        except Exception as e:
            exc = __BRYTHON__.current_exception  # NOQA
            if hasattr(e, 'reeborg_failure'):
                message = RUR.translate(getattr(e, 'reeborg_failure'))
                message = message.replace('<code>', '').replace('</code>', '')
                py_console.append("{}: {}".format(e.__name__, message))  # NOQA
            elif hasattr(e, 'reeborg_success'):
                window.console.log("yes, it has attribute reeborg_success")
                message = RUR.translate(getattr(e, 'reeborg_success'))
                py_console.append("{}: {}".format(e.__name__, message)) # NOQA
            else:
                 print_exc(exc)
            py_console.append("\n")
            py_console.prompt()
            self.status = "main"

    def process_block(self, src):
        block = src[src.rfind('>>>') + 4:].splitlines()
        block = [block[0]] + [b[4:] for b in block[1:]]
        block_src = '\n'.join(block)
        # status must be set before executing code in globals()
        self.status = "main"
        try:
            _ = exec(block_src, self.namespace)
            if _ is not None:
                # if clause temporarily inserted for investigation
                if '1,$exec_' in _:
                    if hasattr(RUR, 'debug') and RUR.debug:
                        print(repr(_))
                else:
                    print(repr(_))
        except:
            print_exc()
        py_console.prompt()

    def process_code(self, src):
        self.history.append(self.current_line)
        self.current = len(self.history)
        if self.status == "main" or self.status == "multiline":
            self.process_statement()  # self.current_line
        elif self.current_line == "":  # end of block
            self.process_block(src)
        else:
            py_console.more()

repl = Interpreter()
window["restart_repl"] = repl.restart
RUR.py_console_loaded = True
