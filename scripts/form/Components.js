'use strict'

angular
  .module('theme.form-components',['angularFileUpload'])
  .controller('FormComponentsController', ['$scope', '$http', function ($scope, $http) {
    $scope.switchStatus = 1;
    $scope.switchStatus2 = 1;
    $scope.switchStatus3 = 1;
    $scope.switchStatus4 = 1;
    $scope.switchStatus5 = 1;
    $scope.switchStatus6 = 1;

     $scope.formData ={
        Options:[{}]
    };


     $scope.processForm = function() {
            $http.post('http://localhost.fiddler:50619/api/ObservationTemplateSteps', $scope.formData)
                .success(function(data) {
                    console.log(data);

                    if (!data.success) {
                        // if not successful, bind errors to error variables
                       // $scope.errorName = data.errors.name;
                       // $scope.errorSuperhero = data.errors.superheroAlias;
                    } else {
                        // if successful, bind success message to message
                        $scope.message = data.message;
                    }
                });
        };


        $scope.addOption = function($event) {
            var counter=0;
            counter++;

            $scope.formData.Options.push({id:counter})
            $event.preventDefault();
            };




   //$scope.submitObservationTemplateStep=function(form){
   //         $scope.submitted = true;
   //    if(form.$invalid){
   //        return;
   //    }
   //
   //    var config ={
   //        params:{
   //            'callback':'JSON_CALLBACK',
   //            'stepDescription' : $scope.stepDescription,
   //            'showDefect' : $scope.showDefect,
   //            'viewableSetSize' : $scope.viewableSetSize,
   //            'lsl' : $scope.lsl,
   //            'usl' : $scope.usl,
   //            'lcl' : $scope.lcl,
   //            'ucl' : $scope.ucl
   //        }
   //    };
   //
   //    var $promise = $http.jsonp('response.json', config)
   //        .success(function(data, status, headers, config){
   //            if(data.status =='OK') {
   //                $scope.stepDescription = null;
   //                $scope.showDefect = null;
   //                $scope.viewableSetSize = null;
   //                $scope.lsl = null;
   //                $scope.usl = null;
   //                $scope.lcl = null;
   //                $scope.ucl = null;
   //                $scope.messages = 'Your form has been sent!'
   //                $scope.submitted = false;
   //            }else{
   //                $scope.messages = 'Oops, we received your request but there was an error!';
   //                $log.error(data);
   //            }
   //        })
   //        .$error(function(data, status, headers,config){
   //             $scope.progress = data;
   //            $scope.messages ='There was a network error.';
   //            $log.$error(data);
   //          })
   //        .finally(function() {
   //            // Hide status messages after three seconds.
   //            $timeout(function() {
   //                $scope.messages = null;
   //            }, 3000);
   //        });
   //
   //     // Track the request and show its progress to the user.
   //    $scope.progress.addPromise($promise);
   //};

    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };

    $scope.colorPicked = '#fa4d4d';

    $scope.select2RemoteOptions = {
        placeholder: "Search for a movie",
        minimumInputLength: 3,
        width: 'resolve',
        ajax: {
            url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
            dataType: 'jsonp',
            quietMillis: 100,
            data: function (term, page) { // page is the one-based page number tracked by Select2
                return {
                    q: term, //search term
                    page_limit: 10, // page size
                    page: page, // page number
                    apikey: "8vzys3eka2s9hpvkh7wwzp7e" // please do not use so this example keeps working
                };
            },
            results: function (data, page) {
                var more = (page * 10) < data.total; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: data.movies, more: more};
            }
        },
        formatResult: function (movie) {
            var markup = "<table class='movie-result'><tr>";
            if (movie.posters !== undefined && movie.posters.thumbnail !== undefined) {
                markup += "<td class='movie-image'><img src='" + movie.posters.thumbnail + "'/></td>";
            }
            markup += "<td class='movie-info'><div class='movie-title'>" + movie.title + "</div>";
            if (movie.critics_consensus !== undefined) {
                markup += "<div class='movie-synopsis'>" + movie.critics_consensus + "</div>";
            }
            else if (movie.synopsis !== undefined) {
                markup += "<div class='movie-synopsis'>" + movie.synopsis + "</div>";
            }
            markup += "</td></tr></table>"
            return markup;
        },
        formatSelection: function (movie) { return movie.title; },
        dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    };

    $scope.tagList = ['tag1', 'tag2']
    $scope.select2TaggingOptions = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4'] // Can be empty list.
    };

    $scope.multiSelect1 = [];
    $scope.multiSelect2 = [];
  }])
  .controller('DatepickerDemoController', ['$scope', function ($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }])
  .controller('TimepickerDemoCtrl', ['$scope', function ($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }])
  .controller('DateRangePickerDemo', ['$scope', function ($scope) {
    $scope.drp_start = moment().subtract('days', 1).format('MMMM D, YYYY');
    $scope.drp_end = moment().add('days', 31).format('MMMM D, YYYY');
    $scope.drp_options = {
      ranges: {
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
         'Last 7 Days': [moment().subtract('days', 6), moment()],
         'Last 30 Days': [moment().subtract('days', 29), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
      },
      opens: 'left',
      startDate: moment().subtract('days', 29),
      endDate: moment()
    };
  }])


    .controller('FileUploadController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'http://localhost.fiddler:50619/api/Upload',
            contentType: false
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);

  /*  .controller('FileUploadCtrl', ['$scope', '$rootScope', 'uploadManager',
        function ($scope, $rootScope, uploadManager) {
            $scope.files = [];
            $scope.percentage = 0;

            $scope.upload = function () {
                uploadManager.upload();
                $scope.files = [];
            };

            $rootScope.$on('fileAdded', function (e, call) {
                $scope.files.push(call);
                $scope.$apply();
            });

            $rootScope.$on('uploadProgress', function (e, call) {
                $scope.percentage = call;
                $scope.$apply();
            });
        }])

   /* .factory('uploadManager', function ($rootScope) {
        var _files = [];
        return {
            add: function (file) {
                _files.push(file);
                $rootScope.$broadcast('fileAdded', file.files[0].name);
            },
            clear: function () {
                _files = [];
            },
            files: function () {
                var fileNames = [];
                $.each(_files, function (index, file) {
                    fileNames.push(file.files[0].name);
                });
                return fileNames;
            },
            upload: function () {
                $.each(_files, function (index, file) {
                    file.submit();
                });
                this.clear();
            },
            setProgress: function (percentage) {
                $rootScope.$broadcast('uploadProgress', percentage);
            }
        };
    })

    /*.directive('upload', ['uploadManager', function factory(uploadManager) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                $(element).fileupload({
                    dataType: 'text',
                    add: function (e, data) {
                        uploadManager.add(data);
                    },
                    progressall: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        uploadManager.setProgress(progress);
                    },
                    done: function (e, data) {
                        uploadManager.setProgress(0);
                    }
                });
            }
        };
    }]);*/