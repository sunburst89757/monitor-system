/* eslint-disable padded-blocks */
/* eslint-disable no-empty */
/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
export function ResourveError (type) {
  console.log('ResourveError')
  if (type === 1) {
    const oScript = document.createElement("script")
    oScript.type = "text/javascript"
    oScript.src = "//g.alicdn.com/sd/smartCaptcha"
    document.body.appendChild(oScript)
  } else {
    const img = document.createElement("img")
    img.src = "./test.png"
    document.body.appendChild(img)

  }
}
