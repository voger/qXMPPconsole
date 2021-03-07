(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.XMPP = f()}})(function(){var define,module,exports;
var createModuleFactory = function createModuleFactory(t){var e;return function(r){return e||t(e={exports:{},parent:r},e.exports),e.exports}};
var _$mechanism_23 = createModuleFactory(function (module, exports) {
"use strict";

(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(exports, module);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module'], factory);
  }
})(void 0, function (exports, module) {
  /**
   * PLAIN `Mechanism` constructor.
   *
   * This class implements the PLAIN SASL mechanism.
   *
   * The PLAIN SASL mechanism provides support for exchanging a clear-text
   * username and password.  This mechanism should not be used without adequate
   * security provided by an underlying transport layer. 
   *
   * References:
   *  - [RFC 4616](http://tools.ietf.org/html/rfc4616)
   *
   * @api public
   */
  function Mechanism() {}

  Mechanism.prototype.name = 'PLAIN';
  Mechanism.prototype.clientFirst = true;
  /**
   * Encode a response using given credential.
   *
   * Options:
   *  - `username`
   *  - `password`
   *  - `authzid`   authorization identity (optional)
   *
   * @param {Object} cred
   * @api public
   */

  Mechanism.prototype.response = function (cred) {
    var str = '';
    str += cred.authzid || '';
    str += '\0';
    str += cred.username;
    str += '\0';
    str += cred.password;
    return str;
  };
  /**
   * Decode a challenge issued by the server.
   *
   * @param {String} chal
   * @return {Mechanism} for chaining
   * @api public
   */


  Mechanism.prototype.challenge = function (chal) {
    return this;
  };

  exports = module.exports = Mechanism;
});

});
var _$mechanism_21 = createModuleFactory(function (module, exports) {
"use strict";

(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(exports, module);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module'], factory);
  }
})(void 0, function (exports, module) {
  /**
   * ANONYMOUS `Mechanism` constructor.
   *
   * This class implements the ANONYMOUS SASL mechanism.
   *
   * The ANONYMOUS SASL mechanism provides support for permitting anonymous
   * access to various services
   *
   * References:
   *  - [RFC 4505](http://tools.ietf.org/html/rfc4505)
   *
   * @api public
   */
  function Mechanism() {}

  Mechanism.prototype.name = 'ANONYMOUS';
  Mechanism.prototype.clientFirst = true;
  /**
   * Encode a response using optional trace information.
   *
   * Options:
   *  - `trace`  trace information (optional)
   *
   * @param {Object} cred
   * @api public
   */

  Mechanism.prototype.response = function (cred) {
    return cred.trace || '';
  };
  /**
   * Decode a challenge issued by the server.
   *
   * @param {String} chal
   * @api public
   */


  Mechanism.prototype.challenge = function (chal) {};

  exports = module.exports = Mechanism;
});

});
var _$factory_25 = createModuleFactory(function (module, exports) {
"use strict";

(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(exports, module);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module'], factory);
  }
})(void 0, function (exports, module) {
  /**
   * `Factory` constructor.
   *
   * @api public
   */
  function Factory() {
    this._mechs = [];
  }
  /**
   * Utilize the given `mech` with optional `name`, overridding the mechanism's
   * default name.
   *
   * Examples:
   *
   *     factory.use(FooMechanism);
   *
   *     factory.use('XFOO', FooMechanism);
   *
   * @param {String|Mechanism} name
   * @param {Mechanism} mech
   * @return {Factory} for chaining
   * @api public
   */


  Factory.prototype.use = function (name, mech) {
    if (!mech) {
      mech = name;
      name = mech.prototype.name;
    }

    this._mechs.push({
      name: name,
      mech: mech
    });

    return this;
  };
  /**
   * Create a new mechanism from supported list of `mechs`.
   *
   * If no mechanisms are supported, returns `null`.
   *
   * Examples:
   *
   *     var mech = factory.create(['FOO', 'BAR']);
   *
   * @param {Array} mechs
   * @return {Mechanism}
   * @api public
   */


  Factory.prototype.create = function (mechs) {
    for (var i = 0, len = this._mechs.length; i < len; i++) {
      for (var j = 0, jlen = mechs.length; j < jlen; j++) {
        var entry = this._mechs[i];

        if (entry.name == mechs[j]) {
          return new entry.mech();
        }
      }
    }

    return null;
  };

  exports = module.exports = Factory;
});

});
"use strict";

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _$_interopRequireDefault_6 = _interopRequireDefault;

"use strict";

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _$_objectWithoutPropertiesLoose_9 = _objectWithoutPropertiesLoose;

"use strict";

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var _$_inheritsLoose_5 = _inheritsLoose;

var _$getPrototypeOf_4 = {};
"use strict";

