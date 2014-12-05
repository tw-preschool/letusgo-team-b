$(document).ready(function(){
  $("#login").on('click',function(event){
    event.preventDefault();
    var name = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    if(name.length === 0 || password.length === 0){
      $(".message-danger > p").show();
    }
    $.ajax({
      type : "POST",
      url : "/login",
      data : {"name":name,"password":password},
      dataType : "json",
      success : function(result){
        if(result === true){
          window.location.href = '/admin';

        }else{
          $(".message-danger > p").show();
        }
      }

    });
  });
});
