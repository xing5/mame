
var imgUrl = 'http://proposal.xingwu.me/images/wx.jpg';
var lineLink = 'http://proposal.xingwu.me';
var descContent = "没想到伍行求婚的对象竟然是...？朋友们进来点个祝福吧:)";
var shareTitle = '程序员有特别的求婚姿势：伍行向她求婚啦，进来点个祝福吧！';
var appid = '';

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": appid,
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
           //_report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": descContent,
        "url": lineLink,
    }, function(res) {
        //_report('weibo', res.err_msg);
    });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
    });
}, false);