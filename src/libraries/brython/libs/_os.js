var $module = (function($B){

    var __builtins__ = $B.builtins
    return {
        random:function(){return __builtins__.float(Math.random())},
        randint:function(a,b){return __builtins__.int(Math.floor(Math.random()*(b-a)+a))}
    }
})(__BRYTHON__)
