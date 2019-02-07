metaValue = name => {
  return (
    document.querySelector(`meta[name="${name}"]`)
            .getAttribute("content")
  )
}

const action = `${metaValue('controller_name')}/${metaValue('action_name')}`
console.log(action)

switch(action) {
  case "groups/index":
    require('./groups/index/index.js')
    break
  case "messages/index":
    require('./messages/index/index.js')
    break
}