function _getPrototypeOf(o) {
  _$getPrototypeOf_4 = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

_$getPrototypeOf_4 = _getPrototypeOf;

var _$setPrototypeOf_10 = {};
"use strict";

function _setPrototypeOf(o, p) {
  _$setPrototypeOf_10 = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

_$setPrototypeOf_10 = _setPrototypeOf;

"use strict";

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

var _$_isNativeFunction_7 = _isNativeFunction;

"use strict";

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var _$_isNativeReflectConstruct_8 = _isNativeReflectConstruct;

var _$construct_2 = {};
"use strict";

/* removed: var _$setPrototypeOf_10 = require("./setPrototypeOf"); */;

/* removed: var _$_isNativeReflectConstruct_8 = require("./isNativeReflectConstruct"); */;

function _construct(Parent, args, Class) {
  if (_$_isNativeReflectConstruct_8()) {
    _$construct_2 = _construct = Reflect.construct;
  } else {
    _$construct_2 = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _$setPrototypeOf_10(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

_$construct_2 = _construct;

var _$wrapNativeSuper_11 = {};
"use strict";

/* removed: var _$getPrototypeOf_4 = require("./getPrototypeOf"); */;

/* removed: var _$setPrototypeOf_10 = require("./setPrototypeOf"); */;

/* removed: var _$_isNativeFunction_7 = require("./isNativeFunction"); */;

/* removed: var _$construct_2 = require("./construct"); */;

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _$wrapNativeSuper_11 = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_$_isNativeFunction_7(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _$construct_2(Class, arguments, _$getPrototypeOf_4(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _$setPrototypeOf_10(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

_$wrapNativeSuper_11 = _wrapNativeSuper;

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var _inheritsLoose2 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

var _wrapNativeSuper2 = _$_interopRequireDefault_6(_$wrapNativeSuper_11);

var _$TimeoutError_38 = /*#__PURE__*/function (_Error) {
  (0, _inheritsLoose2.default)(TimeoutError, _Error);

  function TimeoutError(message) {
    var _this;

    _this = _Error.call(this, message) || this;
    _this.name = "TimeoutError";
    return _this;
  }

  return TimeoutError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

"use strict";

var _$delay_39 = function delay(ms) {
  var timeout;
  var promise = new Promise(function (resolve) {
    timeout = setTimeout(resolve, ms);
  });
  promise.timeout = timeout;
  return promise;
};

"use strict";

/* removed: var _$TimeoutError_38 = require("./TimeoutError"); */;

/* removed: var _$delay_39 = require("./delay"); */;

var _$timeout_41 = function timeout(promise, ms) {
  var promiseDelay = _$delay_39(ms);

  function cancelDelay() {
    clearTimeout(promiseDelay.timeout);
  }

  return Promise.race([promise.finally(cancelDelay), promiseDelay.then(function () {
    throw new _$TimeoutError_38();
  })]);
};

"use strict";

/* removed: var _$TimeoutError_38 = require("./TimeoutError"); */;

var _$promise_40 = function promise(EE, event, rejectEvent, timeout) {
  if (rejectEvent === void 0) {
    rejectEvent = "error";
  }

  return new Promise(function (resolve, reject) {
    var timeoutId;

    var cleanup = function cleanup() {
      clearTimeout(timeoutId);
      EE.removeListener(event, onEvent);
      EE.removeListener(rejectEvent, onError);
    };

    function onError(reason) {
      reject(reason);
      cleanup();
    }

    function onEvent(value) {
      resolve(value);
      cleanup();
    }

    EE.once(event, onEvent);

    if (rejectEvent) {
      EE.once(rejectEvent, onError);
    }

    if (timeout) {
      timeoutId = setTimeout(function () {
        cleanup();
        reject(new _$TimeoutError_38());
      }, timeout);
    }
  });
};

var _$events_13 = {};
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

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
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
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

_$events_13 = EventEmitter;
_$events_13.once = once; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function get() {
    return defaultMaxListeners;
  },
  set: function set(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      ReflectApply(listeners[i], this, args);
    }
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
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
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
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = _getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
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

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
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

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
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

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


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
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
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

  for (var i = 0; i < n; ++i) {
    copy[i] = arr[i];
  }

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1];
  }

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
    }

    ;
    var errorListener; // Adding an error listener is not optional because
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

"use strict";

var _$Deferred_37 = function Deferred() {
  var _this = this;

  this.promise = new Promise(function (resolve, reject) {
    _this.resolve = resolve;
    _this.reject = reject;
  });
};

var _$events_36 = {};
"use strict";

/* removed: var _$timeout_41 = require("./lib/timeout"); */;

/* removed: var _$delay_39 = require("./lib/delay"); */;

/* removed: var _$TimeoutError_38 = require("./lib/TimeoutError"); */;

/* removed: var _$promise_40 = require("./lib/promise"); */;

/* removed: var _$events_13 = require("events"); */;

/* removed: var _$Deferred_37 = require("./lib/Deferred"); */;

_$events_36.EventEmitter = _$events_13;
_$events_36.timeout = _$timeout_41;
/* common-shake removed: exports.delay = */ void _$delay_39;
/* common-shake removed: exports.TimeoutError = */ void _$TimeoutError_38;
_$events_36.promise = _$promise_40;
_$events_36.Deferred = _$Deferred_37;

var _$escaping_47 = {};
"use strict";

_$escaping_47.detect = function detect(local) {
  if (!local) {
    return false;
  } // Remove all escaped sequences


  var tmp = local.replace(/\\20/g, "").replace(/\\22/g, "").replace(/\\26/g, "").replace(/\\27/g, "").replace(/\\2f/g, "").replace(/\\3a/g, "").replace(/\\3c/g, "").replace(/\\3e/g, "").replace(/\\40/g, "").replace(/\\5c/g, ""); // Detect if we have unescaped sequences

  var search = tmp.search(/[ "&'/:<>@\\]/g);

  if (search === -1) {
    return false;
  }

  return true;
};
/**
 * Escape the local part of a JID.
 *
 * @see http://xmpp.org/extensions/xep-0106.html
 * @param String local local part of a jid
 * @return An escaped local part
 */


_$escaping_47.escape = function escape(local) {
  if (local === null) {
    return null;
  }

  return local.replace(/^\s+|\s+$/g, "").replace(/\\/g, "\\5c").replace(/ /g, "\\20").replace(/"/g, "\\22").replace(/&/g, "\\26").replace(/'/g, "\\27").replace(/\//g, "\\2f").replace(/:/g, "\\3a").replace(/</g, "\\3c").replace(/>/g, "\\3e").replace(/@/g, "\\40").replace(/\3a/g, "\x05c3a");
};
/**
 * Unescape a local part of a JID.
 *
 * @see http://xmpp.org/extensions/xep-0106.html
 * @param String local local part of a jid
 * @return unescaped local part
 */


_$escaping_47.unescape = function unescape(local) {
  if (local === null) {
    return null;
  }

  return local.replace(/\\20/g, " ").replace(/\\22/g, '"').replace(/\\26/g, "&").replace(/\\27/g, "'").replace(/\\2f/g, "/").replace(/\\3a/g, ":").replace(/\\3c/g, "<").replace(/\\3e/g, ">").replace(/\\40/g, "@").replace(/\\5c/g, "\\");
};

"use strict";

/* removed: var _$escaping_47 = require("./escaping"); */;
/**
 * JID implements
 * - XMPP addresses according to RFC6122
 * - XEP-0106: JID Escaping
 *
 * @see http://tools.ietf.org/html/rfc6122#section-2
 * @see http://xmpp.org/extensions/xep-0106.html
 */


var JID = /*#__PURE__*/function () {
  function JID(local, domain, resource) {
    if (typeof domain !== "string" || !domain) {
      throw new TypeError("Invalid domain.");
    }

    this.setDomain(domain);
    this.setLocal(typeof local === "string" ? local : "");
    this.setResource(typeof resource === "string" ? resource : "");
  }

  var _proto = JID.prototype;

  _proto[Symbol.toPrimitive] = function (hint) {
    if (hint === "number") {
      return NaN;
    }

    return this.toString();
  };

  _proto.toString = function toString(unescape) {
    var s = this._domain;

    if (this._local) {
      s = this.getLocal(unescape) + "@" + s;
    }

    if (this._resource) {
      s = s + "/" + this._resource;
    }

    return s;
  }
  /**
   * Convenience method to distinguish users
   * */
  ;

  _proto.bare = function bare() {
    if (this._resource) {
      return new JID(this._local, this._domain, null);
    }

    return this;
  }
  /**
   * Comparison function
   * */
  ;

  _proto.equals = function equals(other) {
    return this._local === other._local && this._domain === other._domain && this._resource === other._resource;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-localpart
   * */
  ;

  _proto.setLocal = function setLocal(local, escape) {
    escape = escape || _$escaping_47.detect(local);

    if (escape) {
      local = _$escaping_47.escape(local);
    }

    this._local = local && local.toLowerCase();
    return this;
  };

  _proto.getLocal = function getLocal(unescape) {
    unescape = unescape || false;
    var local = null;
    local = unescape ? _$escaping_47.unescape(this._local) : this._local;
    return local;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-domain
   */
  ;

  _proto.setDomain = function setDomain(domain) {
    this._domain = domain.toLowerCase();
    return this;
  };

  _proto.getDomain = function getDomain() {
    return this._domain;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-resourcepart
   */
  ;

  _proto.setResource = function setResource(resource) {
    this._resource = resource;
    return this;
  };

  _proto.getResource = function getResource() {
    return this._resource;
  };

  return JID;
}();

Object.defineProperty(JID.prototype, "local", {
  get: JID.prototype.getLocal,
  set: JID.prototype.setLocal
});
Object.defineProperty(JID.prototype, "domain", {
  get: JID.prototype.getDomain,
  set: JID.prototype.setDomain
});
Object.defineProperty(JID.prototype, "resource", {
  get: JID.prototype.getResource,
  set: JID.prototype.setResource
});
var _$JID_46 = JID;

"use strict";

/* removed: var _$JID_46 = require("../lib/JID"); */;

var _$parse_48 = function parse(s) {
  var local;
  var resource;
  var resourceStart = s.indexOf("/");

  if (resourceStart !== -1) {
    resource = s.slice(resourceStart + 1);
    s = s.slice(0, resourceStart);
  }

  var atStart = s.indexOf("@");

  if (atStart !== -1) {
    local = s.slice(0, atStart);
    s = s.slice(atStart + 1);
  }

  return new _$JID_46(local, s, resource);
};

var _$jid_45 = {};
"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var _construct2 = _$_interopRequireDefault_6(_$construct_2);

/* removed: var _$JID_46 = require("./lib/JID"); */;

/* removed: var _$escaping_47 = require("./lib/escaping"); */;

/* removed: var _$parse_48 = require("./lib/parse"); */;

function jid() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (!args[1] && !args[2]) {
    return _$parse_48.apply(void 0, args);
  }

  return (0, _construct2.default)(_$JID_46, args);
}

_$jid_45 = jid.bind();
_$jid_45.jid = jid;
_$jid_45.JID = _$JID_46;

_$jid_45.equal = function equal(a, b) {
  return a.equals(b);
};

_$jid_45.detectEscape = _$escaping_47.detect;
_$jid_45.escapeLocal = _$escaping_47.escape;
_$jid_45.unescapeLocal = _$escaping_47.unescape;
_$jid_45.parse = _$parse_48;

var _$escape_19 = {};
'use strict';

var escapeXMLTable = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;'
};

function escapeXMLReplace(match) {
  return escapeXMLTable[match];
}

var unescapeXMLTable = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'"
};

function unescapeXMLReplace(match) {
  if (match[1] === '#') {
    var num;

    if (match[2] === 'x') {
      num = parseInt(match.slice(3), 16);
    } else {
      num = parseInt(match.slice(2), 10);
    } // https://www.w3.org/TR/xml/#NT-Char defines legal XML characters:
    // #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]


    if (num === 0x9 || num === 0xA || num === 0xD || num >= 0x20 && num <= 0xD7FF || num >= 0xE000 && num <= 0xFFFD || num >= 0x10000 && num <= 0x10FFFF) {
      return String.fromCodePoint(num);
    }

    throw new Error('Illegal XML character 0x' + num.toString(16));
  }

  if (unescapeXMLTable[match]) {
    return unescapeXMLTable[match] || match;
  }

  throw new Error('Illegal XML entity ' + match);
}

_$escape_19.escapeXML = function escapeXML(s) {
  return s.replace(/&|<|>|"|'/g, escapeXMLReplace);
};

_$escape_19.unescapeXML = function unescapeXML(s) {
  var result = '';
  var start = -1;
  var end = -1;
  var previous = 0;

  while ((start = s.indexOf('&', previous)) !== -1 && (end = s.indexOf(';', start + 1)) !== -1) {
    result = result + s.substring(previous, start) + unescapeXMLReplace(s.substring(start, end + 1));
    previous = end + 1;
  } // shortcut if loop never entered:
  // return the original string without creating new objects


  if (previous === 0) return s; // push the remaining characters

  result = result + s.substring(previous);
  return result;
};

_$escape_19.escapeXMLText = function escapeXMLText(s) {
  return s.replace(/&|<|>/g, escapeXMLReplace);
};

_$escape_19.unescapeXMLText = function unescapeXMLText(s) {
  return s.replace(/&(amp|#38|lt|#60|gt|#62);/g, unescapeXMLReplace);
};

var _$equal_18 = {};
'use strict';

function nameEqual(a, b) {
  return a.name === b.name;
}

function attrsEqual(a, b) {
  var attrs = a.attrs;
  var keys = Object.keys(attrs);
  var length = keys.length;
  if (length !== Object.keys(b.attrs).length) return false;

  for (var i = 0, l = length; i < l; i++) {
    var key = keys[i];
    var value = attrs[key];

    if (value == null || b.attrs[key] == null) {
      // === null || undefined
      if (value !== b.attrs[key]) return false;
    } else if (value.toString() !== b.attrs[key].toString()) {
      return false;
    }
  }

  return true;
}

function childrenEqual(a, b) {
  var children = a.children;
  var length = children.length;
  if (length !== b.children.length) return false;

  for (var i = 0, l = length; i < l; i++) {
    var child = children[i];

    if (typeof child === 'string') {
      if (child !== b.children[i]) return false;
    } else {
      if (!child.equals(b.children[i])) return false;
    }
  }

  return true;
}

function equal(a, b) {
  if (!nameEqual(a, b)) return false;
  if (!attrsEqual(a, b)) return false;
  if (!childrenEqual(a, b)) return false;
  return true;
}

_$equal_18.name = nameEqual;
_$equal_18.attrs = attrsEqual;
_$equal_18.children = childrenEqual;
_$equal_18.equal = equal;

'use strict';

var _$clone_17 = function clone(el) {
  var clone = new el.constructor(el.name, el.attrs);

  for (var i = 0; i < el.children.length; i++) {
    var child = el.children[i];
    clone.cnode(child.clone ? child.clone() : child);
  }

  return clone;
};

'use strict';

/* removed: var _$escape_19 = require('./escape'); */;

var escapeXML = _$escape_19.escapeXML;
var escapeXMLText = _$escape_19.escapeXMLText;

/* removed: var _$equal_18 = require('./equal'); */;

var __equal_16 = _$equal_18.equal;
var __nameEqual_16 = _$equal_18.name;
var __attrsEqual_16 = _$equal_18.attrs;
var __childrenEqual_16 = _$equal_18.children;

/* removed: var _$clone_17 = require('./clone'); */;
/**
 * Element
 *
 * Attributes are in the element.attrs object. Children is a list of
 * either other Elements or Strings for text content.
 **/


function Element(name, attrs) {
  this.name = name;
  this.parent = null;
  this.children = [];
  this.attrs = {};
  this.setAttrs(attrs);
}
/* Accessors */

/**
 * if (element.is('message', 'jabber:client')) ...
 **/


Element.prototype.is = function (name, xmlns) {
  return this.getName() === name && (!xmlns || this.getNS() === xmlns);
};
/* without prefix */


Element.prototype.getName = function () {
  if (this.name.indexOf(':') >= 0) {
    return this.name.substr(this.name.indexOf(':') + 1);
  } else {
    return this.name;
  }
};
/**
 * retrieves the namespace of the current element, upwards recursively
 **/


Element.prototype.getNS = function () {
  if (this.name.indexOf(':') >= 0) {
    var prefix = this.name.substr(0, this.name.indexOf(':'));
    return this.findNS(prefix);
  }

  return this.findNS();
};
/**
 * find the namespace to the given prefix, upwards recursively
 **/


Element.prototype.findNS = function (prefix) {
  if (!prefix) {
    /* default namespace */
    if (this.attrs.xmlns) {
      return this.attrs.xmlns;
    } else if (this.parent) {
      return this.parent.findNS();
    }
  } else {
    /* prefixed namespace */
    var attr = 'xmlns:' + prefix;

    if (this.attrs[attr]) {
      return this.attrs[attr];
    } else if (this.parent) {
      return this.parent.findNS(prefix);
    }
  }
};
/**
 * Recursiverly gets all xmlns defined, in the form of {url:prefix}
 **/


Element.prototype.getXmlns = function () {
  var namespaces = {};

  if (this.parent) {
    namespaces = this.parent.getXmlns();
  }

  for (var attr in this.attrs) {
    var m = attr.match('xmlns:?(.*)'); // eslint-disable-next-line  no-prototype-builtins

    if (this.attrs.hasOwnProperty(attr) && m) {
      namespaces[this.attrs[attr]] = m[1];
    }
  }

  return namespaces;
};

Element.prototype.setAttrs = function (attrs) {
  if (typeof attrs === 'string') {
    this.attrs.xmlns = attrs;
  } else if (attrs) {
    Object.keys(attrs).forEach(function (key) {
      this.attrs[key] = attrs[key];
    }, this);
  }
};
/**
 * xmlns can be null, returns the matching attribute.
 **/


Element.prototype.getAttr = function (name, xmlns) {
  if (!xmlns) {
    return this.attrs[name];
  }

  var namespaces = this.getXmlns();

  if (!namespaces[xmlns]) {
    return null;
  }

  return this.attrs[[namespaces[xmlns], name].join(':')];
};
/**
 * xmlns can be null
 **/


Element.prototype.getChild = function (name, xmlns) {
  return this.getChildren(name, xmlns)[0];
};
/**
 * xmlns can be null
 **/


Element.prototype.getChildren = function (name, xmlns) {
  var result = [];

  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];

    if (child.getName && child.getName() === name && (!xmlns || child.getNS() === xmlns)) {
      result.push(child);
    }
  }

  return result;
};
/**
 * xmlns and recursive can be null
 **/


Element.prototype.getChildByAttr = function (attr, val, xmlns, recursive) {
  return this.getChildrenByAttr(attr, val, xmlns, recursive)[0];
};
/**
 * xmlns and recursive can be null
 **/


Element.prototype.getChildrenByAttr = function (attr, val, xmlns, recursive) {
  var result = [];

  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];

    if (child.attrs && child.attrs[attr] === val && (!xmlns || child.getNS() === xmlns)) {
      result.push(child);
    }

    if (recursive && child.getChildrenByAttr) {
      result.push(child.getChildrenByAttr(attr, val, xmlns, true));
    }
  }

  if (recursive) {
    result = [].concat.apply([], result);
  }

  return result;
};

Element.prototype.getChildrenByFilter = function (filter, recursive) {
  var result = [];

  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];

    if (filter(child)) {
      result.push(child);
    }

    if (recursive && child.getChildrenByFilter) {
      result.push(child.getChildrenByFilter(filter, true));
    }
  }

  if (recursive) {
    result = [].concat.apply([], result);
  }

  return result;
};

Element.prototype.getText = function () {
  var text = '';

  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];

    if (typeof child === 'string' || typeof child === 'number') {
      text += child;
    }
  }

  return text;
};

Element.prototype.getChildText = function (name, xmlns) {
  var child = this.getChild(name, xmlns);
  return child ? child.getText() : null;
};
/**
 * Return all direct descendents that are Elements.
 * This differs from `getChildren` in that it will exclude text nodes,
 * processing instructions, etc.
 */


Element.prototype.getChildElements = function () {
  return this.getChildrenByFilter(function (child) {
    return child instanceof Element;
  });
};
/* Builder */

/** returns uppermost parent */


Element.prototype.root = function () {
  if (this.parent) {
    return this.parent.root();
  }

  return this;
};

Element.prototype.tree = Element.prototype.root;
/** just parent or itself */

Element.prototype.up = function () {
  if (this.parent) {
    return this.parent;
  }

  return this;
};
/** create child node and return it */


Element.prototype.c = function (name, attrs) {
  return this.cnode(new Element(name, attrs));
};

Element.prototype.cnode = function (child) {
  this.children.push(child);

  if (typeof child === 'object') {
    child.parent = this;
  }

  return child;
};
/** add text node and return element */


Element.prototype.t = function (text) {
  this.children.push(text);
  return this;
};
/* Manipulation */

/**
 * Either:
 *   el.remove(childEl)
 *   el.remove('author', 'urn:...')
 */


Element.prototype.remove = function (el, xmlns) {
  var filter;

  if (typeof el === 'string') {
    /* 1st parameter is tag name */
    filter = function filter(child) {
      return !(child.is && child.is(el, xmlns));
    };
  } else {
    /* 1st parameter is element */
    filter = function filter(child) {
      return child !== el;
    };
  }

  this.children = this.children.filter(filter);
  return this;
};

Element.prototype.clone = function () {
  return _$clone_17(this);
};

Element.prototype.text = function (val) {
  if (val && this.children.length === 1) {
    this.children[0] = val;
    return this;
  }

  return this.getText();
};

Element.prototype.attr = function (attr, val) {
  if (typeof val !== 'undefined' || val === null) {
    if (!this.attrs) {
      this.attrs = {};
    }

    this.attrs[attr] = val;
    return this;
  }

  return this.attrs[attr];
};
/* Serialization */


Element.prototype.toString = function () {
  var s = '';
  this.write(function (c) {
    s += c;
  });
  return s;
};

Element.prototype.toJSON = function () {
  return {
    name: this.name,
    attrs: this.attrs,
    children: this.children.map(function (child) {
      return child && child.toJSON ? child.toJSON() : child;
    })
  };
};

Element.prototype._addChildren = function (writer) {
  writer('>');

  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];
    /* Skip null/undefined */

    if (child || child === 0) {
      if (child.write) {
        child.write(writer);
      } else if (typeof child === 'string') {
        writer(escapeXMLText(child));
      } else if (child.toString) {
        writer(escapeXMLText(child.toString(10)));
      }
    }
  }

  writer('</');
  writer(this.name);
  writer('>');
};

Element.prototype.write = function (writer) {
  writer('<');
  writer(this.name);

  for (var k in this.attrs) {
    var v = this.attrs[k];

    if (v != null) {
      // === null || undefined
      writer(' ');
      writer(k);
      writer('="');

      if (typeof v !== 'string') {
        v = v.toString();
      }

      writer(escapeXML(v));
      writer('"');
    }
  }

  if (this.children.length === 0) {
    writer('/>');
  } else {
    this._addChildren(writer);
  }
};

Element.prototype.nameEquals = function (el) {
  return __nameEqual_16(this, el);
};

Element.prototype.attrsEquals = function (el) {
  return __attrsEqual_16(this, el);
};

Element.prototype.childrenEquals = function (el) {
  return __childrenEqual_16(this, el);
};

Element.prototype.equals = function (el) {
  return __equal_16(this, el);
};

var _$Element_16 = Element;

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_73 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$Element_16 = require("ltx/lib/Element"); */;

var __Element_73 = /*#__PURE__*/function (_Element2) {
  (0, ___inheritsLoose2_73.default)(Element, _Element2);

  function Element() {
    return _Element2.apply(this, arguments) || this;
  }

  var _proto = Element.prototype;

  _proto.setAttrs = function setAttrs(attrs) {
    var _this = this;

    if (typeof attrs === "string") {
      this.attrs.xmlns = attrs;
    } else if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        // https://github.com/facebook/react/pull/4596
        // https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source
        if (key === "__source" || key === "__self") return;
        var val = attrs[key];
        if (val !== undefined && val !== null) _this.attrs[key.toString()] = val.toString();
      }, this);
    }
  };

  _proto.append = function append(nodes) {
    var _this2 = this;

    nodes = Array.isArray(nodes) ? nodes : [nodes];
    nodes.forEach(function (node) {
      _this2.children.push(node);

      if (typeof node === "object") {
        node.parent = _this2;
      }
    });
    return this;
  };

  _proto.prepend = function prepend(nodes) {
    var _this3 = this;

    nodes = Array.isArray(nodes) ? nodes : [nodes];
    nodes.forEach(function (node) {
      _this3.children.unshift(node);

      if (typeof node === "object") {
        node.parent = _this3;
      }
    });
    return this;
  };

  return Element;
}(_$Element_16);

