import unittest
import highlight

simple = """
a=5
for x in range(a):
    print(x)
print("Happy end")
"""

# result simple
simple_result = """
_tp(1)
a=5
_tp(2)
for x in range(a):
    _tp(3)
    print(x)
    _tp(2)
_tp(4)
print("Happy end")
"""
###################################
# simple no spaces: no blank line at beginning and no \n at the end
simple_1 = """a=5
for x in range(a):
    print(x)
print("Happy end")"""

# result simple
simple_result_1 = """_tp(0)
a=5
_tp(1)
for x in range(a):
    _tp(2)
    print(x)
    _tp(1)
_tp(3)
print("Happy end")"""

#####################################
# example of definition
def_code = """
def turn_right():
    turn_left()
    turn_left()
    turn_left()

"""
def_code_result = """
_tp(1)
def turn_right():
    _tp(2)
    turn_left()
    _tp(3)
    turn_left()
    _tp(4)
    turn_left()

"""

#####################################

while_loop = """
while token_here():
    take()
move()
"""

while_loop_result = """
_tp(1)
while token_here():
    _tp(2)
    take()
    _tp(1)
_tp(3)
move()
"""

##########################################

if_elif_else = """
if right_is_clear():
    turn_right()
    move()
elif front_is_clear():
    move()
else:
    turn_left()
"""

if_elif_else_result = """
_tp(1)
if right_is_clear():
    _tp(2)
    turn_right()
    _tp(3)
    move()
elif front_is_clear():
    _tp(4)
    RUR.control.null()
    _tp(5)
    move()
else:
    _tp(6)
    RUR.control.null()
    _tp(7)
    turn_left()
"""



class TestSequenceFunctions(unittest.TestCase):

    def test_simple(self):
        tracer = highlight.InsertTracer(simple)
        result = tracer.process()
        self.assertEqual(simple_result, result)

    def test_simple_no_spaces(self):
        tracer = highlight.InsertTracer(simple_1)
        result = tracer.process()
        self.assertEqual(simple_result_1, result)

    def test_def(self):
        tracer = highlight.InsertTracer(def_code)
        result = tracer.process()
        self.assertEqual(def_code_result, result)

    def test_while(self):
        tracer = highlight.InsertTracer(while_loop)
        result = tracer.process()
        self.assertEqual(while_loop_result, result)

    def test_if(self):
        tracer = highlight.InsertTracer(if_elif_else)
        result = tracer.process()
        self.assertEqual(if_elif_else_result, result)

if __name__ == '__main__':
    unittest.main()