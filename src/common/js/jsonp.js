import originJsonp from 'jsonp'

export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&')
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
