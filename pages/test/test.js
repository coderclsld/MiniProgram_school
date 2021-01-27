//index.js
var util = require("../../utils/util.js");
const app = getApp();
Page({
  data: {
    list:[],
    shuzu:[],
    shuzu1:[],
    show: false,
    count: 0,
    questions: [],
    wenti: "",
    content: "",
    openid: app.globalData.openid,
  },
  fabu() {
    console.log(app.globalData.userInfo);
    if (!this.data.show) {
      this.setData({
        show: true,
      });
    } else {
      this.setData({
        show: false,
      });
    }
  },
  onLoad() {
    var that = this;
    this.getQuestion();
    console.log(app.globalData.openid);
    wx.cloud.callFunction({
      name: "openapi",
      success: function (res) {
        console.log("openid", res.result.openid);
        that.setData({
          openid: res.result.openid,
        });
        app.globalData.openid = res.result.openid;
        console.log(app.globalData.openid);
      },
      fail: function (res) {
        console.log("失败:" + res);
      },
    });
  },
  getQuestion() {
    var that = this;
    wx.request({
      url: app.globalData.host + "/getQuestion",
      success(res) {
        that.setData({
          questions: res.data,
        });
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          let s = new Promise((resolve, reject) => {
          wx.request({
            url: app.globalData.host + "/getAnswerByQId",
            data: {
              question_id: res.data[i].question_id,
            },
            success(req) {
              resolve(req.data[0])
            },fail(err){
              reject(err)
            }
          });
          })
          that.data.shuzu.push(s);
          console.log(that.data.shuzu)
          that.setData({
            shuzu1: that.data.shuzu,
          });
        };
        that.data.list.length = that.data.shuzu1.length;
        for (let j = 0; j < that.data.shuzu1.length;j++){
          that.data.shuzu1[j].then(v=>{
            that.data.list[j] = v;
            that.setData({
            list: that.data.list,
          });
        })
      }
      },
    });
  },
  getInputValue(e) {
    console.log(e.detail.value);
    this.setData({
      wenti: e.detail.value,
    });
  },
  getTextValue(e) {
    console.log(e.detail.value);
    this.setData({
      content: e.detail.value,
    });
  },
  fabuQuestion() {
    console.log("问题：" + this.data.wenti + "描述：" + this.data.content);
    if (this.data.wenti == "") {
      // 弹窗请填写问题
      wx.showToast({
        title: "请填写问题",
      });
      return 0;
    } else if (this.data.content == "") {
      // 弹窗请填写描述
      wx.showToast({
        title: "请填写描述",
      });
      return 0;
    } else {
      var openid = app.globalData.openid;
      wx.request({
        // 上传问题和描述到数据库
        url: app.globalData.host + "/addQuestion",
        data: {
          title: this.data.wenti,
          content: this.data.content,
          userid: openid,
          username: app.globalData.userInfo.nickName,
        },
        success(res) {
          wx.showToast({
            title: "发布成功",
          });
        },
        fail(err) {
          wx.showToast({
            title: "您还没有登录",
          });
        },
      });
    }

    this.fabu();
  },
});

// onLoad: function (options) {
//   this.init();
// },
// async init () {
//   await api.showLoading()
//   await this.getQusetion()// 请求问题数据
//   await this.getAnswer()//请求回答数据
//   await api.hideLoading()
// },
// getQusetion(){
//   return new Promise((resolve, reject) => {
//     api.getData('http://localhost:8081/getQuestion', {
//     }).then((res) => {
//       this.setData({
//         questions: res.data
//       })
//       console.log(res)
//       resolve()
//     })
//       .catch((err) => {
//         console.error(err)
//         reject(err)
//       })
//   })
// },
// getAnswer(){
//   return new Promise((resolve, reject) => {
//     api.getData('http://localhost:8081/getAnswerById?question_id=1', {
//     }).then((res) => {
//       var an = "that.data.questions[2].answer"
//       this.setData({
//         [an]: res.data
//       })
//       console.log(this.data.questions)
//       resolve()
//     }).catch((err) => {
//         console.error(err)
//         reject(err)
//       })
//   })
// },
