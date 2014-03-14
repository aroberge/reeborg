$module = {
    __getattr__ : function(attr){
        if(attr in this){return this[attr]}
        else{$raise('AttributeError','module sys has no attribute '+attr)}
    },
    dis : function(src){return $py2js(src).to_js()}
}