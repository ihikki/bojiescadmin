$(function(){
    console.log($("#loginbtn"))
    $("#loginbtn").click(function(){
       var username=$("#username").val();
       var pwd=$("#password").val();
       var logindata={
        "username":username,
        "pwd":pwd
        }
        console.log(logindata)
    $.ajax({
        url:'http://127.0.0.1:3001/main/login',
        data:logindata,
        dataType:"jsonp",
        success:function(data){
            if(data==0)
            alert("帐号密码错误，请重新输入")
            else if(data==1)
            alert("非管理员用户无法进入")
            else if(data==2){
            setTimeout(function(){
            $("#username").val("");
            $("#password").val("")
            location.href = location.href;
            },500);
            }
            else{
                alert("服务器错误")
            }
        }
        
    });
    })
})