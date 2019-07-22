var tbody = document.querySelector('#table tbody');
var dataset = [];
//스코프 문제로 위로 올림!
var 중단플래그 = false; // 플래그 변수
var 열은칸 = 0;
// 데이터와 화면을 일치시키기 위해 리액트, 앵귤러, 뷰를 배운다. 제이쿼리로는 한계가 있음!!!!

document.querySelector('#exec').addEventListener('click',function(){

	중단플래그 = false;
	tbody.innerHTML = '';
	dataset = [];
	열은칸 = 0;

	var hor = parseInt(document.querySelector('#hor').value); // parseInt() 문자열을 숫자로
	var ver = parseInt(document.querySelector('#ver').value);
	var mine =parseInt(document.querySelector('#mine').value);
	console.log(hor, ver, mine);

	// 10~100까지 만들때, 1~100 까지 만들때, 자주 쓰임
	var 후보군 = Array(hor * ver)
		.fill()
		.map(function(요소, 인덱스){
			return 인덱스;
		});
	//console.log(후보군); [0, 1, 2 ... , 99]

	//* 피셔예이츠 셔플!
	var 셔플 = [];
	while(후보군.length >hor*ver - 20){ // 20개만 뽑기
		var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0];
		셔플.push(이동값);
	}
	console.log(셔플);

	for(var i = 0; i<ver; i ++){
		var arr = [];
		var tr = document.createElement('tr');
		dataset.push(arr);
		for(var j = 0; j<hor; j ++){
			arr.push(0);
			var td = document.createElement('td');
			td.addEventListener('contextmenu', function(e){ //오른쪽 클릭 이벤트 contextmenu
				if(중단플래그){  //게임 끝!
					return;
				}
				e.preventDefault();
		      var 부모tr = e.currentTarget.parentNode;
		      var 부모tbody = e.currentTarget.parentNode.parentNode;
		      //var 칸 = 부모tr.children.indexOf(td); // children이 배열이 아니라서 indexOf 를 쓸수없음 
		      var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
		      var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
		      // * 클로저!!!!!

		      // 물음표, 지뢰깃발 추가
		      if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
		      	e.currentTarget.textContent = '!';
		      } else if (e.currentTarget.textContent === '!'){
		      	e.currentTarget.textContent = '?';
		      } else if (e.currentTarget.textContent === '?'){
		      	if(dataset[줄][칸] === 1){
		      		e.currentTarget.textContent = ''
		      	}else if(dataset[줄][칸] === 'X'){
		      		e.currentTarget.textContent = 'X'
		      	}
		      }
			})
			td.addEventListener('click', function(e){
				if(중단플래그){  //게임 끝!
					return;
				}

				//클릭했을 때 주변 지뢰 갯수
				var 부모tr = e.currentTarget.parentNode;
		      var 부모tbody = e.currentTarget.parentNode.parentNode;
		      //var 칸 = 부모tr.children.indexOf(td); // children이 배열이 아니라서 indexOf 를 쓸수없음 
		      var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
		      var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
				
				//이미 열린 칸이면 다시 열필요 없으니 return;
				if(dataset[줄][칸] === 1){
					return;
				}				

		      //클릭하면 열은칸 증가(승리 카운트)
  		      e.currentTarget.classList.add('opened');
		      열은칸 += 1;

		      if(dataset[줄][칸] === 'X'){
		      	e.currentTarget.textContent = '펑!';
		      	e.currentTarget.classList.add('mine');
		      	document.querySelector('.result').textContent = '실패ㅠㅠㅠ';
		      	중단플래그 = true;
		      } else{
		      	//지뢰가 아니면 오픈하면서 데이터셋을 1로 변경.
		      	dataset[줄][칸] = 1;
		      	var 주변 = [
		      		dataset[줄][칸-1], dataset[줄][칸+1]
		      	];
		      	if(dataset[줄-1]){
		      		주변 = 주변.concat([
		      			dataset[줄-1][칸-1],  
		      			dataset[줄-1][칸], 
		      			dataset[줄-1][칸+1]
		      			]); 
		      		// 배열a = 배열a.concat(배열b): 주변이라는 배열에 뒤 배열을 합치는것! 기존 배열에 담겨야함
		      		// push 로 하려면
		      		// 주변.push(dataset[줄-1][칸-1]);
		      		// 주변.push(dataset[줄-1][칸]);
		      		// 주변.push(dataset[줄-1][칸+1]); 이렇게 해줘도 됨
		      	}
		      	if(dataset[줄+1]){
		      		주변 = 주변.concat([
		      			dataset[줄+1][칸-1], 
		      			dataset[줄+1][칸], 
		      			dataset[줄+1][칸+1]
		      			]);
		      	}
		      	//주변지뢰개수 찾기
		      	var 주변지뢰개수 = 주변.filter(function(v){
		      		return v === 'X';
		      	}).length;
		      	e.currentTarget.textContent = 주변지뢰개수 || '';
		      	// * 주변지뢰개수 || '' >> 앞에 값이 거짓인 값이면 뒤에껄 써라!  거짓인 값 : false, '', 0, null, undefined, NaN
		      	if(주변지뢰개수 === 0){
		      		//주변 8칸 모두 오픈
		      		var 주변칸 = [];
			      	if(tbody.children[줄 - 1]){
			      		주변칸 = 주변칸.concat([
			      			tbody.children[줄 - 1].children[칸 -1],  
			      			tbody.children[줄-1].children[칸], 
			      			tbody.children[줄-1].children[칸+1]
			      			]); 
			      	}
			      	주변칸 = 주변칸.concat([
			      		tbody.children[줄].children[칸-1], tbody.children[줄].children[칸+1]
			      		]);
			      	if(tbody.children[줄+1]){
			      		주변칸 = 주변칸.concat([
			      			tbody.children[줄+1].children[칸-1], 
			      			tbody.children[줄+1].children[칸], 
			      			tbody.children[줄+1].children[칸+1]
			      			]);
			      	}
			      	주변칸.filter(function(v){
			      		return !!v}).forEach(function(옆칸){ // 주변칸.filter((v) => !!v)  undefined 를 배열에서 제거하는 코드! 
							var 부모tr = 옆칸.parentNode;
		 				   var 부모tbody = 옆칸.parentNode.parentNode;
					      var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
					      var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
					      if(dataset[옆칸줄][옆칸칸] !== 1){
					      	옆칸.click(); // 클릭이 클릭 이벤트를 또 실행 > 재귀함수의 일환!(속도, 효율성을 체크해야함)
					      }			      		
			      	});
		      	}
		      }
		      if(열은칸 === hor * ver - mine){
		      	중단플래그 = true;
		      	document.querySelector('.result').textContent = '승리!!'
		      }
			})
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	console.log(dataset);

	//지뢰심기
	for(var k=0; k<셔플.length; k++){ // 예시 59 
		var 세로 = Math.floor(셔플[k] / ver);  // 5 (6번째 줄)
		var 가로 = 셔플[k] % ver; //나머지 계산할 때 % // 9(10번쨰 칸)
		tbody.children[세로].children[가로].textContent ='X';
		dataset[세로][가로] = 'X'; //데이터셋과 형태를 일치시켜야함 
	}

});


