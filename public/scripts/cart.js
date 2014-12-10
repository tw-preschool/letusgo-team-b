$(document).ready(function(){
  $(".add-cart").on('click',function(){
    var id = $(this).parent().siblings()[0].innerHTML;
    console.log("id"+id);
      var name = $(this).parent().siblings()[1].innerHTML;
      console.log("name"+name);
      var price = $(this).parent().siblings()[2].innerHTML;
      var unit = $(this).parent().siblings()[3].innerHTML;
      var pro = new product(name,price,unit);
      cartHandle.addItem(name,pro);
      pro.setProCount(cartHandle.getCount(name+"num"));

      console.log(pro.getProCount());
      $.ajax({
        type: "POST",
        url : "/cart",
        data : {"name": name},
        dataType : "json",
        success : function(data){
          if(pro.name != null){
          var tr = $('<tr>\
                        <td id=\"item-id\" hidden>' + id + '</td>\
                        <td>' + pro.name + '</td>\
                        <td>' + pro.price + '</td>\
                        <td>' + pro.unit + '</td>\
                        <td>\
                          <button type=\"button\">-</button>\
                          <input value='+pro.getProCount()+'>\
                          <button type=\"button\" class=\"add-cart\">+</button>\
                        </td>\
                        <td class=\"font-color-red\" id=\"item-promotion\">买二送一</td>\
                        <td id = \"item-num\">3</td>\
                        </tr>');
            $("#cart-table").append(tr);
          }
        }
      });
  });
});
