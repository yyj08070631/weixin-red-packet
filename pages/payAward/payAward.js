// createPacket.js
// import getUserInfo from './getUserInfo.js';
// console.log(getUserInfo)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    userInfoAvatar: '',
    province: '',
    city: '',
    sex: '',
    packetDataList: []
  },

  // http://miniapp.qingmeng168.com/RedPage/topic/result
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.request({
      url: 'http://miniapp.qingmeng168.com/RedPage/topic/result', 
      method: 'POST',
      header: {
        'content-type': 'application/json' 
	  },
	  data: {
		  id: (10).toString(),
		  tid: (1).toString()
	  },
		success(res) {
      console.log(res.data)
      self.setData({
        packetDataList: res.data
      })
		},
		fail(){
		}
     });
    wx.getUserInfo({
      success: function(res){
        switch(res.userInfo.gender){
          case 0: 
            self.setData({
              sex:'未知'
            })
          break;
          case 1: 
            self.setData({
              sex:'男'
            })
          break;
          case 2: 
            self.setData({
              sex:'女'
            })
          break;
        }
        self.setData({
          nickName:res.userInfo.nickName,
          userInfoAvatar:res.userInfo.avatarUrl,
          province:res.userInfo.province,
          city:res.userInfo.city,
          sex: res.userInfo.gender,
        })
        
      },
      fail: function() {
        // fail
        console.log("获取失败！")
      },
      complete: function() {
        // complete
        console.log("获取用户信息完成！")
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
  
  },
  gobackHistory: function(){
    wx.navigateBack();
    
  // console.log(1)
  },
})