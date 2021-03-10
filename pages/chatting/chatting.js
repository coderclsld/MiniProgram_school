const app = getApp();
var inputVal = "";
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth; //屏幕的高度和宽度
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var socketOpen = false;
var frameBuffer_Data, session, SocketTask;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: windowHeight - 20 + "px",
    username: "",
    inputVal: "",
    imgUrl: "",
    userid: "",
    msgList: [],
    chat: [],
    inputVal: "",
  },
  changeOtherName: function () {
    //设置页面顶部的联系人姓名
    wx.setNavigationBarTitle({
      title: this.data.username,
    });
  },
  getUserInput: function (e) {
    //获取input输入的值并将其赋给inputVal
    this.data.inputVal = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //将传入的数据赋值给初始化数据

    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl, //用户的头像地址
      userid: options.userid, //进入页面记录发送者和接受者的id
      username: options.username, //传过来的用户姓名
    });
    this.changeOtherName();
    //得到缓存中初始化的mylist
    wx.getStorage({
      key: this.data.userid,
      success(res) {
        //成功的话说明有这个key，就说明在缓存中可能有该id的聊天记录
        that.setData({
          msgList: res.data,
        });
      },
      fail(err) {
        //没有的话说明，在缓存中没有该id的聊天记录，现在还没有必要缓存
        //可以在onmessage或者是我们要发消息过去的时候再在缓存中存储它的信息
        console.log("该用户在缓存里面没有它的聊天记录");
      },
    });
    //初始化成功后我们就要对socket实时进行监听，如果有消息进来我们就读缓存
    app.globalData.SocketTask.onMessage((message) => {
      console.log(message.data);
      var fromUserId = JSON.parse(message.data).fromUserId;
      console.log(fromUserId);
      if (fromUserId == that.data.userid) {
        let a = {
          speaker: "others",
          message: JSON.parse(message.data).message,
          time: new Date(),
          isread: true,
        };
        that.data.msgList.push(a);
        var newList = that.data.msgList;
        console.log(newList);
        that.setData({
          msgList: newList,
        });
        wx.getStorage({
          key: "chat",
          success(res) {
            that.setData({
              chat: res.data,
            });
            for (let i = 0; i < that.data.chat.length; i++) {
              if (that.data.chat[i].userid == that.data.userid) {
                that.data.chat[i].isread = true;
              }
            }
            wx.setStorage({
              data: that.data.chat,
              key: "chat",
              success(res) {
                console.log("未读消息清空成功！");
              },
              fail(err) {
                console.log("未读消息清空失败！");
              },
            });
          },
          fail(err) {},
        });
        this.setData({
          toView: "toView",
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示  启动socket
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: "chat",
      success(res) {
        that.setData({
          chat: res.data,
        });
        for (let i = 0; i < that.data.chat.length; i++) {
          if (that.data.chat[i].userid == that.data.userid) {
            that.data.chat[i].isread = true;
          }
          console.log(that.data.chat);
        }
        wx.setStorage({
          data: that.data.chat,
          key: "chat",
          success(res) {
            console.log("未读消息清空成功！");
          },
          fail(err) {
            console.log("未读消息清空失败！");
          },
        });
      },
      fail(err) {},
    });
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
    this.setData({
      toView: "toView",
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 获取聚焦
   */
  focus: function (e) {
    this.setData({
      toView: "msg-" + (msgList.length - 1),
    });
    console.log("获取焦点被执行了");
  },
  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      toView: "msg-" + (msgList.length - 1),
    });
    console.log("失去焦点被执行了。。。");
  },
  submitTo: function () {
    var that = this;
    //点击了发送按钮进行的操作
    if (app.globalData.socketOpen) {
      sendSocketMessage(this.data.inputVal, this);
    }
    var list = this.data.msgList;
    var a = {
      speaker: "our",
      message: this.data.inputVal,
      time: new Date(),
      isread: true,
    };
    list.push(a);
    this.setData({
      msgList: list,
      inputVal: "",
      toView: "toView", ////发送完数据后应该还是停留在最后一行
    });
    wx.setStorage({
      data: list,
      key: that.data.userid,
      success(res) {
        console.log("我主动发出的信息已存入缓存中");
      },
      fail(er) {
        console.log("我主动发出的信息未存入缓存");
      },
    });
  },
  upImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        console.log(res);
        that.data.imgUrl = res.tempFilePaths[0];
        if (socketOpen) {
          console.log("test");
          // 如果打开了socket就发送数据给服务器
          sendSocketMessage(this.data.imgUrl);
        }
        console.log("uploadFile");
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: "file",
          url: "http://localhost:8000/upload",
          formData: {
            user: "落花人独立",
          },
          header: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
          complete: (res) => {
            console.log(res);
          },
        });
        console.log("uploadFile完成");
      },
    });
  },
  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    if (socketOpen) {
      console.log("test");
      // 如果打开了socket就发送数据给服务器
      sendSocketMessage(this.data.inputVal, this);
    }
    msgList.push({
      speaker: "our",
      contentType: "text",
      content: e.detail.value,
    });
    inputVal = "";
    this.setData({
      msgList,
      inputVal,
      toView: "toView", ////发送完数据后应该 还是停留在最后一行
    });
  },

  //返回上一月
  toBackClick: function () {
    wx.navigateBack({});
  },
});
//通过 WebSocketTask连接发送数据，在创建Socket时wx.connectSocket返回WebSocketTask，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg, tha) {
  var that = tha;
  //定制发送的格式
  var tmp = {
    message: msg,
    username: that.data.username,
    toUserId: that.data.userid,
  };
  console.log("通过 WebSocket 连接发送数据", JSON.stringify(tmp));
  app.globalData.SocketTask.send(
    {
      data: JSON.stringify(tmp),
    },
    function (res) {
      console.log("已发送", res);
      //发送成功的话就将发送的消息记录到缓存里面
      wx.getStorage({
        key: that.data.userid,
        success(res) {
          //成功说明该id在缓存中存在，即直接在该value后面添加消息记录
          var list = res.data;
          let a = {
            speaker: "our",
            message: msg,
            time: new Date(),
            isread: true,
          };
          list.push(a);
          wx.setStorage({
            data: list,
            key: that.data.userid,
            success(res) {
              console.log("新的聊天记录存入缓存成功");
            },
            fail(err) {
              console.log("新的聊天记录存入缓存失败");
            },
          });
        },
        fail(err) {
          //失败则说明该id在缓存中不存在，那么就直接在缓存中创建新的聊天记录消息
          var list = {
            speaker: "our",
            message: msg,
            time: new time(),
            isread: true,
          };
          wx.setStorage({
            data: list,
            key: that.data.userid,
            success(res) {
              console.log("该id在缓存中创建成功");
            },
            fail(err) {
              console.log("该id在缓存中创建失败");
            },
          });
        },
      });
    }
  );
}
