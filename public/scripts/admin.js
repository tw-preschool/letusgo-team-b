$(document).ready(function(){
  $("#addbutton").on("click",function(){
    var name = $("#iName").val();
    var price = $("#iPrice").val();
    var unit = $("#iUnit").val();
    //var promotion = false;
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
                      <td><input type="checkbox" class=\"btn btn-primary item-promotion\" value="促销"></td>\
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
    var item = $(this).closest("tr");
    if (this.checked == true){
        $.ajax({
            type : "POST",
            url : "/item-promotion",
            data : {"barcode": parseInt(item.find(".item-id").text(),10), "checkFlag": this.checked},
            dataType : "json",
            success : function(data){
                alert("add promotion");
            }
        });
    }
    else if (this.checked == false)
      alert("delete promotion");
  });

  $("#product-table-list").on("click",".item-delete",function(){
    var item = $(this).closest("tr");
    if(confirm("确定要删除该商品?"))
      {
        $.ajax({
          type : "POST",
          url : "/item-delete",
          data : {"id" : parseInt(item.find(".item-id").text(),10)},
          dataType : "json",
          success : function(data){
            item.remove();
          }
        });
      }
  });
});
