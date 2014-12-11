$(document).ready(function(){
  var appendCart = function(data){
    var tr = $('<tr>\
                  <td id=\"item-id\" hidden>' + data.id + '</td>\
                  <td>' + data.name + '</td>\
                  <td>' + data.price.toFixed(2) + '</td>\
                  <td>' + data.unit + '</td>\
                  <td>\
                    <button type=\"button\" class=\"reduce-cart\">-</button>\
                    <input value='+cartHandle.getCount(data.name+"num")+'>\
                    <button type=\"button\" class=\"add-cart\">+</button>\
                  </td>\
                  <td class=\"font-color-red\" id=\"item-promotion\">'+ data.promotion +'</td>\
                  <td id = \"item-num\">'+cartHandle.calculateSubtotal(data.name).toFixed(2)+'</td>\
                  </tr>');
    $("#cart-table").append(tr);

  };
  var showCartItem = function(){
    var storage = window.sessionStorage;
        for(var i=0 ; i<storage.length;i++){
            var key = storage.key(i);
            if(key.indexOf("num") < 0){
                var item = cartHandle.getItem(key);
                console.log(item.id);
                appendCart(item);
            }
        }
  };

  showCartItem();
  $(".add-cart").on('click',function(){
    console.log("id");
      var id = $(this).parent().siblings()[0].innerHTML;
      console.log(id);
      $.ajax({
        type : "POST",
        url : "/cart",
        data :{"id": id},
        dataType : "json",
        success: function(data){
          var pro = new product(id,data.name,data.price,data.unit,cartHandle.addPromotionType(data.promotion));
          cartHandle.addItem(data.name,pro);
          window.location.href='/cart';
        }
      });
  });
  $(".btn.btn-primary").on('click',function(){
      var id = $(this).parent().siblings()[0].innerHTML;
      $.ajax({
        type : "POST",
        url : "/cart",
        data :{"id": id},
        dataType : "json",
        success: function(data){
          var pro = new product(id,data.name,data.price,data.unit,cartHandle.addPromotionType(data.promotion));
          cartHandle.addItem(data.name,pro);
          window.location.href='/products';
        }
      });
  });

  $(".reduce-cart").on('click',function(){
        var id = $(this).parent().siblings()[0].innerHTML;
        $.ajax({
          type : "POST",
          url : "/cart",
          data :{"id": id},
          dataType : "json",
          success: function(data){
            cartHandle.reduceItem(data.name);
            window.location.href='/cart';
          }
        });
  });
});
