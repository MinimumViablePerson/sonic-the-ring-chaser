// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/core/Canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Canvas(_ref) {
  var target = _ref.target,
      options = _objectWithoutProperties(_ref, ["target"]);

  var element = document.createElement('canvas');
  target.append(element);

  for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    element[key] = value;
  }

  var ctx = element.getContext('2d');
  var canvas = {
    element: element,
    ctx: ctx
  };
  return Object.freeze(canvas);
}

var _default = Canvas;
exports.default = _default;
},{}],"src/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = exports.pickRandom = exports.outOfBounds = exports.rectCollision = exports.randomRange = void 0;

var randomRange = function randomRange(min, max) {
  return Math.round(min + Math.random() * (max - min));
};

exports.randomRange = randomRange;

var rectCollision = function rectCollision(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
};

exports.rectCollision = rectCollision;

var outOfBounds = function outOfBounds(canvasElement, object) {
  var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return object.x - padding > canvasElement.width || object.x + padding < 0 || object.y - padding > canvasElement.height || object.y + padding < 0;
};

exports.outOfBounds = outOfBounds;

var pickRandom = function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
};

exports.pickRandom = pickRandom;

var deepClone = function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
};

exports.deepClone = deepClone;
},{}],"src/core/Engine.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Engine(_ref) {
  var canvas = _ref.canvas,
      soundBank = _ref.soundBank,
      scenes = _ref.scenes,
      initialScene = _ref.initialScene;
  if (initialScene === undefined) throw Error('Please select an initial scene.');
  var paused = false;
  var scene = null;

  var togglePause = function togglePause() {
    if (paused) resume();else pause();
  };

  var pause = function pause() {
    soundBank.pauseAll();
    soundBank.play('freeze');
    paused = true;
  };

  var resume = function resume() {
    soundBank.resumeAll();
    paused = false;
    render();
  };

  var render = function render() {
    if (paused) return;
    requestAnimationFrame(render);
    var _canvas$element = canvas.element,
        width = _canvas$element.width,
        height = _canvas$element.height;
    canvas.ctx.clearRect(0, 0, width, height);
    scene.objects.forEach(function (object) {
      return object.render();
    });
  };

  var start = function start() {
    render();
  };

  var addObject = function addObject(object) {
    scene.objects = [].concat(_toConsumableArray(scene.objects), [object]);
  };

  var removeObject = function removeObject(target) {
    scene.objects = scene.objects.filter(function (object) {
      return object !== target;
    });
  };

  var runEffect = function runEffect(effectName) {
    var _scene$effects;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_scene$effects = scene.effects)[effectName].apply(_scene$effects, [engine].concat(args));
  };

  var setScene = function setScene(sceneName) {
    if (scene !== null) scene.onExit(engine);
    var _scenes$sceneName = scenes[sceneName],
        state = _scenes$sceneName.state,
        makeObjects = _scenes$sceneName.makeObjects,
        effects = _scenes$sceneName.effects,
        onEnter = _scenes$sceneName.onEnter,
        onExit = _scenes$sceneName.onExit;
    scene = {
      state: (0, _helpers.deepClone)(state),
      objects: makeObjects(engine),
      effects: effects,
      onExit: onExit
    };
    scene.player = scene.objects.find(function (object) {
      return object.isPlayer;
    });
    onEnter(engine);
  };

  var setState = function setState(newState) {
    scene.state = _objectSpread(_objectSpread({}, scene.state), newState);
  };

  var isRunning = function isRunning() {
    return !paused;
  };

  var engine = {
    start: start,
    canvas: canvas,
    soundBank: soundBank,
    getObjects: function getObjects() {
      return scene.objects;
    },
    removeObject: removeObject,
    addObject: addObject,
    getPlayer: function getPlayer() {
      return scene.player;
    },
    getState: function getState() {
      return scene.state;
    },
    setState: setState,
    runEffect: runEffect,
    setScene: setScene,
    togglePause: togglePause,
    isRunning: isRunning
  };
  setScene(initialScene);
  return Object.freeze(engine);
}

