(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint -W069 */
require("./rur.js");
require("./translator.js");

RUR.blockly = {};
RUR.color_basic = 120;
RUR.color_condition = 240;
RUR.done_colour = "#aa0000";

/****  Begin over-riding Blockly's default */
Blockly.Blocks.loops.HUE = 230;

Blockly.JavaScript['text_print'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return RUR.translate("write")+'(' + argument0 + ');\n';
};

Blockly.makeColour = function(hue) {
  if (hue === RUR.done_colour){
      return hue;
  }
  return goog.color.hsvToHex(hue, Blockly.HSV_SATURATION,
      Blockly.HSV_VALUE * 255);
};

Blockly.Python.INDENT = '    ';
Blockly.JavaScript.INDENT = '    ';

// removing mutator for simple function definitions as per
// https://groups.google.com/d/msg/blockly/_rrwh-Lc-sE/cHAk5yNfhUEJ

(function(){var old = Blockly.Blocks.procedures_defnoreturn.init;
    Blockly.Blocks.procedures_defnoreturn.init =
    function(){old.call(this);
        this.setMutator(undefined);
        // this.setColour(RUR.color_basic);
    };
})();



RUR.blockly.init = function () {

    // override some defaults
    Blockly.Msg.CONTROLS_IF_MSG_THEN = "    " + Blockly.Msg.CONTROLS_IF_MSG_THEN;
    Blockly.Msg.CONTROLS_REPEAT_INPUT_DO = "    " + Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
    Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO = "    " + Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO;


    Blockly.Blocks['_sound_'] = {
      init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(RUR.translate("sound"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "SOUND");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(20);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_sound_'] = function(block) {
      var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
      if (checkbox_sound) {
          return RUR.translate("sound") + "(true);\n";
      } else {
          return RUR.translate("sound") + "(false);\n";
      }
    };
    Blockly.Python['_sound_'] = function(block) {
      var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
      if (checkbox_sound) {
          return RUR.translate("sound") + "(True)\n";
      } else {
          return RUR.translate("sound") + "(False)\n";
      }
    };

    Blockly.Blocks['_think_'] = {
      init: function() {
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField(RUR.translate("think"));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip(RUR.translate("Delay between actions; default is 300 ms."));
      }
    };
    Blockly.Python['_think_'] = function(block) {
      var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
      return RUR.translate("think") + "("+value_name+")\n";
    };
    Blockly.JavaScript['_think_'] = function(block) {
      var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
      return RUR.translate("think") + "("+value_name+");\n";
    };

    Blockly.Blocks['_move_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("move"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("move forward"));
      }
    };
    Blockly.Python['_move_'] = function(block) {
      return RUR.translate("move")+'()\n';
    };
    Blockly.JavaScript['_move_'] = function(block) {
      return RUR.translate("move")+'();\n';
    };


    Blockly.Blocks['_turn_left_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("turn_left")+" \u21BA");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("turn left"));
      }
    };
    Blockly.Python['_turn_left_'] = function(block) {
      return RUR.translate("turn_left")+'()\n';
    };
    Blockly.JavaScript['_turn_left_'] = function(block) {
      return RUR.translate("turn_left")+'();\n';
    };


    Blockly.Blocks['_take_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("take"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("take object"));
      }
    };
    Blockly.Python['_take_'] = function(block) {
      return RUR.translate("take")+'()\n';
    };
    Blockly.JavaScript['_take_'] = function(block) {
      return RUR.translate("take")+'();\n';
    };


    Blockly.Blocks['_put_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("put"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("put object"));
      }
    };
    Blockly.Python['_put_'] = function(block) {
      return RUR.translate("put")+'()\n';
    };
    Blockly.JavaScript['_put_'] = function(block) {
      return RUR.translate("put")+'();\n';
    };


    Blockly.Blocks['_pause_'] = {
      init: function() {
        this.setColour(30);
        this.appendDummyInput().appendField(RUR.translate("pause"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("Pause the program's execution."));
      }
    };
    Blockly.Python['_pause_'] = function(block) {
      return RUR.translate("pause")+'()\n';
    };
    Blockly.JavaScript['_pause_'] = function(block) {
      return RUR.translate("pause")+'();\n';
    };


    Blockly.Blocks['_build_wall_'] = {
      init: function() {
        this.setColour(RUR.color_basic);
        this.appendDummyInput().appendField(RUR.translate("build_wall"));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RUR.translate("Build a wall in front of the robot."));
      }
    };
    Blockly.Python['_build_wall_'] = function(block) {
      return RUR.translate("build_wall")+'()\n';
    };
    Blockly.JavaScript['_build_wall_'] = function(block) {
      return RUR.translate("build_wall")+'();\n';
    };


    Blockly.Blocks['_done_'] = {
      init: function() {
        this.setColour(RUR.done_colour);
        this.appendDummyInput().appendField(RUR.translate("done"));
        this.setPreviousStatement(true);
        this.setTooltip(RUR.translate("End the program's execution."));
      }
    };
    Blockly.Python['_done_'] = function(block) {
      return RUR.translate("done")+'()\n';
    };
    Blockly.JavaScript['_done_'] = function(block) {
      return RUR.translate("done")+'();\n';
    };


    Blockly.Blocks['_wall_in_front_or_right_'] = {
      init: function() {
        var choices =  [
            [RUR.translate("wall_in_front"), RUR.translate("wall_in_front")],
            [RUR.translate("wall_on_right"), RUR.translate("wall_on_right")]];
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if a wall is blocking the way."));
      }
    };
    Blockly.Python['_wall_in_front_or_right_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };
    Blockly.JavaScript['_wall_in_front_or_right_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };


    Blockly.Blocks['_front_or_right_is_clear_'] = {
      init: function() {
        var choices =  [
            [RUR.translate("front_is_clear"), RUR.translate("front_is_clear")],
            [RUR.translate("right_is_clear"), RUR.translate("right_is_clear")]];
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if nothing is blocking the way."));
      }
    };
    Blockly.Python['_front_or_right_is_clear_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };
    Blockly.JavaScript['_front_or_right_is_clear_'] = function(block) {
      return [block.getFieldValue('choice')+'()'];
    };


    Blockly.Blocks['_at_goal_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("at_goal"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if desired destination."));
      }
    };
    Blockly.Python['_at_goal_'] = function(block) {
      return [RUR.translate("at_goal")+'()'];
    };
    Blockly.JavaScript['_at_goal_'] = function(block) {
      return [RUR.translate("at_goal")+'()'];
    };


    Blockly.Blocks['_carries_object_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("carries_object"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if robot carries at least one object."));
      }
    };
    Blockly.Python['_carries_object_'] = function(block) {
      return [RUR.translate("carries_object")+'()'];
    };
    Blockly.JavaScript['_carries_object_'] = function(block) {
      return [RUR.translate("carries_object")+'()'];
    };


    Blockly.Blocks['_object_here_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("object_here"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if there is at least one object here."));
      }
    };
    Blockly.Python['_object_here_'] = function(block) {
      return [RUR.translate("object_here")+'()'];
    };
    Blockly.JavaScript['_object_here_'] = function(block) {
      return [RUR.translate("object_here")+'()'];
    };


    Blockly.Blocks['_is_facing_north_'] = {
      init: function() {
        this.setColour(RUR.color_condition);
        this.appendDummyInput().appendField(RUR.translate("is_facing_north"));
        this.setOutput(true, "Boolean");
        this.setTooltip(RUR.translate("True if robot is facing North."));
      }
    };
    Blockly.Python['_is_facing_north_'] = function(block) {
      return [RUR.translate("is_facing_north")+'()'];
    };
    Blockly.JavaScript['_is_facing_north_'] = function(block) {
      return [RUR.translate("is_facing_north")+'()'];
    };


    Blockly.Blocks['_star_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("star"))
            .appendField(new Blockly.FieldImage("/src/images/star.png", 15, 15, RUR.translate("star")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_star_'] = function(block) {
      return [RUR.translate("star")];
    };
    Blockly.JavaScript['_star_'] = function(block) {
      return [RUR.translate("star")];
    };

    Blockly.Blocks['_token_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("token"))
            .appendField(new Blockly.FieldImage("/src/images/token.png", 15, 15, RUR.translate("token")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_token_'] = function(block) {
      return [RUR.translate("token")];
    };
    Blockly.JavaScript['_token_'] = function(block) {
      return [RUR.translate("token")];
    };

    Blockly.Blocks['_apple_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("apple"))
            .appendField(new Blockly.FieldImage("/src/images/apple.png", 15, 15, RUR.translate("apple")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_apple_'] = function(block) {
      return [RUR.translate("apple")];
    };
    Blockly.JavaScript['_apple_'] = function(block) {
      return [RUR.translate("apple")];
    };

    Blockly.Blocks['_carrot_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("carrot"))
            .appendField(new Blockly.FieldImage("/src/images/carrot.png", 15, 15, RUR.translate("carrot")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_carrot_'] = function(block) {
      return [RUR.translate("carrot")];
    };
    Blockly.JavaScript['_carrot_'] = function(block) {
      return [RUR.translate("carrot")];
    };

    Blockly.Blocks['_dandelion_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("dandelion"))
            .appendField(new Blockly.FieldImage("/src/images/dandelion.png", 15, 15, RUR.translate("dandelion")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_dandelion_'] = function(block) {
      return [RUR.translate("dandelion")];
    };
    Blockly.JavaScript['_dandelion_'] = function(block) {
      return [RUR.translate("dandelion")];
    };

    Blockly.Blocks['_daisy_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("daisy"))
            .appendField(new Blockly.FieldImage("/src/images/daisy.png", 15, 15, RUR.translate("daisy")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_daisy_'] = function(block) {
      return [RUR.translate("daisy")];
    };
    Blockly.JavaScript['_daisy_'] = function(block) {
      return [RUR.translate("daisy")];
    };

    Blockly.Blocks['_triangle_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("triangle"))
            .appendField(new Blockly.FieldImage("/src/images/triangle.png", 15, 15, RUR.translate("triangle")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_triangle_'] = function(block) {
      return [RUR.translate("triangle")];
    };
    Blockly.JavaScript['_triangle_'] = function(block) {
      return [RUR.translate("triangle")];
    };

    Blockly.Blocks['_square_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("square"))
            .appendField(new Blockly.FieldImage("/src/images/square.png", 15, 15, RUR.translate("square")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_square_'] = function(block) {
      return [RUR.translate("square")];
    };
    Blockly.JavaScript['_square_'] = function(block) {
      return [RUR.translate("square")];
    };

    Blockly.Blocks['_strawberry_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("strawberry"))
            .appendField(new Blockly.FieldImage("/src/images/strawberry.png", 15, 15, RUR.translate("strawberry")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_strawberry_'] = function(block) {
      return [RUR.translate("strawberry")];
    };
    Blockly.JavaScript['_strawberry_'] = function(block) {
      return [RUR.translate("strawberry")];
    };

    Blockly.Blocks['_leaf_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("leaf"))
            .appendField(new Blockly.FieldImage("/src/images/leaf.png", 15, 15, RUR.translate("leaf")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_leaf_'] = function(block) {
      return [RUR.translate("leaf")];
    };
    Blockly.JavaScript['_leaf_'] = function(block) {
      return [RUR.translate("leaf")];
    };

    Blockly.Blocks['_banana_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("banana"))
            .appendField(new Blockly.FieldImage("/src/images/banana.png", 15, 15, RUR.translate("banana")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_banana_'] = function(block) {
      return [RUR.translate("banana")];
    };
    Blockly.JavaScript['_banana_'] = function(block) {
      return [RUR.translate("banana")];
    };

    Blockly.Blocks['_orange_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("orange"))
            .appendField(new Blockly.FieldImage("/src/images/orange.png", 15, 15, RUR.translate("orange")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_orange_'] = function(block) {
      return [RUR.translate("orange")];
    };
    Blockly.JavaScript['_orange_'] = function(block) {
      return [RUR.translate("orange")];
    };

    Blockly.Blocks['_tulip_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("tulip"))
            .appendField(new Blockly.FieldImage("/src/images/tulip.png", 15, 15, RUR.translate("tulip")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_tulip_'] = function(block) {
      return [RUR.translate("tulip")];
    };
    Blockly.JavaScript['_tulip_'] = function(block) {
      return [RUR.translate("tulip")];
    };

    Blockly.Blocks['_carries_object_or_here_'] = {
      init: function() {
        this.appendValueInput("action")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                [RUR.translate("carries_object"), RUR.translate("carries_object")],
                [RUR.translate("object_here"), RUR.translate("object_here")]]), "condition");
        this.setOutput(true, "Boolean");
        this.setColour(RUR.color_condition);
      }
    };
    Blockly.Python['_carries_object_or_here_'] = function(block) {
      var dropdown_condition = block.getFieldValue('condition');
      var value_action = Blockly.Python.valueToCode(block, 'action', Blockly.Python.ORDER_ATOMIC);
      return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
    };
    Blockly.JavaScript['_carries_object_or_here_'] = function(block) {
      var dropdown_condition = block.getFieldValue('condition');
      var value_action = Blockly.JavaScript.valueToCode(block, 'action', Blockly.JavaScript.ORDER_ATOMIC);
      return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
    };


    Blockly.Blocks['_take_or_put_'] = {
      init: function() {
        this.appendValueInput("obj")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([
                [RUR.translate("take"), RUR.translate("take")],
                [RUR.translate("put"), RUR.translate("put")]]), "action");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(RUR.color_basic);
      }
    };
    Blockly.Python['_take_or_put_'] = function(block) {
      var dropdown_action = block.getFieldValue('action');
      var value_obj = Blockly.Python.valueToCode(block, 'obj', Blockly.Python.ORDER_ATOMIC);
      return dropdown_action + '("' + value_obj + '")\n';
    };
    Blockly.JavaScript['_take_or_put_'] = function(block) {
      var dropdown_action = block.getFieldValue('action');
      var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
      return dropdown_action + '("' + value_obj + '");\n';
    };



    /** Simple if skeletton from
    https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8aine
    ****/

    Blockly.Blocks['_if_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        // this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
      return "if (" + value_condition + ") {\n" + statements_then + "}\n";

    };
    Blockly.Python['_if_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_then = Blockly.Python.statementToCode(block, 'then');
      return "if " + value_condition + ":\n" + statements_then;
    };


    Blockly.Blocks['_if_else_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("then")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendStatementInput("else")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_else_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
      var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
      return "if (" + value_condition + ") {\n" + statements_then + "} else {\n" + statements_else+"}\n";
    };
    Blockly.Python['_if_else_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_then = Blockly.Python.statementToCode(block, 'then');
      var statements_else = Blockly.Python.statementToCode(block, 'else');
      return "if " + value_condition + ":\n" + statements_then + "else:\n" + statements_else;
    };


    Blockly.Blocks['_if_else_if_else_'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("do")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendValueInput("condition2")
            .setCheck("Boolean")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
        this.appendStatementInput("do2")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendStatementInput("else")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
      }
    };
    Blockly.JavaScript['_if_else_if_else_'] = function(block) {
      var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
      var value_condition2 = Blockly.JavaScript.valueToCode(block, 'condition2', Blockly.JavaScript.ORDER_ATOMIC);
      var statements_do2 = Blockly.JavaScript.statementToCode(block, 'do2');
      var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
      return "if (" + value_condition + ") {\n" + statements_do +
             "} else if (" + value_condition2 + ") {\n" + statements_do2 +
             "} else {\n" + statements_else+"}\n";
    };
    Blockly.Python['_if_else_if_else_'] = function(block) {
      var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      var statements_do = Blockly.Python.statementToCode(block, 'do');
      var value_condition2 = Blockly.Python.valueToCode(block, 'condition2', Blockly.Python.ORDER_ATOMIC);
      var statements_do2 = Blockly.Python.statementToCode(block, 'do2');
      var statements_else = Blockly.Python.statementToCode(block, 'else');
      return "if " + value_condition + ":\n" + statements_do +
             "elif " + value_condition2 + ":\n" + statements_do2 +
             "else:\n" + statements_else;
    };

    $(".blocklyToolboxDiv").remove();
    RUR.blockly.workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        zoom:{
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2},
        trashcan: true});

    $("#blocklyDiv").resizable({
        resize: function() {
            $("#blocklyDiv:first-child").height($(this).height()-1).width($(this).width()-1);
            window.dispatchEvent(new Event('resize'));
        }
    });

    $("#blockly-wrapper").draggable({
        cursor: "move",
        handle: "p",
        drag: function( event, ui ) {
            window.dispatchEvent(new Event('resize'));
        },
        stop: function( event, ui ) {
            window.dispatchEvent(new Event('resize'));
        }
    });

};
RUR.blockly.init();

},{"./rur.js":49,"./translator.js":54}],2:[function(require,module,exports){
/*  The purpose of this module is to act as an intermediary between end user
modules in various languages (e.g. reeborg_en.py or reeborg_fr.js) and
the other modules.  This way, in theory, (most) refactoring can take place in the
basic javascript code without affecting the end user code.

Convention: all "public" function names follow the pattern RUR._xyz_
            Use four spaces for indentation
            Order function names alphabetically (in English)
 */

require("./translator.js");
require("./constants.js");
require("./control.js");
require("./custom_world_select.js");
require("./file_io.js");
require("./output.js");
require("./visible_robot.js");
require("./state.js");
require("./world.js");
require("./world_set.js");

RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.output._write(result);
};

function user_no_highlight () {
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("reverse-blue-gradient");
    }
}


RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.CURRENT_WORLD.robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.CURRENT_WORLD.robots[0]);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._clear_print_ = RUR.output.clear_print;

RUR._color_here_ = function () {
    var robot = RUR.CURRENT_WORLD.robots[0];
    return RUR.control.get_color_at_position(robot.x, robot.y);
};

RUR._default_robot_body_ = function () { // simply returns body
    return RUR.CURRENT_WORLD.robots[0];
};

RUR._dir_js_ = RUR.inspect;

RUR._done_ = RUR.control.done;

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.CURRENT_WORLD.robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.CURRENT_WORLD.robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.CURRENT_WORLD.robots[0]);
};

RUR._new_robot_images_ = RUR.vis_robot.new_robot_images;

RUR._no_highlight_ = user_no_highlight;

RUR._object_here_ = function (arg) {
    return RUR.world_get.object_at_robot_position(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._paint_square_ = function (color) {
    // note that this can do more than simply setting the color: it can also
    // set the tile type.
    var robot = RUR.CURRENT_WORLD.robots[0];
    RUR.control.set_tile_at_position(x, y, color);
};

RUR._pause_ = RUR.control.pause;

RUR._print_html_ = function (html, append) {
    RUR.output.print_html(html, append);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._recording_ = function(bool) {
    if (bool) {
        RUR.state.do_not_record = false;
    } else {
        RUR.state.do_not_record = true;
    }
};

RUR._remove_robots_ = function () {
    RUR.CURRENT_WORLD.robots = [];
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.CURRENT_WORLD.robots[0]);
};

RUR._set_max_nb_instructions_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_trace_color_ = function(color){
    RUR.CURRENT_WORLD.robots[0].trace_color = color;
};

RUR._set_trace_style_ = RUR.vis_robot.set_trace_style;

RUR._sound_ = RUR.control.sound;

RUR._take_ = function(arg) {
    RUR.control.take(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._think_ = RUR.control.think;

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.CURRENT_WORLD.robots[0]);
};

RUR._view_source_js_ = RUR.output.view_source_js;

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.CURRENT_WORLD.robots[0]);
};

RUR._write_ = RUR.output.write;

RUR.__write_ = RUR.output._write;

RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.CURRENT_WORLD.robots[0]);
};

RUR._MakeCustomMenu_ = RUR.custom_world_select.make;

RUR._World_ = RUR.file_io.load_world_from_program;

/*  methods below */

RUR._UR = {};

RUR._UR.at_goal_ = function (robot) {
    RUR.control.at_goal(robot);
};

RUR._UR.build_wall_ = function (robot) {
    RUR.control.build_wall(robot);
};

RUR._UR.carries_object_ = function (robot, obj) {
    RUR.control.carries_object(robot, obj);
};

RUR._UR.front_is_clear_ = function (robot) {
    RUR.control.front_is_clear(robot);
};

RUR._UR.is_facing_north_ = function (robot) {
    RUR.control.is_facing_north(robot);
};

RUR._UR.move_ = function (robot) {
    RUR.control.move(robot);
};

RUR._UR.object_here_ = function (robot, obj) {
    RUR.world_get.object_at_robot_position(robot, obj);
};

RUR._UR.put_ = function (robot, obj) {
    RUR.control.put(robot, obj);
};

RUR._UR.right_is_clear_ = function (robot) {
    RUR.control.right_is_clear(robot);
};

RUR._UR.set_model_ = function (robot, model) {
    RUR.control.set_model(robot, model);
};

RUR._UR.set_trace_color_ = function (robot, color) {
    RUR.control.set_trace_color(robot, color);
};

RUR._UR.set_trace_style_ = function (robot, style) {
    RUR.control.set_trace_style(robot, style);
};

RUR._UR.take_ = function (robot, obj) {
    RUR.control.take(robot, obj);
};

RUR._UR.turn_left_ = function (robot) {
    RUR.control.turn_left(robot);
};

RUR._UR.wall_in_front_ = function (robot) {
    RUR.control.wall_in_front(robot);
};

RUR._UR.wall_on_right_ = function (robot) {
    RUR.control.wall_on_right(robot);
};

},{"./constants.js":3,"./control.js":4,"./custom_world_select.js":6,"./file_io.js":17,"./output.js":38,"./state.js":52,"./translator.js":54,"./visible_robot.js":63,"./world.js":65,"./world_set.js":74}],3:[function(require,module,exports){
require("./rur.js");
RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

// all images are of this size.
RUR.TILE_SIZE = 40;

// current default canvas size.
RUR.DEFAULT_HEIGHT = 550;
RUR.DEFAULT_WIDTH = 625;

// TODO: set up all canvas in separate isolated function so that
// unit testing can be done more easily - with contants defined but without
// having to mock document.

RUR.BACKGROUND_CANVAS = document.getElementById("background-canvas");
RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height;
RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;

RUR.BACKGROUND_CTX = document.getElementById("background-canvas").getContext("2d");
RUR.SECOND_LAYER_CTX = document.getElementById("second-layer-canvas").getContext("2d");
RUR.GOAL_CTX = document.getElementById("goal-canvas").getContext("2d");
RUR.OBJECTS_CTX = document.getElementById("objects-canvas").getContext("2d");
RUR.TRACE_CTX = document.getElementById("trace-canvas").getContext("2d");
RUR.ROBOT_CTX = document.getElementById("robot-canvas").getContext("2d");

RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";

RUR.WALL_LENGTH = 40;   // These can be adjusted
RUR.WALL_THICKNESS = 4;  // elsewhere if RUR.CURRENT_WORLD.small_tiles become true.

RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;
// the current default values of RUR.COLS and RUR.ROWS on the fixed-size
// canvas work out to be 14 and 12 respectively: these seem to be appropriate
// values for the lower entry screen resolution.  The following are meant
// to be essentially synonymous - but are also meant to be used only if/when
// specific values are not used in the "new" dialog that allows them to be specified
// worlds created.  Everywhere else, RUR.COLS and RUR.ROWS should be used.
RUR.MAX_X = 14;
RUR.MAX_Y = 12;
RUR.USE_SMALL_TILES = false;  // keep as unchanged default

RUR.WALL_COLOR = "brown";   // changed (toggled) in world_editor.js
RUR.SHADOW_WALL_COLOR= "#f0f0f0";    // changed (toggled) in world_editor.js
RUR.GOAL_WALL_COLOR = "black";
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;

RUR.DEFAULT_TRACE_COLOR = "seagreen";

RUR.KNOWN_OBJECTS = [];
RUR.KNOWN_TILES = [];
RUR.KNOWN_SOLID_OBJECTS = [];
RUR.ANIMATION_TIME = 120;

RUR._CALLBACK_FN = function () {
    alert("FATAL internal error: RUR._CALLBACK_FN was not initialized.");
};

},{"./rur.js":49}],4:[function(require,module,exports){

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

require("./translator.js");
require("./constants.js");
require("./objects.js");
require("./output.js");
require("./recorder/record_frame.js");
require("./state.js");
require("./exceptions.js");
require("./world_get.js");
require("./world_set.js");
require("./utils/supplant.js");

RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var tile, tiles, name, objects, tile_beyond, solid_tile_beyond,
        solids_beyond, solid_object_beyond,
        pushable_object_here, pushable_object_beyond,
        wall_beyond, x_beyond, y_beyond;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.WallCollisionError(RUR.translate("Ouch! I hit a wall!"));
    }

    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

    x_beyond = robot.x;  // if robot is moving vertically, it x coordinate does not change
    y_beyond = robot.y;

    switch (robot._orientation){
    case RUR.EAST:
        robot.x += 1;
        x_beyond = robot.x + 1;
        break;
    case RUR.NORTH:
        robot.y += 1;
        y_beyond = robot.y + 1;
        break;
    case RUR.WEST:
        robot.x -= 1;
        x_beyond = robot.x - 1;
        break;
    case RUR.SOUTH:
        robot.y -= 1;
        y_beyond = robot.y - 1;
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.control.move().");
    }

    pushable_object_here = RUR.world_get.pushable_object_at_position(robot.x, robot.y);

    if (pushable_object_here) {
        // we had assume that we have made a successful move as nothing was
        // blocking the robot which is now at its next position.
        // However, something may have prevented the pushable object from
        // actually being pushed
        wall_beyond = RUR.control.wall_in_front(robot);
        pushable_object_beyond = RUR.world_get.pushable_object_at_position(x_beyond, y_beyond);
        tile_beyond = RUR.world_get.tile_at_position(x_beyond, y_beyond);
        if (tile_beyond && tile_beyond.solid) {
            solid_tile_beyond = true;
            } else {
            solid_tile_beyond = false;
        }

        solids_beyond = RUR.world_get.solid_objects_at_position(x_beyond, y_beyond);
        solid_object_beyond = false;
        if (solids_beyond) {
            for (name in solids_beyond) {
                if (RUR.SOLID_OBJECTS[name] !== undefined && RUR.SOLID_OBJECTS[name].solid) {
                    solid_object_beyond = true;
                    break;
                }
            }
        }

        if (pushable_object_beyond || wall_beyond || solid_tile_beyond || solid_object_beyond) {
            robot.x = robot._prev_x;
            robot.y = robot._prev_y;
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR.control.move_object(pushable_object_here, robot.x, robot.y,
            x_beyond, y_beyond);
        }
    }

    RUR.state.sound_id = "#move-sound";
    RUR.record_frame("debug", "RUR.control.move");
    tile = RUR.world_get.tile_at_position(robot.x, robot.y);
    if (tile) {
        if (tile.fatal){
            if (!(tile == RUR.TILES.water && RUR.control.solid_object_here(robot, RUR.translate("bridge"))) ){
                throw new RUR.ReeborgError(RUR.translate(tile.message));
            }
        }
        if (tile.slippery){
            RUR.output.write(RUR.translate(tile.message) + "\n");
            RUR.control.move(robot);
        }
    }

    objects = RUR.world_get.solid_objects_at_position(robot.x, robot.y);
    if (objects) {
        for (name in objects) {
            if (RUR.SOLID_OBJECTS[name] !== undefined && RUR.SOLID_OBJECTS[name].fatal) {
                robot.x = robot._prev_x;
                robot.y = robot._prev_y;
                throw new RUR.ReeborgError(RUR.SOLID_OBJECTS[name].message);
            }
        }
    }
};

RUR.control.move_object = function(obj, x, y, to_x, to_y){
    "use strict";
    var bridge_already_there = false;
    if (RUR.world_get.solid_objects_at_position(to_x, to_y).bridge !== undefined){
        bridge_already_there = true;
    }


    RUR.add_object_at_position(obj, x, y, 0);
    if (RUR.OBJECTS[obj].in_water &&
        RUR.world_get.tile_at_position(to_x, to_y) == RUR.TILES.water &&
        !bridge_already_there){
            // TODO: fix this
        RUR.world_set.add_solid_object(RUR.OBJECTS[obj].in_water, to_x, to_y, 1);
    } else {
        RUR.add_object_at_position(obj, to_x, to_y, 1);
    }
};


RUR.control.turn_left = function(robot){
    "use strict";
    robot._prev_orientation = robot._orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 1;  // could have used "++" instead of "+= 1"
    robot._orientation %= 4;
    RUR.state.sound_id = "#turn-sound";
    RUR.record_frame("debug", "RUR.control.turn_left");
};

RUR.control.__turn_right = function(robot){
    "use strict";
    robot._prev_orientation = (robot._orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 3;
    robot._orientation %= 4;
    RUR.record_frame("debug", "RUR.control.__turn_right");
};

RUR.control.pause = function (ms) {
    RUR.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    throw new RUR.ReeborgError(RUR.translate("Done!"));
};

RUR.control.put = function(robot, arg){
    var translated_arg, objects_carried, obj_type, all_objects;
    RUR.state.sound_id = "#put-sound";

    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_OBJECTS.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_carried = robot.objects;
    all_objects = [];
    for (obj_type in objects_carried) {
        if (objects_carried.hasOwnProperty(obj_type)) {
            all_objects.push(obj_type);
        }
    }
    if (all_objects.length === 0){
        throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
    }
    if (arg !== undefined) {
        if (robot.objects[translated_arg] === undefined) {
            throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }  else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }  else {
        if (objects_carried.length === 0){
            throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
        } else if (all_objects.length > 1){
             throw new RUR.ReeborgError(RUR.translate("I carry too many different objects. I don't know which one to put down!"));
        } else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }
};

RUR.control._robot_put_down_object = function (robot, obj) {
    "use strict";
    var objects_carried, coords, obj_type;
    if (obj === undefined){
        objects_carried = robot.objects;
        for (obj_type in objects_carried) {
            if (objects_carried.hasOwnProperty(obj_type)) {
                obj = obj_type;
            }
        }
    }
    robot.objects[obj] -= 1;
    if (robot.objects[obj] === 0) {
        delete robot.objects[obj];
    }

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "objects");
    coords = robot.x + "," + robot.y;
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.objects, coords);
    if (RUR.CURRENT_WORLD.objects[coords][obj] === undefined) {
        RUR.CURRENT_WORLD.objects[coords][obj] = 1;
    } else {
        RUR.CURRENT_WORLD.objects[coords][obj] += 1;
    }
    RUR.record_frame("debug", "RUR.control._put_object");
};


RUR.control.take = function(robot, arg){
    var translated_arg, objects_here;
    RUR.state.sound_id = "#take-sound";
    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_OBJECTS.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_here = RUR.world_get.object_at_robot_position(robot, arg);
    if (arg !== undefined) {
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (objects_here.length === 0 || objects_here == false) { // jshint ignore:line
            throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else {
            RUR.control._take_object_and_give_to_robot(robot, arg);
        }
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
    }  else if (objects_here.length === 0 || objects_here == false){ // jshint ignore:line
        throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.ReeborgError(RUR.translate("Many objects are here; I do not know which one to take!"));
    } else {
        RUR.control._take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

RUR.control._take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    obj = RUR.translate_to_english(obj);
    coords = robot.x + "," + robot.y;
    RUR.CURRENT_WORLD.objects[coords][obj] -= 1;

    if (RUR.CURRENT_WORLD.objects[coords][obj] === 0){
        delete RUR.CURRENT_WORLD.objects[coords][obj];
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (RUR.world_get.object_at_robot_position(robot) == false){ // jshint ignore:line
            delete RUR.CURRENT_WORLD.objects[coords];
        }
    }
    RUR._ensure_key_exists(robot, "objects");
    if (robot.objects[obj] === undefined){
        robot.objects[obj] = 1;
    } else {
        robot.objects[obj]++;
    }
    RUR.record_frame("debug", "RUR.control._take_object");
};


RUR.control.build_wall = function (robot){
    var coords, orientation, x, y, walls;
    if (RUR.control.wall_in_front(robot)){
        throw new RUR.WallCollisionError(RUR.translate("There is already a wall here!"));
    }

    switch (robot._orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        orientation = "east";
        x = robot.x;
        y = robot.y;
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        orientation = "north";
        x = robot.x;
        y = robot.y;
        break;
    case RUR.WEST:
        orientation = "east";
        x = robot.x-1;
        y = robot.y;
        break;
    case RUR.SOUTH:
        orientation = "north";
        x = robot.x;
        y = robot.y-1;
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.build_wall().");
    }

    coords = x + "," + y;
    walls = RUR.CURRENT_WORLD.walls;
    if (walls === undefined){
        walls = {};
        RUR.CURRENT_WORLD.walls = walls;
    }

    if (walls[coords] === undefined){
        walls[coords] = [orientation];
    } else {
        walls[coords].push(orientation);
    }
    RUR.state.sound_id = "#build-sound";
    RUR.record_frame("debug", "RUR.control.build_wall");
};


RUR.control.wall_in_front = function (robot) {
    var coords;
    switch (robot._orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        if (robot.x == RUR.COLS){
            return true;
        }
        if (RUR.world_get.is_wall_at(coords, "east")) {
            return true;
        }
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        if (robot.y == RUR.ROWS){
            return true;
        }
        if (RUR.world_get.is_wall_at(coords, "north")) {
            return true;
        }
        break;
    case RUR.WEST:
        if (robot.x===1){
            return true;
        } else {
            coords = (robot.x-1) + "," + robot.y; // do math first before building strings
            if (RUR.world_get.is_wall_at(coords, "east")) {
                return true;
            }
        }
        break;
    case RUR.SOUTH:
        if (robot.y===1){
            return true;
        } else {
            coords = robot.x + "," + (robot.y-1);  // do math first before building strings
            if (RUR.world_get.is_wall_at(coords, "north")) {
                return true;
            }
        }
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
    }
    return false;
};

RUR.control.wall_on_right = function (robot) {
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.wall_in_front(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};

RUR.control.tile_in_front = function (robot) {
    // returns single tile
    switch (robot._orientation){
    case RUR.EAST:
        return RUR.world_get.tile_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.world_get.tile_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.world_get.tile_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.world_get.tile_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.tile_in_front().");
    }
};


RUR.control.solid_objects_in_front = function (robot) {
    // returns list of tiles
    switch (robot._orientation){
    case RUR.EAST:
        return RUR.world_get.solid_objects_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.world_get.solid_objects_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.world_get.solid_objects_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.world_get.solid_objects_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.solid_objects_in_front().");
    }
};


RUR.control.front_is_clear = function(robot){
    var tile, tiles, solid, name;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    tile = RUR.control.tile_in_front(robot);
    if (tile) {
        if (tile.detectable && tile.fatal){
                if (tile == RUR.TILES.water) {
                    if (!RUR.control._bridge_present(robot)){
                        return false;
                    }
                } else {
                    return false;
                }
        }
    }

    solid = RUR.control.solid_objects_in_front(robot);
    if (solid) {
        for (name in solid) {
            if (RUR.SOLID_OBJECTS[name] !== undefined &&
                RUR.SOLID_OBJECTS[name].detectable &&
                RUR.SOLID_OBJECTS[name].fatal) {
                return false;
            }
        }
    }

    return true;
};


RUR.control._bridge_present = function(robot) {
    var solid, name;
        solid = RUR.control.solid_objects_in_front(robot);
    if (solid) {
        for (name in solid) {
            if (name == "bridge") {
                return true;
            }
        }
    }
    return false;
};


RUR.control.right_is_clear = function(robot){
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    return robot._orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    RUR.playback_delay = delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.CURRENT_WORLD.goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};


// TODO: review this as it seems redundant ... and may not work as expected.
RUR.control.solid_object_here = function (robot, tile) {
    var tile_here, tile_type, all_solid_objects;
    var coords = robot.x + "," + robot.y;

    if (RUR.CURRENT_WORLD.solid_objects === undefined ||
        RUR.CURRENT_WORLD.solid_objects[coords] === undefined) {
        return false;
    }

    tile_here =  RUR.CURRENT_WORLD.solid_objects[coords];

    for (tile_type in tile_here) {
        if (tile_here.hasOwnProperty(tile_type)) {
            if (tile!== undefined && tile_type == RUR.translate_to_english(tile)) {
                return true;
            }
        }
    }
    return false;
};


RUR.control.carries_object = function (robot, obj) {
    var obj_type, all_objects, carried=false;

    if (robot === undefined || robot.objects === undefined) {
        return 0;
    }

    all_objects = {};

    if (obj === undefined) {
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type)) {
                all_objects[RUR.translate(obj_type)] = robot.objects[obj_type];
                carried = true;
            }
        }
        if (carried) {
            return all_objects;
        } else {
            return 0;
        }
    } else {
        obj = RUR.translate_to_english(obj);
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type) && obj_type == obj) {
                return robot.objects[obj_type];
            }
        }
        return 0;
    }
};


RUR.control.set_model = function(robot, model){
    robot.model = model;
    RUR.record_frame();
 };

RUR.control.set_trace_color = function(robot, color){
    robot.trace_color = color;
 };

RUR.control.set_trace_style = function(robot, style){
    robot.trace_style = style;
 };

RUR.state.sound_on = false;
RUR.control.sound = function(on){
    if(!on){
        RUR.state.sound_on = false;
        return;
    }
    RUR.state.sound_on = true;
};

RUR.control.get_colour_at_position = function (x, y) {
    if (RUR.world_get.tile_at_position(x, y)===false) {
        return null;
    } else if (RUR.world_get.tile_at_position(x, y)===undefined){
        return RUR.CURRENT_WORLD.tiles[x + "," + y];
    } else {
        return null;
    }
};

RUR.control.set_tile_at_position = function (x, y, tile) {
    "use strict";
    // note: "tile" will most often be a colour.
    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    RUR.CURRENT_WORLD.tiles[x + "," + y] = tile;
    RUR.record_frame("debug", "set_tile_at_position");
};

},{"./constants.js":3,"./exceptions.js":13,"./objects.js":37,"./output.js":38,"./recorder/record_frame.js":45,"./state.js":52,"./translator.js":54,"./utils/supplant.js":62,"./world_get.js":71,"./world_set.js":74}],5:[function(require,module,exports){
function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
}

function shiftTab(cm) {
  cm.execCommand("indentLess");
}

window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.library = CodeMirror.fromTextArea(document.getElementById('library-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
library.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.pre_code_editor = CodeMirror.fromTextArea(document.getElementById('pre-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
pre_code_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});
window.post_code_editor = CodeMirror.fromTextArea(document.getElementById('post-code'), {
  mode: {
    name: "python",
    version: 3
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
post_code_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.description_editor = CodeMirror.fromTextArea(document.getElementById('description'), {
  mode: {
    name: "htmlmixed"
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
description_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

window.onload_editor = CodeMirror.fromTextArea(document.getElementById('onload-editor'), {
  mode: {
    name: "javascript"
  },
  tabMode: 'indent',
  lineNumbers: true,
  theme: 'reeborg-dark',
  indentUnit: 4,
  viewportMargin: Infinity
});
onload_editor.setOption("extraKeys", {
  Tab: betterTab,
  "Shift-Tab": shiftTab
});

},{}],6:[function(require,module,exports){

require("./translator.js");
require("./world_select.js");
require("./storage.js");

RUR.custom_world_select = {};

RUR.custom_world_select.make = function (contents) {
    "use strict";
    var i, url;
    RUR.world_select.empty_menu();
    for(i=0; i<contents.length; i++){
        RUR.world_select.append_world( {url:contents[i][0],
                                        shortname:contents[i][1]});
    }
    load_user_worlds();
    if (RUR.state.session_initialized) {
        RUR.world_select.set_default();
    }
};

function load_user_worlds() {
    var key, name, i;
    RUR.state.creating_menu = true;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            RUR.storage.append_world_name(name);
            $('#delete-world').show();
        }
    }
    RUR.state.creating_menu = false;
}


RUR.make_default_menu = function(language) {
    switch (language) {
        case 'en': RUR.make_default_menu_en();
                   break;
        case 'fr': RUR.make_default_menu_fr();
                   break;
        default: RUR.make_default_menu_en();
    }
};


RUR.make_default_menu_en = function () {
    "use strict";
    var contents,
        tutorial_en = '/src/worlds/tutorial_en/',
        menus = '/src/worlds/menus/',
        worlds = '/src/worlds/',
        docs = '/src/worlds/documentation/',
        permalinks = '/src/worlds/permalinks/';

    contents = [
        [worlds + 'alone.json', 'Alone'],
        [worlds + 'empty.json', 'Empty'],
        [tutorial_en + 'around1.json', 'Around 1'],
        [tutorial_en + 'around2.json', 'Around 2'],
        [tutorial_en + 'around3.json', 'Around 3'],
        [tutorial_en + 'around4.json', 'Around 4'],
        [tutorial_en + 'center1.json', 'Center 1'],
        [tutorial_en + 'center2.json', 'Center 2'],
        [tutorial_en + 'center3.json', 'Center 3'],
        [tutorial_en + 'harvest1.json', 'Harvest 1'],
        [tutorial_en + 'harvest2.json', 'Harvest 2'],
        [tutorial_en + 'harvest3.json', 'Harvest 3'],
        [tutorial_en + 'harvest4a.json', 'Harvest 4a'],
        [tutorial_en + 'harvest4b.json', 'Harvest 4b'],
        [tutorial_en + 'harvest4c.json', 'Harvest 4c'],
        [tutorial_en + 'harvest4d.json', 'Harvest 4d'],
        [tutorial_en + 'home1.json', 'Home 1'],
        [tutorial_en + 'home2.json', 'Home 2'],
        [tutorial_en + 'home3.json', 'Home 3'],
        [tutorial_en + 'hurdle1.json', 'Hurdle 1'],
        [tutorial_en + 'hurdle2.json', 'Hurdle 2'],
        [tutorial_en + 'hurdle3.json', 'Hurdle 3'],
        [tutorial_en + 'hurdle4.json', 'Hurdle 4'],
        [tutorial_en + 'maze1.json', 'Maze 1'],
        [tutorial_en + 'maze2.json', 'Maze 2'],
        [tutorial_en + 'newspaper0.json', 'Newspaper 0'],
        [tutorial_en + 'newspaper1.json', 'Newspaper 1'],
        [tutorial_en + 'newspaper2.json', 'Newspaper 2'],
        [tutorial_en + 'rain1.json', 'Rain 1'],
        [tutorial_en + 'rain2.json', 'Rain 2'],
        [tutorial_en + 'storm1.json', 'Storm 1'],
        [tutorial_en + 'storm2.json', 'Storm 2'],
        [tutorial_en + 'storm3.json', 'Storm 3'],
        [tutorial_en + 'tokens1.json', 'Tokens 1'],
        [tutorial_en + 'tokens2.json', 'Tokens 2'],
        [tutorial_en + 'tokens3.json', 'Tokens 3'],
        [tutorial_en + 'tokens4.json', 'Tokens 4'],
        [tutorial_en + 'tokens5.json', 'Tokens 5'],
        [tutorial_en + 'tokens6.json', 'Tokens 6'],
        [docs + 'simple_demo1', 'Demo 1 (solution)'],
        [docs + 'simple_demo2', 'Demo 2 (solution)'],
        [docs + 'simple_demo3', 'Demo 3 (solution)'],
        [worlds + 'simple_path.json', 'Simple path'],
        [worlds + 'gravel_path.json', 'Gravel path'],
        [worlds + 'gravel_path',
                           'Gravel path (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        [permalinks + 'pre_post_demo', 'Pre & Post code demo'],
        [permalinks + 'story', 'Story'],
        [permalinks + 'test_remove', 'Robot replacement'],
        [docs + 'big_maze.json', 'Big maze'],
        [worlds + 'maze_gen_py', 'Maze generation (Python)'],
        [worlds + 'maze_gen_js', 'Maze generation (Javascript)'],
        [worlds + 'blank.json', 'Blank canvas'],
        ];

    RUR.custom_world_select.make(contents);
};

RUR.make_default_menu_fr = function () {
    "use strict";
    var base_url, base_url2, contents, menus, worlds;

    base_url = '/src/worlds/tutorial_en/';
    base_url2 = '/src/worlds/tutorial_fr/';

    menus = '/src/worlds/menus/';
    worlds = '/src/worlds/';


    contents = [
        ['/src/worlds/alone.json', 'Seul'],
        ['/src/worlds/empty.json', 'Vide'],
        [base_url2 + 'around1.json', 'Autour 1'],
        [base_url2 + 'around2.json', 'Autour 2'],
        [base_url2 + 'around3.json', 'Autour 3'],
        [base_url2 + 'around4.json', 'Autour 4'],
        [base_url + 'home1.json', 'But 1'],
        [base_url + 'home2.json', 'But 2'],
        [base_url + 'home3.json', 'But 3'],
        [base_url + 'center1.json', 'Centrer 1'],
        [base_url + 'center2.json', 'Centrer 2'],
        [base_url + 'center3.json', 'Centrer 3'],
        [base_url + 'hurdle1.json', 'Haies 1'],
        [base_url + 'hurdle2.json', 'Haies 2'],
        [base_url + 'hurdle3.json', 'Haies 3'],
        [base_url + 'hurdle4.json', 'Haies 4'],
        [base_url + 'tokens1.json', 'Jetons 1'],
        [base_url + 'tokens2.json', 'Jetons 2'],
        [base_url + 'tokens3.json', 'Jetons 3'],
        [base_url + 'tokens4.json', 'Jetons 4'],
        [base_url + 'tokens5.json', 'Jetons 5'],
        [base_url + 'tokens6.json', 'Jetons 6'],
        [base_url + 'newspaper0.json', 'Journal 0'],
        [base_url + 'newspaper1.json', 'Journal 1'],
        [base_url + 'newspaper2.json', 'Journal 2'],
        [base_url + 'maze1.json', 'Labyrinthe 1'],
        [base_url + 'maze2.json', 'Labyrinthe 2'],
        [base_url + 'rain1.json', 'Pluie 1'],
        [base_url + 'rain2.json', 'Pluie 2'],
        [base_url + 'harvest1.json', 'Récolte 1'],
        [base_url + 'harvest2.json', 'Récolte 2'],
        [base_url + 'harvest3.json', 'Récolte 3'],
        [base_url + 'harvest4a.json', 'Récolte 4a'],
        [base_url + 'harvest4b.json', 'Récolte 4b'],
        [base_url + 'harvest4c.json', 'Récolte 4c'],
        [base_url + 'harvest4d.json', 'Récolte 4d'],
        [base_url + 'storm1.json', 'Tempête 1'],
        [base_url + 'storm2.json', 'Tempête 2'],
        [base_url + 'storm3.json', 'Tempête 3'],
        // [menus + 'default_fr', 'Menu par défaut'],
        [worlds + 'menus/documentation_fr', 'Documentation (menu anglais)'],
        [worlds + 'simple_path_fr.json', 'Simple sentier'],
        [worlds + 'gravel_path.json', 'Sentier de gravier'],
        [worlds + 'gravel_path_fr',
                           'Sentier de gravier (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        ['/src/worlds/blank.json', 'Canevas graphique'],
    ];

    RUR.custom_world_select.make(contents);
};

},{"./storage.js":53,"./translator.js":54,"./world_select.js":73}],7:[function(require,module,exports){
/* Dialog used by the Interactive world editor to add objects to the world.
*/

require("./../rur.js");
require("./../world_set/add_object.js");
require("./../visible_world.js");
require("./../state.js");


exports.dialog_add_object = dialog_add_object = $("#dialog-add-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            add_object();
        },
        Cancel: function() {
            dialog_add_object.dialog("close");
        }
    },
    close: function() {
        add_object_form[0].reset();
    }
});

function add_object () {
    "use strict";
    var query;
    input_add_number_result = parseInt($("#input-add-number").val(), 10);
    input_maximum_result = parseInt($("#maximum-number").val(), 10);
    if (input_maximum_result > input_add_number_result){
        query =  input_add_number_result + "-" + input_maximum_result;
    } else {
        query = input_add_number_result;
    }
    RUR.add_object_at_position(RUR.state.specific_object, RUR.state.x, RUR.state.y, query);
    RUR.vis_world.refresh_world_edited();
    dialog_add_object.dialog("close");
    return true;
}

add_object_form = dialog_add_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    add_object();
});

},{"./../rur.js":49,"./../state.js":52,"./../visible_world.js":64,"./../world_set/add_object.js":76}],8:[function(require,module,exports){

require("./../libs/jquery.ui.dialog.minmax.js");
require("./../rur.js");
var update_titles = require("./../../lang/msg.js").update_titles;


RUR.create_and_activate_dialogs = function(button, element, add_options, special_fn) {
    var options = {
    minimize: true,
    maximize: false,
    autoOpen: false,
    width: 800,
    height: 600,
    position: {my: "center", at: "center", of: window},
    beforeClose: function( event, ui ) {
            button.addClass("blue-gradient").removeClass("reverse-blue-gradient");
            if (special_fn !== undefined){
                special_fn();
            }
        }
    };
    for (var attrname in add_options) {
        options[attrname] = add_options[attrname];
    }

    button.on("click", function(evt) {
        element.dialog(options);
        button.toggleClass("blue-gradient");
        button.toggleClass("reverse-blue-gradient");
        if (button.hasClass("reverse-blue-gradient")) {
            element.dialog("open");
        } else {
            element.dialog("close");
        }
        if (special_fn !== undefined && element.dialog("isOpen")){
            special_fn();
        }
        update_titles();
    });
};

RUR.create_and_activate_dialogs($("#more-menus-button"), $("#more-menus"), {height:700});
RUR.create_and_activate_dialogs($("#special-keyboard-button"), $("#special-keyboard"),
        {autoOpen:false, width:600,  height:350, maximize: false, position:"left"});

$("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert",
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:250,
                                position:{my: "bottom", at: "bottom-20", of: window}});
$("#Reeborg-explores").dialog({minimize: false, maximize: false, autoOpen:false, width:600,
                                position:{my: "center", at: "center", of: $("#robot-canvas")}});
$("#Reeborg-proclaims").dialog({minimize: false, maximize: false, autoOpen:false, width:800, dialogClass: "proclaims",
                                position:{my: "bottom", at: "bottom-80", of: window}});
$("#Reeborg-watches").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:400, dialogClass: "watches",
                                position:{my: "bottom", at: "bottom-140", of: window}});

},{"./../../lang/msg.js":83,"./../libs/jquery.ui.dialog.minmax.js":20,"./../rur.js":49}],9:[function(require,module,exports){

require("./../world_set.js");
require("./../visible_world.js");
require("./../world_set/give_object_to_robot.js");
require("./../state.js");
require("./../rur.js");


exports.dialog_give_object = dialog_give_object = $("#dialog-give-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            give_object();
        },
        Cancel: function() {
            dialog_give_object.dialog("close");
        }
    },
    close: function() {
        give_object_form[0].reset();
    }
});
give_object = function () {
    "use strict";
    var query;
    give_number_result = parseInt($("#input-give-number").val(), 10);
    unlimited_number_result = $("#unlimited-number").prop("checked");
    if (unlimited_number_result){
        query = Infinity;
    } else {
        query = give_number_result;
    }
    RUR.give_object_to_robot(RUR.state.specific_object, query);
    RUR.vis_world.refresh_world_edited();
    dialog_give_object.dialog("close");
    return true;
};
give_object_form = dialog_give_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    give_object();
});

},{"./../rur.js":49,"./../state.js":52,"./../visible_world.js":64,"./../world_set.js":74,"./../world_set/give_object_to_robot.js":78}],10:[function(require,module,exports){
require("./../visible_world.js");
require("./../world_set/give_object_to_robot.js");
require("./../state.js");
;
// require("jquery-ui");

exports.dialog_goal_object = dialog_goal_object = $("#dialog-goal-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            goal_objects();
        },
        Cancel: function() {
            dialog_goal_object.dialog("close");
        }
    },
    close: function() {
        goal_objects_form[0].reset();
    }
});
goal_objects = function () {
    "use strict";
    var query;
    input_goal_number_result = parseInt($("#input-goal-number").val(), 10);
    all_objects_result = $("#all-objects").prop("checked");
    if (all_objects_result){
        query =  "all";
    } else {
        query = input_goal_number_result;
    }
    RUR.add_goal_object_at_position(RUR.state.specific_object, RUR.state.x, RUR.state.y, query);
    RUR.vis_world.refresh_world_edited();
    dialog_goal_object.dialog("close");
    return true;
};
goal_objects_form = dialog_goal_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    goal_objects();
});

},{"./../state.js":52,"./../visible_world.js":64,"./../world_set/give_object_to_robot.js":78}],11:[function(require,module,exports){
require("./../visible_world.js");
;
// require("jquery-ui");

exports.dialog_select_colour = dialog_select_colour = $("#dialog-select-colour").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            select_colour();
        },
        Cancel: function() {
            dialog_select_colour.dialog("close");
        }
    }
});

