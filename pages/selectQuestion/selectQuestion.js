var app = getApp()
Page({
  data: {
  	userInfoList: [],	    //用来保存本地保存的用户信息
    handleKey: false,	    //控制显示选题面板还是改题面板
    storageProblem: [],   // 获取本地问题信息，就是选题之后的结果
    answer: '',			      //用来存储答案的值
    showBtn: 0,			      //显示确定或下一题按钮
    quesKey: 0,			      //更换问题的值
    service: 0,			      //服务费
    resultNumber: 0,	    //最终金额结果
    questionData: [],   	//用来保存从后天获取的数据
				                	//item的背景数组，默认全部未选中
    urlList: [],          //用来清除选中的值
    answerList: [],	    	//存储5个题目和答案的数组
    updateAnswerList: [], //修改题目存储的url
    index: ''
  },
  //页面加载完钩子函数
  onLoad (options) {
	
	let that = this
  	let {storageProblem, quesKey, userInfoList, urlList, questionData} = that.data
	// 获取本地问题数据
	wx.getStorage({
      	key: 'question',
      	success (res) {
			let data = res.data.question
        	that.setData({
            	storageProblem: data
    		})
        	if(storageProblem !== undefined){
				let url = [];
				for(let i = 0 ; i < data[quesKey].answers.length; i ++ ){
					url.push('/images/uncheck.png')
				}
				url[data[quesKey].answerId] = '/images/checked.png';
				that.setData({
					updateAnswerList: url
				})
				console.log(that.data.updateAnswerList)
			}
      	} 
	})
	//获取用户信息
	wx.getStorage({
		key: 'userInfo',
		success: function(res) {
		  userInfoList = res.data
		  console.log(userInfoList)
		}
	
	  })
	  
	//请求问题接口  
    wx.request({
      url: app.globalData.ajaxUrl+'/RedPage/topic/select?paner=2', 
      method: 'GET',
      header: {
        'content-type': 'application/json' 
	  },
    success(res) {
            that.setData({
              questionData: res.data,
            })    
            // 定义临时空数组    
            let url = [];
            // 获取答案的长度
            let len = that.data.questionData[quesKey].answerList.length
            for(let i = 0; i < len; i++){
                url.push('/images/uncheck.png')
              }
              that.setData({
                urlList: url
              })       
            //   console.log(urlList)
	  },
	  fail(){
			// console.log(userInfoList.sex)
	  }
  	})     
  },
//改变选中值对应的url
  caseList(key){
    let { questionData, quesKey } = this.data 
    let url = [];
    for(let i = 0; i < questionData[quesKey].answerList.length; i ++){
		
      url.push('/images/uncheck.png')
    }
    this.setData({
      urlList: url
	})
	console.log(url)
    let type = 'urlList['+key+']'
    // console.log(this.data.urlList[key])
    this.setData({
      [type]: '/images/checked.png'
    })
  },
  //选中图标变换(选题)
  changeURL(e){  
    this.setData({
      answer: e.currentTarget.dataset.type,
      index: e.currentTarget.dataset.index,
	})
  console.log(this.data.answer)
  console.log(this.data.index)
    // console.log( e.currentTarget.dataset.type)
    //调用全局switch函数
    this.caseList(this.data.index)
  },
  
  //选中图标变换(修改题目)
  changeStroageURL(e){ 
	  console.log(e.currentTarget.dataset)
  	let index = e.currentTarget.dataset.index //监听事件传来的值
	  let id = e.currentTarget.dataset.type //监听事件传来的值
	  console.log(index)
	  console.log(id)
  	let { storageProblem, quesKey} = this.data
    let todoIndex = 'storageProblem['+quesKey+'].answerId' 
    let todoId = 'storageProblem['+quesKey+'].aid' 
    this.setData({
      [todoIndex] : index,
      [todoId] : id
	})
	console.log(storageProblem)
	if(storageProblem !== undefined){
		let url = [];
		for(let i = 0 ; i < storageProblem[quesKey].answers.length; i ++ ){
			url.push('/images/uncheck.png')
		}
		url[storageProblem[quesKey].answerId] = '/images/checked.png';
		this.setData({
			updateAnswerList: url
		})
		console.log(this.data.updateAnswerList)
	}


  },
	//保存最终最终结果回到首页
  upDateFinish(){
	let {storageProblem} = this.data
    wx.setStorage({
      key: 'question',
      data: {
        question: storageProblem 
      },
      success(){
      }
    })
    wx.redirectTo({
      url: "/pages/index/index",
      query: {
        question: storageProblem 
      }
    })  
  }, 
  //返回历史
  gobackHistory(){
    wx.redirectTo({
      url: "/pages/index/index"
    })
  },
  //显示或隐藏答题页面
  // 保存答题结果
  goSaveQuestion(){ 
	let { quesKey, questionData, answerList, answer, index} = this.data
	//
    if(answer !== '' && answerList.length < 10){
		answerList.push({
		question: questionData[quesKey].topic_content,
		answerId: index,
		aid: answer,
		answers: questionData[quesKey].answerList
	  })
	  console.log(this.data.answerList)
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择答案',
        success(res) {
          if (res.confirm) {
          }
        }
      })

     return
	}
	let url = [];
	// 获取答案的长度
	let len = questionData[quesKey+1].answerList.length
	
	for(let i = 0; i < len; i++){
		url.push('/images/uncheck.png')
	  } 
    this.setData({
      answer: '',
	  urlList: url,
      showBtn: answerList.length,
      quesKey: quesKey + 1
    })
    answerList.length >= 10 ?  
      this.setData({
        handleKey: true //确定选题或改题面板的显示
      })
      : this.setData({
        handleKey: false
      })
  },

  
    // 题目切换：下一题
  goNextQuestion(){ 
	//这里不存储在变量是为了节省一步操作，如果赋值的话点击的时候是先赋值  
	if(this.data.quesKey < 10){
		this.setData({
			quesKey: this.data.quesKey + 1
		  })
	  }else{
		this.setData({
			quesKey: 0
		  })
	  }
	//修改面板和选题面板公用的代码块
	let {answerList, quesKey, storageProblem} = this.data
          
    // 判断本地存储的数据而的两种情况分别对应选题和修改的操作   
    console.log(quesKey)
    if(storageProblem.length === 10){
        if(quesKey < 10){
			this.setData({
				answer: '',
				showBtn: answerList.length,
			  })
         	  console.log(quesKey)
          let url = [];
          for(let i = 0 ; i < storageProblem[quesKey].answers.length; i ++ ){
            url.push('/images/uncheck.png')
          }
          
          url[storageProblem[quesKey].answerId] = '/images/checked.png';
          this.setData({
            updateAnswerList: url
          })
		}else{
          this.setData({
            quesKey: 0
          })
        }
     
    }else{
        return
        }
  },
