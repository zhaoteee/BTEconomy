<template>
  <div class="tags">
    <div class="leftContent">
      <articleList :url='this.url'></articleList>
    </div>
    <div class="rightContent">
      <hotPeople></hotPeople>
      <hotArticles></hotArticles>
      <hotTags></hotTags>
    </div>
  </div>
  </template>

<script>
import hotPeople from '@/components/hotPeople'
import hotArticles from '@/components/hotArticles'
import hotTags from '@/components/hotTags'
import articleList from 'components/articleList'
export default {
  data () {
    return {
      cid: 0,
      tid: 0,
      url: 'http://www.lopkj.cn:8111/lampconsole/countByProject.action?id='
    }
  },
  created () {
    this.analyseUrl()
  },
  methods: {
    analyseUrl: function () {
      const url = this.$route.path
      const res = url.split('/')
      const cid = res[res.length - 1]
      const type = res[res.length - 2]
      const componentType = res[res.length - 3]
      if (componentType === 'tags') {
        this.url = 'http://www.lopkj.cn:8111/lampconsole/countByProject.action?id='
        if (type === 'tag') {
          this.url = 'http://www.lopkj.cn:8111/lampconsole/countByBall.action?id='
          window.scrollTo(0, 0)
        }
        this.url = this.url.split('=')[0] + '=' + cid
      }
    }
  },
  watch: {
    '$route': function () {
      this.analyseUrl()
    }
  },
  components: {
    hotPeople,
    hotArticles,
    hotTags,
    articleList
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.tags {
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
</style>