dialog_select_colour.find("form").on("submit", function( event ) {
    event.preventDefault();
    select_colour();
});

select_colour = function () {
    var colour = $("#colour-selection").val();
    if (!colour) {
        colour = false;
    }
    dialog_select_colour.dialog("close");
    RUR._CALLBACK_FN(colour);
    RUR.vis_world.draw_all();
};

},{"./../visible_world.js":64}],12:[function(require,module,exports){
require("./../visible_world.js");
;
// require("jquery-ui");

exports.dialog_set_background_image = dialog = $("#dialog-set-background-image").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_background_image();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});
dialog.find("form").on("submit",
    function( event ) {
        event.preventDefault();
        set_background_image();
});
set_background_image = function () {
    var url = $("#image-url").val();
    if (!url) {
        url = '';
    }
    RUR.CURRENT_WORLD.background_image = url;
    RUR.BACKGROUND_IMAGE.src = url;
    RUR.BACKGROUND_IMAGE.onload = RUR.vis_world.draw_all;
    dialog.dialog("close");
};

},{"./../visible_world.js":64}],13:[function(require,module,exports){

require("./rur.js");
require("./state.js");

RUR.ReeborgError = function (message) {
    if (RUR.state.programming_language == "python"){
        return ReeborgError(message);
    }
    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};

RUR.WallCollisionError = function (message) {
    if (RUR.state.programming_language == "python"){
        return WallCollisionError(message);
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};

},{"./rur.js":49,"./state.js":52}],14:[function(require,module,exports){
require("./../rur.js");
require("./../state.js");

/* We do not have
       require("./../visible_world.js");
   since it is only needed when the session is initialized;
   this can help prevent a circular import without needing to create two
   functions: we can use RUR.add_new_object_type for adding "default" objects,
   as part of the initializing sequence, as it does not require visible_world.
   However, visible_world requires RUR.OBJECTS which is defined here for
   convenience.
 */

/** @function add_new_object_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new objects. If the name
 *    of an existing object is specified again, the images for that object are
 *    replaced.  Two images must be provided: one for the object itself, and
 *    another when this object is specified as a goal. N.B. existing names
 *    are the English ones.
 *
 * @desc Cette fonction permet l'ajout de nouveaux objets.  Si le nom d'un
 *   objet existant est spécifié, les images pour cet objet seront remplacées
 *   par les nouvelles images fournies.  N.B. les noms d'objets par défaut sont
 *   des noms anglais (par exemple "token" plutôt que "jeton").
 *
 * @param {string} specific_object The name of the object type ; e.g. "mouse" <br>
 *                        _Le nom du type de l'objet; par exemple, "souris"._
 * @param {string} url - URL where the image can be found.
 *                    <br> _URL où l'image peut être trouvée_
 * @param {string} url_goal - URL where the image as a goal can be found.
 *                    <br> _URL où l'image comme but peut être trouvée_
 *
 */
RUR.OBJECTS = {};

RUR.add_new_object_type = function (name, url, url_goal) {
    var obj = RUR.OBJECTS;
    obj[name] = {};
    obj[name].image = new Image();
    obj[name].image_goal = new Image();
    obj[name].image.src = url;
    obj[name].image_goal.src = url_goal;
    if (RUR.state.session_initialized) {
        obj[name].image.onload = RUR.vis_world.refresh;
        obj[name].image_goal.onload = RUR.vis_world.draw_goal;
    } else {
        obj[name].image.onload = RUR.INCREMENT_LOADED_FN;
        obj[name].image_goal.onload = RUR.INCREMENT_LOADED_FN;
    }
    if (RUR.KNOWN_OBJECTS.indexOf(name) === -1) {
        RUR.KNOWN_OBJECTS.push(name);
    }
    RUR._NB_IMAGES_TO_LOAD += 2;
};

// supporting worlds created previously.
// TODO  see if this is still needed when Vincent Maille's book is published.
RUR.add_object_image = RUR.add_new_object_type;

},{"./../rur.js":49,"./../state.js":52}],15:[function(require,module,exports){
require("./../rur.js");

/** @function add_new_tile_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new objects. If the name
 *    of an existing object is specified again, the images for that object are
 *    replaced.  Two images must be provided: one for the object itself, and
 *    another when this object is specified as a goal. N.B. existing names
 *    are the English ones.
 *
 * @desc Cette fonction permet l'ajout de nouveaux objets.  Si le nom d'un
 *   objet existant est spécifié, les images pour cet objet seront remplacées
 *   par les nouvelles images fournies.  N.B. les noms d'objets par défaut sont
 *   des noms anglais (par exemple "token" plutôt que "jeton").
 *
 * @param {string} specific_object The name of the object type ; e.g. "mouse" <br>
 *                        _Le nom du type de l'objet; par exemple, "souris"._
 * @param {string} url - URL where the image can be found.
 *                    <br> _URL où l'image peut être trouvée_
 * @param {string} url_goal - URL where the image as a goal can be found.
 *                    <br> _URL où l'image comme but peut être trouvée_
 *
 */
RUR.TILES = {};

RUR.add_new_tile_type = function (tile) {
    var i, tiles = RUR.TILES;
    name = tile.name;
    tiles[name] = {};
    tiles[name].name = tile.name;
    if (tile.public_name) {
        tiles[name].name = tile.public_name;
    }
    if (tile.url) {
        tiles[name].image = new Image();
        tiles[name].image.src = tile.url;
        RUR._NB_IMAGES_TO_LOAD += 1;
        tiles[name].image.onload = RUR.INCREMENT_LOADED_FN;
    } else if (tile.images) {
        for (i=0; i < tile.images.length; i++){
            tiles[name]["image"+i] = new Image();
            tiles[name]["image"+i].src = tile.images[i];
            tiles[name]["image"+i].onload = RUR.INCREMENT_LOADED_FN;
        }
        RUR._NB_IMAGES_TO_LOAD += tile.images.length;
        if (tile.selection_method === "sync") {
            tiles[name].choose_image = function (coords) {
                return _sync(tiles[name], tile.images.length, coords);
            };
        } else if (tile.selection_method === "ordered") {
            tiles[name].choose_image = function (coords) {
                return _ordered(tiles[name], tile.images.length, coords);
            };
        } else {
            tiles[name].choose_image = function (coords) {
                return _random(tiles[name], tile.images.length);
            };
        }

    } else {
        alert("Fatal error: need either tile.url or a list: tile.images");
    }

    tiles[name].info = tile.info;
    if (tile.home) {
        tiles[name].detectable = true;
    } else {
        tiles[name].fatal = tile.fatal;
        tiles[name].detectable = tile.detectable;
        tiles[name].message = tile.message;
        tiles[name].slippery = tile.slippery;
        tiles[name].solid = tile.solid;
    }

    RUR.KNOWN_TILES.push(name);
};

_random = function (tile, nb) {
    // each tile is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return tile["image" + choice];
};
_ordered = function (tile, nb, coords) {
    // each tile is given a random initial value but then goes in order

    if (RUR._ORDERED_TILES[tile.name] === undefined) {
        RUR._ORDERED_TILES[tile.name] = {};
        RUR._ORDERED_TILES[tile.name][coords] = Math.floor(Math.random() * nb);
    } else if (Object.keys(RUR._ORDERED_TILES[tile.name]).indexOf(coords) === -1) {
        RUR._ORDERED_TILES[tile.name][coords] = Math.floor(Math.random() * nb);
    } else {
        RUR._ORDERED_TILES[tile.name][coords] += 1;
        RUR._ORDERED_TILES[tile.name][coords] %= nb;
    }
    return tile["image" + RUR._ORDERED_TILES[tile.name][coords]];
};
_sync = function (tile, nb, coords) {
    // every tile of this type is kept in sync
    if (RUR._SYNC_TILES[tile.name] === undefined) {
        RUR._SYNC_TILES[tile.name] = [];
        RUR._SYNC_TILES_VALUE[tile.name] = 1;
    } else if (RUR._SYNC_TILES[tile.name].indexOf(coords) !== -1) {
        // see a same tile present: we are starting a new sequence
        RUR._SYNC_TILES[tile.name] = [];
        RUR._SYNC_TILES_VALUE[tile.name] += 1;
        RUR._SYNC_TILES_VALUE[tile.name] %= nb;
    }
    RUR._SYNC_TILES[tile.name].push(coords);
    return tile["image" + RUR._SYNC_TILES_VALUE[tile.name]];
};

},{"./../rur.js":49}],16:[function(require,module,exports){
require("./../rur.js");

/** @function add_new_home_tile
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add a new image to use as
 *    a home tile. If the name of an existing home tile is specified again,
 *    the image for that object is replaced; we suggest you do not do this.

 *
 * @desc Cette fonction permet l'ajout de nouvelles images à utiliser comme
 *   but à atteindre pour le robot.  Si le nom d'un but existant est spécifié,
 *   l'image pour ce but est remplacée par la nouvelle image; nous vous suggérons
 *   de ne pas faire ceci.
 *
 * @param {string} name The name to be used for this tile<br>
 *                        _Le nom à utiliser pour cet objet._
 * @param {string} url - URL where the image can be found.
 *                    <br> _URL où l'image peut être trouvée_
 * @param {string} info - A sentence to be displayed when the user queries information
 *                       about the world; something like "goal: Reeborg can detect
 *                       this tile using at\_goal()." <br> *Une phrase décrivant ce but lorsqu
 *                       l'usager consulte la description du monde; quelque chosen
 *                       comme "but: Reeborg peut détecter ceci en utilisant au\_but()".*
 *
 */

RUR.HOME_IMAGES = {};

RUR.add_new_home_tile = function (name, url, info) {
    var home = RUR.HOME_IMAGES;
    home[name] = {};
    home[name].detectable = true;
    home[name].info = info;
    home[name].image = new Image();
    home[name].image.src = url;
    home[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR._NB_IMAGES_TO_LOAD += 1;
};

},{"./../rur.js":49}],17:[function(require,module,exports){

require("./output.js");
require("./recorder.js");
require("./world.js");
require("./world/import_world.js");
require("./world_select.js");
require("./permalink.js");
require("./translator.js");
require("./exceptions.js");
require("./listeners/stop.js");
require("./utils/supplant.js");


RUR.file_io = {};

RUR.file_io.load_world_from_program = function (url, shortname) {
    /*  Loads a world or permalink from a user's program using World()

    Possible choices:
        World(shortname)  where shortname is an existing name in html select
            example:  World ("Home 1")

            Another case is where a world in saved in local storage;
            in this case, the url must be modified by the user as in
            World("user_world:My World")

        World(url)  where url is a world or permalink located elsewhere
            example: World("http://personnel.usainteanne.ca/aroberge/reeborg/token.json")
            In this case, the url will be used as a shortname to appear in the menu

        World(url, shortname) where url is a world or permalink located elsewhere
            and shortname is the name to appear in the html select.

        If "url" already exists and is the selected world BUT shortname is
        different than the existing name, a call
        World(url, shortname)
        will result in the shortname being updated.
    */
    "use strict";
    var selected, possible_url, new_world=false, new_selection=false;
    RUR.file_io.status = undefined;

    if (url === undefined) {
        RUR.output.write(RUR.translate("World() needs an argument."));
        return;
    }

    if (shortname === undefined) {
        shortname = url;
        possible_url = RUR.world_select.url_from_shortname(shortname);
        if (possible_url !== undefined){
            url = possible_url;
        }
    }

    selected = RUR.world_select.get_selected();

    if (selected.shortname.toLowerCase() === shortname.toLowerCase()) {
        return "no world change";
    } else if (selected.url === url && shortname != selected.shortname) {
        RUR.world_select.replace_shortname(url, shortname);
        return;
    } else if (RUR.world_select.url_from_shortname(shortname)!==undefined){
        url = RUR.world_select.url_from_shortname(shortname);
        new_selection = shortname;
    }  else {
        new_world = shortname;
    }

    RUR.file_io.load_world_file(url, shortname);

    if (RUR.file_io.status !== undefined) {
        RUR.frames = [];
        RUR.stop();
        RUR.state.prevent_playback = true;
    }
    if (RUR.file_io.status === "no link") {
        RUR.show_feedback("#Reeborg-shouts",
                RUR.translate("Could not find link: ") + url);
        throw new RUR.ReeborgError("no link");
    } else if (RUR.file_io.status === "success") {
        if (new_world) {
            RUR.world_select.append_world({url:url, shortname:new_world});
        }
        RUR.world_select.set_url(url);
        RUR.show_feedback("#Reeborg-shouts",
            RUR.translate("World selected").supplant({world: shortname}));
        throw new RUR.ReeborgError("success");
    }
};

RUR.file_io.last_url_loaded = undefined;
RUR.file_io.last_shortname_loaded = undefined;

RUR.file_io.load_world_file = function (url, shortname) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data;

    if (RUR.file_io.last_url_loaded == url &&
        RUR.file_io.last_shortname_loaded == shortname) {
            return;
    } else {
        RUR.file_io.last_url_loaded = url;
        RUR.file_io.last_shortname_loaded = shortname;
    }

    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        if (data === null) {
            RUR.file_io.status = "no link";
            return;
        }
        RUR.world.import_world(data);
        RUR.file_io.status = "success";
        RUR.frames = [];
    } else {
        $.ajax({url: url,
            async: false,
            error: function(e){
                RUR.file_io.status = "no link";
            },
            success: function(data){
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    RUR.permalink.update(data, shortname);
                    RUR.reload();
                } else {
                    RUR.world.import_world(data);
                }
                RUR.file_io.status = "success";
            }
        });
    }
};

},{"./exceptions.js":13,"./listeners/stop.js":34,"./output.js":38,"./permalink.js":39,"./recorder.js":44,"./translator.js":54,"./utils/supplant.js":62,"./world.js":65,"./world/import_world.js":69,"./world_select.js":73}],18:[function(require,module,exports){


require("./utils/key_exist.js");

/* require this module that will automatically modify a global object*/
require("./utils/cors.js");

require("./playback/reverse_step.js"); /* only invoked from the html file - for now */

require("./commands.js");
require("./world_editor.js");

require("./start_session.js");

},{"./commands.js":2,"./playback/reverse_step.js":42,"./start_session.js":51,"./utils/cors.js":57,"./utils/key_exist.js":60,"./world_editor.js":70}],19:[function(require,module,exports){
/*  Handler of special on-screen keyboard
*/

require("./state.js");

RUR.kbd = {};

RUR.kbd.set_programming_language = function (lang) {
    $("#kbd-python-btn").hide();
    $("#kbd-py-console-btn").hide();
    $("#kbd-javascript-btn").hide();
    switch (lang) {
        case "python":
            if (RUR.state.input_method==="py-repl"){
                $("#kbd-py-console-btn").show();
            } else {
                $("#kbd-python-btn").show();
            }
            break;
        case "javascript":
            $("#kbd-javascript-btn").show();
            break;
    }
    RUR.kbd.select();
};

RUR.kbd.insert2 = function (txt){
    if (RUR.state.programming_language == "javascript") {
        RUR.kbd.insert(txt + ";");
    } else {
        RUR.kbd.insert(txt);
    }
};

RUR.kbd.insert_in_console = function (txt) {
    var console = $("#py-console");
    console.val(console.val() + txt);
    console.focus();
};

RUR.kbd.insert = function (txt){
    "use strict";
    var doc, cursor, line, pos;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console(txt);
        return;
    }
    if (txt === undefined) {
        txt = "'";
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    cursor = doc.getCursor();
    line = doc.getLine(cursor.line);
    pos = { // create a new object to avoid mutation of the original selection
       line: cursor.line,
       ch: cursor.ch // set the character position to the end of the line
   };
    doc.replaceRange(txt, pos); // adds a new line
    doc.focus();
};

RUR.kbd.undo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.undo();
    doc.focus();
};

RUR.kbd.redo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.redo();
    doc.focus();
};

RUR.kbd.enter = function () {
    "use strict";
    var doc, ev;
    if (RUR.state.input_method==="py-repl") {
        ev = {};
        ev.keyCode = 13;
        ev.preventDefault = function () {};
        myKeyPress(ev);
        return;
    }
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("newlineAndIndent");
    doc.focus();
};

RUR.kbd.tab = function () {
    "use strict";
    var doc;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console('    ');
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentMore");
    doc.focus();
};

RUR.kbd.shift_tab = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentLess");
    doc.focus();
};

