


// ----------------------------------------------------------------------------------------- 【 全局变量 】

// 自定义滚动条
var main_area_scrollBar;

// JS防抖
function debounce(fn, wait) {    
    var timeout = null;    
    return function() {        
        if(timeout !== null)   clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}

// JS节流
function throttle(fn,delay=100){
    //首先设定一个变量，在没有执行我们的定时器时为null
    let timer = null;
    return function(){
        //当我们发现这个定时器存在时，则表示定时器已经在运行中，需要返回
        if(timer) return;
        timer = setTimeout(()=>{
            fn.apply(this,arguments);
            timer = null;
        },delay);
    }
}

// 简易判断段元素触碰
function app_item_touch( moveX , moveY , touchX , touchY , touchW , touchH ){
    if( moveX > touchX && moveY > touchY && moveX < touchX + touchW && moveY < touchY + touchH ){
        return true;
    }
    else{
        return false;
    }
}

// 初始化主框尺寸
function winWidth_reChange(){
    if( $(".main_area").get(0).clientWidth>1120 ){
        $(".main_area").css({
            "paddingLeft":parseInt(($(".main_area").get(0).clientWidth-1120)/2),
            "paddingRight":parseInt(($(".main_area").get(0).clientWidth-1120)/2),
        });
    }
    else{
        $(".main_area").css({
            "paddingLeft":parseInt(($(".main_area").get(0).clientWidth%160)/2),
            "paddingRight":parseInt(($(".main_area").get(0).clientWidth%160)/2),
        });
    }
}






/////////////////////////////////////////////////////////////////////////////////////////////////

//  移动参数变量

/////////////////////////////////////////////////////////////////////////////////////////////////

   

var intX , intY , BEMOVENAME , EMPTYX , EMPTYY , TOTALX , TOTALY , MOVETYPE  ;



// 实时移动
$("body").mousemove(function(e){

    // 【 储存鼠标坐标 】

    intX = e.clientX;  
    intY = e.clientY;

    if(            MOVETYPE != null && BEMOVENAME != null && EMPTYX != null && EMPTYY != null ){

        // 改变元素位置
        $( BEMOVENAME ).offset({ left: intX - EMPTYX , top: intY - EMPTYY }); 
    }
});



$("body").mousemove(throttle(function(){

    if(            MOVETYPE != null && BEMOVENAME != null && EMPTYX != null && EMPTYY != null ){

        if( app_item_touch( intX , intY , $(".bottom_bar").offset().left , $(".bottom_bar").offset().top , $(".bottom_bar").width() , $(".bottom_bar").height() ) && $(".bottom_bar").children(".app_item").length<11 ){
            var touch_item_stat = false ;
            var itme_length = $(".bottom_bar").children(".app_item").length;
            // 元素间挤开
            for (var i = 0; i < itme_length; i++) {
                    if( app_item_touch( intX , intY , $(".bottom_bar").children(".app_item").eq(i).offset().left , $(".bottom_bar").children(".app_item").eq(i).offset().top-20 , $(".bottom_bar").children(".app_item").eq(i).width() , $(".bottom_bar").children(".app_item").eq(i).height()+20 ) ){
                        touch_item_stat = true;
                        var Num1 , Num2 , Num3 , Num4;
                        if( intX < $(".bottom_bar").children(".app_item").eq(i).offset().left + $(".bottom_bar").children(".app_item").eq(i).width()/2 ){
                            Num3 = i; Num2 = i-1; Num1 = i-2; Num4 = i+1;
                        }
                        else{
                            Num2 = i; Num1 = i-1; Num3 = i+1; Num4 = i+2;
                        }

                        if( Num1 >= 0 && MOVETYPE != null ){
                            $(".bottom_bar").children(".app_item").eq(Num1).addClass("scale1").removeClass("scale2").removeClass("scale2_space_l").removeClass("scale2_space_r");
                        }
                        if( Num2 >= 0 && MOVETYPE != null ){
                            $(".bottom_bar").children(".app_item").eq(Num2).addClass("scale2").removeClass("scale1").addClass("scale2_space_l").removeClass("scale2_space_r");
                        }
                        if( Num3 <= itme_length-1 && MOVETYPE != null ){
                            $(".bottom_bar").children(".app_item").eq(Num3).addClass("scale2").removeClass("scale1").addClass("scale2_space_r").removeClass("scale2_space_l");
                        }
                        if( Num4 <= itme_length-1 && MOVETYPE != null ){
                            $(".bottom_bar").children(".app_item").eq(Num4).addClass("scale1").removeClass("scale2").removeClass("scale2_space_l").removeClass("scale2_space_r");
                        }
                        for (var i = 0; i < itme_length; i++) {
                            if( i != Num1 && i != Num2 && i != Num3 && i != Num4 ){
                                $(".bottom_bar").children(".app_item").eq(i).removeClass("scale1").removeClass("scale2").removeClass("scale2_space_l").removeClass("scale2_space_r");
                            }
                        }
                        break;
                    }
            }
            // 元素头部/尾部挤开
            if( !touch_item_stat ){
                var NumC , NumF ; 
                if( intX < $(".bottom_bar").children(".app_item").eq(0).offset().left ){
                    NumC = 0 ; NumF = 1 ;
                    if( NumC <= itme_length-1 && MOVETYPE != null ){
                        $(".bottom_bar").children(".app_item").eq(NumC).addClass("scale2").removeClass("scale1").addClass("scale2_space_r").removeClass("scale2_space_l");
                    }
                    if( NumF <= itme_length-1 && MOVETYPE != null ){
                        $(".bottom_bar").children(".app_item").eq(NumF).addClass("scale1").removeClass("scale2").removeClass("scale2_space_l").removeClass("scale2_space_r");
                    }
                    for (var i = 0; i < itme_length; i++) {
                        if( i != NumC && i != NumF ){
                            $(".bottom_bar").children(".app_item").eq(i).removeClass("scale1").removeClass("scale2").removeClass("scale2_space_l").removeClass("scale2_space_r");
                        }
                    }
                }
                else if( intX > $(".bottom_bar").children(".app_item").eq(itme_length-1).offset().left+$(".bottom_bar").children(".app_item").eq(itme_length-1).width() ){
                    NumC = itme_length-1 ; NumF = itme_length-2 ;
                    if( NumF >= 0 && MOVETYPE != null ){
                        $(".bottom_bar").children(".app_item").eq(NumF).addClass("scale1").removeClass("scale2").removeClass("scale2_space_l").removeClass("scale2_space_r");
                    }
                    if( NumC >= 0 && MOVETYPE != null ){
                        $(".bottom_bar").children(".app_item").eq(NumC).addClass("scale2").removeClass("scale1").addClass("scale2_space_l").removeClass("scale2_space_r");
                    }
                    for (var i = 0; i < itme_length; i++) {
                        if( i != NumC && i != NumF ){
                            $(".bottom_bar").children(".app_item").eq(i).removeClass("scale1").removeClass("scale2").removeClass("scale2_space_l").removeClass("scale2_space_r");
                        }
                    }
                }  
            }
        }
        else{
            $(".bottom_bar").children(".app_item").removeClass("scale1").removeClass("scale2").removeClass("scale2_space_l").removeClass("scale2_space_r");// 底部样式清楚
        }
    }
},100));



var main_area_run_stat = true;
var mouseupDealXY = { dealx:"",dealy:"",stat:false };
$("body").mousemove(debounce(function(){

    if(            MOVETYPE != null && BEMOVENAME != null && EMPTYX != null && EMPTYY != null && main_area_run_stat == true ){

        main_area_run_stat = false ;
        if( app_item_touch( intX , intY , $(".main_area").offset().left , 0 , $(".main_area").get(0).clientWidth , $(".bottom_bg").offset().top ) ){

            var touch_item_stat = false ;
            var itme_length = $(".main_area").children(".app_item").length;

            // $(".main_area").children(".app_item").removeClass("after_mark");

            // 检查间隙（ 得出间隙位置 ）
            var space1 = null ;
            for (var m = $(".main_area").children(".app_item").length - 1; m >= 0; m--) {
                var prev = m-1;
                if( prev >= 0 ){
                    if( Math.abs(parseFloat($(".main_area").children(".app_item").eq(m).css("top"))-parseFloat($(".main_area").children(".app_item").eq(prev).css("top"))) <= 2 ){
                        if( parseFloat($(".main_area").children(".app_item").eq(m).css("left"))-parseFloat($(".main_area").children(".app_item").eq(prev).css("left")) >= 316 ){
                            console.log("同行之间有空隙",m,prev);
                            console.log(parseFloat($(".main_area").children(".app_item").eq(m).css("left"))-parseFloat($(".main_area").children(".app_item").eq(prev).css("left")));
                            space1 = m ; break;
                        }
                    }
                    else{
                        if( parseFloat($(".main_area").children(".app_item").eq(m).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                            console.log("当前在行首位且有间隙",m,prev);
                            space1 = m ; break;
                        }
                        else if( $(".main_area").get(0).clientWidth-160-parseFloat($(".main_area").children(".app_item").eq(prev).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                            console.log("上一对比位有间隙",m,prev);
                            space1 = m ; break;
                        }
                    }
                }
                else if( m >= 0 ){
                    if( parseFloat($(".main_area").children(".app_item").eq(m).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                        console.log("第一位有空隙",m);
                        space1 = m ; break;
                    }
                }   
            }
            
            // 元素间挤开
            for (var i = 0; i < itme_length; i++) {
                if( app_item_touch( intX , intY , $(".main_area").children(".app_item").eq(i).offset().left , $(".main_area").children(".app_item").eq(i).offset().top , $(".main_area").children(".app_item").eq(i).width() , $(".main_area").children(".app_item").eq(i).height() )  ){

                    touch_item_stat = true;

                    // 检查触碰位置
                    var NumC = null , NumF = null , NumI = null ;
                    if( intX > parseFloat($(".main_area").children(".app_item").eq(i).css("left"))+35 && intX < parseFloat($(".main_area").children(".app_item").eq(i).css("left"))+35+90 ){
                        NumI = i;
                    }
                    else if( intX < parseFloat($(".main_area").children(".app_item").eq(i).css("left")) + $(".main_area").children(".app_item").eq(i).width()/2 /*&& $(".main_area").children(".app_item").eq(i).offset().left-($(".main_area").get(0).clientWidth%160)/2>=160*/ ){
                        NumC = i-1 ; NumF = i ;
                    }
                    else if( intX > parseFloat($(".main_area").children(".app_item").eq(i).css("left")) + $(".main_area").children(".app_item").eq(i).width()/2 /*|| $(".main_area").children(".app_item").eq(i).offset().left-($(".main_area").get(0).clientWidth%160)/2<160*/ ){
                        NumC = i ; NumF = i+1 ;
                    }

                    // 得出移动元素地范围后，遍历所有元素进行移动
                    if( space1 != null ){  // 有间隙

                        // 触碰位置对比，计算移动范围
                        if( NumI != null ){
                            $(".main_area").children(".app_item").removeClass("after_mark");
                            // 使用元素置换
                            if( NumI >= space1 ){
                                // 往下挪
                                console.log(space1+" ~ "+NumI);
                                $(".main_area").children(".app_item").eq(NumI+1).addClass("after_mark");
                                for ( var t=NumI ; t>space1-1 ; t-- ) {
                                    console.log("change："+t);
                                    var left = parseFloat($(".main_area").children(".app_item").eq(t).css("left"));
                                    var top = parseFloat($(".main_area").children(".app_item").eq(t).css("top"));
                                    if( left-parseFloat($(".main_area").css("paddingLeft"))>=158 ){
                                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                            "left":left-160,
                                            "top":top
                                        });
                                    }
                                    else{
                                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                            "left":parseFloat($(".main_area").get(0).clientWidth)-160-parseFloat($(".main_area").css("paddingLeft")),
                                            "top":top-145
                                        });
                                    }
                                }
                            }
                            else{
                                // 往上挪
                                console.log(space1-1+" ~ "+NumI);
                                $(".main_area").children(".app_item").eq(NumI).addClass("after_mark");
                                for ( var t=NumI ; t<space1 ; t++ ) {
                                    console.log("change："+t);
                                    var left = parseFloat($(".main_area").children(".app_item").eq(t).css("left"));
                                    var top = parseFloat($(".main_area").children(".app_item").eq(t).css("top"));
                                    if( $(".main_area").get(0).clientWidth-160-left-parseFloat($(".main_area").css("paddingLeft"))>=158 ){
                                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                            "left":left+160,
                                            "top":top
                                        });
                                    }
                                    else{
                                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                            "left":parseFloat($(".main_area").css("paddingLeft")),
                                            "top":top+145
                                        });
                                    }
                                }
                            }
                        }
                        else if( NumF != null ){
                            $(".main_area").children(".app_item").removeClass("after_mark");
                            // 使用缝隙置换
                            if( NumF > space1 ){    // 往下挪
                                var chNum = NumF-1;
                                console.log(space1+" ~ "+chNum);
                                $(".main_area").children(".app_item").eq(NumF).addClass("after_mark");
                                for ( var t=chNum ; t>space1-1 ; t-- ) {
                                    console.log("change："+t);
                                    var left = parseFloat($(".main_area").children(".app_item").eq(t).css("left"));
                                    var top = parseFloat($(".main_area").children(".app_item").eq(t).css("top"));
                                    if( left-parseFloat($(".main_area").css("paddingLeft"))>=158 ){
                                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                            "left":left-160,
                                            "top":top
                                        });
                                    }
                                    else{
                                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                            "left":parseFloat($(".main_area").get(0).clientWidth)-160-parseFloat($(".main_area").css("paddingLeft")),
                                            "top":top-145
                                        });
                                    }
                                }
                            }
                            else if( space1 > NumF ){    // 往上挪
                                $(".main_area").children(".app_item").eq(NumF).addClass("after_mark");
                                for ( var t=NumF ; t<space1 ; t++ ) {
                                    console.log("change："+t);
                                    var left = parseFloat($(".main_area").children(".app_item").eq(t).css("left"));
                                    var top = parseFloat($(".main_area").children(".app_item").eq(t).css("top"));
                                    if( $(".main_area").get(0).clientWidth-160-left-parseFloat($(".main_area").css("paddingLeft"))>=158 ){
                                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                            "left":left+160,
                                            "top":top
                                        });
                                    }
                                    else{
                                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                            "left":parseFloat($(".main_area").css("paddingLeft")),
                                            "top":top+145
                                        });
                                    }
                                }
                            }
                        }

                    }
                    else{  // 无缝隙

                        // 触碰位置对比，计算移动范围
                        var NumRemove = null;
                        if( NumI != null ){
                            NumRemove = NumI;
                        }
                        else if( NumF != null ){
                            NumRemove = NumF;
                        }
                        if( NumRemove != null ){
                            $(".main_area").children(".app_item").eq(NumRemove).addClass("after_mark");
                            for ( var t=NumRemove ; t<$(".main_area").children(".app_item").length ; t++ ) {
                                    
                                console.log("change："+t);
                                var left = parseFloat($(".main_area").children(".app_item").eq(t).css("left"));
                                var top = parseFloat($(".main_area").children(".app_item").eq(t).css("top"));
                                if( $(".main_area").get(0).clientWidth-160-left-parseFloat($(".main_area").css("paddingLeft"))>=158 ){
                                    $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                        "left":left+160,
                                        "top":top
                                    });
                                }
                                else{
                                    $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                                        "left":parseFloat($(".main_area").css("paddingLeft")),
                                        "top":top+145
                                    });
                                }
                            }
                        }
                    }
                    break;
                }
            }

            // 如果页面存在缝隙，鼠标在元素末尾
            if( !touch_item_stat && space1 != null && ( (intX>parseFloat($(".main_area").children(".app_item").eq($(".main_area").children(".app_item").length-1).css("left")) && intY>parseFloat($(".main_area").children(".app_item").eq($(".main_area").children(".app_item").length-1).css("top"))) || (intY>parseFloat($(".main_area").children(".app_item").eq($(".main_area").children(".app_item").length-1).css("top")) + 145) ) ){

                $(".main_area").children(".app_item").removeClass("after_mark");
                var chNum = $(".main_area").children(".app_item").length-1;
                console.log(space1+" ~ "+chNum);
                for ( var t=chNum ; t>space1-1 ; t-- ) {
                    console.log("change："+t);
                    var left = parseFloat($(".main_area").children(".app_item").eq(t).css("left"));
                    var top = parseFloat($(".main_area").children(".app_item").eq(t).css("top"));
                    if( left-parseFloat($(".main_area").css("paddingLeft"))>=158 ){
                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                            "left":left-160,
                            "top":top
                        });
                    }
                    else{
                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                            "left":parseFloat($(".main_area").get(0).clientWidth)-160-parseFloat($(".main_area").css("paddingLeft")),
                            "top":top-145
                        });
                    }
                }
            }
        }
        else if( app_item_touch( intX , intY , $(".main_area").offset().left , 0 , $(".main_area").get(0).clientWidth , $(".bottom_bg").offset().top ) == false ){

            var space1 = null ;
            for (var m = $(".main_area").children(".app_item").length - 1; m >= 0; m--) {
                var prev = m-1;
                if( prev >= 0 ){
                    if( Math.abs(parseFloat($(".main_area").children(".app_item").eq(m).css("top"))-parseFloat($(".main_area").children(".app_item").eq(prev).css("top"))) <= 2 ){
                        if( parseFloat($(".main_area").children(".app_item").eq(m).css("left"))-parseFloat($(".main_area").children(".app_item").eq(prev).css("left")) >= 316 ){
                            console.log("同行之间有空隙",m,prev);
                            space1 = m ; break;
                        }
                    }
                    else{
                        if( parseFloat($(".main_area").children(".app_item").eq(m).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                            console.log("当前在行首位且有间隙",m,prev);
                            space1 = m ; break;
                        }
                        else if( $(".main_area").get(0).clientWidth-160-parseFloat($(".main_area").children(".app_item").eq(prev).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                            console.log("上一对比位有间隙",m,prev);
                            space1 = m ; break;
                        }
                    }
                }
                else if( m >= 0 ){
                    if( parseFloat($(".main_area").children(".app_item").eq(m).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                        console.log("第一位有空隙",m);
                        space1 = m ; break;
                    }
                }   
            }
            var chNum = $(".main_area").children(".app_item").length-1;
            console.log(space1+" ~ "+chNum);
            if( space1 != null ){
                for ( var t=chNum ; t>space1-1 ; t-- ) {
                    console.log("change："+t);
                    var left = parseFloat($(".main_area").children(".app_item").eq(t).css("left"));
                    var top = parseFloat($(".main_area").children(".app_item").eq(t).css("top"));
                    if( left-parseFloat($(".main_area").css("paddingLeft"))>=158 ){
                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                            "left":left-160,
                            "top":top
                        });
                    }
                    else{
                        $(".main_area").children(".app_item").eq(t).addClass("remove").css({
                            "left":parseFloat($(".main_area").get(0).clientWidth)-160-parseFloat($(".main_area").css("paddingLeft")),
                            "top":top-145
                        });
                    }
                }
            }
        }

        // 延迟事件执行
        setTimeout(function(){
            main_area_run_stat = true ;
            if( mouseupDealXY.stat == true ){
                UI.mouseupDealFunc( mouseupDealXY.dealx , mouseupDealXY.dealy );
            }
        },400);
    }
},50));






