function keypress(id)
{
  var itemNumber = document.getElementById(id).value || 0;
  cartHandle.setCount(name+"num",itemNumber);
  refreshAll();
}