RUR.kbd.select = function (choice) {
    "use strict";
    $(".kbd-command").hide();
    $(".kbd-condition").hide();
    $(".kbd-objects").hide();
    $(".kbd-python").hide();
    $(".kbd-py-console").hide();
    $(".kbd-javascript").hide();
    $(".kbd-special").hide();
    $(".no-console").hide();
    if ($("#kbd-command-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-command-btn").removeClass("reverse-blue-gradient");
        $("#kbd-command-btn").addClass("blue-gradient");
    } else if ($("#kbd-condition-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-condition-btn").removeClass("reverse-blue-gradient");
        $("#kbd-condition-btn").addClass("blue-gradient");
    } else if ($("#kbd-python-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-python-btn").removeClass("reverse-blue-gradient");
        $("#kbd-python-btn").addClass("blue-gradient");
    } else if ($("#kbd-py-console-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-py-console-btn").removeClass("reverse-blue-gradient");
        $("#kbd-py-console-btn").addClass("blue-gradient");
    } else if ($("#kbd-javascript-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-javascript-btn").removeClass("reverse-blue-gradient");
        $("#kbd-javascript-btn").addClass("blue-gradient");
    } else if ($("#kbd-objects-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-objects-btn").removeClass("reverse-blue-gradient");
        $("#kbd-objects-btn").addClass("blue-gradient");
    } else if ($("#kbd-special-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-special-btn").removeClass("reverse-blue-gradient");
        $("#kbd-special-btn").addClass("blue-gradient");
    }
    switch (choice) {
        case "kbd-condition":
            $(".kbd-condition").show();
            $("#kbd-condition-btn").removeClass("blue-gradient");
            $("#kbd-condition-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-objects":
            $(".kbd-objects").show();
            $("#kbd-objects-btn").removeClass("blue-gradient");
            $("#kbd-objects-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-python":
            $(".kbd-python").show();
            $("#kbd-python-btn").removeClass("blue-gradient");
            $("#kbd-python-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-py-console":
            $(".kbd-py-console").show();
            $("#kbd-py-console-btn").removeClass("blue-gradient");
            $("#kbd-py-console-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-javascript":
            $(".kbd-javascript").show();
            $("#kbd-javascript-btn").removeClass("blue-gradient");
            $("#kbd-javascript-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-special":
            $(".kbd-special").show();
            $("#kbd-special-btn").removeClass("blue-gradient");
            $("#kbd-special-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-command":  // jshint ignore:line
        default:
            $(".kbd-command").show();
            $("#kbd-command-btn").removeClass("blue-gradient");
            $("#kbd-command-btn").addClass("reverse-blue-gradient");
    }

    if (RUR.state.programming_language == "python") {
        $(".only_py").show();
        if (RUR.state.input_method==="py-repl") {
            $(".no-console").hide();
        }
        $(".only_js").hide();
    } else {
        $(".only_js").show();
        $(".only_py").hide();
    }
};

},{"./state.js":52}],20:[function(require,module,exports){
/*
 * jQuery UI Dialog 1.8.16
 * w/ Minimize & Maximize Support
 * by Elijah Horton (fieryprophet@yahoo.com)
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 *
 * Modified by André Roberge to remove some IE support which is irrelevant for me.
 */
(function( $, undefined ) {

var uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ',
	sizeRelatedOptions = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
	resizableRelatedOptions = {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	},
	// support for jQuery 1.3.2 - handle common attrFn methods for dialog
	attrFn = $.attrFn || {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true,
		click: true
	};

$.widget("ui.dialog", {
	options: {
		autoOpen: true,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 300,
		minimizeText: 'minimize',
		maximizeText: 'maximize',
		minimize: true,
		maximize: true,
		modal: false,
		position: {
			my: 'center',
			at: 'center',
			collision: 'fit',
			// ensure that the titlebar is never outside the document
			using: function(pos) {
				var topOffset = $(this).css(pos).offset().top;
				if (topOffset < 0) {
					$(this).css('top', pos.top - topOffset);
				}
			}
		},
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000
	},

	_create: function() {
		this.originalTitle = this.element.attr('title');
		// #5742 - .attr() might return a DOMElement
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}

		this.options.title = this.options.title || this.originalTitle;
		var self = this,
			options = self.options,

			title = options.title || '&#160;',
			titleId = $.ui.dialog.getTitleId(self.element),

			uiDialog = (self.uiDialog = $('<div></div>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				// setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE) {

						self.close(event);
						event.preventDefault();
					}
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = self.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogTitlebar = (self.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-corner-all ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog);
			if(options.minimize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMinimize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-minimize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMinimize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMinimize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMinimize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMinimize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.minimize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMinimizeText = (self.uiDialogTitlebarMinimizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-minusthick'
					)
					.text(options.minimizeText)
					.appendTo(uiDialogTitlebarMinimize);
			}
			if(options.maximize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMaximize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-maximize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMaximize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMaximize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMaximize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMaximize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.maximize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMaximizeText = (self.uiDialogTitlebarMaximizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-plusthick'
					)
					.text(options.maximizeText)
					.appendTo(uiDialogTitlebarMaximize);
					$(uiDialogTitlebar).dblclick(function(event) {
						self.maximize(event);
						return false;
					});
			}
			if(options.close !== false){
				var uiDialogTitlebarClose = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-close ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarClose.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarClose.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarClose.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarClose.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.close(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-closethick'
					)
					.text(options.closeText)
					.appendTo(uiDialogTitlebarClose);
			}

			uiDialogTitle = $('<span></span>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

		//handling of deprecated beforeclose (vs beforeClose) option
		//Ticket #4669 http://dev.jqueryui.com/ticket/4669
		//TODO: remove in 1.9pre
		if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
			options.beforeClose = options.beforeclose;
		}

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		if (options.draggable && $.fn.draggable) {
			self._makeDraggable();
		}
		if (options.resizable && $.fn.resizable) {
			self._makeResizable();
		}

		self._createButtons(options.buttons);
		self._isOpen = false;
		self._min = false;

		if ($.fn.bgiframe) {
			uiDialog.bgiframe();
		}
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	destroy: function() {
		var self = this;

		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.hide();
		self.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
		self.uiDialog.remove();

		if (self.originalTitle) {
			self.element.attr('title', self.originalTitle);
		}

		return self;
	},

	widget: function() {
		return this.uiDialog;
	},

	minimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeMinimize', event)) {
			return;
		}
		if(!ui.data('is-minimized')){
			if(self.options.minimize && typeof self.options.minimize !== "boolean" && $(self.options.minimize).length > 0){
				self._min = $('<a>' + (ui.find('span.ui-dialog-title').html().replace(/&nbsp;/, '') || 'Untitled Dialog') + '</a>')
					.attr('title', 'Click to restore dialog').addClass('ui-corner-all ui-button').click(function(event){self.unminimize(event);});
				$(self.options.minimize).append(self._min);
				ui.data('is-minimized', true).hide();
			} else {
				if(ui.is( ":data(resizable)" )) {
					ui.data('was-resizable', true).resizable('destroy');
				} else {
					ui.data('was-resizable', false)
				}
				ui.data('minimized-height', ui.height());
				ui.find('.ui-dialog-content').hide();
				ui.find('.ui-dialog-titlebar-maximize').hide();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '1.8em').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s')
					.find('span').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s').click(function(event){self.unminimize(event); return false;});;
				ui.data('is-minimized', true).height('auto');
			}
		}
		return self;
	},

	unminimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeUnminimize', event)) {
			return;
		}
		if(ui.data('is-minimized')){
			if(self._min){
				self._min.unbind().remove();
				self._min = false;
				ui.data('is-minimized', false).show();
				self.moveToTop();
			} else {
				ui.height(ui.data('minimized-height')).data('is-minimized', false).removeData('minimized-height').find('.ui-dialog-content').show();
				ui.find('.ui-dialog-titlebar-maximize').show();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '3.3em').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick')
					.find('span').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick').click(function(event){self.minimize(event); return false;});
				if(ui.data('was-resizable') == true) {
					self._makeResizable(true);
				}
			}
		}
		return self;
	},

	maximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeMaximize', event)) {
			return;
		}
		if(!ui.data('is-maximized')){
			if(ui.is( ":data(draggable)" )) {
				ui.data('was-draggable', true).draggable('destroy');
			} else {
				ui.data('was-draggable', false)
			}
			if(ui.is( ":data(resizable)" )) {
				ui.data('was-resizable', true).resizable('destroy');
			} else {
				ui.data('was-resizable', false)
			}
			ui.data('maximized-height', ui.height()).data('maximized-width', ui.width()).data('maximized-top', ui.css('top')).data('maximized-left', ui.css('left'))
				.data('is-maximized', true).height($(window).height()-8).width($(window).width()+9).css({"top":0, "left": 0}).find('.ui-dialog-titlebar-minimize').hide();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw')
				.find('span').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw').click(function(event){self.unmaximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.unmaximize(event); return false;});
		}
		return self;
	},

	unmaximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeUnmaximize', event)) {
			return;
		}
		if(ui.data('is-maximized')){
			ui.height(ui.data('maximized-height')).width(ui.data('maximized-width')).css({"top":ui.data('maximized-top'), "left":ui.data('maximized-left')})
				.data('is-maximized', false).removeData('maximized-height').removeData('maximized-width').removeData('maximized-top').removeData('maximized-left').find('.ui-dialog-titlebar-minimize').show();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick')
				.find('span').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick').click(function(){self.maximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.maximize(event); return false;});
			if(ui.data('was-draggable') == true) {
				self._makeDraggable(true);
			}
			if(ui.data('was-resizable') == true) {
				self._makeResizable(true);
			}
		}
		return self;
	},

	close: function(event) {
		var self = this,
			maxZ, thisZ;

		if (false === self._trigger('beforeClose', event)) {
			return;
		}
		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.unbind('keypress.ui-dialog');

		self._isOpen = false;

		if (self.options.hide) {
			self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			});
		} else {
			self.uiDialog.hide();
			self._trigger('close', event);
		}

		$.ui.dialog.overlay.resize();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if (self.options.modal) {
			maxZ = 0;
			$('.ui-dialog').each(function() {
				if (this !== self.uiDialog[0]) {
					thisZ = $(this).css('z-index');
					if(!isNaN(thisZ)) {
						maxZ = Math.max(maxZ, thisZ);
					}
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}
		return self;
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function(force, event) {
		var self = this,
			options = self.options,
			saveScroll;

		if ((options.modal && !force) ||
			(!options.stack && !options.modal)) {
			return self._trigger('focus', event);
		}

		if (options.zIndex > $.ui.dialog.maxZ) {
			$.ui.dialog.maxZ = options.zIndex;
		}
		if (self.overlay) {
			$.ui.dialog.maxZ += 1;
			self.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ);
		}

		//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
		//  http://ui.jquery.com/bugs/ticket/3193
		saveScroll = { scrollTop: self.element.scrollTop(), scrollLeft: self.element.scrollLeft() };
		$.ui.dialog.maxZ += 1;
		self.uiDialog.css('z-index', $.ui.dialog.maxZ);
		self.element.attr(saveScroll);
		self._trigger('focus', event);

		return self;
	},

	open: function() {
		if (this._isOpen) { return; }

		var self = this,
			options = self.options,
			uiDialog = self.uiDialog;

		self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
		self._size();
		self._position(options.position);
		uiDialog.show(options.show);
		self.moveToTop(true);

		// prevent tabbing out of modal dialogs
		if (options.modal) {
			uiDialog.bind('keypress.ui-dialog', function(event) {
				if (event.keyCode !== $.ui.keyCode.TAB) {
					return;
				}

				var tabbables = $(':tabbable', this),
					first = tabbables.filter(':first'),
					last  = tabbables.filter(':last');

				if (event.target === last[0] && !event.shiftKey) {
					first.focus(1);
					return false;
				} else if (event.target === first[0] && event.shiftKey) {
					last.focus(1);
					return false;
				}
			});
		}

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		$(self.element.find(':tabbable').get().concat(
			uiDialog.find('.ui-dialog-buttonpane :tabbable').get().concat(
				uiDialog.get()))).eq(0).focus();

		self._isOpen = true;
		self._trigger('open');

		return self;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				),
			uiButtonSet = $( "<div></div>" )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( uiDialogButtonPane );

		// if we already have a button pane, remove it
		self.uiDialog.find('.ui-dialog-buttonpane').remove();

		if (typeof buttons === 'object' && buttons !== null) {
			$.each(buttons, function() {
				return !(hasButtons = true);
			});
		}
		if (hasButtons) {
			$.each(buttons, function(name, props) {
				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				var button = $('<button type="button"></button>')
					.click(function() {
						props.click.apply(self.element[0], arguments);
					})
					.appendTo(uiButtonSet);
				// can't use .attr( props, true ) with jQuery 1.3.2.
				$.each( props, function( key, value ) {
					if ( key === "click" ) {
						return;
					}
					if ( key in attrFn ) {
						button[ key ]( value );
					} else {
						button.attr( key, value );
					}
				});
				if ($.fn.button) {
					button.button();
				}
			});
			uiDialogButtonPane.appendTo(self.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = self.options,
			doc = $(document),
			heightBeforeDrag;

		function filteredUi(ui) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		self.uiDialog.draggable({
			cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function(event, ui) {
				heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
				$(this).height($(this).height()).addClass("ui-dialog-dragging");
				self._trigger('dragStart', event, filteredUi(ui));
			},
			drag: function(event, ui) {
				self._trigger('drag', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				options.position = [ui.position.left - doc.scrollLeft(),
					ui.position.top - doc.scrollTop()];
				$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				self._trigger('dragStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = self.options,
			// .ui-resizable has position: relative defined in the stylesheet
			// but dialogs have to use absolute or fixed positioning
			position = self.uiDialog.css('position'),
			resizeHandles = (typeof handles === 'string' ?
				handles	:
				'n,e,s,w,se,sw,ne,nw'
			);

		function filteredUi(ui) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}
		self.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			containment: 'document',
			alsoResize: self.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: self._minHeight(),
			handles: resizeHandles,
			start: function(event, ui) {
				$(this).addClass("ui-dialog-resizing");
				self._trigger('resizeStart', event, filteredUi(ui));
			},
			resize: function(event, ui){
				self._trigger('resize', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				$(this).removeClass("ui-dialog-resizing");
				options.height = $(this).height();
				options.width = $(this).width();
				self._trigger('resizeStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		})
		.css('position', position)
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_minHeight: function() {
		var options = this.options;

		if (options.height === 'auto') {
			return options.minHeight;
		} else {
			return Math.min(options.minHeight, options.height);
		}
	},

	_position: function(position) {
		var myAt = [],
			offset = [0, 0],
			isVisible;

		if (position) {
			// deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
	//		if (typeof position == 'string' || $.isArray(position)) {
	//			myAt = $.isArray(position) ? position : position.split(' ');

			if (typeof position === 'string' || (typeof position === 'object' && '0' in position)) {
				myAt = position.split ? position.split(' ') : [position[0], position[1]];
				if (myAt.length === 1) {
					myAt[1] = myAt[0];
				}

				$.each(['left', 'top'], function(i, offsetPosition) {
					if (+myAt[i] === myAt[i]) {
						offset[i] = myAt[i];
						myAt[i] = offsetPosition;
					}
				});

				position = {
					my: myAt.join(" "),
					at: myAt.join(" "),
					offset: offset.join(" ")
				};
			}

			position = $.extend({}, $.ui.dialog.prototype.options.position, position);
		} else {
			position = $.ui.dialog.prototype.options.position;
		}

		// need to show the dialog to get the actual offset in the position plugin
		isVisible = this.uiDialog.is(':visible');
		if (!isVisible) {
			this.uiDialog.show();
		}
		this.uiDialog
			// workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
			//.css({ top: 0, left: 0 })
			.position($.extend({ of: window }, position));
		if (!isVisible) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var self = this,
			resizableOptions = {},
			resize = false;

		$.each( options, function( key, value ) {
			self._setOption( key, value );

			if ( key in sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
		}
		if ( this.uiDialog.is( ":data(resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function(key, value){
		var self = this,
			uiDialog = self.uiDialog;

		switch (key) {
			//handling of deprecated beforeclose (vs beforeClose) option
			//Ticket #4669 http://dev.jqueryui.com/ticket/4669
			//TODO: remove in 1.9pre
			case "beforeclose":
				key = "beforeClose";
				break;
			case "buttons":
				self._createButtons(value);
				break;
			case "closeText":
				// ensure that we always pass a string
				self.uiDialogTitlebarCloseText.text("" + value);
				break;
			case "dialogClass":
				uiDialog
					.removeClass(self.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "disabled":
				if (value) {
					uiDialog.addClass('ui-dialog-disabled');
				} else {
					uiDialog.removeClass('ui-dialog-disabled');
				}
				break;
			case "draggable":
				var isDraggable = uiDialog.is( ":data(draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}

				if ( !isDraggable && value ) {
					self._makeDraggable();
				}
				break;
			case "position":
				self._position(value);
				break;
			case "resizable":
				// currently resizable, becoming non-resizable
				var isResizable = uiDialog.is( ":data(resizable)" );
				if (isResizable && !value) {
					uiDialog.resizable('destroy');
				}

				// currently resizable, changing handles
				if (isResizable && typeof value === 'string') {
					uiDialog.resizable('option', 'handles', value);
				}

				// currently non-resizable, becoming resizable
				if (!isResizable && value !== false) {
					self._makeResizable(value);
				}
				break;
			case "title":
				// convert whatever was passed in o a string, for html() to not throw up
				$(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || '&#160;'));
				break;
		}

		$.Widget.prototype._setOption.apply(self, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options,
			nonContentHeight,
			minContentHeight,
			isVisible = this.uiDialog.is( ":visible" );

		// reset content sizing
		this.element.show().css({
			width: 'auto',
			minHeight: 0,
			height: 0
		});

		if (options.minWidth > options.width) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );

		if ( options.height === "auto" ) {
			// only needed for IE6 support
			if ( $.support.minHeight ) {
				this.element.css({
					minHeight: minContentHeight,
					height: "auto"
				});
			} else {
				this.uiDialog.show();
				var autoHeight = this.element.css( "height", "auto" ).height();
				if ( !isVisible ) {
					this.uiDialog.hide();
				}
				this.element.height( Math.max( autoHeight, minContentHeight ) );
			}
		} else {
			this.element.height( Math.max( options.height - nonContentHeight, 0 ) );
		}

		if (this.uiDialog.is(':data(resizable)')) {
			this.uiDialog.resizable('option', 'minHeight', this._minHeight());
		}
	}
});

$.extend($.ui.dialog, {
	version: "1.8.16",

	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		var id = $el.attr('id');
		if (!id) {
			this.uuid += 1;
			id = this.uuid;
		}
		return 'ui-dialog-title-' + id;
	},

	overlay: function(dialog) {
		this.$el = $.ui.dialog.overlay.create(dialog);
	}
});

$.extend($.ui.dialog.overlay, {
	instances: [],
	// reuse old instances due to IE memory leak with alpha transparency (see #5185)
	oldInstances: [],
	maxZ: 0,
	events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle $(el).dialog().dialog('close') (see #4065)
				if ($.ui.dialog.overlay.instances.length) {
					$(document).bind($.ui.dialog.overlay.events, function(event) {
						// stop events if the z-index of the target is < the z-index of the overlay
						// we cannot return true when we don't want to cancel the event (#3523)
						if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) {
							return false;
						}
					});
				}
			}, 1);

			// allow closing by pressing the escape key
			$(document).bind('keydown.dialog-overlay', function(event) {
				if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

					dialog.close(event);
					event.preventDefault();
				}
			});

			// handle window resize
			$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
		}

		var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

		if ($.fn.bgiframe) {
			$el.bgiframe();
		}

		this.instances.push($el);
		return $el;
	},

	destroy: function($el) {
		var indexOf = $.inArray($el, this.instances);
		if (indexOf != -1){
			this.oldInstances.push(this.instances.splice(indexOf, 1)[0]);
		}

		if (this.instances.length === 0) {
			$([document, window]).unbind('.dialog-overlay');
		}

		$el.remove();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		var maxZ = 0;
		$.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		return $(document).height() + 'px';
	},

	width: function() {
		return $(document).width() + 'px';
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $([]);
		$.each($.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add(this);
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend($.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy(this.$el);
	}
});

}(jQuery));
},{}],21:[function(require,module,exports){
require("./canvas.js");
require("./editors_tabs.js");
require("./human_language.js");
require("./memorize_world.js");
require("./onclick.js");
require("./pause.js");
require("./programming_mode.js");
require("./reload.js");
require("./robot_model.js");
require("./run.js");
require("./select_world_change.js");
require("./step.js");
require("./stop.js");
require("./toggle_highlight.js");
require("./toggle_watch.js");

},{"./canvas.js":22,"./editors_tabs.js":23,"./human_language.js":24,"./memorize_world.js":25,"./onclick.js":26,"./pause.js":27,"./programming_mode.js":28,"./reload.js":29,"./robot_model.js":30,"./run.js":31,"./select_world_change.js":32,"./step.js":33,"./stop.js":34,"./toggle_highlight.js":35,"./toggle_watch.js":36}],22:[function(require,module,exports){
require("./../rur.js");

$("#robot-canvas").mousemove(function (evt) {
    RUR.mouse_x = evt.pageX;
    RUR.mouse_y = evt.pageY;
    handleMouseMove(evt);
});
$("#robot-canvas").on("click", function (evt) {
    RUR.mouse_x = evt.pageX;
    RUR.mouse_y = evt.pageY;
}); // mouse clicks also requested in world_editor.js (at bottom)

/* tooltip intended to provide information about objects carried by robot */
var tooltip = {};
tooltip.canvas = document.getElementById("tooltip");
tooltip.ctx = tooltip.canvas.getContext("2d");

function handleMouseMove(evt) {
    var x, y, hit, position, world, robot, mouse_above_robot, image, nb_obj;
    var size = 40, objects_carried;

    world = RUR.CURRENT_WORLD;
    x = evt.pageX - $("#robot-canvas").offset().left;
    y = evt.pageY - $("#robot-canvas").offset().top;
    position = RUR.calculate_grid_position();
    tooltip.canvas.style.left = "-200px";
    if (!tooltip.mouse_contained) {
        return;
    }

    //mouse_above_robot = false;
    if (world.robots !== undefined) {
        for (i=0; i < world.robots.length; i++) {
            robot = world.robots[i];
            if (robot.start_positions === undefined) {
                robot.start_positions = [[robot.x, robot.y]];
            }
            for (j=0; j < robot.start_positions.length; j++){
                pos = robot.start_positions[j];
                if(pos[0]==position[0] && pos[1]==position[1]){
                    mouse_above_robot = true;
                    if (robot.objects !== undefined){
                        objects_carried = Object.keys(robot.objects);
                        break;
                    }
                }
            }
            if (mouse_above_robot) {
                break;
            }
        }
    }

    tooltip.canvas.height = size;
    if (objects_carried !== undefined) {
        tooltip.canvas.width = size*Math.max(objects_carried.length, 1);
    } else {
        tooltip.canvas.width = size;
        objects_carried = [];
    }
    if (mouse_above_robot){
        tooltip.canvas.style.left = x+20 + "px";
        tooltip.canvas.style.top = y + "px";
        tooltip.ctx.clearRect(0, 0, tooltip.canvas.width, tooltip.canvas.height);
        for (i=0; i < objects_carried.length; i++){
            image = RUR.OBJECTS[objects_carried[i]].image;
            nb_obj = robot.objects[objects_carried[i]];
            if (nb_obj == "infinite" || nb_obj == Infinity) {
                nb_obj = "∞";
            }
            tooltip.ctx.drawImage(image, i*size, 0, image.width, image.height);
            tooltip.ctx.fillText(nb_obj, i*size+1, size-1);
        }
    }
}

RUR.calculate_grid_position = function () {
    var ctx, x, y;
    x = RUR.mouse_x - $("#robot-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-canvas").offset().top;

    x /= RUR.WALL_LENGTH;
    x = Math.floor(x);

    y = RUR.HEIGHT - y + RUR.WALL_THICKNESS;
    y /= RUR.WALL_LENGTH;
    y = Math.floor(y);

    tooltip.mouse_contained = true;
    if (x < 1 ) {
        x = 1;
        tooltip.mouse_contained = false;
    } else if (x > RUR.COLS) {
        x = RUR.COLS;
        tooltip.mouse_contained = false;
    }
    if (y < 1 ) {
        y = 1;
        tooltip.mouse_contained = false;
    } else if (y > RUR.ROWS) {
        y = RUR.ROWS;
        tooltip.mouse_contained = false;
    }
    return [x, y];
};

},{"./../rur.js":49}],23:[function(require,module,exports){
require("./../create_editors.js");
var record_id = require("./../../lang/msg.js").record_id;

// "tabs" is a jqueryUI method
$("#tabs").tabs({
        heightStyle: "auto",
        activate: function(event, ui){
            editor.refresh();
            library.refresh();
            pre_code_editor.refresh();
            post_code_editor.refresh();
            description_editor.refresh();
            onload_editor.refresh();
        }
});

record_id("editor-tab", "Python Code");
record_id("library-tab", "LIBRARY");
record_id("pre-code-tab", "PRE");
record_id("post-code-tab", "POST");
record_id("description-tab", "DESCRIPTION");
record_id("onload-editor-tab", "ONLOAD");

$("#editor-panel").resizable({
    resize: function() {
        editor.setSize(null, $(this).height()-40);
        library.setSize(null, $(this).height()-40);
        pre_code_editor.setSize(null, $(this).height()-40);
        post_code_editor.setSize(null, $(this).height()-40);
        description_editor.setSize(null, $(this).height()-40);
        onload_editor.setSize(null, $(this).height()-40);
    }
}).draggable({cursor: "move", handle: "ul"});



$("#editor-tab").on("click", function (evt) {
    if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
        $("#highlight").show();
        $("#watch-variables-btn").show();
    } else {
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
});


$("#library-tab").on("click", function (evt) {
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
});

},{"./../../lang/msg.js":83,"./../create_editors.js":5}],24:[function(require,module,exports){
require("./../state.js");
require("./../../lang/reeborg_en.js");
require("./../../lang/reeborg_fr.js");
require("./../custom_world_select.js");
var msg = require("./../../lang/msg.js");
var update_url = require("./../utils/parseuri.js").update_url;


msg.record_id("human-language");

function update_translations(lang) {
    switch(lang) {
        case "en":
            RUR.translation = RUR.en;
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            break;
        case "fr":
            RUR.translation = RUR.fr;
            RUR.translation_to_english = RUR.fr_to_en;
            blockly_init_fr();
            break;
        case "ko":
            RUR.translation = RUR.ko;
            RUR.translation_to_english = RUR.ko_to_en;
            blockly_init_ko();
            break;
        default:
            RUR.translation = RUR.en;
            RUR.translation_to_english = RUR.en_to_en;
            blockly_init_en();
            break;
    }
}

function update_commands (lang) {
    switch(lang) {
        case "fr":
            RUR.reset_definitions = RUR.reset_definitions_fr;
            RUR.library_name = "biblio";
            RUR.from_import = "from reeborg_fr import *";
            break;
        case "en":
            RUR.reset_definitions = RUR.reset_definitions_en;
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            break;
        default:
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            RUR.reset_definitions = RUR.reset_definitions_en;
    }
    RUR.reset_definitions();
}

function update_home_url (lang) {
    switch(lang) {
        case "fr":
            $("#logo").prop("href", "index_fr.html");
            break;
        case "en":
            $("#logo").prop("href", "index_en.html");
            break;
        default:
            $("#logo").prop("href", "index_en.html");
    }
}

$("#human-language").change(function() {
    var lang = $(this).val();
    RUR.state.human_language = lang;
    update_translations(lang);
    msg.update_ui(lang);
    update_commands(lang);
    update_home_url(lang);
    RUR.make_default_menu(lang);
    // TODO update selectors text
    //TODO update blockly display
    $("#blocklyDiv").html(" ");
    RUR.blockly.init();

    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("human-language change: can not re/start repl", e);
        }
    }
    localStorage.setItem("human_language", lang);
    update_url();
});

},{"./../../lang/msg.js":83,"./../../lang/reeborg_en.js":84,"./../../lang/reeborg_fr.js":85,"./../custom_world_select.js":6,"./../state.js":52,"./../utils/parseuri.js":61}],25:[function(require,module,exports){

require("./../state.js");
require("./../storage.js");
var record_id = require("./../../lang/msg.js").record_id;
var clone_world = require("./../world/clone_world.js").clone_world;

var memorize_button = document.getElementById("memorize-world");
record_id("memorize-world", "Save world in browser");

memorize_world = function () {
    var existing_names, i, key, response;

    existing_names = '';
    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            if (!existing_names) {
                existing_names = "Existing names: " + key.substring(11);
            } else {
                existing_names += "," + key.substring(11);
            }
        }
    }

    if (existing_names) {
        $("#existing-world-names").html(existing_names);
    }
    dialog.dialog("open");
};
memorize_button.addEventListener("click", memorize_world, false);

dialog = $("#dialog-save-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            save_world();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});

dialog.find("form").on("submit", function( event ) {
    event.preventDefault();
    save_world();
});

save_world = function () {
    RUR.storage._save_world($("#world-name").val().trim());
    RUR._SAVED_WORLD = clone_world();
    dialog.dialog("close");
    $('#delete-world').show();
};

},{"./../../lang/msg.js":83,"./../state.js":52,"./../storage.js":53,"./../world/clone_world.js":66}],26:[function(require,module,exports){
/* Sets up what happens when the user clicks on various html elements.
*/

require("./../translator.js");
require("./../world.js");
require("./../state.js");
require("./../create_editors.js");

var export_world = require("./../world/export_world.js").export_world;
var record_id = require("./../../lang/msg.js").record_id;

function load_file (obj) {
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            obj.setValue(reader.result);
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
}


record_id("load-world", "LOAD WORLD");
record_id("load-world-text", "LOAD WORLD EXPLAIN");

$("#load-world").on("click", function(evt) {
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                RUR.world.import_world(reader.result);
            } catch (e) {  // jshint ignore:line
                console.log("invalid world", e);
                RUR.show_feedback("#Reeborg-shouts",
                                     RUR.translate("Invalid world file."));
            }
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
});

record_id("save-editor", "SAVE EDITOR");
record_id("save-editor-text", "SAVE EDITOR EXPLAIN");
$("#save-editor").on("click", function (evt) {
    var blob = new Blob([editor.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-library", "SAVE LIBRARY");
record_id("save-library-text", "SAVE LIBRARY EXPLAIN");
$("#save-library").on("click", function (evt) {
    var blob = new Blob([library.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-world", "SAVE WORLD");
record_id("save-world-text", "SAVE WORLD EXPLAIN");
$("#save-world").on("click", function (evt) {
    RUR.CURRENT_WORLD = RUR.world.update_from_editors(RUR.CURRENT_WORLD);
    var blob = new Blob([export_world()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename.json", true); // saveAs defined in src/libraries/filesaver.js
});

record_id("load-editor", "LOAD EDITOR");
record_id("load-editor-text", "LOAD EDITOR EXPLAIN");
$("#load-editor").on("click", function (evt) {
    load_file(editor);
});

record_id("load-library", "LOAD LIBRARY");
record_id("load-library-text", "LOAD LIBRARY EXPLAIN");
$("#load-library").on("click", function (evt) {
    load_file(library);
});

record_id("add-editor-text", "ADD EDITOR TEXT");
$("#add-editor-to-world").on("click", function(evt) {
    if ($(this).prop("checked")) {
        RUR.CURRENT_WORLD.editor = editor.getValue();
    } else {
        RUR.CURRENT_WORLD.editor = null;
    }
});

record_id("add-library-text", "ADD LIBRARY TEXT");
$("#add-library-to-world").on("click", function(evt) {
    if ($(this).prop("checked")) {
        RUR.CURRENT_WORLD.library = library.getValue();
    } else {
        RUR.CURRENT_WORLD.library = null;
    }
});

},{"./../../lang/msg.js":83,"./../create_editors.js":5,"./../state.js":52,"./../translator.js":54,"./../world.js":65,"./../world/export_world.js":68}],27:[function(require,module,exports){
require("./../state.js");
;
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var pause_button = document.getElementById("step");
record_id("pause");

RUR.pause = function (ms) {
    RUR.state.playback = false;
    clearTimeout(RUR._TIMER);
    $("#pause").attr("disabled", "true");
    if (ms !== undefined){      // pause called via a program instruction
        RUR._TIMER = setTimeout(RUR.play, ms);  // will reset RUR.state.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reverse-step").removeAttr("disabled");
    }
};
pause_button.addEventListener("click", pause, false);

},{"./../../lang/msg.js":83,"./../playback/play.js":40,"./../state.js":52}],28:[function(require,module,exports){
require("./../state.js");
require("./../listeners/reload.js");
require("./../keyboard.js");
require("./../create_editors.js");
var record_id = require("./../../lang/msg.js").record_id;
var update_url = require("./../utils/parseuri.js").update_url;

record_id("programming-mode");

$("#programming-mode").change(function() {
    "use strict";
    var choice = $(this).val();
    RUR.state.input_method = choice;
    localStorage.setItem("programming-mode", choice);
    hide_everything();

    switch(choice) {
        case "python":
            RUR.state.programming_language = "python";
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            break;
        case "javascript":
            RUR.state.programming_language = "javascript";
            show_editor("javascript");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            break;
        case "blockly-py":
            RUR.state.programming_language = "python";
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "blockly-js":
            RUR.state.programming_language = "javascript";
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "py-repl":
            RUR.state.programming_language = "python";
            show_console();
            break;
        default:
            RUR.state.programming_language = "python";
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
        console.log("Problem? Default value used in programming-mode select.");
    }

    RUR.kbd.set_programming_language(RUR.state.programming_language);
    update_url();
});


record_id("editor-visible-blockly");
$('#editor-visible-blockly').change(function() {
    if ($('#editor-visible-blockly')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    } else {
        hide_editors();
    }
});


function hide_everything () {
    /* By default, we start with a situation where everything is hidden
       and only show later the relevant choices for a given option */
    hide_blockly();
    hide_editors();
    hide_console();
    if ($("#special-keyboard-button").hasClass("reverse-blue-gradient")) {
        $("#special-keyboard-button").click();
    }
    $("#special-keyboard-button").hide();
    // Python specific
    $("#add-library-choice").hide();//
    document.getElementById("add-library-to-world").checked = false;
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
    $("#Reeborg-watches").dialog("close");
}

function show_blockly () {
    $("#blockly-wrapper").show();
    $("#visible-blockly").show();
    $("#editor-visible-blockly").show();
    if ($('#editor-visible-blockly')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    }
    window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
}

function hide_blockly () {
    $("#blockly-wrapper").hide();
    window.dispatchEvent(new Event('resize'));
    $("#visible-blockly").hide();
    $("#editor-visible-blockly").hide();
    $("#special-keyboard-button").show();
}

function show_editor(lang) {
    if (lang == "python") {
        show_python_editor();
    } else {
        show_javascript_editor();
    }
    $("#editor-panel").addClass("active");
    $("#editor-tab").click();
    $("#special-keyboard-button").show();
    RUR.reload();
    editor.refresh();
    if (RUR.state.editing_world) {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
    }
}

function show_javascript_editor () {
    $("#editor-tab").html(RUR.translate("Javascript Code"));
    editor.setOption("mode", "javascript");
    pre_code_editor.setOption("mode", "javascript");
    post_code_editor.setOption("mode", "javascript");
}

function show_python_editor () {
    $("#editor-tab").html(RUR.translate("Python Code"));
    editor.setOption("mode", {name: "python", version: 3});
    pre_code_editor.setOption("mode", {name: "python", version: 3});
    post_code_editor.setOption("mode", {name: "python", version: 3});

    RUR.state.highlight = RUR.state.highlight || RUR.state._saved_highlight_value;
    $("#library-tab").parent().show();
    $("#add-library-choice").show();
    $("#highlight").show();
    $("#watch-variables-btn").show();
    $("#python-additional-menu p button").removeAttr("disabled");
}


function hide_editors() {
    if (RUR.state.programming_language == "python") {
        RUR.state._saved_highlight_value = RUR.state.highlight;
        RUR.state.highlight = false;
    }
    $("#editor-panel").removeClass("active");
    // extra editors
    $("#pre-code-tab").parent().hide();
    $("#post-code-tab").parent().hide();
    $("#description-tab").parent().hide();
    $("#onload-editor-tab").parent().hide();
}

function show_console() {
    $("#special-keyboard-button").show();
    $("#py-console").show();
    $("#stop").hide();
    $("#pause").hide();
    $("#run").hide();
    $("#step").hide();
    $("#reverse-step").hide();
    $("#reload").hide();
    $("#reload2").show();
    $("#reload2").removeAttr("disabled");
    _start_repl();
}

function _start_repl() {
    try {
        restart_repl();
    } catch (e) {
        console.log("_start_repl: failure", e);
        window.setTimeout(_start_repl, 500);
    }
}

function hide_console() {
    $("#py-console").hide();
    $("#stop").show();
    $("#pause").show();
    $("#run").show();
    $("#step").show();
    $("#reverse-step").show();
    $("#reload").show();
    $("#reload2").hide();
}

/* Ensure that CodeMirror editors are set up properly
   even if not to be used initially
*/
show_editor("python");
// see start_session.js for initialization.

},{"./../../lang/msg.js":83,"./../create_editors.js":5,"./../keyboard.js":19,"./../listeners/reload.js":29,"./../state.js":52,"./../utils/parseuri.js":61}],29:[function(require,module,exports){

require("./../utils/key_exist.js");
require("./../state.js");
var set_ready_to_run = require("./../ui/set_ready_to_run.js").set_ready_to_run;
var rec_reset = require("./../recorder/reset.js").reset;
var reset_world = require("./../world_set/reset_world.js").reset_world;
var record_id = require("./../../lang/msg.js").record_id;

var reload_button = document.getElementById("reload");
record_id("reload");
var reload2_button = document.getElementById("reload2");
record_id("reload2");

RUR.reload = function() {
    set_ready_to_run();
    RUR.reload2();
    $("#highlight-impossible").hide();
    RUR.state.code_evaluated = false;
    RUR.state.sound_on = false;
};

RUR.reload2 = function() {
    $("#stdout").html("");
    $(".view_source").remove();
    $("#print-html").html("");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    $("#watch-variables").html("");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot-canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot-canvas")}});
    reset_world();
    rec_reset();
    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("RUR.reload2: can not re/start repl", e);
        }
    }
};

reload_button.addEventListener("click", RUR.reload, false);
reload2_button.addEventListener("click", RUR.reload2, false);

},{"./../../lang/msg.js":83,"./../recorder/reset.js":46,"./../state.js":52,"./../ui/set_ready_to_run.js":56,"./../utils/key_exist.js":60,"./../world_set/reset_world.js":79}],30:[function(require,module,exports){
require("./../visible_robot.js");
;
require("./../state.js");
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


RUR.vis_robot.new_robot_images = function (images) {
    var model;
    if (images.model !== undefined) {
        switch (images.model) {
            case 0:
            case 1:
            case 2:
            case 3:
                model = images.model;
                break;
            default:
                model = 0;
        }
    } else {
        model = 0;
    }

    if (images.east !== undefined) {
        RUR.vis_robot.images[model].robot_e_img.src = images.east;
    }
    if (images.west !== undefined) {
        RUR.vis_robot.images[model].robot_w_img.src = images.west;
    }
    if (images.north !== undefined) {
        RUR.vis_robot.images[model].robot_n_img.src = images.north;
    }
    if (images.south !== undefined) {
        RUR.vis_robot.images[model].robot_s_img.src = images.south;
    }
    if (images.random !== undefined) {
        RUR.vis_robot.images[model].robot_random_img.src = images.random;
    }

    // change the image displayed in the html file.
    switch (model) {
        case 0:
            $("#robot0 img").attr("src", images.east);
            break;
        case 1:
            $("#robot1 img").attr("src", images.east);
            break;
        case 2:
            $("#robot2 img").attr("src", images.east);
            break;
        case 3:
            $("#robot3 img").attr("src", images.east);
            break;
    }

    RUR.select_default_robot_model(model);
};

},{"./../../lang/msg.js":83,"./../state.js":52,"./../visible_robot.js":63}],31:[function(require,module,exports){
;
require("./../state.js");
require("./reload.js");
require("./../runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var run_button = document.getElementById("run");
record_id("run");

function run () {
    if (RUR.state.stop_called){
        RUR.state.stop_called = false;
        RUR.reload();
    }
    $("#stop").removeAttr("disabled");
    $("#pause").removeAttr("disabled");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");

    clearTimeout(RUR._TIMER);
    RUR.runner.run(RUR.play);
}
run_button.addEventListener("click", run, false);

},{"./../../lang/msg.js":83,"./../playback/play.js":40,"./../runner.js":48,"./../state.js":52,"./reload.js":29}],32:[function(require,module,exports){
require("./../file_io.js");
require("./../storage.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("select-world");

$("#select-world").change(function() {
    if (RUR.state.creating_menu){
        return;
    }
    if ($(this).val() !== null) {
        RUR.file_io.load_world_file($(this).val());
    }
    try {
        localStorage.setItem("world", $(this).find(':selected').text());
    } catch (e) {}
});

},{"./../../lang/msg.js":83,"./../file_io.js":17,"./../storage.js":53}],33:[function(require,module,exports){

require("./../state.js");
require("./reload.js");
require("./../runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var step_button = document.getElementById("step");
record_id("step");

step = function () {
    RUR.runner.run(RUR.rec.display_frame);
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};
step_button.addEventListener("click", step, false);

},{"./../../lang/msg.js":83,"./../playback/play.js":40,"./../runner.js":48,"./../state.js":52,"./reload.js":29}],34:[function(require,module,exports){

require("./../state.js");
var record_id = require("./../../lang/msg.js").record_id;

var stop_button = document.getElementById("stop");
record_id("stop");

RUR.stop = function () {
    clearTimeout(RUR._TIMER);
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").removeAttr("disabled");
    RUR.state.stop_called = true;
};
stop_button.addEventListener("click", RUR.stop, false);

},{"./../../lang/msg.js":83,"./../state.js":52}],35:[function(require,module,exports){
;
require("./../state.js");
var record_id = require("./../../lang/msg.js").record_id;

var highlight_button = document.getElementById("highlight");
record_id("highlight");

RUR.toggle_highlight = function () {  // keep part of RUR for Python
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("reverse-blue-gradient");
    } else {
        RUR.state.highlight = true;
        $("#highlight").addClass("reverse-blue-gradient");
        $("#highlight").removeClass("blue-gradient");
    }
};
highlight_button.addEventListener("click", RUR.toggle_highlight, false);

},{"./../../lang/msg.js":83,"./../state.js":52}],36:[function(require,module,exports){
;
require("./../state.js");
var record_id = require("./../../lang/msg.js").record_id;

var watch_button = document.getElementById("watch-variables-btn");
record_id("watch-variables-btn");

toggle_watch_variables = function () {
    if (RUR.state.watch_vars) {
        RUR.state.watch_vars = false;
        $("#watch-variables-btn").addClass("blue-gradient");
        $("#watch-variables-btn").removeClass("reverse-blue-gradient");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("close");
    } else {
        RUR.state.watch_vars = true;
        $("#watch-variables-btn").addClass("reverse-blue-gradient");
        $("#watch-variables-btn").removeClass("blue-gradient");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("open");
    }
};
watch_button.addEventListener("click", toggle_watch_variables, false);

},{"./../../lang/msg.js":83,"./../state.js":52}],37:[function(require,module,exports){
require("./rur.js");
require("./extend/add_object_type.js");
require("./extend/add_tile_type.js");
require("./extend/new_home_tile.js");

_add_new_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR._BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.add_new_object_type(name, url, url_goal);
};

_add_new_object_type("token");
_add_new_object_type("star");
_add_new_object_type("triangle");
_add_new_object_type("square");
_add_new_object_type("strawberry");
_add_new_object_type("banana");
_add_new_object_type("apple");
_add_new_object_type("leaf");
_add_new_object_type("carrot");
_add_new_object_type("dandelion");
_add_new_object_type("orange");
_add_new_object_type("daisy");
_add_new_object_type("tulip");

_add_new_object_type("box");
RUR.OBJECTS.box.name = "box";
RUR.OBJECTS.box.pushable = true;
RUR.OBJECTS.box.in_water = "bridge";
RUR.OBJECTS.box.ctx = RUR.ROBOT_CTX;


RUR._add_new_tile_type = function (name, url) {
    var tiles = RUR.TILES;
    tiles[name] = {};
    tiles[name].name = name;
    tiles[name].image = new Image();
    if (url===undefined) {
        tiles[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    } else {
        tiles[name].image.src = url;
    }
    tiles[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR.KNOWN_TILES.push(name);
    RUR._NB_IMAGES_TO_LOAD += 1;
};


tile = {name: "mud",
    url: RUR._BASE_URL + '/src/images/mud.png',
    message: "I'm stuck in mud.",
    fatal: true,
    info: "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."
};
RUR.add_new_tile_type(tile);

tile = {name: "ice",
    url: RUR._BASE_URL + '/src/images/ice.png',
    message: "I'm slipping on ice!",
    slippery: true,
    info: "Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."
};
RUR.add_new_tile_type(tile);

tile = {name: "grass",
    url: RUR._BASE_URL + '/src/images/grass.png',
    info: "Grass: usually safe."
};
RUR.add_new_tile_type(tile);

tile = {name: "pale_grass",
    url: RUR._BASE_URL + '/src/images/pale_grass.png',
    info: "Grass: usually safe.",
    public_name: "grass"
};
RUR.add_new_tile_type(tile);


tile = {name: "gravel",
    url: RUR._BASE_URL + '/src/images/gravel.png',
    info: "Gravel: usually safe."
};
RUR.add_new_tile_type(tile);

tile = {
    name:"water",
    images: [RUR._BASE_URL + '/src/images/water.png',
        RUR._BASE_URL + '/src/images/water2.png',
        RUR._BASE_URL + '/src/images/water3.png',
        RUR._BASE_URL + '/src/images/water4.png',
        RUR._BASE_URL + '/src/images/water5.png',
        RUR._BASE_URL + '/src/images/water6.png'],
    info: "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.",
    fatal: true,
    detectable: true,
    message: "I'm in water!"
};

RUR.add_new_tile_type(tile);

RUR._add_new_tile_type("bricks");
RUR.TILES.bricks.name = "brick wall"; // replace
RUR.TILES.bricks.fatal = true;
RUR.TILES.bricks.solid = true;
RUR.TILES.bricks.detectable = true;
RUR.TILES.bricks.message = "Crash!";
RUR.TILES.bricks.info = "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.";

_add_new_home_tile = function (name, info) {
    info = info + "Reeborg <b>can</b> detect this tile using at_goal().";
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_home_tile(name, url, info);
};

_add_new_home_tile("green_home_tile", "green home tile:");
_add_new_home_tile("house", "house:");
_add_new_home_tile("racing_flag", "racing flag:");


RUR.SOLID_OBJECTS = {};
RUR.add_new_solid_object_type = function (name, url, nickname) {
    var obj = RUR.SOLID_OBJECTS;
    obj[name] = {};
    if (nickname === undefined) {
        obj[name].name = name;
    } else {
        obj[name].name = nickname;
        obj[name].fatal = true;
        obj[name].solid = true;
        obj[name].detectable = true;
    }
    obj[name].ctx = RUR.SECOND_LAYER_CTX;
    obj[name].image = new Image();
    if (!url) {
        obj[name].image.src = RUR._BASE_URL + '/src/images/' + name + '.png';
    } else {
        obj[name].image.src = url;
    }
    obj[name].image.onload = RUR.INCREMENT_LOADED_FN;
    RUR._NB_IMAGES_TO_LOAD += 1;
};

RUR.add_new_solid_object_type("bridge");
RUR.SOLID_OBJECTS.bridge.info = "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

RUR.add_new_solid_object_type("fence_right", false, "fence");
RUR.SOLID_OBJECTS.fence_right.message = "I hit a fence!";
RUR.SOLID_OBJECTS.fence_right.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
RUR.SOLID_OBJECTS.fence4 = RUR.SOLID_OBJECTS.fence_right;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_left", false, "fence");
RUR.SOLID_OBJECTS.fence_left.message = RUR.SOLID_OBJECTS.fence_right.message;
RUR.SOLID_OBJECTS.fence_left.info = RUR.SOLID_OBJECTS.fence_right.info;
RUR.SOLID_OBJECTS.fence5 = RUR.SOLID_OBJECTS.fence_left;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_double", false, "fence");
RUR.SOLID_OBJECTS.fence_double.message = RUR.SOLID_OBJECTS.fence_right.message;
RUR.SOLID_OBJECTS.fence_double.info = RUR.SOLID_OBJECTS.fence_right.info;
RUR.SOLID_OBJECTS.fence6 = RUR.SOLID_OBJECTS.fence_double;  // compatibility with old worlds

RUR.add_new_solid_object_type("fence_vertical", false, "fence");
RUR.SOLID_OBJECTS.fence_vertical.message = RUR.SOLID_OBJECTS.fence_right.message;
RUR.SOLID_OBJECTS.fence_vertical.info = RUR.SOLID_OBJECTS.fence_right.info;
RUR.SOLID_OBJECTS.fence7 = RUR.SOLID_OBJECTS.fence_vertical;  // compatibility with old worlds

},{"./extend/add_object_type.js":14,"./extend/add_tile_type.js":15,"./extend/new_home_tile.js":16,"./rur.js":49}],38:[function(require,module,exports){


require("./recorder.js");
require("./state.js");

RUR.output = {};

RUR.output.write = function () {
    var output_string = '';
    RUR.state.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output._write = function () {
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    RUR.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.clear_print = function () {
    RUR.record_frame("stdout", {"element": "#stdout", "clear": true});
};

RUR.output.print_html = function (arg, append) {
    if (append) {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg, "append": true});
    } else {
        RUR.record_frame("print_html", {"element": "#print-html", "message": arg});
    }
};

RUR.output.watch_variables = function (arg) {
    RUR.record_frame("watch_variables", {"element": "#watch-variables", "message": arg});
};


RUR.output.view_source_js = function(fn) {
    $("#Reeborg-explores").dialog("open");
    RUR.show_feedback("#Reeborg-explores", "<pre class='view_source'>" + fn + "</pre>" );
    $('.view_source').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode: 'javascript',
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
};

},{"./recorder.js":44,"./state.js":52}],39:[function(require,module,exports){

require("./state.js");
require("./storage.js");
require("./world.js");
require("./translator.js");
require("./listeners/programming_mode.js");
require("./utils/parseuri.js");
require("./create_editors.js");

var export_world = require("./world/export_world.js").export_world;
var record_id = require("./../lang/msg.js").record_id;

record_id("save-permalink", "Save");
record_id("save-permalink-text", "Save permalink explanation");
$("#save-permalink").on("click", function (evt) {
    var blob = new Blob([RUR.permalink.__create()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

/* IMPORTANT: we attempt to maintain compatibility with the old permalinks
   format below.
 */

RUR.permalink = {};

RUR.permalink.__create = function () {
    "use strict";
    var proglang, world, _editor, _library, url_query, permalink;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    proglang = RUR.state.programming_language + "-" + RUR.state.human_language;
    world = encodeURIComponent(export_world());
    _editor = encodeURIComponent(editor.getValue());
    if (RUR.state.programming_language == "python") {
        _library = encodeURIComponent(library.getValue());
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    } else {
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor;
    }
    return permalink;
};


record_id("permalink", "PERMALINK");
$("#permalink").on("click", function (evt) {
    RUR.permalink.create();
});
RUR.permalink.create = function () {
    var permalink = RUR.permalink.__create();

    $("#url-input-textarea").val(permalink);
    $("#url-input").toggle();
    return false;
};

RUR.permalink.set_mode = function (url_query) {
    "use strict";
    var mode;
    if (url_query.queryKey.mode !== undefined) {
        mode = url_query.queryKey.mode;
    } else if (url_query.queryKey.proglang !== undefined) {  // old permalinks
        if (url_query.queryKey.proglang.startsWith("python")) {
            mode = "python";
        } else {
            mode = "javascript";
        }
    } else if (localStorage.getItem("programming-mode")) {
        mode = localStorage.getItem("programming-mode");
    } else {
        mode = 'python';
    }

    document.getElementById('programming-mode').value = mode;
    $("#programming-mode").change();
    return mode;
};

RUR.permalink.set_language = function (url_query) {
    "use strict";
    var lang;
    if (url_query.queryKey.lang !== undefined) {
        lang = url_query.queryKey.lang;
    } else if (url_query.queryKey.proglang !== undefined) {  // old permalinks
        if (url_query.queryKey.proglang.endsWith("fr")) {
            lang = "fr";
        } else {
            lang = 'en';
        }
    } else if (localStorage.getItem("human_language")) {
        lang = localStorage.getItem("human_language");
    } else {
        lang = 'en';
    }
    document.getElementById('human-language').value = lang;
    $("#human-language").change();
};


RUR.permalink.update = function (arg, shortname) {
    "use strict";
    var url_query, mode, name, tmp;

	if (RUR.permalink_update_previous_arg === undefined) {
		RUR.permalink_update_previous_arg = arg;
	} else if (RUR.permalink_update_previous_arg === arg) {
		return;
	} else {
		RUR.permalink_update_previous_arg = arg;
	}

    if (arg !== undefined) {
        url_query = parseUri(arg);
    } else {
        url_query = parseUri($("#url-input-textarea").val());
    }

    RUR.permalink.set_language(url_query);
    RUR.permalink.set_mode(url_query);

    if ( url_query.queryKey.editor !== undefined) { // old permalink
        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
    }
    if (RUR.state.programming_language == "python" &&
       url_query.queryKey.library !== undefined) {  // old permalink
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    }
    /* The world can contain some content for the editor and the library which
       would potentially replace what's defined in the permalink.
     */
    if (url_query.queryKey.world !== undefined) {
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        if (shortname !== undefined) {
            RUR.storage.save_world(shortname);
        } else {
            RUR.storage.save_world(RUR.translate("PERMALINK"));
        }
    }

    $("#url-input").hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
};

record_id("replace-permalink", "REPLACE PERMALINK");
record_id("replace-permalink-text", "REPLACE PERMALINK EXPLAIN");
$("#replace-permalink").on("click", function (evt) {
    RUR.permalink.update();
});

record_id("cancel-permalink", "CANCEL");
$("#cancel-permalink").on("click", function (evt) {
    $('#url-input').hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
});

// copy to clipboard
record_id("copy-permalink", "COPY");
record_id("copy-permalink-text", "COPY PERMALINK EXPLAIN");
$("#copy-permalink").on("click", function (evt) {
    document.querySelector('#url-input-textarea').select();
    document.execCommand('copy');
});

// for embedding in iframe
addEventListener("message", receiveMessage, false);
function receiveMessage(event){
    RUR.permalink.update(event.data);
}

},{"./../lang/msg.js":83,"./create_editors.js":5,"./listeners/programming_mode.js":28,"./state.js":52,"./storage.js":53,"./translator.js":54,"./utils/parseuri.js":61,"./world.js":65,"./world/export_world.js":68}],40:[function(require,module,exports){
require("./../state.js");
require("./../listeners/stop.js");

RUR.play = function () {
    "use strict";
    if (RUR.state.playback){            // RUR.visible_world.running
        RUR.state.playback = false;
        return;
    }
    RUR.state.playback = true;
    loop();
};

function loop () {
    "use strict";
    var frame_info;

    if (!RUR.state.playback){
        return;
    }
    frame_info = RUR.rec.display_frame();

    if (frame_info === "pause") {
        return;
    } else if (frame_info === "stopped") {
        RUR.stop();
        return;
    }
    RUR._TIMER = setTimeout(loop, RUR.playback_delay);
}

},{"./../listeners/stop.js":34,"./../state.js":52}],41:[function(require,module,exports){

RUR._play_sound = function (sound_id) {
    "use strict";
    var current_sound;
    current_sound = $(sound_id)[0];
    current_sound.load();
    current_sound.play();
};

},{}],42:[function(require,module,exports){
;
require("./../state.js");
require("./../recorder.js");


RUR.reverse_step = function () {
    RUR.current_frame_no -= 2;
    if (RUR.current_frame_no < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    RUR.rec.display_frame();
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};

},{"./../recorder.js":44,"./../state.js":52}],43:[function(require,module,exports){

require("./../visible_world.js");
require("./../exceptions.js");
/* if the REPL is active, we do not record anything, and show immediately
   the updated world */

RUR._show_immediate = function (name, obj) {
    RUR.vis_world.refresh();
    // TODO: confirm that watching variables work.
    if (name !== undefined && name == "print_html") {
        if (obj.append){
            $(obj.element).append(obj.message);
        } else {
            $(obj.element).html(obj.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }
};

},{"./../exceptions.js":13,"./../visible_world.js":64}],44:[function(require,module,exports){

require("./state.js");
require("./visible_world.js");
require("./world_get.js");
require("./constants.js");
require("./translator.js");
require("./exceptions.js");
require("./listeners/pause.js");
require("./listeners/stop.js");
require("./playback/play_sound.js");
require("./create_editors.js");

var identical = require("./utils/identical.js").identical;
var clone_world = require("./world/clone_world.js").clone_world;

RUR.rec = {};

RUR.set_lineno_highlight = function(lineno, frame) {
    RUR.current_line_no = lineno;
    if (frame) {
        RUR.record_frame();
        return true;
    }
};

RUR.rec.display_frame = function () {
    // set current world to frame being played.
    "use strict";
    var frame, goal_status, i, next_frame_line_numbers;

    if (RUR.current_frame_no >= RUR.nb_frames) {
        return RUR.rec.conclude();
    }

    //track line number and highlight line to be executed
    if (RUR.state.programming_language === "python" && RUR.state.highlight) {
        try {
            for (i = 0; i < RUR.rec_previous_lines.length; i++){
                editor.removeLineClass(RUR.rec_previous_lines[i], 'background', 'editor-highlight');
            }
        }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        if (RUR.rec_line_numbers [RUR.current_frame_no+1] !== undefined){
            next_frame_line_numbers = RUR.rec_line_numbers [RUR.current_frame_no+1];
            for(i = 0; i < next_frame_line_numbers.length; i++){
                editor.addLineClass(next_frame_line_numbers[i], 'background', 'editor-highlight');
            }
            i = next_frame_line_numbers.length - 1;
            if (RUR._max_lineno_highlighted < next_frame_line_numbers[i]) {
                RUR._max_lineno_highlighted = next_frame_line_numbers[i];
            }
            RUR.rec_previous_lines = RUR.rec_line_numbers [RUR.current_frame_no+1];
        } else {
            try {  // try adding back to capture last line of program
                for (i=0; i < RUR.rec_previous_lines.length; i++){
                    editor.addLineClass(RUR.rec_previous_lines[i], 'background', 'editor-highlight');
                }
            }catch (e) {console.log("diagnostic: error was raised while trying to addLineClass", e);}
        }
    }

    frame = RUR.frames[RUR.current_frame_no];
    RUR.current_frame_no++;

    if (frame === undefined){
        //RUR.CURRENT_WORLD = RUR._SAVED_WORLD;  // useful when ...
        RUR.vis_world.refresh();                    // ... reversing step
        return;
    }

    if (RUR.__debug && frame.debug) {
        console.log("debug: ", frame.debug);
    }

    // many of these are exlusive of others ... but to give more flexibility
    // in adding options (and prevent bugs!!), we do not use an
    // if/else if/... structure, but rather a series of if clauses.


    if (frame.delay !== undefined){
        RUR.playback_delay = frame.delay;
    }

    if (frame.pause) {
        RUR.pause(frame.pause.pause_time);
        return "pause";
    }

    if (frame.error !== undefined) {
        return RUR.rec.handle_error(frame);
    }

    if (frame.stdout !== undefined) {
        if (frame.stdout.clear) { // for clearprint
            $(frame.stdout.element).html('');
        } else {
            $(frame.stdout.element).append(frame.stdout.message);
        }
        $("#Reeborg-writes").dialog("open");
    }

    if (frame.print_html !== undefined) {
        if (frame.print_html.append){
            $(frame.print_html.element).append(frame.print_html.message);
        } else {
            $(frame.print_html.element).html(frame.print_html.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }

    if (frame.watch_variables !== undefined) {
        $(frame.watch_variables.element).html(frame.watch_variables.message);
        $("#Reeborg-watches").dialog("open");
    }

    RUR.CURRENT_WORLD = frame.world;
    if (frame.sound_id !== undefined){
        RUR._play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
    var frame, goal_status;

    if (RUR.nb_frames > 0) {
        frame = RUR.frames[RUR.nb_frames-1];
    }
    if (frame === undefined) {
        frame = {};
        frame.world = clone_world();
    }
    if (frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#error-sound");
            }
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#success-sound");
        }
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    if (frame.error.reeborg_shouts === RUR.translate("Done!")){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes",
                RUR.translate("<p class='center'>Instruction <code>done()</code> executed.</p>"));
        }
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#error-sound");
        }
        RUR.show_feedback("#Reeborg-shouts", frame.error.message);
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.check_current_world_status = function() {
    // this function is to check goals from the Python console.
    frame = {};
    frame.world = RUR.CURRENT_WORLD;
    if (frame.world.goal === undefined){
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    } else {
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    }
};

RUR.rec.check_goal = function (frame) {
    var g, world, goal_status = {}, result;
    g = frame.world.goal;
    world = frame.world;
    goal_status.message = "<ul>";
    goal_status.success = true;
    if (g.position !== undefined){
        if (g.position.x === world.robots[0].x){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct x position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong x position.</li>");
            goal_status.success = false;
        }
        if (g.position.y === world.robots[0].y){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct y position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong y position.</li>");
            goal_status.success = false;
        }
    }
    if (g.objects !== undefined) {
        result = identical(g.objects, world.objects, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All objects are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more objects are not at the correct location.</li>");
            goal_status.success = false;
        }
    }
    if (g.walls !== undefined) {
        result = true;
        loop:
        for(var w in g.walls){
            for(var i=0; i < g.walls[w].length; i++){
                if ( !(world.walls !== undefined &&
                       world.walls[w] !== undefined &&
                       world.walls[w].indexOf(g.walls[w][i]) !== -1)){
                    result = false;
                    break loop;
                }
            }
        }
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All walls have been built correctly.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more walls missing or built at wrong location.</li>");
            goal_status.success = false;
        }
    }
    goal_status.message += "</u>";
    return goal_status;
};

// A sneaky programmer could teleport a robot on a forbidden tile
// to perform an action; we catch any such potential problem here
RUR.rec.check_robots_on_tiles = function(frame){
    var tile, robots, robot, coords;
    if (frame.world.robots === undefined){
        return;
    }
    for (robot=0; robot < frame.world.robots.length; robot++){
        tile = RUR.world_get.tile_at_position(frame.world.robots[robot]);
        if (tile) {
            if (tile.fatal){
                throw new RUR.ReeborgError(RUR.translate(tile.message));
            }
        }
    }
};

},{"./constants.js":3,"./create_editors.js":5,"./exceptions.js":13,"./listeners/pause.js":27,"./listeners/stop.js":34,"./playback/play_sound.js":41,"./state.js":52,"./translator.js":54,"./utils/identical.js":59,"./visible_world.js":64,"./world/clone_world.js":66,"./world_get.js":71}],45:[function(require,module,exports){

require("./../state.js");
require("./../exceptions.js");
require("./../playback/show_immediate.js");
require("./../utils/supplant.js");
var clone_world = require("./../world/clone_world.js").clone_world;

RUR.record_frame = function (name, obj) {
    "use strict";
    var frame = {};

    if (RUR.state.do_not_record) {
        return;
    }
    if (RUR.state.prevent_playback){  // TODO see if this can be replaced by do_not_record
        return;
    }

    /* if the REPL is active, we do not record anything, and show immediately
       the updated world */
    if (RUR.state.input_method==="py-repl") {
        return RUR._show_immediate(name, obj);
    }

    // // Used mainly to add watch variables to previous frame
    // if (name !== undefined && name == "output" &&
    //     obj.element == "#print-html" && obj.append == undefined &&
    //     RUR.nb_frames > 1) {
    //     RUR.frames[RUR.nb_frames-1]["output"] = obj;
    //     return;
    // }


    frame.world = clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }

    frame.delay = RUR.playback_delay;
    if (RUR.state.sound_id && RUR.state.sound_on && frame.delay >= RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.state.sound_id;
    }

   if (RUR.state.programming_language === "python" && RUR.state.highlight) {
       if (RUR.current_line_no !== undefined) {
           RUR.rec_line_numbers [RUR.nb_frames] = RUR.current_line_no;
       } else{
           RUR.rec_line_numbers [RUR.nb_frames] = [0];
       }
   }

    RUR.previous_lineno = RUR.current_line_no;

    RUR.frames[RUR.nb_frames] = frame;
    RUR.nb_frames++;

    RUR.state.sound_id = undefined;
    if (name === "error"){
        return;
    }

    // catch any robot that teleported itself to a forbidden tile
    // to try to do a sneaky action
    RUR.rec.check_robots_on_tiles(frame);

    if (RUR.nb_frames > RUR.MAX_STEPS + RUR.nb_extra_highlighting_frames) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};

},{"./../exceptions.js":13,"./../playback/show_immediate.js":43,"./../state.js":52,"./../utils/supplant.js":62,"./../world/clone_world.js":66}],46:[function(require,module,exports){
require("./../state.js");
require("./../create_editors.js");

exports.reset = reset = function() {
    RUR.nb_frames = 0;
    RUR.current_frame_no = 0;
    RUR.nb_extra_highlighting_frames = 0;  // TODO: see if we can eliminate this
    // by inserting highlighting info in previous frame instead of separate frames.
    RUR.current_line_no = undefined;
    RUR.frames = [];
    RUR.rec_line_numbers = [];
    RUR.state.playback = false;
    RUR.playback_delay = 300;
    RUR.state.do_not_record = false;
    RUR.watched_expressions = [];
    clearTimeout(RUR._TIMER);
    if (RUR.state.programming_language === "python" &&
        RUR.state.highlight &&
        RUR._max_lineno_highlighted !== undefined) {
        for (var i=0; i <= RUR._max_lineno_highlighted; i++){
            try {
                editor.removeLineClass(i, 'background', 'editor-highlight');
            }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        }
    }
    RUR.rec_previous_lines = [];
    RUR._max_lineno_highlighted = 0;
};

reset();

},{"./../create_editors.js":5,"./../state.js":52}],47:[function(require,module,exports){

require("./constants.js");
require("./translator.js");
require("./exceptions.js");
var filterInt = require("./utils/filterint.js").filterInt;

RUR.robot = {};

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.objects = {};
    if (tokens !== undefined){
        tokens = filterInt(tokens);
        if (tokens > 0) {
            robot.objects.token = tokens;
        }
    }

    if (orientation === undefined){
        robot._orientation = RUR.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case RUR.translation.east:  /*TODO: see if we can get rid of this
                                            and have incoming in English */
            robot._orientation = RUR.EAST;
            break;
        case "n":
        case RUR.translation.north:
            robot._orientation = RUR.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            robot._orientation = RUR.WEST;
            break;
        case "s":
        case RUR.translation.south:
            robot._orientation = RUR.SOUTH;
            break;
        default:
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
        }
    }

    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot._orientation;

    return robot;
};

RUR.robot.cleanup_objects = function (robot) {
    "use strict";
    var obj_name, objects_carried = {};
    for (obj_name in robot.objects) {
        if (robot.objects.hasOwnProperty(obj_name)){
             if (robot.objects[obj_name] == "infinite") {
                objects_carried[obj_name] = Infinity;
            } else if (robot.objects[obj_name] > 0){
                objects_carried[obj_name] = robot.objects[obj_name];
            }
        }
    }
    robot.objects = objects_carried;
    // handling legacy notation
    if (robot.orientation !== undefined){
        robot._orientation = robot.orientation;
        delete robot.orientation;
    }
};

},{"./constants.js":3,"./exceptions.js":13,"./translator.js":54,"./utils/filterint.js":58}],48:[function(require,module,exports){

require("./rur.js");
require("./translator.js");
require("./visible_world.js");
require("./world.js");
require("./state.js");
require("./blockly.js");
require("./recorder.js");
require("./world_init.js");
require("./create_editors.js");
require("./utils/supplant.js");
var clone_world = require("./world/clone_world.js").clone_world;

RUR.runner = {};

RUR.state.code_evaluated = false;

RUR.runner.run = function (playback) {
    var src, fatal_error_found = false, xml, xml_text;
    if (RUR.state.editing_world && !RUR.state.code_evaluated) {
        RUR._SAVED_WORLD = clone_world(RUR.CURRENT_WORLD);
    }
    if (!RUR.state.code_evaluated) {
        RUR.CURRENT_WORLD = clone_world(RUR._SAVED_WORLD);
        RUR.world_init.set();
        if (RUR.state.input_method === "blockly-py") {
            editor.setValue(Blockly.Python.workspaceToCode(RUR.blockly.workspace));
        } else if (RUR.state.input_method === "blockly-js") {
            editor.setValue(Blockly.JavaScript.workspaceToCode(RUR.blockly.workspace));
        }
        if (RUR.state.input_method === "blockly-py" ||
            RUR.state.input_method === "blockly-js") {
                xml = Blockly.Xml.workspaceToDom(RUR.blockly.workspace);
                xml_text = Blockly.Xml.domToText(xml);
                localStorage.setItem("blockly", xml_text);
        }
        src = editor.getValue();
        fatal_error_found = RUR.runner.eval(src); // jshint ignore:line
    }
    if (!fatal_error_found) {
        try {
            localStorage.setItem("editor", src);
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        // "playback" is a function called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (RUR.state.prevent_playback) {
            return;
        }
        playback();
    }
};

RUR.runner.eval = function(src) {  // jshint ignore:line
    var error_name, message, response, other_info, from_python, error;
    other_info = '';

    /* At some point around version 3.2.0, Brython changed the way it
       handled uncaught errors, and no longer pass a "nice" object
       to the surrounding Javascript environment - since this is not
       the way Brython programmers normally do things.   While this
       has been changed back some time after version 3.2.3, we nonetheless
       guard against any future changes by doing our own handling. */

    RUR.__python_error = false;
    try {
        if (RUR.state.programming_language === "javascript") {
            RUR.runner.eval_javascript(src);
        } else if (RUR.state.programming_language === "python") {
            RUR.runner.eval_python(src);
            if (RUR.__python_error) {
                throw RUR.__python_error;
            }
        } else {
            alert("FATAL ERROR: Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        if (RUR.__debug){
            console.dir(e);
        }
        error = {};
        if (RUR.state.programming_language === "python") {
            error.reeborg_shouts = e.reeborg_shouts;
            response = RUR.runner.simplify_python_traceback(e);
            message = response.message;
            other_info = response.other_info;
            error_name = response.error_name;
            error.message = "<h3>" + error_name + "</h3><h4>" +
                                    message + "</h4><p>" + other_info + '</p>';
        } else {
            error_name = e.name;
            message = e.message;
            other_info = '';
            if (e.reeborg_shouts !== undefined) {
                error.message = e.reeborg_shouts;
                error.reeborg_shouts = e.reeborg_shouts;
            }
        }

        if (e.reeborg_shouts !== undefined){
            RUR.record_frame("error", error);
        } else {
            RUR.show_feedback("#Reeborg-shouts",
                                    "<h3>" + error_name + "</h3><h4>" +
                                    message + "</h4><p>" + other_info + '</p>');
            return true;
        }
    }
    RUR.state.code_evaluated = true;
    return false;
};


RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    var pre_code, post_code;
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    RUR.reset_definitions();
    src = pre_code + "\n" + src + "\n" + post_code;
    eval(src); // jshint ignore:line
};


RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    var pre_code, post_code, highlight;
    RUR.reset_definitions();
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    translate_python(src, RUR.state.highlight, RUR.state.watch_vars, pre_code, post_code);
};

RUR.runner.simplify_python_traceback = function(e) {
    "use strict";
    var message, error_name, other_info, diagnostic;
    other_info = '';
    if (e.reeborg_shouts === undefined) {
        message = e.$message;
        error_name = e.__name__;
        diagnostic = '';
        switch (error_name) {
            case "SyntaxError":
                try {
                    other_info = RUR.runner.find_line_number(e.args[1][3]);
                    if (RUR.runner.check_colons(e.args[1][3])) {
                        other_info += RUR.translate("<br>Perhaps a missing colon is the cause.");
                    } else if (RUR.runner.check_func_parentheses(e.args[1][3])){
                        other_info += RUR.translate("<br>Perhaps you forgot to add parentheses ().");
                    }
                } catch (e) { // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                }
                break;
            case "IndentationError":
                message = RUR.translate("The code is not indented correctly.");
                try {
                    other_info = RUR.runner.find_line_number(e.args[1][3]);
                    if (e.args[1][3].indexOf("RUR.set_lineno_highlight([") == -1){
                        other_info += "<br><code>" + e.args[1][3] + "</code>";
                    }
                } catch (e) {  // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                }
                break;
            case "NameError":
                try {
                    other_info = RUR.runner.find_line_number(message);
                    other_info += RUR.translate("<br>Perhaps you misspelled a word or forgot to define a function or a variable.");
                } catch (e) {  // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer.";
                }
                break;
            case "Internal Javascript error: SyntaxError":
            case "Internal Javascript error: TypeError":
                error_name = "Invalid Python Code";
                message = '';
                other_info = RUR.translate("I cannot help you with this problem.");
                break;
            default:
                other_info = "";
        }
    } else {
        message = e.reeborg_shouts;
        if (e.__name__ === undefined) {
            error_name = "ReeborgError";
        } else {
            error_name = e.__name__;
        }
    }
    return {message:message, other_info:other_info, error_name:error_name};
};


RUR.runner.find_line_number = function(bad_code) {
    /** With the possibility of having code inserted by the highlighting routine,
        with some pre-code, and with Brython not counting empty lines at the
        beginning of a program, it is more reliable to scan the source code
        for the offending code as identified by Brython and see if it occurs
        only once in the user's program */
    var lines, found, i, lineno;
    if (bad_code.indexOf("RUR.set_lineno_highlight([") != -1){
        bad_code = bad_code.replace("RUR.set_lineno_highlight([", "");
        lines = bad_code.split("]");
        lineno = lines[0] + 1;
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    lines = editor.getValue().split("\n");
    found = false;
    lineno = false;
    for (i=0; i<lines.length; i++) {
        try {
        } catch (e) {
            return '';
        }
         if(lines[i].indexOf(bad_code) != -1){
            if (found){
                return '';   // found the offending code twice; can not rely on this
            } else {
                found = true;
                lineno = i+1;
            }
        }
    }
    if (lineno) {
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    return '';
};


RUR.runner.check_colons = function(line_of_code) {
    var tokens, line, nb_token;
    tokens = ['if ', 'if(', 'else', 'elif ','elif(','while ','while(',
              'for ','for(', 'def '];
    for (nb_token=0; nb_token < tokens.length; nb_token++){
        if (line_of_code.indexOf(tokens[nb_token]) != -1){
            if (line_of_code.indexOf(":") == -1){
                return true;    // missing colon
            }
        }
    }
    return false;  // no missing colon
};

RUR.runner.check_func_parentheses = function(line_of_code) {
    if (line_of_code.indexOf('def') != -1){
        if (line_of_code.indexOf("(") == -1){
            return true;    // missing parentheses
        }
    }
    return false;  // no missing parentheses
};

},{"./blockly.js":1,"./create_editors.js":5,"./recorder.js":44,"./rur.js":49,"./state.js":52,"./translator.js":54,"./utils/supplant.js":62,"./visible_world.js":64,"./world.js":65,"./world/clone_world.js":66,"./world_init.js":72}],49:[function(require,module,exports){
/** @namespace RUR */         // for jsdoc
window.RUR = RUR || {}; // RUR could be already be defined in the html file

RUR.BACKGROUND_IMAGE = new Image();
RUR.BACKGROUND_IMAGE.src = '';

RUR._NB_IMAGES_TO_LOAD = 0;
RUR._NB_IMAGES_LOADED = 0;
RUR._BASE_URL = '';
RUR.INCREMENT_LOADED_FN = function () {
    RUR._NB_IMAGES_LOADED += 1;
};

RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};

},{}],50:[function(require,module,exports){
require("./state.js");
require("./visible_world.js");
require("./visible_robot.js");


function everything_loaded () {
    var loaded, total_images, py_modules=0;
    if (RUR._NB_IMAGES_LOADED == RUR._NB_IMAGES_TO_LOAD &&
        RUR.vis_robot.loaded_images == RUR.vis_robot.nb_images &&
        RUR._NB_IMAGES_LOADED !== undefined){
        RUR.vis_world.draw_all();
        $("#splash-screen").hide();
    } else {
        // loaded = RUR._NB_IMAGES_LOADED + RUR.vis_robot.loaded_images;
        // total_images = RUR._NB_IMAGES_TO_LOAD + RUR.vis_robot.nb_images;
        // $("#splash-text").html("Images: " + loaded + "/" + total_images);
        requestAnimationFrame(everything_loaded);
    }
}
everything_loaded();

},{"./state.js":52,"./visible_robot.js":63,"./visible_world.js":64}],51:[function(require,module,exports){

/* Requiring the following just to get things started */
require("./listeners/add_listeners.js");
require("./splash_screen.js");
/* --- */

require("./utils/parseuri.js");
require("./world/import_world.js");
require("./storage.js");
require("./state.js");
require("./permalink.js");
require("./create_editors.js");

//
brython({debug:1, pythonpath:['/src/python']});

/* Once everything is loaded, we need to decide which UI to show.
   The priority is determined by:

   1. information encoded in the URL.
   2. any previously saved state.
   3. site defaults
*/
function start_session () {
    "use strict";
    var mode, url_query = parseUri(window.location.href);
    RUR.state.session_initialized = false;
    RUR.permalink.set_language(url_query);
    mode = RUR.permalink.set_mode(url_query);
    if (mode === "blockly-py" || mode === "blockly-js") {
        restore_blockly();
    }
    set_editor();
    set_library();
    // The world can include some content for the editor and/or the library
    set_world(url_query);  //TODO enable capturing blockly config in world.
    RUR.state.session_initialized = true;
}
start_session();

function restore_blockly () {
    var xml, xml_text;
    xml_text = localStorage.getItem("blockly");
    if (xml_text) {
        xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(RUR.blockly.workspace, xml);
    }
}

function set_editor() {
    if (localStorage.getItem("editor")){
        editor.setValue(localStorage.getItem("editor"));
    } else {
        editor.setValue(RUR.translate("move") + "()");
    }
}

function set_library() {
    if (localStorage.getItem("library")){
        library.setValue(localStorage.getItem("library"));
    } else {
        library.setValue(RUR.translate("# from library import *"));
    }
}

function set_world(url_query) {
    if (url_query.queryKey.world !== undefined) {
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        RUR.storage.save_world(RUR.translate("PERMALINK"));
    } else if (localStorage.getItem("world")) {
        try {
            RUR.world_select.set_url(
                RUR.world_select.url_from_shortname(
                    localStorage.getItem("world"))
                );
        } catch (e) {
            RUR.world_select.set_default();
        }
    }
}

},{"./create_editors.js":5,"./listeners/add_listeners.js":21,"./permalink.js":39,"./splash_screen.js":50,"./state.js":52,"./storage.js":53,"./utils/parseuri.js":61,"./world/import_world.js":69}],52:[function(require,module,exports){
/* Yes, I know, global variables are a terrible thing.
   And, in a sense, the following are global variables recording a given
   state.  However, by using this convention and documentating them in a
   single place, it helps in avoiding the creation of inconsistent states.*/

require("./rur.js");
require("./translator.js");

RUR.state = {};
RUR.state.code_evaluated = false;
RUR.state.do_not_record = false;
RUR.state.editing_world = false;
RUR.state.highlight = true;
RUR.state.human_language = "en";
RUR.state.input_method = "python";
RUR.state.programming_language = "javascript"; // default for testing
RUR.state.playback = false;
RUR.state.prevent_playback = false;
RUR.state.session_initialized = false;
RUR.state.sound_id = undefined;
RUR.state.sound_on = false;
RUR.state.specific_object = undefined;
RUR.state.stop_called = false;
RUR.state.watch_vars = false;
RUR.state.x = undefined;
RUR.state.y = undefined;


// TODO: create RUR.state.do_highlight()
// this would be to combine all the flags required to have highlighting on

// TODO: after simplifying the permalink, see if RUR.state.prevent_playback
// is still needed.

},{"./rur.js":49,"./translator.js":54}],53:[function(require,module,exports){

require("./rur.js");
require("./translator.js");
require("./world_select.js");


var export_world = require("./world/export_world.js").export_world;
var clone_world = require("./world/clone_world.js").clone_world;


RUR.storage = {};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        // replace existing
        localStorage.setItem("user_world:"+ name, export_world(RUR.CURRENT_WORLD));
    } else {
        RUR.storage.save_world(name);
    }
    RUR._SAVED_WORLD = clone_world();
};

RUR.storage.save_world = function (name){
    "use strict";
    var url = "user_world:"+ name;
    localStorage.setItem(url, export_world(RUR.CURRENT_WORLD));
    RUR.storage.append_world_name(name);
};

RUR.storage.append_world_name = function (name){
    "use strict";
    var url = "user_world:"+ name;
    RUR.storage.appending_world_name_flag = true;
    RUR.world_select.append_world({url:url, shortname:name, local_storage:true});
    RUR.world_select.set_url(url);  // reload as updating select choices blanks the world.
    /* appends name to world selector and to list of possible worlds to delete */
    $('#delete-world h3').append(
        '<button class="blue-gradient inline-block" onclick="RUR.storage.delete_world(' +
            "'"+ name + "'" + ');$(this).remove()"">' + RUR.translate('Delete ') + name + '</button>');
    $('#delete-world').show();
};

RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();

    try {
        RUR.world_select.set_url(
            RUR.world_select.url_from_shortname(
                localStorage.getItem("world"))
            );
    } catch (e) {
        RUR.world_select.set_default();
    }

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};

},{"./rur.js":49,"./translator.js":54,"./world/clone_world.js":66,"./world/export_world.js":68,"./world_select.js":73}],54:[function(require,module,exports){
require("./rur.js");
require("./../lang/msg.js");

RUR.translate = function (s) {
    if (RUR.translation !== undefined && RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        console.log("Translation needed for");
        console.log("%c" + s, "color:blue;font-weight:bold;");
        return s;
    }
};

RUR.translate_to_english = function (s) {
    if (RUR.translation_to_english[s] !== undefined) {
        return RUR.translation_to_english[s];
    } else {
        console.log("Translation to English needed for");
        console.log("%c" + s, "color:green;font-weight:bold;");
        return s;
    }
};

},{"./../lang/msg.js":83,"./rur.js":49}],55:[function(require,module,exports){

require("./../rur.js");

exports.toggle = function () {
    if ("robots" in RUR.CURRENT_WORLD &&
        RUR.CURRENT_WORLD.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};

},{"./../rur.js":49}],56:[function(require,module,exports){

require("./../state.js");

exports.set_ready_to_run = set_ready_to_run = function () {
    RUR.state.prevent_playback = false;
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
};

set_ready_to_run();

},{"./../state.js":52}],57:[function(require,module,exports){
;
// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax

// will modify a global object - no need to export anything.
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});

},{}],58:[function(require,module,exports){
/* filterInt adapted from
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt
*/

exports.filterInt = function (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return undefined;
};

},{}],59:[function(require,module,exports){
/*
    Original script title: "Object.identical.js"; version 1.12
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Object.identical.js

    Modified to assume that order of arrays is irrelevant
    (which it should be since this is meant to be used to
    compare worlds.)  Also adapted to ignore empty objects
    when doing comparison; for worlds, only non-empty objects
    are meaningful and can be compared.
*/

exports.identical = function (a, b) {

    function sort(object) {
        if (Array.isArray(object)) {
            return object.sort();
        }
        else if (typeof object !== "object" || object === null) {
            return object;
        } else if (Object.keys(object).length === 0){
            return undefined;
        }

        return Object.keys(object).sort().map(function(key) {
            return {
                key: key,
                value: sort(object[key])
            };
        });
    }

    return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
};

},{}],60:[function(require,module,exports){
require("./../rur.js");
RUR._ensure_key_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    }
};

},{"./../rur.js":49}],61:[function(require,module,exports){
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

window.parseUri = parseUri;

exports.update_url = update_url = function () {
    /* Used to maintain information about human language used and
       input mode.
    */
    "use strict";
    var proglang, url_query, permalink;
    url_query = parseUri(window.location.href);
    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    permalink += "?lang=" + RUR.state.human_language + "&mode=" + RUR.state.input_method;
    window.history.pushState("dummy", "dummy", permalink);
};

},{}],62:[function(require,module,exports){
// adapted from http://javascript.crockford.com/remedial.html

// will modify a global object - no need to export anything.

String.prototype.supplant = function (o) {
    return this.replace(
        /\{([^{}]*)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

},{}],63:[function(require,module,exports){

require("./constants.js");
require("./state.js");
// TODO: RUR._BASE_URL -> need to change it to state...

RUR.vis_robot = {};
RUR.vis_robot.images = [{}, {}, {}, {}];

// we will keep track if we have loaded all images
RUR.vis_robot.loaded_images = 0;
RUR.vis_robot.nb_images = 0;

RUR._BASE_URL = RUR._BASE_URL || '';  // enable changing defaults for unit tests

// classic
RUR.vis_robot.images[0].robot_e_img = new Image();
RUR.vis_robot.images[0].robot_e_img.src = RUR._BASE_URL + '/src/images/robot_e.png';
RUR.vis_robot.images[0].robot_n_img = new Image();
RUR.vis_robot.images[0].robot_n_img.src = RUR._BASE_URL + '/src/images/robot_n.png';
RUR.vis_robot.images[0].robot_w_img = new Image();
RUR.vis_robot.images[0].robot_w_img.src = RUR._BASE_URL + '/src/images/robot_w.png';
RUR.vis_robot.images[0].robot_s_img = new Image();
RUR.vis_robot.images[0].robot_s_img.src = RUR._BASE_URL + '/src/images/robot_s.png';
RUR.vis_robot.images[0].robot_random_img = new Image();
RUR.vis_robot.images[0].robot_random_img.src = RUR._BASE_URL + '/src/images/robot_random.png';

// rover type
RUR.vis_robot.images[1].robot_e_img = new Image();
RUR.vis_robot.images[1].robot_e_img.src = RUR._BASE_URL + '/src/images/rover_e.png';
RUR.vis_robot.images[1].robot_n_img = new Image();
RUR.vis_robot.images[1].robot_n_img.src = RUR._BASE_URL + '/src/images/rover_n.png';
RUR.vis_robot.images[1].robot_w_img = new Image();
RUR.vis_robot.images[1].robot_w_img.src = RUR._BASE_URL + '/src/images/rover_w.png';
RUR.vis_robot.images[1].robot_s_img = new Image();
RUR.vis_robot.images[1].robot_s_img.src = RUR._BASE_URL + '/src/images/rover_s.png';
RUR.vis_robot.images[1].robot_random_img = new Image();
RUR.vis_robot.images[1].robot_random_img.src = RUR._BASE_URL + '/src/images/rover_random.png';

// 3d red type
RUR.vis_robot.images[2].robot_e_img = new Image();
RUR.vis_robot.images[2].robot_e_img.src = RUR._BASE_URL + '/src/images/plain_e.png';
RUR.vis_robot.images[2].robot_n_img = new Image();
RUR.vis_robot.images[2].robot_n_img.src = RUR._BASE_URL + '/src/images/plain_n.png';
RUR.vis_robot.images[2].robot_w_img = new Image();
RUR.vis_robot.images[2].robot_w_img.src = RUR._BASE_URL + '/src/images/plain_w.png';
RUR.vis_robot.images[2].robot_s_img = new Image();
RUR.vis_robot.images[2].robot_s_img.src = RUR._BASE_URL + '/src/images/plain_s.png';
RUR.vis_robot.images[2].robot_random_img = new Image();
RUR.vis_robot.images[2].robot_random_img.src = RUR._BASE_URL + '/src/images/robot_random.png';

// solar panel type
RUR.vis_robot.images[3].robot_e_img = new Image();
RUR.vis_robot.images[3].robot_e_img.src = RUR._BASE_URL + '/src/images/sp_e.png';
RUR.vis_robot.images[3].robot_n_img = new Image();
RUR.vis_robot.images[3].robot_n_img.src = RUR._BASE_URL + '/src/images/sp_n.png';
RUR.vis_robot.images[3].robot_w_img = new Image();
RUR.vis_robot.images[3].robot_w_img.src = RUR._BASE_URL + '/src/images/sp_w.png';
RUR.vis_robot.images[3].robot_s_img = new Image();
RUR.vis_robot.images[3].robot_s_img.src = RUR._BASE_URL + '/src/images/sp_s.png';
RUR.vis_robot.images[3].robot_random_img = new Image();
RUR.vis_robot.images[3].robot_random_img.src = RUR._BASE_URL + '/src/images/robot_random.png';

RUR.vis_robot.style = 0;

RUR.select_default_robot_model = function (arg) {
    var style;
    style = parseInt(arg, 10);
    if ( !(style ===0 || style==1 || style==2 || style==3)){
        style = 0;
    }
    RUR.vis_robot.style = style;
    RUR.vis_robot.e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[style].robot_s_img;
    RUR.vis_robot.random_img = RUR.vis_robot.images[style].robot_random_img;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }

    localStorage.setItem("robot_default_model", style);
};
RUR.select_default_robot_model(localStorage.getItem("robot_default_model"));

// the following is to try to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.w_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.n_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.s_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.random_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;



RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image;
    // handling legacy Code
    if (robot.orientation !== undefined) {
        robot._orientation = robot.orientation;
        robot.orientation = null;
    }
    if (!robot) {
        return;
    }
    if (robot.x > RUR.COLS || robot.y > RUR.ROWS) {
        return;
    }

    // all images are taken to be centered on a tile 40x40, which are scaled
    //  appropriately
    width = RUR.TILE_SIZE * RUR.SCALE;
    height = RUR.TILE_SIZE * RUR.SCALE;

    x = robot.x*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;
    y = RUR.HEIGHT - (robot.y+1)*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;

    switch(robot._orientation){
        case RUR.EAST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_e_img;
            } else {
                image = RUR.vis_robot.e_img;
            }
            break;
        case RUR.NORTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_n_img;
            } else {
                image = RUR.vis_robot.n_img;
            }
            break;
        case RUR.WEST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_w_img;
            } else {
                image = RUR.vis_robot.w_img;
            }
            break;
        case RUR.SOUTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_s_img;
            } else {
                image = RUR.vis_robot.s_img;
            }
            break;
        case -1:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_random_img;
            } else {
                image = RUR.vis_robot.random_img;
            }
            break;
        default:
            image = RUR.vis_robot.e_img;
        }
    RUR.ROBOT_CTX.drawImage(image, x, y, width, height);
    if (RUR.state.editing_world){
        return;
    }
    RUR.vis_robot.draw_trace(robot);
};


RUR.vis_robot.draw_trace = function (robot) {
    "use strict";
    if (robot === undefined || robot._is_leaky === false || robot._orientation === -1) {
        return;
    }
    if (robot.x > RUR.COLS || robot.y > RUR.ROWS) {
        return;
    }
    var ctx = RUR.TRACE_CTX;
    if (robot.trace_color !== undefined){
        ctx.strokeStyle = robot.trace_color;
    } else {
        ctx.strokeStyle = RUR.vis_robot.trace_color;
    }

    // overrides user choice for large world (small grid size)
    if(RUR.CURRENT_WORLD.small_tiles) {
        RUR.vis_robot.trace_offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        RUR.vis_robot.trace_thickness = 2;
    } else {
        RUR.vis_robot.set_trace_style(RUR.TRACE_STYLE, robot);
    }

    ctx.lineWidth = RUR.vis_robot.trace_thickness;
    ctx.lineCap = "round";

    ctx.beginPath();
    // ensure that _prev_orientation and orientation are within bounds as these could be messed
    // up by a user program and crash the robot program with a message sent to the console and nothing else.
    ctx.moveTo(robot._prev_x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation%4][0],
                    RUR.HEIGHT - (robot._prev_y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation%4][1]);
    ctx.lineTo(robot.x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._orientation%4][0],
                    RUR.HEIGHT - (robot.y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._orientation%4][1]);
    ctx.stroke();
};

RUR.vis_robot.set_trace_style = function (choice, robot){
    "use strict";
    if (choice === undefined) {
        return;
    }
    RUR.TRACE_STYLE = choice;
    if (robot !== undefined && robot.trace_style !== undefined){
        choice = robot.trace_style;
    }
    if (choice === "thick") {
        RUR.vis_robot.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        RUR.vis_robot.trace_color = RUR.DEFAULT_TRACE_COLOR;
        RUR.vis_robot.trace_thickness = 4;
    } else if (choice === "invisible") {
        RUR.vis_robot.trace_color = "rgba(0,0,0,0)";
    } else if (choice === "default") {
        RUR.vis_robot.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
        RUR.vis_robot.trace_color = RUR.DEFAULT_TRACE_COLOR;
        RUR.vis_robot.trace_thickness = 1;
    }
};

RUR.vis_robot.set_trace_style("default");

},{"./constants.js":3,"./state.js":52}],64:[function(require,module,exports){

/*jshint  -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR*/

require("./translator.js");
require("./constants.js");
require("./state.js");
require("./extend/add_object_type.js");
require("./extend/add_tile_type.js");
require("./extend/new_home_tile.js");

RUR.vis_world = {};

RUR.vis_world.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.world_get.world_info();
};

RUR.vis_world.compute_world_geometry = function (cols, rows) {
    "use strict";
    var height, width;
    if (RUR.CURRENT_WORLD.small_tiles) {
        RUR.WALL_LENGTH = 20;
        RUR.WALL_THICKNESS = 2;
        RUR.SCALE = 0.5;
    } else {
        RUR.WALL_LENGTH = 40;
        RUR.WALL_THICKNESS = 4;
        RUR.SCALE = 1;
    }

    if (cols !== undefined && rows !== undefined) {
        height = (rows + 1.5) * RUR.WALL_LENGTH;
        width = (cols + 1.5) * RUR.WALL_LENGTH;
    } else {
        height = (RUR.ROWS + 1.5) * RUR.WALL_LENGTH;
        width = (RUR.COLS + 1.5) * RUR.WALL_LENGTH;
    }

    if (height !== RUR.HEIGHT || width !== RUR.WIDTH) {
        RUR.BACKGROUND_CANVAS = document.getElementById("background-canvas");
        RUR.BACKGROUND_CANVAS.width = width;
        RUR.BACKGROUND_CANVAS.height = height;
        RUR.SECOND_LAYER_CANVAS = document.getElementById("second-layer-canvas");
        RUR.SECOND_LAYER_CANVAS.width = width;
        RUR.SECOND_LAYER_CANVAS.height = height;
        RUR.GOAL_CANVAS = document.getElementById("goal-canvas");
        RUR.GOAL_CANVAS.width = width;
        RUR.GOAL_CANVAS.height = height;
        RUR.OBJECTS_CANVAS = document.getElementById("objects-canvas");
        RUR.OBJECTS_CANVAS.width = width;
        RUR.OBJECTS_CANVAS.height = height;
        RUR.TRACE_CANVAS = document.getElementById("trace-canvas");
        RUR.TRACE_CANVAS.width = width;
        RUR.TRACE_CANVAS.height = height;
        RUR.ROBOT_CANVAS = document.getElementById("robot-canvas");
        RUR.ROBOT_CANVAS.width = width;
        RUR.ROBOT_CANVAS.height = height;
        RUR.HEIGHT = height;
        RUR.WIDTH = width;
    }

    // background context may have change - hence wait until here
    // to set
    if (RUR.CURRENT_WORLD.small_tiles) {
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }

    RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
    RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;
    RUR.CURRENT_WORLD.rows = RUR.ROWS;
    RUR.CURRENT_WORLD.cols = RUR.COLS;
    //TODO: extract all of the above into separate function which can be
    //put elsewhere.
    RUR.vis_world.draw_all();
};

RUR.vis_world.draw_all = function () {
    "use strict";

    if (RUR.CURRENT_WORLD.blank_canvas) {
        if (RUR.state.editing_world) {
            RUR.show_feedback("#Reeborg-shouts",
                                RUR.translate("Editing of blank canvas is not supported."));
            return;
         }
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = undefined;
        RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.SECOND_LAYER_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        return;
    }

    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.animated_tiles = false;

    if (RUR.state.editing_world) {
        if (RUR.BACKGROUND_IMAGE.src) {
            RUR.vis_world.draw_single_object(RUR.BACKGROUND_IMAGE, 1, RUR.ROWS, RUR.BACKGROUND_CTX);
        }
        RUR.vis_world.draw_grid_walls();  // on BACKGROUND_CTX
    } else {
        RUR.vis_world.draw_grid_walls();
        if (RUR.BACKGROUND_IMAGE.src) {
            RUR.vis_world.draw_single_object(RUR.BACKGROUND_IMAGE, 1, RUR.ROWS, RUR.BACKGROUND_CTX);
        }
    }

    RUR.vis_world.draw_coordinates(); // on BACKGROUND_CTX

    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.draw_goal();  // on GOAL_CTX

    RUR.vis_world.refresh();
};


RUR.vis_world.refresh = function () {
    "use strict";
    // meant to be called at each step
    // does not draw background (i.e. coordinates and grid walls)
    // does not draw goals - they should not change during a running program
    // does not clear trace

    // start by clearing all the relevant contexts first.
    // some objects are drown on their own contexts.
    RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.SECOND_LAYER_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    // animated tiles are redrawn according to their own schedule
    if (!RUR.animated_tiles) {
        RUR.vis_world.draw_animated_tiles(); // on BACKGROUND_CTX
    }
    RUR.vis_world.draw_tiles(RUR.CURRENT_WORLD.tiles); // on BACKGROUND_CTX

    if (RUR.__debug) {
        RUR.vis_world.sanity_check(0);
    }
    RUR.vis_world.draw_foreground_walls(RUR.CURRENT_WORLD.walls); // on OBJECTS_CTX
    RUR.vis_world.draw_all_objects(RUR.CURRENT_WORLD.decorative_objects);
    RUR.vis_world.draw_all_objects(RUR.CURRENT_WORLD.objects);  // on OBJECTS_CTX
        // RUR.vis_world.draw_all_objects also called by draw_goal, and draws on GOAL_CTX
        // and, draws some objects on ROBOT_CTX

    // objects: goal is false, tile is true
    RUR.vis_world.draw_all_objects(RUR.CURRENT_WORLD.solid_objects, false, true); // likely on RUR.SECOND_LAYER_CTX


    RUR.vis_world.draw_robots(RUR.CURRENT_WORLD.robots);  // on ROBOT_CTX
    RUR.vis_world.compile_info();  // on ROBOT_CTX
    RUR.vis_world.draw_info();     // on ROBOT_CTX
    if (RUR.__debug) {
        RUR.vis_world.sanity_check(100);
    }
};

RUR.vis_world.sanity_check = function(offset) {
    // An intermittent bug sometimes  causes the robot NOT to be drawn.
    // This sanity check is, enabled when the debug option is turned on,
    // is performed so as to see if any unexpected
    // canvas clearing occurs.

    RUR.BACKGROUND_CTX.fillStyle = "red";
    RUR.SECOND_LAYER_CTX.fillStyle = "green";
    RUR.GOAL_CTX.fillStyle = "yellow";
    RUR.OBJECTS_CTX.fillStyle = "blue";
    RUR.TRACE_CTX.fillStyle = "cyan";
    RUR.ROBOT_CTX.fillStyle = "magenta";

    RUR.BACKGROUND_CTX.fillRect(0+offset, 0, 10, 10);
    RUR.SECOND_LAYER_CTX.fillRect(10+offset, 0, 10, 10);
    RUR.GOAL_CTX.fillRect(20+offset, 0, 10, 10);
    RUR.OBJECTS_CTX.fillRect(30+offset, 0, 10, 10);
    RUR.TRACE_CTX.fillRect(40+offset, 0, 10, 10);
    RUR.ROBOT_CTX.fillRect(50+offset, 0, 10, 10);
};


RUR.vis_world.draw_coordinates = function() {
    "use strict";
    var x, y, ctx = RUR.BACKGROUND_CTX;

    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - RUR.WALL_LENGTH/2;
    for(x=1; x <= RUR.COLS; x++){
        ctx.fillText(x, (x+0.5)*RUR.WALL_LENGTH, y);
    }
    x = RUR.WALL_LENGTH/2 -5;
    for(y=1; y <= RUR.ROWS; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*RUR.WALL_LENGTH);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
};


RUR.vis_world.draw_grid_walls = function(){
    var i, j, ctx;
    if (RUR.state.editing_world) {
        ctx = RUR.GOAL_CTX;     // have the appear above the tiles while editing
    } else {
        ctx = RUR.BACKGROUND_CTX;
    }

    ctx.fillStyle = RUR.SHADOW_WALL_COLOR;
    for (i = 1; i <= RUR.COLS; i++) {
        for (j = 1; j <= RUR.ROWS; j++) {
            RUR.vis_world.draw_north_wall(ctx, i, j);
            RUR.vis_world.draw_east_wall(ctx, i, j);
        }
    }
};

RUR.vis_world.draw_foreground_walls = function (walls) {
    "use strict";
    var keys, key, i, j, k, ctx = RUR.OBJECTS_CTX;


    // border walls (x and y axis)
    ctx.fillStyle = RUR.WALL_COLOR;
    for (j = 1; j <= RUR.ROWS; j++) {
        RUR.vis_world.draw_east_wall(ctx, 0, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        RUR.vis_world.draw_north_wall(ctx, i, 0);
    }
    for (j = 1; j <= RUR.ROWS; j++) {
        RUR.vis_world.draw_east_wall(ctx, RUR.COLS, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        RUR.vis_world.draw_north_wall(ctx, i, RUR.ROWS);
    }


    if (walls === undefined || walls == {}) {
        return;
    }

    // other walls
    keys = Object.keys(walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( walls[keys[key]].indexOf("north") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            RUR.vis_world.draw_north_wall(ctx, i, j);
        }
        if (walls[keys[key]].indexOf("east") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            RUR.vis_world.draw_east_wall(ctx, i, j);
        }
    }
};

RUR.vis_world.draw_north_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect(i*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_LENGTH + RUR.WALL_THICKNESS, RUR.WALL_THICKNESS);
        ctx.stroke();
        return;
    }
    ctx.fillRect(i*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_LENGTH + RUR.WALL_THICKNESS, RUR.WALL_THICKNESS);
};

RUR.vis_world.draw_east_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect((i+1)*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_THICKNESS, RUR.WALL_LENGTH + RUR.WALL_THICKNESS);
        ctx.stroke();
        return;
    }
    ctx.fillRect((i+1)*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_THICKNESS, RUR.WALL_LENGTH + RUR.WALL_THICKNESS);
};

RUR.vis_world.draw_robots = function (robots) {
    "use strict";
    var robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        if (robots[robot].start_positions !== undefined && robots[robot].start_positions.length > 1){
            RUR.vis_world.draw_robot_clones(robots[robot]);
        } else {
            RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        }
    }
};

RUR.vis_world.draw_robot_clones = function(robot){
    "use strict";
    var i, clone;
    RUR.ROBOT_CTX.save();
    RUR.ROBOT_CTX.globalAlpha = 0.4;
    for (i=0; i < robot.start_positions.length; i++){
            clone = JSON.parse(JSON.stringify(robot));
            clone.x = robot.start_positions[i][0];
            clone.y = robot.start_positions[i][1];
            clone._prev_x = clone.x;
            clone._prev_y = clone.y;
            RUR.vis_robot.draw(clone);
    }
    RUR.ROBOT_CTX.restore();
};

RUR.vis_world.draw_goal = function () {
    "use strict";
    var goal, ctx = RUR.GOAL_CTX;

    if (RUR.state.editing_world){  // have to appear above tiles;
        RUR.vis_world.draw_grid_walls();  //  so this is a convenient canvas
    }

    if (RUR.CURRENT_WORLD.goal === undefined) {
        return;
    }

    goal = RUR.CURRENT_WORLD.goal;
    if (goal.position !== undefined) {
        RUR.vis_world.draw_goal_position(goal, ctx);
    }
    if (goal.objects !== undefined){
        RUR.vis_world.draw_all_objects(goal.objects, true);
    }

    if (goal.walls !== undefined){
        RUR.vis_world.draw_goal_walls(goal, ctx);
    }
};


RUR.vis_world.draw_goal_position = function (goal, ctx) {
    "use strict";
    var image, i, g;

    if (goal.position.image !== undefined &&
        typeof goal.position.image === 'string' &&
        RUR.HOME_IMAGES[goal.position.image] !== undefined){
        image = RUR.HOME_IMAGES[goal.position.image].image;
    } else {    // For anyone wondering, this step might be needed only when using older world
                // files that were created when there was not a choice
                // of image for indicating the home position.
        image = RUR.HOME_IMAGES.green_home_tile.image;
    }
    if (goal.possible_positions !== undefined && goal.possible_positions.length > 1){
            ctx.save();
            ctx.globalAlpha = 0.5;
            for (i=0; i < goal.possible_positions.length; i++){
                    g = goal.possible_positions[i];
                    RUR.vis_world.draw_single_object(image, g[0], g[1], ctx);
            }
            ctx.restore();
    } else {
        RUR.vis_world.draw_single_object(image, goal.position.x, goal.position.y, ctx);
    }
};

RUR.vis_world.draw_goal_walls = function (goal, ctx) {
    "use strict";
    var key, keys, i, j, k;
    ctx.fillStyle = RUR.WALL_COLOR;
    keys = Object.keys(goal.walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( goal.walls[keys[key]].indexOf("north") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            RUR.vis_world.draw_north_wall(ctx, i, j, true);
        }
        if (goal.walls[keys[key]].indexOf("east") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            RUR.vis_world.draw_east_wall(ctx, i, j, true);
        }
    }
};

RUR.vis_world.clear_trace = function(){
    "use strict";
    // potentially useful as it can be called from a user's program.
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
};

RUR.vis_world.draw_tiles = function (tiles){
    "use strict";
    var i, j, k, keys, key, image, tile, colour;
    if (tiles === undefined) {
        return;
    }
    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if (tiles[keys[key]] !== undefined) {
            tile = RUR.TILES[tiles[keys[key]]];
            if (tile === undefined) {
                colour = tiles[keys[key]];
                RUR.vis_world.draw_coloured_tile(colour, i, j, RUR.BACKGROUND_CTX);
                continue;
            }
        }

        if (tile.choose_image === undefined){
            image = tile.image;
            RUR.vis_world.draw_single_object(image, i, j, RUR.BACKGROUND_CTX);
        }
    }
};

RUR.vis_world.draw_animated_tiles = function (){
    "use strict";
    var i, j, i_j, coords, k, image, tile, tiles;

    tiles = RUR.CURRENT_WORLD.tiles;
    if (tiles === undefined) {
        return;
    }

    RUR.animated_tiles = false;
    coords = Object.keys(tiles);
    for (k=0; k < coords.length; k++){
        i_j = coords[k].split(",");
        i = parseInt(i_j[0], 10);
        j = parseInt(i_j[1], 10);
        tile = RUR.TILES[tiles[coords[k]]];
        if (tile === undefined) {
            continue;
        }
        if (tile.choose_image !== undefined){
            image = tile.choose_image(coords[k]);
            RUR.animated_tiles = true;
            RUR.vis_world.draw_single_object(image, i, j, RUR.BACKGROUND_CTX);
        }
    }
    if (RUR.animated_tiles) {
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = setTimeout(RUR.vis_world.draw_animated_tiles,
            RUR.ANIMATION_TIME);
    }
};

RUR.vis_world.draw_coloured_tile = function (colour, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS;
    var x, y, size;
    if (i > RUR.COLS || j > RUR.ROWS){
        return;
    }
    x = i*RUR.WALL_LENGTH + thick/2;
    y = RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + thick/2;
    size = RUR.WALL_LENGTH*RUR.SCALE;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};


RUR.vis_world.draw_all_objects = function (objects, goal, tile){
    "use strict";
    var i, j, image, ctx, coords, specific_object, objects_here, obj_name, grid_pos;
    if (objects === undefined) {
        return;
    }

    for (coords in objects){
        if (objects.hasOwnProperty(coords)){
            objects_here = objects[coords];
            grid_pos = coords.split(",");
            i = parseInt(grid_pos[0], 10);
            j = parseInt(grid_pos[1], 10);
            if (i <= RUR.COLS && j <= RUR.ROWS) {
                for (obj_name in objects_here){
                    if (objects_here.hasOwnProperty(obj_name)){
                        if (tile){
                            specific_object = RUR.SOLID_OBJECTS[obj_name];
                        } else {
                            specific_object = RUR.OBJECTS[obj_name];
                        }
                        if (goal) {
                            ctx = RUR.GOAL_CTX;
                            image = specific_object.image_goal;
                        } else if (specific_object.ctx !== undefined){
                            ctx = specific_object.ctx;
                            image = specific_object.image;
                        } else {
                            ctx = RUR.OBJECTS_CTX;
                            image = specific_object.image;
                        }
                        RUR.vis_world.draw_single_object(image, i, j, ctx);
                    }
                }
            }
        }
    }
};

RUR.vis_world.draw_single_object = function (image, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS;
    var x, y;
    if (i > RUR.COLS || j > RUR.ROWS){
        return;
    }
    x = i*RUR.WALL_LENGTH + thick/2;
    y = RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + thick/2;
    try{
       ctx.drawImage(image, x, y, image.width*RUR.SCALE, image.height*RUR.SCALE);
   } catch (e) {
       console.log("problem in draw_single_object", image, ctx);
   }
};



RUR.vis_world.compile_info = function() {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drown - if anything.
    var coords, obj, quantity;
    RUR.vis_world.information = {};
    RUR.vis_world.goal_information = {};
    RUR.vis_world.goal_present = false;
    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.objects !== undefined) {
        RUR.vis_world.compile_partial_info(RUR.CURRENT_WORLD.goal.objects,
            RUR.vis_world.goal_information, 'goal');
            RUR.vis_world.goal_present = true;
    }


    if (RUR.CURRENT_WORLD.objects !== undefined) {
        RUR.vis_world.compile_partial_info(RUR.CURRENT_WORLD.objects,
            RUR.vis_world.information, 'objects');
    }
};

RUR.vis_world.compile_partial_info = function(objects, information, type){
    "use strict";
    var coords, obj, quantity, color, goal_information;
    if (type=="objects") {
        color = "black";
        goal_information = RUR.vis_world.goal_information;
    } else {
        color = "blue";
    }

    for (coords in objects) {
        if (objects.hasOwnProperty(coords)){
            // objects found here
            for(obj in objects[coords]){
                if (objects[coords].hasOwnProperty(obj)){
                    if (information[coords] !== undefined){
                        // already at least one other object there
                        information[coords] = [undefined, "?"];  // assign impossible object
                    } else {
                        quantity = objects[coords][obj];
                        if (quantity.toString().indexOf("-") != -1) {
                            quantity = "?";
                        } else if (quantity == "all") {
                            quantity = "?";
                        } else {
                            try{
                                quantity = parseInt(quantity, 10);
                            } catch (e) {
                                quantity = "?";
                                console.log("WARNING: this should not happen in RUR.vis_world.compile_info");
                            }
                        }
                        if (RUR.vis_world.goal_present && typeof quantity == 'number' && goal_information !== undefined) {
                            if ( goal_information[coords] !== undefined &&  goal_information[coords][1] == objects[coords][obj]) {
                            information[coords] = [obj, objects[coords][obj], 'green'];
                            } else {
                                information[coords] = [obj, objects[coords][obj], 'red'];
                            }
                        } else {
                            information[coords] = [obj, quantity, color];
                        }
                    }
                }
            }
        }
    }
};

RUR.vis_world.draw_info = function() {
    var i, j, coords, keys, key, info, ctx;
    var scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;
    if (RUR.vis_world.information === undefined &&
        RUR.vis_world.goal_information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;

    if (RUR.vis_world.information !== undefined) {
        keys = Object.keys(RUR.vis_world.information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.information[coords][1];
            if (i <= RUR.COLS && j <= RUR.ROWS){
                text_width = ctx.measureText(info).width/2;
                ctx.font = RUR.BACKGROUND_CTX.font;
                ctx.fillStyle = RUR.vis_world.information[coords][2];
                // information drawn to left side of object
                ctx.fillText(info, (i+0.2)*scale, Y - (j)*scale);
            }
        }
    }

    if (RUR.vis_world.goal_information !== undefined) {
        keys = Object.keys(RUR.vis_world.goal_information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.goal_information[coords][1];
            if (i <= RUR.COLS && j <= RUR.ROWS){
                text_width = ctx.measureText(info).width/2;
                ctx.font = RUR.BACKGROUND_CTX.font;
                ctx.fillStyle = RUR.vis_world.goal_information[coords][2];
                // information drawn to right side of object
                ctx.fillText(info, (i+0.8)*scale, Y - (j)*scale);
            }
        }
    }
};

},{"./constants.js":3,"./extend/add_object_type.js":14,"./extend/add_tile_type.js":15,"./extend/new_home_tile.js":16,"./state.js":52,"./translator.js":54}],65:[function(require,module,exports){

require("./translator.js");
require("./constants.js");
require("./robot.js");
require("./visible_world.js");
require("./state.js");
require("./exceptions.js");
require("./create_editors.js");
edit_robot_menu = require("./ui/edit_robot_menu.js");
var clone_world = require("./world/clone_world.js").clone_world;

RUR.world = {};


/* When a world is edited, as we are about to leave the editing mode,
   a comparison of the world before editing and after is performed.
   If the content of the world before and after has changed, including that
   of the editors, this is taken as an indication that the world should
   perhaps be saved.  Some worlds are saved without having some content in
   the extra editors (perhaps because they were created before new editors
   were added, or since the new cleanup procedure was introduced). To avoid
   erroneous indication that the world content has changed, we use the
   following.
*/
RUR.world.editors_default_values = {
    'pre_code': '"pre code"',
    'post_code': '"post code"',
    'description': 'description',
    'onload': '/* Javascript */'
};

RUR.world.editors_set_default_values = function (world) {
    "use strict";
    var edit, editors;
    editors = RUR.world.editors_default_values;
    for (edit in editors){
        if (!world[edit]){
            world[edit] = editors[edit];
        }
    }
    return world;
};

RUR.world.editors_remove_default_values = function (world) {
    "use strict";
    var edit, editors;
    editors = RUR.world.editors_default_values;
    for (edit in editors) {
        if (world[edit] === undefined) {
            continue;
        }
        if (world[edit] == editors[edit] || world[edit].trim().length < 3) {
            try {
                delete world[edit];
            } catch (e) {}
        }
    }
    return world;
};

RUR.world.update_from_editors = function (world) {
    /* When editing a world, new content may be inserted in the additional
       editors.  This function updates the world to include this content,
       while removing the irrelevant, default */
    world.pre_code = pre_code_editor.getValue();
    world.post_code = post_code_editor.getValue();
    world.description = description_editor.getValue();
    world.onload = onload_editor.getValue();
    return RUR.world.editors_remove_default_values(world);
};

RUR.world.update_editors = function (world) {
   pre_code_editor.setValue(world.pre_code);
   post_code_editor.setValue(world.post_code);
   description_editor.setValue(world.description);
   onload_editor.setValue(world.onload);
};

RUR.world.dialog_update_editors_from_world = $("#dialog-update-editors-from-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        Cancel: function() {
            RUR.world.dialog_update_editors_from_world.dialog("close");
        }
    }
});

$("#update-editor-content-btn").on("click", function(evt) {
    editor.setValue(RUR.CURRENT_WORLD.editor);
    $("#update-editor-content").hide();
    if (! $("#update-library-content").is(":visible")) {
        RUR.world.dialog_update_editors_from_world.dialog("close");
    }
});
$("#update-library-content-btn").on("click", function(evt) {
    library.setValue(RUR.CURRENT_WORLD.library);
    $("#update-library-content").hide();
    if (! $("#update-editor-content").is(":visible")) {
        RUR.world.dialog_update_editors_from_world.dialog("close");
    }
});

},{"./constants.js":3,"./create_editors.js":5,"./exceptions.js":13,"./robot.js":47,"./state.js":52,"./translator.js":54,"./ui/edit_robot_menu.js":55,"./visible_world.js":64,"./world/clone_world.js":66}],66:[function(require,module,exports){

exports.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.CURRENT_WORLD));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};

},{}],67:[function(require,module,exports){
require("./../constants.js");

exports.create_empty_world = create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.objects = {};
    // allow teacher to insert code to be run before and after the
    // code entered by the student
    world.small_tiles = false;
    world.rows = RUR.MAX_Y;
    world.cols = RUR.MAX_X;

    return world;
};
RUR.CURRENT_WORLD = create_empty_world();

},{"./../constants.js":3}],68:[function(require,module,exports){

exports.export_world = function () {
    return JSON.stringify(RUR.CURRENT_WORLD, null, 2);
};

},{}],69:[function(require,module,exports){
require("./../translator.js");
require("./../constants.js");
require("./../robot.js");
require("./../visible_world.js");
require("./../state.js");
require("./../exceptions.js");
require("./../create_editors.js");
edit_robot_menu = require("./../ui/edit_robot_menu.js");
var clone_world = require("./clone_world.js").clone_world;

RUR.world.import_world = function (json_string) {
    "use strict";
    var body, editor_content, library_content;
    if (json_string === undefined){
        console.log("Problem: no argument passed to RUR.world.import_world");
        return {};
    }
    RUR._ORDERED_TILES = {};
    RUR._SYNC_TILES = {};
    RUR._SYNC_TILES_VALUE = {};

    if (typeof json_string == "string"){
        try {
            RUR.CURRENT_WORLD = JSON.parse(json_string) || RUR.world.create_empty_world();
        } catch (e) {
            console.log("Exception caught in import_world.");
            console.log(json_string);
            console.log(e);
            RUR.world.create_empty_world();
            return;
        }
    } else {  // already parsed
        RUR.CURRENT_WORLD = json_string;
    }

    if (RUR.CURRENT_WORLD.robots !== undefined) {
        if (RUR.CURRENT_WORLD.robots[0] !== undefined) {
            RUR.robot.cleanup_objects(RUR.CURRENT_WORLD.robots[0]);
            body = RUR.CURRENT_WORLD.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body._orientation;
        }
    }

    // Backward compatibility following change done on Jan 5, 2016
    // top_tiles has been renamed solid_objects; to ensure compatibility of
    // worlds created prior to using solid_objects, we change the old name
    // following http://stackoverflow.com/a/14592469/558799
    // thus ensuring that if a new world is created from an old one,
    // it will have the new syntax.
    if (RUR.CURRENT_WORLD.top_tiles !== undefined) {
        Object.defineProperty(RUR.CURRENT_WORLD, "solid_objects",
            Object.getOwnPropertyDescriptor(RUR.CURRENT_WORLD, "top_tiles"));
        delete RUR.CURRENT_WORLD.top_tiles;
    }

    if (RUR.CURRENT_WORLD.background_image !== undefined) {
        RUR.BACKGROUND_IMAGE.src = RUR.CURRENT_WORLD.background_image;
        RUR.BACKGROUND_IMAGE.onload = function () {
            RUR.vis_world.draw_all();
        };
    } else {
        RUR.BACKGROUND_IMAGE.src = '';
    }

    if (RUR.CURRENT_WORLD.onload !== undefined) {
        eval_onload();
    }

    RUR.CURRENT_WORLD.small_tiles = RUR.CURRENT_WORLD.small_tiles || false;
    RUR.CURRENT_WORLD.rows = RUR.CURRENT_WORLD.rows || RUR.MAX_Y;
    RUR.CURRENT_WORLD.cols = RUR.CURRENT_WORLD.cols || RUR.MAX_X;
    RUR.vis_world.compute_world_geometry(RUR.CURRENT_WORLD.cols, RUR.CURRENT_WORLD.rows);

    $("#add-editor-to-world").prop("checked",
                                   RUR.CURRENT_WORLD.editor !== undefined);
    $("#add-library-to-world").prop("checked",
                                    RUR.CURRENT_WORLD.library !== undefined);

    if (RUR.CURRENT_WORLD.editor !== undefined &&
        RUR.CURRENT_WORLD.editor !== editor.getValue()) {
        RUR.world.dialog_update_editors_from_world.dialog("open");
        $("#update-editor-content").show();
    } else {
        $("#update-editor-content").hide();
    }
    if (RUR.state.programming_language === "python" &&
        RUR.CURRENT_WORLD.library !== undefined &&
        RUR.CURRENT_WORLD.library !== library.getValue()) {
        RUR.world.dialog_update_editors_from_world.dialog("open");
        $("#update-library-content").show();
    } else {
        $("#update-library-content").hide();
    }

    // make a clean (predictable) copy
    RUR.CURRENT_WORLD = RUR.world.editors_remove_default_values(RUR.CURRENT_WORLD);
    RUR._SAVED_WORLD = clone_world();
    // restore defaults everywhere for easier comparison when editing
    RUR.CURRENT_WORLD = RUR.world.editors_set_default_values(RUR.CURRENT_WORLD);
    RUR.world.update_editors(RUR.CURRENT_WORLD);

    if (RUR.state.editing_world) {
        edit_robot_menu.toggle();
    }
};

eval_onload = function () {
    try {
        eval(RUR.CURRENT_WORLD.onload);  // jshint ignore:line
    } catch (e) {
        RUR.show_feedback("#Reeborg-shouts",
            RUR.translate("Problem with onload code.") + "<br><pre>" +
            RUR.CURRENT_WORLD.onload + "</pre>");
        console.log("error in onload:", e);
    }
};

},{"./../constants.js":3,"./../create_editors.js":5,"./../exceptions.js":13,"./../robot.js":47,"./../state.js":52,"./../translator.js":54,"./../ui/edit_robot_menu.js":55,"./../visible_world.js":64,"./clone_world.js":66}],70:[function(require,module,exports){

require("./translator.js");
require("./constants.js");
require("./objects.js");
require("./robot.js");
require("./world.js");
require("./visible_world.js");
require("./exceptions.js");
require("./state.js");
require("./world_get.js");
require("./world_set.js");
require("./dialogs/create.js");
require("./listeners/canvas.js");
require("./create_editors.js");
require("./utils/supplant.js");

require("./world_set/add_object.js");
require("./world_set/add_goal_object.js");
require("./world_set/add_robot.js");

var edit_robot_menu = require("./ui/edit_robot_menu.js");
var dialog_add_object = require("./dialogs/add_object.js").dialog_add_object;
var dialog_give_object = require("./dialogs/give_object.js").dialog_give_object;
var dialog_goal_object = require("./dialogs/goal_object.js").dialog_goal_object;
var dialog_set_background_image = require("./dialogs/set_background_image.js").dialog_set_background_image;
var dialog_select_colour = require("./dialogs/select_colour.js").dialog_select_colour;


var filterInt = require("./utils/filterint.js").filterInt;
var identical = require("./utils/identical.js").identical;

RUR.we = {};   // we == World Editor

RUR.we.__give_to_robot = false;

RUR.we.edit_world = function  () {
    "use strict";
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    var value, split, root;
    split = RUR.we.edit_world_flag.split("-");
    root = split[0];
    value = split[1];
    switch (root) {
        case "robot":
            if (value == "place") {
                RUR.we.place_robot();
            }
            break;
        case "object":
            if (RUR.we.decorative_objects) {
                RUR.toggle_decorative_object_at_position(value);
            } else {
                RUR.we._add_object(value);
            }
            break;
        case "tile":
            RUR.we.toggle_tile(value);
            break;
        case "fill":
            RUR.we.fill_with_tile(value);
            break;
        case "solid_object":
            RUR.we.toggle_solid_object(value);
            break;
        case "world":
            if (value == "walls") {
                RUR.we._toggle_wall();
            }
            break;
        case "position":
            RUR.we.set_goal_position(value);
            break;
        case "goal":
            if (value == "wall") {
                RUR.we.toggle_goal_wall();
            } else {
                RUR.we._add_goal_objects(value);
            }
            break;
        default:
            break;
    }
    RUR.vis_world.refresh_world_edited();
};

RUR.we.alert_1 = function (txt) {
    $("#cmd-result").html(RUR.translate(txt)).effect("highlight", {color: "gold"}, 1500);
};
RUR.we.alert_2 = function (txt, value) {
    $("#cmd-result").html(RUR.translate(txt).supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
};

RUR.we.select = function (choice) {
    "use strict";
    var value, split, root;
    RUR.we.edit_world_flag = choice;
    split = choice.split("-");
    root = split[0];
    value = split[1];
    $(".edit-world-canvas").hide();
    $(".edit-goal-canvas").hide();
    $("#edit-goal-position").hide();
    $("#edit-world-objects").hide();
    $(".not-for-robot").hide();
    switch (root) {
        case "robot":
            switch (value) {
            case "place":
                RUR.we.alert_1("Click on world to move robot.");
                break;
            case "add":
                RUR.we.alert_1("Added robot.");
                RUR._add_robot();
                RUR.we.edit_world();
                edit_robot_menu.toggle();
                break;
            case "orientation":
                RUR.we.alert_1("Click on image to turn robot");
                $("#edit-world-turn").show();
                $("#random-orientation").show();
                break;
            case "objects":
                RUR.we.__give_to_robot = true;
                $("#edit-world-objects").show();
                $(".not-for-robot").hide();
                RUR.we.alert_1("Click on desired object below.");
                break;
            }
            break;
        case "decorative":
            RUR.we.decorative_objects = true;
            $("#edit-world-objects").show();
            RUR.we.__give_to_robot = false;
            RUR.we.alert_1("Click on desired object below.");
            break;
        case "background":
            dialog_set_background_image.dialog("open");
            break;
        case "world":
            switch (value) {
            case "objects":
                RUR.we.decorative_objects = false;
                $("#edit-world-objects").show();
                $(".not-for-robot").show();  // box
                RUR.we.__give_to_robot = false;
                RUR.we.alert_1("Click on desired object below.");
                break;
            case "tiles":
                $("#edit-tile").show();
                RUR.we.alert_1("Click on desired tile below.");
                break;
            case "fill_tiles":
                $("#fill-tile").show();
                RUR.we.alert_1("Click on desired tile below.");
                break;
            case "solid_objects":
                $("#edit-solid-object").show();
                RUR.we.alert_1("Click on desired object below.");
                break;
            case "walls":
                RUR.we.alert_1("Click on world to toggle walls.");
                break;
            }
            break;
        case "object":
            $("#edit-world-objects").show();
            if (RUR.we.__give_to_robot) {
                $(".not-for-robot").hide();
                RUR.we._give_objects_to_robot(value);
                RUR.we.edit_world_flag = '';
            } else {
                if (RUR.we.decorative_objects) {
                    $(".not-for-robot").show();
                }
                if (value == "box"){
                    RUR.we.alert_2("Click on world to add single object.", value);
                } else {
                    RUR.we.alert_2("Click on world to add object.", value);
                }
            }
            break;
        case "tile":
            $("#edit-tile").show();
            RUR.we.alert_2("Click on world to toggle tile.", value);
            break;
        case "fill":
            $("#fill-tile").show();
            RUR.we.alert_2("Click on world to fill with given tile.", value);
            break;
        case "solid_object":
            $("#edit-solid-object").show();
            RUR.we.alert_2("Click on world to toggle object.", value);
            break;
        case "position":
            RUR.we.alert_1("Click on world to set home position for robot.");
            break;
        case "goal":
            switch (value) {
            case "robot":
                $("#edit-goal-position").show();
                RUR.we.alert_1("Click on image desired to indicate the final position of the robot.");
                break;
            case "wall":
                RUR.we.alert_1("Click on world to toggle additional walls to build.");
                break;
            case "objects":
                $("#edit-goal-objects").show();
                RUR.we.alert_1("Click on desired goal object below.");
                break;
            default:
                $("#edit-goal-objects").show();
                if (value == "box"){
                RUR.we.alert_2("Click on world to set number of single goal objects.", value);
                } else {
                RUR.we.alert_2("Click on world to set number of goal objects.", value);
                }
                RUR.we.alert_2("Click on world to set number of goal objects.", value);
                break;
            }
        break;
        case "set":
            RUR.world_set.dialog_set_dimensions.dialog('open');
            break;
    }
};

RUR.we.toggle_editing_mode = function () {
    if (RUR.state.editing_world) {  // done editing
        $("#pre-code-tab").parent().hide();
        $("#post-code-tab").parent().hide();
        $("#description-tab").parent().hide();
        $("#onload-editor-tab").parent().hide();

        RUR.state.editing_world = false;
        RUR.state.code_evaluated = false;
        RUR.WALL_COLOR = "brown";
        RUR.SHADOW_WALL_COLOR = "#f0f0f0";
        RUR.vis_world.draw_all();
        try {
            localStorage.setItem("editor", editor.getValue());
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        RUR.CURRENT_WORLD = RUR.world.update_from_editors(RUR.CURRENT_WORLD);
        if (!identical(RUR.CURRENT_WORLD, RUR._SAVED_WORLD)) {
            $("#memorize-world").trigger('click');
        }
        $("#editor-tab").trigger('click');
    } else {

        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();

        edit_robot_menu.toggle();
        RUR.state.editing_world = true;
        RUR.WALL_COLOR = "black";
        RUR.SHADOW_WALL_COLOR = "#ccd";
        RUR.vis_world.draw_all();
        // RUR.CURRENT_WORLD = RUR.world.editors_set_default_values(RUR.CURRENT_WORLD);
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
};

record_id("edit-world", "EDIT WORLD");
record_id("edit-world-text", "EDIT WORLD EXPLAIN");
RUR.create_and_activate_dialogs( $("#edit-world"), $("#edit-world-panel"),
                                 {}, RUR.we.toggle_editing_mode);




RUR.we.place_robot = function () {
    "use strict";
    var position, world=RUR.CURRENT_WORLD, robot, arr=[], pos, present=false;
    position = RUR.calculate_grid_position();
    if (world.robots !== undefined){
        if (world.robots.length >0) {
            robot = world.robots[0];
            if (!robot.start_positions){
                robot.start_positions = [[robot.x, robot.y]];
            }
        } else {
            RUR._add_robot();
            robot = world.robots[0];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            robot.start_positions = [[robot.x, robot.y]];
            return;
        }
    }

    for (var i=0; i < robot.start_positions.length; i++){
        pos = robot.start_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
        } else {
            arr.push(pos);
            robot.x = pos[0];
            robot.y = pos[1];
        }
    }
    if (!present){
        arr.push(position);
        robot.x = position[0];
        robot.y = position[1];
    }

    if (arr.length===0){
        RUR.CURRENT_WORLD.robots = [];
        edit_robot_menu.toggle();
        return;
    }

    robot.start_positions = arr;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
};


RUR.we._give_objects_to_robot = function (specific_object){
    "use strict";

    RUR.state.specific_object = specific_object;
    $("#give-object-name").html(RUR.translate(specific_object));
    dialog_give_object.dialog("open");
};

RUR.we.turn_robot = function (orientation) {

    RUR.CURRENT_WORLD.robots[0]._orientation = orientation;
    RUR.CURRENT_WORLD.robots[0]._prev_orientation = orientation;
    RUR.vis_world.refresh_world_edited();
};

RUR.we.calculate_wall_position = function () {
    var ctx, x, y, orientation, remain_x, remain_y, del_x, del_y;
    x = RUR.mouse_x - $("#robot-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-canvas").offset().top;

    y = RUR.BACKGROUND_CANVAS.height - y;  // count from bottom

    x /= RUR.WALL_LENGTH;
    y /= RUR.WALL_LENGTH;
    remain_x = x - Math.floor(x);
    remain_y = y - Math.floor(y);

    // del_  denotes the distance to the closest wall
    if (Math.abs(1.0 - remain_x) < remain_x) {
        del_x = Math.abs(1.0 - remain_x);
    } else {
        del_x = remain_x;
    }

    if (Math.abs(1.0 - remain_y) < remain_y) {
        del_y = Math.abs(1.0 - remain_y);
    } else {
        del_y = remain_y;
    }

    x = Math.floor(x);
    y = Math.floor(y);

    if ( del_x < del_y ) {
        orientation = "east";
        if (remain_x < 0.5) {
            x -= 1;
        }
    } else {
        orientation = "north";
        if (remain_y < 0.5) {
            y -= 1;
        }
    }

    if (x < 1 ) {
        x = 1;
    } else if (x > RUR.COLS) {
        x = RUR.COLS;
    }
    if (y < 1 ) {
        y = 1;
    } else if (y > RUR.ROWS) {
        y = RUR.ROWS;
    }

    return [x, y, orientation];
};

RUR.we._toggle_wall = function () {
    var position, x, y, orientation;
    position = RUR.we.calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    RUR.we.toggle_wall(x, y, orientation);
};

RUR.we.toggle_wall = function (x, y, orientation) {
    var coords, index;
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "walls");
    if (RUR.CURRENT_WORLD.walls[coords] === undefined){
        RUR.CURRENT_WORLD.walls[coords] = [orientation];
    } else {
        index = RUR.CURRENT_WORLD.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.CURRENT_WORLD.walls[coords].push(orientation);
        } else {
            RUR.CURRENT_WORLD.walls[coords].splice(index, 1);
            if (RUR.CURRENT_WORLD.walls[coords].length === 0){
                delete RUR.CURRENT_WORLD.walls[coords];
            }
        }
    }
};



RUR.we.toggle_goal_wall = function () {
    var position, response, x, y, orientation, coords, index;
    position = RUR.we.calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "goal");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal, "walls");
    if (RUR.CURRENT_WORLD.goal.walls[coords] === undefined){
        RUR.CURRENT_WORLD.goal.walls[coords] = [orientation];
    } else {
        index = RUR.CURRENT_WORLD.goal.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.CURRENT_WORLD.goal.walls[coords].push(orientation);
        } else {
            RUR.CURRENT_WORLD.goal.walls[coords].splice(index, 1);
            if (Object.keys(RUR.CURRENT_WORLD.goal.walls[coords]).length === 0){
                delete RUR.CURRENT_WORLD.goal.walls[coords];
                if (Object.keys(RUR.CURRENT_WORLD.goal.walls).length === 0) {
                    delete RUR.CURRENT_WORLD.goal.walls;
                    if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0) {
                        delete RUR.CURRENT_WORLD.goal;
                    }
                }
            }
        }
    }
};

