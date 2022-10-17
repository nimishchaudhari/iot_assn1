const { Console } = require("console");
const { getSystemErrorMap } = require("util");

module.exports = (app, db) => {

	app.get('/enterparcelid', function(req, res) { //Sending HTML
     
		// send the angular app
		res.setHeader('Content-Type', 'text/html');
		res.sendFile( __dirname + '/views' + '/selectparcel.html');
	});

	
// app.get('/parcelhistoryview', function(req, res) { //Sending HTML
     
// 	// send the angular app
//     res.setHeader('Content-Type', 'text/html');
//     res.sendFile( __dirname + '/views' + '/_ngHistory.html');
// });



app.get('/oneparcel_hist', function(req, res) {
    
	let parcelId = req.query.parcelId
	console.log(req.query.parcelId)
	let sql = 'SELECT Located.parcelId, Located.locId, Located.date, Located.operation FROM Located WHERE Located.parcelId = ?';
	let values = [parcelId]
	console.log("Im running the query with oneparcel")
	// response contains a json array with all tuples
	let postProcessSQL =   function (err, result) {
		if (err) throw err;

		res.json(result);
		console.log(result)

	};

	db.query(sql,values, postProcessSQL);

});


app.get('/show_parcel_info', function(req, res) {
// Gets parcel info based on parcelId
// need to get Operation, Location (from Location table), 
	let sql = 'SELECT Located.parcelId, Located.date, Located.operation, Located.locId, Locations.city FROM Located, Locations WHERE Located.parcelId = ? AND Located.locId = Locations.locID';
	
	let values = [req.query.parcelId]
	let postProcessSQL =   function (err, result) {
		if (err) throw err;
		console.log("In the new show_parcel info route")
		// res.setHeader('Content-Type', 'text/html');
    	// res.sendFile( __dirname + '/views' + '/ngHistory.html');
		res.json(result);
		
	};

	db.query(sql,values ,postProcessSQL);

	
});


app.get('/parcel_hist', function(req, res) {
         
	// History of all parcels html
	let sql = 'SELECT parcelId, locId, date, time, operation FROM Located' // WHERE parcelId = ?';
	// let values = req.query
	let values = []
	console.log("Im running the query")
	// response contains a json array with all tuples
	let postProcessSQL =   function (err, result) {
		if (err) throw err;
		console.log(result)

		res.json(result);
		console.log(result)

	};

	db.query(sql,values ,postProcessSQL);

});
app.get('/insertedNewRecord', function(req, res) {

	res.setHeader('Content-Type', 'application/json');
    res.end(res);

})


app.get('/deleteRecord', function(req, res) {
	let parcelId = req.query.parcelId;
	let operation = req.query.operation;
	let sql = 'DELETE FROM db_21912044.Located WHERE Located.parcelId = ? AND Located.operation = ? '
	let values = [parcelId, operation];
	let postProcessInsert =   function (err, result) {
	if (err) throw err;
		

	}
	db.query(sql, values, postProcessInsert);
	let sql2 = 'SELECT parcelId,locId, date, time, operation \
		FROM Located \
		WHERE parcelId = ?'
		values2 = [parcelId]
		postProcessInsert =   function (err, result2) {
			if (err) throw err;

			res.json(result2)
		}
		db.query(sql2, values2, postProcessInsert);

})


app.get('/populateAddNew', function(req,res) {
	let city_sql = "SELECT locId,city from Locations"
	let postProcessInsert = function(err,result){
		if(err) throw err;
		
		res.json(result)
	}
	db.query(city_sql, postProcessInsert);


})



app.get('/addNewOperation', function(req, res) {
	let operation = req.query.operation;
	let parcelId = req.query.parcelId;
	let date = req.query.date;
	let city = req.query.city;
	let locId = req.query.locId;


	let sql = "INSERT IGNORE INTO Located (parcelId, locId, operation) VALUES (?,?,?)"
	//'301', '1', '2022-10-01', 'delivering'
	let values = [parcelId,locId,date,operation];

	// create a json object containing the inserted location
	let postProcessInsert =   function (err, result) {
		if (err) throw err;

		let sql2 = 'SELECT Located.operation, Located.locId, Locations.city FROM Located, Locations WHERE Located.parcelId = ? AND Located.locId = Locations.locID'
		values2 = [parcelId]
		let postProcessInsert2 =   function (err, result2) {
			if (err) throw err;

			res.json(result2)
		}
		db.query(sql2, values2, postProcessInsert2);

		
	};

	db.query(sql, values, postProcessInsert);

	
// }
})

// Adding a transfer operation

app.get('/transfer_html', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/ngtransferparcel.html');
});


