module.exports = (app, db) => {

app.get('/', function(req, res) {
     
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/ngLocations.html');
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
     
		let sql = 'SELECT locId, locAddress, locCity FROM locations';
		

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

