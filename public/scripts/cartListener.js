function keypress(id)
{
  var itemNumber = document.getElementById(id).value || 0;
  var numberIn = cartHandle.getItem(id).numberInStore;
  if(itemNumber > cartHandle.getItem(id).numberInStore){
    $("#excced-msg").fadeIn();
      document.getElementById("excced-remind").innerHTML = "亲,库存不足,您最多只能添加"+numberIn+"件此类商品";
      }else{
    $("#excced-msg").fadeOut();
    if(itemNumber != 0 && inputIsNumber(itemNumber)){
      cartHandle.setCount(id+"num",itemNumber);
      $("#wrong-input").fadeOut();
      refreshAll();
    }else{
      $("#wrong-input").fadeIn();
    }
  }
}
 function inputIsNumber(input){
   var n = Number(input);
   if(input.indexOf('.') > 0 || isNaN(n)){
     return false;
   }else{
     return true;
   }
}
