/** Since Javascript is a dynamic language, a user or world creator could
    (possibly accidently) redefine a basic function, which could lead to some
    apparent bugs.  For this reason, we include a function whose role is to
    make it possible to reset the basic functions to their desired values.

    These functions have to be known globally; the standard way would be to do:

        var fn_name;
        RUR.reset_definitions = function () {
            fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }

    Instead we use the pattern following pattern which does not require to write
    a separate declaration.

        RUR.reset_definitions = function () {
            window.fn_name = ...;
            ...
            UsedRobot.prototype.fn_name = ...
        }
**/

var RUR = RUR || {};

var UsedRobot;

RUR.reset_definitions = function () {

    window.at_goal = RUR._at_goal_;
    window.build_wall = RUR._build_wall_;
    window.carries_object = RUR._carries_object_;
    window.dir_js = RUR._inspect_;
    window.done = RUR.control.done;
    window.front_is_clear = RUR._front_is_clear_;
    window.is_facing_north = RUR._is_facing_north_;
    window.in_the_bag = RUR._in_the_bag_;
    window.move = RUR._move_;
    window.new_robot_images = RUR._new_robot_images_;
    window.object_here = RUR._object_here_;
    window.pause = RUR.control.pause;
    window.print_html = RUR.output.print_html;
    window.put = RUR._put_;
    window.recording = RUR._recording_;
    window.remove_robots = RUR._remove_robots_;
    window.right_is_clear = RUR._right_is_clear_;
    window.set_max_nb_robots = RUR._set_max_nb_robots_;
    window.set_max_steps = RUR._set_max_steps_;
    window.sound = RUR.control.sound;
    window.take = RUR._take_;
    window.think = RUR.control.think;
    window.turn_left = RUR._turn_left_;
    window.view_source_js = RUR._view_source_js_;
    window.wall_in_front = RUR._wall_in_front_;
    window.wall_on_right = RUR._wall_on_right_;
    window.write = RUR.output.write;
    window._write = RUR.output._write;
    window.World = RUR.file_io.load_world_from_program;

    UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.world.add_robot(this.body);
    };

    UsedRobot.prototype.at_goal = function () {
        RUR.control.at_goal(this.body);
    };

    UsedRobot.prototype.build_wall = function () {
        RUR.control.build_wall(this.body);
    };

    UsedRobot.prototype.carries_object = function () {
        RUR.control.carries_object(this.body);
    };

    UsedRobot.prototype.front_is_clear = function () {
        RUR.control.front_is_clear(this.body);
    };


    UsedRobot.prototype.is_facing_north = function () {
        RUR.control.is_facing_north(this.body);
    };

    UsedRobot.prototype.in_the_bag = function () {
        RUR.control.carries_object(this.body);
    };


    UsedRobot.prototype.move = function () {
        RUR.control.move(this.body);
    };

    UsedRobot.prototype.object_here = function (obj) {
        RUR.control.object_here(this.body, obj);
    };

    UsedRobot.prototype.put = function () {
        RUR.control.put(this.body);
    };

    UsedRobot.prototype.right_is_clear = function () {
        RUR.control.right_is_clear(this.body);
    };

    UsedRobot.prototype.set_model = function(model) {
        RUR.control.set_model(this.body, model);
    };

    UsedRobot.prototype.take = function () {
        RUR.control.take(this.body);
    };

    UsedRobot.prototype.token_here = function () {
        RUR.control.token_here(this.body);
    };

    UsedRobot.prototype.turn_left = function () {
        RUR.control.turn_left(this.body);
    };

    UsedRobot.prototype.wall_in_front = function () {
        RUR.control.wall_in_front(this.body);
    };

    UsedRobot.prototype.wall_on_right = function () {
        RUR.control.wall_on_right(this.body);
    };

    // English specific and only for compatibility with rur-ple
    // do not translate the following
    window.put_beeper = put;
    window.pick_beeper = take;
    window.turn_off = done;
    window.on_beeper = object_here;
    window.next_to_a_beeper = object_here;
    window.carries_beepers = carries_object;
    window.set_delay = think;
    window.facing_north = is_facing_north;
};
RUR.reset_definitions();
