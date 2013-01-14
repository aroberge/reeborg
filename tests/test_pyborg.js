// QUnit tests of reeborg.js

module("Line of Code");

test('single line', function(){
    var line = new LineOfCode('a', 0);
    strictEqual(line.line_number, 0, 'line_number');
    strictEqual(line.indentation, 0, 'indentation');
    strictEqual(line.content, "a", 'content');
});

test('remove comment', function(){
    var line = new LineOfCode(' ab#cd', 3);
    strictEqual(line.line_number, 3, 'line_number');
    strictEqual(line.indentation, 1, 'indentation');
    strictEqual(line.content, "ab", 'content');
});
test('remove comment', function(){
    var line = new LineOfCode('   #cd', 2);
    strictEqual(line.indentation, 3, 'indentation');
    strictEqual(line.content, "", "content");
});
test('remove comment', function(){
    var line = new LineOfCode('# #  ', 0);
    strictEqual(line.indentation, 0, 'indentation');
    strictEqual(line.content, "", "content");
});
test('remove comment', function(){
    var line = new LineOfCode('"#" #  ', 0);
    strictEqual(line.indentation, 0, 'indentation');
    strictEqual(line.content, '"#" ', 'content');
});
test('remove comment', function(){
    var line = new LineOfCode('says("# aren\'t #") # numbers are not numbers', 0);
    strictEqual(line.indentation, 0, 'indentation');
    strictEqual(line.content, 'says("# aren\'t #") ', 'content');
});

/* ====================================*/

module("UserProgram");

test('testing next_line', function(){
    var program = new UserProgram("a");
    var line = new LineOfCode("a", 0);
    var next_line = program.next_line();
    strictEqual(line.line_number, next_line.line_number, "line_number");
    strictEqual(line.indentation, next_line.indentation, "indentation");
    strictEqual(line.content, next_line.content, "same content in both lines");
    program.previous_line();
    strictEqual(line.line_number, next_line.line_number, "linenumber");
    strictEqual(line.indentation, next_line.indentation, "indentation");
    strictEqual(line.content, next_line.content, "same content in both lines");
});

/* ====================================*/

module("Block");

test('test single line', function(){
    var program = new UserProgram("move()");
    var block = new Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(block.lines[0].type, "command", "type");
    strictEqual(program.syntax_error, null, "syntax error");
    //
    program = new UserProgram("wrong");
    block = new Block(program);
    deepEqual(program.syntax_error, [0, "Unknown command: wrong"], "syntax error");
});

test('test allow spaces with command parentheses', function(){
    var program = new UserProgram("move (  )  ");
    var block = new Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(block.lines[0].type, "command", "type");
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test single line French', function(){
    var program = new UserProgram("avance()", "fr");
    var block = new Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(program.syntax_error, null, "syntax error");
    //
    program = new UserProgram("wrong", "fr");
    block = new Block(program);
    deepEqual(program.syntax_error, [0, "Commande inconnue: wrong"], "syntax error");
});

test('test two lines', function(){
    var program = new UserProgram("move()\nturn_left()");
    var block = new Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(block.lines[1].name, "turn_left", "name");
    strictEqual(block.lines[0].type, "command", "type");
    strictEqual(block.lines[1].type, "command", "type");
    strictEqual(program.syntax_error, null, "syntax error");
    //
    program = new UserProgram("move()\nwrong");
    block = new Block(program);
    deepEqual(program.syntax_error, [1, "Unknown command: wrong"], "syntax error");
});

test('test two lines french', function(){
    var program = new UserProgram("avance()\ntourne_à_gauche()", "fr");
    var block = new Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(block.lines[1].name, "turn_left", "name");
    strictEqual(block.lines[0].type, "command", "type");
    strictEqual(block.lines[1].type, "command", "type");
    strictEqual(program.syntax_error, null, "syntax error");
    //
    program = new UserProgram("avance()\nwrong", "fr");
    block = new Block(program);
    deepEqual(program.syntax_error, [1, "Commande inconnue: wrong"], "syntax error");
});

