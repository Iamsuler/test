/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const util = {
  getScript: function (s, el, callback) {
    var dom = document.createElement('script');
    dom.src = s;
    dom.type = 'text/javascript';
    var parentNode = el || document.head;
    parentNode.appendChild(dom);
    dom.onload = function () {
      if (typeof callback === 'function') {
        callback();
      }
    }
  },
  init: function () {
    //滑动组件
    $('.js-slide-view').each(function () {
      var $this = $(this),
        $item = $this.find('.js-slide-item'),
        $list = $this.find('.js-slide-list'),
        height_item = $item.eq(0).height(),
        width_list = 0;
      for (var i = 0; i < $item.length; i++) {
        width_list += $item.eq(i).width();
      }
      $list.height(height_item + 50).width(width_list + 3);
      $this.height(height_item)
    });

    //百度搜索
    $('.bd-form').submit(function (e) {
      e.preventDefault();
      window.open('http://www.baidu.com/s?wd=' + encodeURIComponent($(this).find('[name="kw"]').val() + ' site:liuxue86.com'));
    });

    //顶部伸缩
    var isModalOut = false;
    var $headItem = $('.head-right>.head-item'),
        $sideItem = $('#head').find('.side-item');
    $headItem.click(function (e) {
      e.preventDefault();
      var $this = $(this),
        index = $this.index(),
        hasClose = $this.hasClass('close'),
        $side = $('#head').find('.side-item').eq(index);
      if (hasClose) {
        isModalOut = false;
        $side.removeClass('active');
        $body.removeClass('hidden');
      } else {
        isModalOut = true;
        $this.siblings().removeClass('close');
        $side.show().addClass('active').siblings().hide().removeClass('active');
        $body.addClass('hidden');
      }
      $this.toggleClass('close');
    });
    //返回上一页
    $('.go-back').click(function () {
      if (isModalOut) {
        isModalOut = false;
        $headItem.removeClass('close');
        $sideItem.removeClass('active');
        $body.removeClass('hidden');
      } else {
        if (history.length >= 2) {
          history.go(-1);
        } else {
          window.location.href = 'https://m.liuxue86.com/';
        }
      }
    });

    //页面滚动事件
    var isScrollDown = 0,
      $body = $('body'),
      $fixedBox = $('#fixed-box');
    var $sideShare = $('.side-share');
    var p = 0, t = 0;
    function scrollDirection() {
      p = window.scrollY;
      if (t < p && p > 60) {//下滚  
        $body.addClass('scroll-down');
        $fixedBox.removeClass('show-to-top');
      } else {//上滚  
        !isModalOut && $body.removeClass('scroll-down');
        p > 600 ? $fixedBox.addClass('show-to-top') : $fixedBox.removeClass('show-to-top');
      }
      setTimeout(function () {
        t = p;
      }, 0)
    }
    function debounce(method, context) {
      clearTimeout(method.timeout);
      method.timeout = setTimeout(function () {
        method();
      }, 50);
    }
    var screenHeight = document.documentElement.clientHeight;
    function anchorWatch(){
      var arr = document.getElementsByClassName('anchor-section');
      for (var i = 0, len = arr.length; i < len; i++) {
        var curGg = arr[i];
        if (curGg.getBoundingClientRect().top < 100) {
          var id = curGg.getAttribute("data-id");
          $('.anchor-list').children().removeClass('active').eq(id).addClass('active');
        }
      }
    }
    window.onscroll = function () {
      !isModalOut && debounce(scrollDirection, window);
      if ($('.anchor-section')) {
        debounce(anchorWatch, window)
      }
    };

    //返回顶部
    var timer = null;
    $('.to-top').click(function (e) {
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
          timer = requestAnimationFrame(fn);
        } else {
          $('#fixed-box').removeClass('show-to-top');
          cancelAnimationFrame(timer);
        }
      });
    });

    (function(){
      //自动插入国家列表
      var abroad_nation_names = ['未定','美国','英国','加拿大','意大利','法国','德国','西班牙','澳洲','日本','韩国','新加坡','新西兰','中国香港','俄罗斯','泰国','马来西亚','奥地利','欧洲','亚洲','其他地区'];
      var html = "";
      for (var i = 0; i < abroad_nation_names.length; i++) {
        html += '<option value="' + abroad_nation_names[i] + '">'+ abroad_nation_names[i] +'</option>';
      }
      $('select[name="country"]').each(function(){
        var tagName = $(this).prop('nodeName');
        if (tagName == 'SELECT') {
          $(this).append(html);	
        }
      });
    })();

    // 省市联动
    var provinceCityLinked = {
      provinceSelect: $('select[name="province"]'),
      changeCitys: function(el, province){
        el.html('<option>城市</option>')
        var city = '',
          cityList = province_city[province];
        for(var i = 0; i < cityList.length; i++) {
          if (cityList[i] == remote_ip_info.city) {
            city += '<option value="' + cityList[i] + '" selected>' + cityList[i] + '</option>';
          } else {
            city += '<option value="' + cityList[i] + '">' + cityList[i] + '</option>';
          }
        }
        el.append(city);
      },
      changeProvinces: function(el){
        var province = '', $citySelect = el.parents('form').find('[name="city"]');
        for(var key in province_city){
          if (key == remote_ip_info.province) {
            province += '<option value="' + key + '" selected>' + key + '</option>';
            this.changeCitys($citySelect, key);
          } else {
            province += '<option value="' + key + '">' + key + '</option>';
          }
        }
        el.append(province);
      },
      bindEvent: function(){
        var _this = this,
          $provinceSelect = this.provinceSelect,
          $citySelect = $provinceSelect.parents('form').find('[name="city"]');
        $provinceSelect.change(function(){
          _this.changeCitys($citySelect,$(this).val());
        });
      },
      init: function(){
        var $provinceSelect = this.provinceSelect;
        if ( typeof province_city != "undefined" && $provinceSelect.length > 0) {
          this.changeProvinces($provinceSelect);
        }
        this.bindEvent();
      }
    }
    if ($('[name="province"]')) {
      lx.output.load_js('https://i1.m.liuxue86.com/js/citys.js', document.head, function(){
        provinceCityLinked.init();
      }); 
    } else {
      provinceCityLinked = null;
    }

  //init end  
  }
};

/* harmony default export */ __webpack_exports__["a"] = (util);



