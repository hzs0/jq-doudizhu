$(function(){
	// 初始化玩家的数据
	// let player1 = {nekname:'小明', score: 1000, poker:[]}
	// let player2 = {nekname:'小明', score: 1000, poker:[]}
	// let player3 = {nekname:'小明', score: 1000, poker:[]}
	
	let names = ['小明', '小红', '小强'];

	// 玩家数据集合
	let player = [];
	for(let i=0; i<3; i++){
		player.push({nekname:names[i], score: 1000, identity:0, poker:[],selected:{type:0,max:0,poker:[]}});
	}

	// 关于本局游戏数据的集合
	let game_data = {boss:-1,play:-1,desktop:{type:0,max:0,poker:[]}}
	// let boss_num = -1;
	// let desktop = [];
	// console.log(player);

	// 第一个阶段：洗牌
	// 第一步：生成牌组HTML代码
	function pokerGroup(){
		let li_html = '';
			for(let i=0; i<54; i++){
				li_html += '<li class="back" style="top:-'+i+'px"></li>';
			}
			$('.all_poker').html(li_html);
	}
	
	let all_poker = [];
	function pokerMess(){
		// 数据阶段：
		// 第一步：初始化牌组的数据
		// let poker = [10, 0];
		// let poker = {num: 10, color: 0};
		// let all_poker = [{num: 10, color: 0}, {num: 10, color: 1}, {num: 10, color: 2}, {num: 10, color: 3}]
		// 通过循环生成52张除了大小王以外的牌的数据
		for(let i=1; i<=13; i++){
			for(let j=0; j<4; j++){
				all_poker.push({num: i, color: j});
			}
		}
		all_poker.push({num: 14, color: 0});		// 生成小王的数据
		all_poker.push({num: 14, color: 1});		// 生成大王的数据
	}
	

	// 第二步：绑定洗牌事件
	// let click = 0;		// 记录用户点击牌组的次数
	// 由于洗牌的过程中绑定事件的元素会发生改变，导致事件的失效。为了防止事件失效。我们使用监听绑定
	// $('.all_poker li').click(function(){
	// let status = true;
	wash();
	function wash(){
		for(let i = 0;i<3;i++){
			//清空玩家手牌数据
			player[i].poker = [];
			console.log(player[i].poker); 
		}
		//清空桌面牌组数据以及地主信息
		game_data.desktop.poker = [];
		game_data.desktop.type = 0;
		game_data.desktop.max = 0;
		game_data.play = -1;
		game_data.boss = -1;
		console.log(game_data.desktop.poker);
		//清空桌面牌组
		all_poker = [];	
		console.log(all_poker); 
		//清除所有牌面
		$('.all_poker li').remove();
		//清除所有玩家手牌
		$('.play_poker li').remove();
		//清空每位玩家的身份图标
		$('.ident img').remove();	
		$('.desktop_poker li').remove();
		// console.log(player.poker);
		// console.log(all_poker);

		//抢地主的闹钟显示
		$('.text').css({'display':'none'});
		// console.log(all_poker);
		// console.log(click);
		//生成牌组HTML代码
		pokerGroup();
		//初始化牌组的数据
		pokerMess();
		let click = 0;		// 记录用户点击牌组的次数
		// console.log(click);
		//解除重复绑定
		//设置当前动画状态
		let status = false;
		$('.mid_top').off('click', '.all_poker li');
		$('.mid_top').on('click', '.all_poker li', function(){
			if(status == false){
				if(click == 0){
					// alert('开始洗牌');
					// 调用洗牌动画函数
					claerPoker(click);

					// 把初始牌组数据打乱
					for(let i=0; i<4; i++){
						all_poker.sort(function(x, y){
							return Math.random()-0.5;
						});
					}
					console.log(all_poker);	

					// 自增点击数
					click++;
					//把状态值改为true
					status = true;
					//11.1秒后洗牌动画执行后把状态值改为false
					setTimeout(function(){
						status = false;
					},11100)
				}else{
					// alert('发牌');
					// 调用发牌函数
					sendPoker(0);
					$('.all_poker').stop(true,true);
					//调用随机角色函数
					role();
					//解除发牌按钮的事件
					$('.mid_top').off('click', '.all_poker li');
					//播放发牌的音频
					$('#audio1').attr({'src':'./video/aduio/fai.mp3'})
				}
			}
		});
	}

	//随机角色动画
	function role(){
		$('.role_1 img').animate({'left':'0px','opacity':'1'},1000);
		$('.role_2 img').animate({'bottom':'-50px','opacity':'1'},1000);
		$('.role_3 img').animate({'right':'0px','opacity':'1'},1000);
	}	

	// 洗牌动画函数
	function claerPoker(click){
		// 1、删除原牌组，并且在这之前先保存该HTML代码
		let all_poker_html = $('.mid_top').html();
		$('.all_poker').remove();

		// 2、生成三组新牌组
		let temp_poker = '';
		for(let i=0; i<3; i++){
			temp_poker += '<ul class="all_poker" style="top:-'+i*275+'px;">';
			for(let j=0; j<18; j++){
				temp_poker += '<li class="back" style="top:-'+j+'px"></li>';
			}
			temp_poker += '</ul>';
		}
		$('.mid_top').html(temp_poker);

		// $('#log').text(1)
		// let index=1;
		$('body').mousemove(function(e){
			if(click++==1){$('.mid_top').html(temp_poker);}
			
			// $('#log').text("e.pageX: " + e.pageX + ", e.pageY: " + e.pageY);
			for(let i=0;i<54;i++){
				setTimeout(function(){
					$('.all_poker li').eq(i).css({'top':''+(e.pageY-160)+'px','left':''+(e.pageX-950)+'px','transition':'linear 0.1s','transition':'linear 0.1s'})
				},50*i)
			}	
		})
		//洗牌动画执行8秒
		setTimeout(function(){
			$('body').off('mousemove');
			// setTimeout(function(){                                             
			// 		for(let i=0;i<54;i++){
			// 			$('.all_poker li').eq(i).css({'top':''+-i+'px','left':'0'})
			// 	}
			// },3000)
		},8000)
		//洗牌动画结束后重新生成新牌组
		//洗牌动画执行11秒
		setTimeout(function(){
				// 4、删除临时动画牌组
				$('.all_poker').remove();

				// 5、回复原样
				$('.mid_top').html(all_poker_html);
				$('.all_poker li').each(function(i){
					$('.all_poker li').eq(i).animate({'top':'0px'},200,function(){
						$('.all_poker li').eq(i).animate({'left':i*10+'px'},500)
						$('.all_poker').animate({'left':-270+'px'},500)
					});
				})
		}, 11000);
		
	}

	// 发牌函数
	function sendPoker (number){
		if(number < 17){
			// console.log(number);
			number++;	

			// 把牌发给左边玩家
			$('.all_poker').animate({'left':+(number*15-270)+'px'},60);
			$('.all_poker li:last').animate({'left':'-500px','top':number*30+'px'},60, function(){
				// 把总牌组中的最后一张牌的数据，删除并添加到玩家1的手牌数据中
				player[0].poker.push(all_poker.pop());

				// 删除发下去牌背
				$('.all_poker li:last').remove();

				// 生成玩家1当前收到的牌
				let temp = makePoker(player[0].poker[player[0].poker.length-1]);
				$('.play_1').append(temp);
				$('.play_1 li:last').css({'top':number*30+'px'});


				// 把牌发给中间玩家
				$('.all_poker li:last').animate({'left':number*30+'px','top':'500px'}, 60, function(){
					// 把总牌组中的最后一张牌的数据，删除并添加到玩家2的手牌数据中
					player[1].poker.push(all_poker.pop());

					// 删除发下去牌背
					$('.all_poker li:last').remove();

					// 生成玩家2当前收到的牌
					let temp = makePoker(player[1].poker[player[1].poker.length-1]);
					$('.play_2').append(temp);
					$('.play_2 li:last').css({'left':number*30+'px'});
					$('.play_2').css({'left':-number*15+'px'});

					// 把牌发给右边玩家
					$('.all_poker li:last').animate({'left':'700px', 'top':number*30+'px'}, 60, function(){
						// 把总牌组中的最后一张牌的数据，删除并添加到玩家3的手牌数据中
						player[2].poker.push(all_poker.pop());

						// 删除发下去牌背
						$('.all_poker li:last').remove();

						// 生成玩家3当前收到的牌
						let temp = makePoker(player[2].poker[player[2].poker.length-1]);
						$('.play_3').append(temp);
						$('.play_3 li:last').css({'top':number*30+'px'});

						//自调用
						sendPoker(number);
					});

				});
			});
		}else{
			// 牌已经发完了，需要进行排序。所以调用牌的排序函数
			$(player).each(function(i){
				sortPoker(player[i].poker);
			})
			// console.log(player);
			// 通过动画把排序好的牌重新生成到页面对应的位置上
			// 所有玩家的动画 
			// 三个玩家都调用手牌排序动画函数
			sortPokerAnimate(0);
			sortPokerAnimate(1);
			sortPokerAnimate(2, function(){
				getBoss();
			});		
		}
	}

	// 抢地主函数
	function getBoss(get_num, cancel){

		// 1、生成一个0~2之间的随机数，确定由哪位玩家开始抢地主
		// get_num = get_num || Math.round(Math.random()*2);
		if(get_num == undefined){
			get_num = Math.round(Math.random()*2);
		}
		cancel = cancel || 0;
		// console.log(get_num, cancel);

		// 2、让开始抢地主的玩家显示功能按钮
		$('.get_boss').eq(get_num).css({'display':'block'});
		//抢地主的闹钟显示
		$('.clock').eq(get_num).css({'display':'block'});
		//把闹钟的数字变为黑色
		$('.clock p').css({'color':'black'});

		// 3、给抢地主的玩家的按钮绑定对应的事件
		// 3.1、绑定的是抢地主的事件
		$('.get_boss').eq(get_num).find('.get').off();
		$('.get_boss').eq(get_num).find('.get').on('click', function(){

			// 把抢地主按钮隐藏
			$('.get_boss').eq(get_num).css({'display':'none'});
			//不抢地主标签全隐藏
			$('.text').css({'display':'none'});
			//给三位玩家的身份图片显示出来
			$('.ident').animate({'opacity':'1','margin-top':'-25px'},1500);

			//抢完地主清除抢地主定时器
				clearInterval(time);
			// alert('我是地主');

			player[get_num].identity = 1;		// 给对应玩家设置为地主身份
			game_data.boss = get_num;

			// 4、把桌面上留下的三张牌发给地主
			// 4.1、通过简单的动来描述这个过程
			$('.all_poker li').eq(0).animate({'left':'-150px'},500);
			$('.all_poker li').eq(2).animate({'left':'160px'},500, function(){
				// 4.2删除牌背的元素
				$('.all_poker li').remove();

				// 4.3生成三张牌的牌面
				$(all_poker).each(function(i){
					$('.all_poker').append(makePoker(all_poker[i]));
					if (i == 1) {
						$('.all_poker li:last').css({'left':'-150px'});
					}else if(i == 2){
						$('.all_poker li:last').css({'left':'150px'});
					}
				});

				// 4.4 生成的牌进行一个简单移动动画
				$('.all_poker li').animate({'top':'-80px'}, 300);

				// 4.5 等动画结束后，把剩余牌的数据放入地主玩家的手牌中
				setTimeout(function(){
					let temp;
					let temp_html = '';
					let num = 17;
					$(all_poker).each(function(i){
						// 把数据放到地主玩家的手牌数据中
						temp = all_poker.pop();
						player[game_data.boss].poker.push(temp);	

						// 把牌生成到地主玩家的HTML代码中
						temp_html = makePoker(temp);
						$('.play_'+(game_data.boss+1)).append(temp_html);
						if(game_data.boss == 1){
							$('.play_'+(game_data.boss+1)).find('li:last').css({'left': (510+i*30) + 'px','top':'-50px'});
							$('.play_'+(game_data.boss+1)).css({'left':-(num++ * 15) + 'px'});
							$('.play_'+(game_data.boss+1)).find('li:last').animate({'top':'0px'},500,function(){
								sort();
							});
						}else if(game_data.boss == 2){
							$('.play_'+(game_data.boss+1)).find('li:last').css({'top':(510+i*30) + 'px','left':'-50px'});
							$('.play_'+(game_data.boss+1)).find('li:last').animate({'left':'0px'},500,function(){
								sort();
							});
						}else{
							$('.play_'+(game_data.boss+1)).find('li:last').css({'top':(510+i*30) + 'px','right':'-50px'});
							$('.play_'+(game_data.boss+1)).find('li:last').animate({'left':'0px'},500,function(){
								sort();
							});
						}
						// 4.6 地主玩家再做一次动画，进行排序
						function sort(){
							sortPoker(player[game_data.boss].poker);
							sortPokerAnimate(game_data.boss);
						};
					})
				}, 1000);

				// 4.7 把当前出牌玩家设置为地主；
				game_data.play = game_data.boss;

				//把地主玩家的身份图片改掉
				// $('.ident img').eq(game_data.play).attr({'src':'./images/king.png'})


				//抢完地主后判断谁是地主写入图标
				for(let i = 0;i<3;i++){
					if(i == game_data.play){
						$('.ident').eq(i).append('<img src="./images/king.png">');
					}else{
						$('.ident').eq(i).append('<img src="./images/tie.png">')	
					}
				}

				//播放抢地主的音频
				$('#audio1').attr({'src':'./video/aduio/抢地主.mp3'})

				//开始进入出牌
				//5.设置地主出牌函数
				setTimeout(function(){
					playPoker(game_data.play);
				},2500)
			});
		});
		// 3.2、绑定不抢地主事件
		$('.get_boss').eq(get_num).find('.cancel').off();
		$('.get_boss').eq(get_num).find('.cancel').on('click', function(){
			// alert('我不要');
			//不抢抢地主清除抢地主定时器
				clearInterval(time);

			// 把对应玩家抢地主按钮隐藏或删除
			$('.get_boss').eq(get_num).css({'display':'none'});
			//抢地主的闹钟显示
			$('.clock').eq(get_num).css({'display':'none'});
			//不抢地主标签显示
			$('.text').eq(get_num).css({'display':'block'});

			// 自调函数\
			get_num = ++get_num > 2? 0: get_num; 
			if(++cancel == 3){
				// alert('本局流局，请重新开始')
				//重新洗牌
				wash();
				// alert(1);
				cancel = 0;
				console.log(cancel);
			}else{
				getBoss(get_num, cancel);
			}

			//播放抢地主的音频
			$('#audio1').attr({'src':'./video/aduio/不抢.mp3'})

		});
		// console.log(all_poker);
		// console.log(player[get_num].poker);

		//定义一个空的定时器变量
		let time = '';
		//给抢不抢地主做一个时间限制8秒内不抢直接到下一个玩家抢地主	
		//抢地主倒计时函数
		function timeout(){
			let ms = 9;
			time = setInterval(function(){
				ms = --ms < 0?0:ms;
				if(ms > 3){
					$('.clock p').html(ms);	
					$('.clock p').css({'color':'black'});
					// console.log(ms);	
				}else if(ms <= 3 && ms > 0){
					//抢地主剩下最后3秒的时候和出现警告声
					$('.clock p').css({'color':'red'});
					$('#audio1').attr({'src':'./video/aduio/警告声.mp3'})
					$('.clock p').html(ms);
				}else{
					clearInterval(time);
					$('.clock p').html(8);
					//8秒以后直接点击不抢地主
					$('.get_boss').eq(get_num).find('.cancel').one().click();
				}	
			},1000)
		}
		timeout();

	}

	//出牌封装的函数
		
	function playPoker(play,pass){

		let time = '';

		 // alert(123)
		// 如果已经累加了2次过牌，则桌面牌清空
		if(pass == 2){
			game_data.desktop.type = 0;
			game_data.desktop.max = 0;
			game_data.desktop.poker = [];
			pass = 0;
		}
		//给当前玩家按钮赋值
		let $play_btn = $('.play_btn').eq(play);
		let $play_clock = $('.clock').eq(play);

		//  把所玩家的按钮都隐藏
		//  把所闹钟的按钮都隐藏
		$('.play_btn').css({'display':'none'});
		$('.clock').css({'display':'none'});
		$('.clock p').css({'color':'black'});
		// 对玩家操作按钮组进行处理
		$play_btn.css({'display':'block'});
		//闹钟
		$play_clock.css({'display':'block'});

		//解除重复绑定事件
		$play_btn.off('click','.play').off('click','.pass');
		// 解绑选择牌的事件
		$('.play_poker').off('click', 'li');
		// $('.play_1').off('click', 'li');
		// $('.play_2').off('click', 'li');
		// $('.play_3').off('click', 'li');

		//绑定点击牌事件
		$('.play_'+(play+1)).on('click','li',function(){

			//出牌后清除定时器
			// clearInterval(timmer3);
			//获取点中的牌的数据
			let poker_data ={};
			poker_data.num = $(this).attr('data-num')*1;
			poker_data.color = $(this).attr('data-color')*1;
			// alert(21)

			//通过当前牌的样式是否有selected这样的类型来判断选中还是取消
			if($(this).attr('class') != 'selected'){
				player[play].selected.poker.push(poker_data)
				// console.log(player[play].selected.poker);
				//设置该牌的样式为选中
				$(this).addClass('selected');
			}else{
				//把要点击取消的牌的数据从选中牌数组中删除
				for(let i = 0;i<player[play].selected.poker.length;i++){
					if(player[play].selected.poker[i].num == poker_data.num && 
						player[play].selected.poker[i].color == poker_data.color){
						player[play].selected.poker.splice(i,1);
						break;
					}
				}
				//如果有就是被取消去除该牌的样式
				$(this).removeClass('selected');

				// console.log(player[play].selected.poker);
			}		
		})
		//绑定出牌事件
			$play_btn.on('click','.play',function(){
				//解除重复绑定事件
				// $('.play_'+(play+1)).off('click','li');
				if(player[play].selected.poker.length == 0){
					// alert('选中你要出的牌！');
					//再次点击的时候后移除第一张图片
					$('.trip').find('img').eq(0).remove();
					$('.trip').css({'z-index':'9999'});
					$('.trip').append('<img src="./images/youfirst.png">')
					//提示图片执行的动画
					$('.trip img').eq(0).animate({'top':'0px','opacity':'1'},500).animate({'opacity':'1'},3000,function(){
						$('.trip img').eq(0).animate({'top':'50px','opacity':'0'},500,function(){
							$('.trip').css({'z-index':'0'});
						})
					})
				}else{
					//进入出牌阶段
					//对打出的牌形进行判断是否正确
					if(!checkPoker(player[play].selected)){
						// alert('对不起，您的选牌不符合出牌规则');
						// console.log(!checkPoker(player[play].selected));
						disCover(!checkVS(play),!checkPoker(player[play].selected),play);
					}else{
						if(!checkVS(play)){
							//对当前玩家出牌情况进行判断
							// 判断用户的牌能不能打得过上一个用出得牌组
							// alert('对不起，你不能这样出牌');
							console.log(!checkVS(play));
							disCover(!checkVS(play),!checkPoker(player[play].selected),play);
						}else{

							//先把打出去的牌的数据替换成桌面牌组的数组
							game_data.desktop.type = player[play].selected.type;
							game_data.desktop.max = player[play].selected.max;
							game_data.desktop.poker = [];

							for(let i = 0;i<player[play].selected.poker.length;i++){
								//最先开局的时候桌面什么牌都没有
								game_data.desktop.poker.push({num:0, color:0});

								for(x in player[play].selected.poker[i]){
									game_data.desktop.poker[i][x] = player[play].selected.poker[i][x];
								}
							}

							//把打出去的牌从手牌数据中删除
							for(let i = 0;i<player[play].poker.length;i++){
								for(let j = 0;j<player[play].selected.poker.length;j++){
									if(player[play].poker[i].num == player[play].selected.poker[j].num && 
										player[play].poker[i].color == player[play].selected.poker[j].color
										){
										// console.log(i,j);
										player[play].poker.splice(i, 1);
									}
								}
							}

							//打出牌的数据替换成桌面牌数据和手牌数据替换后把玩家选中的牌初始化
							player[play].selected.type = 0;
							player[play].selected.max = 0;
							player[play].selected.poker = [];

							// 画面的生成
							// 1、生成桌面牌的HTML代码
							// 1.1 删除原桌面的牌组、
							$('.desktop_poker li').remove();

							$(game_data.desktop.poker).each(function(i){
								$('.desktop_poker').append(makePoker(game_data.desktop.poker[i]));
								$('.desktop_poker li:last').css({'left':i*30+'px'});
								$('.desktop_poker').css({'left':-15*i+'px'});
							});

							// 2、生新生成玩家手牌的HTML代码
							// 2.1 把手牌全删除 
							$('.play_'+(play+1)+' li').remove();
							// 2.2 通过手牌数据重新的生成HTML代码到对应玩家中
							$(player[play].poker).each(function(i){
								$('.play_'+(play+1)).append(makePoker(player[play].poker[i]));
									if(play == 1){
										$('.play_'+(play+1)+' li:last').css({'left':i*30+'px'});
										$('.play_'+(play+1)).css({'left':-i*15+'px'});
									}else{
										$('.play_'+(play+1)+' li:last').css({'top':i*30+'px'});
										// $('.play_'+(play+1)).css({'top':i*7.5+'px'});
									}
							});

							// -----------判断胜负--------
							if(player[play].poker.length == 0 ){
								// alert('你胜出了！！！');
								//对当前玩家出牌情况进行判断
								//再次点击的时候后移除第一张图片
								$('.trip').find('img').eq(0).remove();
								$('.trip').css({'z-index':'9999'});
								$('.trip').append('<img src="./images/youwin.png">')
								//提示图片执行的动画
								$('.trip img').eq(0).animate({'top':'0px','opacity':'1'},500).animate({'opacity':'1'},3000,function(){
									$('.trip img').eq(0).animate({'top':'50px','opacity':'0'},500,function(){
										$('.trip').css({'z-index':'0'});
									})
								})
								//隐藏所有玩家按钮和时钟
								$play_btn.css({'display':'none'});
								$('.clock').css({'display':'none'});
								// //清除定时器否则会继续进行有游戏
								clearInterval(time);

								//游戏结束后3秒重新开始游戏洗牌
								setTimeout(function(){
									//清除定时器否则会继续进行有游戏
									clearInterval(time);
									//重新洗牌
									wash();
								},3000)
							}else{
								// console.log(player[play].poker.length);
								// if(player[play].poker.length == 2){
								// 	$('#audio1').attr({'src':'./video/aduio/我就两张牌了.mp3'})
								// }else if(player[play].poker.length == 1){
								// 	$('#audio1').attr({'src':'./video/aduio/我就一张牌了.mp3'})
								// }else{
									//调用音效函数
									pokerAudio(game_data.desktop.type,game_data.desktop.poker[0].num,game_data.desktop.poker[0].color);
									// console.log(game_data.desktop.poker[0].num);
								// }
								// 还没有分出胜负，继续打牌
								play = ++play > 2? 0: play;
								//清除上一个玩家定时器
								clearInterval(time);
								//判断牌型如果是连对或者飞机或者炸弹或者是王炸就延迟5秒等动画播放完后再调用出牌函数
								if(game_data.desktop.type == 7 || 
									game_data.desktop.type == 8 || 
									game_data.desktop.type == 100 ||
									game_data.desktop.type == 110 ){
									//五秒后调用
										setTimeout(function(){
											playPoker(play, 0);	
										},5500);
									}else{
										// 否则立即调用
										playPoker(play, 0);	
									}

							}
						}
					}
				}
			})

			//绑定过牌事件
			// if(game_data.desktop.poker == ''){
			// 	$play_btn.off('click','.pass');
			// 	alert(123);
			// }else{
				$play_btn.on('click','.pass',function(){

					if(game_data.desktop.poker == ''){
						//对当前玩家出牌情况进行判断
						disCover(!checkVS(play),!checkPoker(player[play].selected),play);
						// $play_btn.off('click','.pass');
						// alert('你必须先出牌');
						// break;
					}else{
						//如果有手牌选中就取消选中
						$('.play_'+(play+1)+' li').each(function(i){
							if($('.play_'+(play+1)).find('li').eq(i).attr('class') == 'selected'){
								$('.play_'+(play+1)).find('li').eq(i).on().click();
							}
						})
						// 解除重复绑定事件
						$('.play_'+(play+1)).off('click','li');
						// 切换到下一位玩家进行按钮操作
						game_data.play = ++play > 2?0 :play;
						//重新调用出牌函数
						playPoker(game_data.play,pass+1);
						//清除上一个玩家的出牌时间的定时器
						clearInterval(time);
						//播放抢地主的音频
						$('#audio1').attr({'src':'./video/aduio/过.mp3'})
					}	
				});

				//出牌倒计时函数
				function timeOut(){
					let ms =26
					time = setInterval(function(){
						ms = --ms < 0?0:ms;
						if(ms > 5){
							$('.clock p').html(ms);	
							// console.log(ms);	
						}else if(ms <= 5 && ms > 0){
							//出牌玩家剩下最后5秒的时候出现红色数字和警告声音
							$('.clock p').css({'color':'red'});
							$('#audio1').attr({'src':'./video/aduio/警告声.mp3'})
							$('.clock p').html(ms);
						}else if(game_data.desktop.poker == '' && ms == 0){
							//如果地主或者经过一轮后超过了限定时间未出牌有选中的牌的话先取消选中在出第一战牌
							$('.play_'+(play+1)+' li').each(function(i){
								if($('.play_'+(play+1)).find('li').eq(i).attr('class') == 'selected'){
									$('.play_'+(play+1)).find('li').eq(i).on().click();
								}
							})
							clearInterval(time);
							//取消选中的牌或没有选中的牌后自动出第一张最小的牌
							$('.play_'+(play+1)).find('li').eq(0).on().click();
							$play_btn.find('.play').on().click();
						}else{
							$('.clock p').html(25);	
							clearInterval(time);
							$play_btn.find('.pass').on().click();
						}	
					},1000)
				}
				timeOut();		
			
	}

	// 生成牌面的HTML代码的函数
	function makePoker(poker){
		// console.log(poker);
		let colors = [
			{x:-16, y:-226},		// 方块花色的坐标
			{x:-16, y:-8},			// 梅花花色的坐标
			{x:-160, y:-8},			// 红桃花色的坐标
			{x:-160, y:-226},		// 黑桃花色的坐标
		];


		let x, y;
		if(poker.num != 14){
			x = colors[poker.color].x;
			y = colors[poker.color].y;
		}else {
			if(poker.color == 0){
				x = -160;
				y = -8;
			}else {
				x = -16; 
				y = -8;
			}
		}
		
		let html = '<li data-num="'+poker.num+'" data-color="'+poker.color+'" style="width: 125px; height: 174px; background: url(./images/'+poker.num+'.png) '+x+'px '+y+'px;"></li>';
		return html;
	}

	// 牌组排序函数
	function sortPoker(poker_data){
		// arr = [{num:10, color: 0},{num:8, color: 3},{num:8, color: 1},{num:13, color: 3}];
		poker_data.sort(function(x, y){
			if(x.num != y.num){
				return x.num - y.num;
			}else {
				return x.color - y.color;
			}
		});
		return true;
	}


	// 玩家手牌排序动画函数
	// 这个函数中使用了回调函数的方法，可以让动画结束后再按需要执行我们想要执行的语句
	function sortPokerAnimate(play, fun){
		// 1、删除原牌
		$('.play_'+(play+1)+' li').remove();
		// 2、生成牌背
		let temp = '';
		$(player[play].poker).each(function(i){
			if(play == 1){
				temp += '<li class="back" style="left:'+i*30+'px;opacity:0;"></li>';
			}else{
				temp += '<li class="back" style="top:'+i*30+'px;opacity:0;"></li>';
			}
		});
		$('.play_'+(play+1)).html(temp);

		//洗牌动画
		$('.play_'+(play+1)+' li').animate({'opacity':'1'},500,function(){
			if(play == 1){
				$('.play_2 li').animate({'left':60+(((player[play].poker.length/2)*15)+70)+'px'},500);
				// console.log(player[play].poker.length/2);
			}else{
				$('.play_'+(play+1)+' li').animate({'top':210+'px'},500);
			}
		});

		// 等2秒后生成新的牌面
		setTimeout(function(){
			// 删除牌背
			$('.play_'+(play+1)+' li').remove();

			// 循环生成新的牌面
			if(play == 1){
				$(player[play].poker).each(function(i){
					temp = makePoker(player[1].poker[i]);
					$('.play_2').append(temp);
					$('.play_2 li:last').css({'left':(((player[play].poker.length/2)*15)+70)+'px','opacity':'0'});
					$('.play_2 li:last').animate({'left':i*30+'px','opacity':'1'},500);
					// $('.play_2').css({'left':'-230px'});
				});
			}else{
				$(player[play].poker).each(function(i){
					temp = makePoker(player[play].poker[i]);
					$('.play_'+(play+1)).append(temp);
					$('.play_'+(play+1)+' li:last').css({'top':'210px','opacity':'0'});
					$('.play_'+(play+1)+' li:last').animate({'top':i*30+'px','opacity':'1'},500);
					// $('.play_2 li:last').animate({'top':210+'px'},500);
				});
			}

			// 判断fun这个值是否有函数传进来，如果有的话，再执行它
			console.log(typeof fun);
			if(typeof fun == 'function'){
				fun();
			}
		}, 2000);
	}

	// 牌型判断的函数
	function checkPoker( data ){
		/*
			牌型判断需要通不同牌张数来各自进行判断的
			牌型代码：
			1 			单张
			2 			对子
			3 			三张
			4  			三带一
			5 			三带二
			6 			顺子
			7  			连对
			8 			飞机
			9 			四带二
			100 		炸弹
			110 		王炸

		 */
		// 手牌数据重新排序
		sortPoker(data.poker);
		let poker = data.poker;
		// console.log(poker.length);

		// 先判断一次牌子是否为顺子
		if(poker.length >= 5 && poker.length <= 12){
			// console.log(poker[poker.length-1]);
			// alert(123)    
			// console.log(poker[0].num+1);
			// console.log(checkStraight(poker))
			if(checkStraight(poker)){
				data.type = 6;		// 设置牌型为顺子
				data.max = poker[poker.length-1].num;		// 设置牌型判断值
				return true;
				// console.log(poker[poker.length-1]);
			}
		}

		switch(data.poker.length){
			// 没有牌的情况
			case 0:
				return false;
			break;

			// 一张牌的情况
			case 1:
				data.type = 1;		// 设置牌型为单张
				data.max = poker[0].num;		// 设置牌型判断值
				return true;
			break;

			// 两张牌的情况 
			case 2:
				// 判断两张牌的点数是否相同
				if(poker[0].num != poker[1].num){
					return false;
				}
				// 判断牌型是对子还是王炸
				if(poker[0].num != 14){
					data.type = 2;		// 设置牌型为对子
					data.max = poker[0].num;		// 设置牌型判断值
				}else{
					data.type = 110;		// 设置牌型为王炸
					data.max = poker[0].num;		// 设置牌型判断值
				}
				return true;
			break;

			// 三张牌的情况 
			case 3:
				//判断为三张
				if(poker[0].num == poker[2].num){
					data.type = 3;		// 设置牌型为三张
					data.max = poker[0].num;		// 设置牌型判断值
					return true;
				}else{
					return false;
				}
			break;

			// 四张牌的情况 
			case 4:
				// 先判断是否为炸弹
				if(poker[0].num == poker[3].num){
					data.type = 100;		// 设置牌型为炸弹
					data.max = poker[0].num;		// 设置牌型判断值
					return true;
				}
				// 再判断是否为三带一
				if(poker[0].num == poker[2].num || poker[1].num == poker[3].num){
					data.type = 4;		// 设置牌型为三带一
					data.max = poker[1].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;

			// 五张牌的情况 
			case 5:
				// 判断牌型是否为三带二
				if(poker[0].num == poker[2].num && poker[3].num == poker[4].num ||
					poker[0].num == poker[1].num && poker[2].num == poker[4].num
					){
					data.type = 5;		// 设置牌型为三带二
					data.max = poker[2].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;

			// 六张牌的情况 
			case 6:
				// 判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				/*
					333444
				 */
				// 判断是否为6张牌的飞机
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[1].num+1 == poker[4].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				// 判断是否为四带二
				/*
					444456
					567777
					566667
				 */
				if(poker[0].num == poker[3].num || poker[2].num == poker[5].num || poker[1].num == poker[4].num){
					data.type = 9;		// 设置牌型为四带二
					data.max = poker[2].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;

			//只有顺子一种情况
			case 7:
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
					// console.log(poker[poker.length-1]);
				}else{
					return false;
				}
			break;

			// 五张牌的情况
			case 8:
				//判断是否为连对
				//33445566
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				//判断是否为飞机
				//**555666 
				//*555666*
				//555666**
				if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[3].num + 1 == poker[6].num || 
					poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[2].num + 1 == poker[5].num || 
					poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[1].num + 1 == poker[4].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[5].num;		// 设置牌型判断值
					return true;
				}

				// //判断四带两对子    /------------------------问题获取牌面最大的点数大小-----------------------/
				// //****5555 
				// //**5555**
				// //5555****;
				// if(poker[4].num == poker[7].num && poker[0].num == poker[1].num && poker[2].num == poker[3].num ||
				// 	poker[2].num == poker[5].num && poker[0].num == poker[1].num && poker[6].num == poker[7].num ||
				// 	poker[0].num == poker[3].num && poker[4].num == poker[5].num && poker[6].num == poker[7].num){

				// }
				return false;
			break;

			//九张牌的情况
			case 9:
				//判断是否为飞机
				//333444555
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}else{
					return false;
				}
			break;

			//十张牌情况
			case 10:
				//判断是否为连对
				//3344556677
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}else{
					return false;
				}
			break;

			//十一张牌情况
			case 11:
				//只有一种顺子牌型
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
					// console.log(poker[poker.length-1]);
				}else{
					return false;
				}
			break;

			//十二张牌的情况
			case 12:
				//判断是否为连对
				//334455667788
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				//判断是否为飞机
				//第一种飞机的情况
				//5 5 5 6 6 6 7 7 7 8 8 8
				
				//第二种飞机的情况
				//3 4 5 6 6 6 7 7 7 8 8 8
				//3 4 6 6 6 7 7 7 8 8 8 9
				//3 6 6 6 7 7 7 8 8 8 9 10
				
				//第三种飞机的情况
				//6 6 6 7 7 7 8 8 8 9 10 11
				
				//分解机的第一种判断
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && 
					poker[6].num == poker[8].num && poker[9].num == poker[11].num &&
					poker[1].num + 1 == poker[4].num && poker[4].num + 1 == poker[7].num &&
					poker[7].num + 1== poker[10].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				//飞机的第二种判断
				if(poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
					poker[4].num + 1 == poker[7].num && poker[7].num + 1 == poker[10].num || 
					poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && 
					poker[3].num + 1 == poker[6].num && poker[6].num + 1 == poker[9].num ||
					poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num && 
					poker[2].num + 1 == poker[5].num && poker[5].num + 1 == poker[8].num ){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[9].num;		// 设置牌型判断值
					return true;
				}

				//第三种飞机的情况
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
					poker[1].num + 1 == poker[44].num && poker[4].num + 1 == poker[7].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[8].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;

			//十三牌的情况
			case 13:
				//只有一种顺子牌型
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
					// console.log(poker[poker.length-1]);
				}else{
					return false;
				}
			break;

			//十四张牌的情况
			case 14:
				//判断是否为连对
				//33 44 55 66 77 88 99 
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}else{
					return false;
				}
			break;

			//十五张牌的情况
			case 15:
				//判断是否为飞机
				//333 444 555 666 777
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && 
					poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
					poker[12].num == poker[14].num && poker[1].num + 1 == poker[4].num && 
					poker[4].num + 1 == poker[7].num && poker[7].num + 1== poker[10].num &&
					poker[10].num + 1== poker[13].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}else{
					return false;
				}
			break;

			//十六章牌的情况
			case 16:
				//判断是否为连对
				//33 44 55 66 77 88 99 1010
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				//判断是否为飞机
				
				//第一种飞机的情况
				//3 4 5 6 7 7 7 8 8 8  9  9  9  10 10 10
				//4 5 6 7 7 7 8 8 8 9  9  9  10 10 10 11
				//5 6 7 7 7 8 8 8 9 9  9  10 10 10 11 12
				
				//第二种飞机的情况
				//6 7 7 7 8 8 8 9 9 9  10 10 10 11 12 13
				//7 7 7 8 8 8 9 9 9 10 10 10 11 12 13 14

				if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && poker[13].num == poker[15].num &&
					poker[5].num + 1 == poker[8].num && poker[8].num + 1 == poker[11].num && poker[11].num + 1 == poker[14].num ||
					poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && poker[12].num == poker[14].num &&
					poker[4].num + 1 == poker[7].num && poker[7].num + 1 == poker[10].num && poker[10].num + 1 == poker[13].num ||
					poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && poker[11].num == poker[13].num &&
					poker[3].num + 1 == poker[6].num && poker[6].num + 1 == poker[9].num && poker[9].num + 1 == poker[12].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[13].num;		// 设置牌型判断值
					return true;
				}

				if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num &&
					poker[2].num + 1 == poker[5].num && poker[5].num + 1 == poker[8].num && poker[8].num + 1 == poker[11].num ||
					poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num &&
					poker[1].num + 1 == poker[4].num && poker[4].num + 1 == poker[7].num && poker[7].num + 1 == poker[10].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[11].num;		// 设置牌型判断值
					return true;
				}

				return false;

			break;

			//十七张牌的情况
			case 17:
				//牌型只有顺子
				//只有一种顺子牌型
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
					// console.log(poker[poker.length-1]);
				}else{
					return false;
				}
			break;

			//十八张牌的情况
			case 18:
				//判断是否为连对
				//33 44 55 66 77 88 99 1010 1111
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				//判断是否为飞机
				//333 444 555 666 777 888
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
					poker[9].num == poker[11].num && poker[12].num == poker[14].num && poker[15].num == poker[17].num && 
					poker[1].num + 1 == poker[4].num && poker[4].num + 1 == poker[7].num && poker[7].num + 1== poker[10].num && 
					poker[10].num + 1== poker[13].num && poker[13].num + 1== poker[16].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				return false;

			break;

			//十九张牌的情况
			case 19:
				//只有一种顺子牌型
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
					// console.log(poker[poker.length-1]);
				}else{
					return false;
				}

			break;

			//二十张牌的情况
			case 20:
				//判断是否为连对
				//33 44 55 66 77 88 99 1010 1111 1212
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				// 判断是否为飞机
				//第一种飞机的情况
				//3 4 5 6 7 8 8 8 9 9 9     10 10 10 11 11 11 12 12 12
				//4 5 6 7 8 8 8 9 9 9    10 10 10 11 11 11 12 12 12 13
				//5 6 7 8 8 8 9 9 9   10 10 10 11 11 11 12 12 12 13 14
				
				// 第二种飞机的情况
				//6 7 8 8 8 9 9 9   10 10 10 11 11 11 12 12 12 13 14 15
				//7 8 8 8 9 9 9  10 10 10 11 11 11 12 12 12 13 14 15 16
				//8 8 8 9 9 9 10 10 10 11 11 11 12 12 12 13 14 15 16 17
				
				//第一种飞机的情况
				if(poker[5].num == poker[7].num && poker[8].num == poker[10].num && poker[11].num == poker[13].num && 
					poker[14].num == poker[16].num && poker[17].num == poker[19].num &&
					poker[6].num + 1 == poker[9].num && poker[9].num + 1 == poker[12].num && 
					poker[12].num + 1 == poker[15].num && poker[15].num + 1 == poker[18].num ||
					poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && 
					poker[13].num == poker[15].num && poker[16].num == poker[18].num &&
					poker[5].num + 1 == poker[8].num && poker[8].num + 1 == poker[11].num && 
					poker[11].num + 1 == poker[14].num && poker[14].num + 1 == poker[17].num ||
					poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
					poker[12].num == poker[14].num && poker[15].num == poker[17].num &&
					poker[4].num + 1 == poker[7].num && poker[7].num + 1 == poker[10].num && 
					poker[10].num + 1 == poker[13].num && poker[13].num + 1 == poker[16].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[17].num;		// 设置牌型判断值
					return true;
				}

				//第二种飞机的情况
				if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && 
					poker[11].num == poker[13].num && poker[14].num == poker[16].num &&
					poker[3].num + 1 == poker[6].num && poker[6].num + 1 == poker[9].num && 
					poker[9].num + 1 == poker[12].num && poker[12].num + 1 == poker[15].num ||
					poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num && 
					poker[10].num == poker[12].num && poker[13].num == poker[15].num &&
					poker[2].num + 1 == poker[5].num && poker[5].num + 1 == poker[8].num && 
					poker[8].num + 1 == poker[11].num && poker[11].num + 1 == poker[14].num ||
					poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
					poker[9].num == poker[11].num && poker[12].num == poker[14].num &&
					poker[1].num + 1 == poker[4].num && poker[4].num + 1 == poker[7].num && 
					poker[7].num + 1 == poker[10].num && poker[10].num + 1 == poker[13].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[17].num;		// 设置牌型判断值
					return true;
				}

				return false;

			break;

		}

		// 判断牌组是否为顺子的函数
		// poker = player[play].selected.poker
		function checkStraight(poker){
			//判断最大值的那张牌不能是2或者是王
			if(poker[poker.length-1].num == 13 || poker[poker.length-1].num == 14){
				return false;
			}

			// 通过循环来判断牌组数据是否为顺子
			for(let i=0; i<poker.length-1; i++){
				if(poker[i].num + 1 != poker[i+1].num){
					return false;
				}
			}
			return true;
		}
		// 判断牌组是否为连对的函数 
		function checkPair(poker){
			/*
				33 44 55 66
			 */

			// 通过循环来判断牌组数据是否为连对
			for(let i=0; i<poker.length-3; i += 2){
				if(poker[i].num != poker[i+1].num || poker[i].num+1 != poker[i+2].num || poker[i+2].num != poker[i+3].num){
					return false;
				}
			}
			return true;
		}
	}

	// 出牌时比较两个牌组的方法
	function checkVS(play){
		// 判断必然可以胜出的情况
		if(player[play].selected.type == 110 || game_data.desktop.type == 0){
			return true;
		}

		// 判断必然会输的情况
		if(game_data.desktop.type == 110){
			return false;
		}

		// 判断综合情况
		// 情况1，出的是炸弹，旧面的牌不是炸弹
		if(player[play].selected.type == 100 && game_data.desktop.type !=100){
			return true;
		}

		// 特殊情况大小王对比
		if(player[play].selected.poker[0].num == 14 && game_data.desktop.poker[0].num == 14){
			if(player[play].selected.poker[0].color > game_data.desktop.poker[0].color){
				return true;
			}else{
				return false;
			}
		}

		// 正常情况下两组牌对比的方法
		if(player[play].selected.type != game_data.desktop.type){
			return false;
		}else{
			if(player[play].selected.poker.length != game_data.desktop.poker.length ){
				return false;
			}else{
				if(player[play].selected.max > game_data.desktop.max){
					return true;
				}else{
					return false;
				}
			}
		}
	}

	//打牌音效判断
	
	/*
			牌型判断需要通不同牌张数来各自进行判断的
			牌型代码：
			1 			单张
			2 			对子
			3 			三张
			4  			三带一
			5 			三带二
			6 			顺子
			7  			连对
			8 			飞机
			9 			四带二
			100 		炸弹
			110 		王炸

		 */
	function pokerAudio(type,num,color){
		// console.log(num);
		// console.log(type);
		//每次执行一次出牌声效
		// if(game_data.desktop.poker.length > 0 && (type == 4 || type == 5 ||
		//  type == 6 || type == 7 || type == 8 || type == 9)){
		// 	 $('#audio1').attr({'src':'./video/aduio/压死.mp3'})
		// }else{
		// 	$('#audio1').attr({'src':'./video/aduio/play.mp3'})
		// }
		
		//每次执行一次出牌声效
		$('#audio1').attr({'src':'./video/aduio/play.mp3'}) 
		switch(type){
			case 1:
				if(num == 14 && color == 0){
					$('#audio').attr({'src':'./video/aduio/'+num+'.mp3'})
				}else if(num == 14 && color == 1){
					$('#audio').attr({'src':'./video/aduio/'+(num+1)+'.mp3'})
				}else{
					$('#audio').attr({'src':'./video/aduio/'+num+'.mp3'})
				}	
			break;

			case 2:
				$('#audio').attr({'src':'./video/aduio/dobble'+num+'.mp3'})	
			break;

			case 3:
				$('#audio').attr({'src':'./video/aduio/3for'+num+'.mp3'})	
			break;

			case 4:
				$('#audio').attr({'src':'./video/aduio/3带1.mp3'})	
			break;

			case 5:
				$('#audio').attr({'src':'./video/aduio/3带一对.mp3'})	
			break;

			case 6:
				$('#audio').attr({'src':'./video/aduio/顺子.mp3'})	
			break;

			case 7:
				$('#audio').attr({'src':'./video/aduio/连对.mp3'})	
				$('#audio1').attr({'src':'./video/aduio/连对声.mp3'})
				boom(7);
			break;

			case 8:
				$('#audio').attr({'src':'./video/aduio/飞机.mp3'})	
				$('#audio1').attr({'src':'./video/aduio/飞机声.mp3'})
				boom(8);
			break;

			case 9:
				$('#audio').attr({'src':'./video/aduio/4带2.mp3'})	
			break;

			case 100:
				$('#audio').attr({'src':'./video/aduio/炸弹.mp3'})
				boom(100);
			break;

			case 110:
				$('#audio').attr({'src':'./video/aduio/王炸.mp3'})
				boom(110);
			break;
		}
	}

	//炸弹动画函数
	function boom(type){
		//添加王炸人物的出场图片在执行动画
		$('.boom-role img').attr({'src':'./images/roleimg/'+type+'.png'}).css({'z-index':'9999'}).animate({'right':'0px','opacity':'1'},500,function(){
			$('.boom-role img').animate({'right':'80px'},1500,function(){
				$('.boom-role img').animate({'right':'800px','opacity': '0'},500,function(){
					//等视频播放完后执行
					$('.boom-role img').css({'z-index':'0','right':'-300px'})
				})
			})
		})
		//添加王炸视频在执行动画
		$('.video').attr({'src':'./video/'+type+'.mp4'});
		$('.boom').css({'z-index':'9999'}).animate({'height':'500px','margin-top':'-250px','opacity':'1'},500,function(){
			setTimeout(function(){
				$('.boom').animate({'height':'0px','margin-top':'0px','opacity':'0'},500,function(){
					$('.boom').css({'z-index':'0'});
				})
			},5300)
		})
		//添加logo视频在执行动画
		$('.logo').css({'z-index':'9999'}).animate({'left':'50px','opacity':'1'},500,function(){
			$('.logo').animate({'left':'80px'},1500,function(){
				$('.logo').animate({'left':'800px','opacity': '0'},500,function(){
					//等视频播放完后执行
					$('.logo').css({'z-index':'0','left':'-100px'})
				})
			})
		})
	}

	//出牌判断和地主先出牌和胜负判断
	function disCover(play,rule,num){
		//再次点击的时候后移除第一张图片
		$('.trip').find('img').eq(0).remove();
		$('.trip').css({'z-index':'9999'});
		// 根据判断条件选择弹出什么提示图片
		if(game_data.desktop.poker == '' && player[num].selected.poker.length == 0){
			$('.trip').append('<img src="./images/youfirst.png">')	
		}else if(rule == true){
			$('.trip').append('<img src="./images/mistake.png">')
		}else if(play == true){
			$('.trip').append('<img src="./images/rule.png">')
		}
		$('.trip img').eq(0).animate({'top':'0px','opacity':'1'},500).animate({'opacity':'1'},3000,function(){
			$('.trip img').eq(0).animate({'top':'50px','opacity':'0'},500,function(){
				$('.trip').css({'z-index':'0'});
			})
		})
	}	

	
});