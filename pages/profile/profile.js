//index.js
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  toPast: function () {
    wx.navigateTo({
      url: '/pages/profile/past/past'
    })
  },
  

  onLoad: function () {
    
  },

 

  onShow: function () {
    let page = this
    const userId = app.globalData.userId;
    const host = app.globalData.host;
    wx.request({
      url: `${host}users/${userId}.json`,
      method: 'get',
      success(res) {
        console.log(res)
        page.setData({
          comp: res.data.user.comp
        })
      }
    })
    console.log(Date.now());
    console.log("Profile page has loaded");
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