var _default = Engine;
exports.default = _default;
},{"../helpers":"src/helpers.js"}],"src/core/SoundBank.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function SoundBank(_ref) {
  var basePath = _ref.basePath,
      soundSources = _objectWithoutProperties(_ref, ["basePath"]);

  var createSoundSourceUrls = function createSoundSourceUrls() {
    var _loop = function _loop(soundName) {
      var filePath = soundSources[soundName];
      fetch("".concat(basePath, "/").concat(filePath)).then(function (resp) {
        return resp.blob();
      }).then(function (blob) {
        var audioSrc = window.URL.createObjectURL(blob);
        soundSources[soundName] = audioSrc;
      });
    };

    for (var soundName in soundSources) {
      _loop(soundName);
    }
  };

  var play = function play(_ref2) {
    var _ref2$sound = _ref2.sound,
        sound = _ref2$sound === void 0 ? '' : _ref2$sound,
        _ref2$loop = _ref2.loop,
        loop = _ref2$loop === void 0 ? false : _ref2$loop,
        _ref2$volume = _ref2.volume,
        volume = _ref2$volume === void 0 ? 1 : _ref2$volume;
    var audio = new Audio(soundSources[sound]);
    audio.play();
    audio.loop = loop;
    audio.volume = volume;
    playing = [audio].concat(_toConsumableArray(playing));

    audio.onended = function () {
      if (audio.loop) return;
      playing = playing.filter(function (target) {
        return target !== audio;
      });
    };
  };

  var clearPlaylist = function clearPlaylist() {
    playing = [];
  };

  var pauseAll = function pauseAll() {
    playing.forEach(function (audio) {
      return audio.pause();
    });
  };

  var resumeAll = function resumeAll() {
    playing.forEach(function (audio) {
      return audio.play();
    });
  };

  createSoundSourceUrls();
  var playing = [];
  var soundBank = {
    play: play,
    resumeAll: resumeAll,
    pauseAll: pauseAll,
    clearPlaylist: clearPlaylist
  };
  return Object.freeze(soundBank);
}

var _default = SoundBank;
exports.default = _default;
},{}],"src/objects/SonicSoundBank.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SoundBank = _interopRequireDefault(require("../core/SoundBank"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SonicSoundBank = (0, _SoundBank.default)({
  basePath: '/src/assets/sounds',
  bg: 'bg-music.mp3',
  gameOver: 'ending.mp3',
  rings: 'rings.mp3',
  jump: 'jump.mp3',
  freeze: 'freeze.mp3',
  tailsHereICome: 'tails-here-i-come.mp3',
  tailsNoSee: 'tails-no-see.mp3',
  tailsScream: 'tails-scream.mp3',
  tailsSonicHappy: 'tails-sonic-happy.mp3',
  tailsSonicUpset: 'tails-sonic-upset.mp3',
  tailsSorry: 'tails-sorry.mp3',
  tailsSupercharge: 'tails-supercharge.mp3',
  tailsUhOh: 'tails-uh-oh.mp3',
  tailsWakeUp: 'tails-wake-up.mp3',
  tailsWhereSonic: 'tails-where-sonic.mp3',
  tailsYeah: 'tails-yeah.mp3',
  tailsYeah2: 'tails-yeah-2.mp3'
});
var _default = SonicSoundBank;
exports.default = _default;
},{"../core/SoundBank":"src/core/SoundBank.js"}],"src/core/Scene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function Scene(_ref) {
  var _ref$objects = _ref.objects,
      objects = _ref$objects === void 0 ? [] : _ref$objects,
      _ref$effects = _ref.effects,
      effects = _ref$effects === void 0 ? [] : _ref$effects,
      _ref$state = _ref.state,
      state = _ref$state === void 0 ? {} : _ref$state,
      _ref$onEnter = _ref.onEnter,
      onEnter = _ref$onEnter === void 0 ? function (engine) {} : _ref$onEnter,
      _ref$onExit = _ref.onExit,
      onExit = _ref$onExit === void 0 ? function (engine) {} : _ref$onExit;
  var scene = {
    makeObjects: function makeObjects(engine) {
      return objects.map(function (object) {
        return object({
          engine: engine
        });
      });
    },
    effects: effects,
    state: state,
    onEnter: onEnter,
    onExit: onExit
  };
  return Object.freeze(scene);
}

var _default = Scene;
exports.default = _default;
},{}],"src/core/Sprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function Sprite(_ref) {
  var engine = _ref.engine,
      _ref$initialX = _ref.initialX,
      initialX = _ref$initialX === void 0 ? 0 : _ref$initialX,
      _ref$initialY = _ref.initialY,
      initialY = _ref$initialY === void 0 ? 0 : _ref$initialY,
      spritesheet = _ref.spritesheet,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 40 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 50 : _ref$height,
      _ref$frameRate = _ref.frameRate,
      frameRate = _ref$frameRate === void 0 ? 10 : _ref$frameRate,
      _ref$sections = _ref.sections,
      sections = _ref$sections === void 0 ? {
    idle: [{
      xOffset: 0,
      yOffset: 0,
      spriteWidth: 100,
      spriteHeight: 100
    }]
  } : _ref$sections,
      _ref$defaultSection = _ref.defaultSection,
      defaultSection = _ref$defaultSection === void 0 ? 'idle' : _ref$defaultSection;
  var canvas = engine.canvas;
  var currentFrameNumber = 0;
  var framesPlayed = 0;
  var image = new Image();
  image.src = "/src/assets/sprites/".concat(spritesheet, ".png");
  var currentSection = sections[defaultSection] || Object.values(sections)[0];

  var getCurrentSection = function getCurrentSection() {
    return currentSection;
  };

  var getCurrentFrame = function getCurrentFrame() {
    return currentSection[currentFrameNumber];
  };

  var draw = function draw() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        x = _ref2.x,
        y = _ref2.y;

    var currentFrame = getCurrentFrame();
    if (currentFrame === undefined) throw Error('No frame selected. Make sure you have at least one section with at least one frame in it.');
    canvas.ctx.drawImage(image, currentFrame.xOffset, currentFrame.yOffset, currentFrame.spriteWidth, currentFrame.spriteHeight, x, y, width, height);
  };

  var nextFrame = function nextFrame() {
    framesPlayed++;
    currentFrameNumber = Math.floor(framesPlayed / frameRate) % currentSection.length;
  };

  var play = function play(section) {
    var newFrameRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    if (sections[section] === undefined) return;
    if (sections[section] === currentSection) return;
    frameRate = newFrameRate;
    currentFrameNumber = 0;
    currentSection = sections[section];
  };

  var render = function render() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$x = _ref3.x,
        x = _ref3$x === void 0 ? initialX : _ref3$x,
        _ref3$y = _ref3.y,
        y = _ref3$y === void 0 ? initialY : _ref3$y;

    draw({
      x: x,
      y: y
    });
    nextFrame();
  };

  var sprite = {
    render: render,
    play: play,
    sections: sections,
    getCurrentFrame: getCurrentFrame,
    getCurrentSection: getCurrentSection
  };
  return Object.freeze(sprite);
}

