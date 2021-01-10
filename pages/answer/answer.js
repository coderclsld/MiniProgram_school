//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    userInfo: {},
    list:[{
      name: "陈霖",
      text: "挺不错的",
      ppname: null,
      children: [{
        text: '这有啥不错的，也就一般般吧',
        name: "钟科杰",
        ppname: "陈霖",
        children: [{
          name: "叶勇",
          text: "你懂啥",
          ppname: "钟科杰",
          children: [{
            name: "科年",
            text: "傻逼叶勇",
            ppname: "叶勇",
            children: [{
              name: "叶勇",
              text: "傻逼叶勇",
              ppname: "科年",
              children: null
            }]
          }]
        }, {
          name: "钟科杰",
          text: "就你懂？",
          ppname: "叶勇",
          children: null
        }]
      }]
    },
    {
      name: "宝哥",
      text: "辣鸡",
      children: null
    },
  ],
  },
  //事件处理函数
  toQuestion: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  tapName: function(event){
    console.log(event)
  }
})
