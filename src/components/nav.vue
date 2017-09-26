<template>
  <nav ref='headnav' class="head-nav" @click='changeCur'>
      <router-link id="gohome" tag="a" :class="num===0 ? 'active' : ''" to="/homeContent">
        <span data-id = '0' class="tab-link">首页</span>
      </router-link>    
      <a v-for='item in columns' class="columns" :data-id='item.id' :key='item.id'>
        <span class="tab-link">{{item.name}}</span>
      </a>
    </nav>
</template>

<script>
import {getColumns} from 'api/getInfo.js'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      columns: [],
      num: 0
    }
  },
  created () {
    this._getCol()
  },
  mounted () {
  },
  methods: {
    _getCol: function () {
      getColumns().then((res) => {
        this.columns = res.bList.splice(0, 3)
      })
    },
    changeCur: function (e) {
      const tar = e.srcElement ? e.srcElement : e.target
      if (tar.nodeName === 'SPAN') {
        const id = tar.parentNode.getAttribute('data-id')
        // tar.parentNode.setAttribute('class', 'active')
        this.num = id
        this.setColumnid({'cid': this.num})
        tar.parentNode.getAttribute('id') === 'gohome' ? '' : this.$router.push({path: '/tags/column/' + id})
        const cn = tar.parentNode.parentNode.childNodes
        for (let i = 0, len = cn.length; i < len; i++) {
          if (cn[i].nodeName === 'A') {
            const cnid = cn[i].getAttribute('data-id')
            cnid === this.num ? cn[i].setAttribute('class', 'active') : cn[i].setAttribute('class', '')
          }
        }
      }
    },
    ...mapMutations({
      setColumnid: 'SET_COLUMNID'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
 nav {
    height: 100%;
    padding-left: 225px ;
    a {
      display: inline-block;
      font-size: 16px;
      text-decoration: none;
      color: #1b1b1b;
      position: relative;
      margin-right: 55px;
      cursor: pointer;
      &.active {
        font-weight: 600
      }
      &.active:after {
        content: '';
        display: block;
        width: 100%;
        height: 4px;
        background: #4585f3;
        position: absolute;
        left: 0;
        top: 69px;
      }
      &:hover {
        color: #4585f3;
      }
      span {
        display: block;
        padding: 23px 30px 30px;
      }
    }
  }
</style>
