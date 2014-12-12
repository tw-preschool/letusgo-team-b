$(document).ready(function(){
  var appendCart = function(data){
    var tr = $('<tr>\
                  <td id=\"item-id\" hidden>' + data.id + '</td>\
                  <td>' + data.name + '</td>\
                  <td>' + data.price.toFixed(2) + '</td>\
                  <td>' + data.unit + '</td>\
                  <td>\
                    <button type=\"button\" class=\"reduce-cart\">-</button>\
                    <input value='+cartHandle.getCount(data.id+"num")+' type="text" maxlength=15 id="'+data.id+'" onKeyUp="keypress('+data.id+')"/>\
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
    console.log(storage.length);
    if(storage.length == 0){
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
   $(".add-cart").on('click',function(){
        var id = $(this).parent().siblings()[0].innerHTML;
        addToSession(id,"addByPlus");
    });
  $(".btn.btn-primary").on('click',function(){
      var id = $(this).parent().siblings()[0].innerHTML;
      addToSession(id,"addByButton");
      refreshAll();
  });

   $(".reduce-cart").on('click',function(){
      $("#excced-msg").hide();
       var id = $(this).parent().siblings()[0].innerHTML;
       cartHandle.reduceItem(id);
       if(cartHandle.getCount(id+"num") <= 0){
         cartHandle.deleteItem(id);
       }
       document.getElementById(id).value = cartHandle.getCount(id+"num");
       document.getElementById("subtotal-"+id).innerHTML =
                    cartHandle.calculateSubtotal(id) ? cartHandle.calculateSubtotal(id).toFixed(2) : 0;
       refreshAll();
     });

  $(".btn.btn-warning").on('click',function(){
      var id = $(this).parent().siblings()[0].innerHTML;
      cartHandle.deleteItem(id);
      window.location.href='/cart';
  });

  var addToSession = function(id,type){
    $.ajax({
      type : "POST",
      url : "/cart",
      data :{"id": id},
      dataType : "json",
      success: function(data){
        var pro = new product(id,data.name,data.price,data.unit,cartHandle.addPromotionType(data.promotion),data.number);
        if(cartHandle.hasExceed(id)){
          $("#excced-msg").show();
        }else{
          $("#excced-msg").hide();
          cartHandle.addItem(id,pro);
          if(type == "addByPlus"){
            document.getElementById(id).value = cartHandle.getCount(id+"num");
            document.getElementById("subtotal-"+id).innerHTML =
                         cartHandle.calculateSubtotal(id) ? cartHandle.calculateSubtotal(id).toFixed(2) : 0;
          }
          refreshAll();
        }

      }
    });
  };


});
