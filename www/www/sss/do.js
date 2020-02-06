window.onload = function() {
    var imgBox = document.getElementById('_img-box');
    var swiper = document.getElementById('_swiper');
    var ul  = document.createElement('ul');
    var header = document.getElementById('header');
    var circle = document.getElementById('_circle-box');
    var nav_right = document.getElementById('_nav-right');
    var logo_box = document.getElementById('_logo-box');
    var as = nav_right.getElementsByTagName('a');
    var imglis = imgBox.children;
    var leader = 0;
    var target = 0;
    var current = 0; // 当前序列
    var autoTimer = null;
    init();
    function init() {
        // 头部
        animate();
        navClick();
        // banner部分
       // setBanner();
        // 创建小圆点
        //createSquare();
        // 自动播放
       // autoPlay();
        // swiper.addEventListener('mouseleave',function() {
        //     clearInterval(autoTimer);
        //     autoPlay();

        // });
        // swiper.addEventListener('mouseenter',function(){
        //     clearInterval(autoTimer);
        //     autoTimer = null;
        // })      
    }
    function animate() {
       // 页面滚动大于0时触发
        window.onscroll =  () => {
            var scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > 0){
                fadeIn();
            }            
            if(scrollTop <= 0){
                fadeOut();
            }
        }
        // 头像被点击时显示
        circle.addEventListener("click",() => {
                fadeOut();
         });
    }
    // 淡入
    function fadeIn() {
        header.style.animation = " fadeOut 1s ease-in-out forwards";
        circle.style.left =  (window.innerWidth - 60)+ 'px';
        circle.style.opacity = 1;
        logo_box.style.left =  (window.innerWidth - 60)+ "px";
        logo_box.style.opacity = 0;
        for(let i = 0;i < as.length;i++){
            as[i].style.left = 90 +'px';
        }
    }
    // 淡出
    function fadeOut() {
        header.style.animation = " fadeIn 1s ease-in-out forwards";
        circle.style.left =  0 + 'px';
        circle.style.opacity = 0;
        logo_box.style.left =  20 + '%';
        logo_box.style.opacity = 1;
        for(let i = 0;i < as.length;i++){
            as[i].style.left = 0 +'px';
        }
    }
    // 点击导航条li文字颜色改变
    function navClick() {
        var nav_right = document.getElementById('_nav-right');
        var lis = nav_right.children;
        for(let i = 0;i < lis.length;i++)
        {
            lis[i].onclick = function() {
                for( let j = 0;j < lis.length;j++)
                {
                    lis[j].className = '';
                }
                this.classList.add('active');
        }
        }
    }
    // 设置banner的ul宽度以及每个li的宽度
    function setBanner() {
        var clientWidth = document.documentElement.clientWidth;// 检测屏幕宽度
        imgBox.style.width = clientWidth*4 + 'px';
        for(let i = 0;i < imglis.length;i++)
        {
            imglis[i].style.width = clientWidth + 'px';
        }
        
    }
    // 生成小圆点
    function createSquare() {
        var orderBox = document.getElementById('_order-box'); 
        orderBox.appendChild(ul);
        for( let i = 0; i < imglis.length -1;i++)
        {
            var temp = document.createElement('li');
            ul.appendChild(temp);
        }
        ul.children[0].classList.add('active');
        let lis  = ul.children;
        for(let i = 0;i < lis.length;i++)
        {
            lis[i].addEventListener('mouseover',() => {
                for(let j = 0;j < lis.length;j++){
                    lis[j].classList.remove('active');
                }
            this.className = 'active';
            // 轮播图
            slider(i);
            });
        }
    }
          
    // 轮播图
    function slider(index) {
         current = index;
        if(current === imglis.length)// 当current = 4时，让imgBox的left立即等于 - imgBox.offsetWidth / 4
        {
            imgBox.style.left = - imgBox.offsetWidth / 4 + 'px' ;
            target = leader  = 0;// 一定要重新记录，否则会发生回溯的现象
            current = 1;// 设置为1，播放的下一张为第二张
        }
        for(let i = 0; i < ul.children.length;i++) // 根据序列值调整 小圆点的背景色
        {
            const element = ul.children[i];
            if (i === current )
            {
                element.style.backgroundColor = '#be926f';
            }
            else {
                element.style.backgroundColor = 'lightgray';
            }
        }
        //  这个if判断一定要放在for循环的后面 
        if(current === imglis.length -1)// 当current = 3时，第一个小圆点的背景亮起来
        {
            ul.children[0].style.backgroundColor = '#be926f';
        }
        target = imgBox.offsetWidth / 4 * current;
        clearInterval(imgBox.timer);
        imgBox.timer = setInterval(() => {
            leader = leader + (target - leader) / 10;
            imgBox.style.left = -leader + 'px';
            if(Math.abs(imgBox.offsetLeft - target) < 1)
            {
                clearInterval(imgBox.timer);
                imgBox.style.left = target+ 'px';
            }
          
        },30);
    }
    
    function autoPlay() {
        autoTimer = setInterval(function() {
                slider(current + 1);
        },3000);
    }
     
}
