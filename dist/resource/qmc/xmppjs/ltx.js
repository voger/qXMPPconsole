(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ltx = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}

},{}],2:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],3:[function(require,module,exports){
'use strict'

var parse = require('./lib/parse')
var Parser = require('./lib/Parser')
var escape = require('./lib/escape')
var Element = require('./lib/Element')
var equal = require('./lib/equal')
var createElement = require('./lib/createElement')
var tag = require('./lib/tag')
var tagString = require('./lib/tagString')
var is = require('./lib/is')
var clone = require('./lib/clone')
var stringify = require('./lib/stringify')

exports = module.exports = function ltx () {
  return tag.apply(null, arguments)
}

exports.Element = Element

exports.equal = equal.equal
exports.nameEqual = equal.name
exports.attrsEqual = equal.attrs
exports.childrenEqual = equal.children

exports.isNode = is.isNode
exports.isElement = is.isElement
exports.isText = is.isText

exports.clone = clone
exports.createElement = createElement

exports.escapeXML = escape.escapeXML
exports.unescapeXML = escape.unescapeXML
exports.escapeXMLText = escape.escapeXMLText
exports.unescapeXMLText = escape.unescapeXMLText

exports.Parser = Parser
exports.parse = parse

exports.tag = tag
exports.tagString = tagString

exports.stringify = stringify

},{"./lib/Element":4,"./lib/Parser":5,"./lib/clone":6,"./lib/createElement":7,"./lib/equal":8,"./lib/escape":9,"./lib/is":10,"./lib/parse":11,"./lib/stringify":13,"./lib/tag":14,"./lib/tagString":15}],4:[function(require,module,exports){
'use strict'

var escape = require('./escape')
var escapeXML = escape.escapeXML
var escapeXMLText = escape.escapeXMLText

var equality = require('./equal')
var equal = equality.equal
var nameEqual = equality.name
var attrsEqual = equality.attrs
var childrenEqual = equality.children

var clone = require('./clone')

/**
 * Element
 *
 * Attributes are in the element.attrs object. Children is a list of
 * either other Elements or Strings for text content.
 **/
function Element (name, attrs) {
  this.name = name
  this.parent = null
  this.children = []
  this.attrs = {}
  this.setAttrs(attrs)
}

/* Accessors */

/**
 * if (element.is('message', 'jabber:client')) ...
 **/
Element.prototype.is = function (name, xmlns) {
  return (this.getName() === name) &&
  (!xmlns || (this.getNS() === xmlns))
}

/* without prefix */
Element.prototype.getName = function () {
  if (this.name.indexOf(':') >= 0) {
    return this.name.substr(this.name.indexOf(':') + 1)
  } else {
    return this.name
  }
}

/**
 * retrieves the namespace of the current element, upwards recursively
 **/
Element.prototype.getNS = function () {
  if (this.name.indexOf(':') >= 0) {
    var prefix = this.name.substr(0, this.name.indexOf(':'))
    return this.findNS(prefix)
  }
  return this.findNS()
}

/**
 * find the namespace to the given prefix, upwards recursively
 **/
Element.prototype.findNS = function (prefix) {
  if (!prefix) {
    /* default namespace */
    if (this.attrs.xmlns) {
      return this.attrs.xmlns
    } else if (this.parent) {
      return this.parent.findNS()
    }
  } else {
    /* prefixed namespace */
    var attr = 'xmlns:' + prefix
    if (this.attrs[attr]) {
      return this.attrs[attr]
    } else if (this.parent) {
      return this.parent.findNS(prefix)
    }
  }
}

/**
 * Recursiverly gets all xmlns defined, in the form of {url:prefix}
 **/
Element.prototype.getXmlns = function () {
  var namespaces = {}

  if (this.parent) {
    namespaces = this.parent.getXmlns()
  }

  for (var attr in this.attrs) {
    var m = attr.match('xmlns:?(.*)')
    // eslint-disable-next-line  no-prototype-builtins
    if (this.attrs.hasOwnProperty(attr) && m) {
      namespaces[this.attrs[attr]] = m[1]
    }
  }
  return namespaces
}

Element.prototype.setAttrs = function (attrs) {
  if (typeof attrs === 'string') {
    this.attrs.xmlns = attrs
  } else if (attrs) {
    Object.keys(attrs).forEach(function (key) {
      this.attrs[key] = attrs[key]
    }, this)
  }
}

/**
 * xmlns can be null, returns the matching attribute.
 **/
Element.prototype.getAttr = function (name, xmlns) {
  if (!xmlns) {
    return this.attrs[name]
  }

  var namespaces = this.getXmlns()

  if (!namespaces[xmlns]) {
    return null
  }

  return this.attrs[[namespaces[xmlns], name].join(':')]
}

/**
 * xmlns can be null
 **/
Element.prototype.getChild = function (name, xmlns) {
  return this.getChildren(name, xmlns)[0]
}

/**
 * xmlns can be null
 **/
Element.prototype.getChildren = function (name, xmlns) {
  var result = []
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i]
    if (child.getName &&
      (child.getName() === name) &&
      (!xmlns || (child.getNS() === xmlns))) {
      result.push(child)
    }
  }
  return result
}

