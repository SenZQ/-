// JavaScript Document
























   /*-------------------------------------------------------------------------------------------------------------------------------------------------------*/

                                                                           /*    主事件    */

   /*-------------------------------------------------------------------------------------------------------------------------------------------------------*/
   
   

   


   

   

   /////////////////////////////////////////////////////////////////////////////////////////////////

   //  移动参数变量

   /////////////////////////////////////////////////////////////////////////////////////////////////

   

   // 【 鼠标坐标 相关 】

   var intX ;                              // 鼠标左边距

   var intY ;                              // 鼠标右边距


   
   // 【 被操作元素 相关 】

   var BEMOVENAME ;                        // 被操作元素

   var EMPTYX     ;                        // X 空白边距

   var EMPTYY     ;                        // Y 空白边距

   var TOTALX     ;                        // Width

   var TOTALY     ;                        // Height


   
   // 【 操作方式相关 】

   var MOVETYPE       ;                        // 移动 Move

   var HeightByTop    ;                        // 通过 Top     =>  Height

   var HeightByBottom ;                        // 通过 Bottom  =>  Height

   var WidthByLeft    ;                        // 通过 Left    =>  Width

   var WidthByRight   ;                        // 通过 Right   =>  Width

   

   


   

   

   /////////////////////////////////////////////////////////////////////////////////////////////////

   //  移动鼠标时执行的事件

   /////////////////////////////////////////////////////////////////////////////////////////////////


   $("body").mousemove(function(e){

        
      // 【 储存鼠标坐标 】

      intX = e.clientX;  
      intY = e.clientY;



      if(            MOVETYPE != null && BEMOVENAME != null && EMPTYX != null && EMPTYY != null ){

         $( BEMOVENAME ).offset({ left: intX - EMPTYX , top: intY - EMPTYY }); 

         // ---------------------------------------------------------------------------------------- 【 Move 】



      }
      else if(    HeightByTop != null && BEMOVENAME != null && EMPTYY != null && TOTALY != null ){

      	 $( BEMOVENAME ).css("height", TOTALY - ( intY - EMPTYY ) + "px" ).offset({top: intY - EMPTYY });

      	 // ---------------------------------------------------------------------------------------- 【 Top     =>  Height  】



      }
      else if( HeightByBottom != null && BEMOVENAME != null && EMPTYY != null && TOTALY != null ){

      	 $( BEMOVENAME ).css("height", intY - TOTALY - EMPTYY + "px" );

      	 // ---------------------------------------------------------------------------------------- 【 Bottom  =>  Height  】



      }
      else if(    WidthByLeft != null && BEMOVENAME != null && EMPTYX != null && TOTALX != null ){

      	 $( BEMOVENAME ).css("width", TOTALX - ( intX - EMPTYX ) + "px").offset({left: intX - EMPTYX });

      	 // ---------------------------------------------------------------------------------------- 【 Left    =>  Width   】



      }
      else if(   WidthByRight != null && BEMOVENAME != null && EMPTYX != null && TOTALX != null ){

      	 $( BEMOVENAME ).css("width", intX - TOTALX - EMPTYX + "px");

      	 // ---------------------------------------------------------------------------------------- 【 Right   =>  Width   】



      }
      
   });
























   /*-------------------------------------------------------------------------------------------------------------------------------------------------------*/

                                                                           /*    被操作模块    */

   /*-------------------------------------------------------------------------------------------------------------------------------------------------------*/

   

   


   

   

   /////////////////////////////////////////////////////////////////////////////////////////////////

   //  显示 / 隐藏 块功能层

   /////////////////////////////////////////////////////////////////////////////////////////////////

   $(function(){

   	  // --------------------------------------------------------------------------【 鼠标浮置模块 】

   	  $("#TheMove").mouseover(function(){

   	  	 $("#FuncitonLIST").show();
   	  });

   	  // --------------------------------------------------------------------------【 鼠标离开模块 】

   	  $("#TheMove").mouseout(function(){

   	  	 $("#FuncitonLIST").hide();
   	  });
   });

   

   


   

   

   /////////////////////////////////////////////////////////////////////////////////////////////////

   //  启动 / 关闭 拖拽移动

   /////////////////////////////////////////////////////////////////////////////////////////////////

   $(function(){

   	  // --------------------------------------------------------------------------【 鼠标长按模块 】

      $("#MoveBTN").mousedown(function(){

     	   // 【 防止溢出BG 】

     	   $("#MoveBG").show();

     	   // 【 关闭修改尺寸功能 】

     	   $(".ChangeSizePOSITION").hide();

     	   // 【 启动参数 】

     	   BEMOVENAME = "#TheMove"                         ;   // 被操作元素
         MOVETYPE   = "true"                             ;   // 被操作类型
         EMPTYX     = intX - $("#TheMove").offset().left ;   // X 空白边距
         EMPTYY     = intY - $("#TheMove").offset().top  ;   // Y 空白边距
      });

      // --------------------------------------------------------------------------【 鼠标松开模块 】

      $("#MoveBTN").mouseup(function(){

     	   // 【 隐藏溢出BG 】

     	   $("#MoveBG").hide();

     	   // 【 重启修改尺寸功能 】

     	   $(".ChangeSizePOSITION").show();
  
     	   // 【 清空 启动参数 】

     	   BEMOVENAME = null;  
         MOVETYPE   = null;  
         EMPTYX     = null;  
         EMPTYY     = null;  
      });

   });

   

   


   

   

   /////////////////////////////////////////////////////////////////////////////////////////////////

   //  通过拖拽 改变块的大小

   /////////////////////////////////////////////////////////////////////////////////////////////////

   $(function(){

   	  // --------------------------------------------------------------------【 由 Top 改变 Height 】

   	  // 【 启动 】

   	  $("#HeightBTN_top").mousedown(function(){

   	  	 // 【 防止溢出BG 】

     	   $("#HeightBTN_top").children(".ChangeSizeBG").show();

     	   // 【 启动参数 】

     	   BEMOVENAME     = "#TheMove";  
         HeightByTop    = "true";  
         TOTALY         = $("#TheMove").offset().top + $("#TheMove").height();  
         EMPTYY         = intY - $("#TheMove").offset().top;  
   	  });


   	  // 【 关闭 】

   	  $("#HeightBTN_top").mouseup(function(){

   	  	 // 【 隐藏溢出BG 】

     	   $("#HeightBTN_top").children(".ChangeSizeBG").hide();

   	  	 // 【 清空 启动参数 】

     	   BEMOVENAME     = null;  
         HeightByTop    = null;  
         TOTALY         = null;  
         EMPTYY         = null;  
   	  });





   	  // -----------------------------------------------------------------【 由 Bottom 改变 Height 】

   	  // 【 启动 】

   	  $("#HeightBTN_bottom").mousedown(function(){

   	  	 // 【 防止溢出BG 】

     	   $("#HeightBTN_bottom").children(".ChangeSizeBG").show();

     	   // 【 启动参数 】

     	   BEMOVENAME     = "#TheMove";  
         HeightByBottom = "true";  
         TOTALY         = $("#TheMove").offset().top;  
         EMPTYY         = intY - ( $("#TheMove").offset().top + $("#TheMove").height() );  
   	  });


   	  // 【 关闭 】

   	  $("#HeightBTN_bottom").mouseup(function(){

   	  	 // 【 隐藏溢出BG 】

     	   $("#HeightBTN_bottom").children(".ChangeSizeBG").hide();

   	  	 // 【 清空 启动参数 】

     	   BEMOVENAME     = null;  
         HeightByBottom = null;  
         TOTALY         = null;  
         EMPTYY         = null;  
   	  });





   	  // --------------------------------------------------------------------【 由 Left 改变 Width 】

   	  // 【 启动 】

   	  $("#WidthBTN_left").mousedown(function(){

   	  	 // 【 防止溢出BG 】

     	   $("#WidthBTN_left").children(".ChangeSizeBG").show();

     	   // 【 启动参数 】

     	   BEMOVENAME     = "#TheMove";  
         WidthByLeft    = "true";  
         TOTALX         = $("#TheMove").offset().left + $("#TheMove").width();
         EMPTYX         = intX - $("#TheMove").offset().left;  
   	  });


   	  // 【 关闭 】

   	  $("#WidthBTN_left").mouseup(function(){

   	  	 // 【 隐藏溢出BG 】

     	   $("#WidthBTN_left").children(".ChangeSizeBG").hide();

   	  	 // 【 清空 启动参数 】

     	   BEMOVENAME     = null;  
         WidthByLeft    = null;  
         TOTALX         = null;  
         EMPTYX         = null;  
   	  });





   	  // -------------------------------------------------------------------【 由 Right 改变 Width 】

   	  // 【 启动 】

   	  $("#WidthBTN_right").mousedown(function(){

   	  	 // 【 防止溢出BG 】

     	   $("#WidthBTN_right").children(".ChangeSizeBG").show();

     	   // 【 启动参数 】

     	   BEMOVENAME     = "#TheMove";  
         WidthByRight   = "true";  
         TOTALX         = $("#TheMove").offset().left;
         EMPTYX         = intX - ( $("#TheMove").offset().left + $("#TheMove").width() );  
   	  });


   	  // 【 关闭 】

   	  $("#WidthBTN_right").mouseup(function(){

   	  	 // 【 隐藏溢出BG 】

     	   $("#WidthBTN_right").children(".ChangeSizeBG").hide();

   	  	 // 【 清空 启动参数 】

     	   BEMOVENAME     = null;  
         WidthByRight   = null;  
         TOTALX         = null;  
         EMPTYX         = null;  
   	  });





   	  
   });
