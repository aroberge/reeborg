import widget
from browser import html, doc

class Dialog(widget.DraggableWidget):
  def __init__(self, id=None):
      self._div_shell=html.DIV(
         Class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable ui-resizable",
         style={'position': 'absolute', 'height': 'auto', 'width': '300px',
                'top': '98px', 'left': '140px', 'display': 'block'})

      widget.DraggableWidget.__init__(self, self._div_shell, 'dialog', id)

      _div_titlebar=html.DIV(Id="titlebar",
           Class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix")
      self._div_shell <= _div_titlebar

      self._div_title=html.SPAN(Id="title", Class="ui-dialog-title")
        
      _div_titlebar <= self._div_title

      self._title_button=html.BUTTON(Title="close",
            Class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close")

      def dialog_close(e):
          #del document[self._div_shell.id]
          del doc[self._div_shell.id]

      self._title_button.bind('click', dialog_close)
      _span=html.SPAN(Class="ui-button-icon-primary ui-icon ui-icon-closethick")
      self._title_button <= _span

      _span=html.SPAN('close', Class="ui-button-text")
      self._title_button <= _span

      _div_titlebar <= self._title_button

      self._div_dialog=html.DIV(Class="ui-dialog-content ui-widget-content",
           style={'width': 'auto', 'min-height': '105px', 
                  'max-height': 'none', 'height': 'auto'})

      self._div_shell <= self._div_dialog

      for _i in ['n', 'e', 's', 'w', 'se', 'sw', 'ne', 'nw']:
          if _i == 'se':
             _class="ui-resizable-handle ui-resizable-%s ui-icon ui-icon-gripsmall-diagonal-%s" % (_i, _i)
          else:
             _class="ui-resizable-handle ui-resizable-%s" % _i

          self._div_shell <= html.DIV(Class=_class, style={'z-index': '90'})

      doc <= self._div_shell

  def set_title(self, title):
      self._div_title.set_text(title)

  def set_body(self, body):
      self._div_dialog.set_html(body)
