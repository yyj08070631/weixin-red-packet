
export const getUserInfo = wx.getUserInfo({
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