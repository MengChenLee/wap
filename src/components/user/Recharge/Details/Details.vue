<template>
    <div class="app">
     <!-- 个人信息轮播图 -->
     <div class="banner">
          <a href="#" onClick="javaScript:history.go(-1)">
         <i class="mintui mintui-back left-icon"></i></a>
            <mt-swipe :auto="4000">
                
                <mt-swipe-item><img src="../../../../assets/1-1.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../../../../assets/1-2.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../../../../assets/1-3.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../../../../assets/1-4.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../../../../assets/1-5.jpg" alt=""></mt-swipe-item>               
            
            </mt-swipe>
        </div>


<div class="container">

<div class="Toper">

<div class="ToperLeft">
    <img src="../../../../assets/1-4.jpg" alt="">
</div>

<div class="ToperMain">
    <p>诗情画意的名字</p>
    <span class="line">大眼美女</span>
    <span class="line">白富美</span>
    <span class="line">萌新</span>
</div>
<div class="ToperRight">
    <span>收藏</span>
</div>
</div>


<div class="info">
<p>个人简介</p>
<span>
    西北从军多年。历任文书、班长、报道员、文化教员、军事记者、报刊主表
    、央视（军事频道）驻站记者、编导、新华社（新华军事）特约记者、文化娱乐部主任等职
    。容立二等功1次，三等功7次，各类嘉奖和表彰30余次。
</span>
</div>


<p>相关动态</p>

<ul>
    <li class="Relevant">
        <div class="RelevantTop">
            <img src="../../../../assets/1-4.jpg" alt="">
            <span>诗情画意的名字</span>
            <i class="time">2018.01.24 12:12</i>
        </div>

        <span>这个游戏太好玩了，大爱大爱、因为他的场景、任务设计都特别的用心，良心之作~</span>
        <div class="RelevantPic">
            <img src="../../../../assets/9.jpg" alt="">
            <img src="../../../../assets/10.jpg" alt="">
             <img src="../../../../assets/11.jpg" alt="">
        </div>
    </li>
    <li class="Relevant">
        <div class="RelevantTop">
            <img src="../../../../assets/1-4.jpg" alt="">
            <span>诗情画意的名字</span>
            <i class="time">2018.01.24 12:12</i>
        </div>

        <span>这个游戏太好玩了，大爱大爱、因为他的场景、任务设计都特别的用心，良心之作~</span>
        <div class="RelevantPic">
            <img src="../../../../assets/9.jpg" alt="">
            <img src="../../../../assets/10.jpg" alt="">
             <img src="../../../../assets/11.jpg" alt="">
        </div>
    </li>
</ul>


    <input type="submit" value="发起聊天">


</div>




  

 



    </div>
</template>

<script>

export default {
data () {
    return {

    }
}

}
</script>

<style scoped>
.app{
    width: 100%;
    height: 100%;
    border: 3px solid #363535;
    box-sizing: border-box;
}
.banner{
     width: 100%;
     height: 300px;
     position: relative;
     background-color: #ccc;
     
 }
 .banner img{
     display: block;
     width: 100%;
     height:300px;
   
 }
 .banner a{
    
     width: 30px;
     height: 30px;
     display: block;
     line-height: 30px;
     text-align: center;
     z-index: 666;
     position: absolute;
     left: 0;
     top: 0;
     
 }
 .banner a i{
       width: 30px;
       height: 30px;
       display: block;
       font-size: 20px;
       color: black;
 }
 .container{
     width: 100%;
     box-sizing: border-box;
     padding: 10px 10px 40px 10px;
     color: #B8B8B7;
     background-color: #111111;


 }

p{
    font-size: 18px;
}
.Toper{
    width: 100%;
    height: 80px;
    background-color: #111111;
    position: relative;
}

.ToperLeft{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    top: 15%;
    left: 0;
  
}
.ToperLeft img{
    width: 100%;
    height: 100%;
        border-radius: 50%;
}

.ToperMain{
    width: 200px;
    height: 60px;
    background-color: #111111;
    position: absolute;
    top: 15%;
    left: 22%;
}
.ToperMain p{
    line-height: 37px;
}
.ToperMain span{
    margin-right: 2px;
}
.line{
    border: 1px solid #706D6E;
    border-radius: 3px;
    padding: 2px;
    box-sizing: border-box;
}

.ToperRight{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 20%;
    right: 0;
}


.info{
    width: 100%;
    height: 100px;
    background-color: #111111;
    margin-top: 4%;
    color: #fff;
}

.Relevant{
    width: 100%;
    height: 100%;
    margin-bottom: 5%;
}

.RelevantTop{
    width: 100%;
    height: 50px;

    position: relative;
    line-height: 50px;
    margin-bottom: 2%;
}
.RelevantTop img{
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.RelevantTop span{
    font-size: 16px;
    position: absolute;
    left: 19%;
}

.RelevantTop .time{
    font-size: 12px;
    position: absolute;
    right: 1%;
}

.RelevantPic{
    width: 100%;
    height: 100px;

}
.RelevantPic img{
    width: 32.5%;
    height: 100%;
}

input{
    width: 97%;
    height: 50px;
    background-color: #EF2B3A;
    color: #fff;
    font-size: 18px;
    position: fixed;
    left: 1.5%;
    bottom: 0;
    z-index: 666;
    outline: none;
    border: none;
    border-radius: 3px;
}

</style>
