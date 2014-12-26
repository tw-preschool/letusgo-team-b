var registerHandle = (function(){
  return{
    isEmpty: function(str){
      if(str == ""){
        return true;
      }
        return false;
    },
    //用户名需符合email格式； （请输入正确的email）
    isEmail: function(email){
      if(this.isEmpty(email)){
        return false;
      }else{
        //var res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var res = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        return res.test(email) ? true : false;
      }

    },
    //密码长度至少6位； (密码长度不得小于6个字符)
    isPassword : function(password){
      var str = password.replace(/ /g,"");//替换全部空格
      //password.replace(/(^\s*)|(\s*$)/g, "");//相当于trim();
      if(str.length < 6 || this.isEmpty(password)){
        return false;
      }
      return true;
    },
    //姓名仅可使用汉字或字母，不得包含数字或下划线或特殊字符； （姓名中不可包含数字或下划线或特殊字符）
    isName : function(name){
      var Regx = /^[A-Za-z0-9]*$/;
      if(this.isEmpty(name)){
        return false;
      }else{
        return Regx.test(name);
      }
    },
    //电话只可使用数字，长度8～11位。（请输入8～11位正确电话号码）
    isTelephone : function(telephone){
      var str = telephone.replace(/ /g,"");
      var Regx = /^[0-9]*$/;
      if(Regx.test(telephone) && telephone.length >7 && telephone.length < 12 && !(this.isEmpty(telephone))){
        return true;
      }
      return false;
    },

    isEqual:function(pass1,pass2){
      if(this.isPassword(pass1) && this.isPassword(pass2)){
        if(pass1.indexOf(pass2) == 0 && pass2.indexOf(pass1) == 0){
          return true;
        }
      }
      return false;
    },
    messageHelper:function(message){
      var str = "#"+message+"-err";
      $("#email-err").hide();
      $("#pass-err").hide();
      $("#noneEqual-err").hide();
      $("#name-err").hide();
      $("#phone-err").hide();
      $("#exist-err").hide();
      $(str).show();
    }
  };
})();
