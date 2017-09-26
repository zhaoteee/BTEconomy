import * as types from './mutation-types'
const matutaions = {
  [types.SET_COLUMNID] (state, columnid) {
    state.columnid = columnid
  },
  [types.SET_TAGID] (state, tagid) {
    state.tagid = tagid
  },
  [types.SET_HOTPEOPLE] (state, hotPeople) {
    state.hotPeople = hotPeople
  },
  [types.SET_ARTICLES] (state, articles) {
    state.articles = articles
  },
  [types.SET_HOTTAGS] (state, hotTags) {
    state.hotTags = hotTags
  }
}
export default matutaions
