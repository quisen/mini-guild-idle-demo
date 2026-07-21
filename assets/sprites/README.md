# Sprites

Esta pasta guarda os sprites autorais finais consumidos pelo jogo.

## Gerar

```bash
npm run sprites:all
```

Saídas principais:

- `authored/*.png` — heróis autorais normalizados em folhas 6×4
- `enemies/*.png` — monstros autorais normalizados em folhas 6×4
- `pets/*.png` — pets normais e evoluídos
- `environment/authored/` — fundos, paralaxe, chão e props autorais
- `items/*.png` — ícones pixel-art 24x24 de itens (inventário/paper-doll)

Os normalizadores e validadores ficam em `scripts/`. `npm run sprites:all`
regenera heróis, monstros, pets e itens a partir de `art_sources/`.

O runtime não possui compositor, fallback ou assets LPC.
