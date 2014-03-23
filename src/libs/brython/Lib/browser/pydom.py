from browser import doc

tags=['A','ABBR','ACRONYM','ADDRESS','APPLET','B','BDO','BIG','BLOCKQUOTE',
      'BUTTON','CAPTION','CENTER','CITE','CODE','DEL','DFN','DIR','DIV','DL',
      'EM','FIELDSET','FONT','FORM','FRAMESET','H1','H2','H3','H4','H5','H6',
      'I','IFRAME','INS','KBD','LABEL','LEGEND','MAP','MENU','NOFRAMES', 
      'NOSCRIPT','OBJECT','OL','OPTGROUP','PRE','Q','S','SAMP','SCRIPT', 
      'SELECT','SMALL','SPAN','STRIKE','STRONG','STYLE','SUB','SUP','TABLE',
      'TEXTAREA','TITLE','TT','U','UL','VAR','BODY','COLGROUP','DD','DT',
      'HEAD','HTML','LI','P','TBODY','OPTION','TD','TFOOT','TH','THEAD','TR',
      'AREA','BASE','BASEFONT','BR','COL','FRAME','HR','IMG','INPUT',
      'ISINDEX','LINK','META','PARAM',  #HTML 5 elements...
      'ARTICLE','ASIDE','AUDIO','BDI','CANVAS','COMMAND','DATALIST',
      'DETAILS','DIALOG','EMBED','FIGCAPTION','FIGURE','FOOTER','HEADER',
      'KEYGEN','MARK','METER','NAV','OUTPUT','PROGRESS','RP','RT',
      'RUBY','SECTION','SOURCE','SUMMARY','TIME','TRACK','VIDEO','WBR']

class Node:
  def __init__(self, content):

      #print(content)
      #convert content to a DOMNode
      if isinstance(content, str):
         self._node=self._toDOM(content)
      elif isinstance(content, Node):
         self._node=content._node      
      elif isinstance(content, __BRYTHON__.DOMNode):
         self._node=content
      else:
         print("content isn't str, or Node")
         print(content)
         print(dir(content))
         self._node=content

  def __repr__(self):
      return '%s' % self._node

  def __str__(self):
      return '%s' % self._node

  def _toDOM(self, s):
      "takes an HTML string and returns a DOM representation"

      if isinstance(s,Node):
         return s

      #assert isinstance(s, str), "pydom.py:_toDOM s should be a string"

      #print("in _toDOM")
      #print(s)
      _dom=doc.createElement('div')
      _dom.innerHTML=s
      #return JSObject({'elt':_dom.elt.firstChild})
      return _dom.elt.firstChild

  def addClass(self, classname):
      assert isinstance(classname, str), "pydom.py:addClass:classname should be a string"

      _class = getattr(self._node, 'class')

      if _class is None:
         setattr(self._node, 'class', classname)
      else:
         setattr(self._node, 'class', '%s %s' % (_class, classname))


  def after(self, node):
      assert isinstance(node, Node), "pydom.py:after node isn't of type Node"

      #print("after")
      if self.nextSibling is not None:
         #print('next sibling exists')
         self.parent.insertBefore(node._node, self.nextSibling)
      else:
         #print('next sibling doest exist')
         _parent=Node(self.parent)
         _parent.append(node._node)

      #print("leaving after")

  def append(self, node):
      #print("in append")
      if isinstance(node, str):
         _n=Node(node)
         self._node.appendChild(_n._node)
      elif isinstance(node, Node):
         self._node.appendChild(node._node)
           
  def before(self, node):
      if isinstance(node, str):
         _n=Node(node)
         self.parent.insertBefore(_n._node, self._node)
         return

      assert isinstance(node, Node), "pydom.py:before node isn't of type Node"

      self.parent.insertBefore(node._node, self._node)


  def bind(self, event, handler):
      assert isinstance(event, str), "pydom.py:bind, event should be a string"
      self._node.bind(event, handler)

  def closest(self, selector):
      def traverse(node, ancestors):
          if node == doc: return None
          for _a in ancestors._nodes:
              if node == _a:
                 return _a

          return traverse(Node(self.parent), ancestors)
      
      if isinstance(selector, str):
         _elements=Selector(selector).get()
         return traverse(self, _elements)

      return traverse(self, selector)

  def css(self, property, value):
      self.set_style(property, value)

  def empty(self):
      for _child in self._node.children():
          self._node.removeChild(_child)

  def hasClass(self, className):
      _class = getattr(self._node, 'class')

      if _class is None:
         return False

      return className in _class

  def insertBefore(self, node, child):
      #print("in insertBefore")
      assert isinstance(node, Node)
      assert isinstance(child, Node)

      self._node.insertBefore(node._node, child._node)
      #print("leaving insertBefore")

  @property
  def nextSibling(self):
      #print("nextSibling")
      return self._node.nextSibling 

  @property
  def parent(self):
      return self._node.parent

  def prepend(self, content):
      if isinstance(content, str):
         _n=Node(content)

         self.insertBefore(_n._node, self._node.firstChild)
         return

      assert isinstance(content, Node)

      self.insertBefore(content._node, self._node.firstChild)

  def removeAttr(self, name):
      setattr(self._node, name, None)

  def removeClass(self, className):
      _class = getattr(self._node, 'class')

      if _class is None:
         return

      _list=' '.split(_class)
      if _className in _list:
         _list.remove(className)
         if len(_list) == 0:
            setattr(self._node, 'class', None) 
         else:
            setattr(self._node, 'class', ' '.join(_list)) 

  def set_style(self, property, value):
      assert isinstance(property, str)
      assert isinstance(value, str)

      self._node.set_style({property: value})

  def set_text(self, text):
      assert isinstance(text, str)

      self._node.set_text(text)

  @property
  def DOM(self):
      return self._node

