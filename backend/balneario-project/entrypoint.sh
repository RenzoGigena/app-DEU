#!/bin/sh

echo "📦 Esperando a que Postgres esté disponible..."

until nc -z postgres 5432; do
  sleep 2
done

echo "🚀 Aplicando migraciones..."
npx prisma migrate deploy

if [ "$SEED_ENABLED" = "true" ]; then
  echo "🌱 Ejecutando seed..."
  npm run seed
else
  echo "✅ Seed desactivado por configuración."
fi


echo "🏁 Iniciando servidor..."
npm run start
echo "Servidor iniciado en el puerto 3001."
