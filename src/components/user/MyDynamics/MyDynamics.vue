<template>
    <div class="APP">
 <!-- 这是我的账户的页面-->





   <div class="container">

<div class="package">

<header class="mint-header">
    <div class="mint-header-button is-left">
        <router-link to="/my">
        <!-- <a href="recharge" class="router-link-active"> -->
        <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon">
                <i class="mintui mintui-back"></i>
                </span> <label class="mint-button-text">
                    </label>
        </button>
        <!-- </a> -->
        </router-link>
        <div class="personal">
            <router-link to="/information">
            个人
            </router-link>
        </div>
        </div> <h1 class="mint-header-title">我的动态</h1> <div class="mint-header-button is-right">
    </div>
</header>

<ul>
    <li>

<div class="top">
    <div class="TopLeft">
        <img src="../../../assets/7.jpg" alt="">
    </div>
    <p>诗情画意的名字</p>
    <p>2018.07.26  14:45</p>
    <div class="TopRight">
    <span class="red   ">+100.00元</span>
    </div>
</div>
<span>这里是发布的内容，游戏太好玩了，很有趣，特别喜欢，是一种竞技类的游戏，比养成类有意思多了</span>

<div class="bottom">
    <img src="../../../assets/9.jpg" alt="">
    <img src="../../../assets/10.jpg" alt="">
    <img src="../../../assets/11.jpg" alt="">
</div>
    </li>

        <li>

<div class="top">
    <div class="TopLeft">
        <img src="../../../assets/7.jpg" alt="">
    </div>
    <p>诗情画意的名字</p>
    <p>2018.07.26  14:45</p>
    <div class="TopRight">
    <span>+0元</span>
    </div>
</div>
<span>这里是发布的内容，游戏太好玩了，很有趣，特别喜欢，是一种竞技类的游戏，比养成类有意思多了</span>

<div class="bottom">
    <img src="../../../assets/9.jpg" alt="">
    <img src="../../../assets/10.jpg" alt="">
    <img src="../../../assets/11.jpg" alt="">
</div>
    </li>
</ul>











   







    <input type="submit" value="发布动态" class="next">




    </div>




   

   </div>




    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.mint-header{
    background-color: #000;
   font-size: 18px;
   margin-bottom: 4%;
   position: relative;
}


.APP{
    height: 100%;
    width: 100%;
}

.container{
    height: 100%;
    background-color: #000;

}

.personal{
    position: absolute;
    top: 3px;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: skyblue;
    font-size: 14px;
    line-height: 30px;
}

.package{
    padding: 10px;
    color: #fff;
    position: relative;
}
.company-recharge{
    height: 90px;
    border-radius: 3px;
    position: relative; 
}



.next{
    background: none;
    outline: none;
    position: fixed;
    left: 2.5%;
    bottom: 2%;
    width: 95%;
    height: 50px;
    background-color: #EF2B3A;
    color: #fff;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    
}
ul li{
    margin-top: 8%;
    border-bottom: 1px solid #323232;
}

.top{
    width: 100%;
    height: 70px;
   
    position: relative;
    padding-left: 86px;
    padding-right:100px;
    box-sizing: border-box;
    margin-bottom: 3%;
   
}
.top p{
    line-height: 30px;
}

.TopLeft{
position: absolute;
top: 0;
left: 0;
width: 70px;
height: 70px;
/* background:url("../../assets/7.jpg");
background-size: 100% 100%; */
border-radius: 50%;
}
.TopLeft img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.TopRight{
    position: absolute;
    top: 0;
    right: 0;
  
    width:100px;
    height: 100%;
    line-height: 70px;
    font-size: 20px;
  
}

.red{
  color: #AC222C;
}

span{
    line-height: 24px;
 
}
.bottom{
    margin-bottom: 3%;
}
.bottom img{
    width: 30%;
    height: 80px;
    
}
.bottom img:nth-child(2){
    margin-left: 3%;
    margin-right: 3%;
}
</style>

