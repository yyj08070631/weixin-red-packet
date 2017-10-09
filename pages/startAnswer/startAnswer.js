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
        tid: '', //红包id
        uid: '', //用户id
        // isCheck: '', //朋友答题完是否可以查看答案
        returnData: {} //答题红包具体的信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        let self = this
            //获取红包id
        self.setData({
                tid: options.pid
            })
            // 获取用户id
        wx.getStorage({
            key: 'userId',
            success: function(res) {
                let uid = res.data
                self.setData({
                    uid: res.data
                })
                wx.request({
                    url: app.globalData.ajaxUrl + '/RedPage/topic/bag',
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: JSON.stringify({
                        tid: String(self.data.tid),
                        uid: String(uid)
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
        let self = this
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '我包你答',
            path: '/pages/startAnswer/startAnswer?pid=' + self.data.tid,
            imageUrl: '../../images/share.jpg',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    gobackHistory: function() {
        wx.navigateBack();

        // console.log(1)
    },
    startAnswer: function() {
        var self = this
        wx.navigateTo({
            // url: '/pages/answerMain/answerMain?id=' + self.data.tid + '&user=' + self.data.uid,
            url: '/pages/answerMain/answerMain',
            data: {
                packet_id: self.data.tid,
                user_id: self.data.uid
            },
            success: function(res) {
                // success
                console.log(res)
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }
})