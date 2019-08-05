var 테이블 = document.getElementById('table');
var 데이터 = [];

//DocumentFragment는 다른 노드를 담는 임시 컨테이너 역할을 하는 특수 목적의 노드이다. 가상의 노드 객체로서, 메모리상에서만 존재하는 비 문서 탬플릿으로 생각하면 된다. parentNode 프로퍼티는 항상 null이다. 하지만 Element처럼, appendChild()와 insertBefore() 등으로 조작할 수 있는 자손 객체를 가질 수 있다
function 초기화(){
	var fragment = document.createDocumentFragment();
	[1,2,3,4].forEach(function(){
		var 열데이터 = [];
		데이터.push(열데이터);
		var tr = document.createElement('tr');
		[1,2,3,4].forEach(function(행){
			열데이터.push(0);
			var td = document.createElement('td');
			tr.appendChild(td);
		});
		fragment.appendChild(tr);
	});
	테이블.appendChild(fragment);
}

function 랜덤생성(){
	var 빈칸배열 = [];
	데이터.forEach(function(열데이터, i){
		열데이터.forEach(function(행데이터, j){
			if(!행데이터){
				빈칸배열.push([i,j]);
			}
		});
	});
	var 랜덤칸 = 빈칸배열[Math.floor(Math.random()*빈칸배열.length)];
	데이터[랜덤칸[0]][랜덤칸[1]] = 2;
	그리기();
}
//데이터를 화면에 그리는 작업
function 그리기(){
	데이터.forEach(function(열데이터, i){
		열데이터.forEach(function(행데이터, j){
			if(행데이터 > 0){
				테이블.children[i].children[j].textContent = 행데이터;
			}else{
				테이블.children[i].children[j].textContent = '';
			}
		});
	})
}
초기화();
랜덤생성();

