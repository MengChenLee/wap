
//设置cookie
export default{
  setCookie(c_name,exdays) {
      var exdate=new Date();//获取时间
      exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
      //字符串拼接cookie
      window.document.cookie="cloJessionId"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
  },
  /*getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  },*/
  
  getCookie() {
    console.log(document.cookie);
    if (document.cookie.length>0) {
      var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
      for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');//再次切割
        //判断查找相对应的值
        if(arr2[0]=='userName'){
          this.ruleForm.userName=arr2[1];//保存到保存数据的地方
        }else if(arr2[0]=='userPwd'){
          this.ruleForm.password=arr2[1];
        }
      }
    }
  },
  clearCookie() {
    this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
  }
}
