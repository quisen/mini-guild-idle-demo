import"./modulepreload-polyfill-B5Qt9EMX.js";import{U as O,H as Y}from"./uniques-ByYmhfX0.js";const I=["#f0a832","#7ec8ff","#c084fc"],A=180;let N=null;const q=document.getElementById("analytics-app");function Q(e){var s,i,n,t;return e==="auto"?"Ataque básico":e==="tempestade"?`${((s=O.tempestade)==null?void 0:s.name)??"Tempestade"} (único)`:e==="fenix"?`${((i=O.fenix)==null?void 0:i.name)??"Fênix"} (único)`:e==="espelho"?`${((n=O.espelho)==null?void 0:n.name)??"Espelho"} (único)`:((t=Y[e])==null?void 0:t.name)??e}function h(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:`${Math.round(e)}`}function U(e){const s=Math.floor(e/60);return s>0?`${s}m${String(Math.floor(e%60)).padStart(2,"0")}s`:`${Math.floor(e)}s`}function L(e,s){const i=e.telemetry.buckets,n=[],t=Math.max(0,i.length-A);for(let l=t;l<i.length;l+=1)n.push(s(i[l]));return n}function X(e,s){return L(e,i=>{let n=0;for(const[t,l]of Object.entries(i.dmg))t.startsWith(`${s}|`)&&(n+=l);return n})}function B(e,s=4){return e.map((i,n)=>{let t=0,l=0;for(let r=Math.max(0,n-s);r<=Math.min(e.length-1,n+s);r+=1)t+=e[r],l+=1;return t/Math.max(1,l)})}const R={death:{color:"#ff6b6b",icon:"☠"},wipe:{color:"#ff3d3d",icon:"💀"},stage:{color:"#7dffa8",icon:"⚔"},boss:{color:"#f0a832",icon:"👑"},level:{color:"#8db7ff",icon:"↑"}};function T(e,s,i,n=[]){const t=e.getContext("2d");if(!t)return;const l=Math.min(window.devicePixelRatio||1,2),r=e.clientWidth,m=e.clientHeight;e.width=r*l,e.height=m*l,t.setTransform(l,0,0,l,0,0),t.clearRect(0,0,r,m);const p=42,j=16,g=8,k=r-p-8,u=m-g-j,x=Math.max(1,...s.flatMap(d=>d.data));t.strokeStyle="rgba(255,255,255,0.07)",t.fillStyle="#8b94a7",t.font='9px "Segoe UI", sans-serif',t.textAlign="right";for(let d=0;d<=4;d+=1){const f=g+u-u*d/4;t.beginPath(),t.moveTo(p,f),t.lineTo(p+k,f),t.stroke(),t.fillText(h(x*d/4),p-4,f+3)}t.textAlign="left",t.fillText(i,p,m-4);for(const d of n){const f=p+k*d.frac;t.strokeStyle=d.color,t.globalAlpha=.55,t.setLineDash([3,3]),t.beginPath(),t.moveTo(f,g),t.lineTo(f,g+u),t.stroke(),t.setLineDash([]),t.globalAlpha=1}for(const d of s)d.data.length<2||(t.strokeStyle=d.color,t.lineWidth=1.6,t.beginPath(),d.data.forEach((f,y)=>{const S=p+k*y/(d.data.length-1),w=g+u-u*f/x;y===0?t.moveTo(S,w):t.lineTo(S,w)}),t.stroke())}function Z(e){const s=e.telemetry.buckets;if(s.length<2)return[];const i=s[Math.max(0,s.length-A)].t,n=s[s.length-1].t,t=Math.max(1,n-i);return e.telemetry.events.filter(l=>l.t>=i&&l.t<=n).map(l=>{var r;return{frac:(l.t-i)/t,color:((r=R[l.kind])==null?void 0:r.color)??"#fff"}})}function J(e,s,i){const n=document.createElement("a");n.href=URL.createObjectURL(new Blob([s],{type:i})),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function G(e){const s=e.party.map(t=>t.slot),i=["t",...s.map(t=>`dmg_slot${t}`),...s.map(t=>`taken_slot${t}`),"gold","xp","kills"],n=e.telemetry.buckets.map(t=>{const l=s.map(r=>Object.entries(t.dmg).filter(([m])=>m.startsWith(`${r}|`)).reduce((m,[,p])=>m+p,0));return[t.t,...l,...s.map(r=>t.taken[r]??0),t.gold,t.xp,t.kills].join(",")});J(`sessao-${e.telemetry.sessionSeconds}s.csv`,[i.join(","),...n].join(`
`),"text/csv")}function K(){var f,y,S,w,_,F;if(!N)return;const e=N,s=e.telemetry,i=Math.max(1,s.sessionSeconds),n=s.buckets.slice(-60),t=o=>n.reduce((a,c)=>a+o(c),0)/Math.max(1,Math.min(60,n.length)),l=o=>{var a;return((a=e.party.find(c=>c.slot===o))==null?void 0:a.name)??`Herói ${o+1}`},r={};for(const[o,a]of Object.entries(s.totals.dmgBySlotSource)){const[c,v]=o.split("|"),M=Number(c);(r[M]??(r[M]=[])).push({source:v,total:a})}const m=s.events.filter(o=>o.kind==="level"),p=[];for(let o=1;o<m.length;o+=1){const a=Number(((y=(f=m[o-1].label.match(/\(([\d.,]+)/))==null?void 0:f[1])==null?void 0:y.replace(/[.,]/g,""))??0),c=Number(((w=(S=m[o].label.match(/\(([\d.,]+)/))==null?void 0:S[1])==null?void 0:w.replace(/[.,]/g,""))??0),v=(_=m[o].label.match(/Nv\.(\d+)/))==null?void 0:_[1];c>a&&v&&p.push(`Nv.${v}: ${c-a}`)}const j=Object.entries(s.totals.takenByEnemy).sort((o,a)=>a[1]-o[1]).slice(0,8),g=Math.max(1,((F=j[0])==null?void 0:F[1])??1);q.innerHTML=`
    <header class="an-head">
      <h1>📊 Análise de Gameplay</h1>
      <div class="an-meta">
        <span>Fase ${e.stage}</span>
        <span>Sessão ${U(i)}</span>
        <span>${s.totals.kills.toLocaleString()} abates (${(s.totals.kills/(i/60)).toFixed(1)}/min)</span>
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
      <div class="an-card"><h3>Ouro por segundo</h3><canvas id="ch-gold"></canvas><div class="an-kpi">🪙 total ${h(s.totals.gold)} · <b>${h(t(o=>o.gold)*60)}/min</b> (últimos 60s)</div></div>
      <div class="an-card"><h3>XP por segundo</h3><canvas id="ch-xp"></canvas><div class="an-kpi">⭐ total ${h(s.totals.xp)} · <b>${h(t(o=>o.xp)*60)}/min</b> (últimos 60s)</div></div>
    </div>
    <div class="an-card an-breakdown">
      <h3>Composição de dano por herói <small>(totais da sessão)</small></h3>
      <div class="an-breakdown-grid">
        ${e.party.map(o=>{var C,H;const a=(r[o.slot]??[]).sort((b,$)=>$.total-b.total),c=a.reduce((b,$)=>b+$.total,0),v=s.totals.overkillBySlot[o.slot]??0,M=c>0?(v/c*100).toFixed(1):"0",P=((C=s.totals.xpRawBySlot)==null?void 0:C[o.slot])??0,V=((H=s.totals.xpAbsorbedBySlot)==null?void 0:H[o.slot])??0,D=P>0?(V/P*100).toFixed(0):null;return`<div class="an-hero-block">
              <b style="color:${I[o.slot]??"#fff"}">${o.name} · Nv.${o.level}</b>
              <div class="an-hero-total">Total ${h(c)} dano · média ${h(c/i)}/s · sofrido ${h(s.totals.takenBySlot[o.slot]??0)} · overkill ${M}%${D!=null?` · absorção de XP ${D}%`:""}</div>
              ${a.map(b=>{const $=c>0?b.total/c*100:0;return`<div class="an-source-row"><span>${Q(b.source)}</span><i style="width:${$.toFixed(1)}%"></i><b>${$.toFixed(1)}% · ${h(b.total)}</b></div>`}).join("")||'<div class="an-source-row"><span class="dim">sem dano registrado ainda</span></div>'}
            </div>`}).join("")}
      </div>
    </div>
    <div class="an-grid">
      <div class="an-card">
        <h3>Quem está te matando <small>(dano sofrido por monstro)</small></h3>
        ${j.map(([o,a])=>`<div class="an-source-row"><span>${o}</span><i style="width:${(a/g*100).toFixed(1)}%;background:linear-gradient(90deg, rgba(255,107,107,0.3), rgba(255,107,107,0.05))"></i><b>${h(a)}</b></div>`).join("")||'<div class="dim">sem dano sofrido ainda</div>'}
      </div>
      <div class="an-card">
        <h3>Abates por nível <small>(medido — valida a curva)</small></h3>
        <div class="an-kpl">${p.slice(-10).join(" · ")||'<span class="dim">suba um nível com a janela aberta pra medir</span>'}</div>
        <h3 style="margin-top:6px">Eventos recentes</h3>
        <div class="an-events">
          ${s.events.slice(-14).reverse().map(o=>{var a,c;return`<div class="an-event"><span style="color:${((a=R[o.kind])==null?void 0:a.color)??"#fff"}">${((c=R[o.kind])==null?void 0:c.icon)??"•"}</span> <b>${U(o.t)}</b> ${o.label}</div>`}).join("")||'<div class="dim">nada ainda</div>'}
        </div>
      </div>
    </div>
  `,document.getElementById("an-reset").onclick=()=>{var o,a;return(a=(o=window.api)==null?void 0:o.telemetryReset)==null?void 0:a.call(o)},document.getElementById("an-csv").onclick=()=>G(e),document.getElementById("an-json").onclick=()=>J(`sessao-${s.sessionSeconds}s.json`,JSON.stringify(e,null,2),"application/json");const k=e.party.map(o=>({label:l(o.slot),color:I[o.slot]??"#fff",data:B(X(e,o.slot))})),u=Z(e);T(document.getElementById("ch-dps"),k,"dano/s",u);const x=e.party.map(o=>({label:l(o.slot),color:I[o.slot]??"#fff",data:B(L(e,a=>a.taken[o.slot]??0))}));T(document.getElementById("ch-taken"),x,"dano/s",u),T(document.getElementById("ch-gold"),[{label:"ouro",color:"#f0a832",data:B(L(e,o=>o.gold))}],"ouro/s"),T(document.getElementById("ch-xp"),[{label:"xp",color:"#7dffa8",data:B(L(e,o=>o.xp))}],"xp/s");const d=(o,a)=>{const c=document.getElementById(o);c&&(c.innerHTML=a.map(v=>`<span><i style="background:${v.color}"></i>${v.label}</span>`).join(""))};d("lg-dps",k),d("lg-taken",x)}var E,W;(W=(E=window.api)==null?void 0:E.onTelemetryData)==null||W.call(E,e=>{try{N=JSON.parse(e),K()}catch{}});
