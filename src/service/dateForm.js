/**
 * @author Tianyuan.li
 
 * @date 2018/9/11 下午13:00
 * @description
 */

function formatDate(now)
{
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  month = month <10 ?("0" + month) :month;
  var date=now.getDate();
  date = date <10 ?("0" + date) :date;
  var hour=now.getHours();
  hour = hour <10 ?("0" + hour) :hour;
  // hour = hour >12 ?( hour + "PM") :hour;
  var minute=now.getMinutes();
  minute = minute <10 ?("0" + minute) :minute;
  var second=now.getSeconds();
  second = second <10 ?("0" + second) :second;
  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

export default function(fmt) {
  return formatDate(new Date(fmt))
}
