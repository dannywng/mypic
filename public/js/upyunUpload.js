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

			$.ajax({

				url : "http://v0.api.upyun.com/mypicwebsite",
				type : "POST",
				data : formData,
				processData : false,
				contentType : false

			}).done(function(ret){

				if(ret){

					alert(ret);

				}else{

					alert('保存成功！');

				}

			}).fail(function(ret){

				alert(ret);

			});

		});





	});

});