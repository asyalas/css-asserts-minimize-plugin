
const {groupCssMediaQueries} = require('./queryMedia')
const postcss = require("postcss");
const cssnano = require("cssnano");
const pipline = postcss(groupCssMediaQueries)
const defaultConfig = {
  preset: ['default', {
      discardComments: {
          removeAll: true,
      },
  }]
}
class cssPlugin {
  constructor(config) {
    this.config = config || defaultConfig ;
  }
  pluginHandler(compilation, callback){
    // merge the sanme media query
    const mergeMedia = (content,key)=>{
      return pipline.process(content).then(res=>{
       return duplicateRemove(res,key)
       })
     }
     //use cssnano to remove the same css style
     const duplicateRemove = (content,key)=>{
       return cssnano.process(content,this.config).then(res=>{
         compilation.assets[key] = {
           source: () => res.css,
             // return file size
           size: () => {
             return Buffer.byteLength(res.css, 'utf8')
           }
         }
       })
     }
     let css = Object.keys(compilation.assets).filter(item=>item.includes('.css'))
     const promiseArr = css.map(key=>{
       const fileContent = compilation.assets[key].source();
       return new Promise((resolve,reject)=>{
         mergeMedia(fileContent,key).then(
           res=>resolve(res),
           err=>reject(err))
       })
     })
     Promise.all(promiseArr).then((res)=>{
       callback();
     })
  }
  apply(compiler) {
    try {
      if('hooks' in compiler){
        compiler.hooks.emit.tapAsync('pluginHandlerAsync',(compilation, callback)=>{
          this.pluginHandler(compilation, callback)
        })
      }else{
        compiler.plugin('emit', (compilation, callback) => {
         this.pluginHandler(compilation, callback)
        });
      }
    } catch (error) {
    }
  }
}
module.exports = cssPlugin;