/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
(function(global, factory) {
  if (true)
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return factory(global) }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  else
    factory(global)
}(this, function() {
  var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }

  function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = $.type(obj)

    return 'function' != type && !isWindow(obj) && (
      'array' == type || length === 0 ||
        (typeof length == 'number' && length > 0 && (length - 1) in obj)
    )
  }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overridden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. This method can be overridden in plugins.
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overridden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overridden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overridden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
      slice.call(
        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.isNumeric = function(val) {
    var num = Number(val), type = typeof val
    return val != null && type != 'boolean' &&
      (type != 'string' || val.length) &&
      !isNaN(num) && isFinite(num) || false
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }
  $.noop = function() {}

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    constructor: zepto.Z,
    length: 0,

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
      var i, value, args = []
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i]
        args[i] = zepto.isZ(value) ? value.toArray() : value
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var nodes = [], collection = typeof selector == 'object' && $(selector)
      this.each(function(_, node){
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
          node = node !== context && !isDocument(node) && node.parentNode
        if (node && nodes.indexOf(node) < 0) nodes.push(node)
      })
      return $(nodes)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this.pluck('textContent').join("") : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    removeProp: function(name){
      name = propMap[name] || name
      return this.each(function(){ delete this[name] })
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      if (0 in arguments) {
        if (value == null) value = ""
        return this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
      } else {
        return this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
      }
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
        return {top: 0, left: 0}
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0]
        if (typeof property == 'string') {
          if (!element) return
          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
        } else if (isArray(property)) {
          if (!element) return
          var props = {}
          var computedStyle = getComputedStyle(element, '')
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            var arr = []
            argType = type(arg)
            if (argType == "array") {
              arg.forEach(function(el) {
                if (el.nodeType !== undefined) return arr.push(el)
                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                arr = arr.concat(zepto.fragment(el))
              })
              return arr
            }
            return argType == "object" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src){
              var target = el.ownerDocument ? el.ownerDocument.defaultView : window
              target['eval'].call(target, el.innerHTML)
            }
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
    module.exports = Zepto
    
;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      event.timeStamp || (event.timeStamp = Date.now())

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (callback === undefined || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var jsonpID = +new Date(),
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a')

  originAnchor.href = window.location.href

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  function ajaxDataFilter(data, type, settings) {
    if (settings.dataFilter == empty) return data
    var context = settings.context
    return settings.dataFilter.call(context, data, type)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true,
    //Used to handle the raw response data of XMLHttpRequest.
    //This is a pre-filtering function to sanitize the response.
    //The sanitized response should be returned
    dataFilter: empty
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor, hashIndex
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a')
      urlAnchor.href = settings.url
      // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
      urlAnchor.href = urlAnchor.href
      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
    }

    if (!settings.url) settings.url = window.location.toString()
    if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
    serializeData(settings)

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (hasPlaceholder) dataType = 'jsonp'

    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      settings.url = appendQuery(settings.url, '_=' + Date.now())

    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))

          if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
            result = xhr.response
          else {
            result = xhr.responseText

            try {
              // http://perfectionkills.com/global-eval-what-are-the-options/
              // sanitize response accordingly if data filter callback provided
              result = ajaxDataFilter(result, dataType, settings)
              if (dataType == 'script')    (1,eval)(result)
              else if (dataType == 'xml')  result = xhr.responseXML
              else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
            } catch (e) { error = e }

            if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)
          }

          ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(key, value) {
      if ($.isFunction(value)) value = value()
      if (value == null) value = ""
      this.push(escape(key) + '=' + escape(value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  $.fn.serializeArray = function() {
    var name, type, result = [],
      add = function(value) {
        if (value.forEach) return value.forEach(add)
        result.push({ name: name, value: value })
      }
    if (this[0]) $.each(this[0].elements, function(_, field){
      type = field.type, name = field.name
      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
        ((type != 'radio' && type != 'checkbox') || field.checked))
          add($(field).val())
    })
    return result
  }

  $.fn.serialize = function(){
    var result = []
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function(callback) {
    if (0 in arguments) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function(){
  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle
    window.getComputedStyle = function(element, pseudoElement){
      try {
        return nativeGetComputedStyle(element, pseudoElement)
      } catch(e) {
        return null
      }
    }
  }
})()
  return Zepto
}))


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){"object"===( false?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e.LazyLoad=t()}(this,function(){"use strict";var e={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"src",data_srcset:"srcset",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null,callback_enter:null},t=!("onscroll"in window)||/glebot/.test(navigator.userAgent),n=function(e,t){e&&e(t)},o=function(e){return e.getBoundingClientRect().top+window.pageYOffset-e.ownerDocument.documentElement.clientTop},i=function(e,t,n){return(t===window?window.innerHeight+window.pageYOffset:o(t)+t.offsetHeight)<=o(e)-n},s=function(e){return e.getBoundingClientRect().left+window.pageXOffset-e.ownerDocument.documentElement.clientLeft},r=function(e,t,n){var o=window.innerWidth;return(t===window?o+window.pageXOffset:s(t)+o)<=s(e)-n},l=function(e,t,n){return(t===window?window.pageYOffset:o(t))>=o(e)+n+e.offsetHeight},a=function(e,t,n){return(t===window?window.pageXOffset:s(t))>=s(e)+n+e.offsetWidth},c=function(e,t,n){return!(i(e,t,n)||l(e,t,n)||r(e,t,n)||a(e,t,n))},u=function(e,t){var n,o=new e(t);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(e){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)},d=function(e,t){return e.getAttribute("data-"+t)},h=function(e,t,n){return e.setAttribute("data-"+t,n)},_=function(e,t){var n=e.parentNode;if("PICTURE"===n.tagName)for(var o=0;o<n.children.length;o++){var i=n.children[o];if("SOURCE"===i.tagName){var s=d(i,t);s&&i.setAttribute("srcset",s)}}},f=function(e,t,n){var o=e.tagName,i=d(e,n);if("IMG"===o){_(e,t);var s=d(e,t);return s&&e.setAttribute("srcset",s),void(i&&e.setAttribute("src",i))}"IFRAME"!==o?i&&(e.style.backgroundImage='url("'+i+'")'):i&&e.setAttribute("src",i)},p="classList"in document.createElement("p"),m=function(e,t){p?e.classList.add(t):e.className+=(e.className?" ":"")+t},g=function(e,t){p?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},v=function(t){this._settings=_extends({},e,t),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};v.prototype={_reveal:function(e){var t=this._settings,o=function o(){t&&(e.removeEventListener("load",i),e.removeEventListener("error",o),g(e,t.class_loading),m(e,t.class_error),n(t.callback_error,e))},i=function i(){t&&(g(e,t.class_loading),m(e,t.class_loaded),e.removeEventListener("load",i),e.removeEventListener("error",o),n(t.callback_load,e))};n(t.callback_enter,e),"IMG"!==e.tagName&&"IFRAME"!==e.tagName||(e.addEventListener("load",i),e.addEventListener("error",o),m(e,t.class_loading)),f(e,t.data_srcset,t.data_src),n(t.callback_set,e)},_loopThroughElements:function(){var e=this._settings,o=this._elements,i=o?o.length:0,s=void 0,r=[],l=this._isFirstLoop;for(s=0;s<i;s++){var a=o[s];e.skip_invisible&&null===a.offsetParent||(t||c(a,e.container,e.threshold))&&(l&&m(a,e.class_initial),this._reveal(a),r.push(s),h(a,"was-processed",!0))}for(;r.length;)o.splice(r.pop(),1),n(e.callback_processed,o.length);0===i&&this._stopScrollHandler(),l&&(this._isFirstLoop=!1)},_purgeElements:function(){var e=this._elements,t=e.length,n=void 0,o=[];for(n=0;n<t;n++){var i=e[n];d(i,"was-processed")&&o.push(n)}for(;o.length>0;)e.splice(o.pop(),1)},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},handleScroll:function(){var e=this._settings.throttle;if(0!==e){var t=Date.now(),n=e-(t-this._previousLoopTime);n<=0||n>e?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=t,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(function(){this._previousLoopTime=Date.now(),this._loopTimeout=null,this._loopThroughElements()}.bind(this),n))}else this._loopThroughElements()},update:function(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}};var w=window.lazyLoadOptions;return w&&function(e,t){var n=t.length;if(n)for(var o=0;o<n;o++)u(e,t[o]);else u(e,t)}(v,w),v});

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload__);
/*
 * @Author: heweifang 
 * @Date: 2017-11-07 16:53:29 
 * @Last Modified by: heweifang
 * @Last Modified time: 2018-01-23 15:12:07
 */
