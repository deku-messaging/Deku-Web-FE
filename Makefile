all: config build

config:
	@echo "[!] Creating env configs"
	@${PWD}/scripts/create_env.sh
	@echo "[!] Configs created edit them to suit your needs, then build and deploy"

build:
	@echo "[!] Creating production build ..."
	yarn install
	yarn build

deploy:
	@echo "[!] Deploying built app ..."
	@cp -r build/. /var/www/html/

image: config
	@echo "[!] Creating docker image ..."
	@docker build -t deku-web-fe --target development .

container:
	@echo "[!] Starting docker container"
	@docker run -itd --name deku-web-fe -p 4001:80 -p 4000:443 deku-web-fe 
	