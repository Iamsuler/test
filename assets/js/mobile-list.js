import $ from 'zepto-webpack'
import util from './lib/util'
require('./wap/output-list')

util.init();

$(function(){
  //城市列表展开
  $('.js-more-once').click(function(){
    $(this).parent().hide().siblings().removeClass('js-off');
  });

  //表单名单滚动
  var $formList = $('#form-scroll-list');
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

window.$ = $;