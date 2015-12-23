/* jshint -W069 */

RUR.color_basic = 120;
RUR.color_condition = 240;
RUR.done_colour = "#aa0000";

Blockly.Blocks['_move_'] = {
  init: function() {
    this.setColour(RUR.color_basic);
    this.appendDummyInput().appendField(RUR.translate("move")+"()");
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
    this.appendDummyInput().appendField(RUR.translate("turn_left")+"() \u21BA");
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
    this.appendDummyInput().appendField(RUR.translate("take")+"()");
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
    this.appendDummyInput().appendField(RUR.translate("put")+"()");
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
    this.appendDummyInput().appendField(RUR.translate("pause")+"()");
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
    this.appendDummyInput().appendField(RUR.translate("build_wall")+"()");
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
    this.appendDummyInput().appendField(RUR.translate("done")+"()");
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


Blockly.Blocks['_wall_in_front_'] = {
  init: function() {
    var choices =  [
        [RUR.translate("wall_in_front")+"()", RUR.translate("wall_in_front")+"()"],
        [RUR.translate("wall_on_right")+"()", RUR.translate("wall_on_right")+"()"]];
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
    this.setOutput(true, "Boolean");
    this.setTooltip(RUR.translate("True if a wall is blocking the way."));
  }
};
Blockly.Python['_wall_in_front_'] = function(block) {
  return [block.getFieldValue('choice')];
};
Blockly.JavaScript['_wall_in_front_'] = function(block) {
  return [block.getFieldValue('choice')];
};


Blockly.Blocks['_front_is_clear_'] = {
  init: function() {
    var choices =  [
        [RUR.translate("front_is_clear")+"()", RUR.translate("front_is_clear")+"()"],
        [RUR.translate("right_is_clear")+"()", RUR.translate("right_is_clear")+"()"]];
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
    this.setOutput(true, "Boolean");
    this.setTooltip(RUR.translate("True if nothing is blocking the way."));
  }
};
Blockly.Python['_front_is_clear_'] = function(block) {
  return [block.getFieldValue('choice')];
};
Blockly.JavaScript['_front_is_clear_'] = function(block) {
  return [block.getFieldValue('choice')];
};


Blockly.Blocks['_at_goal_'] = {
  init: function() {
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(RUR.translate("at_goal")+"()");
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
    this.appendDummyInput().appendField(RUR.translate("carries_object")+"()");
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
    this.appendDummyInput().appendField(RUR.translate("object_here")+"()");
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
    this.appendDummyInput().appendField(RUR.translate("is_facing_north")+"()");
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


/** Simple if skeletton from
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8aine
****/

Blockly.Blocks['_if_'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("then")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.JavaScript['_if_'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};
Blockly.Python['_if_'] = function(block) {
  var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var statements_then = Blockly.Python.statementToCode(block, 'then');
  // TODO: Assemble Python into code variable.
  var code = '...';
  return code;
};





/****  Begin over-riding Blockly's default */
Blockly.JavaScript['text_print'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return RUR.translate("write")+'(' + argument0 + ');\n';
};
Blockly.Python.INDENT = '    ';
Blockly.Blocks.loops.HUE = 230;

Blockly.makeColour = function(hue) {
  if (hue === RUR.done_colour){
      return hue;
  }
  return goog.color.hsvToHex(hue, Blockly.HSV_SATURATION,
      Blockly.HSV_VALUE * 255);
};

if (document.documentElement.lang=="fr") {
    Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = "pour";
    Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = "pour";
}
/****  End of over-riding Blockly's default */

RUR.blockly = {};
RUR.blockly.workspace = Blockly.inject('blocklyDiv',
          {toolbox: document.getElementById('toolbox')});

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
