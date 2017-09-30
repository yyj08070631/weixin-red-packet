// createPacket.js
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
		isCheck: false,
		packetMoney: 0, // 红包金额
		pid: '' // 红包id
	},

	// 生命周期函数--监听页面加载
	onLoad: function (options) {
		var self = this
		// console.log(options.packetMoney);
		// 获取传入的红包金额 & 红包id
		self.setData({
			packetMoney: parseFloat(options.packetMoney).toFixed(2),
			pid: options.pid
		});
		wx.getUserInfo({
			success: function (res) {
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
			fail: function () {
				// fail
				console.log("获取失败！")
			},
			complete: function () {
				// complete
				console.log("获取用户信息完成！")
			}
		})
	},
	// 分享红包配置
	onShareAppMessage: function (res) {
		let self = this;
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: '你了解' + this.data.nickName + '吗？快来测试一下吧',
			imageUrl: '../../images/result-bg.png',
			path: '/pages/startAnswer/startAnswer?pid=' + self.data.pid,
			success: function (res) {
				// 转发成功
				console.log('转发成功');
				// 修改 朋友答题后是否可以查看答案
				wx.request({
					url: getApp().globalData.ajaxUrl + '/RedPage/topic/look?isCheck=' + self.data.isCheck + '&pid=' + self.data.pid,
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success(res) {
						// console.log(res.data);
						console.log('Request succ');
					},
					fail() {
						console.log('Request err')
					}
				});
			},
			fail: function (res) {
				// 转发失败
				console.log("转发失败")
			},
			complete: function (res) {
				console.log(res)
			}
		}

	},
	gobackHistory: function () {
		wx.navigateBack();

		// console.log(1)
	},
	//选择是否勾选
	checkBtn() {
		this.data.isCheck === false ? this.setData({ isCheck: true })
									: this.setData({ isCheck: false })
	},
	toDoShare: function () {

	}
})