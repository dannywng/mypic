<!-- Stored in app/views/layouts/master.blade.php -->

<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Mypic.io</title>

<!-- Bootstrap -->
<link href="components/vendor/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>
	<header>
        <nav class="navbar navbar-default navbar-fixed-top boxshadows" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        <img alt="Brand" src="">
                    </a>
                </div>
            </div>
        </nav>
    </header>
    <section>
    	@yield('content');
    </section>
    <footer></footer>
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="components/vendor/jquery/dist/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="components/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
    
</body>
</html>