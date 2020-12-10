// pages/shequ/shequ.js
let _page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis: true,
    list: [],
  },
  ellipsis() {
         _page = this;
         let value = !this.data.ellipsis;
         _page.setData({
           ellipsis: value
         })},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://172.16.169.3:8000/aaa',
      success(e) {
        console.log(e.data)
        that.setData({
          list:e.data
        })
        console.log(that.data.list)
      },
      fail() {
        console.log("失败")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})