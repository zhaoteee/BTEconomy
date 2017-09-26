<template>
<div class="article">
  <div class="content content-wrapper clearfix">
    <div class="leftContent detailLeftContent">
      <div class="aboutArticle">
          <h3 class="title">{{arInfo.name}}</h3>
          <p class="subTitle">{{arInfo.fname}}</p>
          <div class="info">
              <span class="author">作者：
                <router-link tag='a' :to="'/column/'+arInfo.userr">{{arInfo.userr}}</router-link></span>
              <span class="from">来源：{{arInfo.source || ''}}</span>
              <span class="time">{{arInfo.date}}</span>
          </div>
      </div>
      <div class="articleContent" v-html='arInfo.word'>
      </div>
      <div class="articleTags">
           <router-link v-for='item in arInfo.bList' :data-id='item.id' :key='item.id' :to="'/tags/tag/'+item.id"><span>{{item.name}}</span></router-link>      
      </div>
      <mayIntres></mayIntres>
    </div>
    <div class="rightContent">
      <hotPeople></hotPeople>
      <hotArticles></hotArticles>
      <hotTags></hotTags>
    </div>
  </div>
</div>
</template>

<script>
import {getArticle} from 'api/getInfo'
import aTags from 'components/aTags'
import hotPeople from 'components/hotPeople'
import hotArticles from 'components/hotArticles'
import hotTags from 'components/hotTags'
import mayIntres from 'components/mayIntres'
export default {
  data () {
    return {
      arInfo: {}
    }
  },
  created () {
    this.analyseUrl()
  },
  methods: {
    analyseUrl: function () {
      const url = this.$route.path
      const urlArr = url.split('/')
      if (urlArr[urlArr.length - 2] === 'article') {
        const articleId = urlArr[urlArr.length - 1]
        getArticle(articleId).then((res) => {
          this.arInfo = res.word
          this.arInfo.date = this.dealTime(this.arInfo.date)
        })
        window.scrollTo(0, 0)
      }
    },
    dealTime: function (time) {
      const tm = Math.floor((new Date() - Date.parse(time.split('.')[0].replace(/-/g, '/'))) / 3600000)
      let res = tm < 24 ? tm + '小时前' : Math.ceil(tm / 24) + '天前'
      if (tm < 1) {
        res = Math.floor(((new Date() - Date.parse(time.split('.')[0].replace(/-/g, '/'))) / 1000) / 60) + '分钟前'
      }
      return res
    }
  },
  watch: {
    '$route': function () {
      this.analyseUrl()
    }
  },
  components: {
    aTags,
    hotPeople,
    hotArticles,
    hotTags,
    mayIntres
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
.aboutArticle {
  border-bottom: 1px solid #e5e5e5;
  .title {
    margin: 2px 0 30px;
    padding-left: 12px;
    color: #1b1b1b;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 21px;
      background: #4585f3;
    }
  }
  .subTitle, .info {
    color: #828a92;
    font-size: 14px;
    font-weight: 200;
  }
  .info {
    margin: 30px 0 16px;
    height: 28px;
    line-height: 24px;
    .author {
      margin-right: 88px;
      a {
        text-decoration: none;
        color: #828a92;
        &:hover {
          color: #4585f3;
        }
      }
    }
    .time {
      float: right;
    }
  }
}
.articleContent {
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
  font-weight: 200;
}
.articleTags {
  padding: 22px 0;
  border-bottom: 1px solid #e5e5e5;
  a {
    display: inline-block;
    box-sizing: border-box;
    padding: 0 20px;
    text-align: center;
    height: 44px;
    line-height: 44px;
    margin-right: 5%;
    background: #fff;
    font-size: 14px;
    text-decoration: none;
    color: #4585f3;
    border: 1px solid #4585f3;
    &:hover {
      background: #4585f3;
      color: #fff;
    }
  }
}

</style>