class Selector:

  def __init__(self, selector, start_node=doc):
      self._doc=start_node

      if (isinstance(selector, str)):
         if selector.startswith("."):   #class selector
            self._selector=selector[1:]
            self._selector_type="classname"
         elif selector.startswith("#"):  #id selector
            self._selector=selector[1:]
            self._selector_type="id"
         elif selector.upper() in tags:
            self._selector=selector.upper()
            self._selector_type="tag"
         else:  
            self._selector=selector
            self._selector_type="selector"
      else:  #this is a function
         self._selector_type="selector"
         self._function=selector
         self.get=self._function_get

  def _function_get(self):
      def recurse(node):
          _list=[]
          if self._function(node):
             _list.append(node)

          for _node in node.childNodes:
              _list+=recurse(_node)

          return _list

      return NodeCollection([Node(_n) for _n in recurse(self._doc)])

  def get(self):
      if self._selector_type=="id":
         _matched_nodes=self._doc.get(id=self._selector)
      elif self._selector_type=="classname":
         _matched_nodes=self._doc.get(classname=self._selector)
      elif self._selector_type == "tag":
         _matched_nodes=self._doc.get(tag=self._selector)
      elif self._selector_type=="selector":
         _matched_nodes=self._doc.get(selector=self._selector)
      else:
         _matched_nodes=[]

      return NodeCollection([Node(_n) for _n in _matched_nodes])

class NodeCollectionSelector(Selector):
  def __init__(self, selector, collection):
      Selector.__init__(self, selector)
      self._collection=collection

      if self._selector_type == 'id':
         self._match=self._match_id
      elif self._selector_type =='tag':
         self._match=self._match_tag
      elif self._selector_type == 'classname':
         self._match=self._match_classname

  def _match_id(self, node):
      if node.id is None: return False
      return node.id == self._selector

  def _match_tag(self, node):
      return node.tagName == self._selector

  def _match_classname(self, node):
      return self._selector in node.classname

  def get(self):
      return NodeCollection([_n for _n in self._collection if self._match(_n)])

