#включть контейнеры в текущем каталоге (из фаила docker-compose.yml)
docker-up:
	sudo docker compose up -d

#собрать/пересобрать контейнеры в текущем каталоге (из фаила docker-compose.yml)
docker-build:
	sudo docker compose up --build -d

#остановить контейнеры в текущем каталоге (из фаила docker-compose.yml)
docker-down:
	sudo docker compose down

docker-rebuild:
	sudo docker compose up -d --no-deps --build $(name)

#список всех контейнеров
docker-containers-list:
	sudo docker ps -a

docker-start:
	sudo docker compose down
	sudo docker compose up --build -d
	sudo docker exec hismith npm i
	sudo docker exec hismith npm run dev
