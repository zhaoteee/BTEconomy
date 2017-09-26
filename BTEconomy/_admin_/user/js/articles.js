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
  getArticles(1);
  getName();
  $('.articles table tbody').on('click', function(e) {
    var t = e.srcElement ? e.srcElement : e.target;
    // 删除
    if (t.nodeName === 'SPAN' && $(t).is('.deleteArticle')) {
      var id = $(t).attr('data-id');
      var cfm = confirm('确认删除吗？');
      if (cfm) {
        $.ajax({
          type: 'get',
          url: 'http://www.lopkj.cn:8111/lampconsole/deleteWordsByPeople.action?id='+id,
          dataType:"jsonp",
          jsonp: "callback",
          jsonpCallback: 'jsonpCallbackhd',
          success: function (msg) {
            jsonpCallbackhd(msg);
          }
        })
        function jsonpCallbackhd(msg) {
           if (msg.state === 'success') {
              getArticles(1);
            }
        }
      }
    }
    // 置顶切换
    if (t.nodeName === 'SPAN' && $(t).is('.downArticle')) {
      var id = $(t).attr('data-id');
      var sta;
      if ($(t).is('.label-default')) {
        sta = 1;
      } else if ($(t).is('.label-info')) {
        sta = 2;
      }
      $.ajax({
        type: 'get',
        url: 'http://www.lopkj.cn:8111/lampconsole/updateWordsStateById.action?state='+sta+'&id='+id,
        dataType:"jsonp",
        jsonp: "callback",
        jsonpCallback: 'jsonpCallbackhuw',
        success: function (msg) {
          jsonpCallbackhuw(msg);
        }
      })
      function  jsonpCallbackhuw(msg) {
          if (msg.state === 'success') {
              if (sta === 1) {
                $(t).addClass('label-info');
                $(t).removeClass('label-default');
              } else {
                $(t).removeClass('label-info');
                $(t).addClass('label-default');
              }
          }
      }
    }
  })
  $('#search').on('click', function () {
    var searchText = $('#search-input').val().trim();
    if (!searchText) {
      getArticles(1);
      return;
    }
    $.ajax({
      type: 'get',
      url: 'http://www.lopkj.cn:8111/lampconsole/countByLikeName.action?name='+searchText,
      dataType:"jsonp",
      jsonp: "callback",
      jsonpCallback: 'jsonpCallbackhcn',
      success: function (msg) {
        jsonpCallbackhcn(msg);
      }
    })
    function jsonpCallbackhcn(msg) {
      var data = msg.wList;
      rendArticles(data);
    }
  })
  
  
  // 获取文章列表数据并渲染
  function getArticles(num) {
    $.ajax({
      type: 'get',
      url: 'http://www.lopkj.cn:8111/lampconsole/selectAllWords.action?page='+num,
      dataType:"jsonp",
      jsonp: "callback",
      jsonpCallback: 'jsonpCallbackhs',
      success: function (msg) {
        jsonpCallbackhs(msg);
      }
    })
    function jsonpCallbackhs(msg) {
      var data = msg.wList;
      rendArticles(data);
      initPagination(msg);
    }
  }
  // 渲染文章列表
  function rendArticles(data) {
    var str = '';
    for (var i = 0, len = data.length; i < len; i++) {
      str += '<tr><td>'+data[i].id+'</td><td><a class="toDetail" target="_blank"  href=../../../articleDetail.html?id='+data[i].id+'>'+data[i].name+'</a></td>'+
            '<td>'+data[i].userr+'</td><td>'+data[i].heat+'</td><td>'+data[i].date.split('.')[0]+'</td>'+
            '<td style="" class=""><a href="./newArticle.html?id='+data[i].id+'" class="table_operate">'+
            '<span data-id='+data[i].id+'  class="editArticle label label-success mr-5 trans">编辑</span>'+
            '</a><a class="table_operate">'+
            '<span data-id='+data[i].id+' class="deleteArticle label label-danger mr-5">删除</span>'+
            '</a><a class="table_operate">'+
            '<span data-id='+data[i].id+' class="downArticle label mr-5 trans '+(data[i].state === 2 ? 'label-default':'label-info')+'">置顶</span>'+
            '</a></td></tr>'
        }
    $('.articles table tbody').html(str);
  }
  // 获取登陆账号名称
  function getName() {
    var str = '';
    var name = document.cookie.split(';')
    for (var i = 0, len = name.length; i < len; i++) {
      if(name[i]) {
        var n1 = name[i].split('=')[0];
        if (n1 === 'name') {
          str = name[i].split('=')[1];
        }
      }
    }
    $('.x-user').html('账号：'+str);
  }
  function initPagination(data) {
    var options = {
      currentPage: data.page,
      totalPages: data.zong,
      numberOfPages:5,
      "onPageClicked": function(event, originalEvent, type, page) {
        getArticles(page);
      }
    }
    $('#pg').bootstrapPaginator(options);
  }
})