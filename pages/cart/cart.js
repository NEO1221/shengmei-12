import {Cart} from "../../model/cart";

Page({
    data: {
        cartItems:[],
        isEmpty:false,
        showRealm: false,
        cartItemCount:0
    },
    onLoad: function (options) {

    },
    onShow:function (){
        const cart = new Cart()
        const cartItems = cart.getAllCartItemFromLocal().items;
        // console.log(cartItems)
        // checked: true
        // count: 9
        // sku: {id: 39, price: 3799, discount_price: 3299, online: true, img: "https://zhipengwy.cn/static/qianduan/3.png", …}
        // skuId: 39
        if(cart.isEmpty()){
            this.empty()
            return
        }
        this.setData({
            cartItems
        })
        this.notEmpty()
    },
    empty(){
        this.setData({
            isEmpty:true,
        })
        wx.hideTabBarRedDot({
            index:2
        })
    },
    notEmpty(){
        this.setData({
            isEmpty: false
        })
        wx.showTabBarRedDot({
            index:2
        })

    }
});