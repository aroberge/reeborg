
import filecmp
import os
import unittest
import sys
sys.path.insert(0, "../src")

import pytools  # NOQA

class TestTemplates(unittest.TestCase):

    def setUp(self):
        pass

    def test_create_str(self):
        with open("utf8_test.template") as filename:
            content = filename.read()
        self.assertEqual(pytools.create_template("utf8_test.py"), content)

    def test_create_file(self):
        pytools.create_template("utf8_test.py", "junk")
        self.assertTrue(filecmp.cmp("utf8_test.template", "junk", shallow=False))  # NOQA
        os.remove("junk")


class TestRoundTrip(unittest.TestCase):

    def setUp(self):
        pass

    def test_round_trip(self):
        pytools.create_template("utf8_test.py", "junk.template")
        pytools.py2json("utf8_test.py", "junk.json")
        pytools.json2py("junk.json", "junk.template", "junk.py")
        self.assertTrue(filecmp.cmp("utf8_test.py", "junk.py", shallow=False))
        for f in ["junk.template", "junk.json", "junk.py"]:
            os.remove(f)


if __name__ == '__main__':
    unittest.main()
