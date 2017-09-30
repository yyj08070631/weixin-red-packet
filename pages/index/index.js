// import header from "../public/header";
//index.js
//获取应用实例
wx.showShareMenu({
	withShareTicket: true
})

var app = getApp()
Page({
	data: {
		nickName: '',
		userInfoAvatar: '',
		sex: '',
		province: '',
		city: '',
		answerList: [], // 问题信息数组
		qidArr: [], // 问题id数组
		aidArr: [], // 答案id数组
		moneyNum: 0.00, // 红包金额
		packetNum: 0, // 红包数量
		service: 0, // 服务费
		serviceRate: 1, // 服务费比例
		resultNumber: 0, // 最终金额结果
		answer: '', // 用来存储答案的值
		questionTabShow: false, // 答题面板显示
		showBtn: 0, // 显示确定或下一题按钮
		quesKey: 0, // 更换问题的值
		// item的背景数组，默认全部未选中
		urlList: [],
		answerList: [], // 存储5个题目和答案的数组
		// condition: 0, // 答对多少题才有红包
		expendId: 0, // 个人发出红包id
		incomeId: 0 // 个人收入红包id
	},
	//事件处理函数
	bindViewTap: function () {
	},
	//页面加载完钩子函数
	onLoad: function (options) {
		// console.log(options)
		var self = this
		wx.getStorage({
			key: 'question',
			success: function (res) {
				let qidArr = [],
					aidArr = [];
				res.data.question.map(function (val, key) {
					qidArr.push(val.qid);
					aidArr.push(val.aid);
				})
				self.setData({
					answerList: res.data,
					qidArr: qidArr,
					aidArr: aidArr
				})
				console.log(self.data.answerList)
			}
		})
		wx.getStorage({
			key: 'packet',
			success: function (res) {
				console.log(res.data)
				if (res.data.money != '0.00') {
					self.setData({
						moneyNum: res.data.money,
						packetNum: res.data.packet,
						service: res.data.service,
						resultNumber: res.data.resultNumber
					})
					console.log("success")
				}
			}
		})
		// 后台加载数据
		wx.request({
			url: app.globalData.ajaxUrl + '/RedPage/page/index',
			method: 'POST',
			header: {
				'content-type': 'application/json'
			},
			success(res) {
				self.setData({
					serviceRate: res.data.service // 服务费比例
					// serviceRate: 10 // 模拟数据
					// condition: res.condition, // 答对多少题才有红包
					// condition: 6 // 模拟数据
				})
				// console.log(self.data.serviceRate);
			},
			fail() {
				console.log('Request err');
			}
		});
	},
	// 选中图标变换
	// 红包限制
	maxNum: function (num) {
		// console.log(num)
		var self = this;
		if (num >= 1001) {
			num == self.data.moneyNum ? self.setData({ moneyNum: 1000 }) : self.setData({ packetNum: 1000 })
			self.saveResult()
			wx.showModal({
				title: '提示',
				content: '土豪,不能再多了~ $_$',
				showCancel: false,
				success: function (res) {

				},

			})
		}
	},
	//输入金额数值
	replaceMoneyVal: function (e) {
		this.setData({
			moneyNum: e.detail.value
				.replace(/[^\d.]/g, "")
				.replace(/\.{2,}/g, ".")
				.replace(".", "$#$")
				.replace(/\./g, "")
				.replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
			service: e.detail.value * this.data.serviceRate / 100,
			resultNumber: parseFloat(e.detail.value) + e.detail.value * this.data.serviceRate / 100
		});
		this.maxNum(e.detail.value);
	},
	//输入红包数量
	replacePacketVal: function (e) {
		this.setData({
			packetNum: e.detail.value.replace(/[^0-9]/g, ''),
			service: this.data.moneyNum * this.data.serviceRate / 100,
			resultNumber: parseFloat(this.data.moneyNum) + this.data.moneyNum * this.data.serviceRate / 100,
		})
		this.maxNum(e.detail.value)
	},
	//获取最终结果
	saveResult: function () {
		this.setData({
			service: this.data.moneyNum * this.data.serviceRate / 100,
			resultNumber: parseFloat(this.data.moneyNum) + this.data.moneyNum * this.data.serviceRate / 100,
		})
	},
	//金额输入框失去焦点
	getResult: function () {
		var self = this;
		if (this.data.moneyNum < 2) {
			wx.showModal({
				title: '提示',
				content: '红包不能少于2元哦~ $_$',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						self.saveResult()
					}
				}
			})
			this.setData({
				moneyNum: 2,
				service: (this.data.moneyNum * this.data.serviceRate / 100).toFixed(2)
			})
		}
		//  console.log(this.data.moneyNum)
		//  console.log(this.data.packetNum)
	},
	//金额输入框失去焦点
	getPacket: function () {
		var self = this;
		if (this.data.packetNum < 1) {
			wx.showModal({
				title: '提示',
				content: '不能少于1个红包哦~ $_$)',
				showCancel: false,
				success: function (res) {
					if (res.confirm) {
						self.saveResult()
					}
				}
			})
			this.setData({
				packetNum: 1,
				service: (this.data.moneyNum * this.data.serviceRate / 100).toFixed(2)
			})
		}
	},
	//清空金额数值
	clearMoneyVal: function (e) {
		if (this.data.moneyNum == 0.00) {
			this.setData({
				moneyNum: ''
			})
		}

	},
	//清空红包数值
	clearPacketVal: function (e) {
		if (this.data.packetNum == 0) {
			this.setData({
				packetNum: ''
			})
		}

	},
	//清空金额数值
	changeMoneyNum: function (e) {
		//获取事件绑定设置的参数
		var number = e.currentTarget.dataset.number;
		// console.log(number)
		this.setData({
			moneyNum: number
		})
		this.saveResult()
	},
	payPacket: function () {
		var nbsp = "&nbsp&nbsp&nbsp&nbsp";
		var self = this;
		wx.showModal({
			title: '支付提醒',
			content: '总共￥' + self.data.resultNumber + ' / 含手续费￥' + self.data.service,
			success: function (res) {
				if (res.confirm) {
					if (self.data.answerList.length == 0) {
						wx.showModal({
							title: '提示',
							content: '请选择题目',
							showCancel: false
						})
					} else if (self.data.moneyNum == 0) {
						wx.showModal({
							title: '提示',
							content: '请选择红包金额',
							showCancel: false
						})
					} else {
						wx.getStorage({
							key: 'userId',
							success: function (storage) {
								wx.request({
									url: app.globalData.ajaxUrl + '/RedPage/topic/create',
									method: 'POST',
									header: {
										'content-type': 'application/json'
									},
									data: {
										id: String(storage.data), // 用户id
										page_money: self.data.moneyNum + '.01', // 这个红包多少钱
										packet_number: String(self.data.packetNum), // 红包个数
										total: String(self.data.resultNumber), // 总共支出多少钱
										service: String(self.data.service), // 服务费
										tid: self.data.qidArr.join(','), // 问题id
										answer: self.data.aidArr.join(',') // 答案id
									},
									success(res) {
										// console.log(res);
										wx.navigateTo({
											url: '/pages/createPacket/createPacket?packetMoney=' + self.data.moneyNum + '&pid=' + res.data,
										});
									},
									fail() {
										console.log('Request err')
									}
								});
							}
						})
					}
				}

			},
		})
		//   wx.requestPayment({
		//     'timeStamp': '',
		//     'nonceStr': '',
		//     'package': '',
		//     'signType': 'MD5',
		//     'paySign': '',
		//     'success':function(res){
		//     },
		//     'fail':function(res){
		//     }
		//  })
	},
	jumpToSelectQuestion: function () {
		this.setPacketInfo()
		wx.redirectTo({
			url: "/pages/selectQuestion/selectQuestion",
		})
	},
	// 创建红包
	// 存储金额
	setPacketInfo: function () {
		wx.setStorage({
			key: 'packet',
			data: {
				money: this.data.moneyNum,
				packet: this.data.packetNum,
				resultNumber: this.data.resultNumber,
				service: this.data.service
			},
			success: function (res) {

			}
		})
	},
	createPacket: function () {
		this.payPacket()
	},
})
