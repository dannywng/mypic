jQuery(function($){

	upYun = {

		setToken : function(getUrl){

			$.getJSON(getUrl,function(data){

				$('input[name=policy]').val(data.policy);

				$('input[name=signature]').val(data.signature);

			});

		},

		createFormData : function(formElement){

			return new FormData(formElement);

		},

		getUploadFiles : function(fileInputElement){

			return fileInputElement.files;

		}

	};


	upYun.setToken("/handlers/upyun/formAPI_getToken.php");

	var form = $('uploadForm')[0];

	var formData = upYun.createFormData(form);

	var fileInput = $('input[name=file]')[0];












	$("#formdataSubmit").click(function(event){

		var files =upYun.getUploadFiles(fileInput);

		formData.append("file",files[0]);

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