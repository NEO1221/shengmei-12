// pages/home/home.js

import { Activity } from "../../model/activity";
import { Banner } from "../../model/banner";
import { Category } from "../../model/category";
import { SpuPaging } from "../../model/spu-paging";
import { Theme } from "../../model/theme";

Page({

  /**
   * 页面的初始数据
   */ 
  data: {
      themeA: null,
      themeE: null,
      bannerB: null,
      grid:[],
      activityD: null,
      themeESpu : null,
      themeF:null,
      bannerG:null,
      themeH:null,
      themeZ:null,
      spuPaging:null
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    this.initAllData();
    this.initBottomSpuList();

  },


  async initBottomSpuList(){
      const paging = await SpuPaging.getLastestPaging()
      this.data.spuPaging = paging
      const data =  await paging.getMoreData();
      wx.lin.renderWaterFlow(data.items);
      
  },

  async initAllData(){

      // const themeA = await Theme.getHomeLocationA();
      const themes = new Theme()
      await themes.getThemes();
      const themeA = themes.getHomeLocationA();
      const themeE = themes.getHomeLocationE();
      const themeF = themes.getHomeLocationF();
      const themeH = themes.getHomeLocationH();
      const themeZ = themes.getHomeLocationZ();
      
      let themeESpu = [];
      if(themeE.online) {
          const data = await Theme.getHomeLocationESpu();
          
          if(data){
              themeESpu = data.spu_list;
          } 

      }
      const bannerB = await Banner.getHomeLocationB();
      const gridSub = await Category.getHomeLocationC();
      const grid = gridSub.roots
      const activityD = await Activity.getHomelocationD();
      const bannerG = await Banner.getHomeLocationG();
      

      this.setData({
        themeA,
        themeE,
        bannerB,
        grid,
        activityD,
        themeESpu,
        themeF,
        bannerG,
        themeH,
        themeZ
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
      const data = await this.data.spuPaging.getMoreData()
      if(!data){
        return 
      }
      wx.lin.renderWaterFlow(data.items)
      if(!data.moreData){
        this.setData({
          loadingType: 'end'
        })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})