/**
 * src   百度广告
 * tt    东方头条广告
 * tb    淘宝广告
 * type    false/取消广告； custom/自定义；tt/加载头条广告；tb/加载淘宝广告；bd/加载百度广告, sg搜狗广告
 */

var myLazyLoad = new __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload___default.a();
__webpack_require__(5);
window.ad = {
  banner0: {
    src: 'idvmavlesgkcef',
    sg: 'sg',
    type: false
  },
  banner1: {
    src: 'cxpgdfwpmaedgm',
    tt: 'idx=1&u=mhzqjeeie&t=lx',
    type: 'tt'
  },
  content1: {
    tt: 'idx=3&u=avnexbsnk&t=lx',
    type: false
  },
  content2: {
    tt: 'idx=2&u=niarkffjh&t=lx',
    type: 'tt'
  },
  content3: {
    tt: 'idx=5&u=gbtkdhytd&t=lx',
    type: false
  },
  content4: {
    tt: 'idx=6&u=hculeizuk&t=lx',
    type: false
  },
  pagedown: {
    src: 'cxpgywdmu',
    tt: 'idx=3&u=vqizzmwfr&t=lx',
    type: 'tt'
  },
  foot: {
    src: 'fasjgisipdh',
    type: false
  },
  missid: {
    src: '',
    tt: '',
    type: false
  }
};
lx.output.count_tt_js('adn=3&pgn=1&page=list');//头条广告统计代码

(function (w) {
  //插入b1
  lx.output.insert_form_b1();
  //插入页面
  var html = {};
  html.jigou = ['<ul class="item-group"><li class="list-item item-key"><a href="https://m.liuxue86.com/jigou/17/">金吉列留学</a></li>',
  '<li class="list-item item-key"><a href="https://m.liuxue86.com/jigou/18/">前途出国</a></li>',
  '<li class="list-item item-key"><a href="javascript:;">启德留学</a></li>',
  '<li class="list-item item-key"><a href="https://m.liuxue86.com/jigou/21/">威久留学</a></li>',
  '<li class="list-item item-key"><a href="https://m.liuxue86.com/jigou/22/">新通留学</a></li>',
  '<li class="list-item item-key"><a href="https://m.liuxue86.com/jigou/26/">太傻留学</a></li>',
  '<li class="list-item item-key"><a href="https://m.liuxue86.com/jigou/23/">啄木鸟留学</a></li>',
  '<li class="list-item item-key"><a href="https://m.liuxue86.com/jigou/27/">ACG艺术留学</a></li>',
  '<li class="list-item item-key"><a href="https://m.liuxue86.com/jigou/">查看更多留学</a></li></ul>'].join("");
  html.fixed = '<ul class="side-share"><li class="to-top"><i class="icon-head icon-head12"></i></li></ul>';

  $('.js-insert-box').each(function(){
    var $this = $(this), id = $this.attr('data-id');
    html[id] && $this.append(html[id]);
  });

  //自定义入口
  lx.custom = {
    adEntry: function (el, id) {
      switch (id) {
        default:
          el.style.display = 'none';
          break;
      }
    }
  }
})(window);
$(function () {
  //页面加载完成后即加载广告
  // lx.output.loadAdOnce(ggs);
  lx.output.loadAllAd(document.getElementsByClassName('gg'), true);
  // lx.output.lazyLoadAd(ggs);//加载首屏广告
  // window.onscroll = function () {
  //     lx.output.lazyLoadAd(ggs);
  // };
  lx.output.count_tt('id=liuxuelist');//头条统计
});

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zepto_webpack__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zepto_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_util__ = __webpack_require__(1);


__webpack_require__(33)

__WEBPACK_IMPORTED_MODULE_1__lib_util__["a" /* default */].init();

__WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(function(){
  //城市列表展开
  __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.js-more-once').click(function(){
    __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(this).parent().hide().siblings().removeClass('js-off');
  });

  //表单名单滚动
  var $formList = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('#form-scroll-list');
  var formScroll = {
    timeRandom: 1,
    scrollTop: 0,
    showFormList: function(){
      var that = this;
      setTimeout(function(){
        that.scrollList();
      }, 3000);
    },
    randomTime: function(){
      var that = this,
          time = 3000;
      that.timeRandom++;
      if (this.timeRandom == 8) {
        return ;
      } else if (this.timeRandom % 2 == 0) {
        time = parseInt(Math.random() * 5500 + 1000);
      }
      setTimeout(function(){
        that.scrollList();
      }, time);
    },
    scrollList: function(){
      this.scrollTop -= 16;
      $formList.css('top', this.scrollTop);
      this.randomTime();
    },
    init: function(){
      var that = this, ln = formRandomList.length;
      var html = '<ul>';
      for (var index = 0; index < 4; index++) {
        var i = parseInt(Math.random() * ln);
        html += '<li class="item">' + formRandomList[i] + '</li><li></li>'
      }
      html += '</ul>';
      formRandomList = null;
      $formList.append(html).show;
      this.showFormList();
    }
  }
  if ($formList) {
    lx.output.load_js('https://i1.liuxue86.com/js/formRandomList.js', document.head, function(){
      formScroll.init();
    });
  } else {
    formScroll = null;
  }
});

