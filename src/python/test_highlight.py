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

"""

test_for = '''
for i in range(n):
    move()
    move()
move()
'''

test_for_result = '''
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

    might be thought as being transformed as follows:

    RUR.set_lineno_highlight(11)
    if test():  # 11
        RUR.set_lineno_highlight(12)
        move()   # 12

    However, for line 11 to be highlighted, we need to make sure that
    the test() function results in a frame being recorded.
    If this is not the case, then line 11 will appear as being skipped over.
    This could be handled by using RUR.set_lineno_highlight() in the
    following way:

    if RUR.set_lineno_highlight(11, frame=True) and test():  # 11
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
if RUR.set_lineno_highlight(1, frame=True) and test():
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
if RUR.set_lineno_highlight(1, frame=True) and test():
    RUR.set_lineno_highlight(2)
    move()
else:
    RUR.set_lineno_highlight(3, frame=True)
    RUR.set_lineno_highlight(4, frame=True)
    pass
'''


class TestSequenceFunctions(unittest.TestCase):

    def test_single_move(self):
        result = highlight.insert_highlight_info(test_single_move)
        self.assertEqual(test_single_move_result, result)

    def test_pass(self):
        result = highlight.insert_highlight_info(test_pass)
        self.assertEqual(test_pass_result, result)

    def test_single_assignment(self):
        result = highlight.insert_highlight_info(test_single_assignment_1)
        self.assertEqual(test_single_assignment_1_result, result)

        result = highlight.insert_highlight_info(test_single_assignment_2)
        self.assertEqual(test_single_assignment_2_result, result)

    def test_def(self):
        result = highlight.insert_highlight_info(test_def)
        self.assertEqual(test_def_result, result)

    def test_class(self):
        result = highlight.insert_highlight_info(test_class)
        self.assertEqual(test_class_result, result)

    def test_for(self):
        result = highlight.insert_highlight_info(test_for)
        self.assertEqual(test_for_result, result)

    def test_while(self):
        result = highlight.insert_highlight_info(test_while)
        self.assertEqual(test_while_result, result)

    def test_if(self):
        result = highlight.insert_highlight_info(test_if)
        self.assertEqual(test_if_result, result)

    def test_if_else(self):
        result = highlight.insert_highlight_info(test_if_else)
        self.assertEqual(test_if_else_result, result)



if __name__ == '__main__':
    unittest.main()