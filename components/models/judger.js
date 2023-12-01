import {SkuCode} from "./sku-code";
import {CellStatus} from "../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/Joiner";
import {Cell} from "./cell";
// import {join} from "../../miniprogram_npm/lin-ui/filter/array.wxs";

class Judger{
    fenceGroup
    pathDict = []
    skuPending
    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initSkuPending()
        this.initPathDict()
    }
    initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
    }
    //用户点击cell后，执行的变化
    judge(cell,x,y,isInit=false){
        if(!isInit){
            this._changeCurrentCellStatus(cell,x,y)
        }
        this.fenceGroup.eachCell((cell,x,y)=>{
            const path = this._findPotentialPath(cell,x,y)
            if(!path){
                return
            }
            const isIn = this._isInDict(path)
            if(isIn){
                this.fenceGroup.setCellsStatusByXY(x,y,CellStatus.WAITING)
            }else{
                this.fenceGroup.setCellsStatusByXY(x,y,CellStatus.FORBIDDEN)
            }
        })
    }
    isSkuIntact(){
        return this.skuPending.isIntact()
    }
    //保存已选的cell，或默认的sku
    _initSkuPending(){
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fenceGroup.getDefaultSku();
        if(!defaultSku){
            return
        }
        //存储了三个默认的规格对象
        this.skuPending.init(defaultSku)

        this._initSelectedCell()

        this.judge(null,null,null,true )
        // console.log(this.skuPending)
    }
    _initSelectedCell(){
        this.skuPending.pending.forEach(cell=>{
            this.fenceGroup.setCellsStatusById(cell.id,CellStatus.SELECTED)
        })
    }

    getMissingKeys(){
        const missingKeysIndex  = this.skuPending.getMissingSpecValues()
        return  missingKeysIndex.map(i=>{
            return this.fenceGroup.fences[i].title
        })

    }

    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues()
    }

    getDeterminateSku(){
        const code = this.skuPending.getSkuCode()
        const sku = this.fenceGroup.getSku(code)
        return sku
    }
    _changOtherCellStatus(cell,x,y){


    }
    _findPotentialPath(cell,x,y){
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if(x===i){
                if(this.skuPending.isSelected(cell,x)){
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            }else{
                if(selected){
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }
    _isInDict(path){
        return this.pathDict.includes(path)
    }
    _getCellCode(spec){
        return spec.key_id + '-' + spec.value_id
    }

    _changeCurrentCellStatus(cell,x,y){
        if(cell.status === CellStatus.WAITING){
            this.fenceGroup.setCellsStatusByXY(x,y,CellStatus.SELECTED)
            this.skuPending.insertCell(cell,x);
        }
        if(cell.status === CellStatus.SELECTED){
            this.fenceGroup.setCellsStatusByXY(x,y,CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }
    }

}
export {Judger}