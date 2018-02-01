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

export default util;

