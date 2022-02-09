(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SCVConnectorBase", [], factory);
	else if(typeof exports === 'object')
		exports["SCVConnectorBase"] = factory();
	else
		root["SCVConnectorBase"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(10);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(4)["default"];

var assertThisInitialized = __webpack_require__(11);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "initializeConnector", function() { return /* reexport */ initializeConnector; });
__webpack_require__.d(__webpack_exports__, "publishEvent", function() { return /* reexport */ publishEvent; });
__webpack_require__.d(__webpack_exports__, "publishError", function() { return /* reexport */ publishError; });
__webpack_require__.d(__webpack_exports__, "publishLog", function() { return /* reexport */ publishLog; });
__webpack_require__.d(__webpack_exports__, "log", function() { return /* reexport */ log; });
__webpack_require__.d(__webpack_exports__, "Constants", function() { return /* reexport */ Constants; });
__webpack_require__.d(__webpack_exports__, "ActiveCallsResult", function() { return /* reexport */ types_ActiveCallsResult; });
__webpack_require__.d(__webpack_exports__, "AgentConfigResult", function() { return /* reexport */ types_AgentConfigResult; });
__webpack_require__.d(__webpack_exports__, "AgentConfig", function() { return /* reexport */ types_AgentConfig; });
__webpack_require__.d(__webpack_exports__, "RecordingToggleResult", function() { return /* reexport */ types_RecordingToggleResult; });
__webpack_require__.d(__webpack_exports__, "ParticipantResult", function() { return /* reexport */ types_ParticipantResult; });
__webpack_require__.d(__webpack_exports__, "SignedRecordingUrlResult", function() { return /* reexport */ types_SignedRecordingUrlResult; });
__webpack_require__.d(__webpack_exports__, "PhoneContactsResult", function() { return /* reexport */ types_PhoneContactsResult; });
__webpack_require__.d(__webpack_exports__, "CallResult", function() { return /* reexport */ types_CallResult; });
__webpack_require__.d(__webpack_exports__, "HangupResult", function() { return /* reexport */ types_HangupResult; });
__webpack_require__.d(__webpack_exports__, "HoldToggleResult", function() { return /* reexport */ types_HoldToggleResult; });
__webpack_require__.d(__webpack_exports__, "InitResult", function() { return /* reexport */ types_InitResult; });
__webpack_require__.d(__webpack_exports__, "GenericResult", function() { return /* reexport */ types_GenericResult; });
__webpack_require__.d(__webpack_exports__, "MuteToggleResult", function() { return /* reexport */ types_MuteToggleResult; });
__webpack_require__.d(__webpack_exports__, "LogoutResult", function() { return /* reexport */ types_LogoutResult; });
__webpack_require__.d(__webpack_exports__, "CallInfo", function() { return /* reexport */ types_CallInfo; });
__webpack_require__.d(__webpack_exports__, "PhoneCall", function() { return /* reexport */ types_PhoneCall; });
__webpack_require__.d(__webpack_exports__, "PhoneCallAttributes", function() { return /* reexport */ types_PhoneCallAttributes; });
__webpack_require__.d(__webpack_exports__, "Contact", function() { return /* reexport */ types_Contact; });
__webpack_require__.d(__webpack_exports__, "Phone", function() { return /* reexport */ types_Phone; });
__webpack_require__.d(__webpack_exports__, "AgentStatusInfo", function() { return /* reexport */ types_AgentStatusInfo; });
__webpack_require__.d(__webpack_exports__, "AudioStatsElement", function() { return /* reexport */ types_AudioStatsElement; });
__webpack_require__.d(__webpack_exports__, "AudioStats", function() { return /* reexport */ types_AudioStats; });
__webpack_require__.d(__webpack_exports__, "StatsInfo", function() { return /* reexport */ types_StatsInfo; });
__webpack_require__.d(__webpack_exports__, "VendorConnector", function() { return /* reexport */ types_VendorConnector; });
__webpack_require__.d(__webpack_exports__, "SuperviseCallResult", function() { return /* reexport */ types_SuperviseCallResult; });
__webpack_require__.d(__webpack_exports__, "SupervisorHangupResult", function() { return /* reexport */ types_SupervisorHangupResult; });
__webpack_require__.d(__webpack_exports__, "SupervisedCallInfo", function() { return /* reexport */ types_SupervisedCallInfo; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(2);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(4);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(3);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// CONCATENATED MODULE: ./src/main/constants.js
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* harmony default export */ var constants = ({
  MESSAGE_TYPE: {
    // Framework Message Types
    SETUP_CONNECTOR: 'SETUP_CONNECTOR',
    CONNECTOR_READY: 'CONNECTOR_READY',
    // Telephony Message Types: sent from SFDC to Telephony Vendor
    LOG: 'LOG',
    TELEPHONY_EVENT_DISPATCHED: 'TELEPHONY_EVENT_DISPATCHED',
    ACCEPT_CALL: 'ACCEPT_CALL',
    DECLINE_CALL: 'DECLINE_CALL',
    END_CALL: 'END_CALL',
    MUTE: 'MUTE',
    UNMUTE: 'UNMUTE',
    HOLD: 'HOLD',
    RESUME: 'RESUME',
    SET_AGENT_STATUS: 'SET_AGENT_STATUS',
    GET_AGENT_STATUS: 'GET_AGENT_STATUS',
    DIAL: 'DIAL',
    SEND_DIGITS: 'SEND_DIGITS',
    GET_PHONE_CONTACTS: 'GET_PHONE_CONTACTS',
    SWAP_PARTICIPANTS: 'SWAP_PARTICIPANTS',
    ADD_PARTICIPANT: 'ADD_PARTICIPANT',
    CONFERENCE: 'CONFERENCE',
    PAUSE_RECORDING: 'PAUSE_RECORDING',
    RESUME_RECORDING: 'RESUME_RECORDING',
    LOGOUT: 'LOGOUT',
    MESSAGE: 'MESSAGE',
    WRAP_UP_CALL: 'WRAP_UP_CALL',
    AGENT_AVAILABLE: 'AGENT_AVAILABLE',
    SET_AGENT_CONFIG: 'SET_AGENT_CONFIG',
    GET_SIGNED_RECORDING_URL: 'GET_SIGNED_RECORDING_URL',
    DOWNLOAD_VENDOR_LOGS: 'DOWNLOAD_VENDOR_LOGS',
    SUPERVISE_CALL: 'SUPERVISE_CALL',
    SUPERVISOR_BARGE_IN: 'SUPERVISOR_BARGE_IN',
    SUPERVISOR_DISCONNECT: 'SUPERVISOR_DISCONNECT'
  },
  EVENT_TYPE: {
    PREVIEW_CALL_STARTED: 'PREVIEW_CALL_STARTED',
    QUEUED_CALL_STARTED: 'QUEUED_CALL_STARTED',
    CALL_STARTED: 'CALL_STARTED',
    CALL_CONNECTED: 'CALL_CONNECTED',
    CALL_FAILED: 'CALL_FAILED',
    MUTE_TOGGLE: 'MUTE_TOGGLE',
    HOLD_TOGGLE: 'HOLD_TOGGLE',
    HANGUP: 'HANGUP',
    ERROR: 'ERROR',
    PHONE_CONTACTS: 'PHONE_CONTACTS',
    PARTICIPANT_ADDED: 'PARTICIPANT_ADDED',
    PARTICIPANT_CONNECTED: 'PARTICIPANT_CONNECTED',
    PARTICIPANT_REMOVED: 'PARTICIPANT_REMOVED',
    LOGIN_STARTED: 'LOGIN_STARTED',
    LOGIN_RESULT: 'LOGIN_RESULT',
    // info about timeout, error, success etc
    LOGOUT_RESULT: 'LOGOUT_RESULT',
    RECORDING_TOGGLE: 'RECORDING_TOGGLE',
    PARTICIPANTS_SWAPPED: 'PARTICIPANTS_SWAPPED',
    PARTICIPANTS_CONFERENCED: 'PARTICIPANTS_CONFERENCED',
    SHOW_LOGIN: 'SHOW_LOGIN',
    SET_AGENT_STATUS_RESULT: 'SET_AGENT_STATUS_RESULT',
    GET_AGENT_STATUS_RESULT: 'GET_AGENT_STATUS_RESULT',
    WRAP_UP_ENDED: 'WRAP_UP_ENDED',
    MESSAGE: 'MESSAGE',
    AFTER_CALL_WORK_STARTED: 'AFTER_CALL_WORK_STARTED',
    AGENT_CONFIG_UPDATED: 'AGENT_CONFIG_UPDATED',
    AGENT_ERROR: 'AGENT_ERROR',
    SOFTPHONE_ERROR: 'SOFTPHONE_ERROR',
    SIGNED_RECORDING_URL: 'SIGNED_RECORDING_URL',
    UPDATE_AUDIO_STATS: 'UPDATE_AUDIO_STATS',
    UPDATE_AUDIO_STATS_COMPLETED: 'UPDATE_AUDIO_STATS_COMPLETED',
    SUPERVISOR_BARGED_IN: 'SUPERVISOR_BARGED_IN',
    SUPERVISOR_CALL_STARTED: 'SUPERVISOR_CALL_STARTED',
    SUPERVISOR_CALL_CONNECTED: 'SUPERVISOR_CALL_CONNECTED',
    SUPERVISOR_HANGUP: 'SUPERVISOR_HANGUP',
    CALL_BARGED_IN: 'CALL_BARGED_IN',
    SET_AGENT_STATUS: 'SET_AGENT_STATUS',
    GET_AGENT_STATUS: 'GET_AGENT_STATUS'
  },
  ERROR_TYPE: {
    GENERIC_ERROR: 'GENERIC_ERROR',
    AGENT_ERROR: 'AGENT_ERROR',
    MICROPHONE_NOT_SHARED: 'MICROPHONE_NOT_SHARED',
    UNSUPPORTED_BROWSER: 'UNSUPPORTED_BROWSER',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    INVALID_AGENT_STATUS: 'INVALID_AGENT_STATUS',
    CAN_NOT_SET_AGENT_STATUS: 'CAN_NOT_SET_AGENT_STATUS',
    LOGIN_REQUIRED: 'LOGIN_REQUIRED',
    CAN_NOT_ACCEPT_THE_CALL: 'CAN_NOT_ACCEPT_THE_CALL',
    CAN_NOT_DECLINE_THE_CALL: 'CAN_NOT_DECLINE_THE_CALL',
    CAN_NOT_END_THE_CALL: 'CAN_NOT_END_THE_CALL',
    CAN_NOT_HOLD_CALL: 'CAN_NOT_HOLD_CALL',
    CAN_NOT_RESUME_CALL: 'CAN_NOT_RESUME_CALL',
    CAN_NOT_MUTE_CALL: 'CAN_NOT_MUTE_CALL',
    CAN_NOT_UNMUTE_CALL: 'CAN_NOT_UNMUTE_CALL',
    CAN_NOT_TOGGLE_MUTE: 'CAN_NOT_TOGGLE_MUTE',
    CAN_NOT_TOGGLE_HOLD: 'CAN_NOT_TOGGLE_HOLD',
    CAN_NOT_TOGGLE_RECORD: 'CAN_NOT_TOGGLE_RECORD',
    INVALID_PARTICIPANT: 'INVALID_PARTICIPANT',
    CAN_NOT_LOG_IN: 'CAN_NOT_LOG_IN',
    CAN_NOT_LOG_OUT: 'CAN_NOT_LOG_OUT',
    INVALID_PARAMS: 'INVALID_PARAMS',
    CAN_NOT_GET_PHONE_CONTACTS: 'CAN_NOT_GET_PHONE_CONTACTS',
    CAN_NOT_SWAP_PARTICIPANTS: 'CAN_NOT_SWAP_PARTICIPANTS',
    CAN_NOT_CONFERENCE: 'CAN_NOT_CONFERENCE',
    INVALID_DESTINATION: 'INVALID_DESTINATION',
    INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',
    CAN_NOT_HANGUP_PARTICIPANT: 'CAN_NOT_HANGUP_PARTICIPANT',
    CAN_NOT_ADD_PARTICIPANT: 'CAN_NOT_ADD_PARTICIPANT',
    CAN_NOT_CONNECT_PARTICIPANT: 'CAN_NOT_CONNECT_PARTICIPANT',
    CAN_NOT_START_THE_CALL: 'CAN_NOT_START_THE_CALL',
    CAN_NOT_PAUSE_RECORDING: 'CAN_NOT_PAUSE_RECORDING',
    CAN_NOT_RESUME_RECORDING: 'CAN_NOT_RESUME_RECORDING',
    CAN_NOT_SET_AGENT_CONFIG: 'CAN_NOT_SET_AGENT_CONFIG',
    CAN_NOT_UPDATE_PHONE_NUMBER: 'CAN_NOT_UPDATE_PHONE_NUMBER',
    CAN_NOT_GET_SIGNED_RECORDING_URL: 'CAN_NOT_GET_SIGNED_RECORDING_URL',
    CAN_NOT_SUPERVISE_CALL: 'CAN_NOT_SUPERVISE_CALL',
    CAN_NOT_DISCONNECT_SUPERVISOR: 'CAN_NOT_DISCONNECT_SUPERVISOR',
    CAN_NOT_BARGE_IN_SUPERVISOR: 'CAN_NOT_BARGE_IN_SUPERVISOR',
    CAN_NOT_BARGE_IN_CALL: 'CAN_NOT_BARGE_IN_CALL',
    CAN_NOT_GET_AGENT_STATUS: 'CAN_NOT_GET_AGENT_STATUS'
  },
  AGENT_STATUS: {
    ONLINE: 'Online',
    OFFLINE: 'Offline',
    ACW: 'AfterCallWork',
    CALLBACK_MISSED_OR_REJECTED: 'CallbackMissedOrRejected' // Used only for Amazon; workaround for https://github.com/amazon-connect/amazon-connect-streams/issues/344

  },
  PARTICIPANT_TYPE: {
    AGENT: 'Agent',
    INITIAL_CALLER: 'Initial_Caller',
    THIRD_PARTY: 'Third_Party',
    SUPERVISOR: 'Supervisor'
  },
  CALL_TYPE: {
    INBOUND: 'Inbound',
    OUTBOUND: 'Outbound',
    CALLBACK: 'Callback',
    ADD_PARTICIPANT: 'AddParticipant'
  },
  DIALER_TYPE: {
    OUTBOUND_PREVIEW: 'OutboundPreview',
    NONE: 'None'
  },
  CONTACT_TYPE: {
    PHONEBOOK: 'PhoneBook',
    QUEUE: 'Queue',
    PHONENUMBER: 'PhoneNumber',
    AGENT: 'Agent'
  },
  AGENT_CONFIG_TYPE: {
    SHOW_AGENT_SETTINGS: 'SHOW_AGENT_SETTINGS',
    MUTE: 'MUTE',
    RECORD: 'RECORD',
    MERGE: 'MERGE',
    SWAP: 'SWAP',
    PHONES: 'PHONES',
    SELECTED_PHONE: 'SELECTED_PHONE',
    SIGNED_RECORDING_URL: 'SIGNED_RECORDING_URL',
    DEBUG_ENABLED: 'DEBUG_ENABLED',
    CONTACT_SEARCH: 'CONTACT_SEARCH',
    VENDOR_PROVIDED_AVAILABILITY: 'VENDOR_PROVIDED_AVAILABILITY',
    SUPERVISOR_LISTEN_IN: 'SUPERVISOR_LISTEN_IN',
    SUPERVISOR_BARGE_IN: 'SUPERVISOR_BARGE_IN',
    MOS: 'MOS'
  },
  CALL_STATE: {
    RINGING: 'ringing',
    CONNECTED: 'connected',
    TRANSFERRING: 'transferring',
    TRANSFERRED: 'transferred',
    ENDED: 'ended'
  },
  PHONE_TYPE: {
    DESK_PHONE: 'DESK_PHONE',
    SOFT_PHONE: 'SOFT_PHONE'
  },
  HANGUP_REASON: {
    PHONE_CALL_ERROR: "error",
    PHONE_CALL_ENDED: "ended"
  },
  AGENT_AVAILABILITY: {
    AVAILABLE: "AVAILABLE",
    BUSY: "BUSY",
    OFFLINE: "OFFLINE"
  },
  REMOVE_PARTICIPANT_VARIANT: {
    ALWAYS: 'ALWAYS',
    NEVER: 'NEVER',
    ALWAYS_EXCEPT_ON_HOLD: 'ALWAYS_EXCEPT_ON_HOLD'
  },
  LOG_LEVEL: {
    ERROR: "ERROR",
    INFO: "INFO"
  },
  LOG_SOURCE: {
    SYSTEM: "SYSTEM",
    PARTNER: "PARTNER"
  },
  STATUS_TYPE: {
    OMNI: "OMNI",
    VENDOR: "VENDOR"
  }
});
/**
 * Fields in the connector configuration that are logged. 
 */

var CONNECTOR_CONFIG_EXPOSED_FIELDS = ["/internalNameLabel", "/reqGeneralInfo/reqAdapterUrl", "/reqGeneralInfo/reqVendorInfoApiName", "isACWAllowed", "isHVSEnabled", "orgDomainName", "phoneServiceChannelId", "telephonySettingsComponentFqn"];
/**
 * Fields that starts with string in the connector configuration that are logged. 
 */

var CONNECTOR_CONFIG_EXPOSED_FIELDS_STARTSWITH = ["/reqHvcc"];
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(7);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(8);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(6);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(0);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(1);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// CONCATENATED MODULE: ./src/main/downloadData.js
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Download data as a file.
 * @param {object} data 
 * @param {string} fileName 
 * @param {string} fileType
 */
function downloadData(data, fileName, fileType) {
  if (!document || !data) return;
  var dataStr = typeof data === 'string' ? data : JSON.stringify(data);
  var file = new Blob([dataStr], {
    type: fileType
  });
  var a = document.createElement("a");
  var blobURL = URL.createObjectURL(file);
  a.download = fileName;
  a.href = blobURL;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobURL);
}
// CONCATENATED MODULE: ./src/main/logger.js
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

 //The max size of the logs in # of characaters

var MAX_LOGS_SIZE = 1.5e7 / 2; //15 MB or 7.5M characters

var _strify = function _strify(obj) {
  return typeof obj === 'string' ? obj : JSON.stringify(obj);
};

var LOGS_SIZE = 0;
var logs = [];

function _log(logLevel, logMessage, logSource) {
  if (!logMessage) {
    throw new Error("Log Message required");
  }

  logLevel = logLevel || constants.LOG_LEVEL.INFO;
  logSource = logSource || constants.LOG_SOURCE.PARTNER;
  var logStr = [new Date().toISOString(), _strify(logLevel), _strify(logSource), "".concat(_strify(logMessage), "\n")].join("|"); //If logs size is greater than max size, empty it.

  if (LOGS_SIZE + logStr.length >= MAX_LOGS_SIZE) {
    logs = [];
    LOGS_SIZE = 0;
  }

  LOGS_SIZE += logStr.length;
  logs.push(logStr);
}
/**
 * Log a message at a custom level.
 * @param {object} logMessage
 * @param {string} logLevel 
 * @param {string} [logSource]
 */


function log(logMessage, logLevel, logSource) {
  _log(logLevel, logMessage, logSource);
}
/**
 * 
 * @returns a deep copy of the logs array
 */

function getLogs() {
  return JSON.parse(JSON.stringify(logs));
}
/**
 * Download the logs as a file
 */

function logger_downloadLogs() {
  downloadData(logs.join(''), "log-".concat(new Date().getTime(), ".txt"), 'text/plain');
}
// CONCATENATED MODULE: ./src/main/types.js








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* eslint-disable no-unused-vars */


var Constants = {
  EVENT_TYPE: {
    LOGIN_RESULT: constants.EVENT_TYPE.LOGIN_RESULT,
    LOGOUT_RESULT: constants.EVENT_TYPE.LOGOUT_RESULT,
    CALL_STARTED: constants.EVENT_TYPE.CALL_STARTED,
    QUEUED_CALL_STARTED: constants.EVENT_TYPE.QUEUED_CALL_STARTED,
    PREVIEW_CALL_STARTED: constants.EVENT_TYPE.PREVIEW_CALL_STARTED,
    CALL_CONNECTED: constants.EVENT_TYPE.CALL_CONNECTED,
    HANGUP: constants.EVENT_TYPE.HANGUP,
    MUTE_TOGGLE: constants.EVENT_TYPE.MUTE_TOGGLE,
    HOLD_TOGGLE: constants.EVENT_TYPE.HOLD_TOGGLE,
    RECORDING_TOGGLE: constants.EVENT_TYPE.RECORDING_TOGGLE,
    PARTICIPANTS_SWAPPED: constants.EVENT_TYPE.PARTICIPANTS_SWAPPED,
    PARTICIPANTS_CONFERENCED: constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED,
    PARTICIPANT_ADDED: constants.EVENT_TYPE.PARTICIPANT_ADDED,
    PARTICIPANT_CONNECTED: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
    PARTICIPANT_REMOVED: constants.EVENT_TYPE.PARTICIPANT_REMOVED,
    MESSAGE: constants.EVENT_TYPE.MESSAGE,
    AFTER_CALL_WORK_STARTED: constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED,
    WRAP_UP_ENDED: constants.EVENT_TYPE.WRAP_UP_ENDED,
    AGENT_ERROR: constants.EVENT_TYPE.AGENT_ERROR,
    SOFTPHONE_ERROR: constants.EVENT_TYPE.SOFTPHONE_ERROR,
    UPDATE_AUDIO_STATS: constants.EVENT_TYPE.UPDATE_AUDIO_STATS,
    SUPERVISOR_BARGED_IN: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN,
    SUPERVISOR_CALL_STARTED: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED,
    SUPERVISOR_CALL_CONNECTED: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,
    SUPERVISOR_HANGUP: constants.EVENT_TYPE.SUPERVISOR_HANGUP,
    SET_AGENT_STATUS: constants.EVENT_TYPE.SET_AGENT_STATUS,
    GET_AGENT_STATUS: constants.EVENT_TYPE.GET_AGENT_STATUS
  },

  /**
  * @enum {string}
  */
  ERROR_TYPE: {
    GENERIC_ERROR: constants.ERROR_TYPE.GENERIC_ERROR,
    INVALID_PARTICIPANT: constants.ERROR_TYPE.INVALID_PARTICIPANT,
    INVALID_DESTINATION: constants.ERROR_TYPE.INVALID_DESTINATION,
    INVALID_PARAMS: constants.ERROR_TYPE.INVALID_PARAMS,
    INVALID_AGENT_STATUS: constants.ERROR_TYPE.INVALID_AGENT_STATUS,
    CAN_NOT_UPDATE_PHONE_NUMBER: constants.ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER
  },

  /**
  * @enum {string}
  */
  AGENT_STATUS: _objectSpread({}, constants.AGENT_STATUS),

  /**
  * @enum {string}
  */
  PARTICIPANT_TYPE: _objectSpread({}, constants.PARTICIPANT_TYPE),

  /**
  * @enum {string}
  */
  CALL_TYPE: _objectSpread({}, constants.CALL_TYPE),

  /**
  * @enum {string}
  */
  DIALER_TYPE: _objectSpread({}, constants.DIALER_TYPE),

  /**
  * @enum {string}
  */
  CONTACT_TYPE: _objectSpread({}, constants.CONTACT_TYPE),

  /**
  * @enum {string}
  */
  CALL_STATE: _objectSpread({}, constants.CALL_STATE),

  /**
  * @enum {string}
  */
  HANGUP_REASON: _objectSpread({}, constants.HANGUP_REASON),

  /**
  * @enum {string}
  */
  PHONE_TYPE: _objectSpread({}, constants.PHONE_TYPE),

  /**
   * @enum {String}
   */
  AGENT_AVAILABILITY: _objectSpread({}, constants.AGENT_AVAILABILITY),

  /**
   * @enum (String)
   */
  REMOVE_PARTICIPANT_VARIANT: _objectSpread({}, constants.REMOVE_PARTICIPANT_VARIANT),

  /**
   * @enum {String}
   */
  LOG_LEVEL: _objectSpread({}, constants.LOG_LEVEL),

  /**
   * @enum {String}
   */
  AgentStatusType: _objectSpread({}, constants.STATUS_TYPE)
};
/**
 * Class representing a Phone type
 */

var types_Phone = /*#__PURE__*/createClass_default()(
/**
 * Create Phone
 * @param {object} param
 * @param {PHONE_TYPE} param.type
 * @param {string} [param.number]
 */
function Phone(_ref) {
  var type = _ref.type,
      number = _ref.number;

  classCallCheck_default()(this, Phone);

  types_Validator.validateEnum(type, Object.values(constants.PHONE_TYPE));

  if (number) {
    types_Validator.validateString(number);
  }

  this.type = type;
  this.number = number;
});
/**
 * Class representing result type for mute() & unmute()
 */

var types_MuteToggleResult = /*#__PURE__*/createClass_default()(
/**
 * Create ActiveCallsResult
 * @param {object} param
 * @param {boolean} param.isMuted
 */
function MuteToggleResult(_ref2) {
  var isMuted = _ref2.isMuted;

  classCallCheck_default()(this, MuteToggleResult);

  this.isMuted = isMuted;
});
/**
 * Class representing result type for getActiveCalls()
 */

var types_ActiveCallsResult = /*#__PURE__*/createClass_default()(
/**
 * Create ActiveCallsResult
 * @param {object} param
 * @param {PhoneCall[]} [param.activeCalls]
 */
function ActiveCallsResult(_ref3) {
  var _ref3$activeCalls = _ref3.activeCalls,
      activeCalls = _ref3$activeCalls === void 0 ? [] : _ref3$activeCalls;

  classCallCheck_default()(this, ActiveCallsResult);

  if (activeCalls.length > 0) {
    activeCalls.forEach(function (activeCall) {
      types_Validator.validateClassObject(activeCall, types_PhoneCall);
    });
  }

  this.activeCalls = activeCalls;
});
/**
 * Class representing result type for getAgentConfig()
 */

var types_AgentConfigResult = /*#__PURE__*/createClass_default()(
/**
 * Create AgentConfigResult
 * @param {object} param
 * @param {boolean} [param.hasMute]
 * @param {boolean} [param.hasRecord]
 * @param {boolean} [param.hasMerge]
 * @param {boolean} [param.hasSwap]
 * @param {boolean} [param.hasSignedRecordingUrl]
 * @param {Phone[]} [param.phones]
 * @param {Phone} [param.selectedPhone]
 * @param {boolean} [param.debugEnabled]
 * @param {boolean} [param.hasContactSearch] True if getPhoneContacts uses the 'contain' filter
 * @param {boolean} [param.hasAgentAvailability] True if getPhoneContacts also provides agent availability
 * @param {boolean} [param.supportsMos] True if vendor support MOS
 * @param {boolean} [param.hasSupervisorListenIn] True if vendor supports supervisor listening  to a ongoing call
 * @param {boolean} [param.hasSupervisorBargeIn] True if vendor supports Supervisor  barging into a ongoing call
 */
function AgentConfigResult(_ref4) {
  var _ref4$hasMute = _ref4.hasMute,
      hasMute = _ref4$hasMute === void 0 ? true : _ref4$hasMute,
      _ref4$hasRecord = _ref4.hasRecord,
      hasRecord = _ref4$hasRecord === void 0 ? true : _ref4$hasRecord,
      _ref4$hasMerge = _ref4.hasMerge,
      hasMerge = _ref4$hasMerge === void 0 ? true : _ref4$hasMerge,
      _ref4$hasSwap = _ref4.hasSwap,
      hasSwap = _ref4$hasSwap === void 0 ? true : _ref4$hasSwap,
      _ref4$hasSignedRecord = _ref4.hasSignedRecordingUrl,
      hasSignedRecordingUrl = _ref4$hasSignedRecord === void 0 ? false : _ref4$hasSignedRecord,
      _ref4$phones = _ref4.phones,
      phones = _ref4$phones === void 0 ? [constants.PHONE_TYPE.SOFT_PHONE] : _ref4$phones,
      _ref4$selectedPhone = _ref4.selectedPhone,
      selectedPhone = _ref4$selectedPhone === void 0 ? new types_Phone({
    type: constants.PHONE_TYPE.SOFT_PHONE
  }) : _ref4$selectedPhone,
      _ref4$debugEnabled = _ref4.debugEnabled,
      debugEnabled = _ref4$debugEnabled === void 0 ? true : _ref4$debugEnabled,
      _ref4$hasContactSearc = _ref4.hasContactSearch,
      hasContactSearch = _ref4$hasContactSearc === void 0 ? false : _ref4$hasContactSearc,
      _ref4$hasAgentAvailab = _ref4.hasAgentAvailability,
      hasAgentAvailability = _ref4$hasAgentAvailab === void 0 ? false : _ref4$hasAgentAvailab,
      _ref4$supportsMos = _ref4.supportsMos,
      supportsMos = _ref4$supportsMos === void 0 ? false : _ref4$supportsMos,
      _ref4$hasSupervisorLi = _ref4.hasSupervisorListenIn,
      hasSupervisorListenIn = _ref4$hasSupervisorLi === void 0 ? false : _ref4$hasSupervisorLi,
      _ref4$hasSupervisorBa = _ref4.hasSupervisorBargeIn,
      hasSupervisorBargeIn = _ref4$hasSupervisorBa === void 0 ? false : _ref4$hasSupervisorBa;

  classCallCheck_default()(this, AgentConfigResult);

  types_Validator.validateBoolean(hasMute);
  types_Validator.validateBoolean(hasRecord);
  types_Validator.validateBoolean(hasMerge);
  types_Validator.validateBoolean(hasSwap);
  types_Validator.validateBoolean(hasSignedRecordingUrl);
  types_Validator.validateClassObject(phones, Array);
  types_Validator.validateBoolean(debugEnabled);
  types_Validator.validateClassObject(selectedPhone, types_Phone);
  types_Validator.validateBoolean(hasContactSearch);
  types_Validator.validateBoolean(hasAgentAvailability);
  types_Validator.validateBoolean(supportsMos);
  types_Validator.validateBoolean(hasSupervisorListenIn);
  types_Validator.validateBoolean(hasSupervisorBargeIn);
  this.hasMute = hasMute;
  this.hasRecord = hasRecord;
  this.hasMerge = hasMerge;
  this.hasSwap = hasSwap;
  this.hasSignedRecordingUrl = hasSignedRecordingUrl;
  this.phones = phones;
  this.selectedPhone = selectedPhone;
  this.debugEnabled = debugEnabled;
  this.hasContactSearch = hasContactSearch;
  this.hasAgentAvailability = hasAgentAvailability;
  this.supportsMos = supportsMos;
  this.hasSupervisorListenIn = hasSupervisorListenIn;
  this.hasSupervisorBargeIn = hasSupervisorBargeIn;
});
/**
 * Class representing AgentConfig type for setAgentConfig()
 */

var types_AgentConfig = /*#__PURE__*/createClass_default()(
/**
 * Create AgentConfig
 * @param {object} param
 * @param {Phone} [param.selectedPhone]
 */
function AgentConfig(_ref5) {
  var selectedPhone = _ref5.selectedPhone;

  classCallCheck_default()(this, AgentConfig);

  types_Validator.validateClassObject(selectedPhone, types_Phone);
  this.selectedPhone = selectedPhone;
});
/**
 * Class representing result type for pauseRecording() & resumeRecording
 */

var types_RecordingToggleResult = /*#__PURE__*/createClass_default()(
/**
 * Create RecordingToggleResult
 * @param {object} param
 * @param {boolean} param.isRecordingPaused
 * @param {string} [param.contactId]
 * @param {string} [param.initialContactId]
 * @param {string} [param.instanceId]
 * @param {string} [param.region]
 */
function RecordingToggleResult(_ref6) {
  var isRecordingPaused = _ref6.isRecordingPaused,
      _ref6$contactId = _ref6.contactId,
      contactId = _ref6$contactId === void 0 ? null : _ref6$contactId,
      _ref6$initialContactI = _ref6.initialContactId,
      initialContactId = _ref6$initialContactI === void 0 ? null : _ref6$initialContactI,
      _ref6$instanceId = _ref6.instanceId,
      instanceId = _ref6$instanceId === void 0 ? null : _ref6$instanceId,
      _ref6$region = _ref6.region,
      region = _ref6$region === void 0 ? null : _ref6$region;

  classCallCheck_default()(this, RecordingToggleResult);

  this.isRecordingPaused = isRecordingPaused;
  this.contactId = contactId;
  this.initialContactId = initialContactId;
  this.instanceId = instanceId;
  this.region = region;
});
/**
 * Class representing result type for addParticipant()
 */

var types_ParticipantResult = /*#__PURE__*/createClass_default()(
/**
 * Create ParticipantResult
 * @param {object} param
 * @param {boolean} param.initialCallHasEnded
 * @param {CallInfo} param.callInfo
 * @param {string} param.phoneNumber
 * @param {string} param.callId
 */
function ParticipantResult(_ref7) {
  var initialCallHasEnded = _ref7.initialCallHasEnded,
      callInfo = _ref7.callInfo,
      phoneNumber = _ref7.phoneNumber,
      callId = _ref7.callId;

  classCallCheck_default()(this, ParticipantResult);

  types_Validator.validateClassObject(callInfo, types_CallInfo);
  this.initialCallHasEnded = initialCallHasEnded;
  this.callInfo = callInfo;
  this.phoneNumber = phoneNumber;
  this.callId = callId;
});
/**
 * Class representing result type for getPhoneContacts()
 */

var types_PhoneContactsResult = /*#__PURE__*/createClass_default()(
/**
 * Create PhoneContactsResult
 * @param {object} param
 * @param {Contact[]} [param.contacts]
 */
function PhoneContactsResult(_ref8) {
  var _ref8$contacts = _ref8.contacts,
      contacts = _ref8$contacts === void 0 ? [] : _ref8$contacts;

  classCallCheck_default()(this, PhoneContactsResult);

  if (contacts.length > 0) {
    contacts.forEach(function (contact) {
      types_Validator.validateClassObject(contact, types_Contact);
    });
  }

  this.contacts = contacts;
});
/**
 * Class representing result type for accept(), decline(), dial()
 */

var types_CallResult = /*#__PURE__*/createClass_default()(
/**
 * Create CallResult
 * @param {object} param
 * @param {PhoneCall} [param.call]
 */
function CallResult(_ref9) {
  var call = _ref9.call;

  classCallCheck_default()(this, CallResult);

  if (call !== undefined) {
    types_Validator.validateClassObject(call, types_PhoneCall);
  }

  this.call = call;
});
/**
 * Class representing result type for endCall(), hangup()
 */

var types_HangupResult = /*#__PURE__*/createClass_default()(
/**
 * Create CallResult
 * @param {object} param
 * @param {PhoneCall[]|PhoneCall} param.calls - one or more calls (can be multiple calls in case of agent endcall/hangup)
 */
function HangupResult(_ref10) {
  var calls = _ref10.calls;

  classCallCheck_default()(this, HangupResult);

  if (calls instanceof Array) {
    calls.forEach(function (call) {
      return types_Validator.validateClassObject(call, types_PhoneCall);
    });
    this.calls = calls;
  } else {
    types_Validator.validateClassObject(calls, types_PhoneCall);
    this.calls = [calls];
  }
});
/**
 * Class representing result type for hold() & resume()
 */

var types_HoldToggleResult = /*#__PURE__*/createClass_default()(
/**
 * Create HoldToggleResult
 * @param {object} param
 * @param {boolean} param.isThirdPartyOnHold
 * @param {boolean} param.isCustomerOnHold
 * @param {PhoneCall[]} [param.calls]
 */
function HoldToggleResult(_ref11) {
  var isThirdPartyOnHold = _ref11.isThirdPartyOnHold,
      isCustomerOnHold = _ref11.isCustomerOnHold,
      calls = _ref11.calls;

  classCallCheck_default()(this, HoldToggleResult);

  if (calls) {
    Object.values(calls).forEach(function (call) {
      types_Validator.validateClassObject(call, types_PhoneCall);
    });
    this.calls = calls;
  }

  this.isThirdPartyOnHold = isThirdPartyOnHold;
  this.isCustomerOnHold = isCustomerOnHold;
});
/**
 * Class representing result type for getRecordingUrl
 */

var types_SignedRecordingUrlResult = /*#__PURE__*/createClass_default()(
/**
 * Create SignedRecordingUrlResult
 * @param {object} param
 * @param {boolean} param.success
 * @param {string} [param.url]
 * @param {number} [param.duration] in seconds
 * @param {string} [param.callId] Salesforce callId of the voice call
 */
function SignedRecordingUrlResult(_ref12) {
  var success = _ref12.success,
      url = _ref12.url,
      duration = _ref12.duration,
      callId = _ref12.callId;

  classCallCheck_default()(this, SignedRecordingUrlResult);

  if (success) {
    // For a successfull result, url is required
    types_Validator.validateString(url);
    types_Validator.validateString(callId);

    if (duration) {
      types_Validator.validateNumber(duration);
    }
  }

  this.success = success;
  this.url = url;
  this.duration = duration;
  this.callId = callId;
});
/**
 * Class representing result type for init()
 */

var types_InitResult = /*#__PURE__*/createClass_default()(
/**
 * Create InitResult
 * @param {object} param
 * @param {boolean} [param.showLogin]
 * @param {number} [param.loginFrameHeight]
 */
function InitResult(_ref13) {
  var _ref13$showLogin = _ref13.showLogin,
      showLogin = _ref13$showLogin === void 0 ? false : _ref13$showLogin,
      _ref13$loginFrameHeig = _ref13.loginFrameHeight,
      loginFrameHeight = _ref13$loginFrameHeig === void 0 ? 350 : _ref13$loginFrameHeig;

  classCallCheck_default()(this, InitResult);

  this.showLogin = showLogin;
  this.loginFrameHeight = loginFrameHeight;
});
/**
 * Class representing generic result type
 */

var types_GenericResult = /*#__PURE__*/createClass_default()(
/**
 * Create GenericResult
 * @param {object} param
 * @param {boolean} param.success
 */
function GenericResult(_ref14) {
  var success = _ref14.success;

  classCallCheck_default()(this, GenericResult);

  this.success = success;
});
/**
 * Class representing logout result type
 */

var types_LogoutResult = /*#__PURE__*/createClass_default()(
/**
 * Create LogoutResult
 * @param {object} param
 * @param {boolean} param.success
 * @param {number} [param.loginFrameHeight]
 */
function LogoutResult(_ref15) {
  var success = _ref15.success,
      _ref15$loginFrameHeig = _ref15.loginFrameHeight,
      loginFrameHeight = _ref15$loginFrameHeig === void 0 ? 350 : _ref15$loginFrameHeig;

  classCallCheck_default()(this, LogoutResult);

  this.success = success;
  this.loginFrameHeight = loginFrameHeight;
});
/**
 * Class representing callInfo class (call metadata)
 */

var types_CallInfo = /*#__PURE__*/createClass_default()(
/**
 * Create CallInfo
 * @param {object} param
 * @param {boolean} param.isOnHold
 * @param {boolean} param.isRecordingPaused
 * @param {boolean} param.isMuted
 * @param {string} [param.initialCallId]
 * @param {Date} [param.callStateTimestamp]
 * @param {boolean} [param.isSoftphoneCall] - is it a softphone call 
 * @param {boolean} [param.acceptEnabled]
 * @param {boolean} [param.declineEnabled]
 * @param {boolean} [param.muteEnabled]
 * @param {boolean} [param.swapEnabled]
 * @param {boolean} [param.conferenceEnabled]
 * @param {boolean} [param.holdEnabled]
 * @param {boolean} [param.recordEnabled]
 * @param {boolean} [param.addCallerEnabled]
 * @param {boolean} [param.extensionEnabled]
 * @param {boolean} [param.isReplayable]
 * @param {boolean} [param.isBargeable]
 * @param {boolean} [param.isExternalTransfer]
 * @param {("ALWAYS"|"NEVER"|"ALWAYS_EXCEPT_ON_HOLD")} [param.removeParticipantVariant] - The type of remove participant variant when in a transfer call. 
 */
function CallInfo(_ref16) {
  var _ref16$callStateTimes = _ref16.callStateTimestamp,
      callStateTimestamp = _ref16$callStateTimes === void 0 ? null : _ref16$callStateTimes,
      isOnHold = _ref16.isOnHold,
      _ref16$isMuted = _ref16.isMuted,
      isMuted = _ref16$isMuted === void 0 ? false : _ref16$isMuted,
      _ref16$isRecordingPau = _ref16.isRecordingPaused,
      isRecordingPaused = _ref16$isRecordingPau === void 0 ? false : _ref16$isRecordingPau,
      initialCallId = _ref16.initialCallId,
      _ref16$isSoftphoneCal = _ref16.isSoftphoneCall,
      isSoftphoneCall = _ref16$isSoftphoneCal === void 0 ? true : _ref16$isSoftphoneCal,
      _ref16$acceptEnabled = _ref16.acceptEnabled,
      acceptEnabled = _ref16$acceptEnabled === void 0 ? true : _ref16$acceptEnabled,
      _ref16$declineEnabled = _ref16.declineEnabled,
      declineEnabled = _ref16$declineEnabled === void 0 ? true : _ref16$declineEnabled,
      _ref16$muteEnabled = _ref16.muteEnabled,
      muteEnabled = _ref16$muteEnabled === void 0 ? true : _ref16$muteEnabled,
      _ref16$swapEnabled = _ref16.swapEnabled,
      swapEnabled = _ref16$swapEnabled === void 0 ? true : _ref16$swapEnabled,
      _ref16$conferenceEnab = _ref16.conferenceEnabled,
      conferenceEnabled = _ref16$conferenceEnab === void 0 ? true : _ref16$conferenceEnab,
      _ref16$holdEnabled = _ref16.holdEnabled,
      holdEnabled = _ref16$holdEnabled === void 0 ? true : _ref16$holdEnabled,
      _ref16$recordEnabled = _ref16.recordEnabled,
      recordEnabled = _ref16$recordEnabled === void 0 ? true : _ref16$recordEnabled,
      _ref16$addCallerEnabl = _ref16.addCallerEnabled,
      addCallerEnabled = _ref16$addCallerEnabl === void 0 ? true : _ref16$addCallerEnabl,
      _ref16$extensionEnabl = _ref16.extensionEnabled,
      extensionEnabled = _ref16$extensionEnabl === void 0 ? true : _ref16$extensionEnabl,
      _ref16$isReplayable = _ref16.isReplayable,
      isReplayable = _ref16$isReplayable === void 0 ? true : _ref16$isReplayable,
      _ref16$isBargeable = _ref16.isBargeable,
      isBargeable = _ref16$isBargeable === void 0 ? false : _ref16$isBargeable,
      isExternalTransfer = _ref16.isExternalTransfer,
      _ref16$removeParticip = _ref16.removeParticipantVariant,
      removeParticipantVariant = _ref16$removeParticip === void 0 ? Constants.REMOVE_PARTICIPANT_VARIANT.ALWAYS : _ref16$removeParticip;

  classCallCheck_default()(this, CallInfo);

  if (callStateTimestamp) {
    types_Validator.validateDate(callStateTimestamp);
  }

  types_Validator.validateBoolean(isRecordingPaused);
  types_Validator.validateBoolean(isMuted);
  types_Validator.validateBoolean(isSoftphoneCall);
  types_Validator.validateBoolean(acceptEnabled);
  types_Validator.validateBoolean(declineEnabled);
  types_Validator.validateBoolean(muteEnabled);
  types_Validator.validateBoolean(swapEnabled);
  types_Validator.validateBoolean(conferenceEnabled);
  types_Validator.validateBoolean(holdEnabled);
  types_Validator.validateBoolean(recordEnabled);
  types_Validator.validateBoolean(addCallerEnabled);
  types_Validator.validateBoolean(extensionEnabled);
  types_Validator.validateBoolean(isBargeable);

  if (isExternalTransfer !== undefined) {
    types_Validator.validateBoolean(isExternalTransfer);
  }

  types_Validator.validateEnum(removeParticipantVariant, Object.values(constants.REMOVE_PARTICIPANT_VARIANT));
  this.callStateTimestamp = callStateTimestamp;
  this.isRecordingPaused = isRecordingPaused;
  this.isMuted = isMuted;
  this.isOnHold = isOnHold;
  this.initialCallId = initialCallId;
  this.isSoftphoneCall = isSoftphoneCall;
  this.acceptEnabled = acceptEnabled;
  this.declineEnabled = declineEnabled;
  this.muteEnabled = muteEnabled;
  this.swapEnabled = swapEnabled;
  this.conferenceEnabled = conferenceEnabled;
  this.holdEnabled = holdEnabled;
  this.recordEnabled = recordEnabled;
  this.addCallerEnabled = addCallerEnabled;
  this.extensionEnabled = extensionEnabled;
  this.isReplayable = isReplayable;
  this.isBargeable = isBargeable;
  this.isExternalTransfer = isExternalTransfer;
  this.removeParticipantVariant = removeParticipantVariant;
});
/** 
 * Class representing a Contact. This object is used to represent 
 * phone system contact or any call target
 */

var types_Contact = /*#__PURE__*/createClass_default()(
/**
 * Create a Contact.
 * @param {object} param
 * @param {string} [param.id] - The unique contactId
 * @param {("PhoneBook"|"Queue"|"PhoneNumber"|"Agent")} [param.type] - The type of the contact, one of the CONTACT_TYPE values
 * @param {string} [param.name] - The label for this contact to be displayed in the UI
 * @param {string} [param.phoneNumber] - The phone number associcated with this contact
 * @param {string} [param.prefix] - Any prefix to be dialed before dialing the number (i.e. +1)
 * @param {string} [param.extension] - Any extension to be dialed after dialing the number
 * @param {string} [param.endpointARN]
 * @param {string} [param.queue]
 * @param {string} [param.availability]
 */
function Contact(_ref17) {
  var phoneNumber = _ref17.phoneNumber,
      id = _ref17.id,
      type = _ref17.type,
      name = _ref17.name,
      prefix = _ref17.prefix,
      extension = _ref17.extension,
      endpointARN = _ref17.endpointARN,
      queue = _ref17.queue,
      availability = _ref17.availability;

  classCallCheck_default()(this, Contact);

  if (phoneNumber) {
    types_Validator.validateString(phoneNumber);
  }

  if (type) {
    types_Validator.validateEnum(type, Object.values(constants.CONTACT_TYPE));
  }

  if (id) {
    types_Validator.validateString(id);
  }

  if (name) {
    types_Validator.validateString(name);
  }

  if (prefix) {
    types_Validator.validateString(prefix);
  }

  if (extension) {
    types_Validator.validateString(extension);
  }

  if (availability) {
    types_Validator.validateEnum(availability, Object.values(constants.AGENT_AVAILABILITY));
  }

  this.phoneNumber = phoneNumber;
  this.id = id;
  this.type = type;
  this.name = name;
  this.prefix = prefix;
  this.extension = extension;
  this.endpointARN = endpointARN;
  this.queue = queue;

  if (constants.CONTACT_TYPE.AGENT === this.type) {
    this.availability = availability;
  } else {
    this.availability = null;
  }
});
/** 
* Class representing PhoneCallAttributes
*/

var types_PhoneCallAttributes = /*#__PURE__*/createClass_default()(
/**
 * Create PhoneCallAttributes.
 * @param {object} param
 * @param {string} [param.voiceCallId] - The voice call id
 * @param {PARTICIPANT_TYPE} [param.participantType] - The participant type of the call
 * @param {DIALER_TYPE} [param.dialerType] - The dialer type of the call
 * @param {string} [param.parentId] - The parent call id of the call
 * @param {boolean} [param.isOnHold]
 */
function PhoneCallAttributes(_ref18) {
  var voiceCallId = _ref18.voiceCallId,
      participantType = _ref18.participantType,
      _ref18$dialerType = _ref18.dialerType,
      dialerType = _ref18$dialerType === void 0 ? Constants.DIALER_TYPE.NONE : _ref18$dialerType,
      parentId = _ref18.parentId,
      isOnHold = _ref18.isOnHold;

  classCallCheck_default()(this, PhoneCallAttributes);

  if (voiceCallId) {
    types_Validator.validateString(voiceCallId);
  }

  if (participantType) {
    types_Validator.validateEnum(participantType, Object.values(constants.PARTICIPANT_TYPE));
  }

  if (parentId) {
    types_Validator.validateString(parentId);
  }

  if (isOnHold !== undefined) {
    types_Validator.validateBoolean(isOnHold);
  }

  types_Validator.validateEnum(dialerType, Object.values(constants.DIALER_TYPE));
  this.voiceCallId = voiceCallId;
  this.participantType = participantType;
  this.parentId = parentId;
  this.isOnHold = isOnHold;
  this.dialerType = dialerType;
});
/** 
* Class representing a PhoneCall. 
*/

var types_PhoneCall = /*#__PURE__*/createClass_default()(
/**
 * Create a PhoneCall.
 * @param {object} param
 * @param {string} [param.callId] - The unique callId. This is a required parameter
 * @param {CALL_TYPE} [param.callType] - The type of the call, one of the CALL_TYPE values
 * @param {Contact} [param.contact] - The Call Target / Contact 
 * @param {string} [param.state] - The state of the call, i.e. ringing, connected, declined, failed 
 * @param {PhoneCallAttributes} [param.callAttributes] - Any additional call attributes
 * @param {string} [param.phoneNumber] - The phone number associated with this call (usually external number)
 * @param {CallInfo} [param.callInfo]
 * @param {string} [param.reason]
 * @param {boolean} [param.closeCallOnError]
 * @param {string} [param.agentStatus]
 */
function PhoneCall(_ref19) {
  var callId = _ref19.callId,
      callType = _ref19.callType,
      contact = _ref19.contact,
      state = _ref19.state,
      callAttributes = _ref19.callAttributes,
      phoneNumber = _ref19.phoneNumber,
      callInfo = _ref19.callInfo,
      reason = _ref19.reason,
      closeCallOnError = _ref19.closeCallOnError,
      agentStatus = _ref19.agentStatus;

  classCallCheck_default()(this, PhoneCall);

  // TODO: Revisit the required fields
  if (callId) {
    types_Validator.validateString(callId);
    this.callId = callId;
  }

  if (callType) {
    types_Validator.validateEnum(callType, Object.values(constants.CALL_TYPE));
    this.callType = callType;
  }

  if (phoneNumber) {
    types_Validator.validateString(phoneNumber);
    this.phoneNumber = phoneNumber;
  }

  if (callInfo) {
    types_Validator.validateClassObject(callInfo, types_CallInfo);
    this.callInfo = callInfo;
  }

  if (contact) {
    types_Validator.validateClassObject(contact, types_Contact);
    this.contact = contact;
  }

  if (reason) {
    this.reason = reason;
  }

  if (closeCallOnError) {
    this.closeCallOnError = closeCallOnError;
  }

  if (agentStatus) {
    this.agentStatus = agentStatus;
  }

  this.state = state;
  this.callAttributes = callAttributes;
});
/** 
* Class representing a VendorConnector
*/

var types_VendorConnector = /*#__PURE__*/function () {
  function VendorConnector() {
    classCallCheck_default()(this, VendorConnector);
  }

  createClass_default()(VendorConnector, [{
    key: "init",
    value:
    /**
     * Initialize the connector
     * @param {object} connectorConfig
     * @returns {Promise<InitResult>} 
     * 
     */
    function init(config) {
      throw new Error('Not implemented');
    }
    /**
     * Get the currently active calls
     * @returns {Promise<ActiveCallsResult>} 
     * 
     */

  }, {
    key: "getActiveCalls",
    value: function getActiveCalls() {
      throw new Error('Not implemented');
    }
    /**
     * Accept call
     * @param {PhoneCall} call - The call to be accepted
     * @returns {Promise<CallResult>} 
     * 
     */

  }, {
    key: "acceptCall",
    value: function acceptCall(call) {
      throw new Error('Not implemented');
    }
    /**
     * Decline call
     * @param {PhoneCall} call - The call to be declined
     * @returns {Promise<CallResult>} 
     * 
     */

  }, {
    key: "declineCall",
    value: function declineCall(call) {
      throw new Error('Not implemented');
    }
    /**
     * End call
     * @param {PhoneCall} call - The call to be ended
     * @param {AGENT_STATUS} agentStatus
     * @returns {Promise<HangupResult>} 
     * 
     */

  }, {
    key: "endCall",
    value: function endCall(call, agentStatus) {
      throw new Error('Not implemented');
    }
    /**
     * Mute call
     * @returns {Promise<MuteToggleResult>} 
     * 
     */

  }, {
    key: "mute",
    value: function mute() {
      throw new Error('Not implemented');
    }
    /**
     * Unmute call
     * @returns {Promise<MuteToggleResult>} 
     * 
     */

  }, {
    key: "unmute",
    value: function unmute() {
      throw new Error('Not implemented');
    }
    /**
     * Hold call
     * @param {PhoneCall} call - The call to be held
     * @returns {Promise<HoldToggleResult>} 
     * 
     */

  }, {
    key: "hold",
    value: function hold(call) {
      throw new Error('Not implemented');
    }
    /**
     * Resume call
     * @param {PhoneCall} call - The call to be resumed
     * @returns {Promise<HoldToggleResult>} 
     * 
     */

  }, {
    key: "resume",
    value: function resume(call) {
      throw new Error('Not implemented');
    }
    /**
     * Set agent status
     * @param {string} agentStatus
     * @param {StatusInfo} statusInfo
     * @returns {Promise<GenericResult>} 
     * 
     */

  }, {
    key: "setAgentStatus",
    value: function setAgentStatus(agentStatus, statusInfo) {
      throw new Error('Not implemented');
    }
    /**
     * Get agent status
     * @returns {Promise<AgentStatusInfo>} 
     * 
     */

  }, {
    key: "getAgentStatus",
    value: function getAgentStatus() {
      this.logMessageToVendor(constants.LOG_LEVEL.INFO, 'getAgentStatus API is NOT Implemented');
    }
    /**
     * Dial out Number
     * @param {Contact} contact
     * @returns {Promise<CallResult>} 
     * 
     */

  }, {
    key: "dial",
    value: function dial(contact) {
      throw new Error('Not implemented');
    }
    /**
     * Send digits
     * @param {string} digits
     */

  }, {
    key: "sendDigits",
    value: function sendDigits(digits) {
      throw new Error('Not implemented');
    }
    /**
     * Get phone contacts
     * @returns {Promise<PhoneContactsResult>} 
     */

  }, {
    key: "getPhoneContacts",
    value: function getPhoneContacts() {
      throw new Error('Not implemented');
    }
    /**
     * Swap calls
     * @param {PhoneCall} call1
     * @param {PhoneCall} call2
     * @returns {Promise<HoldToggleResult>} 
     */

  }, {
    key: "swap",
    value: function swap(call1, call2) {
      throw new Error('Not implemented');
    }
    /**
     * Conference calls
     * @param {PhoneCall[]} calls
     * @returns {Promise<HoldToggleResult>} 
     */

  }, {
    key: "conference",
    value: function conference(calls) {
      throw new Error('Not implemented');
    }
    /**
     * Add participant to call
     * @param {Contact} contact
     * @param {PhoneCall} call
     * @returns {Promise<ParticipantResult>} 
     */

  }, {
    key: "addParticipant",
    value: function addParticipant(contact, call) {
      throw new Error('Not implemented');
    }
    /**
     * Pause recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>} 
     */

  }, {
    key: "pauseRecording",
    value: function pauseRecording(call) {
      throw new Error('Not implemented');
    }
    /**
     * Resume recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>} 
     */

  }, {
    key: "resumeRecording",
    value: function resumeRecording(call) {
      throw new Error('Not implemented');
    }
    /**
     * Get agentConfig
     * @returns {Promise<AgentConfigResult>}
     */

  }, {
    key: "getAgentConfig",
    value: function getAgentConfig() {
      throw new Error('Not implemented');
    }
    /**
     * Set Agent Config
     * @param {AgentConfig} config
     * @returns {Promise<GenericResult>}
     */

  }, {
    key: "setAgentConfig",
    value: function setAgentConfig(config) {
      throw new Error('Not implemented');
    }
    /**
     * Logout from Omni
     * @returns {Promise<LogoutResult>} 
     */

  }, {
    key: "logout",
    value: function logout() {
      throw new Error('Not implemented');
    }
    /**
     * Handle message from LWC/Aura component
     * @param {object} message
     */

  }, {
    key: "handleMessage",
    value: function handleMessage(message) {
      throw new Error('Not implemented');
    }
    /**
     * Wrap up call
     * @param {PhoneCall} call
     */

  }, {
    key: "wrapUpCall",
    value: function wrapUpCall(call) {
      throw new Error('Not implemented');
    }
    /**
    * Get the signed recording url
    * @param {String} recordingUrl
    * @param {String} vendorCallKey
    * @param {String} callId
    * @returns {Promise<SignedRecordingUrlResult>} 
    */

  }, {
    key: "getSignedRecordingUrl",
    value: function getSignedRecordingUrl(recordingUrl, vendorCallKey, callId) {
      throw new Error('Not implemented');
    }
    /**
     * Triggers a browser download for Vendor Logs
     */

  }, {
    key: "downloadLogs",
    value: function downloadLogs() {
      logger_downloadLogs();
    }
    /**
     * Sends the logs with a logLevel and payload to the vendor connector.
     * Does a no-op, if not implemented.
     * @param {String} logLevel Log Level (INFO, WARN, ERROR)
     * @param {String} message Message to be logged
     * @param {Object} payload An optional payload to be logged
     */

  }, {
    key: "logMessageToVendor",
    value: function logMessageToVendor(logLevel, message, payload) {}
    /**
     * Supervise a call
     * @param {PhoneCall} call Call to be supervised
     */

  }, {
    key: "superviseCall",
    value: function superviseCall(call) {
      throw new Error('Not implemented');
    }
    /**
     * Supervisor disconnects from a call
     * @param {PhoneCall} call Call to be disconnected
     */

  }, {
    key: "supervisorDisconnect",
    value: function supervisorDisconnect(call) {
      throw new Error('Not implemented');
    }
    /**
     * Supervisor Barges into a ongoing call
     * @param {PhoneCall} call Call which supervisor barges in
     */

  }, {
    key: "supervisorBargeIn",
    value: function supervisorBargeIn(call) {
      throw new Error('Not implemented');
    }
  }]);

  return VendorConnector;
}();
var types_Validator = /*#__PURE__*/function () {
  function Validator() {
    classCallCheck_default()(this, Validator);
  }

  createClass_default()(Validator, null, [{
    key: "validateString",
    value: function validateString(value) {
      if (typeof value !== 'string') {
        throw new Error("Invalid argument. Expecting a string but got ".concat(typeof_default()(value)));
      }

      return this;
    }
  }, {
    key: "validateNumber",
    value: function validateNumber(value) {
      if (typeof value !== 'number') {
        throw new Error("Invalid argument. Expecting a number but got ".concat(typeof_default()(value)));
      }

      return this;
    }
  }, {
    key: "validateBoolean",
    value: function validateBoolean(value) {
      if (typeof value !== 'boolean') {
        throw new Error("Invalid argument. Expecting a boolean but got ".concat(typeof_default()(value)));
      }

      return this;
    }
  }, {
    key: "validateEnum",
    value: function validateEnum(value, enumValues) {
      var regex = new RegExp(enumValues.join("|"), "i");

      if (!regex.test(value)) {
        throw new Error("Invalid argument. Expecting a value from ".concat(JSON.stringify(enumValues), " but got ").concat(value));
      }

      return this;
    }
  }, {
    key: "validateDate",
    value: function validateDate(value) {
      if (!(value instanceof Date)) {
        throw new Error("Invalid argument. Expecting a Date object but got ".concat(typeof_default()(value)));
      }

      return this;
    }
  }, {
    key: "validateClassObject",
    value: function validateClassObject(object, className) {
      if (!(object instanceof className)) {
        throw new Error("Invalid className. Expecting object of class ".concat(className, " but got ").concat(typeof_default()(object)));
      }

      return this;
    }
  }]);

  return Validator;
}();
/** 
 * Class representing an Agent status information. This object is used to represent 
 * agent status information
 */

var types_AgentStatusInfo = /*#__PURE__*/createClass_default()(
/**
 * Create a AgentStatusInfo.
 * @param {object} param
 * @param {enum} [param.statusType] - Omni Status/Vendor Status
 * @param {string} [param.statusId] - The unique statusId (required)
 * @param {string} [param.statusApiName] - The status API name
 * @param {string} [param.statusName] - The label for this status to be displayed in the UI
 */
function AgentStatusInfo(_ref20) {
  var statusType = _ref20.statusType,
      statusId = _ref20.statusId,
      statusApiName = _ref20.statusApiName,
      statusName = _ref20.statusName;

  classCallCheck_default()(this, AgentStatusInfo);

  types_Validator.validateString(statusId);

  if (statusApiName) {
    types_Validator.validateString(statusApiName);
  }

  if (statusName) {
    types_Validator.validateString(statusName);
  }

  if (statusType && statusType === constants.STATUS_TYPE.VENDOR) {
    this.statusType = statusType;
  } else {
    this.statusType = constants.STATUS_TYPE.OMNI;
  }

  this.statusId = statusId;
  this.statusApiName = statusApiName;
  this.statusName = statusName;
});
/** 
 * Class representing a Supervised Call Info. This object is used to represent 
 * information about a call that is being supervised by a supervisor.
 */

var types_SupervisedCallInfo = /*#__PURE__*/createClass_default()(
/**
 * Create a AgentStatusInfo.
 * @param {object} param
 * @param {string} [param.callId] - The unique supervised vendor call ID (required)
 * @param {string} [param.voiceCallId] - The supervised salesforce voice call ID
 * @param {string} [param.callType] - The type of the call, one of the CALL_TYPE values
 * @param {string} [param.from] - From phone number (for Inbound calls)
 * @param {string} [param.to] - To phone number (for Outbound calls)
 * @param {string} [param.supervisorName] - The supervisor name (shown to the supervised agent on barge in)
 * @param {boolean} [param.isBargedIn] - True if the Supervisor has barged in, False if the supervisor is listening in.
 */
function SupervisedCallInfo(_ref21) {
  var callId = _ref21.callId,
      voiceCallId = _ref21.voiceCallId,
      callType = _ref21.callType,
      from = _ref21.from,
      to = _ref21.to,
      supervisorName = _ref21.supervisorName,
      isBargedIn = _ref21.isBargedIn;

  classCallCheck_default()(this, SupervisedCallInfo);

  types_Validator.validateString(callId);
  this.callId = callId;
  this.voiceCallId = voiceCallId;
  this.callType = callType;
  this.from = from;
  this.to = to;
  this.supervisorName = supervisorName;
  this.isBargedIn = isBargedIn;
});
/**
 * Class representing a Audio Stats, which contains array of AudioStats. This object is used to calculate the MOS Score
 */

var types_AudioStats = /*#__PURE__*/createClass_default()(
/**
 * Create a AudioStats
 * @param {object} param
 * @param {string} [param.callId] - The unique callId.
 * @param {AudioStatsElement[]} param.stats - array of AudioStatsElement
 * @param {boolean} [param.isAudioStatsCompleted] - True if the audio stats is completed, will calculate MOS and update VoiceCall record
 */
function AudioStats(_ref22) {
  var callId = _ref22.callId,
      stats = _ref22.stats,
      isAudioStatsCompleted = _ref22.isAudioStatsCompleted;

  classCallCheck_default()(this, AudioStats);

  if (callId) {
    types_Validator.validateString(callId);
    this.callId = callId;
  }

  if (stats) {
    types_Validator.validateClassObject(stats, Array);
    stats.forEach(function (audioStatsElement) {
      return types_Validator.validateClassObject(audioStatsElement, types_AudioStatsElement);
    });
    this.stats = stats;
  }

  if (isAudioStatsCompleted) {
    types_Validator.validateBoolean(isAudioStatsCompleted);
    this.isAudioStatsCompleted = isAudioStatsCompleted;
  }
});
/**
 * Class representing a Audio Stats Element. This object is used to calculate the MOS Score
 */

var types_AudioStatsElement = /*#__PURE__*/createClass_default()(
/**
 * Create a AudioStatsElement
 * @param {object} param
 * @param {StatsInfo} [param.inputChannelStats] - the inputChannel stream stats
 * @param {StatsInfo} [param.outputChannelStats] - the ouputChannel stream stats
 */
function AudioStatsElement(_ref23) {
  var inputChannelStats = _ref23.inputChannelStats,
      outputChannelStats = _ref23.outputChannelStats;

  classCallCheck_default()(this, AudioStatsElement);

  if (inputChannelStats) {
    types_Validator.validateClassObject(inputChannelStats, types_StatsInfo);
  }

  if (outputChannelStats) {
    types_Validator.validateClassObject(outputChannelStats, types_StatsInfo);
  }

  this.inputChannelStats = inputChannelStats;
  this.outputChannelStats = outputChannelStats;
});
/**
 * Class representing a Stream Stats. This object is used to calculate the MOS Score
 */

var types_StatsInfo = /*#__PURE__*/createClass_default()(
/**
 * Create a StatsInfo
 * @param {object} param
 * @param {number} [param.packetsCount] - the packets count
 * @param {number} [param.packetsLost] - packets lost count
 * @param {number} [param.jitterBufferMillis] - jitter buffer in milliseconds
 * @param {number} [param.roundTripTimeMillis] - round trip time in milliseconds
 */
function StatsInfo(_ref24) {
  var packetsCount = _ref24.packetsCount,
      packetsLost = _ref24.packetsLost,
      jitterBufferMillis = _ref24.jitterBufferMillis,
      roundTripTimeMillis = _ref24.roundTripTimeMillis;

  classCallCheck_default()(this, StatsInfo);

  packetsCount = packetsCount == null || packetsCount < 0 ? 0 : packetsCount;
  packetsLost = packetsLost == null || packetsLost < 0 ? 0 : packetsLost;
  jitterBufferMillis = jitterBufferMillis == null || jitterBufferMillis < 0 ? 0 : jitterBufferMillis;
  roundTripTimeMillis = roundTripTimeMillis == null || roundTripTimeMillis < 0 ? 0 : roundTripTimeMillis;
  this.statsCount = 0;
  this.packetsCount = packetsCount;
  this.packetsLost = packetsLost;
  this.jitterBufferMillis = jitterBufferMillis;
  this.roundTripTimeMillis = roundTripTimeMillis;
});
/**
 * Class representing supervise call result
 */

var types_SuperviseCallResult = /*#__PURE__*/createClass_default()(
/**
 * Create a SuperviseCallResult
 * @param {object} param
 * @param {PhoneCall} param.call
 */
function SuperviseCallResult(_ref25) {
  var call = _ref25.call;

  classCallCheck_default()(this, SuperviseCallResult);

  types_Validator.validateClassObject(call, types_PhoneCall);
  this.call = call;
});
/**
 * Class representing result type for supervisorDisconnected()
 */

var types_SupervisorHangupResult = /*#__PURE__*/function (_HangupResult) {
  inherits_default()(SupervisorHangupResult, _HangupResult);

  var _super = _createSuper(SupervisorHangupResult);

  /**
  * Create SupervisorHangupResult
  * @param {object} param
  * @param {PhoneCall[]|PhoneCall} param.calls - one or more calls when supervisor hangsup
  */
  function SupervisorHangupResult(_ref26) {
    var calls = _ref26.calls;

    classCallCheck_default()(this, SupervisorHangupResult);

    return _super.call(this, {
      calls: calls
    });
  }

  return createClass_default()(SupervisorHangupResult);
}(types_HangupResult);
// CONCATENATED MODULE: ./src/main/mosUtil.js
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

var audioStatus;
var mosUtil_supportsMos = false;

function getAvgStats(streamType) {
  var stats = audioStatus[streamType];
  return {
    packetsCount: stats.packetsCount / stats.statsCount,
    packetsLost: stats.packetsLost / stats.statsCount,
    jitterBufferMillis: stats.jitterBufferMillis / stats.statsCount,
    roundTripTimeMillis: stats.roundTripTimeMillis / stats.statsCount
  };
}

function getMOSByStream(streamType) {
  var avgStats = getAvgStats(streamType);
  var effectiveLatency = avgStats.roundTripTimeMillis + avgStats.jitterBufferMillis * 2 + 10.0;
  var R = 0;

  if (effectiveLatency < 160) {
    R = 93.2 - effectiveLatency / 40;
  } else {
    R = 93.2 - (effectiveLatency - 120) / 10;
  }

  R -= avgStats.packetsLost / avgStats.packetsCount * 2.50;
  return 1 + 0.035 * R + .000007 * R * (R - 60) * (100 - R);
}

function enableMos() {
  mosUtil_supportsMos = true;
}
function getMOS() {
  if (!mosUtil_supportsMos || !audioStatus) {
    return undefined;
  }

  var inputChannelMOS = getMOSByStream('inputChannelStats');
  var ouputChannelMOS = getMOSByStream('outputChannelStats');
  audioStatus = null;

  if (isNaN(ouputChannelMOS) && isNaN(inputChannelMOS)) {
    return 0;
  } else if (isNaN(ouputChannelMOS)) {
    return inputChannelMOS;
  } else if (isNaN(inputChannelMOS)) {
    return ouputChannelMOS;
  } else {
    return Math.min(inputChannelMOS, ouputChannelMOS);
  }
}
function initAudioStats() {
  audioStatus = new types_AudioStatsElement({
    inputChannelStats: new types_StatsInfo({
      packetsCount: 0,
      packetsLost: 0,
      jitterBufferMillis: 0,
      roundTripTimeMillis: 0
    }),
    outputChannelStats: new types_StatsInfo({
      packetsCount: 0,
      packetsLost: 0,
      jitterBufferMillis: 0,
      roundTripTimeMillis: 0
    })
  });
}
function updateAudioStats(statsArray) {
  if (audioStatus) {
    statsArray.forEach(function (stats) {
      if (stats.inputChannelStats) {
        audioStatus.inputChannelStats.statsCount++;
        audioStatus.inputChannelStats.packetsCount += stats.inputChannelStats.packetsCount | 0;
        audioStatus.inputChannelStats.packetsLost += stats.inputChannelStats.packetsLost | 0;
        audioStatus.inputChannelStats.jitterBufferMillis += stats.inputChannelStats.jitterBufferMillis | 0;
        audioStatus.inputChannelStats.roundTripTimeMillis += stats.inputChannelStats.roundTripTimeMillis | 0;
      }

      if (stats.outputChannelStats) {
        audioStatus.outputChannelStats.statsCount++;
        audioStatus.outputChannelStats.packetsCount += stats.outputChannelStats.packetsCount | 0;
        audioStatus.outputChannelStats.packetsLost += stats.outputChannelStats.packetsLost | 0;
        audioStatus.outputChannelStats.jitterBufferMillis += stats.outputChannelStats.jitterBufferMillis | 0;
        audioStatus.outputChannelStats.roundTripTimeMillis += stats.outputChannelStats.roundTripTimeMillis | 0;
      }
    });
  }
}
// CONCATENATED MODULE: ./src/main/baseConnector.js





/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* eslint-disable no-unused-vars */





var channelPort;
var vendorConnector;
var agentAvailable;
var isSupervisorConnected;
/**
 * Gets the error type from the error object
 * @param {object} e Error object representing the error
 */

function getErrorType(e) {
  return e && e.type ? e.type : e;
}
/**
 * Sanitizes the object by removing any PII data
 * @param {object} payload
 */


function sanitizePayload(payload) {
  if (payload) {
    if (typeof payload === 'function') {
      // remove functions from the payload, because they cannot be copied by the postMessage function
      return;
    } else if (typeof_default()(payload) === 'object') {
      var isArray = Array.isArray(payload);
      var sanitizedPayload = isArray ? [] : {};

      if (isArray) {
        payload.forEach(function (element) {
          sanitizedPayload.push(sanitizePayload(element));
        });
      } else {
        for (var property in payload) {
          if (property !== 'phoneNumber' && property !== 'number' && property !== 'name' && property !== 'callAttributes') {
            sanitizedPayload[property] = sanitizePayload(payload[property]);
          }
        }
      }

      return sanitizedPayload;
    }
  }

  return payload;
}
/**
 * Gets the error message from the error object
 * @param {object} e Error object representing the error
 */


function getErrorMessage(e) {
  return e && e.message ? e.message : e;
}
/** 
 * Dispatch a telephony event log to Salesforce
 * @param {String} eventType event type, i.e. constants.EVENT_TYPE.CALL_STARTED    
 * @param {Object} payload event payload
 * @param {Boolean} isError error scenario
 */


function dispatchEventLog(eventType, payload, isError) {
  var sanitizedPayload = sanitizePayload(payload);
  var logLevel = isError ? constants.LOG_LEVEL.ERROR : constants.LOG_LEVEL.INFO;
  log({
    eventType: eventType,
    payload: payload
  }, logLevel, constants.LOG_SOURCE.SYSTEM);
  channelPort.postMessage({
    type: constants.MESSAGE_TYPE.LOG,
    payload: {
      eventType: eventType,
      payload: sanitizedPayload,
      isError: isError
    }
  });
}
/** 
 * Dispatch a telephony event to Salesforce
 * @param {String} eventType event type, i.e. constants.EVENT_TYPE.CALL_STARTED
 * @param {Object} payload event payload
 * @param {Boolean} registerLog optional argument to not register the event
 */


function dispatchEvent(eventType, payload) {
  var registerLog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  channelPort.postMessage({
    type: constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
    payload: {
      telephonyEventType: eventType,
      telephonyEventPayload: payload
    }
  });

  if (registerLog) {
    dispatchEventLog(eventType, payload, false);
  }
}
/**
 * Dispatch a telephony integration error to Salesforce
 * @param {string} errorType Error Type, ex: constants.ErrorType.MICROPHONE_NOT_SHARED
 * @param {object} error Error object representing the error
 * @param {string} eventType The event that caused this error, ex: constants.MESSAGE_TYPE.ACCEPT_CALL
 */


function dispatchError(errorType, error, eventType) {
  // eslint-disable-next-line no-console
  console.error("SCV dispatched error ".concat(errorType, " for eventType ").concat(eventType), error);
  dispatchEvent(constants.EVENT_TYPE.ERROR, {
    message: constants.ERROR_TYPE[errorType]
  }, false);
  dispatchEventLog(eventType, {
    errorType: errorType,
    error: error
  }, true);
}
/** 
 * Notify Salesforce that the connector is ready
 */


function setConnectorReady() {
  return _setConnectorReady.apply(this, arguments);
} //TODO: 230 we should convert call object to PhoneCall object


function _setConnectorReady() {
  _setConnectorReady = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
    var _agentConfig, agentConfigResult, activeCallsResult, activeCalls, type, payload;

    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return vendorConnector.getAgentConfig();

          case 3:
            agentConfigResult = _context.sent;
            types_Validator.validateClassObject(agentConfigResult, types_AgentConfigResult);

            if (agentConfigResult.supportsMos) {
              enableMos();
            }

            _context.next = 8;
            return vendorConnector.getActiveCalls();

          case 8:
            activeCallsResult = _context.sent;
            types_Validator.validateClassObject(activeCallsResult, types_ActiveCallsResult);
            activeCalls = activeCallsResult.activeCalls;
            type = constants.MESSAGE_TYPE.CONNECTOR_READY;
            payload = {
              agentConfig: (_agentConfig = {}, defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.MUTE, agentConfigResult.hasMute), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.RECORD, agentConfigResult.hasRecord), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.MERGE, agentConfigResult.hasMerge), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.SWAP, agentConfigResult.hasSwap), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.PHONES, agentConfigResult.phones), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.SIGNED_RECORDING_URL, agentConfigResult.hasSignedRecordingUrl), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.SELECTED_PHONE, agentConfigResult.selectedPhone), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.DEBUG_ENABLED, agentConfigResult.debugEnabled), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.CONTACT_SEARCH, agentConfigResult.hasContactSearch), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.VENDOR_PROVIDED_AVAILABILITY, agentConfigResult.hasAgentAvailability), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.SUPERVISOR_LISTEN_IN, agentConfigResult.hasSupervisorListenIn), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.SUPERVISOR_BARGE_IN, agentConfigResult.hasSupervisorBargeIn), defineProperty_default()(_agentConfig, constants.AGENT_CONFIG_TYPE.MOS, agentConfigResult.supportsMos), _agentConfig),
              callInProgress: activeCalls.length > 0 ? activeCalls[0] : null
            };
            channelPort.postMessage({
              type: type,
              payload: payload
            });
            dispatchEventLog(type, payload, false);
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            // Post CONNECTOR_READY even if getAgentConfig is not implemented
            channelPort.postMessage({
              type: constants.MESSAGE_TYPE.CONNECTOR_READY,
              payload: {}
            });
            dispatchEventLog(constants.MESSAGE_TYPE.CONNECTOR_READY, {}, false);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));
  return _setConnectorReady.apply(this, arguments);
}

