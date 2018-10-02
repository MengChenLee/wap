<template>
    <div class="app">
       <div class="header">
           <a class="headerBack" href="#" onClick="javaScript:history.go(-1)">
         <i class="mintui mintui-back left-icon"></i></a>
         <h1>系统消息</h1>
       </div>
<!--系统消息列表  -->
<div class="container">
<div class="systermNoticeList">
     <span>今天 14：00</span> 
     <div class="info">
         <h1>系统维护通知</h1>
            <p>
           公司为此成立了客服部门，长期与客户保持沟通，共同发展。
           The company established service section, long-term
           and customer to keep a communication for this, common
           development. weike.taskcn.com2组织客服团队进行有效的订单
           管理和客户服务管理，为客户提供良好的服务。Organize the customer
           service team for the order management and after sales service
           to provide good service to customer.www.itpub.net
            </p>
     </div>


  </div>
<div class="systermNoticeList">
     <span>2018-8-18 09:10</span> 
     <div class="info">
         <h1>体现到账成功</h1>
            <p>
          亲爱的用户您好，您于2018年8月18日 21:02分申请体现已成功到账，体现金额20000元，详情请点击查看...
            </p>
     </div>


  </div>

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
    padding-top: 40px;
 


}
.header {
     width: 100%;
     height: 40px;
     text-align: center;
     line-height: 40px; 
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
  

  .container{
      width: 100%;
      height: 100%;
      overflow:scroll;
     
  }
  .systermNoticeList{
      margin-top: 10px;
      

  }
   .systermNoticeList span{
       color: #ccc;
       display: block;
       text-align: center;
       
   }
   .info{
       width: 90%;
       background-color:#262626;
       color: #ccc;
       padding: 15px;
       margin-left:5%;
       margin-top: 20px;
       box-sizing: border-box;
       border: 1px solid rgba(255, 255, 255, 0.3);
      
       
   }
   .info p{
       margin-top: 20px;
   }
</style>
