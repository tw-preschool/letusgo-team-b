$(document).ready(function(){
  $("#login").on('click',function(event){
    event.preventDefault();
    var email = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    if(email.length === 0 || password.length === 0){
      $("#err-msg").show();
    }
    $.ajax({
      type : "POST",
      url : "/login",
      data : {"email":email,"password":password},
      dataType : "json",
      success : function(result){
        console.log(result);
         if(result === true){
           window.location.href = '/';
         }else{
           $("#err-msg").show();
         }
      }
    });
  });
});
