#!/bin/bash
echo "í´„ Fazendo backup..."
cp -r src/ src_backup/ 2>/dev/null || true

echo "í³¦ Copiando assets importantes..."
cp -r src/assets/* public/assets/ 2>/dev/null || true
mkdir -p app/ 2>/dev/null || true
cp src/index.css app/globals.css 2>/dev/null || true

echo "í·‘ï¸ Removendo estrutura antiga..."
rm -rf src/
rm -f public/index.html
rm -f public/manifest.json

echo "âœ… Limpeza concluÃ­da! Teste com: npm run dev"
