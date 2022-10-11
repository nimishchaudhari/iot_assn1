parcelApp = angular.module('ngParcelApp', []);

parcelApp.controller('ParcelHistoryController',  function($scope, $http) {
	
	let URL_PARCEL_HIST = "localhost:3007/parcel_hist";
	let URL_PARCEL_FINDONE = "localhost:3007/oneparcel_hist?";
	// let URL_INSERT_LOC = "http://etu-web2.ut-capitole.fr:3007/insLocation?";
	$scope.parcels = [];
	$scope.test = "HAHA"
	$http.get(URL_PARCEL_HIST).then(function(response) {
	
    console.log("CONTROLLER")
	$scope.parcels =  response.data;
	  
    });

	
	$scope.getparcels = function() {
		console.log("CONTROLLER GETPARcELS")

		let parcelinfo ={}
		let newRawdata = {}
		$http.get(URL_PARCEL_FINDONE + `parcelId=${$scope.parcelId}`)
			.then(function (response) {
				newRawdata = response.data;
				
				parcelinfo = {"parcelinfo": newRawdata};
		

				$scope.parcels.push(parcelinfo);
			});
	}
	// $scope.new = function() {
	// 	let newRawLoc = {};
	// 	let newLoc ={};
	// 	$http.get(URL_INSERT_LOC + `newAddress=${$scope.newAddress}&newCity=${$scope.newCity}`)
	// 		.then(function (response) {
	// 			newRawLoc = response.data;
				
	// 			newLoc = {"locId": newRawLoc.id, "locAddress": newRawLoc.address, 
	// 								"city": newRawLoc.city};
		

	// 			$scope.locations.push(newLoc);
	// 		});
	// }
});

