// JavaScript Document

jQuery(function($){

	var config = {

		scrolllUlId:"scrollUl",

		currentLiClass:"current",

		imgSpacing:30, //unit:px

		animationTime:400,

		LisOpacity:0.3,

		preLiNumbers:2,

		lishoverBright:true,

		hoverLisOpacity:0.5

	}

	var $ul = $("#"+config.scrolllUlId),
	    $t  = config.animationTime,
	    $o  = config.LisOpacity,
	    $pre = config.preLiNumbers,
	    $c   = config.currentLiClass,
	    $room = config.imgSpacing;

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

			var $liWidth = $ul.find("li:first-child").width();

			return $liWidth;

		},

		getCurrentLi : function(){

			return $ul.find("."+$c);	

		}
		
	}
	    	
	var styleHandle = {

		addLiRightMargin : function(){

			$ul.find("li").css({

				"margin-right" : $room+"px"

			});

		},
		
		initUlLeft : function(){

			dis = $pre*(domFactory.getLiWidth()+$room);
			
			$ul.css({
				
				"left" : "-"+dis+"px"	
				
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

			if ($ul.find($this).index()>$ul.find("."+$c).index()){

				$("#scrollWrap").find("#rightarrow").css({"opacity":0.6});

			}
			else {

				$("#scrollWrap").find("#leftarrow").css({"opacity":0.6});

			}

			$this.css("opacity",config.hoverLisOpacity);

		},

		lisHoveringOut : function($this){

			if ($this.is("."+$c)) {return;};

			if ($ul.find($this).index()>$ul.find("."+$c).index()){

				$("#scrollWrap").find("#rightarrow").css({"opacity":0.3});

			}
			else {

				$("#scrollWrap").find("#leftarrow").css({"opacity":0.3});

			}

			$this.css("opacity",$o);

		},

		slideRight : function(time,callBack){

			if($ul.is(":animated")) {return;};
			
			dis = domFactory.getCurrentLi().width()+$room;
			
			styleHandle.removeCurrentClassFromLi();

			slideTime = time||$t;
			
			//开始滑动
			$ul.animate({left : "-="+dis+"px"},
				slideTime,
				"linear",
				function(){						
					var lis =  $ul.find("li"),
						f = lis.first();	
					$ul.animate({"left" : "+="+(f.width()+$room)+"px"},0).append(f);		
					styleHandle.addCurrentClassToLi();	
					if(callBack){callBack()};
			});	

		},

		slideLeft : function(time,callBack){

			if($ul.is(":animated")) {return;};
			
			dis = domFactory.getCurrentLi().width()+$room;
			
			styleHandle.removeCurrentClassFromLi();

			slideTime = time||$t;
			
			//开始滑动
			$ul.animate({left : "+="+dis+"px"},
				slideTime,
				"linear",
				function(){						
					var lis =  $ul.find("li"),
						l = lis.last();	
					$ul.animate({"left" : "-="+(l.width()+$room)+"px"},0).prepend(l);		
					styleHandle.addCurrentClassToLi();	
					if (callBack) {callBack()};		
			});	


		},

		lisClick : function($this){

			var totalTime = $t,

				lis = $ul.find("li");

			if ($this.is("."+$c)){return;}

			else{

				var index = lis.index($this);

				this.slideTimesFlag = index - $pre;

				this.animationSpeed = totalTime / Math.abs(this.slideTimesFlag);

				this.slideCounter = 1;

				if (index < $pre) {

					//ON THE LEFT SIDE

					this.slideLeft(this.animationSpeed,this.slideLeftCall);

				}

				else{

					//ON THE RIGHT SIDE

					this.slideRight(this.animationSpeed,this.slideRightCall);

				}
			}
		},

		slideRightCall : function(){

			if (eventHandle.slideCounter>=Math.abs(eventHandle.slideTimesFlag)) {return;};

			eventHandle.slideCounter++;

			eventHandle.slideRight(eventHandle.animationSpeed,eventHandle.slideRightCall);

		},

		slideLeftCall : function(){

			if (eventHandle.slideCounter>=Math.abs(eventHandle.slideTimesFlag)) {return;};

			eventHandle.slideCounter++;

			eventHandle.slideLeft(eventHandle.animationSpeed,eventHandle.slideLeftCall);
			
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

		if (config.lishoverBright==true){
		
			$ul.find("li").hover(function(){

				eventHandle.lisHoveringIn($(this));

			},
			function(){

				eventHandle.lisHoveringOut($(this));

			});

		};

		$ul.find("li").click(function(){

			var $this=$(this);

			eventHandle.lisClick($this);

		});

		$("#scrollWrap").find("#leftarrow").hover(function(){

			leftLiIndex=$ul.find("."+$c).index()-1;
			li=$ul.find("li").eq(leftLiIndex);

			eventHandle.lisHoveringIn(li);

		},
		function(){

			leftLiIndex=$ul.find("."+$c).index()-1;
			li=$ul.find("li").eq(leftLiIndex);

			eventHandle.lisHoveringOut(li);

		});

		$("#scrollWrap").find("#rightarrow").hover(function(){

			leftLiIndex=$ul.find("."+$c).index()+1;
			li=$ul.find("li").eq(leftLiIndex);

			eventHandle.lisHoveringIn(li);

		},
		function(){

			leftLiIndex=$ul.find("."+$c).index()+1;
			li=$ul.find("li").eq(leftLiIndex);

			eventHandle.lisHoveringOut(li);

		});
		
		$("#leftarrow").click(function(){

			eventHandle.slideLeft();

		});
		
		
		$("#rightarrow").click(function(){

			eventHandle.slideRight();
			
		});

		$(document).keydown(function(event){

			eventHandle.keyDown(event);

		});
	};
	
	function init(){

		domFactory.addLisToUl();

		styleHandle.addLiRightMargin();

		styleHandle.setLisOpacity();

		styleHandle.addCurrentClassToLi();

		styleHandle.initUlLeft();

		triggerEvent();

	};
	
	init();

});
