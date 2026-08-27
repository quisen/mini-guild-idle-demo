import{s as It,i as Rt}from"./i18n-DQ-Uciz4.js";const d={sources:[],layers:[],activeLayer:null,tool:"move",brushSize:16,tolerance:32,canvasW:512,canvasH:512,zoom:1,showGrid:!0,gridSize:128,snap:!1,status:"Abra uma ou mais imagens e extraia pedaços para compor.",extract:null,layerCounter:0};let Ye,A,N=null,Z=null,Se=!1,q=null,je=!1;const Me=new Map,Ie=[],Bt=15;function Pe(e){const t=document.createElement("canvas");return t.width=e.width,t.height=e.height,t.getContext("2d").drawImage(e,0,0),t}function U(){Ie.push({layers:d.layers.map(e=>({...e,canvas:Pe(e.canvas)})),activeLayer:d.activeLayer}),Ie.length>Bt&&Ie.shift()}function yt(){const e=Ie.pop();if(!e){d.status="Nada para desfazer.",F();return}d.layers=e.layers,d.activeLayer=e.activeLayer,d.status="Desfeito.",F()}function be(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function se(e,t,i){return Math.max(t,Math.min(i,e))}function V(){return d.layers.find(e=>e.id===d.activeLayer)??null}function et(e){return d.layerCounter+=1,`${e}_${d.layerCounter}`}function ze(e,t,i){let n=(t-e.x)/e.scale;const s=(i-e.y)/e.scale;return e.flipX&&(n=e.canvas.width-n),{x:n,y:s}}function Wt(e,t,i){const n=ze(e,t,i),s=Math.floor(n.x),o=Math.floor(n.y);return s<0||o<0||s>=e.canvas.width||o>=e.canvas.height?0:e.canvas.getContext("2d",{willReadFrequently:!0}).getImageData(s,o,1,1).data[3]}function ct(e,t){for(let i=d.layers.length-1;i>=0;i-=1){const n=d.layers[i];if(n.visible&&Wt(n,e,t)>8)return n}return null}function wt(e){const i=e.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,e.width,e.height).data;let n=e.width,s=e.height,o=-1,l=-1;for(let f=0;f<e.height;f+=1)for(let g=0;g<e.width;g+=1)i[(f*e.width+g)*4+3]>8&&(g<n&&(n=g),f<s&&(s=f),g>o&&(o=g),f>l&&(l=f));if(o<n)return e;const c=document.createElement("canvas");return c.width=o-n+1,c.height=l-s+1,c.getContext("2d").drawImage(e,-n,-s),c}function Lt(e,t){Ye=t,A=e,F()}function F(){A.innerHTML=`
    <div class="comp-shell">
      <section class="comp-main">
        <div class="card comp-toolbar">
          ${Ht()}
          ${Ot()}
        </div>
        <div class="card canvas-wrap comp-canvas-wrap">
          <canvas id="comp-canvas"></canvas>
        </div>
        <div class="card comp-statusbar">
          <span class="dim">${be(d.status)}</span>
          <span class="dim comp-hints">arraste: mover &#183; Del: excluir camada &#183; Ctrl+Z: desfazer &#183; setas: nudge &#183; [ ]: pincel &#183; roda: zoom</span>
        </div>
      </section>
      <aside class="side">
        <div class="side-panel">
          ${Nt()}
          ${Dt()}
          ${Gt()}
          ${jt()}
          ${Ut()}
        </div>
      </aside>
    </div>
    ${d.extract?_t():""}
  `,N=A.querySelector("#comp-canvas"),ea(),_(),Vt(),xt(),d.extract&&he()}function Ht(){return`<div class="comp-tools">${[{id:"move",icon:"&#x270B;",label:"Mover",key:"V"},{id:"erase",icon:"&#x2716;",label:"Borracha",key:"E"},{id:"restore",icon:"&#x21BA;",label:"Restaurar",key:"R"},{id:"wand",icon:"&#x2728;",label:"Varinha",key:"W"},{id:"rect-erase",icon:"&#x25A8;",label:"Apagar &#225;rea",key:"X"}].map(t=>`<button class="comp-tool ${d.tool===t.id?"active":""}" data-tool="${t.id}" title="${t.label} (${t.key})">${t.icon} ${t.label}</button>`).join("")}</div>`}function Ot(){const e=[];return(d.tool==="erase"||d.tool==="restore")&&e.push(`
      <label class="comp-opt">Pincel <input id="comp-brush" type="range" min="2" max="96" value="${d.brushSize}"> <span class="badge">${d.brushSize}px</span></label>
    `),d.tool==="wand"&&e.push(`
      <label class="comp-opt">Tolerância <input id="comp-tol" type="range" min="1" max="128" value="${d.tolerance}"> <span class="badge">${d.tolerance}</span></label>
      <span class="dim hint">Clique numa cor para apagar a região contígua.</span>
    `),d.tool==="move"&&e.push(`<label class="check"><input id="comp-snap" type="checkbox" ${d.snap?"checked":""}> Encaixar na grade</label>`),e.push(`
    <span class="comp-spacer"></span>
    <label class="check"><input id="comp-showgrid" type="checkbox" ${d.showGrid?"checked":""}> Grade</label>
    <label class="comp-opt">Célula <input id="comp-gridsize" type="number" value="${d.gridSize}" style="width:56px"></label>
    <button id="comp-undo" class="compact" title="Ctrl+Z">&#x21B6; Desfazer</button>
  `),`<div class="comp-tool-opts">${e.join("")}</div>`}function Nt(){return`
    <div class="card">
      <div class="group-title"><span>Tela</span><span>${d.canvasW}&#215;${d.canvasH}</span></div>
      <div class="grid-3" style="margin-top:6px">
        <div class="field"><label>Largura</label><input id="comp-w" type="number" value="${d.canvasW}"></div>
        <div class="field"><label>Altura</label><input id="comp-h" type="number" value="${d.canvasH}"></div>
        <div class="field"><label>Zoom</label><input id="comp-zoom" type="number" step="0.25" value="${d.zoom}"></div>
      </div>
    </div>
  `}function Dt(){const e=d.sources.map(t=>`
      <div class="comp-source" data-src="${t.id}" title="${be(t.name)}">
        <canvas class="comp-source-thumb" data-src-thumb="${t.id}"></canvas>
        <div class="comp-source-meta">
          <span class="comp-source-name">${be(t.name)}</span>
          <span class="dim hint">${t.image.naturalWidth}&#215;${t.image.naturalHeight}</span>
        </div>
        <div class="comp-source-actions">
          <button data-src-extract="${t.id}" class="compact primary" title="Extrair pedaço">&#x2702;</button>
          <button data-src-del="${t.id}" class="compact danger" title="Remover fonte">&#x2715;</button>
        </div>
      </div>`).join("");return`
    <div class="card">
      <div class="anim-section-head">
        <span class="group-title">Fontes (${d.sources.length})</span>
        <button id="comp-open-src" class="primary compact">+ Abrir PNG</button>
      </div>
      <div id="comp-src-drop" class="comp-src-drop ${d.sources.length===0?"empty":""}">
        ${e||'<div class="dim hint" style="text-align:center;padding:12px 4px">Arraste PNGs aqui ou clique em Abrir.<br>Cada imagem vira uma fonte para extrair pedaços.</div>'}
      </div>
    </div>
  `}function Gt(){const e=[...d.layers].reverse().map(t=>`
      <div class="comp-layer ${t.id===d.activeLayer?"active":""}" data-layer="${t.id}">
        <button data-layer-vis="${t.id}" class="comp-layer-vis" title="Visível">${t.visible?"&#x1F441;":"&#x2716;"}</button>
        <canvas class="comp-layer-thumb" data-layer-thumb="${t.id}"></canvas>
        <span class="comp-layer-name">${be(t.name)}</span>
        <div class="comp-layer-actions">
          <button data-layer-up="${t.id}" title="Subir">&#x25B2;</button>
          <button data-layer-down="${t.id}" title="Descer">&#x25BC;</button>
          <button data-layer-dup="${t.id}" title="Duplicar">&#x29C9;</button>
          <button data-layer-del="${t.id}" class="danger" title="Excluir">&#x2715;</button>
        </div>
      </div>`).join("");return`
    <div class="card">
      <div class="group-title"><span>Camadas (${d.layers.length})</span></div>
      <div class="comp-layers">${e||'<div class="dim hint" style="padding:8px 2px">Nenhuma camada. Extraia um pedaço de uma fonte.</div>'}</div>
    </div>
  `}function jt(){const e=V();return e?`
    <div class="card">
      <div class="group-title"><span>Camada: ${be(e.name)}</span><span>${e.canvas.width}&#215;${e.canvas.height}</span></div>
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
      <div class="dim hint" style="margin-top:6px">Varinha/borracha atuam nesta camada. "Auto-remover fundo" usa a cor dos cantos com a tolerância atual (${d.tolerance}).</div>
    </div>
  `:""}function Ut(){return`
    <div class="card">
      <div class="group-title"><span>Exportar</span></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
        <button id="comp-export" class="primary" ${d.layers.length===0?"disabled":""}>&#x1F4E6; Salvar PNG</button>
        <button id="comp-to-slicer" class="compact" ${d.layers.length===0?"disabled":""}>&#x2702; Enviar p/ Fatiar</button>
      </div>
      <div class="dim hint" style="margin-top:6px">"Enviar p/ Fatiar" achata a composição e abre no modo de grade/animações.</div>
    </div>
  `}function _t(){const e=d.extract,t=d.sources.find(n=>n.id===e.sourceId);if(!t)return"";const i=e.sel;return`
    <div class="comp-overlay" id="comp-extract-overlay">
      <div class="comp-overlay-panel">
        <div class="comp-overlay-head">
          <b>Extrair de: ${be(t.name)}</b>
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
  `}function _(){if(!N)return;const e=N.getContext("2d"),t=d.zoom;N.width=Math.max(1,Math.ceil(d.canvasW*t)),N.height=Math.max(1,Math.ceil(d.canvasH*t)),e.imageSmoothingEnabled=!1,e.clearRect(0,0,N.width,N.height);for(const n of d.layers)n.visible&&(e.save(),e.translate(n.x*t,n.y*t),e.scale(n.scale*t*(n.flipX?-1:1),n.scale*t),n.flipX&&e.translate(-n.canvas.width,0),e.drawImage(n.canvas,0,0),e.restore());if(d.showGrid&&d.gridSize>1){e.strokeStyle="rgba(154, 170, 189, 0.3)",e.lineWidth=1;for(let n=0;n<=d.canvasW;n+=d.gridSize)e.beginPath(),e.moveTo(n*t+.5,0),e.lineTo(n*t+.5,d.canvasH*t),e.stroke();for(let n=0;n<=d.canvasH;n+=d.gridSize)e.beginPath(),e.moveTo(0,n*t+.5),e.lineTo(d.canvasW*t,n*t+.5),e.stroke()}const i=V();if(i&&i.visible){const n=i.canvas.width*i.scale*t,s=i.canvas.height*i.scale*t;e.strokeStyle="rgba(102, 224, 170, 0.85)",e.lineWidth=1.5,e.setLineDash([5,4]),e.strokeRect(i.x*t,i.y*t,n,s),e.setLineDash([])}if(q){const n=Math.min(q.x0,q.x1)*t,s=Math.min(q.y0,q.y1)*t,o=Math.abs(q.x1-q.x0)*t,l=Math.abs(q.y1-q.y0)*t;e.fillStyle="rgba(255, 107, 107, 0.18)",e.fillRect(n,s,o,l),e.strokeStyle="rgba(255, 107, 107, 0.8)",e.strokeRect(n,s,o,l)}}function Vt(){A.querySelectorAll("[data-src-thumb]").forEach(e=>{const t=d.sources.find(c=>c.id===e.dataset.srcThumb);if(!t)return;const i=44;e.width=i,e.height=i;const n=e.getContext("2d");n.imageSmoothingEnabled=!1;const s=Math.min(i/t.image.naturalWidth,i/t.image.naturalHeight),o=t.image.naturalWidth*s,l=t.image.naturalHeight*s;n.drawImage(t.image,(i-o)/2,(i-l)/2,o,l)})}function xt(){A.querySelectorAll("[data-layer-thumb]").forEach(e=>{const t=d.layers.find(c=>c.id===e.dataset.layerThumb);if(!t)return;const i=34;e.width=i,e.height=i;const n=e.getContext("2d");n.imageSmoothingEnabled=!1;const s=Math.min(i/t.canvas.width,i/t.canvas.height),o=t.canvas.width*s,l=t.canvas.height*s;n.drawImage(t.canvas,(i-o)/2,(i-l)/2,o,l)})}function he(){const e=d.extract;if(!e)return;const t=d.sources.find(o=>o.id===e.sourceId),i=A.querySelector("#ext-canvas");if(!t||!i)return;const n=e.zoom;i.width=Math.ceil(t.image.naturalWidth*n),i.height=Math.ceil(t.image.naturalHeight*n);const s=i.getContext("2d");if(s.imageSmoothingEnabled=!1,s.clearRect(0,0,i.width,i.height),s.drawImage(t.image,0,0,i.width,i.height),e.showGrid&&e.gridCols>0&&e.gridRows>0){const o=t.image.naturalWidth/e.gridCols,l=t.image.naturalHeight/e.gridRows;s.strokeStyle="rgba(240, 184, 90, 0.5)",s.lineWidth=1;for(let c=0;c<=e.gridCols;c+=1)s.beginPath(),s.moveTo(c*o*n+.5,0),s.lineTo(c*o*n+.5,i.height),s.stroke();for(let c=0;c<=e.gridRows;c+=1)s.beginPath(),s.moveTo(0,c*l*n+.5),s.lineTo(i.width,c*l*n+.5),s.stroke()}e.sel&&(s.fillStyle="rgba(102, 224, 170, 0.15)",s.fillRect(e.sel.x*n,e.sel.y*n,e.sel.w*n,e.sel.h*n),s.strokeStyle="rgba(102, 224, 170, 0.9)",s.lineWidth=1.5,s.strokeRect(e.sel.x*n,e.sel.y*n,e.sel.w*n,e.sel.h*n))}function dt(e,t,i,n){const s=ze(e,t,i),o=d.brushSize/2/e.scale,l=e.canvas.getContext("2d");if(n){const c=Me.get(e.id);if(!c)return;l.save(),l.beginPath(),l.arc(s.x,s.y,o,0,Math.PI*2),l.clip(),l.clearRect(s.x-o,s.y-o,o*2,o*2),l.drawImage(c,0,0),l.restore()}else l.save(),l.globalCompositeOperation="destination-out",l.beginPath(),l.arc(s.x,s.y,o,0,Math.PI*2),l.fill(),l.restore()}function Kt(e,t,i,n,s){const o=ze(e,Math.min(t,n),Math.min(i,s)),l=ze(e,Math.max(t,n),Math.max(i,s)),c=Math.min(o.x,l.x),f=Math.min(o.y,l.y),g=Math.abs(l.x-o.x),h=Math.abs(l.y-o.y);e.canvas.getContext("2d").clearRect(c,f,g,h)}function Jt(e,t,i){const n=ze(e,t,i),s=Math.floor(n.x),o=Math.floor(n.y),l=e.canvas.width,c=e.canvas.height;if(s<0||o<0||s>=l||o>=c)return 0;const f=e.canvas.getContext("2d",{willReadFrequently:!0}),g=f.getImageData(0,0,l,c),h=g.data,w=(o*l+s)*4,x=h[w],m=h[w+1],v=h[w+2],r=h[w+3],$=d.tolerance,C=new Uint8Array(l*c),X=[o*l+s];let I=0;for(;X.length;){const B=X.pop();if(C[B])continue;C[B]=1;const J=B*4,de=h[J]-x,ie=h[J+1]-m,W=h[J+2]-v,H=h[J+3]-r;if(Math.sqrt(de*de+ie*ie+W*W+H*H)>$)continue;h[J+3]=0,I+=1;const xe=B%l,$e=B/l|0;xe>0&&X.push(B-1),xe<l-1&&X.push(B+1),$e>0&&X.push(B-l),$e<c-1&&X.push(B+l)}return f.putImageData(g,0,0),I}function Zt(e){const t=e.canvas.width,i=e.canvas.height,n=e.canvas.getContext("2d",{willReadFrequently:!0}),s=n.getImageData(0,0,t,i),o=s.data,l=[0,(t-1)*4,(i-1)*t*4,((i-1)*t+t-1)*4],c=[];for(const h of l){if(o[h+3]<8)continue;const w=[o[h],o[h+1],o[h+2]];c.some(x=>Math.abs(x[0]-w[0])+Math.abs(x[1]-w[1])+Math.abs(x[2]-w[2])<12)||c.push(w)}if(c.length===0)return 0;const f=d.tolerance;let g=0;for(let h=0;h<o.length;h+=4)if(!(o[h+3]<8))for(const w of c){const x=o[h]-w[0],m=o[h+1]-w[1],v=o[h+2]-w[2];if(Math.sqrt(x*x+m*m+v*v)<=f){o[h+3]=0,g+=1;break}}return n.putImageData(s,0,0),g}function mt(){const e=document.createElement("canvas");e.width=d.canvasW,e.height=d.canvasH;const t=e.getContext("2d");t.imageSmoothingEnabled=!1;for(const i of d.layers)i.visible&&(t.save(),t.translate(i.x,i.y),t.scale(i.scale*(i.flipX?-1:1),i.scale),i.flipX&&t.translate(-i.canvas.width,0),t.drawImage(i.canvas,0,0),t.restore());return e}async function ut(e,t){const i=new Image;await new Promise((n,s)=>{i.onload=()=>n(),i.onerror=()=>s(new Error("Falha ao carregar PNG")),i.src=e}),d.sources.push({id:et("src"),name:t,image:i}),d.status=`Fonte adicionada: ${t}`,F()}function Qt(e,t,i){let n=document.createElement("canvas");n.width=Math.max(1,Math.round(t.w)),n.height=Math.max(1,Math.round(t.h));const s=n.getContext("2d");s.imageSmoothingEnabled=!1,s.drawImage(e.image,t.x,t.y,t.w,t.h,0,0,n.width,n.height),i&&(n=wt(n)),U();const o={id:et("layer"),name:`${e.name.replace(/\.png$/i,"")} [${Math.round(t.x)},${Math.round(t.y)}]`,canvas:n,x:Math.max(0,Math.round((d.canvasW-n.width)/2)),y:Math.max(0,Math.round((d.canvasH-n.height)/2)),scale:1,flipX:!1,visible:!0};Me.set(o.id,Pe(n)),d.layers.push(o),d.activeLayer=o.id,d.status=`Camada criada (${n.width}×${n.height}).`}function ea(){A.querySelectorAll("[data-tool]").forEach(m=>{m.onclick=()=>{d.tool=m.dataset.tool,F()}});const e=A.querySelector("#comp-brush");e&&(e.oninput=()=>{var v;d.brushSize=Number(e.value);const m=(v=e.parentElement)==null?void 0:v.querySelector(".badge");m&&(m.textContent=`${d.brushSize}px`)});const t=A.querySelector("#comp-tol");t&&(t.oninput=()=>{var v;d.tolerance=Number(t.value);const m=(v=t.parentElement)==null?void 0:v.querySelector(".badge");m&&(m.textContent=String(d.tolerance))});const i=A.querySelector("#comp-snap");i&&(i.onchange=()=>{d.snap=i.checked});const n=A.querySelector("#comp-showgrid");n&&(n.onchange=()=>{d.showGrid=n.checked,_()});const s=A.querySelector("#comp-gridsize");s&&(s.oninput=()=>{d.gridSize=Math.max(1,Number(s.value)),_()});const o=A.querySelector("#comp-undo");o&&(o.onclick=yt);for(const[m,v]of[["comp-w","canvasW"],["comp-h","canvasH"],["comp-zoom","zoom"]]){const r=A.querySelector(`#${m}`);r&&(r.oninput=()=>{const $=Number(r.value);v==="zoom"?d.zoom=se($||1,.1,8):$>=16&&(d[v]=Math.floor($)),_()})}const l=A.querySelector("#comp-open-src");l&&(l.onclick=async()=>{const m=await Ye.openImage();m&&await ut(m.dataUrl,m.name)});const c=A.querySelector("#comp-src-drop");c&&(c.ondragover=m=>{m.preventDefault(),c.classList.add("dragover")},c.ondragleave=()=>c.classList.remove("dragover"),c.ondrop=m=>{var r;m.preventDefault(),c.classList.remove("dragover");const v=Array.from(((r=m.dataTransfer)==null?void 0:r.files)??[]);for(const $ of v){const C=new FileReader;C.onload=()=>{ut(C.result,$.name)},C.readAsDataURL($)}}),A.querySelectorAll("[data-src-extract]").forEach(m=>{m.onclick=()=>{const v=d.sources.find($=>$.id===m.dataset.srcExtract);if(!v)return;const r=se(680/Math.max(v.image.naturalWidth,v.image.naturalHeight),.1,2);d.extract={sourceId:v.id,zoom:Math.round(r*20)/20,sel:null,dragStart:null,gridCols:4,gridRows:4,showGrid:!1,trim:!0},F()}}),A.querySelectorAll("[data-src-del]").forEach(m=>{m.onclick=()=>{d.sources=d.sources.filter(v=>v.id!==m.dataset.srcDel),F()}}),A.querySelectorAll("[data-layer]").forEach(m=>{m.onclick=()=>{d.activeLayer=m.dataset.layer,F()}}),A.querySelectorAll("[data-layer-vis]").forEach(m=>{m.onclick=v=>{v.stopPropagation();const r=d.layers.find($=>$.id===m.dataset.layerVis);r&&(r.visible=!r.visible,F())}}),A.querySelectorAll("[data-layer-del]").forEach(m=>{m.onclick=v=>{var r;v.stopPropagation(),U(),d.layers=d.layers.filter($=>$.id!==m.dataset.layerDel),d.activeLayer===m.dataset.layerDel&&(d.activeLayer=((r=d.layers[d.layers.length-1])==null?void 0:r.id)??null),F()}}),A.querySelectorAll("[data-layer-dup]").forEach(m=>{m.onclick=v=>{v.stopPropagation();const r=d.layers.find(C=>C.id===m.dataset.layerDup);if(!r)return;U();const $={...r,id:et("layer"),name:`${r.name} (cópia)`,canvas:Pe(r.canvas),x:r.x+12,y:r.y+12};Me.set($.id,Pe(Me.get(r.id)??r.canvas)),d.layers.push($),d.activeLayer=$.id,F()}});for(const[m,v]of[["data-layer-up",1],["data-layer-down",-1]])A.querySelectorAll(`[${m}]`).forEach(r=>{r.onclick=$=>{$.stopPropagation();const C=r.getAttribute(m),X=d.layers.findIndex(B=>B.id===C),I=X+v;X<0||I<0||I>=d.layers.length||(U(),[d.layers[X],d.layers[I]]=[d.layers[I],d.layers[X]],F())}});A.querySelectorAll("[data-lprop]").forEach(m=>{m.oninput=()=>{const v=V();if(!v)return;const r=m.dataset.lprop,$=Number(m.value);r==="scale"?v.scale=se($||1,.05,16):v[r]=$,_()}});const f=A.querySelector("#comp-flip");f&&(f.onclick=()=>{const m=V();m&&(U(),m.flipX=!m.flipX,F())});const g=A.querySelector("#comp-trim-layer");g&&(g.onclick=()=>{const m=V();m&&(U(),m.canvas=wt(m.canvas),Me.set(m.id,Pe(m.canvas)),F())});const h=A.querySelector("#comp-rembg");h&&(h.onclick=()=>{const m=V();if(!m)return;U();const v=Zt(m);d.status=v>0?`${v} pixels de fundo removidos.`:"Nenhum fundo sólido detectado nos cantos (ajuste a tolerância).",F()});const w=A.querySelector("#comp-export");w&&(w.onclick=async()=>{const m=mt(),v=await Ye.savePng(m.toDataURL("image/png"),"composicao.png");d.status=v?`PNG salvo: ${v.path}`:"Exportação cancelada.",F()});const x=A.querySelector("#comp-to-slicer");x&&(x.onclick=()=>{const m=mt();Ye.sendToSlicer(m.toDataURL("image/png"),"composicao.png")}),ta(),aa()}function pt(e){const t=N.getBoundingClientRect();return{x:(e.clientX-t.left)/d.zoom,y:(e.clientY-t.top)/d.zoom}}function ta(){if(!N)return;N.onmousedown=t=>{const i=pt(t);if(d.tool==="move"){const n=ct(i.x,i.y)??V();if(!n)return;d.activeLayer=n.id,Z={id:n.id,startX:i.x,startY:i.y,origX:n.x,origY:n.y},U(),_()}else if(d.tool==="erase"||d.tool==="restore"){const n=V();if(!n){d.status="Selecione uma camada primeiro.",F();return}je||(U(),je=!0),Se=!0,dt(n,i.x,i.y,d.tool==="restore"),_()}else if(d.tool==="wand"){const n=V()??ct(i.x,i.y);if(!n){d.status="Nenhuma camada sob o cursor.",F();return}d.activeLayer=n.id,U();const s=Jt(n,i.x,i.y);d.status=s>0?`Varinha: ${s} pixels removidos.`:"Nada removido (fora da camada?).",F()}else d.tool==="rect-erase"&&(q={x0:i.x,y0:i.y,x1:i.x,y1:i.y});t.preventDefault()},N.onmousemove=t=>{const i=pt(t);if(Z){const n=d.layers.find(s=>s.id===Z.id);if(n){let s=Z.origX+(i.x-Z.startX),o=Z.origY+(i.y-Z.startY);d.snap&&d.gridSize>1&&(s=Math.round(s/d.gridSize)*d.gridSize,o=Math.round(o/d.gridSize)*d.gridSize),n.x=s,n.y=o,_()}}else if(Se){const n=V();n&&(dt(n,i.x,i.y,d.tool==="restore"),_())}else q&&(q.x1=i.x,q.y1=i.y,_())};const e=()=>{if(Z&&(Z=null,F()),Se&&(Se=!1,je=!1,xt()),q){const t=V();t&&(Math.abs(q.x1-q.x0)>1||Math.abs(q.y1-q.y0)>1)&&(U(),Kt(t,q.x0,q.y0,q.x1,q.y1),d.status="Área apagada."),q=null,F()}};N.onmouseup=e,N.onmouseleave=()=>{(Se||Z||q)&&e()},N.onwheel=t=>{t.preventDefault();const i=t.deltaY<0?1.15:1/1.15;d.zoom=se(Math.round(d.zoom*i*100)/100,.1,8);const n=A.querySelector("#comp-zoom");n&&(n.value=String(d.zoom)),_()}}function aa(){const e=d.extract;if(!e)return;const t=d.sources.find(x=>x.id===e.sourceId),i=A.querySelector("#ext-canvas");if(!t||!i)return;const n=A.querySelector("#ext-close");n&&(n.onclick=()=>{d.extract=null,F()});const s=A.querySelector("#ext-zoom");s&&(s.oninput=()=>{var m;e.zoom=Number(s.value);const x=(m=s.parentElement)==null?void 0:m.querySelector(".badge");x&&(x.textContent=`${e.zoom.toFixed(2)}x`),he()});const o=A.querySelector("#ext-showgrid");o&&(o.onchange=()=>{e.showGrid=o.checked,he()});for(const[x,m]of[["ext-cols","gridCols"],["ext-rows","gridRows"]]){const v=A.querySelector(`#${x}`);v&&(v.oninput=()=>{e[m]=Math.max(1,Math.floor(Number(v.value)||1)),he()})}const l=A.querySelector("#ext-trim");l&&(l.onchange=()=>{e.trim=l.checked});const c=A.querySelector("#ext-add");c&&(c.onclick=()=>{e.sel&&(Qt(t,e.sel,e.trim),d.extract=null,F())});const f=x=>{const m=i.getBoundingClientRect(),v=i.width/m.width,r=i.height/m.height;return{x:se((x.clientX-m.left)*v/e.zoom,0,t.image.naturalWidth),y:se((x.clientY-m.top)*r/e.zoom,0,t.image.naturalHeight)}},g=()=>{const x=A.querySelector("#ext-sel-hint");x&&(x.textContent=e.sel?`Seleção: ${Math.round(e.sel.w)}×${Math.round(e.sel.h)}`:"Arraste para selecionar, ou clique numa célula da grade.");const m=A.querySelector("#ext-add");m&&(m.disabled=!e.sel||e.sel.w<1||e.sel.h<1)},h=x=>{if(!e.dragStart)return;const m=f(x);e.sel={x:Math.min(e.dragStart.x,m.x),y:Math.min(e.dragStart.y,m.y),w:Math.abs(m.x-e.dragStart.x),h:Math.abs(m.y-e.dragStart.y)},he(),g()},w=x=>{if(window.removeEventListener("mousemove",h),window.removeEventListener("mouseup",w),!e.dragStart)return;const m=f(x),v=Math.abs(m.x-e.dragStart.x)>3||Math.abs(m.y-e.dragStart.y)>3;if(!v&&e.showGrid){const r=t.image.naturalWidth/e.gridCols,$=t.image.naturalHeight/e.gridRows,C=se(Math.floor(m.x/r),0,e.gridCols-1),X=se(Math.floor(m.y/$),0,e.gridRows-1);e.sel={x:C*r,y:X*$,w:r,h:$}}else v||(e.sel=null);e.dragStart=null,he(),g()};i.onmousedown=x=>{e.dragStart=f(x),window.addEventListener("mousemove",h),window.addEventListener("mouseup",w),x.preventDefault()}}let ft=!1;function ia(e){ft||(ft=!0,window.addEventListener("keydown",t=>{var f;if(!e())return;const i=t.target;if(i&&(i.tagName==="INPUT"||i.tagName==="TEXTAREA"))return;if((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"){t.preventDefault(),yt();return}const s={v:"move",e:"erase",r:"restore",w:"wand",x:"rect-erase"}[t.key.toLowerCase()];if(s&&!t.ctrlKey&&!t.metaKey){d.tool=s,F();return}if(t.key==="["||t.key==="]"){d.brushSize=se(d.brushSize+(t.key==="]"?4:-4),2,96),F();return}const o=V();if(!o)return;const l=t.shiftKey?10:1;let c=!0;switch(t.key){case"ArrowLeft":o.x-=l;break;case"ArrowRight":o.x+=l;break;case"ArrowUp":o.y-=l;break;case"ArrowDown":o.y+=l;break;case"Delete":case"Backspace":U(),d.layers=d.layers.filter(g=>g.id!==o.id),d.activeLayer=((f=d.layers[d.layers.length-1])==null?void 0:f.id)??null,F();return;default:c=!1}c&&(t.preventDefault(),_())}))}const R=320,oe=6,re=286,u={parts:[],selected:null,frame:0,fps:8,playing:!1,onion:!0,showGuides:!0,status:"Importe PNGs transparentes das partes do personagem.",counter:0};let z,ye,tt,$t=0,Ve=0,me=null,Ce=!1;const St=()=>({x:160,y:re,rotation:0,scaleX:1,scaleY:1}),Oe=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t]),Q=()=>u.parts.find(e=>e.id===u.selected)??null;function Re(e){return{...e}}function Ne(e){return new Promise((t,i)=>{const n=new Image;n.onload=()=>t(n),n.onerror=()=>i(new Error("PNG inválido")),n.src=e})}function sa(e,t){cancelAnimationFrame($t),z=e,ye=t,Y();const i=new URLSearchParams(location.search).get("rigExample");!Ce&&i==="1"?(Ce=!0,kt()):!Ce&&i==="detailed"&&(Ce=!0,At().catch(n=>{u.status=String(n),Y()}))}function Y(){const e=Q();z.innerHTML=`
    <div class="rig-shell">
      <section class="rig-workspace">
        <div class="card rig-toolbar">
          <button id="rig-add" class="primary">+ Importar parte</button>
          <button id="rig-example">Carregar exemplo</button>
          <button id="rig-detailed" class="primary">Exemplo detalhado</button>
          <button id="rig-open">Abrir projeto</button>
          <button id="rig-save" ${u.parts.length?"":"disabled"}>Salvar projeto</button>
          <span class="rig-spacer"></span>
          <label class="check"><input id="rig-onion" type="checkbox" ${u.onion?"checked":""}> Onion skin</label>
          <label class="check"><input id="rig-guides" type="checkbox" ${u.showGuides?"checked":""}> Guias</label>
        </div>
        <div class="card rig-stage-wrap"><canvas id="rig-canvas" width="320" height="320"></canvas></div>
        <div class="card rig-timeline">
          <button id="rig-play">${u.playing?"&#9646;&#9646;":"&#9654;"}</button>
          ${Array.from({length:oe},(t,i)=>`<button class="rig-frame ${i===u.frame?"active":""}" data-rig-frame="${i}">${i+1}</button>`).join("")}
          <label class="rig-inline">FPS <input id="rig-fps" type="number" min="1" max="30" value="${u.fps}"></label>
          <span class="rig-note">Canvas ${R}&#215;${R} · baseline y=${re}</span>
        </div>
        <div class="card rig-status">${Oe(u.status)}</div>
      </section>
      <aside class="side"><div class="side-panel">
        <div class="card">
          <div class="group-title"><span>Partes (${u.parts.length})</span><span>frente &#8593;</span></div>
          <div class="rig-parts">${na()}</div>
        </div>
        ${e?oa(e):'<div class="card dim hint">Selecione uma parte para editar pivô e transformação.</div>'}
        <div class="card">
          <div class="group-title">Exportação determinística</div>
          <div class="rig-checks" id="rig-checks"></div>
          <div class="rig-export-actions">
            <button id="rig-export-frame" ${u.parts.length?"":"disabled"}>Frame PNG</button>
            <button id="rig-export-sheet" class="primary" ${u.parts.length?"":"disabled"}>Sheet 1920&#215;320</button>
          </div>
        </div>
      </div></aside>
    </div>`,tt=z.querySelector("#rig-canvas"),ma(),ue(),Je(),u.playing&&Pt(performance.now())}function na(){return u.parts.length?[...u.parts].reverse().map((e,t)=>{const i=u.parts.length-1-t;return`<div class="rig-part ${e.id===u.selected?"active":""}" data-rig-part="${e.id}">
      <button data-rig-visible="${e.id}" title="Visibilidade">${e.visible?"&#128065;":"&#10005;"}</button>
      <span>${Oe(e.name)}</span>
      <button data-rig-up="${i}" title="Trazer à frente">&#9650;</button>
      <button data-rig-down="${i}" title="Enviar atrás">&#9660;</button>
      <button data-rig-delete="${e.id}" class="danger">&#10005;</button>
    </div>`}).join(""):'<div class="dim hint">Use uma imagem recortada por parte: perna, braço, tronco, arma etc.</div>'}function ke(e,t,i,n=1){return`<div class="field"><label>${e}</label><input data-rig-transform="${t}" type="number" step="${n}" value="${Number(i.toFixed(3))}"></div>`}function oa(e){const t=e.frames[u.frame];return`<div class="card">
    <div class="group-title"><span>${Oe(e.name)}</span><span>pose ${u.frame+1}</span></div>
    <div class="rig-inspector-title">Transformação do frame</div>
    <div class="grid-2">
      ${ke("X","x",t.x)}${ke("Y","y",t.y)}
      ${ke("Rotação °","rotation",t.rotation,.5)}
      ${ke("Escala X","scaleX",t.scaleX,.01)}
      ${ke("Escala Y","scaleY",t.scaleY,.01)}
    </div>
    <div class="rig-inspector-title">Pivô no bitmap</div>
    <div class="grid-2">
      <div class="field"><label>Pivô X</label><input id="rig-pivot-x" type="number" value="${e.pivotX}"></div>
      <div class="field"><label>Pivô Y</label><input id="rig-pivot-y" type="number" value="${e.pivotY}"></div>
    </div>
    <div class="rig-row-actions">
      <button id="rig-pivot-center">Pivô centro</button>
      <button id="rig-copy-prev" ${u.frame===0?"disabled":""}>Copiar anterior</button>
      <button id="rig-reset-pose">Restaurar base</button>
    </div>
    <div class="dim hint">Arraste no canvas para mover. O pivô é a articulação usada para rotacionar a parte.</div>
  </div>`}function Ke(e,t,i,n=1){if(!t.visible)return;const s=t.frames[i];e.save(),e.globalAlpha=n,e.translate(s.x,s.y),e.rotate(s.rotation*Math.PI/180),e.scale(s.scaleX,s.scaleY),e.imageSmoothingEnabled=!0,e.imageSmoothingQuality="high",e.drawImage(t.image,-t.pivotX,-t.pivotY),e.restore()}function ue(){const e=tt.getContext("2d");if(e.clearRect(0,0,R,R),u.onion&&u.frame>0&&u.parts.forEach(t=>Ke(e,t,u.frame-1,.16)),u.parts.forEach(t=>Ke(e,t,u.frame)),u.showGuides){e.save(),e.strokeStyle="rgba(102,224,170,.65)",e.setLineDash([5,4]),e.beginPath(),e.moveTo(0,re+.5),e.lineTo(R,re+.5),e.stroke(),e.strokeStyle="rgba(240,184,90,.35)",e.beginPath(),e.moveTo(160.5,0),e.lineTo(160.5,R),e.stroke();const t=Q();if(t){const i=t.frames[u.frame];e.setLineDash([]),e.fillStyle="#ff6b6b",e.beginPath(),e.arc(i.x,i.y,4,0,Math.PI*2),e.fill()}e.restore()}}function at(e,t=!1){const i=document.createElement("canvas");i.width=R,i.height=R;const n=i.getContext("2d");return u.parts.forEach(s=>Ke(n,s,e)),t&&n.fillRect(0,re,R,1),i}function it(e){const i=at(e).getContext("2d",{willReadFrequently:!0}).getImageData(0,0,R,R).data;let n=R,s=R,o=-1,l=-1,c=0;for(let g=0;g<R;g+=1)for(let h=0;h<R;h+=1)i[(g*R+h)*4+3]<8||(c+=1,n=Math.min(n,h),s=Math.min(s,g),o=Math.max(o,h),l=Math.max(l,g));const f=[];return c||f.push("vazio"),(n<4||s<4||o>R-5||l>R-5)&&f.push("gutter < 4 px"),l>re+1&&f.push(`passou da baseline (${l})`),l<re-8&&f.push(`não toca a baseline (${l})`),f}function Je(){const e=z.querySelector("#rig-checks");e&&(e.innerHTML=Array.from({length:oe},(t,i)=>{const n=it(i);return`<div class="rig-check ${n.length?"bad":"ok"}"><span>Frame ${i+1}</span><span>${n.length?Oe(n.join(" · ")):"OK"}</span></div>`}).join(""))}async function ra(){const e=await ye.openImage();if(!e)return;const t=await Ne(e.dataUrl),i=St();i.x=160,i.y=re;const n={id:`part_${++u.counter}`,name:e.name.replace(/\.png$/i,""),dataUrl:e.dataUrl,image:t,pivotX:t.naturalWidth/2,pivotY:t.naturalHeight,base:i,frames:Array.from({length:oe},()=>Re(i)),visible:!0};u.parts.push(n),u.selected=n.id,u.status=`${n.name} importada (${t.naturalWidth}×${t.naturalHeight}).`,Y()}async function fe(e,t,i,n,s,o){const l=document.createElement("canvas");l.width=t,l.height=i;const c=l.getContext("2d");c.lineJoin="round",c.lineCap="round",o(c);const f=l.toDataURL("image/png"),g=St();return{id:`part_${++u.counter}`,name:e,dataUrl:f,image:await Ne(f),pivotX:n,pivotY:s,base:g,frames:Array.from({length:oe},()=>Re(g)),visible:!0}}async function kt(){u.parts=[],u.counter=0,u.frame=0,u.playing=!1;const e="#b77a32",t="#e1ad58",i="#176b73",n="#202735",s="#5c3825",o="#cbd4da",l=await fe("perna-traseira",38,108,19,10,r=>{r.fillStyle=n,r.beginPath(),r.roundRect(8,4,24,76,9),r.fill(),r.fillStyle=e,r.beginPath(),r.roundRect(5,48,29,45,8),r.fill(),r.fillStyle=s,r.beginPath(),r.roundRect(4,84,32,20,7),r.fill(),r.fillStyle=t,r.fillRect(4,88,13,10)}),c=await fe("braço-escudo",94,104,71,14,r=>{r.strokeStyle=n,r.lineWidth=22,r.beginPath(),r.moveTo(72,12),r.lineTo(55,72),r.stroke(),r.fillStyle=e,r.beginPath(),r.arc(37,61,34,0,Math.PI*2),r.fill(),r.fillStyle=i,r.beginPath(),r.arc(37,61,25,0,Math.PI*2),r.fill(),r.fillStyle=t,r.beginPath(),r.moveTo(37,39),r.lineTo(43,55),r.lineTo(59,61),r.lineTo(43,67),r.lineTo(37,83),r.lineTo(31,67),r.lineTo(15,61),r.lineTo(31,55),r.closePath(),r.fill()}),f=await fe("perna-frontal",38,108,19,10,r=>{r.fillStyle="#293241",r.beginPath(),r.roundRect(7,4,25,76,9),r.fill(),r.fillStyle=t,r.beginPath(),r.roundRect(4,47,30,46,8),r.fill(),r.fillStyle=s,r.beginPath(),r.roundRect(3,84,33,20,7),r.fill(),r.fillStyle="#efc470",r.fillRect(3,88,13,10)}),g=await fe("tronco",86,100,43,90,r=>{r.fillStyle=i,r.beginPath(),r.moveTo(14,8),r.lineTo(72,8),r.lineTo(82,82),r.lineTo(43,96),r.lineTo(4,82),r.closePath(),r.fill(),r.fillStyle=e,r.beginPath(),r.moveTo(10,14),r.lineTo(43,2),r.lineTo(76,14),r.lineTo(67,56),r.lineTo(43,72),r.lineTo(19,56),r.closePath(),r.fill(),r.fillStyle=t,r.beginPath(),r.moveTo(43,13),r.lineTo(54,39),r.lineTo(43,56),r.lineTo(32,39),r.closePath(),r.fill(),r.fillStyle=s,r.fillRect(8,72,70,10)}),h=await fe("cabeça",58,66,29,58,r=>{r.fillStyle="#e2a77f",r.beginPath(),r.ellipse(29,34,20,25,0,0,Math.PI*2),r.fill(),r.fillStyle="#4a261d",r.beginPath(),r.arc(27,24,23,Math.PI,Math.PI*2.08),r.lineTo(48,43),r.lineTo(42,22),r.fill(),r.fillStyle=t,r.beginPath(),r.moveTo(17,18),r.lineTo(29,5),r.lineTo(41,18),r.lineTo(29,27),r.closePath(),r.fill(),r.fillStyle="#18323a",r.fillRect(10,56,38,8)}),w=await fe("braço-espada",112,126,26,16,r=>{r.strokeStyle="#293241",r.lineWidth=21,r.beginPath(),r.moveTo(26,14),r.lineTo(36,69),r.stroke(),r.fillStyle=e,r.beginPath(),r.roundRect(23,47,27,37,7),r.fill(),r.strokeStyle=s,r.lineWidth=9,r.beginPath(),r.moveTo(39,76),r.lineTo(53,91),r.stroke(),r.strokeStyle=t,r.lineWidth=8,r.beginPath(),r.moveTo(42,91),r.lineTo(63,75),r.stroke(),r.fillStyle=o,r.beginPath(),r.moveTo(58,82),r.lineTo(108,119),r.lineTo(67,71),r.closePath(),r.fill()});u.parts=[l,c,f,g,h,w];const x={"perna-traseira":[174,190],"braço-escudo":[181,136],"perna-frontal":[146,190],tronco:[160,190],cabeça:[160,111],"braço-espada":[137,136]},m=[-16,-7,4,16,7,-4],v=[16,7,-4,-16,-7,4];for(const r of u.parts){const[$,C]=x[r.name];r.base={x:$,y:C,rotation:0,scaleX:1,scaleY:1},r.frames=Array.from({length:oe},(X,I)=>({x:$,y:C+(I===2||I===5?2:0),rotation:r.name==="perna-frontal"?m[I]:r.name==="perna-traseira"?v[I]:r.name.includes("braço")?-m[I]*.55:0,scaleX:1,scaleY:1}))}u.selected=g.id,u.status="Exemplo Guardião carregado: seis poses feitas apenas com transformações do mesmo conjunto de pixels.",Y()}function la(){return JSON.stringify({format:"mini-guild-rig@1",canvas:{width:R,height:R,baseline:re},fps:u.fps,parts:u.parts.map(({image:e,...t})=>t)},null,2)}async function ca(){var i;const e=await ye.openProject();if(!e)return;const t=JSON.parse(e.json);if(t.format!=="mini-guild-rig@1"||!Array.isArray(t.parts))throw new Error("Projeto de rig incompatível.");u.parts=await Promise.all(t.parts.map(async n=>({...n,image:await Ne(n.dataUrl)}))),u.counter=u.parts.length,u.selected=((i=u.parts[0])==null?void 0:i.id)??null,u.fps=t.fps??8,u.frame=0,u.status=`Projeto aberto: ${e.path}`,Y()}async function At(){var i,n;const e=await fetch("/__rig-example/guardian-detailed");if(!e.ok)throw new Error(`Falha ao abrir exemplo detalhado (${e.status}).`);const t=await e.json();if(t.format!=="mini-guild-rig@1"||!Array.isArray(t.parts))throw new Error("Exemplo detalhado incompatível.");u.parts=await Promise.all(t.parts.map(async s=>({...s,image:await Ne(s.dataUrl)}))),u.counter=u.parts.length,u.selected=((i=u.parts.find(s=>s.name==="tronco"))==null?void 0:i.id)??((n=u.parts[0])==null?void 0:n.id)??null,u.fps=t.fps??8,u.frame=0,u.playing=!1,u.status="Guardião autoral detalhado carregado: oito recortes do mesmo master, seis poses determinísticas.",Y(),new URLSearchParams(location.search).get("rigExport")==="1"&&setTimeout(()=>void Mt(),250)}async function da(){const e=it(u.frame);if(e.length){u.status=`Exportação recusada: ${e.join(", ")}.`,Y();return}const t=await ye.savePng(at(u.frame).toDataURL("image/png"),`rig-frame-${u.frame+1}.png`);t&&(u.status=`Frame salvo em ${t.path}`,Y())}async function Mt(){if(Array.from({length:oe},(s,o)=>it(o)).some(s=>s.length)){u.status="Exportação recusada: corrija os frames marcados.",Y();return}const t=document.createElement("canvas");t.width=R*oe,t.height=R;const i=t.getContext("2d");for(let s=0;s<oe;s+=1)i.drawImage(at(s),s*R,0);const n=await ye.savePng(t.toDataURL("image/png"),"rig-walk-6x320.png");n&&(u.status=`Sheet determinística salva em ${n.path}`,Y())}function ma(){var i,n,s;z.querySelector("#rig-add").onclick=()=>void ra(),z.querySelector("#rig-example").onclick=()=>void kt(),z.querySelector("#rig-detailed").onclick=()=>void At().catch(o=>{u.status=String(o),Y()}),z.querySelector("#rig-open").onclick=()=>void ca().catch(o=>{u.status=String(o),Y()}),z.querySelector("#rig-save").onclick=()=>void ye.saveProject(la(),"character-rig.json").then(o=>{o&&(u.status=`Projeto salvo em ${o.path}`,Y())}),z.querySelector("#rig-export-frame").onclick=()=>void da(),z.querySelector("#rig-export-sheet").onclick=()=>void Mt(),z.querySelector("#rig-onion").onchange=o=>{u.onion=o.target.checked,ue()},z.querySelector("#rig-guides").onchange=o=>{u.showGuides=o.target.checked,ue()},z.querySelector("#rig-fps").onchange=o=>{u.fps=Math.max(1,Math.min(30,Number(o.target.value)))},z.querySelector("#rig-play").onclick=()=>{u.playing=!u.playing,Ve=performance.now(),Y()},z.querySelectorAll("[data-rig-frame]").forEach(o=>{o.onclick=()=>{u.frame=Number(o.dataset.rigFrame),u.playing=!1,Y()}}),z.querySelectorAll("[data-rig-part]").forEach(o=>{o.onclick=()=>{u.selected=o.dataset.rigPart,Y()}}),z.querySelectorAll("[data-rig-visible]").forEach(o=>{o.onclick=l=>{l.stopPropagation();const c=u.parts.find(f=>f.id===o.dataset.rigVisible);c&&(c.visible=!c.visible),Y()}}),z.querySelectorAll("[data-rig-delete]").forEach(o=>{o.onclick=l=>{var c;l.stopPropagation(),u.parts=u.parts.filter(f=>f.id!==o.dataset.rigDelete),u.selected=((c=u.parts.at(-1))==null?void 0:c.id)??null,Y()}}),z.querySelectorAll("[data-rig-up]").forEach(o=>{o.onclick=l=>{l.stopPropagation();const c=Number(o.dataset.rigUp);c<u.parts.length-1&&([u.parts[c],u.parts[c+1]]=[u.parts[c+1],u.parts[c]]),Y()}}),z.querySelectorAll("[data-rig-down]").forEach(o=>{o.onclick=l=>{l.stopPropagation();const c=Number(o.dataset.rigDown);c>0&&([u.parts[c],u.parts[c-1]]=[u.parts[c-1],u.parts[c]]),Y()}}),z.querySelectorAll("[data-rig-transform]").forEach(o=>{o.oninput=()=>{const l=Q();l&&(l.frames[u.frame][o.dataset.rigTransform]=Number(o.value),ue(),Je())}});const e=z.querySelector("#rig-pivot-x");e&&(e.oninput=()=>{const o=Q();o&&(o.pivotX=Number(e.value),ue())});const t=z.querySelector("#rig-pivot-y");t&&(t.oninput=()=>{const o=Q();o&&(o.pivotY=Number(t.value),ue())}),(i=z.querySelector("#rig-pivot-center"))==null||i.addEventListener("click",()=>{const o=Q();o&&(o.pivotX=o.image.naturalWidth/2,o.pivotY=o.image.naturalHeight/2,Y())}),(n=z.querySelector("#rig-copy-prev"))==null||n.addEventListener("click",()=>{const o=Q();o&&u.frame>0&&(o.frames[u.frame]=Re(o.frames[u.frame-1]),Y())}),(s=z.querySelector("#rig-reset-pose"))==null||s.addEventListener("click",()=>{const o=Q();o&&(o.frames[u.frame]=Re(o.base),Y())}),tt.onmousedown=o=>{const l=Q();l&&(me={x:o.clientX,y:o.clientY,startX:l.frames[u.frame].x,startY:l.frames[u.frame].y})},window.onmousemove=o=>{const l=Q();!me||!l||(l.frames[u.frame].x=Math.round(me.startX+o.clientX-me.x),l.frames[u.frame].y=Math.round(me.startY+o.clientY-me.y),ue(),Je())},window.onmouseup=()=>{me=null}}function Pt(e){if(u.playing){if(e-Ve>=1e3/u.fps){u.frame=(u.frame+1)%oe,Ve=e,Y();return}$t=requestAnimationFrame(Pt)}}const gt=["idle","walk","slash","hurt"],Ue=["fisico","fogo","gelo","raio","caos"],y={image:null,dataUrl:"",imageName:"nenhum arquivo",frameSize:32,faces:"left",tags:{idle:{row:0,from:0,to:3},walk:{row:1,from:0,to:3},slash:{row:2,from:0,to:3},hurt:{row:3,from:0,to:3}},previewTag:"walk",meta:{id:"",name:"",kind:"melee",element:"fisico",hp:30,attack:5,defense:2,attackSpeed:.8,moveSpeed:70,attackRange:40,reactionTime:.5,xpReward:12,goldReward:6,resists:{fisico:0,fogo:0,gelo:0,raio:0,caos:0}},status:"Abra a sprite sheet do monstro para começar."};let st,ee,Ze=0;function ua(e,t){ee=e,st=t,Ee()}function L(e,t){return`<label class="mc-field"><span>${e}</span>${t}</label>`}function O(e,t,i=1){return`<input type="number" id="${e}" value="${t}" step="${i}">`}function Ee(){cancelAnimationFrame(Ze);const e=y.meta;ee.innerHTML=`
    <div class="mc-shell">
      <section class="mc-col">
        <div class="card">
          <h3>1 · Sprite</h3>
          <button id="mc-open">Abrir PNG</button>
          <span class="dim mc-filename">${y.imageName}</span>
          <div class="mc-grid2">
            ${L("Tam. do frame",O("mc-framesize",y.frameSize))}
            ${L("Olha para",`<select id="mc-faces"><option value="left" ${y.faces==="left"?"selected":""}>Esquerda</option><option value="right" ${y.faces==="right"?"selected":""}>Direita</option></select>`)}
          </div>
          <div class="mc-tags">
            <div class="mc-tag-row mc-tag-head"><b>ação</b><span>linha</span><span>de</span><span>até</span><span></span></div>
            ${gt.map(s=>`<div class="mc-tag-row"><b>${s}</b> ${O(`mc-${s}-row`,y.tags[s].row)} ${O(`mc-${s}-from`,y.tags[s].from)} ${O(`mc-${s}-to`,y.tags[s].to)} <button type="button" class="mc-see" data-tag="${s}" title="Ver esta ação no preview">👁</button></div>`).join("")}
          </div>
          <canvas id="mc-preview" width="140" height="110"></canvas>
        </div>
      </section>
      <section class="mc-col">
        <div class="card">
          <h3>2 · Metadados</h3>
          <div class="mc-grid2">
            ${L("id (a-z, _)",`<input id="mc-id" value="${e.id}" placeholder="ex.: golem_musgo">`)}
            ${L("Nome",`<input id="mc-name" value="${e.name}" placeholder="ex.: Golem de Musgo">`)}
            ${L("Tipo",`<select id="mc-kind"><option value="melee" ${e.kind==="melee"?"selected":""}>Melee</option><option value="ranged" ${e.kind==="ranged"?"selected":""}>Ranged</option></select>`)}
            ${L("Elemento",`<select id="mc-element">${Ue.map(s=>`<option ${e.element===s?"selected":""}>${s}</option>`).join("")}</select>`)}
            ${L("HP",O("mc-hp",e.hp))}
            ${L("Ataque",O("mc-attack",e.attack))}
            ${L("Defesa",O("mc-defense",e.defense))}
            ${L("Vel. ataque",O("mc-attackspeed",e.attackSpeed,.05))}
            ${L("Vel. mov.",O("mc-movespeed",e.moveSpeed))}
            ${L("Alcance",O("mc-attackrange",e.attackRange))}
            ${L("Reação (s)",O("mc-reactiontime",e.reactionTime,.1))}
            ${L("XP",O("mc-xpreward",e.xpReward))}
            ${L("Ouro",O("mc-goldreward",e.goldReward))}
          </div>
          <h4>Resistências (pontos; negativo = fraqueza)</h4>
          <div class="mc-grid2">
            ${Ue.map(s=>L(s,O(`mc-res-${s}`,e.resists[s]))).join("")}
          </div>
          <button class="primary" id="mc-export">💾 Exportar para o jogo</button>
          <div class="dim mc-status">${y.status}</div>
        </div>
      </section>
    </div>
  `,ee.querySelector("#mc-open").onclick=async()=>{const s=await st.openImage();if(!s)return;const o=new Image;o.onload=()=>{y.image=o,y.dataUrl=s.dataUrl,y.imageName=s.name,y.status=`Sheet ${o.width}×${o.height}px carregada. Ajuste frame/tags.`,y.meta.id||(y.meta.id=s.name.replace(/\.png$/i,"").replace(/[^a-z0-9_]/gi,"_").toLowerCase()),Ee()},o.src=s.dataUrl};const t=(s,o)=>{const l=ee.querySelector(`#${s}`);l&&(l.onchange=()=>o(Number(l.value)||0))};t("mc-framesize",s=>y.frameSize=Math.max(8,s));for(const s of gt)t(`mc-${s}-row`,o=>y.tags[s].row=Math.max(0,o)),t(`mc-${s}-from`,o=>y.tags[s].from=Math.max(0,o)),t(`mc-${s}-to`,o=>y.tags[s].to=Math.max(0,o));const i=ee.querySelector("#mc-faces");i.onchange=()=>y.faces=i.value,ee.querySelectorAll(".mc-see").forEach(s=>{s.onclick=()=>{y.previewTag=s.dataset.tag,ee.querySelectorAll(".mc-see").forEach(o=>o.classList.toggle("active",o===s))}});const n=(s,o)=>{const l=ee.querySelector(`#${s}`);l&&(l.onchange=()=>o(l.value))};n("mc-id",s=>y.meta.id=s.replace(/[^a-z0-9_]/gi,"_").toLowerCase()),n("mc-name",s=>y.meta.name=s),n("mc-kind",s=>y.meta.kind=s),n("mc-element",s=>y.meta.element=s),t("mc-hp",s=>y.meta.hp=s),t("mc-attack",s=>y.meta.attack=s),t("mc-defense",s=>y.meta.defense=s),t("mc-attackspeed",s=>y.meta.attackSpeed=s),t("mc-movespeed",s=>y.meta.moveSpeed=s),t("mc-attackrange",s=>y.meta.attackRange=s),t("mc-reactiontime",s=>y.meta.reactionTime=s),t("mc-xpreward",s=>y.meta.xpReward=s),t("mc-goldreward",s=>y.meta.goldReward=s);for(const s of Ue)t(`mc-res-${s}`,o=>y.meta.resists[s]=o);ee.querySelector("#mc-export").onclick=fa,pa()}function pa(){const e=ee.querySelector("#mc-preview"),t=e==null?void 0:e.getContext("2d");if(!e||!t)return;const i=performance.now(),n=s=>{if(document.body.contains(e)){if(t.clearRect(0,0,e.width,e.height),t.imageSmoothingEnabled=!1,y.image){const o=y.tags[y.previewTag],l=Math.max(1,o.to-o.from+1),c=o.from+Math.floor((s-i)/160)%l,f=Math.min(3,96/y.frameSize),g=y.frameSize*f;t.save(),t.translate(e.width/2,e.height/2),y.faces==="right"&&t.scale(-1,1),t.drawImage(y.image,c*y.frameSize,o.row*y.frameSize,y.frameSize,y.frameSize,-g/2,-g/2,g,g),t.restore(),t.fillStyle="#9aa4b5",t.font="9px sans-serif",t.textAlign="center",t.fillText(`${y.previewTag} · linha ${o.row} · frames ${o.from}-${o.to}`,e.width/2,e.height-4)}else t.fillStyle="#666",t.font="10px sans-serif",t.textAlign="center",t.fillText("sem sheet",e.width/2,e.height/2);Ze=requestAnimationFrame(n)}};Ze=requestAnimationFrame(n)}async function fa(){const e=y.meta;if(!y.image||!y.dataUrl){y.status="⚠ Abra a sprite sheet antes de exportar.",Ee();return}if(!e.id||!e.name){y.status="⚠ Preencha id e nome.",Ee();return}const t=Math.floor(y.image.width/y.frameSize),i={format:"mini-guild-monster@1",template:{id:e.id,name:e.name,isBoss:!1,kind:e.kind,hp:e.hp,attack:e.attack,defense:e.defense,attackSpeed:e.attackSpeed,moveSpeed:e.moveSpeed,attackRange:e.kind==="ranged"?Math.max(200,e.attackRange):e.attackRange,reactionTime:e.reactionTime,xpReward:e.xpReward,goldReward:e.goldReward,element:e.element,resists:Object.fromEntries(Object.entries(e.resists).filter(([,s])=>s!==0))},sprite:{frameSize:y.frameSize,frames:t,faces:y.faces,tags:{idle:{...y.tags.idle},walk:{...y.tags.walk},slash:{...y.tags.slash},thrust:{...y.tags.slash},shoot:{...y.tags.slash},spellcast:{...y.tags.slash},hurt:{...y.tags.hurt}}},png:y.dataUrl},n=await st.saveArtifact(JSON.stringify(i,null,2),`${e.id}.monster.json`);y.status=n!=null&&n.path?`✔ Artefato salvo em ${n.path} — ingira com: node scripts/ingest-monsters.mjs "${n.path}"`:"Salvamento cancelado.",Ee()}const Et=(()=>{var e,t;try{const i=localStorage.getItem("mgi-lang");return i==="en-US"||i==="pt-BR"?i:((t=(e=JSON.parse(localStorage.getItem("mgi-save")??"{}"))==null?void 0:e.settings)==null?void 0:t.language)??"pt-BR"}catch{return"pt-BR"}})();It(Et);Rt(Et);const k=window.api;function Tt(e){return new Promise(t=>{const i=document.createElement("input");i.type="file",i.accept=e,i.onchange=()=>{var n;return t(((n=i.files)==null?void 0:n[0])??null)},i.oncancel=()=>t(null),i.click()})}function ga(e){return new Promise((t,i)=>{const n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>i(n.error),n.readAsDataURL(e)})}function ht(e,t,i){const n=e.startsWith("data:")?null:new Blob([e],{type:i}),s=n?URL.createObjectURL(n):e,o=document.createElement("a");return o.href=s,o.download=t,o.click(),n&&setTimeout(()=>URL.revokeObjectURL(s),1e3),{path:`Downloads/${t}`}}async function ha(){var i;const e=await((i=k.editorSpritesOpenImage)==null?void 0:i.call(k));if(e)return e;const t=await Tt("image/png");return t?{path:t.name,name:t.name,dataUrl:await ga(t)}:null}async function va(){var i;const e=await((i=k.editorSpritesOpenProfile)==null?void 0:i.call(k));if(e)return e;const t=await Tt("application/json,.json");return t?{path:t.name,json:await t.text()}:null}const a={imageName:"nenhum arquivo",imagePath:"",dataUrl:"",image:null,imageWidth:0,imageHeight:0,cols:4,rows:8,offsetX:0,offsetY:0,gapX:0,gapY:0,frameW:128,frameH:128,outputW:128,outputH:128,padding:8,scalePct:100,shiftX:0,shiftY:0,trimAlpha:!0,currentAnim:"walk",zoom:.35,showGrid:!0,showBounds:!1,showCrosshair:!1,selectedFrame:null,focusedFrame:null,status:"Abra um PNG para começar.",animations:[{id:"idle",name:"Idle",row:0,from:0,to:3,fps:2,pingpong:!0},{id:"walk",name:"Walk",row:1,from:0,to:3,fps:5,pingpong:!1},{id:"rest",name:"Rest",row:3,from:0,to:3,fps:2,pingpong:!0},{id:"happy",name:"Happy",row:4,from:0,to:3,fps:4,pingpong:!1},{id:"sit",name:"Sit",row:7,from:0,to:3,fps:2,pingpong:!0}],frameBounds:{},frameOverrides:{},analysisDone:!1,dragStart:null,sheetScrollLeft:0,sheetScrollTop:0,expandedAnim:null,previewActive:!1,animSpeed:1,animPaused:!1,wizardStep:0,spriteType:"pet-grid",spriteFaces:"left",advancedMode:!1,mode:new URLSearchParams(location.search).has("rigExample")?"rig":"slice"},ve=document.getElementById("editor-sprites");let ne,K,nt=0;performance.now();let Qe=0,Be=performance.now();function D(e,t){return`${e},${t}`}function ae(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function ba(e){return ae(e)}function We(e,t,i){return Math.max(t,Math.min(i,e))}function E(e,t,i,n="number",s="1"){return`<div class="field"><label>${e}</label><input id="${t}" type="${n}" step="${s}" value="${i}"></div>`}function Xe(e,t,i,n){return`<div class="field"><label>${n}</label><input data-anim-field="${e}:${String(t)}" type="number" value="${i}"></div>`}function ge(e,t,i,n){return`<div class="field"><label>${n}</label><input data-anim-custom="${e}:${t}" type="number" value="${i}"></div>`}function _e(e){a.wizardStep=Math.max(0,Math.min(5,e)),M()}function Fe(e){return e===0?!0:a.image!==null}function ya(e){return["Abrir","Grade","Analisar","Animações","Ajustes","Exportar"][e]??"?"}function wa(){const e=a.image!==null;return`
    <div class="card wizard-bar">
      <div class="wizard-steps">${[0,1,2,3,4,5].map(i=>{let n="wizard-step";i===a.wizardStep?n+=" active":e&&i>0&&i<a.wizardStep&&(n+=" done"),Fe(i)||(n+=" disabled");const s=Fe(i);return`<button class="${n}" data-wizard-step="${i}" ${s?"":"disabled"}>${i+1}. ${ya(i)}</button>`}).join("")}</div>
      <button id="wizard-adv-toggle" class="wizard-adv-toggle">${a.advancedMode?"Modo wizard":"Modo avançado"}</button>
    </div>
  `}function xa(){const e=a.image!==null,i=[{value:"pet-grid",label:"Pet"},{value:"monster-strip",label:"Monstro strip"},{value:"monster-grid",label:"Monstro grid"}].map(s=>{const o=a.spriteType===s.value?"checked":"";return`<label class="check"><input type="radio" name="spriteType" value="${s.value}" ${o}> ${s.label}</label>`}).join(""),n=e?`<div class="group"><div class="group-title">Imagem atual</div>
       <div><span class="badge">${ae(a.imageName)}</span> · ${a.imageWidth}&#215;${a.imageHeight} px</div>
       ${a.imagePath?`<div class="dim" style="font-size:10px">${ae(a.imagePath)}</div>`:""}
       </div>`:'<div class="dim hint">Nenhuma imagem carregada.</div>';return`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Abrir imagem</div>
      <div id="drop-zone" class="drop-zone">
        <div class="drop-zone-inner">${["pet-grid","monster-grid"].includes(a.spriteType)?"&#x1F5BC;":"&#x1F39E;"} Arraste um PNG ou clique</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px">
        <button id="open-image" class="primary">Abrir PNG</button>
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${i}</div>
      </div>
      ${$a()}
      ${n}
    </div>
    ${we(0)}
  `}function $a(){return a.spriteType==="pet-grid"?"":`
    <div class="group">
      <div class="group-title">Orientação da arte</div>
      <div class="dim hint" style="margin-bottom:4px">Para qual lado o sprite desenhado está olhando?</div>
      <div class="type-selector">
        <label class="type-radio ${a.spriteFaces==="left"?"selected":""}">
          <input type="radio" name="spriteFaces" value="left" ${a.spriteFaces==="left"?"checked":""}> ⬅ Esquerda
        </label>
        <label class="type-radio ${a.spriteFaces==="right"?"selected":""}">
          <input type="radio" name="spriteFaces" value="right" ${a.spriteFaces==="right"?"checked":""}> ➡ Direita
        </label>
      </div>
    </div>
  `}function Sa(){const e=a.spriteType==="monster-strip",t=a.image!==null,i=Math.round(a.frameW),n=Math.round(a.frameH);let s;return e?s=`
      <div class="grid-2">
        ${E("Frame W","frameW",i)}
        ${E("Frame H","frameH",n)}
        ${E("Colunas","cols",a.cols)}
      </div>
    `:s=`
      <div class="grid-2">
        ${E("Colunas","cols",a.cols)}
        ${E("Linhas","rows",a.rows)}
        ${E("Off X","offsetX",a.offsetX)}
        ${E("Off Y","offsetY",a.offsetY)}
        ${E("Gap X","gapX",a.gapX)}
        ${E("Gap Y","gapY",a.gapY)}
      </div>
      <div class="dim hint" style="margin-top:2px">Frame W: ${i} &#183; Frame H: ${n}</div>
    `,`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Configurar grade</div>
      ${s}
      <button id="auto-frame" class="compact" ${t?"":"disabled"} style="margin-top:4px">Calcular frame autom&#225;tico</button>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:6px">
        <label class="check"><input id="showGrid" type="checkbox" ${a.showGrid?"checked":""}> Mostrar grade</label>
        <div class="field" style="flex-direction:row;align-items:center;gap:4px">
          <label style="white-space:nowrap">Zoom:</label>
          <input id="zoom" type="number" step="0.05" value="${a.zoom}" style="width:70px">
        </div>
      </div>
    </div>
    ${we(1)}
  `}function ka(){const e=a.image!==null,t=a.cols*a.rows,i=Object.keys(a.frameBounds).length;return`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Analisar frames</div>
      <button id="auto-analyze" class="primary compact" ${e?"":"disabled"} style="margin-bottom:6px">&#x1F50D; Detectar bounds (alpha)</button>
      <div class="group">
        <div class="group-title"><span>Resultados</span><span class="badge">${i}/${t}</span></div>
        ${zt()}
      </div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
        <label class="check"><input id="showBounds" type="checkbox" ${a.showBounds?"checked":""} ${a.analysisDone?"":"disabled"}> Mostrar bounds no canvas</label>
        <button id="clear-bounds" class="compact" ${a.analysisDone?"":"disabled"}>Limpar an&#225;lise</button>
      </div>
    </div>
    ${we(2)}
  `}function Aa(){return`
    <div class="card step-content">
      <div class="anim-section-head">
        <span class="group-title" style="font-size:14px">Definir anima&#231;&#245;es</span>
        <button id="add-anim">+ Nova anima&#231;&#227;o</button>
      </div>
      <div class="anim-list-card" style="max-height:none">${Ct()}</div>
      <div style="margin-top:8px">
        <div class="dim" style="font-size:11px;margin-bottom:4px">Preview:</div>
        <div class="anim-buttons">${De()}</div>
      </div>
    </div>
    ${we(3)}
  `}function Ma(){const e=Object.keys(a.frameOverrides).length;return`
    <div class="card step-content">
      <div class="group-title" style="font-size:14px;margin-bottom:6px">Ajustes finos</div>
      <div class="group">
        <div class="group-title">Alinhamento</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <button id="auto-center-frames" class="primary compact" ${a.image?"":"disabled"}>&#x1F3AF; Auto-centrar frames</button>
          <label class="check"><input id="showCrosshair" type="checkbox" ${a.showCrosshair?"checked":""}> Crosshair de centro</label>
        </div>
        <div class="dim hint">Detecta o centro de massa de cada frame e aplica shift automático.${e>0?` ${e} frame(s) com overrides ativos.`:""}</div>
      </div>
      <div class="group">
        <div class="group-title"><span>Saída</span><span>${a.outputW} x ${a.outputH}</span></div>
        <div class="grid-2">
          ${E("Frame W","outputW",a.outputW)}
          ${E("Frame H","outputH",a.outputH)}
          ${E("Pad","padding",a.padding)}
          ${E("Escala %","scalePct",a.scalePct)}
          ${E("Shift X","shiftX",a.shiftX)}
          ${E("Shift Y","shiftY",a.shiftY)}
        </div>
        <label class="check"><input id="trimAlpha" type="checkbox" ${a.trimAlpha?"checked":""}> Aparar transparência</label>
      </div>
      <div class="dim hint" style="margin-top:4px">Clique em um frame no canvas para inspecionar.</div>
      ${Ft()}
      <div class="group">
        <div class="group-title">Editor em lote de frames</div>
        <div class="dim hint">Arraste nas miniaturas ou use as setas do teclado.</div>
        ${Ta()}
      </div>
    </div>
    ${we(4)}
  `}function Pa(){const e=a.image!==null,t=a.spriteType!=="pet-grid"?` · Arte olha p/ ${a.spriteFaces==="left"?"esquerda":"direita"}`:"",i=a.spriteType==="monster-strip"?`Tipo: Monster &#183; Strip &#183; ${a.cols} colunas &#183; ${a.animations.length} anima&#231;&#245;es${t}`:`Tipo: ${a.spriteType==="monster-grid"?"Monster":"Pet"} &#183; Grid ${a.cols}&#215;${a.rows} &#183; ${a.animations.length} anima&#231;&#245;es${t}`,n=a.previewActive?'<span class="badge" style="margin-left:6px">&#x25C9; Preview ativo no jogo!</span>':"";return`
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
          <button id="preview-game" class="primary" ${e?"":"disabled"}>${a.previewActive?"&#x1F3AF; Parar preview":"&#x1F3AF; Testar no jogo"}</button>
          ${n}
        </div>
      </div>

      <div class="group">
        <div class="group-title">Resumo</div>
        <div class="dim" style="font-size:11px">${i}</div>
        <div class="dim" style="font-size:11px">Output: ${a.outputW}&#215;${a.outputH} por frame</div>
        <div class="dim" style="font-size:11px">Imagem: ${ae(a.imageName)} (${a.imageWidth}&#215;${a.imageHeight})</div>
      </div>
    </div>
    ${we(5)}
  `}function Ea(){return[xa,Sa,ka,Aa,Ma,Pa][a.wizardStep]()}function Ta(){if(!a.image)return'<div class="dim hint">Abra uma imagem primeiro.</div>';const e=[];for(let t=0;t<a.rows;t+=1){const i=[];for(let n=0;n<a.cols;n+=1){const s=D(t,n),o=a.frameOverrides[s],l=o&&(o.shiftX||o.shiftY||o.scalePct),f=!!a.frameBounds[s],g=a.focusedFrame===`${t},${n}`,h=(o==null?void 0:o.shiftX)??0,w=(o==null?void 0:o.shiftY)??0;i.push(`
        <div class="batch-cell ${l?"has-override":""} ${f?"":"empty-cell"} ${g?"focused":""}"
             data-fr="${t},${n}" tabindex="0">
          <div class="batch-drag-area" data-fr="${t},${n}">
            <canvas class="batch-thumb" data-frc="${t},${n}"></canvas>
          </div>
          <div class="batch-label">${t},${n}</div>
          <div class="batch-steppers">
            <div class="batch-stepper-row">
              <button data-stp="${s}:shiftX:-1" title="Shift X -1">&#9664;</button>
              <span class="batch-val" data-fld="${s}:shiftX">${h||0}</span>
              <button data-stp="${s}:shiftX:1" title="Shift X +1">&#9654;</button>
            </div>
            <div class="batch-stepper-row">
              <button data-stp="${s}:shiftY:-1" title="Shift Y -1">&#9650;</button>
              <span class="batch-val" data-fld="${s}:shiftY">${w||0}</span>
              <button data-stp="${s}:shiftY:1" title="Shift Y +1">&#9660;</button>
            </div>
          </div>
        </div>
      `)}e.push(`<div class="batch-row">${i.join("")}</div>`)}return`<div class="batch-editor">${e.join("")}</div>`}function we(e){return`
    <div class="step-nav">
      <button data-nav-prev ${e<=0||!Fe(e-1)?"disabled":""}>&#8592; Anterior</button>
      <span class="dim" style="font-size:11px;align-self:center">Passo ${e+1} de 6</span>
      <button data-nav-next ${e>=5||!Fe(e+1)?"disabled":""}>Pr&#243;ximo &#8594;</button>
    </div>
  `}function za(){switch(a.wizardStep){case 0:return`
        <div class="card">
          <div class="dim hint">Selecione o tipo de sprite sheet e abra uma imagem PNG.</div>
        </div>
      `;case 1:case 2:case 4:case 5:return"";case 3:{const t=te();return`
        <div class="card">
          <div class="group-title" style="font-size:12px">Anima&#231;&#227;o atual</div>
          <div><b>${(t==null?void 0:t.name)??"-"}</b> <span class="badge">row ${(t==null?void 0:t.row)??"-"} &#183; ${(t==null?void 0:t.from)??0}-${(t==null?void 0:t.to)??0}</span></div>
          <div class="anim-buttons" style="margin-top:4px">${De()}</div>
          <div class="status dim" style="margin-top:4px">${ae(a.status)}</div>
        </div>
        <div class="card">
          <button id="open-profile-sidebar" class="compact" style="width:100%">Abrir Perfil</button>
        </div>
      `}default:return""}}function Fa(){var e,t,i,n;return`
    <div class="card preview-card">
      <div class="preview-box"><canvas id="preview-canvas" width="${a.outputW}" height="${a.outputH}"></canvas></div>
      <div class="preview-meta">
        <div class="anim-buttons">${De()}</div>
        <div><b>${((e=te())==null?void 0:e.name)??"-"}</b> <span class="badge">row ${((t=te())==null?void 0:t.row)??"-"} &#183; ${((i=te())==null?void 0:i.from)??0}-${((n=te())==null?void 0:n.to)??0}</span></div>
        <div class="status">${ae(a.status)}</div>
      </div>
    </div>
  `}function Ca(){var e,t,i,n;return`
    <div class="tool-shell">
      <section class="workspace">
        <div class="card topbar">
          <div class="file-title">
            <b>${ae(a.imageName)}</b>
            <span>${a.imageWidth||"-"} x ${a.imageHeight||"-"} px${a.imagePath?` &#183; ${ae(a.imagePath)}`:""}</span>
          </div>
          <div class="toolbar-actions">
            <button id="open-image" class="primary">Abrir PNG</button>
            <button id="open-profile" class="compact">Abrir Perfil</button>
            <button id="save-profile" class="compact" ${a.image?"":"disabled"}>Salvar Perfil</button>
            <button id="auto-analyze" class="primary" ${a.image?"":"disabled"}>Analisar bounds</button>
            <button id="export-png" class="primary" ${a.image?"":"disabled"}>Exportar PNG</button>
            <button id="preview-game" class="primary" ${a.image?"":"disabled"}>${a.previewActive?"Parar preview":"Testar no jogo"}</button>
            <button id="save-game-config" class="compact" ${a.image?"":"disabled"}>Salvar config p/ jogo</button>
          </div>
        </div>
        <div class="card canvas-wrap">
          <canvas id="sheet-canvas"></canvas>
        </div>
        <div class="card preview-card">
          <div class="preview-box"><canvas id="preview-canvas" width="${a.outputW}" height="${a.outputH}"></canvas></div>
          <div class="preview-meta">
        <div class="anim-buttons">${De()}</div>
        <div class="preview-speed-row">
          <button id="preview-pause" class="compact" title="${a.animPaused?"Play":"Pausar"}">${a.animPaused?"&#9654;":"&#10074;&#10074;"}</button>
          <input id="anim-speed" type="range" min="0.05" max="3" step="0.05" value="${a.animSpeed}" title="Velocidade">
          <span class="speed-label">&#215;${a.animSpeed.toFixed(2)}</span>
        </div>
            <div><b>${((e=te())==null?void 0:e.name)??"-"}</b> <span class="badge">row ${((t=te())==null?void 0:t.row)??"-"} &#183; ${((i=te())==null?void 0:i.from)??0}-${((n=te())==null?void 0:n.to)??0}</span></div>
            <div class="status">${ae(a.status)}</div>
          </div>
        </div>
        ${Ft()}
      </section>
      <aside class="side">
        <div class="side-panel">
          <div class="card controls">
            ${Xa()}
            ${qa()}
            ${Ya()}
            ${Ia()}
          </div>
          <div class="card">
            <div class="anim-section-head">
              <span class="group-title">Anima&#231;&#245;es</span>
              <button id="add-anim">+ Nova</button>
            </div>
            <div class="anim-list-card">${Ct()}</div>
          </div>
          <button id="wizard-adv-toggle" class="compact" style="width:100%">Modo wizard</button>
        </div>
      </aside>
    </div>
  `}function Xa(){return`
    <div class="group">
      <div class="group-title"><span>Grade</span><span>${Math.round(a.frameW)} x ${Math.round(a.frameH)}</span></div>
      <div class="grid-2">
        ${E("Colunas","cols",a.cols)}
        ${E("Linhas","rows",a.rows)}
        ${E("Off X","offsetX",a.offsetX)}
        ${E("Off Y","offsetY",a.offsetY)}
        ${E("Gap X","gapX",a.gapX)}
        ${E("Gap Y","gapY",a.gapY)}
      </div>
      <button id="auto-frame" class="compact" ${a.image?"":"disabled"}>Calcular frame</button>
      <label class="check"><input id="showGrid" type="checkbox" ${a.showGrid?"checked":""}> grade</label>
      <label class="check"><input id="showBounds" type="checkbox" ${a.showBounds?"checked":""} ${a.analysisDone?"":"disabled"}> bounds</label>
    </div>
  `}function qa(){const e=a.cols*a.rows;return`
    <div class="group">
      <div class="group-title"><span>An&#225;lise</span><span class="badge">${Object.keys(a.frameBounds).length}/${e}</span></div>
      <button id="auto-analyze" class="primary compact" ${a.image?"":"disabled"}>Detectar bounds</button>
      <button id="clear-bounds" class="compact" ${a.analysisDone?"":"disabled"}>Limpar</button>
      <div class="stats-grid">${zt()}</div>
    </div>
  `}function zt(){if(!a.analysisDone)return'<span class="dim hint">Clique em Analisar.</span>';const e=Object.values(a.frameBounds);if(e.length===0)return'<span class="dim hint">Nenhum frame.</span>';const t=e.map(h=>h.w),i=e.map(h=>h.h),n=Math.min(...t),s=Math.max(...t),o=Math.round(t.reduce((h,w)=>h+w,0)/t.length),l=Math.min(...i),c=Math.max(...i),f=Math.round(i.reduce((h,w)=>h+w,0)/i.length),g=e.filter(h=>{const w=h.w*h.h/(o*f);return w<.5||w>1.8});return`
    <div class="stat-row"><span>Largura</span><span>min ${n} / max ${s} / med ${o}</span></div>
    <div class="stat-row"><span>Altura</span><span>min ${l} / max ${c} / med ${f}</span></div>
    <div class="stat-row"><span>Total</span><span>${e.length}</span></div>
    ${g.length>0?`<div class="stat-row warning"><span>&#x26A0; Outliers</span><span>${g.length} frame(s)</span></div>`:""}
  `}function Ya(){return`
    <div class="group">
      <div class="group-title"><span>Sa&#237;da</span><span>${a.outputW} x ${a.outputH}</span></div>
      <div class="grid-2">
        ${E("Frame W","outputW",a.outputW)}
        ${E("Frame H","outputH",a.outputH)}
        ${E("Pad","padding",a.padding)}
        ${E("Escala %","scalePct",a.scalePct)}
        ${E("Shift X","shiftX",a.shiftX)}
        ${E("Shift Y","shiftY",a.shiftY)}
      </div>
      <label class="check"><input id="trimAlpha" type="checkbox" ${a.trimAlpha?"checked":""}> aparar transpar&#234;ncia</label>
    </div>
  `}function Ia(){return`
    <div class="group">
      <div class="group-title"><span>Visualiza&#231;&#227;o</span></div>
      ${E("Zoom","zoom",a.zoom,"number","0.05")}
    </div>
  `}function Ft(){if(!a.selectedFrame||!a.image)return"";const[e,t]=a.selectedFrame.split(",").map(Number),i=D(e,t),n=a.frameBounds[i],s=a.frameOverrides[i],o=j(t,e),l=n!=null,c=l?n.w:Math.round(o.w),f=l?n.h:Math.round(o.h),g=(s==null?void 0:s.shiftX)??0,h=(s==null?void 0:s.shiftY)??0,w=(s==null?void 0:s.scalePct)??a.scalePct;return`
    <div class="card frame-inspector">
      <div class="inspector-head">
        <span class="group-title">Frame [${e},${t}]</span>
        <button id="close-inspector">&#x2715;</button>
      </div>
      <div class="grid-3">
        <div class="field"><label>Raw W</label><span class="value">${Math.round(o.w)}</span></div>
        <div class="field"><label>Raw H</label><span class="value">${Math.round(o.h)}</span></div>
        <div class="field"><label>Cont W</label><span class="value ${l?"badge":"dim"}">${l?c:"&#8212;"}</span></div>
        <div class="field"><label>Cont H</label><span class="value ${l?"badge":"dim"}">${l?f:"&#8212;"}</span></div>
      </div>
      <div class="grid-3">
        <div class="field"><label>Shift X</label><input id="ov-shiftX" type="number" value="${g}"></div>
        <div class="field"><label>Shift Y</label><input id="ov-shiftY" type="number" value="${h}"></div>
        <div class="field"><label>Escala %</label><input id="ov-scalePct" type="number" value="${w}"></div>
      </div>
      <button id="reset-override" class="compact danger" ${s?"":"disabled"}>Resetar override</button>
      <div class="frame-preview-box">
        <canvas id="frame-preview-canvas" width="${c}" height="${f}"></canvas>
      </div>
    </div>
  `}function De(){return a.animations.map(e=>`<button class="anim-btn ${a.currentAnim===e.id?"active":""}" data-play="${e.id}">${ae(e.name)}</button>`).join("")}function Ct(){return a.animations.map(e=>{const t=a.expandedAnim===e.id;return`
      <div class="anim-row ${a.currentAnim===e.id?"active":""}" data-anim="${e.id}">
        <div class="anim-head">
          <input data-anim-name="${e.id}" type="text" value="${ba(e.name)}">
          <button data-play="${e.id}" title="Preview">&#x25B6;</button>
          <button data-toggle="${e.id}" title="${t?"Recolher":"Editar frames"}" class="${t?"primary":""}">&#x25A1;</button>
          <button data-del="${e.id}" class="danger">X</button>
        </div>
        <div class="anim-fields">
          ${Xe(e.id,"row",e.row,"Row")}
          ${Xe(e.id,"from",e.from,"De")}
          ${Xe(e.id,"to",e.to,"Até")}
          ${Xe(e.id,"fps",e.fps,"FPS")}
        </div>
        <label class="check"><input data-ping="${e.id}" type="checkbox" ${e.pingpong?"checked":""}> ping-pong</label>
        <label class="check"><input data-custom="${e.id}" type="checkbox" ${e.customFrame?"checked":""}> grid customizado (para sheets de IA desalinhadas)</label>
        ${e.customFrame?`
          <div class="anim-custom-grid grid-4">
            ${ge(e.id,"animOffsetX",e.animOffsetX??a.offsetX,"Off X")}
            ${ge(e.id,"animOffsetY",e.animOffsetY??a.offsetY,"Off Y")}
            ${ge(e.id,"animGapX",e.animGapX??a.gapX,"Gap X")}
            ${ge(e.id,"animGapY",e.animGapY??a.gapY,"Gap Y")}
            ${ge(e.id,"animFrameW",e.animFrameW??Math.round(a.frameW),"Frame W")}
            ${ge(e.id,"animFrameH",e.animFrameH??Math.round(a.frameH),"Frame H")}
          </div>
          <button data-copy-global="${e.id}" style="font-size:10px">Copiar do grid global</button>
        `:""}
        ${t?Ra(e):""}
      </div>
    `}).join("")}function Ra(e){const t=Math.floor(e.from),i=Math.floor(e.to),n=Math.min(t,i),s=Math.max(t,i),o=[];for(let c=n;c<=s;c++)o.push(c);return e.pingpong&&o.length>2&&o.push(...o.slice(1,-1).reverse()),`<div class="anim-frames-strip">${o.map(c=>{const f=D(e.row,c),g=a.frameOverrides[f],h=(g==null?void 0:g.shiftX)??0,w=(g==null?void 0:g.shiftY)??0,x=(g==null?void 0:g.scalePct)??a.scalePct;return`<div class="anim-frame-cell" data-fr="${e.row},${c}">
      <canvas class="thumb-canvas" data-frc="${e.row},${c}"></canvas>
      <div class="frame-label">col ${c}</div>
      <input data-ovf="${f}:shiftX" type="number" value="${h}" placeholder="sx" title="Shift X">
      <input data-ovf="${f}:shiftY" type="number" value="${w}" placeholder="sy" title="Shift Y">
      <input data-ovf="${f}:scalePct" type="number" value="${x}" placeholder="sc" title="Escala %">
    </div>`}).join("")}</div>`}function Ae(){return`
    <div class="mode-tabs">
      <button class="mode-tab ${a.mode==="slice"?"active":""}" data-mode="slice">&#x2702; Fatiar &amp; Animar</button>
      <button class="mode-tab ${a.mode==="compose"?"active":""}" data-mode="compose">&#x1F9E9; Compor &amp; Limpar</button>
      <button class="mode-tab ${a.mode==="rig"?"active":""}" data-mode="rig">&#x1F9B4; Rig 320</button>
      <button class="mode-tab ${a.mode==="monster"?"active":""}" data-mode="monster">&#x1F47E; Criar Monstro</button>
    </div>
  `}function qe(){ve.querySelectorAll("[data-mode]").forEach(e=>{e.onclick=()=>{a.mode=e.dataset.mode,M()}})}function Ba(e,t){a.mode="slice",Ge(e,t,"").then(()=>{Le(),a.status="Composição carregada. Ajuste a grade.",a.analysisDone=!1,a.frameBounds={},a.frameOverrides={},a.selectedFrame=null,a.wizardStep=1,M()})}function M(){if(a.mode==="rig"){ve.innerHTML=`${Ae()}<div id="rig-root"></div>`,qe(),sa(document.getElementById("rig-root"),{openImage:ha,openProject:va,saveProject:async(e,t="character-rig.json")=>{var i;return await((i=k.editorSpritesSaveProfile)==null?void 0:i.call(k,e,t))??ht(e,t,"application/json")},savePng:async(e,t="rig-export.png")=>{var i;return await((i=k.editorSpritesSavePng)==null?void 0:i.call(k,e,t))??ht(e,t,"image/png")}}),ne=null,K=null;return}if(a.mode==="monster"){ve.innerHTML=`${Ae()}<div id="monster-root"></div>`,qe(),ua(document.getElementById("monster-root"),{openImage:async()=>{var e;return await((e=k.editorSpritesOpenImage)==null?void 0:e.call(k))??null},saveArtifact:async(e,t)=>{var i;return await((i=k.editorSpritesSaveProfile)==null?void 0:i.call(k,e,t))??null}}),ne=null,K=null;return}if(a.mode==="compose"){ve.innerHTML=`${Ae()}<div id="composer-root"></div>`,qe(),Lt(document.getElementById("composer-root"),{openImage:async()=>{var e;return await((e=k.editorSpritesOpenImage)==null?void 0:e.call(k))??null},savePng:async(e,t)=>{var i;return await((i=k.editorSpritesSavePng)==null?void 0:i.call(k,e,t))??null},sendToSlicer:Ba}),ne=null,K=null;return}a.advancedMode?ve.innerHTML=Ae()+Ca():ve.innerHTML=`
      ${Ae()}
      <div class="tool-shell">
        <section class="workspace">
          ${wa()}
          <div class="card canvas-wrap">
            <canvas id="sheet-canvas"></canvas>
          </div>
          ${Ea()}
        </section>
        <aside class="side">
          <div class="side-panel">
            ${Fa()}
            ${za()}
          </div>
        </aside>
      </div>
    `,ne=document.getElementById("sheet-canvas"),K=document.getElementById("preview-canvas"),qe(),Wa(),ce()}function Wa(){const e=document.getElementById("open-image");e&&(e.onclick=vt);const t=document.getElementById("open-profile");t&&(t.onclick=bt);const i=document.getElementById("open-profile-sidebar");i&&(i.onclick=bt);const n=document.getElementById("save-profile");n&&(n.onclick=Ka);const s=document.getElementById("export-png");s&&(s.onclick=Va);const o=document.getElementById("auto-frame");o&&(o.onclick=Le);const l=document.getElementById("add-anim");l&&(l.onclick=ei),document.querySelectorAll("#auto-analyze").forEach(p=>{p.onclick=Ha});const f=document.getElementById("preview-game");f&&(f.onclick=Ja);const g=document.getElementById("save-game-config");g&&(g.onclick=Za);const h=document.getElementById("clear-bounds");h&&(h.onclick=Oa);const w=document.getElementById("close-inspector");w&&(w.onclick=()=>{a.selectedFrame=null,M()});const x=document.getElementById("reset-override");x&&(x.onclick=()=>{if(!a.selectedFrame)return;const[p,b]=a.selectedFrame.split(",").map(Number);delete a.frameOverrides[D(p,b)],M()});const m=document.getElementById("wizard-adv-toggle");m&&(m.onclick=()=>{a.advancedMode=!a.advancedMode,M()}),document.querySelectorAll("[data-wizard-step]").forEach(p=>{const b=Number(p.dataset.wizardStep);Fe(b)&&(p.onclick=()=>_e(b))});const v=document.querySelector("[data-nav-prev]");v&&v.addEventListener("click",()=>_e(a.wizardStep-1));const r=document.querySelector("[data-nav-next]");r&&r.addEventListener("click",()=>_e(a.wizardStep+1));const $=document.getElementById("drop-zone");$&&($.onclick=()=>vt(),$.ondragover=p=>{p.preventDefault(),$.classList.add("dragover")},$.ondragleave=()=>{$.classList.remove("dragover")},$.ondrop=async p=>{var P,T;p.preventDefault(),$.classList.remove("dragover");const b=(T=(P=p.dataTransfer)==null?void 0:P.files)==null?void 0:T[0];if(!b)return;const S=new FileReader;S.onload=async()=>{const G=S.result;await Ge(G,b.name,""),Le(),a.status="Imagem carregada via drag-drop.",a.analysisDone=!1,a.frameBounds={},a.frameOverrides={},a.selectedFrame=null,a.expandedAnim=null,a.wizardStep===0&&!a.advancedMode&&(a.wizardStep=1),M()},S.readAsDataURL(b)}),document.querySelectorAll('input[name="spriteType"]').forEach(p=>{p.onchange=()=>{a.spriteType=p.value,a.spriteType==="monster-strip"&&(a.rows=1),He(),M()}});for(const[p,b]of[["ov-shiftX","shiftX"],["ov-shiftY","shiftY"],["ov-scalePct","scalePct"]]){const S=document.getElementById(p);S&&(S.oninput=()=>{if(!a.selectedFrame)return;const[P,T]=a.selectedFrame.split(",").map(Number),G=D(P,T);a.frameOverrides[G]||(a.frameOverrides[G]={}),a.frameOverrides[G][b]=Number(S.value)})}for(const p of["cols","rows","offsetX","offsetY","gapX","gapY","frameW","frameH","outputW","outputH","padding","scalePct","shiftX","shiftY","zoom"]){const b=document.getElementById(p);b&&(b.oninput=()=>{a[p]=Number(b.value),(p==="cols"||p==="rows"||p==="offsetX"||p==="offsetY"||p==="gapX"||p==="gapY")&&(He(),a.analysisDone=!1,a.frameBounds={},le()),(p==="outputW"||p==="outputH")&&La(),ce()})}const C=document.getElementById("trimAlpha");C&&(C.onchange=p=>{a.trimAlpha=p.currentTarget.checked});const X=document.getElementById("showGrid");X&&(X.onchange=p=>{a.showGrid=p.currentTarget.checked,ce()});const I=document.getElementById("showBounds");I&&(I.onchange=p=>{a.showBounds=p.currentTarget.checked,ce()});const B=document.getElementById("showCrosshair");B&&(B.onchange=p=>{a.showCrosshair=p.currentTarget.checked,ce()});const J=document.getElementById("auto-center-frames");J&&(J.onclick=Na);const de=document.getElementById("preview-pause");de&&(de.onclick=()=>{a.animPaused=!a.animPaused,Be=performance.now(),M()});const ie=document.getElementById("anim-speed");ie&&(ie.oninput=()=>{a.animSpeed=Math.max(.05,Number(ie.value)),Be=performance.now(),M()}),document.querySelectorAll('input[name="spriteFaces"]').forEach(p=>{p.onchange=()=>{a.spriteFaces=p.value,a.previewActive&&le(),M()}}),document.querySelectorAll(".batch-cell").forEach(p=>{p.onclick=b=>{const S=p.dataset.fr;a.focusedFrame=S,a.selectedFrame=S;const P=document.querySelector(".canvas-wrap");if(P){const[T,G]=S.split(",").map(Number),pe=j(G,T);P.scrollLeft=(pe.x+pe.w/2)*a.zoom-P.clientWidth/2,P.scrollTop=(pe.y+pe.h/2)*a.zoom-P.clientHeight/2}M()}}),document.querySelectorAll("[data-stp]").forEach(p=>{p.onclick=b=>{b.stopPropagation();const[S,P,T]=p.dataset.stp.split(":"),G=Number(T);a.frameOverrides[S]||(a.frameOverrides[S]={});const pe=a.frameOverrides[S][P]??0;a.frameOverrides[S][P]=pe+G,a.focusedFrame=S,ce(),a.previewActive&&le()}});let W=null,H=0,xe=0,$e=0,lt=0;document.querySelectorAll(".batch-drag-area").forEach(p=>{p.addEventListener("mousedown",b=>{W=p.dataset.fr,H=b.clientX,xe=b.clientY;const S=a.frameOverrides[W];$e=(S==null?void 0:S.shiftX)??0,lt=(S==null?void 0:S.shiftY)??0,b.preventDefault()})}),window.addEventListener("mousemove",p=>{if(W){const P=Math.round((p.clientX-H)*.5),T=Math.round((p.clientY-xe)*.5);a.frameOverrides[W]||(a.frameOverrides[W]={}),a.frameOverrides[W].shiftX=$e+P,a.frameOverrides[W].shiftY=lt+T,a.focusedFrame=W,ce(),a.previewActive&&le();return}if(!a.dragStart)return;const b=p.clientX-a.dragStart.x,S=p.clientY-a.dragStart.y;if(Math.abs(b)>2||Math.abs(S)>2){const P=ne.parentElement;P&&(P.scrollLeft-=b,P.scrollTop-=S),a.dragStart={x:p.clientX,y:p.clientY}}}),window.addEventListener("mouseup",()=>{W&&(W=null,M()),a.dragStart=null}),window.addEventListener("keydown",p=>{if(a.mode!=="slice"||!a.focusedFrame||a.wizardStep!==4)return;const b=a.focusedFrame,S=p.shiftKey?5:1;let P=!0;a.frameOverrides[b]||(a.frameOverrides[b]={});const T=a.frameOverrides[b];switch(p.key){case"ArrowLeft":T.shiftX=(T.shiftX??0)-S;break;case"ArrowRight":T.shiftX=(T.shiftX??0)+S;break;case"ArrowUp":T.shiftY=(T.shiftY??0)-S;break;case"ArrowDown":T.shiftY=(T.shiftY??0)+S;break;default:P=!1}P&&(p.preventDefault(),ce(),a.previewActive&&le())}),document.querySelectorAll("[data-play]").forEach(p=>{p.onclick=()=>{a.currentAnim=p.dataset.play,performance.now(),Qe=0,M()}}),document.querySelectorAll("[data-toggle]").forEach(p=>{p.onclick=()=>{const b=p.dataset.toggle;a.expandedAnim=a.expandedAnim===b?null:b,M()}}),document.querySelectorAll("[data-anim-name]").forEach(p=>{p.oninput=()=>{const b=a.animations.find(S=>S.id===p.dataset.animName);b&&(b.name=p.value)}}),document.querySelectorAll("[data-anim-field]").forEach(p=>{p.oninput=()=>{const[b,S]=p.dataset.animField.split(":"),P=a.animations.find(T=>T.id===b);P&&(P[S]=Number(p.value),le())}}),document.querySelectorAll("[data-ping]").forEach(p=>{p.onchange=()=>{const b=a.animations.find(S=>S.id===p.dataset.ping);b&&(b.pingpong=p.checked,le())}}),document.querySelectorAll("[data-del]").forEach(p=>{p.onclick=()=>{var b;a.animations=a.animations.filter(S=>S.id!==p.dataset.del),a.expandedAnim===p.dataset.del&&(a.expandedAnim=null),a.currentAnim=((b=a.animations[0])==null?void 0:b.id)??"",M()}}),document.querySelectorAll("[data-ovf]").forEach(p=>{p.oninput=()=>{const[b,S]=p.dataset.ovf.split(":");a.frameOverrides[b]||(a.frameOverrides[b]={}),a.frameOverrides[b][S]=Number(p.value)}}),document.querySelectorAll("[data-custom]").forEach(p=>{p.onchange=()=>{const b=a.animations.find(S=>S.id===p.dataset.custom);b&&(b.customFrame=p.checked,p.checked&&b.animFrameW==null&&(b.animOffsetX=a.offsetX,b.animOffsetY=a.offsetY,b.animGapX=a.gapX,b.animGapY=a.gapY,b.animFrameW=Math.round(a.frameW),b.animFrameH=Math.round(a.frameH)),M())}}),document.querySelectorAll("[data-anim-custom]").forEach(p=>{p.oninput=()=>{const[b,S]=p.dataset.animCustom.split(":"),P=a.animations.find(T=>T.id===b);P&&(P[S]=Number(p.value),le())}}),document.querySelectorAll("[data-copy-global]").forEach(p=>{p.onclick=()=>{const b=a.animations.find(S=>S.id===p.dataset.copyGlobal);b&&(b.animOffsetX=a.offsetX,b.animOffsetY=a.offsetY,b.animGapX=a.gapX,b.animGapY=a.gapY,b.animFrameW=Math.round(a.frameW),b.animFrameH=Math.round(a.frameH),M())}}),ne&&(ne.onclick=p=>{if(!a.image)return;const b=ne.getBoundingClientRect(),S=(p.clientX-b.left)/a.zoom,P=p.clientY>b.bottom?-1:(p.clientY-b.top)/a.zoom,T=Math.floor((S-a.offsetX)/(a.frameW+a.gapX)),G=Math.floor((P-a.offsetY)/(a.frameH+a.gapY));T>=0&&T<a.cols&&G>=0&&G<a.rows?a.selectedFrame=D(G,T):a.selectedFrame=null,M()})}async function vt(){var t;const e=await((t=k.editorSpritesOpenImage)==null?void 0:t.call(k));e&&(await Ge(e.dataUrl,e.name,e.path),Le(),a.status="Imagem carregada. Ajuste a grade e clique em Analisar.",a.analysisDone=!1,a.frameBounds={},a.frameOverrides={},a.selectedFrame=null,a.expandedAnim=null,a.wizardStep===0&&!a.advancedMode&&(a.wizardStep=1),M())}async function Ge(e,t,i){const n=new Image;await new Promise((s,o)=>{n.onload=()=>s(),n.onerror=()=>o(new Error("Falha ao carregar PNG")),n.src=e}),a.image=n,a.dataUrl=e,a.imageName=t,a.imagePath=i,a.imageWidth=n.naturalWidth,a.imageHeight=n.naturalHeight}function Le(){a.image&&(He(),(!a.outputW||!a.outputH)&&(a.outputW=Math.round(a.frameW),a.outputH=Math.round(a.frameH)),M())}function He(){a.image&&(a.cols=Math.max(1,Math.floor(a.cols)),a.rows=Math.max(1,Math.floor(a.rows)),a.frameW=(a.imageWidth-a.offsetX*2-a.gapX*(a.cols-1))/a.cols,a.frameH=(a.imageHeight-a.offsetY*2-a.gapY*(a.rows-1))/a.rows)}function La(){K&&(K.width=Math.max(1,Math.floor(a.outputW)),K.height=Math.max(1,Math.floor(a.outputH)))}function Ha(){a.image&&(a.frameBounds={},a.status="Analisando frames...",M(),requestAnimationFrame(()=>{for(let e=0;e<a.rows;e+=1)for(let t=0;t<a.cols;t+=1){const i=j(t,e),n=ot(i);n&&(a.frameBounds[D(e,t)]=n)}a.analysisDone=!0,a.showBounds=!0,a.status=`Análise concluída: ${Object.keys(a.frameBounds).length} de ${a.cols*a.rows} frames com conteúdo.`,M()}))}function Oa(){a.frameBounds={},a.analysisDone=!1,a.showBounds=!1,a.status="Bounds limpos.",M()}function Na(){a.image&&(a.status="Calculando centros...",M(),requestAnimationFrame(()=>{let e=0;for(let t=0;t<a.rows;t+=1)for(let i=0;i<a.cols;i+=1){const n=D(t,i),s=a.frameBounds[n]??ot(j(i,t));if(!s)continue;const o=j(i,t),l=s.x+s.w/2,c=s.y+s.h/2,f=o.w/2,g=o.h/2,h=Math.round(f-l),w=Math.round(g-c);h===0&&w===0||(a.frameOverrides[n]||(a.frameOverrides[n]={}),a.frameOverrides[n].shiftX=h,a.frameOverrides[n].shiftY=w,e+=1)}a.analysisDone=!0,a.showBounds=!0,a.showCrosshair=!0,a.status=`${e} frames centralizados com base nos bounds alpha.`,M()}))}function ce(){const e=ne;if(!e)return;const t=e.getContext("2d");if(!t)return;const i=a.imageWidth||720,n=a.imageHeight||720,s=Math.max(.05,a.zoom);if(e.width=Math.ceil(i*s),e.height=Math.ceil(n*s),t.imageSmoothingEnabled=!1,t.clearRect(0,0,e.width,e.height),a.image&&t.drawImage(a.image,0,0,e.width,e.height),!!a.image){if(a.showBounds&&a.analysisDone)for(let o=0;o<a.rows;o+=1)for(let l=0;l<a.cols;l+=1){const c=a.frameBounds[D(o,l)];if(!c)continue;const f=j(l,o),g=(f.x+c.x)*s,h=(f.y+c.y)*s,w=c.w*s,x=c.h*s;t.fillStyle="rgba(240, 184, 90, 0.15)",t.fillRect(g,h,w,x),t.strokeStyle="rgba(240, 184, 90, 0.65)",t.lineWidth=1,t.strokeRect(g,h,w,x)}if(a.showCrosshair&&a.image)for(let o=0;o<a.rows;o+=1)for(let l=0;l<a.cols;l+=1){const c=j(l,o),f=(c.x+c.w/2)*s,g=(c.y+c.h/2)*s;t.strokeStyle="rgba(255, 120, 120, 0.32)",t.lineWidth=.5,t.setLineDash([2,6]),t.beginPath(),t.moveTo(f,c.y*s),t.lineTo(f,(c.y+c.h)*s),t.stroke(),t.beginPath(),t.moveTo(c.x*s,g),t.lineTo((c.x+c.w)*s,g),t.stroke(),t.setLineDash([])}if(a.selectedFrame){const[o,l]=a.selectedFrame.split(",").map(Number),c=j(l,o);t.strokeStyle="rgba(102, 224, 170, 0.85)",t.lineWidth=2,t.strokeRect(c.x*s,c.y*s,c.w*s,c.h*s),t.fillStyle="rgba(102, 224, 170, 0.08)",t.fillRect(c.x*s,c.y*s,c.w*s,c.h*s)}if(a.showGrid)for(let o=0;o<a.rows;o+=1)for(let l=0;l<a.cols;l+=1){const c=j(l,o);Xt(o)?(t.strokeStyle="rgba(102, 224, 170, 0.55)",t.lineWidth=1.5):(t.strokeStyle="rgba(154, 170, 189, 0.45)",t.lineWidth=1),t.strokeRect(c.x*s,c.y*s,c.w*s,c.h*s),t.fillStyle="rgba(154, 170, 189, 0.7)",t.font=`${Math.max(9,11*s)}px monospace`,t.fillText(`${o},${l}`,c.x*s+2,c.y*s+Math.max(10,12*s))}if(a.selectedFrame&&a.image){const o=document.getElementById("frame-preview-canvas");if(o){const[l,c]=a.selectedFrame.split(",").map(Number),f=D(l,c),g=a.frameBounds[f];if(g){const h=j(c,l),w=Math.max(1,g.w),x=Math.max(1,g.h);o.width=w,o.height=x;const m=o.getContext("2d");m&&(m.imageSmoothingEnabled=!1,m.drawImage(a.image,h.x+g.x,h.y+g.y,w,x,0,0,w,x))}}}a.expandedAnim&&a.image&&Da(),a.image&&Ga()}}function Da(){const e=a.image;!e||!a.expandedAnim||!a.animations.find(i=>i.id===a.expandedAnim)||document.querySelectorAll(".thumb-canvas").forEach(i=>{const n=i.dataset.frc;if(!n)return;const[s,o]=n.split(",").map(Number),l=48;i.width=l,i.height=l;const c=i.getContext("2d");if(!c)return;c.imageSmoothingEnabled=!1,c.clearRect(0,0,l,l);const f=j(o,s),g=D(s,o),h=a.frameBounds[g];let w,x,m,v;h?(w=f.x+h.x,x=f.y+h.y,m=h.w,v=h.h):(w=f.x,x=f.y,m=f.w,v=f.h);const r=Math.min(l/m,l/v),$=m*r,C=v*r,X=(l-$)/2,I=(l-C)/2;c.drawImage(e,w,x,m,v,X,I,$,C)})}function Ga(){const e=a.image;e&&document.querySelectorAll(".batch-thumb").forEach(t=>{const i=t.dataset.frc;if(!i)return;const[n,s]=i.split(",").map(Number),o=36;t.width=o,t.height=o;const l=t.getContext("2d");if(!l)return;l.imageSmoothingEnabled=!1,l.clearRect(0,0,o,o);const c=j(s,n),f=a.frameBounds[D(n,s)];let g=c.x,h=c.y,w=c.w,x=c.h;f&&(g=c.x+f.x,h=c.y+f.y,w=f.w,x=f.h);const m=Math.min(o/w,o/x),v=w*m,r=x*m,$=a.frameOverrides[D(n,s)],C=$!=null&&$.shiftX?$.shiftX*m:0,X=$!=null&&$.shiftY?$.shiftY*m:0;l.drawImage(e,g,h,w,x,(o-v)/2+C,(o-r)/2+X,v,r),l.strokeStyle=a.focusedFrame===i?"rgba(102,224,170,0.8)":"rgba(255,255,255,0.05)",l.lineWidth=1,l.strokeRect(.5,.5,o-1,o-1)})}function ja(e){if(!K)return;const t=K.getContext("2d");if(!t||(t.imageSmoothingEnabled=!1,t.clearRect(0,0,K.width,K.height),!a.image))return;const i=te();if(!i)return;const n=(e-Be)/1e3;Be=e,a.animPaused||(Qe+=n*a.animSpeed);const s=Ua(i,Qe);qt(t,s,i.row,0,0,a.outputW,a.outputH)}function Ua(e,t){const i=We(Math.floor(e.from),0,a.cols-1),n=We(Math.floor(e.to),0,a.cols-1),s=Math.min(i,n),o=Math.max(i,n),l=[];for(let f=s;f<=o;f+=1)l.push(f);e.pingpong&&l.length>2&&l.push(...l.slice(1,-1).reverse());const c=Math.floor(t*Math.max(.1,e.fps))%Math.max(1,l.length);return l[c]??s}function Xt(e){const t=a.animations.find(i=>i.row===e&&i.customFrame);return!t||t.animOffsetX==null?null:{ox:t.animOffsetX??a.offsetX,oy:t.animOffsetY??a.offsetY,gx:t.animGapX??a.gapX,gy:t.animGapY??a.gapY,fw:t.animFrameW??Math.round(a.frameW),fh:t.animFrameH??Math.round(a.frameH)}}function j(e,t){const i=Xt(t);return i?{x:i.ox+e*(i.fw+i.gx),y:i.oy,w:i.fw,h:i.fh}:{x:a.offsetX+e*(a.frameW+a.gapX),y:a.offsetY+t*(a.frameH+a.gapY),w:a.frameW,h:a.frameH}}function qt(e,t,i,n,s,o,l){if(!a.image)return;const c=j(We(t,0,a.cols-1),We(i,0,a.rows-1)),f=D(i,t),g=a.frameBounds[f],h=a.frameOverrides[f];let w,x,m,v;if(g)w=c.x+g.x,x=c.y+g.y,m=g.w,v=g.h;else if(a.trimAlpha){const H=ot(c);H?(w=c.x+H.x,x=c.y+H.y,m=H.w,v=H.h):(w=c.x,x=c.y,m=c.w,v=c.h)}else w=c.x,x=c.y,m=c.w,v=c.h;const r=Math.max(1,o-a.padding*2),$=Math.max(1,l-a.padding*2),C=((h==null?void 0:h.scalePct)??a.scalePct)/100,X=Math.min(r/m,$/v)*C,I=m*X,B=v*X,J=(h==null?void 0:h.shiftX)??0,de=(h==null?void 0:h.shiftY)??0,ie=n+(o-I)/2+a.shiftX+J,W=s+l-a.padding-B+a.shiftY+de;if(a.spriteFaces==="right"){const H=n+o/2;e.save(),e.translate(H,0),e.scale(-1,1),e.drawImage(a.image,w,x,m,v,-(ie-H+I),W,I,B),e.restore()}else e.drawImage(a.image,w,x,m,v,ie,W,I,B)}function ot(e){if(!a.image)return null;const t=document.createElement("canvas");t.width=Math.max(1,Math.floor(e.w)),t.height=Math.max(1,Math.floor(e.h));const i=t.getContext("2d",{willReadFrequently:!0});if(!i)return null;i.drawImage(a.image,e.x,e.y,e.w,e.h,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height).data;let s=t.width,o=t.height,l=-1,c=-1;for(let f=0;f<t.height;f+=1)for(let g=0;g<t.width;g+=1)n[(f*t.width+g)*4+3]>8&&(s=Math.min(s,g),o=Math.min(o,f),l=Math.max(l,g),c=Math.max(c,f));return l<s||c<o?null:{x:s,y:o,w:l-s+1,h:c-o+1}}function _a(){const e=document.createElement("canvas");e.width=Math.max(1,Math.floor(a.outputW*a.cols)),e.height=Math.max(1,Math.floor(a.outputH*a.rows));const t=e.getContext("2d");if(!t)return e;t.imageSmoothingEnabled=!1;for(let i=0;i<a.rows;i+=1)for(let n=0;n<a.cols;n+=1)qt(t,n,i,n*a.outputW,i*a.outputH,a.outputW,a.outputH);return e}async function Va(){var n;if(!a.image)return;const e=_a(),t=a.imageName.replace(/\.png$/i,""),i=await((n=k.editorSpritesSavePng)==null?void 0:n.call(k,e.toDataURL("image/png"),`${t}_adapted.png`));a.status=i?`PNG exportado: ${i.path}`:"Exportação cancelada.",M()}async function Ka(){var n;const e=JSON.stringify(Qa(),null,2),t=a.imageName.replace(/\.png$/i,"")||"pet-sheet",i=await((n=k.editorSpritesSaveProfile)==null?void 0:n.call(k,e,`${t}_profile.json`));a.status=i?`Perfil salvo: ${i.path}`:"Salvamento cancelado.",M()}function rt(){const e={type:a.spriteType,cols:a.cols,rows:a.rows,frameW:Math.round(a.frameW),frameH:Math.round(a.frameH),animations:a.animations.map(t=>({id:t.id,name:t.name,row:t.row,from:t.from,to:t.to,fps:t.fps,pingpong:t.pingpong}))};return a.spriteType!=="pet-grid"&&(e.faces=a.spriteFaces),e}let Te;function le(){!a.previewActive||!a.image||(Te&&window.clearTimeout(Te),Te=window.setTimeout(async()=>{var t;const e=JSON.stringify(rt());await((t=k.editorSpritesPreview)==null?void 0:t.call(k,a.dataUrl,e))},300))}async function Ja(){var e,t;if(a.image){if(a.previewActive)await((e=k.editorSpritesStopPreview)==null?void 0:e.call(k)),a.previewActive=!1,Te&&window.clearTimeout(Te),a.status="Preview desativado.";else{const i=JSON.stringify(rt());await((t=k.editorSpritesPreview)==null?void 0:t.call(k,a.dataUrl,i)),a.previewActive=!0,a.status="Preview ativo no jogo! Ajuste os parâmetros e veja ao vivo."}M()}}async function Za(){var n;if(!a.image)return;const e=JSON.stringify(rt(),null,2),t=a.imageName.replace(/\.png$/i,"")||"pet-sheet",i=await((n=k.editorSpritesSaveGameConfig)==null?void 0:n.call(k,e,t));a.status=i?`Config salvo: ${i.path}`:"Salvamento cancelado.",M()}async function bt(){var i;const e=await((i=k.editorSpritesOpenProfile)==null?void 0:i.call(k));if(!e)return;const t=JSON.parse(e.json);Object.assign(a,t),a.image=null,a.expandedAnim=t.expandedAnim??null,t.dataUrl&&await Ge(t.dataUrl,t.imageName??"sheet.png",t.imagePath??""),He(),a.status=`Perfil carregado: ${e.path}`,M()}function Qa(){const{image:e,status:t,dragStart:i,sheetScrollLeft:n,sheetScrollTop:s,...o}=a;return o}function ei(){const e=`anim_${Date.now().toString(36)}`;a.animations.push({id:e,name:"Nova",row:0,from:0,to:Math.min(3,a.cols-1),fps:4,pingpong:!1}),a.currentAnim=e,M()}function te(){return a.animations.find(e=>e.id===a.currentAnim)??a.animations[0]}function Yt(e){ja(e),nt=requestAnimationFrame(Yt)}M();ia(()=>a.mode==="compose");cancelAnimationFrame(nt);nt=requestAnimationFrame(Yt);
