require("./../rur.js");
require("./commands.js");
require("./../world_api/robot.js");

/* See reeborg_en.js for an explanation about the purpose of this file. */

RUR.reset_definitions_pt = function () {

    var UsedRobot = window.UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.add_robot(this.body);
    };

    UsedRobot.prototype.chegou = function () {
        return RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.construir_parede = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.carrega_objeto = function () {
        return RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.cor_aqui = UsedRobot.prototype.color_here;

    UsedRobot.prototype.frente_esta_livre = function () {
        return RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.virado_norte = function () {
        return RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.mover = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.objeto_aqui = function (obj) {
        return RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.pintar_quadrado = function (color) {
        RUR._UR.paint_square_(color, this.body);
    };

    UsedRobot.prototype.coordenadas = function () {
        return [this.body.x, this.body.y];
    };

    UsedRobot.prototype.dar_coordenadas = function () {
        pos = RUR.get_position_in_front(this.body);
        if (RUR.is_valid_position(pos["x"], pos["y"])) {
            return [pos["x"], pos["y"]];
        }
        else {
            return undefined;
        }
    };

    UsedRobot.prototype.colocar = function () {
        RUR._UR.put_(this.body);
    };
    UsedRobot.prototype.gerar = function () {
        RUR._UR.toss_(this.body);
    };

    UsedRobot.prototype.direita_esta_livre = function () {
        return RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.definir_modelo = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.definir_cor_linha = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.definir_estilo_linha = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.pegar = function () {
        RUR._UR.take_(this.body);
    };


    UsedRobot.prototype.virar_esquerda = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.parede_a_frente = function () {
        return RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.parede_a_direita = function () {
        return RUR._UR.wall_on_right_(this.body);
    };

    // make prototype available with known English name in RUR namespace
    RUR.UsedRobot = UsedRobot;

    const API = {
        chegou : RUR._at_goal_,
        frente_esta_livre : RUR._build_wall_,
        carrega_objeto : RUR._carries_object_,
        cor_aqui : RUR._color_here_,
        standard_roboter : function () {
            var r = Object.create(UsedRobot.prototype);
            r.body = RUR._default_robot_body_();
            return r;
        },
        help_js : RUR._inspect_,
        pronto : RUR._done_,
        frente_esta_livre : RUR._front_is_clear_,
        virado_norte : RUR._is_facing_north_,
        mover : RUR._move_,
        novo_Robo_imagens : RUR._new_robot_images_,
        objeto_aqui : RUR._object_here_,
        pausar : RUR._pause_,
        pintar_quadrado : RUR._paint_square_,
        coordenadas : function () {
            var body = RUR._default_robot_body_();
            return [body.x, body.y];
        },
        dar_coordenadas : function () {
            var pos, body = RUR._default_robot_body_();
            pos = RUR.get_position_in_front(body);
            if (RUR.is_valid_position(pos["x"], pos["y"])) {
                return [pos["x"], pos["y"]];
            } else {
                return undefined;
            }
        },
        imprimir_html : RUR._print_html_,
        colocar : RUR._put_,
        gerar : RUR._toss_,
        gravar : RUR._recording_,
        remover_robô : RUR._remove_robots_,
        direita_esta_livre : RUR._right_is_clear_,
        definir_max_passos : RUR._set_max_nb_steps_,
        definir_cor_linha : RUR._set_trace_color_,
        som : RUR._sound_,
        pegar : RUR._take_,
        pensar : RUR._think_,
        virar_esquerda : RUR._turn_left_,
        parede_a_frente : RUR._wall_in_front_,
        parede_a_direita : RUR._wall_on_right_,
        salvar : RUR._write_,
        salvar_sobre : RUR._write_ln,
        criarMenu : RUR._MakeCustomMenu_,
        MakeCustomMenu : RUR._MakeCustomMenu_,
        Mundo : RUR._World_
    }
    Object.assign(window, API);
    return API;

};