$(document).ready(function(){
  var appendCart = function(item,i){
    var tr = $('<tr>\
                  <td id=\"item-id\" hidden>' + (++i) + '</td>\
                  <td>' + item.name + '</td>\
                  <td>' + item.price + '</td>\
                  <td>' + item.unit + '</td>\
                  <td>\
                    <button type=\"button\" class=\"reduce-cart\">-</button>\
                    <input value='+cartHandle.getCount(item.name+"num")+'>\
                    <button type=\"button\" class=\"add-cart\">+</button>\
                  </td>\
                  <td class=\"font-color-red\" id=\"item-promotion\">'+ item.promotion +'</td>\
                  <td id = \"item-num\">'+cartHandle.calculateSubtotal(item.name)+'</td>\
                  </tr>');
    $("#cart-table").append(tr);
  };
  var showCartItem = function(){
    var storage = window.sessionStorage;
        for(var i=0 ; i<storage.length;i++){
            var key = storage.key(i);
            if(key.indexOf("num") < 0){
                var item = cartHandle.getItem(key);
                console.log(item);
                appendCart(item, i);
            }
        }
  };

  showCartItem();
  $(".add-cart").on('click',function(){
    $("#cart-table").empty();
    var id = $(this).parent().siblings()[0].innerHTML;
      var name = $(this).parent().siblings()[1].innerHTML;
      var price = $(this).parent().siblings()[2].innerHTML;
      var unit = $(this).parent().siblings()[3].innerHTML;
      var promotion = $(this).parent().siblings()[4].innerHTML;
      var pro = new product(name,price,unit);
      cartHandle.addItem(name,pro,promotion);
      pro.setProCount(cartHandle.getCount(name+"num"));
      window.location.href='/cart';
  });
  $(".btn.btn-primary").on('click',function(){
      var id = $(this).parent().siblings()[0].innerHTML;
      var name = $(this).parent().siblings().find("dt").text();
      var price = $(this).parent().siblings()[2].innerHTML;
      var unit = $(this).parent().siblings()[3].innerHTML;
      var promotion = $(this).parent().siblings()[5].innerHTML;
      var pro = new product(name,price,unit,promotion);
      cartHandle.addItem(name,pro);
      pro.setProCount(cartHandle.getCount(name+"num"));
      window.location.href='/products';
  });

  $(".reduce-cart").on('click',function(){
        var id = $(this).parent().siblings()[0].innerHTML;
        var name = $(this).parent().siblings()[1].innerHTML;
        var price = $(this).parent().siblings()[2].innerHTML;
        var unit = $(this).parent().siblings()[3].innerHTML;
        var promotion = $(this).parent().siblings()[4].innerHTML;
        var pro = new product(name,price,unit,promotion);
        pro.setSubtotal();
        cartHandle.reduceItem(name);
        pro.setProCount(cartHandle.getCount(name+"num"));
        window.location.href='/cart';
  });
});
