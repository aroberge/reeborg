Blockly.Blocks['_move_'] = {
  /**
   * Block for moving forward.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendField("move()");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("move forward");
  }
};


Blockly.Python['_move_'] = function(block) {
  // Generate Python for moving forward.
  return 'move()\n';
};

Blockly.JavaScript['_move_'] = function(block) {
  // Generate Python for moving forward.
  return 'move();\n';
};

// over-riding default
Blockly.JavaScript['text_print'] = function(block) {
  // Print statement.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'write(' + argument0 + ');\n';
};



RUR.blockly = {};
RUR.blockly.workspace = Blockly.inject('blocklyDiv',
          {toolbox: document.getElementById('toolbox')});

$("#blocklyDiv").resizable({
    resize: function() {
        $("#blocklyDiv:first-child").height($(this).height()-1).width($(this).width()-1);
    }
}).draggable({cursor: "move", handle: "ul"});
