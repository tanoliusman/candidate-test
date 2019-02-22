'use strict';
angular
    .module('app')
    .controller('TestController', TestController);

    TestController.$inject = ['$window', '$http', '$scope','$compile'];
function TestController($window, $http, $scope, $compile) {
    var vm = this;
    vm.user = 'asdf';
    vm.tests = [];
    vm.deleteTestId='';
    vm.editTest = {};
    vm.newTest = {};
    vm.responseMessage = '';
    initController();

    function initController() {
        $http({
            url: 'http://localhost:8080/test',
            method: "GET"
        }).then(function (response) {
            populateDataTable(response.data);
            vm.tests = response.data;
        }, function (error) {
            console.log(error);
        });

        // $('#sidebarToggle').click(function() {
        //    console.log('hi');
        //   });
    };

   function populateDataTable(data){

    var table = $('#example');
    var mytable = table.DataTable();
    mytable.clear().draw();
    $( data ).each(function( i,record ) {
        var editColumn =  '<a data-toggle="modal" data-target="#testModal" ng-click="editTest(\''+record.id+'\')"> <i class="fa fa-edit" aria-hidden="true"></i></a>';
        var deleteColumn =  '<a data-toggle="modal" data-target="#confirmationModal" ng-click="deleteTest(\''+record.id+'\')"> <i class="fa fa-trash" aria-hidden="true"></i></a>';
        mytable.row.add([record.name,editColumn+deleteColumn]);
     });
    mytable.draw(false);
    $compile(table)($scope);
    }

    $scope.editTest = function(testId){
        $scope.hideAllAlerts();
        angular.forEach(vm.tests, function(value, key) {
            if(value.id === testId){
                vm.editTest = value;
            }
          });
        
    }

    
    $scope.updateTest = function(){
       
        $http.put("http://localhost:8080/test", JSON.stringify(vm.editTest) )
        .then(function successCallback(response){
            $('#testModal').modal('toggle');
            initController();
            vm.editTest={};
            $("#successAlert").show();
            vm.responseMessage = 'Test Successfully updated';
        }, function errorCallback(response){
            $('#companyModal').modal('toggle');
            $("#errorAlert").show();
            vm.responseMessage = 'Unable to update Test';
            $("#successAlert").hide();
        });
    }

    $scope.addTest = function(){
       
        $http.post("http://localhost:8080/test", JSON.stringify(vm.newTest) )
        .then(function successCallback(response){
            $('#testNewModal').modal('toggle');
            initController();
            vm.newTest={};
            $("#successAlert").show();
            vm.responseMessage = 'Test Successfully added';
        }, function errorCallback(response){
            $("#errorAlert").show();
            $('#testNewModal').modal('toggle');
            vm.responseMessage = 'Unable to add Test';
            $("#successAlert").hide();
        });
    }
    
    $scope.hideAllAlerts = function(){
        $("#successAlert").hide();
        $("#errorAlert").hide();
    }
    $scope.deleteTest = function(testId){
        $scope.hideAllAlerts();
        vm.deleteTestId = testId;
    }

    $scope.removeTest = function(){
        $http.delete("http://localhost:8080/test/"+vm.deleteTestId)
        .then(function successCallback(response){
            $('#confirmationModal').modal('toggle');
            initController();
            vm.deleteTestId={};
            $("#successAlert").show();
            
            vm.responseMessage = 'Test Deleted Successfully';
        }, function errorCallback(response){
            $("#errorAlert").show();
            $('#confirmationModal').modal('toggle');
            vm.responseMessage = 'Unable to delete Test';
            
        });
    }
}