
(function(){
	
	var app = angular.module('myApp', ['ngMessages']);
	
	
	///Directive
	var dirEmail=function(){
		return {
			scope: {
            	err: '='
	        },
			restrict: 'EA',
			link: function (scope, element, attrs) {
				element.bind('blur', function (e) {
					if (element.val()){
						var emailValue=element.val();
						scope.err=false;
						var pos1=emailValue.lastIndexOf("@");
						if(pos1>-1){
							if(pos1!=emailValue.indexOf("@")){
								scope.err=true;
							}
						}
						else{
							scope.err=true;
						}
						var pos2=emailValue.lastIndexOf(".");
						if((pos2==-1)|| (pos2==(emailValue.length-1))){
							scope.err=true;
						}
						if((pos1!=-1) && (pos2!=-1)){
							var txt=emailValue.substring(pos1+1,pos2);
							txt=txt.replace(/\./g, "");
							if(/\W/.test(txt))
							{
								scope.err=true;;
							}
						}
						if(scope.err)
							$("#emailsh").show();
						else
							$("#emailsh").hide();
					}
				});
			}
		};
	};
	
	///Controller
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
				if($scope.emailerr)
				{
					$("#emailsh").show();
				}
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
				});
				res.error(function(data, status, headers, config) {
					alert( "You need webserver in Chrom or run in other browser"); <!--+ JSON.stringify({data: data})-->);
				});	
				
				
			}
		}
	};
	
	
	
	app.controller('myCtrl',ctrl );
	app.directive('myDir', dirEmail);
}());

$(document).ready(function(){
	$("#emailsh").hide();
    $("#p1").click(function(){
        $(this).hide();
    });
});