// index.js
// 获取应用实例
const app = getApp()
// yeyon:{12,af}
Page({
  data: {
    lx: null,
    lxlist: [],
    bg1:"",
    bg2:"",
    bg3:"",
    gz:"1",
    motto: 'Hello World',
    urls:"",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 查看图片 但是图片没有在数据库中
  bindViewTap() {
      wx.previewImage({
      urls:[app.globalData.userInfo.avatarUrl]
      }) 
  },
  onLoad:function(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    var that=this
    that.setData({
      bg1:"rgb(255, 125, 19)",
      bg2:"#ffffff",
      bg3:"#ffffff",
    })
    wx.getStorage({
      key: "lx",
      success(res) {
        for(var i=0;i<res.data.length;i++){
          if(app.globalData.openid==res.data[i].userid){
            console.log("123")
            console.log(res.data[i].userid)
            that.setData({
            gz:"2"
            })
        }
      }


      },
      fail(err) {},
    });
  },
  enterChatting: function (e) {
    wx.navigateTo({
      url:
        "/pages/chatting/chatting?userid=" +
        app.globalData.openid +
        "&username=" +
        app.globalData.userInfo.nickName,
    });

  },
  backg1:function(){
    var that=this
    that.setData({
      bg1:"rgb(255, 125, 19)",
      bg2:"#ffffff",
      bg3:"#ffffff"
    })
  },
  backg2:function(){
    var that=this
    that.setData({
      bg1:"#ffffff",
      bg2:"rgb(255, 125, 19)",
      bg3:"#ffffff"
    })
  },
  backg3:function(){
    var that=this
    that.setData({
      bg1:"#ffffff",
      bg2:"#ffffff",
      bg3:"rgb(255, 125, 19)"
    })
  },
  gzz:function(){
    var that=this
    if (that.data.lx == null) {
    that.setData({
      gz:"2"
    })
  }
      let newlx = that.data.lx;
      newlx=[];
      var b={
        userid: app.globalData.openid,
        username: app.globalData.userInfo.nickName,
      };
      newlx.push(b);
      console.log(newlx);
      wx.setStorage({
        data: newlx,
        key: "lx",
        success(res) {
          that.setData({
            lx: newlx,
          });
        },
        fail(err) {},
      });
    
  },
  gzzz:function(){
    var that=this
    if (that.data.gz=="2") {
      that.setData({
        gz:"1",
      })
    }
    wx.removeStorage({
      key:"lx",
      success(res){
        console.log("chenggong")
        that.setData({
          lx:null,
        })
      }
    })


  }
  
})