var _$Element_73 = __Element_73;

"use strict";

/* removed: var _$Element_73 = require("./Element"); */;

function append(el, child) {
  if (child === false || child === null || child === undefined) return;

  if (child instanceof _$Element_73) {
    el.append(child);
  } else if (Array.isArray(child)) {
    child.forEach(function (c) {
      return append(el, c);
    });
  } else {
    el.append(String(child));
  }
}

function x(name, attrs) {
  var el = new _$Element_73(name, attrs); // eslint-disable-next-line unicorn/no-for-loop

  for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
    append(el, i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2]);
  }

  return el;
}

var _$x_77 = x;

"use strict";

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var _$_assertThisInitialized_1 = _assertThisInitialized;

var _$inherits_browser_14 = {};
"use strict";

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  _$inherits_browser_14 = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  _$inherits_browser_14 = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;

      var TempCtor = function TempCtor() {};

      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

var _$ltx_20 = {};
'use strict';

/* removed: var _$inherits_browser_14 = require('inherits'); */;

var __EventEmitter_20 = _$events_13.EventEmitter;

var unescapeXML = _$escape_19.unescapeXML;

var STATE_TEXT = 0;
var STATE_IGNORE_COMMENT = 1;
var STATE_IGNORE_INSTRUCTION = 2;
var STATE_TAG_NAME = 3;
var STATE_TAG = 4;
var STATE_ATTR_NAME = 5;
var STATE_ATTR_EQ = 6;
var STATE_ATTR_QUOT = 7;
var STATE_ATTR_VALUE = 8;
var STATE_CDATA = 9;
var STATE_IGNORE_CDATA = 10;

var SaxLtx = _$ltx_20 = function SaxLtx() {
  __EventEmitter_20.call(this);
  var state = STATE_TEXT;
  var remainder;
  var tagName;
  var attrs;
  var endTag;
  var selfClosing;
  var attrQuote;
  var attrQuoteChar;
  var recordStart = 0;
  var attrName;

  this._handleTagOpening = function (endTag, tagName, attrs) {
    if (!endTag) {
      this.emit('startElement', tagName, attrs);

      if (selfClosing) {
        this.emit('endElement', tagName);
      }
    } else {
      this.emit('endElement', tagName);
    }
  };

  this.write = function (data) {
    if (typeof data !== 'string') {
      data = data.toString();
    }

    var pos = 0;
    /* Anything from previous write()? */

    if (remainder) {
      data = remainder + data;
      pos += remainder.length;
      remainder = null;
    }

    function endRecording() {
      if (typeof recordStart === 'number') {
        var recorded = data.substring(recordStart, pos);
        recordStart = undefined;
        return recorded;
      }
    }

    for (; pos < data.length; pos++) {
      if (state === STATE_TEXT) {
        // if we're looping through text, fast-forward using indexOf to
        // the next '<' character
        var lt = data.indexOf('<', pos);

        if (lt !== -1 && pos !== lt) {
          pos = lt;
        }
      } else if (state === STATE_ATTR_VALUE) {
        // if we're looping through an attribute, fast-forward using
        // indexOf to the next end quote character
        var quot = data.indexOf(attrQuoteChar, pos);

        if (quot !== -1) {
          pos = quot;
        }
      } else if (state === STATE_IGNORE_COMMENT) {
        // if we're looping through a comment, fast-forward using
        // indexOf to the first end-comment character
        var endcomment = data.indexOf('-->', pos);

        if (endcomment !== -1) {
          pos = endcomment + 2; // target the '>' character
        }
      } else if (state === STATE_IGNORE_CDATA) {
        // if we're looping through a CDATA, fast-forward using
        // indexOf to the first end-CDATA character ]]>
        var endCDATA = data.indexOf(']]>', pos);

        if (endCDATA !== -1) {
          pos = endCDATA + 2; // target the '>' character
        }
      }

      var c = data.charCodeAt(pos);

      switch (state) {
        case STATE_TEXT:
          if (c === 60
          /* < */
          ) {
              var text = endRecording();

              if (text) {
                this.emit('text', unescapeXML(text));
              }

              state = STATE_TAG_NAME;
              recordStart = pos + 1;
              attrs = {};
            }

          break;

        case STATE_CDATA:
          if (c === 93
          /* ] */
          && data.substr(pos + 1, 2) === ']>') {
            var cData = endRecording();

            if (cData) {
              this.emit('text', cData);
            }

            state = STATE_TEXT;
          }

          break;

        case STATE_TAG_NAME:
          if (c === 47
          /* / */
          && recordStart === pos) {
            recordStart = pos + 1;
            endTag = true;
          } else if (c === 33
          /* ! */
          ) {
              if (data.substr(pos + 1, 7) === '[CDATA[') {
                recordStart = pos + 8;
                state = STATE_CDATA;
              } else {
                recordStart = undefined;
                state = STATE_IGNORE_COMMENT;
              }
            } else if (c === 63
          /* ? */
          ) {
              recordStart = undefined;
              state = STATE_IGNORE_INSTRUCTION;
            } else if (c <= 32 || c === 47
          /* / */
          || c === 62
          /* > */
          ) {
              tagName = endRecording();
              pos--;
              state = STATE_TAG;
            }

          break;

        case STATE_IGNORE_COMMENT:
          if (c === 62
          /* > */
          ) {
              var prevFirst = data.charCodeAt(pos - 1);
              var prevSecond = data.charCodeAt(pos - 2);

              if (prevFirst === 45
              /* - */
              && prevSecond === 45
              /* - */
              || prevFirst === 93
              /* ] */
              && prevSecond === 93
              /* ] */
              ) {
                state = STATE_TEXT;
              }
            }

          break;

        case STATE_IGNORE_INSTRUCTION:
          if (c === 62
          /* > */
          ) {
              var prev = data.charCodeAt(pos - 1);

              if (prev === 63
              /* ? */
              ) {
                  state = STATE_TEXT;
                }
            }

          break;

        case STATE_TAG:
          if (c === 62
          /* > */
          ) {
              this._handleTagOpening(endTag, tagName, attrs);

              tagName = undefined;
              attrs = undefined;
              endTag = undefined;
              selfClosing = undefined;
              state = STATE_TEXT;
              recordStart = pos + 1;
            } else if (c === 47
          /* / */
          ) {
              selfClosing = true;
            } else if (c > 32) {
            recordStart = pos;
            state = STATE_ATTR_NAME;
          }

          break;

        case STATE_ATTR_NAME:
          if (c <= 32 || c === 61
          /* = */
          ) {
              attrName = endRecording();
              pos--;
              state = STATE_ATTR_EQ;
            }

          break;

        case STATE_ATTR_EQ:
          if (c === 61
          /* = */
          ) {
              state = STATE_ATTR_QUOT;
            }

          break;

        case STATE_ATTR_QUOT:
          if (c === 34
          /* " */
          || c === 39
          /* ' */
          ) {
              attrQuote = c;
              attrQuoteChar = c === 34 ? '"' : "'";
              state = STATE_ATTR_VALUE;
              recordStart = pos + 1;
            }

          break;

        case STATE_ATTR_VALUE:
          if (c === attrQuote) {
            var value = unescapeXML(endRecording());
            attrs[attrName] = value;
            attrName = undefined;
            state = STATE_TAG;
          }

          break;
      }
    }

    if (typeof recordStart === 'number' && recordStart <= data.length) {
      remainder = data.slice(recordStart);
      recordStart = 0;
    }
  };
};

_$inherits_browser_14(SaxLtx, __EventEmitter_20);

SaxLtx.prototype.end = function (data) {
  if (data) {
    this.write(data);
  }
  /* Uh, yeah */


  this.write = function () {};
};

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_75 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

var ___wrapNativeSuper2_75 = _$_interopRequireDefault_6(_$wrapNativeSuper_11);

var _$XMLError_75 = /*#__PURE__*/function (_Error) {
  (0, ___inheritsLoose2_75.default)(XMLError, _Error);

  function XMLError() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Error.call.apply(_Error, [this].concat(args)) || this;
    _this.name = "XMLError";
    return _this;
  }

  return XMLError;
}( /*#__PURE__*/(0, ___wrapNativeSuper2_75.default)(Error));

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var _assertThisInitialized2 = _$_interopRequireDefault_6(_$_assertThisInitialized_1);

var ___inheritsLoose2_74 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$ltx_20 = require("ltx/lib/parsers/ltx"); */;

