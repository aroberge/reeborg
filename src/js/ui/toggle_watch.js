require("jquery");
require("./../state.js");

RUR.toggle_watch_variables = function () {
    if (RUR.state.watch_vars) {
        RUR.state.watch_vars = false;
        $("#watch_variables_btn").addClass("blue-gradient");
        $("#watch_variables_btn").removeClass("reverse-blue-gradient");
        $("#watch_variables").html("");
        $("#Reeborg-watches").dialog("close");
    } else {
        RUR.state.watch_vars = true;
        $("#watch_variables_btn").addClass("reverse-blue-gradient");
        $("#watch_variables_btn").removeClass("blue-gradient");
        $("#watch_variables").html("");
        $("#Reeborg-watches").dialog("open");
    }
};
