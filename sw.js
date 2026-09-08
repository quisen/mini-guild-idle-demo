// Service worker do Mini Guild Idle (PWA): deixa o jogo 100% jogável offline.
// A lista de precache e a versão são injetadas pelo pós-build
// (scripts/generate-sw-precache.mjs) — em dev ficam vazias e o SW vira um
// cache-first simples.
const VERSION = '35cdf282b815';
const PRECACHE = ["./analytics.html","./assets/adventurePanel-cSzhI1Na.js","./assets/adventureText-Dp2cogHY.js","./assets/alchemistScreen-DNkGHK5b.js","./assets/analytics-BEaFIBXk.css","./assets/analytics-DsfE5QTF.js","./assets/balancePanel-n0vDFp0U.js","./assets/bestiaryBook-Cb94sCMP.js","./assets/brawlerScreen-CORUFBgk.js","./assets/competitiveLauncherDeckImpl-BtP4FqRH.js","./assets/competitiveLauncherDefenseImpl-gsEI6cdV.js","./assets/competitiveLauncherDelveImpl-D5nopjhz.js","./assets/competitiveLauncherImpl-CYwJAwsd.js","./assets/competitiveLauncherSurvivorImpl-CN2O0Hcu.js","./assets/craftPanel-0bvUTZMr.js","./assets/deckScreen-BsVOV6Du.js","./assets/defenseScreen-DsyNbyYJ.js","./assets/delveScreen-Cv02DYQr.js","./assets/enData-CpJzh9n0.js","./assets/endgamePanel-bqN7M-ah.js","./assets/fonts/inter-latin.woff2","./assets/fonts/rajdhani-500.woff2","./assets/fonts/rajdhani-600.woff2","./assets/fonts/rajdhani-700.woff2","./assets/gloryReformUi-Dbzd0HJu.js","./assets/grimoirePanel-DFu0R_ER.js","./assets/guildHousePanel-Q8lRdmuO.js","./assets/i18n-Fcczw-AE.js","./assets/index-CJcJHuLA.css","./assets/index-D3cEXm5I.js","./assets/loreEndgame-W1ERmrlH.js","./assets/minigameVisuals-ngxW3VCt.js","./assets/onlinePanel-Bwp1F-S2.js","./assets/replayEngine-Cz8z8JAZ.js","./assets/runesPanel-d4h7WOZg.js","./assets/settingsPanel-46VvTX40.js","./assets/skyforceScreen-B6faC94r.js","./assets/survivorScreen-BWjYujun.js","./manifest.webmanifest","./splash/splash.webp","./assets/ui/app-title.webp","./assets/sprites/enemies/limo.webp","./assets/sprites/enemies/limo_venenoso.webp","./assets/sprites/enemies/duende.webp","./assets/sprites/enemies/duende_bruto.webp","./assets/sprites/enemies/lobo.webp","./assets/sprites/enemies/frog_idle.webp","./assets/sprites/enemies/lobo_alfa.webp","./assets/sprites/enemies/besouro_espinhos.webp","./assets/sprites/enemies/atirador.webp","./assets/sprites/enemies/xama.webp","./assets/sprites/enemies/silfide_polen.webp","./assets/sprites/enemies/limo_prismatico.webp","./assets/sprites/enemies/besouro_ametista.webp","./assets/sprites/enemies/javali_albino.webp","./assets/sprites/enemies/lobo_lunar.webp","./assets/sprites/enemies/silfide_outonal.webp","./assets/sprites/enemies/guardiao.webp","./assets/sprites/authored/guardian-pilot.png","./assets/sprites/authored/archer.png","./assets/sprites/authored/mystic.png","./assets/sprites/authored/saint.png","./assets/sprites/authored/assassin.png","./assets/sprites/authored/gunslinger.png","./assets/sprites/authored/druid.png","./assets/sprites/authored/guardian-female.png","./assets/sprites/authored/archer-male.png","./assets/sprites/authored/mystic-female.png","./assets/sprites/authored/saint-male.png","./assets/sprites/authored/assassin-female.png","./assets/sprites/authored/gunslinger-female.png","./assets/sprites/authored/druid-male.png","./assets/sprites/environment/authored/idle-act1-verdant.webp","./assets/sprites/environment/authored/seamless/act1-ground.webp"];
const ASSET_HASHES = {"./analytics.html":"2ec5c9852c0e2d86","./assets/adventurePanel-cSzhI1Na.js":"3905d0d8a39377e3","./assets/adventureText-Dp2cogHY.js":"a168cdff3092dc27","./assets/alchemistScreen-DNkGHK5b.js":"7079a57a8b9a75d1","./assets/analytics-BEaFIBXk.css":"acd0a1d160327b1d","./assets/analytics-DsfE5QTF.js":"04fd744fae3ee222","./assets/balancePanel-n0vDFp0U.js":"67e106a1a2b7f610","./assets/bestiaryBook-Cb94sCMP.js":"0008b3a1c656ed33","./assets/brawlerScreen-CORUFBgk.js":"8cc1fcb4a1dab620","./assets/competitiveLauncherDeckImpl-BtP4FqRH.js":"95b4431c8f36a75d","./assets/competitiveLauncherDefenseImpl-gsEI6cdV.js":"152c29ae6d26dec6","./assets/competitiveLauncherDelveImpl-D5nopjhz.js":"b082996a1ba6ed56","./assets/competitiveLauncherImpl-CYwJAwsd.js":"0103ca30d485501a","./assets/competitiveLauncherSurvivorImpl-CN2O0Hcu.js":"7a106123856df735","./assets/craftPanel-0bvUTZMr.js":"6d635d12fd8b678c","./assets/deckScreen-BsVOV6Du.js":"a699df3aba8e86df","./assets/defenseScreen-DsyNbyYJ.js":"c1ed3990d1237d5f","./assets/delveScreen-Cv02DYQr.js":"69c9efa2aebdeebc","./assets/enData-CpJzh9n0.js":"41584e390ea88730","./assets/endgamePanel-bqN7M-ah.js":"55d71d05e8996d3b","./assets/fonts/inter-latin.woff2":"3100e775e8616cd2","./assets/fonts/rajdhani-500.woff2":"23afdb9b5b89b878","./assets/fonts/rajdhani-600.woff2":"433a7007e4747a02","./assets/fonts/rajdhani-700.woff2":"5b7e4a6f97163c26","./assets/gloryReformUi-Dbzd0HJu.js":"6d634cf5651a052e","./assets/grimoirePanel-DFu0R_ER.js":"5aa202b208bf44f5","./assets/guildHousePanel-Q8lRdmuO.js":"e6b8976e1e3ca00f","./assets/i18n-Fcczw-AE.js":"7122f5fc8a9a1bc9","./assets/index-CJcJHuLA.css":"c5de35a4e70b758b","./assets/index-D3cEXm5I.js":"c0be4aea9c9837fa","./assets/loreEndgame-W1ERmrlH.js":"1ce05ad3d70d5c0d","./assets/minigameVisuals-ngxW3VCt.js":"7d5e3cae8ff24195","./assets/onlinePanel-Bwp1F-S2.js":"ec69be24bd6dfe7e","./assets/replayEngine-Cz8z8JAZ.js":"c293aa912beb5d09","./assets/runesPanel-d4h7WOZg.js":"ef12b207e36469e2","./assets/settingsPanel-46VvTX40.js":"726494fbc65b6415","./assets/skyforceScreen-B6faC94r.js":"d9fb8d4404a677d8","./assets/survivorScreen-BWjYujun.js":"bc4ca680363f77ea","./manifest.webmanifest":"8258f510b24b8304","./splash/splash.webp":"c7869ea0dc5570dc","./assets/ui/app-title.webp":"fae1e6fbef6635ba","./assets/sprites/enemies/limo.webp":"19a22df42bd0262e","./assets/sprites/enemies/limo_venenoso.webp":"75b6403291a72dee","./assets/sprites/enemies/duende.webp":"1ef4bd27ff4b4ab6","./assets/sprites/enemies/duende_bruto.webp":"f171aa798e00844c","./assets/sprites/enemies/lobo.webp":"86c4c6c0d8b173f5","./assets/sprites/enemies/frog_idle.webp":"a0e1cae0d4e5d5eb","./assets/sprites/enemies/lobo_alfa.webp":"b942b97cfbcd1616","./assets/sprites/enemies/besouro_espinhos.webp":"3ee7f8788bf2cff9","./assets/sprites/enemies/atirador.webp":"6bced3b92c44914a","./assets/sprites/enemies/xama.webp":"b454802b969eb3e9","./assets/sprites/enemies/silfide_polen.webp":"d96f75ee3d67e78f","./assets/sprites/enemies/limo_prismatico.webp":"8a80aad033e08d58","./assets/sprites/enemies/besouro_ametista.webp":"6085c7c0c591bfc3","./assets/sprites/enemies/javali_albino.webp":"c2445bac36feb117","./assets/sprites/enemies/lobo_lunar.webp":"60bbcb1d8e64d63a","./assets/sprites/enemies/silfide_outonal.webp":"3b221c5a094bfffd","./assets/sprites/enemies/guardiao.webp":"5d4bb38afc2e7d76","./assets/sprites/authored/guardian-pilot.png":"31990faf6e4f7ae6","./assets/sprites/authored/archer.png":"82f7cce29d4e1a06","./assets/sprites/authored/mystic.png":"a0604875c250541f","./assets/sprites/authored/saint.png":"69007b98a006c8de","./assets/sprites/authored/assassin.png":"d63c31511d322ede","./assets/sprites/authored/gunslinger.png":"d7532b5f29ba9a7c","./assets/sprites/authored/druid.png":"d450c7a2d8f398ff","./assets/sprites/authored/guardian-female.png":"1cec1b728b9909c1","./assets/sprites/authored/archer-male.png":"9e72a915237e736a","./assets/sprites/authored/mystic-female.png":"37744e8a6fd3c315","./assets/sprites/authored/saint-male.png":"8c01ac71764dca1e","./assets/sprites/authored/assassin-female.png":"e540f677c6427b5b","./assets/sprites/authored/gunslinger-female.png":"9de62eb6444d2129","./assets/sprites/authored/druid-male.png":"ea84e021e069f6af","./assets/sprites/environment/authored/idle-act1-verdant.webp":"47a6fe87d6c76f2a","./assets/sprites/environment/authored/seamless/act1-ground.webp":"1933ddd7565bdba8"};