function channelMessageHandler(_x) {
  return _channelMessageHandler.apply(this, arguments);
}

function _channelMessageHandler() {
  _channelMessageHandler = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2(message) {
    var eventType, hangupPayload, payload, call, _payload, _call, _payload2, activeCallsResult, activeCalls, calls, _payload3, _payload4, _payload5, _payload6, statusInfo, _payload7, success, _payload8, _payload9, _call2, _payload10, contacts, _payload11, _payload12, _payload13, _payload14, _payload15, _payload16, _success, loginFrameHeight, _activeCallsResult, _activeCalls, callId, _call3, shouldReplay, isSupervisorCall, result, _message$data, recordingUrl, vendorCallKey, _callId, _result, signedRecordingUrlResult, _message$data2, logLevel, logMessage, _payload17, _result2, agentConfigResult, _result3, _result4;

    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            eventType = message.data.type;

            if (eventType !== constants.MESSAGE_TYPE.LOG) {
              dispatchEventLog(eventType, message.data, false);
            }

            _context2.t0 = eventType;
            _context2.next = _context2.t0 === constants.MESSAGE_TYPE.ACCEPT_CALL ? 5 : _context2.t0 === constants.MESSAGE_TYPE.DECLINE_CALL ? 29 : _context2.t0 === constants.MESSAGE_TYPE.END_CALL ? 42 : _context2.t0 === constants.MESSAGE_TYPE.MUTE ? 60 : _context2.t0 === constants.MESSAGE_TYPE.UNMUTE ? 71 : _context2.t0 === constants.MESSAGE_TYPE.HOLD ? 82 : _context2.t0 === constants.MESSAGE_TYPE.RESUME ? 99 : _context2.t0 === constants.MESSAGE_TYPE.SET_AGENT_STATUS ? 116 : _context2.t0 === constants.MESSAGE_TYPE.GET_AGENT_STATUS ? 136 : _context2.t0 === constants.MESSAGE_TYPE.DIAL ? 148 : _context2.t0 === constants.MESSAGE_TYPE.SEND_DIGITS ? 170 : _context2.t0 === constants.MESSAGE_TYPE.GET_PHONE_CONTACTS ? 179 : _context2.t0 === constants.MESSAGE_TYPE.SWAP_PARTICIPANTS ? 192 : _context2.t0 === constants.MESSAGE_TYPE.CONFERENCE ? 203 : _context2.t0 === constants.MESSAGE_TYPE.ADD_PARTICIPANT ? 214 : _context2.t0 === constants.MESSAGE_TYPE.PAUSE_RECORDING ? 232 : _context2.t0 === constants.MESSAGE_TYPE.RESUME_RECORDING ? 243 : _context2.t0 === constants.MESSAGE_TYPE.LOGOUT ? 254 : _context2.t0 === constants.MESSAGE_TYPE.MESSAGE ? 267 : _context2.t0 === constants.MESSAGE_TYPE.WRAP_UP_CALL ? 269 : _context2.t0 === constants.MESSAGE_TYPE.AGENT_AVAILABLE ? 271 : _context2.t0 === constants.MESSAGE_TYPE.SET_AGENT_CONFIG ? 309 : _context2.t0 === constants.MESSAGE_TYPE.GET_SIGNED_RECORDING_URL ? 321 : _context2.t0 === constants.MESSAGE_TYPE.DOWNLOAD_VENDOR_LOGS ? 336 : _context2.t0 === constants.MESSAGE_TYPE.LOG ? 338 : _context2.t0 === constants.MESSAGE_TYPE.SUPERVISE_CALL ? 341 : _context2.t0 === constants.MESSAGE_TYPE.SUPERVISOR_DISCONNECT ? 358 : _context2.t0 === constants.MESSAGE_TYPE.SUPERVISOR_BARGE_IN ? 371 : 383;
            break;

          case 5:
            _context2.prev = 5;

            if (!(message.data.call && message.data.call.callType && message.data.call.callType.toLowerCase() === constants.CALL_TYPE.OUTBOUND.toLowerCase())) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return");

          case 8:
            initAudioStats();

            if (!isSupervisorConnected) {
              _context2.next = 16;
              break;
            }

            _context2.next = 12;
            return vendorConnector.supervisorDisconnect();

          case 12:
            hangupPayload = _context2.sent;
            types_Validator.validateClassObject(hangupPayload, types_SupervisorHangupResult);
            isSupervisorConnected = false;
            dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_HANGUP, hangupPayload.calls);

          case 16:
            _context2.next = 18;
            return vendorConnector.acceptCall(message.data.call);

          case 18:
            payload = _context2.sent;
            types_Validator.validateClassObject(payload, types_CallResult);
            call = payload.call;
            dispatchEvent(call.callType.toLowerCase() === constants.CALL_TYPE.CALLBACK.toLowerCase() ? constants.EVENT_TYPE.CALL_STARTED : constants.EVENT_TYPE.CALL_CONNECTED, call);
            _context2.next = 28;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t1 = _context2["catch"](5);
            isSupervisorConnected = false;
            dispatchError(constants.ERROR_TYPE.CAN_NOT_ACCEPT_THE_CALL, _context2.t1, constants.MESSAGE_TYPE.ACCEPT_CALL);

          case 28:
            return _context2.abrupt("break", 384);

          case 29:
            _context2.prev = 29;
            _context2.next = 32;
            return vendorConnector.declineCall(message.data.call);

          case 32:
            _payload = _context2.sent;
            types_Validator.validateClassObject(_payload, types_CallResult);
            _call = _payload.call;
            dispatchEvent(constants.EVENT_TYPE.HANGUP, _call);
            _context2.next = 41;
            break;

          case 38:
            _context2.prev = 38;
            _context2.t2 = _context2["catch"](29);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL, _context2.t2, constants.MESSAGE_TYPE.DECLINE_CALL);

          case 41:
            return _context2.abrupt("break", 384);

          case 42:
            _context2.prev = 42;
            _context2.next = 45;
            return vendorConnector.endCall(message.data.call, message.data.agentStatus);

          case 45:
            _payload2 = _context2.sent;
            types_Validator.validateClassObject(_payload2, types_HangupResult);
            _context2.next = 49;
            return vendorConnector.getActiveCalls();

          case 49:
            activeCallsResult = _context2.sent;
            types_Validator.validateClassObject(activeCallsResult, types_ActiveCallsResult);
            activeCalls = activeCallsResult.activeCalls;
            calls = _payload2.calls; // after end calls from vendor side, if no more active calls, fire HANGUP, otherwise, fire PARTICIPANT_REMOVED

            if (activeCalls.length === 0) {
              dispatchEvent(constants.EVENT_TYPE.HANGUP, calls);
            } else {
              dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, calls.length > 0 && calls[0]);
            }

            _context2.next = 59;
            break;

          case 56:
            _context2.prev = 56;
            _context2.t3 = _context2["catch"](42);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, _context2.t3, constants.MESSAGE_TYPE.END_CALL);

          case 59:
            return _context2.abrupt("break", 384);

          case 60:
            _context2.prev = 60;
            _context2.next = 63;
            return vendorConnector.mute();

          case 63:
            _payload3 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.MUTE_TOGGLE,
              payload: _payload3
            });
            _context2.next = 70;
            break;

          case 67:
            _context2.prev = 67;
            _context2.t4 = _context2["catch"](60);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_MUTE_CALL, _context2.t4, constants.MESSAGE_TYPE.MUTE);

          case 70:
            return _context2.abrupt("break", 384);

          case 71:
            _context2.prev = 71;
            _context2.next = 74;
            return vendorConnector.unmute();

          case 74:
            _payload4 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.MUTE_TOGGLE,
              payload: _payload4
            });
            _context2.next = 81;
            break;

          case 78:
            _context2.prev = 78;
            _context2.t5 = _context2["catch"](71);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_UNMUTE_CALL, _context2.t5, constants.MESSAGE_TYPE.UNMUTE);

          case 81:
            return _context2.abrupt("break", 384);

          case 82:
            _context2.prev = 82;
            _context2.next = 85;
            return vendorConnector.hold(message.data.call);

          case 85:
            _payload5 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
              payload: _payload5
            });
            _context2.next = 98;
            break;

          case 89:
            _context2.prev = 89;
            _context2.t6 = _context2["catch"](82);
            _context2.t7 = getErrorType(_context2.t6);
            _context2.next = _context2.t7 === constants.ERROR_TYPE.INVALID_PARTICIPANT ? 94 : 96;
            break;

          case 94:
            dispatchError(constants.ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(_context2.t6), constants.MESSAGE_TYPE.HOLD);
            return _context2.abrupt("break", 98);

          case 96:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_HOLD_CALL, getErrorMessage(_context2.t6), constants.MESSAGE_TYPE.HOLD);
            return _context2.abrupt("break", 98);

          case 98:
            return _context2.abrupt("break", 384);

          case 99:
            _context2.prev = 99;
            _context2.next = 102;
            return vendorConnector.resume(message.data.call);

          case 102:
            _payload6 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
              payload: _payload6
            });
            _context2.next = 115;
            break;

          case 106:
            _context2.prev = 106;
            _context2.t8 = _context2["catch"](99);
            _context2.t9 = getErrorType(_context2.t8);
            _context2.next = _context2.t9 === constants.ERROR_TYPE.INVALID_PARTICIPANT ? 111 : 113;
            break;

          case 111:
            dispatchError(constants.ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(_context2.t8), constants.MESSAGE_TYPE.RESUME);
            return _context2.abrupt("break", 115);

          case 113:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_CALL, getErrorMessage(_context2.t8), constants.MESSAGE_TYPE.RESUME);
            return _context2.abrupt("break", 115);

          case 115:
            return _context2.abrupt("break", 384);

          case 116:
            _context2.prev = 116;
            statusInfo = message.data.statusInfo || {};
            _context2.next = 120;
            return vendorConnector.setAgentStatus(message.data.agentStatus, statusInfo);

          case 120:
            _payload7 = _context2.sent;
            types_Validator.validateClassObject(_payload7, types_GenericResult);
            success = _payload7.success;
            dispatchEvent(constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, {
              success: success
            });
            _context2.next = 135;
            break;

          case 126:
            _context2.prev = 126;
            _context2.t10 = _context2["catch"](116);
            _context2.t11 = getErrorType(_context2.t10);
            _context2.next = _context2.t11 === constants.ERROR_TYPE.INVALID_AGENT_STATUS ? 131 : 133;
            break;

          case 131:
            dispatchError(constants.ERROR_TYPE.INVALID_AGENT_STATUS, getErrorMessage(_context2.t10), constants.MESSAGE_TYPE.SET_AGENT_STATUS);
            return _context2.abrupt("break", 135);

          case 133:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, getErrorMessage(_context2.t10), constants.MESSAGE_TYPE.SET_AGENT_STATUS);
            return _context2.abrupt("break", 135);

          case 135:
            return _context2.abrupt("break", 384);

          case 136:
            _context2.prev = 136;
            _context2.next = 139;
            return vendorConnector.getAgentStatus();

          case 139:
            _payload8 = _context2.sent;
            types_Validator.validateClassObject(_payload8, types_AgentStatusInfo);
            dispatchEvent(constants.EVENT_TYPE.GET_AGENT_STATUS_RESULT, _payload8);
            _context2.next = 147;
            break;

          case 144:
            _context2.prev = 144;
            _context2.t12 = _context2["catch"](136);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS, getErrorMessage(_context2.t12), constants.MESSAGE_TYPE.GET_AGENT_STATUS);

          case 147:
            return _context2.abrupt("break", 384);

          case 148:
            _context2.prev = 148;
            _context2.next = 151;
            return vendorConnector.dial(new types_Contact(message.data.contact));

          case 151:
            _payload9 = _context2.sent;
            types_Validator.validateClassObject(_payload9, types_CallResult);
            _call2 = _payload9.call;
            dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, _call2);
            _context2.next = 169;
            break;

          case 157:
            _context2.prev = 157;
            _context2.t13 = _context2["catch"](148);
            dispatchEvent(constants.EVENT_TYPE.CALL_FAILED);
            _context2.t14 = getErrorType(_context2.t13);
            _context2.next = _context2.t14 === constants.ERROR_TYPE.INVALID_DESTINATION ? 163 : _context2.t14 === constants.ERROR_TYPE.GENERIC_ERROR ? 165 : 167;
            break;

          case 163:
            dispatchError(constants.ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(_context2.t13), constants.MESSAGE_TYPE.DIAL);
            return _context2.abrupt("break", 169);

          case 165:
            dispatchError(constants.ERROR_TYPE.GENERIC_ERROR, getErrorMessage(_context2.t13), constants.MESSAGE_TYPE.DIAL);
            return _context2.abrupt("break", 169);

          case 167:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, getErrorMessage(_context2.t13), constants.MESSAGE_TYPE.DIAL);
            return _context2.abrupt("break", 169);

          case 169:
            return _context2.abrupt("break", 384);

          case 170:
            _context2.prev = 170;
            _context2.next = 173;
            return vendorConnector.sendDigits(message.data.digits);

          case 173:
            _context2.next = 178;
            break;

          case 175:
            _context2.prev = 175;
            _context2.t15 = _context2["catch"](170);
            dispatchEventLog(constants.MESSAGE_TYPE.SEND_DIGITS, message.data.digits, true);

          case 178:
            return _context2.abrupt("break", 384);

          case 179:
            _context2.prev = 179;
            _context2.next = 182;
            return vendorConnector.getPhoneContacts(message.data.filter);

          case 182:
            _payload10 = _context2.sent;
            types_Validator.validateClassObject(_payload10, types_PhoneContactsResult);
            contacts = _payload10.contacts.map(function (contact) {
              return {
                id: contact.id,
                endpointARN: contact.endpointARN,
                queue: contact.queue,
                phoneNumber: contact.phoneNumber,
                name: contact.name,
                type: contact.type,
                extension: contact.extension,
                availability: contact.availability
              };
            });
            dispatchEvent(constants.EVENT_TYPE.PHONE_CONTACTS, {
              contacts: contacts
            });
            _context2.next = 191;
            break;

          case 188:
            _context2.prev = 188;
            _context2.t16 = _context2["catch"](179);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS, _context2.t16, constants.MESSAGE_TYPE.GET_PHONE_CONTACTS);

          case 191:
            return _context2.abrupt("break", 384);

          case 192:
            _context2.prev = 192;
            _context2.next = 195;
            return vendorConnector.swap(message.data.callToHold, message.data.callToResume);

          case 195:
            _payload11 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.PARTICIPANTS_SWAPPED,
              payload: _payload11
            });
            _context2.next = 202;
            break;

          case 199:
            _context2.prev = 199;
            _context2.t17 = _context2["catch"](192);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, _context2.t17, constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);

          case 202:
            return _context2.abrupt("break", 384);

          case 203:
            _context2.prev = 203;
            _context2.next = 206;
            return vendorConnector.conference(message.data.calls);

          case 206:
            _payload12 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED,
              payload: _payload12
            });
            _context2.next = 213;
            break;

          case 210:
            _context2.prev = 210;
            _context2.t18 = _context2["catch"](203);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_CONFERENCE, _context2.t18, constants.MESSAGE_TYPE.CONFERENCE);

          case 213:
            return _context2.abrupt("break", 384);

          case 214:
            _context2.prev = 214;
            _context2.next = 217;
            return vendorConnector.addParticipant(new types_Contact(message.data.contact), message.data.call);

          case 217:
            _payload13 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
              payload: _payload13
            });
            _context2.next = 231;
            break;

          case 221:
            _context2.prev = 221;
            _context2.t19 = _context2["catch"](214);
            // TODO: Can we avoid passing in reason field
            dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, {
              reason: constants.EVENT_TYPE.ERROR.toLowerCase()
            });
            _context2.t20 = getErrorType(_context2.t19);
            _context2.next = _context2.t20 === constants.ERROR_TYPE.INVALID_DESTINATION ? 227 : 229;
            break;

          case 227:
            dispatchError(constants.ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(_context2.t19), constants.MESSAGE_TYPE.ADD_PARTICIPANT);
            return _context2.abrupt("break", 231);

          case 229:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, getErrorMessage(_context2.t19), constants.MESSAGE_TYPE.ADD_PARTICIPANT);
            return _context2.abrupt("break", 231);

          case 231:
            return _context2.abrupt("break", 384);

          case 232:
            _context2.prev = 232;
            _context2.next = 235;
            return vendorConnector.pauseRecording(message.data.call);

          case 235:
            _payload14 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.RECORDING_TOGGLE,
              payload: _payload14
            });
            _context2.next = 242;
            break;

          case 239:
            _context2.prev = 239;
            _context2.t21 = _context2["catch"](232);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING, _context2.t21, constants.MESSAGE_TYPE.PAUSE_RECORDING);

          case 242:
            return _context2.abrupt("break", 384);

          case 243:
            _context2.prev = 243;
            _context2.next = 246;
            return vendorConnector.resumeRecording(message.data.call);

          case 246:
            _payload15 = _context2.sent;
            publishEvent({
              eventType: constants.EVENT_TYPE.RECORDING_TOGGLE,
              payload: _payload15
            });
            _context2.next = 253;
            break;

          case 250:
            _context2.prev = 250;
            _context2.t22 = _context2["catch"](243);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING, _context2.t22, constants.MESSAGE_TYPE.RESUME_RECORDING);

          case 253:
            return _context2.abrupt("break", 384);

          case 254:
            _context2.prev = 254;
            _context2.next = 257;
            return vendorConnector.logout();

          case 257:
            _payload16 = _context2.sent;
            types_Validator.validateClassObject(_payload16, types_LogoutResult);
            _success = _payload16.success, loginFrameHeight = _payload16.loginFrameHeight;
            dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, {
              success: _success,
              loginFrameHeight: loginFrameHeight
            });
            _context2.next = 266;
            break;

          case 263:
            _context2.prev = 263;
            _context2.t23 = _context2["catch"](254);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT, _context2.t23, constants.MESSAGE_TYPE.LOGOUT);

          case 266:
            return _context2.abrupt("break", 384);

          case 267:
            // TODO: Define a return type for handling message
            vendorConnector.handleMessage(message.data.message);
            return _context2.abrupt("break", 384);

          case 269:
            vendorConnector.wrapUpCall(message.data.call);
            return _context2.abrupt("break", 384);

          case 271:
            agentAvailable = message.data.isAvailable;

            if (!agentAvailable) {
              _context2.next = 308;
              break;
            }

            _context2.next = 275;
            return vendorConnector.getActiveCalls();

          case 275:
            _activeCallsResult = _context2.sent;
            types_Validator.validateClassObject(_activeCallsResult, types_ActiveCallsResult);
            _activeCalls = _activeCallsResult.activeCalls;
            _context2.t24 = regenerator_default.a.keys(_activeCalls);

          case 279:
            if ((_context2.t25 = _context2.t24()).done) {
              _context2.next = 308;
              break;
            }

            callId = _context2.t25.value;
            _call3 = _activeCalls[callId];
            shouldReplay = _call3.callInfo ? _call3.callInfo.isReplayable : true;
            isSupervisorCall = _call3.callAttributes && _call3.callAttributes.participantType === constants.PARTICIPANT_TYPE.SUPERVISOR;

            if (!shouldReplay) {
              _context2.next = 306;
              break;
            }

            _call3.isReplayedCall = true;
            _context2.t26 = _call3.state;
            _context2.next = _context2.t26 === constants.CALL_STATE.CONNECTED ? 289 : _context2.t26 === constants.CALL_STATE.RINGING ? 295 : _context2.t26 === constants.CALL_STATE.TRANSFERRING ? 301 : _context2.t26 === constants.CALL_STATE.TRANSFERRED ? 303 : 305;
            break;

          case 289:
            if (!isSupervisorCall) {
              _context2.next = 293;
              break;
            }

            isSupervisorConnected = true;
            dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, _call3);
            return _context2.abrupt("break", 306);

          case 293:
            dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, _call3);
            return _context2.abrupt("break", 306);

          case 295:
            if (!isSupervisorCall) {
              _context2.next = 299;
              break;
            }

            isSupervisorConnected = true;
            dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, _call3);
            return _context2.abrupt("break", 306);

          case 299:
            dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, _call3);
            return _context2.abrupt("break", 306);

          case 301:
            dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_ADDED, {
              phoneNumber: _call3.contact.phoneNumber,
              callInfo: _call3.callInfo,
              initialCallHasEnded: _call3.callAttributes.initialCallHasEnded,
              callId: _call3.callId
            });
            return _context2.abrupt("break", 306);

          case 303:
            dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_CONNECTED, {
              phoneNumber: _call3.contact.phoneNumber,
              callInfo: _call3.callInfo,
              initialCallHasEnded: _call3.callAttributes.initialCallHasEnded,
              callId: _call3.callId
            });
            return _context2.abrupt("break", 306);

          case 305:
            return _context2.abrupt("break", 306);

          case 306:
            _context2.next = 279;
            break;

          case 308:
            return _context2.abrupt("break", 384);

          case 309:
            _context2.prev = 309;
            _context2.next = 312;
            return vendorConnector.setAgentConfig(message.data.config);

          case 312:
            result = _context2.sent;
            types_Validator.validateClassObject(result, types_GenericResult);
            dispatchEvent(constants.EVENT_TYPE.AGENT_CONFIG_UPDATED, result);
            _context2.next = 320;
            break;

          case 317:
            _context2.prev = 317;
            _context2.t27 = _context2["catch"](309);
            dispatchError(getErrorType(_context2.t27) === constants.ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER ? constants.ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER : constants.ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG, getErrorMessage(_context2.t27), constants.MESSAGE_TYPE.SET_AGENT_CONFIG);

          case 320:
            return _context2.abrupt("break", 384);

          case 321:
            _context2.prev = 321;
            _message$data = message.data, recordingUrl = _message$data.recordingUrl, vendorCallKey = _message$data.vendorCallKey, _callId = _message$data.callId;
            _context2.next = 325;
            return vendorConnector.getSignedRecordingUrl(recordingUrl, vendorCallKey, _callId);

          case 325:
            _result = _context2.sent;
            types_Validator.validateClassObject(_result, types_SignedRecordingUrlResult);
            dispatchEvent(constants.EVENT_TYPE.SIGNED_RECORDING_URL, _result);
            _context2.next = 335;
            break;

          case 330:
            _context2.prev = 330;
            _context2.t28 = _context2["catch"](321);
            // In case of an error, we want to show an error message in the recording player
            signedRecordingUrlResult = new types_SignedRecordingUrlResult({
              success: false
            });
            dispatchEvent(constants.EVENT_TYPE.SIGNED_RECORDING_URL, signedRecordingUrlResult, false);
            dispatchEventLog(constants.MESSAGE_TYPE.GET_SIGNED_RECORDING_URL, signedRecordingUrlResult, true);

          case 335:
            return _context2.abrupt("break", 384);

          case 336:
            vendorConnector.downloadLogs();
            return _context2.abrupt("break", 384);

          case 338:
            _message$data2 = message.data, logLevel = _message$data2.logLevel, logMessage = _message$data2.logMessage, _payload17 = _message$data2.payload;
            vendorConnector.logMessageToVendor(logLevel, logMessage, _payload17);
            return _context2.abrupt("break", 384);

          case 341:
            _context2.prev = 341;
            isSupervisorConnected = true;
            _context2.next = 345;
            return vendorConnector.superviseCall(message.data.call);

          case 345:
            _result2 = _context2.sent;
            types_Validator.validateClassObject(_result2, types_SuperviseCallResult);
            _context2.next = 349;
            return vendorConnector.getAgentConfig();

          case 349:
            agentConfigResult = _context2.sent;

            if (agentConfigResult.selectedPhone.type === constants.PHONE_TYPE.SOFT_PHONE) {
              dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, _result2.call);
            } else {
              dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, _result2.call);
            }

            _context2.next = 357;
            break;

          case 353:
            _context2.prev = 353;
            _context2.t29 = _context2["catch"](341);
            isSupervisorConnected = false;
            dispatchError(constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, _context2.t29, constants.MESSAGE_TYPE.SUPERVISE_CALL);

          case 357:
            return _context2.abrupt("break", 384);

          case 358:
            _context2.prev = 358;
            _context2.next = 361;
            return vendorConnector.supervisorDisconnect(message.data.call);

          case 361:
            _result3 = _context2.sent;
            types_Validator.validateClassObject(_result3, types_SupervisorHangupResult);
            isSupervisorConnected = false;
            dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_HANGUP, _result3.calls);
            _context2.next = 370;
            break;

          case 367:
            _context2.prev = 367;
            _context2.t30 = _context2["catch"](358);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR, _context2.t30, constants.MESSAGE_TYPE.SUPERVISOR_DISCONNECT);

          case 370:
            return _context2.abrupt("break", 384);

          case 371:
            _context2.prev = 371;
            _context2.next = 374;
            return vendorConnector.supervisorBargeIn(message.data.call);

          case 374:
            _result4 = _context2.sent;
            types_Validator.validateClassObject(_result4, types_SuperviseCallResult);
            dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_BARGED_IN, _result4.call);
            _context2.next = 382;
            break;

          case 379:
            _context2.prev = 379;
            _context2.t31 = _context2["catch"](371);
            dispatchError(constants.ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR, _context2.t31, constants.MESSAGE_TYPE.SUPERVISOR_BARGE_IN);

          case 382:
            return _context2.abrupt("break", 384);

          case 383:
            return _context2.abrupt("break", 384);

          case 384:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 24], [29, 38], [42, 56], [60, 67], [71, 78], [82, 89], [99, 106], [116, 126], [136, 144], [148, 157], [170, 175], [179, 188], [192, 199], [203, 210], [214, 221], [232, 239], [243, 250], [254, 263], [309, 317], [321, 330], [341, 353], [358, 367], [371, 379]]);
  }));
  return _channelMessageHandler.apply(this, arguments);
}

