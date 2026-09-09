// Service worker do Mini Guild Idle (PWA): deixa o jogo 100% jogável offline.
// A lista de precache e a versão são injetadas pelo pós-build
// (scripts/generate-sw-precache.mjs) — em dev ficam vazias e o SW vira um
// cache-first simples.
const VERSION = '2641ac92bf23';
const PRECACHE = ["./analytics.html","./assets/adventurePanel-D01g48Ib.js","./assets/adventureText-D7ihf6uU.js","./assets/alchemistScreen-D1XWSm2H.js","./assets/analytics-BEaFIBXk.css","./assets/analytics-Bkh_PfYP.js","./assets/balancePanel-DFCN1Spd.js","./assets/bestiaryBook-CTaBdKZj.js","./assets/brawlerScreen-B0koAjer.js","./assets/competitiveLauncherDeckImpl-srERFlQ1.js","./assets/competitiveLauncherDefenseImpl-DnQu1Xo2.js","./assets/competitiveLauncherDelveImpl-CF6zwjZc.js","./assets/competitiveLauncherImpl-DMlmQCbU.js","./assets/competitiveLauncherSurvivorImpl-BUEdW3_C.js","./assets/craftPanel-Dn63cwlh.js","./assets/deckScreen-R4MagQSC.js","./assets/defenseScreen-D3OUz71E.js","./assets/delveScreen-Ck8jmRHw.js","./assets/enData-DrLO8wPj.js","./assets/endgamePanel-DpbQG1nl.js","./assets/fonts/inter-latin.woff2","./assets/fonts/rajdhani-500.woff2","./assets/fonts/rajdhani-600.woff2","./assets/fonts/rajdhani-700.woff2","./assets/gloryReformUi-CODsn_hW.js","./assets/grimoirePanel-vzJHV6Jq.js","./assets/guildHousePanel-CrUQyPGm.js","./assets/i18n-D86KEj2N.js","./assets/index-C3E_smzQ.css","./assets/index-CI8akn5Q.js","./assets/loreEndgame-W1ERmrlH.js","./assets/minigameVisuals-ngxW3VCt.js","./assets/onlinePanel-D8R10Wun.js","./assets/replayEngine-CcrDQNaq.js","./assets/runesPanel-DwQnQbpF.js","./assets/settingsPanel-rlv0qi0w.js","./assets/skyforceScreen-DI_eZ7s5.js","./assets/survivorScreen-DuB5zyM_.js","./manifest.webmanifest","./splash/splash.webp","./assets/ui/app-title.webp","./assets/sprites/enemies/limo.webp","./assets/sprites/enemies/limo_venenoso.webp","./assets/sprites/enemies/duende.webp","./assets/sprites/enemies/duende_bruto.webp","./assets/sprites/enemies/lobo.webp","./assets/sprites/enemies/frog_idle.webp","./assets/sprites/enemies/lobo_alfa.webp","./assets/sprites/enemies/besouro_espinhos.webp","./assets/sprites/enemies/atirador.webp","./assets/sprites/enemies/xama.webp","./assets/sprites/enemies/silfide_polen.webp","./assets/sprites/enemies/limo_prismatico.webp","./assets/sprites/enemies/besouro_ametista.webp","./assets/sprites/enemies/javali_albino.webp","./assets/sprites/enemies/lobo_lunar.webp","./assets/sprites/enemies/silfide_outonal.webp","./assets/sprites/enemies/guardiao.webp","./assets/sprites/authored/guardian-pilot.png","./assets/sprites/authored/archer.png","./assets/sprites/authored/mystic.png","./assets/sprites/authored/saint.png","./assets/sprites/authored/assassin.png","./assets/sprites/authored/gunslinger.png","./assets/sprites/authored/druid.png","./assets/sprites/authored/guardian-female.png","./assets/sprites/authored/archer-male.png","./assets/sprites/authored/mystic-female.png","./assets/sprites/authored/saint-male.png","./assets/sprites/authored/assassin-female.png","./assets/sprites/authored/gunslinger-female.png","./assets/sprites/authored/druid-male.png","./assets/sprites/environment/authored/idle-act1-verdant.webp","./assets/sprites/environment/authored/seamless/act1-ground.webp"];
const ASSET_HASHES = {"./analytics.html":"5f88a95bf3909e28","./assets/adventurePanel-D01g48Ib.js":"f0df57929de0b2ee","./assets/adventureText-D7ihf6uU.js":"e31efc19754c4a7a","./assets/alchemistScreen-D1XWSm2H.js":"7e8a887a27aa09d0","./assets/analytics-BEaFIBXk.css":"acd0a1d160327b1d","./assets/analytics-Bkh_PfYP.js":"6ecb2d13015012bc","./assets/balancePanel-DFCN1Spd.js":"64851d8a72a0dfd6","./assets/bestiaryBook-CTaBdKZj.js":"506ec6b7ca12a9c8","./assets/brawlerScreen-B0koAjer.js":"78cc1756c954be7d","./assets/competitiveLauncherDeckImpl-srERFlQ1.js":"95801c9a5f27ca11","./assets/competitiveLauncherDefenseImpl-DnQu1Xo2.js":"89fdb6aed4a424ec","./assets/competitiveLauncherDelveImpl-CF6zwjZc.js":"adc6c35da1fadf2a","./assets/competitiveLauncherImpl-DMlmQCbU.js":"1f000278d1f2ab99","./assets/competitiveLauncherSurvivorImpl-BUEdW3_C.js":"09b76826e0638ffa","./assets/craftPanel-Dn63cwlh.js":"daaa3784b23f7e63","./assets/deckScreen-R4MagQSC.js":"3e3426f111f621d1","./assets/defenseScreen-D3OUz71E.js":"8399d6e8d245b04a","./assets/delveScreen-Ck8jmRHw.js":"a12fede4dc561f6a","./assets/enData-DrLO8wPj.js":"087bc23c3050a0af","./assets/endgamePanel-DpbQG1nl.js":"56a6677f91a8ce52","./assets/fonts/inter-latin.woff2":"3100e775e8616cd2","./assets/fonts/rajdhani-500.woff2":"23afdb9b5b89b878","./assets/fonts/rajdhani-600.woff2":"433a7007e4747a02","./assets/fonts/rajdhani-700.woff2":"5b7e4a6f97163c26","./assets/gloryReformUi-CODsn_hW.js":"0949987e32b6010f","./assets/grimoirePanel-vzJHV6Jq.js":"8c07c25dcbbf80de","./assets/guildHousePanel-CrUQyPGm.js":"cf04be0e55dcde99","./assets/i18n-D86KEj2N.js":"be3601c14be2142c","./assets/index-C3E_smzQ.css":"a6c99bdbce2deb55","./assets/index-CI8akn5Q.js":"3beb2c1bcc836a27","./assets/loreEndgame-W1ERmrlH.js":"1ce05ad3d70d5c0d","./assets/minigameVisuals-ngxW3VCt.js":"7d5e3cae8ff24195","./assets/onlinePanel-D8R10Wun.js":"35b1e9669c5dafda","./assets/replayEngine-CcrDQNaq.js":"4e7142cfaa66a7c8","./assets/runesPanel-DwQnQbpF.js":"b9d4fb0e1af89299","./assets/settingsPanel-rlv0qi0w.js":"449f75ccb8428b9e","./assets/skyforceScreen-DI_eZ7s5.js":"607c761e21691a0a","./assets/survivorScreen-DuB5zyM_.js":"04666f575050ac3d","./manifest.webmanifest":"8258f510b24b8304","./splash/splash.webp":"c7869ea0dc5570dc","./assets/ui/app-title.webp":"fae1e6fbef6635ba","./assets/sprites/enemies/limo.webp":"19a22df42bd0262e","./assets/sprites/enemies/limo_venenoso.webp":"75b6403291a72dee","./assets/sprites/enemies/duende.webp":"1ef4bd27ff4b4ab6","./assets/sprites/enemies/duende_bruto.webp":"f171aa798e00844c","./assets/sprites/enemies/lobo.webp":"86c4c6c0d8b173f5","./assets/sprites/enemies/frog_idle.webp":"a0e1cae0d4e5d5eb","./assets/sprites/enemies/lobo_alfa.webp":"b942b97cfbcd1616","./assets/sprites/enemies/besouro_espinhos.webp":"3ee7f8788bf2cff9","./assets/sprites/enemies/atirador.webp":"6bced3b92c44914a","./assets/sprites/enemies/xama.webp":"b454802b969eb3e9","./assets/sprites/enemies/silfide_polen.webp":"d96f75ee3d67e78f","./assets/sprites/enemies/limo_prismatico.webp":"8a80aad033e08d58","./assets/sprites/enemies/besouro_ametista.webp":"6085c7c0c591bfc3","./assets/sprites/enemies/javali_albino.webp":"c2445bac36feb117","./assets/sprites/enemies/lobo_lunar.webp":"60bbcb1d8e64d63a","./assets/sprites/enemies/silfide_outonal.webp":"3b221c5a094bfffd","./assets/sprites/enemies/guardiao.webp":"5d4bb38afc2e7d76","./assets/sprites/authored/guardian-pilot.png":"31990faf6e4f7ae6","./assets/sprites/authored/archer.png":"82f7cce29d4e1a06","./assets/sprites/authored/mystic.png":"a0604875c250541f","./assets/sprites/authored/saint.png":"69007b98a006c8de","./assets/sprites/authored/assassin.png":"d63c31511d322ede","./assets/sprites/authored/gunslinger.png":"d7532b5f29ba9a7c","./assets/sprites/authored/druid.png":"d450c7a2d8f398ff","./assets/sprites/authored/guardian-female.png":"1cec1b728b9909c1","./assets/sprites/authored/archer-male.png":"9e72a915237e736a","./assets/sprites/authored/mystic-female.png":"37744e8a6fd3c315","./assets/sprites/authored/saint-male.png":"8c01ac71764dca1e","./assets/sprites/authored/assassin-female.png":"e540f677c6427b5b","./assets/sprites/authored/gunslinger-female.png":"9de62eb6444d2129","./assets/sprites/authored/druid-male.png":"ea84e021e069f6af","./assets/sprites/environment/authored/idle-act1-verdant.webp":"47a6fe87d6c76f2a","./assets/sprites/environment/authored/seamless/act1-ground.webp":"1933ddd7565bdba8"};

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
