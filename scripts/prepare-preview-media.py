from pathlib import Path
import subprocess,json
# Run manually when the fixed preview footage changes; requires ffmpeg/ffprobe.
r=Path(__file__).resolve().parents[1]
p=r/'materials/data/project-previews'
def probe(f,entries):return json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries',entries,'-of','json',str(f)]))
def encode(source,target,scale,crf,gop):
 before=probe(source,'stream=nb_frames,duration,time_base:frame=best_effort_timestamp_time')
 timescale=before['streams'][0]['time_base'].split('/')[1]
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(source),'-map','0:v:0','-an','-vf',scale,'-c:v','libx264','-preset','medium','-crf',str(crf),'-g',str(gop),'-bf','0','-pix_fmt','yuv420p','-fps_mode','passthrough','-video_track_timescale',timescale,'-movflags','+faststart',str(target)],check=True)
 after=probe(target,'stream=nb_frames,duration,time_base:frame=best_effort_timestamp_time')
 assert before==after,(source,'Timing changed')
 print(source.name,source.stat().st_size,'->',target.stat().st_size,flush=True)
for key in ['0000','0026-4','0019-1']:
 source=p/f'golf-2d-banner-{key}.mp4';target=source.with_name(source.stem+'-preview.mp4')
 encode(source,target,'scale=540:960',25,30)
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(p/f'golf-2d-banner-{key}.webp'),'-vf','scale=270:480','-quality','76',str(p/f'golf-2d-banner-{key}-preview.webp')],check=True)
folder=p/'true3d-interactive/materials/data/previews/00'
catalog=p/'true3d-interactive/materials/data/snapshot-videos.json';data=json.loads(catalog.read_text())
for view in data[0]['views']:
 name=view['name'];source=folder/f'{name}-seek.mp4';target=folder/f'{name}-compact.mp4'
 native=probe(source,'stream=width,height')['streams'][0]
 encode(source,target,'scale=trunc(iw*360/ih/2)*2:360',26,1)
 view['src']=f'materials/data/previews/00/{name}-compact.mp4';view['imageSize']=[native['width'],native['height']]
catalog.write_text(json.dumps(data,indent=2)+'\n')
f=r/'materials/content.json';data=json.loads(f.read_text())
def update(value):
 if isinstance(value,dict):
  for k,v in value.items():
   if k in ['video','poster'] and isinstance(v,str):
    for key in ['0000','0026-4','0019-1']:
     stem=f'/materials/data/project-previews/golf-2d-banner-{key}'
     if v in [stem+'.mp4',stem+'.webp']:value[k]=stem+'-preview'+Path(v).suffix
   else:update(v)
 elif isinstance(value,list):
  for v in value:update(v)
update(data);f.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