// e.currentTarget, e.target 의 차이 
// tbody.addEventListener('contextmenu',function(e){
// 	console.log('커런트타겟',e.currentTarget); //tbody, 이벤트를 단 대상 
// 	console.log('타겟',e.target); // td, 이벤트가 실제로 발생하는 대상
// })

// * 스코프 공부
//console.log(후보군, 셔플);
// 1. 함수 내에서 var 이라고 선언한 변수는 function 밖으론 빠져 나갈 수 없다. 밖으로 접근 불가!
var x = 'global';

function ex(){
	var x = 'local';
	x = 'change';
}

//var x 로 함수 내와 밖의 변수가 같아도 충돌이 나지 않음! 

ex(); // global

// 문제1. window.alert(x); // global 이 뜸!!!! 왜쥬? function 안에서 나온 변수들은 절대 빠져나갈수없음... 밖에서 선언해도 없는거나 마찬가지!

//문제2. 아래의 경우는?
function ex(){
	x = 'local'; // 선언이 없으니 x가 언제 선언되었는지 찾으러 함수 밖으로 나감.
	x = 'change';
}
//window.alert(x); 
// change 가 뜸! x를 대체하는게 됨. 새로운 변수면 var 선언이 중요!!!

//var 은 선언한 함수 내부에서만 유효함. 펑션 스코프라고 부름!

