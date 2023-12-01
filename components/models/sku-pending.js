import {Cell} from "./cell";
import {Joiner} from "../../utils/Joiner";

class SkuPending{
    pending = []
    size
    constructor(size) {
        this.size = size
    }
    //存储默认的sku,存储了三个规格对象
    init(sku){
        this.size = sku.specs.length
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new  Cell(sku.specs[i])
            this.insertCell(cell,i)
        }
    }
    getCurrentSpecValues(){
        const values = this.pending.map(cell=>{
            return cell ? cell.spec.value : null
        })
        return values
    }
    getMissingSpecValues(){
        const keyIndex=[]
        for (let i = 0; i <this.size ; i++) {
            if(!this.pending[i]){
                keyIndex.push(i)
            }
        }

        return keyIndex
    }
    getSkuCode(){
        const joiner = new Joiner('#')
        this.pending.forEach(cell=>{
            if(!cell){ return }
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }
    isIntact(){
        for (let i = 0; i < this.pending.length; i++) {
            if(this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }
    _isEmptyPart(index){
        return this.pending[index] ? false: true
    }
    //存储和删除，选中和取消 的cell
    insertCell(cell,x){
        this.pending[x] = cell
    }
    removeCell(x){
        this.pending[x] = null
    }
    //找到选中的cell
    findSelectedCellByX(x){
        return this.pending[x]
    }

    //判断某一个cell是否选中
    isSelected(cell,x){
        const pendingCell = this.pending[x]
        if(!pendingCell){
            return false
        }
        return cell.id === pendingCell.id ? true : false;
    }
}

export {SkuPending}