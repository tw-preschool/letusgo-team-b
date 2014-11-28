$(document).ready(function(){
  $.ajax({
      type: "GET",
      url: "/products",
      data: null,
      dataType: "json",
      success: function(data){
                  appendTr(data);
                  bindClickEvent();
              }
    });
    function appendTr(data){
      for(var i=0;i<data.length;i++){
          var tr = $('<tr' + ' id=' + '\"' + i +'\"' + '>\
                        <td>' + data[i].name + '</td>\
                        <td>' + data[i].unit + '</td>\
                        <td>' + data[i].price + '</td>\
                        <td class=' + '\"'+'text-center'+'\"' + '>' +
                        '<button '+'id='+'\"'+i+'\"'+' type=' +'\"'+'button'+'\"'+' class='+'\"'+'btn btn-primary'+'\">'+'加入购物车'+'</button>'+'</td>\
                      </tr>');
          $('#body-list').append(tr);
      }
    }
    function bindClickEvent(){
        $('#body-list button').click(function(){
            alert('successfully adding in the shopping cart!');
        });
    }
});
