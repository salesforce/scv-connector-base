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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
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

module.exports = _asyncToGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
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
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
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

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
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
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

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
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
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
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
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
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

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
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./src/main/baseConnector.js":
/*!***********************************!*\
  !*** ./src/main/baseConnector.js ***!
  \***********************************/
/*! exports provided: initializeConnector, publishLog, publishError, publishEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeConnector", function() { return initializeConnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishLog", function() { return publishLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishError", function() { return publishError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishEvent", function() { return publishEvent; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants.js */ "./src/main/constants.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./src/main/types.js");





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
  if (payload && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3___default()(payload) === 'object') {
    var isArray = Array.isArray(payload);
    var sanitizedPayload = isArray ? [] : {};

    if (isArray) {
      payload.forEach(function (element) {
        sanitizedPayload.push(sanitizePayload(element));
      });
    } else {
      for (var property in payload) {
        if (property !== 'phoneNumber' && property !== 'number') {
          sanitizedPayload[property] = sanitizePayload(payload[property]);
        }
      }
    }

    return sanitizedPayload;
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
  console.error('Sanitized payload ', sanitizedPayload);
  channelPort.postMessage({
    type: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.LOG,
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
    type: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
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
  dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.ERROR, {
    message: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE[errorType]
  });
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
  _setConnectorReady = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var _agentConfig, agentConfigResult, activeCallsResult, activeCalls, type, payload;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return vendorConnector.getAgentConfig();

          case 3:
            agentConfigResult = _context.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(agentConfigResult, _types__WEBPACK_IMPORTED_MODULE_5__["AgentConfigResult"]);
            _context.next = 7;
            return vendorConnector.getActiveCalls();

          case 7:
            activeCallsResult = _context.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(activeCallsResult, _types__WEBPACK_IMPORTED_MODULE_5__["ActiveCallsResult"]);
            activeCalls = activeCallsResult.activeCalls;
            type = _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.CONNECTOR_READY;
            payload = {
              agentConfig: (_agentConfig = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_agentConfig, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].AGENT_CONFIG_TYPE.MUTE, agentConfigResult.hasMute), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_agentConfig, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].AGENT_CONFIG_TYPE.RECORD, agentConfigResult.hasRecord), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_agentConfig, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].AGENT_CONFIG_TYPE.MERGE, agentConfigResult.hasMerge), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_agentConfig, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].AGENT_CONFIG_TYPE.SWAP, agentConfigResult.hasSwap), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_agentConfig, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].AGENT_CONFIG_TYPE.PHONES, agentConfigResult.phones), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_agentConfig, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].AGENT_CONFIG_TYPE.SIGNED_RECORDING_URL, agentConfigResult.hasSignedRecordingUrl), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_agentConfig, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].AGENT_CONFIG_TYPE.SELECTED_PHONE, agentConfigResult.selectedPhone), _agentConfig),
              callInProgress: activeCalls.length > 0 ? activeCalls[0] : null
            };
            channelPort.postMessage({
              type: type,
              payload: payload
            });
            dispatchEventLog(type, payload, false);
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            // Post CONNECTOR_READY even if getAgentConfig is not implemented
            channelPort.postMessage({
              type: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.CONNECTOR_READY,
              payload: {}
            });
            dispatchEventLog(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.CONNECTOR_READY, {}, false);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return _setConnectorReady.apply(this, arguments);
}

function channelMessageHandler(_x) {
  return _channelMessageHandler.apply(this, arguments);
}

