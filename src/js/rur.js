/** @namespace RUR 
 * @desc The namespace reserved for all the Reeborg World methods.
 *
 */
window.RUR = RUR || {}; // RUR should be already defined in the html file;
                        // however, it might not when running tests.

RUR.BACKGROUND_IMAGE = new Image();
RUR.BACKGROUND_IMAGE.src = '';

// try {
//     RUR._BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
// } catch(e) {  // for testing, window.location... is not defined.
//     RUR._BASE_URL = '';
// }
// 
var pathname;
try {
    pathname = window.location.pathname;  // not defined for tape tests
    if (pathname.indexOf("qunit") !== -1 ){  // running qunit test
        RUR._BASE_URL = '../..';
    } else {
        RUR._BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
    }
} catch (e) {
    RUR._BASE_URL = '';
}

RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};

// namespace used to hold global reference to functions
// that are useful to perform some functional tests only.
RUR.functional_tests = {};
