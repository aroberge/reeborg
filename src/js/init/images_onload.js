require("./../rur.js");
require("./../state.js");

/* Important: we need to use a method from visible_world.js ONLY after
   the session is initialized; at that point, we know that visible_world.js
   has been loaded and we know it will be available even if we don't
   put it as a formal requirement.  If we were to put it as a requirement,
   we would end up with a circular requirement (e.g. tiles.js require
   visible_world.js which require tiles.js) with unpredictable consequences.
*/

//TODO: move RUR.INCREMENT_LOADED_FN here.


RUR.images_onload = function (image) {
    if (RUR.state.session_initialized) {
        image.onload = RUR.vis_world.refresh;
    } else {
        RUR._NB_IMAGES_TO_LOAD += 1;
        image.onload = RUR.INCREMENT_LOADED_FN;
    }
};