function _channelMessageHandler() {
  _channelMessageHandler = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(message) {
    var eventType, payload, call, _payload, _call, _payload2, activeCallsResult, activeCalls, calls, _payload3, _payload4, _payload5, _payload6, statusInfo, _payload7, success, _payload8, _call2, _payload9, contacts, _payload10, _payload11, _payload12, _payload13, _payload14, _payload15, _success, loginFrameHeight, _activeCallsResult, _activeCalls, callId, _call3, shouldReplay, result, _message$data, recordingUrl, vendorCallKey, _callId, _result, signedRecordingUrlResult;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            eventType = message.data.type;
            dispatchEventLog(eventType, message.data, false);
            _context2.t0 = eventType;
            _context2.next = _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.ACCEPT_CALL ? 5 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.DECLINE_CALL ? 20 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.END_CALL ? 33 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.MUTE ? 49 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.UNMUTE ? 60 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.HOLD ? 71 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.RESUME ? 88 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SET_AGENT_STATUS ? 105 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.DIAL ? 125 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SEND_DIGITS ? 147 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.GET_PHONE_CONTACTS ? 156 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SWAP_PARTICIPANTS ? 169 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.CONFERENCE ? 180 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.ADD_PARTICIPANT ? 191 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.PAUSE_RECORDING ? 209 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.RESUME_RECORDING ? 220 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.LOGOUT ? 231 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.MESSAGE ? 244 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.WRAP_UP_CALL ? 246 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.AGENT_AVAILABLE ? 248 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SET_AGENT_CONFIG ? 277 : _context2.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.GET_SIGNED_RECORDING_URL ? 289 : 304;
            break;

          case 5:
            _context2.prev = 5;

            if (!(message.data.call && message.data.call.callType && message.data.call.callType.toLowerCase() === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_TYPE.OUTBOUND.toLowerCase())) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return");

          case 8:
            _context2.next = 10;
            return vendorConnector.acceptCall(message.data.call);

          case 10:
            payload = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(payload, _types__WEBPACK_IMPORTED_MODULE_5__["CallResult"]);
            call = payload.call;
            dispatchEvent(call.callType.toLowerCase() === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_TYPE.CALLBACK.toLowerCase() ? _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED : _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_CONNECTED, call);
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t1 = _context2["catch"](5);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_ACCEPT_THE_CALL, _context2.t1, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.ACCEPT_CALL);

          case 19:
            return _context2.abrupt("break", 305);

          case 20:
            _context2.prev = 20;
            _context2.next = 23;
            return vendorConnector.declineCall(message.data.call);

          case 23:
            _payload = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(_payload, _types__WEBPACK_IMPORTED_MODULE_5__["CallResult"]);
            _call = _payload.call;
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP, _call);
            _context2.next = 32;
            break;

          case 29:
            _context2.prev = 29;
            _context2.t2 = _context2["catch"](20);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL, _context2.t2, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.DECLINE_CALL);

          case 32:
            return _context2.abrupt("break", 305);

          case 33:
            _context2.prev = 33;
            _context2.next = 36;
            return vendorConnector.endCall(message.data.call, message.data.agentStatus);

          case 36:
            _payload2 = _context2.sent;
            _context2.next = 39;
            return vendorConnector.getActiveCalls();

          case 39:
            activeCallsResult = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(activeCallsResult, _types__WEBPACK_IMPORTED_MODULE_5__["ActiveCallsResult"]);
            activeCalls = activeCallsResult.activeCalls; // after end calls from vendor side, if no more active calls, fire HANGUP

            if (activeCalls.length === 0) {
              _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(_payload2, _types__WEBPACK_IMPORTED_MODULE_5__["HangupResult"]);
              calls = _payload2.calls;
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP, calls);
            }

            _context2.next = 48;
            break;

          case 45:
            _context2.prev = 45;
            _context2.t3 = _context2["catch"](33);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_END_THE_CALL, _context2.t3, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.END_CALL);

          case 48:
            return _context2.abrupt("break", 305);

          case 49:
            _context2.prev = 49;
            _context2.next = 52;
            return vendorConnector.mute();

          case 52:
            _payload3 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MUTE_TOGGLE,
              payload: _payload3
            });
            _context2.next = 59;
            break;

          case 56:
            _context2.prev = 56;
            _context2.t4 = _context2["catch"](49);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_MUTE_CALL, _context2.t4, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.MUTE);

          case 59:
            return _context2.abrupt("break", 305);

          case 60:
            _context2.prev = 60;
            _context2.next = 63;
            return vendorConnector.unmute();

          case 63:
            _payload4 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MUTE_TOGGLE,
              payload: _payload4
            });
            _context2.next = 70;
            break;

          case 67:
            _context2.prev = 67;
            _context2.t5 = _context2["catch"](60);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_UNMUTE_CALL, _context2.t5, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.UNMUTE);

          case 70:
            return _context2.abrupt("break", 305);

          case 71:
            _context2.prev = 71;
            _context2.next = 74;
            return vendorConnector.hold(message.data.call);

          case 74:
            _payload5 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE,
              payload: _payload5
            });
            _context2.next = 87;
            break;

          case 78:
            _context2.prev = 78;
            _context2.t6 = _context2["catch"](71);
            _context2.t7 = getErrorType(_context2.t6);
            _context2.next = _context2.t7 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT ? 83 : 85;
            break;

          case 83:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(_context2.t6), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.HOLD);
            return _context2.abrupt("break", 87);

          case 85:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_HOLD_CALL, getErrorMessage(_context2.t6), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.HOLD);
            return _context2.abrupt("break", 87);

          case 87:
            return _context2.abrupt("break", 305);

          case 88:
            _context2.prev = 88;
            _context2.next = 91;
            return vendorConnector.resume(message.data.call);

          case 91:
            _payload6 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE,
              payload: _payload6
            });
            _context2.next = 104;
            break;

          case 95:
            _context2.prev = 95;
            _context2.t8 = _context2["catch"](88);
            _context2.t9 = getErrorType(_context2.t8);
            _context2.next = _context2.t9 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT ? 100 : 102;
            break;

          case 100:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(_context2.t8), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.RESUME);
            return _context2.abrupt("break", 104);

          case 102:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_RESUME_CALL, getErrorMessage(_context2.t8), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.RESUME);
            return _context2.abrupt("break", 104);

          case 104:
            return _context2.abrupt("break", 305);

          case 105:
            _context2.prev = 105;
            statusInfo = message.data.statusInfo || {};
            _context2.next = 109;
            return vendorConnector.setAgentStatus(message.data.agentStatus, statusInfo);

          case 109:
            _payload7 = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(_payload7, _types__WEBPACK_IMPORTED_MODULE_5__["GenericResult"]);
            success = _payload7.success;
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.SET_AGENT_STATUS_RESULT, {
              success: success
            });
            _context2.next = 124;
            break;

          case 115:
            _context2.prev = 115;
            _context2.t10 = _context2["catch"](105);
            _context2.t11 = getErrorType(_context2.t10);
            _context2.next = _context2.t11 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_AGENT_STATUS ? 120 : 122;
            break;

          case 120:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_AGENT_STATUS, getErrorMessage(_context2.t10), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SET_AGENT_STATUS);
            return _context2.abrupt("break", 124);

          case 122:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, getErrorMessage(_context2.t10), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SET_AGENT_STATUS);
            return _context2.abrupt("break", 124);

          case 124:
            return _context2.abrupt("break", 305);

          case 125:
            _context2.prev = 125;
            _context2.next = 128;
            return vendorConnector.dial(new _types__WEBPACK_IMPORTED_MODULE_5__["Contact"](message.data.contact));

          case 128:
            _payload8 = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(_payload8, _types__WEBPACK_IMPORTED_MODULE_5__["CallResult"]);
            _call2 = _payload8.call;
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED, _call2);
            _context2.next = 146;
            break;

          case 134:
            _context2.prev = 134;
            _context2.t12 = _context2["catch"](125);
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_FAILED);
            _context2.t13 = getErrorType(_context2.t12);
            _context2.next = _context2.t13 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_DESTINATION ? 140 : _context2.t13 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.GENERIC_ERROR ? 142 : 144;
            break;

          case 140:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(_context2.t12), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.DIAL);
            return _context2.abrupt("break", 146);

          case 142:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.GENERIC_ERROR, getErrorMessage(_context2.t12), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.DIAL);
            return _context2.abrupt("break", 146);

          case 144:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_START_THE_CALL, getErrorMessage(_context2.t12), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.DIAL);
            return _context2.abrupt("break", 146);

          case 146:
            return _context2.abrupt("break", 305);

          case 147:
            _context2.prev = 147;
            _context2.next = 150;
            return vendorConnector.sendDigits(message.data.digits);

          case 150:
            _context2.next = 155;
            break;

          case 152:
            _context2.prev = 152;
            _context2.t14 = _context2["catch"](147);
            dispatchEventLog(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SEND_DIGITS, message.data.digits, true);

          case 155:
            return _context2.abrupt("break", 305);

          case 156:
            _context2.prev = 156;
            _context2.next = 159;
            return vendorConnector.getPhoneContacts(message.data.filter);

          case 159:
            _payload9 = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(_payload9, _types__WEBPACK_IMPORTED_MODULE_5__["PhoneContactsResult"]);
            contacts = _payload9.contacts.map(function (contact) {
              return {
                id: contact.id,
                endpointARN: contact.endpointARN,
                phoneNumber: contact.phoneNumber,
                name: contact.name,
                type: contact.type
              };
            });
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PHONE_CONTACTS, {
              contacts: contacts
            });
            _context2.next = 168;
            break;

          case 165:
            _context2.prev = 165;
            _context2.t15 = _context2["catch"](156);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS, _context2.t15, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.GET_PHONE_CONTACTS);

          case 168:
            return _context2.abrupt("break", 305);

          case 169:
            _context2.prev = 169;
            _context2.next = 172;
            return vendorConnector.swap(message.data.callToHold, message.data.callToResume);

          case 172:
            _payload10 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_SWAPPED,
              payload: _payload10
            });
            _context2.next = 179;
            break;

          case 176:
            _context2.prev = 176;
            _context2.t16 = _context2["catch"](169);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, _context2.t16, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SWAP_PARTICIPANTS);

          case 179:
            return _context2.abrupt("break", 305);

          case 180:
            _context2.prev = 180;
            _context2.next = 183;
            return vendorConnector.conference(message.data.calls);

          case 183:
            _payload11 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_CONFERENCED,
              payload: _payload11
            });
            _context2.next = 190;
            break;

          case 187:
            _context2.prev = 187;
            _context2.t17 = _context2["catch"](180);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_CONFERENCE, _context2.t17, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.CONFERENCE);

          case 190:
            return _context2.abrupt("break", 305);

          case 191:
            _context2.prev = 191;
            _context2.next = 194;
            return vendorConnector.addParticipant(new _types__WEBPACK_IMPORTED_MODULE_5__["Contact"](message.data.contact), message.data.call);

          case 194:
            _payload12 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED,
              payload: _payload12
            });
            _context2.next = 208;
            break;

          case 198:
            _context2.prev = 198;
            _context2.t18 = _context2["catch"](191);
            // TODO: Can we avoid passing in reason field
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_REMOVED, {
              reason: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.ERROR.toLowerCase()
            });
            _context2.t19 = getErrorType(_context2.t18);
            _context2.next = _context2.t19 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_DESTINATION ? 204 : 206;
            break;

          case 204:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(_context2.t18), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.ADD_PARTICIPANT);
            return _context2.abrupt("break", 208);

          case 206:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, getErrorMessage(_context2.t18), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.ADD_PARTICIPANT);
            return _context2.abrupt("break", 208);

          case 208:
            return _context2.abrupt("break", 305);

          case 209:
            _context2.prev = 209;
            _context2.next = 212;
            return vendorConnector.pauseRecording(message.data.call);

          case 212:
            _payload13 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.RECORDING_TOGGLE,
              payload: _payload13
            });
            _context2.next = 219;
            break;

          case 216:
            _context2.prev = 216;
            _context2.t20 = _context2["catch"](209);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_PAUSE_RECORDING, _context2.t20, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.PAUSE_RECORDING);

          case 219:
            return _context2.abrupt("break", 305);

          case 220:
            _context2.prev = 220;
            _context2.next = 223;
            return vendorConnector.resumeRecording(message.data.call);

          case 223:
            _payload14 = _context2.sent;
            publishEvent({
              eventType: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.RECORDING_TOGGLE,
              payload: _payload14
            });
            _context2.next = 230;
            break;

          case 227:
            _context2.prev = 227;
            _context2.t21 = _context2["catch"](220);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_RESUME_RECORDING, _context2.t21, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.RESUME_RECORDING);

          case 230:
            return _context2.abrupt("break", 305);

          case 231:
            _context2.prev = 231;
            _context2.next = 234;
            return vendorConnector.logout();

          case 234:
            _payload15 = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(_payload15, _types__WEBPACK_IMPORTED_MODULE_5__["LogoutResult"]);
            _success = _payload15.success, loginFrameHeight = _payload15.loginFrameHeight;
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGOUT_RESULT, {
              success: _success,
              loginFrameHeight: loginFrameHeight
            });
            _context2.next = 243;
            break;

          case 240:
            _context2.prev = 240;
            _context2.t22 = _context2["catch"](231);
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_LOG_OUT, _context2.t22, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.LOGOUT);

          case 243:
            return _context2.abrupt("break", 305);

          case 244:
            // TODO: Define a return type for handling message
            vendorConnector.handleMessage(message.data.message);
            return _context2.abrupt("break", 305);

          case 246:
            vendorConnector.wrapUpCall(message.data.call);
            return _context2.abrupt("break", 305);

          case 248:
            agentAvailable = message.data.isAvailable;

            if (!agentAvailable) {
              _context2.next = 276;
              break;
            }

            _context2.next = 252;
            return vendorConnector.getActiveCalls();

          case 252:
            _activeCallsResult = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(_activeCallsResult, _types__WEBPACK_IMPORTED_MODULE_5__["ActiveCallsResult"]);
            _activeCalls = _activeCallsResult.activeCalls;
            _context2.t23 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.keys(_activeCalls);

          case 256:
            if ((_context2.t24 = _context2.t23()).done) {
              _context2.next = 276;
              break;
            }

            callId = _context2.t24.value;
            _call3 = _activeCalls[callId];
            shouldReplay = _call3.callInfo ? _call3.callInfo.isReplayable : true;

            if (!shouldReplay) {
              _context2.next = 274;
              break;
            }

            _call3.isReplayedCall = true;
            _context2.t25 = _call3.state;
            _context2.next = _context2.t25 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_STATE.CONNECTED ? 265 : _context2.t25 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_STATE.RINGING ? 267 : _context2.t25 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_STATE.TRANSFERRING ? 269 : _context2.t25 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_STATE.TRANSFERRED ? 271 : 273;
            break;

          case 265:
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_CONNECTED, _call3);
            return _context2.abrupt("break", 274);

          case 267:
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED, _call3);
            return _context2.abrupt("break", 274);

          case 269:
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED, {
              phoneNumber: _call3.contact.phoneNumber,
              callInfo: _call3.callInfo,
              initialCallHasEnded: _call3.callAttributes.initialCallHasEnded,
              callId: _call3.callId
            });
            return _context2.abrupt("break", 274);

          case 271:
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_CONNECTED, {
              phoneNumber: _call3.contact.phoneNumber,
              callInfo: _call3.callInfo,
              initialCallHasEnded: _call3.callAttributes.initialCallHasEnded,
              callId: _call3.callId
            });
            return _context2.abrupt("break", 274);

          case 273:
            return _context2.abrupt("break", 274);

          case 274:
            _context2.next = 256;
            break;

          case 276:
            return _context2.abrupt("break", 305);

          case 277:
            _context2.prev = 277;
            _context2.next = 280;
            return vendorConnector.setAgentConfig(message.data.config);

          case 280:
            result = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(result, _types__WEBPACK_IMPORTED_MODULE_5__["GenericResult"]);
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.AGENT_CONFIG_UPDATED, result);
            _context2.next = 288;
            break;

          case 285:
            _context2.prev = 285;
            _context2.t26 = _context2["catch"](277);
            dispatchError(getErrorType(_context2.t26) === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER ? _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER : _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG, getErrorMessage(_context2.t26), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SET_AGENT_CONFIG);

          case 288:
            return _context2.abrupt("break", 305);

          case 289:
            _context2.prev = 289;
            _message$data = message.data, recordingUrl = _message$data.recordingUrl, vendorCallKey = _message$data.vendorCallKey, _callId = _message$data.callId;
            _context2.next = 293;
            return vendorConnector.getSignedRecordingUrl(recordingUrl, vendorCallKey, _callId);

          case 293:
            _result = _context2.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(_result, _types__WEBPACK_IMPORTED_MODULE_5__["SignedRecordingUrlResult"]);
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.SIGNED_RECORDING_URL, _result);
            _context2.next = 303;
            break;

          case 298:
            _context2.prev = 298;
            _context2.t27 = _context2["catch"](289);
            // In case of an error, we want to show an error message in the recording player
            signedRecordingUrlResult = new _types__WEBPACK_IMPORTED_MODULE_5__["SignedRecordingUrlResult"]({
              success: false
            });
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.SIGNED_RECORDING_URL, signedRecordingUrlResult, false);
            dispatchEventLog(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.GET_SIGNED_RECORDING_URL, signedRecordingUrlResult, true);

          case 303:
            return _context2.abrupt("break", 305);

          case 304:
            return _context2.abrupt("break", 305);

          case 305:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 16], [20, 29], [33, 45], [49, 56], [60, 67], [71, 78], [88, 95], [105, 115], [125, 134], [147, 152], [156, 165], [169, 176], [180, 187], [191, 198], [209, 216], [220, 227], [231, 240], [277, 285], [289, 298]]);
  }));
  return _channelMessageHandler.apply(this, arguments);
}

