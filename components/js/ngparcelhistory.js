parcelApp = angular.module('ngParcelApp', []);

parcelApp.controller('ParcelHistoryController',  function($scope, $http) {
	
	let URL_PARCEL_HIST = "http://localhost:3007/parcel_hist";
	// let URL_PARCEL_HIST = "http://etu-web2.ut-capitole.fr:3007/parcel_hist";
	let URL_PARCEL_FINDONE = "http://localhost:3007/oneparcel_hist?";
	// let URL_INSERT_LOC = "http://etu-web2.ut-capitole.fr:3007/insLocation?";
	$scope.parcels = [];
	$http.get(URL_PARCEL_HIST).then(function(response) {
	
    console.log(response)
    console.log(response.test)
	$scope.parcels =  response.data;
	
    });

	
	$scope.getparcels = function() {

		let parcelinfo ={}
		$http.get(URL_PARCEL_FINDONE + `parcelId=${$scope.parcelId}`)
			.then(function (response) {
				newRawdata = response.data;
				
				parcelinfo = newRawdata;
		

				$scope.parcels.push(parcelinfo);
			});
	}
	
});

