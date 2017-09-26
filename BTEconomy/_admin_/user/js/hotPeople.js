$(function () {
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
   getHotPeos();
  $('#addPeople').on('click', function () {
    var len = $('.peoples').find('tbody tr').length+1;
    var str = '<tr><td class="text-center">'+len+'</td>'+
              '<td><input type="text" class="input-sm form-control"></td><td>'+
              '<div class="input-group">'+
              '<input type="text" class="form-control" value="" autocomplete="off">'+
              '<div class="input-group-addon">'+
              '<label class="up-here">上传图片'+
              '<input type="file" class="imgload-input" name="fileToUpload">'+
              '</label></div></div></td>'+
              '<td class="text-center"><button class="btn btn-info keepPeo">保存</button>'+
              '<button class="btn btn-danger deletePeo">删除</button></td></tr>';
    $('.peoples').find('tbody').append(str);
  })
    $('.peoples tbody').on('click', function (e) {
        var tar = e.srcElement ? e.srcElement : e.target;
        var $tar = $(tar);
        if (tar.nodeName === 'BUTTON' && $tar.is('.keepPeo')) {
          var ids = $tar.attr('data-id') || 0;
          var imgurl = $tar.parent().prev().find('input[type=text]').val().trim();
          var jumpurl = $tar.parent().prev().prev().find('input[type=text]').val().trim();
          var data = {
            "id": ids,
            "httpss": jumpurl,
            "pic": imgurl
          }
          console.log(data);
          if (!data.httpss) {
            alert('请输入跳转链接');
            return;
          }if (!data.pic) {
            alert('请上传图片');
            return;
          }
          $.ajax({
            type: 'POST',
            url: 'http://www.lopkj.cn:8111/lampconsole/creatJdpeople.action',
            dataType:"jsonp",
            jsonp: "callback",
            jsonpCallback: 'jsonpCallbackhcjd',
            data: data,
            success: function (msg) {
              jsonpCallbackhcjd(msg);
            }
          })
          function jsonpCallbackhcjd(msg) {
            if (msg.state === 'success') {
                alert('添加成功！');
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
        if (tar.nodeName === 'BUTTON' && $tar.is('.deletePeo')) {
            var id = $tar.attr('data-id');
            if (id) {
                $.ajax({
                    type: 'GET',
                    url: 'http://www.lopkj.cn:8111/lampconsole/deletetJdpeople.action?id='+id,
                    dataType:"jsonp",
                    jsonp: "callback",
                    jsonpCallback: 'jsonpCallbackhdjd',
                    success: function (msg) {
                      jsonpCallbackhdjd(msg);
                    }
                })
                function jsonpCallbackhdjd(msg) {
                  if (msg.state === 'success') {
                        getHotPeos();
                        alert('删除成功！');
                  }
                }
            }
        }
    })

    // 获取列表数据并渲染
    function getHotPeos() {
        $.ajax({
          type: 'get',
          url: 'http://www.lopkj.cn:8111/lampconsole/selectAllJdpeople.action',
          dataType:"jsonp",
          jsonp: "callback",
          jsonpCallback: 'jsonpCallbackhsaj',
          success: function (msg) {
            jsonpCallbackhsaj(msg);
          }
        })
        function jsonpCallbackhsaj(msg) {
          var data = msg.jList;
          rendHotPeos(data);
        }
    }
    function rendHotPeos(data) {
        var str = '';
        if (!data.length) {
          alert('暂无焦点人物，请添加');
          return;
        }
        for (var i = 0, len = data.length; i < len; i++) {
          str += '<tr><td class="text-center">'+(i+1)+'</td>'+
                '<td><input type="text" class="input-sm form-control" value='+data[i].httpss+'></td>'+
                '<td><div class="input-group">'+
                '<input type="text" class="form-control" autocomplete="off" value='+data[i].pic+'>'+
                '<div class="input-group-addon">'+
                '<label class="up-here">上传图片'+
                '<input type="file" class="imgload-input" name="fileToUpload">'+
                '</label></div></div></td>'+
                '<td class="text-center">'+
                '<button data-id='+data[i].id+' class="btn btn-info keepPeo">保存</button>'+
                '<button data-id='+data[i].id+' class="btn btn-danger deletePeo">删除</button></td></tr>'
        }
        $('.peoples tbody').html(str);
    }
})