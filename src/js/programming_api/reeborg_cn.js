require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_cn = function () {

    // The following are for OOP programming in Javascript
    var 机器人 = window.机器人 = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    机器人.prototype.到达目的地 = function () {
        return RUR._UR.at_goal_(this.body);
    };

    机器人.prototype.砌墙 = function () {
        RUR._UR.build_wall_(this.body);
    };

    机器人.prototype.携带的物品 = function () {
        return RUR._UR.carries_object_(this.body);
    };

    机器人.prototype.此处的颜色 = function() {
        return RUR._UR.color_here_(this.body);
    };

    机器人.prototype.前方通畅 = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    机器人.prototype.面向北方 = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    机器人.prototype.前进 = function () {
        RUR._UR.move_(this.body);
    };

    机器人.prototype.此处的物品 = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    机器人.prototype.粉刷格子 = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    机器人.prototype.此处的坐标 = function () {
        return [this.body.x, this.body.y];
    };

    机器人.prototype.前方的坐标 = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    机器人.prototype.放下 = function () {
        RUR._UR.put_(this.body);
    };

    机器人.prototype.抛出 = function () {
        RUR._UR.toss_(this.body);
    };

    机器人.prototype.右侧通畅 = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    机器人.prototype.设置模型 = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    机器人.prototype.设置路径颜色 = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    机器人.prototype.设置路径风格 = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    机器人.prototype.拾起 = function () {
        RUR._UR.take_(this.body);
    };

    机器人.prototype.左转 = function () {
        RUR._UR.turn_left_(this.body);
    };

    机器人.prototype.前方有墙 = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    机器人.prototype.右侧有墙 = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = 机器人;

    const API = {
        到达目的地 : RUR._at_goal_,
        砌墙 : RUR._build_wall_,
        携带的物品 : RUR._carries_object_,
        此处的颜色 : RUR._color_here_,
        默认机器人 : function () {
            var r = Object.create(机器人.prototype);
            r.body = RUR._default_robot_body_();
            return r;
        },
        help_js : RUR._inspect_,
        完成 : RUR._done_,
        前方通畅 : RUR._front_is_clear_,
        面向北方 : RUR._is_facing_north_,
        前进 : RUR._move_,
        新机器人图片 : RUR._new_robot_images_,
        此处的物品 : RUR._object_here_,
        暂停 : RUR._pause_,
        粉刷格子 : RUR._paint_square_,
        此处的坐标 : function () {
            var body = RUR._default_robot_body_();
            return [body.x, body.y];
        },
        前方的坐标 : function () {
            var pos, body = RUR._default_robot_body_();
            pos = RUR.get_position_in_front(body);
            if (RUR.is_valid_position(pos["x"], pos["y"])) {
                return [pos["x"], pos["y"]];
            } else {
                return undefined;
            }
        },
        打印超文本 : RUR._print_html_,
        print_html : RUR._print_html_,
        放下 : RUR._put_,
        抛出 : RUR._toss_,
        记录 : RUR._recording_,
        移除机器人 : RUR._remove_robots_,
        右侧通畅 : RUR._right_is_clear_,
        设置最大步骤 : RUR._set_max_nb_steps_,
        设置路径颜色 : RUR._set_trace_color_,
        音效 : RUR._sound_,
        拾起 : RUR._take_,
        思考 : RUR._think_,
        左转 : RUR._turn_left_,
        前方有墙 : RUR._wall_in_front_,
        右侧有墙 : RUR._wall_on_right_,
        write : RUR._write_,
        writeln : RUR._write_ln,
        创建定制菜单 : RUR._MakeCustomMenu_,
        世界 : RUR._World_
    }
    Object.assign(window, API);
    return API;

};
