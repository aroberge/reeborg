import unittest
import highlight


""" In the following, the functions move() and test() are considered as representative
    functions in Reeborg's World.  When these functions are encountered, a
    special "frame" is created.  The code execution is then displayed frame by frame.
    Thus, one can have a correspondance between a specific frame displayed and
    a corresponding line of code being highlighted.

    Let's considered some concrete examples.   In what follows, the line number
    for a given line of code appears at the end of the line in a comment.

    The simplest example is that of a single instruction:

    move()   # 1

    We choose RUR.set_lineno_highlight()
    to be the name of the function setting the line number variable.
    Thus, after processing, this example would become

    RUR.set_lineno_highlight(1)
    move()  # 1

"""

test_single_move = '''
move()
'''

test_single_move_result = '''
RUR.set_lineno_highlight(1)
move()
'''

test_four_instructions = '''
move()
turn_left()
turn_left()
turn_left()
'''

""" Some instructions however will not generate a frame; yet, it might
    still be seen as desirable to generate a frame so that the user
    can see the code being highlighted in the editor. To do so, we use
    an optional argument in our call to RUR.set_lineno_highlight().

    We will consider only two cases:

    1. single keyword instruction such as pass, continue or break
    2. variable assignment where an equality sign is used.
"""

test_pass = '''
pass
'''

test_pass_result = '''
RUR.set_lineno_highlight(1, frame=True)
pass
'''

test_single_assignment_1 = '''
x=2
'''

test_single_assignment_1_result = '''
RUR.set_lineno_highlight(1, frame=True)
x=2
'''

test_single_assignment_2 = '''
   x  =  2
'''

test_single_assignment_2_result = '''
   RUR.set_lineno_highlight(1, frame=True)
   x  =  2
'''

"""
    Next, we consider function definitions:
"""

test_def = '''
def twice():
    move()
    move()
'''

test_def_result = '''
RUR.set_lineno_highlight(1, frame=True)
def twice():
    RUR.set_lineno_highlight(2)
    move()
    RUR.set_lineno_highlight(3)
    move()
'''

""" Classes should follow the same pattern """

test_class = '''
class Robot(UsedRobot):

    def turn_right(self):
        turn_left()
        turn_left()
        turn_left()

    def to_do():
        pass
'''

test_class_result = '''
RUR.set_lineno_highlight(1, frame=True)
class Robot(UsedRobot):

    RUR.set_lineno_highlight(3, frame=True)
    def turn_right(self):
        RUR.set_lineno_highlight(4)
        turn_left()
        RUR.set_lineno_highlight(5)
        turn_left()
        RUR.set_lineno_highlight(6)
        turn_left()

    RUR.set_lineno_highlight(8, frame=True)
    def to_do():
        RUR.set_lineno_highlight(9, frame=True)
        pass
'''

"""  Basic for and while loops present a certain challenge in that
    the line numbering information must indicate that they possibly
    go back to the beginning of the loop multiple times.
    This is accomplished with having a frame pointing to the for loop
    at the top of the loop.

    To make sure that there is some indication that the loop is
    executed, we add a frame before as well ... this means that
    it will take frames to enter a loop, highlighting the for or while
    statement twice in a row the first time through.

"""

test_for = '''
for i in range(n):
    move()
    move()
move()
'''

test_for_result = '''
RUR.set_lineno_highlight(1, frame=True)
for i in range(n):
    RUR.set_lineno_highlight(1, frame=True)
    RUR.set_lineno_highlight(2)
    move()
    RUR.set_lineno_highlight(3)
    move()
RUR.set_lineno_highlight(4)
move()
'''

test_while = '''
while test():
    move()
    move()
move()
'''

test_while_result = '''
RUR.set_lineno_highlight(1, frame=True)
while test():
    RUR.set_lineno_highlight(1, frame=True)
    RUR.set_lineno_highlight(2)
    move()
    RUR.set_lineno_highlight(3)
    move()
RUR.set_lineno_highlight(4)
move()
'''

"""
    Simple if statements are easy to consider:

    if test():   # 11
        move()   # 12

    can be simply as being transformed as follows:

    RUR.set_lineno_highlight(11, frame=True)
    if test():  # 11
        RUR.set_lineno_highlight(12)
        move()   # 12

    The (small) disadvantage of this approach is that the evaluation of the
    if statement could require two frames instead of one
    which might be confusing if the execution of the program is
    done by pressing the "step" button; however, we think it is
    something worthwhile.

"""

test_if = '''
if test():
    move()
'''

test_if_result = '''
RUR.set_lineno_highlight(1, frame=True)
if test():
    RUR.set_lineno_highlight(2)
    move()
'''

test_if_else = '''
if test():
    move()
else:
    pass
'''

test_if_else_result = '''
RUR.set_lineno_highlight(1, frame=True)
if test():
    RUR.set_lineno_highlight(2)
    move()
else:
    RUR.set_lineno_highlight(3, frame=True)
    RUR.set_lineno_highlight(4, frame=True)
    pass
'''

