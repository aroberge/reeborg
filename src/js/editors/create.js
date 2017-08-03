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

window.extra_editor = CodeMirror.fromTextArea(document.getElementById('extra-code'), {
  mode: {
    name: "python",
    version: 3
  },
  lineNumbers: true,
  readOnly: true,
  theme: 'reeborg-readonly',
  indentUnit: 4,
  viewportMargin: Infinity
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
