function showNumberWithAnimation(x,y,number){
	var numberCell=$("#number-cell-"+x+"-"+y);
	// console.log(numberCell);
	numberCell.css("background-color",getNumberCellBackgroundColor(number));
	numberCell.css("color",getNumberCellColor());
	numberCell.text(number);
	numberCell.css({
			top:getPosTop(x,y)+cellSideLength/4+"px",
			left:getPosLeft(x,y)+cellSideLength/4+"px",
			width:cellSideLength/2+"px",
			height:cellSideLength/2+"px"
		});

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(x,y),
		left:getPosLeft(x,y)
	},210);
}

function showMoveAnimation(fromx,fromy,tox,toy,merge){
	 var numberCell = $("#number-cell-"+fromx+"-"+fromy),
	 	 cloneCell = numberCell.clone(),
	  	 _numberCell = $("#number-cell-"+tox+"-"+toy);
	 //动画由克隆的元素实现，不破坏原有的布局 
	 cloneCell.animate({
	 	top:getPosTop(tox,toy),
	 	left:getPosLeft(tox,toy)
	 },{
	 	duration:370,
	 	queue:true,
	 	start:function(){
	 		numberCell.parent().append(cloneCell);
	 		if(board[fromx][fromy]==0){
				/*numberCell.css({
					"width":0,
					"height":0,
					"top":getPosTop(fromx,fromy)+cellSideLength/2,
					"left":getPosLeft(fromx,fromy)+cellSideLength/2,
				});
				numberCell.text("");*/
				numberCell.hide();
			}
	 	},
	 	complete:function(){
	 		if(merge){
	 			cloneCell.animate({
	 				top:"-="+cellSpace/2,
	 				left:"-="+cellSpace/2,
	 				width:"+="+cellSpace,
	 				height:"+="+cellSpace
	 			},170).animate({
	 				top:"+="+cellSpace/2,
	 				left:"+="+cellSpace/2,
	 				width:"-="+cellSpace,
	 				height:"-="+cellSpace
	 			},70,function(){
	 				cloneCell.remove();
	 				updateBoardView();
	 			});
	 		}else{
	 			cloneCell.remove();
 				updateBoardView();
	 		}
	 		numberCell.show();
	 	}
	 });
}