/**
 * xmlns and recursive can be null
 **/
Element.prototype.getChildByAttr = function (attr, val, xmlns, recursive) {
  return this.getChildrenByAttr(attr, val, xmlns, recursive)[0]
}

/**
 * xmlns and recursive can be null
 **/
Element.prototype.getChildrenByAttr = function (attr, val, xmlns, recursive) {
  var result = []
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i]
    if (child.attrs &&
      (child.attrs[attr] === val) &&
      (!xmlns || (child.getNS() === xmlns))) {
      result.push(child)
    }
    if (recursive && child.getChildrenByAttr) {
      result.push(child.getChildrenByAttr(attr, val, xmlns, true))
    }
  }
  if (recursive) {
    result = [].concat.apply([], result)
  }
  return result
}

Element.prototype.getChildrenByFilter = function (filter, recursive) {
  var result = []
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i]
    if (filter(child)) {
      result.push(child)
    }
    if (recursive && child.getChildrenByFilter) {
      result.push(child.getChildrenByFilter(filter, true))
    }
  }
  if (recursive) {
    result = [].concat.apply([], result)
  }
  return result
}

Element.prototype.getText = function () {
  var text = ''
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i]
    if ((typeof child === 'string') || (typeof child === 'number')) {
      text += child
    }
  }
  return text
}

Element.prototype.getChildText = function (name, xmlns) {
  var child = this.getChild(name, xmlns)
  return child ? child.getText() : null
}

/**
 * Return all direct descendents that are Elements.
 * This differs from `getChildren` in that it will exclude text nodes,
 * processing instructions, etc.
 */
Element.prototype.getChildElements = function () {
  return this.getChildrenByFilter(function (child) {
    return child instanceof Element
  })
}

/* Builder */

/** returns uppermost parent */
Element.prototype.root = function () {
  if (this.parent) {
    return this.parent.root()
  }
  return this
}
Element.prototype.tree = Element.prototype.root

/** just parent or itself */
Element.prototype.up = function () {
  if (this.parent) {
    return this.parent
  }
  return this
}

/** create child node and return it */
Element.prototype.c = function (name, attrs) {
  return this.cnode(new Element(name, attrs))
}

Element.prototype.cnode = function (child) {
  this.children.push(child)
  if (typeof child === 'object') {
    child.parent = this
  }
  return child
}

/** add text node and return element */
Element.prototype.t = function (text) {
  this.children.push(text)
  return this
}

/* Manipulation */

/**
 * Either:
 *   el.remove(childEl)
 *   el.remove('author', 'urn:...')
 */
Element.prototype.remove = function (el, xmlns) {
  var filter
  if (typeof el === 'string') {
    /* 1st parameter is tag name */
    filter = function (child) {
      return !(child.is &&
      child.is(el, xmlns))
    }
  } else {
    /* 1st parameter is element */
    filter = function (child) {
      return child !== el
    }
  }

  this.children = this.children.filter(filter)

  return this
}

Element.prototype.clone = function () {
  return clone(this)
}

Element.prototype.text = function (val) {
  if (val && this.children.length === 1) {
    this.children[0] = val
    return this
  }
  return this.getText()
}

