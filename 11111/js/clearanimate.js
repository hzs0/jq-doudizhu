$(function(){
	// 洗牌动画函数
		// 1、删除原牌组，并且在这之前先保存该HTML代码
		let all_poker_html = $('.mid_top').html();
		$('.all_poker').remove();
		// 2、生成三组新牌组
		let temp_poker = '';
		temp_poker += '<ul class="all_poker" style="top:-275px;">';
		for(let j=0; j<54; j++){
			temp_poker += '<li class="back" style="top:-'+j+'px"></li>';
		}
		temp_poker += '</ul>';
		$('.mid_top').html(temp_poker);
		

		// $('#log').text(1)
		$('#log').text(1)


		let click = 0;
		// $('.all_poker').find('li').off();
		$('.all_poker').on('click','li',function(){
			if(click == 0){
				click++;
				pokerAnimate();	
				console.log(click);
			}else{
				$('body').unbind('mousemove');
				$('.all_poker li').remove();
				setTimeout(function(){
					$('.all_poker').append(all_poker_html);
				},100)	
			}
		})
		function pokerAnimate(){
			$('body').mousemove(function(e){
				// $('#log').text("e.pageX: " + e.pageX + ", e.pageY: " + e.pageY);
				for(let i=0;i<54;i++){
					let math=Math.random()
					setTimeout(function(){
						$('.all_poker li').eq(i).css({'top':''+(e.pageY-160)+'px','left':''+(e.pageX-950)+'px','transition':'linear 1s','transition':'linear 1s'})
					},100*i)
					// setTimeout(function(){
					// 	alert('洗完牌了')
					// },4000)
				}
			// setTimeout(function(){
			// 	$('.all_poker li').eq(1).css({'top':''+(e.pageY-160)+'px','left':''+(e.pageX-950)+'px'})
			// },1000)
			// $('.all_poker li').eq(0).css({'top':''+(e.pageY-160)+'px','left':''+(e.pageX-950)+'px','transition':'linear 1s','transition':'linear 1s'});
			// setTimeout(function(){
			// 	$('.all_poker li').eq(1).css({'top':''+(e.pageY-160)+'px','left':''+(e.pageX-950)+'px','transition':'linear 1s','transition':'linear 1s'});
			// },100);
			// setTimeout(function(){
			// 	$('.all_poker li').eq(2).css({'top':''+(e.pageY-160)+'px','left':''+(e.pageX-950)+'px','transition':'linear 1s','transition':'linear 1s'});
			// },200);
			})
		}	
});
