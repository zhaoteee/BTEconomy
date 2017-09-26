    var curPage = 1;
    var totalPages;
    // 加载更多
    $('.more .moreArticles').on('click', function(){
      curPage = curPage + 1;
      if (curPage <= totalPages) {
        initArticles(curPage);  
      } else if (curPage > totalPages) {
        $('.noMore').css('display','block');
        $('.moreArticles').css('display','none');
      }
    })
     // 进入页面获取Columns数据并更新列表
    function initColumns() {
      var columnid;
      var url = window.location.href;
      var aid = url.split('?')[1];
      if (aid) {
        aid = aid.split('&')[0]
      }
      if (aid && aid.split('=')[0]==='columnId') {
        columnid = aid.split('=')[1];
      }
      $.ajax({
        type: 'get',
        url: '/lampconsole/selectProject.action',
        success: function (msg) {
          jsonpCallbackp(msg);
        }
      })

      function jsonpCallbackp(msg) {
        var data = msg.bList;
        var str = '';
        for (var i = 0, len = data.length; i < 3; i++) {
          var cs = data[i].id == columnid ? "current":"";
          str +=  '<a data-id='+(i+1)+' href="tags.html?columnId='+data[i].id+'"  class='+cs+'>'+data[i].name+'</a>'
        }
        $('.head-nav').append(str);
      }
    }
    function initArticles(num) {
      $.ajax({
        type: 'get',
        url: 'http://www.lopkj.cn:8111/lampconsole/selectAllWords.action?page='+num,
        dataType:"jsonp",
        jsonp: "callback",
        jsonpCallback: 'jsonpCallbackw',
        success: function (msg) {
          jsonpCallbackw(msg)
        }
      })
      function jsonpCallbackw(msg) {
        totalPages = msg.zong;
        var data = msg.wList;
        rendArticles(data);
      }
    }
     // 渲染文章列表
    function rendArticles(data) {
      var str = '';
      for (var i = 0, len = data.length; i < len; i++) {
        var tagStr = '';
        var time = Math.floor((new Date() - Date.parse(data[i].date.split('.')[0].replace(/-/g,"/")))/3600000);
        var res = time < 24 ? time+'小时前' : Math.ceil(time / 24)+'天前';
        if (time < 1) {
          res = Math.floor(((new Date() - Date.parse(data[i].date.split('.')[0].replace(/-/g,"/")))/1000)/60)+'分钟前';
        }
        var bl = data[i].bList;
        for (j = 0, l = bl.length; j < l; j++) {
          tagStr += '<a href="tags.html?id='+bl[j].id+'"><span>'+bl[j].name+'</span></a><i>·</i>';
        }
        tagStr = tagStr.substr(0, tagStr.length-8);
        str += '<div class="articleItem clearfix">'+
                '<div class="img"><a target="_blank" href="articleDetail.html?id='+data[i].id+'"><img src='+data[i].pic+'></a></div>'+
                '<div class="detail">'+
                '<h3 class="title"><a target="_blank" href="articleDetail.html?id='+data[i].id+'">'+data[i].name+'</a></h3>'+
                '<p class="subTitle">'+data[i].fname+'</p>'+
                '<div class="about">'+
                  '<a href="column.html?name='+data[i].userr+'">'+data[i].userr+'</a><i>·</i>'+
                  '<span>'+res+'</span>'+
                  '<div class="tags">'+tagStr+'</div>'+
                '</div></div></div>'
      }
      $('.articleList').append(str);
    }
    // 获取栏目列表数据并渲染
    function getBanners() {
      $.ajax({
        type: 'get',
        url: 'http://www.lopkj.cn:8111/lampconsole/selectAllJdpic.action',
        dataType:"jsonp",
        jsonp: "callback",
        jsonpCallback: 'jsonpCallbacka',
        success: function (msg) {
          jsonpCallbacka(msg)
        }
      })
      function jsonpCallbacka(msg) {
        var data = msg.jList;
        rendBanners(data);
      }
    }
    function rendBanners(data) {
      $('.banner .leftBanner a').attr('href',data[0].httpss)
      $('.banner .leftBanner img').attr('src',data[0].pic)
      $('.banner .leftBanner h3').text(data[0].name)
      $('.banner .rightBanners a').each(function(i) {
        $(this).attr('href', data[i+1].httpss);
        $(this).find('img').attr('src',data[i+1].pic);
        $(this).find('h3').text(data[i+1].name);
      })
    }
     // 获取热门人物列表数据并渲染
    function getHotPeos() {
        $.ajax({
          type: 'get',
          url: 'http://www.lopkj.cn:8111/lampconsole/selectAllJdpeople.action',
          dataType:"jsonp",
          jsonp: "callback",
          jsonpCallback: 'jsonpCallbacksp',
          success: function (msg) {
            jsonpCallbacksp(msg);
          }
        })
        function jsonpCallbacksp(msg) {
          var data = msg.jList;
          rendHotPeos(data);
        }
    }
    function rendHotPeos(data) {
      var str = '';
      for (var i = 0, len = data.length; i < len; i++) {
          str += '<li><a target="_blank" href='+data[i].httpss+'><img src='+data[i].pic+'></a></li>'
        }
      $('.hotPeople .picList').html(str);
    }
    // 获取热门文章列表数据并渲染
    function getHotArticles() {
        $.ajax({
          type: 'get',
          url: 'http://www.lopkj.cn:8111/lampconsole/selectByHeattt.action',
          dataType:"jsonp",
          jsonp: "callback",
          jsonpCallback: 'jsonpCallback1',
          success: function (msg) {
            jsonpCallback1(msg);
          }
        })
        function jsonpCallback1(msg) {
          var data = msg.wList;
          rendHotArticles(data);
        }
    }
    function rendHotArticles(data) {
      var str = '';
      for (var i = 0, len = data.length; i < len; i++) {
          str += '<li><a target="_blank" href="./articleDetail.html?id='+data[i].id+'"><img src='+data[i].pic+'><h4>'+data[i].name+'</h4></a></li>'
        }
      $('.hotArticles .picList').html(str);
    }
     // 进入页面获取tags数据并更新列表
    function initTags(pageNum) {
       $.ajax({
          type: 'get',
          url: 'http://www.lopkj.cn:8111/lampconsole/selectBall.action?page='+pageNum,
          dataType:"jsonp",
          jsonp: "callback",
          jsonpCallback: 'jsonpCallbackb',
          success: function (msg) {
             jsonpCallbackb(msg);
          }
      })
      function jsonpCallbackb(msg) {
          var data = msg.bList;
          rendTag(data);
      }
    }
    //渲染标签列表
    function rendTag(data) {
      if (typeof data !== 'object' || !Array.isArray(data)) {
        return;
      }
      var str = '';
      for (var i = 0, len = data.length; i < len; i++) {
        str +=  '<a target="_blank" href="tags.html?id='+data[i].id+'">'+data[i].name+'</a>' ;
      }
      $('.hotTags .wrapper').html(str);
    }