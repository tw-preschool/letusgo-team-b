$(document).ready(function(){
  $("#addbutton").on("click",function(){
    var name = $("#iName").val();
    var price = $("#iPrice").val();
    var unit = $("#iUnit").val();
    var promotion = false;
    $.ajax({
      type : "POST",
      url : "/products",
      data : {"name" : name , "price" : price  , "unit" : unit , "promotionStatus" : promotion},
      dataType : "json",
      success : function(data){
        var tr = $('<tr>\
                      <td class = \"item-id\">' + data.id + '</td>\
                      <td class = \"item-name\">' + name + '</td>\
                      <td>' + price + '</td>\
                      <td>' + unit + '</td>\
                      <td><input type="checkbox" class=\"item-promotion\" value="促销"></td>\
                      <td><a href=\"/item-edit/'+data.id+'\" class = \"edit-link\">修改</a></td>\
                      <td><button class=\"btn btn-primary item-delete\">删除</button></td>\
                      </tr>');
        $("#product-table-list").append(tr);
        //$("#alert-msg").remove();
      }
    });
  });
  $(".add-entry").on("click",function(){
    $(this).parent().find(".add-info").toggle();
  });

  $("#product-table-list").on("click",".item-promotion",function(){
    var name = $(this).closest("tr").find(".item-name").text();
    var result = this.checked;
    $.ajax({
      type : "POST",
      url : "/item-promotion",
      data : {"name" : name , "promotionStatus": result},
      dataType : "json",
      success : function(){
        if (result == true)
          alert("已为"+name+"添加买二送一优惠!");
        else if (result == false)
          alert("已取消"+name+"的买二送一优惠!");
      }
    });
  });

  $("#product-table-list").on("click",".item-delete",function(){
    var item = $(this).closest("tr");
    var name = item.find(".item-name").text();
    if(confirm("确定要删除该商品?"))
    {
      $.ajax({
        type : "POST",
        url : "/item-delete",
        data : {"id" : parseInt(item.find(".item-id").text(),10) , "name" : name},
        dataType : "json",
        success : function(data){
          item.remove();
        }
      });
    }
  });
});
