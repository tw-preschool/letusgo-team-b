$(document).ready (function(){
  $(".div-table").on("click",".details-link",function(){
    var orderId = parseInt($(this).closest("tr").data("id"),10);
    $.ajax({
      type : "GET",
      url : "/detail",
      data : {"id" : orderId},
      dataType : "json",
      success : function(data){
        var htmlArray =[];
        $.each(data,function(index,item){
          var tr = $('<tr data-id = '+this.id+'>\
                      <td>' + this.name + '</td>\
                      <td>' + this.unit + '</td>\
                      <td>' + this.price + '</td>\
                      <td>' + this.number + '</td>\
                      <td>' + this.promotion + '</td>\
                      <td>' + this.numberForFree + '</td>\
                      <td>' + this.totalcost + '</td>\
                      </tr>');
                      htmlArray.push(tr);
        });
        $("#detail-table-list").html(htmlArray);
      }
    });

    $(".details").fadeIn();
    $(".div-table").fadeOut();
  });
  $(".returnOrder-link").on("click",function(){
    $(".details").fadeOut();
    $(".div-table").fadeIn();
  });
});
