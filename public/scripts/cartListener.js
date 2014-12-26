function keypress(id)
{
  var itemNumber = document.getElementById(id).value || 0;
  var email = $("#username").text();
  $.ajax({
    type : "POST",
    url : "/enoughJudgement",
    data :{"email": email, "productId": id, "productNum": itemNumber},
    dataType : "json",
    success: function(data){
      if(!(inputIsNumber(itemNumber))){
        $("#wrong-input").fadeIn();
      }else if(data){
        console.log(data);
        $("#excced-msg").fadeIn();
        $("#excced-msg").text("亲,库存不足,您最多只能添加"+data+"件此类商品");
      }else{
        addToCartByInput(email, id, itemNumber);
        calculateShow();
      }
    }
  });

}
function addToCartByInput(email,id,itemNumber){
  $.ajax({
    type : "POST",
    url : "/addToCartByInput",
    data :{"email": email, "productId": id, "productNum": itemNumber},
    dataType : "json",
    success: function(data){

    }
  });
}

 function inputIsNumber(input){
   if(isNaN(Number(input)) || input.indexOf('.') > 0 ){
     return false;
   }else{
     return true;
   }
}
function calculateShow(){
  var email = $("#username").text();
  $.ajax({
    type : "POST",
    url : "/getCalculateParams",
    data :{"email": email},
    dataType : "json",
    success: function(data){
      calculate(data);
    }
  });
}
function calculate(data){
  var totalNum = 0;
  var total = 0;
  var hasProduct = 0;
  var productInCart = data.productInCart;
  var productArray = data.productArray;
  for(var i in productArray){
    var productId = productArray[i].id;
    var subtotal = 0;
    var number= 0;
    for(var j in productInCart){
      if(productInCart[j].product_id == productId){
        hasProduct = 1;
        number = productInCart[j].number;
      }
    }
    subtotal = cartsHandle.calculateSubtotal(number, productArray[i].price, productArray[i].promotion);
    totalNum += number;
    total += subtotal;
    $("#subtotal-"+productId).text(subtotal.toFixed(2));
  }
  $("#count").text(totalNum);
  $("#totalPrice").text(total.toFixed(2));
  if(totalNum == 0 && hasProduct == 0){
    $("#no-product").show();
    $("#none-msg").show();
    $("#has-product").hide();
  }else{
    $("#has-product").show();
    $("#no-product").hide();
  }
}
