 /** @function test_walls
 * @memberof FuncTest
 * @instance
*
* @desc The file listed below as the source contains unit tests for 
* all "walls" related methods.
*/

/*=========================
    We have very few tests here as we rely mostly on Unit Tests to provide
    sufficient test coverage.  Here, we simply want to make sure that walls.js
    is indeed incorporated correctly in the main program.

    However, this file provides a good scaffolding if we ever find the need
    to add more tests.  It also can be linked to the jsdoc documentation,
    confirming that it exists when browsing the API.
 */


QUnit.module("testing walls.js", {
  beforeEach: function() {
    test_utils.reset();  }
});
QUnit.test("Test add/remove wall", function(assert) {
    var world_url = "/src/worlds/empty.json";
    var done = assert.async();
    test_utils.set_human_language("en");
    assert.ok(test_utils.eval_python(world_url, 
            "/tests/functional_tests/programs/test_walls.py").success, 
            "No problem encountered!");
    done();
});