""" elif are a bit tricker to handle.  One the one hand, we can not insert
    a statement just before them and expect it to be executed.  On the other hand,
    if we insert something after, and the condition is determined to be False,
    so that we'd go to the next elif or else branch, we'd never go inside the body
    and have the highlighting statement be executed.
    A way out of this is to insert the highlighting statement as an additional
    logical test to be performed, but guaranteed to be always True as
    follows.
"""

test_if_elif_else = '''
if test():
    move()
elif other_test():
    turn_left()
else:
    pass
'''

test_if_elif_else_result = '''
RUR.set_lineno_highlight(1, frame=True)
if test():
    RUR.set_lineno_highlight(2)
    move()
elif RUR.set_lineno_highlight(3, frame=True) and other_test():
    RUR.set_lineno_highlight(4)
    turn_left()
else:
    RUR.set_lineno_highlight(5, frame=True)
    RUR.set_lineno_highlight(6, frame=True)
    pass
'''

""" So far, these are the Python keywords that could appear as
    the first "word" in a statement and that we have covered:

    def, for, if, elif, else, while, class, pass

    The remaining keywords which can appear at the beginning of a statement are

    break, continue, del, except, finally, from, global, import, nonlocal,
    raise, return, try, with, yield

    Those that could not appear at the beginning of a statement are:

    False, None, True, and, as, in, lambda, not, or

    Let's consider examples from the Python tutorial for the remaining
    keywords that we have to cover.
"""

# Note : the following also tests comments

test_break = '''
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print(n, 'equals', x, '*', n//x)
            break
    else:
        # loop fell through without finding a factor
        print(n, 'is a prime number')
'''

test_break_result = '''
RUR.set_lineno_highlight(1, frame=True)
for n in range(2, 10):
    RUR.set_lineno_highlight(1, frame=True)
    RUR.set_lineno_highlight(2, frame=True)
    for x in range(2, n):
        RUR.set_lineno_highlight(2, frame=True)
        RUR.set_lineno_highlight(3, frame=True)
        if n % x == 0:
            RUR.set_lineno_highlight(4)
            print(n, 'equals', x, '*', n//x)
            RUR.set_lineno_highlight(5, frame=True)
            break
    else:
        RUR.set_lineno_highlight(6, frame=True)
        # loop fell through without finding a factor
        RUR.set_lineno_highlight(8)
        print(n, 'is a prime number')
'''

test_continue = '''
for num in range(2, 10):
    if num % 2 == 0:
        print("Found an even number", num)
        continue
    print("Found a number", num)
'''

test_continue_result = '''
RUR.set_lineno_highlight(1, frame=True)
for num in range(2, 10):
    RUR.set_lineno_highlight(1, frame=True)
    RUR.set_lineno_highlight(2, frame=True)
    if num % 2 == 0:
        RUR.set_lineno_highlight(3)
        print("Found an even number", num)
        RUR.set_lineno_highlight(4, frame=True)
        continue
    RUR.set_lineno_highlight(5)
    print("Found a number", num)
'''

test_from_import = '''
import this
from this import that
'''

test_from_import_result = '''
RUR.set_lineno_highlight(1, frame=True)
import this
RUR.set_lineno_highlight(2, frame=True)
from this import that
'''

test_try_except_finally = '''
def divide(x, y):
    try:
        result = x / y
    except ZeroDivisionError:
        print("division by zero!")
    else:
        print("result is", result)
    finally:
        print("executing finally clause")
'''


test_try_except_finally_result = '''
RUR.set_lineno_highlight(1, frame=True)
def divide(x, y):
    RUR.set_lineno_highlight(2, frame=True)
    try:
        RUR.set_lineno_highlight(3, frame=True)
        result = x / y
    except ZeroDivisionError:
        RUR.set_lineno_highlight(4, frame=True)
        RUR.set_lineno_highlight(5)
        print("division by zero!")
    else:
        RUR.set_lineno_highlight(6, frame=True)
        RUR.set_lineno_highlight(7)
        print("result is", result)
    finally:
        RUR.set_lineno_highlight(8, frame=True)
        RUR.set_lineno_highlight(9)
        print("executing finally clause")
'''

test_return = '''
def twice(x):
    return x*2
'''

test_return_result = '''
RUR.set_lineno_highlight(1, frame=True)
def twice(x):
    RUR.set_lineno_highlight(2, frame=True)
    return x*2
'''

test_del = '''
del x
'''

test_del_result = '''
RUR.set_lineno_highlight(1, frame=True)
del x
'''

test_global_nonlocal = '''
def twice(x):
    global x
    nonlocal y
    return x*2
'''

