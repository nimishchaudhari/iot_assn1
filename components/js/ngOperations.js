parcelApp = angular.module('ngParcelApp', []);

parcelApp.controller('OperationsController',  function($scope, $http) {
	
	let URL_TRANSFER_SCRIPT = "http://localhost:3007/transferscript?";
	// let URL_PARCEL_HIST = "http://etu-web2.ut-capitole.fr:3007/parcel_hist";
	let URL_CHANGE_OP = "http://localhost:3007/changeoperation?";
	// let URL_INSERT_LOC = "http://etu-web2.ut-capitole.fr:3007/insLocation?";

    $scope.getavailableoperations = function() {

	$http.get(URL_TRANSFER_SCRIPT + `parcelId=${$scope.parcelId}`).then(function(response) {
	newRawdata = response.data
    dataout = {
        "operation":newRawdata.operation
    }
    console.log(response.operation)
	$scope.parcelinfo.push(dataout);
	
    
    })
    };
})
	
	$scope.changeOperation = function() {

		let parcelinfo ={}
		$http.get(URL_CHANGE_OP + `newoperation=${$scope.newoperation}&parcelId=${$scope.parcelId}`)
			.then(function (response) {
				newRawdata = response.data
    console.log(newRawdata)
	// $scope.parcelinfo.push(dataout);
                
                
               

				$scope.parcelinfo.push(newRawdata);
			});
	};
