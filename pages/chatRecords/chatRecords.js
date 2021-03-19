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
    chat: null,
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
    console.log("user"+e.currentTarget.dataset.item.userid)
    console.log(e.currentTarget.dataset.item.username)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /*  wx.setStorage({
      data: [
        {
          userid: "1",
          username: "叶勇",
          message: "3",
          isread: false,
        },
        {
          userid: "2",
          username: "钟柯杰",
          message: "你好",
          isread: false,
        },
      ],
      key: "chat",
    }); */
    /*  wx.setStorage({
      data: [
        {
          speaker: "others",
          message: "你好，我是叶勇！",
          time: "2020-2-12 20:21",
          isread: true,
        },
        {
          speaker: "our",
          message: "你好，我是陈霖！",
          time: "2020-2-12 20:22",
          isread: true,
        },
        {
          speaker: "others",
          message: "好久不见了，甚是想念！",
          time: "2020-2-13 19:11",
          isread: false,
        },
      ],
      key: "1",
      success(res) {
        console.log("缓存更新成功");
      },
      fail(err) {
        console.log(err);
      },
    }); */
    wx.getStorage({
      key: "chat",
      success(res) {
        that.setData({
          chat: res.data,
        });
        console.log(that.data.chat);
      },
      fail() {
        console.log("缓存为空，没有chat的key");
      },
    });
    this.websocketserver();
  },
  /**
   * 生命周期函数--监听页面显示  启动socket
   */
  lxr:function(){
    wx.navigateTo({
      url: '../lxr/lxr'//实际路径要写全
    })
  },
  zy:function(){
    wx.navigateTo({
      url: '../zhuye/index'//实际路径要写全
    })
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: "chat",
      success(res) {
        that.setData({
          chat: res.data,
        });
      },
      fail(err) {
        console.log(err);
      },
    });
  },
  onReady: function () {
    //监听页面初次渲染完成 (一个页面只有一次)打开webSocket监听
  },
  //返回上一月
  
  toBackClick: function () {
    wx.navigateBack({});
  },
  websocketserver() {
    var that = this;
    console.log("进入websocketserver函数");
    app.globalData.SocketTask.onMessage((message) => {
      /*message的消息格式为：
        {"fromUserId":"1",
        "message":"哈哈哈哈",
        "username":"叶勇",
        "toUserId":"off9p5H3dGHTLwC3DNqa87dxsCxc"}
      */
      console.log(JSON.parse(message.data));
      console.log(JSON.parse(message.data).message);
      var fromUserId = JSON.parse(message.data).fromUserId;
      var username = JSON.parse(message.data).username;
      var message = JSON.parse(message.data).message;
      //如果是没有缓存的用户就进入下面这个循环
      if (that.data.chat == null) {
        /**进入表示用户在chat中不存在，所以要进行一下操作
         *  1、在chat数组中增加该用户对象
         *  2、在缓存中新建该key、value，key为该用户的openid，value为下面这种格式
         *  openid:[{
         *    {message:"你好",
         *    time:"2020-2-12 20:21",
         *    isread:"false"}]
         * */
        console.log("进入chat的初始化代码块");
        let newchat = that.data.chat;
        newchat = [];
        var a = {
          userid: fromUserId,
          username: username,
          usercion: "",
          message: message,
          isread: false,
        };
        newchat.push(a);
        console.log(newchat);
        wx.setStorage({
          data: newchat,
          key: "chat",
          success(res) {
            that.setData({
              chat: newchat,
            });
          },
          fail(err) {},
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
                speaker: "others",
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
                speaker: "others",
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
        });
      } else {
        var ishave = null;
        for (var i = 0; i < that.data.chat.length; i++) {
          console.log("进入循环");
          if (that.data.chat[i].userid == fromUserId) {
            ishave = i;
            /**
             *进入这个if表示该用户在chat中存在，所以需要进行下面几个操作
             *1、现在需要的就是在这个函数原有的key对应的value后面添加消息，增加的消息类似下面的格式
             {   speaker:"others",
                  message:"你好",
                 time:"2020-2-12 20:21",
                 isread:"false"}
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
                  speaker: "others",
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
                    speaker: "others",
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
            let newchat = that.data.chat;
            newchat[i].message = message;
            newchat[i].isread = false;
            wx.setStorage({
              data: newchat,
              key: "chat",
              success(res) {
                console.log(
                  "chat数组中" + newchat[i].username + "的最新消息更新成功"
                );
                that.setData({
                  chat: newchat,
                });
              },
              fail(err) {
                console.log(
                  "chat数组中" + newchat[i].username + "的最新消息更新失败"
                );
              },
            });
            break;
          }
        }
        if (ishave == null) {
          /**进入这个else表示用户在chat中不存在，所以要进行一下操作
           *  1、在chat数组中增加该用户对象
           *  2、在缓存中新建该key、value，key为该用户的openid，value为下面这种格式
           *  openid:[{
           *    {message:"你好",
           *    time:"2020-2-12 20:21",
           *    isread:"false"}]
           * */
          console.log("ishave的值为：" + ishave);
          let newchat = that.data.chat;
          var a = {
            userid: fromUserId,
            username: username,
            usercion: "",
            message: message,
            isread: false,
          };
          newchat.push(a);
          wx.setStorage({
            data: newchat,
            key: "chat",
            success(res) {
              console.log("chat数组中的最新消息更新成功");
              that.setData({
                chat: newchat,
              });
            },
            fail(err) {
              console.log("chat数组中的最新消息更新失败");
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
                  speaker: "others",
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
                  speaker: "others",
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
          });
        }
      }
    });
  },
});
