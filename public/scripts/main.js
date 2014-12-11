$().ready(function(){
  $("#count").text(cartHandle.getCartCount());
  $("#totalPrice").text(cartHandle.calculateTotal().toFixed(2));
  $("#freeTotal").text(cartHandle.calculateFree().toFixed(2));
});
