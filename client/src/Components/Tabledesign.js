import React, { Component } from 'react';

// Component to work with table-data:
//addNewLine() - adding empty line to table (enable edit);
//onChangeHandler() - handling changes in input-field;
//onClickEdit() - enable/disable the possible of edit;
//onClickDelete() - deleting current line from table;

class Tabledesign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: [],
            dataTable: null,
            sortState: [],
            startFlag: 0,
            result: [0, '', ''],
            errors: [],
            warnings: []
        };

    }

    onChangeHandler = (e) => {
        e.preventDefault();

        var targetKey = e.target.parentNode.parentNode.accessKey;
        var dataTable = this.state.dataTable;
        var propName = e.target.className;
        var value = e.target.value;
        for (var index in dataTable) {

            if (dataTable[index].id === targetKey) {
                if (propName === 'age' && !isNaN(value))
                    dataTable[index][propName] = parseInt(value) || 0;

                else if (propName !== 'age')
                    dataTable[index][propName] = value;

            }

        }

        for (var i = 0; i < dataTable.length; i++)
            for (var prop in dataTable[i]) {

                if (dataTable[i]['' + prop] === '') {

                    dataTable[i]['' + prop] = null;
                }
                console.log(dataTable[index]);
            }

        this.setState({
            dataTable: dataTable
        });


    }

    onAddHandler = (e) => {
        e.preventDefault();
        //console.log(this.props.data);
        var dataTable = this.state.dataTable || [];
        var disabled = createStates(dataTable, this.state.disabled);

        dataTable.push({
            id: generateID(dataTable),
            name: null,
            age: 1,
            gender: 'male',
            phone: null,
            company: null,
            email: null,
            address: null
        });
        disabled[dataTable.length - 1] = true;
        //console.log(states);
        this.setState({
            disabled: disabled,
            dataTable: dataTable
        });
        //console.log(dataTable);
    }

    onClickEditHandler = (e) => {
        e.preventDefault();

        var targetKey = e.target.parentNode.parentNode.accessKey;
        var dataTable = this.state.dataTable;
        var disabled = this.state.disabled;

        for (var index in dataTable)
            if (dataTable[index].id === targetKey)
                disabled[index] = disabled[index] ? false : true;

        this.setState({ disabled: disabled });
        console.log(disabled);
    }

    onClickDeleteHandler = (e) => {
        e.preventDefault();
        var targetKey = e.target.parentNode.parentNode.accessKey;
        var dataTable = this.state.dataTable;
        var disabled = createStates(dataTable, this.state.disabled);

        for (var index in dataTable)
            if (dataTable[index].id === targetKey) {
                dataTable.splice(index, 1);
                disabled.splice(index, 1);
            }
        //console.log(dataTable);
        this.setState({
            disabled: disabled,
            dataTable: dataTable
        });
    }

    onClickHeaderHandler = (e) => {
        e.preventDefault();
        var target = e.target;
        var headers = document.getElementsByTagName('th');
        headers = [].slice.call(headers);
        var targetIndex = headers.indexOf(target) & headers.indexOf(target.parentNode);

        //define the className of header
        var className;
        if (headers.indexOf(target) > -1)
            className = target.className;
        else if (headers.indexOf(target.parentNode))
            className = target.parentNode.className;

        var sortState = this.state.sortState;
        if (sortState.length === 0) {
            sortState = Array(headers.length - 1);
            for (var index = 0; index < sortState.length; index++) {
                sortState[index] = 0;
            }
        }

        if (targetIndex > -1)
            if (sortState[targetIndex] === 0 || sortState[targetIndex] === 2)
                sortState[targetIndex] = 1;
            else if (sortState[targetIndex] === 1)
                sortState[targetIndex] = 2;

        for (var index = 0; index < sortState.length; index++)
            if (index !== targetIndex)
                sortState[index] = 0;

        var sorted = sortDataInc(className, this.state.dataTable,
            this.state.disabled, sortState[targetIndex]);

        this.setState({
            dataTable: sorted.TD,
            disabled: sorted.ST,
            sortState: sortState
        })

    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        var validate = this.validator(this.state.dataTable);
        var self = this;
        fetch('/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validate.toSubmit)
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            console.log(body);
        });

        self.setState({
            result: [1, 'success', 'records has been added and updated'],
            errors: validate.errors,
            warnings: validate.warnings
        });



    }

    validator = (data) => {
        var errors = [];
        var warnings = [];
        var toSubmit = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].name === null || data[i].age < 0 || data[i].gender === null)
                errors.push(data[i].id);
            else if (data[i].phone === null || data[i].address === null || data[i].company === null || data[i].email === null) {
                toSubmit.push(data[i])
                warnings.push(data[i].id);
            }
            else toSubmit.push(data[i]);
        }

        return { errors: errors, warnings: warnings, toSubmit: toSubmit };

    }

    drawTableFields = (data, self) => {

        return data.map(function (item, index) {

            return (
                <tr key={item.id} accessKey={item.id} onChange={self.onChangeHandler} className={!self.state.disabled[index] ? "trDisabled" : ""} className={self.state.errors.indexOf(item.id) > -1 ? "hasErr" : '' || self.state.warnings.indexOf(item.id) > -1 ? "hasWarn" : ''}>
                    <td className='number'>{index + 1}</td>
                    <td><input type='text' value={item.name} className="name" disabled={!self.state.disabled[index]} /></td>
                    <td><input type='text' value={item.age} className="age" disabled={!self.state.disabled[index]} /></td>
                    <td><select className='gender' value={item.gender} disabled={!self.state.disabled[index]}>
                        <option value='male' >{"male"}</option>
                        <option value='female' >{"female"}</option>
                    </select></td>

                    <td><input type='text' value={item.email} className="email" disabled={!self.state.disabled[index]} /></td>
                    <td><input type='text' value={item.company} className="company" disabled={!self.state.disabled[index]} /></td>
                    <td><input type='text' value={item.phone} className="phone" disabled={!self.state.disabled[index]} /></td>
                    <td><input type='text' value={item.address} className="address" disabled={!self.state.disabled[index]} /></td>
                    <td className='action'><button className={!self.state.disabled[index] ? 'editButtIn' : 'editButtAc'} onClick={self.onClickEditHandler}>Edit</button>
                        <button className='deleteButt' onClick={self.onClickDeleteHandler}>Delete</button>
                    </td>
                </tr>
            )
        }
        )
    }

    render() {
        //console.log(this.props.data);
        var dataTable = this.state.dataTable || this.props.data;
        var isSubmit = false;
        var result = this.state.result;

        //console.log(this.state.result);

        if (this.state.result[0] !== 0)
            this.state.result = [0, ''];

        var errors = this.state.errors;
        var warnings = this.state.warnings;


        // this.state.errors = this.state.warnings =[];

        //console.log(this.props.flag);
        //.. there's some crutch to change an initial state
        if (this.state.dataTable === null && this.props.data.length > 0) {
            //console.log(this.props.data);
            this.state.dataTable = this.props.data;

            dataTable = this.state.dataTable;
            this.state.disabled = createStates(dataTable, []);
            this.state.startFlag = this.props.flag;

        }
        else if (this.state.dataTable !== null && this.props.flag > this.state.startFlag) {
            this.state.dataTable = this.props.data;
            dataTable = this.state.dataTable;
            //console.log(this.props.flag+" "+this.state.startFlag);
            this.state.startFlag = this.props.flag;
            this.state.disabled = createStates(dataTable, []);

        }

        if (dataTable.length > 0)
            isSubmit = true;


        if (dataTable.length > 0)
            var dataTemp = this.drawTableFields(dataTable, this);



        //to init states, cause there were [] before
        this.state.disabled = createStates(dataTable, this.state.disabled);
        return (
            <div className="tableList">
                <form onSubmit={this.onSubmitHandler}>
                    <table className="table">
                        <thead onClick={this.onClickHeaderHandler}>

                            <tr>
                                <th className='number'>Num</th>
                                <th className="name" >Name<a className={this.state.sortState[1] === 1 ? "arrow-top" : '' || this.state.sortState[1] === 2 ? "arrow-bottom" : ''} /></th>
                                <th className="age">Age<a className={this.state.sortState[2] === 1 ? "arrow-top" : '' || this.state.sortState[2] === 2 ? "arrow-bottom" : ''} /></th>
                                <th className='gender' >Gender<a className={this.state.sortState[3] === 1 ? "arrow-top" : '' || this.state.sortState[3] === 2 ? "arrow-bottom" : ''} /></th>
                                <th className="email">Email<a className={this.state.sortState[4] === 1 ? "arrow-top" : '' || this.state.sortState[4] === 2 ? "arrow-bottom" : ''} /></th>
                                <th className="company">Company<a className={this.state.sortState[5] === 1 ? "arrow-top" : '' || this.state.sortState[5] === 2 ? "arrow-bottom" : ''} /></th>
                                <th className="phone"> Phone number<a className={this.state.sortState[6] === 1 ? "arrow-top" : '' || this.state.sortState[6] === 2 ? "arrow-bottom" : ''} /></th>
                                <th className="address" >Address<a className={this.state.sortState[7] === 1 ? "arrow-top" : '' || this.state.sortState[7] === 2 ? "arrow-bottom" : ''} /></th>
                                <th className='actionHead'>Action</th>
                            </tr>
                        </thead>

                        <tbody className="notEditable">
                            {dataTemp}
                            <tr>
                                <td className='noBorder' colSpan='8'><input type='submit' id='submitButt' disabled={!isSubmit} value='Submit' /></td>

                                <td className='noBorder'><button className='addButt' onClick={this.onAddHandler}>Add</button></td>
                            </tr>

                        </tbody>
                    </table>
                    <div className='result' hidden={!result[0]}>{dataTable.length - errors.length + '\\' + dataTable.length + ' ' + result[2]}
                        <br />

                        <span className="warning"><i className='arrowRight' /> warnings: {warnings.length}</span>
                        <br />

                        <span className="error"><i className='arrowRight' /> errors: {errors.length} (name field mustn't be empty)</span>
                    </div>
                </form>
            </div>
        );
    }
};