RUR.we._add_object = function (specific_object){
    "use strict";
    var position, x, y, query, tmp;
    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (specific_object == "box") {
        if (RUR.CURRENT_WORLD.objects !== undefined &&
            RUR.CURRENT_WORLD.objects[x+','+y] !== undefined &&
            RUR.CURRENT_WORLD.objects[x+','+y]["box"] == 1){  // jshint ignore:line
            RUR.add_object_at_position("box", x, y, 0);
        } else {
            RUR.add_object_at_position("box", x, y, 1);
        }
        return;
    }

    RUR.state.specific_object = specific_object;
    RUR.state.x = x;
    RUR.state.y = y;
    $("#add-object-name").html(RUR.translate(specific_object));
    dialog_add_object.dialog("open");
};

RUR.we._add_goal_objects = function (specific_object){
    "use strict";
    var position, x, y, coords, query;
    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    // TODO investigate potential bug; should toggle if box ...
    if (specific_object == "box") {
        if (RUR.CURRENT_WORLD.goal !== undefined &&
            RUR.CURRENT_WORLD.goal.objects !== undefined &&
            RUR.CURRENT_WORLD.goal.objects[coords] !== undefined &&
            RUR.CURRENT_WORLD.goal.objects[coords].box ==1){
                RUR.add_goal_object_at_position("box", x, y, 0);
        } else {
            RUR.add_goal_object_at_position("box", x, y, 1);
        }
        return;
    }

    RUR.state.specific_object = specific_object;
    RUR.state.x = x;
    RUR.state.y = y;
    $("#goal-object-name").html(RUR.translate(specific_object));
    dialog_goal_object.dialog("open");
};




