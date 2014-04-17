$module = (function($B){

    var __builtins__ = $B.builtins
    for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}
    var $JSObject = $B.$JSObject
    var JSObject = $B.JSObject
    
    return {
        choice:function(seq){
            return getattr(seq,'__getitem__')(getattr(seq,'__len__')()*Math.random())
        },
        random:function(){
          if(arguments.length > 0){
            throw TypeError("random() takes no arguments ("+arguments.length+" given)")
          } else {
            return float(Math.random());
          }
        },
        randint:function(a,b){return int(Math.floor(Math.random()*(b-a+1)+a))},
        randrange:function(start,stop,step){
          if(step === undefined) {
            step=1;
          } else if(step == 0) { 
            //raise ValueError("zero step for randrange()");
          }
    
          if(stop === undefined) {
             stop=start;
             start=0;
          }
          var width=stop-start;
          if (step==1 && width > 0) {
            return start + int(Math.floor(Math.random()*width));
          } else {
            // raise ValueError("empty range for randrange() ("+start+","+stop+','+step+')');
          }
          
          var n;
          if (step > 0) {
             n=Math.floor((width+step-1)/step);
          } else {
             n=Math.floor((width+step+1)/step);
          }
          return start + step*int(Math.floor(Math.random()*n))
          //return int(Math.random()*(stop/step-start/step)*step + start)
        },
        shuffle:function(x, rnd){
          if (x.length <= 1) { return x}
    
          if (rnd === undefined) {
             rnd=Math.random
          }
    
          for(var j, o, i = x.length; i; j = parseInt(rnd() * i), o = x[--i], x[i] = x[j], x[j] = o);
        }
    }

})(__BRYTHON__)