Element.prototype.attr = function (attr, val) {
  if (typeof val !== 'undefined' || val === null) {
    if (!this.attrs) {
      this.attrs = {}
    }
    this.attrs[attr] = val
    return this
  }
  return this.attrs[attr]
}

/* Serialization */

Element.prototype.toString = function () {
  var s = ''
  this.write(function (c) {
    s += c
  })
  return s
}

Element.prototype.toJSON = function () {
  return {
    name: this.name,
    attrs: this.attrs,
    children: this.children.map(function (child) {
      return child && child.toJSON ? child.toJSON() : child
    })
  }
}

Element.prototype._addChildren = function (writer) {
  writer('>')
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i]
    /* Skip null/undefined */
    if (child || (child === 0)) {
      if (child.write) {
        child.write(writer)
      } else if (typeof child === 'string') {
        writer(escapeXMLText(child))
      } else if (child.toString) {
        writer(escapeXMLText(child.toString(10)))
      }
    }
  }
  writer('</')
  writer(this.name)
  writer('>')
}

Element.prototype.write = function (writer) {
  writer('<')
  writer(this.name)
  for (var k in this.attrs) {
    var v = this.attrs[k]
    if (v != null) { // === null || undefined
      writer(' ')
      writer(k)
      writer('="')
      if (typeof v !== 'string') {
        v = v.toString()
      }
      writer(escapeXML(v))
      writer('"')
    }
  }
  if (this.children.length === 0) {
    writer('/>')
  } else {
    this._addChildren(writer)
  }
}

Element.prototype.nameEquals = function (el) {
  return nameEqual(this, el)
}

Element.prototype.attrsEquals = function (el) {
  return attrsEqual(this, el)
}

Element.prototype.childrenEquals = function (el) {
  return childrenEqual(this, el)
}

Element.prototype.equals = function (el) {
  return equal(this, el)
}

module.exports = Element

},{"./clone":6,"./equal":8,"./escape":9}],5:[function(require,module,exports){
'use strict'

var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var Element = require('./Element')
var LtxParser = require('./parsers/ltx')

var Parser = function (options) {
  EventEmitter.call(this)

  var ParserInterface = this.Parser = (options && options.Parser) || this.DefaultParser
  var ElementInterface = this.Element = (options && options.Element) || this.DefaultElement

  this.parser = new ParserInterface()

  var el
  var self = this
  this.parser.on('startElement', function (name, attrs) {
    var child = new ElementInterface(name, attrs)
    if (!el) {
      el = child
    } else {
      el = el.cnode(child)
    }
  })
  this.parser.on('endElement', function (name) {
    if (!el) {
      /* Err */
    } else if (name === el.name) {
      if (el.parent) {
        el = el.parent
      } else if (!self.tree) {
        self.tree = el
        el = undefined
      }
    }
  })
  this.parser.on('text', function (str) {
    if (el) {
      el.t(str)
    }
  })
  this.parser.on('error', function (e) {
    self.error = e
    self.emit('error', e)
  })
}

inherits(Parser, EventEmitter)

Parser.prototype.DefaultParser = LtxParser

Parser.prototype.DefaultElement = Element

Parser.prototype.write = function (data) {
  this.parser.write(data)
}

Parser.prototype.end = function (data) {
  this.parser.end(data)

  if (!this.error) {
    if (this.tree) {
      this.emit('tree', this.tree)
    } else {
      this.emit('error', new Error('Incomplete document'))
    }
  }
}

module.exports = Parser

},{"./Element":4,"./parsers/ltx":12,"events":1,"inherits":2}],6:[function(require,module,exports){
'use strict'

module.exports = function clone (el) {
  var clone = new el.constructor(el.name, el.attrs)
  for (var i = 0; i < el.children.length; i++) {
    var child = el.children[i]
    clone.cnode(child.clone ? child.clone() : child)
  }
  return clone
}

},{}],7:[function(require,module,exports){
'use strict'

var Element = require('./Element')

/**
 * JSX compatible API, use this function as pragma
 * https://facebook.github.io/jsx/
 *
 * @param  {string} name  name of the element
 * @param  {object} attrs object of attribute key/value pairs
 * @return {Element}      Element
 */
module.exports = function createElement (name, attrs /*, child1, child2, ... */) {
  var el = new Element(name, attrs)

  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i]
    if (child) el.cnode(child)
  }

  return el
}

},{"./Element":4}],8:[function(require,module,exports){
'use strict'

function nameEqual (a, b) {
  return a.name === b.name
}

function attrsEqual (a, b) {
  var attrs = a.attrs
  var keys = Object.keys(attrs)
  var length = keys.length
  if (length !== Object.keys(b.attrs).length) return false
  for (var i = 0, l = length; i < l; i++) {
    var key = keys[i]
    var value = attrs[key]
    if (value == null || b.attrs[key] == null) { // === null || undefined
      if (value !== b.attrs[key]) return false
    } else if (value.toString() !== b.attrs[key].toString()) {
      return false
    }
  }
  return true
}

function childrenEqual (a, b) {
  var children = a.children
  var length = children.length
  if (length !== b.children.length) return false
  for (var i = 0, l = length; i < l; i++) {
    var child = children[i]
    if (typeof child === 'string') {
      if (child !== b.children[i]) return false
    } else {
      if (!child.equals(b.children[i])) return false
    }
  }
  return true
}

function equal (a, b) {
  if (!nameEqual(a, b)) return false
  if (!attrsEqual(a, b)) return false
  if (!childrenEqual(a, b)) return false
  return true
}

module.exports.name = nameEqual
module.exports.attrs = attrsEqual
module.exports.children = childrenEqual
module.exports.equal = equal

},{}],9:[function(require,module,exports){
'use strict'

var escapeXMLTable = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;'
}

function escapeXMLReplace (match) {
  return escapeXMLTable[match]
}

var unescapeXMLTable = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'"
}