function windowMessageHandler(_x2) {
  return _windowMessageHandler.apply(this, arguments);
}

function _windowMessageHandler() {
  _windowMessageHandler = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee3(message) {
    var sfDomain, originUrl, url, payload;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = message.data.type;
            _context3.next = _context3.t0 === constants.MESSAGE_TYPE.SETUP_CONNECTOR ? 3 : 29;
            break;

          case 3:
            sfDomain = /^http[s]?:\/\/[\w-.]+(\.lightning\.force\.com|\.lightning\.pc-rnd\.force\.com|\.stm\.force\.com|\.salesforce\.com|\.my\.salesforce-sites\.com|\.lightning\.localhost\.[\w]+\.force.com)$/;
            originUrl = new URL(message.origin);
            url = originUrl.protocol + '//' + originUrl.hostname;

            if (!sfDomain.test(url)) {
              _context3.next = 27;
              break;
            }

            channelPort = message.ports[0];
            channelPort.onmessage = channelMessageHandler;
            dispatchEventLog(constants.MESSAGE_TYPE.SETUP_CONNECTOR, exposedConnectorConfig(message.data.connectorConfig), false);
            _context3.prev = 10;
            _context3.next = 13;
            return vendorConnector.init(message.data.connectorConfig);

          case 13:
            payload = _context3.sent;
            types_Validator.validateClassObject(payload, types_InitResult);

            if (payload.showLogin) {
              dispatchEvent(constants.EVENT_TYPE.SHOW_LOGIN, {
                loginFrameHeight: payload.loginFrameHeight
              });
            } else {
              setConnectorReady();
            }

            _context3.next = 27;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t1 = _context3["catch"](10);
            _context3.t2 = getErrorType(_context3.t1);
            _context3.next = _context3.t2 === constants.ERROR_TYPE.INVALID_PARAMS ? 23 : 25;
            break;

          case 23:
            dispatchError(constants.ERROR_TYPE.INVALID_PARAMS, getErrorMessage(_context3.t1), constants.MESSAGE_TYPE.SETUP_CONNECTOR);
            return _context3.abrupt("break", 27);

          case 25:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN, getErrorMessage(_context3.t1), constants.MESSAGE_TYPE.SETUP_CONNECTOR);
            return _context3.abrupt("break", 27);

          case 27:
            window.removeEventListener('message', windowMessageHandler);
            return _context3.abrupt("break", 30);

          case 29:
            return _context3.abrupt("break", 30);

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[10, 18]]);
  }));
  return _windowMessageHandler.apply(this, arguments);
}

