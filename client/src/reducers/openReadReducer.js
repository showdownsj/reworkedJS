import * as types from '../constants/FileActions'

const initialState = {
    countOfOpen: 0,
    dataFromFile: []
}

const  openReadReducer = (state = initialState  ,action) => {

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
export default openReadReducer;