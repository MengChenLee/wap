<template>

    <div class="app">
    
    <div class="container">
 
    <!-- 头部的部分 -->
    <header class="mint-header">
        <div class="mint-header-button is-left">
            <router-link to="/my">
            <button class="mint-button mint-button--default mint-button--normal">
                <span class="mint-button-icon">
                    <i class="mintui mintui-back"></i>
                    </span> <label class="mint-button-text">
                </label>
                </button>
              </router-link>
            </div>
            <span class="mint-header-title">实名认证</span>
            <div class="mint-header-button is-right">
            </div>
    </header>

    <div class="Tip" v-show="TipBoxShow">
        <img src="../../assets/person/person-13.png" alt="">
        <span>认证失败！{{ErrorTip}}</span>
    </div>


    <!-- 主体的部分 -->

    <div class="Uncertified">
    
        <!-- 真实姓名的输入框  -->
    <p class="Name">真实姓名</p>
    <div class="NameTip" v-show="NameShow">
        <span>{{NameTip}}</span>
    </div>
    <input type="text" placeholder="请输入真实姓名" class="NAmes" v-model="NameInput" @focus="NameFocus()">
        <!-- 身份证号的输入框  -->
    <p class="Name">身份证号</p>
    <div class="NumberTip" v-show="NumberShow">
        <span>{{NumberTip}}</span>
    </div>
    <input type="text " placeholder="请输入身份证号" class="NumberID" v-model="NumberInput" @focus="NumberFocus()">
        <!-- 身份证号的输入框  -->
    <p class="Upload" v-show="Upshow">上传证件</p>



            <!-- 左边的添加身份证的正面  -->
    <div class="UploadLeft" v-show="LeftShow">

    <el-upload
        class="avatar-uploader"
        action="http://up-z0.qiniu.com"
        list-type='picture'
        accept="image/jpeg,image/gif,image/png,image/bmp"        
        :show-file-list="false"
        :on-success="handleAvatarSuccessLeft"
        :before-upload="beforeAvatarUpload"
        :data="qiniu">
        <img v-if="imageUrlLeft" :src="imageUrlLeft" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    </div>


            <!-- 右边的添加身份证的反面  -->    
    <div class="UploadRight" v-show="RightShow">

    <el-upload
        class="avatar-uploader"
        action="http://up-z0.qiniu.com"
        list-type='picture' 
        accept="image/jpeg,image/gif,image/png,image/bmp"                 
        :show-file-list="false"
        :on-success="handleAvatarSuccessRight"
        :before-upload="beforeAvatarUpload"
        :data="qiniu">
        <img v-if="imageUrlRight" :src="imageUrlRight" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    </div>


            <!-- 上传的底部提示  --> 
    <div class="tit" v-show="TitShow">
        <span class="titLeft">上传身份证正面</span>
        <span class="titRight">上传身份证反面</span>
    </div>

            <!-- 底部的上传按钮  --> 

<button class="uploading"  v-show="IsOriginHei" @click="UploadClick" ref="Uplod">上传</button>
<button class="ReUpload" v-show="ReUploadShow" @click="ReviewAgainClick">重新上传</button>
    </div>



            <!-- 审核中的遮罩层  --> 

<div class="mask" v-show="MaskShow">


</div>
    

 <button class="Auditing" v-show="AuditShow" >审核中</button>

</div>
  
</div>
    
  
    
</template>
    
<script>
     
