// JavaScript Document

(function(){
	var ctrl=function($scope,$http){
		$scope.name='';
		$scope.mobile='';
		$scope.email='';
		$scope.msg='';
		$scope.vr=false;
		$scope.emailerr=false;
		
		
		$scope.check=function(){
			return (($scope.myForm.email.$invalid && $scope.myForm.mobile.$invalid)|| 
                             ($scope.myForm.name.$invalid)||($scope.myForm.msg.$invalid));
							 
		}
		
		$scope.subm=function(){
			if(($scope.emailerr)||(!$scope.myForm.mobile.$error.required && $scope.myForm.mobile.$error.pattern)){
			}
			else{
				
				var dataObj = {
					name : $scope.name,
					msg : $scope.msg,
					mobile : $scope.mobile,
					mobile:$scope.email
				};	
				var res = $http.post('server.php', dataObj);
				res.success(function(data, status, headers, config) {
					$scope.vr=true;
					alert(data);
				});
				res.error(function(data, status, headers, config) {
					alert( "You need webserver in Chrom or run in other browser"); <!--+ JSON.stringify({data: data})-->);
				});	
				
				
			}
		}
	};
	var dirEmail=function(){
		return {
			scope: {
            	err: '=' //Two-way data binding
	        },
			restrict: 'EA',
			link: function (scope, element, attrs) {
				element.bind('blur', function (e) {
					if (element.val()){
						var emailValue=element.val();
						var pos=emailValue.lastIndexOf("@");
						if(pos>-1){
							if(pos!=emailValue.indexOf("@")){
								scope.err=true;
							}
						}
						else{
							scope.err=true;
						}
						pos=emailValue.lastIndexOf(".");
						if((pos==-1)|| (pos==(emailValue.length-1))){
							scope.err=true;
						}
					}
				});
			}
		};
	};


	var app = angular.module('myApp', ['ngMessages']);
	app.controller('myCtrl',ctrl );
	app.directive('myDir', dirEmail);
}());

$(document).ready(function(){
    $("#p1").click(function(){
        $(this).hide();
    });
});