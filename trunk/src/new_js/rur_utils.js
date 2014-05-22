/* Author: André Roberge
   License: MIT  */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $, CodeMirror, editor, library, removeHints, parseUri */

RUR.ReeborgError = function (message) {
    this.name = "ReeborgError";
    this.message = message;
};

RUR.translate = function (s) {
    if (RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        return s;
    }
};

RUR.reset_code_in_editors = function () {
    var library_default, library_content, editor_content, editor_default,
        default_instruction = RUR.translate("move");
    
    if (RUR.programming_language == "javascript") {
        library_default = RUR.translate("/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n");
        editor_default = default_instruction + "();";
    } else if (RUR.programming_language == "python") {
        library_default = RUR.translate("# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n");
        editor_default = default_instruction + "()";
    }  else if (RUR.programming_language == "coffee") {
        library_default = RUR.translate("# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n");
        editor_default = default_instruction + "()";
    }
    library_content = localStorage.getItem(RUR.settings.library);
    if (!library_content){
        library_content = library_default;
    }
    library.setValue(library_content);
    editor_content = localStorage.getItem(RUR.settings.editor);
    if (!editor_content){
        editor_content = editor_default;
    }
    editor.setValue(editor_content);
};


RUR.create_permalink = function () {
    var proglang, world, _editor, _library, url_query, permalink, parts;
    var human_language = document.documentElement.lang;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    
    switch(RUR.programming_language) {
        case 'python': 
            proglang = "python-" + human_language;
            break;
        case 'coffee': 
            proglang = "coffeescript-" + human_language;
            break;
        case 'javascript':
            if (RUR.strict_javascript) {
                proglang = "javascript-strict-" + human_language;
            } else {
                proglang = "javascript-" + human_language;
            }
    }
    world = encodeURIComponent(RUR.world.export_world());    
    _editor = encodeURIComponent(editor.getValue());
    _library = encodeURIComponent(library.getValue());
    
    permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    $("#url_input_textarea").val(permalink);
    $("#url_input").show();
    $("#ok-permalink").removeAttr("disabled");
    $("#cancel-permalink").removeAttr("disabled");
    
    return false;
};

RUR.reset_programming_language = function(choice){
    var human_language = document.documentElement.lang;
    RUR.removeHints();
    RUR.settings.current_language = choice;
    try { 
        localStorage.setItem("last_programming_language_" + human_language, RUR.settings.current_language);
    } catch (e) {}
    switch(RUR.settings.current_language){
        case 'python-' + human_language :
            RUR.settings.editor = "editor_py_" + human_language;
            RUR.settings.library = "library_py_" + human_language;
            RUR.programming_language = "python";
            $("#editor-link").html(RUR.translate("Python Code"));
            editor.setOption("mode", {name: "python", version: 3});
            library.setOption("mode", {name: "python", version: 3});
            break;
        case 'javascript-strict-' + human_language :
            RUR.settings.editor = "editor_js_" + human_language;
            RUR.settings.library = "library_js_" + human_language;
            RUR.programming_language = "javascript";
            $("#editor-link").html(RUR.translate("Javascript Code"));
            RUR.strict_javascript = true;
            editor.setOption("mode", "javascript");
            library.setOption("mode", "javascript");
            break;
        case 'javascript-' + human_language :
            RUR.settings.editor = "editor_js_" + human_language;
            RUR.settings.library = "library_js_" + human_language;
            RUR.programming_language = "javascript";
            $("#editor-link").html(RUR.translate("Javascript Code"));
            RUR.strict_javascript = false;
            editor.setOption("mode", "javascript");
            library.setOption("mode", "javascript");
            break;
        case 'coffeescript-' + human_language :
            RUR.settings.editor = "editor_coffee_" + human_language;
            RUR.settings.library = "library_coffee_" + human_language;
            RUR.programming_language = "coffee";
            $("#editor-link").html(RUR.translate("CoffeeScript Code"));
            editor.setOption("mode", "coffeescript");
            library.setOption("mode", "coffeescript");
            break;
    }            
    try { 
        RUR.reset_code_in_editors();
    } catch (e) {}
};

RUR.update_permalink = function () {
    var url_query = parseUri($("#url_input_textarea").val());
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined &&
       url_query.queryKey.library !== undefined) {
        var prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);

        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        var name = "PERMALINK";
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                  ).val("user_world:" + name).html(name));
        $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
        $("#select_world").change();
        $('#delete-world').show(); // so that user can remove PERMALINK from select if desired

        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    }
    $("#url_input").hide();
};

RUR.write = function (s) {
    $("#output-pre").append(s.toString() + "\n");
};


RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.write(result);
};

RUR.view_source = function(fn) {
    $("#last-pre").before("<pre class='js_code'>" + fn + "</pre>" );
    $('.js_code').each(function() {
        var $this = $(this), $code = $this.text();
        $this.removeClass("js_code");
        $this.addClass("jscode");
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode: 'javascript',
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-dark'
        });
    });
};

RUR._import_library = function () {
  // adds the library code to the editor code if appropriate string is found
    var separator, import_lib_regex, src, lib_src;  
    if (RUR.programming_language == "javascript") {
        separator = ";\n";
        import_lib_regex = RUR.import_lib_regex_js;
    } else if (RUR.programming_language === "python") {
        separator = "\n";
        import_lib_regex = RUR.import_lib_regex_py;
    } else if (RUR.programming_language === "coffee") {
        separator = "\n";
        import_lib_regex = RUR.import_lib_regex_coffee;
    }

    lib_src = library.getValue();
    src = editor.getValue();
    return src.replace(import_lib_regex, separator+lib_src);
};

