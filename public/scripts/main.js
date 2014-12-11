$().ready(function(){
  $("#count").text(cartHandle.getCartCount());
  $("#totalPrice").text(cartHandle.calculateTotal());
});
