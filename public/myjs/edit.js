$(function(){
    var reg=/^([1-9]\d*|0)(\.\d{1,2})?$/;
    $("#carprice").blur(function(){      
        var str=$("#carprice").val();
        if(!reg.test(str)){
            $(".spantip").eq(0).css("display","block")
        }
        else{
            $(".spantip").eq(0).css("display","none")
        }
    })
    $("#cark").blur(function(){
        var str=$("#cark").val();
        if(!reg.test(str)&&str<0.08&&str>0.09){
            $(".spantip").eq(1).css("display","block")
        }
        else{
            $(".spantip").eq(1).css("display","none")
        }
    })
    $("#getprice").click(function(){
        var carprice=$("#carprice").val();
        var cark=$("#cark").val();
        if(!carprice||!cark){
            $(".spantip").eq(0).css("display","block")
        }
        else if(!reg.test(carprice)){
            $(".spantip").eq(0).css("display","block")
        }
        else if(!reg.test(cark)&&cark<0.08&&cark>0.09){
            $(".spantip").eq(1).css("display","block")
        }
        else{
            $(".spantip").eq(0).css("display","none")
            var sptime=$("#str3").text().trim().split("-")[0];
            var distance=$("#str4").text()*1;
            var hadtru=$("#str5").text();
            var d=0;
            var t=0;
            if(distance<=1) d=0.98;
            else if(1<distance<=2) d=0.95;
            else if(2<distance<=4) d=0.9;
            else if(4<distance<=8) d=0.85;
            else if(8<distance<=15) d=0.8;
            else if(distance>15) d=0.75;
            if(hadtru=="0次")t=0;
            else if(hadtru=="1-2次")t=1;
            else if(hadtru=="多次")t=2;
            var nowyear=(new Date()).getFullYear();
            var username=$("#str7").text();
            var carlevel="";
            var price=((1*carprice-1*carprice*cark*(nowyear-sptime))*d-t).toFixed(2);
            if(price>=0.8*carprice){
               carlevel="A";
            }
            else if(price>0.5*carprice&&price<0.8*carprice){
                carlevel="B";
            }
            else if(price<=0.5*carprice){
                carlevel="C";
            }
            else if(price<=1) carlevel="评估不通过"
            
            $.ajax({
                url:"http://127.0.0.1:3001/edit/getprice",
                data:{price:price,username:username,carlevel:carlevel,status:0},
                dataType:"jsonp",
                success:function(data){
                    if(data=="success"){
                        $("#carprice").parent().eq(0).html(price+"万元");
                        $("#cark").parent().eq(0).html(cark);
                        $("#carlevel").html(carlevel);
                        $("#status").html("已评估")
                        $("#getprice").css("display","none")
                    }
                }
            })
        }
    })
})