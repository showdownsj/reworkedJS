import *as types from '../constants/FileActions.js';

//readFile() - action creator that represents a data reading from file   
export function readFile (data){
    return{
        type: types.READ_FILE,
        data
    };
}

