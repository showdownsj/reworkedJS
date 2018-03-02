import React, { Component } from 'react';
import Tabledesign from './Tabledesign';

class Filebrowser extends Component {

    constructor(props) {
        super(props);
        //console.log(this.props);
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
       // console.log(this.props);

        reader.onload = function (e) {
           // console.log(self.state);
            var jsonSTR = e.target.result.trim();
            var dataFromFile = [];
            try {
                dataFromFile = JSON.parse(jsonSTR);
            }
            catch (err) { }
            /*self.setState({
                countOfOpen: ++self.state.countOfOpen,
                dataFromFile: dataFromFile
            });*/
            let returned = self.props.readFile({ countOfOpen: self.state.countOfOpen,
                                     dataFromFile: dataFromFile})
            console.log(self.props);
            //self.setState(self.props.readFile({ countOfOpen: self.state.countOfOpen,
            //                     dataFromFile: dataFromFile}));
            //console.log(self.state);

        };
        reader.readAsText(file);
    }

    checkOpenFile = () => {

        if (this.state.dataFromFile.length > 0)
            return (<div>
                <Tabledesign data={this.state.dataFromFile} flag={this.state.countOfOpen} />
            </div>);
        else if (this.state.countOfOpen > 0)
            return (<div className='openError'><br />An attempt to open incorrect file</div>);
        return (<Tabledesign data={this.state.dataFromFile} flag={this.state.countOfOpen} />);
    }

    render() {
        //console.log(this.state);
        return (
            <div className="app">
                <input type="file" onChange={this.readFile} className='browseButt'></input>
                {this.checkOpenFile()}
            </div>

        );
    }
};

export default Filebrowser;