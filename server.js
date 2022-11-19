// Built-in Node.js modules
let fs = require('fs');
let path = require('path');

// NPM modules
let express = require('express');
let sqlite3 = require('sqlite3');


let db_filename = path.join(__dirname, 'db', 'stpaul_crime.sqlite3');

let app = express();
let port = 8000;

app.use(express.json());

// Open SQLite3 database (in read-only mode)
let db = new sqlite3.Database(db_filename, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Error opening ' + path.basename(db_filename));
    }
    else {
        console.log('Now connected to ' + path.basename(db_filename));
    }
});


//EXAMPLE query
//SELECT * FROM incidents WHERE date(date_time) >= '2022-05-29' AND code = 600 ORDER BY date_time DESC;
//Selects all incidents for dates past 5/29/2022 with code 600 in descending order.

// GET request handler for crime codes
app.get('/codes', (req, res) => {
    console.log(req.query); // query object (key-value pairs after the ? in the url)

    if(Object.entries(req.query).length === 0){
        db.all('SELECT * FROM Codes', (err, rows) => {
            //console.log(rows)
            res.status(200).type('json').send(rows);
        });
    }else{
        res.status(200).type('json').send({}); // <-- you will need to change this
    }
});

// GET request handler for neighborhoods
app.get('/neighborhoods', (req, res) => {
    console.log(req.query); // query object (key-value pairs after the ? in the url)

    if(Object.entries(req.query).length === 0){
        db.all('SELECT * FROM Neighborhoods ORDER BY neighborhood_number', (err, rows) => {
            //console.log(rows)
            res.status(200).type('json').send(rows);
        });
    }
    else{
    res.status(200).type('json').send({}); // <-- you will need to change this
    }
});

// GET request handler for crime incidents
app.get('/incidents', (req, res) => {
    console.log(req.query); // query object (key-value pairs after the ? in the url)

    res.status(200).type('json').send({}); // <-- you will need to change this
});

// PUT request handler for new crime incident
app.put('/new-incident', (req, res) => {
    console.log("PUT /new-incident");
    console.log(req.body); // uploaded data

    // insert new case to database
    // data fields
    // case_number, date, time, code, incident, police_grid, neighborhood_number, block
    let case_number = req.body.case_number;
    let date_time = req.body.date + req.body.time;
    let code = req.body.code;
    let incident = req.body.incident;
    let police_grid = req.body.police_grid;
    let neighborhood_number = req.body.neighborhood_number;
    let block = req.body.block;

    let params = [];
    params.push(case_number);
    params.push(date_time);
    params.push(code);
    params.push(incident);
    params.push(police_grid);
    params.push(neighborhood_number);
    params.push(block);

    // query "insert into Incidents values (?, ?, ?, ?, ?, ?, ?);"
    // INSERT INTO Incidents values (123, "2022-11-19", 600, "theft incident", 153, 15, "Summit");
    let query = "INSERT INTO Incidents values (?, ?, ?, ?, ?, ?, ?);";

    db.all(query, params, (err, rows) => {
        console.log("Erros: " + err);
        if (err == "Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: Incidents.case_number") {
            res.status(500).type('txt').send('Error 500: Case number already exists in the database');
        } else {
            res.status(200).type('txt').send('Insert OK');
        }
    })
});

// DELETE request handler for new crime incident
app.delete('/remove-incident', (req, res) => {
    console.log(req.body); // uploaded data

    res.status(200).type('txt').send('OK'); // <-- you may need to change this
});


// Create Promise for SQLite3 database SELECT query
function databaseSelect(query, params) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        })
    })
}

// Create Promise for SQLite3 database INSERT or DELETE query
function databaseRun(query, params) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    })
}


// Start server - listen for client connections
app.listen(port, () => {
    console.log('Now listening on port ' + port);
});
