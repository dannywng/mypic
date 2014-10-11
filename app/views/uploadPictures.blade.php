<?php

$bucket = 'mypicwebsite';

$form_api_secret = 'gvuRNOZu/DM9fdtCp5zlzhrTHLk='; 

$options = array();

$options['bucket'] = $bucket;

$options['expiration'] = time()+1200;

$options['save-key'] = '{year}{mon}{day}{hour}{min}{sec}{random}{.suffix}';

$options['allow-file-type'] = 'jpg,jpeg,gif,png';

$policy = base64_encode(json_encode($options));

$signature = md5($policy.'&'.$form_api_secret);

?>
<!DOCTYPE HTML>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta charset="utf-8">
<title>图片上传</title>
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/uploadPicture.css">
</head>
<body>

    <div class="container">

    	<br />

    	<div class="row">
    		<div class="col-md-12">
		    	<span class="btn btn-primary btn-sm fileinput-button">
		    	<i class="fa fa-plus"></i>
		        <span><strong>选择文件 »</strong></span>
		        <!-- The file input field used as target for the file upload widget -->
		        <input id="fileupload" type="file" name="file" data-url="http://v0.api.upyun.com/mypicwebsite" multiple="">
		    	</span>
		    </div>
	    </div>
	    
	    <br />
    	
    	<div class="row">
    		<div class="col-md-12">
    			<div class="progress">
  					<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
    					<span class="sr-only"><strong>0%</strong></span>
  					</div>
				</div>
		    </div>
	    </div>

	    <br />
    	
    	<div id="pic-preview-area" class="row">

	    </div>

    </div>
<script src="components/vendor/jquery/dist/jquery.min.js"></script>
<script src="js/jquery.ui.widget.js"></script>
<script src="js/jquery.iframe-transport.js"></script>
<script src="js/jquery.fileupload.js"></script>
<script src="js/holder.js"></script>

<script>
$(function () {

    
    

    var c=0;
    var cc=0;

    $('#fileupload').fileupload({
        dataType: 'json',
        formData: {policy: '{{$policy}}',
                   signature: '{{$signature}}'
        },
        change: function (e, data) {
        	$('.progress .progress-bar span').removeClass('sr-only');
            $.each(data.files, function (index, file) {
                //alert('Selected file: ' + file.name);
            var $newDiv = $( "<div class='col-xs-4 col-sm-3 col-md-2'/>" ),
                $newA = $("<a href='#'' target='_blank' class='thumbnail'/>"),
                $newImg = $("<img id='"+c+"' style='width:100%;height:100%;' data-src='holder.js/155x155/auto/text:"+file.name+"'>");

            $newA.append($newImg);

            $newDiv.append($newA);
 
            $( "#pic-preview-area" ).append($newDiv);

            c++;

            });

            //重新运行holder.js
            Holder.addImage("holder.js/200x100","body").run();

            $("#pic-preview-area img").removeAttr("data-src");
            $("#pic-preview-area img").removeAttr("data-holder-rendered");

    	},
    	add: function(e,data){

            //alert(data.files[0].name);
            var img = $("#pic-preview-area img#"+cc);
			data.context = img;
            cc++;
            data.submit();

    	},
        progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('.progress .progress-bar').css(
            'width',
            progress + '%'
        );
        $('.progress .progress-bar span strong').text(progress+'%');
    	},
        done: function (e, data) {
            //$.each(data.files, function (index, file) {
                //$('<p/>').text(file.name).appendTo(document.body);
            //});
            data.context.attr("src","http://mypicwebsite.b0.upaiyun.com/"+data.result.url+"!square250");
            //data.context.removeAttr("data-src");
            data.context.parent().attr("href","http://mypicwebsite.b0.upaiyun.com/"+data.result.url);
        },
        fail:function(){

            alert("网络连接错误！");
        }
    });
});
</script>

</body> 
</html>