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
    $("#create-order").on('click',function(){
      $.ajax({
        type : "POST",
        url : "/confirm",
        data :null,
        dataType : "json",
        success: function(data){
          console.log(data);
        // var flag = true;
        //  for(var id in data){
        //    var boughtNum = cartHandle.getItem(id).boughtNum;
        //    if(boughtNum > data[id] && boughtNum != 0){
        //      flag = false;
        //      var name = cartHandle.getItem(id).name;
        //      $("#wrong").text(name+"库存不足，无法提交订单！！！").show();
        //      break;
        //    }
        //   }
        // if(flag){
        //   createOrder();
        //   window.location.href = "/confirm";
        // }
      }
    });
  });
calculateShow();
  // var appendCart = function(data,number,subtotal){
  //   var tr = $('<tr>\
  //                 <td id=\"item-id\" hidden>' + data.id + '</td>\
  //                 <td>' + data.name + '</td>\
  //                 <td>' + data.price.toFixed(2) + '</td>\
  //                 <td>' + data.unit + '</td>\
  //                 <td>'+number+'</td>\
  //                 <td class=\"font-color-red\">'+ data.promotion +'</td>\
  //                 <td>'+subtotal.toFixed(2)+'</td>\
  //                 </tr>');
  //   $("#cart").append(tr);
  // };
  //
  // var appendFree = function(data, number){
  //   var tr = $('<tr>\
  //                 <td id=\"item-id\" hidden>' + data.id + '</td>\
  //                 <td class=\"font-color-red\">买二送一</td>\
  //                 <td>' + data.name + '</td>\
  //                 <td>' + cartsHandle.getFreeNum(number) + '</td>\
  //                 </tr>');
  //   $("#free-table").append(tr);
  // };
  // var showCartItem = function(){
  //   var storage = window.sessionStorage;
  //   if(storage.length == 0){
  //     $("#has-product").hide();
  //     $("#no-product").show();
  //     $("#none-msg").show();
  //   }else{
  //     $("#has-product").show();
  //     $("#no-product").hide();
  //     for(var i=0 ; i<storage.length;i++){
  //         var key = storage.key(i);
  //         var item = cartHandle.getItem(key);
  //         appendCart(item);
  //         if(item.promotion != "" && cartHandle.getFreeNum(item.id) > 0){
  //           appendFree(item);
  //         }
  //     }
  //   }
  // };
  //showCartItem();
});
