var 가로 = 4;
var 세로 = 3;
var 색깔들 = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var 색깔후보 = 색깔들.slice(); // 배열의 참조관계 때문에 아래서 splice 할때 색깔들에서도 똑같이 빠짐 > 참조관계 끊으려면 slice(); 사용하면됨
var 색깔 = [];
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간;
var 클릭플래그 = false;

function 셔플(){
	for(var i = 0; 색깔후보.length > 0; i++){
		색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random()* 색깔후보.length),1));
	}
}
function 카드세팅(가로, 세로){
	셔플();
	for(var i = 0; i < 가로 * 세로; i++){
		var card = document.createElement('div');
		card.className = 'card';  //클래스명 하나만 추가할때 .className = '클래스명'
		var cardInner = document.createElement('div');
		cardInner.className = 'card-inner';
		var cardFront = document.createElement('div');
		cardFront.className = 'card-front';
		var cardBack = document.createElement('div');
		cardBack.className = 'card-back';
		cardBack.style.backgroundColor = 색깔[i];
		cardInner.appendChild(cardFront);
		cardInner.appendChild(cardBack);
		card.appendChild(cardInner);
		(function(c){ // 클로저 문제 해결
				card.addEventListener('click',function(){
				if(클릭플래그 && !완성카드.includes(c) && !클릭카드.includes(c)){
					c.classList.toggle('flipped');
					클릭카드.push(c);
					if(클릭카드.length === 2){	
						클릭플래그 = false;
						console.log(클릭카드, 클릭플래그);
						//맞았을 때
						 if(클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor){		
						 	console.log("맞아요!", 클릭플래그);
						 	완성카드.push(클릭카드[0]);
						 	완성카드.push(클릭카드[1]);
						 	클릭카드 = [];	
						 	클릭플래그 = true;	
						 	if(완성카드.length === 가로 * 세로){
						 		//성공시 초기화 코드
						 		var 끝시간 = new Date;
						 		alert("성공!"+ (끝시간 - 시작시간)/1000 + "초 걸렸습니다");
						 		document.querySelector('#wrapper').innerHTML = '';			
						 		색깔후보 = 색깔들.slice();		 
						 		색깔 = [];	
						 		클릭플래그 = true;
								완성카드 = [];
								시작시간 = null;
								셔플();
						 		카드세팅(가로, 세로);						 		
						 	}
						 }else{
						 	//틀렸을 때
						 	// * settimeOut 할때 항상 성격급한사람들 생각하기 ㅋㅋㅋㅋ 
						 	setTimeout(function(){
							 	클릭카드[0].classList.remove('flipped');
							 	클릭카드[1].classList.remove('flipped');
							 	클릭플래그 = true;	
							 	클릭카드 = [];
						 	}, 1000);
						};		
					}
				}
			});
		})(card);
		document.querySelector('#wrapper').appendChild(card);
	}
	//초반 카드 공개
	document.querySelectorAll('.card').forEach(function(card, index){
		setTimeout(function(){
			card.classList.add('flipped');
		},1000+100*index);
	});
	setTimeout(function(){
		document.querySelectorAll('.card').forEach(function(card, index){
			card.classList.remove('flipped');
		});
		클릭플래그 = true;
		시작시간 = new Date;
	},3000);
}

카드세팅(가로, 세로);


//**참조와 복사 (얕은복사 / 깊은복사)

// 원시값(문자, 숫자, 불린)은 대입으로 복사할 수 있다.
// 객체(함수, 배열 )들은 대입하면 복사가 안되고 참조가 된다.
// 객체를 복사하고 싶다면???

var 값 = '제로초';
var 복사 = 값; //제로초
복사 = '무지';

// 복사는 무지로 들어가고 값 = '제로초'그대로 유지;

var 사람 = {
	이름 : '제로초'
}
var 복제인간 = 사람;
복제인간.이름 = '무지';

// 사람 = {
// 	이름 : "무지"
// }

// * 객체일때, 값이 복사가 안되고 참조가 된다.  복제인간을 바꿨는데 사람도 바뀜.

// 객체 복사하는 법. 여러가지가 있음 > obj1 을 복사해서 객체를 따로따로 변경 줄 수 있도록!

// 1. 복사할 객체는 빈 객체로 선언

var obj = {a:1, b:2, c:3};
var obj2 = {};
Object.keys(obj).forEach(function(key){
	obj2[key] = obj[key];
});

// ***** 참고!
// 위 소스는 Object.assign(obj2, obj);
// 로 짧게 쓸 수 있다!!!!

