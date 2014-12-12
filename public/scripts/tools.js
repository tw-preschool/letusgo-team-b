$(document).ready(function(){
  $("#cancle-excced").on("click",function(){
    $("#excced-msg").fadeOut();
  });

  $("#cancle-wrong").on("click",function(){
    $("#wrong-input").fadeOut();
  });

  $("#cancle-error").on("click",function(){
    $("#error-msg").fadeOut();
  });

  $("#cancle-null").on("click",function(){
    $("#null-msg").fadeOut();
  });
});
