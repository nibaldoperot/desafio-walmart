FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

RUN apt-get update && apt-get install make

RUN apt-get install ca-certificates curl gnupg lsb-release software-properties-common apt-transport-https -y

RUN  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

RUN echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) eoan stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

RUN apt-get update

RUN apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

RUN apt-get install docker-ce=docker-ce-cli=5:20.10.14~3-0~ubuntu-focal docker-ce-cli=5:20.10.14~3-0~ubuntu-focal containerd.io docker-compose-plugin

RUN docker run hello-world

RUN make database-up

EXPOSE 3000

CMD ["npm", "start"]