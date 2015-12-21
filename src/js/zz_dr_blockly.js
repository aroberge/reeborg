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


RUR.blockly = {};
RUR.blockly.workspace = Blockly.inject('blocklyDiv',
          {toolbox: document.getElementById('toolbox')});

$("#blocklyDiv").resizable({
    resize: function() {
        $("#blocklyDiv:first-child").height($(this).height()-1).width($(this).width()-1);
    }
}).draggable({cursor: "move", handle: "ul"});
