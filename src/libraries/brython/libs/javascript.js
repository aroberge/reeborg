var $module = {
    JSObject:__BRYTHON__.JSObject,
    JSConstructor:__BRYTHON__.JSConstructor,
    console: __BRYTHON__.JSObject(window.console),
    py2js: function(src){return __BRYTHON__.py2js(src).to_js()}
}
