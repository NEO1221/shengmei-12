Component({
    properties: {checked:Boolean},
    data: {checked:false},
    methods: {
        onCheck(event){
            let data = this.properties.checked;
            let checked = !data;
            this.setData({
                checked
            })
            this.triggerEvent('check',{
                checked
            },{
                bubbles:true,
                composed:true
            })
        }
    }
});
