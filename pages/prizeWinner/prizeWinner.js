// import header from "../public/header.js";
// pages/prizeWinner/prizeWinner.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		dataUp: [], // 默契度前三名的信息数组
		dataDown: [] // 默契度第三名之后的信息数组
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let self = this;
		// 获取页面数据
		wx.request({
			url: getApp().globalData.ajaxUrl + '/RedPage/page/privity',
			method: 'POST',
			data: {
				id: 1 // 红包id
			},
			success(res) {
				// 测试数据
				let arr = [
					{
						head: 'https://wx.qlogo.cn/mmopen/vi_32/4ia1K0FXqS2Mhe8xDyiciaJQiaHAw6XIa2z9qvLdbssBiczGUtyBXSsKGkF3WSAicX4cCOLr1TicEXMUs3Y2YSyUyCX1g/0', // 用户头像
						name: 'ABC', // 用户名字
						correct: 10, // 答对题数
						percentum: 100, // 默契度
						rank: 1 // 排名
					},
					{
						head: 'https://wx.qlogo.cn/mmopen/vi_32/4ia1K0FXqS2Mhe8xDyiciaJQiaHAw6XIa2z9qvLdbssBiczGUtyBXSsKGkF3WSAicX4cCOLr1TicEXMUs3Y2YSyUyCX1g/0', // 用户头像
						name: 'YYJ', // 用户名字
						correct: 9, // 答对题数
						percentum: 90, // 默契度
						rank: 2 // 排名
					},
					{
						head: 'https://wx.qlogo.cn/mmopen/vi_32/4ia1K0FXqS2Mhe8xDyiciaJQiaHAw6XIa2z9qvLdbssBiczGUtyBXSsKGkF3WSAicX4cCOLr1TicEXMUs3Y2YSyUyCX1g/0', // 用户头像
						name: 'KKK', // 用户名字
						correct: 8, // 答对题数
						percentum: 80, // 默契度
						rank: 3 // 排名
					},
					{
						head: 'https://wx.qlogo.cn/mmopen/vi_32/4ia1K0FXqS2Mhe8xDyiciaJQiaHAw6XIa2z9qvLdbssBiczGUtyBXSsKGkF3WSAicX4cCOLr1TicEXMUs3Y2YSyUyCX1g/0', // 用户头像
						name: 'SHIT', // 用户名字
						correct: 7, // 答对题数
						percentum: 70, // 默契度
						rank: 4 // 排名
					},
					{
						head: 'https://wx.qlogo.cn/mmopen/vi_32/4ia1K0FXqS2Mhe8xDyiciaJQiaHAw6XIa2z9qvLdbssBiczGUtyBXSsKGkF3WSAicX4cCOLr1TicEXMUs3Y2YSyUyCX1g/0', // 用户头像
						name: 'BITCH', // 用户名字
						correct: 6, // 答对题数
						percentum: 60, // 默契度
						rank: 5 // 排名
					}
				];
				// 获取数据
				// let arr = res.data;
				// 数据处理
				if (arr.length == 0) {
					console.log('没有数据');
				} else if (arr.length > 0 && arr.length <=3) {
					self.setData({
						dataUp: arr
					});
				} else if (arr.length > 3) {
					self.setData({
						dataUp: arr.slice(0, 3),
						dataDown: arr.slice(3)
					});
				} else {
					console.log('数据错误')
				}
			},
			fail() {
				console.log('Request err');
			}
		})
	},

	// 事件区
	gobackHistory: function () {
		wx.navigateBack();
	}

})