var UI = {   // ------------------------------------------------------------------------------- 【 页面对象 】

    




    mainArea : function(){


        
        // 适配屏幕宽度
        winWidth_reChange();
        // 设置自定义滚动条
        function createScrollBar(){
            main_area_scrollBar = $(".main_area").niceScroll({
                cursorcolor: "#dcdee0",      // 滚动条的颜色   
                cursoropacitymax: 0,         // 滚动条的透明度，从0-1   
                touchbehavior: false,        // 使光标拖动滚动像在台式电脑触摸设备   
                cursorwidth: "5px",          // 滚动条的宽度   
                cursorborder: "0",           // 游标边框css定义    
                cursorborderradius: "5px",   // 以像素为光标边界半径  圆角   
                autohidemode: true,          // 是否隐藏滚动条  true的时候默认不显示滚动条，当鼠标经过的时候显示滚动条   
                zindex: "auto",              // 给滚动条设置z-index值    
                hwacceleration: true,
                railpadding: {
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
                }
            });
        }
        createScrollBar();



        // 拖拽事件
        $(".main_area").on("mousedown",".app_icon",function(){

            var Num = $(".main_area").children(".app_item").index( $(this).parent() );

            // 绝对化移动元素
            var itme_left = $(".main_area").children(".app_item").eq(Num).offset().left , itme_top = $(".main_area").children(".app_item").eq(Num).offset().top , itme_html = $(".main_area").children(".app_item").eq(Num).html() ;
            $("#move_item").html(itme_html).css({
                "left":itme_left+35,
                "top":itme_top+27
            });

            // 设置空隙
            if( Num-1 >= 0 && Num+1 <= $(".main_area").children(".app_item").length-1 ){
                if(      $(".main_area").children(".app_item").eq(Num-1).offset().top == $(".main_area").children(".app_item").eq(Num).offset().top && $(".main_area").children(".app_item").eq(Num).offset().top == $(".main_area").children(".app_item").eq(Num+1).offset().top ){
                    $(".main_area").children(".app_item").eq(Num-1).css("marginRight","80px");
                    $(".main_area").children(".app_item").eq(Num+1).css("marginLeft","80px").addClass("after_mark");
                }
                else if( $(".main_area").children(".app_item").eq(Num-1).offset().top == $(".main_area").children(".app_item").eq(Num).offset().top && $(".main_area").children(".app_item").eq(Num).offset().top != $(".main_area").children(".app_item").eq(Num+1).offset().top ){
                    $(".main_area").children(".app_item").eq(Num-1).css("marginRight","160px");
                    $(".main_area").children(".app_item").eq(Num+1).addClass("after_mark");
                }
                else if( $(".main_area").children(".app_item").eq(Num-1).offset().top != $(".main_area").children(".app_item").eq(Num).offset().top && $(".main_area").children(".app_item").eq(Num).offset().top == $(".main_area").children(".app_item").eq(Num+1).offset().top ){
                    $(".main_area").children(".app_item").eq(Num+1).css("marginLeft","160px").addClass("after_mark");
                }
            }
            else if( Num+1 <= $(".main_area").children(".app_item").length-1 ){
                $(".main_area").children(".app_item").eq(Num+1).css("marginLeft","160px").addClass("after_mark");
            }
            else if( Num-1 >= 0 ){
                // console.log("一定是你")
                // $(".main_area").children(".app_item").eq(Num-1).css("marginRight","160px");
            }

            // 绝对定位化
            // 页面
            var pageLeft = $(".main_area").offset().left;
            var pageTop = -$(".main_area").get(0).scrollTop;
            var pageWidth = $(".main_area").get(0).clientWidth;
            var pageHeight = $(".main_area").get(0).scrollHeight;
            $(".main_area").css({
                "left":pageLeft+"px",
                "top":pageTop+"px",
                "width":pageWidth+"px",
                "height":pageHeight+"px"
            }).addClass("fixed");

            // 将被选择的 item 从相对位置中抽离
            $(".main_area").children(".app_item").eq(Num).remove();

            // APP元素
            for (var t = $(".main_area").children(".app_item").length - 1; t >= 0; t--) {
                    var left = parseInt($(".main_area").children(".app_item").eq(t).offset().left);
                    var top = parseInt($(".main_area").children(".app_item").eq(t).offset().top);
                    $(".main_area").children(".app_item").eq(t).removeClass("ani_css3").css({
                        "left":left,
                        "top":top,
                        "marginLeft":"0px",
                        "marginRight":"0px"
                    }).addClass("fixed");
            }
            // 移动
            $(".drag_win").addClass("show").children("#move_item").animate({left:intX-45,top:intY-45},100);

            // 【 启动参数 】

            BEMOVENAME = "#move_item"                  ;   // 被操作元素
            MOVETYPE   = "true"                       ;   // 被操作类型
            EMPTYX     = 45 ;   // X 空白边距
            EMPTYY     = 45  ;   // Y 空白边距

        });



    },



    


    bottomBar : function(){

        

        // 底条触摸动画效果事件（ mouseover ）
        $(".bottom_bar").on("mouseover",".app_item",function(){
            var Num = $(".bottom_bar").children(".app_item").index(this);
            if( Num-2 >= 0 ){
                $(".bottom_bar").children(".app_item").eq(Num-2).addClass("scale1").removeClass("scale2");
            }
            if( Num-1 >= 0 ){
                $(".bottom_bar").children(".app_item").eq(Num-1).addClass("scale2").removeClass("scale1");
            }
            if( Num+1 <= $(".bottom_bar").children(".app_item").length-1 ){
                $(".bottom_bar").children(".app_item").eq(Num+1).addClass("scale2").removeClass("scale1");
            }
            if( Num+2 <= $(".bottom_bar").children(".app_item").length-1 ){
                $(".bottom_bar").children(".app_item").eq(Num+2).addClass("scale1").removeClass("scale2");
            }
            for (var i = 0; i < $(".bottom_bar").children(".app_item").length; i++) {
                if( i != Num-2 && i != Num-1 && i != Num+1 && i != Num+2 ){
                    $(".bottom_bar").children(".app_item").eq(i).removeClass("scale1").removeClass("scale2");
                }
            }
        });
        //（ mouseout ）
        $(".bottom_bar").on("mouseout",".app_item",function(){
            $(".bottom_bar").children(".app_item").removeClass("scale1").removeClass("scale2").removeClass("scale_max");
        });

        

        // 拖拽事件
        $(".bottom_bar").on("mousedown",".app_item",function(){

            // 设置空隙
            var Num = $(".bottom_bar").children(".app_item").index(this);
            if( Num-1 >= 0 ){
                $(".bottom_bar").children(".app_item").eq(Num-1).removeClass("ani_css3").addClass("scale2_space_l");
            }
            if( Num+1 <= $(".bottom_bar").children(".app_item").length-1 ){
                $(".bottom_bar").children(".app_item").eq(Num+1).removeClass("ani_css3").addClass("scale2_space_r");
            }
            setTimeout(function(){  $(".bottom_bar").children(".app_item").addClass("ani_css3")  },10);

            // 将被选择的 item 从相对位置中抽离
            var itme_left = parseInt($(this).offset().left) , itme_top = parseInt($(this).offset().top) , itme_html = $(this).html() ;
            $("#move_item").html(itme_html).css({
                "left":itme_left,
                "top":itme_top
            }).parent().addClass("show").children("#move_item").animate({left:intX-45,top:intY-45},100);
            $(this).remove();

            // 绝对定位化
            // 页面
            var pageLeft = $(".main_area").offset().left;
            var pageTop = -$(".main_area").get(0).scrollTop;
            var pageWidth = $(".main_area").get(0).clientWidth;
            var pageHeight = $(".main_area").get(0).scrollHeight;
            $(".main_area").css({
                "left":pageLeft+"px",
                "top":pageTop+"px",
                "width":pageWidth+"px",
                "height":pageHeight+"px"
            }).addClass("fixed");

            // APP元素
            for (var t = $(".main_area").children(".app_item").length - 1; t >= 0; t--) {
                // if( !$(".main_area").children(".app_item").eq(t).is(".move") ){
                    var left = parseInt($(".main_area").children(".app_item").eq(t).offset().left);
                    var top = parseInt($(".main_area").children(".app_item").eq(t).offset().top)
                    $(".main_area").children(".app_item").eq(t).removeClass("ani_css3").css({
                        "left":left,
                        "top":top,
                        "marginLeft":"0px",
                        "marginRight":"0px"
                    }).addClass("fixed");
                // }
            }

            // 【 启动参数 】

            BEMOVENAME = "#move_item"                  ;   // 被操作元素
            MOVETYPE   = "true"                       ;   // 被操作类型
            EMPTYX     = 45 ;   // X 空白边距
            EMPTYY     = 45  ;   // Y 空白边距
        });



    },






    mouseupFunc : function(){

        $("#move_item").mouseup(function(){
            if( main_area_run_stat == true ){
                UI.mouseupDealFunc( intX , intY );
            }
            else{
                mouseupDealXY = { 
                    dealx:intX,
                    dealy:intY,
                    stat:true  
                }
            }
        });

    },






    mouseupDealFunc : function( dealX , dealY ){

        if( app_item_touch( dealX , intY , $(".main_area").offset().left , 0 , $(".main_area").get(0).clientWidth , $(".bottom_bg").offset().top ) ){

            // 【 清空 启动参数 】
            BEMOVENAME = null;  
            MOVETYPE   = null;  
            EMPTYX     = null;  
            EMPTYY     = null; 

            if( $(".after_mark").length>0 ){
                var NumBefore = $(".main_area").children(".app_item").index( $(".after_mark") );
                for (var i = 0; i < $(".main_area").children(".app_item").length+1; i++) {
                    if( i == NumBefore ){
                        // ... 增加进场动画 test
                        var aniLeft , aniTop ;
                        if( i-1 >= 0 ){
                            if( parseFloat($(".main_area").children(".app_item").eq(i).offset().top) == parseFloat($(".main_area").children(".app_item").eq(i-1).offset().top) ){
                                console.log("同行间隙");
                                aniLeft = $(".main_area").children(".app_item").eq(i).offset().left-160+35;
                                aniTop  = $(".main_area").children(".app_item").eq(i).offset().top+27;
                            }
                            else{
                                if( parseFloat($(".main_area").children(".app_item").eq(i).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                                    console.log("当前行首间隙");
                                    aniLeft = $(".main_area").children(".app_item").eq(i).offset().left-160+35;
                                    aniTop  = $(".main_area").children(".app_item").eq(i).offset().top+27;
                                }
                                else if( $(".main_area").get(0).clientWidth-160-parseFloat($(".main_area").children(".app_item").eq(i-1).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                                    console.log("上一行尾");
                                    aniLeft = $(".main_area").children(".app_item").eq(i-1).offset().left+160+35;
                                    aniTop  = $(".main_area").children(".app_item").eq(i).offset().top-145+27;
                                }
                            }
                        }
                        else{
                            if( parseFloat($(".main_area").children(".app_item").eq(i).css("left"))-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                                console.log("行首空隙");
                                aniLeft = $(".main_area").children(".app_item").eq(i).offset().left-160+35;
                                aniTop  = $(".main_area").children(".app_item").eq(i).offset().top+27;
                            }
                        }
                        $("#move_item").animate({left:aniLeft,top:aniTop},200,function(){
                            $(".opacity0").removeClass("opacity0");
                            $(".drag_win").removeClass("show");
                        });
                        // ... 增加进场动画 test
                        $(".main_area").children(".app_item").eq(i).before('<div class="app_item ani_css3 opacity0" draggable="false" ondragstart="return false">'+$("#move_item").html()+'</div>');
                        i++;
                        $(".main_area").children(".app_item").eq(i).css({
                            "left":"",
                            "top":"",
                            "marginLeft":"",
                            "marginRight":""
                        }).addClass("ani_css3").removeClass("fixed").removeClass("remove");
                    }
                    else{
                        $(".main_area").children(".app_item").eq(i).css({
                            "left":"",
                            "top":"",
                            "marginLeft":"",
                            "marginRight":""
                        }).addClass("ani_css3").removeClass("fixed").removeClass("remove");
                    }
                }

            }
            else{
                // console.log("在这里了")
                for (var i = 0; i < $(".main_area").children(".app_item").length ; i++) {
                    $(".main_area").children(".app_item").eq(i).css({
                        "left":"",
                        "top":"",
                        "marginLeft":"",
                        "marginRight":""
                    }).addClass("ani_css3").removeClass("fixed").removeClass("remove");
                }
                var aniLeft , aniTop ;
                if( $(".main_area").get(0).clientWidth-160-parseFloat($(".main_area").children(".app_item").eq($(".main_area").children(".app_item").length-1).offset().left)-parseFloat($(".main_area").css("paddingLeft")) >= 158 ){
                    console.log("行尾缝隙足够大，上一行补充");
                        aniLeft = $(".main_area").children(".app_item").eq($(".main_area").children(".app_item").length-1).offset().left+160+35;
                        aniTop  = $(".main_area").children(".app_item").eq($(".main_area").children(".app_item").length-1).offset().top+27;
                }
                else{
                    console.log("行尾没缝隙，下一行补充");
                        aniLeft = parseFloat($(".main_area").css("paddingLeft"))+35;
                        aniTop  = $(".main_area").children(".app_item").eq($(".main_area").children(".app_item").length-1).offset().top+145+27;
                }
                $("#move_item").animate({left:aniLeft,top:aniTop},200,function(){
                    $(".opacity0").removeClass("opacity0");
                    $(".drag_win").removeClass("show");
                });
                $(".main_area").append('<div class="app_item ani_css3 opacity0" draggable="false" ondragstart="return false">'+$("#move_item").html()+'</div>');
            }
            $(".after_mark").removeClass("after_mark");
            var sT = Math.abs($(".main_area").offset().top);
            $(".main_area").css({
                "left":"",
                "top":"",
                "width":"100%",
                "height":"100%"
            }).removeClass("fixed").scrollTop(sT);
            


        }
        else if( app_item_touch( dealX , dealY , $(".bottom_bar").offset().left , $(".bottom_bar").offset().top , $(".bottom_bar").width() , $(".bottom_bar").height() ) ){

            // 【 清空 启动参数 】
            BEMOVENAME = null;  
            MOVETYPE   = null;  
            EMPTYX     = null;  
            EMPTYY     = null; 

            if( $(".bottom_bar").children(".app_item").length < 11 ){

            	// test 2019.7.13 

            	// 1 在 底条添加 透明结果元素
            	if(      $(".scale2_space_l").length>0 ){
                    $(".scale2_space_l").eq(0).after('<div class="app_item ani_css3 opacity0 scale_max" draggable="false" ondragstart="return false">'+$("#move_item").html()+'</div>').removeClass("ani_css3").removeClass("scale2_space_l");
                    $(".scale2_space_r").removeClass("ani_css3").removeClass("scale2_space_r");
                }
                else if( $(".scale2_space_r").length>0 ){
                    $(".scale2_space_r").eq(0).before('<div class="app_item ani_css3 opacity0 scale_max" draggable="false" ondragstart="return false">'+$("#move_item").html()+'</div>').removeClass("ani_css3").removeClass("scale2_space_r");
                    $(".scale2_space_l").removeClass("ani_css3").removeClass("scale2_space_l");
                }
                // setTimeout(function(){  $(".bottom_bar").children(".app_item").addClass("ani_css3")  },10);

            	// 3 移动元素 animate 动画至透明结果元素处
            	$("#move_item").animate({left:$(".bottom_bar").children(".opacity0").offset().left,top:$(".bottom_bar").children(".opacity0").offset().top},200,function(){
            		$(".opacity0").removeClass("ani_css3").removeClass("opacity0");
            	    $(".drag_win").removeClass("show");
            	});
            	setTimeout(function(){  $(".bottom_bar").children(".app_item").addClass("ani_css3")  },10);

            	// test 2019.7.13 

                /*$(".drag_win").removeClass("show");
                if(      $(".scale2_space_l").length>0 ){
                    $(".scale2_space_l").eq(0).after('<div class="app_item ani_css3" draggable="false" ondragstart="return false">'+$("#move_item").html()+'</div>');
                }
                else if( $(".scale2_space_r").length>0 ){
                    $(".scale2_space_r").eq(0).before('<div class="app_item ani_css3" draggable="false" ondragstart="return false">'+$("#move_item").html()+'</div>');
                }
                $(".scale2_space_l").removeClass("scale2_space_l");
                $(".scale2_space_r").removeClass("scale2_space_r");
                $(".scale2").removeClass("scale2");
                $(".scale1").removeClass("scale1");*/

                // 补救主界面间隙程序
                for (var i = 0; i < $(".main_area").children(".app_item").length ; i++) {
                    $(".main_area").children(".app_item").eq(i).css({
                        "left":"",
                        "top":"",
                        "marginLeft":"",
                        "marginRight":""
                    }).addClass("ani_css3").removeClass("fixed").removeClass("remove");
                }
                var sT = Math.abs($(".main_area").offset().top);
                $(".main_area").css({
                    "left":"",
                    "top":"",
                    "width":"100%",
                    "height":"100%"
                }).removeClass("fixed").scrollTop(sT);

            }
            else{

                alert("Dock 底条位置已满，强制放在主界面后部");
                $(".scale2_space_l").removeClass("scale2_space_l");
                $(".scale2_space_r").removeClass("scale2_space_r");
                $(".scale2").removeClass("scale2");
                $(".scale1").removeClass("scale1");
                for (var i = 0; i < $(".main_area").children(".app_item").length ; i++) {
                    $(".main_area").children(".app_item").eq(i).css({
                        "left":"",
                        "top":"",
                        "marginLeft":"",
                        "marginRight":""
                    }).addClass("ani_css3").removeClass("fixed").removeClass("remove");
                }
                $(".drag_win").removeClass("show");
                $(".main_area").append('<div class="app_item ani_css3" draggable="false" ondragstart="return false">'+$("#move_item").html()+'</div>');
                var sT = Math.abs($(".main_area").offset().top);
                $(".main_area").css({
                    "left":"",
                    "top":"",
                    "width":"100%",
                    "height":"100%"
                }).removeClass("fixed").scrollTop(sT);
            }

                

        }
        mouseupDealXY.stat = false;

    },






    init : function(){                    // 【 统一由此处集中调用 】

        UI.bottomBar();
        UI.mainArea();
        UI.mouseupFunc();
    }
}






$(document).ready(function(){

    UI.init();
});






window.onresize = function(){  
    winWidth_reChange();
};
