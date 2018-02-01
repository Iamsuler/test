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
import LazyLoad from 'vanilla-lazyload';
require('./output-wap');
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



  var myLazyLoad = new LazyLoad();

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