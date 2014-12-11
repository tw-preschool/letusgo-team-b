var cartHandle = (function(){

  return {
    getCount: function(num){
      return parseInt(sessionStorage[num]) || 0 ;
    },
    setCount: function(num, count){
      sessionStorage[num] = count.toString();
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
       if(this.getItem(key).id != product.id){
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
    deleteItem: function(key){
      sessionStorage.removeItem(key);
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
    calculateSubtotal: function(key){
        var item = this.getItem(key);
        var number = this.getCount(key+"num");
        var price = item.price;
        if(item.promotion != "" && number>2){
          return item.price*(Math.ceil(number/3))*2;
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
    },
    getFreeNum: function(name){
      return parseInt((this.getCount(name+"num"))/3);
    },
    calculateFree: function(){
      var total = 0;
      var storage = window.sessionStorage;
      for(var i=0;i<storage.length;i++){
        var key = storage.key(i);
        var item = this.getItem(key);
        if(key.indexOf("num") < 0 && item.promotion != ""){
          total += parseFloat(item.price * this.getFreeNum(key));
        }
      }
    return total;
    },

    addPromotionType: function(promotion){
      if(promotion == 'true'){
        return "买二送一";
      }else{
        return "";
      }
    },
    hasExceed: function(key){
      var item = this.getItem(key);
      var number = this.getCount(key+"num");
      if(item.numberInStore <= number){
        return true;
      }else{
        return false;
      }
    },
    clearCart:function(){
      sessionStorage.clear();
    }
  };
})();
