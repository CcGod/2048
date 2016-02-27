var board = new Array();
var score = 0;

var startx = 0,
	starty = 0,
	endx = 0,
	endy = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){

	if (screenWidth > 500) {
		gridContainerWidth = 475;
		cellSideLength = 100;
		cellSpace = 15;
	}

	$("#grid-container").css("width",gridContainerWidth - 2*cellSpace);
	$("#grid-container").css("height",gridContainerWidth - 2*cellSpace);
	$("#grid-container").css("padding",cellSpace);
	$("#grid-container").css("border-radius",0.03*gridContainerWidth);

	$(".grid-cell").css("width",cellSideLength);
	$(".grid-cell").css("height",cellSideLength);
	$(".grid-cell").css("border-radius",0.03*cellSideLength);
}

function newgame(){
	//初始化棋盘格
	init();
	//随机生成4、2
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i,j)+"px");
			gridCell.css("left",getPosLeft(i,j)+"px");
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i]=new Array;
		for (var j = 0; j < 4; j++) {
			board[i][j]=0;
		}	
	}
	//重置分数
	score=0;
	//重置布局
	updateBoardView();
}

function updateBoardView(){
	$(".number-cell").remove();
	//更新布局
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append("<span class='number-cell' id='number-cell-"+i+"-"+j+"'></span>");
			var numberCell=$("#number-cell-"+i+"-"+j);

			if(board[i][j]==0){
				numberCell.css("width","0");
				numberCell.css("height","0");
				numberCell.css("top",getPosTop(i,j)+cellSideLength/2);
				numberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
			}else{
				numberCell.css("width",cellSideLength);
				numberCell.css("height",cellSideLength);
				numberCell.css("top",getPosTop(i,j)+"px");
				numberCell.css("left",getPosLeft(i,j)+"px");
				numberCell.css("background-color",getNumberCellBackgroundColor(board[i][j]));
				numberCell.css("color",getNumberCellColor());
				numberCell.text(board[i][j]);
			}
		}
	}
	//设置number-cell的行高，让数字居中显示
	$(".number-cell").css("line-height",cellSideLength+"px");
	//更新分数
	$("#score").text(score);
	setTimeout("isGameOver()",20);
}

function generateOneNumber(){
	if(nospace(board))
		return false;
	//随机生成一个位置
	var x=parseInt(Math.floor(Math.random()*4));
	var y=parseInt(Math.floor(Math.random()*4));
	while(true){//设置一个死循环，当生成位置没有数字时退出循环
		if(board[x][y]==0)
			break;
		else{
			x=parseInt(Math.floor(Math.random()*4));
			y=parseInt(Math.floor(Math.random()*4));
		}
	}
	//随机生成一个数字
	var randomNumber=parseInt(Math.floor(Math.random()*2+1))*2;
	board[x][y]=randomNumber;
	//在生成的位置上显示这个数字
	// board[x][y]=randomNumber;
	// $("#number-cell-"+x+"-"+y).text(randomNumber);
	showNumberWithAnimation(x,y,randomNumber);
	return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			event.preventDefault();//阻止按键的默认效果	
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
			}
			break;
		case 38://up
			event.preventDefault();//阻止按键的默认效果	
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				}
			break;
		case 39://right
			event.preventDefault();//阻止按键的默认效果	
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
			}
			break;
		case 40://down
			event.preventDefault();//阻止按键的默认效果	
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
			}
			break;
		default:break;
	}
});

