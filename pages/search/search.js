import {HistoryKeyword} from "../../model/history-keyword";
import {Tag} from "../../model/tag";
import {Search} from "../../model/search";
import {showToast} from "../../utils/ui";

const history = new HistoryKeyword()
Page({
    data: {
        hotTags:null
    },
    onLoad: async function (options) {
        const historyTags = history.get()
        const hotTags = await  Tag.getSearchTags()
        this.setData({
            historyTags,
            hotTags
        })
    },
    onCancel(event) {
        this.setData({
            search:false
        })
    },
    async onSearch(event){
        this.setData({
            search: true
        })
        const keyword = event.detail.value || event.detail.name
        if(!keyword){
            showToast('请输入老师姓名')
            return
        }
        history.save(keyword)
        this.setData({
            historyTags: history.get()
        })
        const paging = Search.search(keyword)
        wx.lin.showLoading({
            color:'#157658',
            type:'flash',
            fullScreen:true
        })
        const data = await paging.getMoreData()
        wx.lin.hideLoading()
        this.bindItems(data)
    },
    bindItems(data){
        if(data.accumulator.length !==0 ){
            this.setData({
                items : data.accumulator
            })
        }
    },
    onDeleteHistory(event){
        history.clear()
        this.setData({
            historyTags:[]
        })
    }

});