var cartHandle = (function(){

  return {
    getCount: function(num){
      return parseInt(sessionStorage[num]) || 0 ;
    },
    addCount: function(num){
      sessionStorage[num] = (this.getCount(num) + 1).toString();
    },
    reduceCount: function(num){
      sessionStorage[num] = (this.getCount(num) - 1).toString();
    },

    getItem: function(key){
      return JSON.parse(sessionStorage.getItem(key)) || "";
    },
    addItem: function(key,product){
      if(this.getItem(key).name != product.name){
        sessionStorage.setItem(key,JSON.stringify(product));
      }
      this.addCount(key+"num");
    },
    reduceItem: function(key){
      this.reduceCount(key+"num");
      if(sessionStorage[key+"num"] == 0){
        sessionStorage.removeItem(key);
      }
    },
    getCartCount: function(){
      var count = 0;
      var storage = window.sessionStorage;
      for(var i=0;i<storage.length;i++){
        var key = storage.key(i);
        count += this.getCount(key+"num");
      }
      return count;
    },
    clearCart:function(){
      sessionStorage.clear();
    },
    calculateSubtotal: function(name){
        var item = this.getItem(name);
        var number = this.getCount(name+"num");
        var price = item.price;
        if(item.promotion != "" && number>2){
          return price*(Math.ceil(number/3))*2;
        }
        else{
          return price*number;
        }
    },
    calculateTotal: function(){
        var total = 0;
        var storage = window.sessionStorage;
        for(var i=0;i<storage.length;i++){
          var key = storage.key(i);
          if(key.indexOf("num") < 0 ){
            total += parseFloat(this.calculateSubtotal(key).toString());
          }
        }
      return total;
    }
  };
})();