RUR.we.set_goal_position = function (home){
    // will remove the position if clicked again.
    "use strict";
    var position, world=RUR.CURRENT_WORLD, robot, arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);

    RUR._ensure_key_exists(world, "goal");
    goal = world.goal;

    if (goal.possible_positions === undefined) {
        RUR._ensure_key_exists(goal, "possible_positions");
        if (goal.position !== undefined) {
            goal.possible_positions = [[goal.position.x, goal.position.y]];
        } else {
            RUR._ensure_key_exists(goal, "position");
        }
    }

    goal.position.image = home;

    position = RUR.calculate_grid_position();
    goal.position.x = position[0];
    goal.position.y = position[1];

    for(var i=0; i<goal.possible_positions.length; i++) {
        pos = goal.possible_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
            break;
        } else {
            arr.push(pos);
            goal.position.x = pos[0];
            goal.position.y = pos[1];
        }
    }

    if (!present){
        arr.push(position);
        goal.position.x = position[0];
        goal.position.y = position[1];
    }
    goal.possible_positions = arr;

    if (arr.length === 0) {
        delete RUR.CURRENT_WORLD.goal.position;
        delete RUR.CURRENT_WORLD.goal.possible_positions;
        if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0) {
            delete RUR.CURRENT_WORLD.goal;
        }
        $("#edit-world-turn").hide();
    }
};

