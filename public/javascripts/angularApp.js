var app = angular.module('piProver', ['nvd3', 'rzModule']);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello world!';

  $scope.slider = {
    value: 20,
    options: {
        floor: 10,
        ceil: 20,
        step: 1
    }
};

  $scope.options = {
       chart: {
           type: 'lineChart',
           height: 400,
           margin : {
               top: 20,
               right: 20,
               bottom: 40,
               left: 55
           },
           x: function(d){ return d.x; },
           y: function(d){ return d.y; },
           useInteractiveGuideline: true,
           duration: 100,
           yAxis: {
               tickFormat: function(d){
                  return d3.format('.01f')(d);
               }
           },
       }
   };


   $scope.options.chart.yDomain = [0,10];
   $scope.options.chart.xDomain = [-20,20];

   $scope.data = [{ values: [
     {x: 1, y: 1},
     {x: 2, y: 1},
     {x: 3, y: 1},
     {x: 4, y: 1},
     {x: 5, y: 1},
   ], key: '' }];

   $scope.run = true;

   var x = 6;
   setInterval(function(){
     if (!$scope.run) return;
     $scope.data[0].values = ellipseArea();
     if ($scope.data[0].values.length > 20) $scope.data[0].values.shift();
     x++;

     $scope.$apply(); // update both chart
   }, 100);

   var ellipseArea = function() {
     var ellipseData = [];
     for (var i = -20; i < 20; i+=0.1) {

       var bsquared = $scope.slider.value * $scope.slider.value;
       //var bsquared = 100;
       var secondterm = 100 / bsquared;
       secondterm = secondterm * i * i;
       var root = 100 - secondterm;

       var answer = Math.sqrt(root);

       ellipseData.push({x: i, y: answer});
     }

     $scope.x = (20 * (Math.sqrt(100 * $scope.slider.value
      * $scope.slider.value-10000)
      + Math.asin(10/$scope.slider.value) * $scope.slider.value
      * $scope.slider.value))/(10 * $scope.slider.value * $scope.slider.value);

      $scope.sliderValue = $scope.slider.value
     return ellipseData;
   }
}]);
