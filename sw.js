// Service worker do Mini Guild Idle (PWA): deixa o jogo 100% jogável offline.
// A lista de precache e a versão são injetadas pelo pós-build
// (scripts/generate-sw-precache.mjs) — em dev ficam vazias e o SW vira um
// cache-first simples.
const VERSION = '66f34c7d944e';
const PRECACHE = ["./analytics.html","./assets/analytics-BEaFIBXk.css","./assets/analytics-csTGgIFH.js","./assets/cartridge-brawler-DY7mTXHv.png","./assets/cartridge-gambit-Ds27hpRy.png","./assets/cartridge-survivors-C_av6Llg.png","./assets/editor-sprites-BGH1-mUq.css","./assets/editor-sprites-DmOp0RuR.js","./assets/guild-geometric-pattern-Ds5e8zpa.png","./assets/guild-window-frame-DpQG313x.png","./assets/i18n-DrTbYYcl.js","./assets/index-fT_ykUQ7.css","./assets/index-tP99TiDK.js","./assets/inter-latin-Dx4kXJAl.woff2","./assets/rajdhani-500-ByNUCHrt.woff2","./assets/rajdhani-600-CXCVEoA9.woff2","./assets/rajdhani-700-BPDUZo87.woff2","./assets/sprites/skills/arqueira/arqueira_atk.png","./assets/sprites/skills/arqueira/arqueira_barrage.png","./assets/sprites/skills/arqueira/arqueira_crit.png","./assets/sprites/skills/arqueira/arqueira_deathrain.png","./assets/sprites/skills/arqueira/arqueira_fast.png","./assets/sprites/skills/arqueira/arqueira_hp.png","./assets/sprites/skills/arqueira/arqueira_hunt.png","./assets/sprites/skills/arqueira/arqueira_pierce.png","./assets/sprites/skills/arqueira/arqueira_precision.png","./assets/sprites/skills/arqueira/arqueira_rain.png","./assets/sprites/skills/arqueira/arqueira_rapid.png","./assets/sprites/skills/arqueira/arqueira_wild.png","./assets/sprites/skills/assassino/assassino_atk.png","./assets/sprites/skills/assassino/assassino_crit.png","./assets/sprites/skills/assassino/assassino_darkcut.png","./assets/sprites/skills/assassino/assassino_execute.png","./assets/sprites/skills/assassino/assassino_fast.png","./assets/sprites/skills/assassino/assassino_flurry.png","./assets/sprites/skills/assassino/assassino_hp.png","./assets/sprites/skills/assassino/assassino_instinct.png","./assets/sprites/skills/assassino/assassino_killer.png","./assets/sprites/skills/assassino/assassino_reflex.png","./assets/sprites/skills/assassino/assassino_shadow.png","./assets/sprites/skills/assassino/assassino_stab.png","./assets/sprites/skills/druida/druida_atk.png","./assets/sprites/skills/druida/druida_casca.png","./assets/sprites/skills/druida/druida_ciclo.png","./assets/sprites/skills/druida/druida_dominio.png","./assets/sprites/skills/druida/druida_espirito.png","./assets/sprites/skills/druida/druida_estouro.png","./assets/sprites/skills/druida/druida_fast.png","./assets/sprites/skills/druida/druida_hp.png","./assets/sprites/skills/druida/druida_raizes.png","./assets/sprites/skills/druida/druida_simbiose.png","./assets/sprites/skills/druida/druida_tempestade.png","./assets/sprites/skills/druida/druida_vigor.png","./assets/sprites/skills/guardiao/guardiao_aegis.png","./assets/sprites/skills/guardiao/guardiao_atk.png","./assets/sprites/skills/guardiao/guardiao_bastion.png","./assets/sprites/skills/guardiao/guardiao_bulwark.png","./assets/sprites/skills/guardiao/guardiao_charge.png","./assets/sprites/skills/guardiao/guardiao_def.png","./assets/sprites/skills/guardiao/guardiao_fast.png","./assets/sprites/skills/guardiao/guardiao_hp.png","./assets/sprites/skills/guardiao/guardiao_iron_heart.png","./assets/sprites/skills/guardiao/guardiao_last_stand.png","./assets/sprites/skills/guardiao/guardiao_seismic.png","./assets/sprites/skills/guardiao/guardiao_vigor.png","./assets/sprites/skills/mistico/mistico_atk.png","./assets/sprites/skills/mistico/mistico_caustic.png","./assets/sprites/skills/mistico/mistico_clarity.png","./assets/sprites/skills/mistico/mistico_crit.png","./assets/sprites/skills/mistico/mistico_def.png","./assets/sprites/skills/mistico/mistico_fast.png","./assets/sprites/skills/mistico/mistico_flow.png","./assets/sprites/skills/mistico/mistico_focus.png","./assets/sprites/skills/mistico/mistico_mastery.png","./assets/sprites/skills/mistico/mistico_mend.png","./assets/sprites/skills/mistico/mistico_orb.png","./assets/sprites/skills/mistico/mistico_rift.png","./assets/sprites/skills/pistoleiro/pistoleiro_ammo.png","./assets/sprites/skills/pistoleiro/pistoleiro_atk.png","./assets/sprites/skills/pistoleiro/pistoleiro_barrage.png","./assets/sprites/skills/pistoleiro/pistoleiro_cadence.png","./assets/sprites/skills/pistoleiro/pistoleiro_crit.png","./assets/sprites/skills/pistoleiro/pistoleiro_deadeye.png","./assets/sprites/skills/pistoleiro/pistoleiro_double.png","./assets/sprites/skills/pistoleiro/pistoleiro_fast.png","./assets/sprites/skills/pistoleiro/pistoleiro_ghost.png","./assets/sprites/skills/pistoleiro/pistoleiro_hp.png","./assets/sprites/skills/pistoleiro/pistoleiro_reflex.png","./assets/sprites/skills/pistoleiro/pistoleiro_shot.png","./assets/sprites/skills/santa/santa_atk.png","./assets/sprites/skills/santa/santa_blessing.png","./assets/sprites/skills/santa/santa_communion.png","./assets/sprites/skills/santa/santa_def.png","./assets/sprites/skills/santa/santa_devotion.png","./assets/sprites/skills/santa/santa_fast.png","./assets/sprites/skills/santa/santa_heal.png","./assets/sprites/skills/santa/santa_hp.png","./assets/sprites/skills/santa/santa_judgment.png","./assets/sprites/skills/santa/santa_miracle.png","./assets/sprites/skills/santa/santa_smite.png","./assets/sprites/skills/santa/santa_ward.png","./assets/sprites/stamps/st_alvo.png","./assets/sprites/stamps/st_bau.png","./assets/sprites/stamps/st_coracao.png","./assets/sprites/stamps/st_cubo.png","./assets/sprites/stamps/st_escudo.png","./assets/sprites/stamps/st_espada.png","./assets/sprites/stamps/st_estrela.png","./assets/sprites/stamps/st_livro.png","./assets/sprites/stamps/st_lua.png","./assets/sprites/stamps/st_moeda.png","./assets/sprites/stamps/st_relampago.png","./assets/sprites/stamps/st_veneno.png","./assets/sprites/ui/badges/card-evolution-crystal.png","./assets/sprites/ui/badges/perfect-item-emblem.png","./assets/sprites/ui/crafting/forge-recipe-book.png","./assets/sprites/ui/element_caos.png","./assets/sprites/ui/element_fisico.png","./assets/sprites/ui/element_fogo.png","./assets/sprites/ui/element_gelo.png","./assets/sprites/ui/element_raio.png","./assets/sprites/ui/empty-legacy.png","./assets/sprites/ui/resource_essence.png","./assets/sprites/ui/resource_gold.png","./assets/sprites/ui/stat_attack.png","./assets/sprites/ui/stat_attack_speed.png","./assets/sprites/ui/stat_crit.png","./assets/sprites/ui/stat_defense.png","./assets/sprites/ui/stat_health.png","./assets/sprites/ui/stat_range.png","./assets/sprites/ui/stat_shield.png","./assets/sprites/ui/stat_speed.png","./assets/sprites/ui/stat_xp.png","./assets/sprites/ui/status_bleed.png","./assets/sprites/ui/status_chill.png","./assets/sprites/ui/status_ignite.png","./assets/sprites/ui/status_shock.png","./assets/sprites/ui/symbols/artifact_comet.png","./assets/sprites/ui/symbols/artifact_hourglass.png","./assets/sprites/ui/symbols/artifact_infinity.png","./assets/sprites/ui/symbols/artifact_mirror.png","./assets/sprites/ui/symbols/artifact_phoenix.png","./assets/sprites/ui/symbols/artifact_spectral.png","./assets/sprites/ui/symbols/artifact_storm.png","./assets/sprites/ui/symbols/artifact_urn.png","./assets/sprites/ui/symbols/combat_bow.png","./assets/sprites/ui/symbols/combat_chaos.png","./assets/sprites/ui/symbols/combat_fire.png","./assets/sprites/ui/symbols/combat_ice.png","./assets/sprites/ui/symbols/combat_lightning.png","./assets/sprites/ui/symbols/combat_magic.png","./assets/sprites/ui/symbols/combat_shield.png","./assets/sprites/ui/symbols/combat_sword.png","./assets/sprites/ui/symbols/control_boot.png","./assets/sprites/ui/symbols/control_down.png","./assets/sprites/ui/symbols/control_flag.png","./assets/sprites/ui/symbols/control_left.png","./assets/sprites/ui/symbols/control_menu.png","./assets/sprites/ui/symbols/control_right.png","./assets/sprites/ui/symbols/control_save.png","./assets/sprites/ui/symbols/control_up.png","./assets/sprites/ui/symbols/creature_bat.png","./assets/sprites/ui/symbols/creature_blood.png","./assets/sprites/ui/symbols/creature_boar.png","./assets/sprites/ui/symbols/creature_demon.png","./assets/sprites/ui/symbols/creature_dragon.png","./assets/sprites/ui/symbols/creature_frog.png","./assets/sprites/ui/symbols/creature_ghost.png","./assets/sprites/ui/symbols/creature_goblin.png","./assets/sprites/ui/symbols/creature_lizard.png","./assets/sprites/ui/symbols/creature_orc.png","./assets/sprites/ui/symbols/creature_owl.png","./assets/sprites/ui/symbols/creature_rat.png","./assets/sprites/ui/symbols/creature_skeleton.png","./assets/sprites/ui/symbols/creature_slime.png","./assets/sprites/ui/symbols/creature_wolf.png","./assets/sprites/ui/symbols/creature_zombie.png","./assets/sprites/ui/symbols/nature_flower.png","./assets/sprites/ui/symbols/nature_herb.png","./assets/sprites/ui/symbols/nature_leaf.png","./assets/sprites/ui/symbols/nature_mountain.png","./assets/sprites/ui/symbols/nature_mushroom.png","./assets/sprites/ui/symbols/nature_pine.png","./assets/sprites/ui/symbols/nature_tree.png","./assets/sprites/ui/symbols/nature_volcano.png","./assets/sprites/ui/symbols/nav_base.png","./assets/sprites/ui/symbols/nav_goals.png","./assets/sprites/ui/symbols/nav_guild.png","./assets/sprites/ui/symbols/nav_heroes.png","./assets/sprites/ui/symbols/nav_map.png","./assets/sprites/ui/symbols/nav_pets.png","./assets/sprites/ui/symbols/nav_runes.png","./assets/sprites/ui/symbols/nav_settings.png","./assets/sprites/ui/symbols/place_arena.png","./assets/sprites/ui/symbols/place_bank.png","./assets/sprites/ui/symbols/place_castle.png","./assets/sprites/ui/symbols/place_factory.png","./assets/sprites/ui/symbols/place_idol.png","./assets/sprites/ui/symbols/place_shrine.png","./assets/sprites/ui/symbols/place_temple.png","./assets/sprites/ui/symbols/place_workshop.png","./assets/sprites/ui/symbols/progress_bestiary.png","./assets/sprites/ui/symbols/progress_crown.png","./assets/sprites/ui/symbols/progress_daily.png","./assets/sprites/ui/symbols/progress_medal.png","./assets/sprites/ui/symbols/progress_quest.png","./assets/sprites/ui/symbols/progress_retire.png","./assets/sprites/ui/symbols/progress_trophy.png","./assets/sprites/ui/symbols/progress_weekly.png","./assets/sprites/ui/symbols/resource_essence_alt.png","./assets/sprites/ui/symbols/resource_fragment.png","./assets/sprites/ui/symbols/resource_gem.png","./assets/sprites/ui/symbols/resource_gold_alt.png","./assets/sprites/ui/symbols/resource_pet_seal.png","./assets/sprites/ui/symbols/resource_sheltom.png","./assets/sprites/ui/symbols/resource_soul.png","./assets/sprites/ui/symbols/resource_xp.png","./assets/sprites/ui/symbols/social_bell.png","./assets/sprites/ui/symbols/social_bones.png","./assets/sprites/ui/symbols/social_eye.png","./assets/sprites/ui/symbols/social_handshake.png","./assets/sprites/ui/symbols/social_monster.png","./assets/sprites/ui/symbols/social_party.png","./assets/sprites/ui/symbols/social_robot.png","./assets/sprites/ui/symbols/social_skull.png","./assets/sprites/ui/symbols/stat_attack_alt.png","./assets/sprites/ui/symbols/stat_crit_alt.png","./assets/sprites/ui/symbols/stat_defense_alt.png","./assets/sprites/ui/symbols/stat_dps.png","./assets/sprites/ui/symbols/stat_heal.png","./assets/sprites/ui/symbols/stat_health_alt.png","./assets/sprites/ui/symbols/stat_range_alt.png","./assets/sprites/ui/symbols/stat_speed_alt.png","./assets/sprites/ui/symbols/state_failure.png","./assets/sprites/ui/symbols/state_hourglass.png","./assets/sprites/ui/symbols/state_location.png","./assets/sprites/ui/symbols/state_lock.png","./assets/sprites/ui/symbols/state_search.png","./assets/sprites/ui/symbols/state_success.png","./assets/sprites/ui/symbols/state_unlock.png","./assets/sprites/ui/symbols/state_warning.png","./assets/sprites/ui/symbols/system_aging_alt.png","./assets/sprites/ui/symbols/system_alchemy_alt.png","./assets/sprites/ui/symbols/system_chest.png","./assets/sprites/ui/symbols/system_cube.png","./assets/sprites/ui/symbols/system_forge_alt.png","./assets/sprites/ui/symbols/system_inventory.png","./assets/sprites/ui/symbols/system_recipes.png","./assets/sprites/ui/symbols/system_synthesis.png","./assets/sprites/ui/symbols/utility_bond.png","./assets/sprites/ui/symbols/utility_broken.png","./assets/sprites/ui/symbols/utility_gift.png","./assets/sprites/ui/symbols/utility_loot.png","./assets/sprites/ui/symbols/utility_maturing.png","./assets/sprites/ui/symbols/utility_palette.png","./assets/sprites/ui/symbols/utility_paw.png","./assets/sprites/ui/symbols/utility_recycle.png","./assets/sprites/ui/symbols/world_crescent.png","./assets/sprites/ui/symbols/world_mist.png","./assets/sprites/ui/symbols/world_moon.png","./assets/sprites/ui/symbols/world_rainbow.png","./assets/sprites/ui/symbols/world_stars.png","./assets/sprites/ui/symbols/world_sun.png","./assets/sprites/ui/symbols/world_water.png","./assets/sprites/ui/symbols/world_web.png","./assets/sprites/ui/system_aging.png","./assets/sprites/ui/system_alchemy.png","./assets/sprites/ui/system_forge.png","./assets/sprites/ui/system_runes.png","./assets/sprites/ui/system_socket.png","./assets/sprites/ui/village/alchemy.png","./assets/sprites/ui/village/cards.png","./assets/sprites/ui/village/gold.png","./assets/sprites/ui/village/guild.png","./assets/sprites/ui/village/knowledge.png","./assets/sprites/ui/village/luck.png","./assets/sprites/ui/village/mail.png","./assets/sprites/ui/village/mine.png","./assets/sprites/ui/village/objectives.png","./assets/sprites/ui/village/parcel.png","./assets/sprites/ui/village/pets.png","./assets/sprites/ui/village/runes.png","./assets/sprites/ui/village/stamp.png","./assets/sprites/ui/village/ticket.png","./assets/sprites/ui/village/village.png","./assets/sprites/ui/village/workshop.png","./assets/sprites/vfx/hero-revive.png","./assets/ui/app-title.png","./assets/ui/buttons/btn_collapse.png","./assets/ui/buttons/btn_expand.png","./assets/ui/buttons/btn_pause.png","./assets/ui/buttons/btn_play.png","./assets/ui/shell/guild-geometric-pattern.png","./assets/ui/shell/guild-window-frame.png","./assets/ui/ui_wood_texture.png","./assets/uniques-CyNm3xyt.js","./editor-sprites.html","./icon-192.png","./icon-256.png","./icon-512.png","./manifest.webmanifest","./splash/splash-ipad-pro.png","./splash/splash-ipad.png","./splash/splash-iphone-12-13-pro-max.png","./splash/splash-iphone-12-13.png","./splash/splash-iphone-6-7-8.png","./splash/splash-iphone-se.png","./splash/splash-iphone-x.png","./splash/splash-iphone-xs-max.png","./splash/splash.png"];

const CACHE = `mgi-${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(async (cache) => {
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
        await cache.addAll(codeAssets);
        // Sprites/imagens/áudio: melhor esforço — um asset com falha não pode
        // derrubar a instalação inteira (isso deixava o jogo sem NENHUM
        // suporte offline); o fetch handler preenche o que faltar nas
        // próximas sessões online.
        await Promise.allSettled(PRECACHE.filter((url) => !isCode(url)).map((url) => cache.add(url)));
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

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const assetPath = new URL(req.url).pathname;
  const liveArt = /\/assets\/(portraits\/mentors|sprites\/npcs|scenes\/village-day)/.test(assetPath);

  // Arte autoral iterada com nome estável: rede primeiro impede que um cache
  // antigo esconda NPCs/retratos novos depois de um deploy web.
  if (liveArt) {
    event.respondWith(fetch(req).then((res) => {
      if (res.ok) caches.open(CACHE).then((cache) => cache.put(req, res.clone()));
      return res;
    }).catch(() => caches.match(req)));
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
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ??
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
    )
  );
});
