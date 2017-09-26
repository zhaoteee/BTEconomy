<template>
<div class="hotArticles">
  <h3 class="title">热门文章</h3>
  <ul class="picList">
    <li v-for='item in hotArticles'><router-link :to="'/article/'+item.id" target="_blank"><img :src="item.pic"><h4>{{item.name}}</h4></router-link></li>
  </ul>
</div>
</template>

<script>
import {getHotArticles} from 'api/getInfo'
export default {
  data () {
    return {
      hotArticles: []
    }
  },
  created () {
    getHotArticles().then((res) => {
      this.hotArticles = res.wList
    })
  },
  method: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
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
