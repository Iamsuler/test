import $ from 'zepto-webpack'
import util from './lib/util'
import soshm from './lib/soshm'
require('./wap/output-show')

window.$ = $;

$(function () {
  //查看全文
  var $article = $('.article-content'),
    height_article = $article.height();
  var loadMore = {
    countRemainArticle: function () {
      var cur_height_article = $article.height();
      $('.cont-remain').html(parseInt((height_article - cur_height_article) / height_article * 100));
    },
    lastTap: function () {
      $('.mask-box').hide();
      $article.height('auto');
    },
    loadMore: function () {
      $article.height(1400);
      this.countRemainArticle();
    },
    init: function () {
      if (height_article <= 700) {
        $('.mask-box').hide();
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
      $('.content-more').click(function () {
        if (tapTime) {
          tapTime--;
          that.loadMore()
        } else {
          that.lastTap();
        }
      })
    }
  }
  if ($('.pages-new').length == 0) {
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
    var sharePic = $('.article-content').find('img').eq(0).attr('src') || 'https://i1.m.liuxue86.com/images/logo16.png',
      shareTit = $('h1').text();

    var agent = window.navigator.userAgent.toLocaleLowerCase(),
      isUcQQ = /QQBrowser|UCBrowser/i.test(agent);
    var sites = isUcQQ ? ['weixin', 'weixintimeline', 'qq'] : ['qq', 'qzone', 'weibo']
    //自定义灯箱
    soshm('#soshm-box', {
      title: shareTit,
      pic: sharePic,
      sites: sites
    });
  })();
});
util.init();