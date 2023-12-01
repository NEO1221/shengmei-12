class HistoryKeyword{
    static MAX_ITEM_COUNT = 20
    keywords = []
    static KEY = 'keywords'
    constructor() {
        if(typeof HistoryKeyword.instance === 'object'){
             return HistoryKeyword.instance
        }
        HistoryKeyword.instance = this
        this.keywords = this._getLocalKeywords();
        return this
    }
    save(keyword){
        const items = this.keywords.filter(k=>{
            return keyword === k
        })
        if(items.length !== 0 ){
            return
        }
        if(this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT){
            console.log(16)
            this.keywords.pop()
        }
        this.keywords.unshift(keyword)
        this._refleshLocal()
    }
    get(){
        return this.keywords
    }
    clear(){
        this.keywords = []
        this._refleshLocal()
    }
    _refleshLocal(){
       wx.setStorageSync(HistoryKeyword.KEY,this.keywords)
    }

    _getLocalKeywords() {
        const keywords = wx.getStorageSync(HistoryKeyword.KEY)
        if(!keywords){
            wx.setStorageSync(HistoryKeyword.KEY,[])
            return []
        }
        return keywords
    }
}
export {HistoryKeyword}