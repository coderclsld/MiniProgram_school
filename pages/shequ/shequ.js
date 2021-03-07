// pages/shequ/shequ.js
let _page;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wenti: [
      {
        name: "陈霖",
        title:
          "今天早上考四级了，我感觉我有很大几率考不过，想问一些有没有什么学习英语的捷径来帮助我读过这次磨难",
        content:
          "今天早上考四级了，我感觉我有很大几率考不过，想问一些有没有什么学习英语的捷径来帮助我读过这次磨难",
      },
      {
        name: "钟科杰",
        title:
          "我感觉我对计算机没有兴趣，总是为了不挂科，为了不交作业而去学习。",
        content:
          "我感觉我对计算机没有兴趣，总是为了不挂科，为了不交作业而去学习。",
      },
    ],
    ellipsis: true,
    list: [
      {
        name: "陈霖",
        text: "挺不错的",
        ppname: null,
        children: [
          {
            text: "这有啥不错的，也就一般般吧",
            name: "钟科杰",
            ppname: "陈霖",
            children: [
              {
                name: "叶勇",
                text: "你懂啥",
                ppname: "钟科杰",
                children: [
                  {
                    name: "科年",
                    text: "傻逼叶勇",
                    ppname: "叶勇",
                    children: [
                      {
                        name: "叶勇",
                        text: "傻逼叶勇",
                        ppname: "科年",
                        children: null,
                      },
                    ],
                  },
                ],
              },
              {
                name: "钟科杰",
                text: "就你懂？",
                ppname: "叶勇",
                children: null,
              },
            ],
          },
        ],
      },
      {
        name: "宝哥",
        text: "辣鸡",
        children: null,
      },
    ],
  },
  ellipsis() {
    _page = this;
    let value = !this.data.ellipsis;
    _page.setData({
      ellipsis: value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.request({
    //   url: "http://172.16.169.3:8000/aaa",
    //   success(e) {
    //     console.log(e.data);
    //     that.setData({
    //       list: e.data,
    //     });
    //     console.log(that.data.list);
    //   },
    //   fail() {
    //     console.log("失败");
    //   },
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
