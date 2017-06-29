(function() {

  'use strict';

  angular
    .module('myApp.components.main', [])
    .controller('mainController', mainController)
    // filter to find sum of a column of values
    .filter('sumColumn', function (){
      return function (data, column){
        var total = 0;

        data.forEach(function (item){
          total += parseInt(item[column]);
        });

        return total;
      };
    })
    // filter to display decimal as percentage
    .filter('percentage', function(){
      return function (input) {
        return (Math.round(input * 100)) + '%';
      };
    });


  mainController.$inject = ['$scope'];

  function mainController($scope) {
    /*jshint validthis: true */
    $scope.revenues = [
    {name: "item 1", once: 100, monthly: 50},
    {name: "item 2", once: 50, monthly: 25},
    {name: "item 3", once: 25, monthly: 85}
    ];
    
    $scope.expenses = [
    {name: "expense 1", once: 500, monthly: 20},
    {name: "expense 2", once: 200, monthly: 40}
    ];

    $scope.newExpenses = [{name: '', once: '', monthly: ''}];

    $scope.newRevenues = [{name: '', once: '', monthly: ''}]

    $scope.delete = function(arr){
      arr.splice(this.$index, 1);
      console.log(arr);
    }

    $scope.addExpense = function(newExpense){

      if(newExpense.once === ''){
        newExpense.once = 0;
      }
      if(newExpense.monthly === ''){
        newExpense.monthly = 0;
      }
      var index = $scope.newExpenses.indexOf(newExpense);
      
      $scope.newExpenses.splice(index, 1);

      $scope.expenses.push(angular.copy(newExpense));

      $scope.newExpenses.push({name: '', once: '', monthly: ''});
      console.log($scope.expenses);

    }

    $scope.addRevenue = function(newRevenue){
      var index = $scope.newRevenues.indexOf(newRevenue);
      
      $scope.newRevenues.splice(index, 1);

      $scope.revenues.push(angular.copy(newRevenue));

      $scope.newRevenues.push({name: '', once: '', monthly: ''});
      console.log($scope.revenues);

    }
  }
  

})();
