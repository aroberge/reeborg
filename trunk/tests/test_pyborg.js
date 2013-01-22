// QUnit tests of reeborg.js

module("Line of Code");

test('single line', function () {
    var line = new RUR.LineOfCode('a', 0);
    strictEqual(line.line_number, 0, 'line_number computed correctly');
    strictEqual(line.indentation, 0, 'indentation computed correctly');
    strictEqual(line.content, "a", 'content');
});

test('remove comment', function(){
    var line = new RUR.LineOfCode(' ab#cd', 3);
    strictEqual(line.line_number, 3, 'line_number computed correctly');
    strictEqual(line.indentation, 1, 'indentation computed correctly');
    strictEqual(line.content, "ab", 'content');
});
test('remove comment', function(){
    var line = new RUR.LineOfCode('   #cd', 2);
    strictEqual(line.indentation, 3, 'indentation computed correctly');
    strictEqual(line.content, "", "content");
});
test('remove comment', function(){
    var line = new RUR.LineOfCode('# #  ', 0);
    strictEqual(line.indentation, 0, 'indentation computed correctly');
    strictEqual(line.content, "", "content");
});
test('remove comment', function(){
    var line = new RUR.LineOfCode('"#" #  ', 0);
    strictEqual(line.indentation, 0, 'indentation computed correctly');
    strictEqual(line.content, '"#" ', 'content');
});
test('remove comment', function(){
    var line = new RUR.LineOfCode('says("# aren\'t #") # numbers are not numbers', 0);
    strictEqual(line.indentation, 0, 'indentation computed correctly');
    strictEqual(line.content, 'says("# aren\'t #") ', 'content');
});

/* ====================================*/

module("RUR.UserProgram");

test('testing next_line', function(){
    var program = new RUR.UserProgram("a");
    var line = new RUR.LineOfCode("a", 0);
    var next_line = program.next_line();
    strictEqual(line.line_number, next_line.line_number, "line_number");
    strictEqual(line.indentation, next_line.indentation, "indentation computed correctly");
    strictEqual(line.content, next_line.content, "same content in both lines");
    program.previous_line();
    strictEqual(line.line_number, next_line.line_number, "linenumber");
    strictEqual(line.indentation, next_line.indentation, "indentation computed correctly");
    strictEqual(line.content, next_line.content, "same content in both lines");
});

/* ====================================*/

module("RUR.Block");

test('test single line', function(){
    var program = new RUR.UserProgram("move()");
    var block = new RUR.Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(block.lines[0].type, "command", "type");
    strictEqual(program.syntax_error, null, "syntax error");
    //
    program = new RUR.UserProgram("wrong");
    block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Unknown command: wrong"], "syntax error");
});

test('test allow spaces with command parentheses', function(){
    var program = new RUR.UserProgram("move (  )  ");
    var block = new RUR.Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(block.lines[0].type, "command", "type");
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test single line French', function(){
    var program = new RUR.UserProgram("avance()", "fr");
    var block = new RUR.Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(program.syntax_error, null, "syntax error");
    //
    program = new RUR.UserProgram("wrong", "fr");
    block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Commande inconnue: wrong"], "syntax error");
});

test('test two lines', function(){
    var program = new RUR.UserProgram("move()\nturn_left()");
    var block = new RUR.Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(block.lines[1].name, "turn_left", "name");
    strictEqual(block.lines[0].type, "command", "type");
    strictEqual(block.lines[1].type, "command", "type");
    strictEqual(program.syntax_error, null, "syntax error");
    //
    program = new RUR.UserProgram("move()\nwrong");
    block = new RUR.Block(program);
    deepEqual(program.syntax_error, [1, "Unknown command: wrong"], "syntax error");
});

