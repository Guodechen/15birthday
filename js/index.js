const MaxRow = 5;
const MaxColum = 20;
const position = [
	[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 2, 0, 0, 0, 0, 0, 0, 0,31, 0,33, 0,35, 0, 0, 0, 0, 0, 0, 0],
	[ 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 0, 0, 0, 0, 0, 0, 0],
	[23, 0, 0,26, 0, 0, 0,30, 0,32, 0,34,16, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];    // position 是图片的定位，以1-16是逻辑定位，其拓展定位是在20的基础上加上本身的数字，例如：第3张图片点击之后跳转到3+20

let opt = {
	limit : 7,
	situate : 1,
	through : true,
	waitTime : 1000,
	heightScale : 100 / 5,// 定义高度比例
	widthScale : 100 / 20//定义宽度比例
}
var body = document.body;
var transitionEvent = whichTransitionEvent();  

// 选取元素
function selector(css) {
	return document.querySelector(css);
}

// 开始运动animation，传入是否向下bool，若点击传入none;传入位置可选参数pos
function c_animation(down,pos) {
	if (pos) {
		var obj = c_getPosition(pos);
	}else {
		if (down) {
			if (opt.situate >= opt.limit) {
				return ;
			}else {
				opt.situate += 1;
			}
		}else if(down === false){
			if (opt.situate === 1) {
				return;
			}else {
				opt.situate -= 1;
			}
		}
		var obj = c_getPosition(opt.situate);
	}
	let element = selector('body');
	bottom = opt.heightScale*obj.i + '%';
	left = -obj.j*opt.widthScale + '%';
	element.style.bottom = bottom;
	element.style.left = left;
}



// 获取某个元素为1的位置，并且返回一个{i,j}对象
function c_getPosition(pos) {
	for(var i = 0; i < MaxRow; i++)
	{
		for(var j = 0; j < MaxColum; j++)
		{
			if (position[i][j] === pos) {
				return {i,j}
			}
		}
	}
	return 0;
}


// 设置鼠标滚轮滚动时间 传入参数true,false,none
function waiting() {
	opt.through = true;
}

// 滚轮事件
var scrollFunc = function (e) {
    e = e || window.event;
    if (opt.through && (e.wheelDelta || e.detail)) {
     	if (e.wheelDelta > 0 || e.detail> 0) {
     		opt.through = false;
     		c_animation(false);
     		setTimeout(waiting, opt.waitTime);
     	}
     	if (e.wheelDelta < 0 || e.detail< 0) {
     		opt.through = false;
     		c_animation(true);
     		setTimeout(waiting, opt.waitTime);
     	}
    }
    opt.through = false;
 }
 //滚动滑轮触发scrollFunc方法
window.onmousewheel = document.onmousewheel = scrollFunc;  

// 判断transition是否完成动画
function whichTransitionEvent(){  
    var t;  
    var el = document.createElement('fakeelement');  
    var transitions = {  
        'transition':'transitionend',  
        'OTransition':'oTransitionEnd',  
        'MozTransition':'transitionend',  
        'WebkitTransition':'webkitTransitionEnd',  
          
        'animationstart':'animationend',  
        'webkitAnimationStart':'webkitAnimationEnd',  
        'MSAnimationStart':'MSAnimationEnd',  
    }  
    for(t in transitions){  
        if( el.style[t] !== undefined ){  
           return transitions[t];  
        }  
    }  
}  
// 等页面到达某个指定sititute之后做的事情
function doThings() {
	switch(opt.situate){
		case 1:
			console.log('123');
			break;
		case 2:
			console.log('234');
			break;
		case 3:
			console.log('345');
			break;
	}
}
// 添加多个属性以及延迟时间{x:##,y:##}以及属性 类似于
// var ele = selector('body')
function c_addProperty(ope, pro) {
	if (pro.length == undefined) {
		for(var i in ope){
			transitionEvent && pro.addEventListener(transitionEvent, function () {
				setTimeout(function () {
					pro.classList.add(i)
				},+ope[i])
			});
		}
	}else {
		let j = 0;
		for(var i in ope){
			transitionEvent && pro[j].addEventListener(transitionEvent, function () {
				setTimeout(function () {
					pro[j].classList.add(i);
				}, +ope[j]);
			});
			j++;
		}
	}
}
// 加载完成之后
window.onload = function () {
  //给页面绑定滑轮滚动事件
	if (document.addEventListener) {
		document.addEventListener('DOMMouseScroll', scrollFunc, false);
	}
	// 判断完成动画
	transitionEvent && body.addEventListener(transitionEvent, doThings);
}