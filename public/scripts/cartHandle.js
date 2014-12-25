var cartsHandle = (function(){

  return {
    calculateSubtotal: function(number, price, promotion){
      if(promotion == "true" && number > 2){
        return price*(Math.ceil(number/3))*2;
      }else{
        return price * number;
      }
    },
    calculateTotal: function(){
      var total = 0;

      return total;
    },
    getFreeNum: function(number){
      return parseInt(number/3);
    },
    calculateEveryOneForFree: function(number,price){
      return this.getFreeNum() * price;
    }
  };
})();
