import {Joiner} from "./Joiner";

const parseSpecValue = function(specs){
    if(!specs){
        return null
    }
    const joiner  = new Joiner('; ',2)
    specs.map(spec=>{
        joiner.join(spec.value)
    })
    return joiner.getStr()
}
export {parseSpecValue}