//하스스톤 : 생성자와 팩토리 패턴 공부하기 좋은 게임!

// 애매하게 중복될때, 객체로 묶어줌(딕셔너리 구조)
var 상대 = {
	영웅 : document.getElementById('rival-hero'),
	덱 : document.getElementById('rival-deck'),
	필드:document.getElementById('rival-cards'),
	코스트 : document.getElementById('rival-cost'),
	덱data:[],
	영웅data: [],
	필드data: [],
	선택카드 : null,
	선택카드data : null
};
var 나 = {
	영웅 : document.getElementById('my-hero'),
	덱 : document.getElementById('my-deck'),
	필드:document.getElementById('my-cards'),
	코스트 : document.getElementById('my-cost'),
	덱data:[],
	영웅data: [],
	필드data: [],
	선택카드 : null,
	선택카드data : null
};
var 턴 = true;  //true 면 내턴, false면 니턴
var 턴버튼 = document.getElementById('turn-btn');

function 덱에서필드로(데이터, 내턴) {
	var 객체 = 내턴 ? 나 : 상대; // 삼항연산자
	// if(내턴){
	// 	객체 = 나;
	// }else{
	// 	객체 = 상대;
	// }
	//삼항연산자 if 문 대체 가능! 조건 ? 참 : 거짓 
	var 현재코스트 = Number(객체.코스트.textContent);
	if(현재코스트 < 데이터.cost){
		console.log("코스트 부족!");
		return 'end';  // return 은 리팩토링할때 주의해야함! return false 가 되면 이 덱에서필드로 함수가 끝내진다.
	}
	var idx = 객체.덱data.indexOf(데이터);
	객체.덱data.splice(idx, 1);
	객체.필드data.push(데이터);
	객체.덱.innerHTML = '';
	객체.필드.innerHTML = '';
	객체.필드data.forEach(function(data){
		카드돔연결(data,객체.필드);
	});	
	객체.덱data.forEach(function(data){
		카드돔연결(data,객체.덱);
	});
	객체.코스트.textContent = 현재코스트 - 데이터.cost;
	데이터.field = true;	
}
function 화면다시그리기(내화면){
	var 객체 = 내화면 ? 나 : 상대; // 삼항연산자
	필드다시그리기(객체);
	덱다시그리기(객체);
	영웅다시그리기(객체);
}
function 필드다시그리기(객체){
	객체.필드.innerHTML = '';
	객체.필드data.forEach(function(data){
		카드돔연결(data,객체.필드);
	});	
}
function 덱다시그리기(객체){
	객체.덱.innerHTML = '';	
	객체.덱data.forEach(function(data){
		카드돔연결(data,객체.덱);
	});
}
function 영웅다시그리기(객체){
	객체.영웅.innerHTML = '';
	카드돔연결(객체.영웅data, 객체.영웅, true);
}
function 카드공격(카드, 데이터, 내턴){
	var 아군 = 내턴 ? 나 : 상대;
	var 적군 = 내턴 ? 상대 : 나;
	//공격
	if(카드.classList.contains('card-turnover')){
		return;
	}
	//★★★
	var 적군카드 = 내턴 ? !데이터.mine : 데이터.mine; 
	if(적군카드 && 아군.선택카드){ //상대카드고 내 카드가 선택되어 있을 때
		데이터.hp = 데이터.hp - 아군.선택카드data.att;
		//죽은 카드 정리하기
		if(데이터.hp <= 0){
			var 인덱스 = 적군.필드data.indexOf(데이터);
			if(인덱스 > -1){ //쫄병이 죽었을때
				적군.필드data.splice(인덱스, 1);
			}else{ // 영웅이 죽었을 때
				내턴 ? alert('승리하셨습니다!') : alert('패배하셨습니다!');
				초기세팅();
			}
		}
		화면다시그리기(!내턴);
		아군.선택카드.classList.remove('card-selected');
		아군.선택카드.classList.add('card-turnover');
		아군.선택카드 = null;
		아군.선택카드data = null;				
		return;
	}else if(적군카드){ // 내턴인데 내 카드가 아니라면
		return;
	}
	if(데이터.field){ //카드가 필드에 있으면
		카드.parentNode.querySelectorAll('.card').forEach(function(card){
				card.classList.remove('card-selected');
		});
		카드.classList.add('card-selected');
		아군.선택카드 = 카드;
		아군.선택카드data = 데이터;
	}else{ //덱에 있으면, 영웅이 아니면
		if(덱에서필드로(데이터, 내턴) !== 'end'){
			내턴 ? 내덱생성(1) : 상대덱생성(1);
		}
	}
}
function 카드돔연결(데이터, 위치, 영웅) {
	// ★★★ cloneNode 와 생정자 활용 (.card-hidden 클래스 만듦)★★★
	var 카드 = document.querySelector('.card-hidden .card').cloneNode(true); // cloneNode(true) 트루 넣어주면 내부까지 다 복사!
	카드.querySelector('.card-cost').innerHTML = 데이터.cost;
	카드.querySelector('.card-att').innerHTML = 데이터.att;
	카드.querySelector('.card-hp').innerHTML = 데이터.hp;
	if(영웅){
		카드.querySelector('.card-cost').style.display = "none"
		var 이름 = document.createElement('div');
		이름.textContent = '영웅';
		카드.appendChild(이름);
	}	
	카드.addEventListener('click',function(card){
		//console.log(데이터);
		카드공격(카드, 데이터, 턴);
	})
	위치.appendChild(카드);
}
function 상대덱생성(개수){
	for(var i = 0; i < 개수; i++){
		상대.덱data.push(카드공장());
	}
	// ** 리팩토링 >> 덱다시그리기(상대);
	상대.덱.innerHTML = '';
	상대.덱data.forEach(function(data){
		// var 카드 = document.createElement('div');
		// var 코스트 = document.createElement('div');
		// var 공격 = document.createElement('div');
		// var 체력 = document.createElement('div');
		//이런식으로 다 만들어서 넣는 건 너무 비효율적! >> hidden html불러오기 cloneNode
		//* 카드 돔 연결로 뺌
		카드돔연결(data, 상대.덱);
	}); 
}
function 내덱생성(개수){
	for(var i = 0; i < 개수; i++){
		나.덱data.push(카드공장(false, true));
	}
	덱다시그리기(나);
}
function 상대영웅생성(){
	상대.영웅data = 카드공장(true);
	카드돔연결(상대.영웅data, 상대.영웅, true);
}
function 내영웅생성(){
	나.영웅data = 카드공장(true, true);
	카드돔연결(나.영웅data, 나.영웅, true);
}
//팩토리패턴, 생성자
function Card(영웅, 내카드){ //()비워두면undefined >> false 로 생각됨
	if(영웅){
		this.att = Math.ceil(Math.random()*2);
		this.hp = Math.ceil(Math.random()*5) + 25;
		this.hero = true; //영웅일때만 hero값!
		this.field = true;
	}else{
		this.att = Math.ceil(Math.random()*5);
		this.hp = Math.ceil(Math.random()*5);
		this.cost = Math.floor((this.att + this.hp) / 2);
	}
	if(내카드){
		this.mine = true;
	}
}
function 카드공장(영웅, 내카드){
	return new Card(영웅, 내카드);
}

function 초기세팅(){
	턴 = true;
	나.필드data = [];
	상대.필드data = [];
	나.덱data = [];
	상대.덱data = [];
	상대덱생성(5);
	내덱생성(5);
	상대영웅생성();
	내영웅생성();
	화면다시그리기(true);
	화면다시그리기(false);
}

턴버튼.addEventListener('click',function(){
	var 객체 = 턴 ? 나 : 상대; // 삼항연산자
	필드다시그리기(객체);
	영웅다시그리기(객체);
	//턴넘기기
	// if(턴){
	// 	턴 = false;
	// }else{
	// 	턴 = true;
	// }

	// ★ true 면 false로 false면 true로 만들어라!
	턴 = !턴;
	document.getElementById('rival').classList.toggle('turn');
	document.getElementById('my').classList.toggle('turn');
	if(턴){
		나.코스트.textContent = 10;
	}else{
		상대.코스트.textContent = 10;
	}	
})
초기세팅();