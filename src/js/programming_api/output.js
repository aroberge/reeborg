
require("./../rur.js");
require("./../translator.js");
require("./../recorder/record_frame.js");

RUR.output = {};

RUR.output.write = function () {
    var output_string = '';
    RUR.state.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    RUR.print_cache += output_string;
    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.write_ln = function () {
    var output_string = '';
    RUR.state.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    RUR.print_cache += output_string + "\n";

    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    output_string += "\n";
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.clear_print = function () {
    RUR.record_frame("stdout", {"element": "#stdout", "clear": true});
};

RUR.output.print_html = function (arg, replace) {
    if (replace) {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg});
    } else {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg, "append": true});
    }
};

RUR.output.watch_variables = function (arg) {
    RUR.record_frame("watch_variables", {"element": "#watch-variables", "message": arg});
};


/** @function get_print
 * @memberof RUR
 * @instance
 * @summary This function returns the content of the standard output,
 * produced by `print` in Python, and either `write` or `writeln` in
 * Javascript.
 * @return {string} The content of the print output.
 */
RUR.get_print = function () {
    return RUR.print_cache;
};

/** @function show_diff
 * @memberof RUR
 * @instance
 * @summary This function compares two strings and returns a single html string
 * with any differences highlighted. Newlines are converted to &#9166; followed
 * by `<br>`. The typical use case is to compare an expected result to the
 * one actually observed.
 *
 * **Note**: if you or one of your students find the color differences between
 * the inserted text and the deleted text too hard to distinguish, please
 * get in touch with me so that I can make this work better.
 *
 *  @param {string} expected The expected string
 *  @param {string} actual  The string that was obtained (from the student code)
 *  @param {boolean} [semantic] If set to `true`, a semantic comparison (word by word)
 *  is attempted rather than a character by character comparison.
 *  This may give a more readable output in some cases. 
 * 
 * @return {string} The content of the print output as a specially formatted html string.
 */

RUR.show_diff = function(expected, actual, semantic) {
    // adapted from diff_match_patch's diff_prettyHtml
    // See https://code.google.com/archive/p/google-diff-match-patch/wikis/API.wiki
    var diff_object = new diff_match_patch();
    var diffs = diff_object.diff_main(expected, actual);
    if (semantic) {
            diff_object.diff_cleanupSemantic(diffs);
    }

    var html = [];
    var pattern_amp = /&/g;
    var pattern_lt = /</g;
    var pattern_gt = />/g;
    var pattern_newline = /\n/g;
    for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];    // Operation (insert, delete, equal)
        var data = diffs[x][1];  // Text of change.
        var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
            .replace(pattern_gt, '&gt;').replace(pattern_newline, '&#9166;<br>');
        switch (op) {
            case DIFF_INSERT:
                html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
                break;
            case DIFF_DELETE:
                html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
                break;
            case DIFF_EQUAL:
                html[x] = '<span>' + text + '</span>';
                break;
        }
    }
    return html.join('');
};

/** @function show_detailed_diff
 * @memberof RUR
 * @instance
 * @summary This function compares two strings and returns a summary of what
 * was expected followed by an output showing the differences as highlighted.
 *
 * **Note**: if you or one of your students find the color differences between
 * the inserted text and the deleted text too hard to distinguish, please
 * get in touch with me so that I can make this work better.
 *
 *  @param {string} expected The expected string
 *  @param {string} actual  The string that was obtained (from the student code)
 *  @param {Object} [options] A Javascript object (Python dict) containing some 
 *     additional optional options.
 *  @param {boolean} [options.semantic] If set to `true`, a semantic comparison 
 *  (word by word)
 *  is attempted rather than a character by character comparison.
 *  This may give a more readable output in some cases. 
 *  @param {string} [options.expected] A string to use as the heading
 *  for the expected result.
 *  @param {string} [options.differences] A string to use as the heading
 *  for the highlighted differences.
 *  
 * @return {string} A formatted html string.
 */

RUR.show_detailed_diff = function (expected, actual, options) {
    var diff, expected_heading, differences_heading, div_begin;
    if (options && options.semantic) {
        diff = RUR.show_diff(expected, actual, true);
    } else {
        diff = RUR.show_diff(expected, actual);
    }
    if (options && options.expected) {
        expected_heading = "<h3>" + options.expected_heading + "</h3>";
    } else {
        expected_heading = "<h3>" + RUR.translate("Expected result") + "</h3>";
    }
    if (options && options.differences) {
        differences_heading = "<h3>" + options.differences + "</h3>";
    } else {
        differences_heading = "<h3>" + RUR.translate("Differences highlighted") + "</h3>";
    }
    div_begin = "<div style='margin-left:2em;'>";
    return expected_heading + div_begin + expected + "</div>" + 
             differences_heading + div_begin + diff + "</div>";
};