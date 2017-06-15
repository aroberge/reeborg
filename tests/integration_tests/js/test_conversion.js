

QUnit.module( "Converting world from old to new version of Reeborg's World." );

QUnit.test( "Single robot", function(assert) {
    var old, converted, new_;
    old = '{"robots":[{"x":1,"y":1,"tokens":"infinite","orientation":0}],"walls":{}}';
    new_ = '{"robots":[{"x":1,"y":1,"orientation":0,"objects":{"token":"infinite"}}],"walls":{}}';
    converted = convert_world(old);
    equal(converted, new_, "World with single robot (same format in both version)" );
});


QUnit.test( "Single wall east", function(assert) {
    var old, converted, new_;
    old = '{"robots":[],"walls":{"2,1":["east"]}}';
    new_ = '{"robots":[],"walls":{"2,1":["east"]}}';
    converted = convert_world(old);
    equal(converted, new_, "World with single wall east (same format in both version)" );
});

QUnit.test( "Single wall north", function(assert) {
    var old, converted, new_;
    old = '{"robots":[],"walls":{"2,3":["north"]}}';
    new_ = '{"robots":[],"walls":{"2,3":["north"]}}';
    converted = convert_world(old);
    equal(converted, new_, "World with single wall north (same format in both version)" );
});

QUnit.test( "Three tokens", function(assert) {
    var old, converted, new_;
    old = '{"robots":[],"walls":{},"tokens":{"3,1":3}}';
    new_ = '{"robots":[],"walls":{},"objects":{"3,1":{"token":3}}}';
    converted = convert_world(old);
    equal(converted, new_, "World with three tokens at a given location." );
});

QUnit.test( "Three shapes", function(assert) {
    var old, converted, new_;
    old = '{"robots":[],"walls":{},"tokens":{},"shapes":{"3,1":"star","4,1":"triangle","5,1":"square"}}';
    new_ = '{"robots":[],"walls":{},"objects":{"3,1":{"star":1},"4,1":{"triangle":1},"5,1":{"square":1}}}';
    converted = convert_world(old);
    equal(converted, new_, "World with three shapes at different locations." );
});


QUnit.test( "mud", function(assert) {
    var old, converted, new_;
    old = '{"robots":[],"other":{"mud":["6,3"]}}';
    new_ = '{"robots":[],"tiles":{"6,3":"mud"}}';
    converted = convert_world(old);
    equal(converted, new_, "World with mud tile at a given location." );
});

QUnit.test( "Final tokens as goal", function(assert) {
    var old, converted, new_;
    old = '{"robots":[{"x":1,"y":1,"orientation":0}],"walls":{},"goal":{"tokens":{"4,1":3}}}';
    new_ = '{"robots":[{"x":1,"y":1,"orientation":0}],"walls":{},"goal":{"objects":{"4,1":{"token":3}}}}';
    converted = convert_world(old);
    equal(converted, new_, "Final tokens as goal." );
});

QUnit.test( "Goal: Three shapes", function(assert) {
    var old, converted, new_;
    old = '{"robots":[],"goal":{"shapes":{"4,2":"star","5,2":"triangle","6,2":"square"}}}';
    new_ = '{"robots":[],"goal":{"objects":{"4,2":{"star":1},"5,2":{"triangle":1},"6,2":{"square":1}}}}';
    converted = convert_world(old);
    equal(converted, new_, "World with three shapes as goal at different locations." );
});


QUnit.test( "small tiles", function(assert) {
    var old, converted, new_;
    old = '{"robots":[],"walls":{},"large_world":true}';
    new_ = '{"robots":[],"walls":{},"small_tiles":true,"rows":26,"cols":29}';
    converted = convert_world(old);
    equal(converted, new_, "World with three shapes as goal at different locations." );
});


QUnit.module( "Converting permalink from old to new version of Reeborg's World." );

