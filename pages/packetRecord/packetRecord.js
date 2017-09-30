// pages/MyRecord/record.js
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
        recordInfo: {},
        id: '' //红包id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let self = this
        console.log(options)
        self.data.id = options.id
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
            url: 'http://miniapp.qingmeng168.com/RedPage/page/record?id=' + self.data.id,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                console.log(res)
                res.data.userList.map(function(item) {
                    item.time = item.time.split(' ')[0].split('-')[1] + '月' + item.time.split(' ')[0].split('-')[2] + '日' + '  ' + item.time.split(' ')[1].split(':')[0] + ' : ' + item.time.split(' ')[1].split(':')[1]
                })
                self.setData({
                    recordInfo: res.data
                })
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
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
    onShareAppMessage: function(res) {
        var self = this
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '我包你答',
            path: '/pages/startAnswer/startAnswer?id=' + self.data.id,
            imageUrl: '../../images/share.jpg',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    // 事件区
    gobackHistory: function() {
        wx.navigateBack();

        // console.log(1)
    },
    toDoShare: function() {
        wx.showShareMenu({
            withShareTicket: true
        })
    }
})