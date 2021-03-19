// pages/lxr/lxr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:"",
    lx: null,
    lxlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: "lx",
      success(res) {
        that.setData({
          lx: res.data,
        });
        console.log(that.data.lx);
      },
      fail() {
        console.log("缓存为空，没有chat的key");
      },
      
    });
  },
  dj:function(){
    var that=this
    that.setData({
      background:"#000000"
    })
  },
  sk:function(){
    var that=this
    that.setData({
      background:"#ffffff"
    })
  },
  lt:function(e){
    wx.navigateTo({
      url:
      "/pages/chatting/chatting?userid=" +
      e.currentTarget.dataset.item.userid +
      "&username=" +
      e.currentTarget.dataset.item.username,
    });
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
    var that = this;
    wx.getStorage({
      key: "lx",
      success(res) {
        that.setData({
          lx: res.data,
        });
      },
      fail(err) {
        console.log(err);
      },
    });
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