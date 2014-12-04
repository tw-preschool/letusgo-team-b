$(document).ready(function(){
  $(".addbutton").on("click",function(){
    var name = $(".iName").val();
    var price = $(".iPrice").val();
    var unit = $(".iUnit").val();
    $.ajax({
      type : "POST",
      url : "/products",
      data : {"name" : name , "price" : price  , "unit" : unit},
      dataType : "json",
      success : function(data){
        var tr = $('<tr>\
                      <td class = \"item-id\">' + data.id + '</td>\
                      <td>' + name + '</td>\
                      <td>' + price + '</td>\
                      <td>' + unit + '</td>\
                      <td><button class=\"btn btn-primary item-promotion\">促销</button></td>\
                      <td><button class=\"btn btn-primary item-edit\">修改</button></td>\
                      <td><button class=\"btn btn-primary item-delete\">删除</button></td>\
                      </tr>');
        $("#product-table-list").append(tr);
        $("#alert-msg").remove();
      }
    });
  });
  $(".add-entry").on("click",function(){
    $(this).parent().find(".add-info").toggle();
  });
  $(".item-edit").on("click",editItem);
  function editItem(){
    return 1;
  }
  $(".item-delete").on("click",function(){
    var item = $(this).closest("tr");
    alert(parseInt(item.find(".item-id").text(),10));
    $.ajax({
      type : "POST",
      url : "/item-delete",
      data : {"id" : parseInt(item.find(".item-id").text(),10)},
      dataType : "json",
      success : function(data){
        item.remove();
      }
    });
  });
});
