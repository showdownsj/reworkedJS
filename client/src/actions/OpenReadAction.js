import *as types from '../constants/ActionFile.js';

export function readFile (data){
    return{
        type: types.READ_FILE,
        data
    };
}

