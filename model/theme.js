
import {config} from "../config/config";
import { Http } from "../utils/http";

export class Theme{

  static locationA = 't-1';
  static locationE = 't-2';
  static locationF = 't-3';
  static locationH = 't-4';
  static locationZ = 't-5';

  themes = [];

   async getThemes(callback){

    this.themes =  await Http.request({
      url:`theme/by/names`,
      data:{
        names:`${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
      },
    })
   }
    getHomeLocationA(){
     return this.themes.find(t=>t.name === Theme.locationA);
   }
   getHomeLocationE(){
    return this.themes.find(t=>t.name === Theme.locationE);
  }

  getHomeLocationF(){
    return this.themes.find(t=>t.name === Theme.locationF);
  }
  getHomeLocationH(){
    return this.themes.find(t=>t.name === Theme.locationH);
  }
  getHomeLocationZ(){
    return this.themes.find(t=>t.name === Theme.locationZ);
  }

  //获取spu
    static async getHomeLocationESpu(){
       return this.getThemeSpuByName(Theme.locationE)
    }
    static async getThemeSpuByName(name){
       return await Http.request({
           url:`spu`
       })
    }
}