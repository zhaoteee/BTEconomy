$(function() {
  getBanners();
  getS();
  function getS() {
    var ck = document.cookie.split(';');
    var res = ck.some(function(x) {
      if (x) {
       return x.split('=')[0] =='name';
      }
    })
    if (!res) {
      window.location.href = './login.html';
    }
  }
  $('.banners tbody').on('click', function (e) {
    var tar = e.srcElement ? e.srcElement : e.target;
    var $tar = $(tar);
    if (tar.nodeName === 'BUTTON' && $tar.is('.keepBan')) {
      var ids = $tar.attr('data-id') || 0;
      var imgurl = $tar.parent().prev().find('input[type=text]').val().trim();
      var jumpurl = $tar.parent().prev().prev().find('input[type=text]').val().trim();
      var title = $tar.parent().prev().prev().prev().find('input[type=text]').val().trim();
      var data = {
        "id": ids,
        "name": title,
        "httpss": jumpurl,
        "pic": imgurl
      }
      console.log(data);
      if (!data.name) {
        alert('请输入标题');
        return;
      }if (!data.httpss) {
        alert('请输入跳转链接');
        return;
      }if (!data.pic) {
        alert('请上传图片');
        return;
      }
      $.ajax({
        type: 'POST',
        url: 'http://www.lopkj.cn:8111/lampconsole/creatJdpic.action',
        dataType:"jsonp",
        jsonp: "callback",
        jsonpCallback: 'jsonpCallbackhcp',
        data: data,
        success: function (msg) {
          jsonpCallbackhcp(msg);
        }
      })
      function jsonpCallbackhcp(msg) {
         if (msg.state === 'success') {
            alert('保存成功');
          }
      }
    }
    if (tar.nodeName === 'INPUT' && $tar.is('.imgload-input')) {
      $tar.unbind('change');
       $tar.change(function () {
        var self = this,
            $self = $(this),
            _data = self.files[0];
        if (_data) {
            if (_data.size > (1024 * 1024 * 5)) {
                alert("请上传小于5M的图片！");
                clearFiles();
                return;
            }

            if (!extLimit(['jpg', 'png', 'gif', 'bmp', 'jpeg']).has(_data.name)) {
                alert("请上传正确的图片！");
                clearFiles();
                return;
            }

            var form = new FormData();
            form.append("fileToUpload", _data);

            $.ajax({ //
                url : "http://www.lopkj.cn:8111/lampconsole/UploadServlet.action",
                type : "POST",
                data : form,
                processData : false,
                contentType : false,
                dataType : "JSON"
            }).done(function(data) {
              jsonpCallbackhu(data);
                if (data.data) {
                    $self.parents('td').find('input[type=text]').val(data.data[0]);
                } else {
                    alert("上传失败，请重新再试");
                }
                clearFiles();
            });
        }
        function clearFiles() {
            self.value = "";
        }
        function extLimit(exts) {
            return {
                has : function(file) {
                    var arr = file.split("."),
                        ext = arr[arr.length - 1].toLowerCase();

                    return exts.indexOf(ext) > -1 ? true : false;
                }
            };
        }
      });
    }
  })
  // 获取栏目列表数据并渲染
  function getBanners() {
    $.ajax({
      type: 'get',
      url: 'http://www.lopkj.cn:8111/lampconsole/selectAllJdpic.action',
      dataType:"jsonp",
      jsonp: "callback",
      jsonpCallback: 'jsonpCallbackhsa',
      success: function (msg) {
        jsonpCallbackhsa(msg);
      }
    })
    function jsonpCallbackhsa(msg) {
      var data = msg.jList;
        rendBanners(data);
    }
  }
  function rendBanners(data) {
    var str = '';
    if (!data.length) {
      alert('暂无焦点图，请添加');
      return;
    }
    for (var i = 0, len = data.length; i < len; i++) {
      str += '<tr><td><input type="text" class="input-sm form-control" value='+data[i].name+'></td>'+
             '<td><input type="text" class="input-sm form-control" value='+data[i].httpss+'></td><td>'+
             '<div class="input-group">'+
             '<input type="text" class="form-control"  autocomplete="off" value='+data[i].pic+'>'+
             '<div class="input-group-addon"><label class="up-here">上传图片'+
             '<input type="file" class="imgload-input" name="fileToUpload"></label>'+
             '</div></div></td><td>'+
             '<button data-id='+data[i].id+' class="btn btn-info keepBan">保存</button></td></tr>';
    }
    $('.banners tbody').html(str);
  }
})