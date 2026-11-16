import {readdir,readFile,writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const root=new URL('../materials/data/project-previews/',import.meta.url);
async function compress(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const url=new URL(entry.name,directory);
    if(entry.isDirectory())await compress(new URL(entry.name+'/',directory));
    else if(entry.name.endsWith('.json')){
      const compressed=gzipSync(await readFile(url),{level:9});
      const target=new URL(entry.name+'.gz',directory);
      const previous=await readFile(target).catch(()=>null);
      if(!previous?.equals(compressed))await writeFile(target,compressed);
    }
  }
}
await compress(root);
console.log('Prepared lossless compressed preview data.');
