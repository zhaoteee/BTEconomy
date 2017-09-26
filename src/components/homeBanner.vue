<template>
  <div class="banner">
    <div class="banner clearfix">
    <a v-for='item in banners' :href="item.httpss" target="_blank">
      <img :src='item.pic' alt=""><h3>{{item.name}}</h3>
    </a>
     <!--  <div class="leftBanner">
        <a :href='banners[0].httpss' target="_blank"><img :src='banners[0].pic' alt=""><h3>{{banners[0].name}}</h3></a>
      </div>
      <div class="rightBanners">
        <a :href='banners[1].httpss' target="_blank"><img :src='banners[1].pic' alt=""><h3>{{banners[1].name}}</h3></a>
        <a :href='banners[2].httpss' target="_blank"><img :src='banners[2].pic' alt=""><h3>{{banners[2].name}}</h3></a>
      </div>
 -->    </div>
  </div>
</template>

<script>
import {getBanners} from 'api/getInfo'
export default {
  data () {
    return {
      banners: []
    }
  },
  beforeCreate () {
    getBanners().then((res) => {
      this.banners = res.jList
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.banner {
  padding-bottom: 5px;
  a:nth-child(1) {
    float: left;
    width: 450px;
    height: 314px;
    margin-right: 10px;
    overflow: hidden;
    border-radius: 5px;
    img {
        width: 100%;
        height: 100%;
        transition: all .4s ease;
        // transform: scale(1);
      }
     &:hover {
        img {
          transform: scale(1.04);
        }
      }
  }
  a:nth-child(2),
  a:nth-child(3) {
    display: inline-block;
    width: 289px;
    height: 150px;
    margin-bottom: 10px;
    border-radius: 5px;
    overflow: hidden;
    font-size: 0;
    img {
      width: 100%;
      height: auto;
      display: block;
      transition: all .4s;
    }
    &:hover {
      img {
          transform: scale(1.04);
      }
    }
  }
  a {
    position: relative;
    h3 {
      position: absolute;
      bottom: 0;
      left: 10px;
      margin-bottom: 10px;
      line-height: 1.5;
      color: #fff;
      word-wrap: break-word;
      word-break: normal;
      font-weight: 400;
      font-size: 18px;
    }
  }
}
</style>
