// load the modules
const mysql = require('mysql')
const ejs = require('ejs')
const express = require('express')
const { query } = require('express')
// Connect to SQL
const connection = mysql.createConnection(
  {
  host:  'localhost', //'etu-web2.ut-capitole.fr/phpmyadmin',
  user: '21912044',
  password: 'U01RL1',
  database: 'db_21912044',
  multipleStatements: true}
  )
  connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
      }
      );
// set up the app

let app = express()
app.engine('html',ejs.renderFile)
app.set('view engine', 'html');

app.listen(3007)

// defining the route "/"

// To show all parcels data for one customer
app.get('/cust_parcel_select', function(req, res) {
    sql = "SELECT custId from Customers"
    values = []

    connection.query(sql, values,
  function (error, rows, fields) {
  console.log(rows)
  if (error) throw error;
  res.setHeader('Content-Type', 'text/html');
  
  res.render('Cust_parcel_select.html',{'rows':rows})
})
}
)



app.get('/showallparcels', function(req, res) {
sql =     "SELECT * from Parcels where custId = ?"

    values = [req.query.customer_id]

        connection.query(sql, values,
      function (error, rows, fields) {
      console.log(rows)
      if (error) throw error;
      res.setHeader('Content-Type', 'text/html');
      
      res.render('parcel_details.html',{'rows':rows})
  })
}
)

// Create new Parcels, Customer Id and final Location may be chosen with the help of lists.


app.get('/add_parcel', function(req, res) {

    sql = "SELECT Customers.custId, Customers.custName, Parcels.finalLocation FROM Customers,Parcels WHERE Customers.custId = Parcels.custId "
    values = []
    connection.query(sql, values,
        function (error, rows, fields) {
        console.log(rows)
        if (error) throw error;
        res.setHeader('Content-Type', 'text/html');
        
        res.render('E1.html',{'rows':rows})
    })
}
)

app.get('/add_parcel_confirmation', function(req, res) {

        sql = "INSERT INTO Parcels (custId,finalLocation) VALUES ( ? , ? )"
        values = [req.query.customer_id,req.query.finalLocation]
        connection.query(sql, values,
            function (error, rows, fields) {
            if (error) throw error;
            res.setHeader('Content-Type', 'text/html');
            
            res.render('add_parcel_confirmation',{'tracking_id':rows.insertId})
        })
    }
    )




app.get('/parcel_details', function(req, res) {

    sql = "SELECT Customers.custId, Customers.custName, Parcels.finalLocation FROM Customers, Parcels WHERE Customers.custId = ?"
    values = [req.query.custId]
  
    connection.query(sql, values,
    function (error, rows, fields) {
    console.log(rows)
    if (error) throw error;
    res.setHeader('Content-Type', 'text/html');
    
    res.render('parcel_details.html',{'rows':rows})
  
  })
  }
  )

    // sql = "INSERT INTO Parcels (custId,weight,finalLocation) VALUES ( ? , ? , ? )"
//     values = [req.query.cust_Id,
//       req.query.weight,
//       req.query.Parcel_finalLocation]
  
//   connection.query(sql, values,
//     function (error, rows, fields) {
//     if (error) throw error;
//     res.setHeader('Content-Type', 'text/html');
    
//     res.render('db_update/add_parcel_confirmation.html',{'tracking_id':rows.insertId})
  