var tape = require('tape');

// when running individual unit tests, some globals known in the browser
// need to be defined.
window = global;
global.RUR = {};
global.Image = function () {
    return {};
};

// convenient way to wrap tape tests
exports.tape_test = function(module_name, test_name, fn) {
    tape(module_name + test_name, fn);
};
