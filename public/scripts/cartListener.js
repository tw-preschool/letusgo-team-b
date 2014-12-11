function keypress(name)
{
  var itemNumber = document.getElementById(name).value || 0;
  cartHandle.setCount(name+"num",itemNumber);
  refreshAll();
}