//get new id key for item
function generateID(data) {

    var hasInDB = []
    fetch('/users', {
        "method": "GET"
    })
        .then((response) => response.json())
        .then((responseData) => hasInDB = responseData)


    var ID = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2, 3);

    ID = '5a6b0087' + ID;
    for (var index in data)
        if (data[index].id === ID || hasInDB.indexOf(ID) > -1)
            ID = generateID(data);
    return ID;
}

// set disabled/enabled state for input-item
function createStates(data, states) {
    if (states.length === 0) {
        states = new Array(data.length);
        for (var i in data)
            states[i] = false;
    }
    return states;
}


function sortMethod(field, data, states) {
    if (field !== '') {
        for (var i = 0; i < data.length; i++) {

            for (var j = i; j < data.length; j++) {

                if (isNaN(data[i]['' + field]) || isNaN(data[j]['' + field])) {
                    if (data[i]['' + field].toLowerCase() < data[j]['' + field].toLowerCase()) {
                        var buf = data[i];
                        data[i] = data[j];
                        data[j] = buf;

                        buf = states[i];
                        states[i] = states[j];
                        states[j] = buf;

                    }
                }
                else {
                    if (data[i]['' + field] < data[j]['' + field]) {
                        var buf = data[i];
                        data[i] = data[j];
                        data[j] = buf;

                        buf = states[i];
                        states[i] = states[j];
                        states[j] = buf;
                    }
                }
            }
        }

        return { data: data, states: states };

    }
}

//sort data in table (first click - by asc, after  - desc and repeat it)
function sortDataInc(field, data, states, ascDescState) {

    var emptyData = [];
    var emptyStates = [];

    for (var i = 0; i < data.length; i++)
        if (data[i]['' + field] === '' || data[i]['' + field] === null) {

            emptyData.push(data[i]);
            data.splice(i, 1);
            emptyStates.push(states[i]);
            states.splice(i, 1);
            i--;
        }

    var sortedData = sortMethod(field, data, states);

    var resultData;
    var resultStates;

    if (ascDescState === 1) {
        resultData = sortedData.data.concat(emptyData);
        resultStates = sortedData.states.concat(emptyStates);
    }
    else if (ascDescState === 2) {
        resultData = sortedData.data.reverse().concat(emptyData);
        resultStates = sortedData.states.reverse().concat(emptyStates)
    }

    return { TD: resultData, ST: resultStates };
}


export default Tabledesign;



