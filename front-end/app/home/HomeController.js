'use strict';
angular
    .module('app')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$window', '$http', '$scope'];
function HomeController($window, $http, $scope) {
    var vm = this;
    vm.user = null;

    initController();

    function initController() {
        $http({
            url: 'http://localhost:8080/company',
            method: "GET",
            headers:{Authorization:"Basic dXNlcjpwYXNzd29yZA=="}
        }).then(function (response) {
            $scope.populateDataTable(response.data);
        }, function (error) {
            console.log(error);
        });
    };

   $scope.populateDataTable =  function(data){
    $( data ).each(function( i,record ) {
    //     var editColumn =  '<a onclick="angular.element(this).scope().openDashboard(\''+record.shortUrl+'\')"> <i class="fa fa-share-square-o" aria-hidden="true"></i></a>';
    //   var callUrl =   '<button type="button" onclick="angular.element(this).scope().callUrl(\''+record.shortUrl+'\')" class="btn">Call Url</button> </a>';
    $('#example').DataTable().row.add([record.name,record.city,record.country,record.address,'']).draw();
     });
    }

    $scope.logout = function () {
        $window.sessionStorage.setItem('userData', '');
        $http.defaults.headers.common['Authorization'] = 'Basic';
    }
}