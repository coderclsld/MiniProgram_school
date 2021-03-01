// chatRecords/chatRecords.js
const app = getApp();
/**
 * 初始化数据
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chat: [],
    // list: [
    //   {
    //     userid: "1",
    //     username: "陈霖",
    //     usericon:
    //       "https://thirdwx.qlogo.cn/mmopen/vi_32/qLW4XkMqyBdaia8ltYRB3OPb6icZSIFdD0ib7",
    //   },
    // ],
    // list: [
    //   {
    //     message: "你好",
    //     time: "2020-2-12 20:21",
    //     isread: false,
    //   },
    //   {
    //     message: "hello",
    //     time: "2020-2-12 20:22",
    //     isread: false,
    //   },
    // ],
  },
  enterChatting: function (e) {
    wx.navigateTo({
      url:
        "/pages/chatting/chatting?userid=" +
        e.currentTarget.dataset.item.userid +
        "&username=" +
        e.currentTarget.dataset.item.username,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.setStorage({
    //   data: that.data.list,
    //   key: "1",
    //   success(res) {
    //     console.log(res);
    //   },
    //   fail(err) {
    //     console.log(err);
    //   },
    // });
    wx.getStorage({
      key: "chat",
      success(res) {
        console.log(res.data);
        that.setData({
          chat: res.data,
        });
      },
    });
    this.websocketserver();
  },
  /**
   * 生命周期函数--监听页面显示  启动socket
   */
  onShow: function () {
    var that = this;
    /* let i = 0;
    request.get('/loadMessageByUser',{addressee: this.data.otherUserOpenid}).then(res => {  
      //切换到前台时 发一次request请求，聊天记录
      res.data.forEach((item) => {
        if (this.data.thisUserOpenid == item.sender) {
          this.setData({
            ['msgList['+i+']'] : {
              speaker: 'our',
              contentType: 'text',
              content: item.content
            }
          })
        } else {
          this.setData({
            ['msgList['+i+']'] : {
              speaker: 'others',
              contentType: 'text',
              content: item.content
            }
          })
        }
        i++;
      })
    })*/
  },
  onReady: function () {
    //监听页面初次渲染完成 (一个页面只有一次)打开webSocket监听
  },
  //返回上一月
  toBackClick: function () {
    wx.navigateBack({});
  },
  websocketserver() {
    console.log("进入websocketserver函数");
    app.globalData.SocketTask.onMessage((message) => {
      /*
    {"fromUserId":"1",
    "message":"哈哈哈哈",
    "toUserId":"off9p5H3dGHTLwC3DNqa87dxsCxc"}
    */
      console.log(message.data);
      console.log(JSON.parse(message.data).message);
      var fromUserId = JSON.parse(message.data).fromUserId;
      /**
       * {
       *  userid:"1",
       *  username:"陈霖",
       *  usericon:"",
       * }
       *
       * openid:{
       * {message:"你好",
       *  time:"2020-2-12 20:21",
       *  isread:"false"},
       * {}}
       *
       *
       */
    });
  },
});
