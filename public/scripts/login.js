$("#login").on("click",function(){
    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();
    loginCheck(username, password);
    return false;
});

function loginCheck(username, password) {
    if(username != "admin" || password != "admin") {
        $(".message-danger > p").show();
    } else {
        location.href = "items.html";
    }
}
