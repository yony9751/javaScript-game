var tetris = document.querySelector('#tetris');
var tetrisData = [];

function 칸만들기(){
	var fragment = document.createDocumentFragment();
	for(var i = 0; i <20; i++){
		var tr = document.createElement('tr');
		var att = [];
		fragment.appendChild(tr);
		tetrisData.push(att);
		for(var j = 0; j <10 ;j++){
			var td = document.createElement('td');
			tr.appendChild(td);
			att.push(0);
		}
	}
	console.log(tetrisData);
	tetris.appendChild(fragment);
}

window.addEventListener('keydown',function(e){ //키보드에 따른 코드값 확인 가능, IE 에서 다를 수 있음! ** keydown 은 꾹 누르고 있는 상황에 계속 호출이 됨, keypress 는 방향기는 안먹고 키보드만 먹음!
	console.log(e);
	switch(e.code){ // 조건이 하나의 변수 값을 대상으로 하는 경우 if 말고 switch를 쓸 수 있다.
		case 'ArrowLeft' :
			console.log("왼쪽");
			break;
		case 'ArrowRight' :
			console.log("오른쪽");
			break;
		case 'ArrowDown' :
			break;	
		default : // else 기능!
			break;
	}
});
window.addEventListener('keyUp',function(e){
	switch(e.code){
		case 'Space' :
			break;
		case 'ArrowUp' :
			break;	
	}
})

칸만들기();