$(function(){
		// let index = 0;
		// setInterval(function(){
		// 	index = index++ >5?0 :index;
		// 	// $('body').background({'url':+index+.''})
		// },5000)
		// let index = 0;
		// setInterval(function(){
		// 	index = ++index > 46 ? 0:index;
		// 	$('.bigbox img').animate({'opacity':'0'},2000)
		// 	$('.bigbox').append('<img src="./bgimg/'+index+'.jpg"  style="opacity: 0;z-index:-2">');
		// 	$('.bigbox img').eq(1).animate({'opacity':'1'},2000,function(){
		// 		$('.bigbox img').eq(0).remove();
		// 		$('.bigbox img').css({'z-index':'-1'});
		// 	});
		// },8000)
	
//小手鼠标
$('a').mouseover(function(){
	this.style.cursor='url(./images/mouse.ico),auto';
})
//-------------音乐播放开关------------
// let $mp3 = $('#mp3');
// $('.music a').click(function(){
// 	if($mp3.autoplay){
// 		$mp3.autoplay;
// 	}else{
// 		$mp3.pause();
// 	}
// })
//暂停或者播放背景音乐
// let music_btn = document.getElementsByClassName('music')[0].getElementsByTagName('a')[0];
// 	let mp3 = document.getElementById('mp3');
// 	let statu = true;
// 	console.log(music_btn);
// 	music_btn.onclick = function(){
// 		if(statu == true){
// 			mp3.pause();
// 			statu = false;
			
// 		}else{
// 			mp3.play();
// 			statu = true;
// 		}
// 	}


//随机角色动画

for(let i = 0;i<3;i++){
	let temp = '';
	let math = Math.round(Math.random()*5);
	console.log(math);
	if(i == 0){
		temp = '<img src="./images/roleimg/left'+math+'.png">';
		$('.role_'+(i+1)).append(temp);
	}else if(i == 1){
		temp = '<img src="./images/roleimg/'+math+'.png">';
		$('.role_'+(i+1)).append(temp);
	}else{
		temp = '<img src="./images/roleimg/right'+math+'.png">';
		$('.role_'+(i+1)).append(temp);
	}
}

});