function windowMessageHandler(_x2) {
  return _windowMessageHandler.apply(this, arguments);
}

function _windowMessageHandler() {
  _windowMessageHandler = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(message) {
    var sfDomain, payload;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = message.data.type;
            _context3.next = _context3.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SETUP_CONNECTOR ? 3 : 27;
            break;

          case 3:
            sfDomain = /^http[s]?:\/\/[\w-.]+(\.lightning\.force\.com|\.lightning\.pc-rnd\.force\.com|\.stm\.force\.com|\.salesforce\.com)$/;

            if (!sfDomain.test(message.origin)) {
              _context3.next = 25;
              break;
            }

            channelPort = message.ports[0];
            channelPort.onmessage = channelMessageHandler;
            dispatchEventLog(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SETUP_CONNECTOR, null, false);
            _context3.prev = 8;
            _context3.next = 11;
            return vendorConnector.init(message.data.connectorConfig);

          case 11:
            payload = _context3.sent;
            _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(payload, _types__WEBPACK_IMPORTED_MODULE_5__["InitResult"]);

            if (payload.showLogin) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.SHOW_LOGIN, {
                loginFrameHeight: payload.loginFrameHeight
              });
            } else {
              setConnectorReady();
            }

            _context3.next = 25;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t1 = _context3["catch"](8);
            _context3.t2 = getErrorType(_context3.t1);
            _context3.next = _context3.t2 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARAMS ? 21 : 23;
            break;

          case 21:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARAMS, getErrorMessage(_context3.t1), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SETUP_CONNECTOR);
            return _context3.abrupt("break", 25);

          case 23:
            dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_LOG_IN, getErrorMessage(_context3.t1), _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].MESSAGE_TYPE.SETUP_CONNECTOR);
            return _context3.abrupt("break", 25);

          case 25:
            window.removeEventListener('message', windowMessageHandler);
            return _context3.abrupt("break", 28);

          case 27:
            return _context3.abrupt("break", 28);

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[8, 16]]);
  }));
  return _windowMessageHandler.apply(this, arguments);
}

