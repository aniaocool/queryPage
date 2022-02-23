
const install =(Vue)=>{
  const requireComponet = require.context(".",true,/\.vue/);
  requireComponet.keys().forEach(fileName=>{
    const config = requireComponet(fileName);
    Vue.component(config.default.name,config.default)
  })
}

export default{
  install
}