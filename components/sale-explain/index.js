Component({
    properties: {
        texts: Array
    },
    data: {
        _text:null
    },
    observers:{
        'texts':function(texts){
            this.setData({
                _text:texts
            })

        }
    },
    methods: {}
});
