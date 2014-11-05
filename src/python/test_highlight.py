import unittest
import highlight
import test_sources as src

class TestSequenceFunctions(unittest.TestCase):

    def test_simple(self):
        tracer = highlight.InsertTracer(src.simple)
        result = tracer.process()
        self.assertEqual(src.simple_result, result)

    def test_simple_no_spaces(self):
        tracer = highlight.InsertTracer(src.simple_1)
        result = tracer.process()
        self.assertEqual(src.simple_result_1, result)

    def test_def(self):
        tracer = highlight.InsertTracer(src.def_code)
        result = tracer.process()
        self.assertEqual(src.def_code_result, result)

    def test_while(self):
        tracer = highlight.InsertTracer(src.while_loop)
        result = tracer.process()
        self.assertEqual(src.while_loop_result, result)

    def test_only_while(self):
        tracer = highlight.InsertTracer(src.only_while_loop)
        result = tracer.process()
        self.assertEqual(src.only_while_loop_result, result)

    def test_if(self):
        tracer = highlight.InsertTracer(src.if_elif_else)
        result = tracer.process()
        self.assertEqual(src.if_elif_else_result, result)

    def test_complex(self):
        tracer = highlight.InsertTracer(src.complex_code)
        result = tracer.process()
        self.assertEqual(src.complex_code_result, result)

    def test_three_levels_if(self):
        tracer = highlight.InsertTracer(src.three_levels_if)
        result = tracer.process()
        self.assertEqual(src.three_levels_if_result, result)

if __name__ == '__main__':
    unittest.main()
