var 테이블 = document.getElementById('table');
var 데이터 = [];
var 점수표 = document.getElementById('score');
//DocumentFragment는 다른 노드를 담는 임시 컨테이너 역할을 하는 특수 목적의 노드이다. 가상의 노드 객체로서, 메모리상에서만 존재하는 비 문서 탬플릿으로 생각하면 된다. parentNode 프로퍼티는 항상 null이다. 하지만 Element처럼, appendChild()와 insertBefore() 등으로 조작할 수 있는 자손 객체를 가질 수 있다
function 초기화(){
	var fragment = document.createDocumentFragment();
	[1,2,3,4].forEach(function(){
		var 행데이터 = [];
		데이터.push(행데이터);
		var tr = document.createElement('tr');
		[1,2,3,4].forEach(function(){
			행데이터.push(0);
			var td = document.createElement('td');
			tr.appendChild(td);
		});
		fragment.appendChild(tr);
	});
	테이블.appendChild(fragment);
}

function 랜덤생성(){
	var 빈칸배열 = [];
	데이터.forEach(function(행데이터, i){
		행데이터.forEach(function(열데이터, j){
			if(!열데이터){
				빈칸배열.push([i,j]);
			}
		});
	});
	if(빈칸배열.length === 0){
		alert('게임오버'+ 점수표.textContent);
		테이블.innerHTML = '';
		초기화();
	}else{
		var 랜덤칸 = 빈칸배열[Math.floor(Math.random()*빈칸배열.length)];
		데이터[랜덤칸[0]][랜덤칸[1]] = 2;
		그리기();
	}
}
//데이터를 화면에 그리는 작업
function 그리기(){
	데이터.forEach(function(행데이터, i){
		행데이터.forEach(function(열데이터, j){
			if(열데이터 > 0){
				테이블.children[i].children[j].textContent = 열데이터;
			}else{
				테이블.children[i].children[j].textContent = '';
			}
		});
	})
}
초기화();
랜덤생성();

// mousedown, mouseup, mousemove (마우스 드래그 구현)
// screenX : 모니터 기준 좌표
// pageX : 페이지(스크롤 포함)
// clientS : 브라우저 화면 기준 *이걸로 사용*
// offsetX : 이벤트 타겟 기준

