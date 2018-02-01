import $ from 'zepto-webpack'
import util from './lib/util'
require('./wap/output-k')

util.init();

$(function(){

  //展开收起
  $('.slide-down-btn').click(function(){
    var $this = $(this), isHide = $this.attr('data-hide') || false;
    if (isHide) {
      $this.hide();
    }
    $this.closest('.slide-down-parent').toggleClass('slide-down');
  });

  //swiper滑动
  var $swipeBody = $('.swipe-body'),
      $swipeIndicator = $('.swipe-indicator');
  var swipeFun = {
    w_swipeBody: $swipeBody.width(),
    ln_item: $('.k-recommend-item').length,
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
        var $this = $(this), curIndex = $this.attr('data-cur');
        if (curIndex == $('.k-recommend-item').length - 1) {
          return ;
        }
        curIndex++;
        that.swipeList(curIndex);
      });
      $swipeBody.swipeRight(function(){
        var $this = $(this), curIndex = $this.attr('data-cur');
        if (curIndex == 0) {
          return ;
        }
        curIndex--;
        that.swipeList(curIndex);
      });
    },
    init: function(){
      $('.swipe-list').width(this.w_swipeBody * 4);
      $('.k-recommend-item').width(this.w_swipeBody);
      var ln_item = $('.k-recommend-item').length, html_indicator = '<li class="item active"></li>';
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
  $('.icon-voice').click(function(){
    var txt = $(this).siblings('.voice-txt').text(),
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
  $('.anchor-modal').click(function(){
    $(this).parent().removeClass('active');
    $('.head-right').children().removeClass('close');
    $('body').removeClass('hidden');
  });

  //k_menu
  $('.k-menu').click(function(){
    $('.k-navlist').addClass('active');
  })
});

window.$ = $;