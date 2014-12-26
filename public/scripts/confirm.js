$(document).ready(function(){

  var calculateShow = function(){
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
  };

  var calculate = function(data){
    var totalNum = 0;
    var total = 0;
    var save = 0;
    var productInCart = data.productInCart;
    var productArray = data.productArray;
    for(var i in productArray){
      var productId = productArray[i].id;
      var subtotal = 0;
      var number= 0;

      for(var j in productInCart){
        if(productInCart[j].product_id == productId){
          number = productInCart[j].number;

        }
      }
      subtotal = cartsHandle.calculateSubtotal(number, productArray[i].price, productArray[i].promotion);
      freeNum = cartsHandle.getFreeNum(number);
      totalNum += number;
      total += subtotal;
      save += cartsHandle.getSave(number,productArray[i].price);
      $("#subtotal-"+productId).text(subtotal.toFixed(2));
      $("#freeNum-"+productId).text(freeNum);


    }
    $("#count").text(totalNum);
    $("#totalPrice").text(total.toFixed(2));
    $("#freeTotal").text(save.toFixed(2));
    if(totalNum == 0 ){
      $("#no-product").show();
      $("#none-msg").show();
      $("#has-product").hide();
    }else{
      $("#has-product").show();
      $("#no-product").hide();
    }

  };

  calculateShow();
  var email = $("#username").text();
  $.ajax({
    type : "POST",
    url : "/cleanUserCart",
    data :{"email": email},
    dataType : "json",
    success: function(data){

    }
  });
});
