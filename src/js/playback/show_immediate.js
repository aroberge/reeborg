
require("./../drawing/visible_world.js");
/* if the REPL is active, we do not record anything, and show immediately
   the updated world */

RUR._show_immediate = function (name, obj) {
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
