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
    chatlist: [],
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
      /*message的消息格式为：
        {"fromUserId":"1",
        "message":"哈哈哈哈",
        "username":"叶勇",
        "toUserId":"off9p5H3dGHTLwC3DNqa87dxsCxc"}
      */
      console.log(message.data);
      console.log(JSON.parse(message.data).message);
      var fromUserId = JSON.parse(message.data).fromUserId;
      var message = JSON.parse(message.data).message;
      var username = JSON.parse(message.data).username;
      /*
       *遍历看chat看有没有此项，有就直接在该key的缓存value加上记录
       *没有的话就新建立一个key，然后用该key的缓存value加上记录
       */
      for (var i = 0; i < this.data.chat.lenght; i++) {
        if (this.data.chat[i].userid == fromUserId) {
          /**
           *进入这个if表示该用户在chat中存在，所以需要进行下面几个操作
           *1、现在需要的就是在这个函数原有的key对应的value后面添加消息，增加的消息类似下面的格式
           *{   message:"你好",
           *    time:"2020-2-12 20:21",
           *    isread:"false"}
           *2、在chat中更新该对象的最新消息,chat中的对象类似于下面格式
           *{ userid:"1",
           *  username:"陈霖",
           *  usercoin:"",
           *  message:"hello"}
           */
          wx.getStorage({
            key: fromUserId,
            success(res) {
              var list = res.data;
              let newlist = {
                message: message,
                time: new Date(),
                isread: "false",
              };
              list.push(newlist);
              wx.setStorage({
                data: list,
                key: fromUserId,
                success(res) {
                  console.log("更新" + fromUserId + "的消息记录成功");
                },
                fail(err) {
                  console.log("更新" + fromUserId + "的消息记录失败");
                },
              });
            },
            fail(err) {
              let list = [
                {
                  message: message,
                  time: new Date(),
                  isread: "false",
                },
              ];
              wx.setStorage({
                data: list,
                key: fromUserId,
                success(res) {
                  console.log(
                    "创建新的key：" + fromUserId + "，values为：" + res
                  );
                },
                fail(err) {
                  console.log("创建新的key失败！");
                },
              });
            },
          });
          let newchat = this.data.chat;
          newchat[i].message = message;
          wx.setStorage({
            data: newchat,
            key: "chat",
            success(res) {
              console.log(
                "chat数组中" + newchat[i].username + "的最新消息更新成功"
              );
            },
            fail(err) {
              console.log(
                "chat数组中" + newchat[i].username + "的最新消息更新失败"
              );
            },
          });
        } else {
          /**进入这个else表示用户在chat中存在，所以要进行一下操作
           *  1、在chat数组中增加该用户对象
           *  2、在缓存中新建该key、value，key为该用户的openid，value为下面这种格式
           *  openid:[{
           *    {message:"你好",
           *    time:"2020-2-12 20:21",
           *    isread:"false"}]
           * */
          let newchat = this.data.chat;
          a = {
            userid: fromUserId,
            username: username,
            usercion: "",
            message: message,
          };
          newchat.push(a);
          wx.setStorage({
            data: newchat,
            key: "chat",
            success(res) {
              console.log(
                "chat数组中" + newchat[i].username + "的最新消息更新成功"
              );
            },
            fail(err) {
              console.log(
                "chat数组中" + newchat[i].username + "的最新消息更新失败"
              );
            },
          });

          wx.getStorage({
            key: fromUserId,
            success(res) {
              /**
               * 成功说明有这个key但是在chat中没有记录，可能是用户删除了该聊天，
               * 所以直接用最新的消息覆盖之前的消息记录即可
               */
              let a = [
                {
                  message: message,
                  time: new Date(),
                  isread: false,
                },
              ];
              wx.setStorage({
                data: a,
                key: fromUserId,
                success(res) {
                  console.log("用户" + fromUserId + "的消息记录更新成功");
                },
                fail(err) {
                  console.log("用户" + fromUserId + "的消息记录更新失败");
                },
              });
            },
            fail(err) {
              /**
               * 失败证明该用户缓存中没有这个key，在chat中也没有记录
               * 所以现在就是要创建这个key和在chat中增加它的信息
               */
              let a = [
                {
                  message: message,
                  time: new Date(),
                  isread: false,
                },
              ];
              wx.setStorage({
                data: a,
                key: fromUserId,
                success(res) {
                  console.log("用户" + fromUserId + "的消息记录更新成功");
                },
                fail(err) {
                  console.log("用户" + fromUserId + "的消息记录更新失败");
                },
              });
              let newchat = this.data.chat;
              a = {
                userid: fromUserId,
                username: username,
                usercion: "",
                message: message,
              };
              newchat.push(a);
              wx.setStorage({
                data: newchat,
                key: "chat",
                success(res) {
                  console.log(
                    "chat数组中" + newchat[i].username + "的最新消息更新成功"
                  );
                },
                fail(err) {
                  console.log(
                    "chat数组中" + newchat[i].username + "的最新消息更新失败"
                  );
                },
              });
            },
          });
        }
      }
    });
  },
});
