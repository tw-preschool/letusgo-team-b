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
    reduceItem: function(key,product){
      sessionStorage.removeItem(key);
      this.reduceCount(key+"num");
    },
    clearCart:function(key){
      sessionStorage.clear();
    }
  };
})();
