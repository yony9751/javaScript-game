var 이미지좌표 = 0;
// 0은 가위 -131은 바위, 이런식으로 1:1 매칭을 할 때 딕셔너리 자료구조 역할을 해줄 수 있다.
var 가위바위보 = { 
	바위 : '0',
	가위 : '-131px',
	보 : '-282px'
}
// var 가위바위보2 = { 
// 	'0' : '바위',
// 	'-131px' : '가위',
// 	'-282px' : '보'
// } 이렇게 1:1 바꿔주는 짓을 할 순 없으니

//Object.entries(가위바위보); 딕셔너리 자료구조를 이중 배열로 바꿔줌
//배열.find(function(){}) 은 반복문이지만 원하는 것을 찾으면(return 이 true) 멈춘다.
// find , forEach 는 모두 반복문, 최대한 줄이는게 좋음

function 컴퓨터의선택(이미지좌표){
	return Object.entries(가위바위보).find(function(v){ //??왜 return 들어가지?
			console.log(v);
	return v[1] === 이미지좌표; // 0, -131px, -282px 에서 맞는걸 찾아 거기서 스톱!
})[0]; // 바위 가위 보 도출
}

var 인터벌;
인터벌메이커();

function 인터벌메이커(){
	인터벌 = setInterval(()=>{ //setInterval(function(){})
	if(이미지좌표 === 가위바위보.바위){
		이미지좌표 = 가위바위보.가위;
	}else if(이미지좌표 === 가위바위보.가위){
		이미지좌표 = 가위바위보.보;
	}else{
		이미지좌표 = 가위바위보.바위;
	}
	document.querySelector('#computer').style.backgroundPosition = 이미지좌표 + ' 0'
	}, 150);
};
// for(var i = 0; i < document.querySelectorAll('.btn').length; i++){
// 	document.querySelectorAll('.btn')[i].addEventListener('click', function(){
// 		console.log(this.textContent);
// 	})
// }

// querySelectorAll() 은 for 구문 돌릴 필요 없고 forEach() 씀!!

// !가위바위보의 규칙찾기!! 가위 -1 바위 0 보 1
var 점수표 = {
	가위 : -1,
	바위 : 0,
	보 : 1
}
document.querySelectorAll('.btn').forEach(function(btn){
		btn.addEventListener('click', function(e){
			e.preventDefault();
			clearInterval(인터벌); // 인터벌을 변수에 담아서 이 변수를 멈추는 효과
			setTimeout(function(){
				인터벌메이커();
			}, 1000);
		var 나의선택 = this.textContent;
		//★번외! 객체 불러올때 점수표[나의선택], 점수표.나의선택 할순있지만 다른 변수를 가진 애를 부를 순 없음.. []에만 담을수있다!!!

		// 1. 리팩토링 전 소스
		// if (점수표[나의선택] - 점수표[컴퓨터의선택(이미지좌표)] === 0){
		// 	console.log("비겼습니다")
		// }else if(점수표[나의선택] - 점수표[컴퓨터의선택(이미지좌표)] === -2 || 점수표[나의선택] - 점수표[컴퓨터의선택(이미지좌표)]  === 1){
		// 	console.log("이겼습니다!")
		// }else{
		// 	console.log("졌습니다ㅠㅠ")
		// }

		// 2. 리팩토링 후 소스
		var 나의점수 = 점수표[나의선택];
		var 컴퓨터의점수 = 점수표[컴퓨터의선택(이미지좌표)]
		if (나의점수 - 컴퓨터의점수 === 0){
			console.log("비겼습니다")
		}else if([-2,1].includes(나의점수 - 컴퓨터의점수)){ //배열.includes() 로 || 관계를 줄일 수 있다. 그 값이 있는지 없는지
			console.log("이겼습니다!")
		}else{
			console.log("졌습니다ㅠㅠ")
		}
	})
})