window.$ = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default.a;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/*
* @Author: Administrator
* @Date:   2017-07-27 11:18:37
 * @Last Modified by: heweifang
 * @Last Modified time: 2017-12-13 18:05:08
 * @Last Modified time: 2018-01-26 15:44:42
*/
(function (w) {

  var lx = {};
  var date = new Date();
  lx.output = {
    'hasModal': false,
    'isSpider': function () {
      var ua = window.navigator.userAgent,
        spiders = ['Yisouspider', '360Spider', 'HaoSouSpider', 'Sogou web spider', 'Sogou inst spider', 'Sogou Spider'];
      for (var i = 0; i < spiders.length; i++) {
        var isSpider = true;
        isSpider = isSpider && (ua.indexOf(spiders[i]) > -1);
        if (isSpider) {
          break;
        }
      }
      return isSpider;
    },
    'form_modal': function () {
      var $modal = $('.win-box');
      $modal.fadeIn();
      $modal.find('.su-fork').click(function () {
        $modal.fadeOut();
      });
    },
    'ajax_guestbook': function (el, obj, callback) {
      var reg = new RegExp("(^| )referer=([^;]*)(;|$)"), referer = document.cookie.match(reg) ? document.cookie.match(reg)[2] : '';
      if (!this.hasModal) {
        switch (obj.position) {
          case 'B4':
            var formType = '根据您的房产意向<br>资深顾问';
            break;
          default:
            var formType = '根据您的留学意向<br>老师';
            break;
        }
        this.insert_modal(formType);
        this.hasModal = true;
      }
      obj.from_url = referer;
      $.ajax({
        type: 'POST',
        url: 'https://extra.liuxue86.com/guestbook.php',
        data: obj,
        dataType: 'json',
        success: function (res) {
          el.find('input').val('');
          el.find('[type="submit"]').attr('disabled', false);
          if (res.ret === 0) {
            lx.output.form_modal();
            if (typeof callback == 'function') {
              callback();
            }
          } else {
            alert(res.msg);
          }
        },
        error: function (err) {
          alert('网络错误，请刷新后提交...');
        }
      });
    },
    'load_bd_js': function (el, s, id) {
      if (s === undefined || (lx.output.isAdClearArea && ['pageup', 'pagedown', 'banner2'].indexOf(id) == -1)) {
        el.style.display = 'none';
        return;
      }
      var adEle = document.createElement('script');
      adEle.type = 'text/javascript';
      adEle.async = true;
      adEle.src = '//bbccaa.liuxue86.com/' + s + '.js';
      el.appendChild(adEle);
      adEle.onload = function(){
        el.style.display = 'block';
      }
    },
    'load_tb_js': function (el, s) {
      if (lx.output.isAdClearArea || s === undefined) {
        el.style.display = 'none';
        return;
      }
      var link = '<a style=\"display:none!important\" id=\"tanx-a-' + s + '\"></a>';
      var adEle = document.createElement('script');
      adEle.type = 'text/javascript';
      adEle.charset = 'gbk';
      adEle.id = 'tanx-s-' + s;
      adEle.src = 'https://p.tanx.com/ex?i=' + s;
      $(el).append(link);
      el.appendChild(adEle);
      adEle.onload = function(){
        el.style.display = 'block';
      }
    },
    'load_sg_js': function (el, id) {
      if (lx.output.isAdClearArea) {
        el.style.display = 'none';
        return;
      }
      // var adEle = document.createElement('script');
      // adEle.type = 'text/javascript';
      // adEle.src = 'https://theta.sogoucdn.com/wap/js/wp.js';
      // $(el).append('<script type="text/javascript"> var sogou_ad_id=' + id + '; var sogou_ad_height=250; var sogou_ad_width=300;</script>');
      var adEle = document.createElement('iframe');
      adEle.src = 'https://i1.liuxue86.com/js/sg.html';
      el.appendChild(adEle);
      adEle.onload = function(){
        el.style.display = 'block';
      }
    },
    'lastBannerAd': function (id) {
      var $banner = $('.gg[data-id*="banner"]'),
        $last = $banner.eq($banner.length - 1);
      $last.html('');
      lx.output.loadAdBaidu($last[0], 'Jewnngfmthlfgmk');
    },
    'load_tt_js': function (el, params, id) {
      if (lx.output.isAdClearArea && id == 'banner1') {
        el.style.display = 'none';
        return;
      }
      var adEle = document.createElement('script');
      adEle.type = 'text/javascript';
      adEle.async = true;
      adEle.src = '//09img.shaqm.com/h5/partner/plg_gg.min.js';
      adEle.setAttribute('__param', params);
      el.appendChild(adEle);
      adEle.onload = function(){
        el.style.display = 'block';
      }
    },
    'count_tt_js': function (params) {
      var adEle = document.createElement('script');
      adEle.type = 'text/javascript';
      adEle.async = true;
      adEle.src = '//09img.shaqm.com/h5/partner/plg_ssp.min.js';
      adEle.setAttribute('__param','q=qid02430&' + params);
      document.head.appendChild(adEle);
    },
    count_tt: function(params){
      var adEle = document.createElement('script');
      adEle.type = 'text/javascript';
      adEle.async = true;
      adEle.src = '//09img.shaqm.com/h5/partner/plg_tj.min.js';
      adEle.setAttribute('__param','q=qid02430&' + params);
      document.head.appendChild(adEle);
    },
    'count_page_view': function (id) {
      var _hmt = _hmt || [];
      var hm = document.createElement("script");
      var s = document.getElementsByTagName("script")[0];
      hm.src = "https://hm.baidu.com/hm.js?" + id;
      s.parentNode.insertBefore(hm, s);
    },
    'load_js': function (s, tag, cb) {
      var js = document.createElement("script");
      var head = tag || document.head;
      js.type = 'text/javascript';
      js.defer = true;
      js.src = s;
      head.appendChild(js);
      if (typeof cb === 'function') {
        js.onload = function(){
          cb();
        }
      }
    },
    'screenHeight': document.documentElement.clientHeight + 700,
    'loadAllAd': function (arr, isLoadAll) {
      for (var i = 0, len = arr.length; i < len; i++) {
        var curGg = arr[i], id = curGg.getAttribute('data-id');
        if (ad[id] == undefined) {
          id = 'missid'
        }
        var type = ad[id].type;
        if (!curGg.isLoad && (isLoadAll || curGg.getBoundingClientRect().top < this.screenHeight)) {
          curGg.isLoad = true;
          if (type) {
            switch (type) {
              case 'tt':
                if (ad[id].tt === undefined) {
                  curGg.style.display = 'none';
                } else {
                  this.load_tt_js(curGg, ad[id].tt, id);
                }
                break;
              case 'bd':
                this.load_bd_js(curGg, ad[id].src, id);
                break;
              case 'tb':
                this.load_tb_js(curGg, ad[id].tb);
                break;
              case 'sg':
                this.load_sg_js(curGg, ad[id].sg);
                break;
              case 'custom':
                lx.custom.adEntry(curGg, id);
                break;
              default:
                this.load_bd_js(curGg, ad[id].src, id);
                break;
            }
          } else {
            curGg.style.display = 'none';
          }
        }
      }
    },
    'lazyLoadAd': function (arr) {
      for (var i = 0, len = arr.length; i < len; i++) {
        var curGg = arr[i];
        if (!curGg.isLoad && curGg.getBoundingClientRect().top < this.screenHeight) {
          curGg.isLoad = true;
          var id = curGg.getAttribute("data-id"), src = ad[id].src, type = ad[id].type;
          if (type) {
            this.loadAdBaidu(curGg, src);
          } else {
            loadSpecialAd(curGg, id);
          }
        }
      }
    },
    'loadAdOnce': function (el) {
      this.loadAllAd(el);//调用首屏广告
      $(window).one('scroll', function (e) {
        lx.output.loadAllAd(el, true);//加参数加载剩余广告
      });
    },
    judgeAdClearArea: function () {
      lx.output.isAdClearArea = lx.output.isAdClearArea || ['北京', '上海', '成都'].indexOf(remote_ip_info.city) > -1;
    },
    ipAdress: function () {
      var js = document.createElement('script');
      js.src = 'https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
      document.getElementsByTagName('head')[0].appendChild(js);
      js.onload = function () {
        sessionStorage.setItem("ipCity", remote_ip_info.city);
        sessionStorage.setItem("ipProvince", remote_ip_info.province);
        lx.output.judgeAdClearArea();
      }
    },
    'show_foot': function () {
      $('#footer').append('<div class="footer-copyright">Copyright &copy; 2005-2018 liuxue86.com All Rights Reserved</div>');
    },
    'insert_form_b1': function () {
      if (['country_list', 'list_liuxue'].indexOf(str_template) == -1) {
        return;
      }
      var html = ['<div class="index-form">',
      '  <div class="index-form-head">',
      '    <div class="index-form-head-tit">',
      '      <p class="fs24">抢<span class="cf60">千元</span>留学奖学金</p>',
      '      <p class="fs16">全国仅3000个名额</p>',
      '    </div>',
      '  </div>',
      '  <div class="index-form-body">',
      '    <div class="form-scroll">',
      '      <p id="form-scroll-list" class="form-scroll-list"></p>',
      '    </div>',
      '    <form class="guestbook-form form-list" data-id="B1">',
      '      <div class="form-body">',
      '        <div class="form-item">',
      '          <div>',
      '            <input class="form-control" type="text" name="uname" placeholder=" 怎么称呼您？" required>',
      '          </div>',
      '          <div>',
      '            <select class="form-control" name="country" required>',
      '              <option value="">意向留学国家</option>',
      '            </select>',
      '          </div>',
      '        </div>',
      '        <div class="form-item">',
      '          <div>',
      '            <select class="form-control" name="province" required>',
      '              <option value="">省份</option>',
      '            </select>',
      '          </div>',
      '          <div>',
      '            <select class="form-control" name="city">',
      '              <option value="">城市</option>',
      '            </select>',
      '          </div>',
      '        </div>',
      '        <div class="form-item">',
      '          <div>',
      '            <input class="form-control" type="text" name="telphone" placeholder="您的电话是？" required>',
      '          </div>',
      '          <div>',
      '            <select class="form-control" name="degree" required>',
      '              <option value="硕士" selected>硕士</option>',
      '              <option value="未定">未定</option>',
      '              <option value="本科">本科</option>',
      '              <option value="博士">博士</option>',
      '              <option value="语言学校">语言学校</option>',
      '              <option value="MBA">MBA</option>',
      '              <option value="高中">高中</option>',
      '              <option value="初中">初中</option>',
      '              <option value="小学">小学</option>',
      '              <option value="幼儿园">幼儿园</option>',
      '            </select>',
      '          </div>',
      '        </div>',
      '        <div class="privacy-policy">',
      '          <label>',
      '            <input type="checkbox" name="isAgree" value="1" checked>我已阅读并同意</label>《',
      '          <a href="https://m.liuxue86.com/about/service/">出国留学网隐私条款</a>》</div>',
      '        <div>',
      '          <button class="btn btn-block btn-assertive" type="submit">立即申请</button>',
      '        </div>',
      '        <div class="form-info">',
      '          <p class="fs14 fb">已帮助40万意向留学用户成功入学</p>',
      '          <p class="fs12">&nbsp;&nbsp;&nbsp;&nbsp;立刻提交您的留学信息，离留学梦想更进一步！</p>',
      '        </div>',
      '      </div>',
      '    </form>',
      '  </div>',
      '</div>'].join("");
      $('.navbar').after(html);
    },
    'insert_chat_icon3': function (bg) {
      var chat_icon3 = ['<ul class="bottom-chat">',
        '  <li class="bottom-chat-item"><a class="icon-swt" href="http://pdt.zoosnet.net/LR/Chatpre.aspx?id=PDT38538015&cid=1499323525549292837338&lng=cn&sid=1500616190614575502781&p=http://m.meiguo.liuxue86.com/&rf1=&rf2=&msg=&d=1500621294360"><i class="icon"></i>在线咨询<span class="icon-num">1</span></a></li>',
        '  <li class="bottom-chat-item"><a class="icon-test" href="https://m.liuxue86.com/test/"><i class="icon"></i>入学测试</a></li>',
        '  <li class="bottom-chat-item"><a class="icon-phone" href="tel:13397617554"><i class="icon"></i>电话咨询</a></li>',
        '</ul>'].join("");
      // var html = ['<div class="data-link-btn">',
      // '  <a class="icon-test" href="https://m.liuxiue86.com/test/">测试留学成功率</a>',
      // '  <a class="icon-swt" href="http://pdt.zoosnet.net/LR/Chatpre.aspx?id=PDT38538015&cid=1499323525549292837338&lng=cn&sid=1501825237527597329001&p=http%3A//www.liuxue86.com/&rf1=&rf2=&msg=&d=1501838546583">资深导师在线聊</a>',
      // '</div>'].join("");
      $('body').append(chat_icon3);
      var timer = setInterval(function () {
        $('.icon-swt').toggleClass('active');
      }, 1000)
    },
  };
  window.lx = lx;
})(window);
if (typeof window.str_showmenu === "undefined") {//重写变量，防止页面因为没有定义而报错,必须放在最前面
  var str_showmenu = ""; str_typeid = ""; str_typename = ""; str_typedomain = ""; str_areaid = ""; str_areaname = ""; str_catname = ""; str_catid = ""; str_schoolid = ""; str_contentid = ""; str_template = "";
}