// Object.keys(객체); // ["a", "b", "c"] 개체의 속성(키값)들만 배열로 가져옴

// >> Object.keys 한계점!!! 1단계만 복사, 2단계 이상은 참조

var abc = {a:1, b:{c:1}};
var abc2 = {};
Object.keys(abc).forEach(function(key){
	abc[key] = abc2[key];
})

// abc2.b.c = 3;
// abc.b.c = 3; !!!! 객체 안의 객체는 복사가 안되고 참조가 되어 바뀌어버림. 첫번째 계층의 key만 복사되는 한계,,!

// 2. slice() 1단계만 복사할 때 사용
var arr1 = [1,2,3];
var arr2 = arr1.slice();

// 위에 오브젝트와 비슷하게 1단계만 복사, 나머지는 참조

// 깊은 복사 ! but 얘도 불완전... 예외경우가 있음(소스 복잡... 이해안됨..)
function copyObj(obj){
	var copy = {};
	if(typeof obj === 'object' && obj !== null){
		for (var attr in obj){
			if(obj.hasOwnProperty(attr)){
				copy[attr] = copyObj(obj[attr]);				
			}
		}
	} else{
		copy = obj;
	}
	return copy;
}

// 깊은 복사 :2단계 이상 일때 쓰면 좋음 / 훨씬 간단!! but.... 성능 최악!!! 왠만하면 안쓰는게 좋음ㅋ
obj2 = JSON.parse(JSON.stringify(obj));

//프로토타입, 팩토리 패턴
var card = {
	name: '제로초',
	att : 5,
	hp: 10,
	type : '카드',
	attack:function(){},
	defend : function(){},
}
var card2 = {
	name: '무지',
	att : 3,
	hp: 1,
	type : '카드',
	attack:function(){},
	defend : function(){},
}
var card3 = {
	name: '토끼',
	att : 8,
	hp: 9,
	type : '카드',
	attack:function(){},
	defend : function(){},
}

// 공통되는 부분들, type, attack, defend 가 반복되고 있다 > 수정해야함!
 // 이때 사용되는 것 프로토타입 or 팩토리 패턴

// 객체끼리 공유하는 것 = 프로토타입 !(중복 제거, 한방에 수정 가능)

// *1. 팩토리 패턴!! 중복 제거!
function 카드공장(name, att, hp){
	return {
		name : name,
		htt : att,
		hp : hp,
		type : '카드',
		attack : function(){},
		defend : function(){}
	}
}

//var 카드 = 카드공장("제로초", 10, 5)
//
// {
// 	name: "제로초",
// 	htt: 10,
// 	hp: 5,
// 	type : '카드',
// 		attack : function(){},
// 		defend : function(){}
// 	}
// }

// 2. 프로토타입으로 중복 제거하는 법 
//공통부분 객체 빼기
var 프로토타입 = {
	type : '카드',
	attack : function(){},
	defend : function(){}
}
//달라지는 부분
var card = {
	name : '제로초',
	att: 10,
	hp: 10,
}
card.__proto__ = 프로토타입; // 카드 객체 안에 원래 내장되어있는 __proto__ 에 객체를 넣어주는 효과!!

card.__proto__.type  // "카드"
card.type // "카드"

// __proto__는 생략 가능하고 바로 부를 수 있다.

//팩토리 패턴 + 프로토타입 정리!

// var 프로토타입 = {
// 	type : '카드',
// 	attack : function(){},
// 	defend : function(){}
// };
// function 카드공장(name, att, hp){
// 	var 카드 = {
// 		name: name,
// 		att : att,
// 		hp : hp,
// 	}
// 	카드.__proto__ = 프로토타입 ; // 프로토타입과 참조 관계 만들어서!
// 	return 카드;
// }
// but! 비표준이라서, __proto__ 는 사용안하는 걸 권장 !
// 나중에 프로토타입.width = 100; 이런식으로 프로토타입에 속성 추가 가능

var 프로토타입 = {
	type : '카드',
	attack : function(){},
	defend : function(){}
};

function 카드공장(name, att, hp){
	var 카드 = Object.create(프로토타입);
	카드.name = name;
	카드.att = att;
	카드.hp = hp;
	return 카드;
}

// * 둘은 같음 1은 ㄴㄴ 2 실무에서 사용
// var 카드 = {};
// 카드.__proto__ = 프로토타입;

// 과

// var 카드 = Object.create(프로토타입);