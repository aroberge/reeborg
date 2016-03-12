/* require this module that will automatically modify a global object*/
require("./utils/cors.js");

require("./commands.js");
require("./world_editor.js");

require("./start_session.js");

// TODO: easy function to hide edit world button (to prevent students seeing hidden code)
// TODO: animated robots/ decorative objects, objects
// TODO: document all world-editing functions, make them directly available as methods of RUR.
//       Use jsdoc and put on site.
// TODO: add turtle mode (see blockly for comparing with expected solution); ensure a blockly counterpart
// TODO: implement paint() and colour_here() in Blockly
// TODO: Create offline version as part of the build sequence
