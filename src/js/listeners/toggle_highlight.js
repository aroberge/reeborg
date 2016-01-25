require("jquery");
require("./../state.js");
var record_id = require("./../utils/record_id.js").record_id;

var highlight_button = document.getElementById("highlight");
record_id("highlight");

RUR.toggle_highlight = function () {  // keep part of RUR for Python
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("reverse-blue-gradient");
    } else {
        RUR.state.highlight = true;
        $("#highlight").addClass("reverse-blue-gradient");
        $("#highlight").removeClass("blue-gradient");
    }
};
highlight_button.addEventListener("click", RUR.toggle_highlight, false);
