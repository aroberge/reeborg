/** @namespace RUR */         // for jsdoc
window.RUR = RUR || {}; // RUR could be already be defined in the html file

RUR.BACKGROUND_IMAGE = new Image();
RUR.BACKGROUND_IMAGE.src = '';

RUR._NB_IMAGES_TO_LOAD = 0;
RUR._NB_IMAGES_LOADED = 0;
try {
    RUR._BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
} catch(e) {  // for testing, window.location... is not defined.
    RUR._BASE_URL = '';
}
RUR.INCREMENT_LOADED_FN = function () {
    RUR._NB_IMAGES_LOADED += 1;
};

RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};