import api from '../../service/api.js'
export default {
    
    data(){
        return {
            show:true,
            NameShow:false,
            NumberShow:false,
            IsOriginHei: true,
            AuditShow:false,
            MaskShow:false,
            BoxShow:true,
            NameInput:'',
            NumberInput:'',
            LeftShow:true,
            RightShow:true,
            TitShow:true,
            Upshow:true,
            TipBoxShow:false,
            ReUploadShow:false,
            screenHeight: document.documentElement.clientHeight, 
            originHeight: document.documentElement.clientHeight, 
            imageUrlLeft: require('../../assets/person/person-15.png'),
            imageUrlRight:require('../../assets/person/person-14.png'),
            qiniu:{
                 token:'',
                 URL:''
                 },
            datailLeftImg:[],
            datailRightImg:[],
            NameTip:"",
            NumberTip:'',
            repeat:'',
            ErrorTip:''
        }
     
    },
    created(){
            this.gettoken(),
            this.getInfo()
    },
    computed:{
          qiniuUrl:function () {
        return this.$store.state.qiniuUrl
      }
  },
// 监听事件  判断页面的大小 由此判断确定按钮的显示隐藏
    mounted(){
            let self = this;
            window.onresize = function(){
                return (function(){
                    self.screenHeight = document.documentElement.clientHeight;
                })()
            }
    },
    watch:{
            screenHeight(val){
                if(this.originHeight> val ){
                    this.IsOriginHei = false;
                }else{
                    this.IsOriginHei = true
                }
            }
    },

// 点击上传图片
    methods:{
        getInfo:function(){
            api.getidauthinfo({
            memberId:JSON.parse(localStorage.getItem("memberId")),
             accessToken:JSON.parse(localStorage.getItem("accessToken")),
            }).then(({data={}})=>{
                if(data.success =true){
                console.log(data);
                // console.log(data.data[0].identityNo);
                this.repeat = data.data[0].identityNo
                
// 上传审核中的样式
                if(data.data[0].status==0){
                this.NameInput = data.data[0].name;
                this.NumberInput = data.data[0].identityNo;
                this.imageUrlLeft = data.data[0].identityBackUrl;
                this.imageUrlRight = data.data[0].identityFrontUrl;
                this.MaskShow = true;
                this.AuditShow = true;
                this.IsOriginHei = false  
                }
                
                
//上传成功之后的样式 
                if(data.data[0].status==1){
                   this.NameInput = data.data[0].name;
                   this.NumberInput = data.data[0].identityNo.replace(/(.{3}).*(.{4})/,"$1***********$2");
                   this.LeftShow = false
                   this.RightShow = false
                   this.TitShow = false
                   this.IsOriginHei = false
                   this.Upshow = false
                   this.MaskShow = true
                }



// 上传失败时的样式
                if(data.data[0].status==-1){
                this.TipBoxShow = true  
                this.NameInput = data.data[0].name
                this.NumberInput = data.data[0].identityNo
                this.imageUrlLeft = data.data[0].identityBackUrl
                this.imageUrlRight = data.data[0].identityFrontUrl
                this.IsOriginHei = false             
                this.ReUploadShow = true    
                this.ErrorTip = data.data[0].comments
                }

                }

                
            })

        },
        NameFocus:function(){
                this.$refs.Uplod.style.backgroundColor = "#ef2b3a"
                this.$refs.Uplod.style.color = "#ffffff"
        },
        NumberFocus:function(){
                this.$refs.Uplod.style.backgroundColor = "#ef2b3a"
                this.$refs.Uplod.style.color = "#ffffff"
        },
    handleAvatarSuccessLeft(value, fil,raw,index) {
        const path = this.qiniuUrl + '/' + value.key;    
        this.imageUrlLeft = path
        console.log(this.imageUrlLeft);
        if(index !=undefined){
           this.$set(this.datailLeftImg,index,path) 
        }else{
            this.datailLeftImg.push(path)      
            console.log(this.datailLeftImg);  
        }
      },   
    handleAvatarSuccessRight(value, fil,raw,index){
        const pathRight = this.qiniuUrl + '/' + value.key;  
        this.imageUrlRight = pathRight 
        console.log(this.imageUrlRight);
        if(index !=undefined){
           this.$set(this.datailLeftImg,index,pathRight) 
        }else{
            this.datailRightImg.push(pathRight) 
            console.log(this.datailRightImg);            
        }        
    },

    beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg/png/GIF';
        const isLt2M = file.size / 1024 / 1024 < 2;  
    },
    gettoken(){
    api.getToken().then(({status,data = {}}) =>{
      if(data.success == true){
        console.log(data);
      this.qiniu.token = data.data.token
      }
    }) 
    },
    // 第一次上传信息 进行验证
    UploadClick(){
        // 正则验证身份证的18位数字
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        // 正则验证姓名      
        var name = /^[\u4e00-\u9fa5]{2,4}$/;
       if(this.NameInput==""){
           this.NameShow = true
           this.NameTip = "姓名不能为空！"
           return setTimeout(() =>{
               this.NameShow = false
           },2000)
       }else if(name.test(this.NameInput)===false){
            this.NameShow = true  
           this.NameTip = "请输入正确的姓名"            
            return setTimeout(() =>{
               this.NameShow = false
           },2000)        

       }else if(this.NumberInput==""){
            this.NumberShow = true
            this.NumberTip = "身份证号不能为空"
           return setTimeout(() =>{
               this.NumberShow = false
           },2000)
       }else if(reg.test(this.NumberInput)===false){
           this.NumberShow = true
           this.NumberTip = "请输入正确的身份证号！"
           return setTimeout(() =>{
               this.NumberShow = false
           },2000)
       }else if(this.NumberInput==this.repeat){
           this.NumberShow = true
           this.NumberTip = "身份证号已被使用，请换取身份证号上传！"
           return setTimeout(() =>{
               this.NumberShow = false
           },2000)
       }else if(this.datailLeftImg=='' || this.datailRightImg == ''){
           console.log("空的");
       }else{
           api.addidentity({
               name:this.NameInput,
               identityNo:this.NumberInput,
               identityFrontUrl:this.imageUrlLeft,
               identityBackUrl:this.imageUrlRight,
               memberId:JSON.parse(localStorage.getItem("memberId")),
            accessToken:JSON.parse(localStorage.getItem("accessToken")),
           }).then(({data={}}) =>{
               if(data.success = true){
                   console.log(data);
                   
                 if(data.data.status==0){
                return setTimeout(() =>{
                this.IsOriginHei = false,
                this.AuditShow = true,
                this.MaskShow = true
                this.getInfo()
                 },1000)
                 }  
               }
              
               
           })
       }


        
    },
    // 第二次发送信息  再次进行认证
    ReviewAgainClick(){
        // 正则验证身份证的18位数字
        console.log(this.NameInput);
        console.log(this.NumberInput);
        console.log(this.imageUrlLeft);
        console.log(this.imageUrlRight);
        
        
        
        
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        // 正则验证姓名      
        var name = /^[\u4e00-\u9fa5]{2,4}$/;
       if(this.NameInput==""){
           this.NameShow = true
           this.NameTip = "姓名不能为空！"
           return setTimeout(() =>{
               this.NameShow = false
           },2000)
       }else if(name.test(this.NameInput)===false){
            this.NameShow = true  
           this.NameTip = "请输入正确的姓名"            
            return setTimeout(() =>{
               this.NameShow = false
           },2000)        

       }else if(this.NumberInput==""){
            this.NumberShow = true
            this.NumberTip = "身份证号不能为空"
           return setTimeout(() =>{
               this.NumberShow = false
           },2000)
       }else if(reg.test(this.NumberInput)===false){
           this.NumberShow = true
           this.NumberTip = "请输入正确的身份证号！"
           return setTimeout(() =>{
               this.NumberShow = false
           },2000)
      }
    //else if(this.NumberInput==this.repeat){
    //        this.NumberShow = true
    //        this.NumberTip = "身份证号已被使用，请换取身份证号上传！"
    //        return setTimeout(() =>{
    //            this.NumberShow = false
    //        },2000)
    //    }
    // else if(this.datailLeftImg=='' || this.datailRightImg == ''){
    //        console.log("空的");
    //    }
       else{
           api.addidentity({
               name:this.NameInput,
               identityNo:this.NumberInput,
               identityFrontUrl:this.imageUrlLeft,
               identityBackUrl:this.imageUrlRight,
               memberId:JSON.parse(localStorage.getItem("memberId")),
            accessToken:JSON.parse(localStorage.getItem("accessToken")),
           }).then(({data={}}) =>{
               if(data.success = true){
                   console.log(data);
                   
                 if(data.data.status==0){
                return setTimeout(() =>{
                this.IsOriginHei = false,
                this.ReUploadShow = false,
                this.TipBoxShow = false
                this.AuditShow = true,
                this.MaskShow = true
                 },1000)
                 }  
               }
              
               
           })
       }        
    }
}
    

}
    
