function product(id, name, price, unit, promotion){
  this.id = id;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.promotion = promotion || "";
}
