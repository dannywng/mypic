// JavaScript Document
jQuery(function ($) {

	var config = {
		imgSpacing : 30,//图片间隔30px
		imgCurrentClass:"current",//图片和索引当前样式
		preNum : 2, //初始前置2个图片
		animateTime : 500,
		opacity : 0.5
	}

	var data = scrollImgs;

	var $d = $(document),
		$left = $("#left"),
		$right = $("#right"),
		$ul = $("#scrollUl"),
		$discribe = $("#discribe"),
		$scrollIndex = $("#scrollIndex"),
		$initTo = $("#initTo");

	var dataHandle = {
		arrange : function (n){					
				this.ring(n);						
		},
		ring : function(n){
			for (var i = 0; i < n; i++) {
				data.unshift(data.pop());
			};
		}

	}	

	var domFactory = {
		createLis : function (){
			var lis = "";
			dataHandle.arrange(config.preNum);
			for (var i = 0; i < data.length; i++) {
				lis += '<li><img src="' + data[i].src + '" width="' +data[i].width+ '" height="' +data[i].height+ '" alt="'+ data[i].describe +'" /></li>';	
			};
			return lis;	
		},
		initUl : function (){
			var lis = this.createLis();
			$ul.html(lis);
			
		},
		initIndexUl : function (){
			var lis = "";
			for (var i = 0; i < data.length; i++) {
					lis += i==0 ? "<li class='current' >&nbsp;</li>" : "<li>&nbsp;</li>";
				};	
			$scrollIndex.html(lis);	
		},
		writeDiscribe : function (){
			var dis = $ul.find( "." + config.imgCurrentClass ).find("img").attr("alt");
			$discribe.html(dis);
		}

	}

	var styleHandle = {
		addCurrent : function(){
			var c = config.imgCurrentClass;
			$ul.find("li").eq(config.preNum).addClass(c).css({"opacity" : 1});

		},
		removeCurrent : function(){
			var c = config.imgCurrentClass,
				$current = $ul.find("."+c);
			$current.removeClass(c).css({"opacity" : config.opacity});		
		},
		initUlLeft : function (){
			var lis = $ul.find("li"),
				w = 0;
				
			for (var i = 0; i < config.preNum; i++) {
				w += $(lis[i]).width() + config.imgSpacing;			
			};

			$ul.css({
				"left" : 0-w 
			});
			lis.css({"opacity" : config.opacity });
		},
		discribeNone : function (){
			$discribe.fadeOut();
		},
		discribeOn : function (){
			$discribe.fadeIn();
		},
		changeIndexLis : function (flag){
			var c = config.imgCurrentClass,
				$currentLi = $scrollIndex.find("." + c),
				$children = $scrollIndex.children();
				
			$currentLi.removeClass(c);
			if (flag == "right") {
				if ($children.index($currentLi) < $children.length-1 ) {
					$currentLi.next().addClass(c);
				}else{
					$children.first().addClass(c);
				}
			}else if (flag == "left") {
				if ($children.index($currentLi) > 0 ) {
					$currentLi.prev().addClass(c);
				}else{
					$children.last().addClass(c);
				}
			};
		},
		// 0519
		//新增计算高度和方向按钮定位
		initWrap : function(){

			var h = parseInt( data[0]["height"] );

			$ul.css({
				"height" : h
			}) 
			$initTo.css({
				"height" : h + 65 + 30 + 260
			});
			var top = h/2 - 10; 	
			$left.css({
				"top" : top
			});
			$right.css({
				"top" : top
			});

		}

	}



	EventHandle = {
		initUl : function(){
			domFactory.initUl();
			styleHandle.initUlLeft();
			styleHandle.initWrap();
			styleHandle.addCurrent();
			domFactory.writeDiscribe();	
			domFactory.initIndexUl();
		},
		rightMove : function (time,callBack){
			var c = config.imgCurrentClass,
				$current = $ul.find("."+c),
				dis = $current.width()+config.imgSpacing,
				t = time||config.animateTime;

			if ($ul.is(":animated")) {return;};			
			styleHandle.removeCurrent();
			styleHandle.discribeNone();
			$ul.animate({ "left" : "-="+ dis + "px" }, 
				t, 
				"linear",
				function(){
					
					var lis =  $ul.find("li"),
						f = lis.first();	
					$ul.animate({"left" : "+=" + parseInt(f.width() + config.imgSpacing)},0 ).append(f);
					styleHandle.addCurrent();
					
					setTimeout(function (){
						if (!$ul.is(":animated")) {
						domFactory.writeDiscribe();	
						styleHandle.discribeOn();	
						};
					},2) 
					
					
					styleHandle.changeIndexLis("right");
					if (callBack) {callBack()};
			})
		},
		leftMove : function (time,callBack){
			var c = config.imgCurrentClass,
				$current = $ul.find("."+c),
				dis = $current.prev().width()+config.imgSpacing,
				t = time||config.animateTime;

			if ($ul.is(":animated")) {return;};	
			styleHandle.removeCurrent();	
			styleHandle.discribeNone();
			$ul.animate({ "left" : "+="+ dis + "px" }, 
				t, 
				"linear",
				function(){
					
					var lis =  $ul.find("li"),
						l = lis.last();	
					$ul.animate({"left" : "-=" + parseInt(l.width() + config.imgSpacing)} ,0).prepend(l);
					styleHandle.addCurrent();	
					setTimeout(function (){
						if (!$ul.is(":animated")) {
						domFactory.writeDiscribe();	
						styleHandle.discribeOn();	
						};
					},2)	
					styleHandle.changeIndexLis("left");
					if (callBack) {callBack()};

			})
		},
		keyDown : function (){
			if (event.keyCode == '39') {
				this.rightMove();
			}
			if (event.keyCode == '37') {
				this.leftMove();
			}
		},
		rightMoveCall : function (){
			if (EventHandle.c >= Math.abs(EventHandle.d)) {return;};
			EventHandle.c++;
			EventHandle.rightMove(EventHandle.speed,EventHandle.rightMoveCall);
		},
		leftMoveCall : function (){
			if (EventHandle.c >= Math.abs(EventHandle.d)) {return;};
			EventHandle.c++;
			EventHandle.leftMove(EventHandle.speed,EventHandle.leftMoveCall);
		},
		lisClick : function ($this){
			var totT = config.animateTime,
				lis = $ul.find("li");
			if ($this.hasClass("current")||lis.size()==1){return;}else{
				var index = lis.index($this),
					p = config.preNum;

					this.d = index-p;
					this.speed = (totT/Math.abs(this.d)) || 0;
					this.c=1;
					if (index<p) {
						//left
						
						EventHandle.leftMove(this.speed,EventHandle.leftMoveCall);
					}else{
						//right

						EventHandle.rightMove(this.speed,EventHandle.rightMoveCall);
					
					}
			}
		},
		indexClick : function ($this){
			var totT = config.animateTime,
				lis = $scrollIndex.find("li");
			if ($this.hasClass("current")||lis.size()==1){return;}else{
				var index = lis.index($this),
					currentIndex = lis.index($scrollIndex.find(".current"));
					this.d = index-currentIndex ;
					this.speed = (totT/Math.abs(this.d)) || 0;
					this.c=1;
					if (index<currentIndex) {
						//left
						
						EventHandle.leftMove(this.speed,EventHandle.leftMoveCall);
					}else{
						//right

						EventHandle.rightMove(this.speed,EventHandle.rightMoveCall);
					
					}
			}
		}

	}	

	function initTo(){
		
		$('html, body').animate({
			scrollTop: $initTo.offset().top+2
		}, 1000);
	}

	
	function init(){
		EventHandle.initUl();
		if ($ul.find("li").size()>1) {
			$left.click(function (){
				EventHandle.leftMove();
			});
			$right.click(function (){
				EventHandle.rightMove();
			});
			$d.keydown(function (){
				EventHandle.keyDown();
			});
			$ul.delegate("li","click",
				function (){
					var $this = $(this);
					EventHandle.lisClick($this);
			});
			$scrollIndex.delegate("li","click",
				function (){
					var $this = $(this);
					EventHandle.indexClick($this);
			});
		};
		
		initTo();
		
		
	}
	init();

})
