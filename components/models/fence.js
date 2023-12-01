import { Cell } from "./cell"

class Fence{

    cells = []
    title
    id
    specs

    constructor(specs){
          this.specs = specs;
          // console.log(this.specs[0].key_id);
          this.title = specs[0].key;
          this.id = specs[0].key_id;



    }
    init(){
        this._initCells();
    }
    _initCells(){
        //标记：查看some和every方法
        this.specs.forEach(s=>{
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if(existed){
                return
            }
            // this.pushValueTitle(s.value)
            const cell = new Cell(s);
            this.cells.push(cell)
        })
    }

    // pushValueTitle(title){
    //     this.valueTitles.push(title);
    // }
    setFenceSketch(skuList) {
        this.cells.forEach(c=>{
            this._setCellSkuImg(c,skuList)
        })
    }
    _setCellSkuImg(cell,skuList){
        const specCode = cell.getCellCode()
        const matchedSku  = skuList.find(s=>s.code.includes(specCode))
        if(matchedSku){
            cell.skuImg = matchedSku.img
        }
    }
}
export{Fence}