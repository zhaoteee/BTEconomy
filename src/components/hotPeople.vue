<template>
<div class="hotPeople">
  <h3>焦点人物</h3>
  <ul class="picList">
    <li v-for='item in hotPeopleI'>
      <a target="_blank" :href="item.httpss"><img :src="item.pic"></a>
    </li>
  </ul>
</div>
</template>

<script>
import {getHotPeople} from 'api/getInfo'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      hotPeopleI: []
    }
  },
  computed: {
    getInfo () {
      return this.$store.state.hotPeople
    },
    ...mapGetters(['hotPeople'])
  },
  created () {
    // getHotPeople().then((res) => {
    //   this.hotPeople = res.jList
    // })
    this.hotPeopleI = this.hotPeople
    this.getInfoByUrl()
  },
  methods: {
    getInfoByUrl: function () {
      if (!this.hotPeople.length) {
        getHotPeople().then((res) => {
          this.hotPeopleI = res.jList
        })
      }
    }
  },
  watch: {
    getInfo (val) {
      this.hotPeopleI = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.hotPeople {
  h3 {
    margin: 2px 0 30px;
    border-left: 4px solid #4585f3;
    text-indent: 10px;
  }
  .picList {
    padding-left: 0;
    margin: 0;
    li {
      list-style: none;
      height:180px;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      h4 {
        position: absolute;
        bottom: 0;
        left: 10px;
        color: #fff;
        margin-bottom: 10px;
        font-weight: normal;
      }
    }
  }
}
</style>
