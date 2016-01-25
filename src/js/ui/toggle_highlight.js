require("jquery");
require("./../state.js");

RUR.toggle_highlight = function () {
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
