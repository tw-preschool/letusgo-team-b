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
        var tr = $('<tr data-id = '+data.id+'>\
                      <td class = \"item-col-name\" >\
                      <dl>\
                      <dt class = \"item-name\">' + name + '</dt>\
                      <dd>' + description+ '</dd>\
                      </td>\
                      </dl>\
                      <td>' + price.toFixed(2) + '</td>\
                      <td>' + unit + '</td>\
                      <td>' + number + '</td>\
                      <td><input type="checkbox" class=\"item-promotion\"></td>\
                      <td><button class = \"edit-link\"><span aria-hidden=\"true\" class=\"icon-pen\"> 修改</button></td>\
                      <td><button class=\"btn btn-warning item-delete\"><span aria-hidden=\"true\" class=\"icon-trash\"> 删除</button></td>\
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
        console.log(data);
        var pro = new product(data.id,data.name,data.price,data.unit,cartHandle.addPromotionType(data.promotion),data.number);
        cartHandle.setItem(data.id,pro);
        if (isChecked === true){
          alert("已为"+name+"添加买二送一优惠!");
        }
        else if (isChecked === false){
          alert("已取消"+name+"的买二送一优惠!");
        }
      }
    });
  });

  $("#product-table-list").on("click",".item-delete",function(event){
    event.preventDefault();
    var item = $(this).closest("tr");
    var name = item.find(".item-name").text();
    if(confirm("确定要删除该商品?"))
    {
      var id = parseInt(item.data("id"),10);
      $.ajax({
        type : "POST",
        url : "/item-delete",
        data : {"id" : id , "name" : name},
        dataType : "json",
        success : function(data){
          item.remove();
        }
      });
    }
  });
  $("#product-table-list").on("click",".edit-link",function(event){
    event.preventDefault();
    var iNo = $(this).closest("tr").data("id");
    var cover = $("#cover");
    $.getJSON("/products/"+iNo,function(data){
      cover.find("#iName").val(data.name);
      cover.find("#iPrice").val(data.price.toFixed(2));
      cover.find("#iUnit").val(data.unit);
      cover.find("#iPromotion").val(data.promotion);
      cover.find("#iNumber").val(data.number);
      cover.find("#iDescription").val(data.description);
    });
    cover.find("#iNo").html(iNo+"");
    cover.fadeIn();
  });
   $(".back").on("click",function(){
    $("#cover").fadeOut();
  });
  $(".save-btn").on("click",function(){
    var cover = $("#cover");
    var id = parseInt($("#iNo").text(),10);
    var name = cover.find("#iName").val();
    var price = cover.find("#iPrice").val();
    var unit = cover.find("#iUnit").val();
    var promotion = cover.find("#iPromotion").val();
    var number = cover.find("#iNumber").val();
    var description = cover.find("#iDescription").val();
    var editItem = $(this).closest("tr");
    $.ajax({
      type : "POST",
      url : "/item-edit",
      context: editItem,
      data : {"id" : id,"item-info" :{"name" : name , "price" : price  ,
              "unit" : unit , "promotion" : promotion , "number" : number ,
              "description" : description}},
      dataType : "json",
      success : function(data){
        var tr =$('<td class = \"item-col-name\" >\
                      <dl>\
                      <dt class = \"item-name\">' + name + '</dt>\
                      <dd>' + description+ '</dd>\
                      </td>\
                      </dl>\
                      <td>' + price + '</td>\
                      <td>' + unit + '</td>\
                      <td>' + number + '</td>\
                      <td><input type="checkbox" class=\"item-promotion\"></td>\
                      <td><button class = \"edit-link\"><span aria-hidden=\"true\" class=\"icon-pen\"> 修改</button></td>\
                      <td><button class=\"btn btn-warning item-delete\"><span aria-hidden=\"true\" class=\"icon-trash\"> 删除</button></td>');
        $.each($("#product-table-list").find("tr"),function(item,index){
          if($(this).data("id") == id){
            $(this).html(tr);
          }
        });
        $("#cover").fadeOut();
      }
    });
  });
});
