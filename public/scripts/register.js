$(document).ready(function(){
   $("#registerButton").on("click",function(event){
     event.preventDefault();
    var email = $("#email").val() || "";
    var password = $("#password").val() || "";
    var repassword = $("#confirm-password").val() || "";
    var name = $("#name").val() || "";
    var address = $("#address").val() || "";
    var phone = $("#phone").val();
    if(!(registerHandle.isEmail(email))){
      registerHandle.messageHelper("email");
    }else if(!(registerHandle.isPassword(password))){
      registerHandle.messageHelper("pass");
    }else if(!(registerHandle.isEqual(password,repassword))){
      registerHandle.messageHelper("noneEqual");
    }else if(!(registerHandle.isName(name))){
      registerHandle.messageHelper("name");
    }else if(!(registerHandle.isTelephone(phone))){
      registerHandle.messageHelper("phone");
    }else{
      console.log(email+" "+password+" "+name+"  "+address+" "+phone);
      saveToUser(email,password,name,address,phone);
    //
    }
   });
   var saveToUser = function(email,password,name,address,phone){
     $.ajax({
       type : "POST",
       url : "/register",
       data : {"email" :email , "password" :password  , "name" :name ,
               "address" :address , "phone" :phone},
       dataType : "json",
       success : function(data){
         if(data){
           window.location.href = "/";
         }else{
           registerHandle.messageHelper("exist");
         }
       },
       error : function(data){
         console.log(data);
       }
     });
   };
});
