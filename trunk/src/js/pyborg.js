//pyborg.js
/*globals _builtins _messages _conditions */

_builtins = {
    "en": {"move()": "move",
           "turn_left()": "turn_left"
           },
    "fr": {"avance()": "move",
           "tourne_à_gauche()": "turn_left"
           }
};


_messages = {
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

_conditions = {
    "on_beeper()": "on_beeper()",
    "True": true,
    "False": false
};

var remove_spaces = function (text) {
    return text.replace(/\s+/g, '');
};

function LineOfCode(raw_content, line_number) {
    this.line_number = line_number;
    var pattern = /( *)(.*)/;
    var comment_pattern = /(?!(\'|\")*#.*(\'|\")\s*)#.*/;
    raw_content = raw_content.replace(comment_pattern, '');
    var match = raw_content.match(pattern);
    this.indentation = match[1].length;
    this.content = match[2];
    this.stripped_content = remove_spaces(this.content);
}

function UserProgram(program, language) {
    if (language === undefined) {
        this.language = "en";
    }
    else {
        this.language = language;
    }
    this.builtins = _builtins[this.language];

    var lines = program.split("\n");
    this.lines = [];
    this.nb_lines = lines.length;
    this.index = 0;
    this.syntax_error = null;
    this.user_defined = {};
    for (var i = 0; i < this.nb_lines; i++) {
        this.lines.push(new LineOfCode(lines[i], i));
    }

    this.next_line = function () {
        if (this.index >= this.nb_lines) {
            return null;
        }
        var current_line = this.lines[this.index];
        this.index += 1;
        return current_line;
    };

    this.previous_line = function () {
        this.index -= 1;
    };

    this.abort_parsing = function (msg) {
        this.syntax_error = [this.index - 1, msg];
    };

}

function Block(program, min_indentation, inside_loop) {
    this.lines = [];
    this.program = program;
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
            this.program.abort_parsing(_messages[this.program.language]["Indentation error"]);
            return false;
        }
        else if (this.min_indentation === -1 && this.current_line.indentation !== 0) {
            this.program.abort_parsing(_messages[this.program.language]["Indentation error"]);
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
            this.program.abort_parsing(_messages[this.program.language]["Indentation error"]);
            return false;
        }
        return true;
    };

    this.parse_assignment = function () {
        // parses a statement like  "a = b"
        var left, right;
        this.current_line.type = "assignment";
        var matches = /^(\w+)\s*=\s*(\w+)\s*$/.exec(this.current_line.content);
        if (matches) {
            left = matches[1];
            right = matches[2];
            this.current_line.type = "assignment";
            if (this.program.builtins[left + "()"] !== undefined ||
                this.program.user_defined[left + "()"] !== undefined) {
                this.program.abort_parsing(_messages[this.program.language]["Attempt to redefine"] +
                                            left + "'");
            }
            else if (this.program.builtins[right + "()"] !== undefined) {
                this.program.builtins[left + "()"] = this.program.builtins[right + "()"];
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
            else if (_conditions[right + "()"] !== undefined) {
                this.program.user_defined[left + "()"] = _conditions[right + "()"];
            }
            else {
                this.program.abort_parsing(_messages[this.program.language]["Unknown command"] + right);
            }
        }
        else {
            this.program.abort_parsing(_messages[this.program.language]["Syntax error"] +
                                       "'" + this.current_line.content + "'");
        }
    };

    this.parse_def = function () {
        this.current_line.type = "def block";
        var matches = /def\s+(\S+)\(\s*\)\s*:/.exec(this.current_line.content);
        var name;
        if (matches) {
            name = matches[1];
        }
        else {
            this.program.abort_parsing(_messages[this.program.language]["def syntax error"]);
            return false;
        }

        if (this.program.builtins[name + "()"] !== undefined ||
           this.program.user_defined[name + "()"] !== undefined) {
            this.program.abort_parsing(_messages[this.program.language]["Attempt to redefine"] + name + "'");
            return false;
        }
        this.current_line.method_name = name;
        this.program.user_defined[name + "()"] = this.current_line;
        this.current_line.block = new Block(this.program, this.current_line.indentation,
                                       this.current_line.type);
        return true;
    };

    this.normalize_condition = function (condition) {
        this.current_line.negate_condition = false;
        if (condition.match(/^not /)) {
            this.current_line.negate_condition = true;
            condition = condition.slice(4);
        }

        if (_conditions[condition] !== undefined) {
            this.current_line.condition = _conditions[condition];
            return condition;
        }

        if (this.program.user_defined[condition] !== undefined) {
            this.current_line.condition = program.user_defined[condition];
            return condition;
        }

        var stripped_condition = remove_spaces(condition);
        if (_conditions[stripped_condition] !== undefined) {
            this.current_line.condition = _conditions[stripped_condition];
            return stripped_condition;
        }

        this.program.abort_parsing(_messages[this.program.language]["Invalid test condition"] + condition);
        return null;
    };

    this.parse_if = function () {
        this.current_line.type = "if block";
        var matches = /^if (.*):\s*$/.exec(this.current_line.content);
        var condition = this.normalize_condition(matches[1]);
        if (condition !== null) {
            this.current_line.block = new Block(this.program,
                                                this.current_line.indentation,
                                                this.inside_loop);
        }
    };

    this.parse_elif = function () {
        if ((this.previous_line_content !== null) &&
                ((this.previous_line_content.match(/^if /)) ||
                 (this.previous_line_content.match(/^elif /)))
           ) {
            this.current_line.type = "elif block";
            var matches = /^elif \s*(\S+)\s*:\s*$/.exec(this.current_line.content);
            var condition = this.normalize_condition(matches[1]);
            if (condition !== null) {
                this.current_line.block = new Block(this.program,
                                                this.current_line.indentation,
                                                this.inside_loop);
            }
        }
        else {
            this.program.abort_parsing(_messages[this.program.language]["Missing if"]);
        }
    };

    this.parse_else = function () {
        if ((this.previous_line_content !== null) &&
                ((this.previous_line_content.match(/^if /)) ||
                (this.previous_line_content.match(/^elif /)))
            ) {
            this.current_line.type = "else block";
            this.current_line.block = new Block(this.program, this.current_line.indentation,
                                           this.inside_loop);
        }
        else {
            this.program.abort_parsing(_messages[this.program.language]["Missing if"]);
        }
    };

    this.parse_while = function () {
        this.current_line.type = "while block";
        var matches = /^while (.*):\s*$/.exec(this.current_line.content);
        var condition = this.normalize_condition(matches[1]);
        if (condition !== null) {
            this.current_line.block = new Block(this.program, this.current_line.indentation, true);
        }
    };

    this.parse = function () {
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
            if (this.program.builtins[this.current_line.stripped_content] !== undefined) {
                this.current_line.name = this.program.builtins[this.current_line.stripped_content];
                this.current_line.type = "command";
            }
            else if (this.program.user_defined[this.current_line.content] !== undefined) {
                this.current_line.type = "user method";
                var method_def_line = this.program.user_defined[this.current_line.content];
                this.current_line.name = method_def_line.method_name;
                this.current_line.block = method_def_line.block;
            }
            else if (this.current_line.stripped_content === "pass") {
                this.current_line.type = "pass";
            }
            else if (this.current_line.content.match(/^def /)) {
                this.parse_def();
            }
            else if (this.current_line.content.match(/^if /)) {
                this.parse_if();
            }
            else if (this.current_line.content.match(/^elif /)) {
                this.parse_elif();
            }
            else if (this.current_line.stripped_content === "else:") {
                this.parse_else();
            }
            else if (this.current_line.content.match(/^while /)) {
                this.parse_while();
            }
            else if (this.current_line.content.match(/^break\s*$/)) {
                if (this.inside_loop) {
                    this.current_line.type = "break";
                }
                else {
                    this.program.abort_parsing(_messages[this.program.language]["break outside loop"]);
                }
            }     // use RegExp below to prevent JSLint from dying...
            else if (this.current_line.content.match(new RegExp("="))) {
                this.parse_assignment();
            }
            else if (!this.current_line.content) {
                this.current_line.type = "empty line";
            }
            else {
                this.program.abort_parsing(_messages[this.program.language]["Unknown command"] + this.current_line.content);
            }
            this.lines.push(this.current_line);
            this.previous_line_content = this.current_line.content;
        }
    };

    this.parse();

}