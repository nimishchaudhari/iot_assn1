parcelApp = angular.module('ngParcelApp', []);

parcelApp.controller('ParcelHistoryController',  function($scope, $http) {
	
	let URL_PARCEL_HIST = "http://localhost:3007/parcel_hist";
	// let URL_PARCEL_HIST = "http://http://localhost:3007/enterparcelid";
	// let URL_PARCEL_HIST = "http://etu-web2.ut-capitole.fr:3007/parcel_hist";
	let URL_PARCEL_FINDONE = "http://localhost:3007/show_parcel_info?";
	let URL_PARCEL_ADDNEWOP = "http://localhost:3007/addNewOperation?"
	let URL_PARCEL_DELETE = "http://localhost:3007/deleteRecord?"	
	let URL_POPULATE_ADD = "http://localhost:3007/populateAddNew"
	
	
	$http.get(URL_PARCEL_HIST).then(function(response) {
	$scope.showHistory = false
	
    $scope.parcels =  response.data;
	// $scope.parcels.push(response.data)
	$scope.tablebutton = 0
    });

	$http.get(URL_POPULATE_ADD).then(function(response)
	{
		$scope._stuff = response.data
		$scope.ops = ["boarding","transfer","delivering"]


	})
	parcel_id = 0
	$scope.getparcels = function() { // Gets parcels based on Parcel ID entered 

		$http.get(URL_PARCEL_FINDONE + `parcelId=${$scope.parcelId}`)
			.then(function (response) {


				$scope.parceloperations = response.data
				// $scope.tablebutton = 1
				showHistory =  true



				// $scope.push($scope.showHistory)
		
			});

	}
	
	$scope.populateAddNew = function() {
		$http.get(URL_POPULATE_ADD)
		.then(function(response){
			$scope.rows = response.data
			// $scope.locId = response.data.locId
			$scope.ops = response.data.ops 

		})

	}



	$scope.parcel_add_operation = function() {
		//parcelId=200

		$http.get(URL_PARCEL_ADDNEWOP + `parcelId=${$scope.parcelId}&operation=${$scope.p_operation}&locId=${$scope.p_locId}&date=${$scope.p_date}`)
		.then(function (response) {
			newRawdata = response.data;
		print("Add operation works")
			$scope.singleparcel = newRawdata;
	
			});

	}


	//deleteparcel
	$scope.deleteparcel = function(parc) {
		
			let confirmdeletemsg = window.confirm(" Are you sure you want to delete it? ")
			if(confirmdeletemsg == true){
				// alert(URL_PARCEL_DELETE + parc.parcelId +"&"+ parc.operation)
				$http.get(URL_PARCEL_DELETE + `parcelId=${parc.parcelId}&operation=${parc.operation}`)
				.then(function (response) {

					$scope.singleparcel = response.data
				
				})
				}
}

})
