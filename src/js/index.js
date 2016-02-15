
require("./../lang/msg.js");
require("./../lang/en.js");
require("./../lang/fr.js");
require("./../lang/ko.js");
require("./utils/key_exist.js");

/* require two modules that will automatically modify two global objects */
require("./utils/cors.js");
require("./utils/supplant.js");

require("./listeners/add_listeners.js");

require("./playback/reverse_step.js"); /* only invoked from the html file - for now */

require("./z_commands.js");
require("./zzz_doc_ready.js");
require("./start_session.js");

// we reset the programming mode only at the end; this helps prevent
// the CodeMirror editors from being improperly sized if the initial
// mode is such that they would be hidden.
//$("#programming-mode").change();
