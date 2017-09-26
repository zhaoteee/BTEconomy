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
  initTags(1);
  // 添加标签
  $('.js-addTag').on('click', function () {
    var str = $('#addcl1').find('input[type=text]').val().trim();
    if (!str) {
      alert('请输入标签名');
      return false;
    } else {
      $.ajax({
        type: 'post',
        url: 'http://www.lopkj.cn:8111/lampconsole/creatBall.action',
        data: 'name='+str,
        success: function (msg) {
          var obj = JSON.parse(msg)
          if (obj.state === "success") {
            initTags(1);
            $('#addcl1').modal('hide')
          } else {
            alert('添加失败！');
          }        
        }
      })
    }
  })
  // 编辑与删除标签
  $('.tagsWrapper').on('click', function (e) {
    var t = e.srcElement ? e.srcElement : e.target;
    if (t.nodeName === 'SPAN' && $(t).is('.edit-tag')) {
      var text = $(t).parent().parent().prev().text();
      var id   = $(t).attr('data-di');
      $('#editTag').find('input[type=text]').val(text).attr('data-di',id);
      $('#editTag').modal('show');
      $('#editTag').find('.js-editTag').unbind('click');
      $('#editTag').find('.js-editTag').on('click', function () {
        var data = {
          "id": id,
          "name": $('#editTag').find('input[type=text]').val()
        }
        $.ajax({
          type: 'POST',
          url: 'http://www.lopkj.cn:8111/lampconsole/updateBall.action',
          data: data,
          success: function (msg) {
            var obj = JSON.parse(msg);
            if (obj.state === 'success') {
              initTags(1);            
              $('#editTag').modal('hide');
            } else {
              alert('更新失败！');
            }
          }
        })
      })
    }
    if (t.nodeName === 'SPAN' && $(t).is('.delete-tag')) {
      var i = $(t).attr('data-di');
      var con = confirm('确认删除？');
      if (con) {
        $.ajax({
          type: 'get',
          url: 'http://www.lopkj.cn:8111/lampconsole/deleteBall.action?id='+i,
          success: function (msg) {
            initTags(1);
          }
        })
      }
    }
  })

  //函数
  // 进入页面获取tags数据并更新列表
  function initTags(pageNum) {
     $.ajax({
        type: 'get',
        url: 'http://www.lopkj.cn:8111/lampconsole/selectBall.action?page='+pageNum,
        success: function (msg) {
          var obj = JSON.parse(msg);
          var data = obj.bList;
          rendTag(data);
          initPagination(obj);
        }
    })
  }
  //渲染标签列表
  function rendTag(data) {
    if (typeof data !== 'object' || !Array.isArray(data)) {
      return;
    }
    var str = '';
    for (var i = 0, len = data.length; i < len; i++) {
      str +=  '<tr class=""><td style="" class="">'+(i+1)+'</td>'+
              '<td style="" class="">'+data[i].name+'</td>'+
              '<td style="" class=""><a class="table_operate">'+
              '<span class="edit-tag label label-success mr-5 trans" data-di='+data[i].id+'>编辑</span>'+
              '</a><a class="table_operate">'+
              '<span class="delete-tag label label-danger mr-5" data-di='+data[i].id+'>删除</span></a></td></tr>';
    }
    $('.tagsWrapper').find('tbody').html(str)
  }
  function initPagination(data) {
    var options = {
      currentPage: data.page,
      totalPages: data.zong,
      numberOfPages:5,
      "onPageClicked": function(event, originalEvent, type, page) {
        initTags(page);
      }
    }
    $('#pg').bootstrapPaginator(options);
  }
})