var _default = Sprite;
exports.default = _default;
},{}],"src/objects/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sprite = _interopRequireDefault(require("../core/Sprite"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getInitialState = function getInitialState(engine) {
  return {
    sidePadding: 0,
    x: 0,
    y: 0,
    width: 30,
    height: 40,
    canvas: engine.canvas,
    floorHeight: engine.canvas.element.height - 45,
    smashing: false,
    smashPower: 10,
    speed: 5,
    gravity: 0.5,
    friction: 0.5,
    jumping: false,
    jumps: 0,
    maxJumps: 3,
    jumpPower: 11,
    velocity: {
      x: 0,
      y: 0
    },
    runningRight: false,
    runningLeft: false
  };
};

function Player(_ref) {
  var engine = _ref.engine;
  var state = getInitialState(engine);
  var sprite = (0, _Sprite.default)({
    engine: engine,
    x: state.x,
    y: state.y,
    spritesheet: 'sonic',
    width: state.width,
    height: state.height,
    frameRate: 10,
    sections: {
      walkingRight: [{
        xOffset: 425,
        yOffset: 73,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 470,
        yOffset: 73,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 515,
        yOffset: 73,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 560,
        yOffset: 73,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 615,
        yOffset: 73,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 665,
        yOffset: 73,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 10,
        yOffset: 138,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 55,
        yOffset: 138,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 100,
        yOffset: 138,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 145,
        yOffset: 138,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 190,
        yOffset: 138,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 245,
        yOffset: 138,
        spriteWidth: 32,
        spriteHeight: 43
      }],
      idle: [{
        xOffset: 15,
        yOffset: 10,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 60,
        yOffset: 10,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 105,
        yOffset: 10,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 150,
        yOffset: 10,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 195,
        yOffset: 10,
        spriteWidth: 32,
        spriteHeight: 43
      }],
      idleLeft: [{
        xOffset: 688 - 45 * 0,
        yOffset: 582,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 688 - 45 * 1,
        yOffset: 582,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 688 - 45 * 2,
        yOffset: 582,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 688 - 45 * 3,
        yOffset: 582,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 688 - 45 * 4,
        yOffset: 582,
        spriteWidth: 32,
        spriteHeight: 43
      }],
      walkingLeft: [{
        xOffset: 275,
        yOffset: 646,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 230,
        yOffset: 646,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 185,
        yOffset: 646,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 140,
        yOffset: 646,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 85,
        yOffset: 646,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 35,
        yOffset: 646,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 688,
        yOffset: 711,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 643,
        yOffset: 711,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 598,
        yOffset: 711,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 553,
        yOffset: 711,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 508,
        yOffset: 711,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 453,
        yOffset: 711,
        spriteWidth: 32,
        spriteHeight: 43
      }],
      jumping: [{
        xOffset: 10,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 50,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 85,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 130,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 175,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 210,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 250,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 290,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 330,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 370,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }],
      falling: [{
        xOffset: 425,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 480,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }, {
        xOffset: 535,
        yOffset: 523,
        spriteWidth: 32,
        spriteHeight: 43
      }]
    },
    defaultSection: 'falling'
  });

  var startMove = function startMove(_ref2) {
    var key = _ref2.key;

    switch (key) {
      case ' ':
      case 'ArrowUp':
        state.jumping = true;
        break;

      case 'ArrowLeft':
        state.runningLeft = true;
        break;

      case 'ArrowRight':
        state.runningRight = true;
        break;

      case 'ArrowDown':
        state.smashing = true;
        break;

      default:
        return;
    }
  };

  var stopMove = function stopMove(_ref3) {
    var key = _ref3.key;

    switch (key) {
      case 'ArrowLeft':
        state.runningLeft = false;
        break;

      case 'ArrowRight':
        state.runningRight = false;
        break;

      default:
        return;
    }
  };

  var applyGravity = function applyGravity() {
    if (state.y > state.floorHeight - state.height) {
      state.y = state.floorHeight - state.height;
      state.velocity.y = 0;
      state.jumps = 0;
      state.smashing = false;
    } else {
      state.velocity.y += state.gravity;
    }
  };

  var applyFriction = function applyFriction() {
    if (state.velocity.x > 1) {
      state.velocity.x -= state.friction;
    } else if (state.velocity.x < -1) {
      state.velocity.x += state.friction;
    } else {
      state.velocity.x = 0;
    }
  };

  var updateVelocity = function updateVelocity() {
    if (state.runningLeft) {
      state.velocity.x = -state.speed;
    }

    if (state.runningRight) {
      state.velocity.x = state.speed;
    }

    if (state.x > state.canvas.element.width - state.width - state.sidePadding) {
      state.x = state.canvas.element.width - state.width - state.sidePadding;
      state.velocity.x = 0;
      state.runningRight = false;
    }

    if (state.x < state.sidePadding) {
      state.x = state.sidePadding;
      state.velocity.x = 0;
      state.runningLeft = false;
    }

    if (state.jumping) {
      state.jumping = false;
      state.jumps++;

      if (state.jumps <= state.maxJumps) {
        engine.soundBank.play({
          sound: 'jump',
          volume: 0.4
        });
        state.velocity.y = -state.jumpPower;
      }
    }

    if (state.smashing) {
      state.velocity.y += state.smashPower;
    }
  };

  var applyVelocity = function applyVelocity() {
    state.y += state.velocity.y;
    state.x += state.velocity.x;
  };

  var updateAnimation = function updateAnimation() {
    if (state.velocity.y <= -1) {
      sprite.play('jumping', 5);
      return;
    }

    if (state.velocity.y >= 1) {
      sprite.play('falling', 5);
      return;
    }

    if (state.velocity.x > 0) {
      sprite.play('walkingRight', 12 / state.speed);
      return;
    }

    if (state.velocity.x < 0) {
      sprite.play('walkingLeft', 12 / state.speed);
      return;
    }

    if (state.velocity.x === 0) {
      if (sprite.getCurrentSection() === sprite.sections.walkingLeft || sprite.getCurrentSection() === sprite.sections.idleLeft) {
        sprite.play('idleLeft', 10);
      } else {
        sprite.play('idle', 10);
      }

      return;
    }
  };

  var slowDownBy = function slowDownBy(amount) {
    state.speed -= amount;
  };

  var speedUpBy = function speedUpBy(amount) {
    state.speed += amount;
  };

  var draw = function draw() {
    sprite.render({
      x: state.x,
      y: state.y
    });
  };

  var reset = function reset() {
    state = InitialState(engine);
  };

  var render = function render() {
    updateVelocity();
    applyVelocity();
    applyGravity();
    updateAnimation();
    applyFriction();
    draw();
  };

  window.addEventListener('keydown', startMove);
  window.addEventListener('keyup', stopMove);
  var player = {
    render: render,
    slowDownBy: slowDownBy,
    speedUpBy: speedUpBy,
    reset: reset,
    getState: function getState() {
      return state;
    },
    isPlayer: true
  };
  return Object.freeze(player);
}

