$(function(){
  $('.logo_1').fadeIn(1000);
  setTimeout(function(){
      $('.zzy1').fadeIn(500);
  },1000)
  setTimeout(function(){
      $('.index-text').fadeIn(500);
  },2500)
  $('.main3 .btns div').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    swiper.unlockSwipeToNext();
    swiper.slideNext(function(){}, 800);
  })
})

// -------------分享-------------
// getShare()

function getShare(){
   $.ajax({
     url: 'http://mm.diandianboke.com:8000/wechat/share/signature',
     data: {
       "app_id": "wxba7f7c2f25ed9cc8",
      //  "url": "mm.diandianboke.com"
      "url": encodeURIComponent(window.location.href.split('#')[0])
     },
     type: 'POST',
     dataType: 'json',
     success: function(resp){
       console.log(resp)
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: resp.appId, // 必填，公众号的唯一标识
          timestamp: resp.timestamp, // 必填，生成签名的时间戳
          nonceStr: resp.nonceStr, // 必填，生成签名的随机串
          signature: resp.signature,// 必填，签名
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
        }); 

        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({ 
              title: '你有一封来自悦诗风吟#发光肌秘所#的邀请函', // 分享标题
              desc: '与白牡丹系列代言人朱正廷一同探索肌肤白到自发光的秘密', // 分享描述
              //link: 'http://mm.diandianboke.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: window.location.href,
              imgUrl: 'http://mm.diandianboke.com:8000/logo.jpg', // 分享图标
              success: function () {
                // 设置成功
                console.log("分享成功");
              },
              error: function(err) {
                console.log(err)
              }
          })
          wx.updateTimelineShareData({
            title: '你有一封来自悦诗风吟#发光肌秘所#的邀请函', // 分享标题
              desc: '与白牡丹系列代言人朱正廷一同探索肌肤白到自发光的秘密', // 分享描述
              //link: 'http://mm.diandianboke.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: window.location.href,
              imgUrl: 'http://mm.diandianboke.com:8000/logo.jpg', // 分享图标
              success: function () {
                // 设置成功
                console.log("分享成功");
              },
              error: function(err) {
                console.log(err)
              }
          })
        });
     }
   })
}

getQrCode()

function getQrCode() {
    $.ajax({
        url: 'http://mm.diandianboke.com:8000/wechat/share/signature',
        data: {
            "app_id": "wxba7f7c2f25ed9cc8",
            "url": encodeURIComponent(window.location.href.split('#')[0])
        },
        type: 'POST',
        dataType: 'json',
        success: function(resp){
            wx.config({
                // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: resp.appId, // 必填，公众号的唯一标识
                timestamp: resp.timestamp, // 必填，生成签名的时间戳
                nonceStr: resp.nonceStr, // 必填，生成签名的随机串
                signature: resp.signature,// 必填，签名
                jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
            });

            wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        alert(result);
                    }
                });
            });
        }
    })
}

var isClick = true;
$("button").on("click",function(){
  if(isClick) {
    isClick = false;
    //事件
    console.log($(this).attr("data-val"));
    //定时器
    setTimeout(function() {
      isClick = true;
    }, 1000);//一秒内不能重复点击
  }
});