/* removed: var _$Element_73 = require("./Element"); */;

/* removed: var _$events_13 = require("events"); */;

/* removed: var _$XMLError_75 = require("./XMLError"); */;

var Parser = /*#__PURE__*/function (_EventEmitter) {
  (0, ___inheritsLoose2_74.default)(Parser, _EventEmitter);

  function Parser() {
    var _this;

    _this = _EventEmitter.call(this) || this;
    var parser = new _$ltx_20();
    _this.root = null;
    _this.cursor = null;
    parser.on("startElement", _this.onStartElement.bind((0, _assertThisInitialized2.default)(_this)));
    parser.on("endElement", _this.onEndElement.bind((0, _assertThisInitialized2.default)(_this)));
    parser.on("text", _this.onText.bind((0, _assertThisInitialized2.default)(_this)));
    _this.parser = parser;
    return _this;
  }

  var _proto = Parser.prototype;

  _proto.onStartElement = function onStartElement(name, attrs) {
    var element = new _$Element_73(name, attrs);
    var root = this.root,
        cursor = this.cursor;

    if (!root) {
      this.root = element;
      this.emit("start", element);
    } else if (cursor !== root) {
      cursor.append(element);
    }

    this.cursor = element;
  };

  _proto.onEndElement = function onEndElement(name) {
    var root = this.root,
        cursor = this.cursor;

    if (name !== cursor.name) {
      // <foo></bar>
      this.emit("error", new _$XMLError_75(cursor.name + " must be closed."));
      return;
    }

    if (cursor === root) {
      this.emit("end", root);
      return;
    }

    if (!cursor.parent) {
      cursor.parent = root;
      this.emit("element", cursor);
      this.cursor = root;
      return;
    }

    this.cursor = cursor.parent;
  };

  _proto.onText = function onText(str) {
    var cursor = this.cursor;

    if (!cursor) {
      this.emit("error", new _$XMLError_75(str + " must be a child."));
      return;
    }

    cursor.t(str);
  };

  _proto.write = function write(data) {
    this.parser.write(data);
  };

  _proto.end = function end(data) {
    if (data) {
      this.parser.write(data);
    }
  };

  return Parser;
}(_$events_13);

Parser.XMLError = _$XMLError_75;
var _$Parser_74 = Parser;

var _$xml_72 = {};
"use strict";

/* removed: var _$x_77 = require("./lib/x"); */;

/* removed: var _$Element_73 = require("./lib/Element"); */;

/* removed: var _$Parser_74 = require("./lib/Parser"); */;

var __escapeXML_72 = _$escape_19.escapeXML,
    __unescapeXML_72 = _$escape_19.unescapeXML,
    __escapeXMLText_72 = _$escape_19.escapeXMLText,
    unescapeXMLText = _$escape_19.unescapeXMLText;

/* removed: var _$XMLError_75 = require("./lib/XMLError"); */;

function xml() {
  return _$x_77.apply(void 0, arguments);
}

_$xml_72 = xml;
Object.assign(_$xml_72, {
  x: _$x_77,
  Element: _$Element_73,
  Parser: _$Parser_74,
  escapeXML: __escapeXML_72,
  unescapeXML: __unescapeXML_72,
  escapeXMLText: __escapeXMLText_72,
  unescapeXMLText: unescapeXMLText,
  XMLError: _$XMLError_75
});

"use strict"; // https://xmpp.org/rfcs/rfc6120.html#rfc.section.4.9.2

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_35 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

var ___wrapNativeSuper2_35 = _$_interopRequireDefault_6(_$wrapNativeSuper_11);

var XMPPError = /*#__PURE__*/function (_Error) {
  (0, ___inheritsLoose2_35.default)(XMPPError, _Error);

  function XMPPError(condition, text, application) {
    var _this;

    _this = _Error.call(this, condition + (text ? " - " + text : "")) || this;
    _this.name = "XMPPError";
    _this.condition = condition;
    _this.text = text;
    _this.application = application;
    return _this;
  }

  XMPPError.fromElement = function fromElement(element) {
    var _element$children = element.children,
        condition = _element$children[0],
        second = _element$children[1],
        third = _element$children[2];
    var text;
    var application;

    if (second) {
      if (second.is("text")) {
        text = second;
      } else if (second) {
        application = second;
      }

      if (third) application = third;
    }

    var error = new this(condition.name, text ? text.text() : "", application);
    error.element = element;
    return error;
  };

  return XMPPError;
}( /*#__PURE__*/(0, ___wrapNativeSuper2_35.default)(Error));

var _$XMPPError_35 = XMPPError;

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_33 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$XMPPError_35 = require("@xmpp/error"); */; // https://xmpp.org/rfcs/rfc6120.html#streams-error


var StreamError = /*#__PURE__*/function (_XMPPError) {
  (0, ___inheritsLoose2_33.default)(StreamError, _XMPPError);

  function StreamError() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _XMPPError.call.apply(_XMPPError, [this].concat(args)) || this;
    _this.name = "StreamError";
    return _this;
  }

  return StreamError;
}(_$XMPPError_35);

var _$StreamError_33 = StreamError;

var _$util_34 = {};
"use strict";

function parseURI(URI) {
  var _URL = new URL(URI),
      port = _URL.port,
      hostname = _URL.hostname,
      protocol = _URL.protocol; // https://github.com/nodejs/node/issues/12410#issuecomment-294138912


  if (hostname === "[::1]") {
    hostname = "::1";
  }

  return {
    port: port,
    hostname: hostname,
    protocol: protocol
  };
}

function parseHost(host) {
  var _parseURI = parseURI("http://" + host),
      port = _parseURI.port,
      hostname = _parseURI.hostname;

  return {
    port: port,
    hostname: hostname
  };
}

function parseService(service) {
  return service.includes("://") ? parseURI(service) : parseHost(service);
}

Object.assign(_$util_34, {
  parseURI: parseURI,
  parseHost: parseHost,
  parseService: parseService
});

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_32 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

function _empty() {}

var __EventEmitter_32 = _$events_36.EventEmitter,
    __promise_32 = _$events_36.promise;

function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}

/* removed: var _$jid_45 = require("@xmpp/jid"); */;

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

/* removed: var _$xml_72 = require("@xmpp/xml"); */;

