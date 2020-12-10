// pages/components/mytree/mytree.js

Component({
  properties: {
    model:Object
  },
  /**
   * 页面的初始数据
   */
  data: {
 
  },
  //   toggle: function(e) {
  //     if (this.data.isBranch) {
  //       this.setData({
  //         open: !this.data.open,
  //       })
  //     }
  //   },
    
  //   tapItem: function(e) {
  //     var itemid = e.currentTarget.dataset.itemid;
  //     console.log('组件里点击的id: ' + itemid);
  //     this.triggerEvent('tapitem', { itemid: itemid }, { bubbles: true, composed: true });
  // },
  // ready: function(e) {
  //   this.setData({
  //     isBranch: Boolean(this.data.model.nodes && this.data.model.nodes.length),
  //   });
  //   console.log(this.data);
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("1")
      console.log(model)
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