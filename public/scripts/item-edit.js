$(document).ready(function(){
    $("#save-btn").on("click",function(){
      var nos = parseInt($("#iNo").text().split(":")[1],10);
      var name = $("#iName").val();
      var price = $("#iPrice").val();
      var unit = $("#iUnit").val();
      $.ajax({
        type : "POST",
        url : "/item-edit",
        data : {"id" : nos,"item-info" :{"name" : name , "price" : price  , "unit" : unit}},
        dataType : "json",
        success : function(data){
          alert("successfully change item");
          location.href = "/admin";
        }
      });
    });
});
