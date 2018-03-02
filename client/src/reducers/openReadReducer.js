import * as types from '../constants/FileActions'

//openReadReducer(state, action) - return the app's state changes in response to some type of action;
//                                 has 2 arguments:
//                                 state - include prevent state or is initialState by default; 
//                                 action - show that something happened (which kind of action) 

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