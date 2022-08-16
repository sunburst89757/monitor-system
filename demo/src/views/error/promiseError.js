export function PromiseError () {
  const promise = new Promise((resolve) => {
    resolve('success')
  })
}