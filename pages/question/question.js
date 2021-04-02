//answer.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    userInfo: {},
    question_id:"",
    answer:[],
    question:[],
    show: false,
    huida:""
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  huida(){
      if(!this.data.show){
        this.setData({
          show:true,
        })
      }else{
        this.setData({
          show:false,
        })
      }
  },
  onLoad: function (option) {
    var that = this
    this.setData({
      question_id:option.question_id
    })
    wx.cloud.callFunction({
      name: 'openapi',
      success: function (res) {
        console.log('openid', res.result.openid)
        that.setData({
          openid:res.result.openid
        })
        app.globalData.openid = res.result.openid   
        console.log(app.globalData.openid)
      },
      fail: function (res) {
        console.log("失败:" + res)
      } 
    })
    console.log('question_id:'+this.data.question_id)
    wx.request({
      url: app.globalData.host+'/getAnswerByQId',
      data:{
        question_id:this.data.question_id
      },
      success(res){
        that.setData({
          answer:res.data
        })
        console.log(res.data)
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
        console.log(that.data.question)
      },
      fail(err){
        console.error(err)
      }
    })
  },
  getTextValue(e){
    console.log(e.detail)
    this.setData({
      huida:e.detail.value
    })
  },
  tapName: function(event){
    console.log(event)
  },

  // 发布问题，获取登陆者的所有信息 同
  fabuAnswer(){
    console.log("问题："+this.data.huida)
    if(this.data.huida == ""){
      // 弹窗请填写问题
      wx.showToast({
        title: '请填写回答',
      })
      return 0
    }else{
      var openid = app.globalData.openid
      wx.request({
        url: app.globalData.host+'/addAnswer',
        data:{
          answer:this.data.huida,
          userid:openid,
          question_id:this.data.question_id,
          username:app.globalData.userInfo.nickName
        },
        success(res){

        },
        fail(err){
          console.error(err)
          wx.showToast({
            title: '您还没有登录',
          })
        }
      })
    }
    this.huida()
  }
})
