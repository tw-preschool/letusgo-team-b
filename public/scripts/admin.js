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
        alert("successfully adding item");
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
    var name = $(this).closest("tr").find(".item-name").text();
    $.ajax({
      type : "POST",
      url : "/item-delete",
      data : {"name" : name},
      dataType : "json",
      success : function(data){
        alert("successfully adding item");
      }
    });
  });
});
