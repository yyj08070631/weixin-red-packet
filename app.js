//app.js
App({
    globalData: {
        userInfo: [],
        ajaxUrl: 'http://miniapp.qingmeng168.com',
        code: 0
    },
    onLaunch: function() {
        // 调用API从本地缓存中获取数据
        // var logs = wx.getStorageSync('logs') || [];
        // logs.unshift(Date.now());
        // wx.setStorageSync('logs', logs);
        let self = this;
        wx.checkSession({
                success: function() {
                    // session 未过期，并且在本生命周期一直有效
                    console.log('session 未过期，并且在本生命周期一直有效');
                },
                fail: function() {
                    // 登录态过期
                    // 授权登录接口
                    wx.login({
                        success: function(res) {
                            if (res.code) {
                                self.globalData.code = res.code;
                            } else {
                                console.log('获取用户登录态失败！' + res.errMsg)
                            }
                        }
                    });
                }
            })
            // 获取用户信息
        wx.getUserInfo({
            success: function(res) {
                console.log(res)
                    // console.log(self.data.nickName + '\n' + self.data.userInfoAvatar + '\n' + self.data.province + '\n' + self.data.city)
                let userInfo = {
                    nickName: res.userInfo.nickName,
                    userInfoAvatar: res.userInfo.avatarUrl,
                    province: res.userInfo.province,
                    city: res.userInfo.city,
                    sex: res.userInfo.gender,
                };
                // 发起网络请求
                wx.request({
                        url: self.globalData.ajaxUrl + 'RedPage/page/aways',
                        method: 'POST',
                        data: {
                            code: String(self.globalData.code),
                            name: userInfo.nickName,
                            sex: userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女' : '未知',
                            head: userInfo.userInfoAvatar
                        },
                        success(res) {
                            console.log(res.data);
                            wx.setStorage({
                                key: '3rd_session',
                                data: res.data['3rd_session']
                            });
                            wx.setStorage({
                                key: 'userId',
                                data: res.data.id
                            })
                        },
                        fail() {
                            console.log('Request err');
                        }
                    })
                    // 缓存用户信息，其他页面直接调用缓存
                wx.setStorage({
                    key: 'userInfo',
                    data: {
                        nickName: res.userInfo.nickName,
                        userInfoAvatar: res.userInfo.avatarUrl,
                        province: res.userInfo.province,
                        city: res.userInfo.city,
                        sex: res.userInfo.gender
                    },
                });
            },
            fail: function() {
                // fail
                console.log("获取用户信息失败！")
            }
        })
    }
})