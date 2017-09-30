// createPacket.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickName: '',
        userInfoAvatar: '',
        sex: '',
        province: '',
        city: '',
        status: '',
        returnData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        let tid = options.id
            // wx.getStorage({
            //     key: 'key',
            //     success: function(res) {
            //         console.log(res.data)
            //     }
            // })
        var self = this
        wx.getUserInfo({
            success: function(res) {
                self.setData({
                    nickName: res.userInfo.nickName,
                    userInfoAvatar: res.userInfo.avatarUrl,
                    province: res.userInfo.province,
                    city: res.userInfo.city
                })
                console.log(self.data.nickName + '\n' + self.data.userInfoAvatar + '\n' + self.data.province + '\n' + self.data.city)
                switch (res.userInfo.gender) {
                    case 0:
                        self.setData({
                            sex: '未知'
                        })
                        break;
                    case 1:
                        self.setData({
                            sex: '男'
                        })
                        break;
                    case 2:
                        self.setData({
                            sex: '女'
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
        wx.request({
            url: app.globalData.ajaxUrl + '/RedPage/topic/bag',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: JSON.stringify({
                "tid": "1",
                "uid": "1"
            }),
            success(res) {
                console.log(res)
                res.data.list.map(function(item) {
                    item.time = item.time.split(' ')[0].split('-')[1] + '月' + item.time.split(' ')[0].split('-')[2] + '日' + '  ' + item.time.split(' ')[1].split(':')[0] + ' : ' + item.time.split(' ')[1].split(':')[1]
                })
                self.setData({
                    returnData: res.data
                })
            },
            fail(res) {
                console.log(res)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    gobackHistory: function() {
        wx.navigateBack();

        // console.log(1)
    },
})