QUnit.test( "Converting newspaper example", function(assert) {
    var old, converted, new_;
    old =  'http://localhost:8000/world.html?proglang=python-en&world=%7B%22robots%22%3A%5B%7B%22x%22%3A1%2C%22y%22%3A1%2C%22tokens%22%3A0%2C%22orientation%22%3A0%2C%22_prev_x%22%3A1%2C%22_prev_y%22%3A1%2C%22_prev_orientation%22%3A0%7D%5D%2C%22shapes%22%3A%7B%221%2C1%22%3A%22star%22%7D%2C%22walls%22%3A%7B%221%2C1%22%3A%5B%22east%22%5D%2C%223%2C2%22%3A%5B%22east%22%5D%2C%225%2C3%22%3A%5B%22east%22%5D%2C%227%2C4%22%3A%5B%22east%22%5D%2C%229%2C5%22%3A%5B%22east%22%5D%2C%2211%2C6%22%3A%5B%22east%22%2C%22north%22%5D%2C%222%2C3%22%3A%5B%22east%22%5D%2C%224%2C4%22%3A%5B%22east%22%5D%2C%226%2C5%22%3A%5B%22east%22%5D%2C%228%2C6%22%3A%5B%22east%22%5D%2C%2211%2C5%22%3A%5B%22north%22%5D%2C%2210%2C5%22%3A%5B%22north%22%5D%2C%2210%2C6%22%3A%5B%22north%22%5D%2C%229%2C6%22%3A%5B%22north%22%5D%2C%228%2C5%22%3A%5B%22north%22%5D%2C%229%2C4%22%3A%5B%22north%22%5D%2C%228%2C4%22%3A%5B%22north%22%5D%2C%227%2C5%22%3A%5B%22north%22%5D%2C%227%2C3%22%3A%5B%22north%22%5D%2C%226%2C3%22%3A%5B%22north%22%5D%2C%226%2C4%22%3A%5B%22north%22%5D%2C%225%2C4%22%3A%5B%22north%22%5D%2C%225%2C2%22%3A%5B%22north%22%5D%2C%224%2C2%22%3A%5B%22north%22%5D%2C%223%2C1%22%3A%5B%22north%22%5D%2C%222%2C1%22%3A%5B%22north%22%5D%2C%223%2C3%22%3A%5B%22north%22%5D%2C%224%2C3%22%3A%5B%22north%22%5D%2C%222%2C2%22%3A%5B%22north%22%5D%2C%221%2C2%22%3A%5B%22north%22%5D%7D%2C%22tokens%22%3A%7B%227%2C4%22%3A5%7D%2C%22goal%22%3A%7B%22shapes%22%3A%7B%227%2C4%22%3A%22star%22%7D%2C%22position%22%3A%7B%22x%22%3A1%2C%22y%22%3A1%7D%2C%22tokens%22%3A%7B%7D%2C%22orientation%22%3A2%7D%7D&editor=pass%0A&library=pass';
    new_ = 'http://localhost:8000/world.html?proglang=python-en&world=%7B%22robots%22%3A%5B%7B%22x%22%3A1%2C%22y%22%3A1%2C%22orientation%22%3A0%2C%22_prev_x%22%3A1%2C%22_prev_y%22%3A1%2C%22_prev_orientation%22%3A0%2C%22objects%22%3A%7B%22token%22%3A0%7D%7D%5D%2C%22walls%22%3A%7B%221%2C1%22%3A%5B%22east%22%5D%2C%223%2C2%22%3A%5B%22east%22%5D%2C%225%2C3%22%3A%5B%22east%22%5D%2C%227%2C4%22%3A%5B%22east%22%5D%2C%229%2C5%22%3A%5B%22east%22%5D%2C%2211%2C6%22%3A%5B%22east%22%2C%22north%22%5D%2C%222%2C3%22%3A%5B%22east%22%5D%2C%224%2C4%22%3A%5B%22east%22%5D%2C%226%2C5%22%3A%5B%22east%22%5D%2C%228%2C6%22%3A%5B%22east%22%5D%2C%2211%2C5%22%3A%5B%22north%22%5D%2C%2210%2C5%22%3A%5B%22north%22%5D%2C%2210%2C6%22%3A%5B%22north%22%5D%2C%229%2C6%22%3A%5B%22north%22%5D%2C%228%2C5%22%3A%5B%22north%22%5D%2C%229%2C4%22%3A%5B%22north%22%5D%2C%228%2C4%22%3A%5B%22north%22%5D%2C%227%2C5%22%3A%5B%22north%22%5D%2C%227%2C3%22%3A%5B%22north%22%5D%2C%226%2C3%22%3A%5B%22north%22%5D%2C%226%2C4%22%3A%5B%22north%22%5D%2C%225%2C4%22%3A%5B%22north%22%5D%2C%225%2C2%22%3A%5B%22north%22%5D%2C%224%2C2%22%3A%5B%22north%22%5D%2C%223%2C1%22%3A%5B%22north%22%5D%2C%222%2C1%22%3A%5B%22north%22%5D%2C%223%2C3%22%3A%5B%22north%22%5D%2C%224%2C3%22%3A%5B%22north%22%5D%2C%222%2C2%22%3A%5B%22north%22%5D%2C%221%2C2%22%3A%5B%22north%22%5D%7D%2C%22goal%22%3A%7B%22position%22%3A%7B%22x%22%3A1%2C%22y%22%3A1%7D%2C%22orientation%22%3A2%2C%22objects%22%3A%7B%227%2C4%22%3A%7B%22star%22%3A1%7D%7D%7D%2C%22objects%22%3A%7B%227%2C4%22%3A%7B%22token%22%3A5%7D%2C%221%2C1%22%3A%7B%22star%22%3A1%7D%7D%7D&editor=pass%0A&library=pass';
    converted = convert_permalink(old);
    equal(converted, new_, "Converting newspaper example permalink" );
});


QUnit.module( "Converting RUR-PLE's worlds." );

QUnit.test( "Comprehensive RUR-PLE world", function(assert) {
    var old, converted, new_;
    old="avenues=8\nstreets=8\nrobot=(3,1,'W',2)\nwalls=[\n(6,5),\n(7,6),\n(8,5),\n(7,4)\n]\nbeepers={\n(2,1):2\n}";
    new_ = '{"robots":[{"x":3,"y":1,"orientation":2,"objects":{"token":"2"}}],"cols":8,"rows":8,"objects":{"2,1":{"token":2}},"walls":{"3,3":["east"],"4,3":["north","east"],"4,2":["north"]}}';
    converted = convert_rurple_world(old);
    equal(converted, new_, "conversion from rurple to new format." );
});