var _default = Player;
exports.default = _default;
},{"../core/Sprite":"src/core/Sprite.js"}],"src/core/Text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Text(_ref) {
  var engine = _ref.engine,
      _ref$content = _ref.content,
      content = _ref$content === void 0 ? 'example text' : _ref$content,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 10 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 10 : _ref$y,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'white' : _ref$color,
      _ref$fontStyle = _ref.fontStyle,
      fontStyle = _ref$fontStyle === void 0 ? '30px sans-serif' : _ref$fontStyle,
      _ref$centered = _ref.centered,
      centered = _ref$centered === void 0 ? false : _ref$centered,
      _ref$background = _ref.background,
      background = _ref$background === void 0 ? null : _ref$background;
  var properties = {
    engine: engine,
    content: content,
    x: x,
    y: y,
    color: color,
    fontStyle: fontStyle,
    centered: centered,
    background: background
  };

  var update = function update(newProperties) {
    properties = _objectSpread(_objectSpread({}, properties), newProperties);
  };

  var draw = function draw() {
    var _properties = properties,
        content = _properties.content,
        x = _properties.x,
        y = _properties.y,
        color = _properties.color,
        fontStyle = _properties.fontStyle,
        centered = _properties.centered,
        background = _properties.background,
        _properties$engine$ca = _properties.engine.canvas,
        ctx = _properties$engine$ca.ctx,
        element = _properties$engine$ca.element;
    ctx.font = fontStyle;
    ctx.textBaseline = 'hanging';
    var textDimensions = ctx.measureText(content);
    window.textDimensions = textDimensions;
    var centeredWidth = element.width / 2 - textDimensions.width / 2;

    if (background !== null) {
      ctx.fillStyle = background;
      ctx.fillRect(centered ? centeredWidth - 5 : x - 5, y - 5, textDimensions.width + 10, textDimensions.actualBoundingBoxDescent + 10);
    }

    ctx.fillStyle = color;

    if (centered) {
      ctx.fillText(content, centeredWidth, y);
    } else {
      ctx.fillText(content, x, y);
    }
  };

  var render = function render() {
    draw();
  };

  var text = {
    update: update,
    render: render
  };
  return Object.freeze(text);
}

