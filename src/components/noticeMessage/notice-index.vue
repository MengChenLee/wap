
  <!--
   title:消息主页
   content：系统通知 在线客服  用户聊天
   data:2018-8-22
   author:wangzichen
   -->
<template>
    <div class="app">
      <div class="header publicFlex">
        <span class="backBtn"><a href="#" onClick="javaScript:history.go(-1)"><img src="../../assets/nav_button_back@2x.png" alt=""></a></span>
        <span class="headerRes">消息</span>
        <span class="flexClear imgIcon"><a href="#" onClick="javaScript:history.go(-1)"><i class="positionCenter"></i></a></span>
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
}
.header{
  box-shadow: inset 0 -0.5px 0 0 #545454;
}
.imgIcon{
  position: relative;
}
.imgIcon i{
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #cccccc;
  box-shadow:-10px 0px 0px #ccc;
}
.imgIcon i:after{
  content: '';
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #cccccc;
}
  /* 系统消息及客服界面部分 */
  .systermMessage{
      z-index: 1;
      width: 100%;
      height: 70px;
      background-color: #262626;
      margin-top: 10px;
      position: relative;
      border-bottom: 1px solid rgba(206, 204, 204, 0.4);
  }
  .servive{
      margin: 0;
  }
  .imgBox{
     width: 50px;
     height: 50px;
     position: absolute;
      top: 10px;
      left: 10px;
  }
  .imgBox img{
      width: 50px;
      height: 50px;
      position: absolute;
      
  }
  .imgBox i{
      width: 10px;
      height: 10px;
      position: absolute;
      border-radius: 50%;
      background-color: #EF2B3A;
      right: -3px;
      top: -3px;

  }
  .systermMessageBox{
      height: 70px;
      padding-left: 70px;
      position: relative;
     
  }
  .systermMessageBox>h1{
      color: white;
      font-size: 14px;
      position: absolute;
      left: 80px;
      top: 5px;
  }
   .systermMessageBox>span{
       color: white;
       position: absolute;
       left: 80px;
       bottom: 15px;
       font-size: 13px;
       color:#ccc;
   }
   .systermMessageBox>h2{
       color: white;
       position: absolute;
       right: 15px;
       top: 50%;
       transform: translateY(-50%);
       font-size: 10px;
       font-weight: 300;
       color: #ccc;
   }
</style>