window.remote_ip_info = {};//接受ip地址，兼容之前新浪的数据形式
lx.output.isAdClearArea = lx.output.isSpider();
(function () {
  var city = sessionStorage.getItem('ipCity'), province = sessionStorage.getItem('ipProvince');
  if (city && province) {
    window.remote_ip_info.city = city;
    window.remote_ip_info.province = province;
    window.remote_ip_info.ret = 1;
    lx.output.judgeAdClearArea();
  } else {
    lx.output.ipAdress();
  }
})();

//定义全局变量
var href = window.location.host + window.location.pathname,//去除协议名，向https兼容
  str_liuxue_catids = ['35', '225', '337', '338', '223', '226', '235', '37', '228', '159', '160', '161', '339', '340', '38', '155', '147', '150', '252', '39', '83', '208', '209', '210', '216', '217', '218', '220', '221', '168', '170', '236', '320', '321', '322', '323', '324', '325', '326', '327', '328', '201', '202', '269', '270', '271', '272', '309', '425', '426', '427', '428', '429', '430', '431', '432', '442', '964', '965', '966', '967', '1168', '1169', '1170', '251', '265', '237', '1671', '1673', '1670'],
  isLx = str_liuxue_catids.indexOf(window.str_catid) > -1;//是否留学页面
$(function () {//统计开始
  lx.output.count_page_view("b08d435016c26e923205b833c8b52cd6");//全局统计
  switch (window.str_showmenu) {
    case '39'://考试
      lx.output.count_page_view("9dfa694fc9a7ebc3cf482b6c8f1de42e");
      break;
    case '483'://高考
      lx.output.count_page_view("4ee23f2c19066fa643cb407e902c4fe8");
      break;
    case '502'://中考
      lx.output.count_page_view("18bc1023343d5f758f9deb041aa07b11");
      break;
    case '503'://考研
      lx.output.count_page_view("2b53c3ceced373aae1602979c8b10fc4");
      break;
    case '578'://公务员
      lx.output.count_page_view("21b3555dfe0813d8f024d3d20a251dd9");
      break;
    case '935'://会计
      lx.output.count_page_view("e0353848a96574ce786a90b46064987f");
      break;
    case '1662'://考试频道
      lx.output.count_page_view("191d25345142d9fb9c4a6f044a64760f");
      break;
    case '1130'://证券从业
      lx.output.count_page_view("ee701e26dc0c9cac6138bf2d7cfb6e64");
      break;
    case '1144'://一建 二建
    case '1156':
      lx.output.count_page_view("fcb13fc268be2f7dc8c0b22f69673909");
      break;
    case '1171'://教师资格证
      lx.output.count_page_view("0fecaa286e71cad9ce51f1d370e30c43");
      break;
    case '1185'://司法考试
      lx.output.count_page_view("e488f9771b939af747d8c144a10132d8");
      break;
    case '1200'://注册会计师
      lx.output.count_page_view("7098b4625174740176a05588a9884555");
      break;
    case '1223'://银行专业资格
      lx.output.count_page_view("589f922023eec6538416d1a77f93261b");
      break;
    case '1234'://心理咨询师
      lx.output.count_page_view("238b054d4b02a2886d7d71edbeb3e77c");
      break;
    case '1245'://执业药师
      lx.output.count_page_view("11a8ecc9c6471c2dd5ab27c8ac49a3d1");
      break;
    case '237'://雅思
      lx.output.count_page_view("aa4718f3597036b53a5b6ed6cd6defe8");
      break;
    case '251'://托福
      lx.output.count_page_view("c155c4024604a195a10a6df168bc8a26");
      break;
    case '265'://GRE
      lx.output.count_page_view("d38373873236cf1525cf5f141575b2c3");
      break;
    case '341'://英语
      lx.output.count_page_view("7f9c07844e971a98d3720846a108c0bd");
      break;
    case '1284'://成人高考
      lx.output.count_page_view("807e287f4e99021b0880d49c4a4fc045");
      break;
    case '1377'://初级会计职称考试,中级级会计职称考试,高级会计职称考试
    case '1387':
    case '1397':
      lx.output.count_page_view("44798d9fa881950ba9ea7d1659614ab9");
      break;
    case '1421'://一级消防工程师,二级消防工程师
    case '1432':
      lx.output.count_page_view("08d93e1fefbd8bbab1f25d6cf9a933f0");
      break;
    case '1572'://社会工作者
      lx.output.count_page_view("1e0d516950b7c3caec3e8ed913d6bb42");
      break;
    case '1408'://造价工程师
      lx.output.count_page_view("381e694a42c77e28ac1acbefda76dfac");
      break;
    case '1442'://监理工程师
      lx.output.count_page_view("e0c937109ae9f2d307cd0edf11bd945b");
      break;
    case '1466'://电气工程师
      lx.output.count_page_view("7f25398295de2b52cde522d02b3973f5");
      break;
    case '1583'://计算机等级考试
      lx.output.count_page_view("4822e03c3279c7b4b9827f68f97d4999");
      break;
    case '1528'://期货从业资格考试
      lx.output.count_page_view("d00d7dabda3cd39ba9e8079c3424151f");
      break;
    case '1605'://公共营养师
      lx.output.count_page_view("0a4ae92fea23e61766b8847b78f710c4");
      break;
    case '1324'://审计师 统计师 经济师 税务师考试 精算师 房地产评估师 结构工程师 岩石工程师 注册化工工程师 注册测绘师 导游资格证 出版专业资格考试 电子商务师人力资源管理师 护士执业资格考试 卫生资格考试 秘书资格考试 理财规划师
    case '1334':
    case '1344':
    case '1355':
    case '1368':
    case '1454':
    case '1477':
    case '1487':
    case '1497':
    case '1507':
    case '1517':
    case '1539':
    case '1551':
    case '1561':
    case '1594':
    case '1614':
    case '1624':
    case '1304':
    case '1315':
      lx.output.count_page_view("7cf046b3fc2639f622222234e1ebdb45");
      break;
    case '714'://移民
      lx.output.count_page_view("3b1c1b13244432b0c9d082a04f1f5170");
      break;
    case '38'://签证
      lx.output.count_page_view("812ad949507537a34cbcad50ea38d4e8");
      break;
    case '1669'://1669
      lx.output.count_page_view("fb1fe16e2b86865994e501a47debe8ef");
      break;
    case '14'://图库
      lx.output.count_page_view("c9f37d95c87d58ba71046ae8890f665d");
      break;
    case '1664'://政策
      lx.output.count_page_view("a2acf2b30fb10d9e587293d28bc0ded6");
      break;
    case '1126'://实用资料
      lx.output.count_page_view("74adef135cd04bca6a7efd461d83d5f8");
      break;
    case '1127'://黑板报
      lx.output.count_page_view("f3e04a79baa5d7b132e1a6f633de0001");
      break;
    case '1668'://生活百科
      lx.output.count_page_view("049c02f50253559fce273c436cb7ed68");
      break;
    case '964'://旅游
      lx.output.count_page_view("bb41b3a83ab775399881775da4190c55");
      break;
    case '773'://作文
      lx.output.count_page_view("62bbfa411645ec7a85e5d9fb3ef86897");
      break;
    case '1272'://论文
      lx.output.count_page_view("94145c8b220fc96d54c59fa545e7a9a2");
      break;
    case '360'://火车票
      lx.output.count_page_view("dd2890830ec27b182d399743bef211ee");
      break;
    case '357'://祝福语
      lx.output.count_page_view("0cfc3d5e3b2f2cda38cc623bc623abbb");
      break;
    case '561'://节假日
      lx.output.count_page_view("59bcffa5186444a12b2054700c289f46");
      break;
    case '368'://招聘
      lx.output.count_page_view("d3a191ca0bc4eb9f4de5ca569dbd4be1");
      break;
    case '382'://简历
      lx.output.count_page_view("c4ae7b9d4f43d9b082e369b26056dc21");
      break;
    case '399'://入党申请书
      lx.output.count_page_view("3ba6e47e84d6903cf64ba5369bcd5f1a");
      break;
    case '1000'://入团申请书
      lx.output.count_page_view("1c55324214ccd58994ce7227ccf559bf");
      break;
    case '443'://演讲稿
      lx.output.count_page_view("32460ccf9284a4b89f26ed30877df4bd");
      break;
    case '986'://主持词
      lx.output.count_page_view("292359eda2799f375f5a5e8a837d7a2a");
      break;
    case '433'://实习报告
      lx.output.count_page_view("3ac1491301e987bf59ce7a1c6906c584");
      break;
    case '464'://述职报告
      lx.output.count_page_view("2db1d5801ba849a731a38f9297b411ff");
      break;
    case '638'://工作总结
      lx.output.count_page_view("0b4c677db19b04d156198b08f1e9e08e");
      break;
    case '701'://合同范本
      lx.output.count_page_view("8abbee9a61f24b9f7407eb5af5275643");
      break;
    case '747'://工作计划
      lx.output.count_page_view("82cab54bba45dbf2b969d1bb9eb31c2c");
      break;
    case '968'://活动总结
      lx.output.count_page_view("dac01335e659d118d305440d3485c69b");
      break;
    case '1008'://辞职报告
      lx.output.count_page_view("13472d43440c96a434ffe2d69f207839");
      break;
    case '1018'://策划书
      lx.output.count_page_view("b2efab9890e141bc3802330dcfbe9d96");
      break;
    case '1029'://自我鉴定
      lx.output.count_page_view("298f08b6d58a3c5ebf23f889eec2ffdf");
      break;
    case '1038'://口号
      lx.output.count_page_view("d101fb812bcffb2c9f876e6937d0f435");
      break;
    case '1049'://文秘
      lx.output.count_page_view("730abb58b273a9783365f9ca8bc75154");
      break;
    case '1056'://导游词
      lx.output.count_page_view("6a15ba26363b1bb4dcfb93c3ed955e45");
      break;
    case '1063'://心得体会
      lx.output.count_page_view("2f3821c50bacf052879ce77963efbbb3");
      break;
    case '1072'://礼仪
      lx.output.count_page_view("44d80b4a760017233412b8421daac0ee");
      break;
    case '1081'://检讨书
      lx.output.count_page_view("fd0748dd3bdf97b3e1ad04c46d3499a1");
      break;
    case '1089'://邀请函
      lx.output.count_page_view("64a814b75055e7b78c4f78362ef84207");
      break;
    case '1099'://读后感
      lx.output.count_page_view("1cda473c88544a4779acf93e06761dd8");
      break;
    case '1107'://介绍信
      lx.output.count_page_view("a29b97ae54191fd666ef3b4ac22704f1");
      break;
    case '1116'://手抄报
      lx.output.count_page_view("28d918b10dd72e2a8a53e315c053f1a1");
      break;
    case '1646'://国学
      lx.output.count_page_view("7cc0136a11138b786cbac31d9d64ffdd");
      break;
    case '1649'://法律
      lx.output.count_page_view("8d659dc62ef89fd3a66225a0c996ce62");
      break;
    case '1654'://教案
      lx.output.count_page_view("882332065ef7ccbc84d3ba55c5650a7a");
      break;
    case '201'://留学费用
      lx.output.count_page_view("488b932988c126aff160b3c2f2ef50e9");
      break;
    case '202'://申请条件
      lx.output.count_page_view("99abc5486f3a22eb235294ad500d201e");
      break;
    case '269'://院校专业
      lx.output.count_page_view("73862812adee87073f8aa06364d966c5");
      break;
    case '170'://大学排名
      lx.output.count_page_view("f9fafd74eec002aaf496747c8f445e66");
      break;
    case '168'://奖学金
      lx.output.count_page_view("193256195208af577bde2978d6082f93");
      break;
    case '35'://留学新闻
      lx.output.count_page_view("8f14ec0659b010978562961344c86868");
      break;
    case '1676'://热点
      lx.output.count_page_view("ca1c8a856d5f662af27fd3a44e3383ee");
      break;
  }
  if (isLx) {//留学国家
    switch (window.str_typeid) {
      case '11':
        lx.output.count_page_view("08cecb6ab4fda9448f52cf6cf43df225");
        break;
      case '13':
        lx.output.count_page_view("f65245f4e4ea76128a49f97c86d714e8");
        break;
      case '20':
        lx.output.count_page_view("4e37ea73e7dc254548ff4e1ff3198626");
        break;
      case '12':
        lx.output.count_page_view("bc76495c42bb7697c0a39fedd36731fd");
        break;
      case '15':
        lx.output.count_page_view("9663479fef4a904c3c2d4789ec44ba3b");
        break;
      case '14':
        lx.output.count_page_view("08a5beff0369cc89163df2d11a5bacf1");
        break;
      case '22':
        lx.output.count_page_view("61bec24e0c39d5b190df9c92cd7b20c5");
        break;
      case '21':
        lx.output.count_page_view("6760b84ca2e9b9c230521a0c8c3a89aa");
        break;
      case '32':
        lx.output.count_page_view("c7b582ac7e8a3d60198160066ef426f9");
        break;
      case '29':
        lx.output.count_page_view("a3f898ef8bc1ab37ad17940266db4e87");
        break;
      case '36':
        lx.output.count_page_view("3305691d0f3567930c1eb94395e18c8b");
        break;
      case '26':
        lx.output.count_page_view("360d05e275567c15874d62e152a34c24");
        break;
      case '49':
        lx.output.count_page_view("ccd5009a04da2281d9bf8d9d9e586020");
        break;
      case '36':
        lx.output.count_page_view("2e7e5f102eba5c9306e71b9118c3a714");
        break;
      case '34':
        lx.output.count_page_view("27580049afc00f1626f6db663b697c2a");
        break;
      case '42':
        lx.output.count_page_view("cce7f38b97b7e4d5533347c4a42fbbf7");
        break;
      case '30':
        lx.output.count_page_view("922e3aa5873ef4431ba9f6e78b7c6be9");
        break;
      case '33':
        lx.output.count_page_view("343f2eeb2cd96b462c8edba29a117694");
        break;
      case '41':
        lx.output.count_page_view("cf88bc385e3699a0c661d74d0a026e28");
        break;
      case '23':
        lx.output.count_page_view("638959d3fe081aa4e0b2c581cf4c7bb7");
        break;
    }
  }
  switch (str_template) {
    case 'jigou_list'://机构
    case 'jigou_detail':
      lx.output.count_page_view("74cc8c54e104c7c9a40215dd4fb4bc59");
      break;
    case 'gonglue_index'://攻略
      lx.output.count_page_view("85054fd839bca0baeb48b8325b8394c3");
      break;
  }
  //wap 内容页统计
  if (str_contentid != '') {
    lx.output.count_page_view('f69e190319f8b358da2123411f17c220');
  }
  if ((str_template.indexOf("school") > -1 && href.indexOf("school") > -1) || href.indexOf("m.liuxue86.com/school") > -1) {
    lx.output.count_page_view("cc001929dca164723f6b80d443b32d69");
  }
  if (href == 'm.liuxue86.com/') {
    lx.output.count_page_view("4a6876688457355bae7de0d214aa2b50");
  } else if (href == 'm.k.liuxue86.com/') {
    lx.output.count_page_view("fb1fe16e2b86865994e501a47debe8ef");
  } else if (href == 'm.bbs.liuxue86.com/') {
    lx.output.count_page_view("4605bcaf9f3f03ebe64f1225e3c9af52");
  } else if (href.indexOf("m.college.liuxue86.com") > -1) {
    lx.output.count_page_view("786122fb2dc97d1b44363892ab14e31a");
    lx.output.count_page_view("911ce91317fe303d10bcab7d2ea6c249");
  } else if (href.indexOf("m.liuxue86.com/k_") > -1) {
    lx.output.count_page_view("b9c3b53973ad55106fbfd0ed2b96c309");
  } else if (href.indexOf("m.liuxue86.com/topic") > -1) {
    lx.output.count_page_view("fd11e32e6e6890987042e0aa5925d4bc");
  }
  (function () {
    var str_wz1_id = ["714", "38", "237", "251", "265", "341", "266"],
      str_wz2_id = ["1669", "1664", "1126", "1127", "1668", "964", "773", "1272", "360", "357", "561", "368", "382", "399", "1000", "443", "986", "433", "464", "638", "701", "747", "968", "1008", "1018", "1029", "1038", "1049", "1056", "1063", "1072", "1081", "1089", "1107", "1116", "1646", "1649", "1654"],
      str_wz3_id = ["39", "483", "502", "503", "578", "935", "1662", "1130", "1144", "1156", "1171", "1185", "1200", "1223", "1234", "1245", "341", "1284", "1377", "1387", "1398", "1421", "1432", "1572", "1408", "1442", "1466", "1583", "1528", "1605", "1324", "1334", "1344", "1355", "1368", "1454", "1477", "1487", "1497", "1507", "1517", "1539", "1551", "1561", "1594", "1614", "1624", "1304", "1315"];
    var str_liuxue_id = ["35", "201", "269", "170", "202", "425", "1260", "168", "37", "307"];
    if (str_wz1_id.indexOf(window.str_showmenu) > -1 || window.str_typename != '') {
      lx.output.count_page_view("cee8be80d65d5a14a003e8aea70dba24");
    }
    if (str_wz2_id.indexOf(window.str_showmenu) > -1) {
      lx.output.count_page_view("4605bcaf9f3f03ebe64f1225e3c9af52");
    } else if (str_wz3_id.indexOf(window.str_showmenu) > -1) {
      lx.output.count_page_view("786122fb2dc97d1b44363892ab14e31a");
    } else if (str_liuxue_id.indexOf(window.str_showmenu) > -1) {//留学新闻 留学费用 院校专业 大学排名 留学申请条件 留学文书 留学中介 奖学金 生活 学校
      lx.output.count_page_view("cee8be80d65d5a14a003e8aea70dba24");
      lx.output.count_page_view("d6ea711bd42ddc214b4a95d5a7e5be33");
    }

  })();


  //统计结束  
});

