Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    treeData: [{
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

  /**
   * 生命周期函数--监听页面加载
   */
  tapItem: function (e) {
    console.log('index接收到的itemid: ' + e.detail.itemid);
  },
  onLoad: function (options) {
    var that = this
    // console.log(this.data.treeData)
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