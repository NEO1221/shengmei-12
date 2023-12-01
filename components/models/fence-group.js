import {Fence} from "../models/fence"
import {Matrix} from "../models/matrix"
class FenceGroup{
    spu
    skuList=[]
    fences =[]
    constructor(spu){
        this.spu = spu;
        this.skuList = spu.sku_list;
      }
        initFences(){
            const matrix = this._createMatrix(this.skuList);
            const fences = [];
            const AT = matrix.transpose();
            AT.forEach(r=>{
                const fence = new Fence(r)
                fence.init();
                if(this._hasSketchFence() && this._isSketchFence(fence.id)){
                    fence.setFenceSketch(this.skuList)
                }
                fences.push(fence)
            })
            this.fences = fences
            // console.log(fences)
        }

        _isSketchFence(fenceId){
            return this.spu.sketch_spec_id === fenceId ? true : false
        }
        _hasSketchFence(){
            return this.spu.sketch_spec_id ? true: false
        }
        setCellsStatusById(cellId,status){
            this.eachCell((cell)=>{
                if(cell.id  === cellId){
                    cell.status = status
                }
            })
        }
        getSku(skuCode){
            const fullSkuCode = this.spu.id +'$'+skuCode
            // console.log(fullSkuCode)
            const sku = this.spu.sku_list.find(s=>s.code === fullSkuCode)
            return sku?sku:null
        }

        setCellsStatusByXY(x,y,status){
            this.fences[x].cells[y].status = status
        }

        getDefaultSku(){
            // 先获取默认的sku id，然后找到sku对象
            const defaultSkuId = this.spu.default_sku_id
            if(!defaultSkuId){
                return
            }
            return this.skuList.find(s=>s.id === defaultSkuId)
        }
        eachCell(cb){
            for(let i = 0; i<this.fences.length ;i++){
                for(let j = 0 ; j<this.fences[i].cells.length ; j++){
                    const cell = this.fences[i].cells[j]
                    cb(cell,i,j)
                }
            }
        }
     
        _creatFence(element){
            const fence = new Fence();
            fence.pushValueTitle(element.value)
            return fence
        }

        _createMatrix(skuList){
      
            const m = [];
            skuList.forEach(sku=>{
                m.push(sku.specs)
            })  
            return new Matrix(m);
        }
    
}
export{FenceGroup}