//   题目切换：上一题
  goBackQuestion (){ 
	  //这里不存储在变量是为了节省一步操作，如果赋值的话点击的时候是先赋值  
	if(this.data.quesKey >= 0){
		this.setData({
			quesKey: this.data.quesKey - 1
		  })
	  }else{
		this.setData({
			quesKey: 0
		  })
	  }
	//修改面板和选题面板公用的代码块
	let {answerList, quesKey, storageProblem} = this.data
          
    // 判断本地存储的数据而的两种情况分别对应选题和修改的操作   
    console.log(quesKey)
    if(storageProblem.length === 10){
        if(quesKey >= 0){
			this.setData({
				answer: '',
				showBtn: answerList.length,
			  })
         	  console.log(quesKey)
          let url = [];
          for(let i = 0 ; i < storageProblem[quesKey].answers.length; i ++ ){
            url.push('/images/uncheck.png')
          }
          
          url[storageProblem[quesKey].answerId] = '/images/checked.png';
          this.setData({
            updateAnswerList: url
          })
		}else{
          this.setData({
            quesKey: 0
          })
        }
     
    }else{
      //  console.log(storageProblem.length)   
        return
        }
      
  },
//   保存最终结果并回到首页
  saveQuestion(){
	let { answerList } = this.data
    this.goSaveQuestion()
    if(answerList.length == 10){
      wx.setStorage({
        key: 'question',
        data: {
          question: answerList
        },
        success: function(res){
          // success
          wx.redirectTo({
            url: "/pages/index/index"
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })

    }else{
        wx.showModal({
            title: '提示',
            content: '请选择答案再提交',
            success: function(res) {
              if (res.confirm) {
              }
            }
          })
    }
  
  }
	
})