function unescapeXMLReplace (match) {
  if (match[1] === '#') {
    var num
    if (match[2] === 'x') {
      num = parseInt(match.slice(3), 16)
    } else {
      num = parseInt(match.slice(2), 10)
    }
    // https://www.w3.org/TR/xml/#NT-Char defines legal XML characters:
    // #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
    if (num === 0x9 || num === 0xA || num === 0xD ||
        (num >= 0x20 && num <= 0xD7FF) ||
        (num >= 0xE000 && num <= 0xFFFD) ||
        (num >= 0x10000 && num <= 0x10FFFF)) {
      return String.fromCodePoint(num)
    }
    throw new Error('Illegal XML character 0x' + num.toString(16))
  }
  if (unescapeXMLTable[match]) {
    return unescapeXMLTable[match] || match
  }
  throw new Error('Illegal XML entity ' + match)
}

exports.escapeXML = function escapeXML (s) {
  return s.replace(/&|<|>|"|'/g, escapeXMLReplace)
}

exports.unescapeXML = function unescapeXML (s) {
  var result = ''
  var start = -1
  var end = -1
  var previous = 0
  while ((start = s.indexOf('&', previous)) !== -1 && (end = s.indexOf(';', start + 1)) !== -1) {
    result = result +
      s.substring(previous, start) +
      unescapeXMLReplace(s.substring(start, end + 1))
    previous = end + 1
  }

  // shortcut if loop never entered:
  // return the original string without creating new objects
  if (previous === 0) return s

  // push the remaining characters
  result = result + s.substring(previous)

  return result
}

exports.escapeXMLText = function escapeXMLText (s) {
  return s.replace(/&|<|>/g, escapeXMLReplace)
}

exports.unescapeXMLText = function unescapeXMLText (s) {
  return s.replace(/&(amp|#38|lt|#60|gt|#62);/g, unescapeXMLReplace)
}

},{}],10:[function(require,module,exports){
'use strict'

var Element = require('./Element')

module.exports.isNode = function is (el) {
  return el instanceof Element || typeof el === 'string'
}

module.exports.isElement = function isElement (el) {
  return el instanceof Element
}

module.exports.isText = function isText (el) {
  return typeof el === 'string'
}

},{"./Element":4}],11:[function(require,module,exports){
'use strict'

var Parser = require('./Parser')

module.exports = function parse (data, options) {
  var p
  if (typeof options === 'function') {
    p = new options() // eslint-disable-line
  } else {
    p = new Parser(options)
  }

  var result = null
  var error = null

  p.on('tree', function (tree) {
    result = tree
  })
  p.on('error', function (e) {
    error = e
  })

  p.write(data)
  p.end()

  if (error) {
    throw error
  } else {
    return result
  }
}

},{"./Parser":5}],12:[function(require,module,exports){
'use strict'

var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter
var unescapeXML = require('../escape').unescapeXML

var STATE_TEXT = 0
var STATE_IGNORE_COMMENT = 1
var STATE_IGNORE_INSTRUCTION = 2
var STATE_TAG_NAME = 3
var STATE_TAG = 4
var STATE_ATTR_NAME = 5
var STATE_ATTR_EQ = 6
var STATE_ATTR_QUOT = 7
var STATE_ATTR_VALUE = 8
var STATE_CDATA = 9
var STATE_IGNORE_CDATA = 10

var SaxLtx = module.exports = function SaxLtx () {
  EventEmitter.call(this)

  var state = STATE_TEXT
  var remainder
  var tagName
  var attrs
  var endTag
  var selfClosing
  var attrQuote
  var attrQuoteChar
  var recordStart = 0
  var attrName

  this._handleTagOpening = function (endTag, tagName, attrs) {
    if (!endTag) {
      this.emit('startElement', tagName, attrs)
      if (selfClosing) {
        this.emit('endElement', tagName)
      }
    } else {
      this.emit('endElement', tagName)
    }
  }

  this.write = function (data) {
    if (typeof data !== 'string') {
      data = data.toString()
    }
    var pos = 0

    /* Anything from previous write()? */
    if (remainder) {
      data = remainder + data
      pos += remainder.length
      remainder = null
    }

    function endRecording () {
      if (typeof recordStart === 'number') {
        var recorded = data.substring(recordStart, pos)
        recordStart = undefined
        return recorded
      }
    }

    for (; pos < data.length; pos++) {
      if (state === STATE_TEXT) {
        // if we're looping through text, fast-forward using indexOf to
        // the next '<' character
        var lt = data.indexOf('<', pos)
        if (lt !== -1 && pos !== lt) {
          pos = lt
        }
      } else if (state === STATE_ATTR_VALUE) {
        // if we're looping through an attribute, fast-forward using
        // indexOf to the next end quote character
        var quot = data.indexOf(attrQuoteChar, pos)
        if (quot !== -1) {
          pos = quot
        }
      } else if (state === STATE_IGNORE_COMMENT) {
        // if we're looping through a comment, fast-forward using
        // indexOf to the first end-comment character
        var endcomment = data.indexOf('-->', pos)
        if (endcomment !== -1) {
          pos = endcomment + 2 // target the '>' character
        }
      } else if (state === STATE_IGNORE_CDATA) {
        // if we're looping through a CDATA, fast-forward using
        // indexOf to the first end-CDATA character ]]>
        var endCDATA = data.indexOf(']]>', pos)
        if (endCDATA !== -1) {
          pos = endCDATA + 2 // target the '>' character
        }
      }

      var c = data.charCodeAt(pos)
      switch (state) {
        case STATE_TEXT:
          if (c === 60 /* < */) {
            var text = endRecording()
            if (text) {
              this.emit('text', unescapeXML(text))
            }
            state = STATE_TAG_NAME
            recordStart = pos + 1
            attrs = {}
          }
          break
        case STATE_CDATA:
          if (c === 93 /* ] */ && data.substr(pos + 1, 2) === ']>') {
            var cData = endRecording()
            if (cData) {
              this.emit('text', cData)
            }
            state = STATE_TEXT
          }
          break
        case STATE_TAG_NAME:
          if (c === 47 /* / */ && recordStart === pos) {
            recordStart = pos + 1
            endTag = true
          } else if (c === 33 /* ! */) {
            if (data.substr(pos + 1, 7) === '[CDATA[') {
              recordStart = pos + 8
              state = STATE_CDATA
            } else {
              recordStart = undefined
              state = STATE_IGNORE_COMMENT
            }
          } else if (c === 63 /* ? */) {
            recordStart = undefined
            state = STATE_IGNORE_INSTRUCTION
          } else if (c <= 32 || c === 47 /* / */ || c === 62 /* > */) {
            tagName = endRecording()
            pos--
            state = STATE_TAG
          }
          break
        case STATE_IGNORE_COMMENT:
          if (c === 62 /* > */) {
            var prevFirst = data.charCodeAt(pos - 1)
            var prevSecond = data.charCodeAt(pos - 2)
            if ((prevFirst === 45 /* - */ && prevSecond === 45 /* - */) ||
                (prevFirst === 93 /* ] */ && prevSecond === 93 /* ] */)) {
              state = STATE_TEXT
            }
          }
          break
        case STATE_IGNORE_INSTRUCTION:
          if (c === 62 /* > */) {
            var prev = data.charCodeAt(pos - 1)
            if (prev === 63 /* ? */) {
              state = STATE_TEXT
            }
          }
          break
        case STATE_TAG:
          if (c === 62 /* > */) {
            this._handleTagOpening(endTag, tagName, attrs)
            tagName = undefined
            attrs = undefined
            endTag = undefined
            selfClosing = undefined
            state = STATE_TEXT
            recordStart = pos + 1
          } else if (c === 47 /* / */) {
            selfClosing = true
          } else if (c > 32) {
            recordStart = pos
            state = STATE_ATTR_NAME
          }
          break
        case STATE_ATTR_NAME:
          if (c <= 32 || c === 61 /* = */) {
            attrName = endRecording()
            pos--
            state = STATE_ATTR_EQ
          }
          break
        case STATE_ATTR_EQ:
          if (c === 61 /* = */) {
            state = STATE_ATTR_QUOT
          }
          break
        case STATE_ATTR_QUOT:
          if (c === 34 /* " */ || c === 39 /* ' */) {
            attrQuote = c
            attrQuoteChar = c === 34 ? '"' : "'"
            state = STATE_ATTR_VALUE
            recordStart = pos + 1
          }
          break
        case STATE_ATTR_VALUE:
          if (c === attrQuote) {
            var value = unescapeXML(endRecording())
            attrs[attrName] = value
            attrName = undefined
            state = STATE_TAG
          }
          break
      }
    }

    if (typeof recordStart === 'number' &&
      recordStart <= data.length) {
      remainder = data.slice(recordStart)
      recordStart = 0
    }
  }
}
inherits(SaxLtx, EventEmitter)

SaxLtx.prototype.end = function (data) {
  if (data) {
    this.write(data)
  }

  /* Uh, yeah */
  this.write = function () {}
}

},{"../escape":9,"events":1,"inherits":2}],13:[function(require,module,exports){
'use strict'

function stringify (el, indent, level) {
  if (typeof indent === 'number') indent = ' '.repeat(indent)
  if (!level) level = 1
  var s = ''
  s += '<' + el.name

  Object.keys(el.attrs).forEach(function (k) {
    s += ' ' + k + '=' + '"' + el.attrs[k] + '"'
  })

  if (el.children.length) {
    s += '>'
    el.children.forEach(function (child, i) {
      if (indent) s += '\n' + indent.repeat(level)
      if (typeof child === 'string') {
        s += child
      } else {
        s += stringify(child, indent, level + 1)
      }
    })
    if (indent) s += '\n' + indent.repeat(level - 1)
    s += '</' + el.name + '>'
  } else {
    s += '/>'
  }

  return s
}

module.exports = stringify

},{}],14:[function(require,module,exports){
'use strict'

var tagString = require('./tagString')
var parse = require('./parse')

module.exports = function tag (/* [literals], ...substitutions */) {
  return parse(tagString.apply(null, arguments))
}

},{"./parse":11,"./tagString":15}],15:[function(require,module,exports){
'use strict'

var escape = require('./escape').escapeXML

module.exports = function tagString (/* [literals], ...substitutions */) {
  var literals = arguments[0]

  var str = ''

  for (var i = 1; i < arguments.length; i++) {
    str += literals[i - 1]
    str += escape(arguments[i])
  }
  str += literals[literals.length - 1]

  return str
}

},{"./escape":9}]},{},[3])(3)
});
