<template>
<div class="content content-wrapper clearfix">
  <div class="leftContent">
    <div class="topTitle">
      <h3>作者文章</h3>
    </div>
    <articleList :columnInfo='this.columnInfo'></articleList>
  </div>
  <div class="rightContent">
    <div class="author">
      <img src="../common/images/author.jpg" alt="作者头像">
      <p class="name">{{columnInfo.Cname}}</p>
      <p class="num">共发表 {{columnInfo.count}} 篇文章</p>
    </div>
    <div class="hotArticles">
      <h3 class="title">TA的热文</h3>
      <ul class="picList">
        <li v-for='item in hotArt' :key='item.id'>
          <router-link tag='a' :to="'/article/'+item.id">
            <img :src="item.pic" alt="item.name">
          </router-link>          
          <h4>{{item.name}}</h4>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import articleList from 'components/articleList'
import jsonp from 'common/js/jsonp'
export default {
  data () {
    return {
      urls: 'http://www.lopkj.cn:8111/lampconsole/selectWordsByPeople.action?name=',
      columnInfo: [],
      hotArt: []
    }
  },
  created () {
    this.analyseUrl()
  },
  methods: {
    analyseUrl: function () {
      const url = this.$route.path
      const urlArr = url.split('/')
      if (urlArr[urlArr.length - 2] === 'column') {
        const name = urlArr[urlArr.length - 1]
        this.urls = this.urls.split('=')[0] + '=' + name
        jsonp(this.urls).then((res) => {
          this.columnInfo = res
          this.hotArt = res.wList.slice(0, 2)
          this.columnInfo.Cname = name
        })
      }
    }
  },
  watch: {
    '$route': function () {
      this.analyseUrl()
    }
  },
  components: {
    articleList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.content-wrapper {
  margin-bottom: 40px;
  width: 1120px;
  margin: 0 auto;
  .leftContent {
    width: 750px;
    margin-right: 80px;
    float: left;
  }
  .rightContent {
    width: 290px;
    float: left;
  }
}
.topTitle {
  h3 {
    margin: 2px 0 30px;
    border-left: 4px solid #4585f3; 
    text-indent: 20px;
  }
}
.author {
  width: 290px;
  height: 180px;
  background: #4585f3;
  border-radius: 10px;
  text-align: center;
  img {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #fff;
    margin-top: 10px;
  }
  p {
    color: #fff;
  }
  .name {
    font-size: 18px;
    margin: 10px 0;
  }
}
.hotArticles {
  h3 {
    margin: 30px 0 30px;
    border-left: 4px solid #4585f3;
    text-indent: 10px;
  }
  .picList {
    padding-left: 0;
    margin: 0;
    li {
      list-style: none;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      a {
        text-decoration: none;
        text-align: left;
      }
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      h4 {
        color: #000;
        margin-bottom: 10px;
        font-weight: normal;
      }
    }
  }
}
</style>
