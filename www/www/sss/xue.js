window.onload = function() {
    
 // 制作雪花特效
 var minsize = 5;// 最小的雪花
 var maxsize = 50;// 最大的雪花
 var delay = 100;// 生成雪花的时间间隔
 var snowColor = "#fff";// 雪花颜色
 var snowDiv = document.createElement('div');// 生成一个雪花
 snowDiv.className = "xh";
 snowDiv.style.position = "absolute";
 snowDiv.style.left = '0';
 snowDiv.style.top = "0";
 snowDiv.style.color = snowColor;
 snowDiv.innerHTML = "❉";
 var dHeight = document.documentElement.clientHeight;// 检测可视区的高度；
 var dWidth = document.documentElement.clientWidth;// 检测可视区的宽度
 setInterval(function(){
      var snowSize = minsize + Math.random()*maxsize;// 随机雪花的大小
      var startLeft = Math.random()*dWidth;// 雪花随机出现/停止的left值
      var stopLeft= Math.random()*dWidth;// 雪花随机出现/停止的left值
      var startOpacity = 0.7 + Math.random()*0.3;// 随机的透明度
      var stopHeight = dHeight -100;// 雪花停止的高度
      var speed = 3 +Math.random() *5 ;// 雪花飘落过程的速度
      var div = snowDiv.cloneNode(true);
      div.style.left = startLeft + 'px';
      div.style.opacity = startOpacity;
      div.style.fontSize = snowSize + 'px';        
      document.body.appendChild(div);
      animate(div,speed,stopHeight,stopLeft );
 },delay);

 
  function animate(obj,speed,stopHeight,stopLeft){
       clearInterval(obj.timer);
       obj.timer = setInterval(function(){
           obj.style.top = speed + obj.offsetTop + 'px';
          if(obj.offsetTop >= stopHeight)
          {
           clearInterval(obj.timer);
           document.body.removeChild(obj);
           obj = null;
           }
       },50);    
  }
}