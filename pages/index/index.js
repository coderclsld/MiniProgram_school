//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[],
    i:'0',
    ii:'',
    userInfo: {},
    hasUserInfo: false,
    userid:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userid:app.globalData.openid,
        hasUserInfo: true
      })
      console.log(this.data.userInfo)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo:app.globalData.userInfo,
          userid:app.globalData.openid,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(this.data.userid)
    console.log(this.data.userInfo.avatarUrl)
    console.log(this.data.userInfo.nickName)
  },
  hddx:function(e){
    var that = this;
    wx.request({
      url: app.globalData.host + "/getUserById",
      data:{
        userid:'off9p5E70cxb7fxIUsbhpw4dgKwY'
      },
      success(res) {
        console.log(res.data)   
        that.setData({
          list:res.data,
        })
      },
      fail(){
        console.log("shibai")
      }
      })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },
  tuichudenglu:function(){
    var that=this;
    if(that.data.i=='1'){
    that.data.i='0'
    }
    that.setData({ii:that.data.i})
  },
  //传送个人信息
  cssj:function(){
    wx.request({
      url: app.globalData.host + "/adduserid",
      data: {
        userid: this.data.userid,
        nickname:this.data.userInfo.nickName,
        avatarUrl:this.data.userInfo.avatarUrl,
        genderclass:null,
        gender:0,
        studentNum:0,
      },
      success(res) {
        console.log("成功")
      },
      fail(err) {
        console.log("失败")
      },
    });
  },
  denglu:function(){
    var that=this;
    if(that.data.i=='0'){
    that.data.i='1'
    }
    that.setData({ii:that.data.i})
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(700).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 500)
  },
  showshadow:function(e){
  
    if (this.data.chooseSize == false) {
      this.chooseSezi()
    } else {
      this.hideModal()
    }
},

// 动画函数
chooseSezi: function (e) {
  // 用that取代this，防止不必要的情况发生
  var that = this;
  // 创建一个动画实例
  var animation = wx.createAnimation({
    // 动画持续时间
    duration: 500,
    // 定义动画效果，当前是匀速
    timingFunction: 'linear'
  })
  // 将该变量赋值给当前动画
  that.animation = animation
  // 先在y轴偏移，然后用step()完成一个动画
  animation.translateY(1000).step()
  // 用setData改变当前动画
  that.setData({
    // 通过export()方法导出数据
    animationData: animation.export(),
    // 改变view里面的Wx：if
    chooseSize: true
  })
  // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
  setTimeout(function () {
    animation.translateY(0).step()
    that.setData({
      animationData: animation.export(),
      clearcart: false
    })
  }, 100)
},
// 隐藏
hideModal: function (e) {
  var that = this;
  var animation = wx.createAnimation({
    duration: 500,
    timingFunction: 'linear'
  })
  that.animation = animation
  animation.translateY(700).step()
  that.setData({
    animationData: animation.export()
  })
  setTimeout(function () {
    animation.translateY(0).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: false
    })
  }, 500)
},
})
