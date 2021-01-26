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
  answer_id:"",
  answer:[],
  question_id:"",
  question:[]
  },
  //事件处理函数
  toQuestion: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function (option){
    this.setData({
      answer_id:option.answer_id,
      question_id:option.question_id
    })
    var that = this
    console.log(this.data.answer_id)
    wx.request({
      url: app.globalData.host+'/getAnswerById',
      data:{
        answer_id:this.data.answer_id
      },
      success(res){
        that.setData({
          answer:res.data
        })
        console.log(that.data.answer)
      },
      fail(err){
        console.log(err)
      }
    })
    wx.request({
      url: app.globalData.host+'/selectQuestion',
      data:{
        question_id:this.data.question_id
      },
      success(res){
        that.setData({
          question:res.data
        })
      },
      fail(err){
        console.error(err)
      }
    })
  },
  zangtong(){
    let that = this
    wx.request({
      url: app.globalData.host+'/addZang',
      data:{
        answer_id:this.data.answer_id
      },
      success(res){
        console.log(res.data)
        that.setData({
          "answer.zang":res.data
        })
      },
      fail(req){
        console.error(err)
      }
    })
  }
})
