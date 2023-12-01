import { promisic } from "../miniprogram_npm/lin-ui/utils/util";

const { config } = require("../config/config");

class Http{
  
  static  async request({url,data,callback,method='GET'}){
    const res =  await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header:{
        appkey : config.appkey
      }
    })

    // console.log(url)
    return res.data;
  }
}

export{Http}