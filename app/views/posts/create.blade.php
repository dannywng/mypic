<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Demos</title>
</head>

<body style="margin:30px;">
	<h1>上传图片</h1>

	<input type="file" name="file" multiple>
	<span id="formdataSubmit">点击我上传</span>

    <form id="uploadForm" action="http://v0.api.upyun.com/mypicwebsite" 
	method="post" enctype="multipart/form-data">

      <!-- 需要传递以下三个表单内容 -->
      <input type="hidden" name="policy" value="">
      <input type="hidden" name="signature" value="">
			
    </form>
    <script src="/components/vendor/jquery/dist/jquery.min.js"></script>
    <script src="/js/upyunUpload.js" ></script>
</body>
</html>