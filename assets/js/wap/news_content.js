const lx = {

  init: function () {
    console.log(1);
    util.getScript('https://static.liuxue86.com/js/liuxue.js', document.body, function () {
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
      })
    });
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
          console.log(height_article );
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

    // function throttle(method, delay, time) {
    //   var timeout, startTime = new Date();
    //   return function () {
    //     var context = this,
    //       args = arguments,
    //       curTime = new Date();
    //     clearTimeout(timeout);
    //     // 如果达到了规定的触发时间间隔，触发 handler
    //     if (curTime - startTime >= time) {
    //       method.apply(context, args);
    //       startTime = curTime;
    //       // 没达到触发间隔，重新设定定时器
    //     } else {
    //       timeout = setTimeout(method, delay);
    //     }
    //   };
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

    //init end
  }
}

util.init();

export default lx;