var _default = Text;
exports.default = _default;
},{}],"src/objects/ScoreText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Text = _interopRequireDefault(require("../core/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ScoreText(_ref) {
  var engine = _ref.engine;
  var content = "Score: 0";
  var textMeasures = engine.canvas.ctx.measureText(content);
  var x = engine.canvas.element.width - textMeasures.width - 10;
  var y = 10;
  var text = (0, _Text.default)({
    engine: engine,
    content: content,
    fontStyle: '20px sans-serif',
    x: x,
    y: y
  });

  var draw = function draw() {
    var content = "Score: ".concat(engine.getState().score);
    var textMeasures = engine.canvas.ctx.measureText(content);
    text.update({
      content: content,
      x: engine.canvas.element.width - textMeasures.actualBoundingBoxRight - 10
    });
    text.render();
  };

  var render = function render() {
    draw();
  };

  var scoreText = {
    render: render
  };
  return Object.freeze(scoreText);
}

var _default = ScoreText;
exports.default = _default;
},{"../core/Text":"src/core/Text.js"}],"src/objects/StartingText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Text = _interopRequireDefault(require("../core/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StartingText(_ref) {
  var engine = _ref.engine;
  var canvas = engine.canvas;
  var text = (0, _Text.default)({
    engine: engine,
    content: 'Ready?',
    fontStyle: '50px lobster',
    color: 'white',
    y: canvas.element.height / 2.5,
    centered: true
  });
  setTimeout(function () {
    text.update({
      content: 'GO!'
    });
    setTimeout(function () {
      engine.removeObject(startingText);
    }, 1000);
  }, 2000);

  var draw = function draw() {
    text.render();
  };

  var render = function render() {
    draw();
  };

  var startingText = {
    render: render
  };
  return Object.freeze(startingText);
}

var _default = StartingText;
exports.default = _default;
},{"../core/Text":"src/core/Text.js"}],"src/objects/GameOverText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Text = _interopRequireDefault(require("../core/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GameOverText(_ref) {
  var engine = _ref.engine;
  var canvas = engine.canvas;
  var text = (0, _Text.default)({
    engine: engine,
    content: 'Game Over!',
    fontStyle: '50px lobster',
    color: 'white',
    y: canvas.element.height / 2.5,
    centered: true
  });
  var restartText = (0, _Text.default)({
    engine: engine,
    content: 'Press "r" to restart',
    fontStyle: '25px lobster',
    color: 'white',
    y: canvas.element.height / 1.8,
    centered: true
  });

  var draw = function draw() {
    if (engine.getState().gameIsOver) {
      text.render();
      restartText.render();
    }
  };

  var render = function render() {
    draw();
  };

  var gameOverText = {
    render: render
  };
  return Object.freeze(gameOverText);
}

var _default = GameOverText;
exports.default = _default;
},{"../core/Text":"src/core/Text.js"}],"src/objects/SpeedText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Text = _interopRequireDefault(require("../core/Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SpeedText(_ref) {
  var engine = _ref.engine;
  var x = 30;
  var y = 10;
  var text = (0, _Text.default)({
    engine: engine,
    content: 'Speed: ',
    fontStyle: '20px sans-serif',
    x: x,
    y: y
  });

  var draw = function draw() {
    var speed = Math.floor(engine.getPlayer().getState().speed * 100) / 100;
    text.update({
      content: "Speed: ".concat(speed)
    });
    text.render();
  };

  var render = function render() {
    draw();
  };

  var scoreText = {
    render: render
  };
  return Object.freeze(scoreText);
}

var _default = SpeedText;
exports.default = _default;
},{"../core/Text":"src/core/Text.js"}],"src/core/Cursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function Cursor(_ref) {
  var engine = _ref.engine,
      source = _ref.source;
  var canvas = engine.canvas;
  var x = 0;
  var y = 0;
  var image = new Image();
  image.src = source;
  window.addEventListener('mousemove', function (e) {
    var _canvas$element$getBo = canvas.element.getBoundingClientRect(),
        top = _canvas$element$getBo.top,
        left = _canvas$element$getBo.left;

    x = e.x - left;
    y = e.y - top;
  });

  function draw() {
    if (!engine.getState().gameIsOver) return;
    canvas.ctx.drawImage(image, x, y, 30, 30);
  }

  function render() {
    draw();
  }

  var cursor = {
    render: render
  };
  return Object.freeze(cursor);
}

var _default = Cursor;
exports.default = _default;
},{}],"src/objects/SonicCursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cursor = _interopRequireDefault(require("../core/Cursor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SonicCursor(_ref) {
  var engine = _ref.engine;
  var cursor = (0, _Cursor.default)({
    engine: engine,
    source: '/src/assets/cursor.png'
  });
  return Object.freeze(cursor);
}

