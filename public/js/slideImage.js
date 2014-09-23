// JavaScript Document

jQuery(function($){

	var config = {

		scrolllUlId:"scrollUl",

		currentLiClass:"current",

		animationTime:400,

		LisOpacity:0.4,

		preLiNumbers:7,

	}

	var $ul = $("#"+config.scrolllUlId),
	    $t  = config.animationTime,
	    $o  = config.LisOpacity,
	    $pre = config.preLiNumbers,
	    $c   = config.currentLiClass;

	var domFactory = {
		
		createLis : function(){
			
			var lis = "";
			lis = "<li><img src=\"img/london07.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend05.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend01.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend02.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend03.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend04.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend08.jpg\" /></li>";
			lis += "<li><img src=\"img/london03.jpg\" /></li>";
			lis += "<li><img src=\"img/leeds08.jpeg\" /></li>";
			lis += "<li><img src=\"img/leeds06.jpeg\" /></li>";
			lis += "<li><img src=\"img/london01.jpg\" /></li>";
			lis += "<li><img src=\"img/leeds10.jpeg\" /></li>";
			lis += "<li><img src=\"img/london04.jpg\" /></li>";
			lis += "<li><img src=\"img/london02.jpg\" /></li>";
			lis += "<li><img src=\"img/leeds01.jpeg\" /></li>";



			return lis;
		},

		addLisToUl : function(){

			$ul.html(this.createLis());

		},

		getLiWidth : function(){

			var $liWidth = $ul.find("li:first-child").css("width");

			return $liWidth.substring(0,$liWidth.length-2);

		},

		getCurrentLi : function(){

			return $ul.find("."+$c);	

		}
		
	}
	    	
	var styleHandle = {
		
		initUlLeft : function(){
			
			$ul.css({
				
				"left" : "-"+$pre*domFactory.getLiWidth()+"px"	
				
			});			
			
		},

		setLisOpacity : function(){

			$ul.find("li").each(function(){

				$(this).css("opacity",$o);

			});

		},
		
		addCurrentClassToLi : function(){
					
			$ul.find("li").eq($pre).addClass($c).css({"opacity" : 1});
			
		},
		
		removeCurrentClassFromLi : function(){					

			domFactory.getCurrentLi().removeClass($c).css({"opacity" : $o});

		}
		
	}

	var eventHandle = {

		lisHoveringIn : function($this){

			if ($this.is("."+$c)) {return;};

			$this.css("opacity",1);

		},

		lisHoveringOut : function($this){

			if ($this.is("."+$c)) {return;};

			$this.css("opacity",$o);

		},

		slideRight : function(){

			if($ul.is(":animated")) {return;};
			
			dis = domFactory.getCurrentLi().width();
			
			styleHandle.removeCurrentClassFromLi();
			
			//开始滑动
			$ul.animate({left : "-="+dis+"px"},
				$t,
				"linear",
				function(){						
					var lis =  $ul.find("li"),
						f = lis.first();	
					$ul.animate({"left" : "+="+f.width()+"px"},0).append(f);		
					styleHandle.addCurrentClassToLi();	
			});	

		},

		slideLeft : function(){

			if($ul.is(":animated")) {return;};
			
			dis = domFactory.getCurrentLi().width();
			
			styleHandle.removeCurrentClassFromLi();
			
			//开始滑动
			$ul.animate({left : "+="+dis+"px"},
				$t,
				"linear",
				function(){						
					var lis =  $ul.find("li"),
						l = lis.last();	
					$ul.animate({"left" : "-="+l.width()+"px"},0).prepend(l);		
					styleHandle.addCurrentClassToLi();			
			});	


		},

		keyDown : function(event){

			if(event.keyCode=='39'){

				this.slideRight();

			}

			if(event.keyCode=='37'){

				this.slideLeft();

			}

		}

	}
	
	function triggerEvent() {


		$ul.find("li").hover(function(){

			eventHandle.lisHoveringIn($(this));

		},
		function(){

			eventHandle.lisHoveringOut($(this));

		});
		
		$("#slideTriggerLeft").click(function(){

			eventHandle.slideLeft();

		});
		
		
		$("#slideTriggerRight").click(function(){

			eventHandle.slideRight();
			
		});

		$(document).keydown(function(event){

			eventHandle.keyDown(event);

		});
	};
	
	function init(){

		domFactory.addLisToUl();

		styleHandle.setLisOpacity();

		styleHandle.addCurrentClassToLi();

		styleHandle.initUlLeft();

		triggerEvent();

	};
	
	init();

});