</script>
    
<style scoped>
* {
     margin: 0;
     padding: 0;
}
.app{
    width: 100%;
    height: 100%;
    background-color: #111111;
}
.container{
    width: 100%;
    height: 100%;

}
.mint-header{
    background-color: #111111;
    font-size: 16px;
    letter-spacing: -1px;
	color: #fefefe;
    padding: 10px;
    box-sizing: border-box;
    
}



.Name{
    line-height: 60px;
    letter-spacing: 0px;
	color: #fffefe;
    font-size: 16px;
}
.NAmes{
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #545454;
    background-color: #111111;
    letter-spacing: 0px;
    font-size: 16px;
    text-indent: 10px;
    letter-spacing: 0px;
	color: #ffffff;
}
.NumberID{
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #545454;
    background-color: #111111;
    letter-spacing: 0px;
	color: #cccccc;
    font-size: 16px;
    text-indent: 10px;
}
.Upload{
    margin-top: 20px;
    line-height: 35px;
    letter-spacing: 0px;
	color: #fffefe;
    font-size: 16px; 
}




.Uncertified{
    width: 100%;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
}
.Uncertified .UploadLeft{
    width: 45%;
    float: left; 
}
.Uncertified .UploadRight{
    width: 45%;
    float: right; 
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 110px;
    text-align: center;
}
.avatar {
    width: 100%;
    height: 110px;
    display: block;
}
.tit{
    width: 100%;
    height: 40px;
    margin-top: 120px;
    font-size: 16px;
    letter-spacing: 0px;
	color: #bbbbbb;
}
.tit .titLeft{
    width: 50%;
    line-height: 40px;
    float: left;
    text-align: center;
}
.tit .titRight{
    width: 50%;
    line-height: 40px;
    float: right;
    text-align: center;
}

