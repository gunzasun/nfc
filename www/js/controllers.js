angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, nfcService) {
	$scope.tag = nfcService.tag;
	$scope.clear = function() {
		nfcService.clearTag();
	};	
})
.controller('scan', function ($scope) {
	$scope.navTitle = "Tap Receipt";

	$scope.leftButtons = [{
		type: 'button-icon icon ion-navicon',
		tap: function(e) {
			$scope.sideMenuController.toggleLeft();
		}
	}];

	$scope.rightButtons = [];
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
		
		UserService.saveUser($rootScope.username, $scope.data.password, $scope.data.email, $scope.data.firstname, $scope.data.mobile, $scope.data.surename).success(function(data) {
																							
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
}).controller('ReceiptCtrl', function($scope, $state, ReceiptService, $ionicPopup, $ionicLoading) {
   
	   $ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	  });


	ReceiptService.AllReceipt()
		.success(function(data) {
			$scope.data = data;
			$ionicLoading.hide();
		}).error(function(data) {
			$ionicLoading.hide();
        });
}).controller('ViewReceiptCtrl', function($scope, $state, ViewReceiptService, $ionicPopup, $ionicLoading, $stateParams, DeleteReceiptService, $ionicModal, SendReceiptService) {
   
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	
	$scope.senddata = {};
	
	$scope.share = function(){
		$scope.openModal();
	};
	
	$scope.sendshare = function(){
		SendReceiptService.sendReceipt($stateParams.id, $scope.senddata.email);
		$scope.closeModal();
	};
	
 	
	$scope.delete = function(){
		var confirmPopup = $ionicPopup.confirm({
		 title: 'Delete Record',
		 template: 'Are you sure you want to delete record?'
	   });
		
	   confirmPopup.then(function(res) {
		 if(res) {
			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			}); 
			DeleteReceiptService.deleteReceipt($stateParams.id)
			.success(function(data) {
				$ionicLoading.hide();
				$state.go('tab.receipt');
			}).error(function(data) {
				$ionicLoading.hide();
			});
			
		 } 
	   });
	};	
	
	
	$ionicModal.fromTemplateUrl('share.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  $scope.openModal = function() {
		$scope.modal.show();
	  };
	  $scope.closeModal = function() {
		$scope.modal.hide();
	  };

	ViewReceiptService.ViewReceipt($stateParams.id)
		.success(function(data) {
			$scope.data = data;
			$ionicLoading.hide();
		}).error(function(data) {
			$ionicLoading.hide();
        });
});