function validatePayload(payload, payloadType, errorType, eventType) {
  try {
    _types__WEBPACK_IMPORTED_MODULE_5__["Validator"].validateClassObject(payload, payloadType);
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
 * @param {string} param.eventType Event type.
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
    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGIN_RESULT:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_LOG_IN, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGIN_RESULT);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGOUT_RESULT:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_LOG_OUT, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGOUT_RESULT);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_START_THE_CALL, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.QUEUED_CALL_STARTED:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_START_THE_CALL, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.QUEUED_CALL_STARTED);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_CONNECTED:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_START_THE_CALL, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_CONNECTED);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_END_THE_CALL, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED:
      dispatchError(getErrorType(error) === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT ? _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT : _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_CONNECTED:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_CONNECTED);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_REMOVED:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_REMOVED);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MUTE_TOGGLE:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MUTE_TOGGLE);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE:
      dispatchError(getErrorType(error) === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT ? _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT : _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.RECORDING_TOGGLE:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.RECORDING_TOGGLE);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_SWAPPED:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_SWAPPED);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_CONFERENCED:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_CONFERENCE, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_CONFERENCED);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.AGENT_ERROR:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.AGENT_ERROR, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.AGENT_ERROR);
      break;

    case _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.SOFTPHONE_ERROR:
      dispatchError(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.GENERIC_ERROR, error, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.SOFTPHONE_ERROR);
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
  _publishEvent = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(_ref3) {
    var eventType, payload, initialCallHasEnded, callInfo, phoneNumber, callId, _initialCallHasEnded, _callInfo, _phoneNumber, _callId2, call, activeCallsResult, activeCalls, transferCall, event, isThirdPartyOnHold, isCustomerOnHold, calls, isRecordingPaused, contactId, initialContactId, instanceId, region, _isThirdPartyOnHold, _isCustomerOnHold, _calls, _isThirdPartyOnHold2, _isCustomerOnHold2;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            eventType = _ref3.eventType, payload = _ref3.payload;
            _context4.t0 = eventType;
            _context4.next = _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGIN_RESULT ? 4 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGOUT_RESULT ? 6 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED ? 8 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.QUEUED_CALL_STARTED ? 10 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_CONNECTED ? 12 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP ? 14 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED ? 16 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_CONNECTED ? 18 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_REMOVED ? 20 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MESSAGE ? 27 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.AFTER_CALL_WORK_STARTED ? 29 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.WRAP_UP_ENDED ? 31 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.REMOTE_CONTROLLER ? 33 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MUTE_TOGGLE ? 35 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE ? 37 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.RECORDING_TOGGLE ? 40 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_SWAPPED ? 43 : _context4.t0 === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_CONFERENCED ? 45 : 47;
            break;

          case 4:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["GenericResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_LOG_IN, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGIN_RESULT)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGIN_RESULT, payload);

              if (payload.success) {
                setConnectorReady();
              }
            }

            return _context4.abrupt("break", 47);

          case 6:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["LogoutResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_LOG_OUT, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGOUT_RESULT)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGOUT_RESULT, {
                success: payload.success,
                loginFrameHeight: payload.loginFrameHeight
              });
            }

            return _context4.abrupt("break", 47);

          case 8:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["CallResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_START_THE_CALL, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED, payload.call);
            }

            return _context4.abrupt("break", 47);

          case 10:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["CallResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_START_THE_CALL, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.QUEUED_CALL_STARTED)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.QUEUED_CALL_STARTED, payload.call);
            }

            return _context4.abrupt("break", 47);

          case 12:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["CallResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_START_THE_CALL, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_CONNECTED)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_CONNECTED, payload.call);
            }

            return _context4.abrupt("break", 47);

          case 14:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["HangupResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_END_THE_CALL, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP, payload.calls);
            }

            return _context4.abrupt("break", 47);

          case 16:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["ParticipantResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED)) {
              initialCallHasEnded = payload.initialCallHasEnded, callInfo = payload.callInfo, phoneNumber = payload.phoneNumber, callId = payload.callId;
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED, {
                initialCallHasEnded: initialCallHasEnded,
                callInfo: callInfo,
                phoneNumber: phoneNumber,
                callId: callId
              });
            }

            return _context4.abrupt("break", 47);

          case 18:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["ParticipantResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_CONNECTED)) {
              _initialCallHasEnded = payload.initialCallHasEnded, _callInfo = payload.callInfo, _phoneNumber = payload.phoneNumber, _callId2 = payload.callId;
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_CONNECTED, {
                initialCallHasEnded: _initialCallHasEnded,
                callInfo: _callInfo,
                phoneNumber: _phoneNumber,
                callId: _callId2
              });
            }

            return _context4.abrupt("break", 47);

          case 20:
            if (!validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["CallResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_REMOVED)) {
              _context4.next = 26;
              break;
            }

            call = payload.call;
            _context4.next = 24;
            return vendorConnector.getActiveCalls();

          case 24:
            activeCallsResult = _context4.sent;

            if (validatePayload(activeCallsResult, _types__WEBPACK_IMPORTED_MODULE_5__["ActiveCallsResult"])) {
              // when no more active calls, fire HANGUP
              activeCalls = activeCallsResult.activeCalls;

              if (activeCalls.length === 0) {
                dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP, call);
              } else if (call && call.callAttributes && call.callAttributes.participantType === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].PARTICIPANT_TYPE.INITIAL_CALLER) {
                // when there is still transfer call, based on the state of the transfer call, fire PARTICIPANT_ADDED or PARTICIPANT_CONNECTED
                transferCall = Object.values(activeCalls).filter(function (obj) {
                  return obj['callType'] === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_TYPE.ADD_PARTICIPANT;
                }).pop();
                event = transferCall.state === _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_STATE.TRANSFERRING ? _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED : _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_CONNECTED;
                dispatchEvent(event, {
                  initialCallHasEnded: true
                });
              } else {
                dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_REMOVED, {
                  reason: call ? call.reason : null
                });
              }
            }

          case 26:
            return _context4.abrupt("break", 47);

          case 27:
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MESSAGE, payload);
            return _context4.abrupt("break", 47);

          case 29:
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload);
            return _context4.abrupt("break", 47);

          case 31:
            dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.WRAP_UP_ENDED, payload);
            return _context4.abrupt("break", 47);

          case 33:
            channelMessageHandler(payload);
            return _context4.abrupt("break", 47);

          case 35:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["MuteToggleResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MUTE_TOGGLE)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MUTE_TOGGLE, payload);
            }

            return _context4.abrupt("break", 47);

          case 37:
            isThirdPartyOnHold = payload.isThirdPartyOnHold, isCustomerOnHold = payload.isCustomerOnHold, calls = payload.calls;

            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["HoldToggleResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE, {
                isThirdPartyOnHold: isThirdPartyOnHold,
                isCustomerOnHold: isCustomerOnHold,
                calls: calls
              });
            }

            return _context4.abrupt("break", 47);

          case 40:
            isRecordingPaused = payload.isRecordingPaused, contactId = payload.contactId, initialContactId = payload.initialContactId, instanceId = payload.instanceId, region = payload.region;

            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["RecordingToggleResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.RECORDING_TOGGLE)) {
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.RECORDING_TOGGLE, {
                isRecordingPaused: isRecordingPaused,
                contactId: contactId,
                initialContactId: initialContactId,
                instanceId: instanceId,
                region: region
              });
            }

            return _context4.abrupt("break", 47);

          case 43:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["HoldToggleResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_SWAPPED)) {
              _isThirdPartyOnHold = payload.isThirdPartyOnHold, _isCustomerOnHold = payload.isCustomerOnHold, _calls = payload.calls;
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE, {
                isThirdPartyOnHold: _isThirdPartyOnHold,
                isCustomerOnHold: _isCustomerOnHold,
                calls: _calls
              });
            }

            return _context4.abrupt("break", 47);

          case 45:
            if (validatePayload(payload, _types__WEBPACK_IMPORTED_MODULE_5__["HoldToggleResult"], _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_CONFERENCE, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_CONFERENCED)) {
              _isThirdPartyOnHold2 = payload.isThirdPartyOnHold, _isCustomerOnHold2 = payload.isCustomerOnHold;
              dispatchEvent(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE, {
                isThirdPartyOnHold: _isThirdPartyOnHold2,
                isCustomerOnHold: _isCustomerOnHold2
              });
            }

            return _context4.abrupt("break", 47);

          case 47:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _publishEvent.apply(this, arguments);
}

