// pages/detail/detail.js
import {Spu} from "../../model/spu"
import {ShoppingWay} from "../../components/core/enum";
import {SaleExplain} from "../../components/models/sale-explain";
import {getWindowHeightRpx} from "../../utils/system";
import {Cart} from "../../model/cart";
import {CartItem} from "../../model/cart-item";
Page({
  /**
   * 页面的初始数据
   */
  data: {
        spu:null,
        showRealm:false,
        orderWay:null,
        saleExplain:null,
        h:null,
        spec:null
  },

   async onLoad(options) {
        const pid = options.pid;
        const spu = await Spu.getDetail();
        const explain = await SaleExplain.getFixed()
        const windowHeight =  await getWindowHeightRpx()

       const h = windowHeight -100
        this.setData({
            spu,
            saleExplain:explain,
            h
      })
       this.updateCartItemCount()
  },

    onSpecChange(event){
        this.setData({
            specs:event.detail
        })
    },
  onAddToCart(event){
      this.setData({
          showRealm:true,
          orderWay:ShoppingWay.CART
      })
  },
  onBuy(event){
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.BUY
    })
  },
  onGotoHome(event){
      wx.switchTab({
        url:'/pages/home/home'
      })
  },
  onGotoCart(event){
      wx.switchTab({
        url:'/pages/cart/cart'
      })
  },
    onShopping(event){
        /*
        event.detail
        * orderWay: "cart"
        sku: {id: 1, price: 4799, discount_price: 4299, online: true, img: "https://zhipengwy.cn/static/fengxiu/p1.jpg", …}
        skuCount: 1
        spuId: 26
        * */
        const chosenSku = event.detail.sku
        const skuCount = event.detail.skuCount
        if(event.detail.orderWay === ShoppingWay.CART){
            const cart = new Cart()
            const cartItem = new CartItem(chosenSku,skuCount)
            cart.addItem(cartItem)
        }
    },
    updateCartItemCount(){
        const cart = new Cart()
        this.setData({
            cartItemCount : cart.getCartItemCount(),
            showRealm :false
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
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})