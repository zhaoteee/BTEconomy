<template>
  <div class="home">
  <div class="content">
    <div class="logo">
      <a href="">
        <img src="../common/images/btcjLogo.png" alt="比特财经">
      </a>
    </div>
    <div class="nav-wrapper">
          <vueNav></vueNav>
    </div>
    <router-link tag="a" class="contribute" to="/about">
        投稿 
    </router-link>
  </div>
  </div>
</template>

<script>
import vueNav from '@/components/nav'
export default {
  methods: {
  },
  components: {
    vueNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.content {
  width: 1120px;
  margin: 0 auto;
  position: relative;
}
.home {
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 1px 4px #e5e5e5;
  margin-bottom: 40px;
  .nav-wrapper {
    height: 73px;
    position: relative
  }
  .logo {
    position: absolute;
    top: 9px;
    left: 0;
    width: 125px;
    img {
      display: block;
      width: 100%;
      height: 100%
    }
  }
  .contribute {
    position: absolute;
    right: 0;
    top: 16px;
    font-size: 18px;
    color: #4585f3;
    text-decoration: none;
    border: 1px solid #4585f3;
    padding: 8px 24px;
    transition: all .4s ease;
    &:hover {
      background: #4585f3;
      color: #fff;
    }
  }
}
</style>
