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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: './user-unlogin.png',
    logged: false,
    takeSession: false,
    requestResult: '', // 请求结果
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that =this
    wx.getStorage({
      key: "userInfo",
      success(res) {
        that.setData({
          userInfo: res.data,
          hasUserInfo:true
        });
        app.globalData.userInfo = res.data
        console.log(res.data)
      },
      fail() {
        that.setData({
          hasUserInfo:false
        });
      },
    });
    this.setData({
      userid:app.globalData.openid
    })
    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     userid:app.globalData.openid,
    //     hasUserInfo: true
    //   })
    //   console.log(this.data.userInfo)
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo:app.globalData.userInfo,
    //       userid:app.globalData.openid,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    // console.log(this.data.userid)
    // console.log(this.data.userInfo.avatarUrl)
    // console.log(this.data.userInfo.nickName)

  }, getUI(e) { //点击授权登录时产生的监听事件
    var t = this // 定义 变量 t var 可以定义全局变量 let 定义局部变量
    console.log('获取头像昵称', e) // console.log 打印输出
    wx.getUserProfile({ //获取用户信息。页面产生点击事件（例如 button 上 bindtap 的回调中）后才可调用，每次请求都会弹出授权窗口，用户同意后返回 userInfo,用于替换 wx.getUserInfo
      lang: 'zh_CN', //显示用户信息的语言
      desc: '用于在后台更好的识别您的身份', //声明获取用户个人信息后的用途
      success(res) { //接口调用成功的回调函数
        t.setData({// 更新数据和给字段赋值
          hasUserInfo: true,  
        })
        app.globalData.userInfo = res.userInfo
        console.log('获取', res)
        wx.setStorageSync('userInfo', res.userInfo); // userInfo 本地缓存指定的 key  res.userInfo 需要存储的数据
        // wx.setStorageSync('userInfo', res.userInfo); 第一个参数为本地缓存指定的 key 
        // 第二个参数为 res.userInfo 为要需要存储的数据信息 这里要把 res.userInfo 获取到的用户信息列表，存储在userInfo 列表里面
        t.setData({ //对 userInfo 进行数据更改，赋值
            userInfo: res.userInfo, //把获取到的数据列表赋值给 userInfo 改变里面的数据
            avatarUrl: res.userInfo.avatarUrl //把头像地址赋值给 avatarUrl
          }),
          t.cssj();
          wx.switchTab({ //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 就是首页  
            //用户授权成功后就要跳转到首页导航栏
            url: "/pages/index/index",
          }); // 进入到首页后，出现消息提示窗，提示用户:'欢迎使用本小程序'的提示语
        wx.showToast({ //显示消息提示框
          image: "/static/image/success.png", //自定义图标的本地路径，image 的优先级高于 icon
          icon: "success", //显示成功图标，此时 title 文本最多显示 7 个汉字长度
          title: '欢迎使用本小程序',
          duration: 1000, //提示的延迟时间 为1s 1000ms=1s
        });
      },
      fail(err) { //接口调用失败的回调函数 用户拒绝授权登录后，出现的提示窗
        console.error(err) //打印输出错误数据
        console.error("123")
        wx.showToast({ // 拒绝登录 显示消息提示框 
          image: "/static/image/error.png",
          title: '用户拒绝授权', // 提示用户：'用户拒绝授权'
          icon: "error",
          duration: 1000 // 提示语出现时间延迟1s
        });
      }
    })
    
  },

  hddx:function(e){
    // var that = this;
    // wx.request({
    //   url: app.globalData.host + "/getUserById",
    //   data:{
    //     userid:'off9p5E70cxb7fxIUsbhpw4dgKwY'
    //   },
    //   success(res) {
    //     console.log(res.data)   
    //     that.setData({
    //       list:res.data,
    //     })
    //   },
    //   fail(){
    //     console.log("shibai")
    //   }
    //   })
  },
  onShow() { //页面显示或从后台跳回小程序时显示此页面时触发，从跳转页面返回时触发，不能传递参数
    this.setData({
      userInfo: wx.getStorageSync('userInfo') // 更新存储里面的 key ：userInfo
    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({// 更新数据和给字段赋值
          avatarUrl: res.userInfo.avatarUrl,// 更新用户图像列表
          userInfo: res.userInfo,// 更新用户列表列表信息
          hasUserInfo: true,
        })
      }
    })
  },onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
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
      // url: "http://localhost:8081/addUser",
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
