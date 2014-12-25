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
      totalNum += number;
      total += subtotal;
      $("#subtotal-"+productId).text(subtotal);


    }
    $("#count").text(totalNum);
    $("#totalPrice").text(total);
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
});