function exposedConnectorConfig(payload) {
  payload = payload || {};
  var obj = {}; //properties that are equal to key

  CONNECTOR_CONFIG_EXPOSED_FIELDS.forEach(function (prop) {
    if (payload.hasOwnProperty(prop)) {
      obj[prop] = payload[prop];
    }
  }); //properties that start with key

  CONNECTOR_CONFIG_EXPOSED_FIELDS_STARTSWITH.forEach(function (prop) {
    Object.keys(payload).forEach(function (key) {
      if (key.startsWith(prop)) {
        obj[key] = payload[key];
      }
    });
  });
  return obj;
}

function validatePayload(payload, payloadType, errorType, eventType) {
  try {
    types_Validator.validateClassObject(payload, payloadType);
    return true;
  } catch (e) {
    if (errorType) {
      dispatchError(errorType, e, eventType);
    }

    return false;
  }
}
/*========================== Exported Functions ==========================*/

/**
 * Initialize a vendor connector
 * @param {VendorConnector} connector
 */


function initializeConnector(connector) {
  vendorConnector = connector;
  window.addEventListener('message', windowMessageHandler);
}
/**
 * Publish an event or error log to Salesforce
 * @param {object} param
 * @param {string} param.eventType Any event type to be logged
 * @param {object} param.payload Any payload for the log that needs to be logged
 * @param {boolean} param.isError
 */