var _default = SonicCursor;
exports.default = _default;
},{"../core/Cursor":"src/core/Cursor.js"}],"src/core/BG.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function BG(_ref) {
  var engine = _ref.engine,
      source = _ref.source;
  var canvas = engine.canvas;
  var image = new Image();
  image.src = source;

  var draw = function draw() {
    canvas.ctx.drawImage(image, 0, 0, canvas.element.width, canvas.element.height);
  };

  var render = function render() {
    draw();
  };

  var bg = {
    render: render
  };
  return Object.freeze(bg);
}

var _default = BG;
exports.default = _default;
},{}],"src/objects/GameBG.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _require = require('../core/BG'),
    BG = _require.default;

function GameBG(_ref) {
  var engine = _ref.engine;
  var bg = BG({
    engine: engine,
    source: '/src/assets/bg.jpg'
  });
  return Object.freeze(bg);
}

var _default = GameBG;
exports.default = _default;
},{"../core/BG":"src/core/BG.js"}],"src/objects/Coin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sprite = _interopRequireDefault(require("../core/Sprite"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Coin(_ref) {
  var engine = _ref.engine;
  var canvas = engine.canvas;
  var state = {
    width: 20,
    height: 20,
    x: (0, _helpers.randomRange)(50, canvas.element.width - 20),
    y: (0, _helpers.randomRange)(0, canvas.element.height - 20 - 50)
  };
  var sprite = (0, _Sprite.default)(_objectSpread(_objectSpread({
    engine: engine,
    spritesheet: 'ring'
  }, state), {}, {
    frameRate: 2,
    sections: {
      idle: [{
        xOffset: 0,
        yOffset: 0,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 64,
        yOffset: 0,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 128,
        yOffset: 0,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 192,
        yOffset: 0,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 256,
        yOffset: 0,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 320,
        yOffset: 0,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 384,
        yOffset: 0,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 448,
        yOffset: 0,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 0,
        yOffset: 64,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 64,
        yOffset: 64,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 128,
        yOffset: 64,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 192,
        yOffset: 64,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 256,
        yOffset: 64,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 320,
        yOffset: 64,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 384,
        yOffset: 64,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 448,
        yOffset: 64,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 0,
        yOffset: 128,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 64,
        yOffset: 128,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 128,
        yOffset: 128,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 192,
        yOffset: 128,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 256,
        yOffset: 128,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 320,
        yOffset: 128,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 384,
        yOffset: 128,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 448,
        yOffset: 128,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 0,
        yOffset: 192,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 64,
        yOffset: 192,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 128,
        yOffset: 192,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 192,
        yOffset: 192,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 256,
        yOffset: 192,
        spriteWidth: 64,
        spriteHeight: 64
      }, {
        xOffset: 320,
        yOffset: 192,
        spriteWidth: 64,
        spriteHeight: 64
      }]
    }
  }));

  var collided = function collided() {
    var playerState = engine.getPlayer().getState();
    return (0, _helpers.rectCollision)(state, playerState);
  };

  var checkIfCollided = function checkIfCollided() {
    if (collided()) {
      engine.soundBank.play({
        sound: 'rings'
      });
      engine.removeObject(coin);
      engine.setState({
        score: engine.getState().score + 20
      });
      engine.getPlayer().slowDownBy(0.25);
    }
  };

  var draw = function draw() {
    sprite.render({
      x: state.x,
      y: state.y
    });
  };

  var render = function render() {
    checkIfCollided();
    draw();
  };

  var coin = {
    render: render
  };
  return Object.freeze(coin);
}

