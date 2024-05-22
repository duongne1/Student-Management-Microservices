FROM node:20-alpine


WORKDIR /the/workdir/path

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon


COPY . .


RUN chmod -R 755 /the/workdir/path

EXPOSE 3001

CMD ["nodemon", "index.js"]


# docker build --tag course-docker . 
# docker run -p 3001:3001 -d course-docker
