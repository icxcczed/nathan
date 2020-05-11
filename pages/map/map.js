// opages/map/map.js
Page({

  data: {
    latitude:40.06021,longitude:116.3433,
    markers:[{
      iconPath:'/images/navi.png', id:0,
      latitude:40.06021,longitude:116.3433,width:50,height:50
    }]
  },
  markers:function(){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude:this.data.longitude,
      name:'XX大酒店',address:'北京市 海定区 XX路'
    })
  },
  buttonTap:function(){
    wx.getLocation({
      type: 'gcj02',
      success:function(res){
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  }
})