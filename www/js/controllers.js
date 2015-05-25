angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope) {
	
})

.controller('AccountCtrl', function($scope, $rootScope, $http, ApiEndpoint, UserService, $ionicLoading, $ionicPopup) {
 	$scope.data = {};
	
	  
	var data  = 'username='+$rootScope.username;
	
	var req = {
	 method: 'GET',
	 url: ApiEndpoint.url + 'index.php?r=jobapi/getuser&'+data
	}
	
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	  });
	$http(req)
	.success(function(data) {
	  $scope.data = data; 
	  $ionicLoading.hide();
	})
	.error(function(error){$ionicLoading.hide();});
	
	
	$scope.save = function(){
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		  });
		
		UserService.saveUser($scope.data.username, $scope.data.email, $scope.data.firstname, $scope.data.mobile, $scope.data.surename).success(function(data) {
																							
			$ionicLoading.hide();
			
			$ionicPopup.alert({
                title: 'success',
                template: 'success!'
            });
        }).error(function(data) {
			$ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'failed!',
                template: 'failed!'
            });
        });
	};
	
})
.controller('LoginCtrl', function($scope, $state, $rootScope, LoginService, $ionicPopup, $ionicLoading) {
    $scope.data = {
		'username':'',
		'password': ''
	};
 	 
    $scope.login = function() {
		if ($scope.data.username == '') {
			$ionicPopup.alert({
				title: 'Username is empty',
				template: 'Please add your username',
			});
			return false;
		}
		
		if ($scope.data.password == '') {
			$ionicPopup.alert({
				title: 'password is empty',
				template: 'Please add your password',
			});
			return false;
		}
		
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		  });
		
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
																							
			$ionicLoading.hide();
			$rootScope.username = $scope.data.username;
            $state.go('tab.dash');
        }).error(function(data) {
			$ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
.controller('RegisterCtrl', function($scope, $state, RegisterService, $ionicPopup, $ionicLoading) {
    $scope.data = {
		'username':'',
		'password': '',
		'fullname': '',
		'email': ''
	};
 	 
    $scope.register = function() {
		if ($scope.data.username == '') {
			$ionicPopup.alert({
				title: 'Username is empty',
				template: 'Please add your username',
			});
			return false;
		}
		
		if ($scope.data.password == '') {
			$ionicPopup.alert({
				title: 'password is empty',
				template: 'Please add your password',
			});
			return false;
		}
		
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		  });
		
        RegisterService.registerUser($scope.data.username, $scope.data.password, $scope.data.email, $scope.data.fullname).success(function(data) {
																							
			$ionicLoading.hide();
			
            $state.go('login');
			
			$scope.data = {
				'username':'',
				'password': '',
				'fullname': '',
				'email': ''
			};
			
        }).error(function(data) {
			$ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Register failed!',
                template: 'Please check your credentials!'
            });
        });
    }
});
