
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, editor */

RUR.testing = {};

RUR.testing._test_permalink = function(permalink, function_name, name) {
    var url_query, base_url;
    url_query = parseUri(window.location.href);
    base_url = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        base_url += ":" + url_query.port;
    }
    editor.setValue(function_name + '("' + base_url + permalink + '","' + name + '")');
    RUR.testing.run_test();
};

RUR.testing.test_permalink = function (permalink, name){
    RUR.testing._test_permalink(permalink, "World", name);
};

RUR.testing.test_permalien = function (permalink, name){
    RUR.testing._test_permalink(permalink, "Monde", name);
};

RUR.testing.run_test = function() {
    RUR.ui.run();  // runs the permalink instruction, thus loading the appropriate test
    RUR.ui.reload();
    RUR.ui.run();
};
