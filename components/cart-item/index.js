import {parseSpecValue} from "../../utils/sku";
import {Cart} from "../../model/cart";

Component({
    properties: {
        checked: Boolean,
        cartItem: Object,
        stock:Cart.SKU_MAX_COUNT,
        skuCount:1


    },
    data: {
        specStr:String,
        discount:Boolean,
        soldOut:Boolean,
        onLine:Boolean
    },
    observers:{
        cartItem:function(cartItem){
            if(!cartItem){
                return
            }
            const specStr = parseSpecValue(cartItem.sku.specs)
            const discount = cartItem.sku.discount_price ? true :false
            const soldOut = Cart.isSoldOut(cartItem)
            const online = Cart.isOnline(cartItem)
            this.setData({
                specStr,
                discount,
                soldOut,
                online,
                stock:cartItem.sku.stock,
                skuCount:cartItem.count
            })
        }
    },
    methods: {
        onDelete(event){
            const skuId = this.properties.cartItem.sku.id
            const cart = new Cart()
            cart.removeItem(skuId)
            this.setData({
                cartItem:null
            })
            this.triggerEvent('itemdelete',{
                skuId
            })
        },
        checkedItem(event){
            const checked = event.detail.checked
            this.triggerEvent('itemcheck',{
                
            })
        }
    }
});
