webpackJsonp([3],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload__);
/*
 * @Author: heweifang 
 * @Date: 2017-11-07 16:53:29 
 * @Last Modified by: heweifang
 * @Last Modified time: 2018-01-25 16:41:05
 */
/**
 * src   百度广告
 * tt    东方头条广告
 * tb    淘宝广告
 * type    false/取消广告； custom/自定义；tt/加载头条广告；tb/加载淘宝广告；bd/加载百度广告, sg搜狗广告
 */

var myLazyLoad = new __WEBPACK_IMPORTED_MODULE_0_vanilla_lazyload___default.a();
__webpack_require__(3);
window.ad = {
  banner0: {
    src: 'idvmavlesgkcef',
    sg: 'sg',
    type: false
  },
  banner1: {
    src: 'cxpgdfwpmaedgm',
    type: false
  },
  banner2: {
    src: 'cxpgdfwpmaedgm',
    type: false
  },
  banner3: {
    src: 'cxpgdfwpmaedgm',
    type: false
  },
  banner4: {
    src: 'cxpgdfwpmaedgm',
    type: false
  },
  banner5: {
    src: 'cxpgdfwpmaedgm',
    type: false
  },
  pagedown: {
    src: 'cxpgywdmu',
    type: false
  },
  foot: {
    src: 'fasjgisipdh',
    tt: 'idx=1&u=wrjatxgna&t=lx',
    type: 'tt'
  },
  missid: {
    src: '',
    tt: '',
    type: false
  }
};
lx.output.count_tt_js('adn=1&pgn=2&page=list');//头条广告引用

(function (w) {
  //插入页面
  var html = {};
  html.fixed = '<ul class="k-side side-share"><li class="to-top"><i class="icon-head icon-head12"></i></li><li class="k-menu icon-menu"></li></ul>';

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
  lx.output.count_tt('id=liuxuetopic');//头条统计
});

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zepto_webpack__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zepto_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_util__ = __webpack_require__(1);


__webpack_require__(14)

__WEBPACK_IMPORTED_MODULE_1__lib_util__["a" /* default */].init();

__WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(function(){

  //展开收起
  __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.slide-down-btn').click(function(){
    var $this = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(this), isHide = $this.attr('data-hide') || false;
    if (isHide) {
      $this.hide();
    }
    $this.closest('.slide-down-parent').toggleClass('slide-down');
  });

  //swiper滑动
  var $swipeBody = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.swipe-body'),
      $swipeIndicator = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.swipe-indicator');
  var swipeFun = {
    w_swipeBody: $swipeBody.width(),
    ln_item: __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.k-recommend-item').length,
    swipeIndicator: function(i){
      $swipeIndicator.children().removeClass('active').eq(i).addClass('active');
    },
    swipeList: function(i){
      $swipeBody.attr('data-cur', i).children().css('transform', 'translateX(-' + i * this.w_swipeBody + 'px)');
      this.swipeIndicator(i);
    },
    bindEvent: function(){
      var that = this;
      $swipeBody.swipeLeft(function(){
        var $this = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(this), curIndex = $this.attr('data-cur');
        if (curIndex == __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.k-recommend-item').length - 1) {
          return ;
        }
        curIndex++;
        that.swipeList(curIndex);
      });
      $swipeBody.swipeRight(function(){
        var $this = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(this), curIndex = $this.attr('data-cur');
        if (curIndex == 0) {
          return ;
        }
        curIndex--;
        that.swipeList(curIndex);
      });
    },
    init: function(){
      __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.swipe-list').width(this.w_swipeBody * 4);
      __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.k-recommend-item').width(this.w_swipeBody);
      var ln_item = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.k-recommend-item').length, html_indicator = '<li class="item active"></li>';
      for (var index = 0; index < ln_item - 1; index++) {
        html_indicator += '<li class="item"></li>';
      }
      $swipeIndicator.append(html_indicator);
      this.bindEvent();
    },
  }

  if ($swipeBody) {
    swipeFun.init();
  }

  //语音请求
  // $.ajax({
  //   url: 'https://openapi.baidu.com/oauth/2.0/token',
  //   data: {
  //     grant_type: 'client_credentials',
  //     client_id: 'uVjm4XzWzV9H01eqXGR99kGx',
  //     client_secret: '3Zq7Zii7TywG1PKWeq2TZtf93hzSKhag'
  //   },
  //   dataType: 'jsonp',
  //   jsonp: 'callback',
  //   jsonpCallback: 'callbackfunction',
  //   success: function(res){
  //     console.log(res);
  //   }
  // });
  // $.get('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=uVjm4XzWzV9H01eqXGR99kGx&client_secret=3Zq7Zii7TywG1PKWeq2TZtf93hzSKhag', function(res){
  //   console.log(eval(res));
  // })
  // $.post('https://openapi.baidu.com/oauth/2.0/token', {
  //   grant_type: 'client_credentials',
  //   client_id: 'uVjm4XzWzV9H01eqXGR99kGx',
  //   client_secret: '3Zq7Zii7TywG1PKWeq2TZtf93hzSKhag'
  // });
  // $.getJSON('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=uVjm4XzWzV9H01eqXGR99kGx&client_secret=3Zq7Zii7TywG1PKWeq2TZtf93hzSKhag', function(res){
  //   console.log(eval(res));
  // })
  // var token = null;
  // lx.output.load_js('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=uVjm4XzWzV9H01eqXGR99kGx&client_secret=3Zq7Zii7TywG1PKWeq2TZtf93hzSKhag', document.head, function(res){
  //   console.log(res);
  //   token = res;
  // });
  __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.icon-voice').click(function(){
    var txt = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(this).siblings('.voice-txt').text(),
        audioPlayer = document.getElementById('tit-audio');
    if (audioPlayer) {
      audioPlayer.src = 'https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=3&text=' + encodeURI(txt);
    } else {
      var audio = document.createElement('audio');
      audio.src = 'https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=3&text=' + encodeURI(txt);
      audio.setAttribute('autoplay', 'autoplay');
      audio.setAttribute('id', 'tit-audio')
      document.body.appendChild(audio);
    }
  });


  //k_锚点
  __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.anchor-modal').click(function(){
    __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()(this).parent().removeClass('active');
    __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.head-right').children().removeClass('close');
    __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('body').removeClass('hidden');
  });

  //k_menu
  __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.k-menu').click(function(){
    __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default()('.k-navlist').addClass('active');
  })
});

window.$ = __WEBPACK_IMPORTED_MODULE_0_zepto_webpack___default.a;

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

},[21]);