//하스스톤 : 생성자와 팩토리 패턴 공부하기 좋은 게임!

var 상대영웅 = document.getElementById('rival-hero');
var 내영웅 = document.getElementById('my-hero');
var 상대덱 = document.getElementById('rival-deck');
var 내덱 = document.getElementById('my-deck');
var 상대필드 = document.getElementById('rival-cards');
var 내필드 = document.getElementById('my-cards');
var 상대코스트 = document.getElementById('rival-cost');
var 내코스트 = document.getElementById('my-cost');
var 상대덱data = [];
var 내덱data = [];
var 내영웅data;
var 상대영웅data;
var 상대필드data= [];
var 내필드data = [];
var 턴 = true;  //true 면 내턴, false면 니턴
var 턴버튼 = document.getElementById('turn-btn');

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
		if(턴){
			if(!데이터.mine || 데이터.field){
				return; // 내턴인데 내 카드가 아니라면
			}	
			var 현재코스트 = Number(내코스트.textContent);
			if(현재코스트 < 데이터.cost){
				return;
			}
			var idx = 내덱data.indexOf(데이터);
			내덱data.splice(idx, 1);
			내필드data.push(데이터);
			내덱.innerHTML = '';
			내필드.innerHTML = '';
			내덱data.push(카드공장()); //한장 뽑을 때 한장 추가
			내필드data.forEach(function(data){
				카드돔연결(data,내필드);
			});	
			내덱data.forEach(function(data){
				카드돔연결(data,내덱);
			});
			데이터.field = true;
			console.log(데이터);
			내코스트.textContent = 현재코스트 - 데이터.cost; 				
		}else{
			if(데이터.mine){ // 상대턴인데 내 카드를 뽑았다면
				return;
			}
			var 현재코스트 = Number(상대코스트.textContent);
			if(현재코스트 < 데이터.cost){
				return;
			}
			var idx = 상대덱data.indexOf(데이터);
			상대덱data.splice(idx, 1);
			상대필드data.push(데이터);
			상대덱.innerHTML = '';
			상대필드.innerHTML = '';
			상대덱data.push(카드공장()); //한장 뽑을 때 한장 추가
			상대필드data.forEach(function(data){
				카드돔연결(data,상대필드);
			});	
			상대덱data.forEach(function(data){
				카드돔연결(data,상대덱);
			});	
			상대코스트.textContent = 현재코스트 - 데이터.cost; 	
		}
	})
	위치.appendChild(카드);
}
function 상대덱생성(개수){
	for(var i = 0; i < 개수; i++){
		상대덱data.push(카드공장());
	}
	상대덱data.forEach(function(data){
		// var 카드 = document.createElement('div');
		// var 코스트 = document.createElement('div');
		// var 공격 = document.createElement('div');
		// var 체력 = document.createElement('div');
		//이런식으로 다 만들어서 넣는 건 너무 비효율적! >> hidden html불러오기 cloneNode
		//* 카드 돔 연결로 뺌
		카드돔연결(data, 상대덱);
	})
}
function 내덱생성(개수){
	for(var i = 0; i < 개수; i++){
		내덱data.push(카드공장(false, true));
	}
	내덱data.forEach(function(data){
		카드돔연결(data, 내덱);
	})
}
function 상대영웅생성(){
	상대영웅data = 카드공장(true);
	카드돔연결(상대영웅data, 상대영웅, true);
}
function 내영웅생성(){
	내영웅data = 카드공장(true, true);
	카드돔연결(내영웅data, 내영웅, true);
}
//팩토리패턴, 생성자
function Card(영웅, 내카드){ //()비워두면undefined >> false 로 생각됨
	if(영웅){
		this.att = Math.ceil(Math.random()*2);
		this.hp = Math.ceil(Math.random()*5) + 25;
		this.hero = true; //영웅일때만 hero값!
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
	상대덱생성(5);
	내덱생성(5);
	상대영웅생성();
	내영웅생성();
}

턴버튼.addEventListener('click',function(){
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
		내코스트.textContent = 10;
	}else{
		상대코스트.textContent = 10;
	}
})
초기세팅();