/***/ }),

/***/ "./src/main/constants.js":
/*!*******************************!*\
  !*** ./src/main/constants.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* harmony default export */ __webpack_exports__["default"] = ({
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
    GET_SIGNED_RECORDING_URL: 'GET_SIGNED_RECORDING_URL'
  },
  EVENT_TYPE: {
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
    WRAP_UP_ENDED: 'WRAP_UP_ENDED',
    MESSAGE: 'MESSAGE',
    AFTER_CALL_WORK_STARTED: 'AFTER_CALL_WORK_STARTED',
    AGENT_CONFIG_UPDATED: 'AGENT_CONFIG_UPDATED',
    AGENT_ERROR: 'AGENT_ERROR',
    SOFTPHONE_ERROR: 'SOFTPHONE_ERROR',
    SIGNED_RECORDING_URL: 'SIGNED_RECORDING_URL'
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
    CAN_NOT_GET_SIGNED_RECORDING_URL: 'CAN_NOT_GET_SIGNED_RECORDING_URL'
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
    THIRD_PARTY: 'Third_Party'
  },
  CALL_TYPE: {
    INBOUND: 'Inbound',
    OUTBOUND: 'Outbound',
    CALLBACK: 'Callback',
    ADD_PARTICIPANT: 'AddParticipant'
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
    SIGNED_RECORDING_URL: 'SIGNED_RECORDING_URL'
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
  }
});

/***/ }),

/***/ "./src/main/index.js":
/*!***************************!*\
  !*** ./src/main/index.js ***!
  \***************************/
