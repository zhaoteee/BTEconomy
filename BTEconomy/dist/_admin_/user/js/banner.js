$(function(){function t(t){var n="";if(t.length){for(var e=0,a=t.length;e<a;e++)n+='<tr><td><input type="text" class="input-sm form-control" value='+t[e].name+'></td><td><input type="text" class="input-sm form-control" value='+t[e].httpss+'></td><td><div class="input-group"><input type="text" class="form-control"  autocomplete="off" value='+t[e].pic+'><div class="input-group-addon"><label class="up-here">上传图片<input type="file" class="imgload-input" name="fileToUpload"></label></div></div></td><td><button data-id='+t[e].id+' class="btn btn-info keepBan">保存</button></td></tr>';$(".banners tbody").html(n)}else alert("暂无焦点图，请添加")}!function(){function n(n){t(n.jList)}$.ajax({type:"get",url:"http://www.lopkj.cn:8111/lampconsole/selectAllJdpic.action",dataType:"jsonp",jsonp:"callback",jsonpCallback:"jsonpCallbackhsa",success:function(t){n(t)}})}(),document.cookie.split(";").some(function(t){if(t)return"name"==t.split("=")[0]})||(window.location.href="./login.html"),$(".banners tbody").on("click",function(t){function n(t){"success"===t.state&&alert("保存成功")}var e=t.srcElement?t.srcElement:t.target,a=$(e);if("BUTTON"===e.nodeName&&a.is(".keepBan")){var i=a.attr("data-id")||0,o=a.parent().prev().find("input[type=text]").val().trim(),l=a.parent().prev().prev().find("input[type=text]").val().trim(),p={id:i,name:a.parent().prev().prev().prev().find("input[type=text]").val().trim(),httpss:l,pic:o};if(console.log(p),!p.name)return void alert("请输入标题");if(!p.httpss)return void alert("请输入跳转链接");if(!p.pic)return void alert("请上传图片");$.ajax({type:"POST",url:"http://www.lopkj.cn:8111/lampconsole/creatJdpic.action",dataType:"jsonp",jsonp:"callback",jsonpCallback:"jsonpCallbackhcp",data:p,success:function(t){n(t)}})}"INPUT"===e.nodeName&&a.is(".imgload-input")&&(a.unbind("change"),a.change(function(){function t(){n.value=""}var n=this,e=$(this),a=n.files[0];if(a){if(a.size>5242880)return alert("请上传小于5M的图片！"),void t();if(!function(t){return{has:function(n){var e=n.split("."),a=e[e.length-1].toLowerCase();return t.indexOf(a)>-1}}}(["jpg","png","gif","bmp","jpeg"]).has(a.name))return alert("请上传正确的图片！"),void t();var i=new FormData;i.append("fileToUpload",a),$.ajax({url:"http://www.lopkj.cn:8111/lampconsole/UploadServlet.action",type:"POST",data:i,processData:!1,contentType:!1,dataType:"JSON"}).done(function(n){jsonpCallbackhu(n),n.data?e.parents("td").find("input[type=text]").val(n.data[0]):alert("上传失败，请重新再试"),t()})}}))})});
//# sourceMappingURL=banner.js.map