require("./../create_editors.js");
var record_id = require("./../../lang/msg.js").record_id;

// "tabs" is a jqueryUI method
$("#tabs").tabs({
    heightStyle: "content",
    activate: function(event, ui){
        var height_adjust = $(this).height()-60;
        editor.setSize(null, height_adjust);
        library.setSize(null, height_adjust);
        pre_code_editor.setSize(null, height_adjust);
        post_code_editor.setSize(null, height_adjust);
        description_editor.setSize(null, height_adjust);
        onload_editor.setSize(null, height_adjust);
    }
});

record_id("editor-tab", "Python Code");
record_id("library-tab", "LIBRARY");
record_id("pre-code-tab", "PRE");
record_id("post-code-tab", "POST");
record_id("description-tab", "DESCRIPTION");
record_id("onload-editor-tab", "ONLOAD");

$("#editor-panel").resizable({
    resize: function() {
        var height_adjust = $(this).height()-60;
        editor.setSize(null, height_adjust);
        library.setSize(null, height_adjust);
        pre_code_editor.setSize(null, height_adjust);
        post_code_editor.setSize(null, height_adjust);
        description_editor.setSize(null, height_adjust);
        onload_editor.setSize(null, height_adjust);
    }
}).draggable({cursor: "move", handle: "ul"});


$("#editor-tab").on("click", function (evt) {
    if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
        $("#highlight").show();
        $("#watch-variables-btn").show();
    } else {
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
});


$("#library-tab").on("click", function (evt) {
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
});
