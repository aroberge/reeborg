/*jshint browser:true, devel:true */
/*globals $ */

var MAX_WIDTH, MIN_WIDTH = 200;

function reset_widths () {
    var all_active_panels, children, index, child;
    all_active_panels = [];
    children = $("#panels").children();
    for (index = 0; index < children.length; index++){
        child = $(children[index]);
        if (child.hasClass("active")) {
            all_active_panels.push(child);
        }
    }
    MAX_WIDTH = $("#panels").width() - all_active_panels.length * MIN_WIDTH;
    for (index = 0; index < all_active_panels.length; index++){
        // WHY do I need to subtract 8 ??    2 x padding + 1 for border perhaps?...
        all_active_panels[index].width($("#panels").width()/all_active_panels.length - 8);
    }
    for (index = 0; index < all_active_panels.length; index++) {
        set_resizable(all_active_panels, index);
    }
    return all_active_panels;
}


function set_resizable(all_active_panels, index){
    var this_panel, next_panel;
    this_panel = all_active_panels[index];
    next_panel = all_active_panels[index+1];
    this_panel.resizable({
        handles: 'e',
        maxWidth: MAX_WIDTH,
        minWidth: MIN_WIDTH,
        helper: "resizable-helper",
        stop: function(event, ui){
            var remaining = next_panel.width() - (ui.size.width - ui.originalSize.width);
            next_panel.width(remaining);
        }
    });
}


$(document).ready(function() {
// init
    var all_active_panels, child;
    all_active_panels = reset_widths();

    $("#control-wrapper button").on("click", function(){
        var index, label, children;
        $(this).toggleClass("active");
        label = $(this).attr("label");

        children = $("#panels").children();
        for (index = 0; index < children.length; index++){
            child = $(children[index]);
            if (child.attr("id") === label) {
                child.toggleClass("active");
            }
        }
        reset_widths();
    });


});