var 드래그시작 = false;
var 시작좌표;
var 끝좌표;
var 방향;
window.addEventListener('mousedown', function(e){
	드래그시작 = true;
	시작좌표 = [e.clientX, e.clientY];
});
window.addEventListener('mousemove', function(e){
	if(드래그시작){
		드래그중 = true;
	}
});
window.addEventListener('mouseup', function(e){
	끝좌표 = [e.clientX, e.clientY];
	if(드래그중){
		var x차이 = 끝좌표[0]-시작좌표[0];
		var y차이 = 끝좌표[1]-시작좌표[1];
		if(x차이 < 0 && Math.abs(x차이) / Math.abs(y차이) > 1){
			방향 = '왼쪽';
		}else if(x차이 > 0 && Math.abs(x차이) / Math.abs(y차이) > 1){
			방향 = '오른쪽';
		}else if(y차이 < 0 && Math.abs(x차이) / Math.abs(y차이) < 1){
			방향 = '위';
		}else if (y차이 > 0 && Math.abs(x차이) / Math.abs(y차이) < 1){
			방향 = '아래'
		}	
		console.log(x차이, y차이, 방향);
	}
	드래그시작 = false;
	드래그중 = false;

	switch(방향){
		case '왼쪽' :
			var 새데이터 = [
				[],
				[],
				[],
				[]
			];
			데이터.forEach(function(행데이터, i){
				행데이터.forEach(function(열데이터, j){
					if(열데이터){
						console.log();
						if(새데이터[i][새데이터[i].length - 1] && 새데이터[i][새데이터[i].length -1] === 열데이터){
							새데이터[i][새데이터[i].length - 1] *= 2;
							var 현점수 = parseInt(점수표.textContent, 10);
							점수표.textContent = 현점수 + 새데이터[i][새데이터[i].length - 1]
						}else{
							새데이터[i].push(열데이터);
						}						
					}
				})
			});
			console.log(새데이터);
			[1,2,3,4].forEach(function(행데이터, i){
				[1,2,3,4].forEach(function(열데이터, j){
					// if(새데이터[j][i]){
					// 	데이터[i][j] = 새데이터[j][i];
					// }else{
					// 	데이터[i][j] = 0;
					// } //아래처럼 줄일 수 있음... (???)
					데이터[i][j] = 새데이터[i][j] || 0; 
				})
			});
			break;
		case '오른쪽' : 
			var 새데이터 = [
				[],
				[],
				[],
				[]
			];
			데이터.forEach(function(행데이터, i){
				행데이터.forEach(function(열데이터, j){
					if(열데이터){
						if(새데이터[i][0] && 새데이터[i][0] === 열데이터){
							새데이터[i][0] *= 2;
							var 현점수 = parseInt(점수표.textContent, 10);
							점수표.textContent = 현점수 + 새데이터[i][0]
						}else{
							새데이터[i].unshift(열데이터);
						}						
					}
				})
			});
			console.log(새데이터);
			[1,2,3,4].forEach(function(행데이터, i){
				[1,2,3,4].forEach(function(열데이터, j){
					// if(새데이터[j][i]){
					// 	데이터[i][j] = 새데이터[j][i];
					// }else{
					// 	데이터[i][j] = 0;
					// } //아래처럼 줄일 수 있음... (???)
					데이터[i][3-j] = 새데이터[i][j] || 0; 
				})
			});
			break;
		case '위' : 
			var 새데이터 = [
				[],
				[],
				[],
				[]
			];
			데이터.forEach(function(행데이터, i){
				행데이터.forEach(function(열데이터, j){
					if(열데이터){
						console.log();
						if(새데이터[j][새데이터[j].length - 1] && 새데이터[j][새데이터[j].length -1] === 열데이터){
							새데이터[j][새데이터[j].length - 1] *= 2;
							var 현점수 = parseInt(점수표.textContent, 10);
							점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1]
						}else{
							새데이터[j].push(열데이터);
						}						
					}
				})
			});
			console.log(새데이터);
			[1,2,3,4].forEach(function(행데이터, i){
				[1,2,3,4].forEach(function(열데이터, j){
					// if(새데이터[j][i]){
					// 	데이터[i][j] = 새데이터[j][i];
					// }else{
					// 	데이터[i][j] = 0;
					// } //아래처럼 줄일 수 있음... (???)
					데이터[i][j] = 새데이터[j][i] || 0; 
				})
			});
			break;
		case '아래' : 
			var 새데이터 = [
				[],
				[],
				[],
				[]
			];
			데이터.forEach(function(행데이터, i){
				행데이터.forEach(function(열데이터, j){
					if(열데이터){
						console.log();
						if(새데이터[j][새데이터[j].length - 1] && 새데이터[j][새데이터[j].length -1] === 열데이터){
							새데이터[j][새데이터[j].length - 1] *= 2;
							var 현점수 = parseInt(점수표.textContent, 10);
							점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1]
						}else{
							새데이터[j].unshift(열데이터);
						}						
					}
				})
			});
			console.log(새데이터);
			[1,2,3,4].forEach(function(행데이터, i){
				[1,2,3,4].forEach(function(열데이터, j){
					// if(새데이터[j][i]){
					// 	데이터[i][j] = 새데이터[j][i];
					// }else{
					// 	데이터[i][j] = 0;
					// } //아래처럼 줄일 수 있음... (???)
					데이터[3-i][j] = 새데이터[j][i] || 0; 
				})
			});
			break;
	}
	그리기();
	랜덤생성();

});