RUR.we.toggle_tile = function (tile){
    // will remove the position if clicked again with tile of same type.
    "use strict";
    var x, y, position, coords, index;

    if (!tile) {  // if we cancel the dialog
        return;
    } else if (tile === "colour") {
        RUR._CALLBACK_FN = RUR.we.toggle_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    if (RUR.CURRENT_WORLD.tiles[coords] === undefined ||
        RUR.CURRENT_WORLD.tiles[coords] != tile){
        RUR.CURRENT_WORLD.tiles[coords] = tile;
    } else {
        delete RUR.CURRENT_WORLD.tiles[coords];
    }
};

RUR.we.fill_with_tile = function (tile) {
    var x, y, coords;

    if (!tile) {    // if we cancel the dialog
        return;
    } else if (tile === "colour") {
        RUR._CALLBACK_FN = RUR.we.fill_with_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    for (x = 1; x <= RUR.COLS; x++) {
        for (y = 1; y <= RUR.ROWS; y++) {
            coords = x + "," + y;
            RUR.CURRENT_WORLD.tiles[coords] = tile;
        }
    }
};


RUR.we.toggle_solid_object = function (obj){
    // will remove the position if clicked again with object of same type.
    "use strict";
    var x, y, position;

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.world_get.solid_objects_at_position(x, y)[obj] !== undefined) {
        RUR.world_set.add_solid_object(obj, x, y, 0);
    } else {
        RUR.world_set.add_solid_object(obj, x, y, 1);
    }
};


// mouse clicks also requested in listeners/canvas.js
$("#robot-canvas").on("click", function (evt) {
    if (RUR.state.editing_world && RUR.we.edit_world_flag !== undefined) {
        RUR.we.edit_world();
    }
    RUR.world_get.world_info();
});

},{"./constants.js":3,"./create_editors.js":5,"./dialogs/add_object.js":7,"./dialogs/create.js":8,"./dialogs/give_object.js":9,"./dialogs/goal_object.js":10,"./dialogs/select_colour.js":11,"./dialogs/set_background_image.js":12,"./exceptions.js":13,"./listeners/canvas.js":22,"./objects.js":37,"./robot.js":47,"./state.js":52,"./translator.js":54,"./ui/edit_robot_menu.js":55,"./utils/filterint.js":58,"./utils/identical.js":59,"./utils/supplant.js":62,"./visible_world.js":64,"./world.js":65,"./world_get.js":71,"./world_set.js":74,"./world_set/add_goal_object.js":75,"./world_set/add_object.js":76,"./world_set/add_robot.js":77}],71:[function(require,module,exports){
/* Obtain specific information about the world, either at a given
   position, or for the world in general.
*/

require("./objects.js");
require("./dialogs/create.js");
require("./listeners/canvas.js");
require("./utils/supplant.js");

RUR.world_get = {};

RUR.world_get.is_wall_at = function (coords, orientation) {
    if (RUR.CURRENT_WORLD.walls === undefined) {
        return false;
    }
    if (RUR.CURRENT_WORLD.walls[coords] !== undefined){
        if (RUR.CURRENT_WORLD.walls[coords].indexOf(orientation) !== -1) {
            return true;
        }
    }
    return false;
};


RUR.world_get.tile_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.CURRENT_WORLD.tiles === undefined) return false;
    if (RUR.CURRENT_WORLD.tiles[coords] === undefined) return false;
    return RUR.TILES[RUR.CURRENT_WORLD.tiles[coords]];
};

RUR.world_get.pushable_object_at_position = function(x, y) {
    "use strict";
    var objects_here, obj_here, obj_type, coords = x + ',' + y;
    if (RUR.CURRENT_WORLD.objects === undefined) return false;
    if (RUR.CURRENT_WORLD.objects[coords] === undefined) return false;
    objects_here = RUR.CURRENT_WORLD.objects[coords];

    for (obj_type in objects_here) {
        if (objects_here.hasOwnProperty(obj_type)) {
            if (RUR.OBJECTS[obj_type].pushable) {
                return obj_type;
            }
        }
    }
    return false;
};

RUR.world_get.solid_objects_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.CURRENT_WORLD.solid_objects === undefined) return false;
    if (RUR.CURRENT_WORLD.solid_objects[coords] === undefined) return false;
    return RUR.CURRENT_WORLD.solid_objects[coords];
};

RUR.world_get.object_at_robot_position = function (robot, obj) {
    return object_of_type_here(robot, obj, RUR.CURRENT_WORLD.objects);
};

RUR.world_get.decorative_object_at_robot_position = function (robot, obj) {
    return object_of_type_here(robot, obj, RUR.CURRENT_WORLD.decorative_objects);
};


function object_of_type_here (robot, obj, object_type) {
    // object_type == RUR.CURRENT_WORLD.objects or RUR.CURRENT_WORLD.decorative_objects
    var obj_here, obj_type, all_objects;
    var coords = robot.x + "," + robot.y;

    if (object_type === undefined ||
        object_type[coords] === undefined) {
        return [];
    }

    obj_here =  object_type[coords];
    all_objects = [];

    for (obj_type in obj_here) {
        if (obj_here.hasOwnProperty(obj_type)) {
            if (obj !== undefined && obj_type == RUR.translate_to_english(obj)) {
                return [RUR.translate(obj_type)];
            }
            all_objects.push(RUR.translate(obj_type));
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
}

RUR.world_get.world_map = function () {
    return JSON.stringify(RUR.CURRENT_WORLD, null, 2);
};

RUR.world_get.world_info = function (no_grid) {
    "use strict";
    // shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // enabled in zz_dr_onclick.js
    var position, tile, obj, information, x, y, coords, obj_here, obj_type, goals;
    var topic, no_object, r, robot, robots;
    var tiles, tilename, fence_noted = false;

    information = "";

    if (RUR.CURRENT_WORLD.description) {
        information +="<b>" + RUR.translate("Description") + "</b><br>" + RUR.CURRENT_WORLD.description + "<hr>";
    }

    if (!no_grid) {
        position = RUR.calculate_grid_position();
        x = position[0];
        y = position[1];
        coords = x + "," + y;
        if (!isNaN(x)){
            information += "x = " + x + ", y = " + y;
        }
    }

    tile = RUR.world_get.tile_at_position(x, y);
    topic = true;
    if (tile){
        if (RUR.translate(tile.info)) {
            if (topic){
                topic = false;
                information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
            }
            information += "<br>" + RUR.translate(tile.info);
        }
    }

    tiles = RUR.world_get.solid_objects_at_position(x, y);
    if (tiles) {
        for (tilename in tiles) {
            tile = RUR.SOLID_OBJECTS[tilename];
            if (RUR.translate(tile.info)){
                if (topic){
                    topic = false;
                    information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
                }
                if (tile.name == "fence") {
                    if (!fence_noted) {
                        fence_noted = true;
                        information += "<br>" + RUR.translate(tile.info);
                    }
                } else {
                    information +=  "<br>" + RUR.translate(tile.info);
                }
            }
        }
    }

    obj = RUR.CURRENT_WORLD.objects;
    topic = true;
    if (obj !== undefined && obj[coords] !== undefined){
        obj_here = obj[coords];
        for (obj_type in obj_here) {
            if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Objects found here:") + "</b>";
                    }
               information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
            }
        }
    }

    goals = RUR.CURRENT_WORLD.goal;
    if (goals !== undefined){
        obj = goals.objects;
        topic = true;
        if (obj !== undefined && obj[coords] !== undefined){
            obj_here = obj[coords];
            for (obj_type in obj_here) {
                if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
                    }
                   information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
                }
            }
        }
    }


    if (goals !== undefined){
        if (goals.walls !== undefined && coords) {
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built east of this location.");
                }
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built north of this location.");
                }
            }
            x -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built west of this location.");
                }
            }
            x += 1;
            y -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built south of this location.");
                }
            }
            y += 1;
            coords = x + "," + y;
        }
    }

    robots = RUR.CURRENT_WORLD.robots;
    if (robots !== undefined && robots.length !== undefined){
        for (r=0; r<robots.length; r++){
            robot = robots[r];
            x = robot.x;
            y = robot.y;
            if (robot.start_positions !== undefined && robot.start_positions.length > 1){
                x = RUR.translate("random location");
                y = '';
            }
            no_object = true;
            for (obj in robot.objects){
                if (robot.objects.hasOwnProperty(obj)) {
                    if (no_object) {
                        no_object = false;
                        information += "<br><br><b>" + RUR.translate("A robot located here carries:").supplant({x:x, y:y}) + "</b>";
                    }
                    information += "<br>" + RUR.translate(obj) + ":" + robot.objects[obj];
                }
            }
            if (no_object){
                information += "<br><br><b>" + RUR.translate("A robot located here carries no objects.").supplant({x:x, y:y}) + "</b>";
            }
        }
    }


    goals = RUR.CURRENT_WORLD.goal;
    if (goals !== undefined &&
         (goals.possible_positions !== undefined || goals.position !== undefined)){
        if (topic){
            topic = false;
            information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
        }
        if (goals.possible_positions !== undefined && goals.possible_positions.length > 2) {
            information += "<br>" + RUR.translate("The final required position of the robot will be chosen at random.");
        } else {
            information += "<br>" + RUR.translate("The final position of the robot must be (x, y) = ") +
                           "(" + goals.position.x + ", " + goals.position.y + ")";
        }
    }

    $("#World-info").html(information);
};

RUR.create_and_activate_dialogs( $("#world-info-button"), $("#World-info"),
                                 {height:300, width:600}, RUR.world_get.world_info);

},{"./dialogs/create.js":8,"./listeners/canvas.js":22,"./objects.js":37,"./utils/supplant.js":62}],72:[function(require,module,exports){

require("./visible_world.js");
require("./constants.js");

RUR.world_init = {};

// Returns a random integer between min and max (both included)
randint = function (min, max, previous) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// assigns initial values
RUR.world_init.set = function () {
    "use strict";
    var coords, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};

   // First, deal with objects

    if (RUR.CURRENT_WORLD.objects !== undefined){
        objects = RUR.CURRENT_WORLD.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb.toString().indexOf("-") != -1){
                            range = nb.split("-");
                            nb = randint(parseInt(range[0], 10), parseInt(range[1], 10));
                            if (nb !== 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) !== 0) {
                                total_nb_objects[obj] = parseInt(nb, 10);
                            }
                        } else {
                            total_nb_objects[obj] += parseInt(nb, 10);
                        }
                    }
                }
                if (Object.keys(RUR.CURRENT_WORLD.objects[coords]).length === 0){
                    delete RUR.CURRENT_WORLD.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.objects !== undefined){
        objects = RUR.CURRENT_WORLD.goal.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb == "all") {
                            try {
                                if (total_nb_objects[obj] !== undefined) {
                                    objects_here[obj] = total_nb_objects[obj];
                                } else {
                                    delete objects[coords][obj];
                                }
                            } catch (e) {
                                $("#world-info-button").click();
                                $("#World-info").html("<b>Warning</b> Trying to assign a goal when no corresponding objects are found in the world.");
                            }
                        }
                    }
                }
                if (Object.keys(RUR.CURRENT_WORLD.goal.objects[coords]).length === 0){
                    delete RUR.CURRENT_WORLD.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    if (RUR.CURRENT_WORLD.robots !== undefined && RUR.CURRENT_WORLD.robots.length == 1){
        robot = RUR.CURRENT_WORLD.robots[0];
        if (robot.start_positions !== undefined) {
            position = robot.start_positions[randint(0, robot.start_positions.length-1)];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            delete robot.start_positions;
        }
        if (robot._orientation == -1){
            RUR.CURRENT_WORLD.robots[0]._orientation = randint(0, 3);
            RUR.CURRENT_WORLD.robots[0]._prev_orientation = RUR.CURRENT_WORLD.robots[0]._orientation;
        }
    }

    // then final position for robot

    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.possible_positions !== undefined &&
        RUR.CURRENT_WORLD.goal.possible_positions.length > 1) {
        goal = RUR.CURRENT_WORLD.goal;
        position = goal.possible_positions[randint(0, goal.possible_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_positions;
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.vis_world.draw_goal();
    }
    RUR.vis_world.refresh();
};

},{"./constants.js":3,"./visible_world.js":64}],73:[function(require,module,exports){

/*  Purpose of this file: abstract handling of menus so that all jQuery
    dependencies (and possibly obscure syntax in some cases) can be pulled
    away from other files.

    The world menu is currently an html select element with
    id = select-world.  Doing a global search for "#select-world" should
    only find items in this file.
*/

RUR.world_select = {};

RUR.world_select.empty_menu = function () {
    $("#select-world").html('');
};

RUR.world_select.set_default = function () {
    document.getElementById("select-world").selectedIndex = 0;
    $("#select-world").change();
};

RUR.world_select.set_url = function (url) {
    $('#select-world').val(url);
    $("#select-world").change();
};

RUR.world_select.get_selected = function () {
    "use strict";
    var select, index, url, shortname;
    select = document.getElementById("select-world");
    index = select.selectedIndex;
    try {
        url = select.options[index].value;
        shortname = select.options[index].text;
    } catch (e) {
        url = select.options[0].value;
        shortname = select.options[0].text;
    }
    return {url:url, shortname:shortname};
};

RUR.world_select.url_from_shortname = function (shortname) {
    // if exists, returns the corresponding url
    "use strict";
    var i, select;
    select = document.getElementById("select-world");
    shortname = shortname.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].text.toLowerCase() === shortname) {
            return select.options[i].value;
        }
    }
    return undefined;
};

RUR.world_select.replace_shortname = function (url, shortname) {
    "use strict";
    var i, select;
    select = document.getElementById("select-world");
    url = url.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].value.toLowerCase() === url) {
            select.options[i].text = shortname;
            return true;
        }
    }
    return false;
};

RUR.world_select.append_world = function (arg) {
    "use strict";
    var option_elt, url, shortname;
    url = arg.url;

    if (arg.shortname !== undefined) {
        shortname = arg.shortname;
    } else {
        shortname = url;
    }

    // allow for special styling of any url containing the string "menu".
    if (url.indexOf('menu') != -1) {
        option_elt = '<option class="select-menu"></option>';
    } else if (arg.local_storage !== undefined){
        option_elt = '<option class="select-local-storage"></option>';
    } else {
        option_elt = '<option></option>';
    }
    // Append only if new world.
    if (!RUR.world_select.replace_shortname(url, shortname)) {
        $('#select-world').append( $(option_elt).val(url).html(shortname));
    }
};

},{}],74:[function(require,module,exports){
/* In some ways, this is the counterpart of world_get.js
*/

require("./objects.js");
require("./exceptions.js");
require("./visible_world.js");
require("./recorder.js");

RUR.world_set = {};

var set_dimension_form;




RUR.world_set.add_solid_object = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;

    coords = x + "," + y;
    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "solid_objects");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.solid_objects, coords);

    try {
        tmp = parseInt(nb, 10);
        nb = tmp;
    } catch (e) {}

    if (nb === 0) {
        delete RUR.CURRENT_WORLD.solid_objects[coords][specific_object];
        if (Object.keys(RUR.CURRENT_WORLD.solid_objects[coords]).length === 0){
            delete RUR.CURRENT_WORLD.solid_objects[coords];
        }
        if (Object.keys(RUR.CURRENT_WORLD.solid_objects).length === 0){
            delete RUR.CURRENT_WORLD.solid_objects;
        }
    } else {
        RUR.CURRENT_WORLD.solid_objects[coords][specific_object] = nb;
    }
};



RUR.world_set.remove_all = function () {
    RUR.CURRENT_WORLD.robots = [];
    trim_world(0,0, RUR.COLS, RUR.ROWS);
};

function trim_world (min_x, min_y, max_x, max_y) {
    var x, y, coords;

    for (x = min_x+1; x <= max_x; x++) {
        for (y = 1; y <= max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    for (x = 1; x <= max_x; x++) {
        for (y = min_y+1; y <= max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.possible_positions !== undefined) {
            delete RUR.CURRENT_WORLD.goal.possible_positions;
            delete RUR.CURRENT_WORLD.goal.position;
            RUR.show_feedback("#Reeborg-shouts",
                                 RUR.translate("WARNING: deleted final positions choices while resizing world!"));
        }
    }
}

function remove_all_at_location (coords) {
    // trading efficiency for clarity
    if (RUR.CURRENT_WORLD.tiles !== undefined) {
        if (RUR.CURRENT_WORLD.tiles[coords] !== undefined){
            delete RUR.CURRENT_WORLD.tiles[coords];
        }
    }
    if (RUR.CURRENT_WORLD.solid_objects !== undefined) {
        if (RUR.CURRENT_WORLD.solid_objects[coords] !== undefined){
            delete RUR.CURRENT_WORLD.solid_objects[coords];
        }
    }
    if (RUR.CURRENT_WORLD.objects !== undefined) {
        if (RUR.CURRENT_WORLD.objects[coords] !== undefined){
            delete RUR.CURRENT_WORLD.objects[coords];
        }
    }
    if (RUR.CURRENT_WORLD.walls !== undefined) {
        if (RUR.CURRENT_WORLD.walls[coords] !== undefined){
            delete RUR.CURRENT_WORLD.walls[coords];
        }
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.objects !== undefined) {
            if (RUR.CURRENT_WORLD.goal.objects[coords] !== undefined){
                delete RUR.CURRENT_WORLD.goal.objects[coords];
            }
        }
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.walls !== undefined) {
            if (RUR.CURRENT_WORLD.goal.walls[coords] !== undefined){
                delete RUR.CURRENT_WORLD.goal.walls[coords];
            }
        }
    }
}

