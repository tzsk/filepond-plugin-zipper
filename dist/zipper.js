var e,t=(e=require("jszip"))&&"object"==typeof e&&"default"in e?e.default:e;class r extends File{}const n={};module.exports=e=>({addFilter:o})=>(o("ADD_ITEMS",function(o){try{function i(e){return o.filter(e=>!e._relativePath).concat(e||[])}const s=(e=>((e=>{e.filter(e=>e._relativePath).forEach(e=>{const[,t]=e._relativePath.split("/");n[t]||(n[t]=[]),n[t].push(e)})})(e),Object.keys(n).map(function(e){try{const o=new t;return n[e].forEach(e=>{o.file(e._relativePath,e)}),delete n[e],Promise.resolve(o.generateAsync({type:"blob"})).then(function(t){return new r([t],e+".zip")})}catch(e){return Promise.reject(e)}})))(o);return Promise.resolve(e?i(e(s)):Promise.resolve(Promise.all(s)).then(i))}catch(e){return Promise.reject(e)}}),{options:{}});
//# sourceMappingURL=zipper.js.map
