# vue-caijing

> 比特财经vue重构版
***
接口使用全部使用jsonp跨域
### 1.1版更改修改要点
1. 第一版在tags组件中主要使用vuex存储栏目和tag的id，同时在当前路由刷新页面
的时候根据路由信息再进行判断存储两种id，以确保vuex中id值不丢失。然后在tags组件中监听栏目id和tagid的变化，（通过watch观察到对应id变化）再进行参数传递，实现在tags组件中（组件已经渲染的情况）在路由id变化时渲染对应页面信息。
2. 1.1版本尝试更改上述方法，使用更为简便的vue-router中的检测路由变化的方法来渲染数据，导航钩子，
3. 最终采用watch观察$route变化，执行分析路由analyseUrl()函数，进行数据改变

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
