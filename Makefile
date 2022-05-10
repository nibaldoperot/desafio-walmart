# database
sleep-10:
	sleep 10
clone-db:
	git clone https://github.com/walmartdigital/products-db.git db-products-walmart
up-db:
	cd db-products-walmart && sudo make database-up
database-down:
	docker rm -f mongodb-local
set-db: clone-db up-db sleep-10


#docker
#docker-build:
#	sudo docker build -t desafio-walmart .
#docker-up:
#	sudo docker run -p 4000:3000  desafio-walmart
#
#docker-start: docker-build docker-up


#start node project
npm-start:
	npm run install && npm run start


#start db and project
start: set-db && npm-start