function publishLog(_ref) {
  var eventType = _ref.eventType,
      payload = _ref.payload,
      isError = _ref.isError;
  dispatchEventLog(eventType, payload, isError);
}
/**
 * Publish a telephony error to Salesforce
 * @param {object} param
 * @param {("LOGIN_RESULT"|"LOGOUT_RESULT"|"CALL_STARTED"|"QUEUED_CALL_STARTED"|"CALL_CONNECTED"|"HANGUP"|"PARTICIPANT_CONNECTED"|"PARTICIPANT_ADDED"|"PARTICIPANTS_SWAPPED"|"PARTICIPANTS_CONFERENCED"|"MESSAGE"|"MUTE_TOGGLE"|"HOLD_TOGGLE"|"RECORDING_TOGGLE"|"AGENT_ERROR"|"SOFTPHONE_ERROR")} param.eventType Event type to publish.
 * @param {object} param.error Error object representing the error
 */

function publishError(_ref2) {
  var eventType = _ref2.eventType,
      error = _ref2.error;

  switch (eventType) {
    case constants.EVENT_TYPE.LOGIN_RESULT:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN, error, constants.EVENT_TYPE.LOGIN_RESULT);
      break;

    case constants.EVENT_TYPE.LOGOUT_RESULT:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT, error, constants.EVENT_TYPE.LOGOUT_RESULT);
      break;

    case constants.EVENT_TYPE.CALL_STARTED:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.EVENT_TYPE.CALL_STARTED);
      break;

    case constants.EVENT_TYPE.QUEUED_CALL_STARTED:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.EVENT_TYPE.QUEUED_CALL_STARTED);
      break;

    case constants.EVENT_TYPE.CALL_CONNECTED:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.EVENT_TYPE.CALL_CONNECTED);
      break;

    case constants.EVENT_TYPE.HANGUP:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, error, constants.EVENT_TYPE.HANGUP);
      break;

    case constants.EVENT_TYPE.PARTICIPANT_ADDED:
      dispatchError(getErrorType(error) === constants.ERROR_TYPE.INVALID_PARTICIPANT ? constants.ERROR_TYPE.INVALID_PARTICIPANT : constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, error, constants.EVENT_TYPE.PARTICIPANT_ADDED);
      break;

    case constants.EVENT_TYPE.PARTICIPANT_CONNECTED:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, error, constants.EVENT_TYPE.PARTICIPANT_CONNECTED);
      break;

    case constants.EVENT_TYPE.PARTICIPANT_REMOVED:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, error, constants.EVENT_TYPE.PARTICIPANT_REMOVED);
      break;

    case constants.EVENT_TYPE.MUTE_TOGGLE:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, error, constants.EVENT_TYPE.MUTE_TOGGLE);
      break;

    case constants.EVENT_TYPE.HOLD_TOGGLE:
      dispatchError(getErrorType(error) === constants.ERROR_TYPE.INVALID_PARTICIPANT ? constants.ERROR_TYPE.INVALID_PARTICIPANT : constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, error, constants.EVENT_TYPE.HOLD_TOGGLE);
      break;

    case constants.EVENT_TYPE.RECORDING_TOGGLE:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, error, constants.EVENT_TYPE.RECORDING_TOGGLE);
      break;

    case constants.EVENT_TYPE.PARTICIPANTS_SWAPPED:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, error, constants.EVENT_TYPE.PARTICIPANTS_SWAPPED);
      break;

    case constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED:
      dispatchError(constants.ERROR_TYPE.CAN_NOT_CONFERENCE, error, constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED);
      break;

    case constants.EVENT_TYPE.AGENT_ERROR:
      dispatchError(constants.ERROR_TYPE.AGENT_ERROR, error, constants.EVENT_TYPE.AGENT_ERROR);
      break;

    case constants.EVENT_TYPE.SOFTPHONE_ERROR:
      switch (getErrorType(error)) {
        case constants.ERROR_TYPE.UNSUPPORTED_BROWSER:
          dispatchError(constants.ERROR_TYPE.UNSUPPORTED_BROWSER, error, constants.EVENT_TYPE.SOFTPHONE_ERROR);
          break;

        case constants.ERROR_TYPE.MICROPHONE_NOT_SHARED:
          dispatchError(constants.ERROR_TYPE.MICROPHONE_NOT_SHARED, error, constants.EVENT_TYPE.SOFTPHONE_ERROR);
          break;

        default:
          dispatchError(constants.ERROR_TYPE.GENERIC_ERROR, error, constants.EVENT_TYPE.SOFTPHONE_ERROR);
      }

      break;

    default:
      console.error('Unhandled error scenario with arguments ', arguments);
  }
}
/**
 * Publish an event to Sfdc. The event payload will be verified to be the correct type before being published. 
 * @param {object} param
 * @param {("LOGIN_RESULT"|"LOGOUT_RESULT"|"CALL_STARTED"|"QUEUED_CALL_STARTED"|"CALL_CONNECTED"|"HANGUP"|"PARTICIPANT_CONNECTED"|"PARTICIPANT_ADDED"|"PARTICIPANTS_SWAPPED"|"PARTICIPANTS_CONFERENCED"|"MESSAGE"|"MUTE_TOGGLE"|"HOLD_TOGGLE"|"RECORDING_TOGGLE")} param.eventType Event type to publish
 * @param {object} param.payload Payload for the event. Must to be an object of the payload class associated with the EVENT_TYPE else the event is NOT dispatched
 * @param {boolean} param.registerLog Boolean to opt out of registering logs for events
 * LOGIN_RESULT - GenericResult
 * LOGOUT_RESULT - LogoutResult
 * CALL_STARTED - CallResult
 * QUEUED_CALL_STARTED - CallResult
 * CALL_CONNECTED - CallResult
 * HANGUP - CallResult
 * PARTICIPANT_CONNECTED - ParticipantResult
 * PARTICIPANT_ADDED - ParticipantResult
 * PARTICIPANTS_SWAPPED - HoldToggleResult
 * PARTICIPANTS_CONFERENCED - HoldToggleResult
 * MESSAGE - object
 * MUTE_TOGGLE - MuteToggleResult
 * HOLD_TOGGLE - HoldToggleResult
 * RECORDING_TOGGLE - RecordingToggleResult
 */

