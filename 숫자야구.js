
		var 바디 = document.body;
		var 숫자후보;
		var 숫자배열;
		function 숫자뽑기(){
			숫자후보 = [1,2,3,4,5,6,7,8,9];
			숫자배열 = [];
			for(i=0; i <4; i++){	
				//var 뽑은것  = 숫자후보.splice(0,2); 
				//숫자배열.push(뽑은것);
				// pop() 뒤에서부터 추출 9876, shift() 앞에서부터 추출 1234
				// push() 뒤에 추가, unshift() 앞에 추가 -> 후보에서 숫자가 빠짐
				//splice(위치, 개수)
				//위치로부터 개수만큼 배열에서 뽑음 > 배열로 뽑힘
				var 뽑은것 = 숫자후보.splice(Math.floor(Math.random()*(9-i)), 1)[0]; // 배열로 뽑히기 때문에 첫번째껏만 [0]으로
				//자리수를 찾아야해서 0~9를 원함(flooor를 써야함)
				//1개 뽑힐때마다 후보에서 하나씩 빠지므로 9에서 i를 빼줌
				숫자배열.push(뽑은것);
				//하나씩 배열로 4 번
			}
		}
		숫자뽑기();
		console.log(숫자후보);
		console.log(숫자배열);
		var 결과 = document.createElement('h1');
		바디.append(결과);
		var 폼 = document.createElement('form');
		document.body.append(폼);
		var 입력창 = document.createElement('input');
		입력창.type = 'number';
		폼.append(입력창);
		var 버튼 = document.createElement('button');
		버튼.textContent = '입력';
		폼.append(버튼);
		var 기회 = document.createElement('div');
		바디.append(기회);
	   var 틀린횟수 = 0;
		//비동기(언제 실행될지 모르는 함수)
		//이벤트 리스너를 이용했기 때문에, 반복문을 대체함

		폼.addEventListener('submit', function(e){ //콜백함수 폼에 엔터를 쳤을때
			e.preventDefault();
			var 답 = 입력창.value;
			console.log(답 === 숫자배열.join(''));
			//console.log(답, 숫자배열, 답 === 숫자배열.join('')) // 2345, [2,3,4,5] , true
			if(답 === 숫자배열.join('')){
				결과.textContent = '홈런';
				입력창.value = '';
				입력창.focus();
				숫자뽑기();
				틀린횟수 = 0;
				기회.textContent = '';
				console.log(숫자배열.join(''));
			}else{ //답이 틀리면
				var 답배열 = 답.split('');
				var 스트라이크 = 0;
				var 볼 = 0;
				틀린횟수 ++;
				기회.textContent = '기회가'+ (10 - 틀린횟수)+'번 남았습니다';
				console.log(틀린횟수);
				if(틀린횟수 > 9){
					결과.textContent = '10회 틀려서 실패! 답은' +숫자배열.join(',')+'였습니다!';
					입력창.value = '';
					입력창.focus();
					숫자뽑기();
					틀린횟수 = 0;
					기회.textContent = '';
				}else{
					for(var i = 0; i < 4; i++){
						if(Number(답배열[i])=== 숫자배열[i]){
							스트라이크 += 1;
						}else if(숫자배열.indexOf(Number(답배열[i])) > -1){
							볼 +=1;
						}
					}
					결과.textContent= 스트라이크 + '스트라이크' + 볼 + '볼입니다.';
				}
			}
		})
