$(document).ready(function(){
  var appendCart = function(data){
    var tr = $('<tr>\
                  <td id=\"item-id\" hidden>' + data.id + '</td>\
                  <td>' + data.name + '</td>\
                  <td>' + data.price.toFixed(2) + '</td>\
                  <td>' + data.unit + '</td>\
                  <td>'+data.boughtNum+'</td>\
                  <td class=\"font-color-red\">'+ data.promotion +'</td>\
                  <td>'+cartHandle.calculateSubtotal(data.id).toFixed(2)+'</td>\
                  </tr>');
    $("#cart").append(tr);
  };

  var appendFree = function(data){
    var tr = $('<tr>\
                  <td id=\"item-id\" hidden>' + data.id + '</td>\
                  <td class=\"font-color-red\">'+ data.promotion +'</td>\
                  <td>' + data.name + '</td>\
                  <td>' + cartHandle.getFreeNum(data.id) + '</td>\
                  </tr>');
    $("#free-table").append(tr);
  };
  var showCartItem = function(){
    var storage = window.sessionStorage;
    if(storage.length == 0){
      $("#has-product").hide();
      $("#no-product").show();
      $("#none-msg").show();
    }else{
      $("#has-product").show();
      $("#no-product").hide();
      for(var i=0 ; i<storage.length;i++){
          var key = storage.key(i);
          var item = cartHandle.getItem(key);
          appendCart(item);
          if(item.promotion != "" && cartHandle.getFreeNum(item.id) > 0){
            appendFree(item);
          }
      }
    }
  };
  showCartItem();
});