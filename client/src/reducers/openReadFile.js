import * as types from '../constants/ActionFile.js'

const initialState = {
    countOfOpen: 0,
    dataFromFile: []
}

const  openReadFile = (state = initialState  ,action) =>{

        console.log(action);
        switch(action.type){
        case types.READ_FILE:{
        return(
            {    ...state,
                countOfOpen: action.data.countOfOpen + 1,
                dataFromFile: action.data.dataFromFile
            }
        
        );
        }
        default: 
            return state;
    }


}
export default openReadFile;