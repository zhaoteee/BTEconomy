<template>
<div class="homeContent content-wrapper clearfix">
  <div class="leftContent">
    <homeBanner></homeBanner>
    <articleList url='http://www.lopkj.cn:8111/lampconsole/selectAllWords.action?'></articleList>
  </div>
  <div class="rightContent">
    <hotPeople></hotPeople>
    <hotArticles></hotArticles>
    <hotTags></hotTags>
  </div>
</div>
</template>

<script>
import homeBanner from '@/components/homeBanner'
import articleList from '@/components/articleList'
import hotPeople from '@/components/hotPeople'
import hotArticles from '@/components/hotArticles'
import hotTags from '@/components/hotTags'
import * as getRightInfo from 'api/getInfo'
import {mapMutations} from 'vuex'
export default {
  created () {
    getRightInfo.getHotPeople().then((res) => {
      this.setHotPeople(res.jList)
    })
    getRightInfo.getHotArticles().then((res) => {
      this.setArticles(res.wList)
    })
    getRightInfo.getHotTags().then((res) => {
      this.setHotTags(res.bList)
    })
  },
  methods: {
    ...mapMutations({
      'setHotPeople': 'SET_HOTPEOPLE',
      'setArticles': 'SET_ARTICLES',
      'setHotTags': 'SET_HOTTAGS'
    })
  },
  components: {
    homeBanner,
    articleList,
    hotPeople,
    hotArticles,
    hotTags
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
</style>
