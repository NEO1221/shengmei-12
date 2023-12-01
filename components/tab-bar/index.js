Component({
    properties: {
        cartItemCount:Number
    },
    data: {},
    methods: {
        onGotoHome(event){
            this.triggerEvent('gotoHome',{})
        },
        onGotoCart(event){
            this.triggerEvent('gotocart',{})
        },
        onAddToCart(event){
            this.triggerEvent('addtocart')
        },
        onBuy(event){
            this.triggerEvent('buy')
        }

    }
});
