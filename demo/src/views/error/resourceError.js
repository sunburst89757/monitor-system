export function ResourveError (type) {
  console.log('ResourveError')
  if (type === 1) {

  } else {
    var css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = '123.css'

    var body = document.getElementsByTagName('body')[0]
    body.appendChild(css)
    console.log('css', css)

  }
}