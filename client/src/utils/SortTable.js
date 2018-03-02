//certain class to sort table of Tabledesign component:
//  1) getSortedData() - define the data of table to sort from 'props'  and start a sort method, 
//                       then return sorted data in ascending or descending order (it depends 
//                       on 'props.sortState'); 
//  2) sortMethid(data,states) - method wich represent the sort of data and return sorted object  
//                               in ascending order;
    
class SortTable {
    constructor(props) {
        this.props = props;

    }

    sortMethod = (data, states) => {
        let field = this.props.className;

        if (field !== '') {
            for (let i = 0; i < data.length; i++) {

                for (let j = i; j < data.length; j++) {

                    if (isNaN(data[i]['' + field]) || isNaN(data[j]['' + field])) {
                        if (data[i]['' + field].toLowerCase() < data[j]['' + field].toLowerCase()) {
                            let buf = data[i];
                            data[i] = data[j];
                            data[j] = buf;

                            buf = states[i];
                            states[i] = states[j];
                            states[j] = buf;

                        }
                    }
                    else {
                        if (data[i]['' + field] < data[j]['' + field]) {
                            let buf = data[i];
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
    getSortedData = () => {

        let emptyData = [];
        let emptyStates = [];

        let data = this.props.data;
        let states = this.props.disabledStates;
        let field = this.props.className;


        for (let i = 0; i < this.props.data.length; i++)
            if (data[i]['' + field] === '' || data[i]['' + field] === null) {

                emptyData.push(data[i]);
                data.splice(i, 1);
                emptyStates.push(states[i]);
                states.splice(i, 1);
                i--;
            }

        let sortedData = this.sortMethod(data, states);

        let resultData;
        let resultStates;

        if (this.props.sortState === 1) {
            resultData = sortedData.data.concat(emptyData);
            resultStates = sortedData.states.concat(emptyStates);
        }
        else if (this.props.sortState === 2) {
            resultData = sortedData.data.reverse().concat(emptyData);
            resultStates = sortedData.states.reverse().concat(emptyStates)
        }

        return { TD: resultData, ST: resultStates };
    }
}
export default SortTable;