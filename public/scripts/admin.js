$(document).ready(function(){
  $("#addbutton").on("click",function(){
    var name = $("#iName").val();
    var price = $("#iPrice").val();
    var unit = $("#iUnit").val();
    var promotion = "false";
    var number = $("#iNumber").val();
    var description = $("#iDescription").val();
    $.ajax({
      type : "POST",
      url : "/products",
      data : {"name" : name , "price" : price  , "unit" : unit ,
              "promotion" : promotion , "number" : number ,
              "description" : description},
      dataType : "json",
      success : function(data){
        var tr = $('<tr>\
                      <td class = \"item-id hide\">' + data.id + '</td>\
                      <td class = \"item-col-name\">\
                      <dl>\
                      <dt class = \"item-name\">' + name + '</dt>\
                      <dd>' + description+ '</dd>\
                      </td>\
                      </dl>\
                      <td>' + price + '</td>\
                      <td>' + unit + '</td>\
                      <td>' + number + '</td>\
                      <td><input type="checkbox" class=\"item-promotion\"></td>\
                      <td><a href=\"/item-edit/'+data.id+'\" class = \"edit-link\"><span aria-hidden=\"true\" class=\"icon-pen\"> 修改</a></td>\
                      <td><button class=\"btn btn-primary item-delete\"><span aria-hidden=\"true\" class=\"icon-trash\"> 删除</button></td>\
                      </tr>');
        $("#product-table-list").append(tr);
      }
    });
  });

  $("#product-table-list").on("click",".item-promotion",function(){
    var item = $(this).closest("tr");
    var name = item.find(".item-name").text();
    var isChecked = this.checked;
    $.ajax({
      type : "POST",
      url : "/item-promotion",
      data : {"id" : parseInt(item.find(".item-id").text(),10) ,
              "name" : name , "promotion": isChecked},
      dataType : "json",
      success : function(data){
        if (isChecked === true)
          alert("已为"+name+"添加买二送一优惠!");
        else if (isChecked === false)
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
