// JavaScript Document

jQuery(function($){

	var config = {

		scrolllUlId:"scrollUl",

		currentLiClass:"current",

		animationTime:500,

		LisOpacity:0.3,

		preLiNumbers:2,

	}

	var $ul = $("#"+config.scrolllUlId),
	    $t  = config.animationTime,
	    $o  = config.LisOpacity,
	    $pre = config.preLiNumbers;

	var domFactory = {
		
		createLis : function(){
			
			var lis = "";
			lis = "<li><img src=\"img/london07.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend05.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend01.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend02.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend03.jpg\" /></li>";
			lis += "<li><img src=\"img/landsend04.jpg\" /></li>";

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

			return $ul.find("."+config.currentLiClass);	

		}
		
	}

	domFactory.addLisToUl();

	var $w= domFactory.getLiWidth(),

		$dis=$w*$pre;
	    	
	var styleHandle = {
		
		initUlLeft : function(){
			
			$ul.css({
				
				"left" : "-"+$dis+"px"	
				
			});			
			
		},
		
		addCurrentClassToLi : function(){
					
			$ul.find("li").eq($pre).addClass(config.currentLiClass).css({"opacity" : 1});
			
		},
		
		removeCurrentClassFromLi : function(){					

			domFactory.getCurrentLi().removeClass(config.currentLiClass).css({"opacity" : $o});

		}
		
	}

	var eventHandle = {

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


		}

	}
	
	function triggerSlideEvent() {
	
		
		$("#slideTriggerLeft").click(function(){

			eventHandle.slideLeft();

		});
		
		
		$("#slideTriggerRight").click(function(){

			eventHandle.slideRight();
			
		});
	};
	
	
	
	styleHandle.addCurrentClassToLi();

	styleHandle.initUlLeft();
	triggerSlideEvent();

});
