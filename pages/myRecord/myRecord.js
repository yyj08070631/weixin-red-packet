// pages/MyRecord/MyRecord.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myRecordIsShow: false, //我的发出显示
        myRecordIsHidden: true, //我的收入显示
        nickName: '', //用户微信昵称
        userInfoAvatar: '', //用户头像
        sex: '', //用户性别
        province: '', //省份
        city: '', //城市
        Expend: {}, //我的发出数据
        Income: {} //我的收入数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let self = this
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
            url: 'https://miniapp.qingmeng168.com/RedPage/money/expend?id=2',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {},
            success(res) {
                console.log(res)
                res.data.list.map(function(item) {
                    item.page_time = item.page_time.split(' ')[0].split('-')[1] + '月' + item.page_time.split(' ')[0].split('-')[2] + '日' + '  ' + item.page_time.split(' ')[1].split(':')[0] + ' : ' + item.page_time.split(' ')[1].split(':')[1]
                })
                self.setData({
                    Expend: res.data
                })

                console.log(self.data)
            },
            fail(res) {
                // console.log(res)
            }
        })
        wx.request({
            url: 'https://miniapp.qingmeng168.com/RedPage/money/income?id=10',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {},
            success(res) {
                res.data.list.map(function(item) {
                    item.time = item.time.split(' ')[0].split('-')[1] + '月' + item.time.split(' ')[0].split('-')[2] + '日' + '  ' + item.time.split(' ')[1].split(':')[0] + ' : ' + item.time.split(' ')[1].split(':')[1]
                })
                self.setData({
                    Income: res.data
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
    // 事件区
    gobackHistory: function() {
        wx.navigateBack();

        // console.log(1)
    },
    hideRecordTab: function() {
        let self = this
        this.setData({
            myRecordIsShow: false
        })
        console.log(this.data.myRecordIsShow)
        wx.request({
            url: 'https://miniapp.qingmeng168.com/RedPage/money/expend?id=2',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {},
            success(res) {
                console.log(res)
                res.data.list.map(function(item) {
                    item.page_time = item.page_time.split(' ')[0].split('-')[1] + '月' + item.page_time.split(' ')[0].split('-')[2] + '日' + '  ' + item.page_time.split(' ')[1].split(':')[0] + ' : ' + item.page_time.split(' ')[1].split(':')[1]
                })
                self.setData({
                    Expend: res.data
                })
            },
            fail(res) {
                console.log(res)
            }
        })
    },
    showRecordTab: function() {
        let self = this
        this.setData({
            myRecordIsShow: true
        })
        console.log(this.data.myRecordIsShow)
        wx.request({
            url: 'https://miniapp.qingmeng168.com/RedPage/money/income?id=10',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                id: 10
            },
            success(res) {
                console.log(res)
                res.data.list.map(function(item) {
                    item.time = item.time.split(' ')[0].split('-')[1] + '月' + item.time.split(' ')[0].split('-')[2] + '日' + '  ' + item.time.split(' ')[1].split(':')[0] + ' : ' + item.time.split(' ')[1].split(':')[1]
                })
                self.setData({
                    Income: res.data
                })
            },
            fail(res) {
                console.log(res)
            }
        })
    }

})