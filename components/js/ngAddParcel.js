locApp = angular.module('angParcelsApp', []);

locApp.controller('UserandFLocListController',  function($scope, $http) {
	
	let URL_ALL_CUSTS = "http://etu-web2.ut-capitole.fr:3007/getAllCustomers";
	// let URL_INSERT_LOC = "http://etu-web2.ut-capitole.fr:3007/insCust?";
    let URL_ALL_FLOC = "http://etu-web2.ut-capitole.fr:3007/getAllLocations";

	$scope.customers = [];
	$scope.FLoc = [];
			
	$http.get(URL_ALL_CUSTS).then(function(response) {
	
      $scope.customers =  response.data;
      
	  $http.get(URL_ALL_FLOC).then(function(response) {
	
        $scope.FLoc =  response.data;
        
      });
});

    });
	

