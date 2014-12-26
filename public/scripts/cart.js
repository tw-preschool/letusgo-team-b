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

  var appendCart = function(data){
    var tr = $('<tr>\
                  <td id=\"item-id\" hidden>' + data.id + '</td>\
                  <td>' + data.name + '</td>\
                  <td>' + data.price.toFixed(2) + '</td>\
                  <td>' + data.unit + '</td>\
                  <td>\
                    <button type=\"button\" class=\"reduce-cart\">-</button>\
                    <input value='+data.boughtNum+' type="text" maxlength=15 id="'+data.id+'" onKeyUp="keypress('+data.id+')"/>\
                    <button type=\"button\" class=\"add-cart\">+</button>\
                  </td>\
                  <td class=\"font-color-red\" id=\"item-promotion\">'+ data.promotion +'</td>\
                  <td id = \"subtotal-'+data.id+'\">'+cartHandle.calculateSubtotal(data.id).toFixed(2)+'</td>\
                  <td><button class=\"btn btn-xs btn-warning\"><span aria-hidden=\"true\" class=\"icon-trash\"> 删除</button></td>\
                  </tr>');
    $("#cart-table").append(tr);
  };

  var showCartItem = function(){
    var storage = window.sessionStorage;
    if(storage.length === 0){
      $("#has-product").hide();
      $("#no-product").show();
      $("#none-msg").show();
    }else{
      $("#has-product").show();
      $("#no-product").hide();
      for(var i=0 ; i<storage.length;i++){
          var key = storage.key(i);
          if(key.indexOf("num") < 0){
              var item = cartHandle.getItem(key);
              appendCart(item);
          }
      }
    }
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
  var createOrder = function(){
    var all = cartHandle.getAllItems();
    var details = getAllDetails(all);
    var username = $("#username").text();
    var orderData={"order": {username: username, state: "待付款", totalcost:cartHandle.calculateTotal() }};
    orderData.detailsCount = details.length;

    for(var i in details){
      orderData["details"+i] = details[i];
    }
    $.ajax({
      type : "POST",
      url : "/addOrder",

      data :orderData,
      dataType : "json",
      success: function(data){
        console.log("data"+data);
      }
    });
  };

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

  // var calculateSubtotal = function(productId, email){
  //   $.ajax({
  //     type : "POST",
  //     url : "/getSubtotalParams",
  //     data :{"productId": productId, "email": email},
  //     dataType : "json",
  //     success: function(data){
  //         var subtotal = cartsHandle.calculateSubtotal(data.number, data.price, data.promotion);
  //
  //       }
  //   });
  // };
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
});
