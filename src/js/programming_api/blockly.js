/* jshint -W069 */
require("./../rur.js");
require("./../translator.js");

RUR.blockly = {};
RUR.color_basic = 120;
RUR.color_condition = 240;
RUR.done_colour = "#aa0000";

/****  Begin over-riding Blockly's default */
Blockly.Msg["LOOPS_HUE"] = 230;

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
            .appendField(new Blockly.FieldImage("src/images/star.png", 15, 15, RUR.translate("star")));
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
            .appendField(new Blockly.FieldImage("src/images/token.png", 15, 15, RUR.translate("token")));
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
            .appendField(new Blockly.FieldImage("src/images/apple.png", 15, 15, RUR.translate("apple")));
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
            .appendField(new Blockly.FieldImage("src/images/carrot.png", 15, 15, RUR.translate("carrot")));
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
            .appendField(new Blockly.FieldImage("src/images/dandelion.png", 15, 15, RUR.translate("dandelion")));
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
            .appendField(new Blockly.FieldImage("src/images/daisy.png", 15, 15, RUR.translate("daisy")));
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
            .appendField(new Blockly.FieldImage("src/images/triangle.png", 15, 15, RUR.translate("triangle")));
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
            .appendField(new Blockly.FieldImage("src/images/square.png", 15, 15, RUR.translate("square")));
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
            .appendField(new Blockly.FieldImage("src/images/strawberry.png", 15, 15, RUR.translate("strawberry")));
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
            .appendField(new Blockly.FieldImage("src/images/leaf.png", 15, 15, RUR.translate("leaf")));
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
            .appendField(new Blockly.FieldImage("src/images/banana.png", 15, 15, RUR.translate("banana")));
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

    Blockly.Blocks['_tulip_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("tulip"))
            .appendField(new Blockly.FieldImage("src/images/tulip.png", 15, 15, RUR.translate("tulip")));
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

    Blockly.Blocks['_beeper_'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(RUR.translate("beeper"))
            .appendField(new Blockly.FieldImage("src/images/beeper0.png", 15, 15, RUR.translate("beeper")));
        this.setOutput(true, "String");
        this.setColour(0);
      }
    };
    Blockly.Python['_beeper_'] = function(block) {
      return [RUR.translate("beeper")];
    };
    Blockly.JavaScript['_beeper_'] = function(block) {
      return [RUR.translate("beeper")];
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

    $("#blocklyDiv").remove();
    $("#blockly-wrapper").append('<div id="blocklyDiv"></div>');
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

    if (RUR.state.input_method == "python" ||
        RUR.state.input_method == "javascript" ||
        RUR.state.input_method == "py-repl") {
            $(".blocklyToolboxDiv").css({"pointer-events": "none", "opacity": 0.01});
        }

};

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



RUR.blockly.getValue = function () {
    var xml = Blockly.Xml.workspaceToDom(RUR.blockly.workspace);
    return Blockly.Xml.domToText(xml);
};
RUR.blockly.setValue = function (xml_text) {
    var xml = Blockly.Xml.textToDom(xml_text);
    RUR.blockly.workspace.clear();
    Blockly.Xml.domToWorkspace(xml, RUR.blockly.workspace);
};
