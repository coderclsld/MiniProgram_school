// chatRecords/chatRecords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[{
        name:'陈霖',
        xinxi:'你好吗？',
        time:'2020/12/12'
      },
      {
        name:'陈霖1',
        xinxi:'你好吗？2',
        time:'2020/12/12'
      },
      {
        name:'陈霖12',
        xinxi:'你好吗？22',
        time:'2020/12/12'
      },
    ],
    chattingHistory:[{
        id:'6',
        receiverId:'6',
        senderName:'zkj',
        senderId:'7',
        sendMessage:'7你好程玲在吗？',
        sendDate:'2020/12/12'
    },{
      id:'6',
      receiverId:'6',
      senderName:'yy',
      senderId:'5',
      sendMessage:'5你好程玲在吗？',
      sendDate:'2020/12/12'
    },{
      id:'6',
      receiverId:'6',
      senderName:'yy',
      senderId:'4',
      sendMessage:'4程玲,你到底在不在？',
      sendDate:'2020/12/13'
    }]
  },
enterChatting:function(e){
  console.log('进入聊天界面！..'+"发送者id是"+e.currentTarget.dataset.data.senderId+'发送者的名是'+e.currentTarget.dataset.data.senderName)
  wx.navigateTo({
    url: '/pages/chatting/chatting?receiverId='+e.currentTarget.dataset.data.receiverId +'&senderId='+e.currentTarget.dataset.data.senderId+'&senderName='+e.currentTarget.dataset.data.senderName,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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