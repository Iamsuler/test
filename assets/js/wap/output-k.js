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
import LazyLoad from 'vanilla-lazyload';
var myLazyLoad = new LazyLoad();
require('./output-wap');
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