var screenWidth = window.screen.availWidth,
	screenHeight = window.screen.availHeight,
	gridContainerWidth = 0.92*screenWidth,
	cellSideLength = 0.18*screenWidth,
	cellSpace = 0.04*screenWidth;

var NV = {};
var UA = navigator.userAgent.toLowerCase();

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

function boardClear(arr){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
				arr[i][j] = 0;
			}
	}
}

function isEmpty(arr){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
				if(arr[i][j] != 0)
					return false;	
			}
	}
	return true;
}

//获取浏览器内核信息
function getBrowserIfo(){
	try
	{
		NV.name=document.all?'ie':
		(UA.indexOf("firefox")>0)?'firefox':
		(UA.indexOf("chrome")>0)?'chrome':
		window.opera?'opera':
		window.openDatabase?'safari':
		'unkonw';
	}catch(e){};
	try
	{
		NV.version=(NV.name=='ie')?UA.match(/msie ([\d.]+)/)[1]:
		(NV.name=='firefox')?UA.match(/firefox\/([\d.]+)/)[1]:
		(NV.name=='chrome')?UA.match(/chrome\/([\d.]+)/)[1]:
		(NV.name=='opera')?UA.match(/opera.([\d.]+)/)[1]:
		(NV.name=='safari')?UA.match(/version\/([\d.]+)/)[1]:
		'0';
	}catch(e){};
	try
	{
		NV.shell=(UA.indexOf('360ee')>-1)?'360极速浏览器':
		(UA.indexOf('360se')>-1)?'360安全浏览器':
		(UA.indexOf('se')>-1)?'搜狗浏览器':
		(UA.indexOf('aoyou')>-1)?'遨游浏览器':
		(UA.indexOf('theworld')>-1)?'世界之窗浏览器':
		(UA.indexOf('worldchrome')>-1)?'世界之窗极速浏览器':
		(UA.indexOf('greenbrowser')>-1)?'绿色浏览器':
		(UA.indexOf('qqbrowser')>-1)?'QQ浏览器':
		(UA.indexOf('baidu')>-1)?'百度浏览器':
		'未知或无壳';
	}catch(e){}

	console.log(UA);
	console.log(NV.name);
	console.log(NV.version);
	console.log(NV.shell);
	// $("#browserIfo").text(UA+"-----"+NV.name+"-----"+NV.version+"-----"+NV.shell);
}

//判断是否是在微信中打开
function isOpenByMM(){
	var browser = {
	    versions: function () {
	        var u = navigator.userAgent, app = navigator.appVersion;
	        return {         //移动终端浏览器版本信息
	            trident: u.indexOf('Trident') > -1, //IE内核
	            presto: u.indexOf('Presto') > -1, //opera内核
	            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	            iPad: u.indexOf('iPad') > -1, //是否iPad
	            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	        };
	    }(),
	    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

	if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
	        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
	        if (ua.match(/MicroMessenger/i) == "micromessenger") {
	        	//在微信中打开，返回true
	        	return true;
	        }
	        if (ua.match(/QQ/i) == "qq") {
	        	//在QQ中打开，返回true
	            return true;
	        }
	        return false;
	       /* if (ua.match(/WeiBo/i) == "weibo") {
	                //在新浪微博客户端打开
	        }
	        if (browser.versions.ios) {
	                //是否在IOS浏览器打开
	        } 
	        if(browser.versions.android){
	                //是否在安卓浏览器打开
	        }*/
	}
}
