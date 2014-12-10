function product(name, price, unit, promotion){
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.promotion = promotion || " ";
}
product.prototype.setProCount = function(count){
  this.count = count;
};

product.prototype.getProCount = function(){
  return this.count;
};
