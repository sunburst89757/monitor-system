/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
export function RangeError (type) {
  if (type === 1) {
    var a = []
    a.length = -1
  } else {
    var b = 12.13
    b.toFixed(-1)
  }
}
export function ReferenceError (type) {
  if (type === 1) {
    b
  }
}

export function SyntaxError (type) {
  try {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = "./syntaxError.js"
    console.log('script', script)
    var body = document.getElementsByTagName('body')[0]
    body.appendChild(script)


  } catch (error) {
    throw (error)
  }
}

export function ScriptError (type) {  // 暂时不可用
  try {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = "http://localhost:8080/index.js"
    console.log('script', script)
    var body = document.getElementsByTagName('body')[0]
    body.appendChild(script)


  } catch (error) {
    throw (error)
  }
}

export function TypeError (type) {
  if (type === 1) {
    var a = new 2
  } else {
    var b
    b.set()
  }
}