function moveLeft(){
	if(!canMoveLeft(board))
		return false;
	//moveleft
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if(board[i][j]!=0){
				//判断可以移动到的位置
				for (var k = 0; k < j; k++) {
					//是否可以移到这个位置
					if(board[i][k]==0&&noBarrier(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else 
					if(board[i][k]==board[i][j]&&noBarrier(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						score+=board[i][k];
						board[i][j]=0;
						moveLeft();
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);//直接更新布局会导致showMoveAnimation()函数终止，也就是说看不见动作变化，所以要延时200ms更新布局。
	return true;
}

function moveUp(){
	if(!canMoveUp(board))
		return false;
	//moveup
	for(var i=0;i<4;i++){
		for(var j = 1;j < 4 ;j++){
			if(board[j][i]!=0){
				for(var k=0;k<j;k++){
					if(board[k][i]==0&&_noBarrier(i,j,k,board)){
						showMoveAnimation(j,i,k,i);
						board[k][i]=board[j][i];
						board[j][i]=0;
						continue;
					}else 
					if(board[k][i]==board[j][i]&&_noBarrier(i,j,k,board)){
						showMoveAnimation(j,i,k,i);
						board[k][i]+=board[j][i];
						score+=board[k][i];
						board[j][i]=0;
						moveUp();
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board))
		return false;
	//moveRight
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j > -1; j--) {
			if(board[i][j]!=0){
				//判断可以移动到的位置
				for (var k = 3; k > j; k--) {
					//是否可以移到这个位置
					if(board[i][k]==0&&noBarrier(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else 
					if(board[i][k]==board[i][j]&&noBarrier(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						score+=board[i][k];
						board[i][j]=0;
						moveRight();
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board))
		return false;
	//moveDown
	for(var i=0;i<4;i++){
		for(var j=2;j>-1;j--){
			if(board[j][i]!=0){
				for(var k=3;k>j;k--){
					if(board[k][i]==0&&_noBarrier(i,j,k,board)){
						showMoveAnimation(j,i,k,i);
						board[k][i]=board[j][i];
						board[j][i]=0;
						continue;
					}else 
					if(board[k][i]==board[j][i]&&_noBarrier(i,j,k,board)){
						showMoveAnimation(j,i,k,i);
						board[k][i]+=board[j][i];
						score+=board[k][i];
						board[j][i]=0;
						moveDown();
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function isGameOver(){
	if (nospace(board)&&noMove(board)) {
		gameOver();
	}
}

function gameOver(){
	var wWidth = document.documentElement.clientWidth,
		wHeight= document.documentElement.clientHeight, 
		cover = document.createElement("div"),
	    over  = document.createElement("div");

	document.body.appendChild(cover);
	document.body.appendChild(over);

	cover.id = "cover";
	over.id = "gameover";
	over.style.width="435px";
	over.style.height="436px";
	over.style.lineHeight = over.offsetHeight+"px";
	
	if(over.textContent){
        over.textContent = "Game Over !";
    }else{
       over.innerText = "Game Over !";
    }

	over.style.left=(wWidth - over.offsetWidth)/2+"px";
	over.style.top =(wHeight - over.offsetHeight)/2+"px";

	over.onclick = function(){
		document.body.removeChild(cover);
		document.body.removeChild(over);
	 }
	cover.onclick = function(){
		document.body.removeChild(cover);
		document.body.removeChild(over);
	 }

	window.onresize=function(){
		document.body.removeChild(cover);
	    document.body.removeChild(over);
		gameOver();
	}
	// alert("Game Over!");
}

//移动端触控
document.addEventListener("touchstart",function (event){
	startx =  event.touches[0].pageX;
	starty =  event.touches[0].pageY;
});

document.addEventListener("touchmove",function(event){
	event.preventDefault();
});

document.addEventListener("touchend",function (event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var difX = endx - startx;
	var difY = endy - starty;
	//判断x y轴的差值，如果小与0.2倍screenWidth,则不算是滑动
	if (Math.abs(difX) < 0.2 * screenWidth && Math.abs(difY) < 0.2 * screenWidth) {
		return;
	}
	//手指在X轴方向滑动
	if(Math.abs(difX)>=Math.abs(difY) ){
		if(difX<0){//向左滑动
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
			}
		}else{//向右滑动
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
			}
		}
	}else{//手指在Y轴方向滑动
		if (difY<0) {//向上滑动
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
			}
		}else{//向下滑动
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
			}
		}
	}
});