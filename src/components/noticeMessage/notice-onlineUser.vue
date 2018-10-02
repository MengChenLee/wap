<template>
    <div class="app">
       <div class="header">
           <a class="headerBack" href="#" onClick="javaScript:history.go(-1)">
         <i class="mintui mintui-back left-icon"></i></a>
         <h1>托马斯</h1>
       </div>
<!--系统消息列表  -->
<div class="chatList">
        <div class="serviveUser ks-clear">
        <img src="../../assets/m1.jpg" alt="">
                <div class="chatinfo">
               老铁，今天有事情吗，带你吃饭去

                </div>
        </div>


 <div class="adminUser ks-clear">
        <img src="../../assets/m4.jpg" alt="">
                <div class="chatinfo">
               托马斯，今天晚上到哪玩呀？

                </div>
        </div>

</div>




<div class="footer">
    <input type="text">
    <button>发送</button>
</div>

  


    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.app{
    background-color: black;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 50px;
    padding-bottom: 40px;
 


}
.header {
     width: 100%;
     height: 50px;
     text-align: center;
     line-height: 50px;
     font-size: 14px;
     color: white;
     position: fixed;
     z-index: 666;
     background-color: black;
     border-bottom: 1px solid rgba(209, 201, 201, 0.3);
     top: 0;
     left: 0;
     
 }
 .headerBack{
     width: 40px;
     height: 41px;
     position: absolute;
     left: 0;
     top: 0;
     
 }
  .headerBack i{
      font-size: 20px;
      color: white;
  }
  .header h1{
      font-weight: 600;
      font-size: 16px;
  }
  

 .footer{
    
     width: 100%;
     height: 40px;
     text-align: center;
     line-height: 40px;
     font-size: 14px;
     color: white;
     position: fixed;
     background-color: #000;
     z-index: 666;
     border-top: 1px solid rgba(209, 201, 201, 0.3);
     bottom: 0;
     left: 0;
     

 }
 .footer input{
     width: 70%;
     height: 30px;
     background-color: rgba(209, 201, 201, 0.2);
     border: none;
     outline: none;
     color: white;
     text-indent: 10px;
 }
 .footer button{
     width: 40px;
     height: 30px;
     border: none;
    position: absolute;
    right: 2%;
    top: 5px;
    background-color: #EF2B3A;
    color: white;
    font-size: 10px;
    font-family:Microsoft Yahei;
 }
 .chatList{
     
     width: 100%;
     height: 100%;
     padding: 10px;
     box-sizing: border-box;
    
 }
 .serviveUser {
   
   width: 100%;
   
   
 }
 .serviveUser img{
     width: 50px;
     height: 50px;
     float: left;
     
 }
 
.serviveUser .chatinfo{
    width: 70%;
    float: left;
    background-color: #DDEDFB;
    margin-left: 20px;
    border-radius: 5%;
    padding: 10px;
    position: relative;
    
    
    
}




.adminUser{
    margin-top: 20px;
     width: 100%;
}

.adminUser img{
     width: 50px;
     height: 50px;
     float: right;
}
.adminUser .chatinfo{
    width: 70%;
    float: right;
    background-color: #DDEDFB;
    margin-right: 20px;
    border-radius: 5%;
    padding: 10px;
    position: relative;
}

</style>
