// pages/kebiao/kebiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     num :2,
      list:[     
   ],
      x1:'',
      y1:'',
      list1:[[],[],[],[],[],[],[]],
      list2:[[],[],[],[],[],[],[]],
      i:[[],[],[],[],[],[],[]],
      ii:[[],[],[],[],[],[],[]],
      list3:[[],[],[],[],[],[],[]],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var z = App;
		wx.request({
      url:"http://172.16.168.175:8001/kebiao?username=1840915103&password=18441624101404",
      // http://172.16.168.175:8001/kebiao?username=1840915103&password=18441624101404
      // http://172.16.168.175:8001/kebiao?username=1840915113&password=ye4431978
			success(e) {
        that.setData({list:e.data})
        for(var x=0;x<7;x++)
        {
          for(var y=1;y<7;y++){
            var reg=/[\u4e00-\u9fa5]/g;
            var ger=/[a-zA-Z\d]+/;
            var wz=that.data.list[x][y].indexOf("(")
            var wz1=that.data.list[x][y].indexOf("周")
            var xin= that.data.list[x][y].slice(wz+1,wz1)
            var xin1=xin.replace(reg,"")           
            that.data.i[x][y-1]=xin1.replace(ger,"")
            that.data.i[x][y-1]=that.data.i[x][y-1].replace("&","")           
            that.data.i[x][y-1]=that.data.i[x][y-1].replace(" ","")
            var kb=that.data.list[x][y].replace(that.data.i[x][y-1]+"周","").replace("&nbsp;","") 
            that.data.list1[x][y-1]=kb
            if(xin.indexOf("在线课")!=-1){
                var b=that.data.i[x][y-1].indexOf(" ");
                var a=that.data.i[x][y-1].slice(0,b);
                that.data.i[x][y-1]=that.data.i[x][y-1].replace(that.data.i[x][y-1].slice(0,b),"")
                that.data.list1[x][y-1]=that.data.list1[x][y-1].replace("在线课","在线课"+a)
            }
          }
        }
        that.setData({ii:that.data.i})
        that.setData({list2:that.data.list1})
        that.setData({list3:that.data.list1})
        z.globalData = that.data.i


			},
			fail() { 
				console.log("shibai")
			},
    });
    
  },
  tiaozhuan(){
    if(this.data.num % 2 == 0){
    this.setData({
      list2:this.data.ii
    })
    console.log()
    this.data.num++
  }else{
      this.setData({
        list2:this.data.list3
      })
      this.data.num++
    }
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