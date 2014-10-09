<?php

$bucket = 'mypicwebsite';

$form_api_secret = 'gvuRNOZu/DM9fdtCp5zlzhrTHLk='; 

$options = array();

$options['bucket'] = $bucket;

$options['expiration'] = time()+600;

$options['save-key'] = 'mypic_{year}{mon}{day}{hour}{min}{sec}_{random}{.suffix}';

$options['allow-file-type'] = 'jpg,jpeg,gif,png';

$policy = base64_encode(json_encode($options));

$signature = md5($policy.'&'.$form_api_secret);

?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>jQuery File Upload Example</title>
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css">

</head>
<body>

	<h1>Create a New Post</h1>

<input id="fileupload" type="file" name="file" data-url="http://v0.api.upyun.com/mypicwebsite" multiple>
<div id="progress">
    <div class="bar" style="height:18px;background:green;width: 0%;"></div>
</div>
<script src="components/vendor/jquery/dist/jquery.min.js"></script>
<script src="js/jquery.ui.widget.js"></script>
<script src="js/jquery.iframe-transport.js"></script>
<script src="js/jquery.fileupload.js"></script>

<script>
$(function () {
    $('#fileupload').fileupload({
        dataType: 'json',
        formData: {policy: '{{$policy}}',
                   signature: '{{$signature}}'
        },
        progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .bar').css(
            'width',
            progress + '%'
        )},
        done: function (e, data) {
            //alert(data.result.url);
            $.each(data.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });

            img1 = new Image();
            img1.src = "http://mypicwebsite.b0.upaiyun.com/"+data.result.url+"!square140";
            $('body').append(img1);
        },
        fail:function(){

            alert("网络连接错误！");
        }
    });
});
</script>

</body> 
</html>