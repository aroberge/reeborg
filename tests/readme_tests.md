This directory contains two sub-directories:

* integration_tests: tests that use [QUnit](https://qunitjs.com/) and a slightly modified version
  of the main html file to run functional tests. As an example of what we
  mean by a functional test: we can load a sample world, load a Python
  or Javascript program, run the program and verify that the resulting world
  state is as expected.

  The aim of these tests is to ensure that every function (e.g. `move()`, `take()`, etc.)
  used in writing programs by users (e.g. students) has the expected result,
  including raising exceptions in some cases.

  Integration tests should cover both the OOP version, like `reeborg.move()`
  and the simple function version, like `move()`. As well, they should cover
  versions that use other languages (e.g. `avance()` in French).

* unit_tests: tests that use [tape](https://github.com/substack/tape)
  to test single javascript functions.

  The aim is to test every single function that is exposed to the
  advanced users (e.g. teachers) as "advanced world creation" tools.

These tests should be documented using jsdoc.
