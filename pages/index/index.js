// import header from "../public/header";
//index.js
//获取应用实例
wx.showShareMenu({
  withShareTicket: true
})

var app = getApp()
Page({
  data: {
    nickName:'',
    userInfoAvatar:'',
    sex:'',
    province:'',
    city:'',
    answerList: [],
    moneyNum: 0.00.toFixed(2),//金额初始值
    packetNum: 0,//红包数量初始值
    answer: '',//用来存储答案的值
    questionTabShow: false,//答题面板显示
    showBtn: 0,//显示确定或下一题按钮
    quesKey: 0,//更换问题的值
    service: 0,//服务费
    resultNumber: 0,//最终金额结果
    //item的背景数组，默认全部未选中
    urlList: [],
    answerList: []//存储5个题目和答案的数组
  },
  //事件处理函数
  bindViewTap: function() {
  },
  //页面加载完钩子函数
  onLoad: function (options) {
    console.log(options)
    var self = this
    wx.getStorage({
      key: 'question',
      success: function(res) { 
        self.setData({
          answerList: res.data
        })
        console.log(self.data.answerList)
      } 
    })
    wx.getStorage({
      key: 'packet',
      success: function(res) {
        console.log(res.data)
        if(res.data.money != '0.00'){
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
   
    wx.getUserInfo({
      success: function(res){
        console.log(res)
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
        self.setData({
          nickName:res.userInfo.nickName,
          userInfoAvatar:res.userInfo.avatarUrl,
          province:res.userInfo.province,
          city:res.userInfo.city,
          sex: res.userInfo.gender,
        })
        wx.setStorage({
          key: 'userInfo',
          data: {
            nickName:res.userInfo.nickName,
            userInfoAvatar:res.userInfo.avatarUrl,
            province:res.userInfo.province,
            city:res.userInfo.city,
            sex: res.userInfo.gender,
          },
    
        })
        
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
  },
  //选中图标变换
  // 红包限制
  maxNum: function(num){
    // console.log(num)
    var that = this;
    if(num >= 1001){
      num == that.data.moneyNum ? that.setData({moneyNum: 1000}) :  that.setData({packetNum: 1000})
      that.saveResult()
      wx.showModal({
        title: '提示',
        content: '土豪,不能再多了~ $_$',
        success: function(res) {
          
        },

      })
    }
  },
  //输入金额数值
  replaceMoneyVal: function(e){
    this.setData({
      moneyNum: e.detail.value
                .replace(/[^\d.]/g,"")
                .replace(/\.{2,}/g,".")
                .replace(".","$#$")
                .replace(/\./g,"")
                .replace("$#$",".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'), 
      service:(e.detail.value*this.data.packetNum/103).toFixed(2),
      resultNumber: ((e.detail.value * this.data.packetNum ) + e.detail.value*this.data.packetNum / 103).toFixed(2)
      // resultNumber: this.data.packetNum * e.detail.value
    })
    // console.log(this.data.packetNum)
    // console.log(e.detail.value)
    // console.log(this.data.resultNumber)   
    this.maxNum(e.detail.value)
    console.log(this.data.moneyNum)
  },
  //输入红包数值
  replacePacketVal: function(e){
    this.setData({
      packetNum: e.detail.value.replace(/[^0-9]/g,''),
      service:(this.data.moneyNum * e.detail.value / 103).toFixed(2),
      resultNumber: ((this.data.moneyNum * e.detail.value ) + this.data.moneyNum * e.detail.value / 103).toFixed(2),
    })
    // this.data.moneyNum = '';
    // console.log(this.data.packetNum)
    // console.log(e.detail.value)
    // console.log(this.data.resultNumber)   
    this.maxNum(e.detail.value)
  },
  //获取最终结果
  saveResult: function(){
    this.setData({
      service:(this.data.moneyNum * this.data.packetNum / 103).toFixed(2),
      resultNumber: ((this.data.moneyNum * this.data.packetNum ) + this.data.moneyNum * this.data.packetNum / 103).toFixed(2),
    })
  },
  //金额输入框失去焦点
  getResult: function(){
    var _this = this;
    if(this.data.moneyNum < 2){
      wx.showModal({
        title: '提示',
        content: '红包不能少于2元哦~ $_$',
        success: function(res) {
          if (res.confirm) {
            _this.saveResult()
          }
        }
      })
      this.setData({
        moneyNum: 2,
        service:(this.data.moneyNum * this.data.packetNum / 103).toFixed(2)
      })
    }
  //  console.log(this.data.moneyNum)
  //  console.log(this.data.packetNum)
  },
  //金额输入框失去焦点
  getPacket: function(){
    var _this = this;
    if(this.data.packetNum < 1){
      wx.showModal({
        title: '提示',
        content: '不能少于1个红包哦~ $_$)',
        success: function(res) {
          if (res.confirm) {
           _this.saveResult()
          }
        }
      })
      this.setData({
        packetNum: 1,
        service:(this.data.moneyNum * this.data.packetNum / 103).toFixed(2)
      })
    }
  },
  //清空金额数值
  clearMoneyVal: function(e){
    if(this.data.moneyNum == 0.00){
      this.setData({
        moneyNum: ''
      })
    }
    
  },
  //清空红包数值
  clearPacketVal: function(e){
    if(this.data.packetNum == 0){
      this.setData({
        packetNum: ''
      })
    }
    
  },
  //清空金额数值
  changeMoneyNum: function(e){
    //获取事件绑定设置的参数
    var number = e.currentTarget.dataset.number;
    // console.log(number)
    this.setData({
      moneyNum: number
    })
    this.saveResult()
  },
  payPacket: function(){
    var nbsp = "&nbsp&nbsp&nbsp&nbsp";
    wx.showModal({
      title: '支付提醒',
      content: "总共￥"+this.data.resultNumber+"  / 含手续费￥"+this.data.service,
      success: function(res) {
        if(res.confirm){
          wx.navigateTo({
            url: "/pages/createPacket/createPacket",
          });
        }
        
      },})
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
  jumpToSelectQuestion: function(){
    this.setPacketInfo()
    wx.redirectTo({
      url: "/pages/selectQuestion/selectQuestion",
    })
  },
  //创建红包
  // 存储金额
  setPacketInfo: function(){
    wx.setStorage({
      key: 'packet',
      data: {
        money: this.data.moneyNum,
        packet: this.data.packetNum,
        resultNumber: this.data.resultNumber,
        service: this.data.service
      },
      success: function(res) {
    
      } 
    })
  },
  createPacket: function(){
    
    this.payPacket()
  },
})
