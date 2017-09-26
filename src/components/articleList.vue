<template>
<div class="articleList">
  <div v-for='item in articleInfo' :key='item.id' class="articleItem clearfix">
        <div class="img"><router-link tag='a' target='_blank' :to="'/article/'+item.id"><img :src="item.pic" :alt="item.name"></router-link></div>
        <div class="detail">
          <h3 class="title">
            <router-link tag='a' target='_blank' :to="'/article/'+item.id">{{item.name}}</router-link>
          </h3>
          <p class="subTitle">{{item.fname}}</p>
          <div class="about">
            <router-link :to="'/column/'+item.userr">{{item.userr}}</router-link><i>·</i>
            <span>{{item.date}}</span>
            <aTags :data='item.bList'></aTags>
          </div>
        </div>
  </div>
  <div class="more">
    <p v-if='isMore' @click='getMore' class="moreArticles">加载更多</p>
    <p v-if='!isMore' class="noMore">没有更多了~~~</p>
  </div>
</div>
</template>

<script>
import jsonp from 'common/js/jsonp'
import aTags from 'components/aTags'
export default {
  props: ['url', 'columnInfo'],
  data () {
    return {
      urls: '',
      defaultPg: 1,
      curPg: 1,
      zongPg: 0,
      articleInfo: [],
      isMore: true
    }
  },
  created () {
    if (this.columnInfo && this.columnInfo.wList && this.columnInfo.wList.length) {
      this.dealMsg(this.columnInfo)
    }
    this.urls = this.url
    if (this.urls) {
      this.getAlist().then((res) => {
        this.dealMsg(res)
      })
    }
  },
  methods: {
    getAlist: function () {
      if (this.url) {
        let url = this.url + '&page=' + this.defaultPg
        return jsonp(url)
      }
    },
    getMore: function () {
      this.curPg = this.curPg + 1
      if (this.curPg > this.zongPg) {
        return
      }
      const url = this.url + '?page=' + this.curPg
      jsonp(url).then((res) => {
        this.dealMsg(res)
      })
    },
    dealMsg: function (res) {
      if (!res.wList.length) {
        this.isMore = false
      }
      this.articleInfo = []
      this.articleInfo = this.articleInfo.concat(res.wList)
      let _this = this
      res.wList.forEach(function (i) {
        i.date = _this.dealTime(i.date)
      })
      this.curPg = res.page
      this.zongPg = res.zong
      if (!this.zongPg || this.curPg >= this.zongPg) {
        this.isMore = false
      }
    },
    dealTime: function (time) {
      const tm = Math.floor((new Date() - Date.parse(time.split('.')[0].replace(/-/g, '/'))) / 3600000)
      let res = tm < 24 ? tm + '小时前' : Math.ceil(tm / 24) + '天前'
      if (tm < 1) {
        res = Math.floor(((new Date() - Date.parse(time.split('.')[0].replace(/-/g, '/'))) / 1000) / 60) + '分钟前'
      }
      return res
    }
  },
  watch: {
    url: function () {
      if (this.url) {
        this.articleInfo = []
        this.getAlist().then((res) => {
          this.dealMsg(res)
        })
      }
    },
    columnInfo: function (val) {
      this.dealMsg(val)
    }
  },
  components: {
    aTags
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.articleList {
  width: 750px;
  min-height: 380px;
  .articleItem {
    padding: 20px 0;
    border-top: 1px solid #f1f1f1;
    .img, .detail {
      float: left;
    }
    .img {
      width: 260px;
      height: 150px;
      border-radius: 10px;
      margin-right: 16px;
      position: relative;
      &:after {
        content: "";
        height: 100%;
        width: 100px;
        -webkit-transform: skewX(-25deg) translateZ(0);
        transform: skewX(-25deg) translateZ(0);
        background-image: linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.3) 50%,hsla(0,0%,100%,0));
        position: absolute;
        left: -160%;
        top: 0;
        z-index: 2;
      }
      &:hover:after {
        left: 160%
        transition: left 1s ease-in-out;
      }
      a {
        display: block;
        width: 260px;
        height: 150px;
        overflow: hidden;
        border-radius: 2px;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
    .detail {
      width: 470px;
      height: 150px;
      position: relative;
      .title {
        margin: 0;
        overflow: hidden;
        line-height: 30px;
        a {
          display: block;
          color: #1b1b1b;
          text-overflow: ellipsis;
          word-break: break-all;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: -o-ellipsis-lastline;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-decoration: none;
          transition: all .2s ease;
          &:hover {
            color: #4585f3;
          }
        }
      }
      .subTitle {
        margin: 10px 0 0;
        max-height: 44px;
        line-height: 1.5;
        color: #828a92;
        font-size: 14px;
        font-weight: 200;
        text-overflow: ellipsis;
        word-break: break-all;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: -o-ellipsis-lastline;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .about {
        padding-top: 16px;
        position: absolute;
        bottom: 1px;
        width: 100%;
        a, span {
          color: #828a92; 
          text-decoration: none;
          font-size: 14px;
          font-weight: 200;
        }
        a:hover {
            color: #4585f3;
        }
        i {
          color: #828a92;
          display: inline-block;
          padding: 0 3px;
        }
        a:hover {
          color: #4585f3;
        }
        .tags {
          float: right;
          a:hover {
            span {
              color: #4585f3;
            }
          }
        }
      }
    }
  }
}
.more {
  p {
    text-align: center;
    color: #888;
    border: 1px solid #f1f1f1;
    margin: 0;
    cursor: pointer;
    line-height: 50px;
    border-radius: 4px;
    margin: 50px 0 20px;
    transition: all .4s ease;
    &:hover {
      background: #f1f1f1;
      color: #999;
    }
  }
  p.noMore {
    // display: none;
  }
}
</style>
