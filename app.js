//app.js
require("./common/runtime.js");
require("./common/vendor.js");
require("./common/main.js");
App({
  globalData: {
    userInfo: null,
    openid: "",
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    // host: "http://119.29.196.165:8081",
    // chathost: "http://47.112.99.56:8011/imserver/",
    chathost: "ws://121.37.156.210:8011/imserver/",
    host: "http://121.37.156.210:8081",
    // chathost: "ws://localhost:8011/imserver/",
    SocketTask: "",
    socketOpen: false,
  },
  onLaunch: function () {
    this.cloudinit();
    this.dowait();
  },
  onShow(options) {
    // Do something when show.
  },
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    console.log(msg);
  },
  async dowait() {
    await this.getopenid();
    await this.getUserInfo();
    if (!this.globalData.socketOpen) {
      //首次进入页面socket没有打开 启动socket
      await this.websocketconnect(this);
      this.websocketserver();
    }
  },
  //初始化云服务
  cloudinit() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "school-n97ya",
        traceUser: true,
      });
    }
  },
  // 获取用户openid
  getopenid() {
    var that = this;
    console.log("going getopenid");
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "openapi",
        success: function (res) {
          that.globalData.openid = res.result.openid;
          resolve(that.globalData.openid);
        },
        fail: function (res) {
          console.log("失败:" + res);
          reject(res);
        },
      });
    });
  },
  // 获取用户信息
  getUserInfo() {
    var that = this;
    console.log("going getUserInfo");
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting["scope.userInfo"]) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo;
                console.log(res.userInfo);
                resolve(that.globalData.userInfo);
              },
              fail(err) {
                console.log(err);
                reject(err);
              },
            });
          }
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
  // 连接websocket服务器
  websocketconnect(tha) {
    var that = tha;
    // 创建Socket
    return new Promise((resolve, reject) => {
      console.log(that.globalData.openid);
      that.globalData.SocketTask = wx.connectSocket({
        url: that.globalData.chathost + that.globalData.openid,
        data: "data",
        header: {
          "content-type": "application/json",
        },
        method: "post",
        success: function (res) {
          that.globalData.socketOpen = true;
          console.log("WebSocket连接创建", res);
          resolve(res);
        },
        fail: function (err) {
          console.log(err);
          reject(err);
        },
      });
    });
  },
  // websocket监听
  websocketserver() {
    var that = this;
    that.globalData.SocketTask.onOpen((res) => {
      that.globalData.socketOpen = true;
      console.log("监听 WebSocket 连接打开事件。", res);
    });
    that.globalData.SocketTask.onClose((onClose) => {
      //如果websocket关闭了  就重新连接
      console.log("监听 WebSocket 连接关闭事件。", onClose);
      that.globalData.socketOpen = false;
      this.websocketconnect(that);
    });
    that.globalData.SocketTask.onError((onError) => {
      console.log("监听 WebSocket 错误。错误信息", onError);
      that.globalData.socketOpen = false;
    });
    that.globalData.SocketTask.onMessage((onMessage) => {
      //监听WebSocket接受到服务器的消息事件
      // console.log(onMessage);
      // msgList.push({
      //   speaker: "others",
      //   contentType: "text",
      //   content: onMessage.data.message,
      // });
      // this.setData({
      //   msgList,
      //   toView: "msg-" + (msgList.length - 1),
      // });
      // console.log(
      //   "监听WebSocket接受到服务器的消息事件。服务器返回的消息",
      //   onMessage.data
      // );
    });
  },
});