var _default = Coin;
exports.default = _default;
},{"../core/Sprite":"src/core/Sprite.js","../helpers":"src/helpers.js"}],"src/objects/Tails.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sprite = _interopRequireDefault(require("../core/Sprite"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tails(_ref) {
  var engine = _ref.engine;
  var canvas = engine.canvas;
  var width = 40;
  var height = 40;
  var direction = Math.random() > 0.5 ? 'left' : 'right';
  var speed = Math.ceil(Math.random() * 7);
  engine.soundBank.play({
    sound: (0, _helpers.pickRandom)(['tailsHereICome', 'tailsNoSee', 'tailsSonicHappy']),
    volume: 0.7
  });
  var state = {
    width: width,
    height: height,
    x: direction === 'right' ? -100 : canvas.element.width + 100,
    y: (0, _helpers.randomRange)(0, canvas.element.height - height - 50),
    velocity: {
      x: direction === 'right' ? speed : -speed,
      y: 0
    }
  };
  var sprite = (0, _Sprite.default)({
    engine: engine,
    initialX: state.x,
    initialY: state.y,
    spritesheet: 'tails',
    width: width,
    height: height,
    sections: {
      idle: [{
        xOffset: 197,
        yOffset: 120,
        spriteWidth: 45,
        spriteHeight: 45
      }, {
        xOffset: 243,
        yOffset: 120,
        spriteWidth: 45,
        spriteHeight: 45
      }, {
        xOffset: 288,
        yOffset: 120,
        spriteWidth: 45,
        spriteHeight: 45
      }, {
        xOffset: 330,
        yOffset: 120,
        spriteWidth: 45,
        spriteHeight: 45
      }],
      idleLeft: [{
        xOffset: 260,
        yOffset: 320,
        spriteWidth: 45,
        spriteHeight: 45
      }, {
        xOffset: 214,
        yOffset: 320,
        spriteWidth: 45,
        spriteHeight: 45
      }, {
        xOffset: 169,
        yOffset: 320,
        spriteWidth: 45,
        spriteHeight: 45
      }, {
        xOffset: 127,
        yOffset: 320,
        spriteWidth: 45,
        spriteHeight: 45
      }]
    },
    defaultSection: direction === 'right' ? 'idle' : 'idleLeft',
    frameRate: 4
  });

  var collided = function collided() {
    var playerState = engine.getPlayer().getState();
    return (0, _helpers.rectCollision)(state, playerState);
  };

  var checkIfCollided = function checkIfCollided() {
    if (collided()) {
      engine.soundBank.play({
        sound: (0, _helpers.pickRandom)(['tailsSupercharge', 'tailsYeah', 'tailsYeah2'])
      });
      engine.getPlayer().speedUpBy(1);
      engine.removeObject(tails);
    }
  };

  var checkIfOutOfBounds = function checkIfOutOfBounds() {
    if ((0, _helpers.outOfBounds)(canvas.element, state, 120)) {
      engine.soundBank.play({
        sound: (0, _helpers.pickRandom)(['tailsScream', 'tailsSorry', 'tailsWakeUp', 'tailsSonicUpset', 'tailsUhOh'])
      });
      engine.removeObject(tails);
    }
  };

  var draw = function draw() {
    sprite.render({
      x: state.x,
      y: state.y
    });
  };

  var applyVelocity = function applyVelocity() {
    state.x += state.velocity.x;
    state.y += state.velocity.y;
  };

  var render = function render() {
    checkIfCollided();
    checkIfOutOfBounds();
    applyVelocity();
    draw();
  };

  var tails = {
    render: render
  };
  return Object.freeze(tails);
}

var _default = Tails;
exports.default = _default;
},{"../core/Sprite":"src/core/Sprite.js","../helpers":"src/helpers.js"}],"src/core/Rectangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Rectangle(_ref) {
  var engine = _ref.engine,
      x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      color = _ref.color;
  var properties = {
    engine: engine,
    x: x,
    y: y,
    width: width,
    height: height,
    color: color
  };

  var update = function update(newProps) {
    properties = _objectSpread(_objectSpread({}, properties), newProps);
  };

  var draw = function draw() {
    var _properties = properties,
        engine = _properties.engine,
        x = _properties.x,
        y = _properties.y,
        width = _properties.width,
        height = _properties.height,
        color = _properties.color;
    engine.canvas.ctx.fillStyle = color;
    engine.canvas.ctx.fillRect(x, y, width, height);
  };

  var render = function render() {
    draw();
  };

  var rectangle = {
    render: render,
    update: update
  };
  return Object.freeze(rectangle);
}

var _default = Rectangle;
exports.default = _default;
},{}],"src/objects/TopBar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Rectangle = _interopRequireDefault(require("../core/Rectangle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopBar = function TopBar(_ref) {
  var engine = _ref.engine;
  return (0, _Rectangle.default)({
    engine: engine,
    x: 0,
    y: 0,
    width: engine.canvas.element.width,
    height: 35,
    color: '#00000090'
  });
};

var _default = TopBar;
exports.default = _default;
},{"../core/Rectangle":"src/core/Rectangle.js"}],"src/scenes/GameScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scene = _interopRequireDefault(require("../core/Scene"));

var _Player = _interopRequireDefault(require("../objects/Player"));

var _ScoreText = _interopRequireDefault(require("../objects/ScoreText"));

var _StartingText = _interopRequireDefault(require("../objects/StartingText"));

var _GameOverText = _interopRequireDefault(require("../objects/GameOverText"));

var _SpeedText = _interopRequireDefault(require("../objects/SpeedText"));

var _SonicCursor = _interopRequireDefault(require("../objects/SonicCursor"));

var _GameBG = _interopRequireDefault(require("../objects/GameBG"));

var _Coin = _interopRequireDefault(require("../objects/Coin"));

var _Tails = _interopRequireDefault(require("../objects/Tails"));

