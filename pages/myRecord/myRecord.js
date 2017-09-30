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
        uid: '',
        Expend: {}, //我的发出数据
        Income: {} //我的收入数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let self = this
            //获取本地存储的用户id
        wx.getStorage({
            key: 'userId',
            success: function(res) {
                console.log(res)
                self.setData({
                        uid: res.data
                    })
                    //请求我的发出的数据
                wx.request({
                        url: app.globalData.ajaxUrl + '/RedPage/money/expend',
                        method: 'POST',
                        header: {
                            'content-type': 'application/json'
                        },
                        data: {
                            id: String(res.data)
                        },
                        success(res) {
                            console.log(res)
                            let userList = res.data.list
                            console.log(userList)
                            for (let i = 0; i < userList.length; i++) {
                                userList[i].index = userList.length - i;
                                userList[i].page_time = userList[i].page_time.split(' ')[0].split('-')[1] + '月' + userList[i].page_time.split(' ')[0].split('-')[2] + '日' + '  ' + userList[i].page_time.split(' ')[1].split(':')[0] + ' : ' + userList[i].page_time.split(' ')[1].split(':')[1]

                            }
                            self.setData({
                                Expend: res.data
                            })

                            console.log(self.data)
                        },
                        fail(res) {
                            // console.log(res)
                        }
                    })
                    //请求我的收入的数据
                console.log(self.data)
                wx.request({
                    url: app.globalData.ajaxUrl + '/RedPage/money/income',
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: {
                        id: String(res.data)
                    },
                    success(res) {
                        let userList = res.data.list
                        for (let i = 0; i < userList.length; i++) {
                            userList[i].index = userList.length - i;
                            userList[i].time = userList[i].time.split(' ')[0].split('-')[1] + '月' + userList[i].time.split(' ')[0].split('-')[2] + '日' + '  ' + userList[i].time.split(' ')[1].split(':')[0] + ' : ' + userList[i].time.split(' ')[1].split(':')[1]

                        }
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
        setTimeout(function() {
            console.log(self.data.uid)
        }, 2000);

        //获取用户信息
        wx.getUserInfo({
            success: function(res) {
                console.log(res)
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
            fail: function(res) {
                // fail
                console.log(res)
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
    // onShareAppMessage: function() {
    //     return {
    //         title: '自定义转发标题',
    //         path: '/pages/startAnswer/startAnswer?id=',
    //         imgUrl: '../../images/share.jpg',
    //         success: function(res) {
    //             // 转发成功
    //         },
    //         fail: function(res) {
    //             // 转发失败
    //         }
    //     }
    // },
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
        console.log(self.data.uid);
        wx.request({
            url: app.globalData.ajaxUrl + '/RedPage/money/expend',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                id: String(self.data.uid)
            },
            success(res) {
                let userList = res.data.list
                for (let i = 0; i < userList.length; i++) {
                    userList[i].index = userList.length - i;
                    userList[i].page_time = userList[i].page_time.split(' ')[0].split('-')[1] + '月' + userList[i].page_time.split(' ')[0].split('-')[2] + '日' + '  ' + userList[i].page_time.split(' ')[1].split(':')[0] + ' : ' + userList[i].page_time.split(' ')[1].split(':')[1]

                }
                self.setData({
                    Expend: res.data
                })

                console.log(self.data)
            },
            fail(res) {
                // console.log(res)
            }
        })
    },
    showRecordTab: function() {
        let self = this
        this.setData({
            myRecordIsShow: true
        })
        console.log(this.data.myRecordIsShow)
        console.log(self.data.uid);
        wx.request({
            url: app.globalData.ajaxUrl + '/RedPage/money/income',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                id: String(self.data.uid)
            },
            success(res) {
                console.log(res)
                let userList = res.data.list
                for (let i = 0; i < userList.length; i++) {
                    userList[i].index = userList.length - i;
                    userList[i].time = userList[i].time.split(' ')[0].split('-')[1] + '月' + userList[i].time.split(' ')[0].split('-')[2] + '日' + '  ' + userList[i].time.split(' ')[1].split(':')[0] + ' : ' + userList[i].time.split(' ')[1].split(':')[1]

                }
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