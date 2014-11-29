'use strict'

angular
  .module('theme.tables-editable', [])
  .controller('TablesEditableController', ['$scope', '$filter', function ($scope, $filter) {
    //$scope.myData = [{name: "Moroni", age: 50},
    //                 {name: "Tiancum", age: 43},
    //                 {name: "Jacob", age: 27},
    //                 {name: "Nephi", age: 29},
    //                 {name: "Enos", age: 34}];
    //$scope.gridOptions = {
    //    data: 'myData',
    //    enableCellSelection: true,
    //    enableRowSelection: false,
    //    enableCellEditOnFocus: true,
    //    columnDefs: [{field: 'name', displayName: 'Name', enableCellEdit: true},
    //                 {field:'age', displayName:'Age', enableCellEdit: true}]
    //};

    //$scope.users = [
    //  {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    //  {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    //  {id: 3, name: 'awesome user3', status: 2, group: null}
    //];

    //$scope.statuses = [
    //  {value: 1, text: 'status1'},
    //  {value: 2, text: 'status2'},
    //  {value: 3, text: 'status3'},
    //  {value: 4, text: 'status4'}
    //];

    //$scope.groups = [
    //  {id: 1, text: 'MVP'},
    //  {id: 2, text: 'VIP'},
    //  {id: 3, text: 'ADMINS'},
    //  {id: 4, text: 'USER'}
    //];

      $scope.optiontexts = [
        {id: 1, optionText: 'Option Name 1', isDefault: 1, isDefect: 1}
      ];

      $scope.optionTextDefaults =[
        {value: 1, text: 'True'},
        {value: 2, text: 'False'}
      ];

      $scope.optionTextDefects =[
        {value: 1, text: 'True'},
        {value: 2, text: 'False'}
      ];

      $scope.showOptionTextDefault = function(optionText){
        var selected = [];
        if(optionText.isDefault){
          selected=$filter('filter')($scope.optionTextDefaults,{value:optionText.isDefault});
        }
        return selected.length ? selected[0].text : 'Not set';
      };

      $scope.showOptionTextDefect = function(optionText){
        var selected = [];
        if(optionText.isDefect){
          selected=$filter('filter')($scope.optionTextDefects,{value:optionText.isDefect})
        }
        return selected.length ? selected[0].text : 'Not set';
      };

    //$scope.showGroup = function(user) {
    //  if(user.group && $scope.groups.length) {
    //    var selected = $filter('filter')($scope.groups, {id: user.group});
    //    return selected.length ? selected[0].text : 'Not set';
    //  } else {
    //    return user.groupName || 'Not set';
    //  }
    //};


    //$scope.showStatus = function(user) {
    //  var selected = [];
    //  if(user.status) {
    //    selected = $filter('filter')($scope.statuses, {value: user.status});
    //  }
    //  return selected.length ? selected[0].text : 'Not set';
    //};

    //$scope.saveUser = function(data, id) {
    //  //$scope.user not updated yet
    //  angular.extend(data, {id: id});
    //  // return $http.post('/saveUser', data);
    //};

      $scope.saveOption = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {id: id});
        // return $http.post('/saveUser', data);
      };

      // remove option
      $scope.removeOption = function(index) {
        $scope.optiontexts.splice(index, 1);
      };

    // remove user
    //$scope.removeUser = function(index) {
    //  $scope.users.splice(index, 1);
    //};

    // add user
    //$scope.addUser = function() {
    //  $scope.inserted = {
    //    id: $scope.users.length+1,
    //    name: '',
    //    status: null,
    //    group: null
    //  };
    //  $scope.users.push($scope.inserted);
    //};
      // add option
      $scope.addOption = function() {
        $scope.inserted = {
          id: $scope.optiontexts.length+1,
          optionText: '',
          isDefault: null,
          isDefect: null
        };
        $scope.optiontexts.push($scope.inserted);
      };

  }])