class NodeCollection:
  def __init__(self, nodes=[]):
      if isinstance(nodes, NodeCollection):
         self._nodes=nodes._nodes
      else:
         self._nodes=nodes

  def __len__(self):
      return len(self._nodes)

  def __item__(self, i):
      return self._nodes[i]

  def __getitem__(self, i):
      return self._nodes[i]

  def __add__(self, nodes):
      self._nodes+=nodes

  def __str__(self):
      _str=[]
      for _node in self._nodes:
          _str.append(_node.__str__())

      return '<br>'.join(_str)

  def append_node(self, node):
      self._nodes.append(node)

  def next(self):
      for _node in self._nodes:
          yield _node

  def add(self, selector, context=None):
      "Add elements to the set of matched elements."

      _ns=Selector(selector)
      _nc=_ns.get()
      return NodeCollection(self._nodes + [_n for _n in _nc._nodes])

  def addBack(self):
      """Add the previous set of elements on the stack to the current 
         set, optionally filtered by a selector.
      """

      raise NotImplementedError("pydom:addBack:Not implemented Yet")

  def addClass(self, classname):
      "Adds the specified class(es) to each of the set of matched elements."

      for _node in self._nodes:
          if hasattr(_node, 'addClass'):
             _node.addClass(classname)
          elif hasattr(_node, 'set_class'):
             _c=getattr(_node, 'class')
             if _c is not None:
                _node.set_class('%s %s' % (_c, classname))
             else:
                _node.set_class(classname)
          else:
             print(dir(_node))


  def after(self, content):
      """Insert content, specified by the parameter, after each element 
         in the set of matched elements.
      """

      if isinstance(content, NodeCollection):
         for _cnode in content._nodes:
             for _node in self._nodes:
                 _node.after(Node(_cnode))

         return
      
      for _node in self._nodes:
          _node.after(Node(content))

  def append(self, content):
      """Insert content, specified by the parameter, to the end of each 
         element in the set of matched elements.
      """

      if isinstance(content, NodeCollection):
         #is this correct?  A DOM element cannot exist in 2 places
         #without being a clone. (the docs says this cannot be a clone)
         for _node in self._nodes:
             for _cnode in content._nodes:
                 _node.append(Node(_cnode))

         return

      for _node in self._nodes:
          _node.append(Node(content))

  def appendTo(self, selector):
      """Insert every element in the set of matched elements to the end 
         of the target.
      """

      _s=Selector(selector)

      for _node in _s.get():
          _node.append(Node(self._node[0].clone()))

  def attr(self, property, value=None):
      """Get the value of an attribute for the first element in the set 
         of matched elements or set one or more attributes for every matched 
         element.
      """

      if value is None:
         return self._nodes[0][property]

      for _node in self._nodes:
          _node[property]=value

  def before(self, content):
      """Insert content, specified by the parameter, before each element 
         in the set of matched elements.
      """

      if isinstance(content, NodeCollection):
         for _node in self._nodes:
             for _cnode in content._nodes:
                 _node.before(Node(_cnode))
         return

      for _node in self._nodes:
          _node.before(Node(content))

  def bind(self, eventType, handler):
      "Attach a handler to an event for the elements."

      if ' ' in eventType:
         _events=' '.split(eventType)
         for _event in _events:
             for _node in self._nodes:
                 _node.bind(_event,handler)
         return

      for _node in self._nodes:
          _node.bind(eventType,handler)

  def _bind(self, name, handler=None):
      """ Helper function for basic events"""

      if handler is None:
         for _node in self._nodes:
             getattr(_node, name)()
         return

      self.bind(name, handler)

  def blur(self, handler=None):
      """Bind an event handler to the 'blur' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('blur', handler)

  def change(self, handler=None):
      """Bind an event handler to the 'change' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('change', handler)

      return self

  def children(self, selector=None):
      """Get the children of each element in the set of matched elements, 
         optionally filtered by a selector.
      """

      _c=NodeCollection()
      for _node in self._nodes:
          for _child in _node.get_children():
              _c.append(_child)

      if selector is None:
         return _c

      #selector is not None
      _ns=NodeCollectionSelector(selector, _c)
      return _ns.get()

  def click(self, handler=None):
      """Bind an event handler to the 'click' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('click', handler)

  def clone(self):
      """Create a deep copy of the set of matched elements."""

      return NodeCollection([_node.clone() for _node in self._nodes])

  def closest(self, selector):
      """For each element in the set, get the first element that matches the 
         selector by testing the element itself and traversing up through its 
         ancestors in the DOM tree.
      """

      if isinstance(selector, str):
         _ns=Selector(selector)
         selector=_ns.get()

      _c=NodeCollection()
      for _node in self._nodes:
          _c.append(_node.closest(selector))

      return _c

  def contents(self):
      """Get the children of each element in the set of matched elements, 
         including text and comment nodes.
      """

      raise NotImplementedError("pydom:contents not implemented yet")

  def css(self, property, value=None):
      """Get the value of a style property for the first element in the set 
         of matched elements or set one or more CSS properties for every 
         matched element.
      """

      if value is None and not isinstance(property, dict):
         return self._nodes[0].css(property)

      if isinstance(property, dict):
         for _node in self._nodes:
             _node.set_style(property)
      else:
         for _node in self._nodes:
             _node.set_style(property, value)

      return self

  def data(self):
      """Store arbitrary data associated with the matched elements or return 
         the value at the named data store for the first element in the set 
         of matched elements.
      """

      raise NotImplementedError("pydom:data not implemented yet")

  def dblclick(self, handler=None):
      """Bind an event handler to the 'dblclick' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('dblclick', handler)

  def delegate(self):
      """Attach a handler to one or more events for all elements that match 
         the selector, now or in the future, based on a specific set of root 
         elements.
      """

      raise NotImplementedError("pydom:delegate not implemented yet")


  def detach(self, selector=None):
      """Remove the set of matched elements from the DOM."""
      
      if selector is not None:
         _ns=NodeCollectionSelector(selector, [_n for _n in self._nodes])
         for _node in _ns.get():
             _node.detach()  #todo.. check that detach exists...
         return

      for _node in self._nodes:
          _node.detach()   #todo.. check that detach exists...


  def each(self, func):
      """Iterate over a jQuery object, executing a function for each matched 
         element.
      """

      for _node in self._nodes:
          func(_node)

  def empty(self):
      """Remove all child nodes of the set of matched elements from the DOM."""

      for _node in self._nodes:
          _node.empty()

  def end(self):
      """End the most recent filtering operation in the current chain and
         return the set of matched elements to its previous state.
      """

      raise NotImplementedError("pydom:end not implemented yet")


  def eq(self, index):
      """Reduce the set of matched elements to the one at the specified index.
      """

      if index < len(self._nodes):
         return NodeCollections(self._nodes[index])

      return NodeCollections()

  def error(self, handler=None):
      """Bind an event handler to the 'error' Javascript event."""

      self._bind('error', handler)

  def fadeIn(self, duration=400, complete=None):
      """Display the matched elements by fading them to opaque."""
      
      raise NotImplementedError("pydom:fadeIn not implemented yet")
      

  def fadeOut(self):
      """Hide the matched elements by fading them to transparent."""

      raise NotImplementedError("pydom:fadeOut not implemented yet")
      

  def fadeTo(self):
      """Adjust the opacity of the matched elements."""
      
      raise NotImplementedError("pydom:fadeTo not implemented yet")

  def fadeToggle(self):
      """Display or hide the matched elements by animating their opacity."""

      raise NotImplementedError("pydom:fadeToggle not implemented yet")

  def filter(self, selector):
      """Reduce the set of matched elements to those that match the selector 
         or pass the function's test.
      """

      _ns=NodeCollectionSelector(selector, self)
      return _ns.get()

  def find(self):
      """Get the descendants of each element in the current set of matched 
         elements, filtered by a selector, jQuery object, or element.
      """

      raise NotImplementedError("pydom:find not implemented yet")
      
  def finish(self):
      """Stop the currently-running animation, remove all queued animations,
         and complete all animations for the matched elements.
      """

      raise NotImplementedError("pydom:finished not implemented yet")

  def first(self):
      """Reduce the set of matched elements to the first in the set."""

      if len(self._nodes) == 0:
         return NodeCollection()

      return NodeCollection([self._nodes[0]])

  def focus(self, handler=None):
      """Bind an event handler to the 'focus' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('focus', handler)

  def focusin(self, handler=None):
      """Bind an event handler to the 'focusin' event."""

      self._bind('focusin', handler)

  def focusout(self, handler=None):
      """Bind an event handler to the 'focusout' Javascript event."""

      self._bind('focusout', handler)

  def get(self, index=None):
      """Retrieve the DOM elements matched by the jQuery object."""

      if index is None:
         return [_node for _node in self._nodes]

      return self._nodes[index]


  def has(self, selector):
      """Reduce the set of matched elements to those that have a descendant 
         that matches the selector or DOM element.
      """

      raise NotImplementedError("pydom:'has' not implemented yet")

  
  def hasClass(self, name):
      """Determine whether any of the matched elements are assigned the 
         given class.
      """

      for _node in self._nodes:
          if _node.hasClass(name):
             return True

      return False

  def height(self, value=None):
      """Get the current computed height for the first element in the set of 
         matched elements or set the height of every matched element.
      """

      if value is None:
         return self._nodes[0].css('height')

      for _node in self._nodes:
          _node.set_style({'height': value})

  def hide(self):
      """Hide the matched elements."""

      for _node in self._nodes:
          _node.set_style({'display': 'none'})

  def hover(self, handler=None):
      """Bind one or two handlers to the matched elements, to be executed 
         when the mouse pointer enters and leaves the elements.
      """
      
      self._bind('hover', handler)

  def html(self, content=None):
      """Get the HTML contents of the first element in the set of matched 
         elements or set the HTML contents of every matched element.
      """

      if content is None:
         return self._nodes[0].get_html()

      for _node in self._nodes:
          _node.set_html(content)

  def index(self):
      """Search for a given element from among the matched elements."""

      raise NotImplementedError("pydom:'index' not implemented yet")


  def innerHeight(self):
      """Get the current computed height for the first element in the set of 
         matched elements, including padding but not border.
      """

      raise NotImplementedError("pydom:innerHeight not implemented yet")


  def innerWidth(self):
      """Get the current computed width for the first element in the set of 
         matched elements, including padding but not border.
      """

      raise NotImplementedError("pydom:innerWidth not implemented yet")

  def insertAfter(self, target):
      "Insert every element in the set of matched elements after the target."

      raise NotImplementedError("pydom:insertAfter not implemented yet")


  def insertBefore(self, target):
      "Insert every element in the set of matched elements before the target."

      raise NotImplementedError("pydom:insertBefore not implemented yet")


  #def is(self, selector):
  #    pass

  def keydown(self, handler=None):
      """Bind an event handler to the 'keydown' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('keydown', handler)

  def keypress(self, handler=None):
      """Bind an event handler to the 'keydown' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('keypress', handler)
      

  def keyup(self, handler=None):
      """Bind an event handler to the 'keyup' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('keyup', handler)

  def last(self):
      """Reduce the set of matched elements to the final one in the set."""

      return NodeCollection([self._nodes[-1]])


  @property
  def length(self):
      """The number of elements in the jQuery object."""
      return len(self._nodes)

  def load(self, handler=None):
      """Bind an event handler to the 'load' JavaScript event."""

      self._bind('load', handler)

  def map(self, func):
      """Pass each element in the current matched set through a function, 
         producing a new jQuery object containing the return values.
      """

      return NodeCollection([func(_n) for _n in self._nodes])

  def mousedown(self, handler=None):
      """Bind an event handler to the 'mousedown' JavaScript event, or 
         trigger that event on an element.
      """

      self._bind('mousedown', handler)

  def mouseenter(self, handler=None):
      """Bind an event handler to be fired when the mouse enters an element,
         or trigger that handler on an element"""

      self._bind('mouseenter', handler)

  def mouseleave(self, handler=None):
      """Bind an event handler to be fired when the mouse leaves an element,
         or trigger that handler on an element"""

      self._bind('mouseleave', handler)

  def mousemove(self, handler=None):
      """Bind an event handler to the 'mousemove' Javascript event,
         or trigger that handler on an element"""

      self._bind('mousemove', handler)
      
  def mouseout(self, handler=None):
      """Bind an event handler to the 'mouseout' Javascript event,
         or trigger that handler on an element"""

      self._bind('mouseout', handler)

  def mouseover(self, handler=None):
      """Bind an event handler to the 'mouseover' Javascript event,
         or trigger that handler on an element"""

      self._bind('mouseover', handler)

  def mouseup(self, handler=None):
      """Bind an event handler to the 'mouseup' Javascript event,
         or trigger that handler on an element"""

      self._bind('mouseup', handler)
      return self

  def next(self, selector=None):
      """Get the immediately following sibling of each element in the set of 
         matched elements. If a selector is provided, it retrieves the next 
         sibling only if it matches that selector.
      """

      raise NotImplementedError("pydom:'next' not implemented yet")

  def nextAll(self, selector=None):
      """Get all following siblings of each element in the set of matched 
         elements, optionally filtered by a selector.
      """

      raise NotImplementedError("pydom:'nextAll' not implemented yet")

  def nextUtil(self):
      """Get all following siblings of each element up to but not including 
         the element matched by the selector, DOM node, or jQuery object 
         passed.
      """

      raise NotImplementedError("pydom:'nextUtil' not implemented yet")

  def _not(self, arg):
      """Remove elements from the set of matched elements."""

      if isinstance(arg, str):  # selector
         pass  #to do
      elif isinstance(arg, list):
         return NodeCollection([_n for _n in self._nodes if _n not in arg])
      elif hasattr(arg, '__call__'):  # this is a function
         return NodeCollection([_n for _n in self._nodes if arg(_n)])

      raise NotImplementedError("pydom:'not' not implemented yet")

  def off(self, handler):
      "Remove an event handler."

      for _node in self._nodes:
          _node.unbind(handler)


  def offset(self, coordinates=None):
      """Get the current coordinates of the first element, or set the 
         coordinates of every element, in the set of matched elements, 
         relative to the document.
      """

      if coordinates is None:
         return self._nodes[0].offset()

      for _node in self._nodes:
          _node.set_style(coordinates)

  def offsetParent(self):
      "Get the closest ancestor element that is positioned."

      raise NotImplementedError("pydom:'offsetParent' not implemented yet")


  def on(self, events, handler):
      """Attach an event handler function for one or more events to the 
         selected elements.
      """

      if ' ' in events:
         for _event in ' '.split(events):
             self._bind(_event, handler)
      else:
         self._bind(events, handler)


  def outerHeight(self):
      """Get the current computed height for the first element in the set of 
         matched elements, including padding, border, and optionally margin. 
         Returns an integer (without 'px') representation of the value or null
         if called on an empty set of elements.
      """

      raise NotImplementedError("pydom:'outerHeight' not implemented yet")


  def outerWidth(self):
      """Get the current computed width for the first element in the set of 
         matched elements, including padding and border.
      """

      raise NotImplementedError("pydom:'outerWidth' not implemented yet")

  def parent(self, selector=None):
      """Get the parent of each element in the current set of matched elements,
         optionally filtered by a selector.
      """

      _nc=NodeCollection([_n.get_parent() for _n in self._nodes])
      if selector is None:
         return _nc

      return _nc.filter(selector)


  def parents(self, selector=None):
      """Get the ancestors of each element in the current set of matched 
         elements, optionally filtered by a selector.
      """

      raise NotImplementedError("pydom:'parents' not implemented yet")

  def parentsUntil(self, selector=None):
      """Get the ancestors of each element in the current set of matched 
         elements, up to but not including the element matched by the selector,
         DOM node, or jQuery object.
      """

      raise NotImplementedError("pydom:'parentsUntil' not implemented yet")

  def position(self):
      """Get the current coordinates of the first element in the set of 
         matched elements, relative to the offset parent.
      """

      raise NotImplementedError("pydom:'position' not implemented yet")

  def prepend(self, content):
      """Insert content, specified by the parameter, to the beginning of each 
         element in the set of matched elements.
      """

      for _node in self._nodes:
          _node.prepend(content)

  def prependTo(self, target):
      """Insert every element in the set of matched elements to the beginning 
         of the target.
      """

      raise NotImplementedError("pydom:'prependTo' not implemented yet")

  def prev(self):
      """Get the immediately preceding sibling of each element in the set of 
         matched elements, optionally filtered by a selector.
      """

      _p1=NodeCollection()
      for _node in self._nodes:
          _parent=_node.get_parent()
          for _i in range(len(_parent.childNodes)):
              if _parent.childNodes[_i] == _node:
                 if _i > 0:
                    _p1.append(_parent.childNodes[_i-1])
                 break

      return _p1

  def prevAll(self, selector=None):
      """Get all preceding siblings of each element in the set of matched 
         elements, optionally filtered by a selector.
      """

      raise NotImplementedError("pydom:'prevAll' not implemented yet")

  def prevUntil(self, selector=None):
      """Get all preceding siblings of each element up to but not including 
         the element matched by the selector, DOM node, or jQuery object.
      """

      raise NotImplementedError("pydom:'prevUtil' not implemented yet")

  def promise(self):
      """Return a Promise object to observe when all actions of a certain type 
         bound to the collection, queued or not, have finished.
      """

      raise NotImplementedError("pydom:'promise' not implemented yet")

  def prop(self, property, value=None):
      """Get the value of a property for the first element in the set of 
         matched elements or set one or more properties for every matched 
         element.
      """

      raise NotImplementedError("pydom:'prop' not implemented yet")

  def pushStack(self):
      "Add a collection of DOM elements onto the jQuery stack."

      raise NotImplementedError("pydom:'pushStack' not implemented yet")

  def ready(self, func):
      "Specify a function to execute when the DOM is fully loaded."

      #does this even make sense, since brython gets executed onload
      raise NotImplementedError("pydom:'ready' not implemented yet")
      

  def remove(self):
      "Remove the set of matched elements from the DOM."

      for _node in self._nodes:
          _node.get_parent().removeChild(_node) 

  def removeAttr(self, attr):
      "Remove an attribute from each element in the set of matched elements."

      raise NotImplementedError("pydom:'removeAttr' not implemented yet")

  def removeClass(self, name):
      """Remove a single class, multiple classes, or all classes from each 
         element in the set of matched elements.
      """

      for _node in self._nodes:
          _node.removeClass(name)

  def removeData(self):
      "Remove a previously-stored piece of data."

      raise NotImplementedError("pydom:'removeData' not implemented yet")

  def removeProp(self, property):
      "Remove a property for the set of matched elements."

      raise NotImplementedError("pydom:'removeProp' not implemented yet")

  def replaceAll(self):
      "Replace each target element with the set of matched elements."

      raise NotImplementedError("pydom:'replaceAll' not implemented yet")

  def replaceWith(self, content):
      """Replace each element in the set of matched elements with the provided
         new content and return the set of elements that was removed.
      """

      for _node in self._nodes:
          _node.get_parent().replaceWith(content, _node)

  def resize(self, handler=None):
      """Bind an event handler to the 'resize' JavaScript event, or trigger that event on an element."""
      
      self._bind('resize', handler)

  def scroll(self, handler=None):
      """Bind an event handler to the 'scroll' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('scroll', handler)

  def scrollLeft(self, value=None):
      """Get the current horizontal position of the scroll bar for the first 
         element in the set of matched elements or set the horizontal position
         of the scroll bar for every matched element.
      """

      raise NotImplementedError("pydom:'scrollLeft' not implemented yet")

  def scrollTop(self, value=None):
      """Get the current vertical position of the scroll bar for the first 
         element in the set of matched elements or set the vertical position 
         of the scroll bar for every matched element.
      """

      raise NotImplementedError("pydom:'scrollTop' not implemented yet")

  def select(self, handler=None):
      """Bind an event handler to the 'select' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('select', handler)

  def show(self):
      "Display the matched elements."

      for _node in self._nodes:
          _node.set_style({'display': 'block'})

  def siblings(self, selector=None):
      """Get the siblings of each element in the set of matched elements, 
         optionally filtered by a selector.
      """

      raise NotImplementedError("pydom:'siblings' not implemented yet")

  def size(self):
      """Return the number of elements in the jQuery object."""

      raise NotImplementedError("pydom:'size' not implemented yet")
      

  def slice(self, index1=None, index2=None):
      """Reduce the set of matched elements to a subset specified by a range 
         of indices.
      """

      if index1 is None and index2 is None:
         return NodeCollection()

      return NodeCollection(self._nodes[index1:index2])

  def slideDown(self):
      "Display the matched elements with a sliding motion."

      raise NotImplementedError("pydom:'slideDown' not implemented yet")

  def slideToggle(self):
      "Display or hide the matched elements with a sliding motion."

      raise NotImplementedError("pydom:'slideToggle' not implemented yet")

  def slideUp(self):
      "Hide the matched elements with a sliding motion."

      raise NotImplementedError("pydom:'slideUp' not implemented yet")

  def stop(self):
      "Stop the currently-running animation on the matched elements."

      raise NotImplementedError("pydom:'stop' not implemented yet")

  def submit(self, handler=None):
      """Bind an event handler to the 'submit' JavaScript event, or trigger 
         that event on an element.
      """

      self._bind('submit', handler)

  def text(self, content=None):
      """Get the combined text contents of each element in the set of matched 
         elements, including their descendants, or set the text contents of 
         the matched elements.
      """

      if content is None:
         return self._nodes[0].get_text()

      for _node in self._nodes:
          _node.set_text(content) 

  def toggle(self, Function=None):
      """Display or hide the matched elements."""
      if Function is None:
         _show=True
         if self._nodes[0].css('display') != 'none':
            _show=False
         for _node in self._nodes:
             if _show:
                _node.set_style({'display': 'block'})
             else:
                _node.set_style({'display': 'none'})
  
             _show=not _show

         return

      for _node in self._nodes:
          if Function(_node):
             _node.set_style({'display': 'block'})
          else:
             _node.set_style({'display': 'none'})

  def toggleClass(self):
      """Add or remove one or more classes from each element in the set of 
         matched elements, depending on either the class’s presence or the 
         value of the switch argument.
      """

      raise NotImplementedError("pydom:'toggleClass' not implemented yet")

  def toList(self):
      return self._nodes

  toArray=toList   #for jQuery compatibility


  def trigger(self, event_type):
      """Execute all handlers and behaviors attached to the matched elements 
         for the given event type.
      """
      
      for _node in self._nodes:
          getattr(_node, event_type)()

  def triggerHandler(self, event_type):
      "Execute all handlers attached to an element for an event."

      raise NotImplementedError("pydom:'triggerHandler' not implemented yet")

  def unbind(self, events, handler):
      "Remove a previously-attached event handler from the elements."

      if ' ' in events:
         for _event in ' '.split(events):
             for _node in self._nodes:
                 _node.unbind(_event, handler)
         return

      for _node in self._nodes:
          _node.unbind(events, handler)


  def undelegate(self, selector=None, eventType=None, handler=None):
      """Remove a handler from the event for all elements which match the 
         current selector, based upon a specific set of root elements.
      """

      raise NotImplementedError("pydom:'undelegate' not implemented yet")

  def unload(self, handler):
      "Bind an event handler to the 'unload' JavaScript event."

      self._bind('unload', handler)

  def unwrap(self):
      """Remove the parents of the set of matched elements from the DOM, 
         leaving the matched elements in their place.
      """
      for _node in self._nodes:
          _parent=_node.get_parent()
          _grandparent=_parent.get_parent()
          _grandparent.replaceChild(_node, _parent)

          _parent.remove()

  def val(self, value=None):
      """Get the current value of the first element in the set of matched 
         elements or set the value of every matched element.
      """

      if value is None:
         return self._nodes[0]['text']   #is text the best here?

      for _node in self._nodes:
          _node['text']=value

  def width(self, width=None):
      """Get the current computed width for the first element in the set of 
         matched elements or set the width of every matched element.
      """

      if width is None:
         return self._nodes[0].css('width')

      for _node in self._nodes:
          _node.set_style({'width': width})

  def wrap(self):
      """Wrap an HTML structure around each element in the set of matched 
         elements.
      """

      raise NotImplementedError("pydom:'wrap' not implemented yet")

  def wrapAll(self):
      """Wrap an HTML structure around all elements in the set of matched 
         elements.
      """

      raise NotImplementedError("pydom:'wrapAll' not implemented yet")

  def wrapInner(self):
      """Wrap an HTML structure around the content of each element in the set 
         of matched elements.
      """

      raise NotImplementedError("pydom:'wrapInner' not implemented yet")

def byId(id):
    """Retrieve element by Id"""

    _result=doc.get(id=id)
    return _result[0]

def get(selector):
    return Selector(selector).get()

def createCSSClass(csstext):
    """ Create style element and attach css text """

    _style=doc.createElement('style')
    _style.type='text/css'
    _style.innerHTML = csstext
    doc.get(tag='head')[0].appendChild(_style)
