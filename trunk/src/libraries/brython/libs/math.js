var $module = (function($B){

var __builtins__ = $B.builtins
for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}

var float_check=function(x) {
    if (isinstance(x, float)) return x.value;
    return x;
}

var isinf=function(x) {
    var x1=float_check(x);
    return x1 == -Infinity || x1 == Infinity || x1 == Number.POSITIVE_INFINITY || x1 == Number.NEGATIVE_INFINITY;
}

var _mod = {
    __getattr__ : function(attr){
        var res = this[attr]
        if(res===undefined){$raise('AttributeError','module math has no attribute '+attr)}
        return res
    },
    acos: function(x) {return float(Math.acos(float_check(x)))},
    acosh: function(x) { 
        if (isinf(x)) return float('inf');
        var y = float_check(x);
        return float(Math.log(y + Math.sqrt(y*y-1)));
    },
    asin: function(x) {return float(Math.asin(float_check(x)))},
    asinh: function(x) {
        if (isinf(x)) return float('inf');
        var y = float_check(x);
        
        return float(Math.log(y + Math.sqrt(y*y+1)))
    },
    atan: function(x) {
        if (isinf(x)) return float(Math.PI/2);
        return float(Math.atan(float_check(x)))},
    atan2: function(y,x) {return float(Math.atan2(y,x))},
    atanh: function(x) { 
       var y=float_check(x);
       if (y==0) return 0;
       return float(0.5 * Math.log((1/y+1)/(1/y-1)));
    },
    ceil: function(x) {
       var y=float_check(x);
       if (!isNaN(parseFloat(y)) && isFinite(y)) return int(Math.ceil(y));
       try{return getattr(y,'__ceil__')()}catch(err){$B.$pop_exc()}
       
       $raise('ValueError', 'object is not a number and does not contain __ceil__')
    },
    copysign: function(x,y) {
        var x1=Math.abs(float_check(x));
        var y1=float_check(y); 
        var sign=y1?y1<0?-1:1:1
        if(isinstance(x,int)){return x1 * sign}
        else{return float(x1 * sign)}
    },
    cos : function(x){return float(Math.cos(float_check(x)))},
    degrees: function(x){return float(float_check(x) * 180/Math.PI)},
    e: float(Math.E),
    erf: function(x) {
        // inspired from 
        // http://stackoverflow.com/questions/457408/is-there-an-easily-available-implementation-of-erf-for-python
        var y =float_check(x);
        var t = 1.0 / (1.0 + 0.5 * Math.abs(y))
        var ans = 1 - t * Math.exp( -y*y - 1.26551223 +
                     t * ( 1.00002368 +
                     t * ( 0.37409196 + 
                     t * ( 0.09678418 + 
                     t * (-0.18628806 + 
                     t * ( 0.27886807 + 
                     t * (-1.13520398 + 
                     t * ( 1.48851587 + 
                     t * (-0.82215223 + 
                     t * 0.17087277)))))))))
        if (y >= 0.0) return ans

        return -ans
    },

    erfc: function(x) {
        // inspired from 
        // http://stackoverflow.com/questions/457408/is-there-an-easily-available-implementation-of-erf-for-python
        var y = float_check(x);
        var t = 1.0 / (1.0 + 0.5 * Math.abs(y))
        var ans = 1 - t * Math.exp( -y*y - 1.26551223 +
                     t * ( 1.00002368 +
                     t * ( 0.37409196 + 
                     t * ( 0.09678418 + 
                     t * (-0.18628806 + 
                     t * ( 0.27886807 + 
                     t * (-1.13520398 + 
                     t * ( 1.48851587 + 
                     t * (-0.82215223 + 
                     t * 0.17087277)))))))))
        if (y >= 0.0) return 1-ans
        return 1+ans
    },
    exp: function(x){return float(Math.exp(float_check(x)))},
    expm1: function(x){return float(Math.exp(float_check(x))-1)},
    fabs: function(x){ return x>0?float(x):float(-x)},
    factorial: function(x) {
         //using code from http://stackoverflow.com/questions/3959211/fast-factorial-function-in-javascript
         var y=float_check(x);
         var r=1
         for (var i=2; i<=y; i++){r*=i}
         return r
    },
    floor:function(x){return Math.floor(float_check(x))},
    fmod:function(x,y){return float(float_check(x)%float_check(y))},
    frexp:function(x){
       var x1=float_check(x);
       var ex = Math.floor(Math.log(x1) / Math.log(2)) + 1;
       frac = x1 / Math.pow(2, ex);
       return [frac, ex];
    },
    //fsum:function(x){},
    gamma: function(x){
         //using code from http://stackoverflow.com/questions/3959211/fast-factorial-function-in-javascript
         // Lanczos Approximation of the Gamma Function
         // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)
         var y=float_check(x);
         var z = y + 1;
         var d1 = Math.sqrt(2 * Math.PI) / z;

         var d2 = 1.000000000190015;
         d2 +=  76.18009172947146 / (z+1);
         d2 += -86.50532032941677 / (z+2);
         d2 +=  24.01409824083091 / (z+3); 
         d2 += -1.231739572450155 / (z+4); 
         d2 +=  1.208650973866179E-3 / (z+5);
         d2 += -5.395239384953E-6 / (z+6);

         return d1 * d2 * Math.pow(z+5.5,z+0.5) * Math.exp(-(z+5.5));
    },
    hypot: function(x,y){
       var x1=float_check(x);
       var y1=float_check(y);
       return float(Math.sqrt(x1*x1 + y1*y1))},
    isfinite:function(x) {return isFinite(float_check(x))},
    isinf:function(x) { return isinf(x);},
    isnan:function(x) {return isNaN(float_check(x))},
    ldexp:function(x,i) {
        var mul = Math.pow(2,float_check(i))
        if(isinstance(x,int)){return x * mul}
        else{return float(x.value*mul)}
    },
    lgamma:function(x) {
         // see gamma function for sources
         var y=float_check(x);
         var z = y + 1;
         var d1 = Math.sqrt(2 * Math.PI) / z;

         var d2 = 1.000000000190015;
         d2 +=  76.18009172947146 / (z+1);
         d2 += -86.50532032941677 / (z+2);
         d2 +=  24.01409824083091 / (z+3); 
         d2 += -1.231739572450155 / (z+4); 
         d2 +=  1.208650973866179E-3 / (z+5);
         d2 += -5.395239384953E-6 / (z+6);

         return float(Math.log(Math.abs(d1 * d2 * Math.pow(z+5.5,z+0.5) * Math.exp(-(z+5.5)))));
    },
    log: function(x, base) {
         var x1=float_check(x);
         if (base === undefined) return float(Math.log(x1));
         return float(Math.log(x1)/Math.log(float_check(base)));
    },
    log1p: function(x) {return float(Math.log(1.0 + float_check(x)))},
    log2: function(x) {return float(Math.log(float_check(x))/Math.LN2)},
    log10: function(x) {return float(Math.log(float_check(x))/Math.LN10)},
    modf:function(x) {
       var x1=float_check(x);
       if (x1 > 0) {
          var i=float(x1-Math.floor(x1));
          return [i, float(x1-i)]
       }

       var i=float(x1-Math.ceil(x1));
       return [i, float(Math.ceil(x1))]
    },
    pi : float(Math.PI),
    pow: function(x,y) {
        if(isinstance(x,int)){return Math.pow(x,float_check(y))}
        else{return float(Math.pow(x.value,float_check(y)))}
    },
    radians: function(x){return float(float_check(x) * Math.PI/180)},
    sin : function(x){return float(Math.sin(float_check(x)))},
    sqrt : function(x){return float(Math.sqrt(float_check(x)))},
    trunc: function(x) {
       try{return getattr(x,'__trunc__')()}catch(err){$B.$pop_exc()}
       var x1=float_check(x);
       if (!isNaN(parseFloat(x1)) && isFinite(x1)) return int(Math.floor(x1));
       
       $raise('ValueError', 'object is not a number and does not contain __trunc__')
    }
}

for(var $attr in _mod){
    if(typeof _mod[$attr]==='function'){
        _mod[$attr].__repr__=(function(func){
            return function(){return '<built-in function '+func+'>'}})($attr)
        _mod[$attr].__str__=(function(func){
            return function(){return '<built-in function '+func+'>'}})($attr)
    }
}

return _mod

})(__BRYTHON__)