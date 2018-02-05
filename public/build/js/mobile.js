webpackJsonp([0],{

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("soshm", [], factory);
	else if(typeof exports === 'object')
		exports["soshm"] = factory();
	else
		root["soshm"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var delegate = __webpack_require__(5);
	var extend = __webpack_require__(19);
	var base64 = __webpack_require__(20);
	var sitesObj = __webpack_require__(21);
	var device = __webpack_require__(1);

	var doc = document;
	var body = doc.body;

	var supportNativeShare = false;
	if ((device.isIOS && device.ucBrowserVersion >= 10.2)
	    || (device.isAndroid && device.ucBrowserVersion >= 9.7)
	    || device.qqBrowserVersion >= 5.4) {
	  supportNativeShare = true;
	}

	// 支持浏览器原生分享的APP
	var nativeShareApps = {
	  weibo: ['kSinaWeibo', 'SinaWeibo', 11],
	  weixin: ['kWeixin', 'WechatFriends', 1],
	  weixintimeline: ['kWeixinFriend', 'WechatTimeline', 8],
	  qq: ['kQQ', 'QQ', 4],
	  qzone: ['kQZone', 'Qzone', 3]
	};

	var templateStr =
	'<div class="soshm-item {{site}}" data-site="{{site}}">' +
	  '<span class="soshm-item-icon">' +
	    '<img src="{{icon}}" alt="{{site}}">' +
	  '</span>' +
	  '<span class="soshm-item-text">{{name}}</span>' +
	'</div>';

	var metaDesc = doc.getElementsByName('description')[0];
	var firstImg = doc.getElementsByTagName('img')[0];
	var defaults = {
	  title: doc.title,
	  url: location.href,
	  digest: metaDesc && metaDesc.content || '',
	  pic: firstImg && firstImg.src || '',
	  from: location.host,
	  sites: ['weixin', 'weixintimeline', 'yixin', 'weibo', 'qq', 'qzone']
	};

	function soshm(selector, options) {
	  var elems = doc.querySelectorAll(selector);
	  for(var i=0, length = elems.length; i < length; i++) {
	    var elem = elems[i];
	    var status = elem.getAttribute('sosh-status');
	    if (status !== 'initialized') {
	      var dataset = extend(elem.dataset);
	      if (dataset.sites) dataset.sites = dataset.sites.split(',');

	      options = extend({}, defaults, dataset, options);

	      var sitesHtml = getSitesHtml(options.sites);
	      elem.insertAdjacentHTML('beforeend', sitesHtml);
	      elem.setAttribute('sosh-status', 'initialized');
	      elem.classList.add('soshm');

	      (function(options) {
	        delegate(elem, '.soshm-item', 'click', function(e) {
	          var site = e.delegateTarget.dataset.site;
	          shareTo(site, options);
	        });
	      })(options);
	    }
	  }
	  // 普通浏览器没有webapi的分享是通过QQ浏览器当桥梁进行的，
	  // 需要通过URL参数判断分享到哪个地方
	  var site = getQueryVariable('__soshmbridge');
	  if (site && typeof history.replaceState === 'function') {
	    var url = location.href.replace(new RegExp('[&?]__soshmbridge='+site, 'gi'), '');
	    history.replaceState(null, doc.title, url);
	    shareTo(site, extend(defaults, opts));
	  }
	}

	soshm.popIn = function(options) {
	  var popDelegation;
	  var pop = doc.querySelector('.soshm-pop');
	  if (!pop) {
	    pop = doc.createElement('div');
	    pop.className = 'soshm-pop';
	    body.appendChild(pop);
	  }

	  options = extend({}, defaults, options);
	  pop.innerHTML =
	    '<div class="soshm-pop-sites">' +
	      getSitesHtml(options.sites, 5) +
	    '</div>';

	  var popDelegation = delegate(pop, '.soshm-item', 'click', function(e) {
	    var site = e.delegateTarget.dataset.site;
	    shareTo(site, options);
	  });
	  pop.classList.remove('soshm-pop-hide');
	  pop.style.display = 'block';
	  setTimeout(function() {
	    pop.classList.add('soshm-pop-show');
	  }.bind(this), 0);

	  pop.addEventListener('click', function() {
	    pop.classList.remove('soshm-pop-show');
	    pop.classList.add('soshm-pop-hide');
	    setTimeout(function() {
	      pop.style.display = 'none';
	      popDelegation.destroy();
	    }, 1100);
	  }, false);
	};

	soshm.weixinSharetip = function(duration) {
	  if (getType(duration) !== 'number') duration = 2000;
	  if (device.isWeixin) {
	    var elem = doc.querySelector('.soshm-weixin-sharetip');
	    if (!elem) {
	      var  elem = doc.createElement('div');
	      elem.className = 'soshm-weixin-sharetip';
	      body.appendChild(elem);
	    }
	    elem.classList.add('weixin-sharetip-show');
	    setTimeout(function() {
	      elem.classList.remove('weixin-sharetip-show');
	    }, duration);
	  }
	};

	function shareTo(site, data) {
	  var app;
	  var shareInfo;
	  var api = sitesObj[site].api;

	  // 在UC和QQ浏览器里，对支持的应用调用原生分享
	  if (supportNativeShare) {
	    if (device.isUCBrowser) {
	      if (nativeShareApps[site]) {
	        app = device.isIOS ? nativeShareApps[site][0] : nativeShareApps[site][1];
	      }

	      if (app !== undefined) {
	        shareInfo = [data.title, data.digest, data.url, app, '', '@'+data.from, ''];

	        // android
	        if (window.ucweb) {
	          ucweb.startRequest && ucweb.startRequest('shell.page_share', shareInfo);
	        }

	        // ios
	        if (window.ucbrowser) {
	          ucbrowser.web_share && ucbrowser.web_share.apply(null, shareInfo);
	        }
	        return;
	      }
	    }

	    if (device.isQQBrowser) {
	      if (nativeShareApps[site]) app = nativeShareApps[site][2];
	      if (app !== undefined) {
	        if (window.browser) {
	          shareInfo = {
	            url: data.url,
	            title: data.title,
	            description: data.digest,
	            img_url: data.pic,
	            img_title: data.title,
	            to_app: app,
	            cus_txt: ''
	          };

	          browser.app && browser.app.share(shareInfo);
	        } else {
	          loadScript('//jsapi.qq.com/get?api=app.share', function() {
	            shareTo(site, data);
	          });
	        }
	        return;
	      }
	    }
	  }

	  // 在普通浏览器里，使用URL Scheme唤起QQ客户端进行分享
	  if (site === 'qzone' || site === 'qq') {
	    var scheme = appendToQuerysting(sitesObj[site].scheme, {
	      share_id: '1101685683',
	      url: base64.encode(data.url),
	      title: base64.encode(data.title),
	      description: base64.encode(data.digest),
	      previewimageUrl: base64.encode(data.pic), //For IOS
	      image_url: base64.encode(data.pic) //For Android
	    });
	    openAppByScheme(scheme);
	    return;
	  }

	  // 在普通浏览器里点击微信分享，通过QQ浏览器当桥梁唤起微信客户端
	  // 如果没有安装QQ浏览器则点击无反应
	  if (site.indexOf('weixin') !== -1) {
	    var mttbrowserURL = appendToQuerysting(location.href, {__soshmbridge: site});
	    openAppByScheme('mttbrowser://url=' + mttbrowserURL);
	  }

	  // 在微信里点微信分享，弹出右上角提示
	  if (device.isWeixin && (site.indexOf('weixin') !== -1)) {
	    soshm.weixinSharetip();
	    return;
	  }

	  // 对于没有原生分享的网站，使用webapi进行分享
	  if (api) {
	    for (k in data) {
	      api = api.replace(new RegExp('{{' + k + '}}', 'g'), encodeURIComponent(data[k]));
	    }
	    window.open(api, '_blank');
	  }
	}

	/**
	 * 获取分享站点的html字符串
	 * @param  {Array} sites      [需要展示的站点数组]
	 * @param  {Number} groupsize [分组的大小，不传表示不分组]
	 * @return {String}           [html字符串]
	 */
	function getSitesHtml(sites, groupsize) {
	  var html = '';
	  var groupsize = getType(groupsize) === 'number' && groupsize !== 0 ? groupsize : 0;
	  for (var i = 0, length = sites.length; i < length; i++) {
	    if (groupsize && i % groupsize === 0) {
	      html += '<div class="soshm-group group' + ((i / groupsize) + 1) + '">';
	    }

	    var key = sites[i];
	    var siteObj = sitesObj[key];
	    if (siteObj) {
	      html += templateStr.
	        replace(/\{\{site\}\}/g, key)
	        .replace(/\{\{icon\}\}/g, siteObj.icon)
	        .replace(/\{\{name\}\}/g, siteObj.name);
	    } else {
	      console.warn('site [' + key + '] not exist.');
	    }

	    if (groupsize && (i % groupsize === groupsize - 1 || i === length - 1)) {
	      html += '</div>';
	    }
	  }
	  return html;
	}

	/**
	 * 获取传入参数类型
	 * @param  {String,Number,Array,Boolaen,Function,Object,Null,Undefined} obj
	 * @return {String}     []
	 */
	function getType(obj) {
	  if (obj === null) return 'null';
	  if (typeof obj === undefined) return 'undefined';

	  return Object.prototype.toString.call(obj)
	          .match(/\s([a-zA-Z]+)/)[1]
	          .toLowerCase();
	}

	/**
	 * 追加对象字面量对象到URL的querystring里
	 * @param  {String} url [URL字符串]
	 * @param  {Object} obj [对象字面量]
	 * @return {String}     [追加querystring后的URL字符串]
	 */
	function appendToQuerysting(url, obj) {
	  var arr = [];
	  for(var k in obj) {
	    arr.push(k + '=' + obj[k]);
	  }
	  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr.join('&');
	}

	/**
	 * 获取querystring中特定变量的值
	 * @param  {String} variable [变量名]
	 * @return {String}          [变量值]
	 */
	function getQueryVariable(variable) {
	  var query = location.search.substring(1);
	  var vars = query.split('&');
	  var length = vars.length;
	  for (var i = 0; i < length; i++) {
	    var pair = vars[i].split('=');
	    if (decodeURIComponent(pair[0]) === variable) {
	      return decodeURIComponent(pair[1]);
	    }
	  }
	}

	/**
	 * 动态加载外部脚本
	 * @param  {String}   url [脚本地址]
	 * @param  {Function} done  [脚本完毕回调函数]
	 */
	function loadScript(url, done) {
	  var script = doc.createElement('script');
	  script.src = url;
	  script.onload = onreadystatechange = function() {
	    if (!this.readyState ||
	        this.readyState === 'load' ||
	        this.readyState === 'complete') {
	      done && done();
	      script.onload = onreadystatechange
	      script.parentNode.removeChild(script);
	    }
	  };
	  body.appendChild(script);
	}

	/**
	 * 通过scheme唤起APP
	 * @param  {String} scheme [app打开协议]
	 */
	function openAppByScheme(scheme) {
	  if (device.isIOS) {
	    window.location.href = scheme;
	  } else {
	    var iframe = doc.createElement('iframe');
	    iframe.style.display = 'none';
	    iframe.src = scheme;
	    body.appendChild(iframe);
	    setTimeout(function() {
	      iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe);
	    }, 2000);
	  }
	}

	module.exports = soshm;


/***/ },
/* 1 */
/***/ function(module, exports) {

	var ua = navigator.userAgent.toLowerCase();

	/**
	 * 设备检测函数
	 * @param  {String} needle [特定UA标识]
	 * @return {Boolean}
	 */
	function deviceDetect(needle) {
	  needle = needle.toLowerCase();
	  return ua.indexOf(needle) !== -1;
	}

	/**
	 * 获取浏览器版本
	 * @param  {String} nece [UA中带有版本信息的部分字符串]
	 * @return {Number}      [版本号]
	 */
	function getVersion(nece) {
	  var arr = nece.split('.');
	  return parseFloat(arr[0] + '.' + arr[1]);
	}

	var device = {
	  isIOS: deviceDetect('iPhone') || deviceDetect('iPad') || deviceDetect('iPod'),
	  isAndroid: deviceDetect('Android'),
	  isUCBrowser: deviceDetect('UCBrowser'),
	  isQQBrowser: deviceDetect('MQQBrowser'),
	  isWeixin: deviceDetect('MicroMessenger')
	};

	device.qqBrowserVersion = device.isQQBrowser ? getVersion(ua.split('mqqbrowser/')[1]) : 0;
	device.ucBrowserVersion = device.isUCBrowser ? getVersion(ua.split('ucbrowser/')[1]) : 0;

	module.exports = device;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".soshm{text-align:center;-webkit-tap-highlight-color:transparent}.soshm:after,.soshm:before{content:\" \";display:table}.soshm:after{clear:both}.soshm-item-icon{box-sizing:content-box;display:inline-block;width:26px;height:26px;padding:5px;margin:0;vertical-align:middle;border-radius:50%;}.soshm-item-icon img{vertical-align:top;padding:0;margin:0;width:100%;height:100%}.soshm-item-text{display:block;font-size:14px;color:#666;text-align:center;}.soshm-item.weixin .soshm-item-icon{background:#14C249}.soshm-item.weixin:hover .soshm-item-icon{background:#398a28}.soshm-item.yixin .soshm-item-icon{background:#23cfaf}.soshm-item.yixin:hover .soshm-item-icon{background:#1ca38a}.soshm-item.weibo .soshm-item-icon{background:#FFB932}.soshm-item.weibo:hover .soshm-item-icon{background:#ec1f2d}.soshm-item.qzone .soshm-item-icon{background:#2F76BB}.soshm-item.qzone:hover .soshm-item-icon{background:#fcad0b}.soshm-item.renren .soshm-item-icon{background:#1f7fc9}.soshm-item.renren:hover .soshm-item-icon{background:#18639d}.soshm-item.tieba .soshm-item-icon{background:#5b95f0}.soshm-item.tieba:hover .soshm-item-icon{background:#2c77ec}.soshm-item.douban .soshm-item-icon{background:#228a31}.soshm-item.douban:hover .soshm-item-icon{background:#186122}.soshm-item.tqq .soshm-item-icon{background:#97cbe1}.soshm-item.tqq:hover .soshm-item-icon{background:#6fb7d6}.soshm-item.qq .soshm-item-icon{background:#1AB0FF}.soshm-item.qq:hover .soshm-item-icon{background:#2066ce}.soshm-item.weixintimeline .soshm-item-icon{background:#47C30D}.soshm-item.weixintimeline:hover .soshm-item-icon{background:#15891d}.soshm-group{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:15px;}.soshm-group .soshm-item{display:block;float:none;margin:0}.soshm-pop{display:none;position:fixed;top:0;left:0;right:0;bottom:0;height:100%;width:100%;opacity:0;z-index:9999;background:rgba(0,0,0,.65);-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-timing-function:ease-in;transition-timing-function:ease-in}.soshm-pop-show{opacity:1;-webkit-transition-duration:.6s;transition-duration:.6s}.soshm-pop-show .group1{-webkit-animation:soshtrans 1.2s 1 ease;animation:soshtrans 1.2s 1 ease}.copy .soshm-item-icon{border-radius: 500px;background-color:#f2f2f2 ;}.soshm-pop-show .group2{-webkit-animation:soshtrans 1.7s 1 ease;animation:soshtrans 1.7s 1 ease}.soshm-pop-show .group3{-webkit-animation:soshtrans 2.2s 1 ease;animation:soshtrans 2.2s 1 ease}.soshm-pop-show .group4{-webkit-animation:soshtrans 2.7s 1 ease;animation:soshtrans 2.7s 1 ease}.soshm-pop-hide{opacity:0;-webkit-transition-duration:1s;transition-duration:1s}.soshm-pop-hide .group1{-webkit-animation:soshtrans2 .5s 1 cubic-bezier(.68,-.55,.265,1.55) 0ms forwards;animation:soshtrans2 .5s 1 cubic-bezier(.68,-.55,.265,1.55) 0ms forwards}.soshm-pop-hide .group2{-webkit-animation:soshtrans2 .5s 1 cubic-bezier(.68,-.55,.265,1.55) .2s forwards;animation:soshtrans2 .5s 1 cubic-bezier(.68,-.55,.265,1.55) .2s forwards}.soshm-pop-hide .group3{-webkit-animation:soshtrans2 .5s 1 cubic-bezier(.68,-.55,.265,1.55) .4s forwards;animation:soshtrans2 .5s 1 cubic-bezier(.68,-.55,.265,1.55) .4s forwards}.soshm-pop-hide .group4{-webkit-animation:soshtrans2 .5s 1 cubic-bezier(.68,-.55,.265,1.55) .6s forwards;animation:soshtrans2 .5s 1 cubic-bezier(.68,-.55,.265,1.55) .6s forwards}.soshm-pop-sites{position:absolute;bottom:0;left:0;width:100%;background: rgba(265,265,265,.85);}.soshm-pop .soshm-item-icon{width:42px;height:42px;}.soshm-weixin-sharetip{position:fixed;overflow:hidden;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.6) url(" + __webpack_require__(16) + ") no-repeat right 0;background-size:50% auto;z-index:-1;opacity:0;visibility:hidden;-webkit-transition:all .6s ease-out;transition:all .6s ease-out}.soshm-weixin-sharetip.weixin-sharetip-show{z-index:9999;opacity:1;visibility:visible}@-webkit-keyframes soshtrans{0%{-webkit-transform:translate3d(0,1136px,0);transform:translate3d(0,1136px,0)}50%{-webkit-transform:translateZ(0);transform:translateZ(0)}60%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes soshtrans{0%{-webkit-transform:translate3d(0,1136px,0);transform:translate3d(0,1136px,0)}50%{-webkit-transform:translateZ(0);transform:translateZ(0)}60%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@-webkit-keyframes soshtrans2{0%{opacity:1;-webkit-transform:translateZ(0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(0,500%,0);transform:translate3d(0,500%,0)}}@keyframes soshtrans2{0%{opacity:1;-webkit-transform:translateZ(0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(0,500%,0);transform:translate3d(0,500%,0)}}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	var DOCUMENT_NODE_TYPE = 9;

	/**
	 * A polyfill for Element.matches()
	 */
	if (Element && !Element.prototype.matches) {
	    var proto = Element.prototype;

	    proto.matches = proto.matchesSelector ||
	                    proto.mozMatchesSelector ||
	                    proto.msMatchesSelector ||
	                    proto.oMatchesSelector ||
	                    proto.webkitMatchesSelector;
	}

	/**
	 * Finds the closest parent that matches a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @return {Function}
	 */
	function closest (element, selector) {
	    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
	        if (element.matches(selector)) return element;
	        element = element.parentNode;
	    }
	}

	module.exports = closest;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var closest = __webpack_require__(4);

	/**
	 * Delegates event to a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @param {Boolean} useCapture
	 * @return {Object}
	 */
	function delegate(element, selector, type, callback, useCapture) {
	    var listenerFn = listener.apply(this, arguments);

	    element.addEventListener(type, listenerFn, useCapture);

	    return {
	        destroy: function() {
	            element.removeEventListener(type, listenerFn, useCapture);
	        }
	    }
	}

	/**
	 * Finds closest match and invokes callback.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Function}
	 */
	function listener(element, selector, type, callback) {
	    return function(e) {
	        e.delegateTarget = closest(e.target, selector);

	        if (e.delegateTarget) {
	            callback.call(element, e);
	        }
	    }
	}

	module.exports = delegate;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?minimize!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	// module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAANlBMVEVHcEz///////////////////////////////////////////////////////////////////+GUsxbAAAAEXRSTlMAIPDgv0BegH/AoDCPzxBvsNFNiOYAAAC3SURBVHhe7dbNCoQwDATgabttV+tf3v9lF+rJRJr2sojkO0oYBg1BPIhx3zEJTKQxE04WIJnBLZSoz/T6AD81KAH6kv4twAIswH8a1AC7B7lPwvulzwJp80tBh7J4IooQdiIKu4PmPLwrhND5X1CoSmASVRGqXAcDmKOzALCFuwqOFWiJdxVm/lB/j0kpoFZYZYEDDXK8iAIOTXx+5om5ub0Xnh1HqtbLTGEff1h8W0DMwxwew/wAniVLWfHYFrQAAAAASUVORK5CYII="

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAQO+AIL8Qz58wj99wYFCv3KpsWwAAASFJREFUWMPt1t1uwyAMBWAw/wHS8/5Pu0XqZGVrMDgXk6p+9xwZsEnMx7vbt4BDyj0qlvcKRttqhK04o7a0vuGvx0IRGa+k6QSH18Ls/nFlm1ofKy7ZhQ3oN0HArRJ2jGTdFTKSAyqGvBgApjoEjzEndtG/B0hn0KX15e4hZozFyUZWD6SHxIuTcK8EB0kaBwSIpAJuHYInyLLYBPoSIpjqHhqmkPIKWNENImtiGyvfBItJYRhAqgC+xb5hJNOolQKoC/PoCw3eRd+OJqNx8aWiqCaaX8RiBAlXHkbE/aD/SXIVV4KVl8ekmkSWZttY2860GhAIZ4tfpvY7MkkBncBoP/qmrv2m+fwTkVp8hiY8hWJmFOuctafLte7b7s3He/oCqUhdkHLQXTAAAAAASUVORK5CYII="

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAP1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////9KjZoYAAAAFHRSTlMAYECgEPAwwH8/4NAgUJCwcM+fr0RbN4IAAAGVSURBVHhe7ZbdkoMgDIUVE2ARf7o97/+s22k7pZmAUJnZq36XmBwPJgGHf+CLQ+zKN8DUJbABXRYi0GdhArosRNy5dhoAzMl8whN3UsADXRaI0WfBA30WGOiyMOKd8XOBIATCGQNdFoghCXSiBAJ/YgoEXJgp+5PjCs1Vh9H9yOjA3gRoVcuzK5KtjHVqu27db/Y0vyLKvtZ35AjOjz+itE74tEPCMBJa5hFKF5EvHdoAiX5XFPkTDRKaUWK7x1oW+YOCJuRZB5lfHoysAo9tsy2idKlGtZZnST7Fpxa9Fgr5aafqU/0qzTI0q62SyHc0HJOajU2mfeCHVoE55vKx1QSC7DTLkFxqAtJp1DPSdJ/yksZs34I6Qw4waXgStHjHjZecKVbKjuvcUIYdYF/GVf+YPGq42k9NDa71URX6SIB3MaH1MkAykb44xnaB8HyZnZvHySLBb5E7N5bBvMVF0Yxb2zgtL/eL0g540tJHng4e2qqAK4TER5GXShvwQZ2WUCmDA9bDTqP1eJz8ZoYKVoX08uUPi2Bapj4cFIsAAAAASUVORK5CYII="

/***/ },
/* 11 */
/***/ function(module, exports) {

	// module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAANlBMVEVHcEz///////////////////////////////////////////////////////////////////+GUsxbAAAAEXRSTlMAMNCgYIDAEPBAULAgkHDf4FyRdXUAAAG8SURBVHhezZbdcoQgDEbDn4ki6vf+L9tOZ2dSuoSsXvXcaeAYCHGgfwvn1PRpSXmnO+QKAPoMAPHgj6efwLsAkPRRGtsJjAUAkpvFXoGJAJKd7AUDAUPBwmTCCRgJVvwmBjP9iE8EkI2GBMFcoKzOfFcgg1VwhCNwDAvuCBCZeg7cE6BRR8BdATZnAa7gZFJW3BegkHI+EQj3A3yBnUJ9JjjpxY5HAi3E8VSQtIZzAcHACfuCVRN8JjimWxB9Qf2JFoxZrJOuxGm0+gJMo0UFxRfYx8TfZ4wRUkhmdYzmMVOSswRDrmz3BRd1yERQ7Rp4dbjsmDB1sNhnbZskoBR71G4l4KeQ6YfLjBBxoBcZ77w+0yZ9VM9JQ0SryLLr7xK7vYiDXlxmFzQgmRcAdRfrELN0+5mtfmerCQ6t1cCwjosc/5ZOeGxYxkWu/OZtpGSj2/KoicNoaNYd6IhaGH03vApsYjfLFUihBgy/FuLwprcCrZNms7e4QV8oW+gf35tD2Q/yCIKZ4cb8Z4YswFOD7t9zQ4NBYpqhZTY5A/lwERhIYfqIvGDApdN99qOiI7ZAdwm5tOWbUnKgf8wXi3+FNpeg8ZMAAAAASUVORK5CYII="

/***/ },
/* 12 */
/***/ function(module, exports) {

	// module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAOVBMVEVHcEz///////////////////////////////////////////////////////////////////////99PJZNAAAAEnRSTlMAMPCggL8QwD9/4NCQsHDPYFAr85NjAAABBklEQVR4Xu3V3Y6DIBCG4QFxoP5u5/4vdrM4+2kTaoD+eMJ7QtvUJxHHQF+sFbboabdkhGTrOSDJyoEGWI9sFeAJ+csAjzUJhD2uAY6FK4AG1M9BAxrQawr02nQOdDsg6fw54K4E1lcBeRHgNDA4NJwD97guByBxYJwBXVxXpsn/lQsgthKbSSsFFtFcHcCD/PdTBThB1lQARg4NXArgBnQj+2JgltjIKnSFQIcT546NLAE62Udg0s8Go3xDQxrgVbYsH3eDc18msz4emQH/ywTswwTiJkaTCyyCjdfG+DwoF6BZr0dGv+UCbPV65BYqASjg/UGFk+gMVQLoM0CIGUIGP7yr1i+rL2X5ejXICAAAAABJRU5ErkJggg=="

/***/ },
/* 13 */
/***/ function(module, exports) {

	// module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAOVBMVEVHcEz///////////////////////////////////////////////////////////////////////99PJZNAAAAEnRSTlMAoLAwwECAEPAg0HDgYFCQv48OkrAuAAAB90lEQVR4Xu2UXZOjIBBFG+RTQJPz/3/sbqKxnZCpcczD1lblPNGl3Kb70sj/xochXG2Y5CzTBUiQgpyiUEu86TjGKL8nYB/b2k8KUXoGrAaN+butzVaAZFuWL9i0lzVotCMbFMxeIi85r3CN97BIT0gA1RnjRgCusuHx9z7ColRtf3oL1LKmzaUCl6gtvC0dQL3FznX7R0ghilIS2u3AvREA42sBC2l4avwIoyxM9xKGBEy3OD2XMEONr041r8tlMczYxdT21H/NvycnGNRGNdA+22igyAsaXL5epIwR8YTuAHUXeV277QgNE5dcXvLczYnWNFXAxEcE83aadDM5phSlt4C8+XUnPWI1QrwDavT0o6R/eVYuWoNs5BLml8MIVru5krcTdfZ0CgMETbjiNwHfm5PStI/9cQG9pDbvQi0h8CA+CfSje9EP4PTyLgQ1SF6S56SXb2T1dttvZCVR5RtiizpKtMdI5eBG27Q6jPzMsPg+9SNlYJIDjCASUzdSHqocYXDlns31D8IkR/HLBCgqeYwLT1MeDaQoB+nLHUbt6REMNFEGw4H9/aMUjQlTC9cK4KIcpywWFjZqk98wQl7fYYBkJvkVGey68n/J8lsKNDmNPqvnqVR5hwxGTqOv4nkKeHmH8K6AA/kIfAQKSd6jePl3fPgDOtEg/yPlfh8AAAAASUVORK5CYII="

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAP1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////9Du/pqAAAAFHRSTlMAQBDvgM9gIDC/n9+vj3BQ5RZ3A4O+A24AAAHkSURBVFjD7VbbdoMgEJTrchPSlv//1hZRFpKsND6152ReYpQZdocBXd5443/B5R9YCVf5LO+w7KpAw8ovKShUUOaKAGdJBlEVhFmuQvtNwfMrLjBTCnGbQnidv5bSi396U0jTlpMMdu163btPVSr7SbkuV+h2y+IdNSsBbG7graQoN6KAhU1ckBsTJ0QkUZmqCJHN29xDPuYR6hQE36j8XAC3lK46BF80KrZgorPWOlaa2DQBBWb8zCD6TozVolBgxh8Bu4AhBGDCz7HEwQPlAVenbHSU8iDkGTRuSqWJ/JzidBOb3EGtmsGWnCQxWG45A47zEUZv9G6OWA3N143+7NRNAp8SUKPRbLVlyqAfVkifOiBY/WfRDf47hXUPLgYSFe5MFpzuQNbJxkCu9zGJzwSqQ7hle6DNJ6vZS7cCWC374e1ICrDj+ibhQ9/yAoPAvAJzXMvqmhK9gDz1QA0V1CT60YO2jkAuYzwEPsrP17FsMwtwh6tD4LO5jmvbDjYizAFDFoqJIG+DZWGIBXWcCYOpxfH4Tt6qpJC6Lwftxw8iozDYsw0tH0dwPKvC6ZnERD1OxkEgRdtGkSYPnYbIeCUn2fnhYJkCXCYwpeMBGJ6wg+bLC2DR2da4tzLx5Y03/jq+AWUQSwa9ZAMlAAAAAElFTkSuQmCC"
/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAEO/PgGBAv98wn49QIHCvMlwo7gAAAYJJREFUWMPtltuOhSAMRcut3LH//7WTOBnLEbV4nEfXk8R0Q3dxR3h5OaK65Gkl+FwU3EM1Q58s5U651TQSHExSNB3jI8yQ6BTtQEQZuiLfrB9JgsBCEtddNB5bDsSYbnXlZN38LwCKT9N6b/3MAJZVbtt/fbmJ47mDO7M/9wy8lB0Ial32bSNt1IkRmIK2v0Do9MQgNMl4n+2pCSRgWoSIzdqC6guBFGvz7FIq9wR8xf0t1VbNCzSVaESXSRM1xpN36eMQ/qw+unNj1XCRRgpejQaYehIiVV9mjJRmWvnto+S8cVD/nlE4QsMujFT3XA8+rkwjWy7kbtSWxT4jZozERfEweAddu4bzZajawm54c/hsoKPuFdCSCPQo/6UAY58KxKcCeTBRIHAtx29w1ut1jJUk0r4D/hdAxAiGBMq+g7WccTc78ENqG+kAEpGuWEBAaMIoeKQQIkzhhP1lohHiTMYFGmhwi5I012pOgjvEYldQ/Z6ogoDUVINnuAQvL//KD3SaY6Vv+inqAAAAAElFTkSuQmCC"

/***/ },
/* 16 */
/***/ function(module, exports) {

	// module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAE8CAMAAAA7T85XAAAAh1BMVEVHcEz9/f3+/v7////9/f3+/v739/f////////39/f39/f39/f////39/f////7+/v39/f8/Pz39/f39/f39/f////////39/f39/f39/f39/f39/f39/f39/f39/f39/f////39/f39/f39/f////39/f39/f39/f39/f39/f39/f////39/dxTaSTAAAAK3RSTlMAIWDwEDDxgMBA9wTg55BRsXP8CrvQoJaHy97UqaAWHLB/OY9AXMMqS29oMLbyrQAACYJJREFUeF7s3VuL4zgQBeCTxjFEwsSxDb5eyN3dnP//+5ZmGCMVM50ZFpalfb7nfmnhlEpSqYQtExERERERERER2eUTIvLBfkJIcrJCQHxK8h0rwYF0TCespCHvZIOV9GxRMS3xg2AmGxzIE1aagpkVRcHUY6Up+IcbVpqCyTQjR3wSLGTbscLwM8DKyOKcsaAjawgA77jKIAAOJJmSw5gxhQCoyeb5JJtzSzoIfMbKH678IYXgRrYpP2V5xh6CkZ9cwTRvKjpNwyhTRg4akneSTNu8Y9GRWvoBvnPDxxPAmUySZShyBdd7ua6GnwB2a/4qRxtG5EIeEZKZ/EBIPHlGRFLWiEjHERHpmSMiD1aISM4WERnYIyI1O0SkZoaI1EwRkeblkGhIpCERkfN/MiT6ShRLNCTKS5TQy2iHRIaXQ6L9EmlZ4Wvae5WMIyJSsEFISltaIjvyDSE52EsFciefCMmJLPF3tBBWPi89B4TEFzwjJE/yjpAcyT1CcmZR4q+oukRbAzLbXh1yJC8ISUPnEZIHHwhJaXNXWez+kdR/3bpEZzjaipYTOSMkLVuE5GmzeTmzmBCSjhVCstg9RsmZeQRktusbubKYsRFJidcwOQ7YgmfTOjKt7h4vNNs4rbhU/Klb8KUp3cJHkowk2V5PpzEjeX4VSZ747i4Z6eodPvmP9Osx2RUb+EgWR+YzfnpmX7ZqyelmfHMXR/eGwDNlluA3jhsoY0wyupv9t1n//q87j2/uSr79+Y9j2MAu9ORYwdqTze+KGOsttNK7wMLDruvWKNOV+O4qdrCAt18OVNLR7bdaEpEUbGD5ivzYbiOwlg9YI1lv+LbElc4jNpKVxwakvP5ZfXxN9smWDzJt/0VfczMPSY2/Pu6e4oOaMt/OiOBOLrAAH005c0u2yYYaQVev+i8uKZmX2IyGXL7sv1heSTbYkCRlNsFCxwGfcOjIdMGm3Mmq/N1XMg8kqxkbM65jYmPJ1Dgy/cDm+Irsn4g5XucmJTlM2KAyJ11TIpCQWUGyumCb/Lkg02a/jtGt5qfqgO3atySZVWNzvg4PR5Ju3GPblqpgZA+Z73WbkkX2qO+jvRYtOTtEJGOOkMx2/1GO9gRLriwSWHpAOSST3SCRNxtKJDd71FLaKk452sosyc0jljIVHBGSdzvfSM8MIbnZJZ/kdBMCsrPBVWq1anlVBytX8oCYPpIHQlKbNE12hYkkMphDPjmQAwLie7odAvJuVjcy2ds2Mpj9RTmSOQKSZExnBGQwN0Hlbn42sjNl4+If5nKBNOQVATmSfQmJLomnO6wEZW8CiQxmtSeNuRItb+ZKtBwcsx0immzcBSvBLovblMrcxffoJenj6VfKNu7RImVFjlgJfE7mHivxg0lapSbbEivB1aTxcjJ9fOROZjNWgqVg9oTEPW8viGnxu2AlmM3iV5KePCGmNL5GQGqzsJGTSePlSHYTVoK9Y/rESjBlLBbEVENyQkBqs68ob2TrEVJojYvRJOnM6ldyc6wn7+SAmAJJlyCiYrTigoDU5jRcFvLh8QXdKpHaPPQjN7JCQMrOFIPL2aStMjv2HgEZTDsSudi1jVSmiYAc7NGePEyLNLnYS4ySs5jxFfXRk8Y0NhKfsUVIFrspICNdgoB4+5KlHOzvRhpyRkge7BES70yeJnsbSuRuW0BLQyYIycAMEXmwRUR65ohIaudgSXlFRMgGX9OQSPFySBRLJGONiHR2EpbWpmpS2YReRnaISEOHiLyTE0JytLtqsrcPVEhCnhCR1Kav0rJCRIaXiYkSE/mwx+Rys9XzsrNPAInP2ju+CxEREREREZHjDf9CkuB/55/2zGbXYRSGwuFPeIGIsoB1Ft6d93+/0ZRSoAja3OTOlUY5qzQkpvlqjk1qHcXpQ7Eiml1AAJnJ7cwsxsMe+zoJbtKtbGl4lQyAuRTJBkAuE2nMpwSAyTNLAH4cXAE0CR4RNr0sFtiHWZoe4EIx4JapAExGBQA/j49xHuyAMrPgadwA0E32MNffz5acNJcgoWoicxSJBCA+INGzmx1luQ6tzcTcWyYQRqJLkBS1eNhUSNIZ1n1qI0zjT4gahVpB98sKNrNxf4dkPimnUWv5KQVELpJW9vEnRHabRIASvfdCJUzibfl58raoyJO/xkts1k7+OyQYi3okYyKxOubugsolIuD+q3rNg1zzlDkBKMjMZUhYlTKiA7D15b3CINAVHfSyv4pkbq/0kLceQLRZ6WSP5LWorK2dE/DVsrH27W6LOnMeMzWR3eVIBOs3JJr10SIsAXfIq/LZ8DHHuK3uOgAg3SYR14qnkVj04qNIHLD9BMkOIOQC7IDwOAh1xVNvpUwoAIobJO0DnUbCFyCRgNKfp3k5EVG5c+OqwnJZxIWIEn3JBnGFhGq5K5CQreVKT4VASfFlrzslBfR9w0/6ErEMkJTHt1UfxMy84SH+NXvlEqFLRMxUt+NtZdTmQKs2Q7IBgCS8yYd6P0PRtiKSf41krdvxlNUHkfSil5XGvjXadMR+4lXDGSTMZuAlhrnxu1bxGiSL3v8N5WvrpdTMrWJyM8DXIzlgrzogZUmVJ/Ygkpir5/Y42EqeyarSpqOQj34ViaNaqtmyGqJoWiREZBsjaQ2NjiORAy8pcq99dvvaRjcvptaoAECROYVknUNmAFyQdM8cAagTSDKJORIBqE+9gEk89lUvJ2UT1yzXI6GlQ5Iv0DuAaM8iSTWD8kHskGzIfqpncRCkXs5LTEfnSEQAEPQ5JPTFptEBsqzzelWTzaKqwdrPFGLW3Se9Bf4OSXwQWc4hwWckW+mOGaDeXC9t1xzismiWMvXlPmWg+3LhrEqJ5RwSCezL3EtMZVbyV5GUGXSCYJ4sHGC/Q7KwWSZIhBkhKUMEbCMkhYjTlfPU9YZ1s90r58XPkwSciv3zk3kWITNHMt9M225ABQBEAS9RQSWmSFgBMNMcLEjOywLh2Vxw8gb/nDfocW5+ROLbgZlbBGAvV8tkHRUS7QFA5t/eZuB9B79fgoQByIqwBFT5H+prJB6gZidNXyOJALj5manOM20VyhaPhq2pdhe9YNQqG6lNX9GA6JHFSnnxNHui963mc7GNDJUKEjFc0swmM6M28xnAy14MAVCycdMw8MS0vM5KbC7NzZKbcNPYBKwTJJ4O/GOwKSWqG2UyNFBlmmRq53NWj/4PDOvyV5LWtlliTvi7kV34lfXg1ykjnSQv/2/dunXr1q1bt27duvUPJgzeOU+zv/oAAAAASUVORK5CYII="

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAv4DvYDDPQJ8Qr49Q33Aghg6D9wAAAhBJREFUWMPtltty6yAMRUFC4mJs6/+/9hwSDwEUQ9rHTtZjO3vZKJKw+fK3iR42+58Ajn6T36QBQ/5R2DGbuEsHfh73JRoMYW8wBJ8dPcmDYPIg8MK0zlN982CgFxThsTw9irwMqRU8fWGRl5YQWQnmhiw9cGIjSLIyEMqA883PaKUwqUNkUbh6KGvqv/2k97QhVEH92x7fH0De4lgJ5H1Hnf4o06PqcOBT0DwA42IMPUCwtr4DPgRe5q8QitlWEgDQWVQpHQ+Bm09WFMXWlddC22KTHqw48yJVwW0vpSGONLRIqUntJNqVYCg+x7FJm6Iah7qZ+nyKakzSXvMw9LMWAN9X2T03zjYRYGY0mit/shTsvYAzi9V5/3A7j7IQJI9yJ0A6RBYCINQnLBwlH2QhQEd40+sg6FkWgp0I75bOhg5lIeB45cVF3apb12vwRhBeSx3sal85M7CLawYqj/MSrfSQqhE1efHDI4iHPM4vlT33z8jYpdcLwUK3+EAUWQu2USCcuGy2nDeobNfCM5qzEcB1DTaNZwOA96eZEJRAgEVh7QburaC5SB20t4qmCtS4XPhL0La/bmONVQLhUxvwthIR67dEsx2VIc8+EJRAtoiqACsDG2gDhCq/MNiuq5AIp3k9dsl0s7fHakBv1gBCLxA2hOq+mXD6TlC/e3dvPgZU5XPK5idEF/oV+uXLlH8RI1TdG/qhdAAAAABJRU5ErkJggg=="

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAP1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////9KjZoYAAAAFHRSTlMAMMAgQGCgEPCAcNBQsOCQ37+Pr/HIP5wAAAI0SURBVHhetVfdeuwgCFyNfxhNTJb3f9Zz03aqYvS0X+du10AGGIS8/hjeGLP9zHSz7gr8gcvZ7f+s484tyr3sw7xZxpVWzNXFYxQzzdrNz3g/B6IKzxCe4rC8gnto73gNb79mv2eiSET64PbEz+2z9ThScZ97IAbYdbk2uvLgOvvEgBZLZapIqBVvwFkcaaQKspEU5BfUWpmDl05gP/dwvgAfevu5h02qwLTfTqkSPoDWFHtPAbyORh8qEbVXmuopwKmtqkblQ3Z2oNjwqYEvAlW6oAwuSC0exwujRKC+WML3o4yGaf7weChyA9WpHjHAH3TPQC+82i3SGntly92jkYSKkRFKBQRJd1T9FOUGJCEJeeBAswASMqQhjIpjYQFOdoDX7XDAErTgoMBBE8KcAVjnRQdxFAKhOzsdylq0AwfQgeceh1RlXVX1fBxyUYqQqogKHvHHQy/41qt0S6oHArbNiwYhQIV6GMozBL0BmmIigxJbPYMuKIgNZSQCuMK+MhY2eYrZwRT20E0b6i3zxwxBBPgTWrA7A9kP5gobabmI8b4CAzoN1xg92A6ihnxdM2uHGwLVkjGRCENtsGHk6uxY2OIU4kfFROkWO5ns0MBoFBUrsUjgyW62ZgYn7Ro2PyyKOzcIwneKj7Bv4eEBKG9Kn+VShq7HTcpnXsPuf7eua8kea8kU9HrCpifmhxnaothjBHotwB5Dc/9aQ3JCLjLEuwJzagb0mfwPP70p4fP7T/APapCRU7q26PsAAAAASUVORK5CYII="

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = extend

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function extend() {
	    var target = {}

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	var Base64 = {
	  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	  encode: function(a) {
	    var b, c, d, e, f, g, h, i = "", j = 0;
	    for (a = Base64._utf8_encode(a); j < a.length; )
	      b = a.charCodeAt(j++),
	      c = a.charCodeAt(j++),
	      d = a.charCodeAt(j++),
	      e = b >> 2,
	      f = (3 & b) << 4 | c >> 4,
	      g = (15 & c) << 2 | d >> 6,
	      h = 63 & d,
	      isNaN(c) ? g = h = 64 : isNaN(d) && (h = 64),
	      i = i + this._keyStr.charAt(e) + this._keyStr.charAt(f) + this._keyStr.charAt(g) + this._keyStr.charAt(h);
	    return i
	  },
	  decode: function(a) {
	    var b, c, d, e, f, g, h, i = "", j = 0;
	    for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); j < a.length; )
	      e = this._keyStr.indexOf(a.charAt(j++)),
	      f = this._keyStr.indexOf(a.charAt(j++)),
	      g = this._keyStr.indexOf(a.charAt(j++)),
	      h = this._keyStr.indexOf(a.charAt(j++)),
	      b = e << 2 | f >> 4,
	      c = (15 & f) << 4 | g >> 2,
	      d = (3 & g) << 6 | h,
	      i += String.fromCharCode(b),
	      64 != g && (i += String.fromCharCode(c)),
	      64 != h && (i += String.fromCharCode(d));
	    return i = Base64._utf8_decode(i)
	  },
	  _utf8_encode: function(a) {
	    a = a.replace(/\r\n/g, "\n");
	    for (var b = "", c = 0; c < a.length; c++) {
	      var d = a.charCodeAt(c);
	      d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192),
	      b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224),
	      b += String.fromCharCode(d >> 6 & 63 | 128),
	      b += String.fromCharCode(63 & d | 128))
	    }
	    return b
	  },
	  _utf8_decode: function(a) {
	    for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length; )
	      d = a.charCodeAt(c),
	      d < 128 ? (b += String.fromCharCode(d),
	      c++) : d > 191 && d < 224 ? (c2 = a.charCodeAt(c + 1),
	      b += String.fromCharCode((31 & d) << 6 | 63 & c2),
	      c += 2) : (c2 = a.charCodeAt(c + 1),
	      c3 = a.charCodeAt(c + 2),
	      b += String.fromCharCode((15 & d) << 12 | (63 & c2) << 6 | 63 & c3),
	      c += 3);
	    return b
	  }
	};

	module.exports = Base64;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var device = __webpack_require__(1);

	module.exports = {
	  weixin: {
	    name: '微信',
	    icon: __webpack_require__(15)
	  },
	  weixintimeline: {
	    name: '朋友圈',
	    icon: __webpack_require__(17)
	  },
	  qq: {
	    name: 'QQ',
	    icon: __webpack_require__(9),
	    scheme: 'mqqapi://share/to_fri?src_type=web&version=1&file_type=news'
	  },
	  qzone: {
	    name: 'QQ空间',
	    icon: __webpack_require__(10),
	    api: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{url}}&title={{title}}&pics={{pic}}&desc={{digest}}',
	    scheme: device.isIOS ?
	    'mqqapi://share/to_fri?file_type=news&src_type=web&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A' :
	    'mqqapi://share/to_qzone?src_type=app&version=1&file_type=news&req_type=1'
	  },
	  yixin: {
	    name: '易信',
	    icon: __webpack_require__(18),
	    api: 'http://open.yixin.im/share?url={{url}}&title={{title}}&pic={{pic}}&desc={{digest}}'
	  },
	  weibo: {
	    name: '微博',
	    icon: __webpack_require__(14),
	    api: 'http://service.weibo.com/share/share.php?url={{url}}&title={{title}}&pic={{pic}}'
	  },
	  tqq: {
	    name: '腾讯微博',
	    icon: __webpack_require__(13),
	    api: 'http://share.v.t.qq.com/index.php?c=share&a=index&url={{url}}&title={{title}}&pic={{pic}}'
	  },
	  renren: {
	    name: '人人网',
	    icon: __webpack_require__(11),
	    api: 'http://widget.renren.com/dialog/share?resourceUrl={{url}}&title={{title}}&pic={{pic}}&description={{digest}}'
	  },
	  douban: {
	    name: '豆瓣',
	    icon: __webpack_require__(8),
	    api: 'http://douban.com/recommend/?url={{url}}&title={{title}}&image={{pic}}'
	  },
	  tieba: {
	    name: '百度贴吧',
	    icon: __webpack_require__(12),
	    api: 'http://tieba.baidu.com/f/commit/share/openShareApi?url={{url}}&title={{title}}&desc={{digest}}'
	  },
		copy:{
			name: '复制',
			icon: __webpack_require__(22),
			api: ''
		}
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

		module.exports = "//m.i1.liuxue86.com/images/share/u51.png";

		/***/ }
