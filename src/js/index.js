

require("./utils/key_exist.js");

/* require two modules that will automatically modify two global objects */
require("./utils/cors.js");
require("./utils/supplant.js");

require("./ui/set_editors.js");

require("./playback/reverse_step.js"); /* only invoked from the html file - for now */

require("./commands.js");
require("./world_editor.js");

require("./start_session.js");
