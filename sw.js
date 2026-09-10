// Service worker do Mini Guild Idle (PWA): deixa o jogo 100% jogável offline.
// A lista de precache e a versão são injetadas pelo pós-build
// (scripts/generate-sw-precache.mjs) — em dev ficam vazias e o SW vira um
// cache-first simples.
const VERSION = 'bd0c1e1a6afc';
const PRECACHE = ["./analytics.html","./assets/adventurePanel-B7sV33IV.js","./assets/adventureText-COkJgNnp.js","./assets/alchemistScreen-Bw-f94nu.js","./assets/analytics-BEaFIBXk.css","./assets/analytics-BRMTCXiR.js","./assets/balancePanel-BLAw_5al.js","./assets/bestiaryBook-J23b5TwZ.js","./assets/brawlerScreen-DPECBqgV.js","./assets/competitiveLauncherDeckImpl-6KPyT0EI.js","./assets/competitiveLauncherDefenseImpl-CE4qMB0x.js","./assets/competitiveLauncherDelveImpl-BUONQyVX.js","./assets/competitiveLauncherImpl-BGAgncRx.js","./assets/competitiveLauncherSurvivorImpl-kPTK10fw.js","./assets/craftPanel-y0RfAr0J.js","./assets/deckScreen-DIIdFQzq.js","./assets/defenseScreen-Xoa_6Kr2.js","./assets/delveScreen-CaDswAPi.js","./assets/enData-laM-ohDw.js","./assets/endgamePanel-ClIZJNm9.js","./assets/fonts/inter-latin.woff2","./assets/fonts/rajdhani-500.woff2","./assets/fonts/rajdhani-600.woff2","./assets/fonts/rajdhani-700.woff2","./assets/gloryReformUi-lBQtrOWz.js","./assets/grimoirePanel-AEAdOcA8.js","./assets/guildHousePanel-C3vjcPv5.js","./assets/i18n-DeRzxtgT.js","./assets/index-C9ydZUWb.css","./assets/index-CoPnoCl1.js","./assets/loreEndgame-W1ERmrlH.js","./assets/minigameVisuals-ngxW3VCt.js","./assets/onlinePanel-BH9ndRXu.js","./assets/replayEngine-DwxYkzed.js","./assets/runesPanel-BzLDHUHq.js","./assets/settingsPanel-CZVCHUEx.js","./assets/skyforceScreen-DajMD9eY.js","./assets/survivorScreen-D3KncOQ3.js","./manifest.webmanifest","./splash/splash.webp","./assets/ui/app-title.webp","./assets/sprites/enemies/limo.webp","./assets/sprites/enemies/limo_venenoso.webp","./assets/sprites/enemies/duende.webp","./assets/sprites/enemies/duende_bruto.webp","./assets/sprites/enemies/lobo.webp","./assets/sprites/enemies/frog_idle.webp","./assets/sprites/enemies/lobo_alfa.webp","./assets/sprites/enemies/besouro_espinhos.webp","./assets/sprites/enemies/atirador.webp","./assets/sprites/enemies/xama.webp","./assets/sprites/enemies/silfide_polen.webp","./assets/sprites/enemies/limo_prismatico.webp","./assets/sprites/enemies/besouro_ametista.webp","./assets/sprites/enemies/javali_albino.webp","./assets/sprites/enemies/lobo_lunar.webp","./assets/sprites/enemies/silfide_outonal.webp","./assets/sprites/enemies/guardiao.webp","./assets/sprites/authored/guardian-pilot.png","./assets/sprites/authored/archer.png","./assets/sprites/authored/mystic.png","./assets/sprites/authored/saint.png","./assets/sprites/authored/assassin.png","./assets/sprites/authored/gunslinger.png","./assets/sprites/authored/druid.png","./assets/sprites/authored/guardian-female.png","./assets/sprites/authored/archer-male.png","./assets/sprites/authored/mystic-female.png","./assets/sprites/authored/saint-male.png","./assets/sprites/authored/assassin-female.png","./assets/sprites/authored/gunslinger-female.png","./assets/sprites/authored/druid-male.png","./assets/sprites/environment/authored/idle-act1-verdant.webp","./assets/sprites/environment/authored/seamless/act1-ground.webp"];
const ASSET_HASHES = {"./analytics.html":"887fdd519f286677","./assets/adventurePanel-B7sV33IV.js":"a018b2e713166b4e","./assets/adventureText-COkJgNnp.js":"6a748f0acd2c491c","./assets/alchemistScreen-Bw-f94nu.js":"e7c00e96a7fff9f8","./assets/analytics-BEaFIBXk.css":"acd0a1d160327b1d","./assets/analytics-BRMTCXiR.js":"2370f9c50110e726","./assets/balancePanel-BLAw_5al.js":"6f7a54e30f9c9f73","./assets/bestiaryBook-J23b5TwZ.js":"3bde82c7158fd7db","./assets/brawlerScreen-DPECBqgV.js":"1ffbc122950ccf74","./assets/competitiveLauncherDeckImpl-6KPyT0EI.js":"b97b7c8f79a838cd","./assets/competitiveLauncherDefenseImpl-CE4qMB0x.js":"266e8fef5e96768f","./assets/competitiveLauncherDelveImpl-BUONQyVX.js":"199b90c4284986d3","./assets/competitiveLauncherImpl-BGAgncRx.js":"02e48dcac42a9f7e","./assets/competitiveLauncherSurvivorImpl-kPTK10fw.js":"b100995cf245a489","./assets/craftPanel-y0RfAr0J.js":"7c86300ae4303129","./assets/deckScreen-DIIdFQzq.js":"127b81ca15b6f2eb","./assets/defenseScreen-Xoa_6Kr2.js":"4a899d71d0848077","./assets/delveScreen-CaDswAPi.js":"25166d55132ca7cb","./assets/enData-laM-ohDw.js":"062f3db01b7b248f","./assets/endgamePanel-ClIZJNm9.js":"e9c52e00eae7c981","./assets/fonts/inter-latin.woff2":"3100e775e8616cd2","./assets/fonts/rajdhani-500.woff2":"23afdb9b5b89b878","./assets/fonts/rajdhani-600.woff2":"433a7007e4747a02","./assets/fonts/rajdhani-700.woff2":"5b7e4a6f97163c26","./assets/gloryReformUi-lBQtrOWz.js":"2a6679b60ecc2e09","./assets/grimoirePanel-AEAdOcA8.js":"32e6d0b062d8f278","./assets/guildHousePanel-C3vjcPv5.js":"2265e59ad26e0eb0","./assets/i18n-DeRzxtgT.js":"56742eec8d30c357","./assets/index-C9ydZUWb.css":"5d6bc4f39810c3ec","./assets/index-CoPnoCl1.js":"bf1a6876a255a619","./assets/loreEndgame-W1ERmrlH.js":"1ce05ad3d70d5c0d","./assets/minigameVisuals-ngxW3VCt.js":"7d5e3cae8ff24195","./assets/onlinePanel-BH9ndRXu.js":"1e91ff79820adba5","./assets/replayEngine-DwxYkzed.js":"cc9f83da0e69e26e","./assets/runesPanel-BzLDHUHq.js":"ef9eff69ea5f051b","./assets/settingsPanel-CZVCHUEx.js":"2a1fb25e82df70c3","./assets/skyforceScreen-DajMD9eY.js":"08fadb31b401294d","./assets/survivorScreen-D3KncOQ3.js":"2a45128b1d8e192a","./manifest.webmanifest":"8258f510b24b8304","./splash/splash.webp":"c7869ea0dc5570dc","./assets/ui/app-title.webp":"fae1e6fbef6635ba","./assets/sprites/enemies/limo.webp":"19a22df42bd0262e","./assets/sprites/enemies/limo_venenoso.webp":"75b6403291a72dee","./assets/sprites/enemies/duende.webp":"1ef4bd27ff4b4ab6","./assets/sprites/enemies/duende_bruto.webp":"f171aa798e00844c","./assets/sprites/enemies/lobo.webp":"86c4c6c0d8b173f5","./assets/sprites/enemies/frog_idle.webp":"a0e1cae0d4e5d5eb","./assets/sprites/enemies/lobo_alfa.webp":"b942b97cfbcd1616","./assets/sprites/enemies/besouro_espinhos.webp":"3ee7f8788bf2cff9","./assets/sprites/enemies/atirador.webp":"6bced3b92c44914a","./assets/sprites/enemies/xama.webp":"b454802b969eb3e9","./assets/sprites/enemies/silfide_polen.webp":"d96f75ee3d67e78f","./assets/sprites/enemies/limo_prismatico.webp":"8a80aad033e08d58","./assets/sprites/enemies/besouro_ametista.webp":"6085c7c0c591bfc3","./assets/sprites/enemies/javali_albino.webp":"c2445bac36feb117","./assets/sprites/enemies/lobo_lunar.webp":"60bbcb1d8e64d63a","./assets/sprites/enemies/silfide_outonal.webp":"3b221c5a094bfffd","./assets/sprites/enemies/guardiao.webp":"5d4bb38afc2e7d76","./assets/sprites/authored/guardian-pilot.png":"31990faf6e4f7ae6","./assets/sprites/authored/archer.png":"82f7cce29d4e1a06","./assets/sprites/authored/mystic.png":"a0604875c250541f","./assets/sprites/authored/saint.png":"69007b98a006c8de","./assets/sprites/authored/assassin.png":"d63c31511d322ede","./assets/sprites/authored/gunslinger.png":"d7532b5f29ba9a7c","./assets/sprites/authored/druid.png":"d450c7a2d8f398ff","./assets/sprites/authored/guardian-female.png":"1cec1b728b9909c1","./assets/sprites/authored/archer-male.png":"9e72a915237e736a","./assets/sprites/authored/mystic-female.png":"37744e8a6fd3c315","./assets/sprites/authored/saint-male.png":"8c01ac71764dca1e","./assets/sprites/authored/assassin-female.png":"e540f677c6427b5b","./assets/sprites/authored/gunslinger-female.png":"9de62eb6444d2129","./assets/sprites/authored/druid-male.png":"ea84e021e069f6af","./assets/sprites/environment/authored/idle-act1-verdant.webp":"47a6fe87d6c76f2a","./assets/sprites/environment/authored/seamless/act1-ground.webp":"1933ddd7565bdba8"};

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
