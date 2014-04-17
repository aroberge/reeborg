var $module = (function($B){

var __builtins__ = $B.builtins
var $TagSumDict = $B.$TagSum.$dict

for(var $py_builtin in __builtins__){eval("var "+$py_builtin+"=__builtins__[$py_builtin]")}

var $svgNS = "http://www.w3.org/2000/svg"
var $xlinkNS = "http://www.w3.org/1999/xlink"

function $SVGTag(tag_name,args){
    // represents an SVG tag
    var $i = null
    var $obj = this
    var obj = $B.$DOMNode(document.createElementNS($svgNS,tag_name))
    if(args!=undefined && args.length>0){
        var $start=0,$first=args[0]
        // if first argument is not a keyword, it's the tag content
        if($first.__class__!==$B.$KwDict){
            $start = 1
            if(isinstance($first,[str,int,float])){
                obj.elt.appendChild(document.createTextNode(str($first)))
            } else if($first.__class__===$TagSumDict){
                for($i=0;$i<$first.children.length;$i++){
                    obj.elt.appendChild($first.children[$i])
                }
            } else {
                try{obj.elt.appendChild($first.elt)}
                catch(err){$raise('ValueError','wrong element '+$first)}
            }
        }
        // attributes
        for($i=$start;$i<args.length;$i++){
            // keyword arguments
            var $arg = args[$i]
            if($arg && $arg.__class__===$B.$KwDict){
                if($arg.name.toLowerCase().substr(0,2)=="on"){ // events
                    eval('$B.DOMNode.bind(obj,"'+$arg.name.toLowerCase().substr(2)+'",function(){'+$arg.value+'})')
                }else if($arg.name.toLowerCase()=="style"){
                    $B.DOMNode.set_style(obj,$arg.value)
                }else if($arg.name.toLowerCase().indexOf("href") !== -1){ // xlink:href
                    obj.elt.setAttributeNS( "http://www.w3.org/1999/xlink","href",$arg.value)
                } else {
                    if($arg.value!==false){
                        // option.selected=false sets it to true :-)
                        obj.elt.setAttributeNS(null,$arg.name.replace('_','-'),$arg.value)
                    }
                }
            }
        }
    }
    return obj
}

// SVG
var $svg_tags = ['a',
'altGlyph',
'altGlyphDef',
'altGlyphItem',
'animate',
'animateColor',
'animateMotion',
'animateTransform',
'circle',
'clipPath',
'color_profile', // instead of color-profile
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
'set',
'stop',
'svg',
'text',
'tref',
'tspan',
'use']

var $svg = function(){return $SVGTag('X',arguments)}
$svg += '' // source code

var obj = new Object()
for(var i=0;i<$svg_tags.length;i++){
    var tag = $svg_tags[i]
    eval('obj.'+tag+'='+$svg.replace('X',tag))
}
obj.__getattr__ = function(attr){return this[attr]}
return obj
})(__BRYTHON__)
