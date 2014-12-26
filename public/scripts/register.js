$(document).ready(function(){
   $("#registerButton").on("click",function(event){
     event.preventDefault();
    var email = $("#email").val() || "";
    var password = $("#password").val() || "";
    var repassword = $("#confirm-password").val() || "";
    var name = $("#name").val() || "";
    var address = $("#address").val() || "";
    var phone = $("#phone").val();
    var role = $("#role").val();
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
      console.log(email+" "+password+" "+name+"  "+address+" "+phone+"  "+role);
      saveToUser(email,password,name,address,phone,role);
    }
   });
   var saveToUser = function(email,password,name,address,phone,role){
       var sentMail = function(email,name){
           $.ajax({
               type : "POST",
               url : "/mailsent",
               data : {"email" :email, "name":name},
               dataType : "json",
               success : function(data){
                   if(data){
                       window.location.href = "/";
                   }else{
                       alert("email");
                   }
               },
               error : function(data){
                   //  console.log(dexist-errata);
                   $("#exist-err").show();
               }
           });
       };

     $.ajax({
       type : "POST",
       url : "/register",
       data : {"email" :email , "password" :password  , "name" :name ,
               "address" :address , "phone" :phone, "role" :role},
       dataType : "json",
       success : function(data){
         if(data){
           sentMail(email, name);
//           window.location.href = "/";
         }else{
           registerHandle.messageHelper("exist");
         }
       },
       error : function(data){
        //  console.log(dexist-errata);
        $("#exist-err").show();
       }
     });
   };


});