// * 스코프 체인 
// var name = 'zero';
// function outer(){
// 	console.log('외부', name); // 외부 zero
// 	function inner(){
// 		var enemy = 'nero';
// 		console.log('내부', name); // 내부 zero (해당 function 에서 못찾으면 윗단계로 올라감, 스코프 체인을 타고 올라가 변수를 찾는 과정, 전역 범위에서 변수를 못찾으면 에러남 >> 스코프 체인 )
// 	}
// 	inner();
// }

// outer();
// console.log(enemy); // 모름

// * 정적 스코핑 / 렉시컬 스코프 : 자바스크립트가 다이나믹하단 소리를 듣지만, 스코프는 정적임
// 이런 특성을 잘 사용하면 비밀번호나 이런걸 숨길수잇음.콘솔로 접근을 못하게 해서 "비밀변수" 를 만드는데도 기반이 됨!

// 1.
// var name = 'zero';
// function log(){
// 	console.log(name); // 이 name 은 153번째 줄 name과 연결, 죽었다 깨어나도!!
// }
// function wrapper(){
// 	name = 'nero';  // 이게 만약 var name = 'nero'; 가 되면 위에 값은 zero가 된다!!
// 	log();
// }
// wrapper(); // console => nero 

// 2.
var name = 'zero';
function log(){
	console.log(name); // 이 name 은 153번째 줄 name과 연결, 죽었다 깨어나도! 코드가 적힌 순간 스코프가 정해져요. 이것을 렉시컬 스코프라고 불러요.
}
function wrapper(){
	var name = 'nero';  // 이게 만약 var name = 'nero'; 가 되면 위에 값은 zero가 된다!!
	log(); // console.log(name) 으로 생각하면 안됨, 밖으로 나가서 실행하면 zero를 찾아서 도출!! 
}
wrapper();

// * 클로저?? - 함수와 함수가 선언된 어휘적(정적, 렉시컬) 환경의 관계, 조합이다.(from MDN)
// 로또 추첨 setTimeout 참고
// 반복문과 비동기 함수가 만날 때 클로저 문제가 자주 발생

//ex.
// for(var i = 0; i <100; i++){
// 	setTimeout(function(){
// 		console.log(i); // i는 89번째 줄 i가 된다. 죽엇다 깨어나도!(렉시컬 스코프)
// 	}, i * 1000)
// }

// function(){} >> 이 부분이 비동기 함수라서 실행되는 순간 정해짐!
// 여긴 계속 console.log(i)가 됨. 

// >> 100 만 계속 찍힘. 100, 100, 100, ...  스코프 때문에 for 이 다 돌고 난 i 만 나옴, >> 클로저 >> "클로저의 특성을 이용해 해결할수 있는 문제다!" 

// * 클로저 해결 / 로또추첨기 클로저 해결 ! 참고!

// for(var i = 0; i <100; i++){
// 	(function 클로저(j){
// 		setTimeout(function(){
// 			console.log(j); // i는 89번째 줄 i가 된다. 죽엇다 깨어나도!(렉시컬 스코프)
// 		}, j * 1000)
// 	// 클로저(i); 로 쓰지않고
// 	})(i); // function 가로로 묶어주고(i) 해서 바로 실행 = > "즉시실행함수"
// }

//클로저로 문제 해결을 해주면  1, 2, 3, 4, 가 1초씩 계속 나옴!!!

// *재귀함수? 자기가 자기 자신을 부르는 함수(무한반복 조심! stack overflow 재귀함수 무한 반복으로 브라우저 펑) >>  재귀함수 코딩은 꼭 효율성을 체크해야함!

// function 재귀함수(숫자){
// 	console.log(숫자);
// 	if(숫자 <5){
// 		재귀함수 (숫자 +1 ); //무한반복 됨 / if로 반복 수를 정해줘야함
// 	}
// }