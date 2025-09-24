#!/bin/bash
echo "� Fazendo backup..."
cp -r src/ src_backup/ 2>/dev/null || true

echo "� Copiando assets importantes..."
cp -r src/assets/* public/assets/ 2>/dev/null || true
mkdir -p app/ 2>/dev/null || true
cp src/index.css app/globals.css 2>/dev/null || true

echo "�️ Removendo estrutura antiga..."
rm -rf src/
rm -f public/index.html
rm -f public/manifest.json

echo "✅ Limpeza concluída! Teste com: npm run dev"