RUR.world_set.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    //modal: true,
    buttons: {
        OK: function () {
            set_dimension();
        },
        Cancel: function() {
            RUR.world_set.dialog_set_dimensions.dialog("close");
        }
    },
    close: function() {
        set_dimension_form[0].reset();
    }
});
function set_dimension () {
    "use strict";
    var max_x, max_y;
    max_x = parseInt($("#input-max-x").val(), 10);
    max_y = parseInt($("#input-max-y").val(), 10);
    RUR.CURRENT_WORLD.small_tiles = $("#use-small-tiles").prop("checked");

    trim_world(max_x, max_y, RUR.COLS, RUR.ROWS);   // remove extra objects
    RUR.vis_world.compute_world_geometry(max_x, max_y);
    RUR.world_set.dialog_set_dimensions.dialog("close");
    return true;
}
set_dimension_form = RUR.world_set.dialog_set_dimensions.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_dimension();
});

},{"./exceptions.js":13,"./objects.js":37,"./recorder.js":44,"./visible_world.js":64}],75:[function(require,module,exports){
require("./../exceptions.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");
require("./../translator.js");

/** @function add_goal_object
* @memberof RUR
* @instance
* @summary This function sets a specified quantity of a given object
* as a goal at a certain location.
* By "object" we mean a type of object that can be taken or put down by Reeborg.
*
* @desc Cette fonction spécifie la quantité d'un certain type d'objet qui doit être
* mis comme but à un endroit donné.
* Par "objet", on entend ici un objet qui peut être transporté ou déposé par Reeborg.
*
* @param {string} specific_object The name of the object type ; e.g. "token" <br>
*                        _Le nom du type de l'objet; par exemple, "jeton"._
* @param {integer} x - Position of the object
*                    <br> _position de l'objet_
* @param {integer} y - Position of the object
*                    <br> _position de l'objet_
* @param {integer} nb - Number of desired objects at that location;
*           a value of zero is used to remove any such goal set.
*           <br> _Nombre d'objets désiré à cet endroit;
*  une valeur de zéro est utilisée pour supprimer un but semblable pré-existant._
*
*/
RUR.add_goal_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords;

    if (RUR.KNOWN_OBJECTS.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "goal");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal, "objects");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal.objects, coords);
    if (nb === 0) {
        try {
            delete RUR.CURRENT_WORLD.goal.objects[coords][specific_object];
        } catch (e) {}

        if (Object.keys(RUR.CURRENT_WORLD.goal.objects[coords]).length === 0){
            delete RUR.CURRENT_WORLD.goal.objects[coords];
            if (Object.keys(RUR.CURRENT_WORLD.goal.objects).length === 0){
                delete RUR.CURRENT_WORLD.goal.objects;
                if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0){
                    delete RUR.CURRENT_WORLD.goal;
                }
            }
        }
    } else {
        RUR.CURRENT_WORLD.goal.objects[coords][specific_object] = nb;
    }
};

},{"./../exceptions.js":13,"./../translator.js":54,"./../utils/key_exist.js":60,"./../utils/supplant.js":62}],76:[function(require,module,exports){
require("./../exceptions.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");
require("./../translator.js");

/** @function add_object_at_position
 * @memberof RUR
 * @instance
 * @summary This function sets a specified quantity of a given object
 * at a certain location.
 * By "object" we mean a type of object that can be taken or put down by Reeborg.
 *
 * @desc Cette fonction spécifie la quantité d'un certain type d'objet qui doit être
 * mis à un endroit donné.
 * Par "objet", on entend ici un objet qui peut être transporté ou déposé par Reeborg.
 *
 * @param {string} specific_object The name of the object type ; e.g. "token" <br>
 *                        _Le nom du type de l'objet; par exemple, "jeton"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *           <br> _Nombre d'objets à cet endroit;
 *           une valeur de zéro est utilisée pour supprimer les objets._
 *
 */
RUR.add_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords, cw;
    if (RUR.KNOWN_OBJECTS.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;
    RUR._ensure_key_exists(cw, "objects");
    RUR._ensure_key_exists(cw.objects, coords);
    if (nb !== 0) {
        cw.objects[coords][specific_object] = nb;
    } else {
        try {
            delete cw.objects[coords][specific_object];
        } catch (e) {}
        if (Object.keys(cw.objects[coords]).length === 0){
            delete cw.objects[coords];
        }
    }
};

},{"./../exceptions.js":13,"./../translator.js":54,"./../utils/key_exist.js":60,"./../utils/supplant.js":62}],77:[function(require,module,exports){
require("./../recorder/record_frame.js");


RUR._add_robot = function (robot) {
    if (RUR.CURRENT_WORLD.robots === undefined){
        RUR.CURRENT_WORLD.robots = [];
    }
    RUR.CURRENT_WORLD.robots.push(robot);
    RUR.record_frame();
};

},{"./../recorder/record_frame.js":45}],78:[function(require,module,exports){
require("./../exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");

/** @function give_object_to_robot
 * @memberof RUR
 * @instance
 * @summary Give a specified number of object to a robot (body). If the robot,
 *     is not specified, the default robot is used.
 *
 * @desc Donne un nombre d'objet à transporter par le robot (robot.body).
 *    Si le robot n'est pas spécifié, le robot par défaut est utilisé.
 *
 * @param {string} obj The name of the object type ; e.g. "token" <br>
 *                        _Le nom du type de l'objet; par exemple, "jeton"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *           <br> _Nombre d'objets à cet endroit;
 *           une valeur de zéro est utilisée pour supprimer les objets._
 * @param {robot.body} robot - Optional argument
 *                    <br> _argument optionnel_
 */

RUR.give_object_to_robot = function (obj, nb, robot) {
    var _nb, translated_arg = RUR.translate_to_english(obj);

    if (RUR.KNOWN_OBJECTS.indexOf(translated_arg) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: obj}));
    }

    obj = translated_arg;
    if (robot === undefined){
        robot = RUR.CURRENT_WORLD.robots[0];
    }
    RUR._ensure_key_exists(robot, "objects");

    _nb = filterInt(nb);
    if (_nb >= 0) {
        if (_nb !== 0) {
            robot.objects[obj] = _nb;
        } else if (robot.objects[obj] !== undefined) {
            delete robot.objects[obj];
        }
    } else {
        RUR.show_feedback("#Reeborg-shouts", nb + RUR.translate(" is not a valid value!"));
    }
};

},{"./../exceptions.js":13,"./../translator.js":54,"./../utils/key_exist.js":60}],79:[function(require,module,exports){
require("./../world/create_empty.js");
require("./../visible_robot.js");
require("./../visible_world.js");
var clone_world = require("./../world/clone_world.js").clone_world;

exports.reset_world = reset_world = function () {
    if (RUR.state.editing_world){
        return;
    }
    RUR.CURRENT_WORLD = clone_world(RUR._SAVED_WORLD);
    RUR.vis_robot.set_trace_style("default");
    RUR.MAX_STEPS = 1000;
    RUR.vis_world.draw_all();
};

reset_world();

},{"./../visible_robot.js":63,"./../visible_world.js":64,"./../world/clone_world.js":66,"./../world/create_empty.js":67}],80:[function(require,module,exports){
RUR.en = {};
RUR.en_to_en = {};

RUR.en["SITE NAME"] = "Reeborg's World";
RUR.en["WORLD INFO"] = "World Info";
RUR.en["EDITOR VISIBLE BLOCKLY"] = "Keep editor visible";

RUR.en["apple"] = "apple";
RUR.en_to_en["apple"] = "apple";
RUR.en["banana"] = "banana";
RUR.en_to_en["banana"] = "banana";
RUR.en["box"] = "box";
RUR.en_to_en["box"] = "box";
RUR.en["bridge"] = "bridge";
RUR.en_to_en["bridge"] = "bridge";
RUR.en["carrot"] = "carrot";
RUR.en_to_en["carrot"] = "carrot";
RUR.en["daisy"] = "daisy";
RUR.en_to_en["daisy"] = "daisy";
RUR.en["dandelion"] = "dandelion";
RUR.en_to_en["dandelion"] = "dandelion";
RUR.en["leaf"] = "leaf";
RUR.en_to_en["leaf"] = "leaf";
RUR.en["orange"] = "orange";
RUR.en_to_en["orange"] = "orange";
RUR.en.square = "square";
RUR.en_to_en["square"] = "square";
RUR.en.star = "star";
RUR.en_to_en["star"] = "star";
RUR.en["strawberry"] = "strawberry";
RUR.en_to_en["strawberry"] = "strawberry";
RUR.en.token = "token";
RUR.en_to_en["token"] = "token";
RUR.en.triangle = "triangle";
RUR.en_to_en["triangle"] = "triangle";
RUR.en["tulip"] = "tulip";
RUR.en_to_en["tulip"] = "tulip";

RUR.en["Problem with onload code."] = "Invalid Javascript onload code; contact the creator of this world.";
RUR.en["# from library import *"] = "# 'from library import *' in Python Code is required to use\n# the code in this library. \n\n";
RUR.en.move = "move";

RUR.en["Too many steps:"] = "Too many steps: {max_steps}";
RUR.en["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg is at the correct x position.</li>";
RUR.en["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg is at the wrong x position.</li>";
RUR.en["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg is at the correct y position.</li>";
RUR.en["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg is at the wrong y position.</li>";
RUR.en["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>All objects are at the correct location.</li>";
RUR.en["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>One or more objects are not at the correct location.</li>";
RUR.en["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>All walls have been built correctly.</li>";
RUR.en["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>One or more walls missing or built at wrong location.</li>";
RUR.en["Last instruction completed!"] = "Last instruction completed!";
RUR.en["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>done()</code> executed.</p>";

RUR.en["Unknown object"] = "Unknown object: {obj}";
RUR.en["No object found here"] = "No {obj} found here!";
RUR.en["object"] = "object";
RUR.en["I don't have any object to put down!"] = "I don't have any {obj} to put down!";
RUR.en["There is already a wall here!"] = "There is already a wall here!";
RUR.en["Ouch! I hit a wall!"] = "Ouch! I hit a wall!";
RUR.en["Done!"] = "Done!";
RUR.en["There is no position as a goal in this world!"] = "There is no position as a goal in this world!";
RUR.en["There is no goal in this world!"] = "There is no goal in this world!";
RUR.en["I carry too many different objects. I don't know which one to put down!"] = "I carry too many different objects. I don't know which one to put down!";
RUR.en["Many objects are here; I do not know which one to take!"] = "Many different objects are here; I do not know which one to take!";

RUR.en.east = "east";
RUR.en.north = "north";
RUR.en.west = "west";
RUR.en.south = "south";
RUR.en["Unknown orientation for robot."] = "Unknown orientation for robot.";

RUR.en["World selected"] = "World {world} selected";
RUR.en["Could not find world"] = "Could not find world {world}";
RUR.en["Object names"] = " library, token, star, triangle, square, etc.";

RUR.en["Invalid world file."] = "Invalid world file.";
RUR.en["PERMALINK"] = "PERMALINK";
RUR.en["Could not find link: "] = "Could not find link: ";

RUR.en["Click on world to move robot."] = "Click on world to add or remove possible starting positions for Reeborg.";
RUR.en["Added robot."] = "Added Reeborg.";
RUR.en["Click on image to turn robot"] = "Click on image to turn Reeborg";
RUR.en["Robot now has tokens."] = "Reeborg now has {x_tokens} tokens.";
RUR.en["Click on world to add object."] = "Click on world to set number of {obj}.";
RUR.en["Click on desired object below."] = "Click on desired object below.";
RUR.en["Click on world to toggle walls."] = "Click on world to toggle walls.";
RUR.en["Click on world to set home position for robot."] = "Click on world to add/remove possible final positions for robot.";
RUR.en["Click on world to toggle additional walls to build."] = "Click on world to toggle additional walls to build.";
RUR.en["Click on desired goal object below."] = "Click on desired goal object below.";
RUR.en["Click on world to set number of goal objects."] = "Click on world to set number of goal {obj}.";
RUR.en["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Enter number of tokens for Reeborg to carry.";
RUR.en[" is not a valid value!"] = " is not a valid value!";
RUR.en["Enter number of objects desired at that location."] = "Click on world to set number {obj}.";
RUR.en["Objects found here:"] = "Objects found here:";
RUR.en["Description"] = "Description";
RUR.en["A robot located here carries no objects."] = "A robot located at {x},{y} carries no objects.";
RUR.en["Goal to achieve:"] = "Goal to achieve:";
RUR.en["A robot located here carries:"] = "A robot located at {x},{y} carries:";
RUR.en["random location"] = "random location";
RUR.en["Enter number of objects to give to robot."] = "Enter number of {obj} to give to robot.";
RUR.en["Special information about this location:"] = "Special information about this location:";
RUR.en["Click on world to toggle tile."] = "Click on world to toggle {obj} tile.";
RUR.en["Click on desired tile below."] = "Click on desired tile below.";
RUR.en["mud"] = "mud";
RUR.en["water"] = "water";
RUR.en["grass"] = "grass";
RUR.en["gravel"] = "gravel";
RUR.en["ice"] = "ice";
RUR.en["A wall must be built east of this location."] = "A wall must be built east of this location.";
RUR.en["A wall must be built north of this location."] = "A wall must be built north of this location.";
RUR.en["A wall must be built west of this location."] = "A wall must be built west of this location.";
RUR.en["A wall must be built south of this location."] = "A wall must be built south of this location.";
RUR.en["The final required position of the robot will be chosen at random."] = "The final required position of the robot will be chosen at random.";
RUR.en["The final position of the robot must be (x, y) = "] = "The final position of the robot must be (x, y) = ";
RUR.en["Click on world to fill with given tile."] = "Click on world to fill with given tile.";
RUR.en["Click on desired object below."] = "Click on desired object below.";
RUR.en["Enter url of image to use as background."] = "Enter url of image to use as background.";
RUR.en["Replace editor content"] = "Do you wish to replace your editor code by that provided by the creator of this world?";
RUR.en["Replace library content"] = "Do you wish to replace your library code by that provided by the creator of this world?";
RUR.en["colour"] = "colour";

RUR.en["Name already exist; confirm that you want to replace its content."] = "Name already exist; confirm that you want to replace its content.";
RUR.en["No such world!"] = "No such world!";
RUR.en["Enter world name to save"] = "Enter world name to save; names in use: ";
RUR.en["Enter world name to delete"] = "Enter world name to delete; existing worlds: ";
RUR.en["Delete "] = "Delete ";

RUR.en["Error found at or near line {number}."] = "Error found at or near line {number}.";
RUR.en["<br>Perhaps a missing colon is the cause."] = "<br>Perhaps a missing colon is the cause.";
RUR.en["<br>Perhaps you forgot to add parentheses ()."] = "<br>Perhaps you forgot to add parentheses ().";
RUR.en["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Perhaps you misspelled a word or forgot to define a function or a variable.";

RUR.en["I'm stuck in mud."] = "I'm stuck in mud.";
RUR.en["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.";
RUR.en["I'm slipping on ice!"] = "I'm slipping on ice!";
RUR.en["Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."] = "Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.";
RUR.en["Grass: usually safe."] = "Grass: usually safe.";
RUR.en["Gravel: usually safe."] = "Gravel: usually safe.";
RUR.en["I'm in water!"] = "I'm in water!";
RUR.en["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.";
RUR.en["green_home_tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green_home_tile: Reeborg <b>can</b> detect this tile using at_goal().";
RUR.en["Crash!"] = "Crash!";
RUR.en["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.";
RUR.en["I hit a fence!"] = "I hit a fence!";
RUR.en["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
RUR.en["Bridge:"] = "Bridge: ";
RUR.en["Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Reeborg <b>can</b> detect this and will know that it allows safe passage over water.";

RUR.en["Something is blocking the way!"] = "Something is blocking the way!";
RUR.en["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>can</b> detect this using at_goal().";
RUR.en["green home tile:"] = "green home tile:";
RUR.en["home:"] = "home:";
RUR.en["racing flag:"] = "racing flag:";
RUR.en["house:"] = "house:";

RUR.en["fence_right"] = "fence";
RUR.en["fence_left"] = "fence";
RUR.en["fence_double"] = "fence";
RUR.en["fence_vertical"] = "fence";

RUR.en["Local variables"] = "Local variables";
RUR.en["Global variables"] = "Global variables";
RUR.en["Watched expressions"] = "Watched expressions";

RUR.en["move forward"] = "move forward";
RUR.en["write"] = "write";
RUR.en["turn left"] = "turn left";
RUR.en["turn_left"] = "turn_left";
RUR.en["take"] = "take";
RUR.en["take object"] = "take object";
RUR.en["put"] = "put";
RUR.en["put object"] = "put object";
RUR.en["pause"] = "pause";
RUR.en["Pause the program's execution."] = "Pause the program's execution.";
RUR.en["build_wall"] = "build_wall";
RUR.en["Build a wall in front of the robot."] = "Build a wall in front of the robot.";
RUR.en["done"] = "done";
RUR.en["End the program's execution."] = "End the program's execution.";
RUR.en["True if a wall is blocking the way."] = "True if a wall is blocking the way";
RUR.en["wall_in_front"] = "wall_in_front";
RUR.en["wall_on_right"] = "wall_on_right";
RUR.en["True if nothing is blocking the way."] = "True if nothing is blocking the way.";
RUR.en["front_is_clear"] = "front_is_clear";
RUR.en["right_is_clear"] = "right_is_clear";
RUR.en["at_goal"] = "at_goal";
RUR.en["True if desired destination."] = "True if desired destination.";
RUR.en["carries_object"] = "carries_object";
RUR.en["True if robot carries at least one object."] = "True if robot carries at least one object.";
RUR.en["object_here"] = "object_here";
RUR.en["True if there is at least one object here."] = "True if there is at least one object here.";
RUR.en["is_facing_north"] = "is_facing_north";
RUR.en["True if robot is facing North."] = "True if robot is facing North.";
RUR.en["sound"] = "sound";
RUR.en["think"] = "think";
RUR.en["Delay between actions; default is 300 ms."] = "Delay between actions; default is 300 ms.";

RUR.en["Save world in browser"] = "Save world in browser";
RUR.en["LOAD EDITOR"] = "Import program from file";
RUR.en["LOAD EDITOR EXPLAIN"] = "Opens a local file and use its content to replace the content of the Code editor.";
RUR.en["LOAD LIBRARY"] = "Import library from a file";
RUR.en["LOAD LIBRARY EXPLAIN"] = "Opens a file and use its content to replace the current content of the Library.";
RUR.en["LOAD WORLD"] = "Open world from file";
RUR.en["LOAD WORLD EXPLAIN"] = "Loads a world from a file on your computer.";
RUR.en["SAVE EDITOR"] = "Save program to file";
RUR.en["SAVE EDITOR EXPLAIN"] = "Saves the content of the editor in a file.";
RUR.en["SAVE LIBRARY"] = "Save the library";
RUR.en["SAVE LIBRARY EXPLAIN"] = "Saves the content of the library in a file.";
RUR.en["SAVE WORLD"] = "Save world to file";
RUR.en["SAVE WORLD EXPLAIN"] = "Saves the world (as a json object) to a file on your computer.";
RUR.en["ADD EDITOR TEXT"] = "Add editor content to world";
RUR.en["ADD LIBRARY TEXT"] = "Add library content to world";
RUR.en["KEYBOARD BUTTON"] = "Reeborg's keyboard";
RUR.en["ADDITIONAL OPTIONS"] = "Additional options";

RUR.en["BASIC COMMANDS"] = "Basic commands";
RUR.en["DEFINING"] = "Defining";
RUR.en["LOOPS"] = "Loops";
RUR.en["DECISIONS"] = "Decisions";
RUR.en["CONDITIONS"] = "Conditions";
RUR.en["USING VARIABLES"] = "Using variables";
RUR.en["COMMANDS"] = "Commandes";
RUR.en["OTHER"] = "Other";
RUR.en["OBJECTS"] = "Objects";

RUR.en["Python Code"] = "Python Code";
RUR.en["Javascript Code"] = "Javascript Code";
RUR.en["LIBRARY"] = "library";
RUR.en["PRE"] = "Pre";
RUR.en["POST"] = "Post";
RUR.en["DESCRIPTION"] = "Desc.";
RUR.en["ONLOAD"] = "Onload";

RUR.en["HIGHLIGHT IMPOSSIBLE"] = "A problem with your code has caused me to turn off the code highlighting.";
RUR.en["COMMAND RESULT"] = "Select action to perform from menu below.";

RUR.en["COPY"] = "Copy";
RUR.en["COPY PERMALINK EXPLAIN"] = "Copy the permalink to the clipboard.";
RUR.en["Save"] = "Save";
RUR.en["Save permalink explanation"] = "Saves a copy of the permalink to a file.";
RUR.en["REPLACE PERMALINK"] = "Replace";
RUR.en["REPLACE PERMALINK EXPLAIN"] = "Replace the content above by a different permalink and click on Replace";
RUR.en["CANCEL"] = "Cancel";

RUR.en["DELETE WORLD TEXT"] = "The following refers to worlds currently stored in your browser which you can delete:";
RUR.en["PYTHON ONLY"] = "Python only";
RUR.en["COLLABORATION"] = "Collaboration";
RUR.en["TOGETHERJS EXPLAIN"] = "Tool which permits collaboration with one or more other user using Mozilla's TogetherJS.";
RUR.en["WORLD CREATION TITLE"] = "World: creation, edition, ...";
RUR.en["EDIT WORLD"] = "Edit world";
RUR.en["EDIT WORLD EXPLAIN"] = "You can create your own world by editing the current one.";
RUR.en["PROGRAM IN EDITOR"] = "Program in editor";
RUR.en["SPECIAL EXECUTION"] = "Special execution features";
RUR.en["REVERSE STEP EXPLAIN"] = "Reverses the previous execution step.";
RUR.en["ERASE TRACE"] = "Erase trace";
RUR.en["ERASE TRACE EXPLAIN"] = "Erases the trace left by Reeborg. This can be useful to focus on what happens after a program is paused.";
RUR.en["CONTACT"] = "(English/French only) Email:";
RUR.en["ISSUES"] = "Bug reports, suggestions, other issues, etc. (English/French only)";
RUR.en["FORUM"] = "Discussion forum (English/French only)";
RUR.en["HELP"] = "Help";
RUR.en["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/en" target="_blank">Documentation</a>';
RUR.en["PYTHON HELP"] = "Using Python, execute a program with <code>help()</code> to get a list of commands or <code>help(move)</code> to get help on the <code>move()</code> function, etc.";
RUR.en["KEYBOARD HELP"] = "Click on Reeborg keyboard to see a list of available commands, Python keywords, etc.";

RUR.en["WORLD EDITOR"] = "World editor";
RUR.en["m-east"] = "East";
RUR.en["m-north"] = "North";
RUR.en["m-west"] = "West";
RUR.en["m-south"] = "South";
RUR.en["m-random"] = "Random";
RUR.en["m-dimensions"] = "World dimensions";
RUR.en["m-add"] = "Add";
RUR.en["m-add-robot"] = "Add robot";
RUR.en["m-robot"] = "Robot";
RUR.en["m-position"] = "Position(s)";
RUR.en["m-turn"] = "Turn";
RUR.en["m-objects"] = "Objects";
RUR.en["m-walls"] = "Walls";
RUR.en["m-objects2"] = "Objects";
RUR.en["m-tiles"] = "Tiles";
RUR.en["m-fill"] = "Fill";
RUR.en["m-solid"] = "Solid objects";
RUR.en["m-decorative"] = "Decorative objects";
RUR.en["m-background"] = "Background image";
RUR.en["m-goal"] = "Goal";
RUR.en["mg-robot"] = "Robot";
RUR.en["mg-walls"] = "Walls";
RUR.en["mg-objects"] = "Objects";

},{}],81:[function(require,module,exports){
RUR.fr = {};

RUR.fr = {};
RUR.fr_to_en = {};

RUR.fr["SITE NAME"] = "Le monde de Reeborg";
RUR.fr["WORLD INFO"] = "Description";
RUR.fr["EDITOR VISIBLE BLOCKLY"] = "Garder l'éditeur visible";

RUR.fr["apple"] = "pomme";
RUR.fr_to_en["pomme"] = "apple";
RUR.fr["banana"] = "banane";
RUR.fr_to_en["banane"] = "banana";
RUR.fr["box"] = "boîte";
RUR.fr_to_en["boîte"] = "box";
RUR.fr["bridge"] = "pont";
RUR.fr_to_en["pont"] = "bridge";
RUR.fr["carrot"] = "carotte";
RUR.fr_to_en["carotte"] = "carrot";
RUR.fr["daisy"] = "marguerite";
RUR.fr_to_en["marguerite"] = "daisy";
RUR.fr["dandelion"] = "pissenlit";
RUR.fr_to_en["pissenlit"] = "dandelion";
RUR.fr["leaf"] = "feuille";
RUR.fr_to_en["feuille"] = "leaf";
RUR.fr["orange"] = "orange";
RUR.fr_to_en["orange"] = "orange";
RUR.fr.square = "carré";
RUR.fr_to_en["carré"] = "square";
RUR.fr.star = "étoile";
RUR.fr_to_en["étoile"] = "star";
RUR.fr["strawberry"] = "fraise";
RUR.fr_to_en["fraise"] = "strawberry";
RUR.fr.token = "jeton";
RUR.fr_to_en["jeton"] = "token";
RUR.fr.triangle = "triangle";
RUR.fr_to_en["triangle"] = "triangle";
RUR.fr["tulip"] = "tulipe";
RUR.fr_to_en["tulipe"] = "tulip";

RUR.fr["Problem with onload code."] = "Code Javascript 'onload' non valide; veuillez contacter le créateur de ce monde.";
RUR.fr["# from library import *"] = "# 'from biblio import *' dans l'onglet Code Python est requis pour\n# pouvoir utiliser le code de cette bibliothèque.\n\n";
RUR.fr.move = "avance";

RUR.fr["Too many steps:"] = "Trop d'instructions: {max_steps}";
RUR.fr["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée x.</li>";
RUR.fr["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée x.</li>";
RUR.fr["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg est à la bonne coordonnée y.</li>";
RUR.fr["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg est à la mauvaise coordonnée y.</li>";
RUR.fr["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>Tous les objets sont aux bons endroits.</li>";
RUR.fr["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>Un ou plusieurs objets ne sont pas aux bons endroits.</li>";
RUR.fr["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>Tous les murs ont été construits correctement.</li>";
RUR.fr["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>Un ou plusieurs murs manquent ou sont aux mauvais endroits.</li>";
RUR.fr["Last instruction completed!"] = "Dernière instruction complétée!";
RUR.fr["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>terminé()</code> exécutée.</p>";

RUR.fr["Unknown object"] = "Objet inconnu: {obj}";
RUR.fr["No object found here"] = "Pas d'objet '{obj}'' trouvé ici !";
RUR.fr["object"] = "objet";
RUR.fr["I don't have any object to put down!"] = "Je n'ai pas de '{obj}'!";
RUR.fr["There is already a wall here!"] = "Il y a déjà un mur ici !";
RUR.fr["Ouch! I hit a wall!"] = "Ouch! J'ai frappé un mur!";
RUR.fr["Done!"] = "Terminé !";
RUR.fr["There is no position as a goal in this world!"] = "Aucune position n'a été spécifiée comme but dans ce monde!";
RUR.fr["There is no goal in this world!"] = "Il n'y a pas de but dans ce monde!";
RUR.fr["I carry too many different objects. I don't know which one to put down!"] = "Je transporte trop d'objets: je ne sais pas lequel déposer!";
RUR.fr["Many objects are here; I do not know which one to take!"] = "Beaucoup d'objets différents sont ici; je ne sais pas lequel prendre!";

RUR.fr.east = "est";
RUR.fr.north = "nord";
RUR.fr.west = "ouest";
RUR.fr.south = "sud";
RUR.fr["Unknown orientation for robot."] = "Orientation inconnue.";

RUR.fr["World selected"] = "Monde {world} choisi";
RUR.fr["Could not find world"] = "Je ne peux pas trouver {world}";
RUR.fr["Object names"] = " biblio, jeton, étoile, triangle, carré, etc.";

RUR.fr["Invalid world file."] = "Fichier monde invalide.";
RUR.fr["Could not find link: "] = "Lien introuvable : ";

RUR.fr["Click on world to move robot."] = "Cliquez sur le monde pour ajouter ou supprimer des positions de départ possibles pour Reeborg.";
RUR.fr["Added robot."] = "Reeborg ajouté.";
RUR.fr["Click on image to turn robot"] = "Cliquez sur l'image pour tourner Reeborg.";
RUR.fr["Robot now has tokens."] = "Reeborg a {x_tokens} jetons.";
RUR.fr["Click on world to add object."] = "Cliquez sur le monde pour ajouter des {obj}.";
RUR.fr["Click on desired object below."] = "Cliquez sur l'objet désiré ci-dessous.";
RUR.fr["Click on world to toggle walls."] = "Cliquez sur le monde pour ajouter/supprimer des murs.";
RUR.fr["Click on world to set home position for robot."] = "Cliquez sur le monde pour ajouter ou supprimer une position finale possible du robot.";
RUR.fr["Click on world to toggle additional walls to build."] = "Cliquez sur le monde pour ajouter/supprimer des murs à construire.";
RUR.fr["Click on desired goal object below."] = "Cliquez sur l'objet désiré comme 'but'.";
RUR.fr["Click on world to set number of goal objects."] = "Cliquez sur le monde pour fixer le nombre d'objet '{obj}' comme but.";
RUR.fr["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Entrez un nombre de jetons en possesion de Reeborg.";
RUR.fr[" is not a valid value!"] = " n'est pas une valeur valide!";
RUR.fr["Enter number of objects desired at that location."] = "Cliquez sur le monde pour fixer le nombre d'objet '{obj}' désiré à cet endroit.";
RUR.fr["Objects found here:"] = "Objets trouvés ici:";
RUR.fr["Description"] = "Description";
RUR.fr["A robot located here carries no objects."] = "A robot situé à {x},{y} ne transporte aucun objet.";
RUR.fr["A robot located here carries:"] = "Un robot situé à {x},{y} transporte:";
RUR.fr["random location"] = "une position choisie au hasard";
RUR.fr["Enter number of objects to give to robot."] = "Quel nombre de {obj} voulez-vous donner au robot?";
RUR.fr["Special information about this location:"] = "Information particulière au sujet de cet endroit:";
RUR.fr["Click on world to toggle tile."] = "Cliquez sur le monde pour ajouter/supprimer l'image: '{obj}'.";
RUR.fr["Click on desired tile below."] = "Cliquez sur l'image désirée ci-dessous.";
RUR.fr["mud"] = "boue";
RUR.fr["water"] = "eau";
RUR.fr["grass"] = "gazon";
RUR.fr["gravel"] = "gravier";
RUR.fr["ice"] = "glace";
RUR.fr["A wall must be built east of this location."] = "Un mur doit être construit à l'est de cet endroit.";
RUR.fr["A wall must be built north of this location."] = "Un mur doit être construit au nord de cet endroit.";
RUR.fr["A wall must be built west of this location."] = "Un mur doit être construit à l'ouest de cet endroit.";
RUR.fr["A wall must be built south of this location."] = "Un mur doit être construit au sud de cet endroit.";
RUR.fr["The final required position of the robot will be chosen at random."] = "La position finale requise pour Reeborg sera choisie au hasard.";
RUR.fr["The final position of the robot must be (x, y) = "] = "La position finale de Reeborg doit être (x, y) = ";
RUR.fr["Click on world to fill with given tile."] = "Cliquez sur le monde pour remplir avec cet objet.";
RUR.fr["Click on desired object below."] = "Cliquez sur l'image désirée.";
RUR.fr["Enter url of image to use as background."] = "Fournir l'adresse (URL) de l'image à utiliser.";
RUR.fr["Replace editor content"] = "Voulez-vous remplacer le contenu du code de votre éditeur par celui défini par le créateur du monde?";
RUR.fr["Replace library content"] = "Voulez-vous remplacer le contenu du code de votre biliothèque par celui défini par le créateur du monde?";
RUR.fr["colour"] = "couleur";

RUR.fr["Name already exist; confirm that you want to replace its content."] = "Ce nom existe déjà; confirmez que vous voulez remplacer son contenu.";
RUR.fr["No such world!"] = "Ce monde n'existe pas !";
RUR.fr["Enter world name to save"] = "Quel nom doit-on utiliser pour ce monde? Noms utilisés:";
RUR.fr["Enter world name to delete"] = "Écrivez le nom du monde à supprimer; mondes existant:";
RUR.fr["Goal to achieve:"] = "Résultat désiré :";
RUR.fr["Delete "] = "Effacer ";

RUR.fr["Error found at or near line {number}."] = "Erreur trouvée à la ligne {number} ou tout près.";
RUR.fr["<br>Perhaps a missing colon is the cause."] = "<br>Il manque peut-être deux points ':'.";
RUR.fr["<br>Perhaps you forgot to add parentheses ()."] = "<br>Il manque peut-être des parenthèses ().";
RUR.fr["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>Il est possible qu'un mot soit mal épelé ou qu'une définition de fonction ou de variable manque.";

RUR.fr["I'm stuck in mud."] = "Je suis immobilisé dans la boue.";
RUR.fr["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "Boue: Reeborg <b>ne peut pas</b> détecter ceci et y sera immobilisé s'il va à cet endroit.";
RUR.fr["I'm slipping on ice!"] = "Je glisse sur la glace!";
RUR.fr["Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."] = "Glace: Reeborg <b>ne peut pas</b> détecter ceci et glissera à la prochaine case.";
RUR.fr["Grass: usually safe."] = "Gazon: habituellement sans problèmes.";
RUR.fr["Gravel: usually safe."] = "Gravier: habituellement sans problèmes.";
RUR.fr["I'm in water!"] = "Je suis dans l'eau!";
RUR.fr["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "Eau: Reeborg <b>peut</b> détecter ceci mais il va être endommagé s'il s'y déplace.";
RUR.fr["green_home_tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "tuile verte: Reeborg <b>peut</b> détecter ceci avec au_but().";
RUR.fr["Crash!"] = "Crash!";
RUR.fr["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "Mur de brique: Reeborg <b>peut</b> détecter ceci mais il se fera mal s'il essaie de passer au travers.";
RUR.fr["I hit a fence!"] = "J'ai frappé une clôture!";
RUR.fr["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "Clôture: Reeborg <b>peut</b> détecter ceci mais il ne peut pas passer au travers.";
RUR.fr["Bridge:"] = "Pont: ";
RUR.fr["Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "Reeborg <b>peut</b> détecter ceci et sait que cela lui permettra de traverser l'eau en sureté.";

RUR.fr_to_en["pont"] = "bridge";
RUR.fr["Something is blocking the way!"] = "Quelque chose bloque le chemin!";
RUR.fr["Reeborg <b>can</b> detect this tile using at_goal()."] = "Reeborg <b>peut</b> détecter ceci avec au_but().";
RUR.fr["green home tile:"] = "tuile verte pour l'arrivée:";
RUR.fr["home:"] = "la maison:";
RUR.fr["racing flag:"] = "drapeau d'arrivée:";
RUR.fr["house:"] = "maison:";

RUR.fr["fence_right"] = "clôture";
RUR.fr["fence_left"] = "clôture";
RUR.fr["fence_double"] = "clôture";
RUR.fr["fence_vertical"] = "clôture";

RUR.fr["Local variables"] = "Variables locales";
RUR.fr["Global variables"] = "Variables globales";
RUR.fr["Watched expressions"] = "Watched expressions";

RUR.fr["move forward"] = "avance";
RUR.fr["write"] = "ecrit";
RUR.fr["turn left"] = "tourne à gauche";
RUR.fr["turn_left"] = "tourne_a_gauche";
RUR.fr["take"] = "prend";
RUR.fr["take object"] = "prend l'objet";
RUR.fr["put"] = "depose";
RUR.fr["put object"] = "dépose l'objet";
RUR.fr["pause"] = "pause";
RUR.fr["Pause the program's execution."] = "Pause l'exécution du programme.";
RUR.fr["build_wall"] = "construit_un_mur";
RUR.fr["Build a wall in front of the robot."] = "Construit un mur devant le robot.";
RUR.fr["done"] = "termine";
RUR.fr["End the program's execution."] = "Termine l'exécution du programme.";
RUR.fr["True if a wall is blocking the way."] = "Vrai si un mur bloque le chemin.";
RUR.fr["wall_in_front"] = "mur_devant";
RUR.fr["wall_on_right"] = "mur_a_droite";
RUR.fr["True if nothing is blocking the way."] = "Vrai si rien ne bloque le chemin.";
RUR.fr["front_is_clear"] = "rien_devant";
RUR.fr["right_is_clear"] = "rien_a_droite";
RUR.fr["at_goal"] = "at_goal";
RUR.fr["True if desired destination."] = "Vrai si c'est la destination désirée.";
RUR.fr["carries_object"] = "transporte";
RUR.fr["True if robot carries at least one object."] = "Vrai si le robot transporte au moins un objet.";
RUR.fr["object_here"] = "objet_ici";
RUR.fr["True if there is at least one object here."] = "Vrai s'il y a au moins un objet ici.";
RUR.fr["is_facing_north"] = "est_face_au_nord";
RUR.fr["True if robot is facing North."] = "Vrai se le robot est face au nord.";
RUR.fr["sound"] = "son";
RUR.fr["think"] = "pense";
RUR.fr["Delay between actions; default is 300 ms."] = "Délai entre les actions; le défaut est de 300 ms.";

RUR.fr["Save world in browser"] = "Sauvegarder le monde dans le navigateur";
RUR.fr["Save permalink"] = "Sauvegarder le permalien";
RUR.fr["Save permalink explanation"] = "Sauvegarde une copie du permalien dans un fichier.";
RUR.fr["LOAD EDITOR"] = "Ouvrir un programme";
RUR.fr["LOAD EDITOR EXPLAIN"] = "Ouvre un fichier local et remplace le contenu de l'éditeur par le contenu du fichier.";
RUR.fr["LOAD LIBRARY"] = "Importer une bibliothèque";
RUR.fr["LOAD LIBRARY EXPLAIN"] = "Ouvre un fichier contenant un programme et remplace le contenu de la bibliothèque par le contenu du fichier choisi.";
RUR.fr["LOAD WORLD"] = "Ouvrir un monde";
RUR.fr["LOAD WORLD EXPLAIN"] = "Ouvre un monde à partir d'un fichier.";
RUR.fr["SAVE EDITOR"] = "Sauvegarder le programme";
RUR.fr["SAVE EDITOR EXPLAIN"] = "Sauvegarde le contenu de l'éditeur dans un fichier.";
RUR.fr["SAVE LIBRARY"] = "Sauvegarder la bibliothèque";
RUR.fr["SAVE LIBRARY EXPLAIN"] = "Sauvegarde le contenu de la bibliothèque dans un fichier.";
RUR.fr["SAVE WORLD"] = "Sauvegarder le monde";
RUR.fr["SAVE WORLD EXPLAIN"] = "Sauvegarde le monde dans un fichier (format json) sur votre ordinateur.";
RUR.fr["ADD EDITOR TEXT"] = "Inclure le contenu de l'éditeur";
RUR.fr["ADD LIBRARY TEXT"] = "Inclure le contenu de la bibliothèque";
RUR.fr["KEYBOARD BUTTON"] = "Clavier de Reeborg";
RUR.fr["ADDITIONAL OPTIONS"] = "Autres options";

RUR.fr["BASIC COMMANDS"] = "Commandes";
RUR.fr["DEFINING"] = "Définitions";
RUR.fr["LOOPS"] = "Boucles";
RUR.fr["DECISIONS"] = "Décisions";
RUR.fr["CONDITIONS"] = "Conditions";
RUR.fr["USING VARIABLES"] = "Utiliser des variables";
RUR.fr["COMMANDS"] = "Commandes";
RUR.fr["OTHER"] = "Autres";
RUR.fr["OBJECTS"] = "Objets";

RUR.fr["Python Code"] = "Code Python";
RUR.fr["Javascript Code"] = "Code Javascript";
RUR.fr["LIBRARY"] = "biblio";
RUR.fr["PRE"] = "Pre";
RUR.fr["POST"] = "Post";
RUR.fr["DESCRIPTION"] = "Desc.";
RUR.fr["ONLOAD"] = "Onload";

RUR.fr["HIGHLIGHT IMPOSSIBLE"] = "Un problème non-identifié avec votre code a fait en sorte que j'ai arrêté le surlignage du code dans l'éditeur.";
RUR.fr["COMMAND RESULT"] = "Sélectionnez l'action à performer dans le menu ci-dessous.";

RUR.fr["PERMALINK"] = "Permalien";
RUR.fr["COPY"] = "Copier";
RUR.fr["COPY PERMALINK EXPLAIN"] = "Copie le permalien dans le presse-papier.";
RUR.fr["Save"] = "Sauvegarder";
RUR.fr["Save permalink explanation"] = "Sauvegarde une copie du permalien dans un fichier.";
RUR.fr["REPLACE PERMALINK"] = "Remplacer";
RUR.fr["REPLACE PERMALINK EXPLAIN"] = "Remplacez le contenu ci-dessus par un nouveau permalien puis cliquez sur Remplacer.";
RUR.fr["CANCEL"] = "Annuler";

RUR.fr["DELETE WORLD TEXT"] = "En cliquant sur un bouton, éliminez un monde connu de la mémoire de votre nagivageur.";
RUR.fr["PYTHON ONLY"] = "Python seulement";
RUR.fr["COLLABORATION"] = "Collaboration";
RUR.fr["TOGETHERJS EXPLAIN"] = "Outil qui permet la collaboration à distance en utilisant l'outil TogetherJS de Mozilla (interface en anglais seulement).";
RUR.fr["WORLD CREATION TITLE"] = "Monde : édition, création, ...";
RUR.fr["EDIT WORLD"] = "Édition du monde";
RUR.fr["EDIT WORLD EXPLAIN"] = "Vous pouvez créer vos propres mondes en modifiant un monde existant.";
RUR.fr["PROGRAM IN EDITOR"] = "Programme dans l'éditeur";
RUR.fr["SPECIAL EXECUTION"] = "Options d'exécution";
RUR.fr["REVERSE STEP EXPLAIN"] = "Renverse l'instruction précédemment exécutée.";
RUR.fr["ERASE TRACE"] = "Effacer la trace";
RUR.fr["ERASE TRACE EXPLAIN"] = "Efface la trace laissée par Reeborg.  Ceci est utile pour permettre de se concentrer sur ce qui arrive lorsqu'on résume un programme après une pause.";
RUR.fr["CONTACT"] = "Courriel :";
RUR.fr["ISSUES"] = "Rapports de bogues, suggestions, autres problèmes, etc. (en anglais ou en français seulement).";
RUR.fr["FORUM"] = "Forum de discussions (en anglais ou en français seulement).";
RUR.fr["HELP"] = "Aide";
RUR.fr["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/fr" target="_blank">Documentation</a>';
RUR.fr["PYTHON HELP"] = "En utilisant Python, executez un programme avec <code>help()</code> pour obtenir une liste de commandes ou <code>help(avance)</code> pour obtenir de l'aide sur la fonction <code>avance()</code>, etc.";
RUR.fr["KEYBOARD HELP"] = "Cliquez sur le clavier de Reeborg keyboard pour voir une liste des commandes, la syntaxe Python, etc.";

RUR.fr["WORLD EDITOR"] = "Éditeur de monde";
RUR.fr["m-east"] = "Est";
RUR.fr["m-north"] = "Nord";
RUR.fr["m-west"] = "Ouest";
RUR.fr["m-south"] = "Sud";
RUR.fr["m-random"] = "Aléatoire";
RUR.fr["m-dimensions"] = "Taille du monde";
RUR.fr["m-add"] = "Ajouter";
RUR.fr["m-add-robot"] = "Ajouter Reeborg";
RUR.fr["m-robot"] = "Robot";
RUR.fr["m-position"] = "Position(s)";
RUR.fr["m-turn"] = "Orientation";
RUR.fr["m-objects"] = "Objets";
RUR.fr["m-walls"] = "Murs";
RUR.fr["m-objects2"] = "Objets";
RUR.fr["m-tiles"] = "Tuiles";
RUR.fr["m-fill"] = "Remplir";
RUR.fr["m-solid"] = "Objets solides";
RUR.fr["m-decorative"] = "Objets décoratifs";
RUR.fr["m-background"] = "Image de fond";
RUR.fr["m-goal"] = "But";
RUR.fr["mg-robot"] = "Robot";
RUR.fr["mg-walls"] = "Murs";
RUR.fr["mg-objects"] = "Objets";

},{}],82:[function(require,module,exports){
RUR.ko = {};
RUR.ko_to_en = {};

RUR.ko["SITE NAME"] = "리보그의 월드";
RUR.ko["WORLD INFO"] = "월드 정보";
RUR.ko["EDITOR VISIBLE BLOCKLY"] = "에디터 유지시키기";


RUR.ko["apple"] = "사과";
RUR.ko_to_en["사과"] = "apple";
RUR.ko["banana"] = "바나나";
RUR.ko_to_en["바나나"] = "banana";
RUR.ko["box"] = "상자";
RUR.ko_to_en["상자"] = "box";
RUR.ko["bridge"] = "다리";
RUR.ko_to_en["다리"] = "bridge";
RUR.ko["carrot"] = "당근";
RUR.ko_to_en["당근"] = "carrot";
RUR.ko["daisy"] = "데이지꽃";
RUR.ko_to_en["데이지꽃"] = "daisy";
RUR.ko["dandelion"] = "민들레";
RUR.ko_to_en["민들레"] = "dandelion";
RUR.ko["leaf"] = "잎";
RUR.ko_to_en["잎"] = "leaf";
RUR.ko["orange"] = "귤";
RUR.ko_to_en["귤"] = "orange";
RUR.ko.square = "사각형";
RUR.ko_to_en["사각형"] = "square";
RUR.ko.star = "별";
RUR.ko_to_en["별"] = "star";
RUR.ko["strawberry"] = "딸기";
RUR.ko_to_en["딸기"] = "strawberry";
RUR.ko.token = "토큰";
RUR.ko_to_en["토큰"] = "token";
RUR.ko.triangle = "삼각형";
RUR.ko_to_en["삼각형"] = "triangle";
RUR.ko["tulip"] = "튤립";
RUR.ko_to_en["튤립"] = "tulip";

RUR.ko["Problem with onload code."] = "유효하지 않는 자바스크립트 onload 코드입니다; 이 월드의 제작자에게 연락하세요.";
RUR.ko["# from library import *"] = "# 사용을 할려먼 'from library import *' 이 파이썬 코드가 필요합니다.\n# 코드가 이 라이브러리 안에 있습니다. \n\n";
RUR.ko.move = "move";

RUR.ko["Too many steps:"] = "너무 많은 steps: {max_steps}";
RUR.ko["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>리보그는 올바른 x 위치에 있습니다.</li>";
RUR.ko["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>리보그는 잘못된 x 위치에 있습니다.</li>";
RUR.ko["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>리보그는 올바른 y 위치에 있습니다.</li>";
RUR.ko["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>리보그는 잘못된 y 위치에 있습니다.</li>";
RUR.ko["<li class='success'>All objects are at the correct location.</li>"] = "<li class='success'>모든 객체가 올바른 위치에 있습니다.</li>";
RUR.ko["<li class='failure'>One or more objects are not at the correct location.</li>"] = "<li class='failure'>하나 이상의 객체가 올바른 위치에 있지 않습니다.</li>";
RUR.ko["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>모든 벽은 제대로 지어지고 있습니다.</li>";
RUR.ko["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>하나 이상의 벽이 누락되거나 잘못된 위치에서 건설됬습니다.</li>";
RUR.ko["Last instruction completed!"] = "마지막 명령이 완료됬습니다!";
RUR.ko["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>명령 <code>done()</code> 실행.</p>";

RUR.ko["Unknown object"] = "알 수 없는 객체: {obj}";
RUR.ko["No object found here"] = "여기서 {obj} 를 찾을수 없어요!";
RUR.ko["object"] = "객체";
RUR.ko["I don't have any object to put down!"] = "나는 집어넣을 {obj} 가 없어요!";
RUR.ko["There is already a wall here!"] = "벽이 여기에 이미 있어요!";
RUR.ko["Ouch! I hit a wall!"] = "아으,, 아파요! 저는 벽을 부딛쳤어요!";
RUR.ko["Done!"] = "끝!";
RUR.ko["There is no position as a goal in this world!"] = "위치에 대한 목표가 없어요!";
RUR.ko["There is no goal in this world!"] = "이 월드는 목표가 없어요.";
RUR.ko["I carry too many different objects. I don't know which one to put down!"] = "저는 너무 많은 다른 객체들을 싣고 있어요. 저는 이중 어떤 걸 내려놓을지 모르겠어요!";
RUR.ko["Many objects are here; I do not know which one to take!"] = "많은 객체들이 여기에 있어요; 저는 그 중 어떤걸 가져갈지 모르겠어요!";

RUR.ko.east = "동쪽";
RUR.ko.north = "북쪽";
RUR.ko.west = "서쪽";
RUR.ko.south = "남쪽";
RUR.ko["Unknown orientation for robot."] = "로봇의 방향을 알 수 없습니다.";

RUR.ko["World selected"] = "월드 {world} 가 선택되었습니다";
RUR.ko["Could not find world"] = "월드를 찾을 수 없습니다 {world}";
RUR.ko["Object names"] = " 라이브러리, 토큰, 별, 삼각형, 사각형, 등.";

RUR.ko["Invalid world file."] = "유효하지 않는 월드 파일.";
RUR.ko["Could not find link: "] = "링크를 찾을 수 없습니다: ";

RUR.ko["Click on world to move robot."] = "월드를 클릭해서 추가하거나 시작 가능한 리보그 위치를 제거합니다.";
RUR.ko["Added robot."] = "리보그 추가됨.";
RUR.ko["Click on image to turn robot"] = "리보그를 회전하기 위해 이미지를 클릭하세요.";
RUR.ko["Robot now has tokens."] = "이제 리보그는 {x_tokens} 토근을 가지고 있습니다.";
RUR.ko["Click on world to add object."] = "{obj} 의 수를 설정하기 위해 월드를 클릭하세요.";
RUR.ko["Click on desired object below."] = "아래에서 원하는 개체를 클릭합니다.";
RUR.ko["Click on world to toggle walls."] = "벽을 달기 위해 월드를 클락하세요.";
RUR.ko["Click on world to set home position for robot."] = "로봇의 최종위치를 정하기 위해 월드를 클릭하세요.";
RUR.ko["Click on world to toggle additional walls to build."] = "추가적으로 벽을 달기 위해 월드를 클릭하세요.";
RUR.ko["Click on desired goal object below."] = "아래에서 원하는 목표 객체를 클릭하세요.";
RUR.ko["Click on world to set number of goal objects."] = "{obj}의 목표를 설정하기 위해 객체를 클릭하세요.";
RUR.ko["Enter number of tokens for robot to carry (use inf for infinite number)"] = "싣고 갈 토큰의 수를 입력하세요.";
RUR.ko[" is not a valid value!"] = " 유효하지 않는 값입니다!";
RUR.ko["Enter number of objects desired at that location."] = "{obj} 의 수를 설정하기 위해 월드를 클릭하세요.";
RUR.ko["Objects found here:"] = "객체를 여기서 찾음:";
RUR.ko["Description"] = "설명";
RUR.ko["A robot located here carries no objects."] = "로봇은 {x},{y} 에 위치해 있고 싣고 있는 객체는 없습니다.";
RUR.ko["Goal to achieve:"] = "목표 달성:";
RUR.ko["A robot located here carries:"] = "로봇은 {x},{y} 에 위치해 있습니다. 싣고 있는 객체:";
RUR.ko["random location"] = "랜덤 위치";
RUR.ko["Enter number of objects to give to robot."] = "로봇에게 주기 위해 {obj} 의 수를 입력하세요..";
RUR.ko["Special information about this location:"] = "이 위치에 대한 특별한 정보:";
RUR.ko["Click on world to toggle tile."] = "{obj} 타일을 달기 위해 월드를 클릭하세요.";
RUR.ko["Click on desired tile below."] = "아래에서 원하는 타일을 클릭합니다.";
RUR.ko["mud"] = "진흙";
RUR.ko["water"] = "물";
RUR.ko["grass"] = "잔디";
RUR.ko["gravel"] = "자갈";
RUR.ko["ice"] = "얼음";
RUR.ko["A wall must be built east of this location."] = "벽은 이 위치의 동쪽에 지어져야 됩니다.";
RUR.ko["A wall must be built north of this location."] = "벽은 이 위치의 북쪽에 지어져야 됩니다.";
RUR.ko["A wall must be built west of this location."] = "벽은 이 위치의 서쪽에 지어져야 됩니다.";
RUR.ko["A wall must be built south of this location."] = "벽은 이 위치의 남쪽에 지어져야 됩니다.";
RUR.ko["The final required position of the robot will be chosen at random."] = "로봇의 마지막으로 필요한 위치가 무작위로 선택됩니다.";
RUR.ko["The final position of the robot must be (x, y) = "] = "로봇의 최종위치는 반드시 (x, y) = ";
RUR.ko["Click on world to fill with given tile."] = "주어진 타일을 채우기 위해 월드를 클릭합니다.";
RUR.ko["Click on desired object below."] = "아래에서 원하는 객체를 클릭합니다.";
RUR.ko["Enter url of image to use as background."] = "배경화면으로 쓰일 이미지나 이미지 주소를 입력해 주세요.";
RUR.ko["Replace editor content"] = "당신의 이 월드의 제작자에 의해 제공되는 에디터 코드를 대체 하고 싶나요?";
RUR.ko["Replace library content"] = "당신은 이 월드의 제작자에 의해 제공되는 라이브러리 코드를 대체 하고 싶나요?";
RUR.ko["colour"] = "색";

RUR.ko["Name already exist; confirm that you want to replace its content."] = "이름이 이미 존재합니다; 당신이 내용을 교체하고 싶으면 확인합니다.";
RUR.ko["No such world!"] = "월드가 존재하지 않습니다!";
RUR.ko["Enter world name to save"] = "월드를 저장하기 위해 월드 이름을 입력 해주세요; 사용될 이름: ";
RUR.ko["Enter world name to delete"] = "월드를 삭제하기 위해 월드 이름을 입력 해주세요; 기존 세계: ";
RUR.ko["Delete "] = "삭제 ";

RUR.ko["Error found at or near line {number}."] = "오류를 발견했습니다 혹은 라인 근처에서 발견됬습니다. : {number}.";
RUR.ko["<br>Perhaps a missing colon is the cause."] = "<br>아마도 콜론(:)을 놓쳐서 문제가 발생했을 겁니다.";
RUR.ko["<br>Perhaps you forgot to add parentheses ()."] = "<br>아마도 당신은 괄호를 추가하는 것을 잊어버렸을 겁니다 ().";
RUR.ko["<br>Perhaps you misspelled a word or forgot to define a function or a variable."] = "<br>아마도 당신은 단어의 철자나 함수를 정의하는것을 잊었거나 변수를 까먹었을 겁니다.";

RUR.ko["I'm stuck in mud."] = "난 진흙에 걸렸어요.";
RUR.ko["Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."] = "진흙: 리보그는 이것을 탐지 <b>하지 못하고<b> 이 위치로 이동하게 되면 걸리게 됩니다.";
RUR.ko["I'm slipping on ice!"] = "I'm slipping on ice!";
RUR.ko["Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."] = "얼음: 리보그는 이것을 탐지 <b>하지 못하고</b> 만약 이 위치로 이동하게 되면 미끄러지고 다음 위치로 이동하게 됩니다.";
RUR.ko["Grass: usually safe."] = "잔디: 보통 안전함.";
RUR.ko["Gravel: usually safe."] = "자갈: 보통 안전함.";
RUR.ko["I'm in water!"] = "난 물 속에 있어요!";
RUR.ko["Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location."] = "물: 리보그는 이것을 탐지 할 수 <b>있지만</b> 이 위치로 이동하는 경우 상처를 입히게 됩니다.";
RUR.ko["green_home_tile: Reeborg <b>can</b> detect this tile using at_goal()."] = "green_home_tile: 리보그는 at_goal 를 사용하면 이 타일을 감지 할 수 <b>있어요<b>.";
RUR.ko["Crash!"] = "Crash!";
RUR.ko["brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it."] = "벽돌 벽: 리보그는 이것을 탐지 할 수 있지만 만약 벽돌 벽으로 간다면 자신을 다치게 합니다.";
RUR.ko["I hit a fence!"] = "I hit a fence!";
RUR.ko["Fence: Reeborg <b>can</b> detect this but will be stopped by it."] = "울타리: 리보그는 이것을  <b>can</b> 탐지 할 수 있지만 그것에 의해 중지됩니다.";
RUR.ko["Bridge:"] = "Bridge: ";
RUR.ko["Reeborg <b>can</b> detect this and will know that it allows safe passage over water."] = "리보그는 이것을 탐지 할 수 <b>있으며</b> 이 물 위에서 안전한 통행을 허용하는것을 알게 될 것입니다.";

RUR.ko["Something is blocking the way!"] = "뭔가가 길을 막고 있어요!";
RUR.ko["Reeborg <b>can</b> detect this tile using at_goal()."] = "리보그는 at_goal() 를 사용해서 탐지 할 수 <b>있어요</b>.";
RUR.ko["green home tile:"] = "초록색 홈 타일:";
RUR.ko["home:"] = "홈:";
RUR.ko["racing flag:"] = "레이싱 깃발:";
RUR.ko["house:"] = "집:";

RUR.ko["fence_right"] = "울타리";
RUR.ko["fence_left"] = "울타리";
RUR.ko["fence_double"] = "울타리";
RUR.ko["fence_vertical"] = "울타리";

RUR.ko["Local variables"] = "지역 변수";
RUR.ko["Global variables"] = "전역 변수";
RUR.ko["Watched expressions"] = "문장 결과 보기";

RUR.ko["move forward"] = "앞으로 움직이기";
RUR.ko["write"] = "write";
RUR.ko["turn left"] = "turn left";
RUR.ko["turn_left"] = "turn_left";
RUR.ko["take"] = "take";
RUR.ko["take object"] = "객체 가지기";
RUR.ko["put"] = "put";
RUR.ko["put object"] = "객체 넣기";
RUR.ko["pause"] = "일시 정지";
RUR.ko["Pause the program's execution."] = "프로그램 일시 정지.";
RUR.ko["build_wall"] = "build_wall";
RUR.ko["Build a wall in front of the robot."] = "벽을 로봇 앞에 짓기.";
RUR.ko["done"] = "done";
RUR.ko["End the program's execution."] = "프로그램 실행 종료.";
RUR.ko["True if a wall is blocking the way."] = "벽이 길을 막고 있는 경우가 사실이라면.";
RUR.ko["wall_in_front"] = "wall_in_front";
RUR.ko["wall_on_right"] = "wall_on_right";
RUR.ko["True if nothing is blocking the way."] = "아무것도 차단 하지 않는 경우가 사실이라면.";
RUR.ko["front_is_clear"] = "front_is_clear";
RUR.ko["right_is_clear"] = "right_is_clear";
RUR.ko["at_goal"] = "at_goal";
RUR.ko["True if desired destination."] = "원하는 목적지가 있는 경우가 사실이라면";
RUR.ko["carries_object"] = "carries_object";
RUR.ko["True if robot carries at least one object."] = "로봇이 적어도 하나의 객체를 싣고 있는 경우가 사실이라면.";
RUR.ko["object_here"] = "object_here";
RUR.ko["True if there is at least one object here."] = "적어도 하나의 객체가 여기에 있는 경우가 사실이라면.";
RUR.ko["is_facing_north"] = "is_facing_north";
RUR.ko["True if robot is facing North."] = "만약 로봇이 북쪽을 바라보고 있는 경우가 사실이라면.";
RUR.ko["sound"] = "소리";
RUR.ko["think"] = "생각";
RUR.ko["Delay between actions; default is 300 ms."] = "행동을 지연시킵니다; 기본값은 300 밀리초.";

RUR.ko["Save world in browser"] = "월드를 브라우저에 저장하기";
RUR.ko["Save permalink"] = "퍼머 저장";
RUR.ko["Save permalink explanation"] = "파일의 퍼머링크 복사본을 저장하기";
RUR.ko["LOAD EDITOR"] = "파일로 불러오기";
RUR.ko["LOAD EDITOR EXPLAIN"] = "로컬 저장소에서 소스코드 불러오기";
RUR.ko["LOAD LIBRARY"] = "파일에서 라이브러리를 가져오기";
RUR.ko["LOAD LIBRARY EXPLAIN"] = "파일을 열고 라이브러리의 컨텐츠를 지금 사용합니다.";
RUR.ko["LOAD WORLD"] = "파일로 불러오기";
RUR.ko["LOAD WORLD EXPLAIN"] = "컴퓨터안의 파일로 월드를 불러오기";
RUR.ko["SAVE EDITOR"] = "파일로 저장";
RUR.ko["SAVE EDITOR EXPLAIN"] = "에디터 소스코드 저장";
RUR.ko["SAVE LIBRARY"] = "라이브러리 저장";
RUR.ko["SAVE LIBRARY EXPLAIN"] = "파일 라이브러리의 내용 저장";
RUR.ko["SAVE WORLD"] = "파일로 저장";
RUR.ko["SAVE WORLD EXPLAIN"] = "(json 확장자로) 월드를 컴퓨터에 저장";
RUR.ko["ADD EDITOR TEXT"] = "월드에 접속하기 위해 에디터 추가";
RUR.ko["ADD LIBRARY TEXT"] = "월드에 접속하기 위해 라이브러리 추가";
RUR.ko["KEYBOARD BUTTON"] = "리보그의 키보드";
RUR.ko["ADDITIONAL OPTIONS"] = "추가 설정";

RUR.ko["BASIC COMMANDS"] = "기본적인 명령어";
RUR.ko["DEFINING"] = "정의";
RUR.ko["LOOPS"] = "루프";
RUR.ko["DECISIONS"] = "결정";
RUR.ko["CONDITIONS"] = "상태";
RUR.ko["USING VARIABLES"] = "변수 사용하기";
RUR.ko["COMMANDS"] = "명령어들";
RUR.ko["OTHER"] = "그 외";
RUR.ko["OBJECTS"] = "객체들";

RUR.ko["Python Code"] = "파이썬 코드";
RUR.ko["Javascript Code"] = "자바스크립트 코드";
RUR.ko["LIBRARY"] = "라이브러리";
RUR.ko["PRE"] = "전에";
RUR.ko["POST"] = "후";
RUR.ko["DESCRIPTION"] = "월드 정보";
RUR.ko["ONLOAD"] = "Onload";

RUR.ko["HIGHLIGHT IMPOSSIBLE"] = "구문 강조를 꺼서 문제가 발생했습니다.";
RUR.ko["COMMAND RESULT"] = "아래 메뉴에서 수행할 작업을 선택합니다.";

RUR.ko["PERMALINK"] = "퍼머링크";
RUR.ko["COPY"] = "복사";
RUR.ko["COPY PERMALINK EXPLAIN"] = "퍼머링크를 클립보드로 복사하기.";
RUR.ko["Save"] = "저장";
RUR.ko["Save permalink explanation"] = "퍼머링크의 복사본을 파일로 저장합니다.";
RUR.ko["REPLACE PERMALINK"] = "되돌리기";
RUR.ko["REPLACE PERMALINK EXPLAIN"] = "위의 내용을 퍼머링크로 교체하고 교체를 클릭합니다.";
RUR.ko["CANCEL"] = "취소";

RUR.ko["DELETE WORLD TEXT"] = "버튼을 클릭하면 브라우져의 메모리에 저장된 월드를 제거합니다:";
RUR.ko["PYTHON ONLY"] = "파이썬 전용";
RUR.ko["COLLABORATION"] = "협업";
RUR.ko["TOGETHERJS EXPLAIN"] = "다른 사용자는 Mozilla의 TogetherJS를 이용하여 협업에 참여 할 수 있습니다.";
RUR.ko["WORLD CREATION TITLE"] = "월드 : 창조, 수정..";
RUR.ko["EDIT WORLD"] = "월드 수정";
RUR.ko["EDIT WORLD EXPLAIN"] = "기존 월드를 수정하여 자신 만의 월드를 만들 수 있습니다.";
RUR.ko["PROGRAM IN EDITOR"] = "에디터";
RUR.ko["SPECIAL EXECUTION"] = "미래에 생겨날 기능";
RUR.ko["REVERSE STEP EXPLAIN"] = "이전 실행 상태를 되돌립니다.";
RUR.ko["ERASE TRACE"] = "흔적 지우기";
RUR.ko["ERASE TRACE EXPLAIN"] = "흔적을 리보그만 남기고 지웁니다. 이 기능은 프로그램이 멈추었을때 유용합니다.";
RUR.ko["CONTACT"] = "(English/French only) Email:";
RUR.ko["ISSUES"] = "Bug reports, suggestions, other issues, etc. (English/French only)";
RUR.ko["FORUM"] = "Discussion forum (English/French only)";
RUR.ko["HELP"] = "도움말";
RUR.ko["DOCUMENTATION"] = '<a href="http://reeborg.ca/docs/ko" target="_blank">Documentation</a>';
RUR.ko["PYTHON HELP"] = "Using Python, execute a program with <code>help()</code> to get a list of commands or <code>help(move)</code> to get help on the <code>move()</code> function, etc.";
RUR.ko["KEYBOARD HELP"] = "Click on Reeborg keyboard to see a list of available commands, Python keywords, etc.";

RUR.ko["WORLD EDITOR"] = "World editor";
RUR.ko["m-east"] = "동쪽";
RUR.ko["m-north"] = "북쪽";
RUR.ko["m-west"] = "서쪽";
RUR.ko["m-south"] = "남쪽";
RUR.ko["m-random"] = "Random";
RUR.ko["m-dimensions"] = "월드 크기";
RUR.ko["m-add"] = "추가";
RUR.ko["m-add-robot"] = "로봇 추가";
RUR.ko["m-robot"] = "로봇";
RUR.ko["m-position"] = "위치(들)";
RUR.ko["m-turn"] = "회전";
RUR.ko["m-objects"] = "객체";
RUR.ko["m-walls"] = "벽";
RUR.ko["m-objects2"] = "객체";
RUR.ko["m-tiles"] = "타일들";
RUR.ko["m-fill"] = "체우기";
RUR.ko["m-solid"] = "특정 객체";
RUR.ko["m-decorative"] = "꾸미기용 객체";
RUR.ko["m-background"] = "Background image";
RUR.ko["m-goal"] = "목표";
RUR.ko["mg-robot"] = "로봇";
RUR.ko["mg-walls"] = "벽";
RUR.ko["mg-objects"] = "객체";

},{}],83:[function(require,module,exports){
require("./../lang/en.js");
require("./../lang/fr.js");
require("./../lang/ko.js");

RUR.translation = RUR.en;
RUR.translation_to_english = RUR.en_to_en;

var _recorded_ids = [];
var _text_elements = [];
var _elements_names = [];
var _elements_titles = [];

__record_id = function(id){
    if (_recorded_ids.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        _recorded_ids.push(id);
    }
};

record_id = function (id, text) {
    __record_id(id);
    if (text !== undefined) {
        _text_elements.push([id, text]);
    }
};

record_name = function (id, text) {
    __record_id(id);
    _elements_names.push([id, text]);
};
record_title = function (id, text) {
    __record_id(id);
    _elements_titles.push([id, text]);
};


update_ui = function (lang) {
    "use strict";
    var i, id, msg;
    window.document.documentElement.lang = lang;

    for(i=0; i<_text_elements.length; i++) {
        id = "#" + _text_elements[i][0];
        msg = _text_elements[i][1];
        $(id).html(RUR.translate(msg));
    }
    for(i=0; i<_elements_names.length; i++) {
        id = "#" + _elements_names[i][0];
        msg = _elements_names[i][1];
        $(id).attr("name", RUR.translate(msg));
    }
    update_titles();
};

update_titles = function () {
    "use strict";
    var i, id, msg;
    for(i=0; i<_elements_titles.length; i++) {
        id = "#" + _elements_titles[i][0];
        msg = _elements_titles[i][1];
        $(id).text(RUR.translate(msg));
    }
};

exports.update_ui = update_ui;
exports.record_id = record_id;
exports.update_titles = update_titles;

record_id("site-name", "SITE NAME");
record_id("world-info-button", "WORLD INFO");
record_id("visible-blockly", "EDITOR VISIBLE BLOCKLY");
record_id("special-keyboard-button", "KEYBOARD BUTTON");
record_id("more-menus-button", "ADDITIONAL OPTIONS");
record_title("ui-dialog-title-more-menus", "ADDITIONAL OPTIONS");


record_id("blockly-wrapper");
record_id("move-handle");
record_id("blocklyDiv");
record_name("blockly-basic-commands", "BASIC COMMANDS");
record_name("blockly-defining", "DEFINING");
record_name("blockly-loops", "LOOPS");
record_name("blockly-decisions", "DECISIONS");
record_name("blockly-conditions", "CONDITIONS");
record_name("blockly-using-variables", "USING VARIABLES");
record_name("blockly-commands-var", "COMMANDS");
record_name("blockly-conditions-var", "CONDITIONS");
record_name("blockly-other", "OTHER");
record_name("blockly-objects", "OBJECTS");

record_id("highlight-impossible", "HIGHLIGHT IMPOSSIBLE");
record_id("command-result", "COMMAND RESULT");
record_id("delete-world-text", "DELETE WORLD TEXT");
record_id("python-only", "PYTHON ONLY");
record_id("togetherjs", "COLLABORATION");
record_id("togetherjs-text", "TOGETHERJS EXPLAIN");
record_id("world-title", "WORLD CREATION TITLE");
record_id("program-in-editor", "PROGRAM IN EDITOR");
record_id("special-execution", "SPECIAL EXECUTION");
record_id("reverse-step-text", "REVERSE STEP EXPLAIN");
record_id("erase-trace", "ERASE TRACE");
record_id("erase-trace-text", "ERASE TRACE EXPLAIN");
record_id("contact", "CONTACT");
record_id("issues", "ISSUES");
record_id("help", "HELP");
record_id("forum", "FORUM");
record_id("documentation", "DOCUMENTATION");
record_id("python-help", "PYTHON HELP");
record_id("keyboard-help", "KEYBOARD HELP");

record_title("ui-dialog-title-edit-world-panel", "WORLD EDITOR");
record_id("east", "m-east");
record_id("north", "m-north");
record_id("west", "m-west");
record_id("south", "m-south");
record_id("random", "m-random");
record_id("m-dimensions", "m-dimensions");
record_id("m-add-robot", "m-add-robot");
record_id("m-robot", "m-robot");
record_id("m-position", "m-position");
record_id("m-turn", "m-turn");
record_id("m-objects", "m-objects");
record_id("m-add", "m-add");
record_id("m-walls", "m-walls");
record_id("m-objects2", "m-objects2");
record_id("m-tiles", "m-tiles");
record_id("m-fill", "m-fill");
record_id("m-solid", "m-solid");
record_id("m-decorative", "m-decorative");
record_id("m-background", "m-background");
record_id("m-goal", "m-goal");
record_id("mg-robot", "mg-robot");
record_id("mg-walls", "mg-walls");
record_id("mg-objects", "mg-objects");

},{"./../lang/en.js":80,"./../lang/fr.js":81,"./../lang/ko.js":82}],84:[function(require,module,exports){
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

window.RUR = RUR || {};

var UsedRobot;

RUR.reset_definitions_en = function () {

    window.at_goal = RUR._at_goal_;
    window.build_wall = RUR._build_wall_;
    window.carries_object = RUR._carries_object_;
    window.default_robot = function () {
        var r = Object.create(UsedRobot.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.dir_js = RUR._dir_js_;
    window.done = RUR._done_;
    window.front_is_clear = RUR._front_is_clear_;
    window.is_facing_north = RUR._is_facing_north_;
    window.move = RUR._move_;
    window.new_robot_images = RUR._new_robot_images_;
    window.object_here = RUR._object_here_;
    window.pause = RUR._pause_;
    window.print_html = RUR._print_html_;
    window.put = RUR._put_;
    window.recording = RUR._recording_;
    window.remove_robots = RUR._remove_robots_;
    window.right_is_clear = RUR._right_is_clear_;
    window.set_max_steps = RUR._set_max_steps_;
    window.sound = RUR._sound_;
    window.take = RUR._take_;
    window.think = RUR._think_;
    window.turn_left = RUR._turn_left_;
    window.view_source_js = RUR._view_source_js_;
    window.wall_in_front = RUR._wall_in_front_;
    window.wall_on_right = RUR._wall_on_right_;
    window.write = RUR._write_;
    window._write = RUR.__write_;
    window.MakeCustomMenu = RUR._MakeCustomMenu_;
    window.World = RUR._World_;


    UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR._add_robot(this.body);
    };

    UsedRobot.prototype.at_goal = function () {
        RUR._UR.at_goal_(this.body);
    };

    UsedRobot.prototype.build_wall = function () {
        RUR._UR.build_wall_(this.body);
    };

    UsedRobot.prototype.carries_object = function () {
        RUR._UR.carries_object_(this.body);
    };

    UsedRobot.prototype.front_is_clear = function () {
        RUR._UR.front_is_clear_(this.body);
    };

    UsedRobot.prototype.is_facing_north = function () {
        RUR._UR.is_facing_north_(this.body);
    };

    UsedRobot.prototype.move = function () {
        RUR._UR.move_(this.body);
    };

    UsedRobot.prototype.object_here = function (obj) {
        RUR._UR.object_here_(this.body, obj);
    };

    UsedRobot.prototype.put = function () {
        RUR._UR.put_(this.body);
    };

    UsedRobot.prototype.right_is_clear = function () {
        RUR._UR.right_is_clear_(this.body);
    };

    UsedRobot.prototype.set_model = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    UsedRobot.prototype.set_trace_color_ = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    UsedRobot.prototype.set_trace_style_ = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    UsedRobot.prototype.take = function () {
        RUR._UR.take_(this.body);
    };


    UsedRobot.prototype.turn_left = function () {
        RUR._UR.turn_left_(this.body);
    };

    UsedRobot.prototype.wall_in_front = function () {
        RUR._UR.wall_in_front_(this.body);
    };

    UsedRobot.prototype.wall_on_right = function () {
        RUR._UR.wall_on_right_(this.body);
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

},{}],85:[function(require,module,exports){
/* See reeborg_en.js */
window.RUR = RUR || {};

var RobotUsage;

RUR.reset_definitions_fr = function () {

    window.au_but = RUR._at_goal_;
    window.construit_un_mur = RUR._build_wall_;
    window.transporte = RUR._carries_object_;
    window.robot_par_defaut = function () {
        var r = Object.create(RobotUsage.prototype);
        r.body = RUR._default_robot_body_();
        return r;
    };
    window.dir_js = RUR._dir_js_;
    window.termine = RUR._done_;
    window.rien_devant = RUR._front_is_clear_;
    window.est_face_au_nord = RUR._is_facing_north_;
    window.avance = RUR._move_;

    mur_devant = RUR._wall_in_front_;
    window.nouvelles_images_de_robot = function (image) {
        if (images.est !== undefined) {
            images.east = images.est;
        }
        if (images.ouest !== undefined) {
            images.west = images.ouest;
        }
        if (images.sud !== undefined) {
            images.south = images.sud;
        }
        if (images.nord !== undefined) {
            images.north = images.nord;
        }
        RUR._new_robot_images_(images);
    };
    window.objet_ici = RUR._object_here_;
    window.pause = RUR._pause_;
    window.print_html = RUR._print_html_;
    window.depose = RUR._put_;
    window.enregistrement = RUR._recording_;
    window.plus_de_robots = RUR._remove_robots_;
    window.rien_a_droite = RUR._right_is_clear_;
    window.nombre_d_instructions = RUR._set_max_steps_;
    window.son = RUR._sound_;
    window.prend = RUR._take_;
    window.pense = RUR._think_;
    window.tourne_a_gauche = RUR._turn_left_;
    window.voir_source_js = RUR._view_source_js_;
    window.mur_devant = RUR._wall_in_front_;
    window.mur_a_droite = RUR._wall_on_right_;
    window.ecrit = RUR._write_;
    window._write = RUR.__write_;
    window.MenuPersonalise = RUR._MakeCustomMenu_;
    window.Monde = RUR._World_;

    // The following are for OOP programming in Javascript
    RobotUsage = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR._add_robot(this.body);
    };
    RobotUsage.prototype.au_but = function () {
        RUR._UR.at_goal_(this.body);
    };

    RobotUsage.prototype.construit_un_mur = function () {
        RUR._UR.build_wall_(this.body);
    };

    RobotUsage.prototype.transporte = function () {
        RUR._UR.carries_object_(this.body);
    };

    RobotUsage.prototype.rien_devant = function () {
        RUR._UR.front_is_clear_(this.body);
    };

    RobotUsage.prototype.est_face_au_nord = function () {
        RUR._UR.is_facing_north_(this.body);
    };

    RobotUsage.prototype.avance = function () {
        RUR._UR.move_(this.body);
    };

    RobotUsage.prototype.objet_ici = function (obj) {
        RUR._UR.object_here_(this.body, obj);
    };

    RobotUsage.prototype.depose = function () {
        RUR._UR.put_(this.body);
    };

    RobotUsage.prototype.rien_a_droite = function () {
        RUR._UR.right_is_clear_(this.body);
    };

    RobotUsage.prototype.modele = function(model) {
        RUR._UR.set_model_(this.body, model);
    };

    RobotUsage.prototype.mur_devant = function () {
        RUR.control.wall_in_front(this.body);
    };

    RobotUsage.prototype.couleur_de_trace = function (robot, color) {
        RUR._UR.set_trace_color_(robot, color);
    };

    RobotUsage.prototype.style_de_trace = function (robot, style) {
        RUR._UR.set_trace_style_(robot, style);
    };

    RobotUsage.prototype.prend = function () {
        RUR._UR.take_(this.body);
    };

    RobotUsage.prototype.tourne_a_gauche = function () {
        RUR._UR.turn_left_(this.body);
    };

    RobotUsage.prototype.mur_devant = function () {
        RUR._UR.wall_in_front_(this.body);
    };

    RobotUsage.prototype.mur_a_droite = function () {
        RUR._UR.wall_on_right_(this.body);
    };

};

},{}]},{},[18]);
