var $module = {
    $$alert:__BRYTHON__._alert,
    confirm: function(message){return __BRYTHON__.JSObject(window.confirm(message))},
    console:{log:function(data){window.console.log(data)}},
    $$document:__BRYTHON__.$DOMNode(document),
    doc: __BRYTHON__.$DOMNode(document),   //want to use document instead of doc
    DOMEvent:__BRYTHON__.DOMEvent,
    DOMNode:__BRYTHON__.DOMNode,
    mouseCoords: function(ev){return __BRYTHON__.JSObject($mouseCoords(ev))},
    prompt: function(message, default_value){
        return __BRYTHON__.JSObject(window.prompt(message, default_value||''))
    },
    win: __BRYTHON__.win,     //want to use window instead of win
    $$window: __BRYTHON__.win
}