/*! exports provided: initializeConnector, publishEvent, publishError, publishLog, Constants, ActiveCallsResult, AgentConfigResult, AgentConfig, RecordingToggleResult, ParticipantResult, SignedRecordingUrlResult, PhoneContactsResult, CallResult, HangupResult, HoldToggleResult, InitResult, GenericResult, MuteToggleResult, LogoutResult, CallInfo, PhoneCall, PhoneCallAttributes, Contact, Phone, AgentStatusInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseConnector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseConnector.js */ "./src/main/baseConnector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initializeConnector", function() { return _baseConnector_js__WEBPACK_IMPORTED_MODULE_0__["initializeConnector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publishEvent", function() { return _baseConnector_js__WEBPACK_IMPORTED_MODULE_0__["publishEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publishError", function() { return _baseConnector_js__WEBPACK_IMPORTED_MODULE_0__["publishError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "publishLog", function() { return _baseConnector_js__WEBPACK_IMPORTED_MODULE_0__["publishLog"]; });

/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types.js */ "./src/main/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["Constants"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActiveCallsResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["ActiveCallsResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AgentConfigResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["AgentConfigResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AgentConfig", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["AgentConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecordingToggleResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["RecordingToggleResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParticipantResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["ParticipantResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SignedRecordingUrlResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["SignedRecordingUrlResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PhoneContactsResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["PhoneContactsResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CallResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["CallResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HangupResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["HangupResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HoldToggleResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["HoldToggleResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InitResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["InitResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GenericResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["GenericResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MuteToggleResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["MuteToggleResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogoutResult", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["LogoutResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CallInfo", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["CallInfo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PhoneCall", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["PhoneCall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PhoneCallAttributes", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["PhoneCallAttributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Contact", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["Contact"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Phone", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["Phone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AgentStatusInfo", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["AgentStatusInfo"]; });

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



/***/ }),

/***/ "./src/main/types.js":
/*!***************************!*\
  !*** ./src/main/types.js ***!
  \***************************/
/*! exports provided: Constants, Phone, MuteToggleResult, ActiveCallsResult, AgentConfigResult, AgentConfig, RecordingToggleResult, ParticipantResult, PhoneContactsResult, CallResult, HangupResult, HoldToggleResult, SignedRecordingUrlResult, InitResult, GenericResult, LogoutResult, ErrorResult, CallInfo, Contact, PhoneCallAttributes, PhoneCall, VendorConnector, Validator, AgentStatusInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Phone", function() { return Phone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MuteToggleResult", function() { return MuteToggleResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActiveCallsResult", function() { return ActiveCallsResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentConfigResult", function() { return AgentConfigResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentConfig", function() { return AgentConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecordingToggleResult", function() { return RecordingToggleResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticipantResult", function() { return ParticipantResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneContactsResult", function() { return PhoneContactsResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CallResult", function() { return CallResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HangupResult", function() { return HangupResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoldToggleResult", function() { return HoldToggleResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignedRecordingUrlResult", function() { return SignedRecordingUrlResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitResult", function() { return InitResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericResult", function() { return GenericResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutResult", function() { return LogoutResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorResult", function() { return ErrorResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CallInfo", function() { return CallInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contact", function() { return Contact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneCallAttributes", function() { return PhoneCallAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneCall", function() { return PhoneCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorConnector", function() { return VendorConnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validator", function() { return Validator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentStatusInfo", function() { return AgentStatusInfo; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants.js */ "./src/main/constants.js");





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* eslint-disable no-unused-vars */

var Constants = {
  EVENT_TYPE: {
    LOGIN_RESULT: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGIN_RESULT,
    LOGOUT_RESULT: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.LOGOUT_RESULT,
    CALL_STARTED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_STARTED,
    QUEUED_CALL_STARTED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.QUEUED_CALL_STARTED,
    CALL_CONNECTED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.CALL_CONNECTED,
    HANGUP: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HANGUP,
    MUTE_TOGGLE: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MUTE_TOGGLE,
    HOLD_TOGGLE: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.HOLD_TOGGLE,
    RECORDING_TOGGLE: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.RECORDING_TOGGLE,
    PARTICIPANTS_SWAPPED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_SWAPPED,
    PARTICIPANTS_CONFERENCED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANTS_CONFERENCED,
    PARTICIPANT_ADDED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_ADDED,
    PARTICIPANT_CONNECTED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_CONNECTED,
    PARTICIPANT_REMOVED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.PARTICIPANT_REMOVED,
    MESSAGE: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.MESSAGE,
    AFTER_CALL_WORK_STARTED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.AFTER_CALL_WORK_STARTED,
    WRAP_UP_ENDED: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.WRAP_UP_ENDED,
    AGENT_ERROR: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.AGENT_ERROR,
    SOFTPHONE_ERROR: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].EVENT_TYPE.SOFTPHONE_ERROR
  },

  /**
  * @enum {string}
  */
  ERROR_TYPE: {
    GENERIC_ERROR: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.GENERIC_ERROR,
    INVALID_PARTICIPANT: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARTICIPANT,
    INVALID_DESTINATION: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_DESTINATION,
    INVALID_PARAMS: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_PARAMS,
    INVALID_AGENT_STATUS: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.INVALID_AGENT_STATUS,
    CAN_NOT_UPDATE_PHONE_NUMBER: _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER
  },

  /**
  * @enum {string}
  */
  AGENT_STATUS: _objectSpread({}, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].AGENT_STATUS),

  /**
  * @enum {string}
  */
  PARTICIPANT_TYPE: _objectSpread({}, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].PARTICIPANT_TYPE),

  /**
  * @enum {string}
  */
  CALL_TYPE: _objectSpread({}, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_TYPE),

  /**
  * @enum {string}
  */
  CONTACT_TYPE: _objectSpread({}, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CONTACT_TYPE),

  /**
  * @enum {string}
  */
  CALL_STATE: _objectSpread({}, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_STATE),

  /**
  * @enum {string}
  */
  HANGUP_REASON: _objectSpread({}, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].HANGUP_REASON),

  /**
  * @enum {string}
  */
  PHONE_TYPE: _objectSpread({}, _constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].PHONE_TYPE)
};
/**
 * Class representing a Phone type
 */

var Phone =
/**
 * Create Phone
 * @param {object} param
 * @param {PHONE_TYPE} param.type
 * @param {string} [param.number]
 */
function Phone(_ref) {
  var type = _ref.type,
      number = _ref.number;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Phone);

  Validator.validateEnum(type, Object.values(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].PHONE_TYPE));

  if (number) {
    Validator.validateString(number);
  }

  this.type = type;
  this.number = number;
};
/**
 * Class representing result type for mute() & unmute()
 */

var MuteToggleResult =
/**
 * Create ActiveCallsResult
 * @param {object} param
 * @param {boolean} param.isMuted
 */
function MuteToggleResult(_ref2) {
  var isMuted = _ref2.isMuted;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MuteToggleResult);

  this.isMuted = isMuted;
};
/**
 * Class representing result type for getActiveCalls()
 */

var ActiveCallsResult =
/**
 * Create ActiveCallsResult
 * @param {object} param
 * @param {PhoneCall[]} [param.activeCalls]
 */
function ActiveCallsResult(_ref3) {
  var _ref3$activeCalls = _ref3.activeCalls,
      activeCalls = _ref3$activeCalls === void 0 ? [] : _ref3$activeCalls;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ActiveCallsResult);

  if (activeCalls.length > 0) {
    activeCalls.forEach(function (activeCall) {
      Validator.validateClassObject(activeCall, PhoneCall);
    });
  }

  this.activeCalls = activeCalls;
};
/**
 * Class representing result type for getAgentConfig()
 */

var AgentConfigResult =
/**
 * Create AgentConfigResult
 * @param {object} param
 * @param {boolean} [param.hasMute]
 * @param {boolean} [param.hasRecord]
 * @param {boolean} [param.hasMerge]
 * @param {boolean} [param.hasSwap]
 * @param {boolean} [param.hasSignedRecordingUrl]
 * @param {Phone[]} [param.phones]
 * @param {string} [param.selectedPhone]
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
      phones = _ref4$phones === void 0 ? [] : _ref4$phones,
      selectedPhone = _ref4.selectedPhone;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AgentConfigResult);

  Validator.validateBoolean(hasMute);
  Validator.validateBoolean(hasRecord);
  Validator.validateBoolean(hasMerge);
  Validator.validateBoolean(hasSwap);
  Validator.validateBoolean(hasSwap);
  Validator.validateBoolean(hasSignedRecordingUrl);
  Validator.validateClassObject(phones, Array);

  if (selectedPhone) {
    Validator.validateClassObject(selectedPhone, Phone);
  }

  this.hasMute = hasMute;
  this.hasRecord = hasRecord;
  this.hasMerge = hasMerge;
  this.hasSwap = hasSwap;
  this.hasSignedRecordingUrl = hasSignedRecordingUrl;
  this.phones = phones;
  this.selectedPhone = selectedPhone;
};
/**
 * Class representing AgentConfig type for setAgentConfig()
 */

var AgentConfig =
/**
 * Create AgentConfig
 * @param {object} param
 * @param {Phone} [param.selectedPhone]
 */
function AgentConfig(_ref5) {
  var selectedPhone = _ref5.selectedPhone;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AgentConfig);

  Validator.validateClassObject(selectedPhone, Phone);
  this.selectedPhone = selectedPhone;
};
/**
 * Class representing result type for pauseRecording() & resumeRecording
 */

var RecordingToggleResult =
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

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, RecordingToggleResult);

  this.isRecordingPaused = isRecordingPaused;
  this.contactId = contactId;
  this.initialContactId = initialContactId;
  this.instanceId = instanceId;
  this.region = region;
};
/**
 * Class representing result type for addParticipant()
 */

var ParticipantResult =
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

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ParticipantResult);

  Validator.validateClassObject(callInfo, CallInfo);
  this.initialCallHasEnded = initialCallHasEnded;
  this.callInfo = callInfo;
  this.phoneNumber = phoneNumber;
  this.callId = callId;
};
/**
 * Class representing result type for getPhoneContacts()
 */

var PhoneContactsResult =
/**
 * Create PhoneContactsResult
 * @param {object} param
 * @param {Contact[]} [param.contacts]
 */
function PhoneContactsResult(_ref8) {
  var _ref8$contacts = _ref8.contacts,
      contacts = _ref8$contacts === void 0 ? [] : _ref8$contacts;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PhoneContactsResult);

  if (contacts.length > 0) {
    contacts.forEach(function (contact) {
      Validator.validateClassObject(contact, Contact);
    });
  }

  this.contacts = contacts;
};
/**
 * Class representing result type for accept(), decline(), dial()
 */

