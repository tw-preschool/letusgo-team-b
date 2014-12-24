// var cartHandle = (function(){
//
//   return {
//     getCount: function(key){
//       return parseInt(this.getItem(key).boughtNum) || 0 ;
//     },
//     // reduceCount: function(num){
//     //   sessionStorage[num] = (this.getCount(num) - 1).toString();
//     // },
//      getItem: function(key){
//        return JSON.parse(sessionStorage.getItem(key)) || "";
//      },
//      setItem: function(key,product){
//        sessionStorage.setItem(key,JSON.stringify(product));
//      },
//      addItem: function(key,value){
//        var pro  = new product(value.id,value.name,value.price,value.unit,this.addPromotionType(value.promotion),value.number);
//         if(this.getItem(key).id != value.id){
//           pro.boughtNum = 1;
//           sessionStorage.setItem(key,JSON.stringify(pro));
//         }else{
//           pro.boughtNum = this.getItem(key).boughtNum + 1;
//           this.updateItem(key,pro);
//         }
//      },
//     reduceItem: function(key){
//       var value = this.getItem(key);
//       var pro  = new product(value.id,value.name,value.price,value.unit,this.addPromotionType(value.promotion),value.number);
//       pro.boughtNum = value.boughtNum - 1;
//       if(pro.boughtNum === 0){
//         sessionStorage.removeItem(key);
//       }else{
//         this.updateItem(key,pro);
//       }
//     },
//     deleteItem: function(key){
//       sessionStorage.removeItem(key);
//     },
//     updateItem : function(key,pro){
//       sessionStorage.removeItem(key);
//       sessionStorage.setItem(key,JSON.stringify(pro));
//     },
//     updateAttribute : function(key,attribute,attriValue){
//       var pro = this.getItem(key);
//       if(pro.boughtNum >0 && attribute == "promotion"){
//         pro.promotion = this.addPromotionType(attriValue);
//         this.updateItem(key,pro);
//       }
//     },
//     getAllItems: function(){
//       var items = [];
//       var storage = window.sessionStorage;
//       for(var i=0; i<storage.length; i++){
//         var key = storage.key(i);
//         items.push(this.getItem(key));
//       }
//       return items;
//     },
//     getCartCount: function(){
//       var count = 0;
//       var storage = window.sessionStorage;
//       for(var i=0;i<storage.length;i++){
//         var key = storage.key(i);
//         count += this.getCount(key);
//       }
//       return count;
//     },
//     calculateSubtotal: function(key){
//         var item = this.getItem(key);
//         var number = this.getCount(key);
//         var price = item.price;
//         if(item.promotion !== "" && number>2){
//           return item.price*(Math.ceil(number/3))*2;
//         }
//         else{
//           return price*number;
//         }
//     },
//     calculateTotal: function(){
//         var total = 0;
//         var storage = window.sessionStorage;
//         for(var i=0;i<storage.length;i++){
//           var key = storage.key(i);
//           total += parseFloat(this.calculateSubtotal(key).toString());
//         }
//       return total;
//     },
//     getFreeNum: function(key){
//       return parseInt((this.getCount(key))/3);
//     },
//     calculateFree: function(){
//       var total = 0;
//       var storage = window.sessionStorage;
//       for(var i=0;i<storage.length;i++){
//         var key = storage.key(i);
//         var item = this.getItem(key);
//         if(item.promotion !== ""){
//           total += parseFloat(item.price * this.getFreeNum(key));
//         }
//       }
//     return total;
//     },
//
//     addPromotionType: function(promotion){
//       if(promotion == 'true'){
//         return "买二送一";
//       }else{
//         return "";
//       }
//     },
//     hasExceed: function(key){
//       var item = this.getItem(key);
//       var number = this.getCount(key);
//       if(item.numberInStore <= number){
//         return true;
//       }else{
//         return false;
//       }
//     },
//     clearCart:function(){
//       sessionStorage.clear();
//     }
//   };
// })();
