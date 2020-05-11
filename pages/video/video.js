// pages/video/video.js
Page({
  data:{
    src:'http://....../xxx.mp4',
    danmuList:[
      {text:'第1s出现的弹幕',color:'#ff0000',time:1},
      {text:'第3s出现的弹幕',color:'#ff0000',time:3}
    ]
  },
  videoContext:null,
  inputValue:'',
  onReady:function (){
    this.videoContext = wx.createVideoContext('myVideo')
  },
  bindInputBlur:function (e){
    this.inputValue = e.detail.value
  },
  bindSendDanmu:function(){
    this.videoContext.sendDanmu({
      text:this.inputValue,
      color:'#f90'
    })
  },
  bindButtonTap:function(){
    wx.chooseVideo({
      sourceType:['album','camera'],  //视频选择的来源，相册和相机
      maxDuration:60,                 //拍摄视频最长拍摄时间（s）
      camera: 'black',                //默认拉起的是前置（front)或者后置（back）摄像头
      success:res =>{                 //成功执行的回调函数
        this.setData({
          src:res.tempFilePath        //选定规则的临时文件路径
        })
      }
    })
  },
  onReady:function(){
    const TxvContext = requirePlugin('tencentvideo')
    var txvContext = TxvContext.getTxvContext('txv1')
    txvContext.play()  //播放
    txvContext.pause()//暂停
  },
  movieList:[{
    create_time:1532519734589,title:'海边随怕',
    src:'http://....../xxx.mp4'
  },{
    create_time:1532519777690,title:'勿忘心安',
    src:'http://....../xxx.mp4'
  },{
    create_time:1532519794991,title:'点滴记忆',
    src:'http://....../xxx.mp4'
  }]
})