const CACHE = `mgi-${VERSION}`;
const ASSET_MANIFEST_KEY = './__asset-manifest.json';

async function previousAssetCaches() {
  const out = [];
  for (const name of await caches.keys()) {
    if (name === CACHE || !name.startsWith('mgi-')) continue;
    const cache = await caches.open(name);
    const response = await cache.match(ASSET_MANIFEST_KEY);
    if (!response) continue;
    try { out.push({ cache, hashes: await response.json() }); } catch { /* versão antiga sem manifesto válido */ }
  }
  return out;
}

async function reuseOrFetch(cache, oldCaches, url) {
  const hash = ASSET_HASHES[url];
  if (hash) {
    for (const old of oldCaches) {
      if (old.hashes[url] !== hash) continue;
      const hit = await old.cache.match(url, { ignoreSearch: true });
      if (hit) {
        await cache.put(url, hit);
        return;
      }
    }
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} ${response.status}`);
  await cache.put(url, response);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(async (cache) => {
        const oldCaches = await previousAssetCaches();
        // Shell crítico: sem ele o app não abre em modo avião. O index.html
        // precisa entrar no cache já na instalação (não está na PRECACHE) —
        // um único fetch preenche as duas chaves usadas pelo fallback.
        const shell = await fetch('./');
        if (!shell.ok) throw new Error(`shell ${shell.status}`);
        await cache.put('./', shell.clone());
        await cache.put('./index.html', shell.clone());
        // Código (bundle js/css) continua ATÔMICO: ativar uma versão nova sem
        // um chunk do Vite (e o activate apaga o cache antigo) = tela branca
        // offline. Se faltar código, a instalação falha e a versão anterior
        // completa continua servindo.
        const isCode = (url) => /\.(js|css|html|webmanifest)$/.test(url);
        const codeAssets = [...new Set(['./manifest.webmanifest', ...PRECACHE.filter(isCode)])];
        await Promise.all(codeAssets.map((url) => reuseOrFetch(cache, oldCaches, url)));
        // Sprites/imagens/áudio: melhor esforço — um asset com falha não pode
        // derrubar a instalação inteira (isso deixava o jogo sem NENHUM
        // suporte offline); o fetch handler preenche o que faltar nas
        // próximas sessões online.
        await Promise.allSettled(PRECACHE.filter((url) => !isCode(url)).map((url) => reuseOrFetch(cache, oldCaches, url)));
        await cache.put(ASSET_MANIFEST_KEY, new Response(JSON.stringify(ASSET_HASHES), {
          headers: { 'Content-Type': 'application/json' },
        }));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  // Limpa caches de versões antigas.
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// O cache casa IGNORANDO a query string — este é o coração do modo avião.
//
// Quase todo sprite é pedido como `caminho.png?v=versão` (cache-busting de
// arte iterada — ver visualAssetPath em render/sprites.ts), mas o PRECACHE
// guarda as URLs SEM query, e caches.match compara a URL inteira. O precache
// de 1000+ imagens existia e era inútil: em modo avião cada sprite errava o
// cache que JÁ CONTINHA o arquivo e o jogo abria sem nenhuma arte.
//
// Ignorar a query é seguro porque o ?v= só muda junto de um DEPLOY — e todo
// deploy também muda a VERSION deste SW (hash do conteúdo do build), o que
// cria um cache novo e re-precacheia a arte fresca. Dentro de uma versão do
// SW, `x.png` e `x.png?v=qualquer` são por definição o mesmo arquivo. Casar
// exato primeiro, além de desnecessário, DOBRAVA o armazenamento (~800 MB →
// ~1,6 GB): o miss exato ia à rede e guardava o mesmo sprite de novo sob a
// URL com query — num celular isso estoura a quota e derruba o precache.
// A exceção deliberada é a liveArt abaixo, que continua rede-primeiro.
const matchIgnoringSearch = (req) => caches.match(req, { ignoreSearch: true });

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const assetPath = new URL(req.url).pathname;
  // sprites/chests entrou aqui porque o cache-busting por query string
  // (`?v=...`) não adianta nada sozinho: matchIgnoringSearch ignora a query
  // DENTRO da mesma versão do SW, e uma aba de idle game fica aberta por
  // horas/dias sem o SW novo assumir — o baú roxo antigo continuava servido
  // do cache mesmo depois do deploy corrigir o mapeamento de rank.
  const liveArt = /\/assets\/(portraits\/mentors|sprites\/npcs|scenes\/village-day|sprites\/chests)/.test(assetPath);

  // Arte autoral iterada com nome estável: rede primeiro impede que um cache
  // antigo esconda NPCs/retratos novos depois de um deploy web.
  if (liveArt) {
    event.respondWith(fetch(req).then((res) => {
      if (res.ok) caches.open(CACHE).then((cache) => cache.put(req, res.clone()));
      return res;
    }).catch(() => caches.match(req).then((hit) => hit ?? matchIgnoringSearch(req))));
    return;
  }

  // Navegação: rede primeiro (pega deploys novos), cache como fallback offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then((hit) => hit ?? caches.match('./')))
    );
    return;
  }

  // Assets (bundle hasheado do Vite + sprites): cache-first com preenchimento.
  // O put usa a URL SEM query — uma entrada por arquivo, sempre encontrável
  // pelo matchIgnoringSearch, sem duplicar sprite no disco.
  event.respondWith(
    matchIgnoringSearch(req).then(
      (hit) =>
        hit ??
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            const bareUrl = new URL(req.url);
            bareUrl.search = '';
            caches.open(CACHE).then((cache) => cache.put(bareUrl.href, copy));
          }
          return res;
        })
    )
  );
});
