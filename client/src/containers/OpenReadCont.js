import React, { Component } from 'react';
import * as OpenReadAction from '../actions/OpenReadAction.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import Filebrowser from '../Components/Filebrowser.js'

export class OpenReadCont extends Component{
     constructor(props){
         super(props);
         //console.log(props);
     }

     readFile = (state) =>{
         this.props.OpenReadAction.readFile(state);
     }

     render() {
        
        
        return (
            <div>
                <Filebrowser
                    readFile={this.readFile}
                    data = {this.props.data}
                    openCount = {this.props.count}                
                />
            </div>
        );
}
}

function mapStateToProps(state) {
    
    return {
       data: state.dataFromFile,
       count: state.countOfOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        OpenReadAction: bindActionCreators(OpenReadAction, dispatch)
}
}


export default connect(mapStateToProps,mapDispatchToProps)(OpenReadCont);