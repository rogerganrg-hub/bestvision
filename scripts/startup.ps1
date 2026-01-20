# - - - - - - - - - - -
# startup for environment build
#- - - - - - - - - - -

# launch infra（docker/compose）
cd D:\bestvision\infra
docker compose up -d
docker ps
# launch api dev
cd D:\bestvision
pnpm -w run dev:api
# launch all dev
cd D:\bestvision
pnpm -w run dev
# stutdown infra
cd D:\bestvision\infra
docker compose down
