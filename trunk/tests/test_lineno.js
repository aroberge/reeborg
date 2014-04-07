/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals asyncTest,deepEqual,equal,expect,module,notDeepEqual,notEqual,
    notStrictEqual,ok,QUnit,raises,start,stop,strictEqual,test, RUR */

// adapted from http://javascript.crockford.com/remedial.html
String.prototype.supplant = function (o) {
    return this.replace(
        /\{([^{}]*)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

function intersperce (text, lineno){
    var i, result = "", lines;
    if (text.slice(-1) !== "\n") {
        text += "\n";
    }
    lines = text.split("\n");
    
    if (lines.length !== lineno.length) {
        console.log("mismatched arrays");
    }
    for (i=0; i < lines.length; i++) {
        result += "RUR._line_number({num})\n".supplant({num:lineno[i]}) + lines[i] + "\n";
    }
    return result;
}


test("One line of code", 2, function(){
    var simple = "x=1";
    var simple1 = "x=1\n";
    var expected_result = intersperce(simple, [1, 2]); //RUR._line_number(1)\n" + simple1 + "RUR._line_number(2)\n\n";
    var result = RUR.add_line_number(simple);
    strictEqual(result, expected_result, "Processing single line assignment");
    result = RUR.add_line_number(simple1);
    strictEqual(result, expected_result, "Processing single line assignment");
});

test("Two simple lines of code", 1, function(){
    var simple = "x=1\n x=2\n";
    var expected_result = intersperce(simple, [1, 2, 3]);
    var result = RUR.add_line_number(simple);
    strictEqual(result, expected_result, "Processing two simple line assignments");
});