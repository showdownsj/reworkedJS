import React, { Component } from 'react';
//var TableDesign = require('./TableDesign');
import Tabledesign from './Tabledesign';

class Filebrowser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countOfOpen: 0,
            dataFromFile: []
        }

    }

    readFile = (e) => {
        e.preventDefault();

        var file = e.target.files[0];
        var reader = new FileReader();
        var self = this;
        console.log(this.state);

        reader.onload = function (e) {

            var jsonSTR = e.target.result.trim();
            var dataFromFile = JSON.parse(jsonSTR);

            self.setState({
                countOfOpen: ++self.state.countOfOpen,
                dataFromFile: dataFromFile
            });

        };
        reader.readAsText(file);
    }


    render() {
        console.log();
        return (
            <div className="app">
                <input type="file" onChange={this.readFile} className='browseButt'></input>
                <Tabledesign data={this.state.dataFromFile} flag={this.state.countOfOpen} />
            </div>

        );
    }
};

export default Filebrowser;