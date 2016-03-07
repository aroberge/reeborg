require("./../constants.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("erase-trace", "ERASE TRACE");
record_id("erase-trace-text", "ERASE TRACE EXPLAIN");
// Make it a method of RUR so that it could be called from a user's program.
RUR.erase_trace = function(){
    "use strict";
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
};
