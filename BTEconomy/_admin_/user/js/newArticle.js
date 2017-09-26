$(function () {
    initTags();
    // 根据课程id获取课程信息
    var articleid = 0;
    getUrl();
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
    // 渲染富文本编辑器
    var E = window.wangEditor;
    var editor = new E('#editor');
    // editor.customConfig.uploadImgShowBase64 = true;
    editor.customConfig.uploadFileName = 'fileToUpload'
    editor.customConfig.uploadImgServer = "http://www.lopkj.cn:8111/lampconsole/UploadServlet.action";
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    editor.create();
    var $articleTitle = $('.articleTitle');
    var $articleSubtitle = $('.articleSubtitle');
    var $articleSmallimg = $('.articleSmallimg');
    var $articleAuthor = $('.articleAuthor');
    var $articleSource = $('.articleSource');

   
    //js逻辑
    var $addTags = $('.addTags');
    var $tagsWrapper = $('.tagsWrapper');
    var $tagsList = $('.tagsList');
    $addTags.on('click', function () {
        $tagsWrapper.toggleClass('height70')
    })
    $tagsWrapper.on('click', function (e) {
        var t = e.srcElement ? e.srcElement : e.target;
        var str = ''
        var $tar = $(t)
        if (t.nodeName === 'INPUT') {
            var id = $tar.attr('data-id');
            $tagsWrapper.find('input:checked').each(function () {
                str += '<span data-id='+$(this).attr("data-id")+'>'+$(this).val()+'</span>'
            })
            $tagsList.html(str);
        }
    })
     $('.imgload-input').change(function () {
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
                    $self.parents('div.input-group-addon').prev().val(data.data[0]);
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
    document.getElementById('publishArticle').onclick = function () {
        var num = '';
        var url ='';
        $tagsList.find('span').each(function (i) {
            num += $(this).attr('data-id')+',';
        })
        var data = {
            "name": $articleTitle.val().trim(),
            "fname": $articleSubtitle.val().trim(),
            "pic": $articleSmallimg.val(),
            "user": $articleAuthor.val().trim(),
            "source": $articleSource.val().trim(),
            "word": editor.txt.html(),
            "number": num.substr(0, num.length-1),
            "id": articleid
        }
        if (!data.name) {
            alert("请输入文章标题！")
            return;
        }if (!data.fname) {
            alert("请输入文章副标题！")
            return;
        }if (!data.pic) {
            alert("请输入文章缩略图！")
            return;
        }if (!data.user) {
            alert("请输入文章作者名称！")
            return;
        }if (!data.source) {
            alert("请输入文章来源！")
            return;
        }if (!data.number) {
            alert("请选择文章标签！")
            return;
        }
        if (articleid) {
            url = 'http://www.lopkj.cn:8111/lampconsole/updateWordsById.action'
        } else {
            url = 'http://www.lopkj.cn:8111/lampconsole/creatWords.action'
        }
        keepAndEdit(url, data);
    }
    // 保存或编辑文章
    function keepAndEdit(url, data) {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function (msg) {
                var obj = JSON.parse(msg);
                if (obj.state === 'success') {
                    alert('上传成功！');
                    window.location.href='./articles.html'
                } else if (obj.state === '文章已存在') {
                    alert('文章已存在');
                } 
             }
        })
    }
    // 进入页面获取tags数据并更新列表
    function initTags() {
        $.ajax({
            type: 'get',
            url: 'http://www.lopkj.cn:8111/lampconsole/selectAllBall.action',
            success: function (msg) {
                var obj = JSON.parse(msg);
                var data = obj.bList;
                var str = '';
                for (var i = 0, len = data.length; i < len; i++) {
                    str +=  '<label>'+data[i].name+' <input data-id='+data[i].id+' type'+
                            '="checkbox" value='+data[i].name+' /></label>'
                }
                $tagsWrapper.html(str);
            }
        })
    }
    //  获取url
    function getUrl() {
        var url = window.location.href;
        var aid = url.split('?')[1]
        if (aid) {
            aid = aid.split('&')[0]
        }
        if (aid && aid.split('=')[0]==='id') {
            articleid = aid.split('=')[1];
            getArticleInfo(articleid);
        }
    }
    // 获取对于id的课程信息
    function getArticleInfo(articleid) {
        $.ajax({
            type: 'get',
            url: 'http://www.lopkj.cn:8111/lampconsole/selectWordsById.action?id='+articleid,
            success: function (msg) {
                var obj = JSON.parse(msg);
                var data = obj.word;
                insertInfo(data);
            }
        })
    }
    // 填入课程信息
    function insertInfo(data) {
        var str = '';
        $articleTitle.val(data.name);
        $articleSubtitle.val(data.fname);
        $articleAuthor.val(data.userr);
        $articleSource.val(data.source);
        $articleSmallimg.val(data.pic)
        for (var n = 0, leng = data.bList.length; n < leng; n++) {
            str += '<span data-id='+data.bList[n].id+'>'+data.bList[n].name+'</span>';
            $tagsWrapper.find('input[data-id='+data.bList[n].id+']').prop('checked','checked');
        }
        $tagsList.html(str);
        editor.txt.html(data.word);
    }
})