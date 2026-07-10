import"./modulepreload-polyfill-B5Qt9EMX.js";const r={sources:[],layers:[],activeLayer:null,tool:"move",brushSize:16,tolerance:32,canvasW:512,canvasH:512,zoom:1,showGrid:!0,gridSize:128,snap:!1,status:"Abra uma ou mais imagens e extraia pedaços para compor.",extract:null,layerCounter:0};let xe,S,H=null,U=null,me=!1,C=null,Fe=!1;const pe=new Map,$e=[],ot=15;function fe(e){const a=document.createElement("canvas");return a.width=e.width,a.height=e.height,a.getContext("2d").drawImage(e,0,0),a}function L(){$e.push({layers:r.layers.map(e=>({...e,canvas:fe(e.canvas)})),activeLayer:r.activeLayer}),$e.length>ot&&$e.shift()}function Ke(){const e=$e.pop();if(!e){r.status="Nada para desfazer.",F();return}r.layers=e.layers,r.activeLayer=e.activeLayer,r.status="Desfeito.",F()}function re(e){return e.replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[a])}function Q(e,a,i){return Math.max(a,Math.min(i,e))}function G(){return r.layers.find(e=>e.id===r.activeLayer)??null}function Ye(e){return r.layerCounter+=1,`${e}_${r.layerCounter}`}function ve(e,a,i){let o=(a-e.x)/e.scale;const s=(i-e.y)/e.scale;return e.flipX&&(o=e.canvas.width-o),{x:o,y:s}}function nt(e,a,i){const o=ve(e,a,i),s=Math.floor(o.x),n=Math.floor(o.y);return s<0||n<0||s>=e.canvas.width||n>=e.canvas.height?0:e.canvas.getContext("2d",{willReadFrequently:!0}).getImageData(s,n,1,1).data[3]}function Re(e,a){for(let i=r.layers.length-1;i>=0;i-=1){const o=r.layers[i];if(o.visible&&nt(o,e,a)>8)return o}return null}function Ze(e){const i=e.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,e.width,e.height).data;let o=e.width,s=e.height,n=-1,c=-1;for(let u=0;u<e.height;u+=1)for(let p=0;p<e.width;p+=1)i[(u*e.width+p)*4+3]>8&&(p<o&&(o=p),u<s&&(s=u),p>n&&(n=p),u>c&&(c=u));if(n<o)return e;const l=document.createElement("canvas");return l.width=n-o+1,l.height=c-s+1,l.getContext("2d").drawImage(e,-o,-s),l}function rt(e,a){xe=a,S=e,F()}function F(){S.innerHTML=`
    <div class="comp-shell">
      <section class="comp-main">
        <div class="card comp-toolbar">
          ${ct()}
          ${lt()}
        </div>
        <div class="card canvas-wrap comp-canvas-wrap">
          <canvas id="comp-canvas"></canvas>
        </div>
        <div class="card comp-statusbar">
          <span class="dim">${re(r.status)}</span>
          <span class="dim comp-hints">arraste: mover &#183; Del: excluir camada &#183; Ctrl+Z: desfazer &#183; setas: nudge &#183; [ ]: pincel &#183; roda: zoom</span>
        </div>
      </section>
      <aside class="side">
        <div class="side-panel">
          ${dt()}
          ${mt()}
          ${ut()}
          ${pt()}
          ${ft()}
        </div>
      </aside>
    </div>
    ${r.extract?ht():""}
  `,H=S.querySelector("#comp-canvas"),xt(),D(),gt(),Je(),r.extract&&ne()}function ct(){return`<div class="comp-tools">${[{id:"move",icon:"&#x270B;",label:"Mover",key:"V"},{id:"erase",icon:"&#x2716;",label:"Borracha",key:"E"},{id:"restore",icon:"&#x21BA;",label:"Restaurar",key:"R"},{id:"wand",icon:"&#x2728;",label:"Varinha",key:"W"},{id:"rect-erase",icon:"&#x25A8;",label:"Apagar &#225;rea",key:"X"}].map(a=>`<button class="comp-tool ${r.tool===a.id?"active":""}" data-tool="${a.id}" title="${a.label} (${a.key})">${a.icon} ${a.label}</button>`).join("")}</div>`}function lt(){const e=[];return(r.tool==="erase"||r.tool==="restore")&&e.push(`
      <label class="comp-opt">Pincel <input id="comp-brush" type="range" min="2" max="96" value="${r.brushSize}"> <span class="badge">${r.brushSize}px</span></label>
    `),r.tool==="wand"&&e.push(`
      <label class="comp-opt">Tolerância <input id="comp-tol" type="range" min="1" max="128" value="${r.tolerance}"> <span class="badge">${r.tolerance}</span></label>
      <span class="dim hint">Clique numa cor para apagar a região contígua.</span>
    `),r.tool==="move"&&e.push(`<label class="check"><input id="comp-snap" type="checkbox" ${r.snap?"checked":""}> Encaixar na grade</label>`),e.push(`
    <span class="comp-spacer"></span>
    <label class="check"><input id="comp-showgrid" type="checkbox" ${r.showGrid?"checked":""}> Grade</label>
    <label class="comp-opt">Célula <input id="comp-gridsize" type="number" value="${r.gridSize}" style="width:56px"></label>
    <button id="comp-undo" class="compact" title="Ctrl+Z">&#x21B6; Desfazer</button>
  `),`<div class="comp-tool-opts">${e.join("")}</div>`}function dt(){return`
    <div class="card">
      <div class="group-title"><span>Tela</span><span>${r.canvasW}&#215;${r.canvasH}</span></div>
      <div class="grid-3" style="margin-top:6px">
        <div class="field"><label>Largura</label><input id="comp-w" type="number" value="${r.canvasW}"></div>
        <div class="field"><label>Altura</label><input id="comp-h" type="number" value="${r.canvasH}"></div>
        <div class="field"><label>Zoom</label><input id="comp-zoom" type="number" step="0.25" value="${r.zoom}"></div>
      </div>
    </div>
  `}function mt(){const e=r.sources.map(a=>`
      <div class="comp-source" data-src="${a.id}" title="${re(a.name)}">
        <canvas class="comp-source-thumb" data-src-thumb="${a.id}"></canvas>
        <div class="comp-source-meta">
          <span class="comp-source-name">${re(a.name)}</span>
          <span class="dim hint">${a.image.naturalWidth}&#215;${a.image.naturalHeight}</span>
        </div>
        <div class="comp-source-actions">
          <button data-src-extract="${a.id}" class="compact primary" title="Extrair pedaço">&#x2702;</button>
          <button data-src-del="${a.id}" class="compact danger" title="Remover fonte">&#x2715;</button>
        </div>
      </div>`).join("");return`
    <div class="card">
      <div class="anim-section-head">
        <span class="group-title">Fontes (${r.sources.length})</span>
        <button id="comp-open-src" class="primary compact">+ Abrir PNG</button>
      </div>
      <div id="comp-src-drop" class="comp-src-drop ${r.sources.length===0?"empty":""}">
        ${e||'<div class="dim hint" style="text-align:center;padding:12px 4px">Arraste PNGs aqui ou clique em Abrir.<br>Cada imagem vira uma fonte para extrair pedaços.</div>'}
      </div>
    </div>
  `}function ut(){const e=[...r.layers].reverse().map(a=>`
      <div class="comp-layer ${a.id===r.activeLayer?"active":""}" data-layer="${a.id}">
        <button data-layer-vis="${a.id}" class="comp-layer-vis" title="Visível">${a.visible?"&#x1F441;":"&#x2716;"}</button>
        <canvas class="comp-layer-thumb" data-layer-thumb="${a.id}"></canvas>
        <span class="comp-layer-name">${re(a.name)}</span>
        <div class="comp-layer-actions">
          <button data-layer-up="${a.id}" title="Subir">&#x25B2;</button>
          <button data-layer-down="${a.id}" title="Descer">&#x25BC;</button>
          <button data-layer-dup="${a.id}" title="Duplicar">&#x29C9;</button>
          <button data-layer-del="${a.id}" class="danger" title="Excluir">&#x2715;</button>
        </div>
      </div>`).join("");return`
    <div class="card">
      <div class="group-title"><span>Camadas (${r.layers.length})</span></div>
      <div class="comp-layers">${e||'<div class="dim hint" style="padding:8px 2px">Nenhuma camada. Extraia um pedaço de uma fonte.</div>'}</div>
    </div>
  `}function pt(){const e=G();return e?`
    <div class="card">
      <div class="group-title"><span>Camada: ${re(e.name)}</span><span>${e.canvas.width}&#215;${e.canvas.height}</span></div>
      <div class="grid-3" style="margin-top:6px">
        <div class="field"><label>X</label><input data-lprop="x" type="number" value="${Math.round(e.x)}"></div>
        <div class="field"><label>Y</label><input data-lprop="y" type="number" value="${Math.round(e.y)}"></div>
        <div class="field"><label>Escala</label><input data-lprop="scale" type="number" step="0.05" value="${e.scale}"></div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
        <button id="comp-flip" class="compact">&#x21C4; Espelhar</button>
        <button id="comp-trim-layer" class="compact">Aparar alpha</button>
        <button id="comp-rembg" class="compact primary" title="Remove a cor dos cantos da camada (fundo sólido de IA)">&#x1FA84; Auto-remover fundo</button>
      </div>
      <div class="dim hint" style="margin-top:6px">Varinha/borracha atuam nesta camada. "Auto-remover fundo" usa a cor dos cantos com a tolerância atual (${r.tolerance}).</div>
    </div>
  `:""}function ft(){return`
    <div class="card">
      <div class="group-title"><span>Exportar</span></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
        <button id="comp-export" class="primary" ${r.layers.length===0?"disabled":""}>&#x1F4E6; Salvar PNG</button>
        <button id="comp-to-slicer" class="compact" ${r.layers.length===0?"disabled":""}>&#x2702; Enviar p/ Fatiar</button>
      </div>
      <div class="dim hint" style="margin-top:6px">"Enviar p/ Fatiar" achata a composição e abre no modo de grade/animações.</div>
    </div>
  `}function ht(){const e=r.extract,a=r.sources.find(o=>o.id===e.sourceId);if(!a)return"";const i=e.sel;return`
    <div class="comp-overlay" id="comp-extract-overlay">
      <div class="comp-overlay-panel">
        <div class="comp-overlay-head">
          <b>Extrair de: ${re(a.name)}</b>
          <button id="ext-close" class="compact">&#x2715; Fechar</button>
        </div>
        <div class="comp-overlay-tools">
          <label class="comp-opt">Zoom <input id="ext-zoom" type="range" min="0.1" max="4" step="0.05" value="${e.zoom}"> <span class="badge">${e.zoom.toFixed(2)}x</span></label>
          <label class="check"><input id="ext-showgrid" type="checkbox" ${e.showGrid?"checked":""}> Grade</label>
          <div class="field" style="flex-direction:row;align-items:center;gap:4px"><label>Cols</label><input id="ext-cols" type="number" value="${e.gridCols}" style="width:52px"></div>
          <div class="field" style="flex-direction:row;align-items:center;gap:4px"><label>Rows</label><input id="ext-rows" type="number" value="${e.gridRows}" style="width:52px"></div>
          <label class="check"><input id="ext-trim" type="checkbox" ${e.trim?"checked":""}> Aparar alpha</label>
          <span class="comp-spacer"></span>
          <span class="dim hint" id="ext-sel-hint">${i?`Seleção: ${Math.round(i.w)}&#215;${Math.round(i.h)}`:"Arraste para selecionar, ou clique numa célula da grade."}</span>
          <button id="ext-add" class="primary" ${i?"":"disabled"}>&#x2795; Adicionar camada</button>
        </div>
        <div class="comp-overlay-canvas canvas-wrap">
          <canvas id="ext-canvas"></canvas>
        </div>
      </div>
    </div>
  `}function D(){if(!H)return;const e=H.getContext("2d"),a=r.zoom;H.width=Math.max(1,Math.ceil(r.canvasW*a)),H.height=Math.max(1,Math.ceil(r.canvasH*a)),e.imageSmoothingEnabled=!1,e.clearRect(0,0,H.width,H.height);for(const o of r.layers)o.visible&&(e.save(),e.translate(o.x*a,o.y*a),e.scale(o.scale*a*(o.flipX?-1:1),o.scale*a),o.flipX&&e.translate(-o.canvas.width,0),e.drawImage(o.canvas,0,0),e.restore());if(r.showGrid&&r.gridSize>1){e.strokeStyle="rgba(154, 170, 189, 0.3)",e.lineWidth=1;for(let o=0;o<=r.canvasW;o+=r.gridSize)e.beginPath(),e.moveTo(o*a+.5,0),e.lineTo(o*a+.5,r.canvasH*a),e.stroke();for(let o=0;o<=r.canvasH;o+=r.gridSize)e.beginPath(),e.moveTo(0,o*a+.5),e.lineTo(r.canvasW*a,o*a+.5),e.stroke()}const i=G();if(i&&i.visible){const o=i.canvas.width*i.scale*a,s=i.canvas.height*i.scale*a;e.strokeStyle="rgba(102, 224, 170, 0.85)",e.lineWidth=1.5,e.setLineDash([5,4]),e.strokeRect(i.x*a,i.y*a,o,s),e.setLineDash([])}if(C){const o=Math.min(C.x0,C.x1)*a,s=Math.min(C.y0,C.y1)*a,n=Math.abs(C.x1-C.x0)*a,c=Math.abs(C.y1-C.y0)*a;e.fillStyle="rgba(255, 107, 107, 0.18)",e.fillRect(o,s,n,c),e.strokeStyle="rgba(255, 107, 107, 0.8)",e.strokeRect(o,s,n,c)}}function gt(){S.querySelectorAll("[data-src-thumb]").forEach(e=>{const a=r.sources.find(l=>l.id===e.dataset.srcThumb);if(!a)return;const i=44;e.width=i,e.height=i;const o=e.getContext("2d");o.imageSmoothingEnabled=!1;const s=Math.min(i/a.image.naturalWidth,i/a.image.naturalHeight),n=a.image.naturalWidth*s,c=a.image.naturalHeight*s;o.drawImage(a.image,(i-n)/2,(i-c)/2,n,c)})}function Je(){S.querySelectorAll("[data-layer-thumb]").forEach(e=>{const a=r.layers.find(l=>l.id===e.dataset.layerThumb);if(!a)return;const i=34;e.width=i,e.height=i;const o=e.getContext("2d");o.imageSmoothingEnabled=!1;const s=Math.min(i/a.canvas.width,i/a.canvas.height),n=a.canvas.width*s,c=a.canvas.height*s;o.drawImage(a.canvas,(i-n)/2,(i-c)/2,n,c)})}function ne(){const e=r.extract;if(!e)return;const a=r.sources.find(n=>n.id===e.sourceId),i=S.querySelector("#ext-canvas");if(!a||!i)return;const o=e.zoom;i.width=Math.ceil(a.image.naturalWidth*o),i.height=Math.ceil(a.image.naturalHeight*o);const s=i.getContext("2d");if(s.imageSmoothingEnabled=!1,s.clearRect(0,0,i.width,i.height),s.drawImage(a.image,0,0,i.width,i.height),e.showGrid&&e.gridCols>0&&e.gridRows>0){const n=a.image.naturalWidth/e.gridCols,c=a.image.naturalHeight/e.gridRows;s.strokeStyle="rgba(240, 184, 90, 0.5)",s.lineWidth=1;for(let l=0;l<=e.gridCols;l+=1)s.beginPath(),s.moveTo(l*n*o+.5,0),s.lineTo(l*n*o+.5,i.height),s.stroke();for(let l=0;l<=e.gridRows;l+=1)s.beginPath(),s.moveTo(0,l*c*o+.5),s.lineTo(i.width,l*c*o+.5),s.stroke()}e.sel&&(s.fillStyle="rgba(102, 224, 170, 0.15)",s.fillRect(e.sel.x*o,e.sel.y*o,e.sel.w*o,e.sel.h*o),s.strokeStyle="rgba(102, 224, 170, 0.9)",s.lineWidth=1.5,s.strokeRect(e.sel.x*o,e.sel.y*o,e.sel.w*o,e.sel.h*o))}function Ne(e,a,i,o){const s=ve(e,a,i),n=r.brushSize/2/e.scale,c=e.canvas.getContext("2d");if(o){const l=pe.get(e.id);if(!l)return;c.save(),c.beginPath(),c.arc(s.x,s.y,n,0,Math.PI*2),c.clip(),c.clearRect(s.x-n,s.y-n,n*2,n*2),c.drawImage(l,0,0),c.restore()}else c.save(),c.globalCompositeOperation="destination-out",c.beginPath(),c.arc(s.x,s.y,n,0,Math.PI*2),c.fill(),c.restore()}function vt(e,a,i,o,s){const n=ve(e,Math.min(a,o),Math.min(i,s)),c=ve(e,Math.max(a,o),Math.max(i,s)),l=Math.min(n.x,c.x),u=Math.min(n.y,c.y),p=Math.abs(c.x-n.x),f=Math.abs(c.y-n.y);e.canvas.getContext("2d").clearRect(l,u,p,f)}function yt(e,a,i){const o=ve(e,a,i),s=Math.floor(o.x),n=Math.floor(o.y),c=e.canvas.width,l=e.canvas.height;if(s<0||n<0||s>=c||n>=l)return 0;const u=e.canvas.getContext("2d",{willReadFrequently:!0}),p=u.getImageData(0,0,c,l),f=p.data,y=(n*c+s)*4,b=f[y],d=f[y+1],h=f[y+2],$=f[y+3],w=r.tolerance,X=new Uint8Array(c*l),P=[n*c+s];let q=0;for(;P.length;){const B=P.pop();if(X[B])continue;X[B]=1;const j=B*4,se=f[j]-b,J=f[j+1]-d,I=f[j+2]-h,W=f[j+3]-$;if(Math.sqrt(se*se+J*J+I*I+W*W)>w)continue;f[j+3]=0,q+=1;const le=B%c,de=B/c|0;le>0&&P.push(B-1),le<c-1&&P.push(B+1),de>0&&P.push(B-c),de<l-1&&P.push(B+c)}return u.putImageData(p,0,0),q}function bt(e){const a=e.canvas.width,i=e.canvas.height,o=e.canvas.getContext("2d",{willReadFrequently:!0}),s=o.getImageData(0,0,a,i),n=s.data,c=[0,(a-1)*4,(i-1)*a*4,((i-1)*a+a-1)*4],l=[];for(const f of c){if(n[f+3]<8)continue;const y=[n[f],n[f+1],n[f+2]];l.some(b=>Math.abs(b[0]-y[0])+Math.abs(b[1]-y[1])+Math.abs(b[2]-y[2])<12)||l.push(y)}if(l.length===0)return 0;const u=r.tolerance;let p=0;for(let f=0;f<n.length;f+=4)if(!(n[f+3]<8))for(const y of l){const b=n[f]-y[0],d=n[f+1]-y[1],h=n[f+2]-y[2];if(Math.sqrt(b*b+d*d+h*h)<=u){n[f+3]=0,p+=1;break}}return o.putImageData(s,0,0),p}function Le(){const e=document.createElement("canvas");e.width=r.canvasW,e.height=r.canvasH;const a=e.getContext("2d");a.imageSmoothingEnabled=!1;for(const i of r.layers)i.visible&&(a.save(),a.translate(i.x,i.y),a.scale(i.scale*(i.flipX?-1:1),i.scale),i.flipX&&a.translate(-i.canvas.width,0),a.drawImage(i.canvas,0,0),a.restore());return e}async function De(e,a){const i=new Image;await new Promise((o,s)=>{i.onload=()=>o(),i.onerror=()=>s(new Error("Falha ao carregar PNG")),i.src=e}),r.sources.push({id:Ye("src"),name:a,image:i}),r.status=`Fonte adicionada: ${a}`,F()}function wt(e,a,i){let o=document.createElement("canvas");o.width=Math.max(1,Math.round(a.w)),o.height=Math.max(1,Math.round(a.h));const s=o.getContext("2d");s.imageSmoothingEnabled=!1,s.drawImage(e.image,a.x,a.y,a.w,a.h,0,0,o.width,o.height),i&&(o=Ze(o)),L();const n={id:Ye("layer"),name:`${e.name.replace(/\.png$/i,"")} [${Math.round(a.x)},${Math.round(a.y)}]`,canvas:o,x:Math.max(0,Math.round((r.canvasW-o.width)/2)),y:Math.max(0,Math.round((r.canvasH-o.height)/2)),scale:1,flipX:!1,visible:!0};pe.set(n.id,fe(o)),r.layers.push(n),r.activeLayer=n.id,r.status=`Camada criada (${o.width}×${o.height}).`}function xt(){S.querySelectorAll("[data-tool]").forEach(d=>{d.onclick=()=>{r.tool=d.dataset.tool,F()}});const e=S.querySelector("#comp-brush");e&&(e.oninput=()=>{var h;r.brushSize=Number(e.value);const d=(h=e.parentElement)==null?void 0:h.querySelector(".badge");d&&(d.textContent=`${r.brushSize}px`)});const a=S.querySelector("#comp-tol");a&&(a.oninput=()=>{var h;r.tolerance=Number(a.value);const d=(h=a.parentElement)==null?void 0:h.querySelector(".badge");d&&(d.textContent=String(r.tolerance))});const i=S.querySelector("#comp-snap");i&&(i.onchange=()=>{r.snap=i.checked});const o=S.querySelector("#comp-showgrid");o&&(o.onchange=()=>{r.showGrid=o.checked,D()});const s=S.querySelector("#comp-gridsize");s&&(s.oninput=()=>{r.gridSize=Math.max(1,Number(s.value)),D()});const n=S.querySelector("#comp-undo");n&&(n.onclick=Ke);for(const[d,h]of[["comp-w","canvasW"],["comp-h","canvasH"],["comp-zoom","zoom"]]){const $=S.querySelector(`#${d}`);$&&($.oninput=()=>{const w=Number($.value);h==="zoom"?r.zoom=Q(w||1,.1,8):w>=16&&(r[h]=Math.floor(w)),D()})}const c=S.querySelector("#comp-open-src");c&&(c.onclick=async()=>{const d=await xe.openImage();d&&await De(d.dataUrl,d.name)});const l=S.querySelector("#comp-src-drop");l&&(l.ondragover=d=>{d.preventDefault(),l.classList.add("dragover")},l.ondragleave=()=>l.classList.remove("dragover"),l.ondrop=d=>{var $;d.preventDefault(),l.classList.remove("dragover");const h=Array.from((($=d.dataTransfer)==null?void 0:$.files)??[]);for(const w of h){const X=new FileReader;X.onload=()=>{De(X.result,w.name)},X.readAsDataURL(w)}}),S.querySelectorAll("[data-src-extract]").forEach(d=>{d.onclick=()=>{const h=r.sources.find(w=>w.id===d.dataset.srcExtract);if(!h)return;const $=Q(680/Math.max(h.image.naturalWidth,h.image.naturalHeight),.1,2);r.extract={sourceId:h.id,zoom:Math.round($*20)/20,sel:null,dragStart:null,gridCols:4,gridRows:4,showGrid:!1,trim:!0},F()}}),S.querySelectorAll("[data-src-del]").forEach(d=>{d.onclick=()=>{r.sources=r.sources.filter(h=>h.id!==d.dataset.srcDel),F()}}),S.querySelectorAll("[data-layer]").forEach(d=>{d.onclick=()=>{r.activeLayer=d.dataset.layer,F()}}),S.querySelectorAll("[data-layer-vis]").forEach(d=>{d.onclick=h=>{h.stopPropagation();const $=r.layers.find(w=>w.id===d.dataset.layerVis);$&&($.visible=!$.visible,F())}}),S.querySelectorAll("[data-layer-del]").forEach(d=>{d.onclick=h=>{var $;h.stopPropagation(),L(),r.layers=r.layers.filter(w=>w.id!==d.dataset.layerDel),r.activeLayer===d.dataset.layerDel&&(r.activeLayer=(($=r.layers[r.layers.length-1])==null?void 0:$.id)??null),F()}}),S.querySelectorAll("[data-layer-dup]").forEach(d=>{d.onclick=h=>{h.stopPropagation();const $=r.layers.find(X=>X.id===d.dataset.layerDup);if(!$)return;L();const w={...$,id:Ye("layer"),name:`${$.name} (cópia)`,canvas:fe($.canvas),x:$.x+12,y:$.y+12};pe.set(w.id,fe(pe.get($.id)??$.canvas)),r.layers.push(w),r.activeLayer=w.id,F()}});for(const[d,h]of[["data-layer-up",1],["data-layer-down",-1]])S.querySelectorAll(`[${d}]`).forEach($=>{$.onclick=w=>{w.stopPropagation();const X=$.getAttribute(d),P=r.layers.findIndex(B=>B.id===X),q=P+h;P<0||q<0||q>=r.layers.length||(L(),[r.layers[P],r.layers[q]]=[r.layers[q],r.layers[P]],F())}});S.querySelectorAll("[data-lprop]").forEach(d=>{d.oninput=()=>{const h=G();if(!h)return;const $=d.dataset.lprop,w=Number(d.value);$==="scale"?h.scale=Q(w||1,.05,16):h[$]=w,D()}});const u=S.querySelector("#comp-flip");u&&(u.onclick=()=>{const d=G();d&&(L(),d.flipX=!d.flipX,F())});const p=S.querySelector("#comp-trim-layer");p&&(p.onclick=()=>{const d=G();d&&(L(),d.canvas=Ze(d.canvas),pe.set(d.id,fe(d.canvas)),F())});const f=S.querySelector("#comp-rembg");f&&(f.onclick=()=>{const d=G();if(!d)return;L();const h=bt(d);r.status=h>0?`${h} pixels de fundo removidos.`:"Nenhum fundo sólido detectado nos cantos (ajuste a tolerância).",F()});const y=S.querySelector("#comp-export");y&&(y.onclick=async()=>{const d=Le(),h=await xe.savePng(d.toDataURL("image/png"),"composicao.png");r.status=h?`PNG salvo: ${h.path}`:"Exportação cancelada.",F()});const b=S.querySelector("#comp-to-slicer");b&&(b.onclick=()=>{const d=Le();xe.sendToSlicer(d.toDataURL("image/png"),"composicao.png")}),$t(),St()}function Ge(e){const a=H.getBoundingClientRect();return{x:(e.clientX-a.left)/r.zoom,y:(e.clientY-a.top)/r.zoom}}function $t(){if(!H)return;H.onmousedown=a=>{const i=Ge(a);if(r.tool==="move"){const o=Re(i.x,i.y)??G();if(!o)return;r.activeLayer=o.id,U={id:o.id,startX:i.x,startY:i.y,origX:o.x,origY:o.y},L(),D()}else if(r.tool==="erase"||r.tool==="restore"){const o=G();if(!o){r.status="Selecione uma camada primeiro.",F();return}Fe||(L(),Fe=!0),me=!0,Ne(o,i.x,i.y,r.tool==="restore"),D()}else if(r.tool==="wand"){const o=G()??Re(i.x,i.y);if(!o){r.status="Nenhuma camada sob o cursor.",F();return}r.activeLayer=o.id,L();const s=yt(o,i.x,i.y);r.status=s>0?`Varinha: ${s} pixels removidos.`:"Nada removido (fora da camada?).",F()}else r.tool==="rect-erase"&&(C={x0:i.x,y0:i.y,x1:i.x,y1:i.y});a.preventDefault()},H.onmousemove=a=>{const i=Ge(a);if(U){const o=r.layers.find(s=>s.id===U.id);if(o){let s=U.origX+(i.x-U.startX),n=U.origY+(i.y-U.startY);r.snap&&r.gridSize>1&&(s=Math.round(s/r.gridSize)*r.gridSize,n=Math.round(n/r.gridSize)*r.gridSize),o.x=s,o.y=n,D()}}else if(me){const o=G();o&&(Ne(o,i.x,i.y,r.tool==="restore"),D())}else C&&(C.x1=i.x,C.y1=i.y,D())};const e=()=>{if(U&&(U=null,F()),me&&(me=!1,Fe=!1,Je()),C){const a=G();a&&(Math.abs(C.x1-C.x0)>1||Math.abs(C.y1-C.y0)>1)&&(L(),vt(a,C.x0,C.y0,C.x1,C.y1),r.status="Área apagada."),C=null,F()}};H.onmouseup=e,H.onmouseleave=()=>{(me||U||C)&&e()},H.onwheel=a=>{a.preventDefault();const i=a.deltaY<0?1.15:1/1.15;r.zoom=Q(Math.round(r.zoom*i*100)/100,.1,8);const o=S.querySelector("#comp-zoom");o&&(o.value=String(r.zoom)),D()}}function St(){const e=r.extract;if(!e)return;const a=r.sources.find(b=>b.id===e.sourceId),i=S.querySelector("#ext-canvas");if(!a||!i)return;const o=S.querySelector("#ext-close");o&&(o.onclick=()=>{r.extract=null,F()});const s=S.querySelector("#ext-zoom");s&&(s.oninput=()=>{var d;e.zoom=Number(s.value);const b=(d=s.parentElement)==null?void 0:d.querySelector(".badge");b&&(b.textContent=`${e.zoom.toFixed(2)}x`),ne()});const n=S.querySelector("#ext-showgrid");n&&(n.onchange=()=>{e.showGrid=n.checked,ne()});for(const[b,d]of[["ext-cols","gridCols"],["ext-rows","gridRows"]]){const h=S.querySelector(`#${b}`);h&&(h.oninput=()=>{e[d]=Math.max(1,Math.floor(Number(h.value)||1)),ne()})}const c=S.querySelector("#ext-trim");c&&(c.onchange=()=>{e.trim=c.checked});const l=S.querySelector("#ext-add");l&&(l.onclick=()=>{e.sel&&(wt(a,e.sel,e.trim),r.extract=null,F())});const u=b=>{const d=i.getBoundingClientRect(),h=i.width/d.width,$=i.height/d.height;return{x:Q((b.clientX-d.left)*h/e.zoom,0,a.image.naturalWidth),y:Q((b.clientY-d.top)*$/e.zoom,0,a.image.naturalHeight)}},p=()=>{const b=S.querySelector("#ext-sel-hint");b&&(b.textContent=e.sel?`Seleção: ${Math.round(e.sel.w)}×${Math.round(e.sel.h)}`:"Arraste para selecionar, ou clique numa célula da grade.");const d=S.querySelector("#ext-add");d&&(d.disabled=!e.sel||e.sel.w<1||e.sel.h<1)},f=b=>{if(!e.dragStart)return;const d=u(b);e.sel={x:Math.min(e.dragStart.x,d.x),y:Math.min(e.dragStart.y,d.y),w:Math.abs(d.x-e.dragStart.x),h:Math.abs(d.y-e.dragStart.y)},ne(),p()},y=b=>{if(window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",y),!e.dragStart)return;const d=u(b),h=Math.abs(d.x-e.dragStart.x)>3||Math.abs(d.y-e.dragStart.y)>3;if(!h&&e.showGrid){const $=a.image.naturalWidth/e.gridCols,w=a.image.naturalHeight/e.gridRows,X=Q(Math.floor(d.x/$),0,e.gridCols-1),P=Q(Math.floor(d.y/w),0,e.gridRows-1);e.sel={x:X*$,y:P*w,w:$,h:w}}else h||(e.sel=null);e.dragStart=null,ne(),p()};i.onmousedown=b=>{e.dragStart=u(b),window.addEventListener("mousemove",f),window.addEventListener("mouseup",y),b.preventDefault()}}let je=!1;function kt(e){je||(je=!0,window.addEventListener("keydown",a=>{var u;if(!e())return;const i=a.target;if(i&&(i.tagName==="INPUT"||i.tagName==="TEXTAREA"))return;if((a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="z"){a.preventDefault(),Ke();return}const s={v:"move",e:"erase",r:"restore",w:"wand",x:"rect-erase"}[a.key.toLowerCase()];if(s&&!a.ctrlKey&&!a.metaKey){r.tool=s,F();return}if(a.key==="["||a.key==="]"){r.brushSize=Q(r.brushSize+(a.key==="]"?4:-4),2,96),F();return}const n=G();if(!n)return;const c=a.shiftKey?10:1;let l=!0;switch(a.key){case"ArrowLeft":n.x-=c;break;case"ArrowRight":n.x+=c;break;case"ArrowUp":n.y-=c;break;case"ArrowDown":n.y+=c;break;case"Delete":case"Backspace":L(),r.layers=r.layers.filter(p=>p.id!==n.id),r.activeLayer=((u=r.layers[r.layers.length-1])==null?void 0:u.id)??null,F();return;default:l=!1}l&&(a.preventDefault(),D())}))}const Ue=["idle","walk","slash","hurt"],Ce=["fisico","fogo","gelo","raio","caos"],v={image:null,dataUrl:"",imageName:"nenhum arquivo",frameSize:32,faces:"left",tags:{idle:{row:0,from:0,to:3},walk:{row:1,from:0,to:3},slash:{row:2,from:0,to:3},hurt:{row:3,from:0,to:3}},previewTag:"walk",meta:{id:"",name:"",emoji:"👾",kind:"melee",element:"fisico",hp:30,attack:5,defense:2,attackSpeed:.8,moveSpeed:70,attackRange:40,reactionTime:.5,xpReward:12,goldReward:6,resists:{fisico:0,fogo:0,gelo:0,raio:0,caos:0}},status:"Abra a sprite sheet do monstro para começar."};let Ie,V,Be=0;function Mt(e,a){V=e,Ie=a,he()}function Y(e,a){return`<label class="mc-field"><span>${e}</span>${a}</label>`}function T(e,a,i=1){return`<input type="number" id="${e}" value="${a}" step="${i}">`}function he(){cancelAnimationFrame(Be);const e=v.meta;V.innerHTML=`
    <div class="mc-shell">
      <section class="mc-col">
        <div class="card">
          <h3>1 · Sprite</h3>
          <button id="mc-open">Abrir PNG</button>
          <span class="dim mc-filename">${v.imageName}</span>
          <div class="mc-grid2">
            ${Y("Tam. do frame",T("mc-framesize",v.frameSize))}
            ${Y("Olha para",`<select id="mc-faces"><option value="left" ${v.faces==="left"?"selected":""}>Esquerda</option><option value="right" ${v.faces==="right"?"selected":""}>Direita</option></select>`)}
          </div>
          <div class="mc-tags">
            <div class="mc-tag-row mc-tag-head"><b>ação</b><span>linha</span><span>de</span><span>até</span><span></span></div>
            ${Ue.map(s=>`<div class="mc-tag-row"><b>${s}</b> ${T(`mc-${s}-row`,v.tags[s].row)} ${T(`mc-${s}-from`,v.tags[s].from)} ${T(`mc-${s}-to`,v.tags[s].to)} <button type="button" class="mc-see" data-tag="${s}" title="Ver esta ação no preview">👁</button></div>`).join("")}
          </div>
          <canvas id="mc-preview" width="140" height="110"></canvas>
        </div>
      </section>
      <section class="mc-col">
        <div class="card">
          <h3>2 · Metadados</h3>
          <div class="mc-grid2">
            ${Y("id (a-z, _)",`<input id="mc-id" value="${e.id}" placeholder="ex.: golem_musgo">`)}
            ${Y("Nome",`<input id="mc-name" value="${e.name}" placeholder="ex.: Golem de Musgo">`)}
            ${Y("Emoji",`<input id="mc-emoji" value="${e.emoji}">`)}
            ${Y("Tipo",`<select id="mc-kind"><option value="melee" ${e.kind==="melee"?"selected":""}>Melee</option><option value="ranged" ${e.kind==="ranged"?"selected":""}>Ranged</option></select>`)}
            ${Y("Elemento",`<select id="mc-element">${Ce.map(s=>`<option ${e.element===s?"selected":""}>${s}</option>`).join("")}</select>`)}
            ${Y("HP",T("mc-hp",e.hp))}
            ${Y("Ataque",T("mc-attack",e.attack))}
            ${Y("Defesa",T("mc-defense",e.defense))}
            ${Y("Vel. ataque",T("mc-attackspeed",e.attackSpeed,.05))}
            ${Y("Vel. mov.",T("mc-movespeed",e.moveSpeed))}
            ${Y("Alcance",T("mc-attackrange",e.attackRange))}
            ${Y("Reação (s)",T("mc-reactiontime",e.reactionTime,.1))}
            ${Y("XP",T("mc-xpreward",e.xpReward))}
            ${Y("Ouro",T("mc-goldreward",e.goldReward))}
          </div>
          <h4>Resistências (pontos; negativo = fraqueza)</h4>
          <div class="mc-grid2">
            ${Ce.map(s=>Y(s,T(`mc-res-${s}`,e.resists[s]))).join("")}
          </div>
          <button class="primary" id="mc-export">💾 Exportar para o jogo</button>
          <div class="dim mc-status">${v.status}</div>
        </div>
      </section>
    </div>
  `,V.querySelector("#mc-open").onclick=async()=>{const s=await Ie.openImage();if(!s)return;const n=new Image;n.onload=()=>{v.image=n,v.dataUrl=s.dataUrl,v.imageName=s.name,v.status=`Sheet ${n.width}×${n.height}px carregada. Ajuste frame/tags.`,v.meta.id||(v.meta.id=s.name.replace(/\.png$/i,"").replace(/[^a-z0-9_]/gi,"_").toLowerCase()),he()},n.src=s.dataUrl};const a=(s,n)=>{const c=V.querySelector(`#${s}`);c&&(c.onchange=()=>n(Number(c.value)||0))};a("mc-framesize",s=>v.frameSize=Math.max(8,s));for(const s of Ue)a(`mc-${s}-row`,n=>v.tags[s].row=Math.max(0,n)),a(`mc-${s}-from`,n=>v.tags[s].from=Math.max(0,n)),a(`mc-${s}-to`,n=>v.tags[s].to=Math.max(0,n));const i=V.querySelector("#mc-faces");i.onchange=()=>v.faces=i.value,V.querySelectorAll(".mc-see").forEach(s=>{s.onclick=()=>{v.previewTag=s.dataset.tag,V.querySelectorAll(".mc-see").forEach(n=>n.classList.toggle("active",n===s))}});const o=(s,n)=>{const c=V.querySelector(`#${s}`);c&&(c.onchange=()=>n(c.value))};o("mc-id",s=>v.meta.id=s.replace(/[^a-z0-9_]/gi,"_").toLowerCase()),o("mc-name",s=>v.meta.name=s),o("mc-emoji",s=>v.meta.emoji=s||"👾"),o("mc-kind",s=>v.meta.kind=s),o("mc-element",s=>v.meta.element=s),a("mc-hp",s=>v.meta.hp=s),a("mc-attack",s=>v.meta.attack=s),a("mc-defense",s=>v.meta.defense=s),a("mc-attackspeed",s=>v.meta.attackSpeed=s),a("mc-movespeed",s=>v.meta.moveSpeed=s),a("mc-attackrange",s=>v.meta.attackRange=s),a("mc-reactiontime",s=>v.meta.reactionTime=s),a("mc-xpreward",s=>v.meta.xpReward=s),a("mc-goldreward",s=>v.meta.goldReward=s);for(const s of Ce)a(`mc-res-${s}`,n=>v.meta.resists[s]=n);V.querySelector("#mc-export").onclick=Et,At()}function At(){const e=V.querySelector("#mc-preview"),a=e==null?void 0:e.getContext("2d");if(!e||!a)return;const i=performance.now(),o=s=>{if(document.body.contains(e)){if(a.clearRect(0,0,e.width,e.height),a.imageSmoothingEnabled=!1,v.image){const n=v.tags[v.previewTag],c=Math.max(1,n.to-n.from+1),l=n.from+Math.floor((s-i)/160)%c,u=Math.min(3,96/v.frameSize),p=v.frameSize*u;a.save(),a.translate(e.width/2,e.height/2),v.faces==="right"&&a.scale(-1,1),a.drawImage(v.image,l*v.frameSize,n.row*v.frameSize,v.frameSize,v.frameSize,-p/2,-p/2,p,p),a.restore(),a.fillStyle="#9aa4b5",a.font="9px sans-serif",a.textAlign="center",a.fillText(`${v.previewTag} · linha ${n.row} · frames ${n.from}-${n.to}`,e.width/2,e.height-4)}else a.fillStyle="#666",a.font="10px sans-serif",a.textAlign="center",a.fillText("sem sheet",e.width/2,e.height/2);Be=requestAnimationFrame(o)}};Be=requestAnimationFrame(o)}async function Et(){const e=v.meta;if(!v.image||!v.dataUrl){v.status="⚠ Abra a sprite sheet antes de exportar.",he();return}if(!e.id||!e.name){v.status="⚠ Preencha id e nome.",he();return}const a=Math.floor(v.image.width/v.frameSize),i={format:"mini-guild-monster@1",template:{id:e.id,name:e.name,emoji:e.emoji,isBoss:!1,kind:e.kind,hp:e.hp,attack:e.attack,defense:e.defense,attackSpeed:e.attackSpeed,moveSpeed:e.moveSpeed,attackRange:e.kind==="ranged"?Math.max(200,e.attackRange):e.attackRange,reactionTime:e.reactionTime,xpReward:e.xpReward,goldReward:e.goldReward,element:e.element,resists:Object.fromEntries(Object.entries(e.resists).filter(([,s])=>s!==0))},sprite:{frameSize:v.frameSize,frames:a,faces:v.faces,tags:{idle:{...v.tags.idle},walk:{...v.tags.walk},slash:{...v.tags.slash},thrust:{...v.tags.slash},shoot:{...v.tags.slash},spellcast:{...v.tags.slash},hurt:{...v.tags.hurt}}},png:v.dataUrl},o=await Ie.saveArtifact(JSON.stringify(i,null,2),`${e.id}.monster.json`);v.status=o!=null&&o.path?`✔ Artefato salvo em ${o.path} — ingira com: node scripts/ingest-monsters.mjs "${o.path}"`:"Salvamento cancelado.",he()}const k=window.api,t={imageName:"nenhum arquivo",imagePath:"",dataUrl:"",image:null,imageWidth:0,imageHeight:0,cols:4,rows:8,offsetX:0,offsetY:0,gapX:0,gapY:0,frameW:128,frameH:128,outputW:128,outputH:128,padding:8,scalePct:100,shiftX:0,shiftY:0,trimAlpha:!0,currentAnim:"walk",zoom:.35,showGrid:!0,showBounds:!1,showCrosshair:!1,selectedFrame:null,focusedFrame:null,status:"Abra um PNG para começar.",animations:[{id:"idle",name:"Idle",row:0,from:0,to:3,fps:2,pingpong:!0},{id:"walk",name:"Walk",row:1,from:0,to:3,fps:5,pingpong:!1},{id:"rest",name:"Rest",row:3,from:0,to:3,fps:2,pingpong:!0},{id:"happy",name:"Happy",row:4,from:0,to:3,fps:4,pingpong:!1},{id:"sit",name:"Sit",row:7,from:0,to:3,fps:2,pingpong:!0}],frameBounds:{},frameOverrides:{},analysisDone:!1,dragStart:null,sheetScrollLeft:0,sheetScrollTop:0,expandedAnim:null,previewActive:!1,animSpeed:1,animPaused:!1,wizardStep:0,spriteType:"pet-grid",spriteFaces:"left",advancedMode:!1,mode:"slice"},ue=document.getElementById("editor-sprites");let ae,_,We=0;performance.now();let qe=0,Se=performance.now();function O(e,a){return`${e},${a}`}function Z(e){return e.replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[a])}function zt(e){return Z(e)}function ke(e,a,i){return Math.max(a,Math.min(i,e))}function E(e,a,i,o="number",s="1"){return`<div class="field"><label>${e}</label><input id="${a}" type="${o}" step="${s}" value="${i}"></div>`}function be(e,a,i,o){return`<div class="field"><label>${o}</label><input data-anim-field="${e}:${String(a)}" type="number" value="${i}"></div>`}function oe(e,a,i,o){return`<div class="field"><label>${o}</label><input data-anim-custom="${e}:${a}" type="number" value="${i}"></div>`}function Pe(e){t.wizardStep=Math.max(0,Math.min(5,e)),M()}function ye(e){return e===0?!0:t.image!==null}function Ft(e){return["Abrir","Grade","Analisar","Animações","Ajustes","Exportar"][e]??"?"}function Ct(){const e=t.image!==null;return`
    <div class="card wizard-bar">
      <div class="wizard-steps">${[0,1,2,3,4,5].map(i=>{let o="wizard-step";i===t.wizardStep?o+=" active":e&&i>0&&i<t.wizardStep&&(o+=" done"),ye(i)||(o+=" disabled");const s=ye(i);return`<button class="${o}" data-wizard-step="${i}" ${s?"":"disabled"}>${i+1}. ${Ft(i)}</button>`}).join("")}</div>
      <button id="wizard-adv-toggle" class="wizard-adv-toggle">${t.advancedMode?"Modo wizard":"Modo avançado"}</button>
    </div>
  `}function Pt(){const e=t.image!==null,i=[{value:"pet-grid",label:"Pet"},{value:"monster-strip",label:"Monstro strip"},{value:"monster-grid",label:"Monstro grid"}].map(s=>{const n=t.spriteType===s.value?"checked":"";return`<label class="check"><input type="radio" name="spriteType" value="${s.value}" ${n}> ${s.label}</label>`}).join(""),o=e?`<div class="group"><div class="group-title">Imagem atual</div>
       <div><span class="badge">${Z(t.imageName)}</span> · ${t.imageWidth}&#215;${t.imageHeight} px</div>
       ${t.imagePath?`<div class="dim" style="font-size:10px">${Z(t.imagePath)}</div>`:""}
       </div>`:'<div class="dim hint">Nenhuma imagem carregada.</div>';return`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Abrir imagem</div>
      <div id="drop-zone" class="drop-zone">
        <div class="drop-zone-inner">${["pet-grid","monster-grid"].includes(t.spriteType)?"&#x1F5BC;":"&#x1F39E;"} Arraste um PNG ou clique</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px">
        <button id="open-image" class="primary">Abrir PNG</button>
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${i}</div>
      </div>
      ${Xt()}
      ${o}
    </div>
    ${ce(0)}
  `}function Xt(){return t.spriteType==="pet-grid"?"":`
    <div class="group">
      <div class="group-title">Orientação da arte</div>
      <div class="dim hint" style="margin-bottom:4px">Para qual lado o sprite desenhado está olhando?</div>
      <div class="type-selector">
        <label class="type-radio ${t.spriteFaces==="left"?"selected":""}">
          <input type="radio" name="spriteFaces" value="left" ${t.spriteFaces==="left"?"checked":""}> ⬅ Esquerda
        </label>
        <label class="type-radio ${t.spriteFaces==="right"?"selected":""}">
          <input type="radio" name="spriteFaces" value="right" ${t.spriteFaces==="right"?"checked":""}> ➡ Direita
        </label>
      </div>
    </div>
  `}function Bt(){const e=t.spriteType==="monster-strip",a=t.image!==null,i=Math.round(t.frameW),o=Math.round(t.frameH);let s;return e?s=`
      <div class="grid-2">
        ${E("Frame W","frameW",i)}
        ${E("Frame H","frameH",o)}
        ${E("Colunas","cols",t.cols)}
      </div>
    `:s=`
      <div class="grid-2">
        ${E("Colunas","cols",t.cols)}
        ${E("Linhas","rows",t.rows)}
        ${E("Off X","offsetX",t.offsetX)}
        ${E("Off Y","offsetY",t.offsetY)}
        ${E("Gap X","gapX",t.gapX)}
        ${E("Gap Y","gapY",t.gapY)}
      </div>
      <div class="dim hint" style="margin-top:2px">Frame W: ${i} &#183; Frame H: ${o}</div>
    `,`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Configurar grade</div>
      ${s}
      <button id="auto-frame" class="compact" ${a?"":"disabled"} style="margin-top:4px">Calcular frame autom&#225;tico</button>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:6px">
        <label class="check"><input id="showGrid" type="checkbox" ${t.showGrid?"checked":""}> Mostrar grade</label>
        <div class="field" style="flex-direction:row;align-items:center;gap:4px">
          <label style="white-space:nowrap">Zoom:</label>
          <input id="zoom" type="number" step="0.05" value="${t.zoom}" style="width:70px">
        </div>
      </div>
    </div>
    ${ce(1)}
  `}function qt(){const e=t.image!==null,a=t.cols*t.rows,i=Object.keys(t.frameBounds).length;return`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Analisar frames</div>
      <button id="auto-analyze" class="primary compact" ${e?"":"disabled"} style="margin-bottom:6px">&#x1F50D; Detectar bounds (alpha)</button>
      <div class="group">
        <div class="group-title"><span>Resultados</span><span class="badge">${i}/${a}</span></div>
        ${Qe()}
      </div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
        <label class="check"><input id="showBounds" type="checkbox" ${t.showBounds?"checked":""} ${t.analysisDone?"":"disabled"}> Mostrar bounds no canvas</label>
        <button id="clear-bounds" class="compact" ${t.analysisDone?"":"disabled"}>Limpar an&#225;lise</button>
      </div>
    </div>
    ${ce(2)}
  `}function Yt(){return`
    <div class="card step-content">
      <div class="anim-section-head">
        <span class="group-title" style="font-size:14px">Definir anima&#231;&#245;es</span>
        <button id="add-anim">+ Nova anima&#231;&#227;o</button>
      </div>
      <div class="anim-list-card" style="max-height:none">${tt()}</div>
      <div style="margin-top:8px">
        <div class="dim" style="font-size:11px;margin-bottom:4px">Preview:</div>
        <div class="anim-buttons">${Ee()}</div>
      </div>
    </div>
    ${ce(3)}
  `}function It(){const e=Object.keys(t.frameOverrides).length;return`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Ajustes finos</div>
      <div class="group">
        <div class="group-title">Alinhamento</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button id="auto-center-frames" class="primary compact" ${t.image?"":"disabled"}>&#x1F3AF; Auto-centrar frames</button>
          <label class="check"><input id="showCrosshair" type="checkbox" ${t.showCrosshair?"checked":""}> Crosshair de centro</label>
        </div>
        <div class="dim hint">Detecta o centro de massa de cada frame e aplica shift automático.${e>0?` ${e} frame(s) com overrides ativos.`:""}</div>
      </div>
      <div class="group">
        <div class="group-title"><span>Saída</span><span>${t.outputW} x ${t.outputH}</span></div>
        <div class="grid-2">
          ${E("Frame W","outputW",t.outputW)}
          ${E("Frame H","outputH",t.outputH)}
          ${E("Pad","padding",t.padding)}
          ${E("Escala %","scalePct",t.scalePct)}
          ${E("Shift X","shiftX",t.shiftX)}
          ${E("Shift Y","shiftY",t.shiftY)}
        </div>
        <label class="check"><input id="trimAlpha" type="checkbox" ${t.trimAlpha?"checked":""}> Aparar transparência</label>
      </div>
      <div class="dim hint" style="margin-top:4px">Clique em um frame no canvas para inspecionar.</div>
      ${et()}
      <div class="group">
        <div class="group-title">Editor em lote de frames</div>
        <div class="dim hint">Arraste nas miniaturas ou use as setas do teclado.</div>
        ${Ht()}
      </div>
    </div>
    ${ce(4)}
  `}function Wt(){const e=t.image!==null,a=t.spriteType!=="pet-grid"?` · Arte olha p/ ${t.spriteFaces==="left"?"esquerda":"direita"}`:"",i=t.spriteType==="monster-strip"?`Tipo: Monster &#183; Strip &#183; ${t.cols} colunas &#183; ${t.animations.length} anima&#231;&#245;es${a}`:`Tipo: ${t.spriteType==="monster-grid"?"Monster":"Pet"} &#183; Grid ${t.cols}&#215;${t.rows} &#183; ${t.animations.length} anima&#231;&#245;es${a}`,o=t.previewActive?'<span class="badge" style="margin-left:6px">&#x25C9; Preview ativo no jogo!</span>':"";return`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Exportar</div>

      <div class="group">
        <div class="group-title">Arquivos</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button id="export-png" class="primary" ${e?"":"disabled"}>&#x1F4E6; Exportar PNG normalizado</button>
          <button id="save-profile" class="compact" ${e?"":"disabled"}>&#x1F4BE; Salvar perfil (.json)</button>
          <button id="save-game-config" class="compact" ${e?"":"disabled"}>&#x1F3AE; Salvar config p/ jogo</button>
        </div>
      </div>

      <div class="group">
        <div class="group-title">Preview ao vivo</div>
        <div style="display:flex;gap:6px;align-items:center">
          <button id="preview-game" class="primary" ${e?"":"disabled"}>${t.previewActive?"&#x1F3AF; Parar preview":"&#x1F3AF; Testar no jogo"}</button>
          ${o}
        </div>
      </div>

      <div class="group">
        <div class="group-title">Resumo</div>
        <div class="dim" style="font-size:11px">${i}</div>
        <div class="dim" style="font-size:11px">Output: ${t.outputW}&#215;${t.outputH} por frame</div>
        <div class="dim" style="font-size:11px">Imagem: ${Z(t.imageName)} (${t.imageWidth}&#215;${t.imageHeight})</div>
      </div>
    </div>
    ${ce(5)}
  `}function Tt(){return[Pt,Bt,qt,Yt,It,Wt][t.wizardStep]()}function Ht(){if(!t.image)return'<div class="dim hint">Abra uma imagem primeiro.</div>';const e=[];for(let a=0;a<t.rows;a+=1){const i=[];for(let o=0;o<t.cols;o+=1){const s=O(a,o),n=t.frameOverrides[s],c=n&&(n.shiftX||n.shiftY||n.scalePct),u=!!t.frameBounds[s],p=t.focusedFrame===`${a},${o}`,f=(n==null?void 0:n.shiftX)??0,y=(n==null?void 0:n.shiftY)??0;i.push(`
        <div class="batch-cell ${c?"has-override":""} ${u?"":"empty-cell"} ${p?"focused":""}"
             data-fr="${a},${o}" tabindex="0">
          <div class="batch-drag-area" data-fr="${a},${o}">
            <canvas class="batch-thumb" data-frc="${a},${o}"></canvas>
          </div>
          <div class="batch-label">${a},${o}</div>
          <div class="batch-steppers">
            <div class="batch-stepper-row">
              <button data-stp="${s}:shiftX:-1" title="Shift X -1">&#9664;</button>
              <span class="batch-val" data-fld="${s}:shiftX">${f||0}</span>
              <button data-stp="${s}:shiftX:1" title="Shift X +1">&#9654;</button>
            </div>
            <div class="batch-stepper-row">
              <button data-stp="${s}:shiftY:-1" title="Shift Y -1">&#9650;</button>
              <span class="batch-val" data-fld="${s}:shiftY">${y||0}</span>
              <button data-stp="${s}:shiftY:1" title="Shift Y +1">&#9660;</button>
            </div>
          </div>
        </div>
      `)}e.push(`<div class="batch-row">${i.join("")}</div>`)}return`<div class="batch-editor">${e.join("")}</div>`}function ce(e){return`
    <div class="step-nav">
      <button data-nav-prev ${e<=0||!ye(e-1)?"disabled":""}>&#8592; Anterior</button>
      <span class="dim" style="font-size:11px;align-self:center">Passo ${e+1} de 6</span>
      <button data-nav-next ${e>=5||!ye(e+1)?"disabled":""}>Pr&#243;ximo &#8594;</button>
    </div>
  `}function Ot(){switch(t.wizardStep){case 0:return`
        <div class="card">
          <div class="dim hint">Selecione o tipo de sprite sheet e abra uma imagem PNG.</div>
        </div>
      `;case 1:case 2:case 4:case 5:return"";case 3:{const a=K();return`
        <div class="card">
          <div class="group-title" style="font-size:12px">Anima&#231;&#227;o atual</div>
          <div><b>${(a==null?void 0:a.name)??"-"}</b> <span class="badge">row ${(a==null?void 0:a.row)??"-"} &#183; ${(a==null?void 0:a.from)??0}-${(a==null?void 0:a.to)??0}</span></div>
          <div class="anim-buttons" style="margin-top:4px">${Ee()}</div>
          <div class="status dim" style="margin-top:4px">${Z(t.status)}</div>
        </div>
        <div class="card">
          <button id="open-profile-sidebar" class="compact" style="width:100%">Abrir Perfil</button>
        </div>
      `}default:return""}}function Rt(){var e,a,i,o;return`
    <div class="card preview-card">
      <div class="preview-box"><canvas id="preview-canvas" width="${t.outputW}" height="${t.outputH}"></canvas></div>
      <div class="preview-meta">
        <div class="anim-buttons">${Ee()}</div>
        <div><b>${((e=K())==null?void 0:e.name)??"-"}</b> <span class="badge">row ${((a=K())==null?void 0:a.row)??"-"} &#183; ${((i=K())==null?void 0:i.from)??0}-${((o=K())==null?void 0:o.to)??0}</span></div>
        <div class="status">${Z(t.status)}</div>
      </div>
    </div>
  `}function Nt(){var e,a,i,o;return`
    <div class="tool-shell">
      <section class="workspace">
        <div class="card topbar">
          <div class="file-title">
            <b>${Z(t.imageName)}</b>
            <span>${t.imageWidth||"-"} x ${t.imageHeight||"-"} px${t.imagePath?` &#183; ${Z(t.imagePath)}`:""}</span>
          </div>
          <div class="toolbar-actions">
            <button id="open-image" class="primary">Abrir PNG</button>
            <button id="open-profile" class="compact">Abrir Perfil</button>
            <button id="save-profile" class="compact" ${t.image?"":"disabled"}>Salvar Perfil</button>
            <button id="auto-analyze" class="primary" ${t.image?"":"disabled"}>Analisar bounds</button>
            <button id="export-png" class="primary" ${t.image?"":"disabled"}>Exportar PNG</button>
            <button id="preview-game" class="primary" ${t.image?"":"disabled"}>${t.previewActive?"Parar preview":"Testar no jogo"}</button>
            <button id="save-game-config" class="compact" ${t.image?"":"disabled"}>Salvar config p/ jogo</button>
          </div>
        </div>
        <div class="card canvas-wrap">
          <canvas id="sheet-canvas"></canvas>
        </div>
        <div class="card preview-card">
          <div class="preview-box"><canvas id="preview-canvas" width="${t.outputW}" height="${t.outputH}"></canvas></div>
          <div class="preview-meta">
        <div class="anim-buttons">${Ee()}</div>
        <div class="preview-speed-row">
          <button id="preview-pause" class="compact" title="${t.animPaused?"Play":"Pausar"}">${t.animPaused?"&#9654;":"&#10074;&#10074;"}</button>
          <input id="anim-speed" type="range" min="0.05" max="3" step="0.05" value="${t.animSpeed}" title="Velocidade">
          <span class="speed-label">&#215;${t.animSpeed.toFixed(2)}</span>
        </div>
            <div><b>${((e=K())==null?void 0:e.name)??"-"}</b> <span class="badge">row ${((a=K())==null?void 0:a.row)??"-"} &#183; ${((i=K())==null?void 0:i.from)??0}-${((o=K())==null?void 0:o.to)??0}</span></div>
            <div class="status">${Z(t.status)}</div>
          </div>
        </div>
        ${et()}
      </section>
      <aside class="side">
        <div class="side-panel">
          <div class="card controls">
            ${Lt()}
            ${Dt()}
            ${Gt()}
            ${jt()}
          </div>
          <div class="card">
            <div class="anim-section-head">
              <span class="group-title">Anima&#231;&#245;es</span>
              <button id="add-anim">+ Nova</button>
            </div>
            <div class="anim-list-card">${tt()}</div>
          </div>
          <button id="wizard-adv-toggle" class="compact" style="width:100%">Modo wizard</button>
        </div>
      </aside>
    </div>
  `}function Lt(){return`
    <div class="group">
      <div class="group-title"><span>Grade</span><span>${Math.round(t.frameW)} x ${Math.round(t.frameH)}</span></div>
      <div class="grid-2">
        ${E("Colunas","cols",t.cols)}
        ${E("Linhas","rows",t.rows)}
        ${E("Off X","offsetX",t.offsetX)}
        ${E("Off Y","offsetY",t.offsetY)}
        ${E("Gap X","gapX",t.gapX)}
        ${E("Gap Y","gapY",t.gapY)}
      </div>
      <button id="auto-frame" class="compact" ${t.image?"":"disabled"}>Calcular frame</button>
      <label class="check"><input id="showGrid" type="checkbox" ${t.showGrid?"checked":""}> grade</label>
      <label class="check"><input id="showBounds" type="checkbox" ${t.showBounds?"checked":""} ${t.analysisDone?"":"disabled"}> bounds</label>
    </div>
  `}function Dt(){const e=t.cols*t.rows;return`
    <div class="group">
      <div class="group-title"><span>An&#225;lise</span><span class="badge">${Object.keys(t.frameBounds).length}/${e}</span></div>
      <button id="auto-analyze" class="primary compact" ${t.image?"":"disabled"}>Detectar bounds</button>
      <button id="clear-bounds" class="compact" ${t.analysisDone?"":"disabled"}>Limpar</button>
      <div class="stats-grid">${Qe()}</div>
    </div>
  `}function Qe(){if(!t.analysisDone)return'<span class="dim hint">Clique em Analisar.</span>';const e=Object.values(t.frameBounds);if(e.length===0)return'<span class="dim hint">Nenhum frame.</span>';const a=e.map(f=>f.w),i=e.map(f=>f.h),o=Math.min(...a),s=Math.max(...a),n=Math.round(a.reduce((f,y)=>f+y,0)/a.length),c=Math.min(...i),l=Math.max(...i),u=Math.round(i.reduce((f,y)=>f+y,0)/i.length),p=e.filter(f=>{const y=f.w*f.h/(n*u);return y<.5||y>1.8});return`
    <div class="stat-row"><span>Largura</span><span>min ${o} / max ${s} / med ${n}</span></div>
    <div class="stat-row"><span>Altura</span><span>min ${c} / max ${l} / med ${u}</span></div>
    <div class="stat-row"><span>Total</span><span>${e.length}</span></div>
    ${p.length>0?`<div class="stat-row warning"><span>&#x26A0; Outliers</span><span>${p.length} frame(s)</span></div>`:""}
  `}function Gt(){return`
    <div class="group">
      <div class="group-title"><span>Sa&#237;da</span><span>${t.outputW} x ${t.outputH}</span></div>
      <div class="grid-2">
        ${E("Frame W","outputW",t.outputW)}
        ${E("Frame H","outputH",t.outputH)}
        ${E("Pad","padding",t.padding)}
        ${E("Escala %","scalePct",t.scalePct)}
        ${E("Shift X","shiftX",t.shiftX)}
        ${E("Shift Y","shiftY",t.shiftY)}
      </div>
      <label class="check"><input id="trimAlpha" type="checkbox" ${t.trimAlpha?"checked":""}> aparar transpar&#234;ncia</label>
    </div>
  `}function jt(){return`
    <div class="group">
      <div class="group-title"><span>Visualiza&#231;&#227;o</span></div>
      ${E("Zoom","zoom",t.zoom,"number","0.05")}
    </div>
  `}function et(){if(!t.selectedFrame||!t.image)return"";const[e,a]=t.selectedFrame.split(",").map(Number),i=O(e,a),o=t.frameBounds[i],s=t.frameOverrides[i],n=N(a,e),c=o!=null,l=c?o.w:Math.round(n.w),u=c?o.h:Math.round(n.h),p=(s==null?void 0:s.shiftX)??0,f=(s==null?void 0:s.shiftY)??0,y=(s==null?void 0:s.scalePct)??t.scalePct;return`
    <div class="card frame-inspector">
      <div class="inspector-head">
        <span class="group-title">Frame [${e},${a}]</span>
        <button id="close-inspector">&#x2715;</button>
      </div>
      <div class="grid-3">
        <div class="field"><label>Raw W</label><span class="value">${Math.round(n.w)}</span></div>
        <div class="field"><label>Raw H</label><span class="value">${Math.round(n.h)}</span></div>
        <div class="field"><label>Cont W</label><span class="value ${c?"badge":"dim"}">${c?l:"&#8212;"}</span></div>
        <div class="field"><label>Cont H</label><span class="value ${c?"badge":"dim"}">${c?u:"&#8212;"}</span></div>
      </div>
      <div class="grid-3">
        <div class="field"><label>Shift X</label><input id="ov-shiftX" type="number" value="${p}"></div>
        <div class="field"><label>Shift Y</label><input id="ov-shiftY" type="number" value="${f}"></div>
        <div class="field"><label>Escala %</label><input id="ov-scalePct" type="number" value="${y}"></div>
      </div>
      <button id="reset-override" class="compact danger" ${s?"":"disabled"}>Resetar override</button>
      <div class="frame-preview-box">
        <canvas id="frame-preview-canvas" width="${l}" height="${u}"></canvas>
      </div>
    </div>
  `}function Ee(){return t.animations.map(e=>`<button class="anim-btn ${t.currentAnim===e.id?"active":""}" data-play="${e.id}">${Z(e.name)}</button>`).join("")}function tt(){return t.animations.map(e=>{const a=t.expandedAnim===e.id;return`
      <div class="anim-row ${t.currentAnim===e.id?"active":""}" data-anim="${e.id}">
        <div class="anim-head">
          <input data-anim-name="${e.id}" type="text" value="${zt(e.name)}">
          <button data-play="${e.id}" title="Preview">&#x25B6;</button>
          <button data-toggle="${e.id}" title="${a?"Recolher":"Editar frames"}" class="${a?"primary":""}">&#x25A1;</button>
          <button data-del="${e.id}" class="danger">X</button>
        </div>
        <div class="anim-fields">
          ${be(e.id,"row",e.row,"Row")}
          ${be(e.id,"from",e.from,"De")}
          ${be(e.id,"to",e.to,"Até")}
          ${be(e.id,"fps",e.fps,"FPS")}
        </div>
        <label class="check"><input data-ping="${e.id}" type="checkbox" ${e.pingpong?"checked":""}> ping-pong</label>
        <label class="check"><input data-custom="${e.id}" type="checkbox" ${e.customFrame?"checked":""}> grid customizado (para sheets de IA desalinhadas)</label>
        ${e.customFrame?`
          <div class="anim-custom-grid grid-4">
            ${oe(e.id,"animOffsetX",e.animOffsetX??t.offsetX,"Off X")}
            ${oe(e.id,"animOffsetY",e.animOffsetY??t.offsetY,"Off Y")}
            ${oe(e.id,"animGapX",e.animGapX??t.gapX,"Gap X")}
            ${oe(e.id,"animGapY",e.animGapY??t.gapY,"Gap Y")}
            ${oe(e.id,"animFrameW",e.animFrameW??Math.round(t.frameW),"Frame W")}
            ${oe(e.id,"animFrameH",e.animFrameH??Math.round(t.frameH),"Frame H")}
          </div>
          <button data-copy-global="${e.id}" style="font-size:10px">Copiar do grid global</button>
        `:""}
        ${a?Ut(e):""}
      </div>
    `}).join("")}function Ut(e){const a=Math.floor(e.from),i=Math.floor(e.to),o=Math.min(a,i),s=Math.max(a,i),n=[];for(let l=o;l<=s;l++)n.push(l);return e.pingpong&&n.length>2&&n.push(...n.slice(1,-1).reverse()),`<div class="anim-frames-strip">${n.map(l=>{const u=O(e.row,l),p=t.frameOverrides[u],f=(p==null?void 0:p.shiftX)??0,y=(p==null?void 0:p.shiftY)??0,b=(p==null?void 0:p.scalePct)??t.scalePct;return`<div class="anim-frame-cell" data-fr="${e.row},${l}">
      <canvas class="thumb-canvas" data-frc="${e.row},${l}"></canvas>
      <div class="frame-label">col ${l}</div>
      <input data-ovf="${u}:shiftX" type="number" value="${f}" placeholder="sx" title="Shift X">
      <input data-ovf="${u}:shiftY" type="number" value="${y}" placeholder="sy" title="Shift Y">
      <input data-ovf="${u}:scalePct" type="number" value="${b}" placeholder="sc" title="Escala %">
    </div>`}).join("")}</div>`}function we(){return`
    <div class="mode-tabs">
      <button class="mode-tab ${t.mode==="slice"?"active":""}" data-mode="slice">&#x2702; Fatiar &amp; Animar</button>
      <button class="mode-tab ${t.mode==="compose"?"active":""}" data-mode="compose">&#x1F9E9; Compor &amp; Limpar</button>
      <button class="mode-tab ${t.mode==="monster"?"active":""}" data-mode="monster">&#x1F47E; Criar Monstro</button>
    </div>
  `}function Xe(){ue.querySelectorAll("[data-mode]").forEach(e=>{e.onclick=()=>{t.mode=e.dataset.mode,M()}})}function Vt(e,a){t.mode="slice",ze(e,a,"").then(()=>{Me(),t.status="Composição carregada. Ajuste a grade.",t.analysisDone=!1,t.frameBounds={},t.frameOverrides={},t.selectedFrame=null,t.wizardStep=1,M()})}function M(){if(t.mode==="monster"){ue.innerHTML=`${we()}<div id="monster-root"></div>`,Xe(),Mt(document.getElementById("monster-root"),{openImage:async()=>{var e;return await((e=k.editorSpritesOpenImage)==null?void 0:e.call(k))??null},saveArtifact:async(e,a)=>{var i;return await((i=k.editorSpritesSaveProfile)==null?void 0:i.call(k,e,a))??null}}),ae=null,_=null;return}if(t.mode==="compose"){ue.innerHTML=`${we()}<div id="composer-root"></div>`,Xe(),rt(document.getElementById("composer-root"),{openImage:async()=>{var e;return await((e=k.editorSpritesOpenImage)==null?void 0:e.call(k))??null},savePng:async(e,a)=>{var i;return await((i=k.editorSpritesSavePng)==null?void 0:i.call(k,e,a))??null},sendToSlicer:Vt}),ae=null,_=null;return}t.advancedMode?ue.innerHTML=we()+Nt():ue.innerHTML=`
      ${we()}
      <div class="tool-shell">
        <section class="workspace">
          ${Ct()}
          <div class="card canvas-wrap">
            <canvas id="sheet-canvas"></canvas>
          </div>
          ${Tt()}
        </section>
        <aside class="side">
          <div class="side-panel">
            ${Rt()}
            ${Ot()}
          </div>
        </aside>
      </div>
    `,ae=document.getElementById("sheet-canvas"),_=document.getElementById("preview-canvas"),Xe(),_t(),te()}function _t(){const e=document.getElementById("open-image");e&&(e.onclick=Ve);const a=document.getElementById("open-profile");a&&(a.onclick=_e);const i=document.getElementById("open-profile-sidebar");i&&(i.onclick=_e);const o=document.getElementById("save-profile");o&&(o.onclick=na);const s=document.getElementById("export-png");s&&(s.onclick=oa);const n=document.getElementById("auto-frame");n&&(n.onclick=Me);const c=document.getElementById("add-anim");c&&(c.onclick=da),document.querySelectorAll("#auto-analyze").forEach(m=>{m.onclick=Zt});const u=document.getElementById("preview-game");u&&(u.onclick=ra);const p=document.getElementById("save-game-config");p&&(p.onclick=ca);const f=document.getElementById("clear-bounds");f&&(f.onclick=Jt);const y=document.getElementById("close-inspector");y&&(y.onclick=()=>{t.selectedFrame=null,M()});const b=document.getElementById("reset-override");b&&(b.onclick=()=>{if(!t.selectedFrame)return;const[m,g]=t.selectedFrame.split(",").map(Number);delete t.frameOverrides[O(m,g)],M()});const d=document.getElementById("wizard-adv-toggle");d&&(d.onclick=()=>{t.advancedMode=!t.advancedMode,M()}),document.querySelectorAll("[data-wizard-step]").forEach(m=>{const g=Number(m.dataset.wizardStep);ye(g)&&(m.onclick=()=>Pe(g))});const h=document.querySelector("[data-nav-prev]");h&&h.addEventListener("click",()=>Pe(t.wizardStep-1));const $=document.querySelector("[data-nav-next]");$&&$.addEventListener("click",()=>Pe(t.wizardStep+1));const w=document.getElementById("drop-zone");w&&(w.onclick=()=>Ve(),w.ondragover=m=>{m.preventDefault(),w.classList.add("dragover")},w.ondragleave=()=>{w.classList.remove("dragover")},w.ondrop=async m=>{var A,z;m.preventDefault(),w.classList.remove("dragover");const g=(z=(A=m.dataTransfer)==null?void 0:A.files)==null?void 0:z[0];if(!g)return;const x=new FileReader;x.onload=async()=>{const R=x.result;await ze(R,g.name,""),Me(),t.status="Imagem carregada via drag-drop.",t.analysisDone=!1,t.frameBounds={},t.frameOverrides={},t.selectedFrame=null,t.expandedAnim=null,t.wizardStep===0&&!t.advancedMode&&(t.wizardStep=1),M()},x.readAsDataURL(g)}),document.querySelectorAll('input[name="spriteType"]').forEach(m=>{m.onchange=()=>{t.spriteType=m.value,t.spriteType==="monster-strip"&&(t.rows=1),Ae(),M()}});for(const[m,g]of[["ov-shiftX","shiftX"],["ov-shiftY","shiftY"],["ov-scalePct","scalePct"]]){const x=document.getElementById(m);x&&(x.oninput=()=>{if(!t.selectedFrame)return;const[A,z]=t.selectedFrame.split(",").map(Number),R=O(A,z);t.frameOverrides[R]||(t.frameOverrides[R]={}),t.frameOverrides[R][g]=Number(x.value)})}for(const m of["cols","rows","offsetX","offsetY","gapX","gapY","frameW","frameH","outputW","outputH","padding","scalePct","shiftX","shiftY","zoom"]){const g=document.getElementById(m);g&&(g.oninput=()=>{t[m]=Number(g.value),(m==="cols"||m==="rows"||m==="offsetX"||m==="offsetY"||m==="gapX"||m==="gapY")&&(Ae(),t.analysisDone=!1,t.frameBounds={},ee()),(m==="outputW"||m==="outputH")&&Kt(),te()})}const X=document.getElementById("trimAlpha");X&&(X.onchange=m=>{t.trimAlpha=m.currentTarget.checked});const P=document.getElementById("showGrid");P&&(P.onchange=m=>{t.showGrid=m.currentTarget.checked,te()});const q=document.getElementById("showBounds");q&&(q.onchange=m=>{t.showBounds=m.currentTarget.checked,te()});const B=document.getElementById("showCrosshair");B&&(B.onchange=m=>{t.showCrosshair=m.currentTarget.checked,te()});const j=document.getElementById("auto-center-frames");j&&(j.onclick=Qt);const se=document.getElementById("preview-pause");se&&(se.onclick=()=>{t.animPaused=!t.animPaused,Se=performance.now(),M()});const J=document.getElementById("anim-speed");J&&(J.oninput=()=>{t.animSpeed=Math.max(.05,Number(J.value)),Se=performance.now(),M()}),document.querySelectorAll('input[name="spriteFaces"]').forEach(m=>{m.onchange=()=>{t.spriteFaces=m.value,t.previewActive&&ee(),M()}}),document.querySelectorAll(".batch-cell").forEach(m=>{m.onclick=g=>{const x=m.dataset.fr;t.focusedFrame=x,t.selectedFrame=x;const A=document.querySelector(".canvas-wrap");if(A){const[z,R]=x.split(",").map(Number),ie=N(R,z);A.scrollLeft=(ie.x+ie.w/2)*t.zoom-A.clientWidth/2,A.scrollTop=(ie.y+ie.h/2)*t.zoom-A.clientHeight/2}M()}}),document.querySelectorAll("[data-stp]").forEach(m=>{m.onclick=g=>{g.stopPropagation();const[x,A,z]=m.dataset.stp.split(":"),R=Number(z);t.frameOverrides[x]||(t.frameOverrides[x]={});const ie=t.frameOverrides[x][A]??0;t.frameOverrides[x][A]=ie+R,t.focusedFrame=x,te(),t.previewActive&&ee()}});let I=null,W=0,le=0,de=0,Oe=0;document.querySelectorAll(".batch-drag-area").forEach(m=>{m.addEventListener("mousedown",g=>{I=m.dataset.fr,W=g.clientX,le=g.clientY;const x=t.frameOverrides[I];de=(x==null?void 0:x.shiftX)??0,Oe=(x==null?void 0:x.shiftY)??0,g.preventDefault()})}),window.addEventListener("mousemove",m=>{if(I){const A=Math.round((m.clientX-W)*.5),z=Math.round((m.clientY-le)*.5);t.frameOverrides[I]||(t.frameOverrides[I]={}),t.frameOverrides[I].shiftX=de+A,t.frameOverrides[I].shiftY=Oe+z,t.focusedFrame=I,te(),t.previewActive&&ee();return}if(!t.dragStart)return;const g=m.clientX-t.dragStart.x,x=m.clientY-t.dragStart.y;if(Math.abs(g)>2||Math.abs(x)>2){const A=ae.parentElement;A&&(A.scrollLeft-=g,A.scrollTop-=x),t.dragStart={x:m.clientX,y:m.clientY}}}),window.addEventListener("mouseup",()=>{I&&(I=null,M()),t.dragStart=null}),window.addEventListener("keydown",m=>{if(t.mode!=="slice"||!t.focusedFrame||t.wizardStep!==4)return;const g=t.focusedFrame,x=m.shiftKey?5:1;let A=!0;t.frameOverrides[g]||(t.frameOverrides[g]={});const z=t.frameOverrides[g];switch(m.key){case"ArrowLeft":z.shiftX=(z.shiftX??0)-x;break;case"ArrowRight":z.shiftX=(z.shiftX??0)+x;break;case"ArrowUp":z.shiftY=(z.shiftY??0)-x;break;case"ArrowDown":z.shiftY=(z.shiftY??0)+x;break;default:A=!1}A&&(m.preventDefault(),te(),t.previewActive&&ee())}),document.querySelectorAll("[data-play]").forEach(m=>{m.onclick=()=>{t.currentAnim=m.dataset.play,performance.now(),qe=0,M()}}),document.querySelectorAll("[data-toggle]").forEach(m=>{m.onclick=()=>{const g=m.dataset.toggle;t.expandedAnim=t.expandedAnim===g?null:g,M()}}),document.querySelectorAll("[data-anim-name]").forEach(m=>{m.oninput=()=>{const g=t.animations.find(x=>x.id===m.dataset.animName);g&&(g.name=m.value)}}),document.querySelectorAll("[data-anim-field]").forEach(m=>{m.oninput=()=>{const[g,x]=m.dataset.animField.split(":"),A=t.animations.find(z=>z.id===g);A&&(A[x]=Number(m.value),ee())}}),document.querySelectorAll("[data-ping]").forEach(m=>{m.onchange=()=>{const g=t.animations.find(x=>x.id===m.dataset.ping);g&&(g.pingpong=m.checked,ee())}}),document.querySelectorAll("[data-del]").forEach(m=>{m.onclick=()=>{var g;t.animations=t.animations.filter(x=>x.id!==m.dataset.del),t.expandedAnim===m.dataset.del&&(t.expandedAnim=null),t.currentAnim=((g=t.animations[0])==null?void 0:g.id)??"",M()}}),document.querySelectorAll("[data-ovf]").forEach(m=>{m.oninput=()=>{const[g,x]=m.dataset.ovf.split(":");t.frameOverrides[g]||(t.frameOverrides[g]={}),t.frameOverrides[g][x]=Number(m.value)}}),document.querySelectorAll("[data-custom]").forEach(m=>{m.onchange=()=>{const g=t.animations.find(x=>x.id===m.dataset.custom);g&&(g.customFrame=m.checked,m.checked&&g.animFrameW==null&&(g.animOffsetX=t.offsetX,g.animOffsetY=t.offsetY,g.animGapX=t.gapX,g.animGapY=t.gapY,g.animFrameW=Math.round(t.frameW),g.animFrameH=Math.round(t.frameH)),M())}}),document.querySelectorAll("[data-anim-custom]").forEach(m=>{m.oninput=()=>{const[g,x]=m.dataset.animCustom.split(":"),A=t.animations.find(z=>z.id===g);A&&(A[x]=Number(m.value),ee())}}),document.querySelectorAll("[data-copy-global]").forEach(m=>{m.onclick=()=>{const g=t.animations.find(x=>x.id===m.dataset.copyGlobal);g&&(g.animOffsetX=t.offsetX,g.animOffsetY=t.offsetY,g.animGapX=t.gapX,g.animGapY=t.gapY,g.animFrameW=Math.round(t.frameW),g.animFrameH=Math.round(t.frameH),M())}}),ae&&(ae.onclick=m=>{if(!t.image)return;const g=ae.getBoundingClientRect(),x=(m.clientX-g.left)/t.zoom,A=m.clientY>g.bottom?-1:(m.clientY-g.top)/t.zoom,z=Math.floor((x-t.offsetX)/(t.frameW+t.gapX)),R=Math.floor((A-t.offsetY)/(t.frameH+t.gapY));z>=0&&z<t.cols&&R>=0&&R<t.rows?t.selectedFrame=O(R,z):t.selectedFrame=null,M()})}async function Ve(){var a;const e=await((a=k.editorSpritesOpenImage)==null?void 0:a.call(k));e&&(await ze(e.dataUrl,e.name,e.path),Me(),t.status="Imagem carregada. Ajuste a grade e clique em Analisar.",t.analysisDone=!1,t.frameBounds={},t.frameOverrides={},t.selectedFrame=null,t.expandedAnim=null,t.wizardStep===0&&!t.advancedMode&&(t.wizardStep=1),M())}async function ze(e,a,i){const o=new Image;await new Promise((s,n)=>{o.onload=()=>s(),o.onerror=()=>n(new Error("Falha ao carregar PNG")),o.src=e}),t.image=o,t.dataUrl=e,t.imageName=a,t.imagePath=i,t.imageWidth=o.naturalWidth,t.imageHeight=o.naturalHeight}function Me(){t.image&&(Ae(),(!t.outputW||!t.outputH)&&(t.outputW=Math.round(t.frameW),t.outputH=Math.round(t.frameH)),M())}function Ae(){t.image&&(t.cols=Math.max(1,Math.floor(t.cols)),t.rows=Math.max(1,Math.floor(t.rows)),t.frameW=(t.imageWidth-t.offsetX*2-t.gapX*(t.cols-1))/t.cols,t.frameH=(t.imageHeight-t.offsetY*2-t.gapY*(t.rows-1))/t.rows)}function Kt(){_&&(_.width=Math.max(1,Math.floor(t.outputW)),_.height=Math.max(1,Math.floor(t.outputH)))}function Zt(){t.image&&(t.frameBounds={},t.status="Analisando frames...",M(),requestAnimationFrame(()=>{for(let e=0;e<t.rows;e+=1)for(let a=0;a<t.cols;a+=1){const i=N(a,e),o=Te(i);o&&(t.frameBounds[O(e,a)]=o)}t.analysisDone=!0,t.showBounds=!0,t.status=`Análise concluída: ${Object.keys(t.frameBounds).length} de ${t.cols*t.rows} frames com conteúdo.`,M()}))}function Jt(){t.frameBounds={},t.analysisDone=!1,t.showBounds=!1,t.status="Bounds limpos.",M()}function Qt(){t.image&&(t.status="Calculando centros...",M(),requestAnimationFrame(()=>{let e=0;for(let a=0;a<t.rows;a+=1)for(let i=0;i<t.cols;i+=1){const o=O(a,i),s=t.frameBounds[o]??Te(N(i,a));if(!s)continue;const n=N(i,a),c=s.x+s.w/2,l=s.y+s.h/2,u=n.w/2,p=n.h/2,f=Math.round(u-c),y=Math.round(p-l);f===0&&y===0||(t.frameOverrides[o]||(t.frameOverrides[o]={}),t.frameOverrides[o].shiftX=f,t.frameOverrides[o].shiftY=y,e+=1)}t.analysisDone=!0,t.showBounds=!0,t.showCrosshair=!0,t.status=`${e} frames centralizados com base nos bounds alpha.`,M()}))}function te(){const e=ae;if(!e)return;const a=e.getContext("2d");if(!a)return;const i=t.imageWidth||720,o=t.imageHeight||720,s=Math.max(.05,t.zoom);if(e.width=Math.ceil(i*s),e.height=Math.ceil(o*s),a.imageSmoothingEnabled=!1,a.clearRect(0,0,e.width,e.height),t.image&&a.drawImage(t.image,0,0,e.width,e.height),!!t.image){if(t.showBounds&&t.analysisDone)for(let n=0;n<t.rows;n+=1)for(let c=0;c<t.cols;c+=1){const l=t.frameBounds[O(n,c)];if(!l)continue;const u=N(c,n),p=(u.x+l.x)*s,f=(u.y+l.y)*s,y=l.w*s,b=l.h*s;a.fillStyle="rgba(240, 184, 90, 0.15)",a.fillRect(p,f,y,b),a.strokeStyle="rgba(240, 184, 90, 0.65)",a.lineWidth=1,a.strokeRect(p,f,y,b)}if(t.showCrosshair&&t.image)for(let n=0;n<t.rows;n+=1)for(let c=0;c<t.cols;c+=1){const l=N(c,n),u=(l.x+l.w/2)*s,p=(l.y+l.h/2)*s;a.strokeStyle="rgba(255, 120, 120, 0.32)",a.lineWidth=.5,a.setLineDash([2,6]),a.beginPath(),a.moveTo(u,l.y*s),a.lineTo(u,(l.y+l.h)*s),a.stroke(),a.beginPath(),a.moveTo(l.x*s,p),a.lineTo((l.x+l.w)*s,p),a.stroke(),a.setLineDash([])}if(t.selectedFrame){const[n,c]=t.selectedFrame.split(",").map(Number),l=N(c,n);a.strokeStyle="rgba(102, 224, 170, 0.85)",a.lineWidth=2,a.strokeRect(l.x*s,l.y*s,l.w*s,l.h*s),a.fillStyle="rgba(102, 224, 170, 0.08)",a.fillRect(l.x*s,l.y*s,l.w*s,l.h*s)}if(t.showGrid)for(let n=0;n<t.rows;n+=1)for(let c=0;c<t.cols;c+=1){const l=N(c,n);at(n)?(a.strokeStyle="rgba(102, 224, 170, 0.55)",a.lineWidth=1.5):(a.strokeStyle="rgba(154, 170, 189, 0.45)",a.lineWidth=1),a.strokeRect(l.x*s,l.y*s,l.w*s,l.h*s),a.fillStyle="rgba(154, 170, 189, 0.7)",a.font=`${Math.max(9,11*s)}px monospace`,a.fillText(`${n},${c}`,l.x*s+2,l.y*s+Math.max(10,12*s))}if(t.selectedFrame&&t.image){const n=document.getElementById("frame-preview-canvas");if(n){const[c,l]=t.selectedFrame.split(",").map(Number),u=O(c,l),p=t.frameBounds[u];if(p){const f=N(l,c),y=Math.max(1,p.w),b=Math.max(1,p.h);n.width=y,n.height=b;const d=n.getContext("2d");d&&(d.imageSmoothingEnabled=!1,d.drawImage(t.image,f.x+p.x,f.y+p.y,y,b,0,0,y,b))}}}t.expandedAnim&&t.image&&ea(),t.image&&ta()}}function ea(){const e=t.image;!e||!t.expandedAnim||!t.animations.find(i=>i.id===t.expandedAnim)||document.querySelectorAll(".thumb-canvas").forEach(i=>{const o=i.dataset.frc;if(!o)return;const[s,n]=o.split(",").map(Number),c=48;i.width=c,i.height=c;const l=i.getContext("2d");if(!l)return;l.imageSmoothingEnabled=!1,l.clearRect(0,0,c,c);const u=N(n,s),p=O(s,n),f=t.frameBounds[p];let y,b,d,h;f?(y=u.x+f.x,b=u.y+f.y,d=f.w,h=f.h):(y=u.x,b=u.y,d=u.w,h=u.h);const $=Math.min(c/d,c/h),w=d*$,X=h*$,P=(c-w)/2,q=(c-X)/2;l.drawImage(e,y,b,d,h,P,q,w,X)})}function ta(){const e=t.image;e&&document.querySelectorAll(".batch-thumb").forEach(a=>{const i=a.dataset.frc;if(!i)return;const[o,s]=i.split(",").map(Number),n=36;a.width=n,a.height=n;const c=a.getContext("2d");if(!c)return;c.imageSmoothingEnabled=!1,c.clearRect(0,0,n,n);const l=N(s,o),u=t.frameBounds[O(o,s)];let p=l.x,f=l.y,y=l.w,b=l.h;u&&(p=l.x+u.x,f=l.y+u.y,y=u.w,b=u.h);const d=Math.min(n/y,n/b),h=y*d,$=b*d,w=t.frameOverrides[O(o,s)],X=w!=null&&w.shiftX?w.shiftX*d:0,P=w!=null&&w.shiftY?w.shiftY*d:0;c.drawImage(e,p,f,y,b,(n-h)/2+X,(n-$)/2+P,h,$),c.strokeStyle=t.focusedFrame===i?"rgba(102,224,170,0.8)":"rgba(255,255,255,0.05)",c.lineWidth=1,c.strokeRect(.5,.5,n-1,n-1)})}function aa(e){if(!_)return;const a=_.getContext("2d");if(!a||(a.imageSmoothingEnabled=!1,a.clearRect(0,0,_.width,_.height),!t.image))return;const i=K();if(!i)return;const o=(e-Se)/1e3;Se=e,t.animPaused||(qe+=o*t.animSpeed);const s=sa(i,qe);st(a,s,i.row,0,0,t.outputW,t.outputH)}function sa(e,a){const i=ke(Math.floor(e.from),0,t.cols-1),o=ke(Math.floor(e.to),0,t.cols-1),s=Math.min(i,o),n=Math.max(i,o),c=[];for(let u=s;u<=n;u+=1)c.push(u);e.pingpong&&c.length>2&&c.push(...c.slice(1,-1).reverse());const l=Math.floor(a*Math.max(.1,e.fps))%Math.max(1,c.length);return c[l]??s}function at(e){const a=t.animations.find(i=>i.row===e&&i.customFrame);return!a||a.animOffsetX==null?null:{ox:a.animOffsetX??t.offsetX,oy:a.animOffsetY??t.offsetY,gx:a.animGapX??t.gapX,gy:a.animGapY??t.gapY,fw:a.animFrameW??Math.round(t.frameW),fh:a.animFrameH??Math.round(t.frameH)}}function N(e,a){const i=at(a);return i?{x:i.ox+e*(i.fw+i.gx),y:i.oy,w:i.fw,h:i.fh}:{x:t.offsetX+e*(t.frameW+t.gapX),y:t.offsetY+a*(t.frameH+t.gapY),w:t.frameW,h:t.frameH}}function st(e,a,i,o,s,n,c){if(!t.image)return;const l=N(ke(a,0,t.cols-1),ke(i,0,t.rows-1)),u=O(i,a),p=t.frameBounds[u],f=t.frameOverrides[u];let y,b,d,h;if(p)y=l.x+p.x,b=l.y+p.y,d=p.w,h=p.h;else if(t.trimAlpha){const W=Te(l);W?(y=l.x+W.x,b=l.y+W.y,d=W.w,h=W.h):(y=l.x,b=l.y,d=l.w,h=l.h)}else y=l.x,b=l.y,d=l.w,h=l.h;const $=Math.max(1,n-t.padding*2),w=Math.max(1,c-t.padding*2),X=((f==null?void 0:f.scalePct)??t.scalePct)/100,P=Math.min($/d,w/h)*X,q=d*P,B=h*P,j=(f==null?void 0:f.shiftX)??0,se=(f==null?void 0:f.shiftY)??0,J=o+(n-q)/2+t.shiftX+j,I=s+c-t.padding-B+t.shiftY+se;if(t.spriteFaces==="right"){const W=o+n/2;e.save(),e.translate(W,0),e.scale(-1,1),e.drawImage(t.image,y,b,d,h,-(J-W+q),I,q,B),e.restore()}else e.drawImage(t.image,y,b,d,h,J,I,q,B)}function Te(e){if(!t.image)return null;const a=document.createElement("canvas");a.width=Math.max(1,Math.floor(e.w)),a.height=Math.max(1,Math.floor(e.h));const i=a.getContext("2d",{willReadFrequently:!0});if(!i)return null;i.drawImage(t.image,e.x,e.y,e.w,e.h,0,0,a.width,a.height);const o=i.getImageData(0,0,a.width,a.height).data;let s=a.width,n=a.height,c=-1,l=-1;for(let u=0;u<a.height;u+=1)for(let p=0;p<a.width;p+=1)o[(u*a.width+p)*4+3]>8&&(s=Math.min(s,p),n=Math.min(n,u),c=Math.max(c,p),l=Math.max(l,u));return c<s||l<n?null:{x:s,y:n,w:c-s+1,h:l-n+1}}function ia(){const e=document.createElement("canvas");e.width=Math.max(1,Math.floor(t.outputW*t.cols)),e.height=Math.max(1,Math.floor(t.outputH*t.rows));const a=e.getContext("2d");if(!a)return e;a.imageSmoothingEnabled=!1;for(let i=0;i<t.rows;i+=1)for(let o=0;o<t.cols;o+=1)st(a,o,i,o*t.outputW,i*t.outputH,t.outputW,t.outputH);return e}async function oa(){var o;if(!t.image)return;const e=ia(),a=t.imageName.replace(/\.png$/i,""),i=await((o=k.editorSpritesSavePng)==null?void 0:o.call(k,e.toDataURL("image/png"),`${a}_adapted.png`));t.status=i?`PNG exportado: ${i.path}`:"Exportação cancelada.",M()}async function na(){var o;const e=JSON.stringify(la(),null,2),a=t.imageName.replace(/\.png$/i,"")||"pet-sheet",i=await((o=k.editorSpritesSaveProfile)==null?void 0:o.call(k,e,`${a}_profile.json`));t.status=i?`Perfil salvo: ${i.path}`:"Salvamento cancelado.",M()}function He(){const e={type:t.spriteType,cols:t.cols,rows:t.rows,frameW:Math.round(t.frameW),frameH:Math.round(t.frameH),animations:t.animations.map(a=>({id:a.id,name:a.name,row:a.row,from:a.from,to:a.to,fps:a.fps,pingpong:a.pingpong}))};return t.spriteType!=="pet-grid"&&(e.faces=t.spriteFaces),e}let ge;function ee(){!t.previewActive||!t.image||(ge&&window.clearTimeout(ge),ge=window.setTimeout(async()=>{var a;const e=JSON.stringify(He());await((a=k.editorSpritesPreview)==null?void 0:a.call(k,t.dataUrl,e))},300))}async function ra(){var e,a;if(t.image){if(t.previewActive)await((e=k.editorSpritesStopPreview)==null?void 0:e.call(k)),t.previewActive=!1,ge&&window.clearTimeout(ge),t.status="Preview desativado.";else{const i=JSON.stringify(He());await((a=k.editorSpritesPreview)==null?void 0:a.call(k,t.dataUrl,i)),t.previewActive=!0,t.status="Preview ativo no jogo! Ajuste os parâmetros e veja ao vivo."}M()}}async function ca(){var o;if(!t.image)return;const e=JSON.stringify(He(),null,2),a=t.imageName.replace(/\.png$/i,"")||"pet-sheet",i=await((o=k.editorSpritesSaveGameConfig)==null?void 0:o.call(k,e,a));t.status=i?`Config salvo: ${i.path}`:"Salvamento cancelado.",M()}async function _e(){var i;const e=await((i=k.editorSpritesOpenProfile)==null?void 0:i.call(k));if(!e)return;const a=JSON.parse(e.json);Object.assign(t,a),t.image=null,t.expandedAnim=a.expandedAnim??null,a.dataUrl&&await ze(a.dataUrl,a.imageName??"sheet.png",a.imagePath??""),Ae(),t.status=`Perfil carregado: ${e.path}`,M()}function la(){const{image:e,status:a,dragStart:i,sheetScrollLeft:o,sheetScrollTop:s,...n}=t;return n}function da(){const e=`anim_${Date.now().toString(36)}`;t.animations.push({id:e,name:"Nova",row:0,from:0,to:Math.min(3,t.cols-1),fps:4,pingpong:!1}),t.currentAnim=e,M()}function K(){return t.animations.find(e=>e.id===t.currentAnim)??t.animations[0]}function it(e){aa(e),We=requestAnimationFrame(it)}M();kt(()=>t.mode==="compose");cancelAnimationFrame(We);We=requestAnimationFrame(it);
