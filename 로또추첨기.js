// var 후보군 = Array(45); //45개의 요소가 들어있는 배열
// var 필 = 후보군.fill(); // undefined 45개가 채워짐 [undefined, undefined ... ]

// var 맵 = 필.map(function(){
// 	return 1;
// });
// console.log(맵); [1,1,1,1, ...]

// map(function(){}) 1:1로 매칭해서 return 

var 후보군 = Array(45)
	.fill()
	.map(function(요소, 인덱스){
		return 인덱스 + 1;
	});
console.log(후보군);

var 셔플 = [];
while(후보군.length > 0){
	var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0];
	셔플.push(이동값);
}
console.log(셔플);
var 보너스숫자 = 셔플[셔플.length-1];
var 당첨숫자들 = 셔플
	.slice(0,6)
	.sort(function(p,c){ // slice(시작번쨰, 끝 번째 미만 *끝자리 포함안됨)
	return p-c; //오름차순일때 // c-p 내림차순
});
console.log(당첨숫자들, 보너스숫자);

// 쿼리셀렉터!!! querySelector();

//var 결과창 = document.getElementById('결과창'); 
 var 결과창 = document.querySelector('#결과창'); //. 클래스네임, # 아이디네임 
 //querySelectorAll() 여러태그 동시 선택

// for(var i=0; i<당첨숫자들.length;i++){
// 	setTimeout(function 비동기콜백함수(){
// 		var 공 = document.createElement('div');
// 		공.textContent = 당첨숫자들[i];
// 		결과창.appendChild(공);
// 	}, 1000); //밀리초
// }
// setTimeout 클로저 문제 (반복문 안에 비동기 사용시) > 자바스크립트 중급시간!
// 지저분하지만 아래처럼,,

function 공색칠하기(숫자, 결과창){
	var 공 = document.createElement('div');
	공.textContent = 숫자;
	공.style.display = 'inline-block';
	공.style.border = '1px solid black';
	공.style.borderRadius = '20px';
	공.style.width = '40px';
	공.style.height = '40px';
	공.style.textAlign = 'center';
	공.style.marginRight = '10px'; //자바스크립트 스타일에 - 들어가는 경우 첫글자를 대문자로 바꿔줌
	공.style.fontSize = '15px';
	공.className = '공클래스' + 숫자; // 클래스 네임 지정할때 id 와 달리 className 이라고 적어줘야함!
	var 배경색;
	if(숫자 <= 10){
		배경색 = 'red';
	}else if(숫자 <= 20){
		배경색 = 'orange';	
	}else if(숫자 <= 30){
		배경색 = 'yellow';
	}else if(숫자 <= 40){
		배경색 = 'blue';
	}else{
		배경색 = 'green';
	}
	공.style.background = 배경색;
	결과창.appendChild(공);
}
// (클로저 배우기 전)
// setTimeout(function 비동기콜백함수(){
// 		공색칠하기(당첨숫자들[0],결과창);
// 	}, 1000);
// setTimeout(function 비동기콜백함수(){
// 		공색칠하기(당첨숫자들[1],결과창);
// 	}, 2000);
// setTimeout(function 비동기콜백함수(){
// 		공색칠하기(당첨숫자들[2],결과창);
// 	}, 3000);
// setTimeout(function 비동기콜백함수(){
// 		공색칠하기(당첨숫자들[3],결과창);
// 	}, 4000);
// setTimeout(function 비동기콜백함수(){
// 		공색칠하기(당첨숫자들[4],결과창);
// 	}, 5000);
// setTimeout(function 비동기콜백함수(){
// 		공색칠하기(당첨숫자들[5],결과창);
// 	}, 6000);

// * 클로저 문제 해결 후!! 코드!!! 
for(i = 0; i <6; i++){
	(function 클로저(j){ // 매개변수 j 는 var 을 선언한거나 다름없음
		setTimeout(function(){
			공색칠하기(당첨숫자들[j],결과창);
		},j* 1000);
	})(i);  // 즉시실행 함수, 선언하자마자 바로 실행
	//클로저(i); >> 위 function을 소괄호로 싸서 바로 실행함. 두줄로 쓰지 않고! 오호,,
}

setTimeout(function 비동기콜백함수(){
var 칸 = document.getElementsByClassName('보너스')[0];
 // getElementsByClassName 배열로 class는 여러가지가 나올수 잇기 때문에 배열로 가져옴 [0]를 표시해줘야함.
공색칠하기(보너스숫자,칸);
},7000);


