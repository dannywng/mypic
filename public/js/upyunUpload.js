jQuery(function($){

	$.getJSON("/handlers/upyun/formAPI_getSignature.php",function(data){

		alert(data);

	});

});