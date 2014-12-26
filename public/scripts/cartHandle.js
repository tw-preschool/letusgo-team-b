var cartsHandle = (function(){

  return {
    getSave: function(number, price){
      return this.getFreeNum(number) * price;
    },
    calculateSubtotal: function(number, price, promotion){
      if((promotion == "true" || promotion == "买二送一") && number > 2){
        return (price*(Math.floor(number/3))*2 + (number%3)*price);
      }else{
        return price * number;
      }
    },
    getFreeNum: function(number){
      return parseInt(number/3);
    }
  };
})();
