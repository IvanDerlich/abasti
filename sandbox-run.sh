docker rm -f sandbox3000 >/dev/null 2>&1 || true

docker create -it --name sandbox3000 -p 3000:3000 node:20-bullseye bash
docker cp . sandbox3000:/work

docker start sandbox3000
docker exec -it -w /work sandbox3000 bash -lc "npm i && (npm start dev &) && exec bash"

