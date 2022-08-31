var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
function _mergeNamespaces(n2, m2) {
  m2.forEach(function(e2) {
    e2 && typeof e2 !== "string" && !Array.isArray(e2) && Object.keys(e2).forEach(function(k) {
      if (k !== "default" && !(k in n2)) {
        var d2 = Object.getOwnPropertyDescriptor(e2, k);
        Object.defineProperty(n2, k, d2.get ? d2 : {
          enumerable: true,
          get: function() {
            return e2[k];
          }
        });
      }
    });
  });
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
var IDX = 256, HEX = [], BUFFER;
while (IDX--)
  HEX[IDX] = (IDX + 256).toString(16).substring(1);
function v4() {
  var i = 0, num, out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array(i = 256);
    while (i--)
      BUFFER[i] = 256 * Math.random() | 0;
    i = IDX = 0;
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6)
      out += HEX[num & 15 | 64];
    else if (i == 8)
      out += HEX[num & 63 | 128];
    else
      out += HEX[num];
    if (i & 1 && i > 1 && i < 11)
      out += "-";
  }
  IDX++;
  return out;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a, k, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k];
      }
    });
  });
  return a;
}
var dist = {};
var pure = {};
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var build$1 = {};
var ansiStyles = { exports: {} };
(function(module2) {
  const ANSI_BACKGROUND_OFFSET = 10;
  const wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
  const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
  function assembleStyles() {
    const codes = /* @__PURE__ */ new Map();
    const styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    styles.color.ansi256 = wrapAnsi256();
    styles.color.ansi16m = wrapAnsi16m();
    styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
    styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
    Object.defineProperties(styles, {
      rgbToAnsi256: {
        value: (red, green, blue) => {
          if (red === green && green === blue) {
            if (red < 8) {
              return 16;
            }
            if (red > 248) {
              return 231;
            }
            return Math.round((red - 8) / 247 * 24) + 232;
          }
          return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
        },
        enumerable: false
      },
      hexToRgb: {
        value: (hex) => {
          const matches2 = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
          if (!matches2) {
            return [0, 0, 0];
          }
          let { colorString } = matches2.groups;
          if (colorString.length === 3) {
            colorString = colorString.split("").map((character) => character + character).join("");
          }
          const integer = Number.parseInt(colorString, 16);
          return [
            integer >> 16 & 255,
            integer >> 8 & 255,
            integer & 255
          ];
        },
        enumerable: false
      },
      hexToAnsi256: {
        value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
        enumerable: false
      }
    });
    return styles;
  }
  Object.defineProperty(module2, "exports", {
    enumerable: true,
    get: assembleStyles
  });
})(ansiStyles);
var collections = {};
Object.defineProperty(collections, "__esModule", {
  value: true
});
collections.printIteratorEntries = printIteratorEntries;
collections.printIteratorValues = printIteratorValues;
collections.printListItems = printListItems;
collections.printObjectProperties = printObjectProperties;
const getKeysOfEnumerableProperties = (object, compareKeys) => {
  const keys7 = Object.keys(object).sort(compareKeys);
  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(object).forEach((symbol) => {
      if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
        keys7.push(symbol);
      }
    });
  }
  return keys7;
};
function printIteratorEntries(iterator, config2, indentation, depth, refs, printer2, separator = ": ") {
  let result = "";
  let current = iterator.next();
  if (!current.done) {
    result += config2.spacingOuter;
    const indentationNext = indentation + config2.indent;
    while (!current.done) {
      const name = printer2(current.value[0], config2, indentationNext, depth, refs);
      const value = printer2(current.value[1], config2, indentationNext, depth, refs);
      result += indentationNext + name + separator + value;
      current = iterator.next();
      if (!current.done) {
        result += "," + config2.spacingInner;
      } else if (!config2.min) {
        result += ",";
      }
    }
    result += config2.spacingOuter + indentation;
  }
  return result;
}
function printIteratorValues(iterator, config2, indentation, depth, refs, printer2) {
  let result = "";
  let current = iterator.next();
  if (!current.done) {
    result += config2.spacingOuter;
    const indentationNext = indentation + config2.indent;
    while (!current.done) {
      result += indentationNext + printer2(current.value, config2, indentationNext, depth, refs);
      current = iterator.next();
      if (!current.done) {
        result += "," + config2.spacingInner;
      } else if (!config2.min) {
        result += ",";
      }
    }
    result += config2.spacingOuter + indentation;
  }
  return result;
}
function printListItems(list, config2, indentation, depth, refs, printer2) {
  let result = "";
  if (list.length) {
    result += config2.spacingOuter;
    const indentationNext = indentation + config2.indent;
    for (let i = 0; i < list.length; i++) {
      result += indentationNext;
      if (i in list) {
        result += printer2(list[i], config2, indentationNext, depth, refs);
      }
      if (i < list.length - 1) {
        result += "," + config2.spacingInner;
      } else if (!config2.min) {
        result += ",";
      }
    }
    result += config2.spacingOuter + indentation;
  }
  return result;
}
function printObjectProperties(val, config2, indentation, depth, refs, printer2) {
  let result = "";
  const keys7 = getKeysOfEnumerableProperties(val, config2.compareKeys);
  if (keys7.length) {
    result += config2.spacingOuter;
    const indentationNext = indentation + config2.indent;
    for (let i = 0; i < keys7.length; i++) {
      const key = keys7[i];
      const name = printer2(key, config2, indentationNext, depth, refs);
      const value = printer2(val[key], config2, indentationNext, depth, refs);
      result += indentationNext + name + ": " + value;
      if (i < keys7.length - 1) {
        result += "," + config2.spacingInner;
      } else if (!config2.min) {
        result += ",";
      }
    }
    result += config2.spacingOuter + indentation;
  }
  return result;
}
var AsymmetricMatcher = {};
Object.defineProperty(AsymmetricMatcher, "__esModule", {
  value: true
});
AsymmetricMatcher.test = AsymmetricMatcher.serialize = AsymmetricMatcher.default = void 0;
var _collections$3 = collections;
var global$2 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  } else if (typeof global$2 !== "undefined") {
    return global$2;
  } else if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
}();
var Symbol$2 = global$2["jest-symbol-do-not-touch"] || global$2.Symbol;
const asymmetricMatcher = typeof Symbol$2 === "function" && Symbol$2.for ? Symbol$2.for("jest.asymmetricMatcher") : 1267621;
const SPACE$2 = " ";
const serialize$6 = (val, config2, indentation, depth, refs, printer2) => {
  const stringedValue = val.toString();
  if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
    if (++depth > config2.maxDepth) {
      return "[" + stringedValue + "]";
    }
    return stringedValue + SPACE$2 + "[" + (0, _collections$3.printListItems)(val.sample, config2, indentation, depth, refs, printer2) + "]";
  }
  if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
    if (++depth > config2.maxDepth) {
      return "[" + stringedValue + "]";
    }
    return stringedValue + SPACE$2 + "{" + (0, _collections$3.printObjectProperties)(val.sample, config2, indentation, depth, refs, printer2) + "}";
  }
  if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
    return stringedValue + SPACE$2 + printer2(val.sample, config2, indentation, depth, refs);
  }
  if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
    return stringedValue + SPACE$2 + printer2(val.sample, config2, indentation, depth, refs);
  }
  return val.toAsymmetricMatcher();
};
AsymmetricMatcher.serialize = serialize$6;
const test$6 = (val) => val && val.$$typeof === asymmetricMatcher;
AsymmetricMatcher.test = test$6;
const plugin$6 = {
  serialize: serialize$6,
  test: test$6
};
var _default$2k = plugin$6;
AsymmetricMatcher.default = _default$2k;
var ConvertAnsi = {};
var ansiRegex = ({ onlyFirst = false } = {}) => {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
};
Object.defineProperty(ConvertAnsi, "__esModule", {
  value: true
});
ConvertAnsi.test = ConvertAnsi.serialize = ConvertAnsi.default = void 0;
var _ansiRegex = _interopRequireDefault$9(ansiRegex);
var _ansiStyles$1 = _interopRequireDefault$9(ansiStyles.exports);
function _interopRequireDefault$9(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const toHumanReadableAnsi = (text2) => text2.replace((0, _ansiRegex.default)(), (match) => {
  switch (match) {
    case _ansiStyles$1.default.red.close:
    case _ansiStyles$1.default.green.close:
    case _ansiStyles$1.default.cyan.close:
    case _ansiStyles$1.default.gray.close:
    case _ansiStyles$1.default.white.close:
    case _ansiStyles$1.default.yellow.close:
    case _ansiStyles$1.default.bgRed.close:
    case _ansiStyles$1.default.bgGreen.close:
    case _ansiStyles$1.default.bgYellow.close:
    case _ansiStyles$1.default.inverse.close:
    case _ansiStyles$1.default.dim.close:
    case _ansiStyles$1.default.bold.close:
    case _ansiStyles$1.default.reset.open:
    case _ansiStyles$1.default.reset.close:
      return "</>";
    case _ansiStyles$1.default.red.open:
      return "<red>";
    case _ansiStyles$1.default.green.open:
      return "<green>";
    case _ansiStyles$1.default.cyan.open:
      return "<cyan>";
    case _ansiStyles$1.default.gray.open:
      return "<gray>";
    case _ansiStyles$1.default.white.open:
      return "<white>";
    case _ansiStyles$1.default.yellow.open:
      return "<yellow>";
    case _ansiStyles$1.default.bgRed.open:
      return "<bgRed>";
    case _ansiStyles$1.default.bgGreen.open:
      return "<bgGreen>";
    case _ansiStyles$1.default.bgYellow.open:
      return "<bgYellow>";
    case _ansiStyles$1.default.inverse.open:
      return "<inverse>";
    case _ansiStyles$1.default.dim.open:
      return "<dim>";
    case _ansiStyles$1.default.bold.open:
      return "<bold>";
    default:
      return "";
  }
});
const test$5 = (val) => typeof val === "string" && !!val.match((0, _ansiRegex.default)());
ConvertAnsi.test = test$5;
const serialize$5 = (val, config2, indentation, depth, refs, printer2) => printer2(toHumanReadableAnsi(val), config2, indentation, depth, refs);
ConvertAnsi.serialize = serialize$5;
const plugin$5 = {
  serialize: serialize$5,
  test: test$5
};
var _default$2j = plugin$5;
ConvertAnsi.default = _default$2j;
var DOMCollection$1 = {};
Object.defineProperty(DOMCollection$1, "__esModule", {
  value: true
});
DOMCollection$1.test = DOMCollection$1.serialize = DOMCollection$1.default = void 0;
var _collections$2 = collections;
const SPACE$1 = " ";
const OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
const ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
const testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
const test$4 = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
DOMCollection$1.test = test$4;
const isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
const serialize$4 = (collection, config2, indentation, depth, refs, printer2) => {
  const name = collection.constructor.name;
  if (++depth > config2.maxDepth) {
    return "[" + name + "]";
  }
  return (config2.min ? "" : name + SPACE$1) + (OBJECT_NAMES.indexOf(name) !== -1 ? "{" + (0, _collections$2.printObjectProperties)(isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
    props[attribute.name] = attribute.value;
    return props;
  }, {}) : __spreadValues({}, collection), config2, indentation, depth, refs, printer2) + "}" : "[" + (0, _collections$2.printListItems)(Array.from(collection), config2, indentation, depth, refs, printer2) + "]");
};
DOMCollection$1.serialize = serialize$4;
const plugin$4 = {
  serialize: serialize$4,
  test: test$4
};
var _default$2i = plugin$4;
DOMCollection$1.default = _default$2i;
var DOMElement = {};
var markup = {};
var escapeHTML$2 = {};
Object.defineProperty(escapeHTML$2, "__esModule", {
  value: true
});
escapeHTML$2.default = escapeHTML$1;
function escapeHTML$1(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
Object.defineProperty(markup, "__esModule", {
  value: true
});
markup.printText = markup.printProps = markup.printElementAsLeaf = markup.printElement = markup.printComment = markup.printChildren = void 0;
var _escapeHTML = _interopRequireDefault$8(escapeHTML$2);
function _interopRequireDefault$8(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const printProps$1 = (keys7, props, config2, indentation, depth, refs, printer2) => {
  const indentationNext = indentation + config2.indent;
  const colors = config2.colors;
  return keys7.map((key) => {
    const value = props[key];
    let printed = printer2(value, config2, indentationNext, depth, refs);
    if (typeof value !== "string") {
      if (printed.indexOf("\n") !== -1) {
        printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
      }
      printed = "{" + printed + "}";
    }
    return config2.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
  }).join("");
};
markup.printProps = printProps$1;
const printChildren$1 = (children2, config2, indentation, depth, refs, printer2) => children2.map((child) => config2.spacingOuter + indentation + (typeof child === "string" ? printText$1(child, config2) : printer2(child, config2, indentation, depth, refs))).join("");
markup.printChildren = printChildren$1;
const printText$1 = (text2, config2) => {
  const contentColor = config2.colors.content;
  return contentColor.open + (0, _escapeHTML.default)(text2) + contentColor.close;
};
markup.printText = printText$1;
const printComment$1 = (comment, config2) => {
  const commentColor = config2.colors.comment;
  return commentColor.open + "<!--" + (0, _escapeHTML.default)(comment) + "-->" + commentColor.close;
};
markup.printComment = printComment$1;
const printElement$1 = (type3, printedProps, printedChildren, config2, indentation) => {
  const tagColor = config2.colors.tag;
  return tagColor.open + "<" + type3 + (printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config2.spacingOuter + indentation + tagColor.open + "</" + type3 : (printedProps && !config2.min ? "" : " ") + "/") + ">" + tagColor.close;
};
markup.printElement = printElement$1;
const printElementAsLeaf$1 = (type3, config2) => {
  const tagColor = config2.colors.tag;
  return tagColor.open + "<" + type3 + tagColor.close + " \u2026" + tagColor.open + " />" + tagColor.close;
};
markup.printElementAsLeaf = printElementAsLeaf$1;
Object.defineProperty(DOMElement, "__esModule", {
  value: true
});
DOMElement.test = DOMElement.serialize = DOMElement.default = void 0;
var _markup$2 = markup;
const ELEMENT_NODE$2 = 1;
const TEXT_NODE$3 = 3;
const COMMENT_NODE$2 = 8;
const FRAGMENT_NODE$1 = 11;
const ELEMENT_REGEXP$1 = /^((HTML|SVG)\w*)?Element$/;
const testHasAttribute = (val) => {
  try {
    return typeof val.hasAttribute === "function" && val.hasAttribute("is");
  } catch {
    return false;
  }
};
const testNode$1 = (val) => {
  const constructorName = val.constructor.name;
  const { nodeType, tagName } = val;
  const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
  return nodeType === ELEMENT_NODE$2 && (ELEMENT_REGEXP$1.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$3 && constructorName === "Text" || nodeType === COMMENT_NODE$2 && constructorName === "Comment" || nodeType === FRAGMENT_NODE$1 && constructorName === "DocumentFragment";
};
const test$3 = (val) => {
  var _val$constructor;
  return (val === null || val === void 0 ? void 0 : (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) && testNode$1(val);
};
DOMElement.test = test$3;
function nodeIsText$1(node) {
  return node.nodeType === TEXT_NODE$3;
}
function nodeIsComment$1(node) {
  return node.nodeType === COMMENT_NODE$2;
}
function nodeIsFragment$1(node) {
  return node.nodeType === FRAGMENT_NODE$1;
}
const serialize$3 = (node, config2, indentation, depth, refs, printer2) => {
  if (nodeIsText$1(node)) {
    return (0, _markup$2.printText)(node.data, config2);
  }
  if (nodeIsComment$1(node)) {
    return (0, _markup$2.printComment)(node.data, config2);
  }
  const type3 = nodeIsFragment$1(node) ? "DocumentFragment" : node.tagName.toLowerCase();
  if (++depth > config2.maxDepth) {
    return (0, _markup$2.printElementAsLeaf)(type3, config2);
  }
  return (0, _markup$2.printElement)(type3, (0, _markup$2.printProps)(nodeIsFragment$1(node) ? [] : Array.from(node.attributes).map((attr2) => attr2.name).sort(), nodeIsFragment$1(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
    props[attribute.name] = attribute.value;
    return props;
  }, {}), config2, indentation + config2.indent, depth, refs, printer2), (0, _markup$2.printChildren)(Array.prototype.slice.call(node.childNodes || node.children), config2, indentation + config2.indent, depth, refs, printer2), config2, indentation);
};
DOMElement.serialize = serialize$3;
const plugin$3 = {
  serialize: serialize$3,
  test: test$3
};
var _default$2h = plugin$3;
DOMElement.default = _default$2h;
var Immutable = {};
Object.defineProperty(Immutable, "__esModule", {
  value: true
});
Immutable.test = Immutable.serialize = Immutable.default = void 0;
var _collections$1 = collections;
const IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
const IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
const IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
const IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
const IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
const IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
const IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
const IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
const IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
const getImmutableName = (name) => "Immutable." + name;
const printAsLeaf = (name) => "[" + name + "]";
const SPACE = " ";
const LAZY = "\u2026";
const printImmutableEntries = (val, config2, indentation, depth, refs, printer2, type3) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type3)) : getImmutableName(type3) + SPACE + "{" + (0, _collections$1.printIteratorEntries)(val.entries(), config2, indentation, depth, refs, printer2) + "}";
function getRecordEntries(val) {
  let i = 0;
  return {
    next() {
      if (i < val._keys.length) {
        const key = val._keys[i++];
        return {
          done: false,
          value: [key, val.get(key)]
        };
      }
      return {
        done: true,
        value: void 0
      };
    }
  };
}
const printImmutableRecord = (val, config2, indentation, depth, refs, printer2) => {
  const name = getImmutableName(val._name || "Record");
  return ++depth > config2.maxDepth ? printAsLeaf(name) : name + SPACE + "{" + (0, _collections$1.printIteratorEntries)(getRecordEntries(val), config2, indentation, depth, refs, printer2) + "}";
};
const printImmutableSeq = (val, config2, indentation, depth, refs, printer2) => {
  const name = getImmutableName("Seq");
  if (++depth > config2.maxDepth) {
    return printAsLeaf(name);
  }
  if (val[IS_KEYED_SENTINEL]) {
    return name + SPACE + "{" + (val._iter || val._object ? (0, _collections$1.printIteratorEntries)(val.entries(), config2, indentation, depth, refs, printer2) : LAZY) + "}";
  }
  return name + SPACE + "[" + (val._iter || val._array || val._collection || val._iterable ? (0, _collections$1.printIteratorValues)(val.values(), config2, indentation, depth, refs, printer2) : LAZY) + "]";
};
const printImmutableValues = (val, config2, indentation, depth, refs, printer2, type3) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type3)) : getImmutableName(type3) + SPACE + "[" + (0, _collections$1.printIteratorValues)(val.values(), config2, indentation, depth, refs, printer2) + "]";
const serialize$2 = (val, config2, indentation, depth, refs, printer2) => {
  if (val[IS_MAP_SENTINEL]) {
    return printImmutableEntries(val, config2, indentation, depth, refs, printer2, val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map");
  }
  if (val[IS_LIST_SENTINEL]) {
    return printImmutableValues(val, config2, indentation, depth, refs, printer2, "List");
  }
  if (val[IS_SET_SENTINEL]) {
    return printImmutableValues(val, config2, indentation, depth, refs, printer2, val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set");
  }
  if (val[IS_STACK_SENTINEL]) {
    return printImmutableValues(val, config2, indentation, depth, refs, printer2, "Stack");
  }
  if (val[IS_SEQ_SENTINEL]) {
    return printImmutableSeq(val, config2, indentation, depth, refs, printer2);
  }
  return printImmutableRecord(val, config2, indentation, depth, refs, printer2);
};
Immutable.serialize = serialize$2;
const test$2 = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
Immutable.test = test$2;
const plugin$2 = {
  serialize: serialize$2,
  test: test$2
};
var _default$2g = plugin$2;
Immutable.default = _default$2g;
var ReactElement = {};
var reactIs = { exports: {} };
var reactIs_production_min = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = 60103, c = 60106, d = 60107, e = 60108, f = 60114, g = 60109, h = 60110, k$1 = 60112, l = 60113, m = 60120, n = 60115, p = 60116, q = 60121, r = 60122, u = 60117, v = 60129, w = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k$1 = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}
function y(a) {
  if (typeof a === "object" && a !== null) {
    var t = a.$$typeof;
    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k$1:
              case p:
              case n:
              case g:
                return a;
              default:
                return t;
            }
        }
      case c:
        return t;
    }
  }
}
var z = g, A = b, B = k$1, C = d, D = p, E = n, F = c, G = f, H = e, I = l;
reactIs_production_min.ContextConsumer = h;
reactIs_production_min.ContextProvider = z;
reactIs_production_min.Element = A;
reactIs_production_min.ForwardRef = B;
reactIs_production_min.Fragment = C;
reactIs_production_min.Lazy = D;
reactIs_production_min.Memo = E;
reactIs_production_min.Portal = F;
reactIs_production_min.Profiler = G;
reactIs_production_min.StrictMode = H;
reactIs_production_min.Suspense = I;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a) {
  return y(a) === h;
};
reactIs_production_min.isContextProvider = function(a) {
  return y(a) === g;
};
reactIs_production_min.isElement = function(a) {
  return typeof a === "object" && a !== null && a.$$typeof === b;
};
reactIs_production_min.isForwardRef = function(a) {
  return y(a) === k$1;
};
reactIs_production_min.isFragment = function(a) {
  return y(a) === d;
};
reactIs_production_min.isLazy = function(a) {
  return y(a) === p;
};
reactIs_production_min.isMemo = function(a) {
  return y(a) === n;
};
reactIs_production_min.isPortal = function(a) {
  return y(a) === c;
};
reactIs_production_min.isProfiler = function(a) {
  return y(a) === f;
};
reactIs_production_min.isStrictMode = function(a) {
  return y(a) === e;
};
reactIs_production_min.isSuspense = function(a) {
  return y(a) === l;
};
reactIs_production_min.isValidElementType = function(a) {
  return typeof a === "string" || typeof a === "function" || a === d || a === f || a === v || a === e || a === l || a === m || a === w || typeof a === "object" && a !== null && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k$1 || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? true : false;
};
reactIs_production_min.typeOf = y;
{
  reactIs.exports = reactIs_production_min;
}
Object.defineProperty(ReactElement, "__esModule", {
  value: true
});
ReactElement.test = ReactElement.serialize = ReactElement.default = void 0;
var ReactIs = _interopRequireWildcard(reactIs.exports);
var _markup$1 = markup;
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function")
    return null;
  var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
  var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache = function(nodeInterop2) {
    return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
const getChildren = (arg, children2 = []) => {
  if (Array.isArray(arg)) {
    arg.forEach((item) => {
      getChildren(item, children2);
    });
  } else if (arg != null && arg !== false) {
    children2.push(arg);
  }
  return children2;
};
const getType = (element2) => {
  const type3 = element2.type;
  if (typeof type3 === "string") {
    return type3;
  }
  if (typeof type3 === "function") {
    return type3.displayName || type3.name || "Unknown";
  }
  if (ReactIs.isFragment(element2)) {
    return "React.Fragment";
  }
  if (ReactIs.isSuspense(element2)) {
    return "React.Suspense";
  }
  if (typeof type3 === "object" && type3 !== null) {
    if (ReactIs.isContextProvider(element2)) {
      return "Context.Provider";
    }
    if (ReactIs.isContextConsumer(element2)) {
      return "Context.Consumer";
    }
    if (ReactIs.isForwardRef(element2)) {
      if (type3.displayName) {
        return type3.displayName;
      }
      const functionName = type3.render.displayName || type3.render.name || "";
      return functionName !== "" ? "ForwardRef(" + functionName + ")" : "ForwardRef";
    }
    if (ReactIs.isMemo(element2)) {
      const functionName = type3.displayName || type3.type.displayName || type3.type.name || "";
      return functionName !== "" ? "Memo(" + functionName + ")" : "Memo";
    }
  }
  return "UNDEFINED";
};
const getPropKeys$1 = (element2) => {
  const { props } = element2;
  return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
};
const serialize$1 = (element2, config2, indentation, depth, refs, printer2) => ++depth > config2.maxDepth ? (0, _markup$1.printElementAsLeaf)(getType(element2), config2) : (0, _markup$1.printElement)(getType(element2), (0, _markup$1.printProps)(getPropKeys$1(element2), element2.props, config2, indentation + config2.indent, depth, refs, printer2), (0, _markup$1.printChildren)(getChildren(element2.props.children), config2, indentation + config2.indent, depth, refs, printer2), config2, indentation);
ReactElement.serialize = serialize$1;
const test$1 = (val) => val != null && ReactIs.isElement(val);
ReactElement.test = test$1;
const plugin$1 = {
  serialize: serialize$1,
  test: test$1
};
var _default$2f = plugin$1;
ReactElement.default = _default$2f;
var ReactTestComponent = {};
Object.defineProperty(ReactTestComponent, "__esModule", {
  value: true
});
ReactTestComponent.test = ReactTestComponent.serialize = ReactTestComponent.default = void 0;
var _markup = markup;
var global$1 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  } else if (typeof global$1 !== "undefined") {
    return global$1;
  } else if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
}();
var Symbol$1 = global$1["jest-symbol-do-not-touch"] || global$1.Symbol;
const testSymbol = typeof Symbol$1 === "function" && Symbol$1.for ? Symbol$1.for("react.test.json") : 245830487;
const getPropKeys = (object) => {
  const { props } = object;
  return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
};
const serialize = (object, config2, indentation, depth, refs, printer2) => ++depth > config2.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config2) : (0, _markup.printElement)(object.type, object.props ? (0, _markup.printProps)(getPropKeys(object), object.props, config2, indentation + config2.indent, depth, refs, printer2) : "", object.children ? (0, _markup.printChildren)(object.children, config2, indentation + config2.indent, depth, refs, printer2) : "", config2, indentation);
ReactTestComponent.serialize = serialize;
const test = (val) => val && val.$$typeof === testSymbol;
ReactTestComponent.test = test;
const plugin = {
  serialize,
  test
};
var _default$2e = plugin;
ReactTestComponent.default = _default$2e;
Object.defineProperty(build$1, "__esModule", {
  value: true
});
var default_1 = build$1.default = DEFAULT_OPTIONS_1 = build$1.DEFAULT_OPTIONS = void 0;
var format_1 = build$1.format = format;
var plugins_1 = build$1.plugins = void 0;
var _ansiStyles = _interopRequireDefault$7(ansiStyles.exports);
var _collections = collections;
var _AsymmetricMatcher = _interopRequireDefault$7(AsymmetricMatcher);
var _ConvertAnsi = _interopRequireDefault$7(ConvertAnsi);
var _DOMCollection = _interopRequireDefault$7(DOMCollection$1);
var _DOMElement = _interopRequireDefault$7(DOMElement);
var _Immutable = _interopRequireDefault$7(Immutable);
var _ReactElement = _interopRequireDefault$7(ReactElement);
var _ReactTestComponent = _interopRequireDefault$7(ReactTestComponent);
function _interopRequireDefault$7(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const toString = Object.prototype.toString;
const toISOString = Date.prototype.toISOString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
const isWindow = (val) => typeof window !== "undefined" && val === window;
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
const NEWLINE_REGEXP = /\n/gi;
class PrettyFormatPluginError extends Error {
  constructor(message, stack) {
    super(message);
    this.stack = stack;
    this.name = this.constructor.name;
  }
}
function isToStringedArrayType(toStringed) {
  return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
}
function printNumber(val) {
  return Object.is(val, -0) ? "-0" : String(val);
}
function printBigInt(val) {
  return String(`${val}n`);
}
function printFunction(val, printFunctionName) {
  if (!printFunctionName) {
    return "[Function]";
  }
  return "[Function " + (val.name || "anonymous") + "]";
}
function printSymbol(val) {
  return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
}
function printError(val) {
  return "[" + errorToString.call(val) + "]";
}
function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
  if (val === true || val === false) {
    return "" + val;
  }
  if (val === void 0) {
    return "undefined";
  }
  if (val === null) {
    return "null";
  }
  const typeOf = typeof val;
  if (typeOf === "number") {
    return printNumber(val);
  }
  if (typeOf === "bigint") {
    return printBigInt(val);
  }
  if (typeOf === "string") {
    if (escapeString) {
      return '"' + val.replace(/"|\\/g, "\\$&") + '"';
    }
    return '"' + val + '"';
  }
  if (typeOf === "function") {
    return printFunction(val, printFunctionName);
  }
  if (typeOf === "symbol") {
    return printSymbol(val);
  }
  const toStringed = toString.call(val);
  if (toStringed === "[object WeakMap]") {
    return "WeakMap {}";
  }
  if (toStringed === "[object WeakSet]") {
    return "WeakSet {}";
  }
  if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
    return printFunction(val, printFunctionName);
  }
  if (toStringed === "[object Symbol]") {
    return printSymbol(val);
  }
  if (toStringed === "[object Date]") {
    return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
  }
  if (toStringed === "[object Error]") {
    return printError(val);
  }
  if (toStringed === "[object RegExp]") {
    if (escapeRegex) {
      return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    return regExpToString.call(val);
  }
  if (val instanceof Error) {
    return printError(val);
  }
  return null;
}
function printComplexValue(val, config2, indentation, depth, refs, hasCalledToJSON) {
  if (refs.indexOf(val) !== -1) {
    return "[Circular]";
  }
  refs = refs.slice();
  refs.push(val);
  const hitMaxDepth = ++depth > config2.maxDepth;
  const min = config2.min;
  if (config2.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
    return printer(val.toJSON(), config2, indentation, depth, refs, true);
  }
  const toStringed = toString.call(val);
  if (toStringed === "[object Arguments]") {
    return hitMaxDepth ? "[Arguments]" : (min ? "" : "Arguments ") + "[" + (0, _collections.printListItems)(val, config2, indentation, depth, refs, printer) + "]";
  }
  if (isToStringedArrayType(toStringed)) {
    return hitMaxDepth ? "[" + val.constructor.name + "]" : (min ? "" : !config2.printBasicPrototype && val.constructor.name === "Array" ? "" : val.constructor.name + " ") + "[" + (0, _collections.printListItems)(val, config2, indentation, depth, refs, printer) + "]";
  }
  if (toStringed === "[object Map]") {
    return hitMaxDepth ? "[Map]" : "Map {" + (0, _collections.printIteratorEntries)(val.entries(), config2, indentation, depth, refs, printer, " => ") + "}";
  }
  if (toStringed === "[object Set]") {
    return hitMaxDepth ? "[Set]" : "Set {" + (0, _collections.printIteratorValues)(val.values(), config2, indentation, depth, refs, printer) + "}";
  }
  return hitMaxDepth || isWindow(val) ? "[" + getConstructorName(val) + "]" : (min ? "" : !config2.printBasicPrototype && getConstructorName(val) === "Object" ? "" : getConstructorName(val) + " ") + "{" + (0, _collections.printObjectProperties)(val, config2, indentation, depth, refs, printer) + "}";
}
function isNewPlugin(plugin2) {
  return plugin2.serialize != null;
}
function printPlugin(plugin2, val, config2, indentation, depth, refs) {
  let printed;
  try {
    printed = isNewPlugin(plugin2) ? plugin2.serialize(val, config2, indentation, depth, refs, printer) : plugin2.print(val, (valChild) => printer(valChild, config2, indentation, depth, refs), (str) => {
      const indentationNext = indentation + config2.indent;
      return indentationNext + str.replace(NEWLINE_REGEXP, "\n" + indentationNext);
    }, {
      edgeSpacing: config2.spacingOuter,
      min: config2.min,
      spacing: config2.spacingInner
    }, config2.colors);
  } catch (error2) {
    throw new PrettyFormatPluginError(error2.message, error2.stack);
  }
  if (typeof printed !== "string") {
    throw new Error(`pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`);
  }
  return printed;
}
function findPlugin(plugins2, val) {
  for (let p2 = 0; p2 < plugins2.length; p2++) {
    try {
      if (plugins2[p2].test(val)) {
        return plugins2[p2];
      }
    } catch (error2) {
      throw new PrettyFormatPluginError(error2.message, error2.stack);
    }
  }
  return null;
}
function printer(val, config2, indentation, depth, refs, hasCalledToJSON) {
  const plugin2 = findPlugin(config2.plugins, val);
  if (plugin2 !== null) {
    return printPlugin(plugin2, val, config2, indentation, depth, refs);
  }
  const basicResult = printBasicValue(val, config2.printFunctionName, config2.escapeRegex, config2.escapeString);
  if (basicResult !== null) {
    return basicResult;
  }
  return printComplexValue(val, config2, indentation, depth, refs, hasCalledToJSON);
}
const DEFAULT_THEME = {
  comment: "gray",
  content: "reset",
  prop: "yellow",
  tag: "cyan",
  value: "green"
};
const DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
const DEFAULT_OPTIONS = {
  callToJSON: true,
  compareKeys: void 0,
  escapeRegex: false,
  escapeString: true,
  highlight: false,
  indent: 2,
  maxDepth: Infinity,
  min: false,
  plugins: [],
  printBasicPrototype: true,
  printFunctionName: true,
  theme: DEFAULT_THEME
};
var DEFAULT_OPTIONS_1 = build$1.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
function validateOptions(options) {
  Object.keys(options).forEach((key) => {
    if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
      throw new Error(`pretty-format: Unknown option "${key}".`);
    }
  });
  if (options.min && options.indent !== void 0 && options.indent !== 0) {
    throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
  }
  if (options.theme !== void 0) {
    if (options.theme === null) {
      throw new Error('pretty-format: Option "theme" must not be null.');
    }
    if (typeof options.theme !== "object") {
      throw new Error(`pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`);
    }
  }
}
const getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
  const value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME[key];
  const color = value && _ansiStyles.default[value];
  if (color && typeof color.close === "string" && typeof color.open === "string") {
    colors[key] = color;
  } else {
    throw new Error(`pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`);
  }
  return colors;
}, /* @__PURE__ */ Object.create(null));
const getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key) => {
  colors[key] = {
    close: "",
    open: ""
  };
  return colors;
}, /* @__PURE__ */ Object.create(null));
const getPrintFunctionName = (options) => options && options.printFunctionName !== void 0 ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;
const getEscapeRegex = (options) => options && options.escapeRegex !== void 0 ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;
const getEscapeString = (options) => options && options.escapeString !== void 0 ? options.escapeString : DEFAULT_OPTIONS.escapeString;
const getConfig$1 = (options) => {
  var _options$printBasicPr;
  return {
    callToJSON: options && options.callToJSON !== void 0 ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
    colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
    compareKeys: options && typeof options.compareKeys === "function" ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
    escapeRegex: getEscapeRegex(options),
    escapeString: getEscapeString(options),
    indent: options && options.min ? "" : createIndent(options && options.indent !== void 0 ? options.indent : DEFAULT_OPTIONS.indent),
    maxDepth: options && options.maxDepth !== void 0 ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
    min: options && options.min !== void 0 ? options.min : DEFAULT_OPTIONS.min,
    plugins: options && options.plugins !== void 0 ? options.plugins : DEFAULT_OPTIONS.plugins,
    printBasicPrototype: (_options$printBasicPr = options === null || options === void 0 ? void 0 : options.printBasicPrototype) !== null && _options$printBasicPr !== void 0 ? _options$printBasicPr : true,
    printFunctionName: getPrintFunctionName(options),
    spacingInner: options && options.min ? " " : "\n",
    spacingOuter: options && options.min ? "" : "\n"
  };
};
function createIndent(indent) {
  return new Array(indent + 1).join(" ");
}
function format(val, options) {
  if (options) {
    validateOptions(options);
    if (options.plugins) {
      const plugin2 = findPlugin(options.plugins, val);
      if (plugin2 !== null) {
        return printPlugin(plugin2, val, getConfig$1(options), "", 0, []);
      }
    }
  }
  const basicResult = printBasicValue(val, getPrintFunctionName(options), getEscapeRegex(options), getEscapeString(options));
  if (basicResult !== null) {
    return basicResult;
  }
  return printComplexValue(val, getConfig$1(options), "", 0, []);
}
const plugins = {
  AsymmetricMatcher: _AsymmetricMatcher.default,
  ConvertAnsi: _ConvertAnsi.default,
  DOMCollection: _DOMCollection.default,
  DOMElement: _DOMElement.default,
  Immutable: _Immutable.default,
  ReactElement: _ReactElement.default,
  ReactTestComponent: _ReactTestComponent.default
};
plugins_1 = build$1.plugins = plugins;
var _default$2d = format;
default_1 = build$1.default = _default$2d;
var index = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  get DEFAULT_OPTIONS() {
    return DEFAULT_OPTIONS_1;
  },
  format: format_1,
  get plugins() {
    return plugins_1;
  },
  get default() {
    return default_1;
  }
}, [build$1]);
var toStr = Object.prototype.toString;
function isCallable(fn) {
  return typeof fn === "function" || toStr.call(fn) === "[object Function]";
}
function toInteger(value) {
  var number = Number(value);
  if (isNaN(number)) {
    return 0;
  }
  if (number === 0 || !isFinite(number)) {
    return number;
  }
  return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(value) {
  var len = toInteger(value);
  return Math.min(Math.max(len, 0), maxSafeInteger);
}
function arrayFrom(arrayLike, mapFn) {
  var C2 = Array;
  var items = Object(arrayLike);
  if (arrayLike == null) {
    throw new TypeError("Array.from requires an array-like object - not null or undefined");
  }
  if (typeof mapFn !== "undefined") {
    if (!isCallable(mapFn)) {
      throw new TypeError("Array.from: when provided, the second argument must be a function");
    }
  }
  var len = toLength(items.length);
  var A2 = isCallable(C2) ? Object(new C2(len)) : new Array(len);
  var k = 0;
  var kValue;
  while (k < len) {
    kValue = items[k];
    if (mapFn) {
      A2[k] = mapFn(kValue, k);
    } else {
      A2[k] = kValue;
    }
    k += 1;
  }
  A2.length = len;
  return A2;
}
function _classCallCheck(instance2, Constructor) {
  if (!(instance2 instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var SetLike = /* @__PURE__ */ function() {
  function SetLike2() {
    var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck(this, SetLike2);
    _defineProperty$2(this, "items", void 0);
    this.items = items;
  }
  _createClass(SetLike2, [{
    key: "add",
    value: function add(value) {
      if (this.has(value) === false) {
        this.items.push(value);
      }
      return this;
    }
  }, {
    key: "clear",
    value: function clear3() {
      this.items = [];
    }
  }, {
    key: "delete",
    value: function _delete(value) {
      var previousLength = this.items.length;
      this.items = this.items.filter(function(item) {
        return item !== value;
      });
      return previousLength !== this.items.length;
    }
  }, {
    key: "forEach",
    value: function forEach(callbackfn) {
      var _this = this;
      this.items.forEach(function(item) {
        callbackfn(item, item, _this);
      });
    }
  }, {
    key: "has",
    value: function has6(value) {
      return this.items.indexOf(value) !== -1;
    }
  }, {
    key: "size",
    get: function get6() {
      return this.items.length;
    }
  }]);
  return SetLike2;
}();
var SetLike$1 = typeof Set === "undefined" ? Set : SetLike;
function getLocalName(element2) {
  var _element$localName;
  return (_element$localName = element2.localName) !== null && _element$localName !== void 0 ? _element$localName : element2.tagName.toLowerCase();
}
var localNameToRoleMappings = {
  article: "article",
  aside: "complementary",
  button: "button",
  datalist: "listbox",
  dd: "definition",
  details: "group",
  dialog: "dialog",
  dt: "term",
  fieldset: "group",
  figure: "figure",
  form: "form",
  footer: "contentinfo",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  header: "banner",
  hr: "separator",
  html: "document",
  legend: "legend",
  li: "listitem",
  math: "math",
  main: "main",
  menu: "list",
  nav: "navigation",
  ol: "list",
  optgroup: "group",
  option: "option",
  output: "status",
  progress: "progressbar",
  section: "region",
  summary: "button",
  table: "table",
  tbody: "rowgroup",
  textarea: "textbox",
  tfoot: "rowgroup",
  td: "cell",
  th: "columnheader",
  thead: "rowgroup",
  tr: "row",
  ul: "list"
};
var prohibitedAttributes = {
  caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
  insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"])
};
function hasGlobalAriaAttributes(element2, role) {
  return [
    "aria-atomic",
    "aria-busy",
    "aria-controls",
    "aria-current",
    "aria-describedby",
    "aria-details",
    "aria-dropeffect",
    "aria-flowto",
    "aria-grabbed",
    "aria-hidden",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-live",
    "aria-owns",
    "aria-relevant",
    "aria-roledescription"
  ].some(function(attributeName) {
    var _prohibitedAttributes;
    return element2.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
  });
}
function ignorePresentationalRole(element2, implicitRole) {
  return hasGlobalAriaAttributes(element2, implicitRole);
}
function getRole(element2) {
  var explicitRole = getExplicitRole(element2);
  if (explicitRole === null || explicitRole === "presentation") {
    var implicitRole = getImplicitRole(element2);
    if (explicitRole !== "presentation" || ignorePresentationalRole(element2, implicitRole || "")) {
      return implicitRole;
    }
  }
  return explicitRole;
}
function getImplicitRole(element2) {
  var mappedByTag = localNameToRoleMappings[getLocalName(element2)];
  if (mappedByTag !== void 0) {
    return mappedByTag;
  }
  switch (getLocalName(element2)) {
    case "a":
    case "area":
    case "link":
      if (element2.hasAttribute("href")) {
        return "link";
      }
      break;
    case "img":
      if (element2.getAttribute("alt") === "" && !ignorePresentationalRole(element2, "img")) {
        return "presentation";
      }
      return "img";
    case "input": {
      var _ref = element2, type3 = _ref.type;
      switch (type3) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return type3;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          if (element2.hasAttribute("list")) {
            return "combobox";
          }
          return "textbox";
        case "search":
          if (element2.hasAttribute("list")) {
            return "combobox";
          }
          return "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      if (element2.hasAttribute("multiple") || element2.size > 1) {
        return "listbox";
      }
      return "combobox";
  }
  return null;
}
function getExplicitRole(element2) {
  var role = element2.getAttribute("role");
  if (role !== null) {
    var explicitRole = role.trim().split(" ")[0];
    if (explicitRole.length > 0) {
      return explicitRole;
    }
  }
  return null;
}
function isElement$1(node) {
  return node !== null && node.nodeType === node.ELEMENT_NODE;
}
function isHTMLTableCaptionElement(node) {
  return isElement$1(node) && getLocalName(node) === "caption";
}
function isHTMLInputElement(node) {
  return isElement$1(node) && getLocalName(node) === "input";
}
function isHTMLOptGroupElement(node) {
  return isElement$1(node) && getLocalName(node) === "optgroup";
}
function isHTMLSelectElement(node) {
  return isElement$1(node) && getLocalName(node) === "select";
}
function isHTMLTableElement(node) {
  return isElement$1(node) && getLocalName(node) === "table";
}
function isHTMLTextAreaElement(node) {
  return isElement$1(node) && getLocalName(node) === "textarea";
}
function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
  if (defaultView === null) {
    throw new TypeError("no window available");
  }
  return defaultView;
}
function isHTMLFieldSetElement(node) {
  return isElement$1(node) && getLocalName(node) === "fieldset";
}
function isHTMLLegendElement(node) {
  return isElement$1(node) && getLocalName(node) === "legend";
}
function isHTMLSlotElement(node) {
  return isElement$1(node) && getLocalName(node) === "slot";
}
function isSVGElement(node) {
  return isElement$1(node) && node.ownerSVGElement !== void 0;
}
function isSVGSVGElement(node) {
  return isElement$1(node) && getLocalName(node) === "svg";
}
function isSVGTitleElement(node) {
  return isSVGElement(node) && getLocalName(node) === "title";
}
function queryIdRefs(node, attributeName) {
  if (isElement$1(node) && node.hasAttribute(attributeName)) {
    var ids = node.getAttribute(attributeName).split(" ");
    var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    return ids.map(function(id) {
      return root.getElementById(id);
    }).filter(function(element2) {
      return element2 !== null;
    });
  }
  return [];
}
function hasAnyConcreteRoles(node, roles2) {
  if (isElement$1(node)) {
    return roles2.indexOf(getRole(node)) !== -1;
  }
  return false;
}
function asFlatString(s) {
  return s.trim().replace(/\s\s+/g, " ");
}
function isHidden(node, getComputedStyleImplementation) {
  if (!isElement$1(node)) {
    return false;
  }
  if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
    return true;
  }
  var style = getComputedStyleImplementation(node);
  return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
}
function isControl(node) {
  return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
}
function hasAbstractRole(node, role) {
  if (!isElement$1(node)) {
    return false;
  }
  switch (role) {
    case "range":
      return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
    default:
      throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
  }
}
function querySelectorAllSubtree(element2, selectors) {
  var elements = arrayFrom(element2.querySelectorAll(selectors));
  queryIdRefs(element2, "aria-owns").forEach(function(root) {
    elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
  });
  return elements;
}
function querySelectedOptions(listbox) {
  if (isHTMLSelectElement(listbox)) {
    return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
  }
  return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
}
function isMarkedPresentational(node) {
  return hasAnyConcreteRoles(node, ["none", "presentation"]);
}
function isNativeHostLanguageTextAlternativeElement(node) {
  return isHTMLTableCaptionElement(node);
}
function allowsNameFromContent(node) {
  return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
  return false;
}
function getValueOfTextbox(element2) {
  if (isHTMLInputElement(element2) || isHTMLTextAreaElement(element2)) {
    return element2.value;
  }
  return element2.textContent || "";
}
function getTextualContent(declaration) {
  var content = declaration.getPropertyValue("content");
  if (/^["'].*["']$/.test(content)) {
    return content.slice(1, -1);
  }
  return "";
}
function isLabelableElement(element2) {
  var localName = getLocalName(element2);
  return localName === "button" || localName === "input" && element2.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
}
function findLabelableElement(element2) {
  if (isLabelableElement(element2)) {
    return element2;
  }
  var labelableElement = null;
  element2.childNodes.forEach(function(childNode) {
    if (labelableElement === null && isElement$1(childNode)) {
      var descendantLabelableElement = findLabelableElement(childNode);
      if (descendantLabelableElement !== null) {
        labelableElement = descendantLabelableElement;
      }
    }
  });
  return labelableElement;
}
function getControlOfLabel(label) {
  if (label.control !== void 0) {
    return label.control;
  }
  var htmlFor = label.getAttribute("for");
  if (htmlFor !== null) {
    return label.ownerDocument.getElementById(htmlFor);
  }
  return findLabelableElement(label);
}
function getLabels$1(element2) {
  var labelsProperty = element2.labels;
  if (labelsProperty === null) {
    return labelsProperty;
  }
  if (labelsProperty !== void 0) {
    return arrayFrom(labelsProperty);
  }
  if (!isLabelableElement(element2)) {
    return null;
  }
  var document2 = element2.ownerDocument;
  return arrayFrom(document2.querySelectorAll("label")).filter(function(label) {
    return getControlOfLabel(label) === element2;
  });
}
function getSlotContents(slot) {
  var assignedNodes = slot.assignedNodes();
  if (assignedNodes.length === 0) {
    return arrayFrom(slot.childNodes);
  }
  return assignedNodes;
}
function computeTextAlternative(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var consultedNodes = new SetLike$1();
  var window2 = safeWindow(root);
  var _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle2 = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
  function computeMiscTextAlternative(node, context) {
    var accumulatedText = "";
    if (isElement$1(node) && computedStyleSupportsPseudoElements) {
      var pseudoBefore = getComputedStyle2(node, "::before");
      var beforeContent = getTextualContent(pseudoBefore);
      accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
    }
    var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
    childNodes.forEach(function(child) {
      var result = computeTextAlternative2(child, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false,
        recursion: true
      });
      var display = isElement$1(child) ? getComputedStyle2(child).getPropertyValue("display") : "inline";
      var separator = display !== "inline" ? " " : "";
      accumulatedText += "".concat(separator).concat(result).concat(separator);
    });
    if (isElement$1(node) && computedStyleSupportsPseudoElements) {
      var pseudoAfter = getComputedStyle2(node, "::after");
      var afterContent = getTextualContent(pseudoAfter);
      accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
    }
    return accumulatedText.trim();
  }
  function computeElementTextAlternative(node) {
    if (!isElement$1(node)) {
      return null;
    }
    function useAttribute(element2, attributeName) {
      var attribute = element2.getAttributeNode(attributeName);
      if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
        consultedNodes.add(attribute);
        return attribute.value;
      }
      return null;
    }
    if (isHTMLFieldSetElement(node)) {
      consultedNodes.add(node);
      var children2 = arrayFrom(node.childNodes);
      for (var i = 0; i < children2.length; i += 1) {
        var child = children2[i];
        if (isHTMLLegendElement(child)) {
          return computeTextAlternative2(child, {
            isEmbeddedInLabel: false,
            isReferenced: false,
            recursion: false
          });
        }
      }
    } else if (isHTMLTableElement(node)) {
      consultedNodes.add(node);
      var _children = arrayFrom(node.childNodes);
      for (var _i = 0; _i < _children.length; _i += 1) {
        var _child = _children[_i];
        if (isHTMLTableCaptionElement(_child)) {
          return computeTextAlternative2(_child, {
            isEmbeddedInLabel: false,
            isReferenced: false,
            recursion: false
          });
        }
      }
    } else if (isSVGSVGElement(node)) {
      consultedNodes.add(node);
      var _children2 = arrayFrom(node.childNodes);
      for (var _i2 = 0; _i2 < _children2.length; _i2 += 1) {
        var _child2 = _children2[_i2];
        if (isSVGTitleElement(_child2)) {
          return _child2.textContent;
        }
      }
      return null;
    } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
      var nameFromAlt = useAttribute(node, "alt");
      if (nameFromAlt !== null) {
        return nameFromAlt;
      }
    } else if (isHTMLOptGroupElement(node)) {
      var nameFromLabel = useAttribute(node, "label");
      if (nameFromLabel !== null) {
        return nameFromLabel;
      }
    }
    if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
      var nameFromValue = useAttribute(node, "value");
      if (nameFromValue !== null) {
        return nameFromValue;
      }
      if (node.type === "submit") {
        return "Submit";
      }
      if (node.type === "reset") {
        return "Reset";
      }
    }
    var labels = getLabels$1(node);
    if (labels !== null && labels.length !== 0) {
      consultedNodes.add(node);
      return arrayFrom(labels).map(function(element2) {
        return computeTextAlternative2(element2, {
          isEmbeddedInLabel: true,
          isReferenced: false,
          recursion: true
        });
      }).filter(function(label) {
        return label.length > 0;
      }).join(" ");
    }
    if (isHTMLInputElement(node) && node.type === "image") {
      var _nameFromAlt = useAttribute(node, "alt");
      if (_nameFromAlt !== null) {
        return _nameFromAlt;
      }
      var nameFromTitle = useAttribute(node, "title");
      if (nameFromTitle !== null) {
        return nameFromTitle;
      }
      return "Submit Query";
    }
    if (hasAnyConcreteRoles(node, ["button"])) {
      var nameFromSubTree = computeMiscTextAlternative(node, {
        isEmbeddedInLabel: false,
        isReferenced: false
      });
      if (nameFromSubTree !== "") {
        return nameFromSubTree;
      }
      return useAttribute(node, "title");
    }
    return useAttribute(node, "title");
  }
  function computeTextAlternative2(current, context) {
    if (consultedNodes.has(current)) {
      return "";
    }
    if (!hidden && isHidden(current, getComputedStyle2) && !context.isReferenced) {
      consultedNodes.add(current);
      return "";
    }
    var labelElements = queryIdRefs(current, "aria-labelledby");
    if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
      return labelElements.map(function(element2) {
        return computeTextAlternative2(element2, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: true,
          recursion: false
        });
      }).join(" ");
    }
    var skipToStep2E = context.recursion && isControl(current) && compute === "name";
    if (!skipToStep2E) {
      var ariaLabel = (isElement$1(current) && current.getAttribute("aria-label") || "").trim();
      if (ariaLabel !== "" && compute === "name") {
        consultedNodes.add(current);
        return ariaLabel;
      }
      if (!isMarkedPresentational(current)) {
        var elementTextAlternative = computeElementTextAlternative(current);
        if (elementTextAlternative !== null) {
          consultedNodes.add(current);
          return elementTextAlternative;
        }
      }
    }
    if (hasAnyConcreteRoles(current, ["menu"])) {
      consultedNodes.add(current);
      return "";
    }
    if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
      if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
        consultedNodes.add(current);
        var selectedOptions = querySelectedOptions(current);
        if (selectedOptions.length === 0) {
          return isHTMLInputElement(current) ? current.value : "";
        }
        return arrayFrom(selectedOptions).map(function(selectedOption) {
          return computeTextAlternative2(selectedOption, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: false,
            recursion: true
          });
        }).join(" ");
      }
      if (hasAbstractRole(current, "range")) {
        consultedNodes.add(current);
        if (current.hasAttribute("aria-valuetext")) {
          return current.getAttribute("aria-valuetext");
        }
        if (current.hasAttribute("aria-valuenow")) {
          return current.getAttribute("aria-valuenow");
        }
        return current.getAttribute("value") || "";
      }
      if (hasAnyConcreteRoles(current, ["textbox"])) {
        consultedNodes.add(current);
        return getValueOfTextbox(current);
      }
    }
    if (allowsNameFromContent(current) || isElement$1(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement()) {
      consultedNodes.add(current);
      return computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false
      });
    }
    if (current.nodeType === current.TEXT_NODE) {
      consultedNodes.add(current);
      return current.textContent || "";
    }
    if (context.recursion) {
      consultedNodes.add(current);
      return computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false
      });
    }
    consultedNodes.add(current);
    return "";
  }
  return asFlatString(computeTextAlternative2(root, {
    isEmbeddedInLabel: false,
    isReferenced: compute === "description",
    recursion: false
  }));
}
function ownKeys(object, enumerableOnly) {
  var keys7 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys7.push.apply(keys7, symbols);
  }
  return keys7;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function computeAccessibleDescription(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var description = queryIdRefs(root, "aria-describedby").map(function(element2) {
    return computeTextAlternative(element2, _objectSpread(_objectSpread({}, options), {}, {
      compute: "description"
    }));
  }).join(" ");
  if (description === "") {
    var title = root.getAttribute("title");
    description = title === null ? "" : title;
  }
  return description;
}
function prohibitsNaming(node) {
  return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function computeAccessibleName(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (prohibitsNaming(root)) {
    return "";
  }
  return computeTextAlternative(root, options);
}
var lib = {};
var ariaPropsMap$1 = {};
Object.defineProperty(ariaPropsMap$1, "__esModule", {
  value: true
});
ariaPropsMap$1.default = void 0;
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$5(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$5(o, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$4(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$4(arr) {
  if (Array.isArray(arr))
    return arr;
}
var properties = [["aria-activedescendant", {
  "type": "id"
}], ["aria-atomic", {
  "type": "boolean"
}], ["aria-autocomplete", {
  "type": "token",
  "values": ["inline", "list", "both", "none"]
}], ["aria-busy", {
  "type": "boolean"
}], ["aria-checked", {
  "type": "tristate"
}], ["aria-colcount", {
  type: "integer"
}], ["aria-colindex", {
  type: "integer"
}], ["aria-colspan", {
  type: "integer"
}], ["aria-controls", {
  "type": "idlist"
}], ["aria-current", {
  type: "token",
  values: ["page", "step", "location", "date", "time", true, false]
}], ["aria-describedby", {
  "type": "idlist"
}], ["aria-details", {
  "type": "id"
}], ["aria-disabled", {
  "type": "boolean"
}], ["aria-dropeffect", {
  "type": "tokenlist",
  "values": ["copy", "execute", "link", "move", "none", "popup"]
}], ["aria-errormessage", {
  "type": "id"
}], ["aria-expanded", {
  "type": "boolean",
  "allowundefined": true
}], ["aria-flowto", {
  "type": "idlist"
}], ["aria-grabbed", {
  "type": "boolean",
  "allowundefined": true
}], ["aria-haspopup", {
  "type": "token",
  "values": [false, true, "menu", "listbox", "tree", "grid", "dialog"]
}], ["aria-hidden", {
  "type": "boolean",
  "allowundefined": true
}], ["aria-invalid", {
  "type": "token",
  "values": ["grammar", false, "spelling", true]
}], ["aria-keyshortcuts", {
  type: "string"
}], ["aria-label", {
  "type": "string"
}], ["aria-labelledby", {
  "type": "idlist"
}], ["aria-level", {
  "type": "integer"
}], ["aria-live", {
  "type": "token",
  "values": ["assertive", "off", "polite"]
}], ["aria-modal", {
  type: "boolean"
}], ["aria-multiline", {
  "type": "boolean"
}], ["aria-multiselectable", {
  "type": "boolean"
}], ["aria-orientation", {
  "type": "token",
  "values": ["vertical", "undefined", "horizontal"]
}], ["aria-owns", {
  "type": "idlist"
}], ["aria-placeholder", {
  type: "string"
}], ["aria-posinset", {
  "type": "integer"
}], ["aria-pressed", {
  "type": "tristate"
}], ["aria-readonly", {
  "type": "boolean"
}], ["aria-relevant", {
  "type": "tokenlist",
  "values": ["additions", "all", "removals", "text"]
}], ["aria-required", {
  "type": "boolean"
}], ["aria-roledescription", {
  type: "string"
}], ["aria-rowcount", {
  type: "integer"
}], ["aria-rowindex", {
  type: "integer"
}], ["aria-rowspan", {
  type: "integer"
}], ["aria-selected", {
  "type": "boolean",
  "allowundefined": true
}], ["aria-setsize", {
  "type": "integer"
}], ["aria-sort", {
  "type": "token",
  "values": ["ascending", "descending", "none", "other"]
}], ["aria-valuemax", {
  "type": "number"
}], ["aria-valuemin", {
  "type": "number"
}], ["aria-valuenow", {
  "type": "number"
}], ["aria-valuetext", {
  "type": "string"
}]];
var ariaPropsMap = {
  entries: function entries() {
    return properties;
  },
  get: function get(key) {
    var item = properties.find(function(tuple) {
      return tuple[0] === key ? true : false;
    });
    return item && item[1];
  },
  has: function has(key) {
    return !!this.get(key);
  },
  keys: function keys() {
    return properties.map(function(_ref) {
      var _ref2 = _slicedToArray$4(_ref, 1), key = _ref2[0];
      return key;
    });
  },
  values: function values() {
    return properties.map(function(_ref3) {
      var _ref4 = _slicedToArray$4(_ref3, 2), values6 = _ref4[1];
      return values6;
    });
  }
};
var _default$2c = ariaPropsMap;
ariaPropsMap$1.default = _default$2c;
var domMap$1 = {};
Object.defineProperty(domMap$1, "__esModule", {
  value: true
});
domMap$1.default = void 0;
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$4(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$3(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr))
    return arr;
}
var dom$1 = [["a", {
  reserved: false
}], ["abbr", {
  reserved: false
}], ["acronym", {
  reserved: false
}], ["address", {
  reserved: false
}], ["applet", {
  reserved: false
}], ["area", {
  reserved: false
}], ["article", {
  reserved: false
}], ["aside", {
  reserved: false
}], ["audio", {
  reserved: false
}], ["b", {
  reserved: false
}], ["base", {
  reserved: true
}], ["bdi", {
  reserved: false
}], ["bdo", {
  reserved: false
}], ["big", {
  reserved: false
}], ["blink", {
  reserved: false
}], ["blockquote", {
  reserved: false
}], ["body", {
  reserved: false
}], ["br", {
  reserved: false
}], ["button", {
  reserved: false
}], ["canvas", {
  reserved: false
}], ["caption", {
  reserved: false
}], ["center", {
  reserved: false
}], ["cite", {
  reserved: false
}], ["code", {
  reserved: false
}], ["col", {
  reserved: true
}], ["colgroup", {
  reserved: true
}], ["content", {
  reserved: false
}], ["data", {
  reserved: false
}], ["datalist", {
  reserved: false
}], ["dd", {
  reserved: false
}], ["del", {
  reserved: false
}], ["details", {
  reserved: false
}], ["dfn", {
  reserved: false
}], ["dialog", {
  reserved: false
}], ["dir", {
  reserved: false
}], ["div", {
  reserved: false
}], ["dl", {
  reserved: false
}], ["dt", {
  reserved: false
}], ["em", {
  reserved: false
}], ["embed", {
  reserved: false
}], ["fieldset", {
  reserved: false
}], ["figcaption", {
  reserved: false
}], ["figure", {
  reserved: false
}], ["font", {
  reserved: false
}], ["footer", {
  reserved: false
}], ["form", {
  reserved: false
}], ["frame", {
  reserved: false
}], ["frameset", {
  reserved: false
}], ["h1", {
  reserved: false
}], ["h2", {
  reserved: false
}], ["h3", {
  reserved: false
}], ["h4", {
  reserved: false
}], ["h5", {
  reserved: false
}], ["h6", {
  reserved: false
}], ["head", {
  reserved: true
}], ["header", {
  reserved: false
}], ["hgroup", {
  reserved: false
}], ["hr", {
  reserved: false
}], ["html", {
  reserved: true
}], ["i", {
  reserved: false
}], ["iframe", {
  reserved: false
}], ["img", {
  reserved: false
}], ["input", {
  reserved: false
}], ["ins", {
  reserved: false
}], ["kbd", {
  reserved: false
}], ["keygen", {
  reserved: false
}], ["label", {
  reserved: false
}], ["legend", {
  reserved: false
}], ["li", {
  reserved: false
}], ["link", {
  reserved: true
}], ["main", {
  reserved: false
}], ["map", {
  reserved: false
}], ["mark", {
  reserved: false
}], ["marquee", {
  reserved: false
}], ["menu", {
  reserved: false
}], ["menuitem", {
  reserved: false
}], ["meta", {
  reserved: true
}], ["meter", {
  reserved: false
}], ["nav", {
  reserved: false
}], ["noembed", {
  reserved: true
}], ["noscript", {
  reserved: true
}], ["object", {
  reserved: false
}], ["ol", {
  reserved: false
}], ["optgroup", {
  reserved: false
}], ["option", {
  reserved: false
}], ["output", {
  reserved: false
}], ["p", {
  reserved: false
}], ["param", {
  reserved: true
}], ["picture", {
  reserved: true
}], ["pre", {
  reserved: false
}], ["progress", {
  reserved: false
}], ["q", {
  reserved: false
}], ["rp", {
  reserved: false
}], ["rt", {
  reserved: false
}], ["rtc", {
  reserved: false
}], ["ruby", {
  reserved: false
}], ["s", {
  reserved: false
}], ["samp", {
  reserved: false
}], ["script", {
  reserved: true
}], ["section", {
  reserved: false
}], ["select", {
  reserved: false
}], ["small", {
  reserved: false
}], ["source", {
  reserved: true
}], ["spacer", {
  reserved: false
}], ["span", {
  reserved: false
}], ["strike", {
  reserved: false
}], ["strong", {
  reserved: false
}], ["style", {
  reserved: true
}], ["sub", {
  reserved: false
}], ["summary", {
  reserved: false
}], ["sup", {
  reserved: false
}], ["table", {
  reserved: false
}], ["tbody", {
  reserved: false
}], ["td", {
  reserved: false
}], ["textarea", {
  reserved: false
}], ["tfoot", {
  reserved: false
}], ["th", {
  reserved: false
}], ["thead", {
  reserved: false
}], ["time", {
  reserved: false
}], ["title", {
  reserved: true
}], ["tr", {
  reserved: false
}], ["track", {
  reserved: true
}], ["tt", {
  reserved: false
}], ["u", {
  reserved: false
}], ["ul", {
  reserved: false
}], ["var", {
  reserved: false
}], ["video", {
  reserved: false
}], ["wbr", {
  reserved: false
}], ["xmp", {
  reserved: false
}]];
var domMap = {
  entries: function entries2() {
    return dom$1;
  },
  get: function get2(key) {
    var item = dom$1.find(function(tuple) {
      return tuple[0] === key ? true : false;
    });
    return item && item[1];
  },
  has: function has2(key) {
    return !!this.get(key);
  },
  keys: function keys2() {
    return dom$1.map(function(_ref) {
      var _ref2 = _slicedToArray$3(_ref, 1), key = _ref2[0];
      return key;
    });
  },
  values: function values2() {
    return dom$1.map(function(_ref3) {
      var _ref4 = _slicedToArray$3(_ref3, 2), values6 = _ref4[1];
      return values6;
    });
  }
};
var _default$2b = domMap;
domMap$1.default = _default$2b;
var rolesMap$1 = {};
var ariaAbstractRoles$1 = {};
var commandRole$1 = {};
Object.defineProperty(commandRole$1, "__esModule", {
  value: true
});
commandRole$1.default = void 0;
var commandRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "menuitem"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget"]]
};
var _default$2a = commandRole;
commandRole$1.default = _default$2a;
var compositeRole$1 = {};
Object.defineProperty(compositeRole$1, "__esModule", {
  value: true
});
compositeRole$1.default = void 0;
var compositeRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-disabled": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget"]]
};
var _default$29 = compositeRole;
compositeRole$1.default = _default$29;
var inputRole$1 = {};
Object.defineProperty(inputRole$1, "__esModule", {
  value: true
});
inputRole$1.default = void 0;
var inputRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null
  },
  relatedConcepts: [{
    concept: {
      name: "input"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget"]]
};
var _default$28 = inputRole;
inputRole$1.default = _default$28;
var landmarkRole$1 = {};
Object.defineProperty(landmarkRole$1, "__esModule", {
  value: true
});
landmarkRole$1.default = void 0;
var landmarkRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$27 = landmarkRole;
landmarkRole$1.default = _default$27;
var rangeRole$1 = {};
Object.defineProperty(rangeRole$1, "__esModule", {
  value: true
});
rangeRole$1.default = void 0;
var rangeRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-valuemax": null,
    "aria-valuemin": null,
    "aria-valuenow": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$26 = rangeRole;
rangeRole$1.default = _default$26;
var roletypeRole$1 = {};
Object.defineProperty(roletypeRole$1, "__esModule", {
  value: true
});
roletypeRole$1.default = void 0;
var roletypeRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {
    "aria-atomic": null,
    "aria-busy": null,
    "aria-controls": null,
    "aria-current": null,
    "aria-describedby": null,
    "aria-details": null,
    "aria-dropeffect": null,
    "aria-flowto": null,
    "aria-grabbed": null,
    "aria-hidden": null,
    "aria-keyshortcuts": null,
    "aria-label": null,
    "aria-labelledby": null,
    "aria-live": null,
    "aria-owns": null,
    "aria-relevant": null,
    "aria-roledescription": null
  },
  relatedConcepts: [{
    concept: {
      name: "rel"
    },
    module: "HTML"
  }, {
    concept: {
      name: "role"
    },
    module: "XHTML"
  }, {
    concept: {
      name: "type"
    },
    module: "Dublin Core"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: []
};
var _default$25 = roletypeRole;
roletypeRole$1.default = _default$25;
var sectionRole$1 = {};
Object.defineProperty(sectionRole$1, "__esModule", {
  value: true
});
sectionRole$1.default = void 0;
var sectionRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "frontmatter"
    },
    module: "DTB"
  }, {
    concept: {
      name: "level"
    },
    module: "DTB"
  }, {
    concept: {
      name: "level"
    },
    module: "SMIL"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$24 = sectionRole;
sectionRole$1.default = _default$24;
var sectionheadRole$1 = {};
Object.defineProperty(sectionheadRole$1, "__esModule", {
  value: true
});
sectionheadRole$1.default = void 0;
var sectionheadRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$23 = sectionheadRole;
sectionheadRole$1.default = _default$23;
var selectRole$1 = {};
Object.defineProperty(selectRole$1, "__esModule", {
  value: true
});
selectRole$1.default = void 0;
var selectRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-orientation": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]]
};
var _default$22 = selectRole;
selectRole$1.default = _default$22;
var structureRole$1 = {};
Object.defineProperty(structureRole$1, "__esModule", {
  value: true
});
structureRole$1.default = void 0;
var structureRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype"]]
};
var _default$21 = structureRole;
structureRole$1.default = _default$21;
var widgetRole$1 = {};
Object.defineProperty(widgetRole$1, "__esModule", {
  value: true
});
widgetRole$1.default = void 0;
var widgetRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype"]]
};
var _default$20 = widgetRole;
widgetRole$1.default = _default$20;
var windowRole$1 = {};
Object.defineProperty(windowRole$1, "__esModule", {
  value: true
});
windowRole$1.default = void 0;
var windowRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-modal": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype"]]
};
var _default$1$ = windowRole;
windowRole$1.default = _default$1$;
Object.defineProperty(ariaAbstractRoles$1, "__esModule", {
  value: true
});
ariaAbstractRoles$1.default = void 0;
var _commandRole = _interopRequireDefault$6(commandRole$1);
var _compositeRole = _interopRequireDefault$6(compositeRole$1);
var _inputRole = _interopRequireDefault$6(inputRole$1);
var _landmarkRole = _interopRequireDefault$6(landmarkRole$1);
var _rangeRole = _interopRequireDefault$6(rangeRole$1);
var _roletypeRole = _interopRequireDefault$6(roletypeRole$1);
var _sectionRole = _interopRequireDefault$6(sectionRole$1);
var _sectionheadRole = _interopRequireDefault$6(sectionheadRole$1);
var _selectRole = _interopRequireDefault$6(selectRole$1);
var _structureRole = _interopRequireDefault$6(structureRole$1);
var _widgetRole = _interopRequireDefault$6(widgetRole$1);
var _windowRole = _interopRequireDefault$6(windowRole$1);
function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var ariaAbstractRoles = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]];
var _default$1_ = ariaAbstractRoles;
ariaAbstractRoles$1.default = _default$1_;
var ariaLiteralRoles$1 = {};
var alertRole$1 = {};
Object.defineProperty(alertRole$1, "__esModule", {
  value: true
});
alertRole$1.default = void 0;
var alertRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-atomic": "true",
    "aria-live": "assertive"
  },
  relatedConcepts: [{
    concept: {
      name: "alert"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1Z = alertRole;
alertRole$1.default = _default$1Z;
var alertdialogRole$1 = {};
Object.defineProperty(alertdialogRole$1, "__esModule", {
  value: true
});
alertdialogRole$1.default = void 0;
var alertdialogRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "alert"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]]
};
var _default$1Y = alertdialogRole;
alertdialogRole$1.default = _default$1Y;
var applicationRole$1 = {};
Object.defineProperty(applicationRole$1, "__esModule", {
  value: true
});
applicationRole$1.default = void 0;
var applicationRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "Device Independence Delivery Unit"
    }
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$1X = applicationRole;
applicationRole$1.default = _default$1X;
var articleRole$1 = {};
Object.defineProperty(articleRole$1, "__esModule", {
  value: true
});
articleRole$1.default = void 0;
var articleRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-posinset": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      name: "article"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "document"]]
};
var _default$1W = articleRole;
articleRole$1.default = _default$1W;
var bannerRole$1 = {};
Object.defineProperty(bannerRole$1, "__esModule", {
  value: true
});
bannerRole$1.default = void 0;
var bannerRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      constraints: ["direct descendant of document"],
      name: "header"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1V = bannerRole;
bannerRole$1.default = _default$1V;
var blockquoteRole$1 = {};
Object.defineProperty(blockquoteRole$1, "__esModule", {
  value: true
});
blockquoteRole$1.default = void 0;
var blockquoteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1U = blockquoteRole;
blockquoteRole$1.default = _default$1U;
var buttonRole$1 = {};
Object.defineProperty(buttonRole$1, "__esModule", {
  value: true
});
buttonRole$1.default = void 0;
var buttonRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-pressed": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-pressed"
      }, {
        name: "type",
        value: "checkbox"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "aria-expanded",
        value: "false"
      }],
      name: "summary"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "aria-expanded",
        value: "true"
      }],
      constraints: ["direct descendant of details element with the open attribute defined"],
      name: "summary"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "type",
        value: "button"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "type",
        value: "image"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "type",
        value: "reset"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "type",
        value: "submit"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      name: "button"
    },
    module: "HTML"
  }, {
    concept: {
      name: "trigger"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command"]]
};
var _default$1T = buttonRole;
buttonRole$1.default = _default$1T;
var captionRole$1 = {};
Object.defineProperty(captionRole$1, "__esModule", {
  value: true
});
captionRole$1.default = void 0;
var captionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: ["figure", "grid", "table"],
  requiredContextRole: ["figure", "grid", "table"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1S = captionRole;
captionRole$1.default = _default$1S;
var cellRole$1 = {};
Object.defineProperty(cellRole$1, "__esModule", {
  value: true
});
cellRole$1.default = void 0;
var cellRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-colindex": null,
    "aria-colspan": null,
    "aria-rowindex": null,
    "aria-rowspan": null
  },
  relatedConcepts: [{
    concept: {
      constraints: ["descendant of table"],
      name: "td"
    },
    module: "HTML"
  }],
  requireContextRole: ["row"],
  requiredContextRole: ["row"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1R = cellRole;
cellRole$1.default = _default$1R;
var checkboxRole$1 = {};
Object.defineProperty(checkboxRole$1, "__esModule", {
  value: true
});
checkboxRole$1.default = void 0;
var checkboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-checked": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "type",
        value: "checkbox"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      name: "option"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input"]]
};
var _default$1Q = checkboxRole;
checkboxRole$1.default = _default$1Q;
var codeRole$1 = {};
Object.defineProperty(codeRole$1, "__esModule", {
  value: true
});
codeRole$1.default = void 0;
var codeRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1P = codeRole;
codeRole$1.default = _default$1P;
var columnheaderRole$1 = {};
Object.defineProperty(columnheaderRole$1, "__esModule", {
  value: true
});
columnheaderRole$1.default = void 0;
var columnheaderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-sort": null
  },
  relatedConcepts: [{
    attributes: [{
      name: "scope",
      value: "col"
    }],
    concept: {
      name: "th"
    },
    module: "HTML"
  }],
  requireContextRole: ["row"],
  requiredContextRole: ["row"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
};
var _default$1O = columnheaderRole;
columnheaderRole$1.default = _default$1O;
var comboboxRole$1 = {};
Object.defineProperty(comboboxRole$1, "__esModule", {
  value: true
});
comboboxRole$1.default = void 0;
var comboboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-autocomplete": null,
    "aria-errormessage": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null,
    "aria-expanded": "false",
    "aria-haspopup": "listbox"
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "email"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "search"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "tel"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "text"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "url"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "url"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "multiple"
      }, {
        constraints: ["undefined"],
        name: "size"
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "multiple"
      }, {
        name: "size",
        value: 1
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      name: "select"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-controls": null,
    "aria-expanded": "false"
  },
  superClass: [["roletype", "widget", "input"]]
};
var _default$1N = comboboxRole;
comboboxRole$1.default = _default$1N;
var complementaryRole$1 = {};
Object.defineProperty(complementaryRole$1, "__esModule", {
  value: true
});
complementaryRole$1.default = void 0;
var complementaryRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "aside"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1M = complementaryRole;
complementaryRole$1.default = _default$1M;
var contentinfoRole$1 = {};
Object.defineProperty(contentinfoRole$1, "__esModule", {
  value: true
});
contentinfoRole$1.default = void 0;
var contentinfoRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      constraints: ["direct descendant of document"],
      name: "footer"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1L = contentinfoRole;
contentinfoRole$1.default = _default$1L;
var definitionRole$1 = {};
Object.defineProperty(definitionRole$1, "__esModule", {
  value: true
});
definitionRole$1.default = void 0;
var definitionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "dd"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1K = definitionRole;
definitionRole$1.default = _default$1K;
var deletionRole$1 = {};
Object.defineProperty(deletionRole$1, "__esModule", {
  value: true
});
deletionRole$1.default = void 0;
var deletionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1J = deletionRole;
deletionRole$1.default = _default$1J;
var dialogRole$1 = {};
Object.defineProperty(dialogRole$1, "__esModule", {
  value: true
});
dialogRole$1.default = void 0;
var dialogRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "dialog"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "window"]]
};
var _default$1I = dialogRole;
dialogRole$1.default = _default$1I;
var directoryRole$1 = {};
Object.defineProperty(directoryRole$1, "__esModule", {
  value: true
});
directoryRole$1.default = void 0;
var directoryRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    module: "DAISY Guide"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "list"]]
};
var _default$1H = directoryRole;
directoryRole$1.default = _default$1H;
var documentRole$1 = {};
Object.defineProperty(documentRole$1, "__esModule", {
  value: true
});
documentRole$1.default = void 0;
var documentRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "Device Independence Delivery Unit"
    }
  }, {
    concept: {
      name: "body"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$1G = documentRole;
documentRole$1.default = _default$1G;
var emphasisRole$1 = {};
Object.defineProperty(emphasisRole$1, "__esModule", {
  value: true
});
emphasisRole$1.default = void 0;
var emphasisRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1F = emphasisRole;
emphasisRole$1.default = _default$1F;
var feedRole$1 = {};
Object.defineProperty(feedRole$1, "__esModule", {
  value: true
});
feedRole$1.default = void 0;
var feedRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["article"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "list"]]
};
var _default$1E = feedRole;
feedRole$1.default = _default$1E;
var figureRole$1 = {};
Object.defineProperty(figureRole$1, "__esModule", {
  value: true
});
figureRole$1.default = void 0;
var figureRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "figure"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1D = figureRole;
figureRole$1.default = _default$1D;
var formRole$1 = {};
Object.defineProperty(formRole$1, "__esModule", {
  value: true
});
formRole$1.default = void 0;
var formRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-label"
      }],
      name: "form"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-labelledby"
      }],
      name: "form"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "name"
      }],
      name: "form"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1C = formRole;
formRole$1.default = _default$1C;
var genericRole$1 = {};
Object.defineProperty(genericRole$1, "__esModule", {
  value: true
});
genericRole$1.default = void 0;
var genericRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "span"
    },
    module: "HTML"
  }, {
    concept: {
      name: "div"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$1B = genericRole;
genericRole$1.default = _default$1B;
var gridRole$1 = {};
Object.defineProperty(gridRole$1, "__esModule", {
  value: true
});
gridRole$1.default = void 0;
var gridRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-multiselectable": null,
    "aria-readonly": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "role",
        value: "grid"
      }],
      name: "table"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["row"], ["row", "rowgroup"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]]
};
var _default$1A = gridRole;
gridRole$1.default = _default$1A;
var gridcellRole$1 = {};
Object.defineProperty(gridcellRole$1, "__esModule", {
  value: true
});
gridcellRole$1.default = void 0;
var gridcellRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null,
    "aria-selected": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "role",
        value: "gridcell"
      }],
      name: "td"
    },
    module: "HTML"
  }],
  requireContextRole: ["row"],
  requiredContextRole: ["row"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]]
};
var _default$1z = gridcellRole;
gridcellRole$1.default = _default$1z;
var groupRole$1 = {};
Object.defineProperty(groupRole$1, "__esModule", {
  value: true
});
groupRole$1.default = void 0;
var groupRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-disabled": null
  },
  relatedConcepts: [{
    concept: {
      name: "details"
    },
    module: "HTML"
  }, {
    concept: {
      name: "fieldset"
    },
    module: "HTML"
  }, {
    concept: {
      name: "optgroup"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1y = groupRole;
groupRole$1.default = _default$1y;
var headingRole$1 = {};
Object.defineProperty(headingRole$1, "__esModule", {
  value: true
});
headingRole$1.default = void 0;
var headingRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-level": "2"
  },
  relatedConcepts: [{
    concept: {
      name: "h1"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h2"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h3"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h4"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h5"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h6"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-level": "2"
  },
  superClass: [["roletype", "structure", "sectionhead"]]
};
var _default$1x = headingRole;
headingRole$1.default = _default$1x;
var imgRole$1 = {};
Object.defineProperty(imgRole$1, "__esModule", {
  value: true
});
imgRole$1.default = void 0;
var imgRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "alt"
      }],
      name: "img"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "alt"
      }],
      name: "img"
    },
    module: "HTML"
  }, {
    concept: {
      name: "imggroup"
    },
    module: "DTB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1w = imgRole;
imgRole$1.default = _default$1w;
var insertionRole$1 = {};
Object.defineProperty(insertionRole$1, "__esModule", {
  value: true
});
insertionRole$1.default = void 0;
var insertionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1v = insertionRole;
insertionRole$1.default = _default$1v;
var linkRole$1 = {};
Object.defineProperty(linkRole$1, "__esModule", {
  value: true
});
linkRole$1.default = void 0;
var linkRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-expanded": null,
    "aria-haspopup": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "href"
      }],
      name: "a"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "href"
      }],
      name: "area"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "href"
      }],
      name: "link"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command"]]
};
var _default$1u = linkRole;
linkRole$1.default = _default$1u;
var listRole$1 = {};
Object.defineProperty(listRole$1, "__esModule", {
  value: true
});
listRole$1.default = void 0;
var listRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "menu"
    },
    module: "HTML"
  }, {
    concept: {
      name: "ol"
    },
    module: "HTML"
  }, {
    concept: {
      name: "ul"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["listitem"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1t = listRole;
listRole$1.default = _default$1t;
var listboxRole$1 = {};
Object.defineProperty(listboxRole$1, "__esModule", {
  value: true
});
listboxRole$1.default = void 0;
var listboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-invalid": null,
    "aria-multiselectable": null,
    "aria-readonly": null,
    "aria-required": null,
    "aria-orientation": "vertical"
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: [">1"],
        name: "size"
      }, {
        name: "multiple"
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: [">1"],
        name: "size"
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "multiple"
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      name: "datalist"
    },
    module: "HTML"
  }, {
    concept: {
      name: "list"
    },
    module: "ARIA"
  }, {
    concept: {
      name: "select"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["option", "group"], ["option"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
};
var _default$1s = listboxRole;
listboxRole$1.default = _default$1s;
var listitemRole$1 = {};
Object.defineProperty(listitemRole$1, "__esModule", {
  value: true
});
listitemRole$1.default = void 0;
var listitemRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-level": null,
    "aria-posinset": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      constraints: ["direct descendant of ol, ul or menu"],
      name: "li"
    },
    module: "HTML"
  }, {
    concept: {
      name: "item"
    },
    module: "XForms"
  }],
  requireContextRole: ["directory", "list"],
  requiredContextRole: ["directory", "list"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1r = listitemRole;
listitemRole$1.default = _default$1r;
var logRole$1 = {};
Object.defineProperty(logRole$1, "__esModule", {
  value: true
});
logRole$1.default = void 0;
var logRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-live": "polite"
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1q = logRole;
logRole$1.default = _default$1q;
var mainRole$1 = {};
Object.defineProperty(mainRole$1, "__esModule", {
  value: true
});
mainRole$1.default = void 0;
var mainRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "main"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1p = mainRole;
mainRole$1.default = _default$1p;
var marqueeRole$1 = {};
Object.defineProperty(marqueeRole$1, "__esModule", {
  value: true
});
marqueeRole$1.default = void 0;
var marqueeRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1o = marqueeRole;
marqueeRole$1.default = _default$1o;
var mathRole$1 = {};
Object.defineProperty(mathRole$1, "__esModule", {
  value: true
});
mathRole$1.default = void 0;
var mathRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "math"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1n = mathRole;
mathRole$1.default = _default$1n;
var menuRole$1 = {};
Object.defineProperty(menuRole$1, "__esModule", {
  value: true
});
menuRole$1.default = void 0;
var menuRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-orientation": "vertical"
  },
  relatedConcepts: [{
    concept: {
      name: "MENU"
    },
    module: "JAPI"
  }, {
    concept: {
      name: "list"
    },
    module: "ARIA"
  }, {
    concept: {
      name: "select"
    },
    module: "XForms"
  }, {
    concept: {
      name: "sidebar"
    },
    module: "DTB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
};
var _default$1m = menuRole;
menuRole$1.default = _default$1m;
var menubarRole$1 = {};
Object.defineProperty(menubarRole$1, "__esModule", {
  value: true
});
menubarRole$1.default = void 0;
var menubarRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-orientation": "horizontal"
  },
  relatedConcepts: [{
    concept: {
      name: "toolbar"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]]
};
var _default$1l = menubarRole;
menubarRole$1.default = _default$1l;
var menuitemRole$1 = {};
Object.defineProperty(menuitemRole$1, "__esModule", {
  value: true
});
menuitemRole$1.default = void 0;
var menuitemRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-posinset": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      name: "MENU_ITEM"
    },
    module: "JAPI"
  }, {
    concept: {
      name: "listitem"
    },
    module: "ARIA"
  }, {
    concept: {
      name: "menuitem"
    },
    module: "HTML"
  }, {
    concept: {
      name: "option"
    },
    module: "ARIA"
  }],
  requireContextRole: ["group", "menu", "menubar"],
  requiredContextRole: ["group", "menu", "menubar"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command"]]
};
var _default$1k = menuitemRole;
menuitemRole$1.default = _default$1k;
var menuitemcheckboxRole$1 = {};
Object.defineProperty(menuitemcheckboxRole$1, "__esModule", {
  value: true
});
menuitemcheckboxRole$1.default = void 0;
var menuitemcheckboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "menuitem"
    },
    module: "ARIA"
  }],
  requireContextRole: ["group", "menu", "menubar"],
  requiredContextRole: ["group", "menu", "menubar"],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]]
};
var _default$1j = menuitemcheckboxRole;
menuitemcheckboxRole$1.default = _default$1j;
var menuitemradioRole$1 = {};
Object.defineProperty(menuitemradioRole$1, "__esModule", {
  value: true
});
menuitemradioRole$1.default = void 0;
var menuitemradioRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "menuitem"
    },
    module: "ARIA"
  }],
  requireContextRole: ["group", "menu", "menubar"],
  requiredContextRole: ["group", "menu", "menubar"],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]]
};
var _default$1i = menuitemradioRole;
menuitemradioRole$1.default = _default$1i;
var meterRole$1 = {};
Object.defineProperty(meterRole$1, "__esModule", {
  value: true
});
meterRole$1.default = void 0;
var meterRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-valuetext": null,
    "aria-valuemax": "100",
    "aria-valuemin": "0"
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-valuenow": null
  },
  superClass: [["roletype", "structure", "range"]]
};
var _default$1h = meterRole;
meterRole$1.default = _default$1h;
var navigationRole$1 = {};
Object.defineProperty(navigationRole$1, "__esModule", {
  value: true
});
navigationRole$1.default = void 0;
var navigationRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "nav"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1g = navigationRole;
navigationRole$1.default = _default$1g;
var noneRole$1 = {};
Object.defineProperty(noneRole$1, "__esModule", {
  value: true
});
noneRole$1.default = void 0;
var noneRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: []
};
var _default$1f = noneRole;
noneRole$1.default = _default$1f;
var noteRole$1 = {};
Object.defineProperty(noteRole$1, "__esModule", {
  value: true
});
noteRole$1.default = void 0;
var noteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1e = noteRole;
noteRole$1.default = _default$1e;
var optionRole$1 = {};
Object.defineProperty(optionRole$1, "__esModule", {
  value: true
});
optionRole$1.default = void 0;
var optionRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-checked": null,
    "aria-posinset": null,
    "aria-setsize": null,
    "aria-selected": "false"
  },
  relatedConcepts: [{
    concept: {
      name: "item"
    },
    module: "XForms"
  }, {
    concept: {
      name: "listitem"
    },
    module: "ARIA"
  }, {
    concept: {
      name: "option"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-selected": "false"
  },
  superClass: [["roletype", "widget", "input"]]
};
var _default$1d = optionRole;
optionRole$1.default = _default$1d;
var paragraphRole$1 = {};
Object.defineProperty(paragraphRole$1, "__esModule", {
  value: true
});
paragraphRole$1.default = void 0;
var paragraphRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1c = paragraphRole;
paragraphRole$1.default = _default$1c;
var presentationRole$1 = {};
Object.defineProperty(presentationRole$1, "__esModule", {
  value: true
});
presentationRole$1.default = void 0;
var presentationRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$1b = presentationRole;
presentationRole$1.default = _default$1b;
var progressbarRole$1 = {};
Object.defineProperty(progressbarRole$1, "__esModule", {
  value: true
});
progressbarRole$1.default = void 0;
var progressbarRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-valuetext": null
  },
  relatedConcepts: [{
    concept: {
      name: "progress"
    },
    module: "HTML"
  }, {
    concept: {
      name: "status"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
};
var _default$1a = progressbarRole;
progressbarRole$1.default = _default$1a;
var radioRole$1 = {};
Object.defineProperty(radioRole$1, "__esModule", {
  value: true
});
radioRole$1.default = void 0;
var radioRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-checked": null,
    "aria-posinset": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "type",
        value: "radio"
      }],
      name: "input"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input"]]
};
var _default$19 = radioRole;
radioRole$1.default = _default$19;
var radiogroupRole$1 = {};
Object.defineProperty(radiogroupRole$1, "__esModule", {
  value: true
});
radiogroupRole$1.default = void 0;
var radiogroupRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null
  },
  relatedConcepts: [{
    concept: {
      name: "list"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["radio"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
};
var _default$18 = radiogroupRole;
radiogroupRole$1.default = _default$18;
var regionRole$1 = {};
Object.defineProperty(regionRole$1, "__esModule", {
  value: true
});
regionRole$1.default = void 0;
var regionRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-label"
      }],
      name: "section"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-labelledby"
      }],
      name: "section"
    },
    module: "HTML"
  }, {
    concept: {
      name: "Device Independence Glossart perceivable unit"
    }
  }, {
    concept: {
      name: "frame"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$17 = regionRole;
regionRole$1.default = _default$17;
var rowRole$1 = {};
Object.defineProperty(rowRole$1, "__esModule", {
  value: true
});
rowRole$1.default = void 0;
var rowRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-colindex": null,
    "aria-expanded": null,
    "aria-level": null,
    "aria-posinset": null,
    "aria-rowindex": null,
    "aria-selected": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      name: "tr"
    },
    module: "HTML"
  }],
  requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
  requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
  requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]]
};
var _default$16 = rowRole;
rowRole$1.default = _default$16;
var rowgroupRole$1 = {};
Object.defineProperty(rowgroupRole$1, "__esModule", {
  value: true
});
rowgroupRole$1.default = void 0;
var rowgroupRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "tbody"
    },
    module: "HTML"
  }, {
    concept: {
      name: "tfoot"
    },
    module: "HTML"
  }, {
    concept: {
      name: "thead"
    },
    module: "HTML"
  }],
  requireContextRole: ["grid", "table", "treegrid"],
  requiredContextRole: ["grid", "table", "treegrid"],
  requiredOwnedElements: [["row"]],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$15 = rowgroupRole;
rowgroupRole$1.default = _default$15;
var rowheaderRole$1 = {};
Object.defineProperty(rowheaderRole$1, "__esModule", {
  value: true
});
rowheaderRole$1.default = void 0;
var rowheaderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-sort": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "scope",
        value: "row"
      }],
      name: "th"
    },
    module: "HTML"
  }],
  requireContextRole: ["row"],
  requiredContextRole: ["row"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
};
var _default$14 = rowheaderRole;
rowheaderRole$1.default = _default$14;
var scrollbarRole$1 = {};
Object.defineProperty(scrollbarRole$1, "__esModule", {
  value: true
});
scrollbarRole$1.default = void 0;
var scrollbarRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-valuetext": null,
    "aria-orientation": "vertical",
    "aria-valuemax": "100",
    "aria-valuemin": "0"
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-controls": null,
    "aria-valuenow": null
  },
  superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
};
var _default$13 = scrollbarRole;
scrollbarRole$1.default = _default$13;
var searchRole$1 = {};
Object.defineProperty(searchRole$1, "__esModule", {
  value: true
});
searchRole$1.default = void 0;
var searchRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$12 = searchRole;
searchRole$1.default = _default$12;
var searchboxRole$1 = {};
Object.defineProperty(searchboxRole$1, "__esModule", {
  value: true
});
searchboxRole$1.default = void 0;
var searchboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "search"
      }],
      name: "input"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "input", "textbox"]]
};
var _default$11 = searchboxRole;
searchboxRole$1.default = _default$11;
var separatorRole$1 = {};
Object.defineProperty(separatorRole$1, "__esModule", {
  value: true
});
separatorRole$1.default = void 0;
var separatorRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-orientation": "horizontal",
    "aria-valuemax": "100",
    "aria-valuemin": "0",
    "aria-valuenow": null,
    "aria-valuetext": null
  },
  relatedConcepts: [{
    concept: {
      name: "hr"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$10 = separatorRole;
separatorRole$1.default = _default$10;
var sliderRole$1 = {};
Object.defineProperty(sliderRole$1, "__esModule", {
  value: true
});
sliderRole$1.default = void 0;
var sliderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-haspopup": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-valuetext": null,
    "aria-orientation": "horizontal",
    "aria-valuemax": "100",
    "aria-valuemin": "0"
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "type",
        value: "range"
      }],
      name: "input"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-valuenow": null
  },
  superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]]
};
var _default$$ = sliderRole;
sliderRole$1.default = _default$$;
var spinbuttonRole$1 = {};
Object.defineProperty(spinbuttonRole$1, "__esModule", {
  value: true
});
spinbuttonRole$1.default = void 0;
var spinbuttonRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null,
    "aria-valuetext": null,
    "aria-valuenow": "0"
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "type",
        value: "number"
      }],
      name: "input"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]]
};
var _default$_ = spinbuttonRole;
spinbuttonRole$1.default = _default$_;
var statusRole$1 = {};
Object.defineProperty(statusRole$1, "__esModule", {
  value: true
});
statusRole$1.default = void 0;
var statusRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-atomic": "true",
    "aria-live": "polite"
  },
  relatedConcepts: [{
    concept: {
      name: "output"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$Z = statusRole;
statusRole$1.default = _default$Z;
var strongRole$1 = {};
Object.defineProperty(strongRole$1, "__esModule", {
  value: true
});
strongRole$1.default = void 0;
var strongRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$Y = strongRole;
strongRole$1.default = _default$Y;
var subscriptRole$1 = {};
Object.defineProperty(subscriptRole$1, "__esModule", {
  value: true
});
subscriptRole$1.default = void 0;
var subscriptRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$X = subscriptRole;
subscriptRole$1.default = _default$X;
var superscriptRole$1 = {};
Object.defineProperty(superscriptRole$1, "__esModule", {
  value: true
});
superscriptRole$1.default = void 0;
var superscriptRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$W = superscriptRole;
superscriptRole$1.default = _default$W;
var switchRole$1 = {};
Object.defineProperty(switchRole$1, "__esModule", {
  value: true
});
switchRole$1.default = void 0;
var switchRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "button"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input", "checkbox"]]
};
var _default$V = switchRole;
switchRole$1.default = _default$V;
var tabRole$1 = {};
Object.defineProperty(tabRole$1, "__esModule", {
  value: true
});
tabRole$1.default = void 0;
var tabRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-posinset": null,
    "aria-setsize": null,
    "aria-selected": "false"
  },
  relatedConcepts: [],
  requireContextRole: ["tablist"],
  requiredContextRole: ["tablist"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]]
};
var _default$U = tabRole;
tabRole$1.default = _default$U;
var tableRole$1 = {};
Object.defineProperty(tableRole$1, "__esModule", {
  value: true
});
tableRole$1.default = void 0;
var tableRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-colcount": null,
    "aria-rowcount": null
  },
  relatedConcepts: [{
    concept: {
      name: "table"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["row"], ["row", "rowgroup"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$T = tableRole;
tableRole$1.default = _default$T;
var tablistRole$1 = {};
Object.defineProperty(tablistRole$1, "__esModule", {
  value: true
});
tablistRole$1.default = void 0;
var tablistRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-level": null,
    "aria-multiselectable": null,
    "aria-orientation": "horizontal"
  },
  relatedConcepts: [{
    module: "DAISY",
    concept: {
      name: "guide"
    }
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["tab"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite"]]
};
var _default$S = tablistRole;
tablistRole$1.default = _default$S;
var tabpanelRole$1 = {};
Object.defineProperty(tabpanelRole$1, "__esModule", {
  value: true
});
tabpanelRole$1.default = void 0;
var tabpanelRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$R = tabpanelRole;
tabpanelRole$1.default = _default$R;
var termRole$1 = {};
Object.defineProperty(termRole$1, "__esModule", {
  value: true
});
termRole$1.default = void 0;
var termRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "dfn"
    },
    module: "HTML"
  }, {
    concept: {
      name: "dt"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$Q = termRole;
termRole$1.default = _default$Q;
var textboxRole$1 = {};
Object.defineProperty(textboxRole$1, "__esModule", {
  value: true
});
textboxRole$1.default = void 0;
var textboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-autocomplete": null,
    "aria-errormessage": null,
    "aria-haspopup": null,
    "aria-invalid": null,
    "aria-multiline": null,
    "aria-placeholder": null,
    "aria-readonly": null,
    "aria-required": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "type"
      }, {
        constraints: ["undefined"],
        name: "list"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "email"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "tel"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "text"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "url"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      name: "input"
    },
    module: "XForms"
  }, {
    concept: {
      name: "textarea"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "input"]]
};
var _default$P = textboxRole;
textboxRole$1.default = _default$P;
var timeRole$1 = {};
Object.defineProperty(timeRole$1, "__esModule", {
  value: true
});
timeRole$1.default = void 0;
var timeRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$O = timeRole;
timeRole$1.default = _default$O;
var timerRole$1 = {};
Object.defineProperty(timerRole$1, "__esModule", {
  value: true
});
timerRole$1.default = void 0;
var timerRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "status"]]
};
var _default$N = timerRole;
timerRole$1.default = _default$N;
var toolbarRole$1 = {};
Object.defineProperty(toolbarRole$1, "__esModule", {
  value: true
});
toolbarRole$1.default = void 0;
var toolbarRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-orientation": "horizontal"
  },
  relatedConcepts: [{
    concept: {
      name: "menubar"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "group"]]
};
var _default$M = toolbarRole;
toolbarRole$1.default = _default$M;
var tooltipRole$1 = {};
Object.defineProperty(tooltipRole$1, "__esModule", {
  value: true
});
tooltipRole$1.default = void 0;
var tooltipRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$L = tooltipRole;
tooltipRole$1.default = _default$L;
var treeRole$1 = {};
Object.defineProperty(treeRole$1, "__esModule", {
  value: true
});
treeRole$1.default = void 0;
var treeRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null,
    "aria-multiselectable": null,
    "aria-required": null,
    "aria-orientation": "vertical"
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
};
var _default$K = treeRole;
treeRole$1.default = _default$K;
var treegridRole$1 = {};
Object.defineProperty(treegridRole$1, "__esModule", {
  value: true
});
treegridRole$1.default = void 0;
var treegridRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["row"], ["row", "rowgroup"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]]
};
var _default$J = treegridRole;
treegridRole$1.default = _default$J;
var treeitemRole$1 = {};
Object.defineProperty(treeitemRole$1, "__esModule", {
  value: true
});
treeitemRole$1.default = void 0;
var treeitemRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-expanded": null,
    "aria-haspopup": null
  },
  relatedConcepts: [],
  requireContextRole: ["group", "tree"],
  requiredContextRole: ["group", "tree"],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-selected": null
  },
  superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]]
};
var _default$I = treeitemRole;
treeitemRole$1.default = _default$I;
Object.defineProperty(ariaLiteralRoles$1, "__esModule", {
  value: true
});
ariaLiteralRoles$1.default = void 0;
var _alertRole = _interopRequireDefault$5(alertRole$1);
var _alertdialogRole = _interopRequireDefault$5(alertdialogRole$1);
var _applicationRole = _interopRequireDefault$5(applicationRole$1);
var _articleRole = _interopRequireDefault$5(articleRole$1);
var _bannerRole = _interopRequireDefault$5(bannerRole$1);
var _blockquoteRole = _interopRequireDefault$5(blockquoteRole$1);
var _buttonRole = _interopRequireDefault$5(buttonRole$1);
var _captionRole = _interopRequireDefault$5(captionRole$1);
var _cellRole = _interopRequireDefault$5(cellRole$1);
var _checkboxRole = _interopRequireDefault$5(checkboxRole$1);
var _codeRole = _interopRequireDefault$5(codeRole$1);
var _columnheaderRole = _interopRequireDefault$5(columnheaderRole$1);
var _comboboxRole = _interopRequireDefault$5(comboboxRole$1);
var _complementaryRole = _interopRequireDefault$5(complementaryRole$1);
var _contentinfoRole = _interopRequireDefault$5(contentinfoRole$1);
var _definitionRole = _interopRequireDefault$5(definitionRole$1);
var _deletionRole = _interopRequireDefault$5(deletionRole$1);
var _dialogRole = _interopRequireDefault$5(dialogRole$1);
var _directoryRole = _interopRequireDefault$5(directoryRole$1);
var _documentRole = _interopRequireDefault$5(documentRole$1);
var _emphasisRole = _interopRequireDefault$5(emphasisRole$1);
var _feedRole = _interopRequireDefault$5(feedRole$1);
var _figureRole = _interopRequireDefault$5(figureRole$1);
var _formRole = _interopRequireDefault$5(formRole$1);
var _genericRole = _interopRequireDefault$5(genericRole$1);
var _gridRole = _interopRequireDefault$5(gridRole$1);
var _gridcellRole = _interopRequireDefault$5(gridcellRole$1);
var _groupRole = _interopRequireDefault$5(groupRole$1);
var _headingRole = _interopRequireDefault$5(headingRole$1);
var _imgRole = _interopRequireDefault$5(imgRole$1);
var _insertionRole = _interopRequireDefault$5(insertionRole$1);
var _linkRole = _interopRequireDefault$5(linkRole$1);
var _listRole = _interopRequireDefault$5(listRole$1);
var _listboxRole = _interopRequireDefault$5(listboxRole$1);
var _listitemRole = _interopRequireDefault$5(listitemRole$1);
var _logRole = _interopRequireDefault$5(logRole$1);
var _mainRole = _interopRequireDefault$5(mainRole$1);
var _marqueeRole = _interopRequireDefault$5(marqueeRole$1);
var _mathRole = _interopRequireDefault$5(mathRole$1);
var _menuRole = _interopRequireDefault$5(menuRole$1);
var _menubarRole = _interopRequireDefault$5(menubarRole$1);
var _menuitemRole = _interopRequireDefault$5(menuitemRole$1);
var _menuitemcheckboxRole = _interopRequireDefault$5(menuitemcheckboxRole$1);
var _menuitemradioRole = _interopRequireDefault$5(menuitemradioRole$1);
var _meterRole = _interopRequireDefault$5(meterRole$1);
var _navigationRole = _interopRequireDefault$5(navigationRole$1);
var _noneRole = _interopRequireDefault$5(noneRole$1);
var _noteRole = _interopRequireDefault$5(noteRole$1);
var _optionRole = _interopRequireDefault$5(optionRole$1);
var _paragraphRole = _interopRequireDefault$5(paragraphRole$1);
var _presentationRole = _interopRequireDefault$5(presentationRole$1);
var _progressbarRole = _interopRequireDefault$5(progressbarRole$1);
var _radioRole = _interopRequireDefault$5(radioRole$1);
var _radiogroupRole = _interopRequireDefault$5(radiogroupRole$1);
var _regionRole = _interopRequireDefault$5(regionRole$1);
var _rowRole = _interopRequireDefault$5(rowRole$1);
var _rowgroupRole = _interopRequireDefault$5(rowgroupRole$1);
var _rowheaderRole = _interopRequireDefault$5(rowheaderRole$1);
var _scrollbarRole = _interopRequireDefault$5(scrollbarRole$1);
var _searchRole = _interopRequireDefault$5(searchRole$1);
var _searchboxRole = _interopRequireDefault$5(searchboxRole$1);
var _separatorRole = _interopRequireDefault$5(separatorRole$1);
var _sliderRole = _interopRequireDefault$5(sliderRole$1);
var _spinbuttonRole = _interopRequireDefault$5(spinbuttonRole$1);
var _statusRole = _interopRequireDefault$5(statusRole$1);
var _strongRole = _interopRequireDefault$5(strongRole$1);
var _subscriptRole = _interopRequireDefault$5(subscriptRole$1);
var _superscriptRole = _interopRequireDefault$5(superscriptRole$1);
var _switchRole = _interopRequireDefault$5(switchRole$1);
var _tabRole = _interopRequireDefault$5(tabRole$1);
var _tableRole = _interopRequireDefault$5(tableRole$1);
var _tablistRole = _interopRequireDefault$5(tablistRole$1);
var _tabpanelRole = _interopRequireDefault$5(tabpanelRole$1);
var _termRole = _interopRequireDefault$5(termRole$1);
var _textboxRole = _interopRequireDefault$5(textboxRole$1);
var _timeRole = _interopRequireDefault$5(timeRole$1);
var _timerRole = _interopRequireDefault$5(timerRole$1);
var _toolbarRole = _interopRequireDefault$5(toolbarRole$1);
var _tooltipRole = _interopRequireDefault$5(tooltipRole$1);
var _treeRole = _interopRequireDefault$5(treeRole$1);
var _treegridRole = _interopRequireDefault$5(treegridRole$1);
var _treeitemRole = _interopRequireDefault$5(treeitemRole$1);
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var ariaLiteralRoles = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]];
var _default$H = ariaLiteralRoles;
ariaLiteralRoles$1.default = _default$H;
var ariaDpubRoles$1 = {};
var docAbstractRole$1 = {};
Object.defineProperty(docAbstractRole$1, "__esModule", {
  value: true
});
docAbstractRole$1.default = void 0;
var docAbstractRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "abstract [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$G = docAbstractRole;
docAbstractRole$1.default = _default$G;
var docAcknowledgmentsRole$1 = {};
Object.defineProperty(docAcknowledgmentsRole$1, "__esModule", {
  value: true
});
docAcknowledgmentsRole$1.default = void 0;
var docAcknowledgmentsRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "acknowledgments [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$F = docAcknowledgmentsRole;
docAcknowledgmentsRole$1.default = _default$F;
var docAfterwordRole$1 = {};
Object.defineProperty(docAfterwordRole$1, "__esModule", {
  value: true
});
docAfterwordRole$1.default = void 0;
var docAfterwordRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "afterword [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$E = docAfterwordRole;
docAfterwordRole$1.default = _default$E;
var docAppendixRole$1 = {};
Object.defineProperty(docAppendixRole$1, "__esModule", {
  value: true
});
docAppendixRole$1.default = void 0;
var docAppendixRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "appendix [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$D = docAppendixRole;
docAppendixRole$1.default = _default$D;
var docBacklinkRole$1 = {};
Object.defineProperty(docBacklinkRole$1, "__esModule", {
  value: true
});
docBacklinkRole$1.default = void 0;
var docBacklinkRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "content"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "referrer [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command", "link"]]
};
var _default$C = docBacklinkRole;
docBacklinkRole$1.default = _default$C;
var docBiblioentryRole$1 = {};
Object.defineProperty(docBiblioentryRole$1, "__esModule", {
  value: true
});
docBiblioentryRole$1.default = void 0;
var docBiblioentryRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "EPUB biblioentry [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: ["doc-bibliography"],
  requiredContextRole: ["doc-bibliography"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "listitem"]]
};
var _default$B = docBiblioentryRole;
docBiblioentryRole$1.default = _default$B;
var docBibliographyRole$1 = {};
Object.defineProperty(docBibliographyRole$1, "__esModule", {
  value: true
});
docBibliographyRole$1.default = void 0;
var docBibliographyRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "bibliography [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["doc-biblioentry"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$A = docBibliographyRole;
docBibliographyRole$1.default = _default$A;
var docBibliorefRole$1 = {};
Object.defineProperty(docBibliorefRole$1, "__esModule", {
  value: true
});
docBibliorefRole$1.default = void 0;
var docBibliorefRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "biblioref [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command", "link"]]
};
var _default$z = docBibliorefRole;
docBibliorefRole$1.default = _default$z;
var docChapterRole$1 = {};
Object.defineProperty(docChapterRole$1, "__esModule", {
  value: true
});
docChapterRole$1.default = void 0;
var docChapterRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "chapter [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$y = docChapterRole;
docChapterRole$1.default = _default$y;
var docColophonRole$1 = {};
Object.defineProperty(docColophonRole$1, "__esModule", {
  value: true
});
docColophonRole$1.default = void 0;
var docColophonRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "colophon [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$x = docColophonRole;
docColophonRole$1.default = _default$x;
var docConclusionRole$1 = {};
Object.defineProperty(docConclusionRole$1, "__esModule", {
  value: true
});
docConclusionRole$1.default = void 0;
var docConclusionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "conclusion [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$w = docConclusionRole;
docConclusionRole$1.default = _default$w;
var docCoverRole$1 = {};
Object.defineProperty(docCoverRole$1, "__esModule", {
  value: true
});
docCoverRole$1.default = void 0;
var docCoverRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "cover [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "img"]]
};
var _default$v = docCoverRole;
docCoverRole$1.default = _default$v;
var docCreditRole$1 = {};
Object.defineProperty(docCreditRole$1, "__esModule", {
  value: true
});
docCreditRole$1.default = void 0;
var docCreditRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "credit [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$u = docCreditRole;
docCreditRole$1.default = _default$u;
var docCreditsRole$1 = {};
Object.defineProperty(docCreditsRole$1, "__esModule", {
  value: true
});
docCreditsRole$1.default = void 0;
var docCreditsRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "credits [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$t = docCreditsRole;
docCreditsRole$1.default = _default$t;
var docDedicationRole$1 = {};
Object.defineProperty(docDedicationRole$1, "__esModule", {
  value: true
});
docDedicationRole$1.default = void 0;
var docDedicationRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "dedication [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$s = docDedicationRole;
docDedicationRole$1.default = _default$s;
var docEndnoteRole$1 = {};
Object.defineProperty(docEndnoteRole$1, "__esModule", {
  value: true
});
docEndnoteRole$1.default = void 0;
var docEndnoteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "rearnote [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: ["doc-endnotes"],
  requiredContextRole: ["doc-endnotes"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "listitem"]]
};
var _default$r = docEndnoteRole;
docEndnoteRole$1.default = _default$r;
var docEndnotesRole$1 = {};
Object.defineProperty(docEndnotesRole$1, "__esModule", {
  value: true
});
docEndnotesRole$1.default = void 0;
var docEndnotesRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "rearnotes [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["doc-endnote"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$q = docEndnotesRole;
docEndnotesRole$1.default = _default$q;
var docEpigraphRole$1 = {};
Object.defineProperty(docEpigraphRole$1, "__esModule", {
  value: true
});
docEpigraphRole$1.default = void 0;
var docEpigraphRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "epigraph [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$p = docEpigraphRole;
docEpigraphRole$1.default = _default$p;
var docEpilogueRole$1 = {};
Object.defineProperty(docEpilogueRole$1, "__esModule", {
  value: true
});
docEpilogueRole$1.default = void 0;
var docEpilogueRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "epilogue [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$o = docEpilogueRole;
docEpilogueRole$1.default = _default$o;
var docErrataRole$1 = {};
Object.defineProperty(docErrataRole$1, "__esModule", {
  value: true
});
docErrataRole$1.default = void 0;
var docErrataRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "errata [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$n = docErrataRole;
docErrataRole$1.default = _default$n;
var docExampleRole$1 = {};
Object.defineProperty(docExampleRole$1, "__esModule", {
  value: true
});
docExampleRole$1.default = void 0;
var docExampleRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$m = docExampleRole;
docExampleRole$1.default = _default$m;
var docFootnoteRole$1 = {};
Object.defineProperty(docFootnoteRole$1, "__esModule", {
  value: true
});
docFootnoteRole$1.default = void 0;
var docFootnoteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "footnote [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$l = docFootnoteRole;
docFootnoteRole$1.default = _default$l;
var docForewordRole$1 = {};
Object.defineProperty(docForewordRole$1, "__esModule", {
  value: true
});
docForewordRole$1.default = void 0;
var docForewordRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "foreword [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$k = docForewordRole;
docForewordRole$1.default = _default$k;
var docGlossaryRole$1 = {};
Object.defineProperty(docGlossaryRole$1, "__esModule", {
  value: true
});
docGlossaryRole$1.default = void 0;
var docGlossaryRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "glossary [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["definition"], ["term"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$j = docGlossaryRole;
docGlossaryRole$1.default = _default$j;
var docGlossrefRole$1 = {};
Object.defineProperty(docGlossrefRole$1, "__esModule", {
  value: true
});
docGlossrefRole$1.default = void 0;
var docGlossrefRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "glossref [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command", "link"]]
};
var _default$i = docGlossrefRole;
docGlossrefRole$1.default = _default$i;
var docIndexRole$1 = {};
Object.defineProperty(docIndexRole$1, "__esModule", {
  value: true
});
docIndexRole$1.default = void 0;
var docIndexRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "index [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
};
var _default$h = docIndexRole;
docIndexRole$1.default = _default$h;
var docIntroductionRole$1 = {};
Object.defineProperty(docIntroductionRole$1, "__esModule", {
  value: true
});
docIntroductionRole$1.default = void 0;
var docIntroductionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "introduction [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$g = docIntroductionRole;
docIntroductionRole$1.default = _default$g;
var docNoterefRole$1 = {};
Object.defineProperty(docNoterefRole$1, "__esModule", {
  value: true
});
docNoterefRole$1.default = void 0;
var docNoterefRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "noteref [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command", "link"]]
};
var _default$f = docNoterefRole;
docNoterefRole$1.default = _default$f;
var docNoticeRole$1 = {};
Object.defineProperty(docNoticeRole$1, "__esModule", {
  value: true
});
docNoticeRole$1.default = void 0;
var docNoticeRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "notice [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "note"]]
};
var _default$e = docNoticeRole;
docNoticeRole$1.default = _default$e;
var docPagebreakRole$1 = {};
Object.defineProperty(docPagebreakRole$1, "__esModule", {
  value: true
});
docPagebreakRole$1.default = void 0;
var docPagebreakRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "pagebreak [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "separator"]]
};
var _default$d = docPagebreakRole;
docPagebreakRole$1.default = _default$d;
var docPagelistRole$1 = {};
Object.defineProperty(docPagelistRole$1, "__esModule", {
  value: true
});
docPagelistRole$1.default = void 0;
var docPagelistRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "page-list [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
};
var _default$c = docPagelistRole;
docPagelistRole$1.default = _default$c;
var docPartRole$1 = {};
Object.defineProperty(docPartRole$1, "__esModule", {
  value: true
});
docPartRole$1.default = void 0;
var docPartRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "part [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$b = docPartRole;
docPartRole$1.default = _default$b;
var docPrefaceRole$1 = {};
Object.defineProperty(docPrefaceRole$1, "__esModule", {
  value: true
});
docPrefaceRole$1.default = void 0;
var docPrefaceRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "preface [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$a = docPrefaceRole;
docPrefaceRole$1.default = _default$a;
var docPrologueRole$1 = {};
Object.defineProperty(docPrologueRole$1, "__esModule", {
  value: true
});
docPrologueRole$1.default = void 0;
var docPrologueRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "prologue [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$9 = docPrologueRole;
docPrologueRole$1.default = _default$9;
var docPullquoteRole$1 = {};
Object.defineProperty(docPullquoteRole$1, "__esModule", {
  value: true
});
docPullquoteRole$1.default = void 0;
var docPullquoteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "pullquote [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["none"]]
};
var _default$8 = docPullquoteRole;
docPullquoteRole$1.default = _default$8;
var docQnaRole$1 = {};
Object.defineProperty(docQnaRole$1, "__esModule", {
  value: true
});
docQnaRole$1.default = void 0;
var docQnaRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "qna [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$7 = docQnaRole;
docQnaRole$1.default = _default$7;
var docSubtitleRole$1 = {};
Object.defineProperty(docSubtitleRole$1, "__esModule", {
  value: true
});
docSubtitleRole$1.default = void 0;
var docSubtitleRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "subtitle [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "sectionhead"]]
};
var _default$6 = docSubtitleRole;
docSubtitleRole$1.default = _default$6;
var docTipRole$1 = {};
Object.defineProperty(docTipRole$1, "__esModule", {
  value: true
});
docTipRole$1.default = void 0;
var docTipRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "help [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "note"]]
};
var _default$5 = docTipRole;
docTipRole$1.default = _default$5;
var docTocRole$1 = {};
Object.defineProperty(docTocRole$1, "__esModule", {
  value: true
});
docTocRole$1.default = void 0;
var docTocRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "toc [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
};
var _default$4 = docTocRole;
docTocRole$1.default = _default$4;
Object.defineProperty(ariaDpubRoles$1, "__esModule", {
  value: true
});
ariaDpubRoles$1.default = void 0;
var _docAbstractRole = _interopRequireDefault$4(docAbstractRole$1);
var _docAcknowledgmentsRole = _interopRequireDefault$4(docAcknowledgmentsRole$1);
var _docAfterwordRole = _interopRequireDefault$4(docAfterwordRole$1);
var _docAppendixRole = _interopRequireDefault$4(docAppendixRole$1);
var _docBacklinkRole = _interopRequireDefault$4(docBacklinkRole$1);
var _docBiblioentryRole = _interopRequireDefault$4(docBiblioentryRole$1);
var _docBibliographyRole = _interopRequireDefault$4(docBibliographyRole$1);
var _docBibliorefRole = _interopRequireDefault$4(docBibliorefRole$1);
var _docChapterRole = _interopRequireDefault$4(docChapterRole$1);
var _docColophonRole = _interopRequireDefault$4(docColophonRole$1);
var _docConclusionRole = _interopRequireDefault$4(docConclusionRole$1);
var _docCoverRole = _interopRequireDefault$4(docCoverRole$1);
var _docCreditRole = _interopRequireDefault$4(docCreditRole$1);
var _docCreditsRole = _interopRequireDefault$4(docCreditsRole$1);
var _docDedicationRole = _interopRequireDefault$4(docDedicationRole$1);
var _docEndnoteRole = _interopRequireDefault$4(docEndnoteRole$1);
var _docEndnotesRole = _interopRequireDefault$4(docEndnotesRole$1);
var _docEpigraphRole = _interopRequireDefault$4(docEpigraphRole$1);
var _docEpilogueRole = _interopRequireDefault$4(docEpilogueRole$1);
var _docErrataRole = _interopRequireDefault$4(docErrataRole$1);
var _docExampleRole = _interopRequireDefault$4(docExampleRole$1);
var _docFootnoteRole = _interopRequireDefault$4(docFootnoteRole$1);
var _docForewordRole = _interopRequireDefault$4(docForewordRole$1);
var _docGlossaryRole = _interopRequireDefault$4(docGlossaryRole$1);
var _docGlossrefRole = _interopRequireDefault$4(docGlossrefRole$1);
var _docIndexRole = _interopRequireDefault$4(docIndexRole$1);
var _docIntroductionRole = _interopRequireDefault$4(docIntroductionRole$1);
var _docNoterefRole = _interopRequireDefault$4(docNoterefRole$1);
var _docNoticeRole = _interopRequireDefault$4(docNoticeRole$1);
var _docPagebreakRole = _interopRequireDefault$4(docPagebreakRole$1);
var _docPagelistRole = _interopRequireDefault$4(docPagelistRole$1);
var _docPartRole = _interopRequireDefault$4(docPartRole$1);
var _docPrefaceRole = _interopRequireDefault$4(docPrefaceRole$1);
var _docPrologueRole = _interopRequireDefault$4(docPrologueRole$1);
var _docPullquoteRole = _interopRequireDefault$4(docPullquoteRole$1);
var _docQnaRole = _interopRequireDefault$4(docQnaRole$1);
var _docSubtitleRole = _interopRequireDefault$4(docSubtitleRole$1);
var _docTipRole = _interopRequireDefault$4(docTipRole$1);
var _docTocRole = _interopRequireDefault$4(docTocRole$1);
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var ariaDpubRoles = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]];
var _default$3 = ariaDpubRoles;
ariaDpubRoles$1.default = _default$3;
Object.defineProperty(rolesMap$1, "__esModule", {
  value: true
});
rolesMap$1.default = void 0;
var _ariaAbstractRoles = _interopRequireDefault$3(ariaAbstractRoles$1);
var _ariaLiteralRoles = _interopRequireDefault$3(ariaLiteralRoles$1);
var _ariaDpubRoles = _interopRequireDefault$3(ariaDpubRoles$1);
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F2 = function F3() {
      };
      return { s: F2, n: function n2() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e2(_e2) {
        throw _e2;
      }, f: F2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n2() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e2(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f2() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$2(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr))
    return arr;
}
var roles$1 = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default);
roles$1.forEach(function(_ref) {
  var _ref2 = _slicedToArray$2(_ref, 2), roleDefinition = _ref2[1];
  var _iterator = _createForOfIteratorHelper(roleDefinition.superClass), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var superClassIter = _step.value;
      var _iterator2 = _createForOfIteratorHelper(superClassIter), _step2;
      try {
        var _loop3 = function _loop4() {
          var superClassName = _step2.value;
          var superClassRoleTuple = roles$1.find(function(_ref3) {
            var _ref4 = _slicedToArray$2(_ref3, 1), name = _ref4[0];
            return name === superClassName;
          });
          if (superClassRoleTuple) {
            var superClassDefinition = superClassRoleTuple[1];
            for (var _i2 = 0, _Object$keys = Object.keys(superClassDefinition.props); _i2 < _Object$keys.length; _i2++) {
              var prop = _Object$keys[_i2];
              if (!Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)) {
                Object.assign(roleDefinition.props, _defineProperty({}, prop, superClassDefinition.props[prop]));
              }
            }
          }
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          _loop3();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});
var rolesMap = {
  entries: function entries3() {
    return roles$1;
  },
  get: function get3(key) {
    var item = roles$1.find(function(tuple) {
      return tuple[0] === key ? true : false;
    });
    return item && item[1];
  },
  has: function has3(key) {
    return !!this.get(key);
  },
  keys: function keys3() {
    return roles$1.map(function(_ref5) {
      var _ref6 = _slicedToArray$2(_ref5, 1), key = _ref6[0];
      return key;
    });
  },
  values: function values3() {
    return roles$1.map(function(_ref7) {
      var _ref8 = _slicedToArray$2(_ref7, 2), values6 = _ref8[1];
      return values6;
    });
  }
};
var _default$2 = rolesMap;
rolesMap$1.default = _default$2;
var elementRoleMap$1 = {};
Object.defineProperty(elementRoleMap$1, "__esModule", {
  value: true
});
elementRoleMap$1.default = void 0;
var _rolesMap$2 = _interopRequireDefault$2(rolesMap$1);
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$1(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
var elementRoles$1 = [];
var keys$1 = _rolesMap$2.default.keys();
for (var i$1 = 0; i$1 < keys$1.length; i$1++) {
  var _key = keys$1[i$1];
  var role = _rolesMap$2.default.get(_key);
  if (role) {
    var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
    for (var k = 0; k < concepts.length; k++) {
      var relation = concepts[k];
      if (relation.module === "HTML") {
        var concept = relation.concept;
        if (concept) {
          (function() {
            var conceptStr = JSON.stringify(concept);
            var elementRoleRelation = elementRoles$1.find(function(relation2) {
              return JSON.stringify(relation2[0]) === conceptStr;
            });
            var roles2 = void 0;
            if (elementRoleRelation) {
              roles2 = elementRoleRelation[1];
            } else {
              roles2 = [];
            }
            var isUnique = true;
            for (var _i = 0; _i < roles2.length; _i++) {
              if (roles2[_i] === _key) {
                isUnique = false;
                break;
              }
            }
            if (isUnique) {
              roles2.push(_key);
            }
            elementRoles$1.push([concept, roles2]);
          })();
        }
      }
    }
  }
}
var elementRoleMap = {
  entries: function entries4() {
    return elementRoles$1;
  },
  get: function get4(key) {
    var item = elementRoles$1.find(function(tuple) {
      return JSON.stringify(tuple[0]) === JSON.stringify(key) ? true : false;
    });
    return item && item[1];
  },
  has: function has4(key) {
    return !!this.get(key);
  },
  keys: function keys4() {
    return elementRoles$1.map(function(_ref) {
      var _ref2 = _slicedToArray$1(_ref, 1), key = _ref2[0];
      return key;
    });
  },
  values: function values4() {
    return elementRoles$1.map(function(_ref3) {
      var _ref4 = _slicedToArray$1(_ref3, 2), values6 = _ref4[1];
      return values6;
    });
  }
};
var _default$1 = elementRoleMap;
elementRoleMap$1.default = _default$1;
var roleElementMap$1 = {};
Object.defineProperty(roleElementMap$1, "__esModule", {
  value: true
});
roleElementMap$1.default = void 0;
var _rolesMap$1 = _interopRequireDefault$1(rolesMap$1);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var roleElement = [];
var keys5 = _rolesMap$1.default.keys();
var _loop = function _loop2(i) {
  var key = keys5[i];
  var role = _rolesMap$1.default.get(key);
  if (role) {
    var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
    for (var k = 0; k < concepts.length; k++) {
      var relation = concepts[k];
      if (relation.module === "HTML") {
        var concept = relation.concept;
        if (concept) {
          var roleElementRelation = roleElement.find(function(item) {
            return item[0] === key;
          });
          var relationConcepts = void 0;
          if (roleElementRelation) {
            relationConcepts = roleElementRelation[1];
          } else {
            relationConcepts = [];
          }
          relationConcepts.push(concept);
          roleElement.push([key, relationConcepts]);
        }
      }
    }
  }
};
for (var i = 0; i < keys5.length; i++) {
  _loop(i);
}
var roleElementMap = {
  entries: function entries5() {
    return roleElement;
  },
  get: function get5(key) {
    var item = roleElement.find(function(tuple) {
      return tuple[0] === key ? true : false;
    });
    return item && item[1];
  },
  has: function has5(key) {
    return !!this.get(key);
  },
  keys: function keys6() {
    return roleElement.map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
      return key;
    });
  },
  values: function values5() {
    return roleElement.map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), values6 = _ref4[1];
      return values6;
    });
  }
};
var _default = roleElementMap;
roleElementMap$1.default = _default;
Object.defineProperty(lib, "__esModule", {
  value: true
});
var roleElements_1 = lib.roleElements = elementRoles_1 = lib.elementRoles = roles_1 = lib.roles = lib.dom = lib.aria = void 0;
var _ariaPropsMap = _interopRequireDefault(ariaPropsMap$1);
var _domMap = _interopRequireDefault(domMap$1);
var _rolesMap = _interopRequireDefault(rolesMap$1);
var _elementRoleMap = _interopRequireDefault(elementRoleMap$1);
var _roleElementMap = _interopRequireDefault(roleElementMap$1);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var aria = _ariaPropsMap.default;
lib.aria = aria;
var dom = _domMap.default;
lib.dom = dom;
var roles = _rolesMap.default;
var roles_1 = lib.roles = roles;
var elementRoles = _elementRoleMap.default;
var elementRoles_1 = lib.elementRoles = elementRoles;
var roleElements = _roleElementMap.default;
roleElements_1 = lib.roleElements = roleElements;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error2) {
    reject(error2);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var runtime = { exports: {} };
(function(module2) {
  var runtime2 = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self2, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self2, context);
      return generator;
    }
    exports.wrap = wrap;
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
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values6([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
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
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function(error2) {
            return invoke("throw", error2, resolve, reject);
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
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
      this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0)
        PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self2, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
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
          var record = tryCatch(innerFn, self2, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        context.delegate = null;
        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
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
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
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
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(object) {
      var keys7 = [];
      for (var key in object) {
        keys7.push(key);
      }
      keys7.reverse();
      return function next() {
        while (keys7.length) {
          var key2 = keys7.pop();
          if (key2 in object) {
            next.value = key2;
            next.done = false;
            return next;
          }
        }
        next.done = true;
        return next;
      };
    };
    function values6(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next2() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next2.value = iterable[i];
                next2.done = false;
                return next2;
              }
            }
            next2.value = undefined$1;
            next2.done = true;
            return next2;
          };
          return next.next = next;
        }
      }
      return { next: doneResult };
    }
    exports.values = values6;
    function doneResult() {
      return { value: undefined$1, done: true };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
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
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
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
      abrupt: function(type3, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type3 === "break" || type3 === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type3;
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
        if (record.type === "break" || record.type === "continue") {
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
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values6(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(module2.exports);
  try {
    regeneratorRuntime = runtime2;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime2;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime2);
    }
  }
})(runtime);
var regenerator = runtime.exports;
var lzString = { exports: {} };
(function(module2) {
  var LZString = function() {
    var f2 = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};
    function getBaseValue(alphabet, character) {
      if (!baseReverseDic[alphabet]) {
        baseReverseDic[alphabet] = {};
        for (var i = 0; i < alphabet.length; i++) {
          baseReverseDic[alphabet][alphabet.charAt(i)] = i;
        }
      }
      return baseReverseDic[alphabet][character];
    }
    var LZString2 = {
      compressToBase64: function(input2) {
        if (input2 == null)
          return "";
        var res = LZString2._compress(input2, 6, function(a) {
          return keyStrBase64.charAt(a);
        });
        switch (res.length % 4) {
          default:
          case 0:
            return res;
          case 1:
            return res + "===";
          case 2:
            return res + "==";
          case 3:
            return res + "=";
        }
      },
      decompressFromBase64: function(input2) {
        if (input2 == null)
          return "";
        if (input2 == "")
          return null;
        return LZString2._decompress(input2.length, 32, function(index2) {
          return getBaseValue(keyStrBase64, input2.charAt(index2));
        });
      },
      compressToUTF16: function(input2) {
        if (input2 == null)
          return "";
        return LZString2._compress(input2, 15, function(a) {
          return f2(a + 32);
        }) + " ";
      },
      decompressFromUTF16: function(compressed) {
        if (compressed == null)
          return "";
        if (compressed == "")
          return null;
        return LZString2._decompress(compressed.length, 16384, function(index2) {
          return compressed.charCodeAt(index2) - 32;
        });
      },
      compressToUint8Array: function(uncompressed) {
        var compressed = LZString2.compress(uncompressed);
        var buf = new Uint8Array(compressed.length * 2);
        for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
          var current_value = compressed.charCodeAt(i);
          buf[i * 2] = current_value >>> 8;
          buf[i * 2 + 1] = current_value % 256;
        }
        return buf;
      },
      decompressFromUint8Array: function(compressed) {
        if (compressed === null || compressed === void 0) {
          return LZString2.decompress(compressed);
        } else {
          var buf = new Array(compressed.length / 2);
          for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
            buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
          }
          var result = [];
          buf.forEach(function(c2) {
            result.push(f2(c2));
          });
          return LZString2.decompress(result.join(""));
        }
      },
      compressToEncodedURIComponent: function(input2) {
        if (input2 == null)
          return "";
        return LZString2._compress(input2, 6, function(a) {
          return keyStrUriSafe.charAt(a);
        });
      },
      decompressFromEncodedURIComponent: function(input2) {
        if (input2 == null)
          return "";
        if (input2 == "")
          return null;
        input2 = input2.replace(/ /g, "+");
        return LZString2._decompress(input2.length, 32, function(index2) {
          return getBaseValue(keyStrUriSafe, input2.charAt(index2));
        });
      },
      compress: function(uncompressed) {
        return LZString2._compress(uncompressed, 16, function(a) {
          return f2(a);
        });
      },
      _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
        if (uncompressed == null)
          return "";
        var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
        for (ii = 0; ii < uncompressed.length; ii += 1) {
          context_c = uncompressed.charAt(ii);
          if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
            context_dictionary[context_c] = context_dictSize++;
            context_dictionaryToCreate[context_c] = true;
          }
          context_wc = context_w + context_c;
          if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
            context_w = context_wc;
          } else {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            context_dictionary[context_wc] = context_dictSize++;
            context_w = String(context_c);
          }
        }
        if (context_w !== "") {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 8; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            } else {
              value = 1;
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = 0;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 16; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value & 1;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
        }
        value = 2;
        for (i = 0; i < context_numBits; i++) {
          context_data_val = context_data_val << 1 | value & 1;
          if (context_data_position == bitsPerChar - 1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }
        while (true) {
          context_data_val = context_data_val << 1;
          if (context_data_position == bitsPerChar - 1) {
            context_data.push(getCharFromInt(context_data_val));
            break;
          } else
            context_data_position++;
        }
        return context_data.join("");
      },
      decompress: function(compressed) {
        if (compressed == null)
          return "";
        if (compressed == "")
          return null;
        return LZString2._decompress(compressed.length, 32768, function(index2) {
          return compressed.charCodeAt(index2);
        });
      },
      _decompress: function(length, resetValue, getNextValue) {
        var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w2, bits, resb, maxpower, power, c2, data = { val: getNextValue(0), position: resetValue, index: 1 };
        for (i = 0; i < 3; i += 1) {
          dictionary[i] = i;
        }
        bits = 0;
        maxpower = Math.pow(2, 2);
        power = 1;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        switch (bits) {
          case 0:
            bits = 0;
            maxpower = Math.pow(2, 8);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            c2 = f2(bits);
            break;
          case 1:
            bits = 0;
            maxpower = Math.pow(2, 16);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            c2 = f2(bits);
            break;
          case 2:
            return "";
        }
        dictionary[3] = c2;
        w2 = c2;
        result.push(c2);
        while (true) {
          if (data.index > length) {
            return "";
          }
          bits = 0;
          maxpower = Math.pow(2, numBits);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (c2 = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              dictionary[dictSize++] = f2(bits);
              c2 = dictSize - 1;
              enlargeIn--;
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              dictionary[dictSize++] = f2(bits);
              c2 = dictSize - 1;
              enlargeIn--;
              break;
            case 2:
              return result.join("");
          }
          if (enlargeIn == 0) {
            enlargeIn = Math.pow(2, numBits);
            numBits++;
          }
          if (dictionary[c2]) {
            entry = dictionary[c2];
          } else {
            if (c2 === dictSize) {
              entry = w2 + w2.charAt(0);
            } else {
              return null;
            }
          }
          result.push(entry);
          dictionary[dictSize++] = w2 + entry.charAt(0);
          enlargeIn--;
          w2 = entry;
          if (enlargeIn == 0) {
            enlargeIn = Math.pow(2, numBits);
            numBits++;
          }
        }
      }
    };
    return LZString2;
  }();
  if (module2 != null) {
    module2.exports = LZString;
  }
})(lzString);
function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var printProps = function printProps2(keys7, props, config2, indentation, depth, refs, printer2) {
  var indentationNext = indentation + config2.indent;
  var colors = config2.colors;
  return keys7.map(function(key) {
    var value = props[key];
    var printed = printer2(value, config2, indentationNext, depth, refs);
    if (typeof value !== "string") {
      if (printed.indexOf("\n") !== -1) {
        printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
      }
      printed = "{" + printed + "}";
    }
    return config2.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
  }).join("");
};
var NodeTypeTextNode = 3;
var printChildren = function printChildren2(children2, config2, indentation, depth, refs, printer2) {
  return children2.map(function(child) {
    var printedChild = typeof child === "string" ? printText(child, config2) : printer2(child, config2, indentation, depth, refs);
    if (printedChild === "" && typeof child === "object" && child !== null && child.nodeType !== NodeTypeTextNode) {
      return "";
    }
    return config2.spacingOuter + indentation + printedChild;
  }).join("");
};
var printText = function printText2(text2, config2) {
  var contentColor = config2.colors.content;
  return contentColor.open + escapeHTML(text2) + contentColor.close;
};
var printComment = function printComment2(comment, config2) {
  var commentColor = config2.colors.comment;
  return commentColor.open + "<!--" + escapeHTML(comment) + "-->" + commentColor.close;
};
var printElement = function printElement2(type3, printedProps, printedChildren, config2, indentation) {
  var tagColor = config2.colors.tag;
  return tagColor.open + "<" + type3 + (printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config2.spacingOuter + indentation + tagColor.open + "</" + type3 : (printedProps && !config2.min ? "" : " ") + "/") + ">" + tagColor.close;
};
var printElementAsLeaf = function printElementAsLeaf2(type3, config2) {
  var tagColor = config2.colors.tag;
  return tagColor.open + "<" + type3 + tagColor.close + " \u2026" + tagColor.open + " />" + tagColor.close;
};
var ELEMENT_NODE$1 = 1;
var TEXT_NODE$1 = 3;
var COMMENT_NODE$1 = 8;
var FRAGMENT_NODE = 11;
var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
var testNode = function testNode2(val) {
  var constructorName = val.constructor.name;
  var nodeType = val.nodeType, tagName = val.tagName;
  var isCustomElement = typeof tagName === "string" && tagName.includes("-") || typeof val.hasAttribute === "function" && val.hasAttribute("is");
  return nodeType === ELEMENT_NODE$1 && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$1 && constructorName === "Text" || nodeType === COMMENT_NODE$1 && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
};
function nodeIsText(node) {
  return node.nodeType === TEXT_NODE$1;
}
function nodeIsComment(node) {
  return node.nodeType === COMMENT_NODE$1;
}
function nodeIsFragment(node) {
  return node.nodeType === FRAGMENT_NODE;
}
function createDOMElementFilter(filterNode) {
  return {
    test: function test2(val) {
      var _val$constructor2;
      return (val == null ? void 0 : (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) && testNode(val);
    },
    serialize: function serialize2(node, config2, indentation, depth, refs, printer2) {
      if (nodeIsText(node)) {
        return printText(node.data, config2);
      }
      if (nodeIsComment(node)) {
        return printComment(node.data, config2);
      }
      var type3 = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
      if (++depth > config2.maxDepth) {
        return printElementAsLeaf(type3, config2);
      }
      return printElement(type3, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes).map(function(attr2) {
        return attr2.name;
      }).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce(function(props, attribute) {
        props[attribute.name] = attribute.value;
        return props;
      }, {}), config2, indentation + config2.indent, depth, refs, printer2), printChildren(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config2, indentation + config2.indent, depth, refs, printer2), config2, indentation);
    }
  };
}
var chalk = null;
var readFileSync = null;
var codeFrameColumns = null;
try {
  var nodeRequire = module && module.require;
  readFileSync = nodeRequire.call(module, "fs").readFileSync;
  codeFrameColumns = nodeRequire.call(module, "@babel/code-frame").codeFrameColumns;
  chalk = nodeRequire.call(module, "chalk");
} catch (_unused) {
}
function getCodeFrame(frame) {
  var locationStart = frame.indexOf("(") + 1;
  var locationEnd = frame.indexOf(")");
  var frameLocation = frame.slice(locationStart, locationEnd);
  var frameLocationElements = frameLocation.split(":");
  var _ref = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)], filename = _ref[0], line = _ref[1], column = _ref[2];
  var rawFileContents = "";
  try {
    rawFileContents = readFileSync(filename, "utf-8");
  } catch (_unused2) {
    return "";
  }
  var codeFrame = codeFrameColumns(rawFileContents, {
    start: {
      line,
      column
    }
  }, {
    highlightCode: true,
    linesBelow: 0
  });
  return chalk.dim(frameLocation) + "\n" + codeFrame + "\n";
}
function getUserCodeFrame() {
  if (!readFileSync || !codeFrameColumns) {
    return "";
  }
  var err = new Error();
  var firstClientCodeFrame = err.stack.split("\n").slice(1).find(function(frame) {
    return !frame.includes("node_modules/");
  });
  return getCodeFrame(firstClientCodeFrame);
}
var TEXT_NODE$2 = 3;
function jestFakeTimersAreEnabled$1() {
  if (typeof jest !== "undefined" && jest !== null) {
    return setTimeout._isMockFunction === true || Object.prototype.hasOwnProperty.call(setTimeout, "clock");
  }
  return false;
}
function getDocument$2() {
  if (typeof window === "undefined") {
    throw new Error("Could not find default container");
  }
  return window.document;
}
function getWindowFromNode$1(node) {
  if (node.defaultView) {
    return node.defaultView;
  } else if (node.ownerDocument && node.ownerDocument.defaultView) {
    return node.ownerDocument.defaultView;
  } else if (node.window) {
    return node.window;
  } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
    throw new Error("It looks like the window object is not available for the provided node.");
  } else if (node.then instanceof Function) {
    throw new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?");
  } else if (Array.isArray(node)) {
    throw new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?");
  } else if (typeof node.debug === "function" && typeof node.logTestingPlaygroundURL === "function") {
    throw new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?");
  } else {
    throw new Error("The given node is not an Element, the node type is: " + typeof node + ".");
  }
}
function checkContainerType$1(container) {
  if (!container || !(typeof container.querySelector === "function") || !(typeof container.querySelectorAll === "function")) {
    throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + getTypeName(container) + ".");
  }
  function getTypeName(object) {
    if (typeof object === "object") {
      return object === null ? "null" : object.constructor.name;
    }
    return typeof object;
  }
}
var DEFAULT_IGNORE_TAGS = "script, style";
var _excluded$1 = ["filterNode"];
var inNode = function inNode2() {
  return typeof process !== "undefined" && process.versions !== void 0 && process.versions.node !== void 0;
};
var DOMCollection = plugins_1.DOMCollection;
var ELEMENT_NODE = 1;
var COMMENT_NODE = 8;
function filterCommentsAndDefaultIgnoreTagsTags(value) {
  return value.nodeType !== COMMENT_NODE && (value.nodeType !== ELEMENT_NODE || !value.matches(DEFAULT_IGNORE_TAGS));
}
function prettyDOM(dom2, maxLength, options) {
  if (options === void 0) {
    options = {};
  }
  if (!dom2) {
    dom2 = getDocument$2().body;
  }
  if (typeof maxLength !== "number") {
    maxLength = typeof process !== "undefined" && {}.DEBUG_PRINT_LIMIT || 7e3;
  }
  if (maxLength === 0) {
    return "";
  }
  if (dom2.documentElement) {
    dom2 = dom2.documentElement;
  }
  var domTypeName = typeof dom2;
  if (domTypeName === "object") {
    domTypeName = dom2.constructor.name;
  } else {
    dom2 = {};
  }
  if (!("outerHTML" in dom2)) {
    throw new TypeError("Expected an element or document but got " + domTypeName);
  }
  var _options = options, _options$filterNode = _options.filterNode, filterNode = _options$filterNode === void 0 ? filterCommentsAndDefaultIgnoreTagsTags : _options$filterNode, prettyFormatOptions = _objectWithoutPropertiesLoose(_options, _excluded$1);
  var debugContent = format_1(dom2, _extends({
    plugins: [createDOMElementFilter(filterNode), DOMCollection],
    printFunctionName: false,
    highlight: inNode()
  }, prettyFormatOptions));
  return maxLength !== void 0 && dom2.outerHTML.length > maxLength ? debugContent.slice(0, maxLength) + "..." : debugContent;
}
var logDOM = function logDOM2() {
  var userCodeFrame = getUserCodeFrame();
  if (userCodeFrame) {
    console.log(prettyDOM.apply(void 0, arguments) + "\n\n" + userCodeFrame);
  } else {
    console.log(prettyDOM.apply(void 0, arguments));
  }
};
var config = {
  testIdAttribute: "data-testid",
  asyncUtilTimeout: 1e3,
  asyncWrapper: function asyncWrapper(cb) {
    return cb();
  },
  unstable_advanceTimersWrapper: function unstable_advanceTimersWrapper(cb) {
    return cb();
  },
  eventWrapper: function eventWrapper(cb) {
    return cb();
  },
  defaultHidden: false,
  showOriginalStackTrace: false,
  throwSuggestions: false,
  getElementError: function getElementError(message, container) {
    var prettifiedDOM = prettyDOM(container);
    var error2 = new Error([message, "Ignored nodes: comments, <script />, <style />\n" + prettifiedDOM].filter(Boolean).join("\n\n"));
    error2.name = "TestingLibraryElementError";
    return error2;
  },
  _disableExpensiveErrorDiagnostics: false,
  computedStyleSupportsPseudoElements: false
};
function runWithExpensiveErrorDiagnosticsDisabled(callback) {
  try {
    config._disableExpensiveErrorDiagnostics = true;
    return callback();
  } finally {
    config._disableExpensiveErrorDiagnostics = false;
  }
}
function configure(newConfig) {
  if (typeof newConfig === "function") {
    newConfig = newConfig(config);
  }
  config = _extends({}, config, newConfig);
}
function getConfig() {
  return config;
}
var labelledNodeNames = ["button", "meter", "output", "progress", "select", "textarea", "input"];
function getTextContent(node) {
  if (labelledNodeNames.includes(node.nodeName.toLowerCase())) {
    return "";
  }
  if (node.nodeType === TEXT_NODE$2)
    return node.textContent;
  return Array.from(node.childNodes).map(function(childNode) {
    return getTextContent(childNode);
  }).join("");
}
function getLabelContent(element2) {
  var textContent;
  if (element2.tagName.toLowerCase() === "label") {
    textContent = getTextContent(element2);
  } else {
    textContent = element2.value || element2.textContent;
  }
  return textContent;
}
function getRealLabels(element2) {
  if (element2.labels !== void 0) {
    var _labels;
    return (_labels = element2.labels) != null ? _labels : [];
  }
  if (!isLabelable(element2))
    return [];
  var labels = element2.ownerDocument.querySelectorAll("label");
  return Array.from(labels).filter(function(label) {
    return label.control === element2;
  });
}
function isLabelable(element2) {
  return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element2.tagName) || element2.tagName === "INPUT" && element2.getAttribute("type") !== "hidden";
}
function getLabels(container, element2, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$selector = _ref.selector, selector = _ref$selector === void 0 ? "*" : _ref$selector;
  var ariaLabelledBy = element2.getAttribute("aria-labelledby");
  var labelsId = ariaLabelledBy ? ariaLabelledBy.split(" ") : [];
  return labelsId.length ? labelsId.map(function(labelId) {
    var labellingElement = container.querySelector('[id="' + labelId + '"]');
    return labellingElement ? {
      content: getLabelContent(labellingElement),
      formControl: null
    } : {
      content: "",
      formControl: null
    };
  }) : Array.from(getRealLabels(element2)).map(function(label) {
    var textToMatch = getLabelContent(label);
    var formControlSelector = "button, input, meter, output, progress, select, textarea";
    var labelledFormControl = Array.from(label.querySelectorAll(formControlSelector)).filter(function(formControlElement) {
      return formControlElement.matches(selector);
    })[0];
    return {
      content: textToMatch,
      formControl: labelledFormControl
    };
  });
}
function assertNotNullOrUndefined(matcher) {
  if (matcher === null || matcher === void 0) {
    throw new Error("It looks like " + matcher + " was passed instead of a matcher. Did you do something like getByText(" + matcher + ")?");
  }
}
function fuzzyMatches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch !== "string") {
    return false;
  }
  assertNotNullOrUndefined(matcher);
  var normalizedText = normalizer(textToMatch);
  if (typeof matcher === "string" || typeof matcher === "number") {
    return normalizedText.toLowerCase().includes(matcher.toString().toLowerCase());
  } else if (typeof matcher === "function") {
    return matcher(normalizedText, node);
  } else {
    return matchRegExp(matcher, normalizedText);
  }
}
function matches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch !== "string") {
    return false;
  }
  assertNotNullOrUndefined(matcher);
  var normalizedText = normalizer(textToMatch);
  if (matcher instanceof Function) {
    return matcher(normalizedText, node);
  } else if (matcher instanceof RegExp) {
    return matchRegExp(matcher, normalizedText);
  } else {
    return normalizedText === String(matcher);
  }
}
function getDefaultNormalizer(_temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$trim = _ref.trim, trim = _ref$trim === void 0 ? true : _ref$trim, _ref$collapseWhitespa = _ref.collapseWhitespace, collapseWhitespace = _ref$collapseWhitespa === void 0 ? true : _ref$collapseWhitespa;
  return function(text2) {
    var normalizedText = text2;
    normalizedText = trim ? normalizedText.trim() : normalizedText;
    normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, " ") : normalizedText;
    return normalizedText;
  };
}
function makeNormalizer(_ref2) {
  var trim = _ref2.trim, collapseWhitespace = _ref2.collapseWhitespace, normalizer = _ref2.normalizer;
  if (!normalizer) {
    return getDefaultNormalizer({
      trim,
      collapseWhitespace
    });
  }
  if (typeof trim !== "undefined" || typeof collapseWhitespace !== "undefined") {
    throw new Error('trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
  }
  return normalizer;
}
function matchRegExp(matcher, text2) {
  var match = matcher.test(text2);
  if (matcher.global && matcher.lastIndex !== 0) {
    console.warn("To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp.");
    matcher.lastIndex = 0;
  }
  return match;
}
function getNodeText(node) {
  if (node.matches("input[type=submit], input[type=button], input[type=reset]")) {
    return node.value;
  }
  return Array.from(node.childNodes).filter(function(child) {
    return child.nodeType === TEXT_NODE$2 && Boolean(child.textContent);
  }).map(function(c2) {
    return c2.textContent;
  }).join("");
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it)
    return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it)
      o = it;
    var i = 0;
    return function() {
      if (i >= o.length)
        return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var elementRoleList = buildElementRoleList(elementRoles_1);
function isSubtreeInaccessible(element2) {
  if (element2.hidden === true) {
    return true;
  }
  if (element2.getAttribute("aria-hidden") === "true") {
    return true;
  }
  var window2 = element2.ownerDocument.defaultView;
  if (window2.getComputedStyle(element2).display === "none") {
    return true;
  }
  return false;
}
function isInaccessible(element2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$isSubtreeIna = _options.isSubtreeInaccessible, isSubtreeInaccessibleImpl = _options$isSubtreeIna === void 0 ? isSubtreeInaccessible : _options$isSubtreeIna;
  var window2 = element2.ownerDocument.defaultView;
  if (window2.getComputedStyle(element2).visibility === "hidden") {
    return true;
  }
  var currentElement = element2;
  while (currentElement) {
    if (isSubtreeInaccessibleImpl(currentElement)) {
      return true;
    }
    currentElement = currentElement.parentElement;
  }
  return false;
}
function getImplicitAriaRoles(currentNode) {
  for (var _iterator = _createForOfIteratorHelperLoose(elementRoleList), _step; !(_step = _iterator()).done; ) {
    var _step$value = _step.value, match = _step$value.match, roles2 = _step$value.roles;
    if (match(currentNode)) {
      return [].concat(roles2);
    }
  }
  return [];
}
function buildElementRoleList(elementRolesMap) {
  function makeElementSelector(_ref) {
    var name = _ref.name, attributes = _ref.attributes;
    return "" + name + attributes.map(function(_ref2) {
      var attributeName = _ref2.name, value = _ref2.value, _ref2$constraints = _ref2.constraints, constraints = _ref2$constraints === void 0 ? [] : _ref2$constraints;
      var shouldNotExist = constraints.indexOf("undefined") !== -1;
      if (shouldNotExist) {
        return ":not([" + attributeName + "])";
      } else if (value) {
        return "[" + attributeName + '="' + value + '"]';
      } else {
        return "[" + attributeName + "]";
      }
    }).join("");
  }
  function getSelectorSpecificity(_ref3) {
    var _ref3$attributes = _ref3.attributes, attributes = _ref3$attributes === void 0 ? [] : _ref3$attributes;
    return attributes.length;
  }
  function bySelectorSpecificity(_ref4, _ref5) {
    var leftSpecificity = _ref4.specificity;
    var rightSpecificity = _ref5.specificity;
    return rightSpecificity - leftSpecificity;
  }
  function match(element3) {
    return function(node) {
      var _element$attributes = element3.attributes, attributes = _element$attributes === void 0 ? [] : _element$attributes;
      var typeTextIndex = attributes.findIndex(function(attribute) {
        return attribute.value && attribute.name === "type" && attribute.value === "text";
      });
      if (typeTextIndex >= 0) {
        attributes = [].concat(attributes.slice(0, typeTextIndex), attributes.slice(typeTextIndex + 1));
        if (node.type !== "text") {
          return false;
        }
      }
      return node.matches(makeElementSelector(_extends({}, element3, {
        attributes
      })));
    };
  }
  var result = [];
  for (var _iterator2 = _createForOfIteratorHelperLoose(elementRolesMap.entries()), _step2; !(_step2 = _iterator2()).done; ) {
    var _step2$value = _step2.value, element2 = _step2$value[0], roles2 = _step2$value[1];
    result = [].concat(result, [{
      match: match(element2),
      roles: Array.from(roles2),
      specificity: getSelectorSpecificity(element2)
    }]);
  }
  return result.sort(bySelectorSpecificity);
}
function getRoles(container, _temp) {
  var _ref6 = _temp === void 0 ? {} : _temp, _ref6$hidden = _ref6.hidden, hidden = _ref6$hidden === void 0 ? false : _ref6$hidden;
  function flattenDOM(node) {
    return [node].concat(Array.from(node.children).reduce(function(acc, child) {
      return [].concat(acc, flattenDOM(child));
    }, []));
  }
  return flattenDOM(container).filter(function(element2) {
    return hidden === false ? isInaccessible(element2) === false : true;
  }).reduce(function(acc, node) {
    var roles2 = [];
    if (node.hasAttribute("role")) {
      roles2 = node.getAttribute("role").split(" ").slice(0, 1);
    } else {
      roles2 = getImplicitAriaRoles(node);
    }
    return roles2.reduce(function(rolesAcc, role) {
      var _extends2, _extends3;
      return Array.isArray(rolesAcc[role]) ? _extends({}, rolesAcc, (_extends2 = {}, _extends2[role] = [].concat(rolesAcc[role], [node]), _extends2)) : _extends({}, rolesAcc, (_extends3 = {}, _extends3[role] = [node], _extends3));
    }, acc);
  }, {});
}
function prettyRoles(dom2, _ref7) {
  var hidden = _ref7.hidden, includeDescription = _ref7.includeDescription;
  var roles2 = getRoles(dom2, {
    hidden
  });
  return Object.entries(roles2).filter(function(_ref8) {
    var role = _ref8[0];
    return role !== "generic";
  }).map(function(_ref9) {
    var role = _ref9[0], elements = _ref9[1];
    var delimiterBar = "-".repeat(50);
    var elementsString = elements.map(function(el) {
      var nameString = 'Name "' + computeAccessibleName(el, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      }) + '":\n';
      var domString = prettyDOM(el.cloneNode(false));
      if (includeDescription) {
        var descriptionString = 'Description "' + computeAccessibleDescription(el, {
          computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
        }) + '":\n';
        return "" + nameString + descriptionString + domString;
      }
      return "" + nameString + domString;
    }).join("\n\n");
    return role + ":\n\n" + elementsString + "\n\n" + delimiterBar;
  }).join("\n");
}
var logRoles = function logRoles2(dom2, _temp2) {
  var _ref10 = _temp2 === void 0 ? {} : _temp2, _ref10$hidden = _ref10.hidden, hidden = _ref10$hidden === void 0 ? false : _ref10$hidden;
  return console.log(prettyRoles(dom2, {
    hidden
  }));
};
function computeAriaSelected(element2) {
  if (element2.tagName === "OPTION") {
    return element2.selected;
  }
  return checkBooleanAttribute(element2, "aria-selected");
}
function computeAriaChecked(element2) {
  if ("indeterminate" in element2 && element2.indeterminate) {
    return void 0;
  }
  if ("checked" in element2) {
    return element2.checked;
  }
  return checkBooleanAttribute(element2, "aria-checked");
}
function computeAriaPressed(element2) {
  return checkBooleanAttribute(element2, "aria-pressed");
}
function computeAriaCurrent(element2) {
  var _ref11, _checkBooleanAttribut;
  return (_ref11 = (_checkBooleanAttribut = checkBooleanAttribute(element2, "aria-current")) != null ? _checkBooleanAttribut : element2.getAttribute("aria-current")) != null ? _ref11 : false;
}
function computeAriaExpanded(element2) {
  return checkBooleanAttribute(element2, "aria-expanded");
}
function checkBooleanAttribute(element2, attribute) {
  var attributeValue = element2.getAttribute(attribute);
  if (attributeValue === "true") {
    return true;
  }
  if (attributeValue === "false") {
    return false;
  }
  return void 0;
}
function computeHeadingLevel(element2) {
  var implicitHeadingLevels = {
    H1: 1,
    H2: 2,
    H3: 3,
    H4: 4,
    H5: 5,
    H6: 6
  };
  var ariaLevelAttribute = element2.getAttribute("aria-level") && Number(element2.getAttribute("aria-level"));
  return ariaLevelAttribute || implicitHeadingLevels[element2.tagName];
}
var normalize = getDefaultNormalizer();
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}
function getRegExpMatcher(string) {
  return new RegExp(escapeRegExp(string.toLowerCase()), "i");
}
function makeSuggestion(queryName, element2, content, _ref) {
  var variant = _ref.variant, name = _ref.name;
  var warning = "";
  var queryOptions = {};
  var queryArgs = [["Role", "TestId"].includes(queryName) ? content : getRegExpMatcher(content)];
  if (name) {
    queryOptions.name = getRegExpMatcher(name);
  }
  if (queryName === "Role" && isInaccessible(element2)) {
    queryOptions.hidden = true;
    warning = "Element is inaccessible. This means that the element and all its children are invisible to screen readers.\n    If you are using the aria-hidden prop, make sure this is the right choice for your case.\n    ";
  }
  if (Object.keys(queryOptions).length > 0) {
    queryArgs.push(queryOptions);
  }
  var queryMethod = variant + "By" + queryName;
  return {
    queryName,
    queryMethod,
    queryArgs,
    variant,
    warning,
    toString: function toString2() {
      if (warning) {
        console.warn(warning);
      }
      var text2 = queryArgs[0], options = queryArgs[1];
      text2 = typeof text2 === "string" ? "'" + text2 + "'" : text2;
      options = options ? ", { " + Object.entries(options).map(function(_ref2) {
        var k = _ref2[0], v2 = _ref2[1];
        return k + ": " + v2;
      }).join(", ") + " }" : "";
      return queryMethod + "(" + text2 + options + ")";
    }
  };
}
function canSuggest(currentMethod, requestedMethod, data) {
  return data && (!requestedMethod || requestedMethod.toLowerCase() === currentMethod.toLowerCase());
}
function getSuggestedQuery(element2, variant, method) {
  var _element$getAttribute, _getImplicitAriaRoles;
  if (variant === void 0) {
    variant = "get";
  }
  if (element2.matches(DEFAULT_IGNORE_TAGS)) {
    return void 0;
  }
  var role = (_element$getAttribute = element2.getAttribute("role")) != null ? _element$getAttribute : (_getImplicitAriaRoles = getImplicitAriaRoles(element2)) == null ? void 0 : _getImplicitAriaRoles[0];
  if (role !== "generic" && canSuggest("Role", method, role)) {
    return makeSuggestion("Role", element2, role, {
      variant,
      name: computeAccessibleName(element2, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      })
    });
  }
  var labelText = getLabels(document, element2).map(function(label) {
    return label.content;
  }).join(" ");
  if (canSuggest("LabelText", method, labelText)) {
    return makeSuggestion("LabelText", element2, labelText, {
      variant
    });
  }
  var placeholderText = element2.getAttribute("placeholder");
  if (canSuggest("PlaceholderText", method, placeholderText)) {
    return makeSuggestion("PlaceholderText", element2, placeholderText, {
      variant
    });
  }
  var textContent = normalize(getNodeText(element2));
  if (canSuggest("Text", method, textContent)) {
    return makeSuggestion("Text", element2, textContent, {
      variant
    });
  }
  if (canSuggest("DisplayValue", method, element2.value)) {
    return makeSuggestion("DisplayValue", element2, normalize(element2.value), {
      variant
    });
  }
  var alt = element2.getAttribute("alt");
  if (canSuggest("AltText", method, alt)) {
    return makeSuggestion("AltText", element2, alt, {
      variant
    });
  }
  var title = element2.getAttribute("title");
  if (canSuggest("Title", method, title)) {
    return makeSuggestion("Title", element2, title, {
      variant
    });
  }
  var testId = element2.getAttribute(getConfig().testIdAttribute);
  if (canSuggest("TestId", method, testId)) {
    return makeSuggestion("TestId", element2, testId, {
      variant
    });
  }
  return void 0;
}
function copyStackTrace(target, source) {
  target.stack = source.stack.replace(source.message, target.message);
}
function waitFor(callback, _ref) {
  var _ref$container = _ref.container, container = _ref$container === void 0 ? getDocument$2() : _ref$container, _ref$timeout = _ref.timeout, timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout, _ref$showOriginalStac = _ref.showOriginalStackTrace, showOriginalStackTrace = _ref$showOriginalStac === void 0 ? getConfig().showOriginalStackTrace : _ref$showOriginalStac, stackTraceError = _ref.stackTraceError, _ref$interval = _ref.interval, interval = _ref$interval === void 0 ? 50 : _ref$interval, _ref$onTimeout = _ref.onTimeout, onTimeout = _ref$onTimeout === void 0 ? function(error2) {
    error2.message = getConfig().getElementError(error2.message, container).message;
    return error2;
  } : _ref$onTimeout, _ref$mutationObserver = _ref.mutationObserverOptions, mutationObserverOptions = _ref$mutationObserver === void 0 ? {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  } : _ref$mutationObserver;
  if (typeof callback !== "function") {
    throw new TypeError("Received `callback` arg must be a function");
  }
  return new Promise(/* @__PURE__ */ function() {
    var _ref2 = _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee2(resolve, reject) {
      var lastError, intervalId, observer, finished, promiseStatus, overallTimeoutTimer, usingJestFakeTimers, _getConfig, advanceTimersWrapper, error2, _getWindowFromNode, MutationObserver, onDone, checkRealTimersCallback, checkCallback, handleTimeout;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              handleTimeout = function _handleTimeout() {
                var error3;
                if (lastError) {
                  error3 = lastError;
                  if (!showOriginalStackTrace && error3.name === "TestingLibraryElementError") {
                    copyStackTrace(error3, stackTraceError);
                  }
                } else {
                  error3 = new Error("Timed out in waitFor.");
                  if (!showOriginalStackTrace) {
                    copyStackTrace(error3, stackTraceError);
                  }
                }
                onDone(onTimeout(error3), null);
              };
              checkCallback = function _checkCallback() {
                if (promiseStatus === "pending")
                  return;
                try {
                  var result = runWithExpensiveErrorDiagnosticsDisabled(callback);
                  if (typeof (result == null ? void 0 : result.then) === "function") {
                    promiseStatus = "pending";
                    result.then(function(resolvedValue) {
                      promiseStatus = "resolved";
                      onDone(null, resolvedValue);
                    }, function(rejectedValue) {
                      promiseStatus = "rejected";
                      lastError = rejectedValue;
                    });
                  } else {
                    onDone(null, result);
                  }
                } catch (error3) {
                  lastError = error3;
                }
              };
              checkRealTimersCallback = function _checkRealTimersCallb() {
                if (jestFakeTimersAreEnabled$1()) {
                  var _error = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
                  if (!showOriginalStackTrace)
                    copyStackTrace(_error, stackTraceError);
                  return reject(_error);
                } else {
                  return checkCallback();
                }
              };
              onDone = function _onDone(error3, result) {
                finished = true;
                clearTimeout(overallTimeoutTimer);
                if (!usingJestFakeTimers) {
                  clearInterval(intervalId);
                  observer.disconnect();
                }
                if (error3) {
                  reject(error3);
                } else {
                  resolve(result);
                }
              };
              finished = false;
              promiseStatus = "idle";
              overallTimeoutTimer = setTimeout(handleTimeout, timeout);
              usingJestFakeTimers = jestFakeTimersAreEnabled$1();
              if (!usingJestFakeTimers) {
                _context2.next = 27;
                break;
              }
              _getConfig = getConfig(), advanceTimersWrapper = _getConfig.unstable_advanceTimersWrapper;
              checkCallback();
            case 11:
              if (finished) {
                _context2.next = 25;
                break;
              }
              if (jestFakeTimersAreEnabled$1()) {
                _context2.next = 17;
                break;
              }
              error2 = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
              if (!showOriginalStackTrace)
                copyStackTrace(error2, stackTraceError);
              reject(error2);
              return _context2.abrupt("return");
            case 17:
              advanceTimersWrapper(function() {
                jest.advanceTimersByTime(interval);
              });
              checkCallback();
              if (!finished) {
                _context2.next = 21;
                break;
              }
              return _context2.abrupt("break", 25);
            case 21:
              _context2.next = 23;
              return advanceTimersWrapper(/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee() {
                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return new Promise(function(r2) {
                          setTimeout(r2, 0);
                          jest.advanceTimersByTime(0);
                        });
                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));
            case 23:
              _context2.next = 11;
              break;
            case 25:
              _context2.next = 40;
              break;
            case 27:
              _context2.prev = 27;
              checkContainerType$1(container);
              _context2.next = 35;
              break;
            case 31:
              _context2.prev = 31;
              _context2.t0 = _context2["catch"](27);
              reject(_context2.t0);
              return _context2.abrupt("return");
            case 35:
              intervalId = setInterval(checkRealTimersCallback, interval);
              _getWindowFromNode = getWindowFromNode$1(container), MutationObserver = _getWindowFromNode.MutationObserver;
              observer = new MutationObserver(checkRealTimersCallback);
              observer.observe(container, mutationObserverOptions);
              checkCallback();
            case 40:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[27, 31]]);
    }));
    return function(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}
function waitForWrapper(callback, options) {
  var stackTraceError = new Error("STACK_TRACE_MESSAGE");
  return getConfig().asyncWrapper(function() {
    return waitFor(callback, _extends({
      stackTraceError
    }, options));
  });
}
function getElementError2(message, container) {
  return getConfig().getElementError(message, container);
}
function getMultipleElementsFoundError(message, container) {
  return getElementError2(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
}
function queryAllByAttribute(attribute, container, text2, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$exact = _ref.exact, exact = _ref$exact === void 0 ? true : _ref$exact, collapseWhitespace = _ref.collapseWhitespace, trim = _ref.trim, normalizer = _ref.normalizer;
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll("[" + attribute + "]")).filter(function(node) {
    return matcher(node.getAttribute(attribute), node, text2, matchNormalizer);
  });
}
function queryByAttribute(attribute, container, text2, options) {
  var els = queryAllByAttribute(attribute, container, text2, options);
  if (els.length > 1) {
    throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text2 + "]", container);
  }
  return els[0] || null;
}
function makeSingleQuery(allQuery, getMultipleError10) {
  return function(container) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var els = allQuery.apply(void 0, [container].concat(args));
    if (els.length > 1) {
      var elementStrings = els.map(function(element2) {
        return getElementError2(null, element2).message;
      }).join("\n\n");
      throw getMultipleElementsFoundError(getMultipleError10.apply(void 0, [container].concat(args)) + "\n\nHere are the matching elements:\n\n" + elementStrings, container);
    }
    return els[0] || null;
  };
}
function getSuggestionError(suggestion, container) {
  return getConfig().getElementError("A better query is available, try this:\n" + suggestion.toString() + "\n", container);
}
function makeGetAllQuery(allQuery, getMissingError9) {
  return function(container) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var els = allQuery.apply(void 0, [container].concat(args));
    if (!els.length) {
      throw getConfig().getElementError(getMissingError9.apply(void 0, [container].concat(args)), container);
    }
    return els;
  };
}
function makeFindQuery(getter) {
  return function(container, text2, options, waitForOptions) {
    return waitForWrapper(function() {
      return getter(container, text2, options);
    }, _extends({
      container
    }, waitForOptions));
  };
}
var wrapSingleQueryWithSuggestion = function wrapSingleQueryWithSuggestion2(query, queryAllByName, variant) {
  return function(container) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    var element2 = query.apply(void 0, [container].concat(args));
    var _ref2 = args.slice(-1), _ref2$ = _ref2[0];
    _ref2$ = _ref2$ === void 0 ? {} : _ref2$;
    var _ref2$$suggest = _ref2$.suggest, suggest = _ref2$$suggest === void 0 ? getConfig().throwSuggestions : _ref2$$suggest;
    if (element2 && suggest) {
      var suggestion = getSuggestedQuery(element2, variant);
      if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) {
        throw getSuggestionError(suggestion.toString(), container);
      }
    }
    return element2;
  };
};
var wrapAllByQueryWithSuggestion = function wrapAllByQueryWithSuggestion2(query, queryAllByName, variant) {
  return function(container) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    var els = query.apply(void 0, [container].concat(args));
    var _ref3 = args.slice(-1), _ref3$ = _ref3[0];
    _ref3$ = _ref3$ === void 0 ? {} : _ref3$;
    var _ref3$$suggest = _ref3$.suggest, suggest = _ref3$$suggest === void 0 ? getConfig().throwSuggestions : _ref3$$suggest;
    if (els.length && suggest) {
      var uniqueSuggestionMessages = [].concat(new Set(els.map(function(element2) {
        var _getSuggestedQuery;
        return (_getSuggestedQuery = getSuggestedQuery(element2, variant)) == null ? void 0 : _getSuggestedQuery.toString();
      })));
      if (uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith(getSuggestedQuery(els[0], variant).queryName)) {
        throw getSuggestionError(uniqueSuggestionMessages[0], container);
      }
    }
    return els;
  };
};
function buildQueries(queryAllBy, getMultipleError10, getMissingError9) {
  var queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError10), queryAllBy.name, "query");
  var getAllBy = makeGetAllQuery(queryAllBy, getMissingError9);
  var getBy = makeSingleQuery(getAllBy, getMultipleError10);
  var getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "get");
  var getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace("query", "get"), "getAll");
  var findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, "findAll"));
  var findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "find"));
  return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
}
var queryHelpers = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getElementError: getElementError2,
  wrapAllByQueryWithSuggestion,
  wrapSingleQueryWithSuggestion,
  getMultipleElementsFoundError,
  queryAllByAttribute,
  queryByAttribute,
  makeSingleQuery,
  makeGetAllQuery,
  makeFindQuery,
  buildQueries
});
function queryAllLabels(container) {
  return Array.from(container.querySelectorAll("label,input")).map(function(node) {
    return {
      node,
      textToMatch: getLabelContent(node)
    };
  }).filter(function(_ref) {
    var textToMatch = _ref.textToMatch;
    return textToMatch !== null;
  });
}
var queryAllLabelsByText = function queryAllLabelsByText2(container, text2, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp, _ref2$exact = _ref2.exact, exact = _ref2$exact === void 0 ? true : _ref2$exact, trim = _ref2.trim, collapseWhitespace = _ref2.collapseWhitespace, normalizer = _ref2.normalizer;
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  var textToMatchByLabels = queryAllLabels(container);
  return textToMatchByLabels.filter(function(_ref3) {
    var node = _ref3.node, textToMatch = _ref3.textToMatch;
    return matcher(textToMatch, node, text2, matchNormalizer);
  }).map(function(_ref4) {
    var node = _ref4.node;
    return node;
  });
};
var queryAllByLabelText = function queryAllByLabelText2(container, text2, _temp2) {
  var _ref5 = _temp2 === void 0 ? {} : _temp2, _ref5$selector = _ref5.selector, selector = _ref5$selector === void 0 ? "*" : _ref5$selector, _ref5$exact = _ref5.exact, exact = _ref5$exact === void 0 ? true : _ref5$exact, collapseWhitespace = _ref5.collapseWhitespace, trim = _ref5.trim, normalizer = _ref5.normalizer;
  checkContainerType$1(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  var matchingLabelledElements = Array.from(container.querySelectorAll("*")).filter(function(element2) {
    return getRealLabels(element2).length || element2.hasAttribute("aria-labelledby");
  }).reduce(function(labelledElements, labelledElement) {
    var labelList = getLabels(container, labelledElement, {
      selector
    });
    labelList.filter(function(label) {
      return Boolean(label.formControl);
    }).forEach(function(label) {
      if (matcher(label.content, label.formControl, text2, matchNormalizer) && label.formControl)
        labelledElements.push(label.formControl);
    });
    var labelsValue = labelList.filter(function(label) {
      return Boolean(label.content);
    }).map(function(label) {
      return label.content;
    });
    if (matcher(labelsValue.join(" "), labelledElement, text2, matchNormalizer))
      labelledElements.push(labelledElement);
    if (labelsValue.length > 1) {
      labelsValue.forEach(function(labelValue, index2) {
        if (matcher(labelValue, labelledElement, text2, matchNormalizer))
          labelledElements.push(labelledElement);
        var labelsFiltered = [].concat(labelsValue);
        labelsFiltered.splice(index2, 1);
        if (labelsFiltered.length > 1) {
          if (matcher(labelsFiltered.join(" "), labelledElement, text2, matchNormalizer))
            labelledElements.push(labelledElement);
        }
      });
    }
    return labelledElements;
  }, []).concat(queryAllByAttribute("aria-label", container, text2, {
    exact,
    normalizer: matchNormalizer
  }));
  return Array.from(new Set(matchingLabelledElements)).filter(function(element2) {
    return element2.matches(selector);
  });
};
var getAllByLabelText = function getAllByLabelText2(container, text2) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }
  var els = queryAllByLabelText.apply(void 0, [container, text2].concat(rest));
  if (!els.length) {
    var labels = queryAllLabelsByText.apply(void 0, [container, text2].concat(rest));
    if (labels.length) {
      var tagNames = labels.map(function(label) {
        return getTagNameOfElementAssociatedWithLabelViaFor(container, label);
      }).filter(function(tagName) {
        return !!tagName;
      });
      if (tagNames.length) {
        throw getConfig().getElementError(tagNames.map(function(tagName) {
          return "Found a label with the text of: " + text2 + ", however the element associated with this label (<" + tagName + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + tagName + " />, you can use aria-label or aria-labelledby instead.";
        }).join("\n\n"), container);
      } else {
        throw getConfig().getElementError("Found a label with the text of: " + text2 + `, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`, container);
      }
    } else {
      throw getConfig().getElementError("Unable to find a label with the text of: " + text2, container);
    }
  }
  return els;
};
function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
  var htmlFor = label.getAttribute("for");
  if (!htmlFor) {
    return null;
  }
  var element2 = container.querySelector('[id="' + htmlFor + '"]');
  return element2 ? element2.tagName.toLowerCase() : null;
}
var getMultipleError$7 = function getMultipleError(c2, text2) {
  return "Found multiple elements with the text of: " + text2;
};
var queryByLabelText = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllByLabelText, getMultipleError$7), queryAllByLabelText.name, "query");
var getByLabelText = makeSingleQuery(getAllByLabelText, getMultipleError$7);
var findAllByLabelText = makeFindQuery(wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, "findAll"));
var findByLabelText = makeFindQuery(wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, "find"));
var getAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, "getAll");
var getByLabelTextWithSuggestions = wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, "get");
var queryAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByLabelText, queryAllByLabelText.name, "queryAll");
var queryAllByPlaceholderText = function queryAllByPlaceholderText2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  checkContainerType$1(args[0]);
  return queryAllByAttribute.apply(void 0, ["placeholder"].concat(args));
};
var getMultipleError$6 = function getMultipleError2(c2, text2) {
  return "Found multiple elements with the placeholder text of: " + text2;
};
var getMissingError$6 = function getMissingError(c2, text2) {
  return "Unable to find an element with the placeholder text of: " + text2;
};
var queryAllByPlaceholderTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByPlaceholderText, queryAllByPlaceholderText.name, "queryAll");
var _buildQueries$6 = buildQueries(queryAllByPlaceholderText, getMultipleError$6, getMissingError$6), queryByPlaceholderText = _buildQueries$6[0], getAllByPlaceholderText = _buildQueries$6[1], getByPlaceholderText = _buildQueries$6[2], findAllByPlaceholderText = _buildQueries$6[3], findByPlaceholderText = _buildQueries$6[4];
var queryAllByText = function queryAllByText2(container, text2, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$selector = _ref.selector, selector = _ref$selector === void 0 ? "*" : _ref$selector, _ref$exact = _ref.exact, exact = _ref$exact === void 0 ? true : _ref$exact, collapseWhitespace = _ref.collapseWhitespace, trim = _ref.trim, _ref$ignore = _ref.ignore, ignore = _ref$ignore === void 0 ? DEFAULT_IGNORE_TAGS : _ref$ignore, normalizer = _ref.normalizer;
  checkContainerType$1(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  var baseArray = [];
  if (typeof container.matches === "function" && container.matches(selector)) {
    baseArray = [container];
  }
  return [].concat(baseArray, Array.from(container.querySelectorAll(selector))).filter(function(node) {
    return !ignore || !node.matches(ignore);
  }).filter(function(node) {
    return matcher(getNodeText(node), node, text2, matchNormalizer);
  });
};
var getMultipleError$5 = function getMultipleError3(c2, text2) {
  return "Found multiple elements with the text: " + text2;
};
var getMissingError$5 = function getMissingError2(c2, text2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, collapseWhitespace = _options.collapseWhitespace, trim = _options.trim, normalizer = _options.normalizer;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  var normalizedText = matchNormalizer(text2.toString());
  var isNormalizedDifferent = normalizedText !== text2.toString();
  return "Unable to find an element with the text: " + (isNormalizedDifferent ? normalizedText + " (normalized from '" + text2 + "')" : text2) + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
};
var queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText, queryAllByText.name, "queryAll");
var _buildQueries$5 = buildQueries(queryAllByText, getMultipleError$5, getMissingError$5), queryByText = _buildQueries$5[0], getAllByText = _buildQueries$5[1], getByText = _buildQueries$5[2], findAllByText = _buildQueries$5[3], findByText = _buildQueries$5[4];
var queryAllByDisplayValue = function queryAllByDisplayValue2(container, value, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$exact = _ref.exact, exact = _ref$exact === void 0 ? true : _ref$exact, collapseWhitespace = _ref.collapseWhitespace, trim = _ref.trim, normalizer = _ref.normalizer;
  checkContainerType$1(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll("input,textarea,select")).filter(function(node) {
    if (node.tagName === "SELECT") {
      var selectedOptions = Array.from(node.options).filter(function(option) {
        return option.selected;
      });
      return selectedOptions.some(function(optionNode) {
        return matcher(getNodeText(optionNode), optionNode, value, matchNormalizer);
      });
    } else {
      return matcher(node.value, node, value, matchNormalizer);
    }
  });
};
var getMultipleError$4 = function getMultipleError4(c2, value) {
  return "Found multiple elements with the display value: " + value + ".";
};
var getMissingError$4 = function getMissingError3(c2, value) {
  return "Unable to find an element with the display value: " + value + ".";
};
var queryAllByDisplayValueWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByDisplayValue, queryAllByDisplayValue.name, "queryAll");
var _buildQueries$4 = buildQueries(queryAllByDisplayValue, getMultipleError$4, getMissingError$4), queryByDisplayValue = _buildQueries$4[0], getAllByDisplayValue = _buildQueries$4[1], getByDisplayValue = _buildQueries$4[2], findAllByDisplayValue = _buildQueries$4[3], findByDisplayValue = _buildQueries$4[4];
var VALID_TAG_REGEXP = /^(img|input|area|.+-.+)$/i;
var queryAllByAltText = function queryAllByAltText2(container, alt, options) {
  if (options === void 0) {
    options = {};
  }
  checkContainerType$1(container);
  return queryAllByAttribute("alt", container, alt, options).filter(function(node) {
    return VALID_TAG_REGEXP.test(node.tagName);
  });
};
var getMultipleError$3 = function getMultipleError5(c2, alt) {
  return "Found multiple elements with the alt text: " + alt;
};
var getMissingError$3 = function getMissingError4(c2, alt) {
  return "Unable to find an element with the alt text: " + alt;
};
var queryAllByAltTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByAltText, queryAllByAltText.name, "queryAll");
var _buildQueries$3 = buildQueries(queryAllByAltText, getMultipleError$3, getMissingError$3), queryByAltText = _buildQueries$3[0], getAllByAltText = _buildQueries$3[1], getByAltText = _buildQueries$3[2], findAllByAltText = _buildQueries$3[3], findByAltText = _buildQueries$3[4];
var isSvgTitle = function isSvgTitle2(node) {
  var _node$parentElement;
  return node.tagName.toLowerCase() === "title" && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === "svg";
};
var queryAllByTitle = function queryAllByTitle2(container, text2, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$exact = _ref.exact, exact = _ref$exact === void 0 ? true : _ref$exact, collapseWhitespace = _ref.collapseWhitespace, trim = _ref.trim, normalizer = _ref.normalizer;
  checkContainerType$1(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll("[title], svg > title")).filter(function(node) {
    return matcher(node.getAttribute("title"), node, text2, matchNormalizer) || isSvgTitle(node) && matcher(getNodeText(node), node, text2, matchNormalizer);
  });
};
var getMultipleError$2 = function getMultipleError6(c2, title) {
  return "Found multiple elements with the title: " + title + ".";
};
var getMissingError$2 = function getMissingError5(c2, title) {
  return "Unable to find an element with the title: " + title + ".";
};
var queryAllByTitleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTitle, queryAllByTitle.name, "queryAll");
var _buildQueries$2 = buildQueries(queryAllByTitle, getMultipleError$2, getMissingError$2), queryByTitle = _buildQueries$2[0], getAllByTitle = _buildQueries$2[1], getByTitle = _buildQueries$2[2], findAllByTitle = _buildQueries$2[3], findByTitle = _buildQueries$2[4];
function queryAllByRole(container, role, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$exact = _ref.exact, exact = _ref$exact === void 0 ? true : _ref$exact, collapseWhitespace = _ref.collapseWhitespace, _ref$hidden = _ref.hidden, hidden = _ref$hidden === void 0 ? getConfig().defaultHidden : _ref$hidden, name = _ref.name, description = _ref.description, trim = _ref.trim, normalizer = _ref.normalizer, _ref$queryFallbacks = _ref.queryFallbacks, queryFallbacks = _ref$queryFallbacks === void 0 ? false : _ref$queryFallbacks, selected = _ref.selected, checked = _ref.checked, pressed = _ref.pressed, current = _ref.current, level = _ref.level, expanded = _ref.expanded;
  checkContainerType$1(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  if (selected !== void 0) {
    var _allRoles$get;
    if (((_allRoles$get = roles_1.get(role)) == null ? void 0 : _allRoles$get.props["aria-selected"]) === void 0) {
      throw new Error('"aria-selected" is not supported on role "' + role + '".');
    }
  }
  if (checked !== void 0) {
    var _allRoles$get2;
    if (((_allRoles$get2 = roles_1.get(role)) == null ? void 0 : _allRoles$get2.props["aria-checked"]) === void 0) {
      throw new Error('"aria-checked" is not supported on role "' + role + '".');
    }
  }
  if (pressed !== void 0) {
    var _allRoles$get3;
    if (((_allRoles$get3 = roles_1.get(role)) == null ? void 0 : _allRoles$get3.props["aria-pressed"]) === void 0) {
      throw new Error('"aria-pressed" is not supported on role "' + role + '".');
    }
  }
  if (current !== void 0) {
    var _allRoles$get4;
    if (((_allRoles$get4 = roles_1.get(role)) == null ? void 0 : _allRoles$get4.props["aria-current"]) === void 0) {
      throw new Error('"aria-current" is not supported on role "' + role + '".');
    }
  }
  if (level !== void 0) {
    if (role !== "heading") {
      throw new Error('Role "' + role + '" cannot have "level" property.');
    }
  }
  if (expanded !== void 0) {
    var _allRoles$get5;
    if (((_allRoles$get5 = roles_1.get(role)) == null ? void 0 : _allRoles$get5.props["aria-expanded"]) === void 0) {
      throw new Error('"aria-expanded" is not supported on role "' + role + '".');
    }
  }
  var subtreeIsInaccessibleCache = /* @__PURE__ */ new WeakMap();
  function cachedIsSubtreeInaccessible(element2) {
    if (!subtreeIsInaccessibleCache.has(element2)) {
      subtreeIsInaccessibleCache.set(element2, isSubtreeInaccessible(element2));
    }
    return subtreeIsInaccessibleCache.get(element2);
  }
  return Array.from(container.querySelectorAll(makeRoleSelector(role, exact, normalizer ? matchNormalizer : void 0))).filter(function(node) {
    var isRoleSpecifiedExplicitly = node.hasAttribute("role");
    if (isRoleSpecifiedExplicitly) {
      var roleValue = node.getAttribute("role");
      if (queryFallbacks) {
        return roleValue.split(" ").filter(Boolean).some(function(text2) {
          return matcher(text2, node, role, matchNormalizer);
        });
      }
      if (normalizer) {
        return matcher(roleValue, node, role, matchNormalizer);
      }
      var _roleValue$split = roleValue.split(" "), firstWord = _roleValue$split[0];
      return matcher(firstWord, node, role, matchNormalizer);
    }
    var implicitRoles = getImplicitAriaRoles(node);
    return implicitRoles.some(function(implicitRole) {
      return matcher(implicitRole, node, role, matchNormalizer);
    });
  }).filter(function(element2) {
    if (selected !== void 0) {
      return selected === computeAriaSelected(element2);
    }
    if (checked !== void 0) {
      return checked === computeAriaChecked(element2);
    }
    if (pressed !== void 0) {
      return pressed === computeAriaPressed(element2);
    }
    if (current !== void 0) {
      return current === computeAriaCurrent(element2);
    }
    if (expanded !== void 0) {
      return expanded === computeAriaExpanded(element2);
    }
    if (level !== void 0) {
      return level === computeHeadingLevel(element2);
    }
    return true;
  }).filter(function(element2) {
    if (name === void 0) {
      return true;
    }
    return matches(computeAccessibleName(element2, {
      computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
    }), element2, name, function(text2) {
      return text2;
    });
  }).filter(function(element2) {
    if (description === void 0) {
      return true;
    }
    return matches(computeAccessibleDescription(element2, {
      computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
    }), element2, description, function(text2) {
      return text2;
    });
  }).filter(function(element2) {
    return hidden === false ? isInaccessible(element2, {
      isSubtreeInaccessible: cachedIsSubtreeInaccessible
    }) === false : true;
  });
}
function makeRoleSelector(role, exact, customNormalizer) {
  var _roleElements$get;
  if (typeof role !== "string") {
    return "*";
  }
  var explicitRoleSelector = exact && !customNormalizer ? '*[role~="' + role + '"]' : "*[role]";
  var roleRelations = (_roleElements$get = roleElements_1.get(role)) != null ? _roleElements$get : /* @__PURE__ */ new Set();
  var implicitRoleSelectors = new Set(Array.from(roleRelations).map(function(_ref2) {
    var name = _ref2.name;
    return name;
  }));
  return [explicitRoleSelector].concat(Array.from(implicitRoleSelectors)).join(",");
}
var getMultipleError$1 = function getMultipleError7(c2, role, _temp2) {
  var _ref3 = _temp2 === void 0 ? {} : _temp2, name = _ref3.name;
  var nameHint = "";
  if (name === void 0) {
    nameHint = "";
  } else if (typeof name === "string") {
    nameHint = ' and name "' + name + '"';
  } else {
    nameHint = " and name `" + name + "`";
  }
  return 'Found multiple elements with the role "' + role + '"' + nameHint;
};
var getMissingError$1 = function getMissingError6(container, role, _temp3) {
  var _ref4 = _temp3 === void 0 ? {} : _temp3, _ref4$hidden = _ref4.hidden, hidden = _ref4$hidden === void 0 ? getConfig().defaultHidden : _ref4$hidden, name = _ref4.name, description = _ref4.description;
  if (getConfig()._disableExpensiveErrorDiagnostics) {
    return 'Unable to find role="' + role + '"';
  }
  var roles2 = "";
  Array.from(container.children).forEach(function(childElement) {
    roles2 += prettyRoles(childElement, {
      hidden,
      includeName: name !== void 0,
      includeDescription: description !== void 0
    });
  });
  var roleMessage;
  if (roles2.length === 0) {
    if (hidden === false) {
      roleMessage = "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole";
    } else {
      roleMessage = "There are no available roles.";
    }
  } else {
    roleMessage = ("\nHere are the " + (hidden === false ? "accessible" : "available") + " roles:\n\n  " + roles2.replace(/\n/g, "\n  ").replace(/\n\s\s\n/g, "\n\n") + "\n").trim();
  }
  var nameHint = "";
  if (name === void 0) {
    nameHint = "";
  } else if (typeof name === "string") {
    nameHint = ' and name "' + name + '"';
  } else {
    nameHint = " and name `" + name + "`";
  }
  var descriptionHint = "";
  if (description === void 0) {
    descriptionHint = "";
  } else if (typeof description === "string") {
    descriptionHint = ' and description "' + description + '"';
  } else {
    descriptionHint = " and description `" + description + "`";
  }
  return ("\nUnable to find an " + (hidden === false ? "accessible " : "") + 'element with the role "' + role + '"' + nameHint + descriptionHint + "\n\n" + roleMessage).trim();
};
var queryAllByRoleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByRole, queryAllByRole.name, "queryAll");
var _buildQueries$1 = buildQueries(queryAllByRole, getMultipleError$1, getMissingError$1), queryByRole = _buildQueries$1[0], getAllByRole = _buildQueries$1[1], getByRole = _buildQueries$1[2], findAllByRole = _buildQueries$1[3], findByRole = _buildQueries$1[4];
var getTestIdAttribute = function getTestIdAttribute2() {
  return getConfig().testIdAttribute;
};
var queryAllByTestId = function queryAllByTestId2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  checkContainerType$1(args[0]);
  return queryAllByAttribute.apply(void 0, [getTestIdAttribute()].concat(args));
};
var getMultipleError8 = function getMultipleError9(c2, id) {
  return "Found multiple elements by: [" + getTestIdAttribute() + '="' + id + '"]';
};
var getMissingError7 = function getMissingError8(c2, id) {
  return "Unable to find an element by: [" + getTestIdAttribute() + '="' + id + '"]';
};
var queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTestId, queryAllByTestId.name, "queryAll");
var _buildQueries = buildQueries(queryAllByTestId, getMultipleError8, getMissingError7), queryByTestId = _buildQueries[0], getAllByTestId = _buildQueries[1], getByTestId = _buildQueries[2], findAllByTestId = _buildQueries[3], findByTestId = _buildQueries[4];
var queries = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  queryAllByLabelText: queryAllByLabelTextWithSuggestions,
  queryByLabelText,
  getAllByLabelText: getAllByLabelTextWithSuggestions,
  getByLabelText: getByLabelTextWithSuggestions,
  findAllByLabelText,
  findByLabelText,
  queryByPlaceholderText,
  queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
  getByPlaceholderText,
  getAllByPlaceholderText,
  findAllByPlaceholderText,
  findByPlaceholderText,
  queryByText,
  queryAllByText: queryAllByTextWithSuggestions,
  getByText,
  getAllByText,
  findAllByText,
  findByText,
  queryByDisplayValue,
  queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
  getByDisplayValue,
  getAllByDisplayValue,
  findAllByDisplayValue,
  findByDisplayValue,
  queryByAltText,
  queryAllByAltText: queryAllByAltTextWithSuggestions,
  getByAltText,
  getAllByAltText,
  findAllByAltText,
  findByAltText,
  queryByTitle,
  queryAllByTitle: queryAllByTitleWithSuggestions,
  getByTitle,
  getAllByTitle,
  findAllByTitle,
  findByTitle,
  queryByRole,
  queryAllByRole: queryAllByRoleWithSuggestions,
  getAllByRole,
  getByRole,
  findAllByRole,
  findByRole,
  queryByTestId,
  queryAllByTestId: queryAllByTestIdWithSuggestions,
  getByTestId,
  getAllByTestId,
  findAllByTestId,
  findByTestId
});
function getQueriesForElement(element2, queries$1, initialValue2) {
  if (queries$1 === void 0) {
    queries$1 = queries;
  }
  if (initialValue2 === void 0) {
    initialValue2 = {};
  }
  return Object.keys(queries$1).reduce(function(helpers2, key) {
    var fn = queries$1[key];
    helpers2[key] = fn.bind(null, element2);
    return helpers2;
  }, initialValue2);
}
var isRemoved = function isRemoved2(result) {
  return !result || Array.isArray(result) && !result.length;
};
function initialCheck(elements) {
  if (isRemoved(elements)) {
    throw new Error("The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.");
  }
}
function waitForElementToBeRemoved(_x, _x2) {
  return _waitForElementToBeRemoved.apply(this, arguments);
}
function _waitForElementToBeRemoved() {
  _waitForElementToBeRemoved = _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee(callback, options) {
    var timeoutError, elements, getRemainingElements;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            timeoutError = new Error("Timed out in waitForElementToBeRemoved.");
            if (typeof callback !== "function") {
              initialCheck(callback);
              elements = Array.isArray(callback) ? callback : [callback];
              getRemainingElements = elements.map(function(element2) {
                var parent = element2.parentElement;
                if (parent === null)
                  return function() {
                    return null;
                  };
                while (parent.parentElement) {
                  parent = parent.parentElement;
                }
                return function() {
                  return parent.contains(element2) ? element2 : null;
                };
              });
              callback = function callback2() {
                return getRemainingElements.map(function(c2) {
                  return c2();
                }).filter(Boolean);
              };
            }
            initialCheck(callback());
            return _context.abrupt("return", waitForWrapper(function() {
              var result;
              try {
                result = callback();
              } catch (error2) {
                if (error2.name === "TestingLibraryElementError") {
                  return void 0;
                }
                throw error2;
              }
              if (!isRemoved(result)) {
                throw timeoutError;
              }
              return void 0;
            }, options));
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _waitForElementToBeRemoved.apply(this, arguments);
}
var eventMap$3 = {
  copy: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  cut: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  paste: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionEnd: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionStart: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionUpdate: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  keyDown: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  keyPress: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  keyUp: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  focus: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  blur: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  focusIn: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  focusOut: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  change: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  input: {
    EventType: "InputEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  invalid: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: true
    }
  },
  submit: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  reset: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  click: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      button: 0,
      composed: true
    }
  },
  contextMenu: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dblClick: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  drag: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragEnd: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragEnter: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragExit: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragLeave: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragOver: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragStart: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  drop: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseDown: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseEnter: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseLeave: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseMove: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseOut: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseOver: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseUp: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  select: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  touchCancel: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  touchEnd: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  touchMove: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  touchStart: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  resize: {
    EventType: "UIEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  scroll: {
    EventType: "UIEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  wheel: {
    EventType: "WheelEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  abort: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  canPlay: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  canPlayThrough: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  durationChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  emptied: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  encrypted: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  ended: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadedData: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadedMetadata: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadStart: {
    EventType: "ProgressEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pause: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  play: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  playing: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  progress: {
    EventType: "ProgressEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  rateChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  seeked: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  seeking: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  stalled: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  suspend: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  timeUpdate: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  volumeChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  waiting: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  load: {
    EventType: "UIEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  error: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  animationStart: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  animationEnd: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  animationIteration: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  transitionCancel: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  transitionEnd: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  transitionRun: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  transitionStart: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  pointerOver: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerEnter: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pointerDown: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerMove: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerUp: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerCancel: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  pointerOut: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerLeave: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  gotPointerCapture: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  lostPointerCapture: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  popState: {
    EventType: "PopStateEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  }
};
var eventAliasMap$1 = {
  doubleClick: "dblClick"
};
var _excluded = ["value", "files"], _excluded2 = ["bubbles", "cancelable", "detail"];
function fireEvent(element2, event) {
  return getConfig().eventWrapper(function() {
    if (!event) {
      throw new Error("Unable to fire an event - please provide an event object.");
    }
    if (!element2) {
      throw new Error('Unable to fire a "' + event.type + '" event - please provide a DOM element.');
    }
    return element2.dispatchEvent(event);
  });
}
function createEvent$1(eventName, node, init2, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$EventType = _ref.EventType, EventType = _ref$EventType === void 0 ? "Event" : _ref$EventType, _ref$defaultInit = _ref.defaultInit, defaultInit = _ref$defaultInit === void 0 ? {} : _ref$defaultInit;
  if (!node) {
    throw new Error('Unable to fire a "' + eventName + '" event - please provide a DOM element.');
  }
  var eventInit = _extends({}, defaultInit, init2);
  var _eventInit$target = eventInit.target;
  _eventInit$target = _eventInit$target === void 0 ? {} : _eventInit$target;
  var value = _eventInit$target.value, files = _eventInit$target.files, targetProperties = _objectWithoutPropertiesLoose(_eventInit$target, _excluded);
  if (value !== void 0) {
    setNativeValue(node, value);
  }
  if (files !== void 0) {
    Object.defineProperty(node, "files", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: files
    });
  }
  Object.assign(node, targetProperties);
  var window2 = getWindowFromNode$1(node);
  var EventConstructor = window2[EventType] || window2.Event;
  var event;
  if (typeof EventConstructor === "function") {
    event = new EventConstructor(eventName, eventInit);
  } else {
    event = window2.document.createEvent(EventType);
    var bubbles = eventInit.bubbles, cancelable = eventInit.cancelable, detail = eventInit.detail, otherInit = _objectWithoutPropertiesLoose(eventInit, _excluded2);
    event.initEvent(eventName, bubbles, cancelable, detail);
    Object.keys(otherInit).forEach(function(eventKey) {
      event[eventKey] = otherInit[eventKey];
    });
  }
  var dataTransferProperties = ["dataTransfer", "clipboardData"];
  dataTransferProperties.forEach(function(dataTransferKey) {
    var dataTransferValue = eventInit[dataTransferKey];
    if (typeof dataTransferValue === "object") {
      if (typeof window2.DataTransfer === "function") {
        Object.defineProperty(event, dataTransferKey, {
          value: Object.getOwnPropertyNames(dataTransferValue).reduce(function(acc, propName) {
            Object.defineProperty(acc, propName, {
              value: dataTransferValue[propName]
            });
            return acc;
          }, new window2.DataTransfer())
        });
      } else {
        Object.defineProperty(event, dataTransferKey, {
          value: dataTransferValue
        });
      }
    }
  });
  return event;
}
Object.keys(eventMap$3).forEach(function(key) {
  var _eventMap$key = eventMap$3[key], EventType = _eventMap$key.EventType, defaultInit = _eventMap$key.defaultInit;
  var eventName = key.toLowerCase();
  createEvent$1[key] = function(node, init2) {
    return createEvent$1(eventName, node, init2, {
      EventType,
      defaultInit
    });
  };
  fireEvent[key] = function(node, init2) {
    return fireEvent(node, createEvent$1[key](node, init2));
  };
});
function setNativeValue(element2, value) {
  var _ref2 = Object.getOwnPropertyDescriptor(element2, "value") || {}, valueSetter = _ref2.set;
  var prototype = Object.getPrototypeOf(element2);
  var _ref3 = Object.getOwnPropertyDescriptor(prototype, "value") || {}, prototypeValueSetter = _ref3.set;
  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element2, value);
  } else {
    if (valueSetter) {
      valueSetter.call(element2, value);
    } else {
      throw new Error("The given element does not have a value setter");
    }
  }
}
Object.keys(eventAliasMap$1).forEach(function(aliasKey) {
  var key = eventAliasMap$1[aliasKey];
  fireEvent[aliasKey] = function() {
    return fireEvent[key].apply(fireEvent, arguments);
  };
});
function unindent(string) {
  return string.replace(/[ \t]*[\n][ \t]*/g, "\n");
}
function encode(value) {
  return lzString.exports.compressToEncodedURIComponent(unindent(value));
}
function getPlaygroundUrl(markup2) {
  return "https://testing-playground.com/#markup=" + encode(markup2);
}
var debug = function debug2(element2, maxLength, options) {
  return Array.isArray(element2) ? element2.forEach(function(el) {
    return logDOM(el, maxLength, options);
  }) : logDOM(element2, maxLength, options);
};
var logTestingPlaygroundURL = function logTestingPlaygroundURL2(element2) {
  if (element2 === void 0) {
    element2 = getDocument$2().body;
  }
  if (!element2 || !("innerHTML" in element2)) {
    console.log("The element you're providing isn't a valid DOM element.");
    return;
  }
  if (!element2.innerHTML) {
    console.log("The provided element doesn't have any children.");
    return;
  }
  console.log("Open this URL in your browser\n\n" + getPlaygroundUrl(element2.innerHTML));
};
var initialValue = {
  debug,
  logTestingPlaygroundURL
};
var screen = typeof document !== "undefined" && document.body ? getQueriesForElement(document.body, queries, initialValue) : Object.keys(queries).reduce(function(helpers2, key) {
  helpers2[key] = function() {
    throw new TypeError("For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error");
  };
  return helpers2;
}, initialValue);
var dom_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  prettyFormat: index,
  buildQueries,
  configure,
  createEvent: createEvent$1,
  findAllByAltText,
  findAllByDisplayValue,
  findAllByLabelText,
  findAllByPlaceholderText,
  findAllByRole,
  findAllByTestId,
  findAllByText,
  findAllByTitle,
  findByAltText,
  findByDisplayValue,
  findByLabelText,
  findByPlaceholderText,
  findByRole,
  findByTestId,
  findByText,
  findByTitle,
  fireEvent,
  getAllByAltText,
  getAllByDisplayValue,
  getAllByLabelText: getAllByLabelTextWithSuggestions,
  getAllByPlaceholderText,
  getAllByRole,
  getAllByTestId,
  getAllByText,
  getAllByTitle,
  getByAltText,
  getByDisplayValue,
  getByLabelText: getByLabelTextWithSuggestions,
  getByPlaceholderText,
  getByRole,
  getByTestId,
  getByText,
  getByTitle,
  getConfig,
  getDefaultNormalizer,
  getElementError: getElementError2,
  getMultipleElementsFoundError,
  getNodeText,
  getQueriesForElement,
  getRoles,
  getSuggestedQuery,
  isInaccessible,
  logDOM,
  logRoles,
  makeFindQuery,
  makeGetAllQuery,
  makeSingleQuery,
  prettyDOM,
  queries,
  queryAllByAltText: queryAllByAltTextWithSuggestions,
  queryAllByAttribute,
  queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
  queryAllByLabelText: queryAllByLabelTextWithSuggestions,
  queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
  queryAllByRole: queryAllByRoleWithSuggestions,
  queryAllByTestId: queryAllByTestIdWithSuggestions,
  queryAllByText: queryAllByTextWithSuggestions,
  queryAllByTitle: queryAllByTitleWithSuggestions,
  queryByAltText,
  queryByAttribute,
  queryByDisplayValue,
  queryByLabelText,
  queryByPlaceholderText,
  queryByRole,
  queryByTestId,
  queryByText,
  queryByTitle,
  queryHelpers,
  screen,
  waitFor: waitForWrapper,
  waitForElementToBeRemoved,
  within: getQueriesForElement,
  wrapAllByQueryWithSuggestion,
  wrapSingleQueryWithSuggestion
}, Symbol.toStringTag, { value: "Module" }));
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(dom_esm);
var svelte = {};
var internal = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function noop2() {
  }
  const identity = (x) => x;
  function assign(tar, src) {
    for (const k in src)
      tar[k] = src[k];
    return tar;
  }
  function is_promise2(value) {
    return value && typeof value === "object" && typeof value.then === "function";
  }
  function add_location(element3, file, line, column, char) {
    element3.__svelte_meta = {
      loc: { file, line, column, char }
    };
  }
  function run2(fn) {
    return fn();
  }
  function blank_object2() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all2(fns) {
    fns.forEach(run2);
  }
  function is_function2(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal2(a, b2) {
    return a != a ? b2 == b2 : a !== b2 || (a && typeof a === "object" || typeof a === "function");
  }
  let src_url_equal_anchor;
  function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
      src_url_equal_anchor = document.createElement("a");
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
  }
  function not_equal(a, b2) {
    return a != a ? b2 == b2 : a !== b2;
  }
  function is_empty2(obj) {
    return Object.keys(obj).length === 0;
  }
  function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== "function") {
      throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      return noop2;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function get_store_value(store) {
    let value;
    subscribe(store, (_) => value = _)();
    return value;
  }
  function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length = $$scope.ctx.length / 32;
      for (let i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
      if (k[0] !== "$")
        result[k] = props[k];
    return result;
  }
  function compute_rest_props(props, keys7) {
    const rest = {};
    keys7 = new Set(keys7);
    for (const k in props)
      if (!keys7.has(k) && k[0] !== "$")
        rest[k] = props[k];
    return rest;
  }
  function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
      result[key] = true;
    }
    return result;
  }
  function once(fn) {
    let ran = false;
    return function(...args) {
      if (ran)
        return;
      ran = true;
      fn.call(this, ...args);
    };
  }
  function null_to_empty(value) {
    return value == null ? "" : value;
  }
  function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
  }
  const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  function action_destroyer(action_result) {
    return action_result && is_function2(action_result.destroy) ? action_result.destroy : noop2;
  }
  const is_client = typeof window !== "undefined";
  exports.now = is_client ? () => window.performance.now() : () => Date.now();
  exports.raf = is_client ? (cb) => requestAnimationFrame(cb) : noop2;
  function set_now(fn) {
    exports.now = fn;
  }
  function set_raf(fn) {
    exports.raf = fn;
  }
  const tasks = /* @__PURE__ */ new Set();
  function run_tasks(now) {
    tasks.forEach((task) => {
      if (!task.c(now)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0)
      exports.raf(run_tasks);
  }
  function clear_loops() {
    tasks.clear();
  }
  function loop(callback) {
    let task;
    if (tasks.size === 0)
      exports.raf(run_tasks);
    return {
      promise: new Promise((fulfill) => {
        tasks.add(task = { c: callback, f: fulfill });
      }),
      abort() {
        tasks.delete(task);
      }
    };
  }
  let is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function upper_bound(low, high, key, value) {
    while (low < high) {
      const mid = low + (high - low >> 1);
      if (key(mid) <= value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
  function init_hydrate(target) {
    if (target.hydrate_init)
      return;
    target.hydrate_init = true;
    let children3 = target.childNodes;
    if (target.nodeName === "HEAD") {
      const myChildren = [];
      for (let i = 0; i < children3.length; i++) {
        const node = children3[i];
        if (node.claim_order !== void 0) {
          myChildren.push(node);
        }
      }
      children3 = myChildren;
    }
    const m2 = new Int32Array(children3.length + 1);
    const p2 = new Int32Array(children3.length);
    m2[0] = -1;
    let longest = 0;
    for (let i = 0; i < children3.length; i++) {
      const current = children3[i].claim_order;
      const seqLen = (longest > 0 && children3[m2[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, (idx) => children3[m2[idx]].claim_order, current)) - 1;
      p2[i] = m2[seqLen] + 1;
      const newLen = seqLen + 1;
      m2[newLen] = i;
      longest = Math.max(newLen, longest);
    }
    const lis = [];
    const toMove = [];
    let last = children3.length - 1;
    for (let cur = m2[longest] + 1; cur != 0; cur = p2[cur - 1]) {
      lis.push(children3[cur - 1]);
      for (; last >= cur; last--) {
        toMove.push(children3[last]);
      }
      last--;
    }
    for (; last >= 0; last--) {
      toMove.push(children3[last]);
    }
    lis.reverse();
    toMove.sort((a, b2) => a.claim_order - b2.claim_order);
    for (let i = 0, j = 0; i < toMove.length; i++) {
      while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
        j++;
      }
      const anchor = j < lis.length ? lis[j] : null;
      target.insertBefore(toMove[i], anchor);
    }
  }
  function append2(target, node) {
    target.appendChild(node);
  }
  function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style = element2("style");
      style.id = style_sheet_id;
      style.textContent = styles;
      append_stylesheet(append_styles_to, style);
    }
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
      return root;
    }
    return node.ownerDocument;
  }
  function append_empty_stylesheet(node) {
    const style_element = element2("style");
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
  }
  function append_stylesheet(node, style) {
    append2(node.head || node, style);
  }
  function append_hydration(target, node) {
    if (is_hydrating) {
      init_hydrate(target);
      if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
        target.actual_end_child = target.firstChild;
      }
      while (target.actual_end_child !== null && target.actual_end_child.claim_order === void 0) {
        target.actual_end_child = target.actual_end_child.nextSibling;
      }
      if (node !== target.actual_end_child) {
        if (node.claim_order !== void 0 || node.parentNode !== target) {
          target.insertBefore(node, target.actual_end_child);
        }
      } else {
        target.actual_end_child = node.nextSibling;
      }
    } else if (node.parentNode !== target || node.nextSibling !== null) {
      target.appendChild(node);
    }
  }
  function insert2(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
      append_hydration(target, node);
    } else if (node.parentNode !== target || node.nextSibling != anchor) {
      target.insertBefore(node, anchor || null);
    }
  }
  function detach2(node) {
    node.parentNode.removeChild(node);
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element2(name) {
    return document.createElement(name);
  }
  function element_is(name, is) {
    return document.createElement(name, { is });
  }
  function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
      if (has_prop(obj, k) && exclude.indexOf(k) === -1) {
        target[k] = obj[k];
      }
    }
    return target;
  }
  function svg_element(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }
  function text2(data) {
    return document.createTextNode(data);
  }
  function space2() {
    return text2(" ");
  }
  function empty2() {
    return text2("");
  }
  function listen2(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function prevent_default2(fn) {
    return function(event) {
      event.preventDefault();
      return fn.call(this, event);
    };
  }
  function stop_propagation(fn) {
    return function(event) {
      event.stopPropagation();
      return fn.call(this, event);
    };
  }
  function self2(fn) {
    return function(event) {
      if (event.target === this)
        fn.call(this, event);
    };
  }
  function trusted(fn) {
    return function(event) {
      if (event.isTrusted)
        fn.call(this, event);
    };
  }
  function attr2(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function set_attributes(node, attributes) {
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
      if (attributes[key] == null) {
        node.removeAttribute(key);
      } else if (key === "style") {
        node.style.cssText = attributes[key];
      } else if (key === "__value") {
        node.value = node[key] = attributes[key];
      } else if (descriptors[key] && descriptors[key].set) {
        node[key] = attributes[key];
      } else {
        attr2(node, key, attributes[key]);
      }
    }
  }
  function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
      attr2(node, key, attributes[key]);
    }
  }
  function set_custom_element_data(node, prop, value) {
    if (prop in node) {
      node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
    } else {
      attr2(node, prop, value);
    }
  }
  function xlink_attr(node, attribute, value) {
    node.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
  }
  function get_binding_group_value(group, __value, checked) {
    const value = /* @__PURE__ */ new Set();
    for (let i = 0; i < group.length; i += 1) {
      if (group[i].checked)
        value.add(group[i].__value);
    }
    if (!checked) {
      value.delete(__value);
    }
    return Array.from(value);
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
      array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
  }
  function children2(element3) {
    return Array.from(element3.childNodes);
  }
  function init_claim_info(nodes) {
    if (nodes.claim_info === void 0) {
      nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
  }
  function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    init_claim_info(nodes);
    const resultNode = (() => {
      for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
        const node = nodes[i];
        if (predicate(node)) {
          const replacement = processNode(node);
          if (replacement === void 0) {
            nodes.splice(i, 1);
          } else {
            nodes[i] = replacement;
          }
          if (!dontUpdateLastIndex) {
            nodes.claim_info.last_index = i;
          }
          return node;
        }
      }
      for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
        const node = nodes[i];
        if (predicate(node)) {
          const replacement = processNode(node);
          if (replacement === void 0) {
            nodes.splice(i, 1);
          } else {
            nodes[i] = replacement;
          }
          if (!dontUpdateLastIndex) {
            nodes.claim_info.last_index = i;
          } else if (replacement === void 0) {
            nodes.claim_info.last_index--;
          }
          return node;
        }
      }
      return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
  }
  function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
      const remove = [];
      for (let j = 0; j < node.attributes.length; j++) {
        const attribute = node.attributes[j];
        if (!attributes[attribute.name]) {
          remove.push(attribute.name);
        }
      }
      remove.forEach((v2) => node.removeAttribute(v2));
      return void 0;
    }, () => create_element(name));
  }
  function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element2);
  }
  function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
  }
  function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
      const dataStr = "" + data;
      if (node.data.startsWith(dataStr)) {
        if (node.data.length !== dataStr.length) {
          return node.splitText(dataStr.length);
        }
      } else {
        node.data = dataStr;
      }
    }, () => text2(data), true);
  }
  function claim_space(nodes) {
    return claim_text(nodes, " ");
  }
  function find_comment(nodes, text3, start) {
    for (let i = start; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node.nodeType === 8 && node.textContent.trim() === text3) {
        return i;
      }
    }
    return nodes.length;
  }
  function claim_html_tag(nodes) {
    const start_index = find_comment(nodes, "HTML_TAG_START", 0);
    const end_index = find_comment(nodes, "HTML_TAG_END", start_index);
    if (start_index === end_index) {
      return new HtmlTagHydration();
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
    detach2(html_tag_nodes[0]);
    detach2(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n2 of claimed_nodes) {
      n2.claim_order = nodes.claim_info.total_claimed;
      nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes);
  }
  function set_data2(text3, data) {
    data = "" + data;
    if (text3.wholeText !== data)
      text3.data = data;
  }
  function set_input_value2(input2, value) {
    input2.value = value == null ? "" : value;
  }
  function set_input_type(input2, type3) {
    try {
      input2.type = type3;
    } catch (e2) {
    }
  }
  function set_style(node, key, value, important) {
    if (value === null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? "important" : "");
    }
  }
  function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
      const option = select.options[i];
      if (option.__value === value) {
        option.selected = true;
        return;
      }
    }
    select.selectedIndex = -1;
  }
  function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
      const option = select.options[i];
      option.selected = ~value.indexOf(option.__value);
    }
  }
  function select_value(select) {
    const selected_option = select.querySelector(":checked") || select.options[0];
    return selected_option && selected_option.__value;
  }
  function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(":checked"), (option) => option.__value);
  }
  let crossorigin;
  function is_crossorigin() {
    if (crossorigin === void 0) {
      crossorigin = false;
      try {
        if (typeof window !== "undefined" && window.parent) {
          void window.parent.document;
        }
      } catch (error2) {
        crossorigin = true;
      }
    }
    return crossorigin;
  }
  function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === "static") {
      node.style.position = "relative";
    }
    const iframe = element2("iframe");
    iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    const crossorigin2 = is_crossorigin();
    let unsubscribe;
    if (crossorigin2) {
      iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
      unsubscribe = listen2(window, "message", (event) => {
        if (event.source === iframe.contentWindow)
          fn();
      });
    } else {
      iframe.src = "about:blank";
      iframe.onload = () => {
        unsubscribe = listen2(iframe.contentWindow, "resize", fn);
      };
    }
    append2(node, iframe);
    return () => {
      if (crossorigin2) {
        unsubscribe();
      } else if (unsubscribe && iframe.contentWindow) {
        unsubscribe();
      }
      detach2(iframe);
    };
  }
  function toggle_class(element3, name, toggle) {
    element3.classList[toggle ? "add" : "remove"](name);
  }
  function custom_event(type3, detail, bubbles = false) {
    const e2 = document.createEvent("CustomEvent");
    e2.initCustomEvent(type3, bubbles, false, detail);
    return e2;
  }
  function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
  }
  class HtmlTag {
    constructor() {
      this.e = this.n = null;
    }
    c(html) {
      this.h(html);
    }
    m(html, target, anchor = null) {
      if (!this.e) {
        this.e = element2(target.nodeName);
        this.t = target;
        this.c(html);
      }
      this.i(anchor);
    }
    h(html) {
      this.e.innerHTML = html;
      this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
      for (let i = 0; i < this.n.length; i += 1) {
        insert2(this.t, this.n[i], anchor);
      }
    }
    p(html) {
      this.d();
      this.h(html);
      this.i(this.a);
    }
    d() {
      this.n.forEach(detach2);
    }
  }
  class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes) {
      super();
      this.e = this.n = null;
      this.l = claimed_nodes;
    }
    c(html) {
      if (this.l) {
        this.n = this.l;
      } else {
        super.c(html);
      }
    }
    i(anchor) {
      for (let i = 0; i < this.n.length; i += 1) {
        insert_hydration(this.t, this.n[i], anchor);
      }
    }
  }
  function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
      result[attribute.name] = attribute.value;
    }
    return result;
  }
  function get_custom_elements_slots(element3) {
    const result = {};
    element3.childNodes.forEach((node) => {
      result[node.slot || "default"] = true;
    });
    return result;
  }
  const managed_styles = /* @__PURE__ */ new Map();
  let active = 0;
  function hash(str) {
    let hash2 = 5381;
    let i = str.length;
    while (i--)
      hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
    return hash2 >>> 0;
  }
  function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
  }
  function create_rule(node, a, b2, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = "{\n";
    for (let p2 = 0; p2 <= 1; p2 += step) {
      const t = a + (b2 - a) * ease(p2);
      keyframes += p2 * 100 + `%{${fn(t, 1 - t)}}
`;
    }
    const rule = keyframes + `100% {${fn(b2, 1 - b2)}}
}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
      rules[name] = true;
      stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || "";
    node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
  }
  function delete_rule(node, name) {
    const previous = (node.style.animation || "").split(", ");
    const next = previous.filter(name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1);
    const deleted = previous.length - next.length;
    if (deleted) {
      node.style.animation = next.join(", ");
      active -= deleted;
      if (!active)
        clear_rules();
    }
  }
  function clear_rules() {
    exports.raf(() => {
      if (active)
        return;
      managed_styles.forEach((info) => {
        const { stylesheet } = info;
        let i = stylesheet.cssRules.length;
        while (i--)
          stylesheet.deleteRule(i);
        info.rules = {};
      });
      managed_styles.clear();
    });
  }
  function create_animation(node, from, fn, params) {
    if (!from)
      return noop2;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
      return noop2;
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      start: start_time = exports.now() + delay,
      end = start_time + duration,
      tick: tick2 = noop2,
      css
    } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
      if (css) {
        name = create_rule(node, 0, 1, duration, delay, easing, css);
      }
      if (!delay) {
        started = true;
      }
    }
    function stop() {
      if (css)
        delete_rule(node, name);
      running = false;
    }
    loop((now) => {
      if (!started && now >= start_time) {
        started = true;
      }
      if (started && now >= end) {
        tick2(1, 0);
        stop();
      }
      if (!running) {
        return false;
      }
      if (started) {
        const p2 = now - start_time;
        const t = 0 + 1 * easing(p2 / duration);
        tick2(t, 1 - t);
      }
      return true;
    });
    start();
    tick2(0, 1);
    return stop;
  }
  function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== "absolute" && style.position !== "fixed") {
      const { width, height } = style;
      const a = node.getBoundingClientRect();
      node.style.position = "absolute";
      node.style.width = width;
      node.style.height = height;
      add_transform(node, a);
    }
  }
  function add_transform(node, a) {
    const b2 = node.getBoundingClientRect();
    if (a.left !== b2.left || a.top !== b2.top) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      node.style.transform = `${transform} translate(${a.left - b2.left}px, ${a.top - b2.top}px)`;
    }
  }
  function set_current_component2(component) {
    exports.current_component = component;
  }
  function get_current_component2() {
    if (!exports.current_component)
      throw new Error("Function called outside component initialization");
    return exports.current_component;
  }
  function beforeUpdate(fn) {
    get_current_component2().$$.before_update.push(fn);
  }
  function onMount(fn) {
    get_current_component2().$$.on_mount.push(fn);
  }
  function afterUpdate(fn) {
    get_current_component2().$$.after_update.push(fn);
  }
  function onDestroy(fn) {
    get_current_component2().$$.on_destroy.push(fn);
  }
  function createEventDispatcher() {
    const component = get_current_component2();
    return (type3, detail) => {
      const callbacks = component.$$.callbacks[type3];
      if (callbacks) {
        const event = custom_event(type3, detail);
        callbacks.slice().forEach((fn) => {
          fn.call(component, event);
        });
      }
    };
  }
  function setContext(key, context) {
    get_current_component2().$$.context.set(key, context);
  }
  function getContext(key) {
    return get_current_component2().$$.context.get(key);
  }
  function getAllContexts() {
    return get_current_component2().$$.context;
  }
  function hasContext(key) {
    return get_current_component2().$$.context.has(key);
  }
  function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
      callbacks.slice().forEach((fn) => fn.call(this, event));
    }
  }
  const dirty_components2 = [];
  const intros = { enabled: false };
  const binding_callbacks2 = [];
  const render_callbacks2 = [];
  const flush_callbacks2 = [];
  const resolved_promise2 = Promise.resolve();
  let update_scheduled2 = false;
  function schedule_update2() {
    if (!update_scheduled2) {
      update_scheduled2 = true;
      resolved_promise2.then(flush2);
    }
  }
  function tick() {
    schedule_update2();
    return resolved_promise2;
  }
  function add_render_callback2(fn) {
    render_callbacks2.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks2.push(fn);
  }
  const seen_callbacks2 = /* @__PURE__ */ new Set();
  let flushidx2 = 0;
  function flush2() {
    const saved_component = exports.current_component;
    do {
      while (flushidx2 < dirty_components2.length) {
        const component = dirty_components2[flushidx2];
        flushidx2++;
        set_current_component2(component);
        update2(component.$$);
      }
      set_current_component2(null);
      dirty_components2.length = 0;
      flushidx2 = 0;
      while (binding_callbacks2.length)
        binding_callbacks2.pop()();
      for (let i = 0; i < render_callbacks2.length; i += 1) {
        const callback = render_callbacks2[i];
        if (!seen_callbacks2.has(callback)) {
          seen_callbacks2.add(callback);
          callback();
        }
      }
      render_callbacks2.length = 0;
    } while (dirty_components2.length);
    while (flush_callbacks2.length) {
      flush_callbacks2.pop()();
    }
    update_scheduled2 = false;
    seen_callbacks2.clear();
    set_current_component2(saved_component);
  }
  function update2($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all2($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback2);
    }
  }
  let promise;
  function wait2() {
    if (!promise) {
      promise = Promise.resolve();
      promise.then(() => {
        promise = null;
      });
    }
    return promise;
  }
  function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
  }
  const outroing2 = /* @__PURE__ */ new Set();
  let outros2;
  function group_outros2() {
    outros2 = {
      r: 0,
      c: [],
      p: outros2
    };
  }
  function check_outros2() {
    if (!outros2.r) {
      run_all2(outros2.c);
    }
    outros2 = outros2.p;
  }
  function transition_in2(block, local) {
    if (block && block.i) {
      outroing2.delete(block);
      block.i(local);
    }
  }
  function transition_out2(block, local, detach3, callback) {
    if (block && block.o) {
      if (outroing2.has(block))
        return;
      outroing2.add(block);
      outros2.c.push(() => {
        outroing2.delete(block);
        if (callback) {
          if (detach3)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }
  const null_transition = { duration: 0 };
  function create_in_transition(node, fn, params) {
    let config2 = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
      if (animation_name)
        delete_rule(node, animation_name);
    }
    function go() {
      const { delay = 0, duration = 300, easing = identity, tick: tick2 = noop2, css } = config2 || null_transition;
      if (css)
        animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
      tick2(0, 1);
      const start_time = exports.now() + delay;
      const end_time = start_time + duration;
      if (task)
        task.abort();
      running = true;
      add_render_callback2(() => dispatch(node, true, "start"));
      task = loop((now) => {
        if (running) {
          if (now >= end_time) {
            tick2(1, 0);
            dispatch(node, true, "end");
            cleanup();
            return running = false;
          }
          if (now >= start_time) {
            const t = easing((now - start_time) / duration);
            tick2(t, 1 - t);
          }
        }
        return running;
      });
    }
    let started = false;
    return {
      start() {
        if (started)
          return;
        started = true;
        delete_rule(node);
        if (is_function2(config2)) {
          config2 = config2();
          wait2().then(go);
        } else {
          go();
        }
      },
      invalidate() {
        started = false;
      },
      end() {
        if (running) {
          cleanup();
          running = false;
        }
      }
    };
  }
  function create_out_transition(node, fn, params) {
    let config2 = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros2;
    group.r += 1;
    function go() {
      const { delay = 0, duration = 300, easing = identity, tick: tick2 = noop2, css } = config2 || null_transition;
      if (css)
        animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
      const start_time = exports.now() + delay;
      const end_time = start_time + duration;
      add_render_callback2(() => dispatch(node, false, "start"));
      loop((now) => {
        if (running) {
          if (now >= end_time) {
            tick2(0, 1);
            dispatch(node, false, "end");
            if (!--group.r) {
              run_all2(group.c);
            }
            return false;
          }
          if (now >= start_time) {
            const t = easing((now - start_time) / duration);
            tick2(1 - t, t);
          }
        }
        return running;
      });
    }
    if (is_function2(config2)) {
      wait2().then(() => {
        config2 = config2();
        go();
      });
    } else {
      go();
    }
    return {
      end(reset) {
        if (reset && config2.tick) {
          config2.tick(1, 0);
        }
        if (running) {
          if (animation_name)
            delete_rule(node, animation_name);
          running = false;
        }
      }
    };
  }
  function create_bidirectional_transition(node, fn, params, intro) {
    let config2 = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
      if (animation_name)
        delete_rule(node, animation_name);
    }
    function init3(program, duration) {
      const d2 = program.b - t;
      duration *= Math.abs(d2);
      return {
        a: t,
        b: program.b,
        d: d2,
        duration,
        start: program.start,
        end: program.start + duration,
        group: program.group
      };
    }
    function go(b2) {
      const { delay = 0, duration = 300, easing = identity, tick: tick2 = noop2, css } = config2 || null_transition;
      const program = {
        start: exports.now() + delay,
        b: b2
      };
      if (!b2) {
        program.group = outros2;
        outros2.r += 1;
      }
      if (running_program || pending_program) {
        pending_program = program;
      } else {
        if (css) {
          clear_animation();
          animation_name = create_rule(node, t, b2, duration, delay, easing, css);
        }
        if (b2)
          tick2(0, 1);
        running_program = init3(program, duration);
        add_render_callback2(() => dispatch(node, b2, "start"));
        loop((now) => {
          if (pending_program && now > pending_program.start) {
            running_program = init3(pending_program, duration);
            pending_program = null;
            dispatch(node, running_program.b, "start");
            if (css) {
              clear_animation();
              animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config2.css);
            }
          }
          if (running_program) {
            if (now >= running_program.end) {
              tick2(t = running_program.b, 1 - t);
              dispatch(node, running_program.b, "end");
              if (!pending_program) {
                if (running_program.b) {
                  clear_animation();
                } else {
                  if (!--running_program.group.r)
                    run_all2(running_program.group.c);
                }
              }
              running_program = null;
            } else if (now >= running_program.start) {
              const p2 = now - running_program.start;
              t = running_program.a + running_program.d * easing(p2 / running_program.duration);
              tick2(t, 1 - t);
            }
          }
          return !!(running_program || pending_program);
        });
      }
    }
    return {
      run(b2) {
        if (is_function2(config2)) {
          wait2().then(() => {
            config2 = config2();
            go(b2);
          });
        } else {
          go(b2);
        }
      },
      end() {
        clear_animation();
        running_program = pending_program = null;
      }
    };
  }
  function handle_promise2(promise2, info) {
    const token = info.token = {};
    function update3(type3, index2, key, value) {
      if (info.token !== token)
        return;
      info.resolved = value;
      let child_ctx = info.ctx;
      if (key !== void 0) {
        child_ctx = child_ctx.slice();
        child_ctx[key] = value;
      }
      const block = type3 && (info.current = type3)(child_ctx);
      let needs_flush = false;
      if (info.block) {
        if (info.blocks) {
          info.blocks.forEach((block2, i) => {
            if (i !== index2 && block2) {
              group_outros2();
              transition_out2(block2, 1, 1, () => {
                if (info.blocks[i] === block2) {
                  info.blocks[i] = null;
                }
              });
              check_outros2();
            }
          });
        } else {
          info.block.d(1);
        }
        block.c();
        transition_in2(block, 1);
        block.m(info.mount(), info.anchor);
        needs_flush = true;
      }
      info.block = block;
      if (info.blocks)
        info.blocks[index2] = block;
      if (needs_flush) {
        flush2();
      }
    }
    if (is_promise2(promise2)) {
      const current_component2 = get_current_component2();
      promise2.then((value) => {
        set_current_component2(current_component2);
        update3(info.then, 1, info.value, value);
        set_current_component2(null);
      }, (error2) => {
        set_current_component2(current_component2);
        update3(info.catch, 2, info.error, error2);
        set_current_component2(null);
        if (!info.hasCatch) {
          throw error2;
        }
      });
      if (info.current !== info.pending) {
        update3(info.pending, 0);
        return true;
      }
    } else {
      if (info.current !== info.then) {
        update3(info.then, 1, info.value, promise2);
        return true;
      }
      info.resolved = promise2;
    }
  }
  function update_await_block_branch2(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
      child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
      child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
  }
  const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : commonjsGlobal;
  function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
  }
  function outro_and_destroy_block(block, lookup) {
    transition_out2(block, 1, 1, () => {
      lookup.delete(block.key);
    });
  }
  function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
  }
  function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
  }
  function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n2 = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
      old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = /* @__PURE__ */ new Map();
    const deltas = /* @__PURE__ */ new Map();
    i = n2;
    while (i--) {
      const child_ctx = get_context(ctx, list, i);
      const key = get_key(child_ctx);
      let block = lookup.get(key);
      if (!block) {
        block = create_each_block(key, child_ctx);
        block.c();
      } else if (dynamic) {
        block.p(child_ctx, dirty);
      }
      new_lookup.set(key, new_blocks[i] = block);
      if (key in old_indexes)
        deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = /* @__PURE__ */ new Set();
    const did_move = /* @__PURE__ */ new Set();
    function insert3(block) {
      transition_in2(block, 1);
      block.m(node, next);
      lookup.set(block.key, block);
      next = block.first;
      n2--;
    }
    while (o && n2) {
      const new_block = new_blocks[n2 - 1];
      const old_block = old_blocks[o - 1];
      const new_key = new_block.key;
      const old_key = old_block.key;
      if (new_block === old_block) {
        next = new_block.first;
        o--;
        n2--;
      } else if (!new_lookup.has(old_key)) {
        destroy(old_block, lookup);
        o--;
      } else if (!lookup.has(new_key) || will_move.has(new_key)) {
        insert3(new_block);
      } else if (did_move.has(old_key)) {
        o--;
      } else if (deltas.get(new_key) > deltas.get(old_key)) {
        did_move.add(new_key);
        insert3(new_block);
      } else {
        will_move.add(old_key);
        o--;
      }
    }
    while (o--) {
      const old_block = old_blocks[o];
      if (!new_lookup.has(old_block.key))
        destroy(old_block, lookup);
    }
    while (n2)
      insert3(new_blocks[n2 - 1]);
    return new_blocks;
  }
  function validate_each_keys(ctx, list, get_context, get_key) {
    const keys7 = /* @__PURE__ */ new Set();
    for (let i = 0; i < list.length; i++) {
      const key = get_key(get_context(ctx, list, i));
      if (keys7.has(key)) {
        throw new Error("Cannot have duplicate keys in a keyed each");
      }
      keys7.add(key);
    }
  }
  function get_spread_update(levels, updates) {
    const update3 = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
      const o = levels[i];
      const n2 = updates[i];
      if (n2) {
        for (const key in o) {
          if (!(key in n2))
            to_null_out[key] = 1;
        }
        for (const key in n2) {
          if (!accounted_for[key]) {
            update3[key] = n2[key];
            accounted_for[key] = 1;
          }
        }
        levels[i] = n2;
      } else {
        for (const key in o) {
          accounted_for[key] = 1;
        }
      }
    }
    for (const key in to_null_out) {
      if (!(key in update3))
        update3[key] = void 0;
    }
    return update3;
  }
  function get_spread_object(spread_props) {
    return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
  }
  const boolean_attributes = /* @__PURE__ */ new Set([
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ]);
  const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
  function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
      const classes_to_add = attrs_to_add.classes;
      const styles_to_add = attrs_to_add.styles;
      if (classes_to_add) {
        if (attributes.class == null) {
          attributes.class = classes_to_add;
        } else {
          attributes.class += " " + classes_to_add;
        }
      }
      if (styles_to_add) {
        if (attributes.style == null) {
          attributes.style = style_object_to_string(styles_to_add);
        } else {
          attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
        }
      }
    }
    let str = "";
    Object.keys(attributes).forEach((name) => {
      if (invalid_attribute_name_character.test(name))
        return;
      const value = attributes[name];
      if (value === true)
        str += " " + name;
      else if (boolean_attributes.has(name.toLowerCase())) {
        if (value)
          str += " " + name;
      } else if (value != null) {
        str += ` ${name}="${value}"`;
      }
    });
    return str;
  }
  function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(";")) {
      const colon_index = individual_style.indexOf(":");
      const name = individual_style.slice(0, colon_index).trim();
      const value = individual_style.slice(colon_index + 1).trim();
      if (!name)
        continue;
      style_object[name] = value;
    }
    for (const name in style_directive) {
      const value = style_directive[name];
      if (value) {
        style_object[name] = value;
      } else {
        delete style_object[name];
      }
    }
    return style_object;
  }
  const escaped = {
    '"': "&quot;",
    "'": "&#39;",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function escape(html) {
    return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
  }
  function escape_attribute_value(value) {
    return typeof value === "string" ? escape(value) : value;
  }
  function escape_object(obj) {
    const result = {};
    for (const key in obj) {
      result[key] = escape_attribute_value(obj[key]);
    }
    return result;
  }
  function each(items, fn) {
    let str = "";
    for (let i = 0; i < items.length; i += 1) {
      str += fn(items[i], i);
    }
    return str;
  }
  const missing_component = {
    $$render: () => ""
  };
  function validate_component(component, name) {
    if (!component || !component.$$render) {
      if (name === "svelte:component")
        name += " this={...}";
      throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
  }
  function debug3(file, line, column, values6) {
    console.log(`{@debug} ${file ? file + " " : ""}(${line}:${column})`);
    console.log(values6);
    return "";
  }
  let on_destroy;
  function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
      const parent_component = exports.current_component;
      const $$ = {
        on_destroy,
        context: new Map(context || (parent_component ? parent_component.$$.context : [])),
        on_mount: [],
        before_update: [],
        after_update: [],
        callbacks: blank_object2()
      };
      set_current_component2({ $$ });
      const html = fn(result, props, bindings, slots);
      set_current_component2(parent_component);
      return html;
    }
    return {
      render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
        on_destroy = [];
        const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
        const html = $$render(result, props, {}, $$slots, context);
        run_all2(on_destroy);
        return {
          html,
          css: {
            code: Array.from(result.css).map((css) => css.code).join("\n"),
            map: null
          },
          head: result.title + result.head
        };
      },
      $$render
    };
  }
  function add_attribute(name, value, boolean) {
    if (value == null || boolean && !value)
      return "";
    const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
    return ` ${name}${assignment}`;
  }
  function add_classes(classes) {
    return classes ? ` class="${classes}"` : "";
  }
  function style_object_to_string(style_object) {
    return Object.keys(style_object).filter((key) => style_object[key]).map((key) => `${key}: ${style_object[key]};`).join(" ");
  }
  function add_styles(style_object) {
    const styles = style_object_to_string(style_object);
    return styles ? ` style="${styles}"` : "";
  }
  function bind(component, name, callback) {
    const index2 = component.$$.props[name];
    if (index2 !== void 0) {
      component.$$.bound[index2] = callback;
      callback(component.$$.ctx[index2]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
  }
  function mount_component2(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy: on_destroy2, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback2(() => {
        const new_on_destroy = on_mount.map(run2).filter(is_function2);
        if (on_destroy2) {
          on_destroy2.push(...new_on_destroy);
        } else {
          run_all2(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback2);
  }
  function destroy_component2(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all2($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty2(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components2.push(component);
      schedule_update2();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init2(component, options, instance2, create_fragment2, not_equal2, props, append_styles2, dirty = [-1]) {
    const parent_component = exports.current_component;
    set_current_component2(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: null,
      props,
      update: noop2,
      not_equal: not_equal2,
      bound: blank_object2(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      callbacks: blank_object2(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles2 && append_styles2($$.root);
    let ready = false;
    $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty2(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all2($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children2(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach2);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in2(component.$$.fragment);
      mount_component2(component, options.target, options.anchor, options.customElement);
      end_hydrating();
      flush2();
    }
    set_current_component2(parent_component);
  }
  if (typeof HTMLElement === "function") {
    exports.SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const { on_mount } = this.$$;
        this.$$.on_disconnect = on_mount.map(run2).filter(is_function2);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr3, _oldValue, newValue) {
        this[attr3] = newValue;
      }
      disconnectedCallback() {
        run_all2(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component2(this, 1);
        this.$destroy = noop2;
      }
      $on(type3, callback) {
        const callbacks = this.$$.callbacks[type3] || (this.$$.callbacks[type3] = []);
        callbacks.push(callback);
        return () => {
          const index2 = callbacks.indexOf(callback);
          if (index2 !== -1)
            callbacks.splice(index2, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty2($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }
  class SvelteComponent2 {
    $destroy() {
      destroy_component2(this, 1);
      this.$destroy = noop2;
    }
    $on(type3, callback) {
      const callbacks = this.$$.callbacks[type3] || (this.$$.callbacks[type3] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty2($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }
  function dispatch_dev(type3, detail) {
    document.dispatchEvent(custom_event(type3, Object.assign({ version: "3.47.0" }, detail), true));
  }
  function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", { target, node });
    append2(target, node);
  }
  function append_hydration_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", { target, node });
    append_hydration(target, node);
  }
  function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", { target, node, anchor });
    insert2(target, node, anchor);
  }
  function insert_hydration_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", { target, node, anchor });
    insert_hydration(target, node, anchor);
  }
  function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", { node });
    detach2(node);
  }
  function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
      detach_dev(before.nextSibling);
    }
  }
  function detach_before_dev(after) {
    while (after.previousSibling) {
      detach_dev(after.previousSibling);
    }
  }
  function detach_after_dev(before) {
    while (before.nextSibling) {
      detach_dev(before.nextSibling);
    }
  }
  function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
      modifiers.push("preventDefault");
    if (has_stop_propagation)
      modifiers.push("stopPropagation");
    dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
    const dispose = listen2(node, event, handler, options);
    return () => {
      dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
      dispose();
    };
  }
  function attr_dev(node, attribute, value) {
    attr2(node, attribute, value);
    if (value == null)
      dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
    else
      dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
  }
  function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev("SvelteDOMSetProperty", { node, property, value });
  }
  function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev("SvelteDOMSetDataset", { node, property, value });
  }
  function set_data_dev(text3, data) {
    data = "" + data;
    if (text3.wholeText === data)
      return;
    dispatch_dev("SvelteDOMSetData", { node: text3, data });
    text3.data = data;
  }
  function validate_each_argument(arg) {
    if (typeof arg !== "string" && !(arg && typeof arg === "object" && "length" in arg)) {
      let msg = "{#each} only iterates over array-like objects.";
      if (typeof Symbol === "function" && arg && Symbol.iterator in arg) {
        msg += " You can use a spread to convert this iterable into an array.";
      }
      throw new Error(msg);
    }
  }
  function validate_slots(name, slot, keys7) {
    for (const slot_key of Object.keys(slot)) {
      if (!~keys7.indexOf(slot_key)) {
        console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
      }
    }
  }
  function validate_dynamic_element(tag) {
    if (tag && typeof tag !== "string") {
      throw new Error('<svelte:element> expects "this" attribute to be a string.');
    }
  }
  class SvelteComponentDev extends SvelteComponent2 {
    constructor(options) {
      if (!options || !options.target && !options.$$inline) {
        throw new Error("'target' is a required option");
      }
      super();
    }
    $destroy() {
      super.$destroy();
      this.$destroy = () => {
        console.warn("Component was already destroyed");
      };
    }
    $capture_state() {
    }
    $inject_state() {
    }
  }
  class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options) {
      super(options);
    }
  }
  function loop_guard(timeout) {
    const start = Date.now();
    return () => {
      if (Date.now() - start > timeout) {
        throw new Error("Infinite loop detected");
      }
    };
  }
  exports.HtmlTag = HtmlTag;
  exports.HtmlTagHydration = HtmlTagHydration;
  exports.SvelteComponent = SvelteComponent2;
  exports.SvelteComponentDev = SvelteComponentDev;
  exports.SvelteComponentTyped = SvelteComponentTyped;
  exports.action_destroyer = action_destroyer;
  exports.add_attribute = add_attribute;
  exports.add_classes = add_classes;
  exports.add_flush_callback = add_flush_callback;
  exports.add_location = add_location;
  exports.add_render_callback = add_render_callback2;
  exports.add_resize_listener = add_resize_listener;
  exports.add_styles = add_styles;
  exports.add_transform = add_transform;
  exports.afterUpdate = afterUpdate;
  exports.append = append2;
  exports.append_dev = append_dev;
  exports.append_empty_stylesheet = append_empty_stylesheet;
  exports.append_hydration = append_hydration;
  exports.append_hydration_dev = append_hydration_dev;
  exports.append_styles = append_styles;
  exports.assign = assign;
  exports.attr = attr2;
  exports.attr_dev = attr_dev;
  exports.attribute_to_object = attribute_to_object;
  exports.beforeUpdate = beforeUpdate;
  exports.bind = bind;
  exports.binding_callbacks = binding_callbacks2;
  exports.blank_object = blank_object2;
  exports.bubble = bubble;
  exports.check_outros = check_outros2;
  exports.children = children2;
  exports.claim_component = claim_component;
  exports.claim_element = claim_element;
  exports.claim_html_tag = claim_html_tag;
  exports.claim_space = claim_space;
  exports.claim_svg_element = claim_svg_element;
  exports.claim_text = claim_text;
  exports.clear_loops = clear_loops;
  exports.component_subscribe = component_subscribe;
  exports.compute_rest_props = compute_rest_props;
  exports.compute_slots = compute_slots;
  exports.createEventDispatcher = createEventDispatcher;
  exports.create_animation = create_animation;
  exports.create_bidirectional_transition = create_bidirectional_transition;
  exports.create_component = create_component;
  exports.create_in_transition = create_in_transition;
  exports.create_out_transition = create_out_transition;
  exports.create_slot = create_slot;
  exports.create_ssr_component = create_ssr_component;
  exports.custom_event = custom_event;
  exports.dataset_dev = dataset_dev;
  exports.debug = debug3;
  exports.destroy_block = destroy_block;
  exports.destroy_component = destroy_component2;
  exports.destroy_each = destroy_each;
  exports.detach = detach2;
  exports.detach_after_dev = detach_after_dev;
  exports.detach_before_dev = detach_before_dev;
  exports.detach_between_dev = detach_between_dev;
  exports.detach_dev = detach_dev;
  exports.dirty_components = dirty_components2;
  exports.dispatch_dev = dispatch_dev;
  exports.each = each;
  exports.element = element2;
  exports.element_is = element_is;
  exports.empty = empty2;
  exports.end_hydrating = end_hydrating;
  exports.escape = escape;
  exports.escape_attribute_value = escape_attribute_value;
  exports.escape_object = escape_object;
  exports.escaped = escaped;
  exports.exclude_internal_props = exclude_internal_props;
  exports.fix_and_destroy_block = fix_and_destroy_block;
  exports.fix_and_outro_and_destroy_block = fix_and_outro_and_destroy_block;
  exports.fix_position = fix_position;
  exports.flush = flush2;
  exports.getAllContexts = getAllContexts;
  exports.getContext = getContext;
  exports.get_all_dirty_from_scope = get_all_dirty_from_scope;
  exports.get_binding_group_value = get_binding_group_value;
  exports.get_current_component = get_current_component2;
  exports.get_custom_elements_slots = get_custom_elements_slots;
  exports.get_root_for_style = get_root_for_style;
  exports.get_slot_changes = get_slot_changes;
  exports.get_spread_object = get_spread_object;
  exports.get_spread_update = get_spread_update;
  exports.get_store_value = get_store_value;
  exports.globals = globals;
  exports.group_outros = group_outros2;
  exports.handle_promise = handle_promise2;
  exports.hasContext = hasContext;
  exports.has_prop = has_prop;
  exports.identity = identity;
  exports.init = init2;
  exports.insert = insert2;
  exports.insert_dev = insert_dev;
  exports.insert_hydration = insert_hydration;
  exports.insert_hydration_dev = insert_hydration_dev;
  exports.intros = intros;
  exports.invalid_attribute_name_character = invalid_attribute_name_character;
  exports.is_client = is_client;
  exports.is_crossorigin = is_crossorigin;
  exports.is_empty = is_empty2;
  exports.is_function = is_function2;
  exports.is_promise = is_promise2;
  exports.listen = listen2;
  exports.listen_dev = listen_dev;
  exports.loop = loop;
  exports.loop_guard = loop_guard;
  exports.merge_ssr_styles = merge_ssr_styles;
  exports.missing_component = missing_component;
  exports.mount_component = mount_component2;
  exports.noop = noop2;
  exports.not_equal = not_equal;
  exports.null_to_empty = null_to_empty;
  exports.object_without_properties = object_without_properties;
  exports.onDestroy = onDestroy;
  exports.onMount = onMount;
  exports.once = once;
  exports.outro_and_destroy_block = outro_and_destroy_block;
  exports.prevent_default = prevent_default2;
  exports.prop_dev = prop_dev;
  exports.query_selector_all = query_selector_all;
  exports.run = run2;
  exports.run_all = run_all2;
  exports.safe_not_equal = safe_not_equal2;
  exports.schedule_update = schedule_update2;
  exports.select_multiple_value = select_multiple_value;
  exports.select_option = select_option;
  exports.select_options = select_options;
  exports.select_value = select_value;
  exports.self = self2;
  exports.setContext = setContext;
  exports.set_attributes = set_attributes;
  exports.set_current_component = set_current_component2;
  exports.set_custom_element_data = set_custom_element_data;
  exports.set_data = set_data2;
  exports.set_data_dev = set_data_dev;
  exports.set_input_type = set_input_type;
  exports.set_input_value = set_input_value2;
  exports.set_now = set_now;
  exports.set_raf = set_raf;
  exports.set_store_value = set_store_value;
  exports.set_style = set_style;
  exports.set_svg_attributes = set_svg_attributes;
  exports.space = space2;
  exports.spread = spread;
  exports.src_url_equal = src_url_equal;
  exports.start_hydrating = start_hydrating;
  exports.stop_propagation = stop_propagation;
  exports.subscribe = subscribe;
  exports.svg_element = svg_element;
  exports.text = text2;
  exports.tick = tick;
  exports.time_ranges_to_array = time_ranges_to_array;
  exports.to_number = to_number;
  exports.toggle_class = toggle_class;
  exports.transition_in = transition_in2;
  exports.transition_out = transition_out2;
  exports.trusted = trusted;
  exports.update_await_block_branch = update_await_block_branch2;
  exports.update_keyed_each = update_keyed_each;
  exports.update_slot = update_slot;
  exports.update_slot_base = update_slot_base;
  exports.validate_component = validate_component;
  exports.validate_dynamic_element = validate_dynamic_element;
  exports.validate_each_argument = validate_each_argument;
  exports.validate_each_keys = validate_each_keys;
  exports.validate_slots = validate_slots;
  exports.validate_store = validate_store;
  exports.xlink_attr = xlink_attr;
})(internal);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var internal$1 = internal;
  Object.defineProperty(exports, "SvelteComponent", {
    enumerable: true,
    get: function() {
      return internal$1.SvelteComponentDev;
    }
  });
  Object.defineProperty(exports, "SvelteComponentTyped", {
    enumerable: true,
    get: function() {
      return internal$1.SvelteComponentTyped;
    }
  });
  Object.defineProperty(exports, "afterUpdate", {
    enumerable: true,
    get: function() {
      return internal$1.afterUpdate;
    }
  });
  Object.defineProperty(exports, "beforeUpdate", {
    enumerable: true,
    get: function() {
      return internal$1.beforeUpdate;
    }
  });
  Object.defineProperty(exports, "createEventDispatcher", {
    enumerable: true,
    get: function() {
      return internal$1.createEventDispatcher;
    }
  });
  Object.defineProperty(exports, "getAllContexts", {
    enumerable: true,
    get: function() {
      return internal$1.getAllContexts;
    }
  });
  Object.defineProperty(exports, "getContext", {
    enumerable: true,
    get: function() {
      return internal$1.getContext;
    }
  });
  Object.defineProperty(exports, "hasContext", {
    enumerable: true,
    get: function() {
      return internal$1.hasContext;
    }
  });
  Object.defineProperty(exports, "onDestroy", {
    enumerable: true,
    get: function() {
      return internal$1.onDestroy;
    }
  });
  Object.defineProperty(exports, "onMount", {
    enumerable: true,
    get: function() {
      return internal$1.onMount;
    }
  });
  Object.defineProperty(exports, "setContext", {
    enumerable: true,
    get: function() {
      return internal$1.setContext;
    }
  });
  Object.defineProperty(exports, "tick", {
    enumerable: true,
    get: function() {
      return internal$1.tick;
    }
  });
})(svelte);
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    render: true,
    cleanup: true,
    fireEvent: true,
    act: true
  };
  exports.render = exports.fireEvent = exports.cleanup = exports.act = void 0;
  var _dom = require$$0;
  Object.keys(_dom).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _dom[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _dom[key];
      }
    });
  });
  var _svelte = svelte;
  const _excluded3 = ["target"];
  function ownKeys2(object, enumerableOnly) {
    var keys7 = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys7.push.apply(keys7, symbols);
    }
    return keys7;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose2(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose2(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  const containerCache = /* @__PURE__ */ new Map();
  const componentCache = /* @__PURE__ */ new Set();
  const svelteComponentOptions = ["anchor", "props", "hydrate", "intro", "context"];
  const render = (Component, _ref = {}, {
    container,
    queries: queries2
  } = {}) => {
    let {
      target
    } = _ref, options = _objectWithoutProperties(_ref, _excluded3);
    container = container || document.body;
    target = target || container.appendChild(document.createElement("div"));
    const ComponentConstructor = Component.default || Component;
    const checkProps = (options2) => {
      const isProps = !Object.keys(options2).some((option) => svelteComponentOptions.includes(option));
      if (!isProps) {
        const unrecognizedOptions = Object.keys(options2).filter((option) => !svelteComponentOptions.includes(option));
        if (unrecognizedOptions.length > 0) {
          throw Error(`
          Unknown options were found [${unrecognizedOptions}]. This might happen if you've mixed
          passing in props with Svelte options into the render function. Valid Svelte options
          are [${svelteComponentOptions}]. You can either change the prop names, or pass in your
          props for that component via the \`props\` option.


          Eg: const { /** Results **/ } = render(MyComponent, { props: { /** props here **/ } })


        `);
        }
        return options2;
      }
      return {
        props: options2
      };
    };
    let component = new ComponentConstructor(_objectSpread2({
      target
    }, checkProps(options)));
    containerCache.set(container, {
      target,
      component
    });
    componentCache.add(component);
    component.$$.on_destroy.push(() => {
      componentCache.delete(component);
    });
    return _objectSpread2({
      container,
      component,
      debug: (el = container) => console.log((0, _dom.prettyDOM)(el)),
      rerender: (options2) => {
        if (componentCache.has(component))
          component.$destroy();
        component = new ComponentConstructor(_objectSpread2({
          target
        }, checkProps(options2)));
        containerCache.set(container, {
          target,
          component
        });
        componentCache.add(component);
        component.$$.on_destroy.push(() => {
          componentCache.delete(component);
        });
      },
      unmount: () => {
        if (componentCache.has(component))
          component.$destroy();
      }
    }, (0, _dom.getQueriesForElement)(container, queries2));
  };
  exports.render = render;
  const cleanupAtContainer = (container) => {
    const {
      target,
      component
    } = containerCache.get(container);
    if (componentCache.has(component))
      component.$destroy();
    if (target.parentNode === document.body) {
      document.body.removeChild(target);
    }
    containerCache.delete(container);
  };
  const cleanup = () => {
    Array.from(containerCache.keys()).forEach(cleanupAtContainer);
  };
  exports.cleanup = cleanup;
  const act = (fn) => {
    const value = fn && fn();
    if (value !== void 0 && typeof value.then === "function") {
      return value.then(() => (0, _svelte.tick)());
    }
    return (0, _svelte.tick)();
  };
  exports.act = act;
  const fireEvent2 = async (...args) => {
    const event = (0, _dom.fireEvent)(...args);
    await (0, _svelte.tick)();
    return event;
  };
  exports.fireEvent = fireEvent2;
  Object.keys(_dom.fireEvent).forEach((key) => {
    fireEvent2[key] = async (...args) => {
      const event = _dom.fireEvent[key](...args);
      await (0, _svelte.tick)();
      return event;
    };
  });
})(pure);
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _pure = pure;
  Object.keys(_pure).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _pure[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _pure[key];
      }
    });
  });
  if (typeof afterEach === "function" && !{}.STL_SKIP_AUTO_CLEANUP) {
    afterEach(async () => {
      await (0, _pure.act)();
      (0, _pure.cleanup)();
    });
  }
})(dist);
var helpers = {};
Object.defineProperty(helpers, "__esModule", {
  value: true
});
helpers.TEXT_NODE = void 0;
helpers.checkContainerType = checkContainerType;
helpers.getDocument = getDocument$1;
var getWindowFromNode_1 = helpers.getWindowFromNode = getWindowFromNode;
helpers.jestFakeTimersAreEnabled = jestFakeTimersAreEnabled;
const TEXT_NODE = 3;
helpers.TEXT_NODE = TEXT_NODE;
function jestFakeTimersAreEnabled() {
  if (typeof jest !== "undefined" && jest !== null) {
    return setTimeout._isMockFunction === true || Object.prototype.hasOwnProperty.call(setTimeout, "clock");
  }
  return false;
}
function getDocument$1() {
  if (typeof window === "undefined") {
    throw new Error("Could not find default container");
  }
  return window.document;
}
function getWindowFromNode(node) {
  if (node.defaultView) {
    return node.defaultView;
  } else if (node.ownerDocument && node.ownerDocument.defaultView) {
    return node.ownerDocument.defaultView;
  } else if (node.window) {
    return node.window;
  } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
    throw new Error(`It looks like the window object is not available for the provided node.`);
  } else if (node.then instanceof Function) {
    throw new Error(`It looks like you passed a Promise object instead of a DOM node. Did you do something like \`fireEvent.click(screen.findBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`, or await the findBy query \`fireEvent.click(await screen.findBy...\`?`);
  } else if (Array.isArray(node)) {
    throw new Error(`It looks like you passed an Array instead of a DOM node. Did you do something like \`fireEvent.click(screen.getAllBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`?`);
  } else if (typeof node.debug === "function" && typeof node.logTestingPlaygroundURL === "function") {
    throw new Error(`It looks like you passed a \`screen\` object. Did you do something like \`fireEvent.click(screen, ...\` when you meant to use a query, e.g. \`fireEvent.click(screen.getBy..., \`?`);
  } else {
    throw new Error(`The given node is not an Element, the node type is: ${typeof node}.`);
  }
}
function checkContainerType(container) {
  if (!container || !(typeof container.querySelector === "function") || !(typeof container.querySelectorAll === "function")) {
    throw new TypeError(`Expected container to be an Element, a Document or a DocumentFragment but got ${getTypeName(container)}.`);
  }
  function getTypeName(object) {
    if (typeof object === "object") {
      return object === null ? "null" : object.constructor.name;
    }
    return typeof object;
  }
}
var eventMap$2 = {};
Object.defineProperty(eventMap$2, "__esModule", {
  value: true
});
var eventMap_2 = eventMap$2.eventMap = eventMap$2.eventAliasMap = void 0;
const eventMap$1 = {
  copy: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  cut: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  paste: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionEnd: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionStart: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionUpdate: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  keyDown: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  keyPress: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  keyUp: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  focus: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  blur: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  focusIn: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  focusOut: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  change: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  input: {
    EventType: "InputEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  invalid: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: true
    }
  },
  submit: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  reset: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  click: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      button: 0,
      composed: true
    }
  },
  contextMenu: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dblClick: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  drag: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragEnd: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragEnter: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragExit: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragLeave: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragOver: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragStart: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  drop: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseDown: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseEnter: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseLeave: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseMove: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseOut: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseOver: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseUp: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  select: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  touchCancel: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  touchEnd: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  touchMove: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  touchStart: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  resize: {
    EventType: "UIEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  scroll: {
    EventType: "UIEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  wheel: {
    EventType: "WheelEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  abort: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  canPlay: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  canPlayThrough: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  durationChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  emptied: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  encrypted: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  ended: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadedData: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadedMetadata: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadStart: {
    EventType: "ProgressEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pause: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  play: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  playing: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  progress: {
    EventType: "ProgressEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  rateChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  seeked: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  seeking: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  stalled: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  suspend: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  timeUpdate: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  volumeChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  waiting: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  load: {
    EventType: "UIEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  error: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  animationStart: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  animationEnd: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  animationIteration: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  transitionCancel: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  transitionEnd: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  transitionRun: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  transitionStart: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  pointerOver: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerEnter: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pointerDown: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerMove: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerUp: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerCancel: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  pointerOut: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerLeave: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  gotPointerCapture: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  lostPointerCapture: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  popState: {
    EventType: "PopStateEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  }
};
eventMap_2 = eventMap$2.eventMap = eventMap$1;
const eventAliasMap = {
  doubleClick: "dblClick"
};
eventMap$2.eventAliasMap = eventAliasMap;
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp2.call(b2, prop))
      __defNormalProp2(a, prop, b2[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b2)) {
      if (__propIsEnum2.call(b2, prop))
        __defNormalProp2(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function isElementType(element2, tag, props) {
  if (element2.namespaceURI && element2.namespaceURI !== "http://www.w3.org/1999/xhtml") {
    return false;
  }
  tag = Array.isArray(tag) ? tag : [tag];
  if (!tag.includes(element2.tagName.toLowerCase())) {
    return false;
  }
  if (props) {
    return Object.entries(props).every(([k, v2]) => element2[k] === v2);
  }
  return true;
}
var CLICKABLE_INPUT_TYPES = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit",
  "checkbox",
  "radio"
];
function isClickableInput(element2) {
  return isElementType(element2, "button") || isElementType(element2, "input") && CLICKABLE_INPUT_TYPES.includes(element2.type);
}
function readBlobText(blob, FileReader) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onerror = rej;
    fr.onabort = rej;
    fr.onload = () => {
      res(String(fr.result));
    };
    fr.readAsText(blob);
  });
}
function createFileList(files) {
  const list = __spreadProps(__spreadValues2({}, files), {
    length: files.length,
    item: (index2) => list[index2],
    [Symbol.iterator]: function* nextFile() {
      for (let i = 0; i < list.length; i++) {
        yield list[i];
      }
    }
  });
  list.constructor = FileList;
  Object.setPrototypeOf(list, FileList.prototype);
  Object.freeze(list);
  return list;
}
var DataTransferItemStub = class {
  constructor(dataOrFile, type3) {
    this.file = null;
    this.data = void 0;
    if (typeof dataOrFile === "string") {
      this.kind = "string";
      this.type = String(type3);
      this.data = dataOrFile;
    } else {
      this.kind = "file";
      this.type = dataOrFile.type;
      this.file = dataOrFile;
    }
  }
  getAsFile() {
    return this.file;
  }
  getAsString(callback) {
    if (typeof this.data === "string") {
      callback(this.data);
    }
  }
  webkitGetAsEntry() {
    throw new Error("not implemented");
  }
};
var DataTransferItemListStub = class extends Array {
  add(...args) {
    const item = new DataTransferItemStub(args[0], args[1]);
    this.push(item);
    return item;
  }
  clear() {
    this.splice(0, this.length);
  }
  remove(index2) {
    this.splice(index2, 1);
  }
};
function getTypeMatcher(type3, exact) {
  const [group, sub] = type3.split("/");
  const isGroup = !sub || sub === "*";
  return (item) => {
    return exact ? item.type === (isGroup ? group : type3) : isGroup ? item.type.startsWith(`${group}/`) : item.type === group;
  };
}
var DataTransferStub = class {
  constructor() {
    this.dropEffect = "none";
    this.effectAllowed = "uninitialized";
    this.items = new DataTransferItemListStub();
    this.files = createFileList([]);
  }
  getData(format2) {
    var _a;
    const match = (_a = this.items.find(getTypeMatcher(format2, true))) != null ? _a : this.items.find(getTypeMatcher(format2, false));
    let text2 = "";
    match == null ? void 0 : match.getAsString((t) => {
      text2 = t;
    });
    return text2;
  }
  setData(format2, data) {
    const matchIndex = this.items.findIndex(getTypeMatcher(format2, true));
    const item = new DataTransferItemStub(data, format2);
    if (matchIndex >= 0) {
      this.items.splice(matchIndex, 1, item);
    } else {
      this.items.push(item);
    }
  }
  clearData(format2) {
    if (format2) {
      const matchIndex = this.items.findIndex(getTypeMatcher(format2, true));
      if (matchIndex >= 0) {
        this.items.remove(matchIndex);
      }
    } else {
      this.items.clear();
    }
  }
  get types() {
    const t = [];
    if (this.files.length) {
      t.push("Files");
    }
    this.items.forEach((i) => t.push(i.type));
    Object.freeze(t);
    return t;
  }
  setDragImage() {
  }
};
function createDataTransfer(window2, files = []) {
  const dt = typeof window2.DataTransfer === "undefined" ? new DataTransferStub() : new window2.DataTransfer();
  Object.defineProperty(dt, "files", { get: () => createFileList(files) });
  return dt;
}
function getBlobFromDataTransferItem(window2, item) {
  if (item.kind === "file") {
    return item.getAsFile();
  }
  let data = "";
  item.getAsString((s) => {
    data = s;
  });
  return new window2.Blob([data], { type: item.type });
}
function getWindow(node) {
  return getWindowFromNode_1(node);
}
function createClipboardItem(window2, ...blobs) {
  const dataMap = Object.fromEntries(blobs.map((b2) => [
    typeof b2 === "string" ? "text/plain" : b2.type,
    Promise.resolve(b2)
  ]));
  if (typeof window2.ClipboardItem !== "undefined") {
    return new window2.ClipboardItem(dataMap);
  }
  return new class ClipboardItem {
    constructor(d2) {
      this.data = d2;
    }
    get types() {
      return Array.from(Object.keys(this.data));
    }
    getType(type3) {
      return __async(this, null, function* () {
        const value = yield this.data[type3];
        if (!value) {
          throw new Error(`${type3} is not one of the available MIME types on this item.`);
        }
        return value instanceof window2.Blob ? value : new window2.Blob([value], { type: type3 });
      });
    }
  }(dataMap);
}
var ClipboardStubControl = Symbol("Manage ClipboardSub");
function createClipboardStub(window2) {
  var _a;
  return new (_a = class extends window2.EventTarget {
    constructor() {
      super(...arguments);
      this.items = [];
    }
    read() {
      return __async(this, null, function* () {
        return Array.from(this.items);
      });
    }
    readText() {
      return __async(this, null, function* () {
        let text2 = "";
        for (const item of this.items) {
          const type3 = item.types.includes("text/plain") ? "text/plain" : item.types.find((t) => t.startsWith("text/"));
          if (type3) {
            text2 += yield item.getType(type3).then((b2) => readBlobText(b2, window2.FileReader));
          }
        }
        return text2;
      });
    }
    write(data) {
      return __async(this, null, function* () {
        this.items = data;
      });
    }
    writeText(text2) {
      return __async(this, null, function* () {
        this.items = [createClipboardItem(window2, text2)];
      });
    }
  }, _a)();
}
function isClipboardStub(clipboard) {
  return !!(clipboard == null ? void 0 : clipboard[ClipboardStubControl]);
}
function attachClipboardStubToView(window2) {
  if (isClipboardStub(window2.navigator.clipboard)) {
    return window2.navigator.clipboard[ClipboardStubControl];
  }
  const realClipboard = Object.getOwnPropertyDescriptor(window2.navigator, "clipboard");
  let stub = createClipboardStub(window2);
  const control = {
    resetClipboardStub: () => {
      stub = createClipboardStub(window2);
      stub[ClipboardStubControl] = control;
    },
    detachClipboardStub: () => {
      if (realClipboard) {
        Object.defineProperty(window2.navigator, "clipboard", realClipboard);
      } else {
        Object.defineProperty(window2.navigator, "clipboard", {
          value: void 0,
          configurable: true
        });
      }
    }
  };
  stub[ClipboardStubControl] = control;
  Object.defineProperty(window2.navigator, "clipboard", {
    get: () => stub,
    configurable: true
  });
  return stub[ClipboardStubControl];
}
function resetClipboardStubOnView(window2) {
  if (isClipboardStub(window2.navigator.clipboard)) {
    window2.navigator.clipboard[ClipboardStubControl].resetClipboardStub();
  }
}
function detachClipboardStubFromView(window2) {
  if (isClipboardStub(window2.navigator.clipboard)) {
    window2.navigator.clipboard[ClipboardStubControl].detachClipboardStub();
  }
}
function readDataTransferFromClipboard(document2) {
  return __async(this, null, function* () {
    const window2 = document2.defaultView;
    const clipboard = window2 == null ? void 0 : window2.navigator.clipboard;
    const items = clipboard && (yield clipboard.read());
    if (!items) {
      throw new Error("The Clipboard API is unavailable.");
    }
    const dt = createDataTransfer(window2);
    for (const item of items) {
      for (const type3 of item.types) {
        dt.setData(type3, yield item.getType(type3).then((b2) => readBlobText(b2, window2.FileReader)));
      }
    }
    return dt;
  });
}
function writeDataTransferToClipboard(document2, clipboardData) {
  return __async(this, null, function* () {
    const window2 = getWindow(document2);
    const clipboard = window2.navigator.clipboard;
    const items = [];
    for (let i = 0; i < clipboardData.items.length; i++) {
      const dtItem = clipboardData.items[i];
      const blob = getBlobFromDataTransferItem(window2, dtItem);
      items.push(createClipboardItem(window2, blob));
    }
    const written = clipboard && (yield clipboard.write(items).then(() => true, () => false));
    if (!written) {
      throw new Error("The Clipboard API is unavailable.");
    }
  });
}
if (typeof globalThis.afterEach === "function") {
  globalThis.afterEach(() => resetClipboardStubOnView(globalThis.window));
}
if (typeof globalThis.afterAll === "function") {
  globalThis.afterAll(() => detachClipboardStubFromView(globalThis.window));
}
function isContentEditable(element2) {
  return element2.hasAttribute("contenteditable") && (element2.getAttribute("contenteditable") == "true" || element2.getAttribute("contenteditable") == "");
}
function getContentEditable(node) {
  const element2 = getElement(node);
  return element2 && (element2.closest('[contenteditable=""]') || element2.closest('[contenteditable="true"]'));
}
function getElement(node) {
  return node.nodeType === 1 ? node : node.parentElement;
}
function getValue(element2) {
  if (!element2) {
    return null;
  }
  if (isContentEditable(element2)) {
    return element2.textContent;
  }
  return getUIValue(element2);
}
var parseInt$1 = globalThis.parseInt;
function buildTimeValue(value) {
  const onlyDigitsValue = value.replace(/\D/g, "");
  if (onlyDigitsValue.length < 2) {
    return value;
  }
  const firstDigit = parseInt$1(onlyDigitsValue[0], 10);
  const secondDigit = parseInt$1(onlyDigitsValue[1], 10);
  if (firstDigit >= 3 || firstDigit === 2 && secondDigit >= 4) {
    let index2;
    if (firstDigit >= 3) {
      index2 = 1;
    } else {
      index2 = 2;
    }
    return build(onlyDigitsValue, index2);
  }
  if (value.length === 2) {
    return value;
  }
  return build(onlyDigitsValue, 2);
}
function build(onlyDigitsValue, index2) {
  const hours = onlyDigitsValue.slice(0, index2);
  const validHours = Math.min(parseInt$1(hours, 10), 23);
  const minuteCharacters = onlyDigitsValue.slice(index2);
  const parsedMinutes = parseInt$1(minuteCharacters, 10);
  const validMinutes = Math.min(parsedMinutes, 59);
  return `${validHours.toString().padStart(2, "0")}:${validMinutes.toString().padStart(2, "0")}`;
}
function isValidDateOrTimeValue(element2, value) {
  const clone = element2.cloneNode();
  clone.value = value;
  return clone.value === value;
}
var maxLengthSupportedTypes = /* @__PURE__ */ ((maxLengthSupportedTypes2) => {
  maxLengthSupportedTypes2["email"] = "email";
  maxLengthSupportedTypes2["password"] = "password";
  maxLengthSupportedTypes2["search"] = "search";
  maxLengthSupportedTypes2["telephone"] = "telephone";
  maxLengthSupportedTypes2["text"] = "text";
  maxLengthSupportedTypes2["url"] = "url";
  return maxLengthSupportedTypes2;
})(maxLengthSupportedTypes || {});
function getSpaceUntilMaxLength(element2) {
  const value = getValue(element2);
  if (value === null) {
    return void 0;
  }
  const maxLength = getSanitizedMaxLength(element2);
  return maxLength ? maxLength - value.length : void 0;
}
function getSanitizedMaxLength(element2) {
  var _a;
  if (!supportsMaxLength(element2)) {
    return void 0;
  }
  const attr2 = (_a = element2.getAttribute("maxlength")) != null ? _a : "";
  return /^\d+$/.test(attr2) && Number(attr2) >= 0 ? Number(attr2) : void 0;
}
function supportsMaxLength(element2) {
  return isElementType(element2, "textarea") || isElementType(element2, "input") && Boolean(maxLengthSupportedTypes[element2.type]);
}
function isDateOrTime(element2) {
  return isElementType(element2, "input") && ["date", "time"].includes(element2.type);
}
function input(config2, element2, data, inputType = "insertText") {
  const inputRange = getInputRange(element2);
  if (!inputRange) {
    return;
  }
  if (!isDateOrTime(element2)) {
    const unprevented = dispatchUIEvent(config2, element2, "beforeinput", {
      inputType,
      data
    });
    if (!unprevented) {
      return;
    }
  }
  if ("startContainer" in inputRange) {
    editContenteditable(config2, element2, inputRange, data, inputType);
  } else {
    editInputElement(config2, element2, inputRange, data, inputType);
  }
}
function editContenteditable(config2, element2, inputRange, data, inputType) {
  let del = false;
  if (!inputRange.collapsed) {
    del = true;
    inputRange.deleteContents();
  } else if (["deleteContentBackward", "deleteContentForward"].includes(inputType)) {
    const nextPosition = getNextCursorPosition(inputRange.startContainer, inputRange.startOffset, inputType === "deleteContentBackward" ? -1 : 1, inputType);
    if (nextPosition) {
      del = true;
      const delRange = inputRange.cloneRange();
      if (delRange.comparePoint(nextPosition.node, nextPosition.offset) < 0) {
        delRange.setStart(nextPosition.node, nextPosition.offset);
      } else {
        delRange.setEnd(nextPosition.node, nextPosition.offset);
      }
      delRange.deleteContents();
    }
  }
  if (data) {
    if (inputRange.endContainer.nodeType === 3) {
      const offset = inputRange.endOffset;
      inputRange.endContainer.insertData(offset, data);
      inputRange.setStart(inputRange.endContainer, offset + data.length);
      inputRange.setEnd(inputRange.endContainer, offset + data.length);
    } else {
      const text2 = element2.ownerDocument.createTextNode(data);
      inputRange.insertNode(text2);
      inputRange.setStart(text2, data.length);
      inputRange.setEnd(text2, data.length);
    }
  }
  if (del || data) {
    dispatchUIEvent(config2, element2, "input", { inputType });
  }
}
function editInputElement(config2, element2, inputRange, data, inputType) {
  let dataToInsert = data;
  const spaceUntilMaxLength = getSpaceUntilMaxLength(element2);
  if (spaceUntilMaxLength !== void 0 && data.length > 0) {
    if (spaceUntilMaxLength > 0) {
      dataToInsert = data.substring(0, spaceUntilMaxLength);
    } else {
      return;
    }
  }
  const { newValue, newOffset, oldValue } = calculateNewValue(dataToInsert, element2, inputRange, inputType);
  if (newValue === oldValue && newOffset === inputRange.startOffset && newOffset === inputRange.endOffset) {
    return;
  }
  if (isElementType(element2, "input", { type: "number" }) && !isValidNumberInput(newValue)) {
    return;
  }
  setUIValue(element2, newValue);
  setSelection({
    focusNode: element2,
    anchorOffset: newOffset,
    focusOffset: newOffset
  });
  if (isDateOrTime(element2)) {
    if (isValidDateOrTimeValue(element2, newValue)) {
      commitInput(config2, element2, newOffset, {});
      dispatchUIEvent(config2, element2, "change");
      clearInitialValue(element2);
    }
  } else {
    commitInput(config2, element2, newOffset, {
      data,
      inputType
    });
  }
}
function calculateNewValue(inputData, node, {
  startOffset,
  endOffset
}, inputType) {
  const value = getUIValue(node);
  const prologEnd = Math.max(0, startOffset === endOffset && inputType === "deleteContentBackward" ? startOffset - 1 : startOffset);
  const prolog = value.substring(0, prologEnd);
  const epilogStart = Math.min(value.length, startOffset === endOffset && inputType === "deleteContentForward" ? startOffset + 1 : endOffset);
  const epilog = value.substring(epilogStart, value.length);
  let newValue = `${prolog}${inputData}${epilog}`;
  let newOffset = prologEnd + inputData.length;
  if (isElementType(node, "input", { type: "time" })) {
    const builtValue = buildTimeValue(newValue);
    if (builtValue !== "" && isValidDateOrTimeValue(node, builtValue)) {
      newValue = builtValue;
      newOffset = builtValue.length;
    }
  }
  return {
    oldValue: value,
    newValue,
    newOffset
  };
}
function commitInput(config2, element2, newOffset, inputInit) {
  startTrackValue(element2);
  dispatchUIEvent(config2, element2, "input", inputInit);
  if (endTrackValue(element2)) {
    setSelection({
      focusNode: element2,
      anchorOffset: newOffset,
      focusOffset: newOffset
    });
  }
}
function isValidNumberInput(value) {
  var _a, _b;
  const valueParts = value.split("e", 2);
  return !(/[^\d.\-e]/.test(value) || Number((_a = value.match(/-/g)) == null ? void 0 : _a.length) > 2 || Number((_b = value.match(/\./g)) == null ? void 0 : _b.length) > 1 || valueParts[1] && !/^-?\d*$/.test(valueParts[1]));
}
function isEditable(element2) {
  return isEditableInput(element2) || isElementType(element2, "textarea", { readOnly: false }) || isContentEditable(element2);
}
var editableInputTypes = /* @__PURE__ */ ((editableInputTypes2) => {
  editableInputTypes2["text"] = "text";
  editableInputTypes2["date"] = "date";
  editableInputTypes2["datetime-local"] = "datetime-local";
  editableInputTypes2["email"] = "email";
  editableInputTypes2["month"] = "month";
  editableInputTypes2["number"] = "number";
  editableInputTypes2["password"] = "password";
  editableInputTypes2["search"] = "search";
  editableInputTypes2["tel"] = "tel";
  editableInputTypes2["time"] = "time";
  editableInputTypes2["url"] = "url";
  editableInputTypes2["week"] = "week";
  return editableInputTypes2;
})(editableInputTypes || {});
function isEditableInput(element2) {
  return isElementType(element2, "input", { readOnly: false }) && Boolean(editableInputTypes[element2.type]);
}
var fakeFiles = Symbol("files and value properties are mocked");
function setFiles(el, files) {
  var _a;
  (_a = el[fakeFiles]) == null ? void 0 : _a.restore();
  const objectDescriptors = Object.getOwnPropertyDescriptors(el);
  const prototypeDescriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(el));
  function restore() {
    Object.defineProperties(el, {
      files: __spreadValues2(__spreadValues2({}, prototypeDescriptors.files), objectDescriptors.files),
      value: __spreadValues2(__spreadValues2({}, prototypeDescriptors.value), objectDescriptors.value),
      type: __spreadValues2(__spreadValues2({}, prototypeDescriptors.type), objectDescriptors.type)
    });
  }
  el[fakeFiles] = { restore };
  Object.defineProperties(el, {
    files: __spreadProps(__spreadValues2(__spreadValues2({}, prototypeDescriptors.files), objectDescriptors.files), {
      get: () => files
    }),
    value: __spreadProps(__spreadValues2(__spreadValues2({}, prototypeDescriptors.value), objectDescriptors.value), {
      get: () => files.length ? `C:\\fakepath\\${files[0].name}` : "",
      set(v2) {
        var _a2;
        if (v2 === "") {
          restore();
        } else {
          (_a2 = objectDescriptors.value.set) == null ? void 0 : _a2.call(el, v2);
        }
      }
    }),
    type: __spreadProps(__spreadValues2(__spreadValues2({}, prototypeDescriptors.type), objectDescriptors.type), {
      set(v2) {
        if (v2 !== "file") {
          restore();
          el.type = v2;
        }
      }
    })
  });
}
function eventWrapper2(cb) {
  let result;
  getConfig().eventWrapper(() => {
    result = cb();
  });
  return result;
}
function isDisabled(element2) {
  var _a;
  for (let el = element2; el; el = el.parentElement) {
    if (isElementType(el, [
      "button",
      "input",
      "select",
      "textarea",
      "optgroup",
      "option"
    ])) {
      if (el.hasAttribute("disabled")) {
        return true;
      }
    } else if (isElementType(el, "fieldset")) {
      if (el.hasAttribute("disabled") && !((_a = el.querySelector(":scope > legend")) == null ? void 0 : _a.contains(element2))) {
        return true;
      }
    } else if (el.tagName.includes("-")) {
      if (el.constructor.formAssociated && el.hasAttribute("disabled")) {
        return true;
      }
    }
  }
  return false;
}
function getActiveElement(document2) {
  const activeElement = document2.activeElement;
  if (activeElement == null ? void 0 : activeElement.shadowRoot) {
    return getActiveElement(activeElement.shadowRoot);
  } else {
    if (isDisabled(activeElement)) {
      return document2.ownerDocument ? document2.ownerDocument.body : document2.body;
    }
    return activeElement;
  }
}
var FOCUSABLE_SELECTOR = [
  "input:not([type=hidden]):not([disabled])",
  "button:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[contenteditable=""]',
  '[contenteditable="true"]',
  "a[href]",
  "[tabindex]:not([disabled])"
].join(", ");
function isFocusable(element2) {
  return element2.matches(FOCUSABLE_SELECTOR);
}
function blur(element2) {
  if (!isFocusable(element2))
    return;
  const wasActive = getActiveElement(element2.ownerDocument) === element2;
  if (!wasActive)
    return;
  eventWrapper2(() => element2.blur());
}
function getNextCursorPosition(node, offset, direction, inputType) {
  if (isTextNode(node) && offset + direction >= 0 && offset + direction <= node.nodeValue.length) {
    return { node, offset: offset + direction };
  }
  const nextNode = getNextCharacterContentNode(node, offset, direction);
  if (nextNode) {
    if (isTextNode(nextNode)) {
      return {
        node: nextNode,
        offset: direction > 0 ? Math.min(1, nextNode.nodeValue.length) : Math.max(nextNode.nodeValue.length - 1, 0)
      };
    } else if (isElementType(nextNode, "br")) {
      const nextPlusOne = getNextCharacterContentNode(nextNode, void 0, direction);
      if (!nextPlusOne) {
        if (direction < 0 && inputType === "deleteContentBackward") {
          return {
            node: nextNode.parentNode,
            offset: getOffset(nextNode)
          };
        }
        return void 0;
      } else if (isTextNode(nextPlusOne)) {
        return {
          node: nextPlusOne,
          offset: direction > 0 ? 0 : nextPlusOne.nodeValue.length
        };
      } else if (direction < 0 && isElementType(nextPlusOne, "br")) {
        return {
          node: nextNode.parentNode,
          offset: getOffset(nextNode)
        };
      } else {
        return {
          node: nextPlusOne.parentNode,
          offset: getOffset(nextPlusOne) + (direction > 0 ? 0 : 1)
        };
      }
    } else {
      return {
        node: nextNode.parentNode,
        offset: getOffset(nextNode) + (direction > 0 ? 1 : 0)
      };
    }
  }
}
function getNextCharacterContentNode(node, offset, direction) {
  const nextOffset = Number(offset) + (direction < 0 ? -1 : 0);
  if (offset !== void 0 && isElement(node) && nextOffset >= 0 && nextOffset < node.children.length) {
    node = node.children[nextOffset];
  }
  return walkNodes(node, direction === 1 ? "next" : "previous", isTreatedAsCharacterContent);
}
function isTreatedAsCharacterContent(node) {
  if (isTextNode(node)) {
    return true;
  }
  if (isElement(node)) {
    if (isElementType(node, ["input", "textarea"])) {
      return node.type !== "hidden";
    } else if (isElementType(node, "br")) {
      return true;
    }
  }
  return false;
}
function getOffset(node) {
  let i = 0;
  while (node.previousSibling) {
    i++;
    node = node.previousSibling;
  }
  return i;
}
function isElement(node) {
  return node.nodeType === 1;
}
function isTextNode(node) {
  return node.nodeType === 3;
}
function walkNodes(node, direction, callback) {
  var _a;
  for (; ; ) {
    const sibling = node[`${direction}Sibling`];
    if (sibling) {
      node = getDescendant(sibling, direction === "next" ? "first" : "last");
      if (callback(node)) {
        return node;
      }
    } else if (node.parentNode && (!isElement(node.parentNode) || !isContentEditable(node.parentNode) && node.parentNode !== ((_a = node.ownerDocument) == null ? void 0 : _a.body))) {
      node = node.parentNode;
    } else {
      break;
    }
  }
}
function getDescendant(node, direction) {
  while (node.hasChildNodes()) {
    node = node[`${direction}Child`];
  }
  return node;
}
function setSelectionRange(element2, anchorOffset, focusOffset) {
  var _a;
  if (hasOwnSelection(element2)) {
    return setSelection({
      focusNode: element2,
      anchorOffset,
      focusOffset
    });
  }
  if (isContentEditable(element2) && ((_a = element2.firstChild) == null ? void 0 : _a.nodeType) === 3) {
    return setSelection({
      focusNode: element2.firstChild,
      anchorOffset,
      focusOffset
    });
  }
  throw new Error("Not implemented. The result of this interaction is unreliable.");
}
function hasOwnSelection(node) {
  return isElement2(node) && (isElementType(node, "textarea") || isElementType(node, "input") && node.type in editableInputTypes);
}
function isElement2(node) {
  return node.nodeType === 1;
}
function getTargetTypeAndSelection(node) {
  const element2 = getElement2(node);
  if (element2 && hasOwnSelection(element2)) {
    return {
      type: "input",
      selection: getUISelection(element2)
    };
  }
  const selection = element2 == null ? void 0 : element2.ownerDocument.getSelection();
  const isCE = getContentEditable(node) && (selection == null ? void 0 : selection.anchorNode) && getContentEditable(selection.anchorNode);
  return {
    type: isCE ? "contenteditable" : "default",
    selection
  };
}
function getElement2(node) {
  return node.nodeType === 1 ? node : node.parentElement;
}
function updateSelectionOnFocus(element2) {
  var _a;
  const selection = element2.ownerDocument.getSelection();
  if (!(selection == null ? void 0 : selection.focusNode)) {
    return;
  }
  if (hasOwnSelection(element2)) {
    const contenteditable = getContentEditable(selection.focusNode);
    if (contenteditable) {
      if (!selection.isCollapsed) {
        const focusNode = ((_a = contenteditable.firstChild) == null ? void 0 : _a.nodeType) === 3 ? contenteditable.firstChild : contenteditable;
        selection.setBaseAndExtent(focusNode, 0, focusNode, 0);
      }
    } else {
      selection.setBaseAndExtent(element2, 0, element2, 0);
    }
  }
}
function getInputRange(focusNode) {
  var _a;
  const typeAndSelection = getTargetTypeAndSelection(focusNode);
  if (typeAndSelection.type === "input") {
    return typeAndSelection.selection;
  } else if (typeAndSelection.type === "contenteditable") {
    return (_a = typeAndSelection.selection) == null ? void 0 : _a.getRangeAt(0);
  }
}
function setSelection({
  focusNode,
  focusOffset,
  anchorNode = focusNode,
  anchorOffset = focusOffset
}) {
  var _a, _b;
  const typeAndSelection = getTargetTypeAndSelection(focusNode);
  if (typeAndSelection.type === "input") {
    return setUISelection(focusNode, {
      anchorOffset,
      focusOffset
    });
  }
  (_b = (_a = anchorNode.ownerDocument) == null ? void 0 : _a.getSelection()) == null ? void 0 : _b.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
}
function moveSelection(node, direction) {
  if (hasOwnSelection(node)) {
    const selection = getUISelection(node);
    setSelection({
      focusNode: node,
      focusOffset: selection.startOffset === selection.endOffset ? selection.focusOffset + direction : direction < 0 ? selection.startOffset : selection.endOffset
    });
  } else {
    const selection = node.ownerDocument.getSelection();
    if (!selection) {
      return;
    }
    if (selection.isCollapsed) {
      const nextPosition = getNextCursorPosition(selection.focusNode, selection.focusOffset, direction);
      if (nextPosition) {
        setSelection({
          focusNode: nextPosition.node,
          focusOffset: nextPosition.offset
        });
      }
    } else {
      selection[direction < 0 ? "collapseToStart" : "collapseToEnd"]();
    }
  }
}
function copySelection(target) {
  const data = hasOwnSelection(target) ? { "text/plain": readSelectedValueFromInput(target) } : { "text/plain": String(target.ownerDocument.getSelection()) };
  const dt = createDataTransfer(getWindow(target));
  for (const type3 in data) {
    if (data[type3]) {
      dt.setData(type3, data[type3]);
    }
  }
  return dt;
}
function readSelectedValueFromInput(target) {
  const sel = getUISelection(target);
  const val = getUIValue(target);
  return val.substring(sel.startOffset, sel.endOffset);
}
function findClosest(element2, callback) {
  let el = element2;
  do {
    if (callback(el)) {
      return el;
    }
    el = el.parentElement;
  } while (el && el !== element2.ownerDocument.body);
  return void 0;
}
function focus(element2) {
  const target = findClosest(element2, isFocusable);
  const activeElement = getActiveElement(element2.ownerDocument);
  if ((target != null ? target : element2.ownerDocument.body) === activeElement) {
    return;
  } else if (target) {
    eventWrapper2(() => target.focus());
  } else {
    eventWrapper2(() => activeElement == null ? void 0 : activeElement.blur());
  }
  updateSelectionOnFocus(target != null ? target : element2.ownerDocument.body);
}
function isVisible(element2) {
  const window2 = getWindow(element2);
  for (let el = element2; el == null ? void 0 : el.ownerDocument; el = el.parentElement) {
    const { display, visibility } = window2.getComputedStyle(el);
    if (display === "none") {
      return false;
    }
    if (visibility === "hidden") {
      return false;
    }
  }
  return true;
}
function getTabDestination(activeElement, shift) {
  const document2 = activeElement.ownerDocument;
  const focusableElements = document2.querySelectorAll(FOCUSABLE_SELECTOR);
  const enabledElements = Array.from(focusableElements).filter((el) => el === activeElement || el.getAttribute("tabindex") !== "-1" && !isDisabled(el) && isVisible(el));
  if (activeElement.getAttribute("tabindex") !== "-1") {
    enabledElements.sort((a, b2) => {
      const i = Number(a.getAttribute("tabindex"));
      const j = Number(b2.getAttribute("tabindex"));
      if (i === j) {
        return 0;
      } else if (i === 0) {
        return 1;
      } else if (j === 0) {
        return -1;
      }
      return i - j;
    });
  }
  const checkedRadio = {};
  let prunedElements = [document2.body];
  const activeRadioGroup = isElementType(activeElement, "input", {
    type: "radio"
  }) ? activeElement.name : void 0;
  enabledElements.forEach((currentElement) => {
    const el = currentElement;
    if (isElementType(el, "input", { type: "radio" }) && el.name) {
      if (el === activeElement) {
        prunedElements.push(el);
        return;
      } else if (el.name === activeRadioGroup) {
        return;
      }
      if (el.checked) {
        prunedElements = prunedElements.filter((e2) => !isElementType(e2, "input", { type: "radio", name: el.name }));
        prunedElements.push(el);
        checkedRadio[el.name] = el;
        return;
      }
      if (typeof checkedRadio[el.name] !== "undefined") {
        return;
      }
    }
    prunedElements.push(el);
  });
  const currentIndex = prunedElements.findIndex((el) => el === activeElement);
  const nextIndex = shift ? currentIndex - 1 : currentIndex + 1;
  const defaultIndex = shift ? prunedElements.length - 1 : 0;
  return prunedElements[nextIndex] || prunedElements[defaultIndex];
}
function selectAll(target) {
  var _a;
  if (isElementType(target, "textarea") || isElementType(target, "input") && target.type in editableInputTypes) {
    return setSelection({
      focusNode: target,
      anchorOffset: 0,
      focusOffset: getUIValue(target).length
    });
  }
  const focusNode = (_a = getContentEditable(target)) != null ? _a : target.ownerDocument.body;
  setSelection({
    focusNode,
    anchorOffset: 0,
    focusOffset: focusNode.childNodes.length
  });
}
function isAllSelected(target) {
  var _a;
  if (isElementType(target, "textarea") || isElementType(target, "input") && target.type in editableInputTypes) {
    return getUISelection(target).startOffset === 0 && getUISelection(target).endOffset === getUIValue(target).length;
  }
  const focusNode = (_a = getContentEditable(target)) != null ? _a : target.ownerDocument.body;
  const selection = target.ownerDocument.getSelection();
  return (selection == null ? void 0 : selection.anchorNode) === focusNode && selection.focusNode === focusNode && selection.anchorOffset === 0 && selection.focusOffset === focusNode.childNodes.length;
}
function getKeyEventProps(keyDef) {
  return {
    key: keyDef.key,
    code: keyDef.code
  };
}
function getUIEventModifiers(keyboardState) {
  return {
    altKey: keyboardState.modifiers.Alt,
    ctrlKey: keyboardState.modifiers.Control,
    metaKey: keyboardState.modifiers.Meta,
    shiftKey: keyboardState.modifiers.Shift,
    modifierAltGraph: keyboardState.modifiers.AltGraph,
    modifierCapsLock: keyboardState.modifiers.CapsLock,
    modifierFn: keyboardState.modifiers.Fn,
    modifierFnLock: keyboardState.modifiers.FnLock,
    modifierNumLock: keyboardState.modifiers.NumLock,
    modifierScrollLock: keyboardState.modifiers.ScrollLock,
    modifierSymbol: keyboardState.modifiers.Symbol,
    modifierSymbolLock: keyboardState.modifiers.SymbolLock
  };
}
var bracketDict = /* @__PURE__ */ ((bracketDict2) => {
  bracketDict2["{"] = "}";
  bracketDict2["["] = "]";
  return bracketDict2;
})(bracketDict || {});
function readNextDescriptor(text2, context) {
  let pos = 0;
  const startBracket = text2[pos] in bracketDict ? text2[pos] : "";
  pos += startBracket.length;
  const isEscapedChar = new RegExp(`^\\${startBracket}{2}`).test(text2);
  const type3 = isEscapedChar ? "" : startBracket;
  return __spreadValues2({
    type: type3
  }, type3 === "" ? readPrintableChar(text2, pos, context) : readTag(text2, pos, type3, context));
}
function readPrintableChar(text2, pos, context) {
  const descriptor = text2[pos];
  assertDescriptor(descriptor, text2, pos, context);
  pos += descriptor.length;
  return {
    consumedLength: pos,
    descriptor,
    releasePrevious: false,
    releaseSelf: true,
    repeat: 1
  };
}
function readTag(text2, pos, startBracket, context) {
  var _a, _b, _c;
  const releasePreviousModifier = text2[pos] === "/" ? "/" : "";
  pos += releasePreviousModifier.length;
  const escapedDescriptor = startBracket === "{" && text2[pos] === "\\";
  pos += Number(escapedDescriptor);
  const descriptor = escapedDescriptor ? text2[pos] : (_a = text2.slice(pos).match(startBracket === "{" ? /^\w+|^[^}>/]/ : /^\w+/)) == null ? void 0 : _a[0];
  assertDescriptor(descriptor, text2, pos, context);
  pos += descriptor.length;
  const repeatModifier = (_c = (_b = text2.slice(pos).match(/^>\d+/)) == null ? void 0 : _b[0]) != null ? _c : "";
  pos += repeatModifier.length;
  const releaseSelfModifier = text2[pos] === "/" || !repeatModifier && text2[pos] === ">" ? text2[pos] : "";
  pos += releaseSelfModifier.length;
  const expectedEndBracket = bracketDict[startBracket];
  const endBracket = text2[pos] === expectedEndBracket ? expectedEndBracket : "";
  if (!endBracket) {
    throw new Error(getErrorMessage([
      !repeatModifier && "repeat modifier",
      !releaseSelfModifier && "release modifier",
      `"${expectedEndBracket}"`
    ].filter(Boolean).join(" or "), text2[pos], text2, context));
  }
  pos += endBracket.length;
  return {
    consumedLength: pos,
    descriptor,
    releasePrevious: !!releasePreviousModifier,
    repeat: repeatModifier ? Math.max(Number(repeatModifier.substr(1)), 1) : 1,
    releaseSelf: hasReleaseSelf(releaseSelfModifier, repeatModifier)
  };
}
function assertDescriptor(descriptor, text2, pos, context) {
  if (!descriptor) {
    throw new Error(getErrorMessage("key descriptor", text2[pos], text2, context));
  }
}
function hasReleaseSelf(releaseSelfModifier, repeatModifier) {
  if (releaseSelfModifier) {
    return releaseSelfModifier === "/";
  }
  if (repeatModifier) {
    return false;
  }
}
function getErrorMessage(expected, found, text2, context) {
  return `Expected ${expected} but found "${found != null ? found : ""}" in "${text2}"
    See ${context === "pointer" ? `https://testing-library.com/docs/user-event/pointer#pressing-a-button-or-touching-the-screen` : `https://testing-library.com/docs/user-event/keyboard`}
    for more information about how userEvent parses your input.`;
}
function cloneEvent(event) {
  return new event.constructor(event.type, event);
}
function getDocumentFromNode(el) {
  return isDocument(el) ? el : el.ownerDocument;
}
function isDocument(node) {
  return node.nodeType === 9;
}
function isDescendantOrSelf(potentialDescendant, potentialAncestor) {
  let el = potentialDescendant;
  do {
    if (el === potentialAncestor) {
      return true;
    }
    el = el.parentElement;
  } while (el);
  return false;
}
var Level = Symbol("Api level refs");
function setLevelRef(config2, level) {
  var _a;
  (_a = config2[Level]) != null ? _a : config2[Level] = {};
  config2[Level][level] = {};
}
function getLevelRef(config2, level) {
  var _a;
  return (_a = config2[Level]) == null ? void 0 : _a[level];
}
function wait(config2) {
  const delay = config2.delay;
  if (typeof delay !== "number") {
    return;
  }
  return Promise.all([
    new Promise((resolve) => globalThis.setTimeout(() => resolve(), delay)),
    config2.advanceTimers(delay)
  ]);
}
var defaultKeyMap = [
  ..."0123456789".split("").map((c2) => ({ code: `Digit${c2}`, key: c2 })),
  ...")!@#$%^&*(".split("").map((c2, i) => ({ code: `Digit${i}`, key: c2, shiftKey: true })),
  ..."abcdefghijklmnopqrstuvwxyz".split("").map((c2) => ({ code: `Key${c2.toUpperCase()}`, key: c2 })),
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c2) => ({ code: `Key${c2}`, key: c2, shiftKey: true })),
  { code: "Space", key: " " },
  { code: "AltLeft", key: "Alt", location: 1 },
  { code: "AltRight", key: "Alt", location: 2 },
  {
    code: "ShiftLeft",
    key: "Shift",
    location: 1
  },
  {
    code: "ShiftRight",
    key: "Shift",
    location: 2
  },
  {
    code: "ControlLeft",
    key: "Control",
    location: 1
  },
  {
    code: "ControlRight",
    key: "Control",
    location: 2
  },
  { code: "MetaLeft", key: "Meta", location: 1 },
  {
    code: "MetaRight",
    key: "Meta",
    location: 2
  },
  { code: "OSLeft", key: "OS", location: 1 },
  { code: "OSRight", key: "OS", location: 2 },
  { code: "Tab", key: "Tab" },
  { code: "CapsLock", key: "CapsLock" },
  { code: "Backspace", key: "Backspace" },
  { code: "Enter", key: "Enter" },
  { code: "Escape", key: "Escape" },
  { code: "ArrowUp", key: "ArrowUp" },
  { code: "ArrowDown", key: "ArrowDown" },
  { code: "ArrowLeft", key: "ArrowLeft" },
  { code: "ArrowRight", key: "ArrowRight" },
  { code: "Home", key: "Home" },
  { code: "End", key: "End" },
  { code: "Delete", key: "Delete" },
  { code: "PageUp", key: "PageUp" },
  { code: "PageDown", key: "PageDown" },
  { code: "Fn", key: "Fn" },
  { code: "Symbol", key: "Symbol" },
  { code: "AltRight", key: "AltGraph" }
];
var defaultKeyMap2 = [
  { name: "MouseLeft", pointerType: "mouse", button: "primary" },
  { name: "MouseRight", pointerType: "mouse", button: "secondary" },
  { name: "MouseMiddle", pointerType: "mouse", button: "auxiliary" },
  { name: "TouchA", pointerType: "touch" },
  { name: "TouchB", pointerType: "touch" },
  { name: "TouchC", pointerType: "touch" }
];
var defaultOptionsDirect = {
  applyAccept: true,
  autoModify: true,
  delay: 0,
  document: globalThis.document,
  keyboardMap: defaultKeyMap,
  pointerMap: defaultKeyMap2,
  pointerEventsCheck: 2,
  skipAutoClose: false,
  skipClick: false,
  skipHover: false,
  writeToClipboard: false,
  advanceTimers: () => Promise.resolve()
};
var defaultOptionsSetup = __spreadProps(__spreadValues2({}, defaultOptionsDirect), {
  writeToClipboard: true
});
function hasPointerEvents(element2) {
  const window2 = getWindow(element2);
  for (let el = element2; el == null ? void 0 : el.ownerDocument; el = el.parentElement) {
    const pointerEvents = window2.getComputedStyle(el).pointerEvents;
    if (pointerEvents && !["inherit", "unset"].includes(pointerEvents)) {
      return pointerEvents !== "none";
    }
  }
  return true;
}
var PointerEventsCheck = Symbol("Last check for pointer-events");
function assertPointerEvents(config2, element2) {
  const lastCheck = element2[PointerEventsCheck];
  const needsCheck = config2.pointerEventsCheck !== 0 && (!lastCheck || hasBitFlag(config2.pointerEventsCheck, 2) && lastCheck[1] !== getLevelRef(config2, 1) || hasBitFlag(config2.pointerEventsCheck, 4) && lastCheck[2] !== getLevelRef(config2, 2));
  if (!needsCheck) {
    return;
  }
  const result = hasPointerEvents(element2);
  element2[PointerEventsCheck] = {
    [1]: getLevelRef(config2, 1),
    [2]: getLevelRef(config2, 2),
    result
  };
  if (!result) {
    throw new Error('Unable to perform pointer interaction as the element has or inherits pointer-events set to "none".');
  }
}
function hasBitFlag(conf, flag) {
  return (conf & flag) > 0;
}
var MouseButton = {
  primary: 0,
  secondary: 1,
  auxiliary: 2,
  back: 3,
  X1: 3,
  forward: 4,
  X2: 4
};
var MouseButtonFlip = {
  auxiliary: 1,
  secondary: 2,
  1: 2,
  2: 1
};
function getMouseButton(button) {
  if (button in MouseButtonFlip) {
    return MouseButtonFlip[button];
  }
  return typeof button === "number" ? button : MouseButton[button];
}
function getMouseButtons(...buttons) {
  let v2 = 0;
  for (const t of buttons) {
    const pos = typeof t === "number" ? t : MouseButton[t];
    v2 |= __pow(2, pos);
  }
  return v2;
}
var eventMap = __spreadProps(__spreadValues2({}, eventMap_2), {
  beforeInput: {
    EventType: "InputEvent",
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  }
});
var eventMapKeys = Object.fromEntries(Object.keys(eventMap).map((k) => [k.toLowerCase(), k]));
var eventKeys = Object.fromEntries(Object.keys(eventMap_2).map((k) => [k.toLowerCase(), k]));
function getEventClass(type3) {
  return type3 in eventKeys ? eventMap_2[eventKeys[type3]].EventType : "Event";
}
var mouseEvents = ["MouseEvent", "PointerEvent"];
function isMouseEvent(type3) {
  return mouseEvents.includes(getEventClass(type3));
}
function isKeyboardEvent(type3) {
  return getEventClass(type3) === "KeyboardEvent";
}
function createEvent(type3, target, init2) {
  const event = createEvent$1(type3, target, init2, eventMap[eventMapKeys[type3]]);
  if (isMouseEvent(type3) && init2) {
    assignPositionInit(event, init2);
    assignPointerInit(event, init2);
  }
  return event;
}
function assignProps(obj, props) {
  for (const [key, value] of Object.entries(props)) {
    Object.defineProperty(obj, key, { get: () => value });
  }
}
function assignPositionInit(obj, {
  x,
  y: y2,
  clientX,
  clientY,
  offsetX,
  offsetY,
  pageX,
  pageY,
  screenX,
  screenY
}) {
  var _a, _b, _c, _d;
  assignProps(obj, {
    x: (_a = x != null ? x : clientX) != null ? _a : 0,
    y: (_b = y2 != null ? y2 : clientY) != null ? _b : 0,
    clientX: (_c = x != null ? x : clientX) != null ? _c : 0,
    clientY: (_d = y2 != null ? y2 : clientY) != null ? _d : 0,
    offsetX: offsetX != null ? offsetX : 0,
    offsetY: offsetY != null ? offsetY : 0,
    pageX: pageX != null ? pageX : 0,
    pageY: pageY != null ? pageY : 0,
    screenX: screenX != null ? screenX : 0,
    screenY: screenY != null ? screenY : 0
  });
}
function assignPointerInit(obj, { isPrimary, pointerId, pointerType }) {
  assignProps(obj, {
    isPrimary,
    pointerId,
    pointerType
  });
}
var behavior = {};
behavior.click = (event, target, config2) => {
  const context = target.closest("button,input,label,select,textarea");
  const control = context && isElementType(context, "label") && context.control;
  if (control) {
    return () => {
      if (isFocusable(control)) {
        focus(control);
      }
      dispatchEvent(config2, control, cloneEvent(event));
    };
  } else if (isElementType(target, "input", { type: "file" })) {
    return () => {
      blur(target);
      target.dispatchEvent(new (getWindow(target)).Event("fileDialog"));
      focus(target);
    };
  }
};
behavior.cut = (event, target, config2) => {
  return () => {
    if (isEditable(target)) {
      input(config2, target, "", "deleteByCut");
    }
  };
};
behavior.keydown = (event, target, config2) => {
  var _a, _b;
  return (_b = (_a = keydownBehavior[event.key]) == null ? void 0 : _a.call(keydownBehavior, event, target, config2)) != null ? _b : combinationBehavior(event, target, config2);
};
var keydownBehavior = {
  ArrowLeft: (event, target) => () => moveSelection(target, -1),
  ArrowRight: (event, target) => () => moveSelection(target, 1),
  Backspace: (event, target, config2) => {
    if (isEditable(target)) {
      return () => {
        input(config2, target, "", "deleteContentBackward");
      };
    }
  },
  Delete: (event, target, config2) => {
    if (isEditable(target)) {
      return () => {
        input(config2, target, "", "deleteContentForward");
      };
    }
  },
  End: (event, target) => {
    if (isElementType(target, ["input", "textarea"]) || isContentEditable(target)) {
      return () => {
        var _a, _b;
        const newPos = (_b = (_a = getValue(target)) == null ? void 0 : _a.length) != null ? _b : 0;
        setSelectionRange(target, newPos, newPos);
      };
    }
  },
  Home: (event, target) => {
    if (isElementType(target, ["input", "textarea"]) || isContentEditable(target)) {
      return () => {
        setSelectionRange(target, 0, 0);
      };
    }
  },
  PageDown: (event, target) => {
    if (isElementType(target, ["input"])) {
      return () => {
        const newPos = getValue(target).length;
        setSelectionRange(target, newPos, newPos);
      };
    }
  },
  PageUp: (event, target) => {
    if (isElementType(target, ["input"])) {
      return () => {
        setSelectionRange(target, 0, 0);
      };
    }
  },
  Tab: (event, target, { keyboardState }) => {
    return () => {
      const dest = getTabDestination(target, keyboardState.modifiers.Shift);
      focus(dest);
      if (hasOwnSelection(dest)) {
        setUISelection(dest, {
          anchorOffset: 0,
          focusOffset: dest.value.length
        });
      }
    };
  }
};
var combinationBehavior = (event, target, config2) => {
  if (event.code === "KeyA" && config2.keyboardState.modifiers.Control) {
    return () => selectAll(target);
  }
};
behavior.keypress = (event, target, config2) => {
  if (event.key === "Enter") {
    if (isElementType(target, "button") || isElementType(target, "input") && ClickInputOnEnter.includes(target.type) || isElementType(target, "a") && Boolean(target.href)) {
      return () => {
        dispatchUIEvent(config2, target, "click");
      };
    } else if (isElementType(target, "input")) {
      const form = target.form;
      const submit = form == null ? void 0 : form.querySelector('input[type="submit"], button:not([type]), button[type="submit"]');
      if (submit) {
        return () => dispatchUIEvent(config2, submit, "click");
      } else if (form && SubmitSingleInputOnEnter.includes(target.type) && form.querySelectorAll("input").length === 1) {
        return () => dispatchUIEvent(config2, form, "submit");
      } else {
        return;
      }
    }
  }
  if (isEditable(target)) {
    const inputType = event.key === "Enter" ? isContentEditable(target) && !config2.keyboardState.modifiers.Shift ? "insertParagraph" : "insertLineBreak" : "insertText";
    const inputData = event.key === "Enter" ? "\n" : event.key;
    return () => input(config2, target, inputData, inputType);
  }
};
var ClickInputOnEnter = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit"
];
var SubmitSingleInputOnEnter = [
  "email",
  "month",
  "password",
  "search",
  "tel",
  "text",
  "url",
  "week"
];
behavior.keyup = (event, target, config2) => {
  var _a;
  return (_a = keyupBehavior[event.key]) == null ? void 0 : _a.call(keyupBehavior, event, target, config2);
};
var keyupBehavior = {
  " ": (event, target, config2) => {
    if (isClickableInput(target)) {
      return () => dispatchUIEvent(config2, target, "click");
    }
  }
};
behavior.paste = (event, target, config2) => {
  if (isEditable(target)) {
    return () => {
      var _a;
      const insertData = (_a = event.clipboardData) == null ? void 0 : _a.getData("text");
      if (insertData) {
        input(config2, target, insertData, "insertFromPaste");
      }
    };
  }
};
function wrapEvent(cb, _element) {
  return getConfig().eventWrapper(cb);
}
function dispatchEvent(config2, target, event, preventDefault = false) {
  var _a, _b;
  const type3 = event.type;
  const behaviorImplementation = preventDefault ? () => {
  } : (_b = (_a = behavior)[type3]) == null ? void 0 : _b.call(_a, event, target, config2);
  if (behaviorImplementation) {
    event.preventDefault();
    let defaultPrevented = false;
    Object.defineProperty(event, "defaultPrevented", {
      get: () => defaultPrevented
    });
    Object.defineProperty(event, "preventDefault", {
      value: () => {
        defaultPrevented = event.cancelable;
      }
    });
    wrapEvent(() => target.dispatchEvent(event));
    if (!defaultPrevented) {
      behaviorImplementation();
    }
    return !defaultPrevented;
  }
  return wrapEvent(() => target.dispatchEvent(event));
}
function dispatchUIEvent(config2, target, type3, init2, preventDefault = false) {
  if (isMouseEvent(type3) || isKeyboardEvent(type3)) {
    init2 = __spreadValues2(__spreadValues2({}, init2), getUIEventModifiers(config2.keyboardState));
  }
  const event = createEvent(type3, target, init2);
  return dispatchEvent(config2, target, event, preventDefault);
}
function bindDispatchUIEvent(config2) {
  return dispatchUIEvent.bind(void 0, config2);
}
var Interceptor = Symbol("Interceptor for programmatical calls");
function prepareInterceptor(element2, propName, interceptorImpl) {
  const prototypeDescriptor = Object.getOwnPropertyDescriptor(element2.constructor.prototype, propName);
  const objectDescriptor = Object.getOwnPropertyDescriptor(element2, propName);
  const target = (prototypeDescriptor == null ? void 0 : prototypeDescriptor.set) ? "set" : "value";
  if (typeof (prototypeDescriptor == null ? void 0 : prototypeDescriptor[target]) !== "function" || prototypeDescriptor[target][Interceptor]) {
    return;
  }
  function intercept(...args) {
    const {
      applyNative = true,
      realArgs,
      then
    } = interceptorImpl.call(this, ...args);
    const realFunc = (!applyNative && objectDescriptor || prototypeDescriptor)[target];
    if (target === "set") {
      realFunc.call(this, realArgs);
    } else {
      realFunc.call(this, ...realArgs);
    }
    then == null ? void 0 : then();
  }
  intercept[Interceptor] = Interceptor;
  Object.defineProperty(element2, propName, __spreadProps(__spreadValues2({}, objectDescriptor != null ? objectDescriptor : prototypeDescriptor), {
    [target]: intercept
  }));
}
var UISelection = Symbol("Displayed selection in UI");
function prepareSelectionInterceptor(element2) {
  prepareInterceptor(element2, "setSelectionRange", function interceptorImpl(start, end, direction = "none") {
    const isUI = start && typeof start === "object" && start[UISelection];
    if (!isUI) {
      this[UISelection] = void 0;
    }
    return {
      realArgs: [Number(start), end, direction]
    };
  });
  prepareInterceptor(element2, "selectionStart", function interceptorImpl(v2) {
    this[UISelection] = void 0;
    return { realArgs: v2 };
  });
  prepareInterceptor(element2, "selectionEnd", function interceptorImpl(v2) {
    this[UISelection] = void 0;
    return { realArgs: v2 };
  });
  prepareInterceptor(element2, "select", function interceptorImpl() {
    this[UISelection] = {
      anchorOffset: 0,
      focusOffset: getUIValue(element2).length
    };
    return { realArgs: [] };
  });
}
function setUISelection(element2, {
  focusOffset: focusOffsetParam,
  anchorOffset: anchorOffsetParam = focusOffsetParam
}, mode = "replace") {
  const valueLength = getUIValue(element2).length;
  const sanitizeOffset = (o) => Math.max(0, Math.min(valueLength, o));
  const anchorOffset = mode === "replace" || element2[UISelection] === void 0 ? sanitizeOffset(anchorOffsetParam) : element2[UISelection].anchorOffset;
  const focusOffset = sanitizeOffset(focusOffsetParam);
  const startOffset = Math.min(anchorOffset, focusOffset);
  const endOffset = Math.max(anchorOffset, focusOffset);
  element2[UISelection] = {
    anchorOffset,
    focusOffset
  };
  if (element2.selectionStart === startOffset && element2.selectionEnd === endOffset) {
    return;
  }
  const startObj = new Number(startOffset);
  startObj[UISelection] = UISelection;
  try {
    element2.setSelectionRange(startObj, endOffset);
  } catch (e2) {
  }
}
function getUISelection(element2) {
  var _a, _b, _c;
  const sel = (_c = element2[UISelection]) != null ? _c : {
    anchorOffset: (_a = element2.selectionStart) != null ? _a : 0,
    focusOffset: (_b = element2.selectionEnd) != null ? _b : 0
  };
  return __spreadProps(__spreadValues2({}, sel), {
    startOffset: Math.min(sel.anchorOffset, sel.focusOffset),
    endOffset: Math.max(sel.anchorOffset, sel.focusOffset)
  });
}
var UIValue = Symbol("Displayed value in UI");
var InitialValue = Symbol("Initial value to compare on blur");
var TrackChanges = Symbol("Track programmatic changes for React workaround");
function valueInterceptor(v2) {
  const isUI = typeof v2 === "object" && v2[UIValue];
  if (isUI) {
    this[UIValue] = String(v2);
    setPreviousValue(this, String(this.value));
  }
  return {
    applyNative: !!isUI,
    realArgs: sanitizeValue(this, v2),
    then: isUI ? void 0 : () => trackOrSetValue(this, String(v2))
  };
}
function sanitizeValue(element2, v2) {
  if (isElementType(element2, "input", { type: "number" }) && String(v2) !== "" && !Number.isNaN(Number(v2))) {
    return String(Number(v2));
  }
  return String(v2);
}
function prepareValueInterceptor(element2) {
  prepareInterceptor(element2, "value", valueInterceptor);
}
function setUIValue(element2, value) {
  if (element2[InitialValue] === void 0) {
    element2[InitialValue] = element2.value;
  }
  element2.value = {
    [UIValue]: UIValue,
    toString: () => value
  };
}
function getUIValue(element2) {
  return element2[UIValue] === void 0 ? element2.value : String(element2[UIValue]);
}
function clearInitialValue(element2) {
  element2[InitialValue] = void 0;
}
function getInitialValue(element2) {
  return element2[InitialValue];
}
function setPreviousValue(element2, v2) {
  element2[TrackChanges] = __spreadProps(__spreadValues2({}, element2[TrackChanges]), { previousValue: v2 });
}
function startTrackValue(element2) {
  element2[TrackChanges] = __spreadProps(__spreadValues2({}, element2[TrackChanges]), {
    nextValue: String(element2.value),
    tracked: []
  });
}
function trackOrSetValue(element2, v2) {
  var _a, _b, _c;
  (_b = (_a = element2[TrackChanges]) == null ? void 0 : _a.tracked) == null ? void 0 : _b.push(v2);
  if (!((_c = element2[TrackChanges]) == null ? void 0 : _c.tracked)) {
    setCleanValue(element2, v2);
  }
}
function setCleanValue(element2, v2) {
  element2[UIValue] = void 0;
  setUISelection(element2, { focusOffset: v2.length });
}
function endTrackValue(element2) {
  var _a, _b;
  const changes = element2[TrackChanges];
  element2[TrackChanges] = void 0;
  const isJustReactStateUpdate = ((_a = changes == null ? void 0 : changes.tracked) == null ? void 0 : _a.length) === 2 && changes.tracked[0] === changes.previousValue && changes.tracked[1] === changes.nextValue;
  if (((_b = changes == null ? void 0 : changes.tracked) == null ? void 0 : _b.length) && !isJustReactStateUpdate) {
    setCleanValue(element2, changes.tracked[changes.tracked.length - 1]);
  }
  return isJustReactStateUpdate;
}
var isPrepared = Symbol("Node prepared with document state workarounds");
function prepareDocument(document2) {
  if (document2[isPrepared]) {
    return;
  }
  document2.addEventListener("focus", (e2) => {
    const el = e2.target;
    prepareElement(el);
  }, {
    capture: true,
    passive: true
  });
  if (document2.activeElement) {
    prepareElement(document2.activeElement);
  }
  document2.addEventListener("blur", (e2) => {
    const el = e2.target;
    const initialValue2 = getInitialValue(el);
    if (initialValue2 !== void 0) {
      if (el.value !== initialValue2) {
        dispatchUIEvent({}, el, "change");
      }
      clearInitialValue(el);
    }
  }, {
    capture: true,
    passive: true
  });
  document2[isPrepared] = isPrepared;
}
function prepareElement(el) {
  if (el[isPrepared]) {
    return;
  }
  if ("value" in el) {
    prepareValueInterceptor(el);
    prepareSelectionInterceptor(el);
  }
  el[isPrepared] = isPrepared;
}
var modifierKeys = [
  "Alt",
  "AltGraph",
  "Control",
  "Fn",
  "Meta",
  "Shift",
  "Symbol"
];
function isModifierKey(key) {
  return modifierKeys.includes(key);
}
var modifierLocks = [
  "CapsLock",
  "FnLock",
  "NumLock",
  "ScrollLock",
  "SymbolLock"
];
function isModifierLock(key) {
  return modifierLocks.includes(key);
}
function preKeydownBehavior(config2, { key }, element2) {
  var _a;
  if (isModifierKey(key)) {
    config2.keyboardState.modifiers[key] = true;
    if (key === "AltGraph") {
      const ctrlKeyDef = (_a = config2.keyboardMap.find((k) => k.key === "Control")) != null ? _a : { key: "Control", code: "Control" };
      dispatchUIEvent(config2, element2, "keydown", getKeyEventProps(ctrlKeyDef));
    }
  } else if (isModifierLock(key)) {
    config2.keyboardState.modifierPhase[key] = config2.keyboardState.modifiers[key];
    if (!config2.keyboardState.modifierPhase[key]) {
      config2.keyboardState.modifiers[key] = true;
    }
  }
}
function preKeyupBehavior(config2, { key }) {
  if (isModifierKey(key)) {
    config2.keyboardState.modifiers[key] = false;
  } else if (isModifierLock(key)) {
    if (config2.keyboardState.modifierPhase[key]) {
      config2.keyboardState.modifiers[key] = false;
    }
  }
}
function postKeyupBehavior(config2, { key }, element2) {
  var _a;
  if (key === "AltGraph") {
    const ctrlKeyDef = (_a = config2.keyboardMap.find((k) => k.key === "Control")) != null ? _a : { key: "Control", code: "Control" };
    dispatchUIEvent(config2, element2, "keyup", getKeyEventProps(ctrlKeyDef));
  }
}
function keyboardAction(config2, actions) {
  return __async(this, null, function* () {
    for (let i = 0; i < actions.length; i++) {
      yield keyboardKeyAction(config2, actions[i]);
      if (i < actions.length - 1) {
        yield wait(config2);
      }
    }
  });
}
function keyboardKeyAction(_0, _1) {
  return __async(this, arguments, function* (config2, { keyDef, releasePrevious, releaseSelf, repeat }) {
    const { document: document2, keyboardState } = config2;
    const getCurrentElement = () => getActive(document2);
    const pressed = keyboardState.pressed.find((p2) => p2.keyDef === keyDef);
    if (pressed) {
      yield keyup(keyDef, getCurrentElement, config2, pressed.unpreventedDefault);
    }
    if (!releasePrevious) {
      let unpreventedDefault = true;
      for (let i = 1; i <= repeat; i++) {
        unpreventedDefault = yield keydown(keyDef, getCurrentElement, config2);
        if (unpreventedDefault && hasKeyPress(keyDef, config2)) {
          yield keypress(keyDef, getCurrentElement, config2);
        }
        if (i < repeat) {
          yield wait(config2);
        }
      }
      if (releaseSelf) {
        yield keyup(keyDef, getCurrentElement, config2, unpreventedDefault);
      }
    }
  });
}
function getActive(document2) {
  var _a;
  return (_a = getActiveElement(document2)) != null ? _a : document2.body;
}
function releaseAllKeys(config2) {
  return __async(this, null, function* () {
    const getCurrentElement = () => getActive(config2.document);
    for (const k of config2.keyboardState.pressed) {
      yield keyup(k.keyDef, getCurrentElement, config2, k.unpreventedDefault);
    }
  });
}
function keydown(keyDef, getCurrentElement, config2) {
  return __async(this, null, function* () {
    const element2 = getCurrentElement();
    if (element2 !== config2.keyboardState.activeElement) {
      config2.keyboardState.carryValue = void 0;
      config2.keyboardState.carryChar = "";
    }
    config2.keyboardState.activeElement = element2;
    preKeydownBehavior(config2, keyDef, element2);
    const unpreventedDefault = dispatchUIEvent(config2, element2, "keydown", getKeyEventProps(keyDef));
    config2.keyboardState.pressed.push({ keyDef, unpreventedDefault });
    return unpreventedDefault;
  });
}
function keypress(keyDef, getCurrentElement, config2) {
  return __async(this, null, function* () {
    const element2 = getCurrentElement();
    dispatchUIEvent(config2, element2, "keypress", __spreadProps(__spreadValues2({}, getKeyEventProps(keyDef)), {
      charCode: keyDef.key === "Enter" ? 13 : String(keyDef.key).charCodeAt(0)
    }));
  });
}
function keyup(keyDef, getCurrentElement, config2, unprevented) {
  return __async(this, null, function* () {
    const element2 = getCurrentElement();
    preKeyupBehavior(config2, keyDef);
    dispatchUIEvent(config2, element2, "keyup", getKeyEventProps(keyDef), !unprevented);
    config2.keyboardState.pressed = config2.keyboardState.pressed.filter((k) => k.keyDef !== keyDef);
    postKeyupBehavior(config2, keyDef, element2);
  });
}
function hasKeyPress(keyDef, config2) {
  var _a;
  return (((_a = keyDef.key) == null ? void 0 : _a.length) === 1 || keyDef.key === "Enter") && !config2.keyboardState.modifiers.Control && !config2.keyboardState.modifiers.Alt;
}
function parseKeyDef(keyboardMap, text2) {
  var _a;
  const defs = [];
  do {
    const {
      type: type3,
      descriptor,
      consumedLength,
      releasePrevious,
      releaseSelf = true,
      repeat
    } = readNextDescriptor(text2, "keyboard");
    const keyDef = (_a = keyboardMap.find((def) => {
      var _a2, _b;
      if (type3 === "[") {
        return ((_a2 = def.code) == null ? void 0 : _a2.toLowerCase()) === descriptor.toLowerCase();
      } else if (type3 === "{") {
        return ((_b = def.key) == null ? void 0 : _b.toLowerCase()) === descriptor.toLowerCase();
      }
      return def.key === descriptor;
    })) != null ? _a : {
      key: "Unknown",
      code: "Unknown",
      [type3 === "[" ? "code" : "key"]: descriptor
    };
    defs.push({ keyDef, releasePrevious, releaseSelf, repeat });
    text2 = text2.slice(consumedLength);
  } while (text2);
  return defs;
}
function keyboard(text2) {
  return __async(this, null, function* () {
    const actions = parseKeyDef(this[Config].keyboardMap, text2);
    return keyboardAction(this[Config], actions);
  });
}
function createKeyboardState() {
  return {
    activeElement: null,
    pressed: [],
    carryChar: "",
    modifiers: {
      Alt: false,
      AltGraph: false,
      Control: false,
      CapsLock: false,
      Fn: false,
      FnLock: false,
      Meta: false,
      NumLock: false,
      ScrollLock: false,
      Shift: false,
      Symbol: false,
      SymbolLock: false
    },
    modifierPhase: {}
  };
}
function parseKeyDef2(pointerMap, keys7) {
  const defs = [];
  do {
    const {
      descriptor,
      consumedLength,
      releasePrevious,
      releaseSelf = true
    } = readNextDescriptor(keys7, "pointer");
    const keyDef = pointerMap.find((p2) => p2.name === descriptor);
    if (keyDef) {
      defs.push({ keyDef, releasePrevious, releaseSelf });
    }
    keys7 = keys7.slice(consumedLength);
  } while (keys7);
  return defs;
}
function firePointerEvent(config2, target, type3, {
  pointerType,
  button,
  coords,
  pointerId,
  isPrimary,
  clickCount
}) {
  const init2 = __spreadValues2({}, coords);
  if (type3 === "click" || type3.startsWith("pointer")) {
    init2.pointerId = pointerId;
    init2.pointerType = pointerType;
  }
  if (["pointerdown", "pointerup"].includes(type3)) {
    init2.isPrimary = isPrimary;
  }
  init2.button = getMouseButton(button != null ? button : 0);
  init2.buttons = getMouseButtons(...config2.pointerState.pressed.filter((p2) => p2.keyDef.pointerType === pointerType).map((p2) => {
    var _a;
    return (_a = p2.keyDef.button) != null ? _a : 0;
  }));
  if (["mousedown", "mouseup", "click", "dblclick", "contextmenu"].includes(type3)) {
    init2.detail = clickCount;
  }
  return dispatchUIEvent(config2, target, type3, init2);
}
function resolveSelectionTarget({
  target,
  node,
  offset
}) {
  if (isElementType(target, ["input", "textarea"])) {
    return {
      node: target,
      offset: offset != null ? offset : getUIValue(target).length
    };
  } else if (node) {
    return {
      node,
      offset: offset != null ? offset : node.nodeType === 3 ? node.nodeValue.length : node.childNodes.length
    };
  }
  return findNodeAtTextOffset(target, offset);
}
function findNodeAtTextOffset(node, offset, isRoot = true) {
  let i = offset === void 0 ? node.childNodes.length - 1 : 0;
  const step = offset === void 0 ? -1 : 1;
  while (offset === void 0 ? i >= (isRoot ? Math.max(node.childNodes.length - 1, 0) : 0) : i <= node.childNodes.length) {
    const c2 = node.childNodes.item(i);
    const text2 = String(c2.textContent);
    if (text2.length) {
      if (offset !== void 0 && text2.length < offset) {
        offset -= text2.length;
      } else if (c2.nodeType === 1) {
        return findNodeAtTextOffset(c2, offset, false);
      } else {
        if (c2.nodeType === 3) {
          return {
            node: c2,
            offset: offset != null ? offset : c2.nodeValue.length
          };
        }
      }
    }
    i += step;
  }
  return { node, offset: node.childNodes.length };
}
function pointerMove(_0, _1) {
  return __async(this, arguments, function* (config2, { pointerName = "mouse", target, coords, node, offset }) {
    const { pointerState } = config2;
    if (!(pointerName in pointerState.position)) {
      throw new Error(`Trying to move pointer "${pointerName}" which does not exist.`);
    }
    const {
      pointerId,
      pointerType,
      target: prevTarget,
      coords: prevCoords,
      selectionRange
    } = pointerState.position[pointerName];
    if (prevTarget && prevTarget !== target) {
      setLevelRef(config2, 2);
      assertPointerEvents(config2, prevTarget);
      fireMove(prevTarget, prevCoords);
      if (!isDescendantOrSelf(target, prevTarget)) {
        fireLeave(prevTarget, prevCoords);
      }
    }
    setLevelRef(config2, 2);
    assertPointerEvents(config2, target);
    pointerState.position[pointerName] = __spreadProps(__spreadValues2({}, pointerState.position[pointerName]), {
      target,
      coords
    });
    if (prevTarget !== target) {
      if (!prevTarget || !isDescendantOrSelf(prevTarget, target)) {
        fireEnter(target, coords);
      }
    }
    fireMove(target, coords);
    if (selectionRange) {
      const selectionFocus = resolveSelectionTarget({ target, node, offset });
      if ("node" in selectionRange) {
        if (selectionFocus.node === selectionRange.node) {
          const anchorOffset = selectionFocus.offset < selectionRange.start ? selectionRange.end : selectionRange.start;
          const focusOffset = selectionFocus.offset > selectionRange.end || selectionFocus.offset < selectionRange.start ? selectionFocus.offset : selectionRange.end;
          setUISelection(selectionRange.node, { anchorOffset, focusOffset });
        }
      } else {
        const range = selectionRange.cloneRange();
        const cmp = range.comparePoint(selectionFocus.node, selectionFocus.offset);
        if (cmp < 0) {
          range.setStart(selectionFocus.node, selectionFocus.offset);
        } else if (cmp > 0) {
          range.setEnd(selectionFocus.node, selectionFocus.offset);
        }
        const selection = target.ownerDocument.getSelection();
        selection.removeAllRanges();
        selection.addRange(range.cloneRange());
      }
    }
    function fireMove(eventTarget, eventCoords) {
      fire(eventTarget, "pointermove", eventCoords);
      if (pointerType === "mouse" && !isDisabled(eventTarget)) {
        fire(eventTarget, "mousemove", eventCoords);
      }
    }
    function fireLeave(eventTarget, eventCoords) {
      fire(eventTarget, "pointerout", eventCoords);
      fire(eventTarget, "pointerleave", eventCoords);
      if (pointerType === "mouse" && !isDisabled(eventTarget)) {
        fire(eventTarget, "mouseout", eventCoords);
        fire(eventTarget, "mouseleave", eventCoords);
      }
    }
    function fireEnter(eventTarget, eventCoords) {
      fire(eventTarget, "pointerover", eventCoords);
      fire(eventTarget, "pointerenter", eventCoords);
      if (pointerType === "mouse" && !isDisabled(eventTarget)) {
        fire(eventTarget, "mouseover", eventCoords);
        fire(eventTarget, "mouseenter", eventCoords);
      }
    }
    function fire(eventTarget, type3, eventCoords) {
      return firePointerEvent(config2, eventTarget, type3, {
        coords: eventCoords,
        pointerId,
        pointerType
      });
    }
  });
}
function pointerPress(config2, action) {
  return __async(this, null, function* () {
    const { keyDef, target, releasePrevious, releaseSelf } = action;
    const previous = config2.pointerState.pressed.find((p2) => p2.keyDef === keyDef);
    const pointerName = keyDef.pointerType === "touch" ? keyDef.name : keyDef.pointerType;
    const targetIsDisabled = isDisabled(target);
    if (previous) {
      up(config2, pointerName, action, previous, targetIsDisabled);
    }
    if (!releasePrevious) {
      const press = down(config2, pointerName, action, targetIsDisabled);
      if (releaseSelf) {
        up(config2, pointerName, action, press, targetIsDisabled);
      }
    }
  });
}
function getNextPointerId(state) {
  state.pointerId = state.pointerId + 1;
  return state.pointerId;
}
function down(config2, pointerName, { keyDef, node, offset, target, coords }, targetIsDisabled) {
  var _a, _b, _c;
  setLevelRef(config2, 2);
  assertPointerEvents(config2, target);
  const { pointerState } = config2;
  const { name, pointerType, button } = keyDef;
  const pointerId = pointerType === "mouse" ? 1 : getNextPointerId(pointerState);
  pointerState.position[pointerName] = __spreadProps(__spreadValues2({}, pointerState.position[pointerName]), {
    pointerId,
    pointerType,
    target,
    coords
  });
  let isMultiTouch = false;
  let isPrimary = true;
  if (pointerType !== "mouse") {
    for (const obj of pointerState.pressed) {
      if (obj.keyDef.pointerType === pointerType) {
        obj.isMultiTouch = true;
        isMultiTouch = true;
        isPrimary = false;
      }
    }
  }
  if (((_a = pointerState.activeClickCount) == null ? void 0 : _a[0]) !== name) {
    delete pointerState.activeClickCount;
  }
  const clickCount = Number((_c = (_b = pointerState.activeClickCount) == null ? void 0 : _b[1]) != null ? _c : 0) + 1;
  pointerState.activeClickCount = [name, clickCount];
  const pressObj = {
    keyDef,
    downTarget: target,
    pointerId,
    unpreventedDefault: true,
    isMultiTouch,
    isPrimary,
    clickCount
  };
  pointerState.pressed.push(pressObj);
  if (pointerType !== "mouse") {
    fire("pointerover");
    fire("pointerenter");
  }
  if (pointerType !== "mouse" || !pointerState.pressed.some((p2) => p2.keyDef !== keyDef && p2.keyDef.pointerType === pointerType)) {
    fire("pointerdown");
  }
  if (pointerType === "mouse") {
    if (!targetIsDisabled) {
      pressObj.unpreventedDefault = fire("mousedown");
    }
    if (pressObj.unpreventedDefault) {
      mousedownDefaultBehavior({
        target,
        targetIsDisabled,
        clickCount,
        position: pointerState.position[pointerName],
        node,
        offset
      });
    }
    if (button === "secondary") {
      fire("contextmenu");
    }
  }
  return pressObj;
  function fire(type3) {
    return firePointerEvent(config2, target, type3, {
      button,
      clickCount,
      coords,
      isPrimary,
      pointerId,
      pointerType
    });
  }
}
function up(config2, pointerName, {
  keyDef: { pointerType, button },
  target,
  coords,
  node,
  offset
}, pressed, targetIsDisabled) {
  setLevelRef(config2, 2);
  assertPointerEvents(config2, target);
  const { pointerState } = config2;
  pointerState.pressed = pointerState.pressed.filter((p2) => p2 !== pressed);
  const { isMultiTouch, isPrimary, pointerId, clickCount } = pressed;
  let { unpreventedDefault } = pressed;
  pointerState.position[pointerName] = __spreadProps(__spreadValues2({}, pointerState.position[pointerName]), {
    target,
    coords
  });
  if (pointerType !== "mouse" || !pointerState.pressed.filter((p2) => p2.keyDef.pointerType === pointerType).length) {
    fire("pointerup");
  }
  if (pointerType !== "mouse") {
    fire("pointerout");
    fire("pointerleave");
  }
  if (pointerType !== "mouse" && !isMultiTouch) {
    if (!targetIsDisabled) {
      if (clickCount === 1) {
        fire("mouseover");
        fire("mouseenter");
      }
      fire("mousemove");
      unpreventedDefault = fire("mousedown") && unpreventedDefault;
    }
    if (unpreventedDefault) {
      mousedownDefaultBehavior({
        target,
        targetIsDisabled,
        clickCount,
        position: pointerState.position[pointerName],
        node,
        offset
      });
    }
  }
  delete pointerState.position[pointerName].selectionRange;
  if (!targetIsDisabled) {
    if (pointerType === "mouse" || !isMultiTouch) {
      unpreventedDefault = fire("mouseup") && unpreventedDefault;
      const canClick = pointerType !== "mouse" || button === "primary";
      if (canClick && target === pressed.downTarget) {
        fire("click");
        if (clickCount === 2) {
          fire("dblclick");
        }
      }
    }
  }
  function fire(type3) {
    return firePointerEvent(config2, target, type3, {
      button,
      clickCount,
      coords,
      isPrimary,
      pointerId,
      pointerType
    });
  }
}
function mousedownDefaultBehavior({
  position,
  target,
  targetIsDisabled,
  clickCount,
  node,
  offset
}) {
  if (!targetIsDisabled) {
    const hasValue = isElementType(target, ["input", "textarea"]);
    const text2 = String(hasValue ? getUIValue(target) : target.textContent);
    const [start, end] = node ? [offset, offset] : getTextRange(text2, offset, clickCount);
    if (hasValue) {
      setUISelection(target, {
        anchorOffset: start != null ? start : text2.length,
        focusOffset: end != null ? end : text2.length
      });
      position.selectionRange = {
        node: target,
        start: start != null ? start : 0,
        end: end != null ? end : text2.length
      };
    } else {
      const { node: startNode, offset: startOffset } = resolveSelectionTarget({
        target,
        node,
        offset: start
      });
      const { node: endNode, offset: endOffset } = resolveSelectionTarget({
        target,
        node,
        offset: end
      });
      const range = target.ownerDocument.createRange();
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
      position.selectionRange = range;
      const selection = target.ownerDocument.getSelection();
      selection.removeAllRanges();
      selection.addRange(range.cloneRange());
    }
  }
  focus(target);
}
function getTextRange(text2, pos, clickCount) {
  if (clickCount % 3 === 1 || text2.length === 0) {
    return [pos, pos];
  }
  const textPos = pos != null ? pos : text2.length;
  if (clickCount % 3 === 2) {
    return [
      textPos - text2.substr(0, pos).match(/(\w+|\s+|\W)?$/)[0].length,
      pos === void 0 ? pos : pos + text2.substr(pos).match(/^(\w+|\s+|\W)?/)[0].length
    ];
  }
  return [
    textPos - text2.substr(0, pos).match(/[^\r\n]*$/)[0].length,
    pos === void 0 ? pos : pos + text2.substr(pos).match(/^[^\r\n]*/)[0].length
  ];
}
function pointerAction(config2, actions) {
  return __async(this, null, function* () {
    var _a, _b;
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const pointerName = "pointerName" in action && action.pointerName ? action.pointerName : "keyDef" in action ? action.keyDef.pointerType === "touch" ? action.keyDef.name : action.keyDef.pointerType : "mouse";
      const target = (_a = action.target) != null ? _a : getPrevTarget(pointerName, config2.pointerState);
      const coords = (_b = action.coords) != null ? _b : pointerName in config2.pointerState.position ? config2.pointerState.position[pointerName].coords : void 0;
      yield "keyDef" in action ? pointerPress(config2, __spreadProps(__spreadValues2({}, action), { target, coords })) : pointerMove(config2, __spreadProps(__spreadValues2({}, action), { target, coords }));
      if (i < actions.length - 1) {
        yield wait(config2);
      }
    }
    delete config2.pointerState.activeClickCount;
  });
}
function getPrevTarget(pointerName, state) {
  if (!(pointerName in state.position) || !state.position[pointerName].target) {
    throw new Error("This pointer has no previous position. Provide a target property!");
  }
  return state.position[pointerName].target;
}
function pointer(input2) {
  return __async(this, null, function* () {
    const { pointerMap } = this[Config];
    const actions = [];
    (Array.isArray(input2) ? input2 : [input2]).forEach((actionInput) => {
      if (typeof actionInput === "string") {
        actions.push(...parseKeyDef2(pointerMap, actionInput));
      } else if ("keys" in actionInput) {
        actions.push(...parseKeyDef2(pointerMap, actionInput.keys).map((i) => __spreadValues2(__spreadValues2({}, actionInput), i)));
      } else {
        actions.push(actionInput);
      }
    });
    return pointerAction(this[Config], actions).then(() => void 0);
  });
}
function createPointerState(document2) {
  return {
    pointerId: 1,
    position: {
      mouse: {
        pointerType: "mouse",
        pointerId: 1,
        target: document2.body,
        coords: {
          clientX: 0,
          clientY: 0,
          offsetX: 0,
          offsetY: 0,
          pageX: 0,
          pageY: 0,
          x: 0,
          y: 0
        }
      }
    },
    pressed: []
  };
}
var Config = Symbol("Config");
var api_exports = {};
__export(api_exports, {
  clear: () => clear,
  click: () => click,
  copy: () => copy,
  cut: () => cut,
  dblClick: () => dblClick,
  deselectOptions: () => deselectOptions,
  hover: () => hover,
  keyboard: () => keyboard,
  paste: () => paste,
  pointer: () => pointer,
  selectOptions: () => selectOptions,
  tab: () => tab,
  tripleClick: () => tripleClick,
  type: () => type,
  unhover: () => unhover,
  upload: () => upload
});
function click(element2) {
  return __async(this, null, function* () {
    const pointerIn = [];
    if (!this[Config].skipHover) {
      pointerIn.push({ target: element2 });
    }
    pointerIn.push({ keys: "[MouseLeft]", target: element2 });
    return this.pointer(pointerIn);
  });
}
function dblClick(element2) {
  return __async(this, null, function* () {
    return this.pointer([{ target: element2 }, "[MouseLeft][MouseLeft]"]);
  });
}
function tripleClick(element2) {
  return __async(this, null, function* () {
    return this.pointer([{ target: element2 }, "[MouseLeft][MouseLeft][MouseLeft]"]);
  });
}
function hover(element2) {
  return __async(this, null, function* () {
    return this.pointer({ target: element2 });
  });
}
function unhover(element2) {
  return __async(this, null, function* () {
    return this.pointer({ target: element2.ownerDocument.body });
  });
}
function tab() {
  return __async(this, arguments, function* ({
    shift
  } = {}) {
    return this.keyboard(shift === true ? "{Shift>}{Tab}{/Shift}" : shift === false ? "[/ShiftLeft][/ShiftRight]{Tab}" : "{Tab}");
  });
}
function copy() {
  return __async(this, null, function* () {
    var _a;
    const doc = this[Config].document;
    const target = (_a = doc.activeElement) != null ? _a : doc.body;
    const clipboardData = copySelection(target);
    if (clipboardData.items.length === 0) {
      return;
    }
    if (this.dispatchUIEvent(target, "copy", {
      clipboardData
    }) && this[Config].writeToClipboard) {
      yield writeDataTransferToClipboard(doc, clipboardData);
    }
    return clipboardData;
  });
}
function cut() {
  return __async(this, null, function* () {
    var _a;
    const doc = this[Config].document;
    const target = (_a = doc.activeElement) != null ? _a : doc.body;
    const clipboardData = copySelection(target);
    if (clipboardData.items.length === 0) {
      return;
    }
    if (this.dispatchUIEvent(target, "cut", {
      clipboardData
    }) && this[Config].writeToClipboard) {
      yield writeDataTransferToClipboard(target.ownerDocument, clipboardData);
    }
    return clipboardData;
  });
}
function paste(clipboardData) {
  return __async(this, null, function* () {
    var _a, _b;
    const doc = this[Config].document;
    const target = (_a = doc.activeElement) != null ? _a : doc.body;
    const dataTransfer = (_b = typeof clipboardData === "string" ? getClipboardDataFromString(doc, clipboardData) : clipboardData) != null ? _b : yield readDataTransferFromClipboard(doc).catch(() => {
      throw new Error("`userEvent.paste()` without `clipboardData` requires the `ClipboardAPI` to be available.");
    });
    this.dispatchUIEvent(target, "paste", {
      clipboardData: dataTransfer
    });
  });
}
function getClipboardDataFromString(doc, text2) {
  const dt = createDataTransfer(getWindow(doc));
  dt.setData("text", text2);
  return dt;
}
function clear(element2) {
  return __async(this, null, function* () {
    if (!isEditable(element2) || isDisabled(element2)) {
      throw new Error("clear()` is only supported on editable elements.");
    }
    focus(element2);
    if (element2.ownerDocument.activeElement !== element2) {
      throw new Error("The element to be cleared could not be focused.");
    }
    selectAll(element2);
    if (!isAllSelected(element2)) {
      throw new Error("The element content to be cleared could not be selected.");
    }
    input(this[Config], element2, "", "deleteContentBackward");
  });
}
function selectOptions(select, values6) {
  return __async(this, null, function* () {
    return selectOptionsBase.call(this, true, select, values6);
  });
}
function deselectOptions(select, values6) {
  return __async(this, null, function* () {
    return selectOptionsBase.call(this, false, select, values6);
  });
}
function selectOptionsBase(newValue, select, values6) {
  return __async(this, null, function* () {
    if (!newValue && !select.multiple) {
      throw getConfig().getElementError(`Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.`, select);
    }
    const valArray = Array.isArray(values6) ? values6 : [values6];
    const allOptions = Array.from(select.querySelectorAll('option, [role="option"]'));
    const selectedOptions = valArray.map((val) => {
      if (typeof val !== "string" && allOptions.includes(val)) {
        return val;
      } else {
        const matchingOption = allOptions.find((o) => o.value === val || o.innerHTML === val);
        if (matchingOption) {
          return matchingOption;
        } else {
          throw getConfig().getElementError(`Value "${String(val)}" not found in options`, select);
        }
      }
    }).filter((option) => !isDisabled(option));
    if (isDisabled(select) || !selectedOptions.length)
      return;
    const selectOption = (option) => {
      option.selected = newValue;
      this.dispatchUIEvent(select, "input", {
        bubbles: true,
        cancelable: false,
        composed: true
      });
      this.dispatchUIEvent(select, "change");
    };
    if (isElementType(select, "select")) {
      if (select.multiple) {
        for (const option of selectedOptions) {
          const withPointerEvents = this[Config].pointerEventsCheck === 0 ? true : hasPointerEvents(option);
          if (withPointerEvents) {
            this.dispatchUIEvent(option, "pointerover");
            this.dispatchUIEvent(select, "pointerenter");
            this.dispatchUIEvent(option, "mouseover");
            this.dispatchUIEvent(select, "mouseenter");
            this.dispatchUIEvent(option, "pointermove");
            this.dispatchUIEvent(option, "mousemove");
            this.dispatchUIEvent(option, "pointerdown");
            this.dispatchUIEvent(option, "mousedown");
          }
          focus(select);
          if (withPointerEvents) {
            this.dispatchUIEvent(option, "pointerup");
            this.dispatchUIEvent(option, "mouseup");
          }
          selectOption(option);
          if (withPointerEvents) {
            this.dispatchUIEvent(option, "click");
          }
        }
      } else if (selectedOptions.length === 1) {
        const withPointerEvents = this[Config].pointerEventsCheck === 0 ? true : hasPointerEvents(select);
        if (withPointerEvents) {
          yield this.click(select);
        } else {
          focus(select);
        }
        selectOption(selectedOptions[0]);
        if (withPointerEvents) {
          this.dispatchUIEvent(select, "pointerover");
          this.dispatchUIEvent(select, "pointerenter");
          this.dispatchUIEvent(select, "mouseover");
          this.dispatchUIEvent(select, "mouseenter");
          this.dispatchUIEvent(select, "pointerup");
          this.dispatchUIEvent(select, "mouseup");
          this.dispatchUIEvent(select, "click");
        }
      } else {
        throw getConfig().getElementError(`Cannot select multiple options on a non-multiple select`, select);
      }
    } else if (select.getAttribute("role") === "listbox") {
      for (const option of selectedOptions) {
        yield this.click(option);
        yield this.unhover(option);
      }
    } else {
      throw getConfig().getElementError(`Cannot select options on elements that are neither select nor listbox elements`, select);
    }
  });
}
function type(_0, _1) {
  return __async(this, arguments, function* (element2, text2, {
    skipClick = this[Config].skipClick,
    skipAutoClose = this[Config].skipAutoClose,
    initialSelectionStart,
    initialSelectionEnd
  } = {}) {
    if (element2.disabled)
      return;
    if (!skipClick) {
      yield this.click(element2);
    }
    if (initialSelectionStart !== void 0) {
      setSelectionRange(element2, initialSelectionStart, initialSelectionEnd != null ? initialSelectionEnd : initialSelectionStart);
    }
    yield this.keyboard(text2);
    if (!skipAutoClose) {
      yield releaseAllKeys(this[Config]);
    }
  });
}
function upload(element2, fileOrFiles) {
  return __async(this, null, function* () {
    const input2 = isElementType(element2, "label") ? element2.control : element2;
    if (!input2 || !isElementType(input2, "input", { type: "file" })) {
      throw new TypeError(`The ${input2 === element2 ? "given" : "associated"} ${input2 == null ? void 0 : input2.tagName} element does not accept file uploads`);
    }
    if (isDisabled(element2))
      return;
    const files = (Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]).filter((file) => !this[Config].applyAccept || isAcceptableFile(file, input2.accept)).slice(0, input2.multiple ? void 0 : 1);
    const fileDialog = () => {
      var _a;
      if (files.length === ((_a = input2.files) == null ? void 0 : _a.length) && files.every((f2, i) => {
        var _a2;
        return f2 === ((_a2 = input2.files) == null ? void 0 : _a2.item(i));
      })) {
        return;
      }
      setFiles(input2, createFileList(files));
      this.dispatchUIEvent(input2, "input");
      this.dispatchUIEvent(input2, "change");
    };
    input2.addEventListener("fileDialog", fileDialog);
    yield this.click(element2);
    input2.removeEventListener("fileDialog", fileDialog);
  });
}
function isAcceptableFile(file, accept) {
  if (!accept) {
    return true;
  }
  const wildcards = ["audio/*", "image/*", "video/*"];
  return accept.split(",").some((acceptToken) => {
    if (acceptToken.startsWith(".")) {
      return file.name.endsWith(acceptToken);
    } else if (wildcards.includes(acceptToken)) {
      return file.type.startsWith(acceptToken.substr(0, acceptToken.length - 1));
    }
    return file.type === acceptToken;
  });
}
function wrapAsync(implementation) {
  return getConfig().asyncWrapper(implementation);
}
function createConfig(options = {}, defaults = defaultOptionsSetup, node) {
  const document2 = getDocument(options, node, defaults);
  const {
    keyboardState = createKeyboardState(),
    pointerState = createPointerState(document2)
  } = options;
  return __spreadProps(__spreadValues2(__spreadValues2({}, defaults), options), {
    document: document2,
    keyboardState,
    pointerState
  });
}
function setupMain(options = {}) {
  var _a;
  const config2 = createConfig(options);
  prepareDocument(config2.document);
  const view = (_a = config2.document.defaultView) != null ? _a : globalThis.window;
  attachClipboardStubToView(view);
  return doSetup(config2);
}
function setupDirect(options = {}, node) {
  const config2 = createConfig(options, defaultOptionsDirect, node);
  prepareDocument(config2.document);
  return {
    config: config2,
    api: doSetup(config2)
  };
}
function setupSub(options) {
  return doSetup(__spreadValues2(__spreadValues2({}, this[Config]), options));
}
function wrapAndBindImpl(instance2, impl) {
  function method(...args) {
    setLevelRef(instance2[Config], 1);
    return wrapAsync(() => impl.apply(instance2, args));
  }
  Object.defineProperty(method, "name", { get: () => impl.name });
  return method;
}
function doSetup(config2) {
  const instance2 = __spreadValues2({
    [Config]: config2,
    dispatchUIEvent: bindDispatchUIEvent(config2)
  }, api_exports);
  return __spreadProps(__spreadValues2({}, Object.fromEntries(Object.entries(api_exports).map(([name, api]) => [
    name,
    wrapAndBindImpl(instance2, api)
  ]))), {
    setup: setupSub.bind(instance2)
  });
}
function getDocument(options, node, defaults) {
  var _a, _b;
  return (_b = (_a = options.document) != null ? _a : node && getDocumentFromNode(node)) != null ? _b : defaults.document;
}
var directApi_exports = {};
__export(directApi_exports, {
  clear: () => clear2,
  click: () => click2,
  copy: () => copy2,
  cut: () => cut2,
  dblClick: () => dblClick2,
  deselectOptions: () => deselectOptions2,
  hover: () => hover2,
  keyboard: () => keyboard2,
  paste: () => paste2,
  pointer: () => pointer2,
  selectOptions: () => selectOptions2,
  tab: () => tab2,
  tripleClick: () => tripleClick2,
  type: () => type2,
  unhover: () => unhover2,
  upload: () => upload2
});
function clear2(element2) {
  return setupDirect().api.clear(element2);
}
function click2(element2, options = {}) {
  return setupDirect(options, element2).api.click(element2);
}
function copy2(options = {}) {
  return setupDirect(options).api.copy();
}
function cut2(options = {}) {
  return setupDirect(options).api.cut();
}
function dblClick2(element2, options = {}) {
  return setupDirect(options).api.dblClick(element2);
}
function deselectOptions2(select, values6, options = {}) {
  return setupDirect(options).api.deselectOptions(select, values6);
}
function hover2(element2, options = {}) {
  return setupDirect(options).api.hover(element2);
}
function keyboard2(_0) {
  return __async(this, arguments, function* (text2, options = {}) {
    const { config: config2, api } = setupDirect(options);
    return api.keyboard(text2).then(() => config2.keyboardState);
  });
}
function pointer2(_0) {
  return __async(this, arguments, function* (input2, options = {}) {
    const { config: config2, api } = setupDirect(options);
    return api.pointer(input2).then(() => config2.pointerState);
  });
}
function paste2(clipboardData, options) {
  return setupDirect(options).api.paste(clipboardData);
}
function selectOptions2(select, values6, options = {}) {
  return setupDirect(options).api.selectOptions(select, values6);
}
function tripleClick2(element2, options = {}) {
  return setupDirect(options).api.tripleClick(element2);
}
function type2(element2, text2, options = {}) {
  return setupDirect(options, element2).api.type(element2, text2, options);
}
function unhover2(element2, options = {}) {
  const { config: config2, api } = setupDirect(options);
  config2.pointerState.position.mouse.target = element2;
  return api.unhover(element2);
}
function upload2(element2, fileOrFiles, options = {}) {
  return setupDirect(options).api.upload(element2, fileOrFiles);
}
function tab2(options = {}) {
  return setupDirect().api.tab(options);
}
var userEvent = __spreadProps(__spreadValues2({}, directApi_exports), {
  setup: setupMain
});
function noop() {
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b2) {
  return a != a ? b2 == b2 : a !== b2 || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_input_value(input2, value) {
  input2.value = value == null ? "" : value;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
function handle_promise(promise, info) {
  const token = info.token = {};
  function update2(type3, index2, key, value) {
    if (info.token !== token)
      return;
    info.resolved = value;
    let child_ctx = info.ctx;
    if (key !== void 0) {
      child_ctx = child_ctx.slice();
      child_ctx[key] = value;
    }
    const block = type3 && (info.current = type3)(child_ctx);
    let needs_flush = false;
    if (info.block) {
      if (info.blocks) {
        info.blocks.forEach((block2, i) => {
          if (i !== index2 && block2) {
            group_outros();
            transition_out(block2, 1, 1, () => {
              if (info.blocks[i] === block2) {
                info.blocks[i] = null;
              }
            });
            check_outros();
          }
        });
      } else {
        info.block.d(1);
      }
      block.c();
      transition_in(block, 1);
      block.m(info.mount(), info.anchor);
      needs_flush = true;
    }
    info.block = block;
    if (info.blocks)
      info.blocks[index2] = block;
    if (needs_flush) {
      flush();
    }
  }
  if (is_promise(promise)) {
    const current_component2 = get_current_component();
    promise.then((value) => {
      set_current_component(current_component2);
      update2(info.then, 1, info.value, value);
      set_current_component(null);
    }, (error2) => {
      set_current_component(current_component2);
      update2(info.catch, 2, info.error, error2);
      set_current_component(null);
      if (!info.hasCatch) {
        throw error2;
      }
    });
    if (info.current !== info.pending) {
      update2(info.pending, 0);
      return true;
    }
  } else {
    if (info.current !== info.then) {
      update2(info.then, 1, info.value, promise);
      return true;
    }
    info.resolved = promise;
  }
}
function update_await_block_branch(info, ctx, dirty) {
  const child_ctx = ctx.slice();
  const { resolved } = info;
  if (info.current === info.then) {
    child_ctx[info.value] = resolved;
  }
  if (info.current === info.catch) {
    child_ctx[info.error] = resolved;
  }
  info.block.p(child_ctx, dirty);
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type3, callback) {
    const callbacks = this.$$.callbacks[type3] || (this.$$.callbacks[type3] = []);
    callbacks.push(callback);
    return () => {
      const index2 = callbacks.indexOf(callback);
      if (index2 !== -1)
        callbacks.splice(index2, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
var login_svelte_svelte_type_style_lang = "";
function create_else_block(ctx) {
  let await_block_anchor;
  let promise_1;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: true,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block,
    value: 9,
    error: 10
  };
  handle_promise(promise_1 = ctx[3], info);
  return {
    c() {
      await_block_anchor = empty();
      info.block.c();
    },
    m(target, anchor) {
      insert(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      if (dirty & 8 && promise_1 !== (promise_1 = ctx[3]) && handle_promise(promise_1, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
    },
    d(detaching) {
      if (detaching)
        detach(await_block_anchor);
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function create_if_block(ctx) {
  let p2;
  return {
    c() {
      p2 = element("p");
    },
    m(target, anchor) {
      insert(target, p2, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(p2);
    }
  };
}
function create_catch_block(ctx) {
  let div;
  let span;
  let t_value = ctx[10].message + "";
  let t;
  return {
    c() {
      div = element("div");
      span = element("span");
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & 8 && t_value !== (t_value = ctx2[10].message + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_then_block(ctx) {
  let div;
  let span;
  let t_value = ctx[9] + "";
  let t;
  return {
    c() {
      div = element("div");
      span = element("span");
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & 8 && t_value !== (t_value = ctx2[9] + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_pending_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span>Logging in...</span>`;
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment(ctx) {
  let div1;
  let h1;
  let t1;
  let form;
  let label0;
  let t3;
  let input0;
  let t4;
  let label1;
  let t6;
  let input1;
  let t7;
  let input2;
  let t8;
  let div0;
  let t10;
  let input3;
  let t11;
  let if_block_anchor;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (ctx2[3] === void 0)
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div1 = element("div");
      h1 = element("h1");
      h1.textContent = "Login Form";
      t1 = space();
      form = element("form");
      label0 = element("label");
      label0.textContent = "Username";
      t3 = space();
      input0 = element("input");
      t4 = space();
      label1 = element("label");
      label1.textContent = "Password";
      t6 = space();
      input1 = element("input");
      t7 = space();
      input2 = element("input");
      t8 = space();
      div0 = element("div");
      div0.textContent = `${error}`;
      t10 = space();
      input3 = element("input");
      t11 = space();
      if_block.c();
      if_block_anchor = empty();
      attr(h1, "class", "svelte-1p128bh");
      attr(label0, "for", "username");
      attr(input0, "aria-label", "username");
      attr(input0, "type", "text");
      attr(input0, "name", "username");
      attr(input0, "placeholder", "Username");
      input0.required = true;
      attr(input0, "class", "svelte-1p128bh");
      attr(label1, "for", "password");
      attr(input1, "id", "password");
      attr(input1, "type", "password");
      attr(input1, "name", "password");
      attr(input1, "placeholder", "Password");
      input1.required = true;
      attr(input1, "class", "svelte-1p128bh");
      attr(input2, "type", "text");
      attr(input2, "name", "token");
      input2.value = ctx[0];
      input2.readOnly = true;
      attr(input2, "class", "svelte-1p128bh");
      attr(input3, "type", "submit");
      attr(input3, "class", "svelte-1p128bh");
      attr(form, "method", "post");
      attr(div1, "class", "login-form svelte-1p128bh");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, h1);
      append(div1, t1);
      append(div1, form);
      append(form, label0);
      append(form, t3);
      append(form, input0);
      set_input_value(input0, ctx[1]);
      append(form, t4);
      append(form, label1);
      append(form, t6);
      append(form, input1);
      set_input_value(input1, ctx[2]);
      append(form, t7);
      append(form, input2);
      append(form, t8);
      append(form, div0);
      append(form, t10);
      append(form, input3);
      insert(target, t11, anchor);
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      if (!mounted) {
        dispose = [
          listen(input0, "input", ctx[6]),
          listen(input1, "input", ctx[7]),
          listen(form, "submit", prevent_default(ctx[4]))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2 && input0.value !== ctx2[1]) {
        set_input_value(input0, ctx2[1]);
      }
      if (dirty & 4 && input1.value !== ctx2[2]) {
        set_input_value(input1, ctx2[2]);
      }
      if (dirty & 1 && input2.value !== ctx2[0]) {
        input2.value = ctx2[0];
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div1);
      if (detaching)
        detach(t11);
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
let error = "";
function instance($$self, $$props, $$invalidate) {
  let { token } = $$props;
  let { session } = $$props;
  console.log("session", session);
  let username = "";
  let password = "";
  let promise;
  async function validate(username2, password2, token2) {
    console.log("=== session ===", session);
    const json = await session.validate(username2, password2, token2);
    if (json.code === 200) {
      location.reload();
    }
    return json.error;
  }
  function submitHandler() {
    $$invalidate(3, promise = validate(username, password, token));
  }
  function input0_input_handler() {
    username = this.value;
    $$invalidate(1, username);
  }
  function input1_input_handler() {
    password = this.value;
    $$invalidate(2, password);
  }
  $$self.$$set = ($$props2) => {
    if ("token" in $$props2)
      $$invalidate(0, token = $$props2.token);
    if ("session" in $$props2)
      $$invalidate(5, session = $$props2.session);
  };
  return [
    token,
    username,
    password,
    promise,
    submitHandler,
    session,
    input0_input_handler,
    input1_input_handler
  ];
}
class Login extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { token: 0, session: 5 });
  }
}
function getStore() {
  return globalThis.forwardAuthStore;
}
const post = async ({ request }) => {
  const store = getStore();
  const { username, password, token } = await request.json();
  const [csrf, link] = token.split(":");
  console.log("login post", { username, password, token, link, store });
  const user = store.getUser(username, password);
  if (!user) {
    console.log("--- not found ---");
    return {
      status: 200,
      body: {
        code: 401,
        error: "Invalid Username/Password"
      }
    };
  }
  const xxx = store.getLocalsByLink(link);
  if (xxx) {
    store.updateLocals(xxx.id, { user });
  }
  return {
    status: 200,
    body: {
      code: 200,
      error: "success"
    }
  };
};
const isAuthenticated = (username) => {
  return async (actor) => {
    const store = actor.world.store;
    console.log("=== dom isAuthenticated ===", { store });
    const locals = store.getLocalsForUser(username);
    console.log("====", { locals });
    console.log("isAuthenticated", locals);
    return (locals == null ? void 0 : locals.user) !== void 0;
  };
};
const login = (username, password) => {
  return async (actor) => {
    const store = actor.world.store;
    const document2 = actor.world.document;
    console.log("dom login", { store, document: document2 });
    const sid = v4();
    const locals = store.createLocals(sid);
    const link = locals.link;
    actor.remember("auth.sid", sid);
    const loginSessionHandler = {
      validate: async (username2, password2, token) => {
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        console.log("==== dom login validate ====", username2, password2, token);
        const request = {
          json: async () => {
            return { username: username2, password: password2, token };
          }
        };
        const requestEvent = {
          request
        };
        return post(requestEvent);
      }
    };
    const { container, getByRole: getByRole2, getByLabelText: getByLabelText2 } = dist.render(Login, {
      props: {
        token: `foo:${link}`,
        session: loginSessionHandler
      }
    }, { container: document2.body });
    console.log({ container });
    const ccc = getByRole2("textbox", { name: "username" });
    await userEvent.type(ccc, username);
    const cc2 = getByLabelText2("Password");
    await userEvent.type(cc2, password);
    const cc3 = getByRole2("button", { name: /submit/i });
    await userEvent.click(cc3);
  };
};
export { isAuthenticated, login };
