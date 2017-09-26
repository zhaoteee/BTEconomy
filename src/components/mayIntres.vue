<template>
  <div class="wantRead">
    <h4>你可能感兴趣的文章</h4>
    <div class="wantReadList">
      <div v-for='item in intres'>
        <router-link tag='a' :to="'/article/'+item.id"><img :src="item.pic" alt="item.name"></router-link>
        <h3>{{item.name}}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import {getIntres} from 'api/getInfo'
export default {
  data () {
    return {
      intres: []
    }
  },
  created () {
    getIntres().then((res) => {
      this.intres = res.wList
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.wantRead {
  h4 {
    font-size: 18px;
  }
  .wantReadList {
    padding-left: 0;
    font-size: 0;
    div {
      display: inline-block;
      list-style: none;
      width: 32%;
      height: 216px;
      overflow: hidden;
      margin-right: 2%;
      a {
        display: block;
        width: 100%;
        height: 150px;
        background: #4585f3;
        border-radius: 6px;
        img {
          display: block;
          width: 100%;
          height: 100%
        }
      }
      h3 {
        font-size: 16px;
        line-height: 1.5;
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: -o-ellipsis-lastline;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    div:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
