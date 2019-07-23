// call by value(O), call by reference(X), call by sharing  공부

// 콜바이밸류 - 원시값일떈 복사가 된다.

function 함수(매개변수){
	console.log(매개변수);
}
함수(5) // 5

function 함수(매개변수){
	매개변수 = 10;
	console.log(매개변수);
}

var 인자 = 5;
함수(인자); // 10 // 인자값이 매개변수가 복사가 되어 들어감(원시값), 인자에는 영향 주지 않고 복사(**렉시컬 스코프)
console.log(인자); // 5

// * 객체를 매개변수로 넣으면 참조관계가 되어 같이 바뀜!

function 함수(매개변수){
	매개변수.a = 10;
	console.log(매개변수)
}

var 인자 = {a:5}; //객체!!!! >> 렉시컬 스코프 상관없음!! 복사 아닌 참조가 되어 값이 바뀐다.
함수(인자); //{a:10}
console.log(인자); // {a:10}


// ** 콜바이 레퍼런스가 아닌 이유!
function 함수(매개변수){
	매개변수 = 8;
	console.log(매개변수);
}
var 인자 = {a:5};
함수(인자); // 8  //매개변수.a = 5로 하지 않고 객체 자체를 수정하면 관계가 깨짐.
console.log(인자); // {a:5}

// ** 카드만들기 방법 ! 팩토리 패턴 vs 생성자 패턴(new)

// 1. 팩토리 패턴 (var 변수 = Object.create(반복객체) + return 변수)
var 프로토타입 = {
	type : "카드"
}
function 카드공장(name, att, hp){
	var 카드 = Object.create(프로토타입);
	카드.name = name;
	카드.att = att;
	카드.hp = hp;
	return 카드;
}

var 카드1 = 카드공장("이름", 3, 2);

// 2.생성자 패턴 사용하여 만들기 > new 를 사용함, 이름은 첫글자 대문자로! (객체지향 프로그램 쓸 때 자주 쓰임, 생성자를 쓸 때)
function Card(name, att, hp){
	"use strict" //엄격모드! this가 window 를 가르키지 않고 에러가 남, 경고남
	this.name = name;
	this.att = att;
	this.hp = hp;	
}
Card.prototype = 프로토타입;

var 제로초 = new Card('제로초', 5, 10);


//★만약! 생성자를 쓸 때 절때 new 를 사용하지 않으면?? 안됨,, 꼭 써야함.. 

// var 제로초 = Card('제로초', 5, 10); 이렇게 쓰면?
// 
// this. 가 window. 로 받아지기 때문에 
// window.name = "제로초" 가 되는 불상사가 일어남....
