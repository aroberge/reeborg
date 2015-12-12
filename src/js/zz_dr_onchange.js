/* Sets up what happens when various changes happened in various html elements.

called by zzz_doc_ready.js
*/
RUR.zz_dr_onchange = function () {

    $('input[type=radio][name=programming_language]').on('change', function(){
        RUR.reset_programming_language($(this).val());
    });

    $("#select_world").change(function() {
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}
        if ($(this).val() !== null) {
            RUR.file_io.load_world_file($(this).val());
        }
    });

};
