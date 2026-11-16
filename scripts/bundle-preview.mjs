import {execFileSync} from 'node:child_process';
import {readFile,writeFile,unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url),folder=new URL('materials/data/project-previews/true3d-interactive/',root);
const hash=buffer=>createHash('sha256').update(buffer).digest('hex');
const manifestURL=new URL('preview.bundle-manifest.json',folder);
if(process.argv.includes('--check')){
 const manifest=JSON.parse(await readFile(manifestURL,'utf8'));
 for(const [file,expected] of Object.entries(manifest)){
  if(hash(await readFile(new URL(file,root)))!==expected)throw new Error(`Preview bundle needs rebuilding: ${file}. Run node scripts/bundle-preview.mjs.`);
 }
 console.log('3D preview bundle matches its sources.');
}else{
 const metadata=new URL('preview.bundle-meta.json',folder);
 execFileSync('npm',['exec','--yes','--package=esbuild@0.24.0','--','esbuild','materials/data/project-previews/true3d-interactive/preview-entry.js','--bundle','--minify','--format=esm','--target=es2022','--legal-comments=inline',`--outfile=${fileURLToPath(new URL('preview.bundle.js',folder))}`,`--metafile=${fileURLToPath(metadata)}`],{cwd:fileURLToPath(root),stdio:'inherit'});
 const data=JSON.parse(await readFile(metadata,'utf8')),manifest={};
 for(const file of [...Object.keys(data.inputs),'materials/data/project-previews/true3d-interactive/preview.bundle.js'])manifest[file]=hash(await readFile(new URL(file,root)));
 await writeFile(manifestURL,JSON.stringify(manifest,null,2)+'\n');await unlink(metadata);
 console.log(`Bundled ${Object.keys(data.inputs).length} modules.`);
}

// Pin the iframe document and its bundle to the same fixed preview revision.
const revision=hash(await readFile(new URL('preview.bundle.js',folder))).slice(0,12);
const indexURL=new URL('index.html',folder),contentURL=new URL('materials/content.json',root);
const index=await readFile(indexURL,'utf8');
const stamped=index.replace(/preview\.bundle\.js(?:\?v=[a-f0-9]+)?/g,`preview.bundle.js?v=${revision}`);
const content=JSON.parse(await readFile(contentURL,'utf8'));
let updated=false;
for(const project of content.projects){
 if(project.banner?.interactive?.includes('/true3d-interactive/index.html')){
  const next=project.banner.interactive.split('?')[0]+`?v=${revision}`;
  if(project.banner.interactive!==next){project.banner.interactive=next;updated=true;}
 }
}
if(process.argv.includes('--check')){
 if(stamped!==index||updated)throw new Error('Preview revision is not synchronized. Run node scripts/bundle-preview.mjs.');
}else{
 if(stamped!==index)await writeFile(indexURL,stamped);
 if(updated)await writeFile(contentURL,JSON.stringify(content,null,2)+'\n');
}
