<template>
   <div class="app">
        <div class="header">
               <a href="#" onClick="history.go(-1)">
         <i class="mintui mintui-back left-icon"></i>
         </a>
        
        <div class="content" v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
          <h2>{{anwser.question}}</h2>
          <p>{{anwser.answer}}</p>
        </div>

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
            questionInfo:[],
            anwser:{}
        }
    },
    methods:{
        
      getInfo(){
          
          api.queryQuestionAnswerByType({
              type:1
          }).then(({status, data = {}}) => {
                   if(data.success==true){
                    this.loading2=false;
                    this.questionInfo=data.data.rows;
                    for(var i=0;i<this.questionInfo.length;i++){
                        if(this.questionInfo[i].qaId==this.$route.params.qaId){
                            this.anwser=this.questionInfo[i];
                         
                            
                        }
                    }
                   }
             
                   });
      }
    },
    created(){
        this.getInfo();
       
    }
};
</script>

<style scoped>
.app{
    padding: 0 10px;
    position: relative;
}
.header{
     width: 100%;
    height: 50px;
    position: relative;
    border-bottom: 1px solid #ccc;
}
.header a{
    position: absolute;
    width: 44px;
    height: 44px;
    top: 3px;
    left: 3px;
    line-height: 44px;
    text-align: center;

}
.content{
    width: 100%;
    position: absolute;
    top: 70px;
}
.content h2{
    width: 100%;
    height: 30px;
    font-size: 15px;
     color: #fff;

}
.content p{
    margin-top: 30px;
    color: #fff;
    font-size: 14px;
    text-indent: 20px;
    word-spacing: 30px;
}
.content span{
    color:blue;
}
</style>
