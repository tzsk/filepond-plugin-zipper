import t from"jszip";class e extends File{}const a={},r=r=>({addFilter:n})=>(n("ADD_ITEMS",async n=>{const s=(r=>((t=>{t.filter(t=>t._relativePath).forEach(t=>{const[,e]=t._relativePath.split("/");a[e]||(a[e]=[]),a[e].push(t)})})(r),Object.keys(a).map(r=>{const n=new t;return a[r].forEach(t=>{n.file(t._relativePath,t)}),delete a[r],async t=>{const a=await n.generateAsync({type:"blob"},t);return new e([a],`${r}.zip`)}})))(n),i=n.filter(t=>!t._relativePath);if(r)return r(s),i;const l=await Promise.all(s.map(t=>t()));return i.concat(l)}),{options:{}});export{r as default};
//# sourceMappingURL=zipper.modern.mjs.map