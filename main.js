const express = require('express')
const http = require('http')
const mysql = require('mysql');

const app = express();

const connectionToDB = mysql.createConnection({
    host: 'localhost',
    user: '*********',
    password: "*****",
    database: 'Contacts'
});

connectionToDB.connect();

app.set('port', process.env.PORT || 7002);

app.get('/contacts', (request, response) => {
    const {firstName, lastName} = request.body;
    connectionToDB.query(
        'SELECT * FROM constacts WHERE Last_name=? and First_name REGEXP \`^[${?}]\`',[ lastName, firstName ],
        (err, results) => {
            if(err) throw err
            response.send(results)
        }
    );
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});