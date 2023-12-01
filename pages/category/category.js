import {getSystemSize} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Categories} from "../../model/categories";
import {SpuListType} from "../../components/core/enum";

Page({
    data: {
        categories:null,
        defaultRootId:2,
        roots:null
    },
    onLoad: async function (options) {
        this.initCategoryData()
        await this.setDynamicSegmentHeight()
    },
    async initCategoryData(){
        const categories = new Categories()
        this.data.categories = categories
        await categories.getAll()
        const roots = categories.getRoots()

        const defaultRoot = this.getDefaultRoot(roots)
        const currentSubs = categories.getSubs(defaultRoot.id)
        console.log(currentSubs)
        this.setData({
            roots:roots,
            currentSubs,
            currentBannerImg :defaultRoot.img
        })
    },
    onSegChange(event){
        const rootId = event.detail.activeKey
        const currentSubs = this.data.categories.getSubs(rootId)
        const currentRoot = this.data.categories.getRoots(rootId)
        CellStatus.SELECTED
        this.setData({
            currentSubs,
            currentBannerImg:currentRoot.img
        })
    },
    onJumpToSpuList(event){
        const cid = event.detail.cid

        const  url=`/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
        console.log(url)
        wx.navigateTo({
            url:url
        })
    },
    getDefaultRoot(roots){
        let defaultRoot = roots.find(r=>r.id === this.data.defaultRootId)
        if(!defaultRoot){
            defaultRoot = roots[0]
        }
        return defaultRoot
    },
    async setDynamicSegmentHeight(){
        const res = await getSystemSize()
        const windowHeightRpx = px2rpx(res.windowHeight)
        const h = windowHeightRpx*2-60-20-2
        this.setData({
            segHeight:h
        })
    },
    onGotoSearch(event){
        wx.navigateTo({
            url:`/pages/search/search`
        })
    }
});