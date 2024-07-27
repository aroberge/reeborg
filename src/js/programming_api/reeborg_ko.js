require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* Since Javascript is a dynamic language, a user or world creator could
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

RUR.reset_definitions_ko = function () {

    // The following are for OOP programming in Javascript
    var 사용_로봇 = window.사용_로봇 = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    사용_로봇.prototype.목적지에_도착함 = function () {
        return RUR._UR.at_goal_(this.body);
    };

    사용_로봇.prototype.벽_만들기 = function () {
        RUR._UR.build_wall_(this.body);
    };

    사용_로봇.prototype.물건을_가지고_있음 = function () {
        return RUR._UR.carries_object_(this.body);
    };

    사용_로봇.prototype.바닥_색상 = function() {
        return RUR._UR.color_here_(this.body);
    };

    사용_로봇.prototype.앞이_비어_있음 = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    사용_로봇.prototype.북쪽을_향하고_있음 = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    사용_로봇.prototype.전진 = function () {
        RUR._UR.move_(this.body);
    };

    사용_로봇.prototype.바닥에_물건이_있음 = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    사용_로봇.prototype.바닥_색칠 = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    사용_로봇.prototype.현재_좌표 = function () {
        return [this.body.x, this.body.y];
    };

    사용_로봇.prototype.전면_좌표 = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    사용_로봇.prototype.놓기 = function () {
        RUR._UR.put_(this.body);
    };

    사용_로봇.prototype.던지기 = function () {
        RUR._UR.toss_(this.body);
    };

    사용_로봇.prototype.오른쪽이_비어_있음 = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    사용_로봇.prototype.모델_설정 = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    사용_로봇.prototype.경로_색상_설정 = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    사용_로봇.prototype.경로_모양_설정 = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    사용_로봇.prototype.줍기 = function () {
        RUR._UR.take_(this.body);
    };

    사용_로봇.prototype.좌회전 = function () {
        RUR._UR.turn_left_(this.body);
    };

    사용_로봇.prototype.앞에_벽이_있음 = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    사용_로봇.prototype.오른쪽에_벽이_있음 = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = 사용_로봇;

    const API = {

        목적지에_도착함 : RUR._at_goal_,
        벽_만들기 : RUR._build_wall_,
        물건을_가지고_있음 : RUR._carries_object_,
        바닥_색상 : RUR._color_here_,
        기본_로봇 : function () {
            var r = Object.create(사용_로봇.prototype);
            r.body = RUR._default_robot_body_();
            return r;
        },
        help_js : RUR._inspect_,
        종료 : RUR._done_,
        앞이_비어_있음 : RUR._front_is_clear_,
        북쪽을_향하고_있음 : RUR._is_facing_north_,
        전진 : RUR._move_,
        새_로봇_그림 : RUR._new_robot_images_,
        바닥에_물건이_있음 : RUR._object_here_,
        정지 : RUR._pause_,
        바닥_색칠 : RUR._paint_square_,
        현재_좌표 : function () {
            var body = RUR._default_robot_body_();
            return [body.x, body.y];
        },
        전면_좌표 : function () {
            var pos, body = RUR._default_robot_body_();
            pos = RUR.get_position_in_front(body);
            if (RUR.is_valid_position(pos["x"], pos["y"])) {
                return [pos["x"], pos["y"]];
            } else {
                return undefined;
            }
        },
        print_html : RUR._print_html_,
        놓기 : RUR._put_,
        던지기 : RUR._toss_,
        기록 : RUR._recording_,
        로봇_제거 : RUR._remove_robots_,
        오른쪽이_비어_있음 : RUR._right_is_clear_,
        최대_명령실행_수_설정 : RUR._set_max_nb_steps_,
        경로_색상_설정 : RUR._set_trace_color_,
        //window.경로_모양_설정 : RUR._set_trace_style_,
        소리 : RUR._sound_,
        줍기 : RUR._take_,
        생각 : RUR._think_,
        좌회전 : RUR._turn_left_,
        앞에_벽이_있음 : RUR._wall_in_front_,
        오른쪽에_벽이_있음 : RUR._wall_on_right_,
        write : RUR._write_,
        writeln : RUR._write_ln,
        MakeCustomMenu : RUR._MakeCustomMenu_,
        월드 : RUR._World_
    }
    Object.assign(window, API);
    return API;

};
