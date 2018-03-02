import React, { Component } from 'react';

//There's a component 


class Filebrowser extends Component {

    constructor(props) {
        super(props);
    }

    readFile = (e) => {
        e.preventDefault();
        var file = e.target.files[0];
        this.props.readFile(file);
    }

    render() {
        console.log(this.props);
        return (
            <div className="app">
                <input type="file" onChange={this.readFile} className='browseButt'></input>
                {this.props.checkOpenFile()}
            </div>
        );
    }
};

export default Filebrowser;