FROM node:10.19.0
# Create app directory
WORKDIR /usr/src/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Copy production env file
COPY ./config/production/.env ./
# Bundle app source
COPY . .
# Install app dependencies
#RUN npm install -g nodemon
RUN npm install
EXPOSE 5000
CMD [ "npm", "run", "server" ]
