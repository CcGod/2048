function showNumberWithAnimation(x,y,number){
	var numberCell=$("#number-cell-"+x+"-"+y);
	// console.log(numberCell);
	numberCell.css("background-color",getNumberCellBackgroundColor(number));
	numberCell.css("color",getNumberCellColor());
	numberCell.text(number);

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(x,y),
		left:getPosLeft(x,y)
	},130);
}

function showMoveAnimation(fromx,fromy,tox,toy){
	 var numberCell = $("#number-cell-"+fromx+"-"+fromy);
	 numberCell.animate({
	 	top:getPosTop(tox,toy),
	 	left:getPosLeft(tox,toy)
	 },190);

	 // console.log("showMoveAnimation完成");
}