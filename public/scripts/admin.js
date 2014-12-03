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
});
