window.ajax = function (url, async = true, user, password) {
  let xhr
  if (window.XMLHttpRequest) xhr = new window.XMLHttpRequest()
  else xhr = new window.ActiveXObject('Microsoft.XMLHTTP')

  let ajaxObj = {}
  ajaxObj.xhr = xhr
  ajaxObj.method = 'get'
  ajaxObj.url = url
  ajaxObj.async = async
  ajaxObj.user = user
  ajaxObj.password = password
  ajaxObj.headers = {}
  ajaxObj.setHeader = function (field, value) {
    this.headers[field] = value
    return this
  }

  ajaxObj.send = function (data, cb) { // this === ajaxObj
    xhr.open(this.method, this.url, this.async, this.user, this.password)
    if ( data != null && typeof data !== 'string' && !(data instanceof window.FormData) ) {
      data = JSON.stringify(data)
      xhr.setRequestHeader('Content-Type', 'application/json')
    }
    for (let f in this.headers) {
      if (this.headers[f]) xhr.setRequestHeader(f, this.headers[f])
    }

    function executor (resolve, reject) {
      xhr.onreadystatechange = function () { // this === xhr
        if (this.readyState !== 4) return // not finished yet
        ajaxObj.response = this.response
        console.log(this)
        let contType = this.getResponseHeader('Content-Type')
        if (contType && contType.includes('application/json')) {
          ajaxObj.response = JSON.parse(ajaxObj.response)
        }
        if (this.status !== 200) { // error
          let err = new Error('tot-ajax error (status !== 200): '
            + this.status + ': ' + this.statusText)
          err.response = ajaxObj.response
          setTimeout( () => {
            if (cb) cb(err, ajaxObj.response, this, ajaxObj)
          }, 0)
          reject(err)
          return
        }
        // success
        setTimeout( () => { // protection against errors in cb
          if (cb) cb(null, ajaxObj.response, this, ajaxObj)
        }, 0)
        resolve(ajaxObj.response, this /* ajaxObj.xhr */, ajaxObj)
      }
      xhr.send(data)
    }

    if (window.Promise) return new window.Promise(executor)
    executor(() => {}, () => {}) // just start executor if promises are not available
  }

  let methods = ['post', 'get', 'put', 'patch', 'delete']
  methods.forEach(m => {
    ajaxObj[m] = function (data, cb) {
      this.method = m
      return this.send(data, cb)
    }
  })

  return ajaxObj
}
