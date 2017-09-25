var app = getApp()
Page({
    data: {
        userInfoList: [], //用来保存本地保存的用户信息
        handleKey: false, //控制显示选题面板还是改题面板
        storageProblem: [], // 获取本地问题信息，就是选题之后的结果
        answer: '', //用来存储答案的值
        showBtn: 0, //显示确定或下一题按钮
        quesKey: 0, //更换问题的值
        service: 0, //服务费
        resultNumber: 0, //最终金额结果
        questionData: [], //用来保存从后天获取的数据
        //item的背景数组，默认全部未选中
        urlList: [], //用来清除选中的值
        answerList: [], //存储5个题目和答案的数组
        updateAnswerList: [], //修改题目存储的url
        index: ''
    },
    //页面加载完钩子函数
    onLoad(options) {
        let that = this
        let { storageProblem, quesKey, userInfoList, urlList } = that.data
            //获取用户信息
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
                userInfoList = res.data
                console.log(userInfoList)
                console.log(1)
            }

        })

        //请求问题接口  
        wx.request({
            url: app.globalData.ajaxUrl + ':/RedPage/topic/answer?tid=1',
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                that.setData({
                    storageProblem: res.data,
                })
                console.log(res.data)
                let url = [];
                for (let i = 0; i < res.data[quesKey].answerList.length; i++) {
                    url.push('/images/uncheck.png')
                }
                that.setData({
                    updateAnswerList: url
                })
            },
            fail() {
                // console.log(userInfoList.sex)
            }
        })
    },
    //选中图标变换(修改题目)
    changeStroageURL(e) {
        console.log(e.currentTarget.dataset)
        let index = e.currentTarget.dataset.index //监听事件传来的值
        let id = e.currentTarget.dataset.type //监听事件传来的值
        console.log(index)
        console.log(id)
        let { storageProblem, quesKey } = this.data
        let todoIndex = 'storageProblem[' + quesKey + '].answerId'
        let todoId = 'storageProblem[' + quesKey + '].aid'
        this.setData({
            [todoIndex]: index,
            [todoId]: id
        })
        console.log(storageProblem)
        if (storageProblem !== undefined) {
            let url = [];
            for (let i = 0; i < storageProblem[quesKey].answerList.length; i++) {
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
    upDateFinish() {
        let { storageProblem } = this.data
        wx.setStorage({
            key: 'question',
            data: {
                question: storageProblem
            },
            success() {}
        })
        wx.redirectTo({
            url: "/pages/index/index",
            query: {
                question: storageProblem
            }
        })
    },
    //返回历史
    gobackHistory() {
        wx.redirectTo({
            url: "/pages/index/index"
        })
    },
    // 题目切换：下一题
    goNextQuestion() {
        //这里不存储在变量是为了节省一步操作，如果赋值的话点击的时候是先赋值  
        if (this.data.quesKey < 10) {
            this.setData({
                quesKey: this.data.quesKey + 1
            })
        } else {
            this.setData({
                quesKey: 0
            })
        }
        //修改面板和选题面板公用的代码块
        let { answerList, quesKey, storageProblem } = this.data

        // 判断本地存储的数据而的两种情况分别对应选题和修改的操作   
        console.log(quesKey)
        if (storageProblem.length === 10) {
            if (quesKey < 10) {
                this.setData({
                    answer: '',
                    showBtn: answerList.length,
                })
                console.log(quesKey)
                let url = [];
                for (let i = 0; i < storageProblem[quesKey].answerList.length; i++) {
                    url.push('/images/uncheck.png')
                }

                url[storageProblem[quesKey].answerId] = '/images/checked.png';
                this.setData({
                    updateAnswerList: url
                })
            } else {
                this.setData({
                    quesKey: 0
                })
            }

        } else {
            return
        }
    },
    //   题目切换：上一题
    goBackQuestion() {
        //这里不存储在变量是为了节省一步操作，如果赋值的话点击的时候是先赋值  
        if (this.data.quesKey >= 0) {
            this.setData({
                quesKey: this.data.quesKey - 1
            })
        } else {
            this.setData({
                quesKey: 0
            })
        }
        //修改面板和选题面板公用的代码块
        let { answerList, quesKey, storageProblem } = this.data

        // 判断本地存储的数据而的两种情况分别对应选题和修改的操作   
        console.log(quesKey)
        if (storageProblem.length === 10) {
            if (quesKey >= 0) {
                this.setData({
                    answer: '',
                    showBtn: answerList.length,
                })
                console.log(quesKey)
                let url = [];
                for (let i = 0; i < storageProblem[quesKey].answerList.length; i++) {
                    url.push('/images/uncheck.png')
                }

                url[storageProblem[quesKey].answerId] = '/images/checked.png';
                this.setData({
                    updateAnswerList: url
                })
            } else {
                this.setData({
                    quesKey: 0
                })
            }

        } else {
            //  console.log(storageProblem.length)   
            return
        }

    },
    //   保存最终结果并回到首页
    saveQuestion() {
        let { storageProblem } = this.data
        let { result, response_answer, sid } = { result: [], response_answer: [], sid: [] }




        for (let i = 0; i < storageProblem.length; i++) {
            if (storageProblem[i].aid === undefined) {
                wx.showModal({
                    title: '提示',
                    content: '您还有问题没答完',
                    success(res) {
                        if (res.confirm) {}
                    }
                })
            } else {
                response_answer.push(storageProblem[i].aid);
                sid.push(storageProblem[i].id)
            }
        }
        if (response_answer.length === 10 && sid.length === 10) {
            wx.request({
                url: app.globalData.ajaxUrl + '/RedPage/topic/submit',
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                data: {
                    response_answer: response_answer.toString(),
                    sid: sid.toString(),
                    id: (1).toString()
                },
                success(res) {
                    console.log(res)
                    if (res.data == 1) {
                        wx.navigateTo({
                            url: '/pages/checkAnswer/checkAnswer'
                        })
                    }
                },
                fail(res) {
                    // console.log(res)
                }
            })
        }



    }

})