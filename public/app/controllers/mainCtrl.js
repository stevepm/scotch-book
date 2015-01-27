angular.module('mainCtrl', [])
    .controller('mainController', function ($rootScope, $location, Auth) {
        var vm = this;
        // get info if a person is logged in
        vm.loggedIn = Auth.isLoggedIn();
        // check to see if a user is logged in on every request
        $rootScope.$on('$routeChangeStart', function () {
            vm.loggedIn = Auth.isLoggedIn();
        });
        // get user information on page load
        Auth.getUser().success(function (data) {
            vm.user = data;
        });
        // function to handle login form
        vm.doLogin = function () {

            vm.processing = true;

            // call the Auth.login() function
            Auth.login(vm.loginData.username, vm.loginData.password).success(function (data) {
                vm.processing = false;

                vm.error = '';
                // get user information after logging in
                Auth.getUser().then(function (data) {
                    vm.user = data.data;
                });
                // if a user successfully logs in, redirect to users page
                if (data.success) {
                    $location.path('/users');
                } else {
                    vm.error = data.message;
                }
            });
        };
        // function to handle logging out
        vm.doLogout = function () {
            Auth.logout();
            $location.path('/');
        };
    });