var _TopBar = _interopRequireDefault(require("../objects/TopBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameScene = (0, _Scene.default)({
  objects: [_GameBG.default, _TopBar.default, _GameOverText.default, _ScoreText.default, _SpeedText.default, _StartingText.default, _Player.default, _SonicCursor.default],
  effects: {
    startGame: function startGame(engine) {
      engine.soundBank.play({
        sound: 'bg',
        loop: true
      });
      engine.runEffect('spawnCoin');
      engine.runEffect('spawnTails');
    },
    gameOver: function gameOver(engine) {
      var _engine$getState = engine.getState(),
          coinHandle = _engine$getState.coinHandle,
          tailsHandle = _engine$getState.tailsHandle;

      engine.setState({
        gameIsOver: true
      });
      clearInterval(coinHandle);
      clearInterval(tailsHandle);
      engine.soundBank.pauseAll();
      engine.soundBank.play({
        sound: 'gameOver'
      });
    },
    spawnCoin: function spawnCoin(engine) {
      var coinHandle = setInterval(function () {
        var coin = (0, _Coin.default)({
          engine: engine
        });
        engine.addObject(coin);
        setTimeout(function () {
          if (engine.getObjects().includes(coin) && engine.isRunning()) {
            engine.runEffect('gameOver');
          }

          engine.removeObject(coin);
        }, engine.getState().secondsPerCoin * 1000 - 10);
      }, engine.getState().secondsPerCoin * 1000);
      engine.setState({
        coinHandle: coinHandle
      });
    },
    spawnTails: function spawnTails(engine) {
      var tailsHandle = setTimeout(function () {
        if (engine.getState().gameIsOver) return;
        var tails = (0, _Tails.default)({
          engine: engine
        });
        engine.addObject(tails);
        engine.runEffect('spawnTails');
      }, engine.getState().secondsPerTails * 1000);
      engine.setState({
        tailsHandle: tailsHandle
      });
    },
    startListeningForPause: function startListeningForPause(engine) {
      window.addEventListener('keydown', function (e) {
        if (e.key !== 'p') return;
        engine.togglePause();
      });
    },
    startListeningForRestart: function startListeningForRestart(engine) {
      window.addEventListener('keydown', function (e) {
        if (e.key !== 'r' || !engine.getState().gameIsOver) return;
        engine.setScene('game');
      });
    }
  },
  state: {
    coinHandle: null,
    tailsHandle: null,
    secondsPerCoin: 3,
    secondsPerTails: 12,
    score: 0,
    gameIsOver: false,
    paused: false
  },
  onEnter: function onEnter(engine) {
    engine.runEffect('startGame');
    engine.runEffect('startListeningForPause');
    engine.runEffect('startListeningForRestart');
  },
  onExit: function onExit(engine) {
    engine.soundBank.pauseAll();
  }
});
var _default = GameScene;
exports.default = _default;
},{"../core/Scene":"src/core/Scene.js","../objects/Player":"src/objects/Player.js","../objects/ScoreText":"src/objects/ScoreText.js","../objects/StartingText":"src/objects/StartingText.js","../objects/GameOverText":"src/objects/GameOverText.js","../objects/SpeedText":"src/objects/SpeedText.js","../objects/SonicCursor":"src/objects/SonicCursor.js","../objects/GameBG":"src/objects/GameBG.js","../objects/Coin":"src/objects/Coin.js","../objects/Tails":"src/objects/Tails.js","../objects/TopBar":"src/objects/TopBar.js"}],"src/objects/TitleScreen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BG = _interopRequireDefault(require("../core/BG"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StartScreen(_ref) {
  var engine = _ref.engine;
  var bg = (0, _BG.default)({
    engine: engine,
    source: '/src/assets/start-screen.jpg'
  });
  return Object.freeze(bg);
}

var _default = StartScreen;
exports.default = _default;
},{"../core/BG":"src/core/BG.js"}],"src/scenes/TitleScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scene = _interopRequireDefault(require("../core/Scene"));

var _TitleScreen = _interopRequireDefault(require("../objects/TitleScreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TitleScene = (0, _Scene.default)({
  objects: [_TitleScreen.default],
  effects: {
    startListeningForGameStart: function startListeningForGameStart(engine) {
      var listener = function listener(e) {
        if (e.key !== 'Enter') return;
        engine.setScene('game');
        window.removeEventListener('keydown', listener);
      };

      window.addEventListener('keydown', listener);
    }
  },
  state: {},
  onEnter: function onEnter(engine) {
    engine.runEffect('startListeningForGameStart');
  }
});
var _default = TitleScene;
exports.default = _default;
},{"../core/Scene":"src/core/Scene.js","../objects/TitleScreen":"src/objects/TitleScreen.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Canvas = _interopRequireDefault(require("./core/Canvas"));

var _Engine = _interopRequireDefault(require("./core/Engine"));

var _SonicSoundBank = _interopRequireDefault(require("./objects/SonicSoundBank"));

var _GameScene = _interopRequireDefault(require("./scenes/GameScene"));

var _TitleScene = _interopRequireDefault(require("./scenes/TitleScene"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = (0, _Canvas.default)({
  target: document.body,
  width: 500,
  height: 400
});
var engine = (0, _Engine.default)({
  canvas: canvas,
  soundBank: _SonicSoundBank.default,
  scenes: {
    title: _TitleScene.default,
    game: _GameScene.default
  },
  initialScene: 'title'
});
engine.start();
},{"./core/Canvas":"src/core/Canvas.js","./core/Engine":"src/core/Engine.js","./objects/SonicSoundBank":"src/objects/SonicSoundBank.js","./scenes/GameScene":"src/scenes/GameScene.js","./scenes/TitleScene":"src/scenes/TitleScene.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63865" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map