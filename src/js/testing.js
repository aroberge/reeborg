/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, editor */

RUR.testing = {};

RUR.testing.test_permalink = function (permalink){
    editor.setValue('Permalink("' + permalink + '")');
    RUR.testing.run_test();
};

RUR.testing.test_permalien = function (permalink){
    editor.setValue('Permalien("' + permalink + '")');
    RUR.testing.run_test();
};

RUR.testing.run_test = function() {
    RUR.ui.run();  // runs the permalink instruction, thus loading the appropriate test
    RUR.ui.reload();
    RUR.ui.run();
};
