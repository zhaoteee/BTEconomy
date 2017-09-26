import jsonp from 'common/js/jsonp'

export function getColumns () {
  const url = 'http://www.lopkj.cn:8111/lampconsole/selectProject.action'

  return jsonp(url)
}
export function getBanners () {
  const url = 'http://www.lopkj.cn:8111/lampconsole/selectAllJdpic.action'

  return jsonp(url)
}
export function getHotPeople () {
  const url = 'http://www.lopkj.cn:8111/lampconsole/selectAllJdpeople.action'

  return jsonp(url)
}
export function getHotArticles () {
  const url = 'http://www.lopkj.cn:8111/lampconsole/selectByHeattt.action'

  return jsonp(url)
}
export function getHotTags () {
  const url = 'http://www.lopkj.cn:8111/lampconsole/selectBall.action?page=1'

  return jsonp(url)
}
export function getArticle (aid) {
  const url = 'http://www.lopkj.cn:8111/lampconsole/selectWordsById.action?id=' + aid

  return jsonp(url)
}
export function getIntres () {
  const url = 'http://www.lopkj.cn:8111/lampconsole/Interes.action'

  return jsonp(url)
}
