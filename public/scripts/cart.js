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

  showCartItem();

  //"+" button on cart.erb
  $(".add-cart").on('click',function(){
        var id = $(this).parent().siblings()[0].innerHTML;
        addToSession(id,"addByPlus");
    });

  //"-" button on cart.erb
  $(".reduce-cart").on('click',function(){
      $("#excced-msg").hide();
       var id = $(this).parent().siblings()[0].innerHTML;
       cartHandle.reduceItem(id);
       if(cartHandle.getCount(id) <= 0){
         cartHandle.deleteItem(id);
       }
       document.getElementById(id).value = cartHandle.getCount(id);
       document.getElementById("subtotal-"+id).innerHTML =
                    cartHandle.calculateSubtotal(id) ? cartHandle.calculateSubtotal(id).toFixed(2) : 0;
       refreshAll();
     });

  $(".btn.btn-warning").on('click',function(){
      var id = $(this).parent().siblings()[0].innerHTML;
      cartHandle.deleteItem(id);
      window.location.href='/cart';
  });

  $(".btn.btn-primary").on('click',function(){
    var id = $(this).parent().siblings()[0].innerHTML;
    addToSession(id,"addByButton");
    refreshAll();
  });

  $("#create-order").on('click',function(event){
    event.preventDefault();
    var all = cartHandle.getAllItems();
    var details = getAllDetails(all);
    $.ajax({
      type : "POST",
      url : "/getProductNum",
      data :{"details":details},
      dataType : "json",
      success: function(data){
      var flag = true;
       for(var id in data){
         var boughtNum = cartHandle.getItem(id).boughtNum;
         if(boughtNum > data[id] && boughtNum != 0){
           flag = false;
           var name = cartHandle.getItem(id).name;
           $("#wrong").text(name+"库存不足，无法提交订单！！！").show();
           break;
         }
        }
      if(flag){
        createOrder();
        window.location.href = "/confirm";
      }
    }
  });
});

  var createOrder = function(){
    var all = cartHandle.getAllItems();
    var details = getAllDetails(all);
    var username = $("#username").text();
    var orderData={"order": {username: username, state: "待付款", totalcost:cartHandle.calculateTotal() }};
    orderData.detailsCount = details.length;

    for(var i in details){
      orderData["details"+i] = details[i];
      //console.log(orderData["details"+i]);
    }
    console.log(orderData);
    //console.log(orderData);
    $.ajax({
      type : "POST",
      url : "/addOrder",

      data :orderData,
      dataType : "json",
      success: function(data){
      for(var id in data){
         console.log(id);
         console.log(data[id]);
       }
      }
    });
  };

  var addToSession = function(id,type){
    $.ajax({
      type : "POST",
      url : "/cart",
      data :{"id": id},
      dataType : "json",
      success: function(data){
        //var pro = new product(id,data.name,data.price,data.unit,cartHandle.addPromotionType(data.promotion),data.number);
        if(cartHandle.hasExceed(id)){
          $("#excced-msg").show();
        }else{
          $("#excced-msg").hide();
          cartHandle.addItem(id,data);
          if(type == "addByPlus"){
            document.getElementById(id).value = cartHandle.getCount(id);
            document.getElementById("subtotal-"+id).innerHTML =
                         cartHandle.calculateSubtotal(id) ? cartHandle.calculateSubtotal(id).toFixed(2) : 0;
          }
          refreshAll();
        }

      }
    });
  };


});
