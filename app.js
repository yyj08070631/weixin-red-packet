//app.js
App({    
  globalData:{  
    userInfo:[],  
    ajaxUrl: 'http://miniapp.qingmeng168.com' 
},    
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    console.log("sdasda")
    var that = this
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          console.log('000000')
          that.globalData.userInfo = res.userInfo
          
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
 
})
