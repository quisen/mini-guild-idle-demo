# Sprites

Esta pasta guarda os sprites finais consumidos pelo jogo. Os heróis são gerados
automaticamente a partir de camadas LPC.

## Gerar

```bash
npm run sprites:all
```

Saidas principais:

- `heroes/{guardiao,arqueira,mistico}.png` — heróis LPC (com rosto/cabelo/armas)
- `enemies/{duende,atirador,xama,lobo,guardiao}.png` — inimigos LPC recoloridos
- `enemies/limo.png` — slime procedural
- `items/*.png` — ícones pixel-art 24x24 de itens (inventário/paper-doll)

Os scripts ficam em `scripts/generate-lpc-sprites.mjs` (LPC + limo) e
`scripts/generate-item-icons.mjs` (ícones). O compositor LPC usa `LPC_ROOT` se a
variavel existir, ou baixa/cacheia o repositorio LPC em `.asset-cache/`.

## Creditos e licencas

Os assets LPC têm licencas mistas por camada. Mantenha:

- `LPC-CREDITS.txt`, com a lista resumida de camadas usadas.
- `third_party/lpc-generator/CREDITS.csv`, com os creditos upstream completos.

Evite remover esses arquivos ao empacotar builds publicos.
