//pyborg.js
/*global RUR:true*/
/*jshint indent:4 */
var RUR = RUR || {};
    // pyborg is the Python dialect (keywords) understood by Reeborg
    // Note that pyborg is a language that does not have a concept of local scope
    // ... which is explained by saying that Reeborg never forgets anything...
RUR.pyborg = {
    SINGLE_LINE: /( *)(.*)/,  // extracts info about indentation and content
    ASSIGNMENT : /^(\w+)\s*=\s*(\w+)\s*$/,  // synonym = existing - no ()
    DEF: /def\s+([a-zA-Z]\w*)\(\s*\)\s*:/,   // def command():
    COMMENT: /(?!(\'|\")*#.*(\'|\")\s*)#.*/, //  ... # comment follow the # sign - not inside string
    START_WITH_NOT: /^not /,
    IF: /^if \s*(.*):\s*$/,               //  if some_condition :
    ELIF: /^elif \s*(\S+)\s*:\s*$/,        // elif some_condition :
    WHILE: /^while (.*):\s*$/,             // while some_condition :
    BREAK: "break",
    PASS: "pass",
    ELSE: "else:",
    START_WITH_IF: /^if /,
    START_WITH_DEF: /^def /,
    START_WITH_WHILE: /^while /,
    START_WITH_ELIF: /^elif /,
    CONTAIN_ASSIGNMENT: /.*=.*/
};

RUR.builtins = {
    "en": {"move()": "move",
           "turn_left()": "turn_left"
           },
    "fr": {"avance()": "move",
           "tourne_à_gauche()": "turn_left"
           }
};

RUR.messages = {
    "en": {"Unknown command": "Unknown command: ",
           "Indentation error": "Indentation error",
           "Attempt to redefine": "Attempt to redefine '",
           "Syntax error": "Syntax error: ",
           "Invalid test condition": "Invalid test condition: ",
           "Missing if": "'elif' or 'else' without matching 'if'",
           "break outside loop": "SyntaxError: 'break' outside loop",
            "def syntax error": "Syntax error: bad method name or missing colon."
           },
    "fr": {"Unknown command": "Commande inconnue: ",
           "Indentation error": "Erreur d'indentation",
           "Attempt to redefine": "Tentative de redéfinir '",
           "Syntax error": "Erreur de syntaxe: ",
           "Invalid test condition": "Condition non valide: ",
           "Missing if": "'elif' ou 'else' sans le 'if' correspondant",
           "break outside loop": "Erreur de syntaxe: 'break' à l'extérieur d'une boucle",
           "def syntax error": "Erreur de syntaxe: mauvais nom de méthode ou 'deux points'."
           }
};

RUR.conditions = {
    "token_detected()": "token_detected()",
    "True": true,
    "False": false
};


RUR.remove_spaces = function (text) {
    "use strict";
    return text.replace(/\s+/g, '');
};

RUR.LineOfCode = function (raw_content, line_number) {
    "use strict";
    var line_content;
    this.line_number = line_number;
    raw_content = raw_content.replace(RUR.pyborg.COMMENT, '');
    line_content = raw_content.match(RUR.pyborg.SINGLE_LINE);
    this.indentation = line_content[1].length;
    this.content = line_content[2];
    this.stripped_content = RUR.remove_spaces(this.content);
};

RUR.UserProgram = function (program, language) {
    "use strict";
    var lines, i;
    if (language === undefined) {
        this.language = "en";
    }
    else {
        this.language = language;
    }
    this.builtins = RUR.builtins[this.language];
    this.messages = RUR.messages[this.language];

    lines = program.split("\n");
    this.lines = [];
    this.nb_lines = lines.length;
    this.line_number = 0;
    this.syntax_error = null;
    this.user_defined = {};
    for (i = 0; i < this.nb_lines; i++) {
        this.lines.push(new RUR.LineOfCode(lines[i], i));
    }

    this.next_line = function () {
        if (this.line_number >= this.nb_lines) {
            return null;
        }
        var current_line = this.lines[this.line_number];
        this.line_number += 1;
        return current_line;
    };

    this.previous_line = function () {
        this.line_number -= 1;
    };

    this.abort_parsing = function (msg) {
        this.syntax_error = [this.line_number - 1, msg];
    };

};

RUR.Block = function (program, min_indentation, inside_loop) {
    // recursive function; it will call itself if it encounters sub-blocks
    // via parse() ; see at the very end of this function
    "use strict";
    this.lines = [];
    this.program = program;
    this.builtins = this.program.builtins;
    this.methods = this.program.methods;
    this.messages = this.program.messages;
    this.user_defined = this.program.user_defined;

    if (min_indentation === undefined) {
        this.min_indentation = -1;
    }
    else {
        this.min_indentation = min_indentation;
    }
    this.block_indentation = null;
    this.inside_loop = inside_loop;

    this.set_indentation = function () {
        if (this.current_line.indentation <= this.min_indentation) {
            this.program.abort_parsing(this.messages["Indentation error"]);
            return false;
        }
        else if (this.min_indentation === -1 && this.current_line.indentation !== 0) {
            this.program.abort_parsing(this.messages["Indentation error"]);
            return false;
        }
        return true;
    };

    this.handle_indentation = function () {
        if (this.block_indentation === null) {
            return this.set_indentation();
        }
        else if (this.current_line.indentation <= this.min_indentation) {
            this.program.previous_line();
            return false;
        }
        else if (this.current_line.indentation !== this.block_indentation) {
            this.program.abort_parsing(this.messages["Indentation error"]);
            return false;
        }
        return true;
    };

    this.parse_assignment = function () {
        // parses a statement like  "a = b"
        var left, right, matches;
        this.current_line.type = "assignment";
        matches = this.current_line.content.match(RUR.pyborg.ASSIGNMENT);
        if (matches) {
            left = matches[1];
            right = matches[2];
            this.current_line.type = "assignment";
            if (this.builtins[left + "()"] !== undefined ||
                this.program.user_defined[left + "()"] !== undefined) {
                this.program.abort_parsing(this.messages["Attempt to redefine"] +
                                            left + "'");
            }
            else if (this.builtins[right + "()"] !== undefined) {
                this.builtins[left + "()"] = this.builtins[right + "()"];
            }
            else if (this.program.user_defined[right + "()"] !== undefined) {
                this.program.user_defined[left + "()"] = this.program.user_defined[right + "()"];
            }
            else if (right === "True") {
                this.program.user_defined[left] = true;
            }
            else if (right === "False") {
                this.program.user_defined[left] = false;
            }
            else if (RUR.conditions[right + "()"] !== undefined) {
                this.program.user_defined[left + "()"] = RUR.conditions[right + "()"];
            }
            else {
                this.program.abort_parsing(this.messages["Unknown command"] + right);
            }
        }
        else {
            this.program.abort_parsing(this.messages["Syntax error"] +
                                       "'" + this.current_line.content + "'");
        }
    };

    this.parse_def = function () {
        var name, matches;
        this.current_line.type = "def block";
        matches = this.current_line.content.match(RUR.pyborg.DEF);
        if (matches) {
            name = matches[1];
        }
        else {
            this.program.abort_parsing(this.messages["def syntax error"]);
            return false;
        }

        if (this.builtins[name + "()"] !== undefined ||
           this.program.user_defined[name + "()"] !== undefined) {
            this.program.abort_parsing(this.messages["Attempt to redefine"] + name + "'");
            return false;
        }
        this.current_line.method_name = name;
        this.program.user_defined[name + "()"] = this.current_line;
        this.current_line.block = new RUR.Block(this.program, this.current_line.indentation,
                                       this.current_line.type);
        return true;
    };

    this.normalize_condition = function (condition) {
        this.current_line.negate_condition = false;
        if (condition.match(RUR.pyborg.START_WITH_NOT)) {
            this.current_line.negate_condition = true;
            condition = condition.slice(4);
        }

        if (RUR.conditions[condition] !== undefined) {
            this.current_line.condition = RUR.conditions[condition];
            return condition;
        }

        if (this.program.user_defined[condition] !== undefined) {
            this.current_line.condition = program.user_defined[condition];
            return condition;
        }

        var stripped_condition = RUR.remove_spaces(condition);
        if (RUR.conditions[stripped_condition] !== undefined) {
            this.current_line.condition = RUR.conditions[stripped_condition];
            return stripped_condition;
        }

        this.program.abort_parsing(this.messages["Invalid test condition"] + condition);
        return null;
    };

    this.parse_if = function () {
        var matches, condition;
        this.current_line.type = "if block";
        matches = this.current_line.content.match(RUR.pyborg.IF);
        condition = this.normalize_condition(matches[1]);
        if (condition !== null) {
            this.current_line.block = new RUR.Block(this.program,
                                                this.current_line.indentation,
                                                this.inside_loop);
        }
    };

    this.parse_elif = function () {
        var matches, condition;
        if ((this.previous_line_content !== null) &&
                ((this.previous_line_content.match(RUR.pyborg.IF)) ||
                 (this.previous_line_content.match(RUR.pyborg.ELIF)))
           ) {
            this.current_line.type = "elif block";
            matches = this.current_line.content.match(RUR.pyborg.ELIF);
            condition = this.normalize_condition(matches[1]);
            if (condition !== null) {
                this.current_line.block = new RUR.Block(this.program,
                                                this.current_line.indentation,
                                                this.inside_loop);
            }
        }
        else {
            this.program.abort_parsing(this.messages["Missing if"]);
        }
    };

    this.parse_else = function () {
        if ((this.previous_line_content !== null) &&
                ((this.previous_line_content.match(RUR.pyborg.IF)) ||
                (this.previous_line_content.match(RUR.pyborg.ELIF)))
            ) {
            this.current_line.type = "else block";
            this.current_line.block = new RUR.Block(this.program, this.current_line.indentation,
                                           this.inside_loop);
        }
        else {
            this.program.abort_parsing(this.messages["Missing if"]);
        }
    };

    this.parse_while = function () {
        var matches, condition;
        this.current_line.type = "while block";
        matches = this.current_line.content.match(RUR.pyborg.WHILE);
        condition = this.normalize_condition(matches[1]);
        if (condition !== null) {
            this.current_line.block = new RUR.Block(this.program, this.current_line.indentation, true);
        }
    };

    this.parse = function () {
        var method_def_line;
        this.previous_line_content = null;
        while (this.program.syntax_error === null) {
            this.current_line = this.program.next_line();
            if (this.current_line === null) {
                break;
            }

            if (!this.handle_indentation()) {
                break;
            }

            this.block_indentation = this.current_line.indentation;
            if (this.builtins[this.current_line.stripped_content] !== undefined) {
                this.current_line.name = this.builtins[this.current_line.stripped_content];
                this.current_line.type = "command";
            }
            else if (this.program.user_defined[this.current_line.content] !== undefined) {
                this.current_line.type = "user method";
                method_def_line = this.program.user_defined[this.current_line.content];
                this.current_line.name = method_def_line.method_name;
                this.current_line.block = method_def_line.block;
            }
            else if (this.current_line.stripped_content === RUR.pyborg.PASS) {
                this.current_line.type = "pass";
            }
            else if (this.current_line.content.match(RUR.pyborg.START_WITH_DEF)) {
                this.parse_def();
            }
            else if (this.current_line.content.match(RUR.pyborg.START_WITH_IF)) {
                this.parse_if();
            }
            else if (this.current_line.content.match(RUR.pyborg.START_WITH_ELIF)) {
                this.parse_elif();
            }
            else if (this.current_line.stripped_content === RUR.pyborg.ELSE) {
                this.parse_else();
            }
            else if (this.current_line.content.match(RUR.pyborg.START_WITH_WHILE)) {
                this.parse_while();
            }
            else if (this.current_line.content.match(RUR.pyborg.BREAK)) {
                if (this.inside_loop) {
                    this.current_line.type = "break";
                }
                else {
                    this.program.abort_parsing(this.messages["break outside loop"]);
                }
            }
            else if (this.current_line.content.match(RUR.pyborg.CONTAIN_ASSIGNMENT)) {
                this.parse_assignment();
            }
            else if (!this.current_line.content) {
                this.current_line.type = "empty line";
            }
            else {
                this.program.abort_parsing(this.messages["Unknown command"] + this.current_line.content);
            }
            this.lines.push(this.current_line);
            this.previous_line_content = this.current_line.content;
        }
    };

    this.parse();
};