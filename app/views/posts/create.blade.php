<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Demos</title>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
</head>

<body style="margin:30px;">
	<h1>Create a New Post</h1>

    <form action="http://v0.api.upyun.com/<?php echo $bucket?>" 
	method="post" enctype="multipart/form-data">

      <!-- 需要传递以下三个表单内容 -->
      <input type="hidden" name="policy" value="<?php echo $policy?>">
      <input type="hidden" name="signature" value="<?php echo $signature?>">
      <input type="file" name="file[]" multiple="multiple">
      <input type="submit" value="上传">
			
    </form>

</body>
</html>