
var record_id = require("./../../lang/msg.js").record_id;

// "tabs" is a jqueryUI method
$("#tabs").tabs({
        heightStyle: "auto",
        activate: function(event, ui){
            editor.refresh();
            library.refresh();
            pre_code_editor.refresh();
            post_code_editor.refresh();
            description_editor.refresh();
            onload_editor.refresh();
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
        editor.setSize(null, $(this).height()-40);
        library.setSize(null, $(this).height()-40);
        pre_code_editor.setSize(null, $(this).height()-40);
        post_code_editor.setSize(null, $(this).height()-40);
        description_editor.setSize(null, $(this).height()-40);
        onload_editor.setSize(null, $(this).height()-40);
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
