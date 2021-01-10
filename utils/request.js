var request = {};
request.options = {
  baseUrl: 'http://localhost:8000'
}

request.get = function (url, data) {
  return new Promise((resovle, reject) => {
    wx.request({
      url: request.options.baseUrl + url,
      dataType: 'json',
      header: Object.assign({'Cookie': 'JSESSIONID='+wx.getStorageSync('sessionid')}, {'Cookie': 'JSESSIONID='+wx.getStorageSync('sessionid')}),
      data: data,
      success: function(res) {
        resovle(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  })
}

request.post = function (url, data) {
  return new Promise((resovle, reject) => {
    wx.request({
      url: request.options.baseUrl + url,
      dataType: 'json',
      header: Object.assign({'Cookie': 'JSESSIONID='+wx.getStorageSync('sessionid')}, {'Cookie': 'JSESSIONID='+wx.getStorageSync('sessionid')}),
      data: data,
      method:"POST",
      success: function(res) {
        resovle(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  })
}

module.exports  = request;