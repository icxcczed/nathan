// pages/guest/guest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: {
      arr: ['0', '1', '2', '3', '4', '5', '6'],
      index: 1
    }
  },
  pickerChange: function(e) {
    this.setData({
      'picker.index': e.detail.value
    })
  },
  // 验证姓名
  nameChange: function(e) {
    this.checkName(e.detail.value)
  },
  // 验证手机号
  phoneChange: function(e) {
    this.checkPhone(e.detail.value)
  },

  // checkName()方法
  checkName: function(data) {
    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
    return this.check(data, reg, '姓名输入错误！')
  },
  // checkPhone()方法
  checkPhone: function(data) {
    var reg = /^(((13)|(15)|(17)|(18))\d{9})$/;
    return this.check(data, reg, '手机号码输入有误！')
  },
 // check()方法
 check: function(data, reg, errMsg) {
  if (!reg.test(data)) {
    wx.showToast({
      title: errMsg,
      icon: 'none',
      duration: 1500
    })
   // return false
  }
  return true
},

/**
 * 1、wx.login()获取code
 * 2、通过微信接口链接，使用appid，secret，code获取openid
 * 3、通过微信接口链接，使用appid，secret获取access_token
 * 4、获取模板id和模板内容参数，并配置值
 * 5、使用wx.requestSubscribeMessage()获取用户接收该模板的权限
 * 6、通过微信接口链接，使用access_token、openid、模板id和模板内容数据，推送订阅消息
 */
formSubmit: function(e) {
   
  var name = e.detail.value.name
  var phone = e.detail.value.phone

  if (this.checkName(name) && this.checkPhone(phone)) {
     //授权订阅消息的推送权限
    wx.requestSubscribeMessage({
      tmplIds: ['PLLbqEkOc206CZqKafIacU_XmXkDg3_XsVnbQHpleEQ'],
      //授权成功，则开始准备推送信息
      success : res => {
        //获取code
          wx.login({
            success:res=>{
              //将code提交到模拟服务器
              server.post(res.code) 
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1500
              })
            }
          })
      }
    })
    
  }
}
})
// 模拟服务器端代码
var server={
  appid: '	wx1ba11c82aa592e2d', // 在此处填写自己的appid
  secret: 'dd27589da36b18ba79331e88d9ce4f5b', // 在此处填写自己的secret
  // 用于保存用户的openid
  user:{
    openid: '',
    token:''
  },
   // 用于模拟提交表单后处理的方法
   post: function(code, success) {
    this.getOpenid(code)
    
   },

  // 用于根据code获取openid
  //GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  getOpenid:function(code, success) {
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: {
        appid: this.appid,
        secret: this.secret,
        grant_type: 'authorization_code',
        js_code: code

      },
      success: res=>{
        console.log("openid:"+res.data.openid)
        this.user.openid=res.data.openid
        //获得openid后再去获取accessToken
        this.getAccessToken()
      }
    })
    
  },
  // 用于获取access_token
  getAccessToken:function() {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + this.appid + '&secret=' + this.secret
    wx.request({
      url: url,
      success: res=>{
        console.log('服务器access_token：' + res.data.access_token)
        this.user.token=res.data.access_token
        //获取access_token后再去设置模板参数
        var data={
          touser: this.user.openid,
          template_id: 'PLLbqEkOc206CZqKafIacU_XmXkDg3_XsVnbQHpleEQ',  // 在此处填写模板id
          page: 'index',
          miniprogram_state:'developer',
          lang:"zh_CN",
          data: {
            name3: {
              value: '王辉辉、张琳琳'
            },
            thing4:{
              value:'婚宴'
            },
            time5: {
              value: '2019年1月28日'
            },
            thing2: {
              value: '请记得按时参加婚宴哦'
            },
            thing8: {
              value: '李四'
            }
          }
        }
        //发送模板
        this.sendTemplateMessage(data)
      }
    })
  },
  // 用于发送模板消息
  sendTemplateMessage: function(data) {
    var url = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + this.user.token
      wx.request({
        url: url,
        method: 'post',
        data: data,
        success: res=>{ 
          console.log('模板消息发送结果：', res.data)
        }
      })
  }
}