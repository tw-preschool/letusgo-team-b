/*$(document).ready(function(){
  var shopCart = [];
  var cartCount;

  if (sessionStorage.getItem("cartCount")) {
    cartCount = sessionStorage.getItem("cartCount");
  } else {
    cartCount = 0;
    sessionStorage.setItem("cartCount", cartCount);
  }

  $("#body-list").on("click","#add-cart",function(){
    var item = $(this).closest("tr");
    var name = item.find(".item-name").text();
    var id = parseInt(item.find(".item-id").text(),10);
    var num = 1;
    // alert(id + ',' + num + ',' + shopCart.length + '!');
    var i = 0;

    for (; i < shopCart.length; i ++) {
      if (shopCart[i].id == id) {
        shopCart[i].num ++;
        cartCount ++;
        sessionStorage.setItem("cartCount", cartCount);
        break;
      }
    }
    if (i == shopCart.length) {
      shopCart[i] = {"id":id, "num":num};
      cartCount ++;
      sessionStorage.setItem("cartCount", cartCount);
    }

    $('#count').text(sessionStorage.getItem("cartCount"));

    // alert(shopCart.length);

    });

});*/
