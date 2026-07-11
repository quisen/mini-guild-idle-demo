import"./modulepreload-polyfill-B5Qt9EMX.js";import{U as O,H as Q}from"./uniques-ByYmhfX0.js";const I=["#f0a832","#7ec8ff","#c084fc"],A=180;let N=null;const X=document.getElementById("analytics-app");function Z(t){var o,i,a,e;return t==="auto"?"Ataque básico":t==="tempestade"?`${((o=O.tempestade)==null?void 0:o.name)??"Tempestade"} (único)`:t==="fenix"?`${((i=O.fenix)==null?void 0:i.name)??"Fênix"} (único)`:t==="espelho"?`${((a=O.espelho)==null?void 0:a.name)??"Espelho"} (único)`:((e=Q[t])==null?void 0:e.name)??t}function h(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:`${Math.round(t)}`}function U(t){const o=Math.floor(t/60);return o>0?`${o}m${String(Math.floor(t%60)).padStart(2,"0")}s`:`${Math.floor(t)}s`}function L(t,o){const i=t.telemetry.buckets,a=[],e=Math.max(0,i.length-A);for(let n=e;n<i.length;n+=1)a.push(o(i[n]));return a}function G(t,o){return L(t,i=>{let a=0;for(const[e,n]of Object.entries(i.dmg))e.startsWith(`${o}|`)&&(a+=n);return a})}function j(t,o=4){return t.map((i,a)=>{let e=0,n=0;for(let r=Math.max(0,a-o);r<=Math.min(t.length-1,a+o);r+=1)e+=t[r],n+=1;return e/Math.max(1,n)})}const R={death:{color:"#ff6b6b",icon:"☠"},wipe:{color:"#ff3d3d",icon:"💀"},stage:{color:"#7dffa8",icon:"⚔"},boss:{color:"#f0a832",icon:"👑"},level:{color:"#8db7ff",icon:"↑"}};function T(t,o,i,a=[]){const e=t.getContext("2d");if(!e)return;const n=Math.min(window.devicePixelRatio||1,2),r=t.clientWidth,m=t.clientHeight;t.width=r*n,t.height=m*n,e.setTransform(n,0,0,n,0,0),e.clearRect(0,0,r,m);const p=42,M=16,g=8,k=r-p-8,u=m-g-M,y=Math.max(1,...o.flatMap(d=>d.data));e.strokeStyle="rgba(255,255,255,0.07)",e.fillStyle="#8b94a7",e.font='9px "Segoe UI", sans-serif',e.textAlign="right";for(let d=0;d<=4;d+=1){const f=g+u-u*d/4;e.beginPath(),e.moveTo(p,f),e.lineTo(p+k,f),e.stroke(),e.fillText(h(y*d/4),p-4,f+3)}e.textAlign="left",e.fillText(i,p,m-4);for(const d of a){const f=p+k*d.frac;e.strokeStyle=d.color,e.globalAlpha=.55,e.setLineDash([3,3]),e.beginPath(),e.moveTo(f,g),e.lineTo(f,g+u),e.stroke(),e.setLineDash([]),e.globalAlpha=1}for(const d of o)d.data.length<2||(e.strokeStyle=d.color,e.lineWidth=1.6,e.beginPath(),d.data.forEach((f,x)=>{const S=p+k*x/(d.data.length-1),w=g+u-u*f/y;x===0?e.moveTo(S,w):e.lineTo(S,w)}),e.stroke())}function K(t){const o=t.telemetry.buckets;if(o.length<2)return[];const i=o[Math.max(0,o.length-A)].t,a=o[o.length-1].t,e=Math.max(1,a-i);return t.telemetry.events.filter(n=>n.t>=i&&n.t<=a).map(n=>{var r;return{frac:(n.t-i)/e,color:((r=R[n.kind])==null?void 0:r.color)??"#fff"}})}function J(t,o,i){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([o],{type:i})),a.download=t,a.click(),URL.revokeObjectURL(a.href)}function z(t){const o=t.party.map(e=>e.slot),i=["t",...o.map(e=>`dmg_slot${e}`),...o.map(e=>`taken_slot${e}`),"gold","xp","kills"],a=t.telemetry.buckets.map(e=>{const n=o.map(r=>Object.entries(e.dmg).filter(([m])=>m.startsWith(`${r}|`)).reduce((m,[,p])=>m+p,0));return[e.t,...n,...o.map(r=>e.taken[r]??0),e.gold,e.xp,e.kills].join(",")});J(`sessao-${t.telemetry.sessionSeconds}s.csv`,[i.join(","),...a].join(`
`),"text/csv")}function tt(){var f,x,S,w,_,C;if(!N)return;const t=N,o=t.telemetry,i=Math.max(1,o.sessionSeconds),a=o.buckets.slice(-60),e=s=>a.reduce((l,c)=>l+s(c),0)/Math.max(1,Math.min(60,a.length)),n=s=>{var l;return((l=t.party.find(c=>c.slot===s))==null?void 0:l.name)??`Herói ${s+1}`},r={};for(const[s,l]of Object.entries(o.totals.dmgBySlotSource)){const[c,v]=s.split("|"),B=Number(c);(r[B]??(r[B]=[])).push({source:v,total:l})}const m=o.events.filter(s=>s.kind==="level"),p=[];for(let s=1;s<m.length;s+=1){const l=Number(((x=(f=m[s-1].label.match(/\(([\d.,]+)/))==null?void 0:f[1])==null?void 0:x.replace(/[.,]/g,""))??0),c=Number(((w=(S=m[s].label.match(/\(([\d.,]+)/))==null?void 0:S[1])==null?void 0:w.replace(/[.,]/g,""))??0),v=(_=m[s].label.match(/Nv\.(\d+)/))==null?void 0:_[1];c>l&&v&&p.push(`Nv.${v}: ${c-l}`)}const M=Object.entries(o.totals.takenByEnemy).sort((s,l)=>l[1]-s[1]).slice(0,8),g=Math.max(1,((C=M[0])==null?void 0:C[1])??1);X.innerHTML=`
    <header class="an-head">
      <h1>📊 Análise de Gameplay</h1>
      <div class="an-meta">
        <span>Fase ${t.stage}</span>
        <span>Sessão ${U(i)}</span>
        <span>${o.totals.kills.toLocaleString()} abates (${(o.totals.kills/(i/60)).toFixed(1)}/min)</span>
      </div>
      <div class="an-actions">
        <button id="an-reset" title="Zera contadores/gráficos — troque a build e meça de novo (A/B)">↺ Zerar sessão</button>
        <button id="an-csv" title="Buckets de 1s em CSV para planilha">CSV</button>
        <button id="an-json" title="Snapshot completo em JSON">JSON</button>
      </div>
    </header>
    <div class="an-grid">
      <div class="an-card"><h3>DPS por herói <small>(média móvel, últimos ${A}s)</small></h3><canvas id="ch-dps"></canvas><div class="an-legend" id="lg-dps"></div></div>
      <div class="an-card"><h3>Dano sofrido /s</h3><canvas id="ch-taken"></canvas><div class="an-legend" id="lg-taken"></div></div>
      <div class="an-card"><h3>Ouro por segundo</h3><canvas id="ch-gold"></canvas><div class="an-kpi">🪙 total ${h(o.totals.gold)} · <b>${h(e(s=>s.gold)*60)}/min</b> (últimos 60s)</div></div>
      <div class="an-card"><h3>XP por segundo</h3><canvas id="ch-xp"></canvas><div class="an-kpi">⭐ total ${h(o.totals.xp)} · <b>${h(e(s=>s.xp)*60)}/min</b> (últimos 60s)</div></div>
    </div>
    <div class="an-card an-breakdown">
      <h3>Composição de dano por herói <small>(totais da sessão)</small></h3>
      <div class="an-breakdown-grid">
        ${t.party.map(s=>{var D,H;const l=(r[s.slot]??[]).sort((b,$)=>$.total-b.total),c=l.reduce((b,$)=>b+$.total,0),v=o.totals.overkillBySlot[s.slot]??0,B=c>0?(v/c*100).toFixed(1):"0",F=((D=o.totals.xpRawBySlot)==null?void 0:D[s.slot])??0,Y=((H=o.totals.xpAbsorbedBySlot)==null?void 0:H[s.slot])??0,P=F>0?(Y/F*100).toFixed(0):null;return`<div class="an-hero-block">
              <b style="color:${I[s.slot]??"#fff"}">${s.name} · Nv.${s.level}</b>
              <div class="an-hero-total">Total ${h(c)} dano · média ${h(c/i)}/s · sofrido ${h(o.totals.takenBySlot[s.slot]??0)} · overkill ${B}%${P!=null?` · absorção de XP ${P}%`:""}</div>
              ${l.map(b=>{const $=c>0?b.total/c*100:0;return`<div class="an-source-row"><span>${Z(b.source)}</span><i style="width:${$.toFixed(1)}%"></i><b>${$.toFixed(1)}% · ${h(b.total)}</b></div>`}).join("")||'<div class="an-source-row"><span class="dim">sem dano registrado ainda</span></div>'}
            </div>`}).join("")}
      </div>
    </div>
    <div class="an-grid">
      <div class="an-card">
        <h3>Quem está te matando <small>(dano sofrido por monstro)</small></h3>
        ${M.map(([s,l])=>`<div class="an-source-row"><span>${s}</span><i style="width:${(l/g*100).toFixed(1)}%;background:linear-gradient(90deg, rgba(255,107,107,0.3), rgba(255,107,107,0.05))"></i><b>${h(l)}</b></div>`).join("")||'<div class="dim">sem dano sofrido ainda</div>'}
      </div>
      <div class="an-card">
        <h3>Abates por nível <small>(medido — valida a curva)</small></h3>
        <div class="an-kpl">${p.slice(-10).join(" · ")||'<span class="dim">suba um nível com a janela aberta pra medir</span>'}</div>
        <h3 style="margin-top:6px">Eventos recentes</h3>
        <div class="an-events">
          ${o.events.slice(-14).reverse().map(s=>{var l,c;return`<div class="an-event"><span style="color:${((l=R[s.kind])==null?void 0:l.color)??"#fff"}">${((c=R[s.kind])==null?void 0:c.icon)??"•"}</span> <b>${U(s.t)}</b> ${s.label}</div>`}).join("")||'<div class="dim">nada ainda</div>'}
        </div>
      </div>
    </div>
  `,document.getElementById("an-reset").onclick=()=>q(),document.getElementById("an-csv").onclick=()=>z(t),document.getElementById("an-json").onclick=()=>J(`sessao-${o.sessionSeconds}s.json`,JSON.stringify(t,null,2),"application/json");const k=t.party.map(s=>({label:n(s.slot),color:I[s.slot]??"#fff",data:j(G(t,s.slot))})),u=K(t);T(document.getElementById("ch-dps"),k,"dano/s",u);const y=t.party.map(s=>({label:n(s.slot),color:I[s.slot]??"#fff",data:j(L(t,l=>l.taken[s.slot]??0))}));T(document.getElementById("ch-taken"),y,"dano/s",u),T(document.getElementById("ch-gold"),[{label:"ouro",color:"#f0a832",data:j(L(t,s=>s.gold))}],"ouro/s"),T(document.getElementById("ch-xp"),[{label:"xp",color:"#7dffa8",data:j(L(t,s=>s.xp))}],"xp/s");const d=(s,l)=>{const c=document.getElementById(s);c&&(c.innerHTML=l.map(v=>`<span><i style="background:${v.color}"></i>${v.label}</span>`).join(""))};d("lg-dps",k),d("lg-taken",y)}const V=t=>{try{N=JSON.parse(t),tt()}catch{}};let q=()=>{var t,o;return(o=(t=window.api)==null?void 0:t.telemetryReset)==null?void 0:o.call(t)};var E,W;(W=(E=window.api)==null?void 0:E.onTelemetryData)==null||W.call(E,V);if(!window.api&&"BroadcastChannel"in window){const t=new BroadcastChannel("mgi-telemetry");t.onmessage=o=>{typeof o.data=="string"&&V(o.data)},q=()=>t.postMessage("reset")}