app.get('/transferscript', function(req, res) {

	let status = ""
	let sql = 'SELECT parcelId,operation FROM Located WHERE parcelId = ?';
	// let values = req.query
	let values = req.query.parcelId
	// response contains a json array with all tuples
	let postProcessSQL =   function (err, result) {
		if (err) throw err;
		console.log(result)

		res.json(result)		
		console.log(req.query.parcelId + " Parcel status: ")

	};

	db.query(sql,values ,postProcessSQL);

});

app.get('/changeoperation', function(req,res){
	let sql = "UPDATE `db_21912044`.`Located` SET `operation` = ? WHERE parcelId = ?";
	// let values = req.query
	let values = [req.query.newoperation,req.query.parcelId]
	// response contains a json array with all tuples
	let postProcessSQL =   function (err, result) {
		if (err) throw err;
		res.json(result);
		// console.log(result)
	// console.log(req.query.parcelId + " Parcel status: " + result.operation)

	};

	db.query(sql,values ,postProcessSQL);


})


// end of transfer

    app.get('/ngparcelhistory.js', function(req, res) {
         
        // send the angular js file
        res.setHeader('Content-Type', 'application/javascript');
        res.sendFile( __dirname + '/js' + '/ngparcelhistory.js');
    });


	// EJS Part
// Homepage + Exercises navigation options	
app.get('/', function(req, res) {
     
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/homepage.html');
});


app.get('/E1', function(req, res) {
     
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/E1.html');
});


app.get('/E2', function(req, res) {
     
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/E2.html');
});

// End of Exercise Navigation


// To add parcel + Populate cust names + Populate Final Locations
app.get('/addParcel', function(req, res) {
     
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/AddParcel.html');
});

app.get('/ngAddParcel.js', function(req, res) {
     
	// send the angular app
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile( __dirname + '/js' + '/ngAddParcel.js');
});


app.get('/getAllCustomers', function(req, res) {
     
	let sql = 'SELECT custName, custId FROM Customers';
	

	// response contains a json array with all tuples
	let postProcessSQL =   function (err, result) {
		if (err) throw err;

		res.json(result);
	};

	db.query(sql, postProcessSQL);

	
});


app.get('/crud', function(req, res) {
     
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/ngLocationsCRUD.html');
});

app.get('/ngLocationsCRUD.js', function(req, res) {
     
	// send the angular app
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile( __dirname + '/js' + '/ngLocationsCRUD.js');
});

app.get('/ngLocations.js', function(req, res) {
     
	// send the angular app
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile( __dirname + '/js' + '/ngLocations.js');
});

app.get('/getAllLocations', function(req, res) {
     
		let sql = 'SELECT locId, locAddress, city FROM Locations';
		

		// response contains a json array with all tuples
		let postProcessSQL =   function (err, result) {
			if (err) throw err;

			res.json(result);
		};
  
		db.query(sql, postProcessSQL);
	
        
});

app.get('/insLocation', function(req, res) {
    	let address = (req.query.newAddress);
        let city    = (req.query.newCity);
 
		let sql = 'INSERT INTO locations(locAddress, city) VALUES(?, ?)';
		let values = [address, city];

		// create a json object containing the inserted location
		let postProcessInsert =   function (err, result) {
			if (err) throw err;

			
			res.json({id: result.insertId, address: address, city: city, 
			                  insertedLines: result.affectedRows });
		};
  
		db.query(sql, values, postProcessInsert);
 
		
});

app.get('/updLocation', function(req, res) {
	
    	let id = (req.query.updId);
    	let address = (req.query.updAddress);
        let city    = (req.query.updCity);
 
		let sql = 'UPDATE locations SET locAddress = ?, city = ? WHERE locId = ?';
		let values = [address, city, id];

		// create a json object containing the inserted location
		let postProcessUpdate =   function (err, result) {
			if (err) throw err;
			
			console.log({id: result.insertId, address: address, city: city, 
			                  insertedLines: result.affectedRows });
			res.json({id: id, address: address, city: city, 
			                  updatedRows: result.changedRows });
		};
  
		db.query(sql, values, postProcessUpdate);

});

app.get('/delLocation', function(req, res) {
    	let id = (req.query.delId);
 
		let sql = 'DELETE FROM locations WHERE locId = ?';
		let values = [id];

		// create a json object containing the number of deleted locations
		let postProcessDelete =   function (err, result) {
			if (err) throw err;

			res.json({deletedLines: result.affectedRows });
		};
  
		db.query(sql, values, postProcessDelete);
 
		
});


}

