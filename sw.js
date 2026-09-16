// Service worker do Mini Guild Idle (PWA): deixa o jogo 100% jogável offline.
// A lista de precache e a versão são injetadas pelo pós-build
// (scripts/generate-sw-precache.mjs) — em dev ficam vazias e o SW vira um
// cache-first simples.
const VERSION = '4fdfa7de4472';
const PRECACHE = ["./analytics.html","./assets/adventurePanel-CgdCV727.js","./assets/adventureText-MY2HVQG-.js","./assets/alchemistScreen-wDSC-k2D.js","./assets/analytics-BEaFIBXk.css","./assets/analytics-Ce_Fq36n.js","./assets/balancePanel-CwFwRKXI.js","./assets/bestiaryBook-CskxSZyv.js","./assets/brawlerScreen-h_kySTP4.js","./assets/competitiveLauncherDeckImpl-ChG0vkEi.js","./assets/competitiveLauncherDefenseImpl-2T4QUVlB.js","./assets/competitiveLauncherDelveImpl-DzKdplT7.js","./assets/competitiveLauncherImpl-I9y7kIYG.js","./assets/competitiveLauncherSurvivorImpl-DuO36IFE.js","./assets/craftPanel-SO3wP863.js","./assets/deckScreen-DTOx4zKi.js","./assets/defenseScreen-BDeV_6ay.js","./assets/delveScreen-CCOOmDT3.js","./assets/enData-B_7XTACi.js","./assets/endgamePanel-BsHqcxk_.js","./assets/fonts/inter-latin.woff2","./assets/fonts/rajdhani-500.woff2","./assets/fonts/rajdhani-600.woff2","./assets/fonts/rajdhani-700.woff2","./assets/grimoirePanel-EIoY4ZLu.js","./assets/guildHousePanel-BmRiHlo4.js","./assets/i18n-DBAVGPw-.js","./assets/index-CfxN_ckk.js","./assets/index-DDbWPfya.css","./assets/loreEndgame-W1ERmrlH.js","./assets/minigameVisuals-ngxW3VCt.js","./assets/onlinePanel-D4jEj7tb.js","./assets/replayEngine-BWXo0EDv.js","./assets/runesPanel-DUo-dwCr.js","./assets/settingsPanel-DnlxCx7a.js","./assets/skyforceScreen-C4gPx7vJ.js","./assets/survivorScreen-DnnTjkKe.js","./manifest.webmanifest","./splash/splash.webp","./assets/ui/app-title.webp","./assets/sprites/enemies/limo.webp","./assets/sprites/enemies/limo_venenoso.webp","./assets/sprites/enemies/duende.webp","./assets/sprites/enemies/duende_bruto.webp","./assets/sprites/enemies/lobo.webp","./assets/sprites/enemies/frog_idle.webp","./assets/sprites/enemies/lobo_alfa.webp","./assets/sprites/enemies/besouro_espinhos.webp","./assets/sprites/enemies/atirador.webp","./assets/sprites/enemies/xama.webp","./assets/sprites/enemies/silfide_polen.webp","./assets/sprites/enemies/limo_prismatico.webp","./assets/sprites/enemies/besouro_ametista.webp","./assets/sprites/enemies/javali_albino.webp","./assets/sprites/enemies/lobo_lunar.webp","./assets/sprites/enemies/silfide_outonal.webp","./assets/sprites/enemies/guardiao.webp","./assets/sprites/authored/guardian-pilot.png","./assets/sprites/authored/archer.png","./assets/sprites/authored/mystic.png","./assets/sprites/authored/saint.png","./assets/sprites/authored/assassin.png","./assets/sprites/authored/gunslinger.png","./assets/sprites/authored/druid.png","./assets/sprites/authored/guardian-female.png","./assets/sprites/authored/archer-male.png","./assets/sprites/authored/mystic-female.png","./assets/sprites/authored/saint-male.png","./assets/sprites/authored/assassin-female.png","./assets/sprites/authored/gunslinger-female.png","./assets/sprites/authored/druid-male.png","./assets/sprites/environment/authored/idle-act1-verdant.webp","./assets/sprites/environment/authored/seamless/act1-ground.webp"];
const ASSET_HASHES = {"./analytics.html":"d499e471e38408c8","./assets/adventurePanel-CgdCV727.js":"d97e2bc5c6c1154d","./assets/adventureText-MY2HVQG-.js":"5a3123ef4563f812","./assets/alchemistScreen-wDSC-k2D.js":"5da23ee906b8a102","./assets/analytics-BEaFIBXk.css":"acd0a1d160327b1d","./assets/analytics-Ce_Fq36n.js":"fa31aa9879e13441","./assets/balancePanel-CwFwRKXI.js":"e50a2d3d58b9e9e0","./assets/bestiaryBook-CskxSZyv.js":"2ceccd963887b906","./assets/brawlerScreen-h_kySTP4.js":"c35a5ba8b60ffb42","./assets/competitiveLauncherDeckImpl-ChG0vkEi.js":"1035230105390759","./assets/competitiveLauncherDefenseImpl-2T4QUVlB.js":"1ee73eba8917d6b3","./assets/competitiveLauncherDelveImpl-DzKdplT7.js":"027ab99923fe5874","./assets/competitiveLauncherImpl-I9y7kIYG.js":"f7c6a1ee19d03ce9","./assets/competitiveLauncherSurvivorImpl-DuO36IFE.js":"13e2a2f3754d8a2c","./assets/craftPanel-SO3wP863.js":"c70dcdd590bf9e2c","./assets/deckScreen-DTOx4zKi.js":"735e741dff2d60cf","./assets/defenseScreen-BDeV_6ay.js":"438a0df7630433c3","./assets/delveScreen-CCOOmDT3.js":"947c1e490bee16f9","./assets/enData-B_7XTACi.js":"c15202aca6ae3ec0","./assets/endgamePanel-BsHqcxk_.js":"e19a2483b11f5cb7","./assets/fonts/inter-latin.woff2":"3100e775e8616cd2","./assets/fonts/rajdhani-500.woff2":"23afdb9b5b89b878","./assets/fonts/rajdhani-600.woff2":"433a7007e4747a02","./assets/fonts/rajdhani-700.woff2":"5b7e4a6f97163c26","./assets/grimoirePanel-EIoY4ZLu.js":"f02d1885a0e87d32","./assets/guildHousePanel-BmRiHlo4.js":"7498245489d572c8","./assets/i18n-DBAVGPw-.js":"24632c58d574fb4f","./assets/index-CfxN_ckk.js":"df426027e6ee2041","./assets/index-DDbWPfya.css":"f54b287e026de5c0","./assets/loreEndgame-W1ERmrlH.js":"1ce05ad3d70d5c0d","./assets/minigameVisuals-ngxW3VCt.js":"7d5e3cae8ff24195","./assets/onlinePanel-D4jEj7tb.js":"182a42c4328aa33a","./assets/replayEngine-BWXo0EDv.js":"08b113261fe84fce","./assets/runesPanel-DUo-dwCr.js":"8b00e7759d91fc37","./assets/settingsPanel-DnlxCx7a.js":"783de67e262515f0","./assets/skyforceScreen-C4gPx7vJ.js":"10062232f707e800","./assets/survivorScreen-DnnTjkKe.js":"2ce1c8d662d5286b","./manifest.webmanifest":"8258f510b24b8304","./splash/splash.webp":"c7869ea0dc5570dc","./assets/ui/app-title.webp":"fae1e6fbef6635ba","./assets/sprites/enemies/limo.webp":"19a22df42bd0262e","./assets/sprites/enemies/limo_venenoso.webp":"75b6403291a72dee","./assets/sprites/enemies/duende.webp":"1ef4bd27ff4b4ab6","./assets/sprites/enemies/duende_bruto.webp":"f171aa798e00844c","./assets/sprites/enemies/lobo.webp":"86c4c6c0d8b173f5","./assets/sprites/enemies/frog_idle.webp":"a0e1cae0d4e5d5eb","./assets/sprites/enemies/lobo_alfa.webp":"b942b97cfbcd1616","./assets/sprites/enemies/besouro_espinhos.webp":"3ee7f8788bf2cff9","./assets/sprites/enemies/atirador.webp":"6bced3b92c44914a","./assets/sprites/enemies/xama.webp":"b454802b969eb3e9","./assets/sprites/enemies/silfide_polen.webp":"d96f75ee3d67e78f","./assets/sprites/enemies/limo_prismatico.webp":"8a80aad033e08d58","./assets/sprites/enemies/besouro_ametista.webp":"6085c7c0c591bfc3","./assets/sprites/enemies/javali_albino.webp":"c2445bac36feb117","./assets/sprites/enemies/lobo_lunar.webp":"60bbcb1d8e64d63a","./assets/sprites/enemies/silfide_outonal.webp":"3b221c5a094bfffd","./assets/sprites/enemies/guardiao.webp":"5d4bb38afc2e7d76","./assets/sprites/authored/guardian-pilot.png":"31990faf6e4f7ae6","./assets/sprites/authored/archer.png":"82f7cce29d4e1a06","./assets/sprites/authored/mystic.png":"a0604875c250541f","./assets/sprites/authored/saint.png":"69007b98a006c8de","./assets/sprites/authored/assassin.png":"d63c31511d322ede","./assets/sprites/authored/gunslinger.png":"d7532b5f29ba9a7c","./assets/sprites/authored/druid.png":"d450c7a2d8f398ff","./assets/sprites/authored/guardian-female.png":"1cec1b728b9909c1","./assets/sprites/authored/archer-male.png":"9e72a915237e736a","./assets/sprites/authored/mystic-female.png":"37744e8a6fd3c315","./assets/sprites/authored/saint-male.png":"8c01ac71764dca1e","./assets/sprites/authored/assassin-female.png":"e540f677c6427b5b","./assets/sprites/authored/gunslinger-female.png":"9de62eb6444d2129","./assets/sprites/authored/druid-male.png":"ea84e021e069f6af","./assets/sprites/environment/authored/idle-act1-verdant.webp":"47a6fe87d6c76f2a","./assets/sprites/environment/authored/seamless/act1-ground.webp":"1933ddd7565bdba8"};

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
