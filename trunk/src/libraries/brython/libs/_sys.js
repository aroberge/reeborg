var $module = (function($B){

    var __builtins__ = $B.builtins
    return {
        modules :
            {'__get__':function(){return __builtins__.dict($B.JSObject($B.imported))},
             '__set__':0 // data descriptor, to force use of __get__
            },
        stderr : $B.stderr,
        stdout : $B.stdout,
    }
})(__BRYTHON__)