test('test indentation', function(){
    var program = new UserProgram("move()\n  move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [1, "Indentation error"], "indentation error");
    //
    program = new UserProgram("  move()");
    block = new Block(program);
    deepEqual(program.syntax_error, [0, "Indentation error"], "indentation error");
    //
    program = new UserProgram("def a():\nmove()");
    block = new Block(program);
    deepEqual(program.syntax_error, [1, "Indentation error"], "indentation error");
});

test('test blank line', function(){
    var program = new UserProgram("move()\n\nmove()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test def', function(){
    var p = "def turn_around():\n  turn_left()\n  turn_left()\nturn_around()";
    var program = new UserProgram(p);
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].method_name, "turn_around", "method name");
    strictEqual(block.lines[0].type, "def block", "type");

    strictEqual(block.lines[1].name, "turn_around", "name");

    var sub_block = block.lines[0].block;
    strictEqual(sub_block.lines[0].name, "turn_left", "name");
    strictEqual(sub_block.lines[1].name, "turn_left", "name");

    //
    var p = "def    mm()    :\n  move()\n  move()\nmm()";
    var program = new UserProgram(p);
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    //
    var program = new UserProgram("def :\n move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, 'Syntax error: bad method name or missing colon.'], "syntax error");
    //
    var program = new UserProgram("def m()\n move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, 'Syntax error: bad method name or missing colon.'], "syntax error");
});

test('test def not allowed', function(){
    var program = new UserProgram("def move():\n  turn_left()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, "Attempt to redefine 'move'"], "redefine not allowed");

    var program = new UserProgram("def m():\n  move()\ndef m():\n move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [2, "Attempt to redefine 'm'"], "redefine not allowed");
});

test('test assignment builtin', function(){
    var program = new UserProgram("mo = move\nmo()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");

    var program = new UserProgram("m = move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, "Syntax error: 'm = move()'"], "syntax error");

    var program = new UserProgram("m() = move");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, "Syntax error: 'm() = move'"], "syntax error");

    var program = new UserProgram("move = turn_left");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, "Attempt to redefine 'move'"], "syntax error");

    var program = new UserProgram("move = a");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, "Attempt to redefine 'move'"], "syntax error");

});

test('test assignment method', function(){
    var program = new UserProgram("def m2():\n move()\n move()\nmm=m2\nmm()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");

    var program = new UserProgram("def m2():\n move()\n move()\nm2 = move");
    var block = new Block(program);
    deepEqual(program.syntax_error, [3, "Attempt to redefine 'm2'"], "syntax error");
});

