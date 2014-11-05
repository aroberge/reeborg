import unittest
import highlight


# simple
simple_code_txt = """
a=5
for x in range(a):
    print(x)
print("Happy end")
"""

# if elif else
ifelifelse_code_txt = """
a=5
if a > 8:
    print("good)
elif a >= 5:
    print("not bad")
else:
    print("bad")
print("Happy end")
"""

# result simple
simple_result_txt = """
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

# big
big_code_txt = """
def fun(x):
    s=x*2
    print(x)
    return(s)

a=5
stuff = []
for x in range(a):
    print("loop")
    if x%2==0:
        stuff.append(x)
    else:
        fun(x)
print("Happy end")
print( stuff )
"""

class TestSequenceFunctions(unittest.TestCase):

    def test_simple(self):
        test = highlight.InsertTracer(simple_code_txt)
        result = test.process()
        self.assertEqual(simple_result_txt, result)


if __name__ == '__main__':
    unittest.main()