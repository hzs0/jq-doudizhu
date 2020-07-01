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
		// 3、执行移动牌组的动画
		for(let i=0; i<54; i++){
			$('.all_poker li').eq(i).css({ 'transform':  'rotateZ('+i*10+'deg) ','transition': 'linear 2s'},1000).animate({'left':+i*5+'px','top':i*1+'px'},1100)
			$('.all_poker li').eq(i).animate({'top':+i*10+'px'},500).animate({'top':+i*2+'px'},500);


			$('.all_poker li').eq(i).css({"transform":"rotateY("+i *20 +"deg) translateX("+(i*10)+"px)"});
		};
		let i = 0;
		let timmer;
		timmer = setInterval(function(){
			i++;
			$('.all_poker').css({"transform":"rotateY("+i+"deg)"});
			setTimeout(function(){
				$('.all_poker li').css({ 'transform':  'rotateZ(0deg) ','transition': 'linear 2s'},2000).animate({'left':'0px'},1000)
			},2000);
			setTimeout(function(){
				$('.all_poker li').css({ 'transform':  'rotateZ(180deg)  translateX(200px)','transition': 'linear 2s'},2000).animate({'left':'0px','top':'0px'},2000)
			},2000);		
			setTimeout(function(){
				clearInterval(timmer);
			},3000);


		
	},5);

// for(let i=0; i<54; i++){
		// 	$('.all_poker li').eq(i).css({ 'transform':  'rotateZ('+i*10+'deg) ','transition': 'linear 2s'},1000).animate({'left':+i*5+'px','top':i*1+'px'},1100)
		// 	$('.all_poker li').eq(i).animate({'top':+i*10+'px'},500).animate({'top':+i*2+'px'},500);
		// };	
		// setTimeout(function(){
		// 	$('.all_poker li').css({ 'transform':  'rotateZ(0deg) ','transition': 'linear 2s'},2000).animate({'left':'0px'},1000)
		// },2000);
		// setTimeout(function(){
		// 	$('.all_poker li').css({ 'transform':  'rotateZ(180deg)  translateX(200px)','transition': 'linear 2s'},2000).animate({'left':'0px','top':'0px'},2000)
		// },2000);		

	// // 洗牌动画函数
	// 	// 1、删除原牌组，并且在这之前先保存该HTML代码
	// 	let all_poker_html = $('.mid_top').html();
	// 	$('.all_poker').remove();
	// 	// 2、生成三组新牌组
	// 	let temp_poker = '';
	// 	temp_poker += '<ul class="all_poker" style="top:-275px;">';
	// 	for(let j=0; j<54; j++){
	// 		temp_poker += '<li class="back" style="top:-'+j+'px"></li>';
	// 	}
	// 	temp_poker += '</ul>';
	// 	$('.mid_top').html(temp_poker);
	// 	// 3、执行移动牌组的动画
	// 	for(let i=0; i<54; i++){
	// 		if(i%2 == 0){
	// 			setTimeout(function({
	// // 				$('.all_poker li').eq(i).css({"transform":"rotateY("+i *20 +"deg) translateX("+(i*10)+"px)"});
	// 				$('.all_poker li').eq(i).css({'transform':'rotateY('+i *20 +'deg) translateX('+(i*10)+'px)'});
	// 			}),120*i);
	// 		}
	// 	};
	// 	let i = 0;
	// 	let timmer;
	// 	timmer = setInterval(function(){
	// 		i++;
	// 		$('.all_poker').css({'transform':'rotateY('+i+'deg)'});
	// 		setTimeout(function(){
	// 			clearInterval(timmer);
	// 		},3000);
			
	// },5);
})
