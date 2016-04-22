'use strict';

  angular.module('b2bApp',['ngRoute','ngAnimate'])
  .config(function($routeProvider){
    $routeProvider
    .when('/',{
      templateUrl: 'views/start.html'
    })
    .when('/calc-month-invoice',{
      templateUrl: 'views/calc-month-invoice.html',
      controller : 'CalcMonthInvoiceCtrl',
      controllerAs : 'vm'
    })
    .otherwise({
      redirectTo:'/'
    })
  })
  .factory('calendarFactory',[calendarFactory])
  .controller('MainCtrl',['$scope',MainCtrl])
  .controller('CalcMonthInvoiceCtrl',['$scope','calendarFactory',CalcMonthInvoiceCtrl])
  .directive('leftNav',['$rootScope',leftNav])

  //services
  function calendarFactory(){
    
    this.month = 4;
    this.year = 2016;
    
    return{
      generateCalendar : generateCalendar
    }

    function generateCalendar(month,year){
      generateMonthDays(month,year);      
    }

    function generateMonthDays(month,year){
      console.log('in service');
      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month+1, 0);
      console.log('firstDay : ' + firstDay.getDay())
      console.log(firstDay)
      console.log('lastDay : ' + lastDay.getDay())
      console.log(lastDay)
    }
  }

  //controllers
  function MainCtrl($scope){
    $scope.leftNavHover = false;

    $scope.$on('toggleMenu',function(){
      $scope.leftNavHover = !$scope.leftNavHover;
      $scope.$apply();
    })
  }

  function CalcMonthInvoiceCtrl($scope,calendarFactory){
    this.monthDays = new Array(7*5);
    this.month = 4; // 0 - january
    this.year = 2016;

    calendarFactory.generateCalendar(this.month,this.year);
    //this.monthDays = generateMonthDays(this.month);    
    

  }

  //directives
  function leftNav($rootScope){
    function link(scope,element, attrs){
      element.on('mouseenter',function(event){
        //console.log('mouseenter registered');
        $rootScope.$broadcast("toggleMenu");
      });
      element.on('mouseleave',function(event){
        //console.log('mouseleave registered');
        $rootScope.$broadcast("toggleMenu");
      });
    }
    return {
      restrict : 'E',
      templateUrl : 'partials/left-nav.html',
      link : link
    }
  }
  