$(function () {
  lx.output.show_foot();
  if (str_contentid !== "") {
    lx.output.load_js('//dup.baidustatic.com/js/dm.js');
    lx.output.load_js('https://extra.liuxue86.com/count.php?contentid=' + str_contentid);//文章阅读统计
  }
  lx.output.load_js('https://zz.bdstatic.com/linksubmit/push.js');//全站加载自动推送
  // lx.output.share_bottom();
  // lx.output.show_foot();

  (function () {
    //将refer写入cookie内
    var referer = document.referrer;
    if (referer.indexOf('liuxue86.com') == -1) {
      document.cookie = "referer=" + referer;
    }

    //插入chat-icon3
    // var isKs = ['237','251','265','341'].indexOf(str_catid) > -1;
    setTimeout(function () {
      var arr_icon = ['270','271','170','324','323','320','35','168','317','308','307','325','321','322','218','223','235','226','272','327','328','326','309','313','314','311','312','310','201','202','269','425','1671','429','430','431','432','1260','1674','1672','1673','236','225','337','338','200','315','316','1670','426','427','428','442','1675','38','39','37','201'],
          isIcon = arr_icon.indexOf(str_showmenu) > -1 || arr_icon.indexOf(str_catid) > -1;
      if ((isIcon || href == 'm.liuxue86.com/') && !lx.output.isAdClearArea) {
        
        lx.output.insert_chat_icon3('lx');
      }
    }, 1500)

  })();

  lx.output.load_js('https://123.ideng.com/js?c=lx');//淘宝广告js
  lx.output.load_js('https://123.ideng.com/assets/jd.js');//京东广告js
  // if (false) {
  //     cir_recommend_config = {
  //         _popIn_read_selector: '.article-content',
  //         _recommend_article: [
  //             {
  //                 tid: 10127,
  //                 selector: '#bd-recommend'
  //             }
  //         ]
  //     };
  //     lx.output.load_js('https://cir-smart.baidu.com/static/cir.min.js','body');
  // }
});


/***/ })

/******/ });