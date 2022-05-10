# database
sleep-10:
	sleep 10
clone-db:
	git clone https://github.com/walmartdigital/products-db.git db-products-walmart
up-db:
	cd db-products-walmart && sudo make database-up
database-down:
	docker rm -f mongodb-local
docker-start:
	sudo service docker start
set-db: clone-db up-db sleep-10

#start node project
npm-install-start:
	npm install && npm run start


#start db and project
project-up: set-db npm-install-start
