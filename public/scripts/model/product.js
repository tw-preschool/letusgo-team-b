function product(id, name, price, unit, promotion, numberInStore,boughtNum,freeNum,subtotal){
  this.id = id;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.promotion = promotion || "";
  this.numberInStore = numberInStore;
  this.boughtNum = boughtNum || 0;
  this.freeNum = freeNum || 0;
  this.subtotal = subtotal || 0;
}