function _continue(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

/* removed: var _$StreamError_33 = require("./lib/StreamError"); */;

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var __parseHost_32 = _$util_34.parseHost,
    __parseService_32 = _$util_34.parseService;

function _continueIgnored(value) {
  if (value && value.then) {
    return value.then(_empty);
  }
}

var NS_STREAM = "urn:ietf:params:xml:ns:xmpp-streams";
var NS_JABBER_STREAM = "http://etherx.jabber.org/streams";

var Connection = /*#__PURE__*/function (_EventEmitter) {
  (0, ___inheritsLoose2_32.default)(Connection, _EventEmitter);

  function Connection(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _EventEmitter.call(this) || this;
    _this.jid = null;
    _this.timeout = 2000;
    _this.options = options;
    _this.socketListeners = Object.create(null);
    _this.parserListeners = Object.create(null);
    _this.status = "offline";
    _this.socket = null;
    _this.parser = null;
    _this.root = null;
    return _this;
  }

  var _proto = Connection.prototype;

  _proto._reset = function _reset() {
    this.jid = null;
    this.status = "offline";

    this._detachSocket();

    this._detachParser();
  };

  _proto._streamError = function _streamError(condition, children) {
    try {
      var _this3 = this;

      return _continue(_catch(function () {
        return _awaitIgnored(_this3.send( // prettier-ignore
        _$xml_72('stream:error', {}, [_$xml_72(condition, {
          xmlns: NS_STREAM
        }, children)])));
      }, _empty), function () {
        return _this3._end();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto._onData = function _onData(data) {
    var str = data.toString("utf8");
    this.emit("input", str);
    this.parser.write(str);
  };

  _proto._onParserError = function _onParserError(error) {
    // https://xmpp.org/rfcs/rfc6120.html#streams-error-conditions-bad-format
    // "This error can be used instead of the more specific XML-related errors,
    // such as <bad-namespace-prefix/>, <invalid-xml/>, <not-well-formed/>, <restricted-xml/>,
    // and <unsupported-encoding/>. However, the more specific errors are RECOMMENDED."
    this._streamError("bad-format");

    this._detachParser();

    this.emit("error", error);
  };

  _proto._attachSocket = function _attachSocket(socket) {
    var _this4 = this;

    this.socket = socket;
    var listeners = this.socketListeners;
    listeners.data = this._onData.bind(this);

    listeners.close = function (dirty, event) {
      _this4._reset();

      _this4._status("disconnect", {
        clean: !dirty,
        event: event
      });
    };

    listeners.connect = function () {
      _this4._status("connect");
    };

    listeners.error = function (error) {
      _this4.emit("error", error);
    };

    this.socket.on("close", listeners.close);
    this.socket.on("data", listeners.data);
    this.socket.on("error", listeners.error);
    this.socket.on("connect", listeners.connect);
  };

  _proto._detachSocket = function _detachSocket() {
    var socketListeners = this.socketListeners,
        socket = this.socket;
    Object.getOwnPropertyNames(socketListeners).forEach(function (k) {
      socket.removeListener(k, socketListeners[k]);
      delete socketListeners[k];
    });
    this.socket = null;
    return socket;
  };

  _proto._onElement = function _onElement(element) {
    var isStreamError = element.is("error", NS_JABBER_STREAM);

    if (isStreamError) {
      this._onStreamError(element);
    }

    this.emit("element", element);
    this.emit(this.isStanza(element) ? "stanza" : "nonza", element);

    if (isStreamError) {
      // "Stream Errors Are Unrecoverable"
      // "The entity that receives the stream error then SHALL close the stream"
      this._end();
    }
  } // https://xmpp.org/rfcs/rfc6120.html#streams-error
  ;

  _proto._onStreamError = function _onStreamError(element) {
    var error = _$StreamError_33.fromElement(element);

    if (error.condition === "see-other-host") {
      return this._onSeeOtherHost(error);
    }

    this.emit("error", error);
  } // https://xmpp.org/rfcs/rfc6120.html#streams-error-conditions-see-other-host
  ;

  _proto._onSeeOtherHost = function _onSeeOtherHost(error) {
    try {
      var _this6 = this;

      var _parseService = __parseService_32(_this6.options.service),
          protocol = _parseService.protocol;

      var host = error.element.getChildText("see-other-host");

      var _parseHost = __parseHost_32(host),
          port = _parseHost.port;

      var service;
      service = port ? (protocol || "xmpp:") + "//" + host : (protocol ? protocol + "//" : "") + host;
      return _continueIgnored(_catch(function () {
        return _await(__promise_32(_this6, "disconnect"), function () {
          var _this6$options = _this6.options,
              domain = _this6$options.domain,
              lang = _this6$options.lang;
          return _await(_this6.connect(service), function () {
            return _awaitIgnored(_this6.open({
              domain: domain,
              lang: lang
            }));
          });
        });
      }, function (err) {
        _this6.emit("error", err);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto._attachParser = function _attachParser(parser) {
    var _this7 = this;

    this.parser = parser;
    var listeners = this.parserListeners;
    listeners.element = this._onElement.bind(this);
    listeners.error = this._onParserError.bind(this);

    listeners.end = function (element) {
      _this7._detachParser();

      _this7._status("close", element);
    };

    listeners.start = function (element) {
      _this7._status("open", element);
    };

    this.parser.on("error", listeners.error);
    this.parser.on("element", listeners.element);
    this.parser.on("end", listeners.end);
    this.parser.on("start", listeners.start);
  };

  _proto._detachParser = function _detachParser() {
    var _this8 = this;

    var listeners = this.parserListeners;
    Object.getOwnPropertyNames(listeners).forEach(function (k) {
      _this8.parser.removeListener(k, listeners[k]);

      delete listeners[k];
    });
    this.parser = null;
  };

  _proto._jid = function _jid(id) {
    this.jid = _$jid_45(id);
    return this.jid;
  };

  _proto._status = function _status(status) {
    this.status = status;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.emit.apply(this, ["status", status].concat(args));
    this.emit.apply(this, [status].concat(args));
  };

  _proto._end = function _end() {
    try {
      var _this10 = this;

      var el;
      return _continue(_catch(function () {
        return _await(_this10.close(), function (_this9$close) {
          el = _this9$close;
        });
      }, _empty), function () {
        return _continue(_catch(function () {
          return _awaitIgnored(_this10.disconnect());
        }, _empty), function () {
          return el;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Opens the socket then opens the stream
   */
  ;

  _proto.start = function start() {
    try {
      var _this12 = this;

      if (_this12.status !== "offline") {
        throw new Error("Connection is not offline");
      }

      var _this12$options = _this12.options,
          service = _this12$options.service,
          domain = _this12$options.domain,
          lang = _this12$options.lang;
      return _await(_this12.connect(service), function () {
        var promiseOnline = __promise_32(_this12, "online");
        return _await(_this12.open({
          domain: domain,
          lang: lang
        }), function () {
          return promiseOnline;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Connects the socket
   */
  ;

  _proto.connect = function connect(service) {
    try {
      var _this14 = this;

      _this14._status("connecting", service);

      var socket = new _this14.Socket();

      _this14._attachSocket(socket); // The 'connect' status is set by the socket 'connect' listener


      socket.connect(_this14.socketParameters(service));
      return __promise_32(socket, "connect");
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Disconnects the socket
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  ;

  _proto.disconnect = function disconnect(timeout) {
    try {
      var _this16 = this;

      if (timeout === undefined) timeout = _this16.timeout;
      if (_this16.socket) _this16._status("disconnecting");

      _this16.socket.end(); // The 'disconnect' status is set by the socket 'close' listener


      return _awaitIgnored(__promise_32(_this16.socket, "close", "error", timeout));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Opens the stream
   */
  ;

  _proto.open = function open(options) {
    try {
      var _this18 = this;

      _this18._status("opening");

      if (typeof options === "string") {
        options = {
          domain: options
        };
      }

      var _options = options,
          domain = _options.domain,
          lang = _options.lang,
          _options$timeout = _options.timeout,
          timeout = _options$timeout === void 0 ? _this18.timeout : _options$timeout;

      var headerElement = _this18.headerElement();

      headerElement.attrs.to = domain;
      headerElement.attrs["xml:lang"] = lang;
      _this18.root = headerElement;

      _this18._attachParser(new _this18.Parser());

      return _await(_this18.write(_this18.header(headerElement)), function () {
        return __promise_32(_this18, "open", "error", timeout);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Closes the stream then closes the socket
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  ;

  _proto.stop = function stop() {
    try {
      var _this20 = this;

      return _await(_this20._end(), function (el) {
        if (_this20.status !== "offline") _this20._status("offline", el);
        return el;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Closes the stream and wait for the server to close it
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  ;

  _proto.close = function close(timeout) {
    try {
      var _this22 = this;

      if (timeout === undefined) timeout = _this22.timeout;

      var fragment = _this22.footer(_this22.footerElement());

      var p = Promise.all([__promise_32(_this22.parser, "end", "error", timeout), _this22.write(fragment)]);
      if (_this22.parser && _this22.socket) _this22._status("closing");
      return _await(p, function (_ref) {
        var el = _ref[0];
        _this22.root = null;
        return el; // The 'close' status is set by the parser 'end' listener
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Restart the stream
   * https://xmpp.org/rfcs/rfc6120.html#streams-negotiation-restart
   */
  ;

  _proto.restart = function restart() {
    try {
      var _this24 = this;

      _this24._detachParser();

      var _this24$options = _this24.options,
          domain = _this24$options.domain,
          lang = _this24$options.lang;
      return _this24.open({
        domain: domain,
        lang: lang
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.send = function send(element) {
    try {
      var _this26 = this;

      element.parent = _this26.root;

      _this26.emit("outgoing", element);

      return _await(_this26.write(element), function () {
        _this26.emit("send", element);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendReceive = function sendReceive(element, timeout) {
    if (timeout === void 0) {
      timeout = this.timeout;
    }

    return Promise.all([this.send(element), __promise_32(this, "element", "error", timeout)]).then(function (_ref2) {
      var el = _ref2[1];
      return el;
    });
  };

  _proto.write = function write(data) {
    var _this27 = this;

    return new Promise(function (resolve, reject) {
      // https://xmpp.org/rfcs/rfc6120.html#streams-close
      // "Refrain from sending any further data over its outbound stream to the other entity"
      if (_this27.status === "closing") {
        reject(new Error("Connection is closing"));
        return;
      }

      var str = data.toString("utf8");

      _this27.socket.write(str, function (err) {
        if (err) {
          return reject(err);
        }

        _this27.emit("output", str);

        resolve();
      });
    });
  };

  _proto.isStanza = function isStanza(element) {
    var name = element.name;
    return name === "iq" || name === "message" || name === "presence";
  };

  _proto.isNonza = function isNonza(element) {
    return !this.isStanza(element);
  } // Override
  ;

  _proto.header = function header(el) {
    return el.toString();
  } // Override
  ;

  _proto.headerElement = function headerElement() {
    return new _$xml_72.Element("", {
      version: "1.0",
      xmlns: this.NS
    });
  } // Override
  ;

  _proto.footer = function footer(el) {
    return el.toString();
  } // Override
  ;

  _proto.footerElement = function footerElement() {} // Override
  ;

  _proto.socketParameters = function socketParameters() {};

  return Connection;
}(__EventEmitter_32); // Overrirde


Connection.prototype.NS = "";
Connection.prototype.Socket = null;
Connection.prototype.Parser = null;
var _$Connection_32 = Connection;

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_29 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$Connection_32 = require("@xmpp/connection"); */;

var Client = /*#__PURE__*/function (_Connection) {
  (0, ___inheritsLoose2_29.default)(Client, _Connection);

  function Client(options) {
    var _this;

    _this = _Connection.call(this, options) || this;
    _this.transports = [];
    return _this;
  }

  var _proto = Client.prototype;

  _proto.send = function send(element) {
    var _this$Transport$proto;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_this$Transport$proto = this.Transport.prototype.send).call.apply(_this$Transport$proto, [this, element].concat(args));
  };

  _proto._findTransport = function _findTransport(service) {
    return this.transports.find(function (Transport) {
      try {
        return Transport.prototype.socketParameters(service) !== undefined;
      } catch (_unused) {
        return false;
      }
    });
  };

  _proto.connect = function connect(service) {
    var Transport = this._findTransport(service);

    if (!Transport) {
      throw new Error("No compatible connection method found.");
    }

    this.Transport = Transport;
    this.Socket = Transport.prototype.Socket;
    this.Parser = Transport.prototype.Parser;
    return _Connection.prototype.connect.call(this, service);
  };

  _proto.socketParameters = function socketParameters() {
    var _this$Transport$proto2;

    return (_this$Transport$proto2 = this.Transport.prototype).socketParameters.apply(_this$Transport$proto2, arguments);
  };

  _proto.header = function header() {
    var _this$Transport$proto3;

    return (_this$Transport$proto3 = this.Transport.prototype).header.apply(_this$Transport$proto3, arguments);
  };

  _proto.headerElement = function headerElement() {
    var _this$Transport$proto4;

    return (_this$Transport$proto4 = this.Transport.prototype).headerElement.apply(_this$Transport$proto4, arguments);
  };

  _proto.footer = function footer() {
    var _this$Transport$proto5;

    return (_this$Transport$proto5 = this.Transport.prototype).footer.apply(_this$Transport$proto5, arguments);
  };

  _proto.footerElement = function footerElement() {
    var _this$Transport$proto6;

    return (_this$Transport$proto6 = this.Transport.prototype).footerElement.apply(_this$Transport$proto6, arguments);
  };

  return Client;
}(_$Connection_32);

Client.prototype.NS = "jabber:client";
var _$Client_29 = Client;

var _$clientCore_28 = {};
"use strict";

/* removed: var _$Client_29 = require("./lib/Client"); */;

/* removed: var _$xml_72 = require("@xmpp/xml"); */;

/* removed: var _$jid_45 = require("@xmpp/jid"); */;

_$clientCore_28.Client = _$Client_29;
_$clientCore_28.xml = _$xml_72;
_$clientCore_28.jid = _$jid_45;

"use strict";

var _$getDomain_30 = function getDomain(service) {
  var domain = service.split("://")[1] || service;
  return domain.split(":")[0].split("/")[0];
};

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_54 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

function ___empty_54() {}

var __EventEmitter_54 = _$events_36.EventEmitter;

function ___awaitIgnored_54(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(___empty_54) : Promise.resolve();
  }
}

var Reconnect = /*#__PURE__*/function (_EventEmitter) {
  (0, ___inheritsLoose2_54.default)(Reconnect, _EventEmitter);

  function Reconnect(entity) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.delay = 1000;
    _this.entity = entity;
    _this._timeout = null;
    return _this;
  }

  var _proto = Reconnect.prototype;

  _proto.scheduleReconnect = function scheduleReconnect() {
    var _this2 = this;

    var entity = this.entity,
        delay = this.delay,
        _timeout = this._timeout;
    clearTimeout(_timeout);
    this._timeout = setTimeout(_async(function () {
      if (entity.status !== "disconnect") {
        return;
      }

      return ___continueIgnored_54(___catch_54(function () {
        return ___awaitIgnored_54(_this2.reconnect());
      }, ___empty_54));
    }), delay);
  };

  _proto.reconnect = function reconnect() {
    try {
      var _this4 = this;

      var entity = _this4.entity;

      _this4.emit("reconnecting");

      var _entity$options = entity.options,
          service = _entity$options.service,
          domain = _entity$options.domain,
          lang = _entity$options.lang;
      return ___await_54(entity.connect(service), function () {
        return ___await_54(entity.open({
          domain: domain,
          lang: lang
        }), function () {
          _this4.emit("reconnected");
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.start = function start() {
    var _this5 = this;

    var entity = this.entity;
    var listeners = {};

    listeners.disconnect = function () {
      _this5.scheduleReconnect();
    };

    this.listeners = listeners;
    entity.on("disconnect", listeners.disconnect);
  };

  _proto.stop = function stop() {
    var entity = this.entity,
        listeners = this.listeners,
        _timeout = this._timeout;
    entity.removeListener("disconnect", listeners.disconnect);
    clearTimeout(_timeout);
  };

  return Reconnect;
}(__EventEmitter_54);

function ___catch_54(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function ___continueIgnored_54(value) {
  if (value && value.then) {
    return value.then(___empty_54);
  }
}

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function ___await_54(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var _$reconnect_54 = function reconnect(_ref) {
  var entity = _ref.entity;
  var r = new Reconnect(entity);
  r.start();
  return r;
};

var _$empty_12 = {};
"use strict";

var _$Socket_71 = {};
(function (global){(function (){
"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var _inheritsLoose2 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$empty_12 = require("ws"); */;

var WebSocket = global.WebSocket || _$empty_12;

/* removed: var _$events_13 = require("events"); */;

var CODE = "ECONNERROR";

var Socket = /*#__PURE__*/function (_EventEmitter) {
  (0, _inheritsLoose2.default)(Socket, _EventEmitter);

  function Socket() {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.listeners = Object.create(null);
    return _this;
  }

  var _proto = Socket.prototype;

  _proto.connect = function connect(url) {
    this.url = url;

    this._attachSocket(new WebSocket(url, ["xmpp"]));
  };

  _proto._attachSocket = function _attachSocket(socket) {
    var _this2 = this;

    this.socket = socket;
    var listeners = this.listeners;

    listeners.open = function () {
      _this2.emit("connect");
    };

    listeners.message = function (_ref) {
      var data = _ref.data;
      return _this2.emit("data", data);
    };

    listeners.error = function (event) {
      // WS
      var error = event.error; // DOM

      if (!error) {
        error = new Error("WebSocket " + CODE + " " + _this2.url);
        error.errno = CODE;
        error.code = CODE;
      }

      error.event = event;
      error.url = _this2.url;

      _this2.emit("error", error);
    };

    listeners.close = function (event) {
      _this2._detachSocket();

      _this2.emit("close", !event.wasClean, event);
    };

    this.socket.addEventListener("open", listeners.open);
    this.socket.addEventListener("message", listeners.message);
    this.socket.addEventListener("error", listeners.error);
    this.socket.addEventListener("close", listeners.close);
  };

  _proto._detachSocket = function _detachSocket() {
    delete this.url;
    var socket = this.socket,
        listeners = this.listeners;
    Object.getOwnPropertyNames(listeners).forEach(function (k) {
      socket.removeEventListener(k, listeners[k]);
      delete listeners[k];
    });
    delete this.socket;
  };

  _proto.end = function end() {
    this.socket.close();
  };

  _proto.write = function write(data, fn) {
    if (WebSocket === _$empty_12) {
      this.socket.send(data, fn);
    } else {
      this.socket.send(data);
      fn();
    }
  };

  return Socket;
}(_$events_13);

_$Socket_71 = Socket;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_70 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

var __Parser_70 = _$xml_72.Parser,
    __Element_70 = _$xml_72.Element,
    __XMLError_70 = _$xml_72.XMLError;

var _$FramedParser_70 = /*#__PURE__*/function (_Parser) {
  (0, ___inheritsLoose2_70.default)(FramedParser, _Parser);

  function FramedParser() {
    return _Parser.apply(this, arguments) || this;
  }

  var _proto = FramedParser.prototype;

  _proto.onStartElement = function onStartElement(name, attrs) {
    var element = new __Element_70(name, attrs);
    var cursor = this.cursor;

    if (cursor) {
      cursor.append(element);
    }

    this.cursor = element;
  };

  _proto.onEndElement = function onEndElement(name) {
    var cursor = this.cursor;

    if (name !== cursor.name) {
      // <foo></bar>
      this.emit("error", new __XMLError_70(cursor.name + " must be closed."));
      return;
    }

    if (cursor.parent) {
      this.cursor = cursor.parent;
      return;
    }

    if (cursor.is("open", "urn:ietf:params:xml:ns:xmpp-framing")) {
      this.emit("start", cursor);
    } else if (cursor.is("close", "urn:ietf:params:xml:ns:xmpp-framing")) {
      this.emit("end", cursor);
    } else {
      this.emit("element", cursor);
    }

    this.cursor = null;
  };

  return FramedParser;
}(__Parser_70);

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_69 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$Socket_71 = require("./Socket"); */;

/* removed: var _$Connection_32 = require("@xmpp/connection"); */;

/* removed: var _$xml_72 = require("@xmpp/xml"); */;

/* removed: var _$FramedParser_70 = require("./FramedParser"); */;

var NS_FRAMING = "urn:ietf:params:xml:ns:xmpp-framing";
/* References
 * WebSocket protocol https://tools.ietf.org/html/rfc6455
 * WebSocket Web API https://html.spec.whatwg.org/multipage/comms.html#network
 * XMPP over WebSocket https://tools.ietf.org/html/rfc7395
 */

var ConnectionWebSocket = /*#__PURE__*/function (_Connection) {
  (0, ___inheritsLoose2_69.default)(ConnectionWebSocket, _Connection);

  function ConnectionWebSocket() {
    return _Connection.apply(this, arguments) || this;
  }

  var _proto = ConnectionWebSocket.prototype;

  _proto.send = function send(element) {
    var _Connection$prototype;

    if (!element.attrs.xmlns && _Connection.prototype.isStanza.call(this, element)) {
      element.attrs.xmlns = "jabber:client";
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_Connection$prototype = _Connection.prototype.send).call.apply(_Connection$prototype, [this, element].concat(args));
  } // https://tools.ietf.org/html/rfc7395#section-3.6
  ;

  _proto.footerElement = function footerElement() {
    return new _$xml_72.Element("close", {
      xmlns: NS_FRAMING
    });
  } // https://tools.ietf.org/html/rfc7395#section-3.4
  ;

  _proto.headerElement = function headerElement() {
    var el = _Connection.prototype.headerElement.call(this);

    el.name = "open";
    el.attrs.xmlns = NS_FRAMING;
    return el;
  };

  _proto.socketParameters = function socketParameters(service) {
    return service.match(/^wss?:\/\//) ? service : undefined;
  };

  return ConnectionWebSocket;
}(_$Connection_32);

ConnectionWebSocket.prototype.Socket = _$Socket_71;
ConnectionWebSocket.prototype.NS = "jabber:client";
ConnectionWebSocket.prototype.Parser = _$FramedParser_70;
var _$ConnectionWebSocket_69 = ConnectionWebSocket;

"use strict";

/* removed: var _$ConnectionWebSocket_69 = require("./lib/Connection"); */;

var _$websocket_68 = function websocket(_ref) {
  var entity = _ref.entity;
  entity.transports.push(_$ConnectionWebSocket_69);
};

'use strict';
/**
 * Expose compositor.
 */

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _$compose_15 = compose;
/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');

  for (var _iterator = _createForOfIteratorHelperLoose(middleware), _step; !(_step = _iterator()).done;) {
    var fn = _step.value;
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }
  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */


  return function (context, next) {
    // last called middleware #
    var index = -1;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      var fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

"use strict";

var _$Context_50 = function Context(entity, stanza) {
  this.stanza = stanza;
  this.entity = entity;
  var name = stanza.name,
      attrs = stanza.attrs;
  var type = attrs.type,
      id = attrs.id;
  this.name = name;
  this.id = id || "";

  if (name === "message") {
    this.type = type || "normal";
  } else if (name === "presence") {
    this.type = type || "available";
  } else {
    this.type = type || "";
  }

  this.from = null;
  this.to = null;
  this.local = "";
  this.domain = "";
  this.resource = "";
};

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_51 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$Context_50 = require("./Context"); */;

/* removed: var _$jid_45 = require("@xmpp/jid"); */;

var _$IncomingContext_51 = /*#__PURE__*/function (_Context) {
  (0, ___inheritsLoose2_51.default)(IncomingContext, _Context);

  function IncomingContext(entity, stanza) {
    var _this;

    _this = _Context.call(this, entity, stanza) || this;
    var jid = entity.jid,
        domain = entity.domain;
    var to = stanza.attrs.to || jid && jid.toString();
    var from = stanza.attrs.from || domain;
    if (to) _this.to = new _$jid_45(to);

    if (from) {
      _this.from = new _$jid_45(from);
      _this.local = _this.from.local;
      _this.domain = _this.from.domain;
      _this.resource = _this.from.resource;
    }

    return _this;
  }

  return IncomingContext;
}(_$Context_50);

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_52 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$Context_50 = require("./Context"); */;

/* removed: var _$jid_45 = require("@xmpp/jid"); */;

var _$OutgoingContext_52 = /*#__PURE__*/function (_Context) {
  (0, ___inheritsLoose2_52.default)(OutgoingContext, _Context);

  function OutgoingContext(entity, stanza) {
    var _this;

    _this = _Context.call(this, entity, stanza) || this;
    var jid = entity.jid,
        domain = entity.domain;
    var from = stanza.attrs.from || jid && jid.toString();
    var to = stanza.attrs.to || domain;
    if (from) _this.from = new _$jid_45(from);

    if (to) {
      _this.to = new _$jid_45(to);
      _this.local = _this.to.local;
      _this.domain = _this.to.domain;
      _this.resource = _this.to.resource;
    }

    return _this;
  }

  return OutgoingContext;
}(_$Context_50);

"use strict";

/* removed: var _$compose_15 = require("koa-compose"); */;

/* removed: var _$IncomingContext_51 = require("./lib/IncomingContext"); */;

/* removed: var _$OutgoingContext_52 = require("./lib/OutgoingContext"); */;

function listener(entity, middleware, Context) {
  return function (stanza) {
    var ctx = new Context(entity, stanza);
    return _$compose_15(middleware)(ctx);
  };
}

function errorHandler(entity) {
  return function (ctx, next) {
    next().then(function (reply) {
      return reply && entity.send(reply);
    }).catch(function (err) {
      return entity.emit("error", err);
    });
  };
}

var _$middleware_49 = function middleware(_ref) {
  var entity = _ref.entity;
  var incoming = [errorHandler(entity)];
  var outgoing = [];
  var incomingListener = listener(entity, incoming, _$IncomingContext_51);
  var outgoingListener = listener(entity, outgoing, _$OutgoingContext_52);
  entity.on("element", incomingListener);
  entity.hookOutgoing = outgoingListener;
  return {
    use: function use(fn) {
      incoming.push(fn);
      return fn;
    },
    filter: function filter(fn) {
      outgoing.push(fn);
      return fn;
    }
  };
};

"use strict";

function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}

function ___async_66(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

var _$route_66 = function route() {
  return ___async_66(function (_ref, next) {
    var stanza = _ref.stanza,
        entity = _ref.entity;
    return stanza.is("features", "http://etherx.jabber.org/streams") ? _call(next, function (prevent) {
      if (!prevent && entity.jid) entity._status("online", entity.jid);
    }) : next();
  });
};

"use strict";
/**
 * References
 * https://xmpp.org/rfcs/rfc6120.html#streams-negotiation Stream Negotiation
 * https://xmpp.org/extensions/xep-0170.html XEP-0170: Recommended Order of Stream Feature Negotiation
 * https://xmpp.org/registrar/stream-features.html XML Stream Features
 */

/* removed: var _$route_66 = require("./route"); */;

var _$streamFeatures_65 = function streamFeatures(_ref) {
  var middleware = _ref.middleware;
  middleware.use(_$route_66());

  function use(name, xmlns, handler) {
    return middleware.use(function (ctx, next) {
      var stanza = ctx.stanza;
      if (!stanza.is("features", "http://etherx.jabber.org/streams")) return next();
      var feature = stanza.getChild(name, xmlns);
      if (!feature) return next();
      return handler(ctx, next, feature);
    });
  }

  return {
    use: use
  };
};

"use strict";

var _$id_42 = function id() {
  var i;

  while (!i) {
    i = Math.random().toString(36).slice(2, 12);
  }

  return i;
};

"use strict";
/* https://xmpp.org/rfcs/rfc6120.html#stanzas-error */

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_53 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$XMPPError_35 = require("@xmpp/error"); */;

var StanzaError = /*#__PURE__*/function (_XMPPError) {
  (0, ___inheritsLoose2_53.default)(StanzaError, _XMPPError);

  function StanzaError(condition, text, application, type) {
    var _this;

    _this = _XMPPError.call(this, condition, text, application) || this;
    _this.type = type;
    _this.name = "StanzaError";
    return _this;
  }

  StanzaError.fromElement = function fromElement(element) {
    var error = _XMPPError.fromElement.call(this, element);

    error.type = element.attrs.type;
    return error;
  };

  return StanzaError;
}(_$XMPPError_35);

var _$StanzaError_53 = StanzaError;

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___construct2_44 = _$_interopRequireDefault_6(_$construct_2);

function ___empty_44() {}

/* removed: var _$id_42 = require("@xmpp/id"); */;

function ___awaitIgnored_44(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(___empty_44) : Promise.resolve();
  }
}

/* removed: var _$StanzaError_53 = require("@xmpp/middleware/lib/StanzaError"); */;

function ___await_44(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var __Deferred_44 = _$events_36.Deferred;

function ___catch_44(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var timeoutPromise = _$events_36.timeout;

function ___continue_44(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

/* removed: var _$xml_72 = require("@xmpp/xml"); */;

function isReply(_ref) {
  var name = _ref.name,
      type = _ref.type;
  if (name !== "iq") return false;
  if (type !== "error" && type !== "result") return false;
  return true;
}

var IQCaller = /*#__PURE__*/function () {
  function IQCaller(_ref2) {
    var entity = _ref2.entity,
        middleware = _ref2.middleware;
    this.handlers = new Map();
    this.entity = entity;
    this.middleware = middleware;
  }

  var _proto = IQCaller.prototype;

  _proto.start = function start() {
    this.middleware.use(this._route.bind(this));
  };

  _proto._route = function _route(_ref3, next) {
    var type = _ref3.type,
        name = _ref3.name,
        id = _ref3.id,
        stanza = _ref3.stanza;
    if (!isReply({
      name: name,
      type: type
    })) return next();
    var deferred = this.handlers.get(id);

    if (!deferred) {
      return next();
    }

    if (type === "error") {
      deferred.reject(_$StanzaError_53.fromElement(stanza.getChild("error")));
    } else {
      deferred.resolve(stanza);
    }

    this.handlers.delete(id);
  };

  _proto.request = function request(stanza, timeout) {
    if (timeout === void 0) {
      timeout = 30 * 1000;
    }

    try {
      var _exit2 = false;

      var _this2 = this;

      if (!stanza.attrs.id) {
        stanza.attrs.id = _$id_42();
      }

      var deferred = new __Deferred_44();

      _this2.handlers.set(stanza.attrs.id, deferred);

      return ___continue_44(___catch_44(function () {
        return ___await_44(_this2.entity.send(stanza), function () {
          return ___awaitIgnored_44(timeoutPromise(deferred.promise, timeout));
        });
      }, function (err) {
        _this2.handlers.delete(stanza.attrs.id);

        throw err;
      }), function (_result) {
        return _exit2 ? _result : deferred.promise;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto._childRequest = function _childRequest(type, element, to) {
    var name = element.name;
    var xmlns = element.attrs.xmlns;

    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    return this.request.apply(this, [_$xml_72("iq", {
      type: type,
      to: to
    }, element)].concat(args)).then(function (stanza) {
      return stanza.getChild(name, xmlns);
    });
  };

  _proto.get = function get() {
    try {
      var _this4 = this;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _this4._childRequest.apply(_this4, ["get"].concat(args));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.set = function set() {
    try {
      var _this6 = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _this6._childRequest.apply(_this6, ["set"].concat(args));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return IQCaller;
}();

var _$iqCaller_44 = function iqCaller() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  var iqCaller = (0, ___construct2_44.default)(IQCaller, args);
  iqCaller.start();
  return iqCaller;
};

"use strict";
/**
 * References
 * https://xmpp.org/rfcs/rfc6120.html#stanzas-semantics-iq
 * https://xmpp.org/rfcs/rfc6120.html#stanzas-error
 */

function ___call_43(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}

/* removed: var _$xml_72 = require("@xmpp/xml"); */;

function ___catch_43(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var NS_STANZA = "urn:ietf:params:xml:ns:xmpp-stanzas";

function ___continue_43(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

function isQuery(_ref) {
  var name = _ref.name,
      type = _ref.type;
  if (name !== "iq") return false;
  if (type === "error" || type === "result") return false;
  return true;
}

function isValidQuery(_ref2, children, child) {
  var type = _ref2.type;
  if (type !== "get" && type !== "set") return false;
  if (children.length !== 1) return false;
  if (!child) return false;
  return true;
}

function buildReply(_ref3) {
  var stanza = _ref3.stanza;
  return _$xml_72("iq", {
    to: stanza.attrs.from,
    from: stanza.attrs.to,
    id: stanza.attrs.id
  });
}

function buildReplyResult(ctx, child) {
  var reply = buildReply(ctx);
  reply.attrs.type = "result";

  if (child) {
    reply.append(child);
  }

  return reply;
}

function buildReplyError(ctx, error, child) {
  var reply = buildReply(ctx);
  reply.attrs.type = "error";

  if (child) {
    reply.append(child);
  }

  reply.append(error);
  return reply;
}

function buildError(type, condition) {
  return _$xml_72("error", {
    type: type
  }, _$xml_72(condition, NS_STANZA));
}

function iqHandler(entity) {
  return function iqHandler(ctx, next) {
    try {
      if (!isQuery(ctx)) return next();
      var stanza = ctx.stanza;
      var children = stanza.getChildElements();
      var child = children[0];

      if (!isValidQuery(ctx, children, child)) {
        return buildReplyError(ctx, buildError("modify", "bad-request"), child);
      }

      ctx.element = child;
      var reply;
      return ___continue_43(___catch_43(function () {
        return ___call_43(next, function (_next) {
          reply = _next;
        });
      }, function (err) {
        entity.emit("error", err);
        reply = buildError("cancel", "internal-server-error");
      }), function () {
        if (!reply) {
          reply = buildError("cancel", "service-unavailable");
        }

        return reply instanceof _$xml_72.Element && reply.is("error") ? buildReplyError(ctx, reply, child) : buildReplyResult(ctx, reply instanceof _$xml_72.Element ? reply : undefined);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function __route_43(type, ns, name, handler) {
  return function (ctx, next) {
    if (ctx.type !== type | !ctx.element || !ctx.element.is(name, ns)) return next();
    return handler(ctx, next);
  };
}

var _$iqCallee_43 = function iqCallee(_ref4) {
  var middleware = _ref4.middleware,
      entity = _ref4.entity;
  middleware.use(iqHandler(entity));
  return {
    get: function get(ns, name, handler) {
      middleware.use(__route_43("get", ns, name, handler));
    },
    set: function set(ns, name, handler) {
      middleware.use(__route_43("set", ns, name, handler));
    }
  };
};

"use strict";

/* removed: var _$Parser_74 = require("./Parser"); */;

var _$parse_76 = function parse(data) {
  var p = new _$Parser_74();
  var result = null;
  var error = null;
  p.on("start", function (el) {
    result = el;
  });
  p.on("element", function (el) {
    result.append(el);
  });
  p.on("error", function (err) {
    error = err;
  });
  p.write(data);
  p.end();

  if (error) {
    throw error;
  } else {
    return result;
  }
};

var _$altConnections_56 = {};
"use strict";

function isSecure(uri) {
  return uri.startsWith("https") || uri.startsWith("wss");
}

_$altConnections_56.compare = function compare(a, b) {
  var secure;

  if (isSecure(a.uri) && !isSecure(b.uri)) {
    secure = -1;
  } else if (!isSecure(a.uri) && isSecure(b.uri)) {
    secure = 1;
  } else {
    secure = 0;
  }

  if (secure !== 0) {
    return secure;
  }

  var method;

  if (a.method === b.method) {
    method = 0;
  } else if (a.method === "websocket") {
    method = -1;
  } else if (b.method === "websocket") {
    method = 1;
  } else if (a.method === "xbosh") {
    method = -1;
  } else if (b.method === "xbosh") {
    method = 1;
  } else if (a.method === "httppoll") {
    method = -1;
  } else if (b.method === "httppoll") {
    method = 1;
  } else {
    method = 0;
  }

  if (method !== 0) {
    return method;
  }

  return 0;
};

var _$http_57 = {};
(function (global){(function (){
"use strict";

var fetch = global.fetch || _$empty_12;

/* removed: var _$parse_76 = require("@xmpp/xml/lib/parse"); */;

var compareAltConnections = _$altConnections_56.compare;

function resolve(domain) {
  return fetch("https://" + domain + "/.well-known/host-meta").then(function (res) {
    return res.text();
  }).then(function (res) {
    return _$parse_76(res).getChildren("Link").filter(function (link) {
      return ["urn:xmpp:alt-connections:websocket", "urn:xmpp:alt-connections:httppoll", "urn:xmpp:alt-connections:xbosh"].includes(link.attrs.rel);
    }).map(function (_ref) {
      var attrs = _ref.attrs;
      return {
        rel: attrs.rel,
        href: attrs.href,
        method: attrs.rel.split(":").pop(),
        uri: attrs.href
      };
    }).sort(compareAltConnections);
  }).catch(function () {
    return [];
  });
}

_$http_57.resolve = resolve;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

var _$resolve_58 = {};
"use strict";

/* removed: var _$empty_12 = require("./lib/dns"); */;

/* removed: var _$http_57 = require("./lib/http"); */;

_$resolve_58 = function resolve() {
  return Promise.all([_$empty_12.resolve ? _$empty_12.resolve.apply(_$empty_12, arguments) : Promise.resolve([]), _$http_57.resolve.apply(_$http_57, arguments)]).then(function (_ref) {
    var records = _ref[0],
        endpoints = _ref[1];
    return records.concat(endpoints);
  });
};

if (_$empty_12.resolve) {
  _$resolve_58.dns = _$empty_12;
}

_$resolve_58.http = _$http_57;

"use strict";

function ___empty_55() {}

var fallbackConnect = ___async_55(function (entity, uris) {
  var _exit = false;

  if (uris.length === 0) {
    throw new Error("Couldn't connect");
  }

  var uri = uris.shift();

  var Transport = entity._findTransport(uri);

  if (!Transport) {
    return fallbackConnect(entity, uris);
  }

  entity._status("connecting", uri);

  var params = Transport.prototype.socketParameters(uri);
  var socket = new Transport.prototype.Socket();
  return ___continue_55(___catch_55(function () {
    socket.connect(params);
    return ___awaitIgnored_55(__promise_55(socket, "connect"));
  }, function () {
    _exit = true;
    return fallbackConnect(entity, uris);
  }), function (_result2) {
    if (_exit) return _result2;

    entity._attachSocket(socket);

    socket.emit("connect");
    entity.Transport = Transport;
    entity.Socket = Transport.prototype.Socket;
    entity.Parser = Transport.prototype.Parser;
  });
});

function ___awaitIgnored_55(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(___empty_55) : Promise.resolve();
  }
}

var fetchURIs = ___async_55(function (domain) {
  return ___await_55(_$resolve_58(domain, {
    srv: [{
      service: "xmpps-client",
      protocol: "tcp"
    }, {
      service: "xmpp-client",
      protocol: "tcp"
    }]
  }), function (_resolve) {
    return [].concat(new Set(_resolve.map(function (record) {
      return record.uri;
    })));
  });
});

function ___catch_55(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

/* removed: var _$resolve_58 = require("./resolve"); */;

function ___await_55(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var __promise_55 = _$events_36.promise;

function ___async_55(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function ___continue_55(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

function filterSupportedURIs(entity, uris) {
  return uris.filter(function (uri) {
    return entity._findTransport(uri);
  });
}

var _$resolve_55 = function resolve(_ref) {
  var entity = _ref.entity;
  var _connect = entity.connect;

  entity.connect = function connect(service) {
    try {
      var _this2 = this;

      if (!service || service.match(/:\/\//)) {
        return _connect.call(_this2, service);
      }

      return ___await_55(fetchURIs(service), function (_fetchURIs) {
        var uris = filterSupportedURIs(entity, _fetchURIs);

        if (uris.length === 0) {
          throw new Error("No compatible transport found.");
        }

        return ___catch_55(function () {
          return ___awaitIgnored_55(fallbackConnect(entity, uris));
        }, function (err) {
          entity._reset();

          entity._status("disconnect");

          throw err;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

"use strict";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var _$_defineProperty_3 = _defineProperty;

var _$browser_27 = {};
(function (global){(function (){
"use strict";

_$browser_27.encode = function encode(string) {
  return global.btoa(string);
};

_$browser_27.decode = function decode(string) {
  return global.atob(string);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var ___inheritsLoose2_63 = _$_interopRequireDefault_6(_$_inheritsLoose_5);

/* removed: var _$XMPPError_35 = require("@xmpp/error"); */; // https://xmpp.org/rfcs/rfc6120.html#sasl-errors


var SASLError = /*#__PURE__*/function (_XMPPError) {
  (0, ___inheritsLoose2_63.default)(SASLError, _XMPPError);

  function SASLError() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _XMPPError.call.apply(_XMPPError, [this].concat(args)) || this;
    _this.name = "SASLError";
    return _this;
  }

  return SASLError;
}(_$XMPPError_35);

var _$SASLError_63 = SASLError;

var _$main_26 = { exports: {} };
"use strict";

(function (root, factory) {
  if (typeof _$main_26.exports === 'object') {
    // CommonJS
    factory(_$main_26.exports, _$main_26, _$factory_25({}));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module', './lib/factory'], factory);
  }
})(void 0, function (exports, module, Factory) {
  exports = module.exports = Factory;
  exports.Factory = Factory;
});

_$main_26 = _$main_26.exports
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _$_defineProperty_3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* removed: var _$_defineProperty_3 = require("@babel/runtime/helpers/defineProperty"); */;

function ___empty_62() {}

var authenticate = ___async_62(function (SASL, entity, mechname, credentials) {
  var mech = SASL.create([mechname]);

  if (!mech) {
    throw new Error("No compatible mechanism");
  }

  var domain = entity.options.domain;

  var creds = _objectSpread({
    username: null,
    password: null,
    server: domain,
    host: domain,
    realm: domain,
    serviceType: "xmpp",
    serviceName: domain
  }, credentials);

  return new Promise(function (resolve, reject) {
    var handler = function handler(element) {
      if (element.attrs.xmlns !== NS) {
        return;
      }

      if (element.name === "challenge") {
        mech.challenge(decode(element.text()));
        var resp = mech.response(creds);
        entity.send(_$xml_72("response", {
          xmlns: NS,
          mechanism: mech.name
        }, typeof resp === "string" ? encode(resp) : ""));
        return;
      }

      if (element.name === "failure") {
        reject(_$SASLError_63.fromElement(element));
      } else if (element.name === "success") {
        resolve();
      }

      entity.removeListener("nonza", handler);
    };

    entity.on("nonza", handler);

    if (mech.clientFirst) {
      entity.send(_$xml_72("auth", {
        xmlns: NS,
        mechanism: mech.name
      }, encode(mech.response(creds))));
    }
  });
});

function ___awaitIgnored_62(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(___empty_62) : Promise.resolve();
  }
}

var encode = _$browser_27.encode,
    decode = _$browser_27.decode;

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

/* removed: var _$SASLError_63 = require("./lib/SASLError"); */;

function ___async_62(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

/* removed: var _$xml_72 = require("@xmpp/xml"); */;

/* removed: var _$main_26 = require("saslmechanisms"); */; // https://xmpp.org/rfcs/rfc6120.html#sasl


var NS = "urn:ietf:params:xml:ns:xmpp-sasl";

function getMechanismNames(features) {
  return features.getChild("mechanisms", NS).children.map(function (el) {
    return el.text();
  });
}

var _$sasl_62 = function sasl(_ref, credentials) {
  var streamFeatures = _ref.streamFeatures;
  var SASL = new _$main_26();
  streamFeatures.use("mechanisms", NS, ___async_62(function (_ref2) {
    var stanza = _ref2.stanza,
        entity = _ref2.entity;
    var offered = getMechanismNames(stanza);

    var supported = SASL._mechs.map(function (_ref3) {
      var name = _ref3.name;
      return name;
    }); // eslint-disable-next-line unicorn/prefer-array-find


    var intersection = supported.filter(function (mech) {
      return offered.includes(mech);
    }); // eslint-disable-next-line prefer-destructuring

    var mech = intersection[0];
    return _invoke(function () {
      if (typeof credentials === "function") {
        return ___awaitIgnored_62(credentials(function (creds) {
          return authenticate(SASL, entity, mech, creds, stanza);
        }, mech));
      } else {
        if (!credentials.username && !credentials.password) {
          mech = "ANONYMOUS";
        }

        return ___awaitIgnored_62(authenticate(SASL, entity, mech, credentials, stanza));
      }
    }, function () {
      return ___awaitIgnored_62(entity.restart());
    });
  }));
  return {
    use: function use() {
      return SASL.use.apply(SASL, arguments);
    }
  };
};

"use strict";

function ___await_59(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var bind = ___async_59(function (entity, iqCaller, resource) {
  return ___await_59(iqCaller.set(makeBindElement(resource)), function (result) {
    var jid = result.getChildText("jid");

    entity._jid(jid);

    return jid;
  });
});

function ___async_59(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

/* removed: var _$xml_72 = require("@xmpp/xml"); */;
/*
 * References
 * https://xmpp.org/rfcs/rfc6120.html#bind
 */


var __NS_59 = "urn:ietf:params:xml:ns:xmpp-bind";

function makeBindElement(resource) {
  return _$xml_72("bind", {
    xmlns: __NS_59
  }, resource && _$xml_72("resource", {}, resource));
}

function __route_59(_ref, resource) {
  var iqCaller = _ref.iqCaller;
  return ___async_59(function (_ref2, next) {
    var entity = _ref2.entity;
    return ___await_59(typeof resource === "function" ? resource(function (resource) {
      return bind(entity, iqCaller, resource);
    }) : bind(entity, iqCaller, resource), function () {
      next();
    });
  });
}

var _$resourceBinding_59 = function resourceBinding(_ref3, resource) {
  var streamFeatures = _ref3.streamFeatures,
      iqCaller = _ref3.iqCaller;
  streamFeatures.use("bind", __NS_59, __route_59({
    iqCaller: iqCaller
  }, resource));
};

"use strict";

function ___await_64(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

/* removed: var _$xml_72 = require("@xmpp/xml"); */; // https://tools.ietf.org/html/draft-cridland-xmpp-session-01


function ___async_64(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

var __NS_64 = "urn:ietf:params:xml:ns:xmpp-session";

var _$sessionEstablishment_64 = function sessionEstablishment(_ref) {
  var iqCaller = _ref.iqCaller,
      streamFeatures = _ref.streamFeatures;
  streamFeatures.use("session", __NS_64, ___async_64(function (context, next, feature) {
    return feature.getChild("optional") ? next() : ___await_64(iqCaller.set(_$xml_72("session", __NS_64)), function () {
      return next();
    });
  }));
};

"use strict";

function ___await_67(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var resume = ___async_67(function (entity, h, previd) {
  return ___await_67(entity.sendReceive(_$xml_72("resume", {
    xmlns: __NS_67,
    h: h,
    previd: previd
  })), function (response) {
    if (!response.is("resumed", __NS_67)) {
      throw response;
    }

    return response;
  });
});

function ___catch_67(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var enable = ___async_67(function (entity, resume, max) {
  entity.send(_$xml_72("enable", {
    xmlns: __NS_67,
    max: max,
    resume: resume ? "true" : undefined
  }));
  return new Promise(function (resolve, reject) {
    function listener(nonza) {
      if (nonza.is("enabled", __NS_67)) {
        resolve(nonza);
      } else if (nonza.is("failed", __NS_67)) {
        reject(nonza);
      } else {
        return;
      }

      entity.removeListener("nonza", listener);
    }

    entity.on("nonza", listener);
  });
});

function ___continue_67(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

/* removed: var _$xml_72 = require("@xmpp/xml"); */; // https://xmpp.org/extensions/xep-0198.html


function ___call_67(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}

var __NS_67 = "urn:xmpp:sm:3";

function ___invoke_67(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function ___async_67(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

var _$streamManagement_67 = function streamManagement(_ref) {
  var streamFeatures = _ref.streamFeatures,
      entity = _ref.entity,
      middleware = _ref.middleware;
  var address = null;
  var sm = {
    allowResume: true,
    preferredMaximum: null,
    enabled: false,
    id: "",
    outbound: 0,
    inbound: 0,
    max: null
  };
  entity.on("online", function (jid) {
    address = jid;
    sm.outbound = 0;
    sm.inbound = 0;
  });
  entity.on("offline", function () {
    sm.outbound = 0;
    sm.inbound = 0;
    sm.enabled = false;
    sm.id = "";
  });
  middleware.use(function (context, next) {
    var stanza = context.stanza;

    if (["presence", "message", "iq"].includes(stanza.name)) {
      sm.inbound += 1;
    } else if (stanza.is("r", __NS_67)) {
      // > When an <r/> element ("request") is received, the recipient MUST acknowledge it by sending an <a/> element to the sender containing a value of 'h' that is equal to the number of stanzas handled by the recipient of the <r/> element.
      entity.send(_$xml_72("a", {
        xmlns: __NS_67,
        h: sm.inbound
      })).catch(function () {});
    } else if (stanza.is("a", __NS_67)) {
      // > When a party receives an <a/> element, it SHOULD keep a record of the 'h' value returned as the sequence number of the last handled outbound stanza for the current stream (and discard the previous value).
      sm.outbound = stanza.attrs.h;
    }

    return next();
  }); // https://xmpp.org/extensions/xep-0198.html#enable
  // For client-to-server connections, the client MUST NOT attempt to enable stream management until after it has completed Resource Binding unless it is resuming a previous session

  streamFeatures.use("sm", __NS_67, ___async_67(function (context, next) {
    var _exit = false;
    // Resuming
    return ___invoke_67(function () {
      if (sm.id) {
        return ___catch_67(function () {
          return ___await_67(resume(entity, sm.inbound, sm.id), function () {
            sm.enabled = true;
            entity.jid = address;
            entity.status = "online";
            _exit = true;
            return true; // If resumption fails, continue with session establishment
            // eslint-disable-next-line no-unused-vars
          });
        }, function () {
          sm.id = "";
          sm.enabled = false;
          sm.outbound = 0;
        });
      }
    }, function (_result2) {
      return _exit ? _result2 : ___call_67(next, function () {
        var promiseEnable = enable(entity, sm.allowResume, sm.preferredMaximum); // > The counter for an entity's own sent stanzas is set to zero and started after sending either <enable/> or <enabled/>.

        sm.outbound = 0;
        return ___continue_67(___catch_67(function () {
          return ___await_67(promiseEnable, function (response) {
            sm.enabled = true;
            sm.id = response.attrs.id;
            sm.max = response.attrs.max; // eslint-disable-next-line no-unused-vars
          });
        }, function () {
          sm.enabled = false;
        }), function () {
          sm.inbound = 0;
        });
      });
    }); // Enabling
    // Resource binding first
  }));
  return sm;
};

var _$main_22 = { exports: {} };
"use strict";

(function (root, factory) {
  if (typeof _$main_22.exports === 'object') {
    // CommonJS
    factory(_$main_22.exports, _$main_22, _$mechanism_21({}));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module', './lib/mechanism'], factory);
  }
})(void 0, function (exports, module, Mechanism) {
  exports = module.exports = Mechanism;
  exports.Mechanism = Mechanism;
});

_$main_22 = _$main_22.exports
"use strict";
/**
 * [XEP-0175: Best Practices for Use of SASL ANONYMOUS](https://xmpp.org/extensions/xep-0175.html)
 * [RFC-4504: Anonymous Simple Authentication and Security Layer (SASL) Mechanism](https://tools.ietf.org/html/rfc4505)
 */

/* removed: var _$main_22 = require("sasl-anonymous"); */;

var _$saslAnonymous_60 = function saslAnonymous(sasl) {
  sasl.use(_$main_22);
};

var _$main_24 = { exports: {} };
"use strict";

(function (root, factory) {
  if (typeof _$main_24.exports === 'object') {
    // CommonJS
    factory(_$main_24.exports, _$main_24, _$mechanism_23({}));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module', './lib/mechanism'], factory);
  }
})(void 0, function (exports, module, Mechanism) {
  exports = module.exports = Mechanism;
  exports.Mechanism = Mechanism;
});

_$main_24 = _$main_24.exports
"use strict";

/* removed: var _$main_24 = require("sasl-plain"); */;

var _$saslPlain_61 = function saslPlain(sasl) {
  sasl.use(_$main_24);
};

var _$client_31 = {};
"use strict";

/* removed: var _$_interopRequireDefault_6 = require("@babel/runtime/helpers/interopRequireDefault"); */;

var _objectWithoutPropertiesLoose2 = _$_interopRequireDefault_6(_$_objectWithoutPropertiesLoose_9);

var __xml_31 = _$clientCore_28.xml,
    __jid_31 = _$clientCore_28.jid,
    __Client_31 = _$clientCore_28.Client;

/* removed: var _$getDomain_30 = require("./lib/getDomain"); */;

/* removed: var _$reconnect_54 = require("@xmpp/reconnect"); */;

/* removed: var _$websocket_68 = require("@xmpp/websocket"); */;

/* removed: var _$middleware_49 = require("@xmpp/middleware"); */;

/* removed: var _$streamFeatures_65 = require("@xmpp/stream-features"); */;

/* removed: var _$iqCaller_44 = require("@xmpp/iq/caller"); */;

/* removed: var _$iqCallee_43 = require("@xmpp/iq/callee"); */;

/* removed: var _$resolve_55 = require("@xmpp/resolve"); */; // Stream features - order matters and define priority


/* removed: var _$sasl_62 = require("@xmpp/sasl"); */;

/* removed: var _$resourceBinding_59 = require("@xmpp/resource-binding"); */;

/* removed: var _$sessionEstablishment_64 = require("@xmpp/session-establishment"); */;

/* removed: var _$streamManagement_67 = require("@xmpp/stream-management"); */; // SASL mechanisms - order matters and define priority


/* removed: var _$saslAnonymous_60 = require("@xmpp/sasl-anonymous"); */;

/* removed: var _$saslPlain_61 = require("@xmpp/sasl-plain"); */;

function client(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      resource = _options.resource,
      credentials = _options.credentials,
      username = _options.username,
      password = _options.password,
      params = (0, _objectWithoutPropertiesLoose2.default)(_options, ["resource", "credentials", "username", "password"]);
  var domain = params.domain,
      service = params.service;

  if (!domain && service) {
    params.domain = _$getDomain_30(service);
  }

  var entity = new __Client_31(params);

  var reconnect = _$reconnect_54({
    entity: entity
  });

  var websocket = _$websocket_68({
    entity: entity
  });

  var middleware = _$middleware_49({
    entity: entity
  });

  var streamFeatures = _$streamFeatures_65({
    middleware: middleware
  });

  var iqCaller = _$iqCaller_44({
    middleware: middleware,
    entity: entity
  });

  var iqCallee = _$iqCallee_43({
    middleware: middleware,
    entity: entity
  });

  var resolve = _$resolve_55({
    entity: entity
  }); // Stream features - order matters and define priority


  var sasl = _$sasl_62({
    streamFeatures: streamFeatures
  }, credentials || {
    username: username,
    password: password
  });

  var streamManagement = _$streamManagement_67({
    streamFeatures: streamFeatures,
    entity: entity,
    middleware: middleware
  });

  var resourceBinding = _$resourceBinding_59({
    iqCaller: iqCaller,
    streamFeatures: streamFeatures
  }, resource);

  var sessionEstablishment = _$sessionEstablishment_64({
    iqCaller: iqCaller,
    streamFeatures: streamFeatures
  }); // SASL mechanisms - order matters and define priority


  var mechanisms = Object.entries({
    plain: _$saslPlain_61,
    anonymous: _$saslAnonymous_60
  }).map(function (_ref) {
    var _ref2;

    var k = _ref[0],
        v = _ref[1];
    return _ref2 = {}, _ref2[k] = v(sasl), _ref2;
  });
  return Object.assign(entity, {
    entity: entity,
    reconnect: reconnect,
    websocket: websocket,
    middleware: middleware,
    streamFeatures: streamFeatures,
    iqCaller: iqCaller,
    iqCallee: iqCallee,
    resolve: resolve,
    sasl: sasl,
    resourceBinding: resourceBinding,
    sessionEstablishment: sessionEstablishment,
    streamManagement: streamManagement,
    mechanisms: mechanisms
  });
}

_$client_31.xml = __xml_31;
_$client_31.jid = __jid_31;
_$client_31.client = client;

return _$client_31;

});
//# sourceMappingURL=xmpp.js.map
