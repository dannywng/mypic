// JavaScript Document
function triggerSlideEvent() {

	$("#slideTriggerLeft").click(function(){
		
		//删除.current
		$("#scrollUl").queue(function(){
			
			$("#scrollUl li:nth-child(3)").removeClass("current");
			$(this).dequeue();

		});
				
		//开始滑动
		$("#scrollUl").animate({left:"+=1000px"},400);	
		
		//删除被复制过的第一张图片
		$("#scrollUl").queue(function(){
			
			$("#scrollUl li:last-child").prependTo("#scrollUl");
			$(this).css("left","-2000px");
			$(this).dequeue();
			
		});
		
		//添加.current
		$("#scrollUl").queue(function(){
			
			$("#scrollUl li:nth-child(3)").addClass("current");
			$(this).dequeue();
			
		});

	
	});
	
	
	$("#slideTriggerRight").click(function(){
		
		//删除.current
		$("#scrollUl").queue(function(){
			
			$("#scrollUl li:nth-child(3)").removeClass("current");
			$(this).dequeue();

		});
		
			
		//开始滑动
		$("#scrollUl").animate({left:"+=-1000px"},400);	
		
		//删除被复制过的第一张图片
		$("#scrollUl").queue(function(){
			
			$("#scrollUl li:first-child").appendTo("#scrollUl");
			$(this).css("left","-2000px");
			$(this).dequeue();
			
		});
		
		//添加.current
		$("#scrollUl").queue(function(){
			
			$("#scrollUl li:nth-child(3)").addClass("current");
			$(this).dequeue();
			
		});
		
	
	});
};

triggerSlideEvent();