test('test assignment True', function(){
    var program = new UserProgram("t = True");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test assignment True if with not', function(){
    var program = new UserProgram("vrai = True\nif vrai:\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[1].type, "if block", "type");
    strictEqual(block.lines[1].condition, true, "condition");

});

test('test assignment False', function(){
    var program = new UserProgram("f = False");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test assignment condition', function(){
    var program = new UserProgram("t = on_beeper");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test assignment condition', function(){
    var program = new UserProgram("t=on_beeper\nif not t():\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[1].type, "if block");
    strictEqual(block.lines[1].condition, "on_beeper()");
    strictEqual(block.lines[1].negate_condition, true);
});

test('test if true', function(){
    var program = new UserProgram("if True:\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, true, "condition");

    var program = new UserProgram("if     True     :    \n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, true, "condition");
});

test('test if false', function(){
    var program = new UserProgram("if False:\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, false, "condition");
});

test('test if on_beeper', function(){
    var program = new UserProgram("if on_beeper():\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, "on_beeper()", "condition");
    strictEqual(block.lines[0].negate_condition, false, "negate condition");
});

test('test if not on_beeper', function(){
    var program = new UserProgram("if not on_beeper():\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, "on_beeper()", "condition");
    strictEqual(block.lines[0].negate_condition, true, "negate condition");
});

test('test if on_beeper with spaces', function(){
    var program = new UserProgram("if on_beeper ( \t ) :\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, "on_beeper()", "condition");
});

test('test if on_beeper', function(){
    var program = new UserProgram("if invalid:\n  move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, "Invalid test condition: invalid"], "syntax error");
});

test('test if elif true', function(){
    var program = new UserProgram("if True:\n move()\nelif True:\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test if true else', function(){
    var program = new UserProgram("if True:\n move()\nelse:\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test if elif missing', function(){
    var program = new UserProgram("elif True:\n  move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [0, "'elif' or 'else' without matching 'if'"], "syntax error");
});

test('test if elif false', function(){
    var program = new UserProgram("if True:\n move()\nelif False:\n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");

    var program = new UserProgram("if True:\n move()\nelif True:\n  move()\nelif     False     :    \n  move()");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");

    p = "if False:\n" +
        "   turn_left()\n" +
        "elif False:\n" +
        "   turn_left()\n" +
        "elif True:\n" +
        "   move()";
    var program = new UserProgram(p);
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test elif invalid', function(){
    var program = new UserProgram("if True:\n move()\nelif invalid:\n  move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [2, "Invalid test condition: invalid"], "syntax error");
});

test('test if else syntax error', function(){
    var program = new UserProgram("if True:\n move()\nelse: move()");
    var block = new Block(program);
    deepEqual(program.syntax_error, [2, "Unknown command: else: move()" ], "syntax error");
});

test('test while if break', function(){
    var program = new UserProgram("while True:\n  if True:\n     break");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test while if elif break', function(){
    p = "while True:\n"+
        "   if False:\n"+
        "      move()\n"+
        "   elif True:\n"+
        "      break";
    var program = new UserProgram(p);
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test while if else break', function(){
    p = "while True:\n"+
        "   if False:\n"+
        "      move()\n"+
        "   else:\n"+
        "      break";
    var program = new UserProgram(p);
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test pass', function(){
    var program = new UserProgram("pass");
    var block = new Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

// /* ====================================*/

// module("MockBlockRunner");

// test('test move', function(){
//     var program = new UserProgram("move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0], 'lines executed');
// });

// test('test pass', function(){
//     var program = new UserProgram("pass");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, [], 'output');
//     deepEqual(runner.lines_executed, [0], 'lines executed');
// });

// test('test method', function(){
//     var p = "def turn_around():\n  turn_left()\n  turn_left()\nturn_around()"
//     var program = new UserProgram(p);
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["turn_left()", "turn_left()"], 'output');
//     deepEqual(runner.lines_executed, [0, 3, 1, 2], 'lines executed');

//     var p = "def t2():\n  turn_left()\n  turn_left()\nt2()\nt2()"
//     var program = new UserProgram(p);
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["turn_left()", "turn_left()", "turn_left()", "turn_left()"],
//                 'output');
//     deepEqual(runner.lines_executed, [0, 3, 1, 2, 4, 1, 2],
//                 'lines executed');
// });

// test('test assignment builtin', function(){
//     var program = new UserProgram("m=move\nm()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1], 'lines executed');
// });

// test('test assignment user_defined', function(){
//     var program = new UserProgram("def m2():\n move()\n move()\nmm=m2\nmm()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 3, 4, 1, 2], 'lines executed');
// });

// test('test blank line', function(){
//     var program = new UserProgram("move()\n\nmove()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 2], 'lines executed');
// });

// test('test if True', function(){
//     var program = new UserProgram("if True:\n  move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1], 'lines executed');
// });

// test('test if not True', function(){
//     var program = new UserProgram("if not True:\n  move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, [], 'output');
//     deepEqual(runner.lines_executed, [0], 'lines executed');
// });

// test('test if True twice', function(){
//     var program = new UserProgram("if True:\n  move()\nif True:\n  move()\n");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1, 2, 3], 'lines executed');
// });

// test('test if True if False', function(){
//     var program = new UserProgram("if True:\n  move()\nif False:\n  turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1, 2], 'lines executed');
// });

// test('test if False', function(){
//     var program = new UserProgram("if False:\n  move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, [], 'output');
//     deepEqual(runner.lines_executed, [0], 'lines executed');
// });

// test('test if not False', function(){
//     var program = new UserProgram("if not False:\n  move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1], 'lines executed');
// });

// test('test if on_beeper  (   ) True', function(){
//     var program = new UserProgram("if on_beeper (\t ) \t :\n  move(\t )");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block, [true]);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1], 'lines executed');
// });

// test('test if on_beeper() True/False', function(){
//     var program = new UserProgram("if on_beeper():\n  move()\nif on_beeper():\n  turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block, [true, false]);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1, 2], 'lines executed');
// });

// test('test if on_beeper False', function(){
//     var program = new UserProgram("if on_beeper():\n  move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block, [false]);
//     deepEqual(runner.output, [], 'output');
//     deepEqual(runner.lines_executed, [0], 'lines executed');
// });

// test('test if False elif True', function(){
//     var program = new UserProgram("if False:\n  move()\nelif True:\n turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["turn_left()"], 'output');
//     deepEqual(runner.lines_executed, [0, 2, 3], 'lines executed');
// });

// test('test if False elif on_beeper True', function(){
//     var program = new UserProgram("if False:\n  move()\nelif on_beeper():\n turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block, [true]);
//     deepEqual(runner.output, ["turn_left()"], 'output');
//     deepEqual(runner.lines_executed, [0, 2, 3], 'lines executed');
// });

// test('test if False elif on_beeper False', function(){
//     var program = new UserProgram("if False:\n  move()\nelif on_beeper():\n turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block, [false]);
//     deepEqual(runner.output, [], 'output');
//     deepEqual(runner.lines_executed, [0, 2], 'lines executed');
// });

// test('test if False elif False', function(){
//     var program = new UserProgram("if False:\n  move()\nelif False:\n turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, [], 'output');
//     deepEqual(runner.lines_executed, [0, 2], 'lines executed');
// });

// test('test if True elif True', function(){
//     var program = new UserProgram("if True:\n  move()\nelif True:\n turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1, 2], 'lines executed');
// });

// test('test if False elif False then True', function(){
//     var program = new UserProgram("if False:\n  turn_left()\nelif False:\n turn_left()\nelif True:\n move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 2, 4, 5], 'lines executed');
// });

// test('test if True else', function(){
//     var program = new UserProgram("if True:\n  move()\nelse:\n turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 1, 2], 'lines executed');
// });

// test('test if False elif False else', function(){
//     var program = new UserProgram("if False:\n  turn_left()\nelif False:\n turn_left()\nelse:\n move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 2, 4, 5], 'lines executed');
// });

// test('test while on_beeper()', function(){
//     var program = new UserProgram("while on_beeper():\n  move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block, [true, true, false]);
//     deepEqual(runner.output, ["move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 0, 1, 0, 1, 0], 'lines executed');
// });

// test('test while on_beeper (  ) with extra spaces', function(){
//     var program = new UserProgram("while on_beeper  (\t ):\n  move (  )");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block, [true, true, false]);
//     deepEqual(runner.output, ["move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 0, 1, 0, 1, 0], 'lines executed');
// });


// test('test while break', function(){
//     var program = new UserProgram("while True:\n move()\n move()\n break\n turn_left()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 0, 1, 2, 3], 'lines executed');
// });

// test('test while with if break', function(){
//     var p = "while True:\n"+
//             "    move()\n"+
//             "    if True:\n"+
//             "         move()\n"+
//             "         break\n"+
//             "    turn_left()\n"+
//             "    move()"
//     var program = new UserProgram(p);
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 0, 1, 2, 3, 4], 'lines executed');
// });

// test('test break with many levels', function(){
//     var p = "while True:\n"+
//             "  move()\n"+
//             "  if True:\n"+
//             "      move()\n"+
//             "      if True:\n"+
//             "         move()\n"+
//             "         break\n"+
//             "  turn_left()"
//     var program = new UserProgram(p);
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()", "move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 0, 1, 2, 3, 4, 5, 6], 'executed');
// });

// test('test break with many levels 2', function(){
//     var p = "while True:\n"+
//             "  move()\n"+
//             "  if True:\n"+
//             "      move()\n"+
//             "      if True:\n"+
//             "         move()\n"+
//             "         if True:\n"+
//             "           break\n"+
//             "  turn_left()"
//     var program = new UserProgram(p);
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()", "move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 0, 1, 2, 3, 4, 5, 6, 7], 'lines executed');
// });

// test('test embedded while', function(){
//     var p = "while True:\n"+
//             "  move()\n"+
//             "  while True:\n"+
//             "      move()\n"+
//             "      break\n"+
//             "      turn_left()\n"+
//             "  move()\n"+
//             "  break\n"+
//             "  turn_left()"
//     var program = new UserProgram(p);
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block);
//     deepEqual(runner.output, ["move()", "move()", "move()"], 'output');
//     deepEqual(runner.lines_executed, [0, 0, 1, 2, 2, 3, 4, 6, 7], 'lines executed');
// });

// test('test max instructions', function(){
//     var program = new UserProgram("while True:\n move()");
//     var block = new Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
//     var runner = new MockBlockRunner(block, [], 7);
//     deepEqual(runner.output, ['move()', 'move()', 'move()', 'Too many instructions.'], 'reaching instruction limit');
//     deepEqual(runner.lines_executed, [0, 0, 1, 0, 1, 0, 1, 0], 'lines executed');
// });
