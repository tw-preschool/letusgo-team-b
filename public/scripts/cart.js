$(document).ready(function(){

  var getAllDetails = function(details){
    var detail = [];
    for(var i in details){
      details[i].freeNum = cartHandle.getFreeNum(details[i].id);
      details[i].subtotal = cartHandle.calculateSubtotal(details[i].id).toFixed(2);
      detail.push(details[i]);
    }
    return detail;
  };

  //"+" button on cart.erb
  $(".add-cart").on('click',function(){
    var email = $("#username").text();
    var id = $(this).parent().siblings()[0].innerHTML;
    addToTableByPlus(id,email);
    calculateShow();
  });

  //"-" button on cart.erb
  $(".reduce-cart").on('click',function(){
      $("#excced-msg").hide();
      var email = $("#username").text();
       var id = $(this).parent().siblings()[0].innerHTML;
       reduceTable(id,email);
       calculateShow();
     });
  // "delet" button
  $(".btn.btn-warning").on('click',function(){
      var id = $(this).parent().siblings()[0].innerHTML;
      var email = $("#username").text();
      deleteProductFromCart(id,email,this);
      calculateShow();
  });

  $(".btn.btn-primary").on('click',function(){
    var id = $(this).parent().siblings()[0].innerHTML;
    var email = $("#username").text();
    addToTable(id, email);
    calculateShow();
  });


  var addToTable = function(id,email){
    $.ajax({
      type : "POST",
      url : "/cart",
      data :{"id": id, "email": email},
      dataType : "json",
      success: function(data){
        if(!data){
          $("#excced-msg").show();
        }else{
          $("#excced-msg").hide();
        }
      }
    });
  };

  var addToTableByPlus = function(id,email){
    $.ajax({
      type : "POST",
      url : "/cartByPlus",
      data :{"id": id, "email": email},
      dataType : "json",
      success: function(data){
        if(!data){
          $("#excced-msg").show();
        }else{
          $("#excced-msg").hide();
          document.getElementById(id).value = data;
        }
      }
    });
  };

  var reduceTable = function(id,email){
    $.ajax({
      type : "POST",
      url : "/cartReduce",
      data :{"id": id, "email": email},
      dataType : "json",
      success: function(data){
        if(data === false){

        }else{
          $("#excced-msg").hide();
          document.getElementById(id).value = data;
        }
      }
    });
  };

  var deleteProductFromCart = function(id,email,address){
    $.ajax({
      type : "POST",
      url : "/cartDelete",
      data :{"id": id, "email": email},
      dataType : "json",
      success: function(data){
          $("#excced-msg").hide();
          $(address).closest("tr").remove();
        }
    });
  };
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
$("#create-order").on('click',function(){
  console.log("into create order");
  var email = $("#username").text();
  $.ajax({
    type : "POST",
    url : "/getCalculateParams",
    data :{"email": email},
    dataType : "json",
    success: function(data){
      var products = [];
      var productInCart = data.productInCart;
      var productArray = data.productArray;
      for(var i in productInCart){
        var productId  = productInCart[i].product_id;
        var pro = null;
        for(var j in productArray){
          if(productId == productArray[j].id){
            pro = new product(productArray[j].id,productArray[j].name,productArray[j].price,productArray[j].unit,productArray[j].promotion,productArray[j].number);
          }
        }
        if(pro != null){
          pro.boughtNum = productInCart[i].number;
          products.push(pro);
        }
      }
      for(var k in products){
        products[k].freeNum = cartsHandle.getFreeNum(products[k].boughtNum);
        products[k].subtotal = cartsHandle.calculateSubtotal(products[k].boughtNum,products[k].price,products[k].promotion);
      }
      createOrder(products);
  }
});
});
var createOrder = function(details){
var total = 0;
for(var k in details){
  total += details[k].subtotal;
}
var username = $("#username").text();
var orderData={"order": {username: username, state: "待付款", totalcost:total }};
orderData.detailsCount = details.length;

for(var i in details){
  orderData["details"+i] = details[i];
}
$.ajax({
  type : "POST",
  url : "/order",

  data :orderData,
  dataType : "json",
  success: function(data){
    console.log("data"+data);
  }
});
};

});
