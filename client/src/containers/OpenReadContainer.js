import React, { Component } from 'react';
import * as OpenReadAction from '../actions/OpenReadAction.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import TableDesign from './Tabledesign.js';
import Filebrowser from '../Components/Filebrowser.js'

//There's container wich implements the actions and generating next states:
//  1) readFile(file) - opens the file, then tries to parse that file and calls
//                      the action of reading file (arguments depend on the result of parsing)
//                      which generate the next state of 'props';
//  2) checkOpenFile() - returns the rendering of table depends on the result of file reading

export class OpenReadContainer extends Component {
    constructor(props) {
        super(props);

    }

    readFile = (file) => {

        var reader = new FileReader();
        var dataFromFile = [];
        const state = this.props;
     
        reader.onload = function (e) {
            var jsonSTR = e.target.result.trim();
            try {
                dataFromFile = JSON.parse(jsonSTR);

                this.props.OpenReadAction.readFile({
                    dataFromFile: dataFromFile,
                    countOfOpen: state.count
                });
            }
            catch (err) {
                this.props.OpenReadAction.readFile({
                    dataFromFile: [],
                    countOfOpen: state.count
                })
            }
        }.bind(this);
        reader.readAsText(file);

    }

    checkOpenFile = () => {
        
                if (this.props.data.length > 0)
                    return (<div>
                        <TableDesign data={this.props.data} flag={this.props.count} />
                    </div>);
                else if (this.props.count > 0)
                    return (<div className='openError'><br />An attempt to open incorrect file</div>);
                return (<TableDesign data={this.props.data} flag={this.props.count} />);
            }

    render() {

        console.log(this.props);
        return (
            <div>
                <Filebrowser
                    readFile={this.readFile}
                    data={this.props.data}
                    openCount={this.props.count}
                    checkOpenFile = {this.checkOpenFile}
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

export default connect(mapStateToProps, mapDispatchToProps)(OpenReadContainer);