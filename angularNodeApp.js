
// init server
let express = require('express');
let app = express();

// database configuration
let mysql = require('mysql');
let db = mysql.createConnection(
 {
  host: 'localhost',
  user: '21912044',
  password: 'U01RL1',
  database: 'db_21912044'
 }
);

db.connect((err) => {
  if (err) throw err;
  
  console.log('Connected!');
}); 

// load routes: define controller which act on db
let routes = require('./components/routes.js');
routes(app, db);

// run server  
app.listen(3007);

 