/******/ ])
});

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload__);
/*
 * @Author: heweifang 
 * @Date: 2017-11-07 16:53:29 
 * @Last Modified by: heweifang
 * @Last Modified time: 2018-01-26 15:47:50
 */
/**
 * src   百度广告
 * tt    东方头条广告
 * tb    淘宝广告
 * type    false/取消广告； custom/自定义；tt/加载头条广告；tb/加载淘宝广告；bd/加载百度广告
 */

__webpack_require__(3);
window.ad = {
  banner0: {
    src: 'idvmavlesgkcef',
    type: false
  },
  banner1: {
    src: 'cxpgdfwpmaedgm',
    tt: 'idx=1&u=cxpgdfwpm&t=lx',
    type: 'tt'
  },
  banner2: {
    src: '',
    tb: 'mm_30044628_2628542_41190794',
    type: false
  },
  banner3: {
    src: 'Cxpgdfwudaedgm',
    type: false
  },
  banner4: {
    src: 'jewnngfmthlfgmk',
    tt: 'idx=10&u=idvjfvmlc&t=lx',
    type: 'tt'
  },
  content1: {
    tt: 'idx=4&u=qldumtnkh&t=lx',
    type: 'tt'
  },
  content2: {
    tt: 'idx=5&u=snfwovpmm&t=lx',
    type: 'tt'
  },
  content3: {
    tt: 'idx=6&u=vqizryspy&t=lx',
    type: 'tt'
  },
  content4: {
    tt: 'idx=7&u=niarjqkjo&t=lx',
    type: 'tt'
  },
  content5: {
    tt: 'idx=8&u=ojbskrlks&t=lx',
    type: 'tt'
  },
  content6: {
    tt: 'idx=9&u=qldumtnmd&t=lx',
    type: 'tt'
  },
  tj1: {
    src: 'jewnngdaghlfgmk',
    type: false
  },
  tj2: {
    src: 'jewnngdaghlfgmk',
    type: false
  },
  tj3: {
    src: 'jewnngdaghlfgmk',
    type: false
  },
  tj4: {
    src: 'jewnngdaghlfgmk',
    type: false
  },
  tj5: {
    src: 'jewnngdaghlfgmk',
    type: false
  },
  tj6: {
    src: 'jewnngdaghlfgmk',
    type: false
  },
  tj7: {
    src: 'jewnngdaghlfgmk',
    type: false
  },
  tj8: {
    src: 'jewnngdaghlfgmk',
    type: false
  },
  pageup: {
    src: 'idvmmclaagkcef',
    tt: 'idx=2&u=rmevnuojl&t=lx',
    type: 'tt'
  },
  pagedown: {
    src: 'cxpgywdmu',
    tt: 'idx=3&u=snfwkovpo&t=lx',
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
lx.output.count_tt_js('adn=10&pgn=1');//头条广告统计代码
(function () {
  var html = {};
  html.rmgz = '<div class="article-list">' +
    '<header class="section-header"><h3 class="section-title">热门关注</h3></header>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3459235.html" title="慎入！泰国人妖变性全过程曝光"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/bx1.jpg"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3459235.html" title="慎入！泰国人妖变性全过程曝光">慎入！泰国人妖变性全过程曝光</a></h4>' +
    '     <div class="article-item-meta">泰国人妖 奇闻</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="gg" data-id="content1"></div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3418647.html" title=""><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/new/2chouzhi1.jpg" alt="宝妈抽脂"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3418647.html" title="">一位30多岁宝妈抽脂的真实经历分享</a></h4>' +
    '     <div class="article-item-meta">抽脂手术</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3460931.html" title="全世界最容易娶老婆的六个国家"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/new/3laopo.jpg" alt="娶老婆"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3460931.html" title="全世界最容易娶老婆的六个国家">全世界最容易娶老婆的六个国家</a></h4>' +
    '     <div class="article-item-meta">娶老婆</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="gg" data-id="content2"></div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3422049.html" title="给孩子买保险 千万别这么做！"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/new/4boybx.jpg" alt="给孩子买保险"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3422049.html" title="给孩子买保险 千万别这么做！">给孩子买保险 千万别这么做！</a></h4>' +
    '     <div class="article-item-meta">给孩子买保险</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3562550.html" title="盘点全球八大奇葩的洗澡方式，俄罗斯口味最重，果然是战斗民族！"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/new/qipa.jpg" alt="奇葩"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3562550.html" title="盘点全球八大奇葩的洗澡方式，俄罗斯口味最重，果然是战斗民族！">盘点全球八大奇葩的洗澡方式，俄罗斯口味最重，果然是战斗民族！</a></h4>' +
    '     <div class="article-item-meta">奇葩</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="gg" data-id="content3"></div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3424313.html" title="家教和补习班哪个更好?"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/jiajiao.jpg" alt="补习班"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3424313.html" title="家教和补习班哪个更好?">家教和补习班哪个更好?</a></h4>' +
    '     <div class="article-item-meta">补习班</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3460741.html" title="厉害了王者荣耀！外国友人为喷队友学中文"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/3460741/wzry2.jpg" alt="王者荣耀"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3460741.html" title="厉害了王者荣耀！外国友人为喷队友学中文">厉害了王者荣耀！外国友人为喷队友学中文</a></h4>' +
    '     <div class="article-item-meta">王者荣耀</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="gg" data-id="content4"></div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3562549.html" title="揭秘，国外女生宿舍哪些难以启齿的事儿"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/new/nsss.jpg" alt="国外女生宿舍"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3562549.html" title="揭秘，国外女生宿舍哪些难以启齿的事儿">揭秘，国外女生宿舍哪些难以启齿的事儿</a></h4>' +
    '     <div class="article-item-meta">国外女生宿舍</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3417408.html" title="孩子叛逆家长怎么办 改变孩子叛逆的方法有哪些"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/new/9panni.jpg" alt="孩子叛逆"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3417408.html" title="孩子叛逆家长怎么办 改变孩子叛逆的方法有哪些">孩子叛逆家长怎么办 改变孩子叛逆的方法有哪些</a></h4>' +
    '     <div class="article-item-meta">孩子叛逆</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="gg" data-id="content5"></div>' +
    '	<div class="article-item">' +
    '   <div class="article-item-thumb">' +
    '     <a href="https://m.liuxue86.com/a/3462792.html" title="盘点美国史上十大枪击案 移民前先考虑清楚"><img class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/new/10meiguo.jpg" alt="美国枪击案"></a>' +
    '   </div>' +
    '   <div class="article-grouper">' +
    '     <h4 class="article-item-title"><a href="https://m.liuxue86.com/a/3462792.html" title="盘点美国史上十大枪击案 移民前先考虑清楚">盘点美国史上十大枪击案 移民前先考虑清楚</a></h4>' +
    '     <div class="article-item-meta">美国枪击案</div>' +
    '   </div>' +
    ' </div>' +
    '	<div class="gg" data-id="content6"></div>' +
    '</div>';
  html.jctw = '<header class="section-header">' +
    '  <h3 class="section-title">精彩图文</h3>' +
    '</header>' +
    '<div class="jctw-content" data-id="jctw">' +
    '  <dl>' +
    '    <a href="https://m.liuxue86.com/a/3421821.html" title="发育期间吃什么丰胸">' +
    '      <dt><img class="cover-img lazy-load-img" class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/fx.jpg" alt="发育期间吃什么丰胸"></dt>' +
    '      <dd>发育期间吃什么丰胸</dd>' +
    '    </a>' +
    '  </dl>' +
    '  <dl>' +
    '    <a href="https://m.liuxue86.com/a/3425282.html" title="日本妻子真让人受不了!">' +
    '      <dt><img class="cover-img lazy-load-img" class="lazyload cover-img" src="https://static.liuxue86.com/images/lazy-spinner.jpg" data-src="https://i1.m.liuxue86.com/images/pic/rbqz.jpg" alt="日本妻子真让人受不了!"></dt>' +
    '      <dd>日本妻子真让人受不了!</dd>' +
    '    </a>' +
    '  </dl>' +
    '</div>' +
    '<div class="gg show-banner4" data-id="banner4"></div>';
    // html.jctw = '<div class="gg show-banner4" data-id="banner4"></div>';
    html.fixed = '<ul class="side-share">'+
    '  <li class="to-top"><i class="icon-head icon-head12"></i></li>'+
    '</ul>';
    // '<div class="lx-toolbar"><ul>'+
    // '    <li><a href="https://m.liuxue86.com/" class="home"><i class="icon-head icon-head13"></i>首页</a></li>'+
    // '    <li><a href="http://pdt.zoosnet.net/LR/Chatpre.aspx?id=PDT38538015&cid=1499323525549292837338&lng=cn&sid=1500616190614575502781&p=http://m.meiguo.liuxue86.com/&rf1=&rf2=&msg=&d=1500621294360" class="discuss"><i class="icon-head icon-head23"></i>在线咨询</a></li>'+
    // '    <li><a href="https://m.liuxue86.com/evaluate/" class="write"><i class="icon-head icon-head33"></i>免费评估</a></li>'+
    // '    <li><a href="" class="phone"><i class="icon-head icon-head43"></i>电话咨询</a></li>'+
    // '</ul> </div>'
  $('.js-insert-box').each(function () {
    var id = $(this).attr('data-id');
    $(this).append(html[id]);
  });



  var myLazyLoad = new __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload___default.a();

  // var arr_wechat = [{
  //   title: '出国',
  //   intro: '更多美文下载和价值799元作文素材+黄冈特教经验大礼包，来就免费送！'
  // }, {
  //   title: '周记200字',
  //   intro: '百篇精彩周记任意下载，更有价值400元的名师作文系列指导，关注就免费送！'
  // }, {
  //   title: '建党伟业',
  //   intro: '更多读后感和价值799元作文素材+一线骨干名师作文指导，来就免费送！'
  // }, {
  //   title: '雪',
  //   intro: '更多雪的美文和588元精品学习包，作文提分到95分一点都不难。关注就送给你！'
  // }, {
  //   title: '感恩',
  //   intro: '百篇感恩美文与价值400元名师作文辅导资源，作文到95分其实很简单，关注就送给你！'
  // }, {
  //   title: '成长故事',
  //   intro: '百篇成长故事作文和精选799元作文攻略大礼包+名师作文预测，关注即可免费获取！'
  // }, {
  //   title: '春节',
  //   intro: '百篇春节作文免费下载和黄冈特教799元珍贵资料，作文涨20分很简单！关注即可免费获取！'
  // }, {
  //   title: '圣诞',
  //   intro: '下载百篇圣诞作文和价值799元珍贵辅导资料，作文涨20分很简单！关注即可免费获取！'
  // }, {
  //   title: '元旦',
  //   intro: '更多精选元旦作文和还有名师作文训练手册+尖子笔记整理合集，关注后任性下载！'
  // }, {
  //   title: '冬天',
  //   intro: '冬天作文合集和精心整理的799元名师指导大礼包，两周作文轻松到85分!关注即可免费下载！'
  // }];
  // var arr_wechat = [{
  //   title: '胜似亲人',
  //   intro: '更多美文下载和价值799元作文素材+黄冈特教经验大礼包，来就免费送！'
  // },{
  //     title: '周记200字',
  //     intro: '百篇精彩周记任意下载，更有价值400元的名师作文系列指导，关注就免费送！'
  // },{
  //     title: '建党伟业',
  //     intro: '更多读后感和价值799元作文素材+一线骨干名师作文指导，来就免费送！'
  // },{
  //     title: '雪',
  //     intro: '更多雪的美文和588元精品学习包，作文提分到95分一点都不难。关注就送给你！'
  // },{
  //     title: '感恩',
  //     intro: '百篇感恩美文与价值400元名师作文辅导资源，作文到95分其实很简单，关注就送给你！'
  // },{
  //     title: '成长故事',
  //     intro: '百篇成长故事作文和精选799元作文攻略大礼包+名师作文预测，关注即可免费获取！'
  // },{
  //     title: '春节',
  //     intro: '百篇春节作文免费下载和黄冈特教799元珍贵资料，作文涨20分很简单！关注即可免费获取！'
  // },{
  //     title: '圣诞',
  //     intro: '下载百篇圣诞作文和价值799元珍贵辅导资料，作文涨20分很简单！关注即可免费获取！'
  // },{
  //     title: '元旦',
  //     intro: '更多精选元旦作文和还有名师作文训练手册+尖子笔记整理合集，关注后任性下载！'
  // },{
  //     title: '冬天',
  //     intro: '冬天作文合集和精心整理的799元名师指导大礼包，两周作文轻松到85分!关注即可免费下载！'
  // }];
  // var isWechat = /micromessenger/i.test(window.navigator.userAgent);
  // for (var i = 0; i < arr_wechat.length; i++) {
  //   if (document.title.indexOf(arr_wechat[i].title) > -1) {
  //     var html_wechat = '<div id="wechat"><div class="wechat-box contain">' +
  //       '    <div class="wechat-intro">' + arr_wechat[i].intro + '</div>';
  //     if (isWechat) {
  //       html_wechat += '    <div class="wechat-lead"><span class="cf00">&darr;&darr;&darr;</span>长按关注公众号<span class="cf00">&darr;&darr;&darr;</span></div>' +
  //         '<div class="tc wechat-qrcode"><img src="https://i1.m.liuxue86.com/images/wechat_zuowen.jpg" alt="关注微信公众号“zuowenfudaoyuan”" width="150" height="150"></div>' +
  //         '<div class="wechat-info tc">回复 “' + arr_wechat[i].title + '” 免费获取学习包 </div></div>';
  //     } else {
  //       html_wechat += '    <div class="wechat-lead"><span class="cf00">&darr;&darr;&darr;</span>长按复制并关注公众号 <span class="cf00">&darr;&darr;&darr;</span></div>' +
  //         '<div class="wechat-name">zuowenfudaoyuan</div>' +
  //         '<div class="wechat-info tc">回复 “' + arr_wechat[i].title + '” 免费获取学习包 </div>' +
  //         '    <div class="wechat-btn"><a class="btn-primary" href="weixin://" title="快速打开微信">快速打开微信&nbsp;&nbsp;<span class="fb">&rarr;</span></a></div></div>';
  //     }
  //     var html_wechat_modal = '<div class="wechat-modal js-parent">' +
  //       '    <div class="wechat-copy">' +
  //       '        <div class="js-close"></div>' +
  //       '        <p class="fs32">微信公众号</p>' +
  //       '        <p class="cf00 fs32">liuxue86</p>' +
  //       '        <p><span class="fs20">&uarr;</span>长按复制微信公众号</p>' +
  //       '        <button class="btn btn-block btn-assertive">打开微信，关注公众号</button>' +
  //       '    </div>' +
  //       '</div></div>';
  //     $('#article').append(html_wechat);
  //     break;
  //   }
  // }
})();
(function (w) {
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
  lx.output.count_tt('id=liuxue');//头条广告统计代码

  //内容页添加天猫活动结束
  $('.loadmore-box').append('<p class="taobao-nhj"><a rel="nofollow" href="https://s.click.taobao.com/VXZlYUw">2018天猫年货节  超值年货提前开抢&gt;&gt;</a></p>')
});

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleNotFoundError: Module not found: Error: Can't resolve '../../img/icon-head.png' in 'E:\\gitProjects\\webFront\\assets\\scss'\n    at factoryCallback (E:\\gitProjects\\webFront\\node_modules\\_webpack@2.7.0@webpack\\lib\\Compilation.js:264:39)\n    at factory (E:\\gitProjects\\webFront\\node_modules\\_webpack@2.7.0@webpack\\lib\\NormalModuleFactory.js:247:20)\n    at resolver (E:\\gitProjects\\webFront\\node_modules\\_webpack@2.7.0@webpack\\lib\\NormalModuleFactory.js:65:21)\n    at asyncLib.parallel (E:\\gitProjects\\webFront\\node_modules\\_webpack@2.7.0@webpack\\lib\\NormalModuleFactory.js:138:21)\n    at E:\\gitProjects\\webFront\\node_modules\\_async@2.6.0@async\\dist\\async.js:3874:9\n    at E:\\gitProjects\\webFront\\node_modules\\_async@2.6.0@async\\dist\\async.js:473:16\n    at iteratorCallback (E:\\gitProjects\\webFront\\node_modules\\_async@2.6.0@async\\dist\\async.js:1048:13)\n    at E:\\gitProjects\\webFront\\node_modules\\_async@2.6.0@async\\dist\\async.js:958:16\n    at E:\\gitProjects\\webFront\\node_modules\\_async@2.6.0@async\\dist\\async.js:3871:13\n    at resolvers.normal.resolve (E:\\gitProjects\\webFront\\node_modules\\_webpack@2.7.0@webpack\\lib\\NormalModuleFactory.js:130:23)\n    at onError (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\Resolver.js:65:10)\n    at loggingCallbackWrapper (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at runAfter (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\Resolver.js:158:4)\n    at innerCallback (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\Resolver.js:146:3)\n    at loggingCallbackWrapper (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at next (E:\\gitProjects\\webFront\\node_modules\\_tapable@0.2.8@tapable\\lib\\Tapable.js:252:11)\n    at E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\UnsafeCachePlugin.js:40:4\n    at loggingCallbackWrapper (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at runAfter (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\Resolver.js:158:4)\n    at innerCallback (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\Resolver.js:146:3)\n    at loggingCallbackWrapper (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at next (E:\\gitProjects\\webFront\\node_modules\\_tapable@0.2.8@tapable\\lib\\Tapable.js:252:11)\n    at innerCallback (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\Resolver.js:144:11)\n    at loggingCallbackWrapper (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at next (E:\\gitProjects\\webFront\\node_modules\\_tapable@0.2.8@tapable\\lib\\Tapable.js:249:35)\n    at resolver.doResolve.createInnerCallback (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\DescriptionFilePlugin.js:44:6)\n    at loggingCallbackWrapper (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at afterInnerCallback (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\Resolver.js:168:10)\n    at loggingCallbackWrapper (E:\\gitProjects\\webFront\\node_modules\\_enhanced-resolve@3.4.1@enhanced-resolve\\lib\\createInnerCallback.js:31:19)\n    at next (E:\\gitProjects\\webFront\\node_modules\\_tapable@0.2.8@tapable\\lib\\Tapable.js:252:11)");

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zepto_webpack__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zepto_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_soshm__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_soshm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__lib_soshm__);



__webpack_require__(16)
__webpack_require__(18)

window.$ = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default.a;

__WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(function () {
  //查看全文
  var $article = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.article-content'),
    height_article = $article.height();
  var loadMore = {
    countRemainArticle: function () {
      var cur_height_article = $article.height();
      __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.cont-remain').html(parseInt((height_article - cur_height_article) / height_article * 100));
    },
    lastTap: function () {
      __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.mask-box').hide();
      $article.height('auto');
    },
    loadMore: function () {
      $article.height(1400);
      this.countRemainArticle();
    },
    init: function () {
      if (height_article <= 700) {
        __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.mask-box').hide();
        return;
      }
      var that = this;
      $article.height(700);
      this.countRemainArticle();
      if (height_article > 700 && height_article <= 1400) {
        var tapTime = 0;
      } else if (height_article > 1400) {
        var tapTime = 1;
      }
      __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.content-more').click(function () {
        if (tapTime) {
          tapTime--;
          that.loadMore()
        } else {
          that.lastTap();
        }
      })
    }
  }
  if (__WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.pages-new').length == 0) {
    loadMore.init();
  }



  //监听手指滑动事件
  // var startPos = { x: 0, y: 0, time: +new Date };
  // document.addEventListener('touchstart', function (event) {
  //   var touch = event.targetTouches[0];
  //   startPos.x = touch.pageX;
  //   startPos.y = touch.pageY;
  // }, false);
  // document.addEventListener('touchmove', function (event) {
  //   if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
  //   var touchmove = event.targetTouches[0];
  //   var endPos = { x: touchmove.pageX - startPos.x, y: touchmove.pageY - startPos.y };
  //   isScrollDown = endPos.y < 0 ? 1 : 0;
  //   if (isScrollDown) {
  //     $body.addClass('scroll-down');
  //     $fixedBox.removeClass('show-to-top');
  //   } else {
  //     !isModalOut && $body.removeClass('scroll-down');
  //     window.scrollY > 600 ? $fixedBox.addClass('show-to-top') : $fixedBox.removeClass('show-to-top');
  //   }
  // }, false);

  // document.getElementById('head').addEventListener('touchmove', function(){
  //   return;
  // })

  // window.onscroll = function () {
  //   //lazyload();
  //   debounce(lazyload, 100, 500);
  // };
  // function debounce(method, context) {
  //   clearTimeout(method.timeout);
  //   method.timeout = setTimeout(function () {
  //     method.call(context);
  //   }, 50);
  // }
  // var p = 0, t = 0;
  // function lazyload() {
  //   p = window.scrollY;
  //   if (t < p) {//下滚  
  //     $body.addClass('scroll-down');
  //     $fixedBox.removeClass('show-to-top');
  //   } else {//上滚
  //     $body.removeClass('scroll-down');
  //     p > 600 ? $fixedBox.addClass('show-to-top') : $fixedBox.removeClass('show-to-top');
  //   }
  //   setTimeout(function () {
  //     t = p;
  //   }, 0)
  // }




  (function () {
    var sharePic = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.article-content').find('img').eq(0).attr('src') || 'https://i1.m.liuxue86.com/images/logo16.png',
      shareTit = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('h1').text();

    var agent = window.navigator.userAgent.toLocaleLowerCase(),
      isUcQQ = /QQBrowser|UCBrowser/i.test(agent);
    var sites = isUcQQ ? ['weixin', 'weixintimeline', 'qq'] : ['qq', 'qzone', 'weibo']
    //自定义灯箱
    __WEBPACK_IMPORTED_MODULE_2__lib_soshm___default()('#soshm-box', {
      title: shareTit,
      pic: sharePic,
      sites: sites
    });
  })();
});
__WEBPACK_IMPORTED_MODULE_1__lib_util__["a" /* default */].init();

/***/ }),

/***/ 3:
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

},[22]);