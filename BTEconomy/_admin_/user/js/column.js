$(function () {
    // 存储所有栏目信息
    var allColumns = [];
    initColunm();
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
       //标签选择逻辑
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

    function initColunm() {
        initTags();
        getColumns();
    }
    // 新建栏目
    $('#addColumn .js-addColumn').on('click', function () {
       var url = 'http://www.lopkj.cn:8111/lampconsole/creatProject.action';
       upColumn(url, null)
    })
   
    // 操作栏目
    $('.columns tbody').on('click', function (e) {
        var t = e.srcElement ? e.srcElement : e.target;
        // 删除
        if (t.nodeName === 'SPAN' && $(t).is('.deleteColumn')) {
            var id = $(t).parents('tr').attr('data-id');
            var cfm = confirm('确认删除吗？');
            if (cfm) {
               $.ajax({
                    type: 'get',
                    url: 'http://www.lopkj.cn:8111/lampconsole/deleteProject.action?id='+id,
                    dataType:"jsonp",
                    jsonp: "callback",
                    jsonpCallback: 'jsonpCallbackhdp',
                    success: function (msg) {
                        jsonpCallbackhdp(msg);
                    }
                })
                function  jsonpCallbackhdp(msg) {
                    if (msg.state === 'success') {
                        getColumns(); 
                    }
                }
            }
        }
        // 是否显示切换
        if (t.nodeName === 'SPAN' && $(t).is('.changeColumn')) {
            var id = $(t).parents('tr').attr('data-id');
            var state = $(t).attr('state');
            if (parseInt(state) === 2) {
                $.ajax({
                    type: 'get',
                    url: 'http://www.lopkj.cn:8111/lampconsole/updateStateById.action?state=1&id='+id,
                    dataType:"jsonp",
                    jsonp: "callback",
                    jsonpCallback: 'jsonpCallbackhus',
                    success: function (msg) {
                       jsonpCallbackhus(msg);
                    }
                })
                function  jsonpCallbackhus(msg) {
                    if (msg.state === 'success') {
                            $(t).removeClass('label-default')
                                .addClass('label-info')
                                .attr('state','1')
                                .text('显示(是)');
                            // getColumns();
                    }
                } 
            } 
            if (parseInt(state) === 1) {
                $.ajax({
                    type: 'get',
                    url: 'http://www.lopkj.cn:8111/lampconsole/updateStateById.action?state=2&id='+id,
                    dataType:"jsonp",
                    jsonp: "callback",
                    jsonpCallback: 'jsonpCallbackhus1',
                    success: function (msg) {
                        jsonpCallbackhus(msg)
                    }
                })
                function  jsonpCallbackhus(msg) {
                    if (msg.state === 'success') {
                            $(t).addClass('label-default')
                                .removeClass('label-info')
                                .attr('state','2')
                                .text('显示(否)');
                            // getColumns();
                    }
                }  
            }
          
        }
        // 编辑
        if (t.nodeName === 'SPAN' && $(t).is('.editColumn')) {
            var curColumnTags = [];
            var str = '';
            var id = $(t).parents('tr').attr('data-id');
            var text = $(t).parent().parent().prev().text();
            $('#addColumn .js-addColumn').addClass('hide');
            $('#addColumn .js-editColumn').removeClass('hide');
            $('#addColumn input[type=text]').val(text);
            // 获取到当前点击栏目的关联标签信息
            for (var j = 0, len = allColumns.length; j < len; j++) {
                if (allColumns[j].id == id) {
                   curColumnTags =  allColumns[j].BList;
                   break;
                }
            }
            for (var n = 0, leng = curColumnTags.length; n < leng; n++) {
                str += '<span data-id='+curColumnTags[n].id+'>'+curColumnTags[n].name+'</span>';
                $tagsWrapper.find('input[data-id='+curColumnTags[n].id+']').prop('checked','checked');
            }
            $tagsList.html(str);
            $('#addColumn').modal('show');
            $('#addColumn .js-editColumn').unbind('click');
            $('#addColumn .js-editColumn').on('click', function () {
                var url = 'http://www.lopkj.cn:8111/lampconsole/updateProject.action'
                upColumn(url, id);
            })
        }
    })
    $('#addColumn').on('hidden.bs.modal', function () {
        $('#addColumn input[type="text"]').val('');
        $tagsList.html('');
        $tagsWrapper.find('input[type="checkbox"]').removeAttr('checked');
        $('#addColumn .js-addColumn').removeClass('hide');
        $('#addColumn .js-editColumn').addClass('hide');
    })

    // 获取栏目列表数据并渲染
    function getColumns() {
        $.ajax({
            type: 'get',
            url: 'http://www.lopkj.cn:8111/lampconsole/selectProject.action',
            dataType:"jsonp",
            jsonp: "callback",
            jsonpCallback: 'jsonpCallbackhuspr',
            success: function (msg) {
                jsonpCallbackhuspr(msg);
            }
        })
        function jsonpCallbackhuspr(msg) {
            var data = msg.bList;
            allColumns = data;
            rendColumns(data);
        }
    }
    // 渲染栏目列表
    function rendColumns(data) {
        var str = '';
        for (var i = 0, len = data.length; i < len; i++) {
            str +=  '<tr data-id='+data[i].id+'><td class="text-center">'+(i+1)+'</td>'+
                    '<td>'+data[i].name+'</td><td><a class="table_operate">'+
                    '<span class="editColumn label label-success mr-5 trans">编辑</span>'+
                    '</a><a class="table_operate">'+
                    '<span class="deleteColumn label label-danger mr-5">删除</span>'+
                    '</a><a class="table_operate">'+
                    '<span state='+data[i].state+' class="changeColumn label mr-5 '+(parseInt(data[i].state) === 1 ? 'label-info' : 'label-default')+'"'+
                    '>'+(parseInt(data[i].state) === 1 ? '显示(是)' : '显示(否)')+'</span>'+
                    '</a></td></tr>'
        }
        $('.columns tbody').html(str);
    }
     // 进入页面获取tags数据并更新列表
    function initTags() {
        $.ajax({
            type: 'get',
            url: 'http://www.lopkj.cn:8111/lampconsole/selectAllBall.action',
            dataType:"jsonp",
            jsonp: "callback",
            jsonpCallback: 'jsonpCallbackhusab',
            success: function (msg) {
                jsonpCallbackhusab(msg);
            }
        })
        function jsonpCallbackhusab(msg){
            var data = msg.bList;
            var str = '';
            for (var i = 0, len = data.length; i < len; i++) {
                str +=  '<label>'+data[i].name+' <input data-id='+data[i].id+' type'+
                        '="checkbox" value='+data[i].name+' /></label>'
            }
            $tagsWrapper.html(str);
        }

    }
     //新建与编辑栏目
    function upColumn(url, id) {
        var name = $('#addColumn input[type=text]').val().trim();
        var num = '';
        $tagsList.find('span').each(function (i) {
            num += $(this).attr('data-id')+',';
        })
        if (!name) {
            alert('请填写栏目名');
            return
        }
        if (!num) {
            alert('请选择关联标签！');
            return
        }
        var data = {}
        if (!id) {
            data = {
                "name": name,
                "number": num.substr(0, num.length-1)
            }
        } else {
            data = {
                "name": name,
                "number": num.substr(0, num.length-1),
                "id": id
            }
        }
        $.ajax({
            type: 'POST',
            url: url,
            dataType:"jsonp",
            jsonp: "callback",
            jsonpCallback: 'jsonpCallbackhusgg',
            data: data,
            success: function (msg) {
                jsonpCallbackhusgg(msg);
             }
        })
        function jsonpCallbackhusgg(msg) {
            if (msg.state === '栏目已经存在') {
                    alert('栏目已经存在')
                }
                if (msg.state === 'success') {
                    getColumns();
                    $('#addColumn').modal('hide');
            }
        }
    }

})