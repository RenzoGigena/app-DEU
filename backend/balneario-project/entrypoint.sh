#!/bin/sh

echo "📦 Esperando a que Postgres esté disponible..."

until nc -z postgres 5432; do
  sleep 2
done

echo "🚀 Aplicando migraciones..."
npx prisma migrate deploy

if [ ! -f /app/.seeded ]; then
  echo "🌱 Ejecutando seed..."
  npm run seed && touch /app/.seeded
else
  echo "✅ Seed ya ejecutado anteriormente."
fi

echo "🏁 Iniciando servidor..."
npm run start
echo "Servidor iniciado en el puerto 3001."
