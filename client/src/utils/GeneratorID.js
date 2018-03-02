export default class GeneratorID {
    constructor(data) {
        this.data = data;
        this.ID = 0;
    }

    //get new id key for item
    generateID = () => {
        let hasIdInDB = []
        fetch('/table', {
            "method": "GET"
        })
            .then((response) => response.json())
            .then((responseData) => hasIdInDB = responseData)


        let ID = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2, 3);

        ID = '5a6b0087' + ID;
        for (let index in this.data)
            if (this.data[index].id === ID || hasIdInDB.indexOf(ID) > -1)
                ID = this.generateID();
        this.ID = ID;

    }

    getGeneratedID = () => {
        return this.ID;
    }

}