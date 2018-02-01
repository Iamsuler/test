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