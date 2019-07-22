var 스크린 = document.querySelector('#screen');
// performance.now(); 밀리초 이하 엄청 정밀한거 측정할때 씀

var 시작시간;
var 끝시간;
// 다른방법
//console.time('시간'); // 버그 체크할때나, 오래걸릴때 쓰는것

var 기록 = [];
var 횟수 = 0;
var 타임아웃;

// 비동기함수 클릭시, 실행이 끝나면 호출스택에서 튀어 나가서 변수가 사라짐! 밖에 변수를 둬야함

스크린.addEventListener('click',function(){
	// 다른방법
	//console.timeEnd('시간');
	if(스크린.classList.contains('waiting')){
		시작시간 = null;
		끝시간 = null;
		스크린.classList.remove('waiting');
		스크린.classList.add('ready');
		스크린.textContent = '초록 색이 되면 클릭하세요';
		타임아웃 = setTimeout(function(){
			시작시간 = new Date;
			스크린.click();
		}, Math.floor(Math.random() * 1000 + 2000)); //2000~3000 사이의 수
	}else if (스크린.classList.contains('ready')){
		console.log(시작시간);
		if(!시작시간){ //총을 쏘기 전에 누르면, 시작시간이 없으면 부정클릭!
			// * ! 의 역할 : true 를 false 로, false를 true로
			//반칙
			console.log("반칙!");
			clearTimeout(타임아웃);
			스크린.classList.remove('ready');
			스크린.classList.add('waiting');
			스크린.textContent = '너무 성급하시군요!';
		}else{
		스크린.classList.remove('ready');
		스크린.classList.add('now');
		스크린.textContent = '클릭!';
		}
	}else if (스크린.classList.contains('now')){
		횟수 ++;	
		끝시간 = new Date();
		//console.log('반응속도', 끝시간 - 시작시간);
		기록.push(끝시간-시작시간);
		console.log(기록);
		스크린.classList.remove('now');
		스크린.classList.add('waiting');
		스크린.textContent = '클릭해서 시작하세요';
		if(횟수 > 4){
			var 합 = 0;
			for(i = 0; i<5; i++){
				합 = 합 + 기록[i];
			}
			var 평균값 = 합 / 기록.length;
			document.querySelector('.result').textContent = '게임 평균은?' + 평균값/1000;
			횟수 = 0;
			기록 = [];						
		}
	}
})

//자바스크립트 예약어, if else new var 이런거는 변수명으로 쓸 수 없다.

// var 변수 = setTimeout(function () {
// }, 1000);
// clearTimeout(변수);

// *호출스택! 함수가 실행되기 전에 쌓이는 순서 공간
// Last In First Out(후입선출 구조) LIFO / FILO
// 먼저 들어간 게 제일 나중에 나옴, 제일 나중에 들어간게 제일 먼저 나옴
// 자바스크립트에서 재귀함수를 쓰면 호출스택이 터질수있음(브라우저별로 1000개 10000개 ..)

// 1. 재귀함수 > 호출스택 터짐
function a(){
	a();
}
a();

// 2. 재귀를 비동기 활용! 
// * 비웠다가 찼다가 이런식으로 꼼수?를 쓸수는 있음. 백그라운드와 이벤트루프를 알아야합니다.
function a(){
	setTImeout(function(){
		a();
	}, 0);
}
a();

