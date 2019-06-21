
$(function(){
    ajaxloadgujia()
    $("#querysearch").click(function(){
        $('#usergujia tbody').html("")
        ajaxloadgujia()
    })
    function ajaxloadgujia(){
       var searchid={searchid:$('#rolename').val().trim()};
        
    $.ajax({
        url:"http://127.0.0.1:3001/main/getgujia",
        data:searchid,
        dataType:"jsonp",
        success:function(data){
            if(data.length==0){
                alert("无该用户的评估单信息")
            }
            else {
                console.log(data)               
                for(var i=0;i<data.length;i++){
                var tr=$("<tr>");
                if(data[i].status==0)data[i].status="待评估"
                else if(data[i].status==1)data[i].status="已评估"
                else if(data[i].status==2)data[i].status="用户已确认"
                var tempstr;
                if(data[i].carprice==null){
                    data[i].carprice="";
                    tempstr=`<a href="/edit?s0=${data[i].username}&&s1=${data[i].carfrom}&&s2=${data[i].cartype}&&s3=${data[i].sptime}&&s4=${data[i].distance}&&s5=${data[i].hadtru}&&s6=${data[i].carprice}&&s7=${data[i].carlevel}&&s8=${data[i].status}">报价</a>`
                }
                else tempstr="";
                if(data[i].carlevel==null) data[i].carlevel="";

                if(data[i].status!=3){
                tr.html(
                `<td><input type="checkbox" class="pinggucheckbox"></input></td>
                <td>${data[i].username}</td>
                <td>${data[i].carfrom}</td>
                <td>${data[i].cartype}</td>
                <td>${data[i].sptime}</td>
                <td>${data[i].distance}</td>
                <td>${data[i].hadtru}</td>
                <td>${data[i].carprice}</td>
                <td>${data[i].carlevel}</td>
                <td>${data[i].status}</td>
                <td>${tempstr}
                <a href="javascript:;">删除</a></td>
                `)
                $('#usergujia tbody').append(tr)
                }
                }
                for(var j=0;j<$("#usergujia tbody td:last-child").length;j++){
                   (new edittd($("#usergujia tbody td:last-child")[j])).init()
                } 
            }
        }
    })
    } 
    function edittd(edit){
        if(edit.children.length>1){
        this.edittd=edit.children[0];
        this.deltd=edit.children[1];
        }
        else{
        this.edittd={};
        this.deltd=edit.children[0];   
        }
        this.edittr=edit.parentNode;
        this.editalltd=edit.parentNode.children;
    }
    edittd.prototype.init=function(){
        edittd.prototype.toeditpage(this);
        edittd.prototype.todeleted(this);
    }
    edittd.prototype.toeditpage=function(obj){
        obj.edittd.onclick=function(){
            var editcon={};
            for(var i=0;i<obj.editalltd.length-1;i++)
            {
                var tempstr="s"+i;
                editcon[tempstr]=obj.editalltd[i].innerHTML;
            }
            console.log(editcon)
            $.ajax({
                url:"http://127.0.0.1:3001/edit",
                data:editcon,
                dataType:"jsonp",
                success:function(data){
                }
            })
        }
    } 
    edittd.prototype.todeleted=function(obj){
        obj.deltd.onclick=deletedfn;
    }
    var deletedfn=function(){
      
        
            if(this.parentNode.parentNode.children[9].innerHTML.trim()!="用户已确认"){
                alert("所选项包含用户未确认或为评估项，不予删除")
            }
        else{
            var itemdata={
                username:this.parentNode.parentNode.children[1].innerHTML*1,
                carfrom:this.parentNode.parentNode.children[2].innerHTML,
                cartype:this.parentNode.parentNode.children[3].innerHTML,
                sptime:this.parentNode.parentNode.children[4].innerHTML,
                distance:this.parentNode.parentNode.children[5].innerHTML*1,
                hadtru:this.parentNode.parentNode.children[6].innerHTML,
                carprice:this.parentNode.parentNode.children[7].innerHTML*1,
                carlevel:this.parentNode.parentNode.children[8].innerHTML,
                status:2
            }
            console.log(itemdata)
            $.ajax({
                url:"http://127.0.0.1:3001/edit/deletechecked",
                data:itemdata,
                dataType:"jsonp",
                success:function(data){
                    if(data=="success"){
                        console.log("success")
                        location.href=location.href;
                    }
                },
                beforSend:()=>{
                }
            })
        }
        
    }
    function pinggucheckbox(){
        $("#allcheck").click(function(){
            var pinggucheckbox=$('.pinggucheckbox');
            if($(this)[0].checked)
            {              
                for(var i=0;i<pinggucheckbox.length;i++)
                {                 
                   pinggucheckbox[i].checked=true;
                }
            }
            else{
                for(var i=0;i<pinggucheckbox.length;i++)
                {                 
                   pinggucheckbox[i].checked=false;
                }
            }
        })
    }
    pinggucheckbox()
    function deleteMany(checkitem){
        if(checkitem.children[9].innerHTML.trim()!="用户已确认"){
            alert("所选项包含用户未确认或为评估项，不予删除")
        }
        else{    
            var data={username:checkitem.children[1].innerHTML*1,
            carfrom:checkitem.children[2].innerHTML,
            cartype:checkitem.children[3].innerHTML,
            sptime:checkitem.children[4].innerHTML,
            distance:checkitem.children[5].innerHTML*1,
            hadtru:checkitem.children[6].innerHTML,
            carprice:checkitem.children[7].innerHTML*1,
            carlevel:checkitem.children[8].innerHTML,
            status:2
            }
            console.log(data)
            $.ajax({
                url:"http://127.0.0.1:3001/edit/deletechecked",
                data:data,
                dataType:"jsonp",
                success:function(data){
                    if(data=="success")
                    location.href=location.href;
                }
            })
        }
       
    }
    $('#pishan').click(function(){
        var checkson= $('.pinggucheckbox');
        
        for(var i=0;i<checkson.length;i++)
        {       
            if(checkson[i].checked)
            deleteMany(checkson[i].parentNode.parentNode)   
        }
    })

})

