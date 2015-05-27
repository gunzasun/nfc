angular.module('starter.services', [])
.factory('MenuService', function() {

  var menuItems = [
  	  { text: 'Scan Receipt', iconClass: 'icon ion-map', link: 'scan'},
      { text: 'My Receipt', iconClass: 'icon ion-map', link: 'one'},
      { text: 'Share Receipt', iconClass: 'icon ion-gear-b', link: 'two'},
      { text: 'Profile', iconClass: 'icon ion-star', link: 'three'}
      /*{ text: 'Profile', iconClass: 'icon ion-star', link: 'three'}
      { text: 'Logout', iconClass: 'icon ion-star', link: 'three'}
      */
  ];

  return {
    all: function() {
      return menuItems;
    }
  }
})
.service('DeleteReceiptService', function($q, $http, ApiEndpoint) {
    return {
        deleteReceipt: function(id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			var data  = 'id='+id;
			var req = {
			 method: 'GET',
			 url: ApiEndpoint.url + 'index.php?r=jobapi/delete-receipt&'+data
			}
			
			$http(req)
				.success(function(data) {
				  deferred.resolve(data);
				})
				.error(function(error){
				  deferred.reject(error);
				})
           
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('SendReceiptService', function($q, $http, ApiEndpoint) {
    return {
        sendReceipt: function(id, email) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			var data  = 'id='+id+'&email='+email;
			var req = {
			 method: 'GET',
			 url: ApiEndpoint.url + 'index.php?r=jobapi/send-receipt&'+data
			}
			
			$http(req)
				.success(function(data) {
				  deferred.resolve(data);
				})
				.error(function(error){
				  deferred.reject(error);
				})
           
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('ViewReceiptService', function($q, $http, ApiEndpoint) {
    return {
        ViewReceipt: function(id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			var data  = 'id='+id;
			var req = {
			 method: 'GET',
			 url: ApiEndpoint.url + 'index.php?r=jobapi/view-receipt&'+data
			}
			
			$http(req)
				.success(function(data) {
				  deferred.resolve(data);
				})
				.error(function(error){
				  deferred.reject('Wrong!.');
				})
			
           
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('ReceiptService', function($q, $http, ApiEndpoint) {
    return {
        AllReceipt: function(id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			
			
			
			var req = {
			 method: 'GET',
			 url: ApiEndpoint.url + 'index.php?r=jobapi/list-receipts'
			}
			
			$http(req)
				.success(function(data) {
				  deferred.resolve(data);
				})
				.error(function(error){
				  deferred.reject('Wrong!.');
				})
			
           
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('LoginService', function($q, $http, ApiEndpoint) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			
			var data  = 'username='+name+'&password='+pw;
			
			var req = {
			 method: 'POST',
			 url: ApiEndpoint.url + 'index.php?r=jobapi/checkuser&'+data
			}
			
			
			$http(req)
				.success(function(data) {
				  deferred.resolve('Welcome ' + name + '!');
				})
				.error(function(error){
				  deferred.reject('Wrong credentials.');
				})
			
           
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('UserService', function($q, $http, ApiEndpoint) {
    return {
        saveUser: function(name, pass, email, fullname, mobile, address) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			
			var data  = 'username='+name+'&email='+email+'&fullname='+fullname+'&mobile='+mobile+'&address='+address+'&password='+pass;
			
			
			var req = {
			 method: 'POST',
			 url: ApiEndpoint.url + 'index.php?r=jobapi/save-user&'+data
			}
			
			
			$http(req)
				.success(function(data) {
				  deferred.resolve('Welcome ' + name + '!');
				})
				.error(function(error){
				  deferred.reject('Wrong credentials.');
				})
           
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('RegisterService', function($q, $http, ApiEndpoint) {
    return {
        registerUser: function(name, pw, email, fullname) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			
			var data  = 'username='+name+'&password='+pw+'&email='+email+'&fullname='+fullname;
			
			var req = {
			 method: 'POST',
			 url: ApiEndpoint.url + 'index.php?r=jobapi/create-user&'+data
			}
			
			
			$http(req)
				.success(function(data) {
				  deferred.resolve('Welcome ' + name + '!');
				})
				.error(function(error){
				  deferred.reject('Wrong credentials.');
				})
			
           
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
