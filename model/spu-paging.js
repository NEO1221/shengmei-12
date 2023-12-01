import {Paging} from "../utils/paging";

class SpuPaging{
    static async getLastestPaging(){
      return new Paging({   
          url:`spu/lastest`
      },3)
    }
}

export{
  SpuPaging
}