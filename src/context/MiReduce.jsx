import type from "./type.jsx";

const MiReduce = (state={},action) => {
    switch(action.type){
        case type.login:{
            return {
                logged:true,
                usuario:action.playload
            }
        }
        case type.logout:{
            return{
                logged:false,
                usuario:null
            }
        }
        default:{
            return state;
        }
    }
  
}

export default MiReduce;
