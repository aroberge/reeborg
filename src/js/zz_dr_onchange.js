/* Sets up what happens when various changes happened in various html elements.

called by zzz_doc_ready.js
*/


require("./state.js");
require("./aa_utils.js");

RUR.zz_dr_onchange = function () {

    $("#select_programming_language").change(function() {
        RUR.reset_programming_language($(this).val());
    });





};
