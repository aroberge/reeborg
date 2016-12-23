/* require this module that will automatically modify a global object*/
require("./utils/cors.js");

require("./programming_ui/commands.js"); // to control Reeborg's actions
require("./gui_tools/world_editor.js"); // the world editor is not required by other modules
require("./start_session.js");

// TODO: animated robots/ decorative objects, objects
// TODO: document all world-editing functions, make them directly available as methods of RUR.
// TODO: Use jsdoc and put on site.
// TODO: add turtle mode (see blockly for comparing with expected solution); ensure a blockly counterpart
// TODO: implement paint() and colour_here() in Blockly
