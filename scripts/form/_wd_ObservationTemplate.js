'use strict'

angular
    .module('theme.form-observationtemplate',[])

    .factory('dataFactory',['$http', function($http){
      var dataFactory ={};
        dataFactory.getObservationSteps = function(){
            return $http.get('http://localhost.fiddler:50619/api/ObservationTemplateSteps');
        }

        dataFactory.completeObservationTemplate = function(completedtemplate){
            return $http.post('http://localhost.fiddler:50619/api/ObservationTemplates', completedtemplate);
        }
        return dataFactory;
    }])

    .service('sharedProperties', function(){

        return{
            getProperty: function(){
                return property;
            },
            setProperty: function(value){
                property = value;
            }
        }
    })

    .controller('FormObservationTemplateController', ['$scope', '$http','pinesNotifications','dataFactory', function ($scope, $http, pinesNotifications, dataFactory) {
        $scope.formData ={
            Steps:[{}]
        };

        $scope.processForm = function() {
            $scope.formData.Steps = $scope.gridOptions.selectedItems
            $http.post('http://localhost.fiddler:50619/api/ObservationTemplates', $scope.formData)
                .success(function(data) {
                    $scope.message = data;
                    $scope.frmTemplate.$setPristine();
                    $scope.formData ={};
                    $scope.gridOptions.selectedItems.length = 0;
                    pinesNotifications.notify({
                        title: 'Success',
                        text: 'Observation tempplate ' + $scope.message.Name + ' added successfully!',
                        type: 'success'
                    })

                    if (!data.success) {
                        pinesNotifications.error({
                            title: 'Error',
                            text: 'There was a problem ' + $scope.message,
                            type: 'error'
                        })
                    } else {
                        // if successful, bind success message to message
                    }
                });
        };


        $scope.cancelTemplate = function($event){
            $scope.frmTemplate.$setPristine();
            $scope.formData = {};
            $scope.gridOptions.selectedItems.length = 0;
            $event.preventDefault();
        }


        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [25, 50, 100],
            pageSize: 25,
            currentPage: 1
        };

        $scope.setPagingData = function(data, page, pageSize){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('http://localhost:50619/api/ObservationTemplateSteps').success(function (largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                    });
                } else {
                    $http.get('http://localhost:50619/api/ObservationTemplateSteps').success(function (largeLoad) {
                        $scope.setPagingData(largeLoad,page,pageSize);
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.$watch('formData', function(newVal, oldVal){
            if(newVal !== oldVal){
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.mySelections =[];
        $scope.gridOptions = {
            data: 'myData',
            enablePaging: true,
            showFooter: true,
            sortInfo : {fields:['Id'], directions:['desc']},
            allowSorting : true,
            selectedItems: $scope.mySelections,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            multiSelect: true,
            keepLastSelected: false,
            rowTemplate: '<div ng-dblclick="onDblClickRow(row)" ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>'
        };

        $scope.onDblClickRow = function(row, pinesNotifications) {

            var size = 'lg';
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: 'ModalContent.html',
                controller: function ($scope, $modalInstance, items) {

                    $scope.items = items;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('Cancel');
                    };

                    $scope.update = function(models){
                        dataFactory.completeObservationTemplate(models.lists.B)
                            .success(function(){
                                pinesNotifications.notify({
                                    title: 'Success',
                                    text: 'Complete Template Saved ' + $scope.message.Name + ' added successfully!',
                                    type: 'success'
                                })
                                    .error(function(){
                                        pinesNotifications.notify({
                                            title: 'Error',
                                            text: 'There was a problem ' + $scope.message,
                                            type: 'error'
                                        })
                                    })

                            });

                        //$http.post('http://localhost.fiddler:50619/api/CompleteObservationTemplate', $scope.models.lists)
                        //    .success(function(data) {
                        //        $scope.message = data;
                        //
                        //
                        //        pinesNotifications.notify({
                        //            title: 'Success',
                        //            text: 'Complete Template Saved ' + $scope.message.Name + ' added successfully!',
                        //            type: 'success'
                        //        })
                        //
                        //        if (!data.success) {
                        //            pinesNotifications.error({
                        //                title: 'Error',
                        //                text: 'There was a problem ' + $scope.message,
                        //                type: 'error'
                        //            })
                        //        } else {
                        //            // if successful, bind success message to message
                        //        }
                        //    });
                    }
                },
                size: size,
                resolve: {
                    items: function () {
                        return row.entity;
                    }
                }
            });
        };


    }])

    .controller('TablesTemplateStepsController', ['$scope', '$filter', '$http','$modal','dataFactory',function ($scope, $filter, $http, $modal, dataFactory) {

    }])

    .controller('TablesTemplateController', ['$scope', '$filter', '$http','$modal','dataFactory','sharedProperties',function ($scope, $filter, $http, $modal, dataFactory) {

        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [25, 50, 100],
            pageSize: 25,
            currentPage: 1
        };

        $scope.setPagingData = function(data, page, pageSize){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get('http://localhost:50619/api/ObservationTemplates').success(function (largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                    });
                } else {
                    $http.get('http://localhost:50619/api/ObservationTemplates').success(function (largeLoad) {
                        $scope.setPagingData(largeLoad,page,pageSize);
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.$watch('formData', function(newVal, oldVal){
            if(newVal !== oldVal){
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.mySelections =[];
        $scope.gridOptions = {
            data: 'myData',
            enablePaging: true,
            showFooter: true,
            sortInfo : {fields:['Id'], directions:['desc']},
            allowSorting : true,
            selectedItems: $scope.mySelections,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            multiSelect: false,
            rowTemplate: '<div ng-dblclick="onDblClickRow(row)" ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>'
        };

        $scope.onDblClickRow = function(row, pinesNotifications) {

            var size = 'lg';
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: 'ModalContent.html',
                controller: function ($scope, $modalInstance, items) {

                    $scope.items = items;
                    $scope.cancel = function () {
                    $modalInstance.dismiss('Cancel');
                    };

                    $scope.update = function(models){
                        dataFactory.completeObservationTemplate(models.lists.B)
                            .success(function(){
                                pinesNotifications.notify({
                                                title: 'Success',
                                                text: 'Complete Template Saved ' + $scope.message.Name + ' added successfully!',
                                                type: 'success'
                                            })
                                    .error(function(){
                                        pinesNotifications.notify({
                                                            title: 'Error',
                                                            text: 'There was a problem ' + $scope.message,
                                                            type: 'error'
                                                        })
                                    })

                            });

                            //$http.post('http://localhost.fiddler:50619/api/CompleteObservationTemplate', $scope.models.lists)
                            //    .success(function(data) {
                            //        $scope.message = data;
                            //
                            //
                            //        pinesNotifications.notify({
                            //            title: 'Success',
                            //            text: 'Complete Template Saved ' + $scope.message.Name + ' added successfully!',
                            //            type: 'success'
                            //        })
                            //
                            //        if (!data.success) {
                            //            pinesNotifications.error({
                            //                title: 'Error',
                            //                text: 'There was a problem ' + $scope.message,
                            //                type: 'error'
                            //            })
                            //        } else {
                            //            // if successful, bind success message to message
                            //        }
                            //    });
                    }
                },
                size: size,
                resolve: {
                    items: function () {
                        return row.entity;
                    }
                }
            });
        };


    }])



