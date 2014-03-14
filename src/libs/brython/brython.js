// brython.js www.brython.info
// version 1.0.20130122-195420
// version compiled from commented, indented source files at http://code.google.com/p/brython/
function abs(obj){
if(isinstance(obj,int)){return int(Math.abs(obj))}
else if(isinstance(obj,float)){return int(Math.abs(obj.value))}
else{$raise('TypeError',"Bad operand type for abs(): '"+str(obj.__class__)+"'")}
}
function $alert(src){alert(str(src))}
function all(iterable){
while(true){
try{
var elt=next(iterable)
if(!bool(elt)){return False}
}catch(err){return True}
}
}
function any(iterable){
while(true){
try{
var elt=next(iterable)
if(bool(elt)){return True}
}catch(err){return False}
}
}
function assert_raises(){
var $ns=$MakeArgs('assert_raises',arguments,['exc','func'],{},'args','kw')
var args=$ns['args']
try{$ns['func'].apply(this,args)}
catch(err){
if(err.name!==$ns['exc']){
$raise('AssertionError',
"exception raised '"+err.name+"', expected '"+$ns['exc']+"'")
}
return
}
$raise('AssertionError',"no exception raised, expected '"+$ns['exc']+"'")
}
function bool(obj){
if(obj===null){return False}
else if(isinstance(obj,dict)){return obj.keys.length>0}
else if(isinstance(obj,tuple)){return obj.items.length>0}
else if(typeof obj==="boolean"){return obj}
else if(typeof obj==="number" || typeof obj==="string"){
if(obj){return true}else{return false}
}else if('__bool__' in obj){return obj.__bool__()}
else if('__len__' in obj){return obj.__len__()>0}
return true
}
bool.__class__=$type
bool.__name__='bool'
bool.__str__=function(){return "<class 'bool'>"}
bool.toString=bool.__str__
function $class(obj,info){
this.obj=obj
this.info=info
this.__class__=Object
this.toString=function(){return "<class '"+info+"'>"}
}
function $confirm(src){return confirm(src)}
function dict(){
if(arguments.length==0){return new $DictClass([],[])}
var iterable=arguments[0]
var obj=new $DictClass([],[])
for(var i=0;i<iterable.__len__();i++){
var elt=iterable.__item__(i)
obj.__setitem__(elt.__item__(0),elt.__item__(1))
}
return obj
}
dict.__class__=$type
dict.__name__='dict'
dict.toString=function(){return "<class 'dict'>"}
function $DictClass($keys,$values){
var x=null
var i=null
this.iter=null
this.__class__=dict
this.$keys=$keys
this.$values=$values
}
$DictClass.prototype.toString=function(){
if(this.$keys.length==0){return '{}'}
var res="{",key=null,value=null,i=null
var qesc=new RegExp('"',"g")
for(var i=0;i<this.$keys.length;i++){
if(typeof this.$keys[i]==="string"){key='"'+$escape_dq(this.$keys[i])+'"'}
else{key=str(this.$keys[i])}
if(typeof this.$values[i]==="string"){value='"'+$escape_dq(this.$values[i])+'"'}
else{value=str(this.$values[i])}
res +=key+':'+value+','
}
return res.substr(0,res.length-1)+'}'
}
$DictClass.prototype.__add__=function(other){
var msg="unsupported operand types for +:'dict' and "
$raise('TypeError',msg+"'"+(str(other.__class__)|| typeof other)+"'")
}
$DictClass.prototype.__class__=dict
$DictClass.prototype.__contains__=function(item){
return this.$keys.__contains__(item)
}
$DictClass.prototype.__delitem__=function(arg){
for(var i=0;i<this.$keys.length;i++){
if(arg.__eq__(this.$keys[i])){
this.$keys.splice(i,1)
this.$values.splice(i,1)
return
}
}
$raise('KeyError',str(arg))
}
$DictClass.prototype.__eq__=function(other){
if(!isinstance(other,dict)){return False}
if(other.$keys.length!==this.$keys.length){return False}
for(var i=0;i<this.$keys.length;i++){
var key=this.$keys[i]
for(j=0;j<other.$keys.length;j++){
try{
if(other.$keys[j].__eq__(key)){
if(!other.$values[j].__eq__(this.$values[i])){
return False
}
}
}catch(err){void(0)}
}
}
return True
}
$DictClass.prototype.__getattr__=function(attr){
return $getattr(this,attr)
}
$DictClass.prototype.__getitem__=function(arg){
for(var i=0;i<this.$keys.length;i++){
if(arg.__eq__(this.$keys[i])){return this.$values[i]}
}
$raise('KeyError',str(arg))
}
$DictClass.prototype.__in__=function(item){return item.__contains__(this)}
$DictClass.prototype.__item__=function(i){return this.$keys[i]}
$DictClass.prototype.__len__=function(){return this.$keys.length}
$DictClass.prototype.__ne__=function(other){return !this.__eq__(other)}
$DictClass.prototype.__next__=function(){
if(this.iter==null){this.iter==0}
if(this.iter<this.$keys.length){
this.iter++
return this.$keys[this.iter-1]
}else{
this.iter=null
$raise('StopIteration')
}
}
$DictClass.prototype.__not_in__=function(item){return !(item.__contains__(this))}
$DictClass.prototype.__setitem__=function(key,value){
for(var i=0;i<this.$keys.length;i++){
try{
if(key.__eq__(this.$keys[i])){
this.$values[i]=value
return
}
}catch(err){
void(0)
}
}
this.$keys.push(key)
this.$values.push(value)
}
$DictClass.prototype.items=function(){
return new $iterator(zip(this.$keys,this.$values),"dict_items")
}
$DictClass.prototype.keys=function(){
return new $iterator(this.$keys,"dict keys")
}
$DictClass.prototype.values=function(){
return new $iterator(this.$values,"dict values")
}
function dir(obj){
var res=[]
for(var attr in obj){res.push(attr)}
res.sort()
return res
}
function enumerate(iterator){
var res=[]
for(var i=0;i<iterator.__len__();i++){
res.push([i,iterator.__item__(i)])
}
return res
}
function $eval(src){
try{return eval($py2js(src).to_js())}
catch(err){
if(err.py_error===undefined){$raise('ExecutionError',err.message)}
if(document.$stderr){document.$stderr.write(document.$stderr_buff+'\n')}
else{throw(err)}
}
}
function exec(src){
try{eval($py2js(src).to_js())}
catch(err){
if(err.py_error===undefined){$raise('ExecutionError',err.message)}
if(document.$stderr){document.$stderr.write(document.$stderr_buff+'\n')}
else{throw(err)}
}
}
function filter(){
if(arguments.length!=2){$raise('TypeError',
"filter expected 2 arguments, got "+arguments.length)}
var func=arguments[0],iterable=arguments[1]
var res=[]
for(var i=0;i<iterable.__len__();i++){
if(func(iterable.__item__(i))){
res.push(iterable.__item__(i))
}
}
return res
}
function float(value){
if(typeof value=="number" ||(
typeof value=="string" && !isNaN(value))){
return new $FloatClass(parseFloat(value))
}else if(isinstance(value,float)){return value}
else{$raise('ValueError',"Could not convert to float(): '"+str(value)+"'")}
}
float.__class__=$type
float.__name__='float'
float.toString=function(){return "<class 'float'>"}
function $FloatClass(value){
this.value=value
this.__class__=float
}
$FloatClass.prototype.toString=function(){
var res=this.value+''
if(res.indexOf('.')==-1){res+='.0'}
return str(res)
}
$FloatClass.prototype.__class__=float
$FloatClass.prototype.__bool__=function(){return bool(this.value)}
$FloatClass.prototype.__floordiv__=function(other){
if(isinstance(other,int)){
if(other===0){$raise('ZeroDivisionError','division by zero')}
else{return float(Math.floor(this.value/other))}
}else if(isinstance(other,float)){
if(!other.value){$raise('ZeroDivisionError','division by zero')}
else{return float(Math.floor(this.value/other.value))}
}else{$raise('TypeError',
"unsupported operand type(s) for //: 'int' and '"+other.__class__+"'")
}
}
$FloatClass.prototype.__in__=function(item){return item.__contains__(this)}
$FloatClass.prototype.__not_in__=function(item){return !(item.__contains__(this))}
$FloatClass.prototype.__truediv__=function(other){
if(isinstance(other,int)){
if(other===0){$raise('ZeroDivisionError','division by zero')}
else{return float(this.value/other)}
}else if(isinstance(other,float)){
if(!other.value){$raise('ZeroDivisionError','division by zero')}
else{return float(this.value/other.value)}
}else{$raise('TypeError',
"unsupported operand type(s) for //: 'int' and '"+other.__class__+"'")
}
}
var $op_func=function(other){
if(isinstance(other,int)){return float(this.value-other)}
else if(isinstance(other,float)){return float(this.value-other.value)}
else{$raise('TypeError',
"unsupported operand type(s) for -: "+this.value+" (float) and '"+other.__class__+"'")
}
}
$op_func +=''
var $ops={'+':'add','-':'sub','*':'mul','%':'mod'}
for($op in $ops){
eval('$FloatClass.prototype.__'+$ops[$op]+'__ = '+$op_func.replace(/-/gm,$op))
}
var $comp_func=function(other){
if(isinstance(other,int)){return this.value > other.valueOf()}
else if(isinstance(other,float)){return this.value > other.value}
else{$raise('TypeError',
"unorderable types: "+this.__class__+'() > '+other.__class__+"()")
}
}
$comp_func +=''
var $comps={'>':'gt','>=':'ge','<':'lt','<=':'le','==':'eq','!=':'ne'}
for($op in $comps){
eval("$FloatClass.prototype.__"+$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))
}
var $notimplemented=function(other){
$raise('TypeError',
"unsupported operand types for OPERATOR: '"+this.__class__+"' and '"+other.__class__+"'")
}
$notimplemented +=''
for($op in $operators){
var $opfunc='__'+$operators[$op]+'__'
if(!($opfunc in $FloatClass.prototype)){
eval('$FloatClass.prototype.'+$opfunc+"="+$notimplemented.replace(/OPERATOR/gm,$op))
}
}
function getattr(obj,attr,_default){
if(obj.__getattr__!==undefined &&
obj.__getattr__(attr)!==undefined){
return obj.__getattr__(attr)
}
else if(_default !==undefined){return _default}
else{$raise('AttributeError',
"'"+str(obj.__class__)+"' object has no attribute '"+attr+"'")}
}
function hasattr(obj,attr){
try{getattr(obj,attr);return True}
catch(err){return False}
}
function input(src){
return prompt(src)
}
function int(value){
if(isinstance(value,int)){return value}
else if(typeof value=="number" ||
(typeof value=="string" && parseInt(value)!=NaN)){
return parseInt(value)
}else if(isinstance(value,float)){
return parseInt(value.value)
}else{$raise('ValueError',
"Invalid literal for int() with base 10: '"+str(value)+"'"+value.__class__)
}
}
int.__class__=$type
int.__name__='int'
int.toString=function(){return "<class 'int'>"}
Number.prototype.__class__=int
Number.prototype.__floordiv__=function(other){
if(isinstance(other,int)){
if(other==0){$raise('ZeroDivisionError','division by zero')}
else{return Math.floor(this/other)}
}else if(isinstance(other,float)){
if(!other.value){$raise('ZeroDivisionError','division by zero')}
else{return float(Math.floor(this/other.value))}
}else{$UnsupportedOpType("//","int",other.__class__)}
}
Number.prototype.__getattr__=function(attr){$raise('AttributeError',
"'int' object has no attribute '"+attr+"'")}
Number.prototype.__in__=function(item){return item.__contains__(this)}
Number.prototype.__int__=function(){return this}
Number.prototype.__mul__=function(other){
var val=this.valueOf()
if(isinstance(other,int)){return this*other}
else if(isinstance(other,float)){return float(this*other.value)}
else if(typeof other==="string"){
var res=''
for(var i=0;i<val;i++){res+=other}
return res
}else if(isinstance(other,list)){
var res=[]
var $temp=other.slice(0,other.length)
for(var i=0;i<val-1;i++){res=res.concat($temp)}
return res
}else{$UnsupportedOpType("*",int,other)}
}
Number.prototype.__not_in__=function(item){
res=item.__contains__(this)
return !res
}
Number.prototype.__pow__=function(other){
if(typeof other==="number"){return int(Math.pow(this.valueOf(),other.valueOf()))}
else{$UnsupportedOpType("//",int,other.__class__)}
}
Number.prototype.__setattr__=function(attr,value){$raise('AttributeError',
"'int' object has no attribute "+attr+"'")}
Number.prototype.__str__=function(){return this.toString()}
Number.prototype.__truediv__=function(other){
if(isinstance(other,int)){
if(other==0){$raise('ZeroDivisionError','division by zero')}
else{return float(this/other)}
}else if(isinstance(other,float)){
if(!other.value){$raise('ZeroDivisionError','division by zero')}
else{return float(this/other.value)}
}else{$UnsupportedOpType("//","int",other.__class__)}
}
var $op_func=function(other){
if(isinstance(other,int)){
var res=this.valueOf()-other.valueOf()
if(isinstance(res,int)){return res}
else{return float(res)}
}
else if(isinstance(other,float)){return float(this.valueOf()-other.value)}
else{$raise('TypeError',
"unsupported operand type(s) for -: "+this.value+" (float) and '"+str(other.__class__)+"'")
}
}
$op_func +=''
var $ops={'+':'add','-':'sub','%':'mod'}
for($op in $ops){
eval('Number.prototype.__'+$ops[$op]+'__ = '+$op_func.replace(/-/gm,$op))
}
var $comp_func=function(other){
if(isinstance(other,int)){return this.valueOf()> other.valueOf()}
else if(isinstance(other,float)){return this.valueOf()> other.value}
else{$raise('TypeError',
"unorderable types: "+str(this.__class__)+'() > '+str(other.__class__)+"()")}
}
$comp_func +=''
var $comps={'>':'gt','>=':'ge','<':'lt','<=':'le','==':'eq','!=':'ne'}
for($op in $comps){
eval("Number.prototype.__"+$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))
}
var $notimplemented=function(other){
$raise('TypeError',
"unsupported operand types for OPERATOR: '"+str(this.__class__)+"' and '"+str(other.__class__)+"'")
}
$notimplemented +=''
for($op in $operators){
var $opfunc='__'+$operators[$op]+'__'
if(!($opfunc in Number.prototype)){
eval('Number.prototype.'+$opfunc+"="+$notimplemented.replace(/OPERATOR/gm,$op))
}
}
function isinstance(obj,arg){
if(obj===null){return arg===None}
if(obj===undefined){return false}
if(arg.constructor===Array){
for(var i=0;i<arg.length;i++){
if(isinstance(obj,arg[i])){return true}
}
return false
}else{
if(arg===int){
return((typeof obj)=="number"||obj.constructor===Number)&&(obj.valueOf()%1===0)
}
if(arg===float){
return((typeof obj=="number")&&(obj.valueOf()%1!==0))||
(obj.__class__===float)}
if(arg===str){return(typeof obj=="string")}
if(arg===list){return(obj.constructor===Array)}
if(obj.__class__!==undefined){return obj.__class__===arg}
return obj.constructor===arg
}
}
function iter(obj){
if('__item__' in obj){
obj.__counter__=0
return obj
}
$raise('TypeError',"'"+str(obj.__class__)+"' object is not iterable")
}
function $iterator(obj,info){
this.__getattr__=function(attr){
var res=this[attr]
if(res===undefined){$raise('AttributeError',
"'"+info+"' object has no attribute '"+attr+"'")}
else{return res}
}
this.__len__=function(){return obj.__len__()}
this.__item__=function(i){return obj.__item__(i)}
this.__class__=new $class(this,info)
this.toString=function(){return info+'('+obj.toString()+')'}
}
function len(obj){
try{return obj.__len__()}
catch(err){$raise('TypeError',"object of type "+obj.__class__+" has no len()")}
}
function map(){
var func=arguments[0],res=[],rank=0
while(true){
var args=[],flag=true
for(var i=1;i<arguments.length;i++){
var x=arguments[i].__item__(rank)
if(x===undefined){flag=false;break}
args.push(x)
}
if(!flag){break}
res.push(func.apply(null,args))
rank++
}
return res
}
function $extreme(args,op){
if(op==='__gt__'){var $op_name="max"}
else{var $op_name="min"}
if(args.length==0){$raise('TypeError',$op_name+" expected 1 argument, got 0")}
var last_arg=args[args.length-1]
var last_i=args.length-1
var has_key=false
if(isinstance(last_arg,$Kw)){
if(last_arg.name==='key'){
var func=last_arg.value
has_key=true
last_i--
}else{$raise('TypeError',$op_name+"() got an unexpected keyword argument")}
}else{var func=function(x){return x}}
if((has_key && args.length==2)||(!has_key && args.length==1)){
var arg=args[0]
var $iter=iter(arg)
var res=null
while(true){
try{
var x=next($iter)
if(res===null || bool(func(x)[op](func(res)))){res=x}
}catch(err){
if(err.name=="StopIteration"){return res}
throw err
}
}
}else{
var res=null
for(var i=0;i<=last_i;i++){
var x=args[i]
if(res===null || bool(func(x)[op](func(res)))){res=x}
}
return res
}
}
function max(){
var args=[]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
return $extreme(args,'__gt__')
}
function min(){
var args=[]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
return $extreme(args,'__lt__')
}
function next(obj){
if('__item__' in obj){
if(obj.__counter__===undefined){obj.__counter__=0}
var res=obj.__item__(obj.__counter__)
if(res!==undefined){obj.__counter__++;return res}
$raise('StopIteration')
}
$raise('TypeError',"'"+str(obj.__class__)+"' object is not iterable")
}
function $not(obj){return !bool(obj)}
function $ObjectClass(){
this.__class__="<class 'object'>"
}
$ObjectClass.prototype.__getattr__=function(attr){
if(attr in this){return this[attr]}
else{$raise('AttributeError',"object has no attribute '"+attr+"'")}
}
$ObjectClass.prototype.__delattr__=function(attr){delete this[attr]}
$ObjectClass.prototype.__setattr__=function(attr,value){this[attr]=value}
function object(){
return new $ObjectClass()
}
object.__class__=$type
object.__name__='object'
object.__str__="<class 'object'>"
function $print(){
var $ns=$MakeArgs('print',arguments,[],{},'args','kw')
var args=$ns['args']
var kw=$ns['kw']
var end='\n'
var res=''
if(kw.__contains__('end')){end=kw.__getitem__('end')}
for(var i=0;i<args.length;i++){
res +=str(args[i])
if(i<args.length-1){res +=' '}
}
res +=end
document.$stdout.write(res)
}
log=$print
function $prompt(text,fill){return prompt(text,fill || '')}
function range(){
var $ns=$MakeArgs('range',arguments,[],{},'args',null)
var args=$ns['args']
if(args.length>3){$raise('TypeError',
"range expected at most 3 arguments, got "+args.length)
}
var start=0
var stop=0
var step=1
if(args.length==1){stop=args[0]}
else if(args.length>=2){
start=args[0]
stop=args[1]
}
if(args.length>=3){step=args[2]}
if(step==0){$raise('ValueError',"range() arg 3 must not be zero")}
var res=[]
if(step>0){
for(var i=start;i<stop;i+=step){res.push(i)}
}else if(step<0){
for(var i=start;i>stop;i+=step){res.push(i)}
}
return res
}
function repr(obj){return obj.toString()}
function reversed(seq){
if(isinstance(seq,list)){seq.reverse();return seq}
else if(isinstance(seq,str)){
var res=''
for(var i=seq.length-1;i>=0;i--){res+=seq.charAt(i)}
return res
}else{$raise('TypeError',
"argument to reversed() must be a sequence")}
}
function round(arg,n){
if(!isinstance(arg,[int,float])){
$raise('TypeError',"type "+str(arg.__class__)+" doesn't define __round__ method")
}
if(n===undefined){n=0}
if(!isinstance(n,int)){$raise('TypeError',
"'"+n.__class__+"' object cannot be interpreted as an integer")}
var mult=Math.pow(10,n)
return Number(Math.round(arg*mult)).__truediv__(mult)
}
function set(){
var i=0
if(arguments.length==0){return new $SetClass()}
else if(arguments.length==1){
var arg=arguments[0]
if(isinstance(arg,set)){return arg}
var obj=new $SetClass()
try{
for(var i=0;i<arg.__len__();i++){
obj.items.push(arg.__getitem__(i))
}
return obj
}catch(err){
$raise('TypeError',"'"+arg.__class__.__name__+"' object is not iterable")
}
}else{
$raise('TypeError',"set expected at most 1 argument, got "+arguments.length)
}
}
set.__class__=$type
set.__name__='set'
set.toString=function(){return "<class 'set'>"}
function $SetClass(){
var x=null
var i=null
this.iter=null
this.__class__=set
this.items=[]
}
$SetClass.prototype.toString=function(){
var res="{"
for(var i=0;i<this.items.length;i++){
var x=this.items[i]
if(isinstance(x,str)){res +="'"+x+"'"}
else{res +=x.toString()}
if(i<this.items.length-1){res +=','}
}
return res+'}'
}
$SetClass.prototype.__add__=function(other){
return set(this.items.concat(other.items))
}
$SetClass.prototype.__class__=set
$SetClass.prototype.__contains__=function(item){
for(var i=0;i<this.items.length;i++){
try{if(this.items[i].__eq__(item)){return True}
}catch(err){void(0)}
}
return False
}
$SetClass.prototype.__eq__=function(other){
if(isinstance(other,set)){
if(other.items.length==this.items.length){
for(var i=0;i<this.items.length;i++){
if(this.__contains__(other.items[i])===False){
return False
}
}
return True
}
}
return False
}
$SetClass.prototype.__in__=function(item){return item.__contains__(this)}
$SetClass.prototype.__len__=function(){return int(this.items.length)}
$SetClass.prototype.__ne__=function(other){return !(this.__eq__(other))}
$SetClass.prototype.__item__=function(i){return this.items[i]}
$SetClass.prototype.__not_in__=function(item){return !(item.__contains__(this))}
$SetClass.prototype.add=function(item){
var i=0
for(i=0;i<this.items.length;i++){
try{if(item.__eq__(this.items[i])){return}}
catch(err){void(0)}
}
this.items.push(item)
}
function setattr(obj,attr,value){
if(!isinstance(attr,str)){$raise('TypeError',"setattr(): attribute name must be string")}
obj[attr]=value
}
function $SliceClass(start,stop,step){
this.__class__=slice
this.start=start
this.stop=stop
this.step=step
}
function slice(){
var $ns=$MakeArgs('slice',arguments,[],{},'args',null)
var args=$ns['args']
if(args.length>3){$raise('TypeError',
"slice expected at most 3 arguments, got "+args.length)
}
var start=0
var stop=0
var step=1
if(args.length==1){stop=args[0]}
else if(args.length>=2){
start=args[0]
stop=args[1]
}
if(args.length>=3){step=args[2]}
if(step==0){$raise('ValueError',"slice step must not be zero")}
return new $SliceClass(start,stop,step)
}
function sum(iterable,start){
if(start===undefined){start=0}
var res=0
for(var i=start;i<iterable.__len__();i++){
res=res.__add__(iterable.__item__(i))
}
return res
}
function $tuple(arg){return arg}
function tuple(){
var args=new Array(),i=0
for(i=0;i<arguments.length;i++){args.push(arguments[i])}
var obj=list(args)
obj.__class__=tuple
obj.toString=function(){
var res=args.toString()
return '('+res.substr(1,res.length-2)+')'
}
return obj
}
tuple.__class__=$type
tuple.__name__='tuple'
tuple.__str__=function(){return "<class 'tuple'>"}
tuple.toString=tuple.__str__
function zip(){
var rank=0,res=[]
while(true){
var line=[],flag=true
for(var i=0;i<arguments.length;i++){
var x=arguments[i].__item__(rank)
if(x===undefined){flag=false;break}
line.push(x)
}
if(!flag){return res}
res.push(line)
rank++
}
}
True=true
False=false
Boolean.prototype.__class__=bool
Boolean.prototype.__eq__=function(other){
if(this.valueOf()){return !!other}else{return !other}
}
Boolean.prototype.toString=function(){
if(this.valueOf()){return "True"}else{return "False"}
}
function $NoneClass(){
this.__class__=new $class(this,"NoneType")
this.value=null
this.__bool__=function(){return False}
this.__eq__=function(other){return other===None}
this.__str__=function(){return 'None'}
}
None=new $NoneClass()
function $list(){
var args=new Array()
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
return new $ListClass(args)
}
function list(){
if(arguments.length===0){return[]}
else if(arguments.length>1){
$raise('TypeError',"list() takes at most 1 argument ("+arguments.length+" given)")
}
var res=[]
res.__init__(arguments[0])
return res
}
list.__class__=$type
list.__name__='list'
list.__str__=function(){return "<class 'list'>"}
list.toString=list.__str__
function $ListClass(items){
var x=null,i=null
this.iter=null
this.__class__=list
this.items=items
}
Array.prototype.__add__=function(other){
return this.valueOf().concat(other.valueOf())
}
Array.prototype.__class__=list
Array.prototype.__contains__=function(item){
for(var i=0;i<this.length;i++){
try{if(this[i].__eq__(item)){return true}
}catch(err){void(0)}
}
return false
}
Array.prototype.__delitem__=function(arg){
if(isinstance(arg,int)){
var pos=arg
if(arg<0){pos=this.length+pos}
if(pos>=0 && pos<this.length){
this.splice(pos,1)
return
}
else{$raise('IndexError','list index out of range')}
}else if(isinstance(arg,slice)){
var start=arg.start || 0
var stop=arg.stop || this.length
var step=arg.step || 1
if(start<0){start=this.length+start}
if(stop<0){stop=this.length+stop}
var res=[],i=null
if(step>0){
if(stop>start){
for(i=start;i<stop;i+=step){
if(this[i]!==undefined){res.push(i)}
}
}
}else{
if(stop<start){
for(i=start;i>stop;i+=step.value){
if(this[i]!==undefined){res.push(i)}
}
res.reverse()
}
}
for(var i=res.length-1;i>=0;i--){
this.splice(res[i],1)
}
return
}else{
$raise('TypeError','list indices must be integer, not '+str(arg.__class__))
}
}
Array.prototype.__eq__=function(other){
if(isinstance(other,list)){
if(other.length==this.length){
for(var i=0;i<this.length;i++){
if(!this[i].__eq__(other[i])){return False}
}
return True
}
}
return False
}
Array.prototype.__getattr__=function(attr){
var obj=this
switch(attr){
case 'append':
return function(other){
if(isinstance(other,list)){obj.push(list(other))}
else{obj.push(other)}
}
case 'count':
return $list_count(obj)
case 'extend':
return $list_extend(obj)
case 'index':
return $list_index(obj)
case 'pop':
return $list_pop(obj)
case 'remove':
return $list_remove(obj)
case 'reverse':
return function(){$list_reverse(obj)}
case 'sort':
return function(arg){$list_sort(obj,arg)}
default:
return this[attr]
}
}
Array.prototype.__getitem__=function(arg){
if(isinstance(arg,int)){
var items=this.valueOf()
var pos=arg
if(arg<0){pos=items.length+pos}
if(pos>=0 && pos<items.length){return items[pos]}
else{$raise('IndexError','list index out of range')}
}else if(isinstance(arg,slice)){
var step=arg.step===None ? 1 : arg.step
if(step>0){
var start=arg.start===None ? 0 : arg.start
var stop=arg.stop===None ? this.__len__(): arg.stop
}else{
var start=arg.start===None ? this.__len__()-1 : arg.start
var stop=arg.stop===None ? 0 : arg.stop
}
if(start<0){start=int(this.length+start)}
if(stop<0){stop=this.length+stop}
var res=[],i=null,items=this.valueOf()
if(step>0){
if(stop<=start){return res}
else{
for(i=start;i<stop;i+=step){
if(items[i]!==undefined){res.push(items[i])}
}
return res
}
}else{
if(stop>=start){return res}
else{
for(i=start;i>=stop;i+=step){
if(items[i]!==undefined){res.push(items[i])}
}
return res
}
}
}else{
$raise('TypeError','list indices must be integer, not '+str(arg.__class__))
}
}
Array.prototype.__init__=function(){
this.splice(0,this.length)
if(arguments.length===0){return}
var arg=arguments[0]
for(var i=0;i<arg.__len__();i++){
this.push(arg.__item__(i))
}
}
Array.prototype.__item__=function(i){return this[i]}
Array.prototype.__in__=function(item){return item.__contains__(this)}
Array.prototype.__len__=function(){return this.length}
Array.prototype.__ne__=function(other){return !this.__eq__(other)}
Array.prototype.__next__=function(){
if(this.iter===null){this.iter=0}
if(this.iter<this.valueOf().length){
this.iter++
return this.valueOf()[this.iter-1]
}else{
this.iter=null
$raise('StopIteration')
}
}
Array.prototype.__not_in__=function(item){return !item.__contains__(this)}
Array.prototype.__setitem__=function(arg,value){
if(isinstance(arg,int)){
var pos=arg
if(arg<0){pos=this.length+pos}
if(pos>=0 && pos<this.length){this[pos]=value}
else{$raise('IndexError','list index out of range')}
}else if(isinstance(arg,slice)){
var start=arg.start===None ? 0 : arg.start
var stop=arg.stop===None ? this.__len__(): arg.stop
var step=arg.step===None ? 1 : arg.step
if(start<0){start=this.length+start}
if(stop<0){stop=this.length+stop}
this.splice(start,stop-start)
if(hasattr(value,'__item__')){
var $temp=list(value)
for(var i=$temp.length-1;i>=0;i--){
this.splice(start,0,$temp[i])
}
}else{
$raise('TypeError',"can only assign an iterable")
}
}else{
$raise('TypeError','list indices must be integer, not '+str(arg.__class__))
}
}
Array.prototype.toString=function(){
var res="[",i=null,items=this.valueOf()
for(i=0;i<items.length;i++){
var x=items[i]
if(isinstance(x,str)){res +="'"+x+"'"}
else{res +=x.toString()}
if(i<items.length-1){res +=','}
}
return res+']'
}
function $list_count(obj){
return function(elt){
var res=0
for(var i=0;i<obj.length;i++){
if(obj[i].__eq__(elt)){res++}
}
return res
}
}
function $list_extend(obj){
return function(other){
if(arguments.length!=1){$raise('TypeError',
"extend() takes exactly one argument ("+arguments.length+" given)")}
try{
for(var i=0;i<other.__len__();i++){
obj.push(other.__item__(i))
}
}catch(err){
$raise('TypeError',"object is not iterable")
}
}
}
function $list_index(obj){
return function(elt){
for(var i=0;i<obj.length;i++){
if(obj[i].__eq__(elt)){return i}
}
$raise('ValueError',str(elt)+" is not in list")
}
}
function $list_remove(obj){
return function(elt){
for(var i=0;i<obj.length;i++){
if(obj[i].__eq__(elt)){
obj.splice(i,1)
return
}
}
$raise('ValueError',str(elt)+" is not in list")
}
}
function $list_pop(obj){
return function(elt){
if(arguments.length==0){return obj.pop()}
else if(arguments.length==1){
var pos=arguments[0]
if(isinstance(pos,int)){
var res=obj[pos]
obj.splice(pos,1)
return res
}else{
$raise('TypeError',pos.__class__+" object cannot be interpreted as an integer")
}
}else{
$raise('TypeError',"pop() takes at most 1 argument ("+arguments.length+' given)')
}
}
}
function $list_reverse(obj){
for(var i=0;i<parseInt(obj.length/2);i++){
var buf=obj[i]
obj[i]=obj[obj.length-i-1]
obj[obj.length-i-1]=buf
}
}
function $partition(arg,array,begin,end,pivot)
{
var piv=array[pivot]
array.swap(pivot, end-1)
var store=begin
for(var ix=begin;ix<end-1;++ix){
if(arg(array[ix]).__le__(arg(piv))){
array.swap(store, ix)
++store
}
}
array.swap(end-1, store)
return store
}
Array.prototype.swap=function(a, b)
{
var tmp=this[a]
this[a]=this[b]
this[b]=tmp
}
function $qsort(arg,array, begin, end)
{
if(end-1>begin){
var pivot=begin+Math.floor(Math.random()*(end-begin))
pivot=$partition(arg,array, begin, end, pivot)
$qsort(arg,array, begin, pivot)
$qsort(arg,array, pivot+1, end)
}
}
function $list_sort(obj,arg){
if(!arg){arg=function(x){return x}}
else if(typeof arg==="string"){arg=function(x){return x.__getitem__(arg)}}
if(obj.length==0){return}
$qsort(arg,obj,0,obj.length)
}
function str(arg){
if(arg===undefined){return '<undefined>'}
else if(arg.__str__!==undefined){return arg.__str__()}
else{return arg.toString()}
}
str.__class__=$type
str.__name__='str'
str.__str__=function(){return "<class 'str'>"}
str.toString=str.__str__
String.prototype.__add__=function(other){
if(!(typeof other==="string")){
try{return other.__radd__(this)}
catch(err){$raise('TypeError',
"Can't convert "+other.__class__+" to str implicitely")}
}else{
return this+other
}
}
String.prototype.__class__=str
String.prototype.__contains__=function(item){
if(!(typeof item==="string")){$raise('TypeError',
"'in <string>' requires string as left operand, not "+item.__class__)}
var nbcar=item.length
for(var i=0;i<this.length;i++){
if(this.substr(i,nbcar)==item){return True}
}
return False
}
String.prototype.__eq__=function(other){return other===this.valueOf()}
String.prototype.__getattr__=function(attr){
obj=this
switch(attr){
case 'capitalize':
return $string_capitalize(obj)
case 'center':
return $string_center(obj)
case 'count':
return $string_count(obj)
case 'endswith':
return $string_endswith(obj)
case 'find':
return $string_find(obj)
case 'index':
return $string_index(obj)
case 'join':
return $string_join(obj)
case 'lower':
return $string_lower(obj)
case 'lstrip':
return $string_lstrip(obj)
case 'replace':
return $string_replace(obj)
case 'rfind':
return $string_rfind(obj)
case 'rindex':
return $string_rindex(obj)
case 'rstrip':
return $string_rstrip(obj)
case 'split':
return $string_split(obj)
case 'startswith':
return $string_startswith(obj)
case 'strip':
return $string_strip(obj)
case 'upper':
return $string_upper(obj)
default:
return this[attr]
}
}
String.prototype.__getitem__=function(arg){
if(isinstance(arg,int)){
var pos=arg
if(arg<0){pos=this.length+pos}
if(pos>=0 && pos<this.length){return this.charAt(pos)}
else{$raise('IndexError','string index out of range')}
}else if(isinstance(arg,slice)){
var step=arg.step===None ? 1 : arg.step
if(step>0){
var start=arg.start===None ? 0 : arg.start
var stop=arg.stop===None ? this.__len__(): arg.stop
}else{
var start=arg.start===None ? this.__len__()-1 : arg.start
var stop=arg.stop===None ? 0 : arg.stop
}
if(start<0){start=this.length+start}
if(stop<0){stop=this.length+stop}
var res='',i=null
if(step>0){
if(stop<=start){return ''}
else{
for(i=start;i<stop;i+=step){
res +=this.charAt(i)
}
}
}else{
if(stop>=start){return ''}
else{
for(i=start;i>=stop;i+=step){
res +=this.charAt(i)
}
}
}
return res
}
}
String.prototype.__in__=function(item){return item.__contains__(this.valueOf())}
String.prototype.__item__=function(i){return this.charAt(i)}
String.prototype.__len__=function(){return this.length}
String.prototype.__mod__=function(args){
var flags=$List2Dict('#','0','-',' ','+')
var ph=[]
function format(s){
var conv_flags='([#\\+\\- 0])*'
var conv_types='[diouxXeEfFgGcrsa%]'
var re=new RegExp('\\%(\\(.+\\))*'+conv_flags+'(\\*|\\d*)(\\.\\*|\\.\\d*)*(h|l|L)*('+conv_types+'){1}')
var res=re.exec(s)
this.is_format=true
if(!res){this.is_format=false;return}
this.src=res[0]
if(res[1]){this.mapping_key=str(res[1].substr(1,res[1].length-2))}
else{this.mapping_key=null}
this.flag=res[2]
this.min_width=res[3]
this.precision=res[4]
this.length_modifier=res[5]
this.type=res[6]
this.toString=function(){
var res='type '+this.type+' key '+this.mapping_key+' min width '+this.min_width
res +=' precision '+this.precision
return res
}
this.format=function(src){
if(this.mapping_key!==null){
if(!isinstance(src,dict)){$raise('TypeError',"format requires a mapping")}
src=src.__getitem__(this.mapping_key)
}
if(this.type=="s"){return str(src)}
else if(this.type=="i" || this.type=="d"){
if(!isinstance(src,[int,float])){$raise('TypeError',
"%"+this.type+" format : a number is required, not "+str(src.__class__))}
return str(int(src))
}else if(this.type=="f" || this.type=="F"){
if(!isinstance(src,[int,float])){$raise('TypeError',
"%"+this.type+" format : a number is required, not "+str(src.__class__))}
return str(float(src))
}
}
}
var elts=[]
var pos=0, start=0, nb_repl=0
var val=this.valueOf()
while(pos<val.length){
if(val.charAt(pos)=='%'){
var f=new format(val.substr(pos))
if(f.is_format && f.type!=="%"){
elts.push(val.substring(start,pos))
elts.push(f)
start=pos+f.src.length
pos=start
nb_repl++
}else{pos++}
}else{pos++}
}
elts.push(val.substr(start))
if(!isinstance(args,tuple)){
if(nb_repl>1){$raise('TypeError','not enough arguments for format string')}
else{elts[1]=elts[1].format(args)}
}else{
if(nb_repl==args.length){
for(var i=0;i<args.length;i++){
var fmt=elts[1+2*i]
elts[1+2*i]=fmt.format(args[i])
}
}else if(nb_repl<args.length){$raise('TypeError',
"not all arguments converted during string formatting")
}else{$raise('TypeError','not enough arguments for format string')}
}
var res=''
for(var i=0;i<elts.length;i++){res+=elts[i]}
res=res.replace(/%%/g,'%')
return res
}
String.prototype.__mul__=function(other){
if(!isinstance(other,int)){$raise('TypeError',
"Can't multiply sequence by non-int of type '"+str(other.__class__)+"'")}
$res=''
for(var i=0;i<other;i++){$res+=this.valueOf()}
return $res
}
String.prototype.__ne__=function(other){return other!==this.valueOf()}
String.prototype.__next__=function(){
if(this.iter==null){this.iter==0}
if(this.iter<this.value.length){
this.iter++
return str(this.value.charAt(this.iter-1))
}else{
this.iter=null
$raise('StopIteration')
}
}
String.prototype.__not_in__=function(item){return !item.__contains__(this.valueOf())}
String.prototype.__setattr__=function(attr,value){setattr(this,attr,value)}
String.prototype.__setitem__=function(attr,value){
$raise('TypeError',"'str' object does not support item assignment")
}
var $comp_func=function(other){
if(typeof other !=="string"){$raise('TypeError',
"unorderable types: 'str' > "+other.__class__+"()")}
return this > other
}
$comp_func +=''
var $comps={'>':'gt','>=':'ge','<':'lt','<=':'le'}
for($op in $comps){
eval("String.prototype.__"+$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))
}
var $notimplemented=function(other){
$raise('TypeError',
"unsupported operand types for OPERATOR: '"+str(this.__class__)+"' and '"+str(other.__class__)+"'")
}
$notimplemented +=''
for($op in $operators){
var $opfunc='__'+$operators[$op]+'__'
if(!($opfunc in String.prototype)){
eval('String.prototype.'+$opfunc+"="+$notimplemented.replace(/OPERATOR/gm,$op))
}
}
function $string_capitalize(obj){
if(obj.length==0){return ''}
return obj.charAt(0).toUpperCase()+obj.substr(1).toLowerCase()
}
function $string_center(obj){
return function(width,fillchar){
if(fillchar===undefined){fillchar=' '}else{fillchar=fillchar}
if(width<=obj.length){return obj}
else{
var pad=parseInt((width-obj.length)/2)
res=''
for(var i=0;i<pad;i++){res+=fillchar}
res +=obj
for(var i=0;i<pad;i++){res+=fillchar}
if(res.length<width){res +=fillchar}
return res
}
}
}
function $string_count(obj){
return function(elt){
if(!(typeof elt==="string")){$raise('TypeError',
"Can't convert '"+str(elt.__class__)+"' object to str implicitly")}
var res=0
for(var i=0;i<obj.length-elt.length+1;i++){
if(obj.substr(i,elt.length)===elt){res++}
}
return res
}
}
function $string_endswith(obj){
return function(){
var $ns=$MakeArgs("str.endswith",arguments,['suffix'],
{'start':null,'end':null},null,null)
var suffixes=$ns['suffix']
if(!isinstance(suffixes,tuple)){suffixes=[suffixes]}
var start=$ns['start']|| 0
var end=$ns['end']|| obj.length-1
var s=obj.substr(start,end+1)
for(var i=0;i<suffixes.length;i++){
suffix=suffixes[i]
if(suffix.length<=s.length &&
s.substr(s.length-suffix.length)==suffix){return True}
}
return False
}
}
function $string_find(obj){
return function(){
var $ns=$MakeArgs("str.find",arguments,['sub'],
{'start':0,'end':obj.length},null,null)
var sub=$ns['sub'],start=$ns['start'],end=$ns['end']
if(!isinstance(sub,str)){$raise('TypeError',
"Can't convert '"+str(sub.__class__)+"' object to str implicitly")}
if(!isinstance(start,int)||!isinstance(end,int)){$raise('TypeError',
"slice indices must be integers or None or have an __index__ method")}
var s=obj.substring(start,end)
var escaped=list('*.[]()')
var esc_sub=''
for(var i=0;i<sub.length;i++){
if(escaped.indexOf(sub.charAt(i))>-1){esc_sub +='\\'}
esc_sub +=sub.charAt(i)
}
var res=s.search(esc_sub)
if(res==-1){return -1}
else{return start+res}
}
}
function $string_index(obj){
return function(){
var args=[]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
var res=$string_find(obj).apply(obj,args)
if(res===-1){$raise('ValueError',"substring not found")}
else{return res}
}
}
function $string_join(obj){
return function(iterable){
if(!'__item__' in iterable){$raise('TypeError',
"'"+str(iterable.__class__)+"' object is not iterable")}
var res='',count=0
for(var i=0;i<iterable.length;i++){
var obj2=iterable.__getitem__(i)
if(!isinstance(obj2,str)){$raise('TypeError',
"sequence item "+count+": expected str instance, "+obj2.__class__+"found")}
res +=obj2+obj
count++
}
if(count==0){return ''}
res=res.substr(0,res.length-obj.length)
return res
}
}
function $string_lower(obj){
return function(){return obj.toLowerCase()}
}
function $string_lstrip(obj){
return function(x){
var pattern=null
if(x==undefined){pattern="\\s*"}
else{pattern="["+x+"]*"}
var sp=new RegExp("^"+pattern)
return obj.replace(sp,"")
}
}
function $string_replace(obj){
return function(old,_new,count){
if(count!==undefined){
if(!isinstance(count,[int,float])){$raise('TypeError',
"'"+str(count.__class__)+"' object cannot be interpreted as an integer")}
var re=new RegExp(old)
var res=obj.valueOf()
while(count>0){
if(obj.search(re)==-1){return res}
res=res.replace(re,_new)
count--
}
return res
}else{
var re=new RegExp(old,"g")
return obj.replace(re,_new)
}
}
}
function $string_rfind(obj){
return function(){
var $ns=$MakeArgs("str.find",arguments,['sub'],
{'start':0,'end':obj.length},null,null)
var sub=$ns['sub'],start=$ns['start'],end=$ns['end']
if(!isinstance(sub,str)){$raise('TypeError',
"Can't convert '"+str(sub.__class__)+"' object to str implicitly")}
if(!isinstance(start,int)||!isinstance(end,int)){$raise('TypeError',
"slice indices must be integers or None or have an __index__ method")}
var s=obj.substring(start,end)
var reversed=''
for(var i=s.length-1;i>=0;i--){reversed +=s.charAt(i)}
var res=reversed.search(sub)
if(res==-1){return -1}
else{return start+s.length-1-res}
}
}
function $string_rindex(obj){
return function(){
var args=[]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
var res=$string_rfind(obj).apply(obj,args)
if(res==-1){$raise('ValueError',"substring not found")}
else{return res}
}
}
function $string_rstrip(x){
if(x==undefined){pattern="\\s*"}
else{pattern="["+x.value+"]*"}
sp=new RegExp(pattern+'$')
return str(this.value.replace(sp,""))
}
function $string_split(obj){
return function(){
var $ns=$MakeArgs("str.split",arguments,['sep'],
{'maxsplit':-1},null,null)
var sep=$ns['sep'],maxsplit=$ns['maxsplit']
var res=[],pos=0,spos=0
if(isinstance(sep,str)){
while(true){
spos=obj.substr(pos).search(sep)
if(spos==-1){break}
res.push(obj.substr(pos,spos))
pos +=spos+sep.length
if(maxsplit !=-1 && res.length==maxsplit){break}
}
res.push(obj.substr(pos))
return res
}
}
}
function $string_startswith(obj){
return function(){
$ns=$MakeArgs("str.startswith",arguments,['prefix'],
{'start':null,'end':null},null,null)
var prefixes=$ns['prefix']
if(!isinstance(prefixes,tuple)){prefixes=[prefixes]}
var start=$ns['start']|| 0
var end=$ns['end']|| obj.length-1
var s=obj.substr(start,end+1)
for(var i=0;i<prefixes.length;i++){
prefix=prefixes[i]
if(prefix.length<=s.length &&
s.substr(0,prefix.length)==prefix){return True}
}
return False
}
}
function $string_strip(obj){
return function(x){
if(x==undefined){x="\\s"}
pattern="["+x+"]"
sp=new RegExp("^"+pattern+"+|"+pattern+"+$","g")
return obj.replace(sp,"")
}
}
function $string_upper(obj){return function(){return obj.toUpperCase()}}
function $importer(){
if(window.XMLHttpRequest){
var $xmlhttp=new XMLHttpRequest()
}else{
var $xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
}
var fake_qs='?foo='+Math.random().toString(36).substr(2,8)
var timer=setTimeout(function(){
$xmlhttp.abort()
$raise('NotFoundError',"No module named '"+module+"'")}, 5000)
return[$xmlhttp,fake_qs,timer]
}
function $import_js(module,alias){
var imp=$importer()
var $xmlhttp=imp[0],fake_qs=imp[1],timer=imp[2],res=null
$xmlhttp.onreadystatechange=function(){
if($xmlhttp.readyState==4){
window.clearTimeout(timer)
if($xmlhttp.status==200 || $xmlhttp.status==0){res=$xmlhttp.responseText}
else{
res=Error()
res.name='NotFoundError'
res.message="No module named '"+module+"'"
}
}
}
$xmlhttp.open('GET',document.$brython_path+'libs/'+module+'.js'+fake_qs,false)
if('overrideMimeType' in $xmlhttp){$xmlhttp.overrideMimeType("text/plain")}
$xmlhttp.send()
if(res.constructor===Error){throw res}
try{
eval(res)
if(eval('$module')===undefined){
$raise('ImportError',"name '$module' is not defined in module")
}
if(alias===undefined){alias=module}
eval(alias+'=$module')
eval(alias+'.__class__ = $type')
eval(alias+'.__str__ = function(){return "<module \''+module+"'>\"}")
}catch(err){$raise('ImportError',err.message)}
}
function $import_py(module){
var imp=$importer()
var $xmlhttp=imp[0],fake_qs=imp[1],timer=imp[2],res=null
$xmlhttp.onreadystatechange=function(){
if($xmlhttp.readyState==4){
window.clearTimeout(timer)
if($xmlhttp.status==200 || $xmlhttp.status==0){res=$xmlhttp.responseText}
else{
res=Error('NotFoundError',"No module named '"+module+"'")
}
}
}
$xmlhttp.open('GET',module+'.py'+fake_qs,false)
$xmlhttp.send()
if(res.constructor===Error){throw res}
var stack=$py2js(res,module)
stack.list.splice(0,0,['code',module+'= new object()'],['newline','\n'])
var $pos=0
while(true){
var $mlname_pos=stack.find_next_at_same_level($pos,"keyword","function")
if($mlname_pos===null){break}
var $func_name=stack.list[$mlname_pos+1][1]
stack.list.splice($mlname_pos,2,['code',module+'.'+$func_name+"=function"])
var br_pos=stack.find_next($mlname_pos,'bracket','{')
var br_end=stack.find_next_matching(br_pos)
var $fend=stack.find_next(br_end,"func_end")
var $fend_code=stack.list[$fend][1]
$fend_code=module+'.'+$fend_code.substr(1)
$pv_pos=$fend_code.search(';')
$fend_code=";"+$fend_code.substr(0,$pv_pos)
stack.list[$fend][1]=$fend_code
$pos=$mlname_pos+1
}
var $pos=0
while(true){
var $mlname_pos=stack.find_next_at_same_level($pos,"assign_id")
if($mlname_pos===null){break}
stack.list[$mlname_pos][1]=module+'.'+stack.list[$mlname_pos][1]
$pos=$mlname_pos+1
}
try{
eval(stack.to_js())
eval(module+'.__class__ = $type')
eval(module+'.__str__ = function(){return "<module \''+module+"'>\"}")
}catch(err){
$raise(err.name,err.message)
}
}
$import_funcs=[$import_js,$import_py]
function $import(module){
for(var i=0;i<$import_funcs.length;i++){
try{$import_funcs[i](module);return}
catch(err){
if(err.name==="NotFoundError"){
if(i==$import_funcs.length-1){
$raise('ImportError',"no module named '"+module+"'")
}else{
continue
}
}else{throw(err)}
}
}
}
function $import_from(module,names){
}
function $multiple_assign(indent,targets,right_expr,assign_pos){
var i=0,target=null
for(var i=0;i<targets.list;i++){
var left=targets[i]
if(left.list[0][3]==="local"){left.list[0][1]="var "+left.list[0][1]}
}
var rlist=right_expr.list
if(rlist[0][0]=="bracket"){rlist=rlist.slice(1,rlist.length-1)}
var rs=new Stack(rlist)
var rs_items=rs.split(',')
var seq=[]
if(rs_items.length>1){
if(rs_items.length>targets.length){
$raise("ValueError","Too many values to unpack (expected "+targets.length+")")
}else if(rs_items.length<targets.length){
$raise("ValueError","Need more than "+rs_items.length+" values to unpack")
}else{
var seq=[['code','var $temp=[]'],['newline','\n']]
for(i=0;i<targets.length;i++){
seq.push(['indent',indent],['code','$temp.push'],['bracket','('])
seq=seq.concat(rs_items[i].list)
seq.push(['bracket',')'],['newline','\n',assign_pos])
}
for(i=0;i<targets.length;i++){
seq.push(['indent',indent])
seq=seq.concat(targets[i].list)
seq.push(['assign','=',assign_pos],
['code','$temp['+i+']'],['newline','\n',assign_pos])
}
}
}else{
seq.push(['code',"var $var",assign_pos],['assign','='])
seq=seq.concat(right_expr.list)
seq.push(['newline','\n',assign_pos])
for(var i=0;i<targets.length;i++){
target=targets[i]
seq.push(['indent',indent])
seq=seq.concat(target.list)
seq.push(['assign','='],['code','$var.__item__('+i+')'],
['newline','\n'])
}
}
return seq
}
var $OpeningBrackets=$List2Dict('(','[','{')
var $ClosingBrackets=$List2Dict(')',']','}')
function $py2js(src,module){
var i=0,pos=0
src=src.replace(/\r\n/gm,'\n')
while(src.length>0 &&(src.charAt(0)=="\n" || src.charAt(0)=="\r")){
src=src.substr(1)
}
if(src.charAt(src.length-1)!="\n"){src+='\n'}
if(module===undefined){module="__main__"}
document.$py_src[module]=src
var pos2line={}
var lnum=1
for(i=0;i<src.length;i++){
pos2line[i]=lnum
if(src.charAt(i)=='\n'){lnum+=1}
}
var dobj=new Date()
var t0=dobj.getTime()
var times={}
tokens=$tokenize(src,module)
stack=new Stack(tokens)
var $err_num=0
if(document.$debug){
var pos=0
var s_nl=0
while(true){
var nl=stack.find_next(pos,'newline')
if(nl==null){break}
var indent_pos=stack.find_previous(nl,'indent')
if(!stack.list[indent_pos+1].match(['keyword','else'])&&
!stack.list[indent_pos+1].match(['keyword','elif'])&&
!stack.list[indent_pos+1].match(['keyword','except'])){
stack.list.splice(s_nl,0,['indent',stack.list[indent_pos][1]],
['code','document.$line_info=['+stack.list[nl][1]+',"'+module+'"]',stack.list[nl][2]],
['newline','\n'])
s_nl=nl+4
pos=nl+5
}else{
s_nl=nl+1
pos=nl+2
}
}
}
var dobj=new Date()
times['add line nums']=dobj.getTime()-t0
var repl=[['not','in'],['is','not']]
for(i=0;i<repl.length;i++){
var seq=repl[i]
var pos=stack.list.length-1
while(pos>0){
var op_pos=stack.find_previous(pos,"operator",seq[1])
if(op_pos==null){break}
if(op_pos>1 && stack.list[op_pos-1].match(["operator",seq[0]])){
stack.list.splice(op_pos-1,2,['operator',seq[0]+'_'+seq[1],stack.list[op_pos][2]])
}
pos=op_pos-2
}
}
pos=0
while(true){
var br_pos=stack.find_next(pos,'bracket','[')
if(br_pos===null){break}
var end=stack.find_next_matching(br_pos)
if(end-br_pos<5){pos=br_pos+1;continue}
var for_pos=stack.find_next_at_same_level(br_pos+1,'keyword','for')
if(for_pos===null){pos=br_pos+1;continue}
var expr=stack.list.slice(br_pos+1,for_pos)
var s_expr=new Stack(expr)
var res_env=s_expr.ids_in()
var in_pos=stack.find_next_at_same_level(for_pos+1,'operator','in')
if(in_pos===null){$SyntaxError(module,"missing 'in' in list comprehension",br_pos)}
var qesc=new RegExp('"',"g")
var loops=[]
var env=[]
var lvar=new Stack(stack.list.slice(for_pos+1,in_pos))
var local_env=lvar.ids_in()
while(true){
for_pos=stack.find_next_at_same_level(in_pos+1,'keyword','for')
if(for_pos===null){break}
var s=new Stack(stack.list.slice(in_pos+1,for_pos))
env=env.concat(s.ids_in())
loops.push([lvar.to_js(),s.to_js().replace(qesc,'\\"')])
in_pos=stack.find_next_at_same_level(for_pos+1,'operator','in')
if(in_pos===null){$SyntaxError(module,"missing 'in' in list comprehension",br_pos)}
lvar=new Stack(stack.list.slice(for_pos+1,in_pos))
local_env=local_env.concat(lvar.ids_in())
}
var if_pos=stack.find_next_at_same_level(in_pos,'keyword','if')
if(if_pos===null){
var s=new Stack(stack.list.slice(in_pos+1,end))
env=env.concat(s.ids_in())
loops.push([lvar.to_js(),s.to_js().replace(qesc,'\\"')])
var cond=[]
}else{
var s=new Stack(stack.list.slice(in_pos+1,if_pos))
env=env.concat(s.ids_in())
loops.push([lvar.to_js(),s.to_js().replace(qesc,'\\"')])
var cond=stack.list.slice(if_pos+1,end)
}
seq='$list_comp(['
for(var i=0;i<loops.length;i++){
seq +='["'+loops[i][0]+'","'+loops[i][1]+'"]'
if(i<loops.length-1){seq +=','}
}
seq +='],'
s=new Stack(expr)
seq +='"'+s.to_js()+'",'
if(cond.length>0){
var c_start=cond[0][2]
var c_end=stack.list[end][2]-1
var c_src=src.slice(c_start,c_end)
seq +='"'+c_src.replace(qesc,'\\"')+'",['
}else{seq +='"",['}
for(var k=0;k<res_env.length;k++){
if(env.indexOf(res_env[k])==-1 &&
local_env.indexOf(res_env[k])==-1){env.push(res_env[k])}
}
for(var i=0;i<env.length;i++){
seq+="'"+env[i]+"',"+env[i]
if(i<env.length-1){seq+=','}
}
seq +='])'
var tail=stack.list.slice(end+1,stack.list.length)
stack.list=stack.list.slice(0,br_pos).concat([['code',seq]]).concat(tail)
pos=br_pos+1
}
var not_a_display={
'[':[["id"],["assign_id"],['str'],['int'],['float'],["qualifier"],
["bracket",$List2Dict("]",")")]],
'(':[["id"],["assign_id"],["qualifier"],["bracket",$List2Dict("]",")")]],
'{':[[]]
}
var PyType={'(':'tuple','[':'$list','{':'dict_or_set'}
var br_list=['[','(','{']
for(var ibr=0;ibr<br_list.length;ibr++){
var bracket=br_list[ibr]
pos=stack.list.length-1
while(true){
var br_elt=stack.find_previous(pos,"bracket",bracket)
if(br_elt==null){break}
if(br_elt>0){
var previous=stack.list[br_elt-1]
var is_display=true
for(var inad=0;inad<not_a_display[bracket].length;inad++){
var args=not_a_display[bracket][inad]
if(args[0]==previous[0]){
if(args.length!=2 ||(previous[1]in args[1])){
is_display=false
}
}
}
if(!is_display){pos=br_elt-1;continue}
var pyType=PyType[bracket]
var br_pos=stack.list[br_elt][2]
var sequence=[['id',pyType,br_elt[2]],['bracket','(',br_pos]]
var end=stack.find_next_matching(br_elt)
if(pyType=='dict_or_set'){
var args=new Stack(stack.list.slice(br_elt+1,end))
if(args.list.length===0){
sequence=[['id','dict'],['bracket','(']]
}else{
sequence=[['id','dict'],['bracket','('],
['id','$list'],['bracket','(']]
var kvs=args.split(',')
var pyType=null
for(var ikv=0;ikv<kvs.length;ikv++){
var kv=kvs[ikv]
var elts=kv.split(':')
if(pyType==null){
if(elts.length==1){
pyType='set'
sequence=[['id','set'],['bracket','(']]
}
else if(elts.length==2){pyType='dict'}
else{console.log(elts);$SyntaxError(module,"invalid syntax",br_pos)}
sequence[0][0][1]=pyType
}
var key=elts[0]
var key_start=kv.start+key.start
var key_end=kv.start+key.end
if(pyType=='dict'){
var value=elts[1]
sequence.push(['id','$list'])
sequence.push(['bracket','('])
sequence=sequence.concat(args.list.slice(key_start,key_end+1))
sequence.push(['delimiter',',',br_pos])
var value_start=kv.start+value.start
var value_end=kv.start+value.end
sequence=sequence.concat(args.list.slice(value_start,value_end+1))
sequence.push(['bracket',')'])
sequence.push(['delimiter',',',br_pos])
}else{
sequence=sequence.concat(args.list.slice(key_start,key_end+1))
sequence.push(['delimiter',',',br_pos])
}
}
sequence.pop()
if(pyType=='dict'){
sequence.push(['bracket',')'])
}
}
sequence.push(['bracket',')',stack.list[end][2]])
}else if(pyType=='tuple'){
var args=new Stack(stack.list.slice(br_elt+1,end))
var kvs=args.split(',')
if(kvs.length==1){sequence[0][1]='$tuple'}
if(kvs[kvs.length-1].list.length==0){
if(kvs.length==2){sequence[0][1]='$tuple'}
stack.list[end-1]=['code','']
}
sequence=sequence.concat(stack.list.slice(br_elt+1,end))
sequence.push(['bracket',')',stack.list[end][2]])
}else{
var args=new Stack(stack.list.slice(br_elt+1,end))
if(end > br_elt+1){
sequence=sequence.concat(stack.list.slice(br_elt+1,end))
sequence.push(['bracket',')',stack.list[end][2]])
}else{sequence.push(['bracket',')',stack.list[end][2]])}
}
tail=stack.list.slice(end+1,stack.list.length)
stack.list=stack.list.slice(0,br_elt)
stack.list=stack.list.concat(sequence)
stack.list=stack.list.concat(tail)
}
pos=br_elt - 1
}
}
var dobj=new Date()
times['displays']=dobj.getTime()-t0
var fkw=['class','def'],$funcs=[]
for(i=0;i<fkw.length;i++){
pos=0
var kw=fkw[i]
while(true){
var fpos=stack.find_next(pos,'keyword',kw)
if(fpos===null){break}
var block=stack.find_block(fpos)
var func_name=stack.list[fpos+1]
var parent=-1
var offset=0
for(var j=$funcs.length-1;j>=0;j--){
if(fpos>$funcs[j][2]&& fpos<$funcs[j][3]){parent=j;break}
}
$funcs.push([kw,func_name[1],block[0],block[1],parent])
if(kw=='def' && parent>-1 && $funcs[parent][0]=='class'){
stack.list[fpos+1][0]='method_id'
if(stack.list[fpos+1][1].substr(0,2)=='$$'){
stack.list[fpos+1][1]=stack.list[fpos+1][1].substr(2)
}
}
if(kw==='class'){
var block_indent=stack.list[block[0]+2][1]
stack.list.splice(block[0]+2,0,['indent',block_indent],
['code','var $instance=this'],['newline','\n'])
offset +=3
}
if(kw==='class' && !stack.list[fpos+2].match(['bracket','('])){
stack.list.splice(fpos+2,0,['bracket','('],['bracket',')'])
offset +=2
}
pos=fpos+offset+1
}
}
pos=stack.list.length-1
while(true){
var def_pos=stack.find_previous(pos,"keyword","def")
if(def_pos==null){break}
var func_token=stack.list[def_pos+1]
var arg_start=stack.list[def_pos+2]
var indent_pos=stack.find_next(def_pos,'indent')
var indent=stack.list[indent_pos][1]
var f_indent='\n'
while(indent>0){f_indent+=' ';indent--}
document.line_num=pos2line[func_token[2]]
if(func_token[0]!=='id' && func_token[0]!=='method_id'){
$SyntaxError(module,"wrong type after def",def_pos)
}
if(arg_start[0]!='bracket' || arg_start[1]!='('){
$SyntaxError(module,"missing ( after function name",def_pos)
}
var end_def=stack.find_next_at_same_level(def_pos,"delimiter",":")
if(end_def==null){
$SyntaxError(module,"Unable to find definition end "+end_def,def_pos)
}
var has_args=false
if(arg_start[0]=='bracket' && arg_start[1]=='(' &&
!(stack.list[def_pos+3].match(["bracket",")"]))){
has_args=true
arg_end=stack.find_next_matching(def_pos+2)
for(var i=def_pos+2;i<arg_end;i++){
if(stack.list[i][0]=='id'){stack.list[i][0]='arg_id'}
}
var s=new Stack(stack.list.slice(def_pos+3,arg_end))
var args=s.split(',')
var required=[]
var defaults=[]
var has_defaults=false
var other_args=null
var other_kw=null
var instance=null
for(var i=args.length-1;i>=0;i--){
arg=args[i]
var op=null
if(arg.list[0][0]=="operator" && arg.list[1][0]=="arg_id"){
if(arg.list[0][1]=="*"){op='*';other_args=arg.list[1][1]}
else if(arg.list[0][1]=='**'){op='**';other_kw=arg.list[1][1]}
if(op!=null){
if(i==0){
stack.list.splice(def_pos+2+arg.start+1,arg.end-arg.start+1)
}else{
stack.list.splice(def_pos+2+arg.start,arg.end-arg.start+2)
}
}
}
if(op==null){
var elts=arg.split("=")
if(elts.length>1){
defaults.push([elts[0].list[0][1],elts[1].to_js()])
has_defaults=true
}else{
if(i==0 && func_token[0]==='method_id'){
var instance=arg
}else{
required.push(arg.list[0][1])
}
}
if(i==0){
stack.list.splice(def_pos+3+arg.start,arg.end-arg.start+1)
}else{
stack.list.splice(def_pos+2+arg.start,arg.end-arg.start+2)
}
}
}
var arg_code='"'+func_token[1]+'",arguments,'
if(required.length==0){arg_code+='[],'}
else{
arg_code +='['
required.reverse()
for(ireq=0;ireq<required.length;ireq++){
arg_code+="'"+required[ireq]+"',"
}
arg_code=arg_code.substr(0,arg_code.length-1)+"],"
}
var def_code='{'
if(has_defaults){
for($idef=0;$idef<defaults.length;$idef++){
def_code +='"'+defaults[$idef][0]+'":'+defaults[$idef][1]+','
}
def_code=def_code.substr(0,def_code.length-1)
}
def_code +='}'
arg_code +=def_code+','
if(other_args==null){arg_code+="null,"}
else{arg_code +='"'+other_args+'",'}
if(other_kw==null){arg_code+="null"}
else{arg_code +='"'+other_kw+'"'}
}
var block=stack.find_block(def_pos)
var block_indent=stack.list[block[0]+2][1]
stack.list.splice(block[0]+2,0,['indent',block_indent],
['code','document.$func_info=["'+module+'","'+func_token[1]+'"]'],
['newline','\n'])
if(has_args){stack.list.splice(block[0]+5,0,
['indent',block_indent],['code',"$ns=$MakeArgs("+arg_code+")"],['newline','\n'],
['indent',block_indent],['code','for($var in $ns){eval("var "+$var+"=$ns[$var]")}'],
['newline','\n'])
}
if(func_token[0]==='method_id'){
stack.list.splice(block[0]+11,0,['indent',block_indent],
['code','var '+instance.list[0][1]+'=$instance'],['newline','\n'])
}
if(document.$debug){
var block=stack.find_block(def_pos)
stack.list.splice(block[0]+5,0,['indent',block_indent],
['code','try'],
['bracket','{'],['newline','\n'])
for(var i=block[0]+8;i<block[1]+4;i++){
if(stack.list[i][0]==='indent'){
stack.list[i][1]=stack.list[i][1]+4
}
}
stack.list.splice(block[1]+4,0,['newline','\n'],['indent',block_indent],
['bracket','}'],['code','catch(err'+$err_num+')'],
['code','{$raise(err'+$err_num+'.name,err'+$err_num+'.message)}'])
}
pos=def_pos-1
}
var dobj=new Date()
times['function defs']=dobj.getTime()-t0
pos=stack.list.length-1
while(true){
var br_pos=stack.find_previous(pos,"bracket","(")
if(br_pos==null){break}
if((stack.list[br_pos-1][0]=='id' || stack.list[br_pos-1][0]=="qualifier")
&& br_pos>1 &&
!(stack.list[br_pos-2].match(["keyword",'def']))){
var end_call=stack.find_next_matching(br_pos)
var s=new Stack(stack.list.slice(br_pos+1,end_call))
var args=s.split(',')
for(i=args.length-1;i>=0;i--){
var arg=args[i]
if(arg.list.length==0){continue}
var elts=arg.split('=')
if(elts.length==2){
var src_pos=elts[0].list[0][2]
var seq=[['code','$Kw("'+elts[0].list[0][1]+'",',src_pos]]
seq=seq.concat(elts[1].list)
seq.push(['code',')',src_pos])
var code='$Kw("'+elts[0].list[0][1]+'",'
code +=elts[1].to_js()+')'
stack.list.splice(br_pos+1+arg.start,arg.end-arg.start+1)
tail=stack.list.slice(br_pos+1+arg.start,stack.list.length)
stack.list=stack.list.slice(0,br_pos+1+arg.start).concat(seq).concat(tail)
}else if(arg.list[0][0]=="operator" &&
["*","**"].indexOf(arg.list[0][1])>-1){
if(arg.list[0][1]=='*'){var uf="$ptuple"}else{var uf="$pdict"}
stack.list.splice(br_pos+2+arg.end,0,['bracket',')'])
stack.list.splice(br_pos+1+arg.start,1,
["code",uf],['bracket','('])
}
}
}
pos=br_pos-1
}
var dobj=new Date()
times['function calls']=dobj.getTime()-t0
pos=0
var sign2mult={'+':1,'-':-1}
while(true){
var sign=stack.find_next(pos,"operator","+","-")
if(sign==null){break}
var op=stack.list[sign]
var mult=sign2mult[op[1]]
while(sign<stack.list.length-1){
var next=stack.list[sign+1]
if(next[0]=="operator" && next[1]in sign2mult){
mult *=sign2mult[next[1]]
stack.list.splice(sign+1,1)
}else{break }
}
if(mult !=sign2mult[op[1]]){
if(op[1]=='+'){stack.list[sign][1]='-'}
else{stack.list[sign][1]='+'}
}
pos=sign+1
}
pos=0
while(true){
var sign=stack.find_next(pos,"operator","+","-")
if(sign==null){break}
var op=stack.list[sign]
if(sign>0 &&
(stack.list[sign-1][0]in $List2Dict("delimiter","newline","indent","assign","operator")||
(stack.list[sign-1].match(["keyword","return"]))||
(stack.list[sign-1][0]=="bracket" &&("({[".indexOf(stack.list[sign-1][1])>-1)))){
if(sign<stack.list.length-1){
var next=stack.list[sign+1]
if(next[0]=="int" || next[0]=="float"){
var value=next[1]
if(op[1]=='-'){
stack.list[sign+1][1]=-1*stack.list[sign+1][1]
}
stack.list.splice(sign,1)
}else if(next[0]=="id"){
var mult=1
if(op[1]=="-"){mult=-1}
stack.list.splice(sign,1,["int",mult,op[2]],
['operator','*',op[2]])
}
}
}
pos=sign+1
}
pos=0
while(pos<stack.list.length){
var from_pos=stack.find_next(pos,"keyword","from")
if(from_pos==null){break}
if(stack.list[from_pos-1][0]!=='indent'){
$SyntaxError("invalid syntax",from_pos)
}
if(from_pos<=stack.length-3 ||
stack.list[from_pos+1][0]!=='id'){
$SyntaxError("invalid syntax",from_pos)
}
var module=stack.list[from_pos+1][1]
if(!stack.list[from_pos+2].match(['keyword','import'])){
$SyntaxError("missing 'import' after 'from'",from_pos)
}
var names=[]
if(stack.list[from_pos+3].match(['operator','*'])){
var names=['*'],end=from_pos+3
}else{
var _names=stack.atom_at(from_pos+3,true)
if(_names.type==="tuple"){
for(var i=0;i<_names.items.length;i++){
names.push(_names.items[i].list()[0][1])
}
}else{
names=[_names.list()[0][1]]
}
var end=_names.end
}
alert('module '+module+' names '+names+' end '+end)
stack.list.splice(from_pos,end-from_pos+1,
['id','$import_from'],['bracket','('],['str','"'+module+'"'],
['delimiter',','],['code',names+''],['bracket',')'])
stack.dump()
pos=from_pos+1
}
pos=0
while(pos<stack.list.length){
var imp_pos=stack.find_next(pos,"keyword","import")
if(imp_pos==null){break}
var imported=stack.atom_at(imp_pos+1,true)
if(imported.type !='id' && imported.type !='tuple'){
$SyntaxError(module,"invalid syntax",imp_pos)
}
for(var i=0;i<imported.list().length;i++){
if(stack.list[imported.start+i][0]=="id"){
stack.list[imported.start+i][0]='str'
stack.list[imported.start+i][1]='"'+stack.list[imported.start+i][1]+'"'
}
}
var src_pos=stack.list[imp_pos][2]
stack.list.splice(imported.end+1,0,['bracket',')'])
stack.list.splice(imp_pos,1,
['code','$import',src_pos],['bracket','(',src_pos])
pos=imp_pos+1
}
var dobj=new Date()
times['misc']=dobj.getTime()-t0
var pos=0
while(true){
var try_pos=stack.find_next(pos,"keyword","try")
if(try_pos===null){break}
var try_indent=0
if(try_pos==0){try_indent=0}
else if(stack.list[try_pos-1][0]=='indent'){try_indent=stack.list[try_pos-1][1]}
var block=stack.find_block(try_pos)
var nxt=block[1]
var exc_pos=try_pos
var clauses=[]
while(true){
exc_pos=stack.next_at_same_indent(exc_pos)
if(exc_pos===null){break}
if(stack.list[exc_pos][0]!=="keyword" &&
["except","finally","else"].indexOf(stack.list[exc_pos][1])==-1){
break
}
clauses.push(exc_pos)
}
if(clauses.length==0){$SyntaxError(module,'invalid syntax',exc_pos)}
var last_block=stack.find_block(clauses[clauses.length-1])
for(var i=clauses[0]-1;i<last_block[1];i++){
if(stack.list[i][0]=="indent"){
stack.list[i][1]=stack.list[i][1]+4
}
}
for(var i=clauses.length-1;i>=0;i--){
var clause=stack.list[clauses[i]]
if(clause[1]=='except'){
stack.list[clauses[i]][1]='else'
if(!stack.list[clauses[i]+1].match(['delimiter',':'])){
var excs=stack.atom_at(clauses[i]+1,true)
if(excs.type=="id"){
var exc=stack.list[clauses[i]+1]
stack.list[clauses[i]+1]=['code','if($err'+$err_num+'.name=="'+exc[1]+'")']
}else if(excs.type=="function_call"){
var exc_str=[],exc_list=excs.list()
for(var j=2;j<exc_list.length;j++){
if(exc_list[j][0]=="id"){exc_str.push('"'+exc_list[j][1]+'"')}
}
stack.list.splice(clauses[i]+1,exc_list.length,
['code','if(['+exc_str.join(',')+'].indexOf($err'+$err_num+'.name)>-1)'])
}else{$SyntaxError(module,'invalid syntax',clause[3])}
}
}
}
stack.list.splice(nxt+1,0,['indent',try_indent],['keyword','catch'],
['id','$err'+$err_num],['delimiter',':'],['newline','\n'])
stack.list.splice(nxt+6,0,['indent',try_indent+4],['code','if(false){void(0)}'],
['newline','\n'])
pos=try_pos+1
$err_num++
}
pos=0
while(true){
var raise_pos=stack.find_next(pos,"keyword","raise")
if(raise_pos===null){break}
var expr=stack.atom_at(raise_pos+1)
stack.list.splice(expr.end+1,0,['bracket',')'])
stack.list.splice(raise_pos,1,['code','$raise'],['bracket','('])
pos=expr.end+1
}
var pos=stack.list.length-1
while(true){
var assert_pos=stack.find_previous(pos,"keyword","assert")
if(assert_pos===null){break}
var assert_indent=stack.indent(assert_pos)
var end=stack.line_end(assert_pos)
var cond_block=stack.list.slice(assert_pos+1,end)
stack.list[assert_pos][1]="if"
stack.list.splice(end,0,['delimiter',':'],['newline','\n'],
['indent',assert_indent+4],['keyword','pass'],['newline','\n'],
['indent',assert_indent],['keyword','else'],['delimiter',':'],['newline','\n'],
['indent',assert_indent+4],['code','$raise("AssertionError")'])
pos=assert_pos-1
}
pos=0
while(true){
var ar_pos=stack.find_next(pos,'id','assert_raises')
if(ar_pos===null){break}
stack.list[ar_pos+2][0]='str'
stack.list[ar_pos+2][1]='"'+stack.list[ar_pos+2][1]+'"'
pos=ar_pos+1
}
var pos=stack.list.length-1
while(true){
var if_pos=stack.find_previous(pos,'keyword','if')
if(if_pos===null){break}
var line_end=stack.line_end(if_pos)
var else_pos=stack.find_next(if_pos+1,'keyword','else')
if(else_pos===null || else_pos>line_end){pos=if_pos-1;continue}
var r1=stack.atom_before(if_pos,true)
var cond=stack.list.slice(if_pos+1,else_pos)
var r2=stack.atom_at(else_pos+1)
var tail=stack.list.slice(r2.end+1,stack.list.length)
var seq=cond
seq.push(['delimiter','?'])
seq=seq.concat(r1.list())
seq.push(['delimiter',':'])
seq=seq.concat(r2.list())
stack.list=stack.list.slice(0,if_pos-r1.end+r1.start-1).concat(seq).concat(tail)
pos=if_pos-1
}
var kws={'if':'if','else':'else','elif':'else if',
'class':'function','def':'function','for':'for','while':'while',
'try':'try','catch':'catch','finally':'finally'}
var has_parenth=$List2Dict('if','elif','while','for','catch')
var $funcs=[]
var module_level_functions=[]
var loop_id=0
for(kw in kws){
pos=0
while(pos<stack.list.length){
var kw_pos=stack.find_next(pos,"keyword",kw)
if(kw_pos==null){break}
var kw_indent=stack.indent(kw_pos)
var src_pos=stack.list[kw_pos][2]
var block=stack.find_block(kw_pos)
if(block===null){
if(kw==='if' || kw==='else'){
pos=kw_pos+1
continue
}
$SyntaxError(module,'no condition',stack.list[kw_pos][2])
}
s=new Stack(stack.list.slice(block[0],block[1]+1))
if(block==null){$SyntaxError(module,'missing block after '+kw,kw_pos)}
var multiline=(s.find_next(0,'newline')!=null)
stack.list[kw_pos][1]=kws[kw]
stack.list[kw_pos].push(kw)
stack.list[block[0]]=['bracket','{']
var end_pos=stack.list[block[1]][2]
tail=stack.list.slice(block[1],stack.list.length)
if(kw in has_parenth){
if(kw=="for"){
loop_id++
var block_indent=stack.indent(block[0]+2)
var arg_list=stack.atom_at(kw_pos+1,true)
var _in=stack.atom_at(arg_list.end+1)
var _in_list=stack.list.slice(_in.start,_in.end+1)
if(_in_list.length !=1 ||
_in_list[0][0]!="operator" || _in_list[0][1]!="in"){
$SyntaxError(module,"missing 'in' after 'for'",src_pos)
}
var iterable=stack.atom_at(_in.end+1,true)
seq=[['indent',kw_indent],
['code','var $iter'+loop_id],['assign','=']]
seq=seq.concat(iterable.list())
seq.push(['newline','\n'],['indent',kw_indent],['code','for'])
var $loop='(var $i'+loop_id+'=0;$i'+loop_id+'<'
$loop +='$iter'+loop_id+'.__len__();$i'+loop_id+'++){'
seq=seq.concat([['code',$loop],['newline','\n'],
['indent',block_indent]])
seq=seq.concat(arg_list.list())
seq.push(['assign','='],['id','$iter'+loop_id])
seq.push(['point','.'],['qualifier','__item__'],
['bracket','('],['id','$i'+loop_id],['bracket',')'])
seq=seq.concat(stack.list.slice(block[0]+1,block[1]))
stack.list=stack.list.slice(0,kw_pos-1)
stack.list=stack.list.concat(seq)
$err_num++
}else if(kw=='if' || kw=='elif' || kw=='while'){
var seq=[['bracket','(',src_pos],['id','bool'],['bracket','(']]
seq=seq.concat(stack.list.slice(kw_pos+1,block[0]))
seq.push(['bracket',')',src_pos])
seq.push(['bracket',')',src_pos])
seq.push(stack.list[block[0]])
seq=seq.concat(stack.list.slice(block[0]+1,block[1]))
stack.list=stack.list.slice(0,kw_pos+1)
stack.list=stack.list.concat(seq)
}else{
var seq=[['bracket','(',src_pos]]
seq=seq.concat(stack.list.slice(kw_pos+1,block[0]))
seq.push(['bracket',')',src_pos])
seq.push(stack.list[block[0]])
seq=seq.concat(stack.list.slice(block[0]+1,block[1]))
stack.list=stack.list.slice(0,kw_pos+1)
stack.list=stack.list.concat(seq)
}
}else if(kws[kw]=="function"){
var func_name=stack.list[kw_pos+1]
var i=0,parent=-1
for(i=$funcs.length-1;i>=0;i--){
if(kw_pos>$funcs[i][2]&& kw_pos<$funcs[i][3]){parent=i;break}
}
$funcs.push([kw,func_name[1],block[0],block[1],parent])
stack.list[kw_pos+1][0]="function_id"
var fname=stack.list[kw_pos+1][1]
if(kw=="class"){stack.list[kw_pos+1][1]='$'+fname}
seq=stack.list.slice(kw_pos+1,block[0]+1)
var fbody=stack.list.slice(block[0]+1,block[1])
var globals={}
var fstack=new Stack(fbody)
var global_pos=fstack.find_next(0,'keyword','global')
if(global_pos!==null){
var globs=fstack.atom_at(global_pos+1,true)
if(globs.type=="id" || globs.type=="tuple" ||
globs.type=="function_call"){
var glob_list=globs.list()
for(var i=0;i<glob_list.length;i++){
if(glob_list[i][0]=='id'){globals[glob_list[i][1]]=0}
}
}
fbody.splice(global_pos,glob_list.length+1)
}
seq=seq.concat(fbody)
if(kw==='def'){
for(var i=0;i<seq.length;i++){
if(seq[i][0]=="id"){
if(!(seq[i][1]in globals)){seq[i].push('local')}
}
}
}
stack.list=stack.list.slice(0,kw_pos+1)
stack.list=stack.list.concat(seq)
var indent=stack.indent(kw_pos)
var f_indent=''
while(indent>0){f_indent+=' ';indent--}
if(parent==-1){
var code='\n'+f_indent+'window.'+fname+'='+fname
module_level_functions.push(fname)
tail.splice(0,0,['func_end',code])
}else if($funcs[parent][0]=='class'){
var class_name=$funcs[parent][1]
stack.list.splice(kw_pos,2,["code",'this.'+fname+'='],
['keyword','function'])
}
if(kw=='class'){
var code='\n'+f_indent+fname+"=$class_constructor('"
code +=fname+"',$"+fname+")"
tail.splice(0,0,['func_end',code])
}
}else{
stack.list=stack.list.slice(0,block[1])
}
stack.list.push(['newline','\n',end_pos])
if(block[2]>0){
stack.list.push(['indent',block[2],end_pos])
}
stack.list.push(['bracket','}',end_pos])
stack.list=stack.list.concat(tail)
pos=kw_pos+1
}
}
var dobj=new Date()
times['if def class for']=dobj.getTime()-t0
pos=stack.list.length-1
while(true){
var op=stack.find_previous(pos,"operator","not")
if(op==null){break}
ro=stack.atom_at(op+1)
seq=[['bracket','(']]
seq=seq.concat(ro.list())
seq.push(['bracket',')'])
stack.list[op]=["id","$not",stack.list[op][2]]
var tail=stack.list.slice(ro.end+1,stack.list.length)
stack.list=stack.list.slice(0,op+1).concat(seq).concat(tail)
pos=op-1
}
pos=stack.list.length-1
while(true){
var assign=stack.find_previous(pos,"assign")
if(assign===null){break}
if(stack.list[assign][1]in $augmented_assigns){
var left=stack.atom_before(assign)
if(left.type=="id"){left.list()[0][3]="global"}
var op=stack.list[assign][1]
var simple_op=op.substr(0,op.length-1)
stack.list[assign][1]="="
stack.list.splice(assign+1,0,['operator',simple_op])
for(var i=left.list().length-1;i>=0;i--){
stack.list.splice(assign+1,0,left.list()[i])
}
}
pos=assign-1
}
var ops_order=["**","*","/","//","%","-","+",
"<","<=",">",">=","!=","==",
"+=","-=","*=","/=","//=","%=","**=",
"not_in","in","is_not"]
var ops=[], op=null
var lo1=$List2Dict(["id","bracket"])
var lo2=$List2Dict(["id","bracket","delimiter","operator"])
for(var i=0;i<ops_order.length;i++){
op=ops_order[i]
if(op=="+" || op=="-"){
ops.push([op,lo2])
}else{
ops.push([op,lo1])
}
}
var $lo_ok=$List2Dict('id','str','int','float','tuple')
for(var i=0;i<ops.length;i++){
operator=ops[i]
var op_sign=operator[0]
var auth_lo_types=operator[1]
var py_op='__'+$operators[op_sign]+'__'
pos=0
while(true){
var op=stack.find_next(pos,"operator",op_sign)
if(op==null){break}
var lo=stack.atom_before(op,false)
if(!lo.type in $lo_ok){
$SyntaxError(module,"Bad left operand type "+lo.type+" for "+op_sign,
stack.list[op][2])
}
var par_before_lo=false
if(lo.type!="tuple"){
var before_lo=stack.list[lo.start-1]
if(before_lo!=null){
if(before_lo[0]=="operator"){
par_before_lo=true
}
}
}
if(op==stack.list.length-1){
$SyntaxError(module,"Bad right operand ",stack.list[op][2])
}
var ro=stack.atom_at(op+1,false)
if(op_sign in $List2Dict("+=","-=","*=","/=","//=","%=","**=")){
ro.end=stack.find_next(op,'newline')-1
}
var ro_startswith_par=false
if(ro!=null && ro.type=="tuple"){ro_startswith_par=true}
var sequence=new Array()
if(par_before_lo){sequence.push(["bracket","(",op[2]])}
sequence=sequence.concat(stack.list.slice(lo.start,lo.end+1))
sequence.push(["point",".",op[2]])
sequence.push(["qualifier",py_op,op[2]])
if(!ro_startswith_par){sequence.push(["bracket","(",op[2]])}
sequence=sequence.concat(stack.list.slice(ro.start,ro.end+1))
if(!ro_startswith_par){sequence.push(["bracket",")",op[2]])}
if(par_before_lo){sequence.push(["bracket",")",op[2]])}
tail=stack.list.slice(ro.end+1,stack.list.length)
stack.list.splice(lo.start,ro.end-lo.start+1)
stack.list=stack.list.slice(0,lo.start).concat(sequence).concat(tail)
pos=op+1
}
}
var ops={"and":"&&","or":"||"}
for(var op in ops){
var pos=0
while(true){
var op_pos=stack.find_next(pos,'operator',op)
if(op_pos===null){break}
stack.list[op_pos][1]=ops[op]
var left=stack.atom_before(op_pos,false)
var right=stack.atom_at(op_pos+1,false)
var head=stack.list.slice(0,left.start)
var tail=stack.list.slice(right.end+1,stack.list.length)
var nb=0
if(left.list()[0].match(['bracket','('])){
left=[['id','$test_item']].concat(left.list())
nb++
}else if(!left.list()[0].match(['id','$test_item'])){
left=[['id','$test_item'],['bracket','(']].concat(left.list()).concat([['bracket',')']])
nb +=3
}else{
left=left.list()
}
if(right.list()[0].match(['bracket','('])){
right=[['id','$test_item']].concat(right.list())
nb++
}else{
right=[['id','$test_item'],['bracket','(']].concat(right.list()).concat([['bracket',')']])
nb+=3
}
stack.list=head
stack.list=stack.list.concat(left).concat([['operator',ops[op]]]).concat(right)
stack.list=stack.list.concat(tail)
pos+=nb
}
}
var pos=0
while(true){
var test_pos=stack.find_next(pos,'id','$test_item')
if(test_pos===null){break}
var test_end=stack.find_next_matching(test_pos+1)
while(test_end<stack.list.length-1 && stack.list[test_end+1][0]=='operator'
&&(stack.list[test_end+1][1]=='&&' || stack.list[test_end+1][1]=='||')){
test_end=stack.find_next_matching(test_end+3)
}
stack.list.splice(test_end,0,['bracket',')'])
stack.list.splice(test_pos,0,['id','$test_expr'],['bracket','('])
pos=test_end
}
var dobj=new Date()
times['operators']=dobj.getTime()-t0
var js2py={'pass':'void(0)'}
for(key in js2py){
pos=0
while(true){
var func_pos=stack.find_next(pos,'keyword',key)
if(func_pos==null){break}
stack.list[func_pos][1]=js2py[key]
pos=func_pos+1
}
}
var js2py={'alert':'$alert','prompt':'$prompt','confirm':'$confirm',
'print':'$print','eval':'$eval'}
for(key in js2py){
pos=0
while(true){
var func_pos=stack.find_next(pos,'id',key)
if(func_pos==null){break}
if(!stack.list[func_pos+1].match(['bracket','('])){
$SyntaxError(module,'missing ( after function '+key,func_pos)
}
stack.list[func_pos][0]='code'
stack.list[func_pos][1]=js2py[key]
pos=func_pos+1
}
}
var pos=stack.list.length-1
while(true){
var assign=stack.find_previous(pos,"assign","=")
if(assign===null){break}
var line_start=stack.line_start(assign)
var line_end=stack.line_end(assign)
var line_stack=new Stack(stack.list.slice(line_start,line_end))
var line_pos=line_stack.list.length-1
var assigns=[]
var nb_assigns=0
while(true){
var assign_pos=line_stack.find_previous(line_pos,'assign','=')
if(assign_pos===null){break}
nb_assigns++
var left=line_stack.atom_before(assign_pos,true)
var right=line_stack.atom_at(assign_pos+1,true)
assigns.push(stack.list[line_start])
assigns=assigns.concat(left.list())
assigns.push(["assign","="])
assigns=assigns.concat(right.list())
assigns.push(['newline','\n'])
line_pos=assign_pos-1
}
if(nb_assigns>1){
var assign_stack=new Stack(assigns)
var tail=stack.list.slice(line_end,stack.list.length)
stack.list=stack.list.slice(0,line_start).concat(assigns).concat(tail)
}
pos=line_start
}
pos=stack.list.length-1
while(true){
var assign=stack.find_previous(pos,"assign","=")
if(assign==null){break}
var left=stack.atom_before(assign,true)
var line_end=stack.line_end(assign)
var right=new Stack(stack.list.slice(assign+1,line_end))
if(left.type=="tuple" ||
(left.type=="function_call" && left.list()[0][1]=="tuple")){
var list=left.list()
if(list[0].match(["id","tuple"])){
list=list.slice(2,list.length-1)
}
var t_stack=new Stack(list)
var targets=t_stack.split(',')
document.line_num=pos2line[stack.list[assign][2]]
var indent=stack.indent(assign)
var seq=$multiple_assign(indent,targets,right,stack.list[assign][2])
var tail=stack.list.slice(line_end+1,stack.list.length)
stack.list=stack.list.slice(0,left.start).concat(seq).concat(tail)
pos=left.start+seq.length-1
}else if(left.type=='str' || left.type=='int' || left.type=='float'){
pos=left.list()[0][2]
$SyntaxError(module,"can't assign to literal",pos)
}else if(left.type=='id' && $tags.indexOf(left.list()[0][1])>-1){
$SyntaxError(module,"can't assign to reserved word "+left.list()[0][1],
left.list()[0][2])
}else if(left.type=='qualified_id' || left.type=='slicing' || left.type=="function_call"){
pos=assign-1
}else{
var assign_indent=stack.indent(assign)
var lower_indent=null
var indent_pos=stack.find_previous(assign,'indent')
while(indent_pos>0){
var indent_pos=stack.find_previous(indent_pos-1,'indent')
if(stack.list[indent_pos][1]<assign_indent){
var first=stack.list[indent_pos+1]
if(first.match(['keyword','function'])&&
first[first.length-1]==='class'){
left.list()[0][1]='this.'+left.list()[0][1]
}
break
}
}
left.list()[0][0]="assign_id"
if(left.list()[0][3]==="local"){left.list()[0][1]="var "+left.list()[0][1]}
var r_elts=right.split(',')
if(r_elts.length>1){
stack.list.splice(line_end,0,['bracket',']'])
stack.list.splice(assign+1,0,['bracket','['])
assign--
}
pos=assign-1
}
}
var dobj=new Date()
times['assignments']=dobj.getTime()-t0
pos=stack.list.length-1
while(true){
br_pos=stack.find_previous(pos,'bracket','[')
if(br_pos==null){break}
if(br_pos==0){break}
var previous=stack.list[br_pos-1]
if(['id','qualifier','keyword','bracket'].indexOf(previous[0])==-1){pos=br_pos-1;continue}
src_pos=stack.list[br_pos][2]
var end=stack.find_next_matching(br_pos)
var args=stack.list.slice(br_pos+1,end)
if(args.length==0){$SyntaxError(module,'invalid syntax',br_pos)}
var args1=new Stack(args)
var items=args1.split(":")
var new_args=[]
if(items.length==1){
new_args=items[0].list
}else{
new_args=[['id','slice',src_pos]]
new_args.push(['bracket','(',src_pos])
for(var i=0;i<items.length;i++){
var item=items[i]
if(item.list.length==0){
new_args.push(['keyword','null',src_pos])
}else{
new_args=new_args.concat(item.list)
}
if(i<items.length-1){
new_args.push(["delimiter",",",src_pos])
}
}
new_args.push(['bracket',')',stack.list[end][2]])
}
if(end<stack.list.length-1 && stack.list[end+1][0]=="assign"){
var sequence=[['point','.',src_pos],['qualifier','__setitem__',src_pos],
['bracket','(',src_pos]]
left=stack.atom_before(end+1)
right=stack.atom_at(end+2)
sequence=sequence.concat(new_args)
sequence.push(['delimiter',',',stack.list[end+1][2]])
sequence=sequence.concat(right.list())
sequence.push(['bracket',')',stack.list[end][2]])
tail=stack.list.slice(right.end+1,stack.list.length)
stack.list=stack.list.slice(0,br_pos)
stack.list=stack.list.concat(sequence).concat(tail)
}else{
var func='__getitem__'
var x=stack.atom_before(br_pos)
if(x.start>0){
var before=stack.list[x.start-1]
if(before[0]=='keyword' && before[1]=='del'){
var func='__delitem__'
}
}
var sequence=[['point','.',src_pos],['qualifier',func,src_pos],
['bracket','(',src_pos]]
sequence=sequence.concat(new_args)
sequence.push(['bracket',')',stack.list[end][2]])
tail=stack.list.slice(end+1,stack.list.length)
stack.list=stack.list.slice(0,br_pos)
stack.list=stack.list.concat(sequence).concat(tail)
if(func=='__delitem__'){
stack.list.splice(x.start-1,1)
}
}
pos=br_pos-1
}
var dobj=new Date()
times['slicings']=dobj.getTime()-t0
pos=stack.list.length-1
while(true){
q_pos=stack.find_previous(pos,'qualifier')
if(q_pos==null){break}
src_pos=stack.list[q_pos][2]
if(q_pos<stack.list.length-1 && stack.list[q_pos+1][0]=="assign"){
var ro=stack.atom_at(q_pos+2)
var q_name=stack.list[q_pos][1]
if(q_name.substr(0,2)=='__'){pos=q_pos-1;continue}
tail=stack.list.slice(ro.end+1,stack.list.length)
var seq=[['id','__setattr__'],['bracket','('],
['code',"'"+q_name+"'"],['delimiter',',']]
seq=seq.concat(ro.list()).concat([['bracket',')']])
stack.list=stack.list.slice(0,q_pos).concat(seq).concat(tail)
}else{
var func='__getattr__'
var x=stack.atom_before(q_pos)
if(x.start>0){
var before=stack.list[x.start-1]
if(before[0]=='keyword' && before[1]=='del'){
var func='__delattr__'
}
}
var q_name=stack.list[q_pos][1]
if(q_name.substr(0,2)=='__'){pos=q_pos-1;continue}
stack.list.splice(q_pos,1,['id',func],['bracket','('],
['code',"'"+q_name+"'"],['bracket',')'])
if(func=='__delattr__'){
stack.list.splice(x.start-1,1)
}
}
pos=q_pos-1
}
var pos=0
while(true){
var $list_pos=stack.find_next(pos,'id','$list')
if($list_pos===null){break}
stack.list.splice($list_pos,1)
var end=stack.find_next_matching($list_pos)
stack.list[$list_pos][1]='['
stack.list[end][1]=']'
pos=$list_pos
}
var dobj=new Date()
times['total']=dobj.getTime()-t0
if(document.$debug==2){console.log(stack.to_js())}
return stack
}
function brython(debug){
document.$debug=debug
document.$py_src={}
document.$brython_path=null
var elts=document.getElementsByTagName("script")
for(var $i=0;$i<elts.length;$i++){
var elt=elts[$i]
if(elt.type=="text/python"){
var src=(elt.innerHTML || elt.textContent)
exec(src)
}
else{
var br_scripts=['brython.js','py_tokenizer.js']
for(var j=0;j<br_scripts.length;j++){
var bs=br_scripts[j]
if(elt.src.substr(elt.src.length-bs.length)==bs){
if(elt.src.length===bs.length ||
elt.src.charAt(elt.src.length-bs.length-1)=='/'){
document.$brython_path=elt.src.substr(0,elt.src.length-bs.length)
break
}
}
}
}
}
}var $operators={
"//=":"ifloordiv",">>=":"irshift","<<=":"ilshift",
"**=":"ipow","**":"pow","//":"floordiv","<<":"lshift",">>":"rshift",
"+=":"iadd","-=":"isub","*=":"imul","/=":"itruediv",
"%=":"imod","&=":"iand","|=":"ior",
"^=":"ipow","+":"add","-":"sub","*":"mul",
"/":"truediv","%":"mod","&":"and","|":"or",
"^":"pow","<":"lt",">":"gt",
"<=":"le",">=":"ge","==":"eq","!=":"ne",
"or":"or","and":"and","in":"in","not":"not",
"not_in":"not_in","is_not":"is_not"
}
var $augmented_assigns={
"//=":"ifloordiv",">>=":"irshift","<<=":"ilshift",
"**=":"ipow","+=":"iadd","-=":"isub","*=":"imul","/=":"itruediv",
"%=":"imod","^=":"ipow"
}
var $first_op_letter={}
for(op in $operators){$first_op_letter[op.charAt(0)]=0}
function $tokenize(src,module){
var delimiters=[["#","\n","comment"],['"""','"""',"triple_string"],
["'","'","string"],['"','"',"string"],
["r'","'","raw_string"],['r"','"',"raw_string"]]
var br_open={"(":0,"[":0,"{":0}
var br_close={")":"(","]":"[","}":"{"}
var br_stack=""
var br_pos=new Array()
var kwdict=["False","class","finally","is","return",
"None","continue","for","lambda","try","raise","True","def","from",
"nonlocal","while","del","global","with",
"as","elif","if","yield","assert","else","import","pass",
"break","except","raise"]
var unsupported=["is","from","nonlocal","with",
"as","yield"]
var forbidden=['item','var',
'closed','defaultStatus','document','frames',
'history','innerHeight','innerWidth','length',
'location','name','navigator','opener',
'outerHeight','outerWidth','pageXOffset','pageYOffset',
'parent','screen','screenLeft','screenTop',
'screenX','screenY','self','status',
'top',
'super']
var punctuation={',':0,':':0}
var int_pattern=new RegExp("^\\d+")
var float_pattern=new RegExp("^\\d+\\.\\d*(e-?\\d+)?")
var id_pattern=new RegExp("[\\$_a-zA-Z]\\w*")
var stack=new Array()
var name=""
var _type=null
var pos=0
while(pos<src.length && src.charAt(pos)==' '){pos++}
var indent_stack=[pos]
stack.push(['indent',pos,0])
var pos2line={}
var lnum=1
for(i=0;i<src.length;i++){
pos2line[i]=lnum
if(src.charAt(i)=='\n'){lnum+=1}
}
lnum=0
while(pos<src.length){
document.line_num=pos2line[pos]
var flag=false
var car=src.charAt(pos)
if(stack.length==0 || $last(stack)[0]=='newline'){
var indent=0
while(pos<src.length){
if(src.charAt(pos)==" "){indent++;pos++}
else if(src.charAt(pos)=="\t"){
indent++;pos++
while(indent%8>0){indent++}
}else{break}
}
if(src.charAt(pos)=='\n'){pos++;lnum++;continue}
if(stack.length>1){
if(indent>$last(indent_stack)){
if(stack[stack.length-2][0]!="delimiter" &&
stack[stack.length-2][1]!=":"){
$IndentationError(module,"unexpected indent",pos)
}else{
indent_stack.push(indent)
}
}else if(indent==$last(indent_stack)){
if(stack[stack.length-2][0]=="delimiter" &&
stack[stack.length-2][1]==":"){
$IndentationError(module,"expected an indented block",pos)
}
}else if(indent<$last(indent_stack)){
indent_stack.pop()
while(true){
if(indent_stack.length==0){
$IndentationError(module,'unexpected indent',pos)
}
if(indent>$last(indent_stack)){
$IndentationError(module,'unexpected indent',pos)
}else if(indent==$last(indent_stack)){break}
else{indent_stack.pop()}
}
}
}else if(indent>0){
$IndentationError(module,"unexpected indent",pos)
}
stack.push(["indent",indent,pos-indent])
continue
}
if(car=="#"){
var end=src.substr(pos+1).search('\n')
if(end==-1){end=src.length-1}
pos +=end+1;continue
}
if(car=='"' || car=="'"){
var raw=false
var end=null
if(name.length>0 && name.toLowerCase()=="r"){
raw=true;name=""
}
if(src.substr(pos,3)==car+car+car){_type="triple_string";end=pos+3}
else{_type="string";end=pos+1}
var escaped=false
var zone=car
var found=false
while(end<src.length){
if(escaped){zone+=src.charAt(end);escaped=false;end+=1}
else if(src.charAt(end)=="\\"){
if(raw){
zone +='\\\\'
end++
}else{
if(src.charAt(end+1)=='\n'){
end +=2
lnum++
}else{
zone+=src.charAt(end);escaped=true;end+=1
}
}
}else if(src.charAt(end)==car){
if(_type=="triple_string" && src.substr(end,3)!=car+car+car){
end++
}else{
found=true
if(stack.length>0 && $last(stack)[0]=="str"){
stack.push(['operator','+',end])
}
stack.push(["str",zone+car,pos])
pos=end+1
if(_type=="triple_string"){pos=end+3}
break
}
}else{
zone +=src.charAt(end)
if(src.charAt(end)=='\n'){lnum++}
end++
}
}
if(!found){
document.line_num=pos2line[pos]
$SyntaxError(module,"String end not found",pos)
}
continue
}
if(name==""){
if(car.search(/[a-zA-Z_]/)!=-1){
name=car
pos++;continue
}
}else{
if(car.search(/\w/)!=-1){
name+=car
pos++;continue
}else{
if(kwdict.indexOf(name)>-1){
if(unsupported.indexOf(name)>-1){
document.line_num=pos2line[pos]
$SyntaxError(module,"Unsupported Python keyword '"+name+"'",pos)
}
stack.push(["keyword",name,pos-name.length])
}else if(name in $operators){
stack.push(["operator",name,pos-name.length])
}else if(stack.length>1 && $last(stack)[0]=="point"
&&(['id','str','int','float','qualifier','bracket'].indexOf(stack[stack.length-2][0])>-1)){
stack.push(["qualifier",name,pos-name.length])
}else{
if(forbidden.indexOf(name)>-1){name='$$'+name}
stack.push(["id",name,pos-name.length])
}
name=""
continue
}
}
if(car=="."){
stack.push(["point",".",pos])
pos++;continue
}
if(car.search(/\d/)>-1){
var res=float_pattern.exec(src.substr(pos))
if(res){
if(res[0].search('e')>-1){stack.push(["float",res[0],pos])}
else{stack.push(["float",eval(res[0]),pos])}
}else{
res=int_pattern.exec(src.substr(pos))
stack.push(["int",eval(res[0]),pos])
}
pos +=res[0].length
continue
}
if(car=="\n"){
lnum++
if(br_stack.length>0){
pos++;continue
}else{
if(stack[stack.length-1][0]!="newline"){
stack.push(["newline",lnum,pos])
}else{
stack[stack.length-1][1]=lnum
}
pos++;continue
}
}
if(car in br_open){
br_stack +=car
br_pos[br_stack.length-1]=pos
stack.push(["bracket",car,pos])
pos++;continue
}
if(car in br_close){
if(br_stack==""){
$SyntaxError(module,"Unexpected closing bracket",pos)
}else if(br_close[car]!=$last(br_stack)){
document.line_num=pos2line[pos]
$SyntaxError(module,"Unbalanced bracket",pos)
}else{
br_stack=br_stack.substr(0,br_stack.length-1)
stack.push(["bracket",car,pos])
pos++;continue
}
}
if(car=="="){
if(src.charAt(pos+1)!="="){
if(br_stack.length==0){
stack.push(["assign","=",pos])
}else{
stack.push(["delimiter","=",pos])
}
pos++;continue
}else{
stack.push(["operator","==",pos])
pos+=2;continue
}
}
if(car in punctuation){
stack.push(["delimiter",car,pos])
pos++;continue
}
if(car in $first_op_letter){
var op_match=""
for(op_sign in $operators){
if(op_sign==src.substr(pos,op_sign.length)
&& op_sign.length>op_match.length){
op_match=op_sign
}
}
if(op_match.length>0){
if(op_match in $augmented_assigns){
stack.push(["assign",op_match,pos])
}else{
stack.push(["operator",op_match,pos])
}
pos +=op_match.length
continue
}
}
if(car=='\\' && src.charAt(pos+1)=='\n'){
lnum++;pos+=2;continue
}
if(car!=' '){$SyntaxError(module,'unknown token ['+car+']',pos)}
pos +=1
}
if(br_stack.length!=0){
pos=br_pos.pop()
document.line_num=pos2line[pos]
$SyntaxError(module,"Unbalanced bracket "+br_stack.charAt(br_stack.length-1),pos)
}
return stack
}
function Atom(stack){
this.parent=stack
this.type=null
this.stack=function(){
return new Stack(this.parent.list.slice(this.start,this.end+1))
}
this.list=function(){
return this.parent.list.slice(this.start,this.end+1)
}
this.to_js=function(){return this.stack().to_js()}
}
function Stack(stack_list){
this.list=stack_list
}
Stack.prototype.atom_at=function(pos,implicit_tuple){
if(!implicit_tuple){return this.raw_atom_at(pos)}
else{
var items=this.tuple_at(pos)
atom=new Atom(this)
atom.items=items
if(items.length==1){return items[0]}
else{
atom.type="tuple"
atom.start=items[0].start
atom.end=items[items.length-1].end
return atom
}
}
}
Stack.prototype.atom_before=function(pos,implicit_tuple){
atom=new Atom(this)
if(pos==0){return null}
atom.end=pos-1
atom.start=pos-1
var atom_parts=$List2Dict("id","assign_id","str",'int','float',"point","qualifier")
var $valid_kws=$List2Dict("True","False","None")
var closing=$List2Dict(')',']')
while(true){
if(atom.start==-1){break}
var item=this.list[atom.start]
if(item[0]in atom_parts){atom.start--;continue}
else if(item[0]=="keyword" && item[1]in $valid_kws){
atom.start--;continue
}
else if(item[0]=="bracket" && item[1]in closing){
atom.start=this.find_previous_matching(atom.start)-1
continue
}
else if(implicit_tuple && item[0]=="delimiter"
&& item[1]==","){atom.start--;continue}
break
}
atom.start++
return this.atom_at(atom.start,implicit_tuple)
}
Stack.prototype.dump=function(){
ch=''
for(var i=0;i<this.list.length;i++){
_item=this.list[i]
ch +=i+' '+_item[0]+' '+_item[1]+'\n'
}
alert(ch)
}
Stack.prototype.find_block=function(pos){
var item=this.list[pos]
var closing_pos=this.find_next_at_same_level(pos+1,'delimiter',':')
if(closing_pos!=null){
var kw_indent=this.indent(pos)
var stop=closing_pos
while(true){
nl=this.find_next(stop,"newline")
if(nl==null){stop=this.list.length-1;break}
if(nl<this.list.length-1){
if(this.list[nl+1][0]=="indent"){
if(this.list[nl+1][1]<=kw_indent){
stop=nl
break
}
}else{
stop=nl
break
}
}else{
stop=this.list.length-1
break
}
stop=nl+1
}
return[closing_pos,stop,kw_indent]
}else{return null}
}
Stack.prototype.find_next=function(){
var pos=arguments[0]
var _type=arguments[1]
var values=null
if(arguments.length>2){
values={}
for(i=2;i<arguments.length;i++){values[arguments[i]]=0}
}
for(i=pos;i<this.list.length;i++){
if(this.list[i][0]===_type){
if(values===null){
return i
}else if(this.list[i][1]in values){
return i
}
}
}
return null
}
Stack.prototype.find_next_at_same_level=function(){
var pos=arguments[0]
var _type=arguments[1]
var values=null
if(arguments.length>2){
values={}
for(i=2;i<arguments.length;i++){values[arguments[i]]=0}
}
while(true){
if(this.list[pos][0]==_type){
if(values==null){return pos}
else if(this.list[pos][1]in values){return pos}
}else if(this.list[pos][0]=="bracket"){
if(this.list[pos][1]in $OpeningBrackets){
pos=this.find_next_matching(pos)
}else if(this.list[pos][1]in $ClosingBrackets){
return null
}
}
pos++
if(pos>this.list.length-1){return null}
}
}
Stack.prototype.find_next_matching=function(pos){
var brackets={"(":")","[":"]","{":"}"}
var _item=this.list[pos]
if(_item[0]=="bracket"){
opening=_item[1]
count=0
for(i=pos;i<this.list.length;i++){
if(this.list[i][0]=="bracket"){
var value=this.list[i][1]
if(value==opening){count +=1}
else if(value==brackets[opening]){
count -=1
if(count==0){return i}
}
}
}
}
return null
}
Stack.prototype.find_previous=function(){
var pos=arguments[0]
var _type=arguments[1]
var values=null
if(arguments.length>2){
values={}
for(i=2;i<arguments.length;i++){values[arguments[i]]=0}
}
for(i=pos;i>=0;i--){
if(this.list[i][0]==_type){
if(values==null){
return i
}else if(this.list[i][1]in values){
return i
}
}
}
return null
}
Stack.prototype.find_previous_matching=function(pos){
var brackets={")":"(","]":"[","}":"{"}
var item=this.list[pos]
var i=0
if(item[0]=="bracket"){
closing=item[1]
count=0
for(i=pos;i>=0;i--){
if(this.list[i][0]=="bracket"){
var value=this.list[i][1]
if(value==closing){count +=1;}
else if(value==brackets[closing]){
count -=1
if(count==0){return i}
}
}
}
}
return null
}
Stack.prototype.ids_in=function(){
var ids=[]
for(var i=0;i<this.list.length;i++){
if(this.list[i][0]==='id'){
var loc_var=this.list[i][1]
if(ids.indexOf(loc_var)===-1){ids.push(loc_var)}
}
}
return ids
}
Stack.prototype.indent=function(pos){
var ipos=this.find_previous(pos,"indent")
return this.list[ipos][1]
}
Stack.prototype.line_end=function(pos){
var nl=this.find_next(pos,"newline")
if(nl==null){nl=this.list.length}
return nl
}
Stack.prototype.line_start=function(pos){
var nl=this.find_previous(pos,"newline")
if(nl==null){return 0}
return nl+1
}
Stack.prototype.next_at_same_indent=function(pos){
var indent=this.indent(pos)
var nxt_pos=this.find_next(pos,"newline")
while(true){
if(nxt_pos===null){return null}
if(nxt_pos>=this.list.length-1){return null}
else if(this.list[nxt_pos+1][0]=="indent"){
var nxt_indent=this.list[nxt_pos+1][1]
nxt_pos++
}else{var nxt_indent=0}
if(nxt_indent==indent){return nxt_pos+1}
else if(nxt_indent<indent){return null}
nxt_pos=this.find_next(nxt_pos+1,"newline")
}
}
Stack.prototype.raw_atom_at=function(pos){
atom=new Atom(this)
atom.valid_type=true
atom.start=pos
if(pos>this.list.length-1){
atom.valid_type=false
atom.end=pos
return atom
}
var dict1=$List2Dict('id','assign_id','str','int','float')
var $valid_kws=$List2Dict("True","False","None")
if(this.list[pos][0]in dict1 ||
(this.list[pos][0]=="keyword" && this.list[pos][1]in $valid_kws)||
(this.list[pos][0]=="bracket" &&
(this.list[pos][1]=="(" || this.list[pos][1]=='['))){
atom.type=this.list[pos][0]
end=pos
if(this.list[pos][0]=='bracket'){
atom.type="tuple"
end=this.find_next_matching(pos)
}
while(end<this.list.length-1){
var item=this.list[end+1]
if(item[0]in dict1 && atom.type=="qualified_id"){
end +=1
}else if(item[0]=="point"||item[0]=="qualifier"){
atom.type="qualified_id"
end +=1
}else if(item[0]=="bracket" && item[1]=='('){
atom.type="function_call"
end=this.find_next_matching(end+1)
}else if(item[0]=="bracket" && item[1]=='['){
atom.type="slicing"
end=this.find_next_matching(end+1)
}else{
break
}
}
atom.end=end
return atom
}else if(this.list[pos][0]=="bracket" &&
(this.list[pos][1]=="(" || this.list[pos][1]=='[')){
atom.type="tuple"
atom.end=this.find_next_matching(pos)
return atom
}else{
atom.type=this.list[pos][0]
atom.valid_type=false
atom.end=pos
return atom
}
}
Stack.prototype.split=function(delimiter){
var items=new Array(), count=0,pos=0,start=0
while(pos<this.list.length){
pos=this.find_next_at_same_level(pos,'delimiter',delimiter)
if(pos==null){pos=this.list.length;break}
var s=new Stack(this.list.slice(start,pos))
s.start=start
s.end=pos-1
items.push(s)
start=pos+1
pos++
}
var s=new Stack(this.list.slice(start,pos))
s.start=start
s.end=pos-1
if(s.end<start){s.end=start}
items.push(s)
return items
}
Stack.prototype.to_js=function(){
var i=0,j=0,x=null
var js="",scope_stack=[]
var t2=$List2Dict('id','assign_id','str','int','float','keyword','code')
for(i=0;i<this.list.length;i++){
x=this.list[i]
if(x[0]=="indent"){
for(j=0;j<x[1];j++){js +=" "}
}else if(x[0]in t2){
if(x[0]=='int'){js +='Number('+x[1]+')'}
else if(x[0]==='float'){js +='float('+x[1]+')'}
else if(x[0]==='str'){js+=x[1].replace(/\n/gm,'\\n')}
else{js +=x[1]}
if(i<this.list.length-1 && this.list[i+1][0]!="bracket"
&& this.list[i+1][0]!="point" && this.list[i+1][0]!="delimiter"){
js +=" "
}
}else{
if(x[0]=="newline"){js +='\r\n'}
else{js +=x[1]}
}
}
return js
}
Stack.prototype.tuple_at=function(pos){
var first=this.raw_atom_at(pos)
var items=[first]
while(true){
var last=items[items.length-1]
if(last.end+1>=this.list.length){break}
var delim=this.list[last.end+1]
if(delim[0]=='delimiter' && delim[1]==','){
var next=this.raw_atom_at(last.end+2)
if(next !==null && next.valid_type){items.push(next)}
else{break}
}else{break}
}
return items
}
function $MakeArgs($fname,$args,$required,$defaults,$other_args,$other_kw){
var i=null,$PyVars={},$def_names=[],$ns={}
for(var k in $defaults){$def_names.push(k);$ns[k]=$defaults[k]}
if($other_args !=null){$ns[$other_args]=[]}
if($other_kw !=null){$dict_items=[]}
var upargs=[]
for(var i=0;i<$args.length;i++){
if($args[i]===null){upargs.push(null)}
else if(isinstance($args[i],$ptuple)){
for(var j=0;j<$args[i].arg.length;j++){
upargs.push($args[i].arg[j])
}
}else if(isinstance($args[i],$pdict)){
for(var j=0;j<$args[i].arg.$keys.length;j++){
upargs.push($Kw($args[i].arg.$keys[j],$args[i].arg.$values[j]))
}
}else{
upargs.push($args[i])
}
}
for(var $i=0;$i<upargs.length;$i++){
$arg=upargs[$i]
$PyVar=$JS2Py($arg)
if(isinstance($arg,$Kw)){
$PyVar=$arg.value
if($arg.name in $PyVars){
throw new TypeError($fname+"() got multiple values for argument '"+$arg.name+"'")
}else if($required.indexOf($arg.name)>-1){
var ix=$required.indexOf($arg.name)
eval('var '+$required[ix]+"=$PyVar")
$ns[$required[ix]]=$PyVar
}else if($arg.name in $defaults){
$ns[$arg.name]=$PyVar
}else if($other_kw!=null){
$dict_items.push([$arg.name,$PyVar])
}else{
throw new TypeError($fname+"() got an unexpected keyword argument '"+$arg.name+"'")
}
if($arg.name in $defaults){delete $defaults[$arg.name]}
}else{
if($i<$required.length){
eval('var '+$required[$i]+"=$PyVar")
$ns[$required[$i]]=$PyVar
}else if($i<$required.length+$def_names.length){
$ns[$def_names[$i-$required.length]]=$PyVar
}else if($other_args!=null){
eval('$ns["'+$other_args+'"].push($PyVar)')
}else{
msg=$fname+"() takes "+$required.length+' positional arguments '
msg +='but more were given'
throw TypeError(msg)
}
}
}
if($other_kw!=null){$ns[$other_kw]=dict($dict_items)}
return $ns
}
function $list_comp($loops,$expr,$cond,$env){
for(var i=0;i<$env.length;i+=2){
eval('var '+$env[i]+'=$env['+(i+1)+']')
}
var py='res = []\n'
for(var i=0;i<$loops.length;i++){
for(j=0;j<4*i;j++){py +=' '}
py +='for '+$loops[i][0]+' in '+$loops[i][1]+':\n'
}
if($cond){
for(var j=0;j<4*i;j++){py +=' '}
py +='if '+$cond+':\n'
i++
}
for(var j=0;j<4*i;j++){py +=' '}
py +='tvar = '+$expr+'\n'
for(var j=0;j<4*i;j++){py +=' '}
py +='res.append(tvar)'
var js=$py2js(py).to_js()
eval(js)
return res
}
function $JS2Py(src){
if(src===null){return None}
if(typeof src==='number'){
if(src%1===0){return src}
else{return float(src)}
}
if(src.__class__!==undefined){return src}
if(typeof src=="object"){
if(src.constructor===Array){return src}
else if($isNode(src)){return $DOMNode(src)}
else if($isEvent(src)){return $DOMEvent(src)}
}
return JSObject(src)
}
function $module(){}
$module.__class__=$type
$module.__str__=function(){return "<class 'module'>"}
function $getattr(obj,attr){
if(obj[attr]!==undefined){
var res=obj[attr]
if(typeof res==="function"){
res=$bind(res, obj)
}
return $JS2Py(res)
}
}
function $bind(func, thisValue){
return function(){return func.apply(thisValue, arguments)}
}
function $raise(name,msg){
if(msg===undefined){msg=''}
if(document.$debug && msg.split('\n').length==1){
var module=document.$line_info[1]
var line_num=document.$line_info[0]
var lines=document.$py_src[module].split('\n')
msg +="\nmodule '"+module+"' line "+line_num
msg +='\n'+lines[line_num-1]
}
err=new Error()
err.name=name
err.message=msg
err.py_error=true
if(document.$stderr!==null){document.$stderr_buff=err.name+': '+err.message}
throw err
}
function $src_error(name,module,msg,pos){
var pos2line={}
var lnum=1
var src=document.$py_src[module]
for(i=0;i<src.length;i++){
pos2line[i]=lnum
if(src.charAt(i)=='\n'){lnum+=1}
}
var line_num=pos2line[pos]
var lines=src.split('\n')
msg +="\nmodule '"+module+"' line "+line_num
msg +='\n'+lines[line_num-1]
err=new Error()
err.name=name
err.message=msg
err.py_error=true
if(document.$stderr!==null){document.$stderr_buff=err.message}
throw err
}
function $SyntaxError(module,msg,pos){
$src_error('SyntaxError',module,msg,pos)
}
function $IndentationError(module,msg,pos){
$src_error('IndentationError',module,msg,pos)
}
function $class_constructor(class_name,class_func){
var f=function(){
var obj=new class_func()
obj.__class__=f
obj.__getattr__=function(attr){
if(obj[attr]!==undefined){return obj[attr]}
else{$raise("AttributeError",obj+" has no attribute '"+attr+"'")}
}
obj.__setattr__=function(attr,value){obj[attr]=value}
obj.__str__=function(){return "<object '"+class_name+"'>"}
obj.toString=obj.__str__
if(obj.__init__ !==undefined){obj.__init__.apply(obj,arguments)}
return obj
}
f.__str__=function(){return "<class '"+class_name+"'>"}
f.__getattr__=function(attr){console.log('attr '+attr);return class_func[attr]}
return f
}
var $dq_regexp=new RegExp('"',"g")
function $escape_dq(arg){return arg.replace($dq_regexp,'\\"')}
document.$stderr=null
document.$stderr_buff=''
document.$stdout={
write: function(data){console.log(data)}
}
function $type(){}
$type.__class__=$type
$type.toString=function(){return "<class 'type'>"}
function $UnsupportedOpType(op,class1,class2){
$raise('TypeError',
"unsupported operand type(s) for "+op+": '"+class1+"' and '"+class2+"'")
}
function $KwClass(name,value){
this.__class__=$Kw
this.name=name
this.value=value
}
$KwClass.prototype.toString=function(){
return '<kw '+this.name+' : '+this.value.toString()+'>'
}
function $Kw(name,value){
return new $KwClass(name,value)
}
function $ptuple_class(arg){
this.__class__=$ptuple
this.arg=arg
}
function $ptuple(arg){return new $ptuple_class(arg)}
function $pdict_class(arg){
this.__class__=$pdict
this.arg=arg
}
function $pdict(arg){return new $pdict_class(arg)}
function $test_item(expr){
document.$test_result=expr
return bool(expr)
}
function $test_expr(){
return document.$test_result
}
Function.prototype.__eq__=function(other){
if(typeof other !=='function'){return False}
return other+''===this+''
}
Function.prototype.__class__=Function
Function.prototype.get_name=function(){
var src=this.toString()
pattern=new RegExp("function (.*?)\\(")
var res=pattern.exec(src)
value='<function '+res[1]+'>'
}
Array.prototype.match=function(other){
var $i=0
while($i<this.length && $i<other.length){
if(this[$i]!==other[$i]){return false}
$i++
}
return true
}
if(!Array.indexOf){
Array.prototype.indexOf=function(obj){
for(var i=0;i<this.length;i++){
if(this[i]==obj){
return i
}
}
return -1
}
}
try{console}
catch(err){
console={'log':function(data){void(0)}}
}
function $List2Dict(){
var res={}
var i=0
if(arguments.length==1 && arguments[0].constructor==Array){
for(i=0;i<arguments[0].length;i++){
res[arguments[0][i]]=0
}
}else{
for(i=0;i<arguments.length;i++){
res[arguments[i]]=0
}
}
return res
}
function $last(item){
if(typeof item=="string"){return item.charAt(item.length-1)}
else if(typeof item=="object"){return item[item.length-1]}
}
function $XmlHttpClass(obj){
this.__class__='XMLHttpRequest'
this.__getattr__=function(attr){
if('get_'+attr in this){return this['get_'+attr]()}
else{return obj[attr]}
}
this.get_text=function(){return obj.responseText}
this.get_xml=function(){return $DomObject(obj.responseXML)}
}
function Ajax(){}
Ajax.__class__=$type
Ajax.__str__=function(){return "<class 'Ajax'>"}
function $AjaxClass(){
if(window.XMLHttpRequest){
var $xmlhttp=new XMLHttpRequest()
}else{
var $xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
}
$xmlhttp.$ajax=this
$xmlhttp.$requestTimer=null
$xmlhttp.onreadystatechange=function(){
var state=this.readyState
var req=this.$ajax
var timer=this.$requestTimer
var obj=new $XmlHttpClass($xmlhttp)
if(state===0 && 'on_uninitialized' in req){req.on_uninitialized(obj)}
else if(state===1 && 'on_loading' in req){req.on_loading(obj)}
else if(state===2 && 'on_loaded' in req){req.on_loaded(obj)}
else if(state===3 && 'on_interactive' in req){req.on_interactive(obj)}
else if(state===4 && 'on_complete' in req){
if(timer !==null){window.clearTimeout(timer)}
req.on_complete(obj)
}
}
this.__class__=Ajax
this.__getattr__=function(attr){return $getattr(this,attr)}
this.__setattr__=function(attr,value){setattr(this,attr,value)}
this.__str__=function(){return "<object 'Ajax'>"}
this.open=function(method,url,async){
$xmlhttp.open(method,url,async)
}
this.set_header=function(key,value){
$xmlhttp.setRequestHeader(key,value)
}
this.send=function(params){
if(!params || params.$keys.length==0){$xmlhttp.send();return}
if(!isinstance(params,dict)){$raise('TypeError',
"send() argument must be dictonary, not '"+str(params.__class__)+"'")}
var res=''
for(i=0;i<params.$keys.length;i++){
res +=str(params.$keys[i])+'='+str(params.$values[i])+'&'
}
res=res.substr(0,res.length-1)
$xmlhttp.send(res)
}
this.set_timeout=function(seconds,func){
$xmlhttp.$requestTimer=setTimeout(
function(){$xmlhttp.abort();func()},
seconds*1000)
}
}
function ajax(){
return new $AjaxClass()
}
function $getMouseOffset(target, ev){
ev=ev || window.event
var docPos=$getPosition(target)
var mousePos=$mouseCoords(ev)
return{x:mousePos.x - docPos.x, y:mousePos.y - docPos.y}
}
function $getPosition(e){
var left=0
var top=0
var width=e.offsetWidth
var height=e.offsetHeight
while(e.offsetParent){
left +=e.offsetLeft
top +=e.offsetTop
e=e.offsetParent
}
left +=e.offsetLeft
top +=e.offsetTop
return{left:left, top:top, width:width, height:height}
}
function $mouseCoords(ev){
var posx=0
var posy=0
if(!ev)var ev=window.event
if(ev.pageX || ev.pageY){
posx=ev.pageX
posy=ev.pageY
}else if(ev.clientX || ev.clientY){
posx=ev.clientX + document.body.scrollLeft
+ document.documentElement.scrollLeft
posy=ev.clientY + document.body.scrollTop
+ document.documentElement.scrollTop
}
var res=object()
res.x=int(posx)
res.y=int(posy)
res.__getattr__=function(attr){return this[attr]}
res.__class__="MouseCoords"
return res
}
var $DOMNodeAttrs=['nodeName','nodeValue','nodeType','parentNode',
'childNodes','firstChild','lastChild','previousSibling','nextSibling',
'attributes','ownerDocument']
function $isNode(obj){
for(var i=0;i<$DOMNodeAttrs.length;i++){
if(obj[$DOMNodeAttrs[i]]===undefined){return false}
}
return true
}
var $DOMEventAttrs_W3C=['NONE','CAPTURING_PHASE','AT_TARGET','BUBBLING_PHASE',
'type','target','currentTarget','eventPhase','bubbles','cancelable','timeStamp',
'stopPropagation','preventDefault','initEvent']
var $DOMEventAttrs_IE=['altKey','altLeft','button','cancelBubble',
'clientX','clientY','contentOverflow','ctrlKey','ctrlLeft','data',
'dataFld','dataTransfer','fromElement','keyCode','nextPage',
'offsetX','offsetY','origin','propertyName','reason','recordset',
'repeat','screenX','screenY','shiftKey','shiftLeft',
'source','srcElement','srcFilter','srcUrn','toElement','type',
'url','wheelDelta','x','y']
function $isEvent(obj){
flag=true
for(var i=0;i<$DOMEventAttrs_W3C.length;i++){
if(obj[$DOMEventAttrs_W3C[i]]===undefined){flag=false;break}
}
if(flag){return true}
for(var i=0;i<$DOMEventAttrs_IE.length;i++){
if(obj[$DOMEventAttrs_IE[i]]===undefined){return false}
}
return true
}
function DOMObject(){}
DOMObject.__class__=$type
DOMObject.toString=function(){return "<class 'DOMObject'>"}
$DOMtoString=function(){
var res="<DOMObject object type '"
return res+$NodeTypes[this.nodeType]+"' name '"+this.nodeName+"'>"
}
$NodeTypes={1:"ELEMENT",
2:"ATTRIBUTE",
3:"TEXT",
4:"CDATA_SECTION",
5:"ENTITY_REFERENCE",
6:"ENTITY",
7:"PROCESSING_INSTRUCTION",
8:"COMMENT",
9:"DOCUMENT",
10:"DOCUMENT_TYPE",
11:"DOCUMENT_FRAGMENT",
12:"NOTATION"
}
function DOMEvent(){}
DOMEvent.__class__=$type
DOMEvent.toString=function(){return "<class 'DOMEvent'>"}
function $DOMEvent(ev){
ev.__class__=DOMEvent
ev.__getattr__=function(attr){
if(attr=="x"){return $mouseCoords(ev).x}
if(attr=="y"){return $mouseCoords(ev).y}
if(attr=="data"){return new $Clipboard(ev.dataTransfer)}
return $getattr(ev,attr)
}
if(ev.preventDefault===undefined){ev.preventDefault=function(){ev.returnValue=false}}
if(ev.stopPropagation===undefined){ev.stopPropagation=function(){ev.cancelBubble=true}}
ev.__str__=function(){return '<DOMEvent object>'}
ev.toString=ev.__str__
return ev
}
function $Clipboard(data){
this.data=data
this.__class__="Clipboard"
}
$Clipboard.prototype.__getitem__=function(name){
return this.data.getData(name)
}
$Clipboard.prototype.__setitem__=function(name,value){
this.data.setData(name,value)
}
$Clipboard.prototype.__setattr__=function(attr,value){
eval("this.data."+attr+"=value")
}
function $OptionsClass(parent){
this.parent=parent
this.__getattr__=function(attr){
if('get_'+attr in this){return eval('this.get_'+attr)}
if(attr in this.parent.elt.options){
var obj=eval('this.parent.options.'+attr)
if((typeof obj)=='function'){
$raise('AttributeError',"'options' object has no attribute '"+attr+'"')
}
return $JS2Py(obj)
}
}
this.__class__='options'
this.__getitem__=function(key){
return $DOMNode(parent.options[key])
}
this.__delitem__=function(arg){
parent.options.remove(arg)
}
this.__len__=function(){return parent.options.length}
this.__setattr__=function(attr,value){
parent.options[attr]=value
}
this.__setitem__=function(attr,value){
parent.options[attr]=$JS2Py(value)
}
this.get_append=function(element){
parent.options.add(element)
}
this.get_insert=function(index,element){
if(index===undefined){parent.options.add(element)}
else{parent.options.add(element,index)}
}
this.get_item=function(index){
return parent.options.item(index)
}
this.get_namedItem=function(name){
return parent.options.namedItem(name)
}
this.get_remove=function(arg){parent.options.remove(arg)}
}
function $Location(){
var obj=new object()
for(var x in window.location){obj[x]=window.location[x]}
obj.__class__=new $class(this,'Location')
obj.toString=function(){return window.location.toString()}
return obj
}
function JSObject(obj){
return new $JSObject(obj)
}
JSObject.__class__=$type
JSObject.__str__=function(){return "<class 'JSObject'>"}
JSObject.toString=JSObject.__str__
function $JSObject(js){
this.js=js
this.__class__=JSObject
this.__str__=function(){return "<object 'JSObject'>"}
this.toString=this.__str__
}
$JSObject.prototype.__getattr__=function(attr){
var obj=this
if(obj.js[attr]!==undefined){
var obj=this.js,obj_attr=this.js[attr]
if(typeof this.js[attr]=='function'){
return function(){
var args=[]
for(var i=0;i<arguments.length;i++){args.push(arguments[i])}
var res=obj_attr.apply(obj,args)
if(typeof res=='object'){return new $JSObject(res)}
else if(res===undefined){return None}
else{return $JS2Py(res)}
}
}else{
return $JS2Py(this.js[attr])
}
}else{
$raise("AttributeError","no attribute "+attr)
}
}
$JSObject.prototype.__setattr__=function(attr,value){
if(isinstance(value,JSObject)){
this.js[attr]=value.js
}else{
this.js[attr]=value
}
}
win=new $JSObject(window)
$events=$List2Dict('onabort','onactivate','onafterprint','onafterupdate',
'onbeforeactivate','onbeforecopy','onbeforecut','onbeforedeactivate',
'onbeforeeditfocus','onbeforepaste','onbeforeprint','onbeforeunload',
'onbeforeupdate','onblur','onbounce','oncellchange','onchange','onclick',
'oncontextmenu','oncontrolselect','oncopy','oncut','ondataavailable',
'ondatasetchanged','ondatasetcomplete','ondblclick','ondeactivate','ondrag',
'ondragend','ondragenter','ondragleave','ondragover','ondragstart','ondrop',
'onerror','onerrorupdate','onfilterchange','onfinish','onfocus','onfocusin',
'onfocusout','onhashchange','onhelp','oninput','onkeydown','onkeypress',
'onkeyup','onload','onlosecapture','onmessage','onmousedown','onmouseenter',
'onmouseleave','onmousemove','onmouseout','onmouseover','onmouseup',
'onmousewheel','onmove','onmoveend','onmovestart','onoffline','ononline',
'onpaste','onpropertychange','onreadystatechange','onreset','onresize',
'onresizeend','onresizestart','onrowenter','onrowexit','onrowsdelete',
'onrowsinserted','onscroll','onsearch','onselect','onselectionchange',
'onselectstart','onstart','onstop','onsubmit','onunload',
'ontouchstart','ontouchmove','ontouchend'
)
function DOMNode(){}
function $DOMNode(elt){
if(!('$brython_id' in elt)){
elt.$brython_id=Math.random().toString(36).substr(2, 8)
for(var attr in DOMNode.prototype){elt[attr]=DOMNode.prototype[attr]}
elt.__str__=$DOMtoString
elt.toString=elt.__str__
}
return elt
}
DOMNode.prototype.__add__=function(other){
var res=$TagSum()
res.children=[this]
if(isinstance(other,$TagSum)){
for(var $i=0;$i<other.children.length;$i++){res.children.push(other.children[$i])}
}else if(isinstance(other,[str,int,float,list,dict,set,tuple])){
res.children.push(document.createTextNode(str(other)))
}else{res.children.push(other)}
return res
}
DOMNode.prototype.__class__=DOMObject
DOMNode.prototype.__delitem__=function(key){
if(this.nodeType===9){
var res=document.getElementById(key)
if(res){res.parentNode.removeChild(res)}
else{$raise("KeyError",key)}
}else{
this.removeChild(this.childNodes[key])
}
}
DOMNode.prototype.__eq__=function(other){
if('isEqualNode' in this){return this.isEqualNode(other)}
else if('$brython_id' in this){return this.$brython_id===other.$brython_id}
else{$raise('NotImplementedError','__eq__ is not implemented')}
}
DOMNode.prototype.__getattr__=function(attr){
if('get_'+attr in this){return this['get_'+attr]()}
return $getattr(this,attr)
}
DOMNode.prototype.__getitem__=function(key){
if(this.nodeType===9){
if(typeof key==="string"){
var res=document.getElementById(key)
if(res){return $DOMNode(res)}
else{$raise("KeyError",key)}
}else{
try{
var elts=document.getElementsByTagName(key.name),res=[]
for(var $i=0;$i<elts.length;$i++){res.push($DOMNode(elts[$i]))}
return res
}catch(err){
$raise("KeyError",str(key))
}
}
}else{
return $DOMNode(this.childNodes[key])
}
}
DOMNode.prototype.__in__=function(other){return other.__contains__(this)}
DOMNode.prototype.__item__=function(key){
return $DOMNode(this.childNodes[key])
}
DOMNode.prototype.__le__=function(other){
var obj=this
if(this.nodeType===9){obj=this.body}
if(isinstance(other,$TagSum)){
var $i=0
for($i=0;$i<other.children.length;$i++){
obj.appendChild(other.children[$i])
}
}else if(typeof other==="string" || typeof other==="number"){
var $txt=document.createTextNode(other.toString())
obj.appendChild($txt)
}else{
obj.appendChild(other)
}
}
DOMNode.prototype.__len__=function(){return this.childNodes.length}
DOMNode.prototype.__mul__=function(other){
if(isinstance(other,int)&& other.valueOf()>0){
var res=$TagSum()
for(var i=0;i<other.valueOf();i++){
var clone=this.get_clone()()
res.children.push(clone)
}
return res
}else{
$raise('ValueError',"can't multiply "+this.__class__+"by "+other)
}
}
DOMNode.prototype.__ne__=function(other){return !this.__eq__(other)}
DOMNode.prototype.__radd__=function(other){
var res=$TagSum()
var txt=document.createTextNode(other)
res.children=[txt,this]
return res
}
DOMNode.prototype.__setattr__=function(attr,value){
if(attr.substr(0,2)=='on'){
if(window.addEventListener){
var callback=function(ev){return value($DOMEvent(ev))}
this.addEventListener(attr.substr(2),callback)
}else if(window.attachEvent){
var callback=function(ev){return value($DOMEvent(window.event))}
this.attachEvent(attr,callback)
}
}else if('set_'+attr in this){return this['set_'+attr](value)}
else if(attr in this){this[attr]=value}
else{setattr(this,attr,value)}
}
DOMNode.prototype.__setitem__=function(key,value){
this.childNodes[key]=value
}
DOMNode.prototype.get_clone=function(){
res=$DOMNode(this.cloneNode(true))
for(var evt in $events){
if(this[evt]){res[evt]=this[evt]}
}
var func=function(){return res}
return func
}
DOMNode.prototype.get_remove=function(){
var obj=this
return function(child){obj.removeChild(child)}
}
DOMNode.prototype.get_getContext=function(){
if(!('getContext' in this)){$raise('AttributeError',
"object has no attribute 'getContext'")}
var obj=this
return function(ctx){return new $JSObject(obj.getContext(ctx))}
}
DOMNode.prototype.get_parent=function(){
if(this.parentElement){return $DOMNode(this.parentElement)}
else{return None}
}
DOMNode.prototype.get_options=function(){
return new $OptionsClass(this)
}
DOMNode.prototype.get_left=function(){
return int($getPosition(this)["left"])
}
DOMNode.prototype.get_top=function(){
return int($getPosition(this)["top"])
}
DOMNode.prototype.get_children=function(){
var res=[]
for(var i=0;i<this.childNodes.length;i++){
res.push($DOMNode(this.childNodes[i]))
}
return res
}
DOMNode.prototype.get_reset=function(){
var $obj=this
return function(){$obj.reset()}
}
DOMNode.prototype.get_style=function(){
return new $JSObject(this.style)
}
DOMNode.prototype.set_style=function(style){
for(var i=0;i<style.$keys.length;i++){
this.style[style.$keys[i]]=style.$values[i]
}
}
DOMNode.prototype.get_submit=function(){
var $obj=this
return function(){$obj.submit()}
}
DOMNode.prototype.get_text=function(){
return this.innerText || this.textContent
}
DOMNode.prototype.get_html=function(){return this.innerHTML}
DOMNode.prototype.get_value=function(value){return this.value}
DOMNode.prototype.set_html=function(value){this.innerHTML=str(value)}
DOMNode.prototype.set_text=function(value){
this.innerText=str(value)
this.textContent=str(value)
}
DOMNode.prototype.set_value=function(value){this.value=value.toString()}
doc=$DOMNode(document)
function $Tag(tagName,args){
var $i=null
var elt=null
var elt=$DOMNode(document.createElement(tagName))
elt.parent=this
if(args!=undefined && args.length>0){
$start=0
$first=args[0]
if(!isinstance($first,$Kw)){
$start=1
if(isinstance($first,[str,int,float])){
txt=document.createTextNode($first.toString())
elt.appendChild(txt)
}else if(isinstance($first,$TagSum)){
for($i=0;$i<$first.children.length;$i++){
elt.appendChild($first.children[$i])
}
}else{
try{elt.appendChild($first)}
catch(err){$raise('ValueError','wrong element '+$first)}
}
}
for($i=$start;$i<args.length;$i++){
$arg=args[$i]
if(isinstance($arg,$Kw)){
if($arg.name.toLowerCase().substr(0,2)==="on"){
eval('elt.'+$arg.name.toLowerCase()+'=function(){'+$arg.value+'}')
}else if($arg.name.toLowerCase()=="style"){
elt.set_style($arg.value)
}else{
if($arg.value!==false){
try{
elt.setAttribute($arg.name.toLowerCase(),$arg.value)
}catch(err){
$raise('ValueError',"can't set attribute "+$arg.name)
}
}
}
}
}
}
return elt
}
function $TagSumClass(){
this.__class__=$TagSum
this.children=[]
}
$TagSumClass.prototype.appendChild=function(child){
this.children.push(child)
}
$TagSumClass.prototype.__add__=function(other){
if(isinstance(other,$TagSum)){
this.children=this.children.concat(other.children)
}else if(isinstance(other,str)){
this.children=this.children.concat(document.createTextNode(other))
}else{this.children.push(other)}
return this
}
$TagSumClass.prototype.__radd__=function(other){
var res=$TagSum()
res.children=this.children.concat(document.createTextNode(other))
return res
}
$TagSumClass.prototype.clone=function(){
var res=$TagSum(), $i=0
for($i=0;$i<this.children.length;$i++){
res.children.push(this.children[$i].cloneNode(true))
}
return res
}
function $TagSum(){
return new $TagSumClass()
}
function A(){return $Tag('A',arguments)}
var $src=A+''
$tags=['A', 'ABBR', 'ACRONYM', 'ADDRESS', 'APPLET',
'B', 'BDO', 'BIG', 'BLOCKQUOTE', 'BUTTON',
'CAPTION', 'CENTER', 'CITE', 'CODE',
'DEL', 'DFN', 'DIR', 'DIV', 'DL',
'EM', 'FIELDSET', 'FONT', 'FORM', 'FRAMESET',
'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
'I', 'IFRAME', 'INS', 'KBD', 'LABEL', 'LEGEND',
'MAP', 'MENU', 'NOFRAMES', 'NOSCRIPT', 'OBJECT',
'OL', 'OPTGROUP', 'PRE', 'Q', 'S', 'SAMP',
'SCRIPT', 'SELECT', 'SMALL', 'SPAN', 'STRIKE',
'STRONG', 'STYLE', 'SUB', 'SUP', 'TABLE',
'TEXTAREA', 'TITLE', 'TT', 'U', 'UL',
'VAR', 'BODY', 'COLGROUP', 'DD', 'DT', 'HEAD',
'HTML', 'LI', 'P', 'TBODY','OPTION',
'TD', 'TFOOT', 'TH', 'THEAD', 'TR',
'AREA', 'BASE', 'BASEFONT', 'BR', 'COL', 'FRAME',
'HR', 'IMG', 'INPUT', 'ISINDEX', 'LINK',
'META', 'PARAM']
$tags=$tags.concat(['ARTICLE','ASIDE','FIGURE','FOOTER','HEADER','NAV',
'SECTION','AUDIO','VIDEO','CANVAS','COMMAND','DATALIST',
'DETAILS','OUTPUT','PROGRESS','HGROUP','MARK','METER','TIME',
'RP','RT','RUBY'])
for($i=0;$i<$tags.length;$i++){
$code=$src.replace(/A/gm,$tags[$i])
eval($code)
eval($tags[$i]+'.name="'+$tags[$i]+'"')
}
SVG={
__getattr__:function(attr){return this[attr]}
}
$svgNS="http://www.w3.org/2000/svg"
$xlinkNS="http://www.w3.org/1999/xlink"
function $SVGTag(tag_name,args){
var $i=null
var $obj=this
elt=$DOMNode(document.createElementNS($svgNS,tag_name))
if(args!=undefined && args.length>0){
$start=0
$first=args[0]
if(!isinstance($first,$Kw)){
$start=1
if(isinstance($first,[str,int,float])){
txt=document.createTextNode(str($first))
elt.appendChild(txt)
}else if(isinstance($first,$AbstractTag)){
for($i=0;$i<$first.children.length;$i++){
elt.appendChild($first.children[$i])
}
}else{
try{elt.appendChild($first)}
catch(err){$raise('ValueError','wrong element '+$first)}
}
}
for($i=$start;$i<args.length;$i++){
$arg=args[$i]
if(isinstance($arg,$Kw)){
if($arg.name.toLowerCase()in $events){
eval('elt.'+$arg.name.toLowerCase()+'=function(){'+$arg.value+'}')
}else if($arg.name.toLowerCase()=="style"){
elt.set_style($arg.value)
}else if($arg.name.toLowerCase().indexOf("href")!==-1){
elt.setAttributeNS("http://www.w3.org/1999/xlink","href",$arg.value)
}else{
if($arg.value!==false){
elt.setAttributeNS(null,$arg.name.replace('_','-'),$arg.value)
}
}
}
}
}
return elt
}
var $svg_tags=['a',
'altGlyph',
'altGlyphDef',
'altGlyphItem',
'animate',
'animateColor',
'animateMotion',
'animateTransform',
'circle',
'clipPath',
'color_profile',
'cursor',
'defs',
'desc',
'ellipse',
'feBlend',
'g',
'image',
'line',
'linearGradient',
'marker',
'mask',
'path',
'pattern',
'polygon',
'polyline',
'radialGradient',
'rect',
'stop',
'svg',
'text',
'tref',
'tspan',
'use']
$svg=function(){return $SVGTag('X',arguments)}
$svg +=''
for(var i=0;i<$svg_tags.length;i++){
var tag=$svg_tags[i]
eval('SVG.'+tag+'='+$svg.replace('X',tag))
}
function $LocalStorageClass(){
this.__class__='localStorage'
this.supported=typeof(Storage)!=="undefined"
this.__delitem__=function(key){
if(this.supported){localStorage.removeItem(key)}
else{$raise('NameError',"local storage is not supported by this browser")}
}
this.__getitem__=function(key){
if(this.supported){
res=localStorage[key]
if(res===undefined){return None}
else{return res}
}
else{$raise('NameError',"local storage is not supported by this browser")}
}
this.__setitem__=function(key,value){
if(this.supported){localStorage[key]=value}
else{$raise('NameError',"local storage is not supported by this browser")}
}
}
local_storage=new $LocalStorageClass()