var CallResult =
/**
 * Create CallResult
 * @param {object} param
 * @param {PhoneCall} [param.call]
 */
function CallResult(_ref9) {
  var call = _ref9.call;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, CallResult);

  if (call !== undefined) {
    Validator.validateClassObject(call, PhoneCall);
  }

  this.call = call;
};
/**
 * Class representing result type for endCall(), hangup()
 */

var HangupResult =
/**
 * Create CallResult
 * @param {object} param
 * @param {PhoneCall[]|PhoneCall} param.calls - one or more calls (can be multiple calls in case of agent endcall/hangup)
 */
function HangupResult(_ref10) {
  var calls = _ref10.calls;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, HangupResult);

  if (calls instanceof Array) {
    calls.forEach(function (call) {
      return Validator.validateClassObject(call, PhoneCall);
    });
    this.calls = calls;
  } else {
    Validator.validateClassObject(calls, PhoneCall);
    this.calls = [calls];
  }
};
/**
 * Class representing result type for hold() & resume()
 */

var HoldToggleResult =
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

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, HoldToggleResult);

  if (calls) {
    Object.values(calls).forEach(function (call) {
      Validator.validateClassObject(call, PhoneCall);
    });
    this.calls = calls;
  }

  this.isThirdPartyOnHold = isThirdPartyOnHold;
  this.isCustomerOnHold = isCustomerOnHold;
};
/**
 * Class representing result type for getRecordingUrl
 */

var SignedRecordingUrlResult =
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

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, SignedRecordingUrlResult);

  if (success) {
    // For a successfull result, url is required
    Validator.validateString(url);
    Validator.validateString(callId);

    if (duration) {
      Validator.validateNumber(duration);
    }
  }

  this.success = success;
  this.url = url;
  this.duration = duration;
  this.callId = callId;
};
/**
 * Class representing result type for init()
 */

var InitResult =
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

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, InitResult);

  this.showLogin = showLogin;
  this.loginFrameHeight = loginFrameHeight;
};
/**
 * Class representing generic result type
 */

var GenericResult =
/**
 * Create GenericResult
 * @param {object} param
 * @param {boolean} param.success
 */
function GenericResult(_ref14) {
  var success = _ref14.success;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, GenericResult);

  this.success = success;
};
/**
 * Class representing logout result type
 */

var LogoutResult =
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

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, LogoutResult);

  this.success = success;
  this.loginFrameHeight = loginFrameHeight;
};
/**
 * Class representing error result type
 */

var ErrorResult =
/**
 * Create ErrorResult
 * @param {object} param
 * @param {string} param.type
 * @param {string} [param.message]
 */
function ErrorResult(_ref16) {
  var type = _ref16.type,
      message = _ref16.message;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ErrorResult);

  this.type = type;
  this.message = message;
};
/**
 * Class representing callInfo class (call metadata)
 */

var CallInfo =
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
 */
function CallInfo(_ref17) {
  var _ref17$callStateTimes = _ref17.callStateTimestamp,
      callStateTimestamp = _ref17$callStateTimes === void 0 ? null : _ref17$callStateTimes,
      isOnHold = _ref17.isOnHold,
      _ref17$isMuted = _ref17.isMuted,
      isMuted = _ref17$isMuted === void 0 ? false : _ref17$isMuted,
      _ref17$isRecordingPau = _ref17.isRecordingPaused,
      isRecordingPaused = _ref17$isRecordingPau === void 0 ? false : _ref17$isRecordingPau,
      initialCallId = _ref17.initialCallId,
      _ref17$isSoftphoneCal = _ref17.isSoftphoneCall,
      isSoftphoneCall = _ref17$isSoftphoneCal === void 0 ? true : _ref17$isSoftphoneCal,
      _ref17$acceptEnabled = _ref17.acceptEnabled,
      acceptEnabled = _ref17$acceptEnabled === void 0 ? true : _ref17$acceptEnabled,
      _ref17$declineEnabled = _ref17.declineEnabled,
      declineEnabled = _ref17$declineEnabled === void 0 ? true : _ref17$declineEnabled,
      _ref17$muteEnabled = _ref17.muteEnabled,
      muteEnabled = _ref17$muteEnabled === void 0 ? true : _ref17$muteEnabled,
      _ref17$swapEnabled = _ref17.swapEnabled,
      swapEnabled = _ref17$swapEnabled === void 0 ? true : _ref17$swapEnabled,
      _ref17$conferenceEnab = _ref17.conferenceEnabled,
      conferenceEnabled = _ref17$conferenceEnab === void 0 ? true : _ref17$conferenceEnab,
      _ref17$holdEnabled = _ref17.holdEnabled,
      holdEnabled = _ref17$holdEnabled === void 0 ? true : _ref17$holdEnabled,
      _ref17$recordEnabled = _ref17.recordEnabled,
      recordEnabled = _ref17$recordEnabled === void 0 ? true : _ref17$recordEnabled,
      _ref17$addCallerEnabl = _ref17.addCallerEnabled,
      addCallerEnabled = _ref17$addCallerEnabl === void 0 ? true : _ref17$addCallerEnabl,
      _ref17$extensionEnabl = _ref17.extensionEnabled,
      extensionEnabled = _ref17$extensionEnabl === void 0 ? true : _ref17$extensionEnabl,
      _ref17$isReplayable = _ref17.isReplayable,
      isReplayable = _ref17$isReplayable === void 0 ? true : _ref17$isReplayable;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, CallInfo);

  if (callStateTimestamp) {
    Validator.validateDate(callStateTimestamp);
  }

  Validator.validateBoolean(isRecordingPaused);
  Validator.validateBoolean(isMuted);
  Validator.validateBoolean(isSoftphoneCall);
  Validator.validateBoolean(acceptEnabled);
  Validator.validateBoolean(declineEnabled);
  Validator.validateBoolean(muteEnabled);
  Validator.validateBoolean(swapEnabled);
  Validator.validateBoolean(conferenceEnabled);
  Validator.validateBoolean(holdEnabled);
  Validator.validateBoolean(recordEnabled);
  Validator.validateBoolean(addCallerEnabled);
  Validator.validateBoolean(extensionEnabled);
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
};
/** 
 * Class representing a Contact. This object is used to represent 
 * phone system contact or any call target
 */

