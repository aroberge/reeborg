require("./../visible_robot.js");

require("./../rur.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("robot0");
record_id("robot1");
record_id("robot2");
record_id("robot3");

$("#robot0").on("click", function (evt) {
    RUR.select_default_robot_model(0);
});

$("#robot1").on("click", function (evt) {
    RUR.select_default_robot_model(1);
});

$("#robot2").on("click", function (evt) {
    RUR.select_default_robot_model(2);
});

$("#robot3").on("click", function (evt) {
    RUR.select_default_robot_model(3);
});
