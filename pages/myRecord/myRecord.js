// pages/MyRecord/MyRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myRecordIsShow: false,
	myRecordIsHidden: true,
	nickName:'',
    userInfoAvatar:'',
    sex:'',
    province:'',
    city:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var self = this
    wx.getUserInfo({
      success: function(res){
        self.setData({
          nickName:res.userInfo.nickName,
          userInfoAvatar:res.userInfo.avatarUrl,
          province:res.userInfo.province,
          city:res.userInfo.city
        })
        console.log(self.data.nickName+'\n'+self.data.userInfoAvatar+'\n'+self.data.province+'\n'+self.data.city)
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
    // 事件区
  gobackHistory: function(){
    wx.navigateBack();
    
  // console.log(1)
  },
  hideRecordTab: function(){
    this.setData({
      myRecordIsShow: false
    })
    console.log(this.data.myRecordIsShow)
  },
  showRecordTab: function(){
    this.setData({
      myRecordIsShow: true
    })
    console.log(this.data.myRecordIsShow)
  },
})