var Contact =
/**
 * Create a Contact.
 * @param {object} param
 * @param {string} [param.id] - The unique contactId
 * @param {CONTACT_TYPE} [param.type] - The type of the contact, one of the CONTACT_TYPE values
 * @param {string} [param.name] - The label for this contact to be displayed in the UI
 * @param {string} [param.phoneNumber] - The phone number associcated with this contact
 * @param {string} [param.prefix] - Any prefix to be dialed before dialing the number (i.e. +1)
 * @param {string} [param.extension] - Any extension to be dialed after dialing the number
 * @param {string} [param.endpointARN]
 * @param {string} [param.queue]
 */
function Contact(_ref18) {
  var phoneNumber = _ref18.phoneNumber,
      id = _ref18.id,
      type = _ref18.type,
      name = _ref18.name,
      prefix = _ref18.prefix,
      extension = _ref18.extension,
      endpointARN = _ref18.endpointARN,
      queue = _ref18.queue;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Contact);

  if (phoneNumber) {
    Validator.validateString(phoneNumber);
  }

  if (type) {
    Validator.validateEnum(type, Object.values(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CONTACT_TYPE));
  }

  if (id) {
    Validator.validateString(id);
  }

  if (name) {
    Validator.validateString(name);
  }

  if (prefix) {
    Validator.validateString(prefix);
  }

  if (extension) {
    Validator.validateString(extension);
  }

  this.phoneNumber = phoneNumber;
  this.id = id;
  this.type = type;
  this.name = name;
  this.prefix = prefix;
  this.extension = extension;
  this.endpointARN = endpointARN;
  this.queue = queue;
};
/** 
* Class representing PhoneCallAttributes
*/

var PhoneCallAttributes =
/**
 * Create PhoneCallAttributes.
 * @param {object} param
 * @param {string} [param.voiceCallId] - The voice call id
 * @param {PARTICIPANT_TYPE} [param.participantType] - The participant type of the call
 * @param {string} [param.parentId] - The parent call id of the call
 * @param {boolean} [param.isOnHold]
 */
function PhoneCallAttributes(_ref19) {
  var voiceCallId = _ref19.voiceCallId,
      participantType = _ref19.participantType,
      parentId = _ref19.parentId,
      isOnHold = _ref19.isOnHold;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PhoneCallAttributes);

  if (voiceCallId) {
    Validator.validateString(voiceCallId);
  }

  if (participantType) {
    Validator.validateEnum(participantType, Object.values(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].PARTICIPANT_TYPE));
  }

  if (parentId) {
    Validator.validateString(parentId);
  }

  if (isOnHold !== undefined) {
    Validator.validateBoolean(isOnHold);
  }

  this.voiceCallId = voiceCallId;
  this.participantType = participantType;
  this.parentId = parentId;
  this.isOnHold = isOnHold;
};
/** 
* Class representing a PhoneCall. 
*/

var PhoneCall =
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
function PhoneCall(_ref20) {
  var callId = _ref20.callId,
      callType = _ref20.callType,
      contact = _ref20.contact,
      state = _ref20.state,
      callAttributes = _ref20.callAttributes,
      phoneNumber = _ref20.phoneNumber,
      callInfo = _ref20.callInfo,
      reason = _ref20.reason,
      closeCallOnError = _ref20.closeCallOnError,
      agentStatus = _ref20.agentStatus;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PhoneCall);

  // TODO: Revisit the required fields
  if (callId) {
    Validator.validateString(callId);
    this.callId = callId;
  }

  if (callType) {
    Validator.validateEnum(callType, Object.values(_constants_js__WEBPACK_IMPORTED_MODULE_4__["default"].CALL_TYPE));
    this.callType = callType;
  }

  if (phoneNumber) {
    Validator.validateString(phoneNumber);
    this.phoneNumber = phoneNumber;
  }

  if (callInfo) {
    Validator.validateClassObject(callInfo, CallInfo);
    this.callInfo = callInfo;
  }

  if (contact) {
    Validator.validateClassObject(contact, Contact);
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
};
/** 
* Class representing a VendorConnector
*/

var VendorConnector = /*#__PURE__*/function () {
  function VendorConnector() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, VendorConnector);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(VendorConnector, [{
    key: "init",

    /**
     * Initialize the connector
     * @param {object} connectorConfig
     * @returns {Promise<InitResult>} 
     * 
     */
    value: function init(config) {
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
     * Set agent status
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
  }]);

  return VendorConnector;
}();
var Validator = /*#__PURE__*/function () {
  function Validator() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Validator);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Validator, null, [{
    key: "validateString",
    value: function validateString(value) {
      if (typeof value !== 'string') {
        throw new Error("Invalid argument. Expecting a string but got ".concat(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value)));
      }

      return this;
    }
  }, {
    key: "validateNumber",
    value: function validateNumber(value) {
      if (typeof value !== 'number') {
        throw new Error("Invalid argument. Expecting a number but got ".concat(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value)));
      }

      return this;
    }
  }, {
    key: "validateBoolean",
    value: function validateBoolean(value) {
      if (typeof value !== 'boolean') {
        throw new Error("Invalid argument. Expecting a boolean but got ".concat(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value)));
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
        throw new Error("Invalid argument. Expecting a Date object but got ".concat(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value)));
      }

      return this;
    }
  }, {
    key: "validateClassObject",
    value: function validateClassObject(object, className) {
      if (!(object instanceof className)) {
        throw new Error("Invalid className. Expecting object of class ".concat(className, " but got ").concat(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(object)));
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

var AgentStatusInfo =
/**
 * Create a AgentStatusInfo.
 * @param {object} param
 * @param {string} [param.statusId] - The unique statusId
 * @param {string} [param.statusApiName] - The status API name
 * @param {string} [param.statusName] - The label for this status to be displayed in the UI
 */
function AgentStatusInfo(_ref21) {
  var statusId = _ref21.statusId,
      statusApiName = _ref21.statusApiName,
      statusName = _ref21.statusName;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AgentStatusInfo);

  Validator.validateString(statusId);
  Validator.validateString(statusApiName);
  Validator.validateString(statusName);
  this.statusId = statusId;
  this.statusApiName = statusApiName;
  this.statusName = statusName;
};

/***/ })

/******/ });
});