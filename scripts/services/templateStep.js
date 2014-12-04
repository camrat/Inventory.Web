angular
    .module('templateStep.services',[])
    .factory('templateStepService',['$rootScope','$http', function($rootScope, $http){
   // var templateStepService = {};
    //templateStepService.data = {};

          //templateStepService.getSteps = function(){
          return $http.get('http://localhost.fiddler:50619/api/ObservationTemplateSteps')
              //.success(function(data){
                 // templateStepService.data.steps = data.result;
              //});

          //}

   // return templateStepService
}]);

