metaValue = name => {
  return (
    document.querySelector(`meta[name="${name}"]`)
            .getAttribute("content")
  )
}

const action = `${metaValue('controller_name')}/${metaValue('action_name')}`;

switch(action) {
  case "groups/index":
    require('./groups/index/index.js')
}