'use strict';
angular
    .module('app')
    .controller('CompanyController', CompanyController);

    CompanyController.$inject = ['$window', '$http', '$scope','$compile'];
function CompanyController($window, $http, $scope, $compile) {
    var vm = this;
    vm.user = 'asdf';
    vm.companies = [];
    vm.deleteCompanyId='';
    vm.editCompany = {};
    vm.newCompany = {};
    vm.responseMessage = '';
    initController();

    function initController() {
        $http({
            url: 'http://localhost:8080/company',
            method: "GET"
        }).then(function (response) {
            populateDataTable(response.data);
            vm.companies = response.data;
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
        var editColumn =  '<a data-toggle="modal" data-target="#companyModal" ng-click="editCompany(\''+record.id+'\')"> <i class="fa fa-edit" aria-hidden="true"></i></a>';
        var deleteColumn =  '<a data-toggle="modal" data-target="#confirmationModal" ng-click="deleteCompany(\''+record.id+'\')"> <i class="fa fa-trash" aria-hidden="true"></i></a>';
        mytable.row.add([record.name,record.city,record.country,record.address,editColumn+deleteColumn]);
     });
    mytable.draw(false);
    $compile(table)($scope);

    
    }

    $scope.editCompany = function(companyId){
        $scope.hideAllAlerts();
        angular.forEach(vm.companies, function(value, key) {
            if(value.id === companyId){
                vm.editCompany = value;
            }
          });
        
    }

    
    $scope.updateCompany = function(){
       
        $http.put("http://localhost:8080/company", JSON.stringify(vm.editCompany) )
        .then(function successCallback(response){
            $('#companyModal').modal('toggle');
            initController();
            vm.editCompany={};
            $("#successAlert").show();
            vm.responseMessage = 'Company Successfully updated';
        }, function errorCallback(response){
            $('#companyModal').modal('toggle');
            $("#errorAlert").show();
            vm.responseMessage = 'Unable to update company';
            $("#successAlert").hide();
        });
    }

    $scope.addCompany = function(){
       
        $http.post("http://localhost:8080/company", JSON.stringify(vm.newCompany) )
        .then(function successCallback(response){
            $('#companyAddModal').modal('toggle');
            initController();
            vm.newCompany={};
            $("#successAlert").show();
            vm.responseMessage = 'Company Successfully added';
        }, function errorCallback(response){
            $("#errorAlert").show();
            $('#companyAddModal').modal('toggle');
            vm.responseMessage = 'Unable to add company';
            $("#successAlert").hide();
        });
    }
    
    $scope.hideAllAlerts = function(){
        $("#successAlert").hide();
        $("#errorAlert").hide();
        vm.responseMessage = 'Company Successfully updated';
    }
    $scope.deleteCompany = function(companyId){
        $scope.hideAllAlerts();
        vm.deleteCompanyId = companyId;
    }

    $scope.removeCompany = function(){
        $http.delete("http://localhost:8080/company/"+vm.deleteCompanyId)
        .then(function successCallback(response){
            $('#confirmationModal').modal('toggle');
            initController();
            vm.deleteCompanyId={};
            $("#successAlert").show();
            
            vm.responseMessage = 'Company Deleted Successfully';
        }, function errorCallback(response){
            $("#errorAlert").show();
            $('#confirmationModal').modal('toggle');
            vm.responseMessage = 'Unable to delete company';
            
        });
    }
}