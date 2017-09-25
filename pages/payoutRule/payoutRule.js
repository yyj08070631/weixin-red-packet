//引入模板的js文件

// pages/rule/rule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ruleData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.ajaxUrl+':8081/RedPage/game/select', 
      method: 'GET',
      header: {
        'content-type': 'application/json' 
      },
      success: function(res) {

    
            that.setData({
              ruleData: res.data
            })        
            console.log(that.data.ruleData)
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
   // 事件区
   gobackHistory: function(){
    wx.navigateBack();
    
  // console.log(1)
  },
})