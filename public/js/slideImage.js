// JavaScript Document

jQuery(function($){

	var config = {

		scrolllUlId:"scrollUl",

		liCurrentClass:"current"

	}

	var $ul = $("#"+scrolllUlId);

	
	var styleHandle = {
		
		initUlLeft : function(){
			
			$ul.css({
				
				"left" : "-2000px"	
				
			});			
			
		},
		
		addCurrentClassToLi : function(){
					
			$ul.find("li").eq(2).addClass(config.liCurrentClass).css({"opacity" : 1});
			
		},
		
		removeCurrentClassFromLi : function(){
			

			$current = $ul.find("."+config.liCurrentClass);
			$current.removeClass(config.liCurrentClass).css({"opacity" : 0.3});
		}
		
	}
	
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
		}
		
	}
	
	function triggerSlideEvent() {
	
		
		$("#slideTriggerLeft").click(function(){

			if($ul.is(":animated")) {return;};
			
			$current = $ul.find(".current");
			
			dis = $current.width();
			
			styleHandle.removeCurrentClassFromLi();
			
			//开始滑动
			$ul.animate({left : "+="+dis+"px"},
				500,
				"linear",
				function(){						
					var lis =  $ul.find("li"),
						f = lis.last();	
					$ul.animate({"left" : "-="+f.width()+"px"},0).prepend(f);		
					styleHandle.addCurrentClassToLi();			
			});	

		});
		
		
		$("#slideTriggerRight").click(function(){

			if($ul.is(":animated")) {return;};
			
			$current = $ul.find(".current");
			
			dis = $current.width();
			
			styleHandle.removeCurrentClassFromLi();
			
			//开始滑动
			$ul.animate({left : "-="+dis+"px"},
				500,
				"linear",
				function(){						
					var lis =  $ul.find("li"),
						f = lis.first();	
					$ul.animate({"left" : "+="+f.width()+"px"},0).append(f);		
					styleHandle.addCurrentClassToLi();	
			});	
			
		});
	};
	
	$ul.html(domFactory.createLis());
	styleHandle.addCurrentClassToLi();
	styleHandle.initUlLeft();
	triggerSlideEvent();

});
