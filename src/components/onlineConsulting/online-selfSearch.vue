<template>
    <div class="app" >
        <div class="header">
            <h1>充值提现问题</h1>
          <a href="#" onClick="history.go(-1)">
         <i class="mintui mintui-back left-icon"></i>
         </a>
        </div>
         <h1 class="tip">你可能遇到了以下问题</h1>

        <div class="questionList">
            <ul class="clear">
                <li v-for="(v,i) in questionInfo" :key="i">
                    <router-link :to="{path:'/onlineQuestionInfo/'+v.qaId}">{{v.question}}
                    <i class="mintui mintui-back left-icon"></i> </router-link>
                    <a href="/onlineQuestionInfo">
                    </a>
                </li>
           
           
            </ul>
        </div>


    </div>
</template>

<script>
import api from '../../service/api.js'
export default {
    data(){
        return{
            loading2:true,
            //问题数据
            questionInfo:''
        }
    },
    methods:{
        
      getInfo(){
          
          api.queryQuestionAnswerByType({
              type:1
          }).then(({status, data = {}}) => {
                   if(data.success==true){
                    this.loading=true;
                    this.questionInfo=data.data.rows
                    
                   }
             
                   });
      }
    },
    created(){
        this.getInfo()
    }
};
</script>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  background: #111111;
  position: relative;
}
.header {
  position: relative;
  width: 100%;
  height: 50px;
  color: white;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  border-bottom: 1px solid rgba(233, 232, 231,.3)
}
.header a {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  color: #fff;
}
.header a i {
  width: 50px;
  height: 50px;
  display: block;
  font-size: 20px;
}
.tip{
    text-indent: 15px;
    width: 100%;
    height: 50px;
    color: rgba(255, 255, 255,.3);
    line-height: 50px;
}
.questionList li{
  border-top: 1px solid #545454;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-indent: 15px;
    background-color: #262626;
   
}
.questionList a{
    display: block;
    width: 100%;
    height: 100%;
 color: #C5C5C5;
}
.questionList a i{
    float: right;
    transform: rotate(180deg)
}

</style>
