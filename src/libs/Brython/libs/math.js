$module = {
    __getattr__ : function(attr){
        var res = this[attr]
        if(res===undefined){$raise('AttributeError','module has no attribute '+attr)}
        return res
    },
    cos : function(x){return float(Math.cos(x))},
    floor:function(x){return Math.floor(x)},
    pi : float(Math.PI),
    sin : function(x){return float(Math.sin(x))},
    sqrt : function(x){return float(Math.sqrt(x))}
}
$module.__class__ = $module // defined in $py_utils
$module.__str__ = function(){return "<module 'math'>"}