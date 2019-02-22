'use strict';
angular
    .module('app')
    .controller('EmployeeController', EmployeeController);

    EmployeeController.$inject = ['$window', '$http', '$scope','$compile'];
function EmployeeController($window, $http, $scope, $compile) {
    var vm = this;
    vm.user = 'asdf';
    vm.tests = [];
    vm.companies = [];
    vm.addTest={};
    vm.employees = [];
    vm.deleteTestId = {};
    vm.deleteEmployeeId='';
    vm.editEmployee = {};
    vm.newEmployee = {};
    vm.responseMessage = '';
    initController();

    function initController() {
      loadCompanies();
      
      $http({
        url: 'http://localhost:8080/test',
        method: "GET"
        }).then(function (response) {
            // populateDataTable(response.data);
            vm.tests = response.data;
        }, function (error) {
            console.log(error);
        });
        // $('#sidebarToggle').click(function() {
        //    console.log('hi');
        //   });
    };

    function loadEmployees(){
        $http({
            url: 'http://localhost:8080/employee',
            method: "GET"
        }).then(function (response) {
            populateDataTable(response.data);
            vm.employees = response.data;
        }, function (error) {
            console.log(error);
        });
    }

    function loadCompanies(){
        $http({
            url: 'http://localhost:8080/company',
            method: "GET"
        }).then(function (response) {
            vm.companies = response.data;
            loadEmployees();
        }, function (error) {
            console.log(error);
        });
    }
   function populateDataTable(data){

        var table = $('#example');
        var mytable = table.DataTable();
        mytable.clear().draw();
        $( data ).each(function( i,record ) {
            var editColumn =  '<a data-toggle="modal" data-target="#editEmployeeModal" ng-click="editEmployee(\''+record.id+'\')"> <i class="fa fa-edit" aria-hidden="true"></i></a>';
            var deleteColumn =  '<a data-toggle="modal" data-target="#confirmationModal" ng-click="deleteEmployee(\''+record.id+'\')"> <i class="fa fa-trash" aria-hidden="true"></i></a>';
            var testColumn='<button data-toggle="modal" class="btn btn-success" data-target="#testModal" ng-click="editEmployee(\''+record.id+'\')" value="Tests" >Tests</button> ';
            mytable.row.add([record.name,record.phoneNumber,record.email,getCompanyName(record.companyId),editColumn+deleteColumn+testColumn]);
        });
        mytable.draw(false);
        $compile(table)($scope);
    }

    function getCompanyName(companyId){
        var selectedCompny =null;
        angular.forEach(vm.companies, function(value, key) {
            if(value.id === companyId){
                selectedCompny = value;
            }
          });
          if(selectedCompny){
            return selectedCompny.name;
          }
          return "--Empty--";
    }

    $scope.editEmployee = function(employeeId){
        $scope.hideAllAlerts();
        angular.forEach(vm.employees, function(value, key) {
            if(value.id === employeeId){
                vm.editEmployee = value;
            }
          });
        $scope.populateTestDataTable();
    }
    $scope.populateTestDataTable = function(){
        var table = $('#testTable');
        var mytable = table.DataTable();
        mytable.clear().draw();
        console.log(vm.editEmployee.tests);
        $( vm.editEmployee.tests ).each(function( i,record ) {
            var test;
            angular.forEach(vm.tests, function(value, key) {
                if(value.id === record.testId){
                    test = value;
                }
              });
            var deleteColumn =  '<a data-toggle="modal" data-target="#testConfirmationModal" ng-click="deleteEmployeeTest(\''+record.id+'\')"> <i class="fa fa-trash" aria-hidden="true"></i></a>';
           if(test){
            mytable.row.add([test.name,record.passed,deleteColumn]);
           }
          
        });
        mytable.draw(false);
        $compile(table)($scope);
    }
    
    $scope.updateEmployee = function(){
       
        $http.put("http://localhost:8080/employee", JSON.stringify(vm.editEmployee) )
        .then(function successCallback(response){
            $('#editEmployeeModal').modal('toggle');
            loadEmployees();
            vm.editEmployee={};
            $("#successAlert").show();
            vm.responseMessage = 'Employee Successfully updated';
        }, function errorCallback(response){
            $('#editEmployeeModal').modal('toggle');
            $("#errorAlert").show();
            vm.responseMessage = 'Unable to Update Employee';
            $("#successAlert").hide();
        });
    }

    $scope.addEmployee = function(){
       
        $http.post("http://localhost:8080/employee", JSON.stringify(vm.newEmployee) )
        .then(function successCallback(response){
            $('#employeeAddModal').modal('toggle');
            loadEmployees();
            vm.newEmployee={};
            $("#successAlert").show();
            vm.responseMessage = 'Employee Successfully added';
        }, function errorCallback(response){
            $("#errorAlert").show();
            $('#employeeAddModal').modal('toggle');
            vm.responseMessage = 'Unable to add Employee';
            $("#successAlert").hide();
        });
    }
    
    $scope.hideAllAlerts = function(){
        $("#successAlert").hide();
        $("#errorAlert").hide();
       
    }
    $scope.deleteEmployee = function(employeeId){
        $scope.hideAllAlerts();
        vm.deleteEmployeeId = employeeId;
    }

    $scope.removeEmployee = function(){
        $http.delete("http://localhost:8080/employee/"+vm.deleteEmployeeId)
        .then(function successCallback(response){
            $('#confirmationModal').modal('toggle');
            loadEmployees();
            vm.deleteEmployeeId={};
            $("#successAlert").show();
            
            vm.responseMessage = 'Employee Deleted Successfully';
        }, function errorCallback(response){
            $("#errorAlert").show();
            $('#confirmationModal').modal('toggle');
            vm.responseMessage = 'Unable to delete Employee';
            
        });
    }

    $scope.addTest = function(){
        vm.addTest.employeeId = vm.editEmployee.id;
        $http.post("http://localhost:8080/employee/test", JSON.stringify(vm.addTest) )
        .then(function successCallback(response){
            $('#addEmployeeTest').modal('toggle');
            loadEmployees();
            vm.addTest={};
            $("#successAlert").show();
            vm.responseMessage = 'Test Added Successfully';
        }, function errorCallback(response){
            $("#errorAlert").show();
            $('#addEmployeeTest').modal('toggle');
            vm.responseMessage = 'Unable to add Test';
            $("#successAlert").hide();
        });
    }

    $scope.deleteEmployeeTest = function (testId){
        vm.deleteTestId = testId;
        
        $('#testModal').modal('toggle');
    }

    $scope.removeEmployeeTest = function (){
        $http.delete("http://localhost:8080/employee/test/"+vm.deleteTestId)
        .then(function successCallback(response){
            $('#testConfirmationModal').modal('toggle');
            loadEmployees();
            vm.deleteTestId={};
            $("#successAlert").show();
            
            vm.responseMessage = 'Test Deleted Successfully';
        }, function errorCallback(response){
            $("#errorAlert").show();
            $('#testConfirmationModal').modal('toggle');
            vm.responseMessage = 'Unable to delete Test';
            
        });
    }
}