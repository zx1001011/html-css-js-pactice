$(function() {
	function VideoData() {
		this.index = 0;
	};
	VideoData.prototype = {
		init:function(){
			var _this = this;
			
			_this.addVideo("物联网技术在生猪养殖中的应用", 1);
			
			$(".videoDianZan").off();
			$(".videoDianZan").on("click",function(){
				var ac  = $(this).data("active");
				if(ac == "on" ){
					
				}else{
					$(this).data("active","on");
					$(this).attr("src","images/share/dianzanon.png");
					
				}
			});
            var index=0;
            var length=$("#cSlideUl ul li").length;
            var i=1;
            
            //关键函数：通过控制i ，来显示图片
            function showImg(i){
                 $("#cbtn li")
                    .eq(i).addClass("hov")
                    .siblings().removeClass("hov");
                 var name = $("#cbtn li").eq(i).find("div").html();
                 //SewisePlayer.toPlay("video/"+(i+1)+".mp4",name, 0, false); 
                 //SewisePlayer.doPause();
                 _this.addVideo(name,(i+1));
            }
            
            function slideNext(){
                if(index >= 0 && index < length-1) {
                     ++index;
                     showImg(index);
                }else{
        			if(confirm("已经是最后一张,点击确定重新浏览！")){
        				showImg(0);
        				index=0;
        				aniPx=0;
        				//aniPx=(length-5)*142+'px'; //所有图片数 - 可见图片数 * 每张的距离 = 最后一张滚动到第一张的距离
        				$("#cSlideUl ul").animate({ "left": aniPx },200);
        				i=1;
        			}
                    return false;
                }
                if(i<0 || i>length-5) {
                	return false;
                }						  
                $("#cSlideUl ul").animate({ "left": "-=229px" },200)
                i++;
            }
             
            function slideFront(){
               if(index >= 1 ) {
                     --index;
                     showImg(index);
                }
                if(i<2 || i>length+5) {return false;}
                $("#cSlideUl ul").animate({ "left": "+=229px" },200)
                i--;
            }	
                $("#img img").eq(0).show();
                $("#cbtn li").eq(0).addClass("hov");
                $("#cbtn tt").each(function(e){
                    var str=(e+1)+""+length;
                    $(this).html(str)
                })
            
                $(".picSildeRight,#next").click(function(){
                       slideNext();
                   })
                $(".picSildeLeft,#front").click(function(){
                       slideFront();
                   })
                $("#cbtn li").click(function(){
                    index  =  $("#cbtn li").index(this);
                    showImg(index);
                });	
        		$("#next,#front").hover(function(){
        			$(this).children("a").fadeIn();
        		},function(){
        			$(this).children("a").fadeOut();
        		});
		},
		addVideo:function(name,index){
			$(".pl1").html("");
			$(".pl1").html('<script type="text/javascript" src="player/sewise.player.min.js"></script>');
            SewisePlayer.setup({
                server: "vod",
                type: "mp4",
                videourl: "video/"+index+".mp4",
                skin: "vodWhite",
                title: name,
                lang: 'zh_CN',
                autostart:"false",
                volume:"0",
                fallbackurls:{
                    ogg: "http://jackzhang1204.github.io/materials/mov_bbb.ogg",
                    webm: "http://jackzhang1204.github.io/materials/mov_bbb.webm"
                }
            });
		}
			
		
	};
	var Video = new VideoData();
	Video.init();
});