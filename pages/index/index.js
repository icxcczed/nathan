Page({
  data:{
    isPlayingMusic:false,
    bgm:null,
    music_url:'http://....../xx.mp3',
    onReady:function (){
      this.bgm=wx.getBackgroundAudioManager()
      this.bgm.title ='marry me'
      this.bgm.epname ='wdding'
      this.bgm.singer ='singer'
      this.bgm.coverImgUrl =this.music_coverImgUrl
      this.bgm.onCanPlay(()=> {
        this.bgm.pause()
      })
      this.bgm.src = this.music_url
    },
    play:function(e) {
      if(this.data.isPlayingMusic) {
        this.bgm.pause()
      }else{
        this.bgm.play()
      }
      this.setData({
        isPlayingMusic: !this.data.isPlayingMusic
      })
    },
    callGroom:function(){
      wx.makePhoneCall({
        phoneNumber:'1370000000000'
      })
    },
    callBride:function(){
      wx.makePhoneCall({
        phoneNumber: '1560000000000'
      })
    }
  }
})
