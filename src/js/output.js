RUR.output = {};

RUR.output.write = function () {
    var output_string = '';
    RUR.control.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    RUR.rec.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output._write = function () {
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        output_string += arguments[i].toString();
  }
    RUR.rec.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.clear_print = function () {
    RUR.rec.record_frame("stdout", {"element": "#stdout", "clear": true});
};

RUR.output.print_html = function (arg, append) {
    if (append) {
        RUR.rec.record_frame("print_html", {"element": "#print_html", "message": arg, "append": true});
    } else {
        RUR.rec.record_frame("print_html", {"element": "#print_html", "message": arg});
    }
};

RUR.output.watch_variables = function (arg) {
    RUR.rec.record_frame("watch_variables", {"element": "#watch_variables", "message": arg});
};


RUR.output.view_source = function(fn) {
    $("#Reeborg-explores").dialog("open");
    RUR.cd.show_feedback("#Reeborg-explores", "<pre class='js_code view_source'>" + fn + "</pre>" );
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
