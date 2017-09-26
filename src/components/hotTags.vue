<template>
<div class="hotTags">
  <h3 class="title">焦点人物</h3>
  <div class="wrapper" @click='setTid'>
    <router-link v-for='item in hotTags' :to="'/tags/tag/'+item.id" :key='item.id' :data-id='item.id'>{{item.name}}
    </router-link>
  </div>
</div>
</template>

<script>
import {getHotTags} from 'api/getInfo'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      hotTags: []
    }
  },
  created () {
    getHotTags().then((res) => {
      this.hotTags = res.bList
    })
  },
  methods: {
    setTid: function (e) {
      const tar = e.srcElement ? e.srcElement : e.target
      if (tar.nodeName === 'A') {
        const tid = tar.parentNode.getAttribute('data-id')
        this.keepTid({
          'tid': tid
        })
      }
    },
    ...mapMutations({
      keepTid: 'SET_TAGID'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .hotTags {
     h3 {
        margin: 30px 0 30px;
        border-left: 4px solid #4585f3;
        text-indent: 10px;
      }
    .wrapper {
      font-size: 0;
      text-align: left;
      a {
        display: inline-block;
        box-sizing: border-box;
        padding: 0 20px;
        text-align: center;
        height: 44px;
        line-height: 44px;
        margin-bottom: 20px;
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
      a:nth-child(3n) {
          margin-right: 0;
      }
    }
  }
</style>