.uploading{
    width: 95%;
    height: 50px;
    font-size: 16px;
    background-color: #5b111b;
	border-radius: 4px;
    letter-spacing: 1px;
	color: #606060;
    font-family: PingFang-SC-Medium;
	font-weight: normal;
	font-stretch: normal;
    position: fixed;
    left: 2.5%;
    bottom: 10px;
}
.ReUpload{
    width: 95%;
    height: 50px;
    border-radius: 4px;
    background-color: #ef2b3a;
    position: fixed;
    bottom: 10px;
    left: 2.5%;
    font-size: 16px;
    font-family: PingFang-SC-Medium;    
    font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #ffffff;
}
.Auditing{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    background-color: #ffb966;
    font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
}

.NameTip{
    width: 50%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    background-color: #000;
    position: absolute;
    top: 20px;
    right: 20px;
}
.NumberTip{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    background-color: #000;
    position: absolute;
    top: 123px;
    right: 0;
}

.mask{
    width: 100%;
    height: 93%;
    background-color:#111;
    position: fixed;
    bottom: 0;
    left: 0;
    opacity: 0.1;
    z-index: 10;
}

.Tip{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #aea182;
    padding-left: 30px;
    box-sizing: border-box;
    font-family: PingFang-SC-Medium;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ffffff;
    position: relative;
}
.Tip img{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 8px;
    left: 7px;
}
</style>
    
