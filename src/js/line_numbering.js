/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.add_line_number = function (s) {
    var i, line, lines, result;
    
    if (s.slice(-1) !== "\n") {
        s += "\n";
    }
    lines = s.split("\n");
    
    result = "";
    for(i=1; i <= lines.length; i++){
        line = "RUR._line_number(" + i + ")\n" + lines[i-1] + "\n";
        result += line;
    }
    
    return result;
};