jQuery(function($){

	upYun = {

		setToken : function(getUrl){

			$.getJSON(getUrl,function(data){

				formData.append("policy",data.policy);
				formData.append("signature",data.signature);

			});

		},

		getUploadFiles : function(fileInputElement){

			return fileInputElement.files;

		}

	};

		var formData = new FormData();

		upYun.setToken("/handlers/upyun/formAPI_getToken.php");


	$("#formdataSubmit").click(function(event){

		var files = $('input[name=file]')[0].files;

		$.each(files,function(index,file){

			formData.append("file",file);

			var xhr = new XMLHttpRequest();
			xhr.open("POST","http://v0.api.upyun.com/mypicwebsite",true);
			xhr.onreadystatechange = function(){

				if(xhr.readyState==4 && xhr.status==200){

					alert(xhr.responseText);

				}
			}

			xhr.send(formData);

		});





	});

});