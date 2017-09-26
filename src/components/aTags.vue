<template>
  <div class="tags"  @click='setTid'>
    <router-link v-for='item in data' :data-id='item.id' :key='item.id' :to="'/tags/tag/'+item.id"><span>{{item.name}}</span>
    </router-link>  
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  props: {
    data: {
      type: Array
    }
  },
  created () {
  },
  methods: {
    setTid: function (e) {
      const tar = e.srcElement ? e.srcElement : e.target
      if (tar.nodeName === 'SPAN') {
        const tid = tar.parentNode.getAttribute('data-id')
        this.keepTid({'tid': tid})
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
.tags {
  float: right;
   a, span {
    color: #828a92; 
    text-decoration: none;
    font-size: 14px;
    font-weight: 200;
  }
  span {
    display: inline-block;
    padding: 0 2px;
  }
  a:after {
    content: '·';
  }
  a:last-child:after {
    content: '';
  }
  a:hover {
    span {
      color: #4585f3;
    }
  }
}
</style>
