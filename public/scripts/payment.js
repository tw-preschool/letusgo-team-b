$(document).ready(function(){
  var appendCart = function(data){
    var tr = $('<tr>\
                  <td id=\"item-id\" hidden>' + data.id + '</td>\
                  <td>' + data.name + '</td>\
                  <td>' + data.price + '</td>\
                  <td>' + data.unit + '</td>\
                  <td>'+cartHandle.getCount(data.name+"num")+'</td>\
                  <td class=\"font-color-red\">'+ data.promotion +'</td>\
                  <td>'+cartHandle.calculateSubtotal(data.name)+'</td>\
                  </tr>');
    $("#cart").append(tr);
  };

  var appendFree = function(data){
    var tr = $('<tr>\
                  <td id=\"item-id\" hidden>' + data.id + '</td>\
                  <td class=\"font-color-red\">'+ data.promotion +'</td>\
                  <td>' + data.name + '</td>\
                  <td>' + cartHandle.getFreeNum(data.name) + '</td>\
                  </tr>');
    $("#free-table").append(tr);
  };
  var showCartItem = function(){
    var storage = window.sessionStorage;
        for(var i=0 ; i<storage.length;i++){
            var key = storage.key(i);
            if(key.indexOf("num") < 0){
                var item = cartHandle.getItem(key);
                appendCart(item);
                console.log(item);
                console.log(item.promotion);
                if(item.promotion != ""){
                  appendFree(item);
                }
            }
        }
  };
  showCartItem();
});