function publishEvent(_x3) {
  return _publishEvent.apply(this, arguments);
}

function _publishEvent() {
  _publishEvent = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee4(_ref3) {
    var eventType, payload, _ref3$registerLog, registerLog, hangupPayload, initialCallHasEnded, callInfo, phoneNumber, callId, _initialCallHasEnded, _callInfo, _phoneNumber, _callId2, call, activeCallsResult, activeCalls, transferCall, event, isThirdPartyOnHold, isCustomerOnHold, calls, isRecordingPaused, contactId, initialContactId, instanceId, region, _isThirdPartyOnHold, _isCustomerOnHold, _calls, _isThirdPartyOnHold2, _isCustomerOnHold2, _callId3, mos, statusId;

    return regenerator_default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            eventType = _ref3.eventType, payload = _ref3.payload, _ref3$registerLog = _ref3.registerLog, registerLog = _ref3$registerLog === void 0 ? true : _ref3$registerLog;
            _context4.t0 = eventType;
            _context4.next = _context4.t0 === constants.EVENT_TYPE.LOGIN_RESULT ? 4 : _context4.t0 === constants.EVENT_TYPE.LOGOUT_RESULT ? 6 : _context4.t0 === constants.EVENT_TYPE.CALL_STARTED ? 8 : _context4.t0 === constants.EVENT_TYPE.QUEUED_CALL_STARTED ? 10 : _context4.t0 === constants.EVENT_TYPE.PREVIEW_CALL_STARTED ? 12 : _context4.t0 === constants.EVENT_TYPE.CALL_CONNECTED ? 14 : _context4.t0 === constants.EVENT_TYPE.HANGUP ? 27 : _context4.t0 === constants.EVENT_TYPE.PARTICIPANT_ADDED ? 29 : _context4.t0 === constants.EVENT_TYPE.PARTICIPANT_CONNECTED ? 31 : _context4.t0 === constants.EVENT_TYPE.PARTICIPANT_REMOVED ? 33 : _context4.t0 === constants.EVENT_TYPE.MESSAGE ? 40 : _context4.t0 === constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED ? 42 : _context4.t0 === constants.EVENT_TYPE.WRAP_UP_ENDED ? 44 : _context4.t0 === constants.EVENT_TYPE.REMOTE_CONTROLLER ? 46 : _context4.t0 === constants.EVENT_TYPE.MUTE_TOGGLE ? 48 : _context4.t0 === constants.EVENT_TYPE.HOLD_TOGGLE ? 50 : _context4.t0 === constants.EVENT_TYPE.RECORDING_TOGGLE ? 53 : _context4.t0 === constants.EVENT_TYPE.PARTICIPANTS_SWAPPED ? 56 : _context4.t0 === constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED ? 58 : _context4.t0 === constants.EVENT_TYPE.UPDATE_AUDIO_STATS ? 60 : _context4.t0 === constants.EVENT_TYPE.SUPERVISOR_BARGED_IN ? 62 : _context4.t0 === constants.EVENT_TYPE.CALL_BARGED_IN ? 64 : _context4.t0 === constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED ? 66 : _context4.t0 === constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED ? 68 : _context4.t0 === constants.EVENT_TYPE.SUPERVISOR_HANGUP ? 70 : _context4.t0 === constants.EVENT_TYPE.SET_AGENT_STATUS ? 72 : _context4.t0 === constants.EVENT_TYPE.GET_AGENT_STATUS ? 74 : 76;
            break;

          case 4:
            if (validatePayload(payload, types_GenericResult, constants.ERROR_TYPE.CAN_NOT_LOG_IN, constants.EVENT_TYPE.LOGIN_RESULT)) {
              dispatchEvent(constants.EVENT_TYPE.LOGIN_RESULT, payload, registerLog);

              if (payload.success) {
                setConnectorReady();
              }
            }

            return _context4.abrupt("break", 76);

          case 6:
            if (validatePayload(payload, types_LogoutResult, constants.ERROR_TYPE.CAN_NOT_LOG_OUT, constants.EVENT_TYPE.LOGOUT_RESULT)) {
              dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, {
                success: payload.success,
                loginFrameHeight: payload.loginFrameHeight
              }, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 8:
            if (validatePayload(payload, types_CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.EVENT_TYPE.CALL_STARTED)) {
              dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, payload.call, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 10:
            if (validatePayload(payload, types_CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.EVENT_TYPE.QUEUED_CALL_STARTED)) {
              dispatchEvent(constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload.call, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 12:
            if (validatePayload(payload, types_CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.EVENT_TYPE.PREVIEW_CALL_STARTED)) {
              dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, payload.call, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 14:
            if (!validatePayload(payload, types_CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.EVENT_TYPE.CALL_CONNECTED)) {
              _context4.next = 26;
              break;
            }

            initAudioStats();

            if (!isSupervisorConnected) {
              _context4.next = 25;
              break;
            }

            _context4.next = 19;
            return vendorConnector.supervisorDisconnect();

          case 19:
            hangupPayload = _context4.sent;
            types_Validator.validateClassObject(hangupPayload, types_SupervisorHangupResult);
            isSupervisorConnected = false;
            dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_HANGUP, hangupPayload, registerLog);
            dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, payload.call, registerLog);
            return _context4.abrupt("break", 76);

          case 25:
            dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, payload.call, registerLog);

          case 26:
            return _context4.abrupt("break", 76);

          case 27:
            if (validatePayload(payload, types_HangupResult, constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, constants.EVENT_TYPE.HANGUP)) {
              dispatchEvent(constants.EVENT_TYPE.HANGUP, payload.calls, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 29:
            if (validatePayload(payload, types_ParticipantResult, constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, constants.EVENT_TYPE.PARTICIPANT_ADDED)) {
              initialCallHasEnded = payload.initialCallHasEnded, callInfo = payload.callInfo, phoneNumber = payload.phoneNumber, callId = payload.callId;
              dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_ADDED, {
                initialCallHasEnded: initialCallHasEnded,
                callInfo: callInfo,
                phoneNumber: phoneNumber,
                callId: callId
              }, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 31:
            if (validatePayload(payload, types_ParticipantResult, constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, constants.EVENT_TYPE.PARTICIPANT_CONNECTED)) {
              _initialCallHasEnded = payload.initialCallHasEnded, _callInfo = payload.callInfo, _phoneNumber = payload.phoneNumber, _callId2 = payload.callId;
              dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_CONNECTED, {
                initialCallHasEnded: _initialCallHasEnded,
                callInfo: _callInfo,
                phoneNumber: _phoneNumber,
                callId: _callId2
              }, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 33:
            if (!validatePayload(payload, types_CallResult, constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, constants.EVENT_TYPE.PARTICIPANT_REMOVED)) {
              _context4.next = 39;
              break;
            }

            call = payload.call;
            _context4.next = 37;
            return vendorConnector.getActiveCalls();

          case 37:
            activeCallsResult = _context4.sent;

            if (validatePayload(activeCallsResult, types_ActiveCallsResult)) {
              // when no more active calls, fire HANGUP
              activeCalls = activeCallsResult.activeCalls;

              if (activeCalls.length === 0) {
                dispatchEvent(constants.EVENT_TYPE.HANGUP, call, registerLog);
              } else if (call && call.callAttributes && call.callAttributes.participantType === constants.PARTICIPANT_TYPE.INITIAL_CALLER) {
                // when there is still transfer call, based on the state of the transfer call, fire PARTICIPANT_ADDED or PARTICIPANT_CONNECTED
                transferCall = Object.values(activeCalls).filter(function (obj) {
                  return obj['callType'] === constants.CALL_TYPE.ADD_PARTICIPANT;
                }).pop();
                event = transferCall.state === constants.CALL_STATE.TRANSFERRING ? constants.EVENT_TYPE.PARTICIPANT_ADDED : constants.EVENT_TYPE.PARTICIPANT_CONNECTED;
                dispatchEvent(event, {
                  initialCallHasEnded: true
                });
              } else {
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, {
                  reason: call ? call.reason : null
                }, registerLog);
              }
            }

          case 39:
            return _context4.abrupt("break", 76);

          case 40:
            dispatchEvent(constants.EVENT_TYPE.MESSAGE, payload, registerLog);
            return _context4.abrupt("break", 76);

          case 42:
            dispatchEvent(constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload, registerLog);
            return _context4.abrupt("break", 76);

          case 44:
            dispatchEvent(constants.EVENT_TYPE.WRAP_UP_ENDED, payload, registerLog);
            return _context4.abrupt("break", 76);

          case 46:
            channelMessageHandler(payload);
            return _context4.abrupt("break", 76);

          case 48:
            if (validatePayload(payload, types_MuteToggleResult, constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, constants.EVENT_TYPE.MUTE_TOGGLE)) {
              dispatchEvent(constants.EVENT_TYPE.MUTE_TOGGLE, payload, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 50:
            isThirdPartyOnHold = payload.isThirdPartyOnHold, isCustomerOnHold = payload.isCustomerOnHold, calls = payload.calls;

            if (validatePayload(payload, types_HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, constants.EVENT_TYPE.HOLD_TOGGLE)) {
              dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                isThirdPartyOnHold: isThirdPartyOnHold,
                isCustomerOnHold: isCustomerOnHold,
                calls: calls
              }, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 53:
            isRecordingPaused = payload.isRecordingPaused, contactId = payload.contactId, initialContactId = payload.initialContactId, instanceId = payload.instanceId, region = payload.region;

            if (validatePayload(payload, types_RecordingToggleResult, constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, constants.EVENT_TYPE.RECORDING_TOGGLE)) {
              dispatchEvent(constants.EVENT_TYPE.RECORDING_TOGGLE, {
                isRecordingPaused: isRecordingPaused,
                contactId: contactId,
                initialContactId: initialContactId,
                instanceId: instanceId,
                region: region
              }, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 56:
            if (validatePayload(payload, types_HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, constants.EVENT_TYPE.PARTICIPANTS_SWAPPED)) {
              _isThirdPartyOnHold = payload.isThirdPartyOnHold, _isCustomerOnHold = payload.isCustomerOnHold, _calls = payload.calls;
              dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                isThirdPartyOnHold: _isThirdPartyOnHold,
                isCustomerOnHold: _isCustomerOnHold,
                calls: _calls
              }, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 58:
            if (validatePayload(payload, types_HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_CONFERENCE, constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED)) {
              _isThirdPartyOnHold2 = payload.isThirdPartyOnHold, _isCustomerOnHold2 = payload.isCustomerOnHold;
              dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                isThirdPartyOnHold: _isThirdPartyOnHold2,
                isCustomerOnHold: _isCustomerOnHold2
              }, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 60:
            if (validatePayload(payload, types_AudioStats)) {
              if (payload.stats) {
                updateAudioStats(payload.stats);
              }

              if (payload.isAudioStatsCompleted && payload.callId) {
                _callId3 = payload.callId;
                mos = getMOS();
                dispatchEvent(constants.EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED, {
                  callId: _callId3,
                  mos: mos
                }, registerLog);
              }
            }

            return _context4.abrupt("break", 76);

          case 62:
            if (validatePayload(payload, types_SuperviseCallResult, constants.ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR, constants.EVENT_TYPE.SUPERVISOR_BARGED_IN)) {
              dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_BARGED_IN, payload.call, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 64:
            if (validatePayload(payload, types_SupervisedCallInfo, constants.ERROR_TYPE.GENERIC_ERROR, constants.EVENT_TYPE.CALL_BARGED_IN)) {
              dispatchEvent(constants.EVENT_TYPE.CALL_BARGED_IN, payload, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 66:
            if (validatePayload(payload, types_SuperviseCallResult, constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED)) {
              isSupervisorConnected = true;
              dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, payload.call, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 68:
            if (validatePayload(payload, types_SuperviseCallResult, constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED)) {
              isSupervisorConnected = true;
              dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, payload.call, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 70:
            if (validatePayload(payload, types_SupervisorHangupResult, constants.ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR, constants.EVENT_TYPE.SUPERVISOR_HANGUP)) {
              isSupervisorConnected = false;
              dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_HANGUP, payload.calls, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 72:
            if (validatePayload(payload, types_AgentStatusInfo, constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, constants.EVENT_TYPE.SET_AGENT_STATUS)) {
              statusId = payload.statusId;
              dispatchEvent(constants.EVENT_TYPE.SET_AGENT_STATUS, {
                statusId: statusId
              }, registerLog);
            }

            return _context4.abrupt("break", 76);

          case 74:
            if (validatePayload(payload, types_AgentStatusInfo, constants.ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS, constants.EVENT_TYPE.GET_AGENT_STATUS)) {
              dispatchEvent(constants.EVENT_TYPE.GET_AGENT_STATUS, payload);
            }

            return _context4.abrupt("break", 76);

          case 76:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _publishEvent.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/main/index.js
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */




/***/ })
/******/ ]);
});
//# sourceMappingURL=scv-connector-base.js.map