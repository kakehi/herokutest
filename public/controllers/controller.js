var refresh;


var myApp = angular
.module('myApp', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl:'template/list.html',
		controller: 'cocktailListView'
	}).
	when('/cocktail/:id', {
		templateUrl:'template/single.html',
		controller: 'cocktailSingleView'
	}).
	otherwise({redirectTo:'/'})
})
.controller('cocktailListData', ['$scope', '$http', function($scope, $http) {
    
    refresh = function(){
	    $http.get('/cocktaillist').success(function(response){
	    	console.log('I got the data requested');
	    	$scope.cocktaillist = response;

	    	// clear input box after refresh
	    	$scope.cocktail = "";
	    });
    };

    refresh();

}])
.controller('cocktailListView', ['$scope', '$http', function($scope, $http) {

    $scope.addCocktail = function() {
    	console.log($scope.cocktail);
    	$http.post('/cocktaillist', $scope.cocktail).success(function(response){
    		console.log(response);
    		refresh();
    	});
    };

    $scope.remove = function(id) {
    	console.log(id);
    	$http.delete('/cocktaillist/' + id).success(function(response){
    		refresh();
    	});
    }

    $scope.edit = function(id) {
    	console.log(id);
    	$http.get('/cocktaillist/' + id).success(function(response){
    		$scope.cocktail = response;
    	});
    };

    /*$scope.update = function() {
    	console.log($scope.cocktail._id);
    	$http.put('/cocktaillist/' + $scope.cocktail._id, $scope.cocktail).success(function(response){
    		refresh();
    	})
    };*/

}])
.controller('cocktailSingleView', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    
    $scope.item = $scope.cocktaillist[$routeParams.id]

    $scope.update = function() {
    	console.log($scope.item._id);
    	$http.put('/cocktaillist/' + $scope.item._id, $scope.item).success(function(response){
    		refresh();
    	})
    };

    /*var refresh = function(){
	    $http.get('../cocktaillist/572beeb5b0031507e6328f6b').success(function(response){
	    	console.log(response);
	    	$scope.cocktail = response;
	    });
    };

    refresh();

    $scope.update = function() {
    	console.log($scope.cocktail._id);
    	$http.put('/cocktaillist/' + $scope.cocktail._id, $scope.cocktail).success(function(response){
    		refresh();
    	})
    };*/
    
}]);

