var $module = (function($B){

var _mod = {}
$ModuleFinderDict = {__class__:$B.$type,__name__:'ModuleFinder'}
$ModuleFinderDict.__mro__ = [$ModuleFinderDict,$B.builtins.object.$dict]

$ModuleFinderDict.run_script = function(self, pathname){
    // pathname is the url of a Python script
    var py_src = $B.builtins.$open(pathname).read()
    // transform into internal Brython tree structure
    var root = $B.py2js(py_src)
    // walk the tree to find occurences of imports
    function walk(node){
        var modules = []
        var ctx = node.context
        if(ctx && ctx.type=='node'){ctx = ctx.tree[0]}

        if(ctx && ctx.type=="import"){
            for(var i=0;i<ctx.tree.length;i++){
                if(modules.indexOf(ctx.tree[i].name)==-1){
                    modules.push(ctx.tree[i].name)
                }
            }
        }else if(ctx && ctx.type=="from"){
            if(modules.indexOf(ctx.module)==-1){
                modules.push(ctx.module)
            }
        }
        
        for(var i=0;i<node.children.length;i++){
            mods = walk(node.children[i])
            for(var j=0;j<mods.length;j++){
                if(modules.indexOf(mods[j])==-1){modules.push(mods[j])}
            }
        }
        return modules
    }
    self.modules = walk(root)
}

_mod.ModuleFinder = function(){
    return {__class__:$ModuleFinderDict}
}
_mod.ModuleFinder.$dict = $ModuleFinderDict
_mod.ModuleFinder.__class__ = $B.$factory
$ModuleFinderDict.$factory = _mod.ModuleFinder

return _mod
})(__BRYTHON__)
