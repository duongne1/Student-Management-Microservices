FROM node:20-alpine


WORKDIR /the/workdir/path

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon


COPY . .


RUN chmod -R 755 /the/workdir/path

EXPOSE 3004

CMD ["nodemon", "index.js"]



