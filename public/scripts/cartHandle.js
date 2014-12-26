var cartsHandle = (function(){

  return {
    getSave: function(number, price){
      return this.getFreeNum(number) * price;
    },
    calculateSubtotal: function(number, price, promotion){
      if(promotion == "true" && number > 2){
        return price*(Math.ceil(number/3))*2;
      }else{
        return price * number;
      }
    },
    getFreeNum: function(number){
      return parseInt(number/3);
    }
  };
})();