test_global_nonlocal_result = '''
RUR.set_lineno_highlight(1, frame=True)
def twice(x):
    RUR.set_lineno_highlight(2)
    global x
    RUR.set_lineno_highlight(3)
    nonlocal y
    RUR.set_lineno_highlight(4, frame=True)
    return x*2
'''

test_raise = '''
try:
    raise NameError('HiThere')
except NameError:
    print('An exception flew by!')
    raise
'''

test_raise_result = '''
RUR.set_lineno_highlight(1, frame=True)
try:
    RUR.set_lineno_highlight(2, frame=True)
    raise NameError('HiThere')
except NameError:
    RUR.set_lineno_highlight(3, frame=True)
    RUR.set_lineno_highlight(4)
    print('An exception flew by!')
    RUR.set_lineno_highlight(5, frame=True)
    raise
'''

test_with = '''
with A() as a, B() as b:
    suite
'''

test_with_result = '''
RUR.set_lineno_highlight(1, frame=True)
with A() as a, B() as b:
    RUR.set_lineno_highlight(2, frame=True)
    suite
'''

test_yield = '''
def get_primes(number):
    while True:
        if is_prime(number):
            yield number
        number += 1
'''

test_yield_result = '''
RUR.set_lineno_highlight(1, frame=True)
def get_primes(number):
    RUR.set_lineno_highlight(2, frame=True)
    while True:
        RUR.set_lineno_highlight(2, frame=True)
        RUR.set_lineno_highlight(3, frame=True)
        if is_prime(number):
            RUR.set_lineno_highlight(4, frame=True)
            yield number
        RUR.set_lineno_highlight(5, frame=True)
        number += 1
'''


#################
# tests added for diagnostics; they might not be tested within this file per se

test_around2 = '''
from my_lib import *
think(25)

put()
move()
while not token_here():
    if right_is_clear():
        turn_right()
        move()
    elif front_is_clear():
        move()
    else:
        turn_left()
'''



class TestSequenceFunctions(unittest.TestCase):

    def test_single_move(self):
        result, _ = highlight.insert_highlight_info(test_single_move)
        self.assertEqual(test_single_move_result, result)

    def test_pass(self):
        result, _ = highlight.insert_highlight_info(test_pass)
        self.assertEqual(test_pass_result, result)

    def test_single_assignment(self):
        result, _ = highlight.insert_highlight_info(test_single_assignment_1)
        self.assertEqual(test_single_assignment_1_result, result)

        result, _ = highlight.insert_highlight_info(test_single_assignment_2)
        self.assertEqual(test_single_assignment_2_result, result)

    def test_def(self):
        result, _ = highlight.insert_highlight_info(test_def)
        self.assertEqual(test_def_result, result)

    def test_class(self):
        result, _ = highlight.insert_highlight_info(test_class)
        self.assertEqual(test_class_result, result)

    def test_for(self):
        result, _ = highlight.insert_highlight_info(test_for)
        self.assertEqual(test_for_result, result)

    def test_while(self):
        result, _ = highlight.insert_highlight_info(test_while)
        self.assertEqual(test_while_result, result)

    def test_if(self):
        result, _ = highlight.insert_highlight_info(test_if)
        self.assertEqual(test_if_result, result)

    def test_if_else(self):
        result, _ = highlight.insert_highlight_info(test_if_else)
        self.assertEqual(test_if_else_result, result)


    def test_if_elif_else(self):
        result, _ = highlight.insert_highlight_info(test_if_elif_else)
        self.assertEqual(test_if_elif_else_result, result)

    def test_break(self):
        # test comments as well
        result, _ = highlight.insert_highlight_info(test_break)
        self.assertEqual(test_break_result, result)

    def test_continue(self):
        result, _ = highlight.insert_highlight_info(test_continue)
        self.assertEqual(test_continue_result, result)

    def test_from_import(self):
        result, _ = highlight.insert_highlight_info(test_from_import)
        self.assertEqual(test_from_import_result, result)

    def test_try_except_finally(self):
        result, _ = highlight.insert_highlight_info(test_try_except_finally)
        self.assertEqual(test_try_except_finally_result, result)

    def test_return(self):
        result, _ = highlight.insert_highlight_info(test_return)
        self.assertEqual(test_return_result, result)

    def test_del(self):
        result, _ = highlight.insert_highlight_info(test_del)
        self.assertEqual(test_del_result, result)

    def test_global_nonlocal(self):
        result, _ = highlight.insert_highlight_info(test_global_nonlocal)
        self.assertEqual(test_global_nonlocal_result, result)

    def test_raise(self):
        result, _ = highlight.insert_highlight_info(test_raise)
        self.assertEqual(test_raise_result, result)

    def test_with(self):
        result, _ = highlight.insert_highlight_info(test_with)
        self.assertEqual(test_with_result, result)

    def test_yield(self):
        result, _ = highlight.insert_highlight_info(test_yield)
        self.assertEqual(test_yield_result, result)

if __name__ == '__main__':
    unittest.main()