var screenWidth = window.screen.availWidth,
	gridContainerWidth = 0.92*screenWidth,
	cellSideLength = 0.18*screenWidth,
	cellSpace = 0.04*screenWidth;

function getPosTop(top,left){
	return cellSpace+(cellSpace+cellSideLength)*top;
}
function getPosLeft(top,left){
	return cellSpace+(cellSpace+cellSideLength)*left;
}
function getNumberCellBackgroundColor(number){
	switch(number){
		case 2:return "#aaa";break;
		case 4:return "#69c";break;
		case 8:return "#69f";break;
		case 16:return "#6cf";break;
		case 32:return "#6ff";break;
		case 64:return "#c6c";break;
		case 128:return "#c6f";break;
		case 256:return "#c3f";break;
		case 512:return "#c06";break;
		case 1024:return "#900";break;
		case 2048:return "#c03";break;
		case 4096:return "#f30";break;
		case 8192:return "#777";break;
		default:return "#000";
	}
}
function getNumberCellColor(){
	return "white";
}

function nospace(arr){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
				if(arr[i][j]==0)
					return false;
			}
	}
	return true;
}

function canMoveLeft(arr){
	//左边是否没有数字
	//左边的数字是否可以和自己合并
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if(arr[i][j]!= 0){
				if(arr[i][j-1]==0||arr[i][j]==arr[i][j-1])
					return true;
			}
		}
	}
	return false;
}

function canMoveUp(arr){
	//上边是否没有数字
	//上边的数字是否可以和自己合并
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(arr[i][j]!=0){
				if(arr[i-1][j]==0||arr[i][j]==arr[i-1][j])
					return true;
			}
		}
	}
	return false;
}

function canMoveRight(arr){
	//右边是否没有数字
	//右边的数字是否可以和自己合并
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if(arr[i][j]!=0){
				if(arr[i][j+1]==0||arr[i][j]==arr[i][j+1])
					return true;
			}
		}
	}
	return false;
}	

function canMoveDown(arr){
	//下边是否没有数字
	//下边的数字是否可以和自己合并
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if(arr[i][j]!=0){
				if(arr[i+1][j]==0||arr[i][j]==arr[i+1][j])
					return true;
			}
		}
	}
	return false;
}

function noBarrier(row,start,end,arr){
	var _start = start<end?start:end;
	var _end  = start<end?end:start;

	for (var i = _start+1;i<_end;i++){
		if(arr[row][i]!=0)
			return false;
	}
	return true;
}

function _noBarrier(row,start,end,arr){
	var _start = start<end?start:end;
	var _end  = start<end?end:start;
	
	for (var i = _start+1;i<_end;i++){
		if(arr[i][row]!=0)
			return false;
	}
	return true;
}

function noMove(board){
	if(canMoveLeft(board)||canMoveUp(board)||canMoveRight(board)||canMoveDown(board)){
		return false;
	}
	return true;
}