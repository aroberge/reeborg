
require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("stop");

RUR.stop = function () {
    clearTimeout(RUR._TIMER);
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").removeAttr("disabled");
};