test('test two lines french', function(){
    var program = new RUR.UserProgram("avance()\ntourne_à_gauche()", "fr");
    var block = new RUR.Block(program);
    strictEqual(block.lines[0].name, "move", "name");
    strictEqual(block.lines[1].name, "turn_left", "name");
    strictEqual(block.lines[0].type, "command", "type");
    strictEqual(block.lines[1].type, "command", "type");
    strictEqual(program.syntax_error, null, "syntax error");
    //
    program = new RUR.UserProgram("avance()\nwrong", "fr");
    block = new RUR.Block(program);
    deepEqual(program.syntax_error, [1, "Commande inconnue: wrong"], "syntax error");
});

test('test indentation computed correctly', function(){
    var program = new RUR.UserProgram("move()\n  move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [1, "Indentation error"], "indentation error");
    //
    program = new RUR.UserProgram("  move()");
    block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Indentation error"], "indentation error");
    //
    program = new RUR.UserProgram("def a():\nmove()");
    block = new RUR.Block(program);
    deepEqual(program.syntax_error, [1, "Indentation error"], "indentation error");
});

test('test blank line', function(){
    var program = new RUR.UserProgram("move()\n\nmove()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test def', function(){
    var p = "def turn_around():\n  turn_left()\n  turn_left()\nturn_around()";
    var program = new RUR.UserProgram(p);
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].method_name, "turn_around", "method name");
    strictEqual(block.lines[0].type, "def block", "type");

    strictEqual(block.lines[1].name, "turn_around", "name");

    var sub_block = block.lines[0].block;
    strictEqual(sub_block.lines[0].name, "turn_left", "name");
    strictEqual(sub_block.lines[1].name, "turn_left", "name");

    //
    var p = "def    mm()    :\n  move()\n  move()\nmm()";
    var program = new RUR.UserProgram(p);
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    //
    var program = new RUR.UserProgram("def :\n move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, 'Syntax error: bad method name or missing colon.'], "syntax error");
    //
    var program = new RUR.UserProgram("def 42:\n move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, 'Syntax error: bad method name or missing colon.'], "syntax error");
    //
    var program = new RUR.UserProgram("def a()():\n move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, 'Syntax error: bad method name or missing colon.'], "syntax error");
    //
    var program = new RUR.UserProgram("def _a():\n move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, 'Syntax error: bad method name or missing colon.'], "syntax error");
    //
    var program = new RUR.UserProgram("def a_():\n move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, null, "syntax error");
    //
    var program = new RUR.UserProgram("def m()\n move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, 'Syntax error: bad method name or missing colon.'], "syntax error");
});

test('test def not allowed', function(){
    var program = new RUR.UserProgram("def move():\n  turn_left()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Attempt to redefine 'move'"], "redefine not allowed");

    var program = new RUR.UserProgram("def m():\n  move()\ndef m():\n move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [2, "Attempt to redefine 'm'"], "redefine not allowed");
});

test('test assignment builtin', function(){
    var program = new RUR.UserProgram("mo = move\nmo()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");

    var program = new RUR.UserProgram("m = move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Syntax error: 'm = move()'"], "syntax error, parentheses");

    var program = new RUR.UserProgram("m() = move");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Syntax error: 'm() = move'"], "syntax error, parentheses");

    var program = new RUR.UserProgram("move = turn_left");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Attempt to redefine 'move'"], "syntax error, builtin");

    var program = new RUR.UserProgram("move = a");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Attempt to redefine 'move'"], "syntax error, builtin");

});

test('test assignment method', function(){
    var program = new RUR.UserProgram("def m2():\n move()\n move()\nmm=m2\nmm()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "no syntax error");

    var program = new RUR.UserProgram("def m2():\n move()\n move()\nm2 = move");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [3, "Attempt to redefine 'm2'"], "syntax error, redefine");
});

test('test assignment True', function(){
    var program = new RUR.UserProgram("t = True");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test assignment True if with', function(){
    var program = new RUR.UserProgram("vrai = True\nif vrai:\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[1].type, "if block", "type");
    strictEqual(block.lines[1].condition, true, "condition");

});

test('test assignment False', function(){
    var program = new RUR.UserProgram("f = False");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test assignment condition', function(){
    var program = new RUR.UserProgram("t = token_detected");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test assignment condition', function(){
    var program = new RUR.UserProgram("t=token_detected\nif not t():\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[1].type, "if block");
    strictEqual(block.lines[1].condition, "token_detected()");
    strictEqual(block.lines[1].negate_condition, true);
});


test('test assignment condition not allowed', function(){
    var program = new RUR.UserProgram("t=True()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Syntax error: 't=True()'"], "syntax error expected");
});


test('test if true', function(){
    var program = new RUR.UserProgram("if True:\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, true, "condition");

    var program = new RUR.UserProgram("if     True     :    \n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, true, "condition");
});


test('test if not true', function(){
    var program = new RUR.UserProgram("if not True:\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, true, "condition: testing not True");
    strictEqual(block.lines[0].negate_condition, true, "condition: testing not True");

    var program = new RUR.UserProgram("if    not   True     :    \n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, true, "condition: testing not True with extra spaces");
    strictEqual(block.lines[0].negate_condition, true, "condition: testing not True with extra spaces");

});

test('test if false', function(){
    var program = new RUR.UserProgram("if False:\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, false, "condition");
});

test('test if token_detected', function(){
    var program = new RUR.UserProgram("if token_detected():\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, "token_detected()", "condition");
    strictEqual(block.lines[0].negate_condition, false, "negate condition");
});

test('test if not token_detected', function(){
    var program = new RUR.UserProgram("if not token_detected():\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, "token_detected()", "condition");
    strictEqual(block.lines[0].negate_condition, true, "negate condition");
});

test('test if token_detected with spaces', function(){
    var program = new RUR.UserProgram("if token_detected ( \t ) :\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
    strictEqual(block.lines[0].type, "if block", "type");
    strictEqual(block.lines[0].condition, "token_detected()", "condition");
});

test('test if token_detected', function(){
    var program = new RUR.UserProgram("if invalid:\n  move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "Invalid test condition: invalid"], "syntax error");
});

test('test if elif true', function(){
    var program = new RUR.UserProgram("if  True:\n move()\nelif True:\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test if true else', function(){
    var program = new RUR.UserProgram("if True:\n move()\nelse:\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test if elif missing', function(){
    var program = new RUR.UserProgram("elif True:\n  move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [0, "'elif' or 'else' without matching 'if'"], "syntax error");
});

test('test if elif false', function(){
    var program = new RUR.UserProgram("if True:\n move()\nelif False:\n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");

    var program = new RUR.UserProgram("if True:\n move()\nelif True:\n  move()\nelif     False     :    \n  move()");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");

    var p = "if False:\n" +
        "   turn_left()\n" +
        "elif False:\n" +
        "   turn_left()\n" +
        "elif True:\n" +
        "   move()";
    var program = new RUR.UserProgram(p);
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test elif invalid', function(){
    var program = new RUR.UserProgram("if True:\n move()\nelif invalid:\n  move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [2, "Invalid test condition: invalid"], "syntax error");
});

test('test if else syntax error', function(){
    var program = new RUR.UserProgram("if True:\n move()\nelse: move()");
    var block = new RUR.Block(program);
    deepEqual(program.syntax_error, [2, "Unknown command: else: move()" ], "syntax error");
});

test('test while if break', function(){
    var program = new RUR.UserProgram("while True:\n  if True:\n     break");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test while if elif break', function(){
    var p = "while True:\n"+
        "   if False:\n"+
        "      move()\n"+
        "   elif True:\n"+
        "      break";
    var program = new RUR.UserProgram(p);
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test while if else break', function(){
    var p = "while True:\n"+
        "   if False:\n"+
        "      move()\n"+
        "   else:\n"+
        "      break";
    var program = new RUR.UserProgram(p);
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

test('test pass', function(){
    var program = new RUR.UserProgram("pass");
    var block = new RUR.Block(program);
    strictEqual(program.syntax_error, null, "syntax error");
});

// test('test repeat', function(){
//     var program = new RUR.UserProgram("repeat 4:\n  move()");
//     var block = new RUR.Block(program);
//     strictEqual(program.syntax_error, null, "syntax error");
// });