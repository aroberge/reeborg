
require("./../visible_world.js");
require("./../exceptions.js");
/* if the REPL is active, we do not record anything, and show immediately
   the updated world */

RUR._show_immediate = function (name, obj) {

    if (RUR.state.programming_language !== "python" ||
        RUR.state.input_method !=="repl") {
            throw new RUR.ReeborgError("Fatal Error: " +
                "Calling show_immediate while not using the Python REPL.");
    }
    RUR.vis_world.refresh();
    // TODO: confirm that watching variables work.
    if (name !== undefined && name == "print_html") {
        if (obj.append){
            $(obj.element).append(obj.message);
        } else {
            $(obj.element).html(obj.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }
};
