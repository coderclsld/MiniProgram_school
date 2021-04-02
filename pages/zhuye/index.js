// index.js
// 获取应用实例
const app = getApp()
// yeyon:{12,af}
Page({
  data: {
    lx: null,
    lxlist: [],
    list:[],
    bg1:"",
    bg2:"",
    bg3:"",
    gz:"1",
    motto: 'Hello World',
    userid:"",
    username:"",
    avatarUrl:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 查看图片 但是图片没有在数据库中
  bindViewTap() {
      wx.previewImage({
      urls:[this.data.avatarUrl]
      }) 
  },
  onLoad:function(options) {
    var that = this;
    this.setData({
      userid:options.userid,
      username:options.username
    })
    console.log(this.data.userid)
    wx.getStorage({
      key: "lx",
      success(res) {
        for(var i=0;i<res.data.length;i++){
          if(that.data.userid==res.data[i].userid){
            console.log("123")
            console.log(res.data[i].userid)
            that.setData({
            gz:"2"
            })
        }
      }
      },
      fail(err) {
        console.log("shiba1i")
      },
    });
    wx.request({
      url: app.globalData.host + "/getUserById",
      data:{
        userid:this.data.userid
      },
      success(res) {
        console.log(res.data)   
        that.setData({
          list:res.data,
          avatarUrl:res.data.avatarUrl
        })
      },
      fail(){
        console.log("shibai")
      }
      })    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    that.setData({
      bg1:"rgb(255, 125, 19)",
      bg2:"#ffffff",
      bg3:"#ffffff",
    })
  },
  enterChatting: function (e) {
    wx.navigateTo({
      url:
        "/pages/chatting/chatting?userid=" +
        this.data.userid +
        "&username=" +
        this.data.username,
    });

  },
  backg1:function(){
    var that=this
    that.setData({
      bg1:"rgb(255, 125, 19)",
      bg2:"#ffffff",
      bg3:"#ffffff"
    })
    console.log(this.data.list)
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
        userid: that.data.userid,
        username: that.data.username,
      };
      newlx.push(b);
      console.log("guangzhuchenggong");
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
        console.log("quxiaoguanzhu")
        that.setData({
          lx:null,
        })
      }
    })


  }
  
})
