import *as types from '../constants/FileActions.js';

export function readFile (data){
    return{
        type: types.READ_FILE,
        data
    };
}

