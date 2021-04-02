const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public'),
        img : path.resolve('../server/uploads')
    });
});

app.get('/addTaskToTable', (request, response) => {
    var title = request.query.theTitle;
    var desc = request.query.theDesc;
    var index;
    var sql = "SELECT COUNT(*) AS total FROM tasks";
    var query = con.query(sql, function(err, result) {
        index = result[0].total;
    })
    insertTask(1, title, desc, "Friday, April 2");
    response.status(200).send(title);
})

/* app.get('/returnMemeFromDatabase', (request, response) => {
    var index;
    var sql = "SELECT COUNT(*) AS total FROM memes";
    var query = con.query(sql, function(err, result) {
        index = result[0].total;
        if (index > 0) {
            var n = Math.floor(Math.random()*Math.floor(index)+1);
            var sql = "SELECT url FROM memes WHERE id = " + n;
            var query = con.query(sql, function(err, result) {
                var res = result[0]["url"];
                response.status(200).sendFile(__dirname + "/uploads/" + res);
            })
        } else {
            console.log("Table is empty.");
            response.status(200).send();
        }
    })
}) */

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


/** DAO stuff: */
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "sqluserpw", //Q1!
  database: "yelp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS tasks (id INT, title VARCHAR(256), description VARCHAR(256), date VARCHAR(256));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

function insertTask(id, title, desc, date) {
    var query = con.query("INSERT INTO tasks VALUES (" + id + ", '" + title + "', '" + desc + "', '" + date + "');",
    function(err, result) {
        if (err) throw err;
        console.log("1 task inserted");
    });
};

/*function insertMeme(id, url) {
    var query = con.query("INSERT INTO memes VALUES (" + id + ", '" + url + "', 1);",
    function (err, result) {
        if (err) throw err;
        console.log("1 meme inserted");
    });
};*/