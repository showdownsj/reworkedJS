var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//configuration to connect to databas
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'sqlUser',
  password: 'sqluser123',
  database: 'FilesCopy',
});
//connection.connect();

// create the table of database if that doesn't exist
function createTable() {
  connection.query("CREATE TABLE IF NOT EXISTS persons (\n" +

    " id VARCHAR(255) NOT NULL,\n" +
    " name VARCHAR(100) NOT NULL,\n" +
    " age INT,\n" +
    " gender VARCHAR(20) NOT NULL,\n" +
    " email VARCHAR(255),\n" +
    " company VARCHAR(255),\n" +
    " phone VARCHAR(255),\n" +
    " address VARCHAR(255),\n" +
    "PRIMARY KEY (id))", function (err, result) {
      if (err)
        throw err;
      // Neat!
    });
}
createTable();

app.use('/', express.static(__dirname));


app.listen(port, function() {
   console.log('Listening on port: '+{port})
});

//listen to GET requests to /table
//getting the id of notes from database
app.get('/table', function(req, res){
  try{
    connection.query('SELECT id FROM persons', function(err, result){
        res.send(result);
    });
  }
  catch(err){}
});

// Listen to POST requests to /table
// get data from request and insert/update it into a database
app.post('/table', function (req, res) {
  
  createTable();
  
  var data = req.body;
  var dataUpd = req.body;

  //attempt to insert data
  for (var index = 0; index < data.length; index++) {
  
    try {
      var query = connection.query('INSERT INTO persons SET ?', data[index], function (err, result) {
      });
    }
    catch (err) { }
  }

  delete dataUpd.id;
  
  //attempt to update data
  for (var index = 0; index < dataUpd.length; index++) {
    try {
      var query = connection.query('UPDATE persons SET ? WHERE id=?', [dataUpd[index], data[index].id], function (err, result) {
      });
    }
    catch (err) { }
  }
res.send();
});
