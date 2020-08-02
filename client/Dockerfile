# get the base node image
FROM node:alpine as builder

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
RUN npm install -g react-scripts

# Copy .env file
COPY .env ./.env

COPY package*.json ./

# Install dependencies
RUN npm install
# Copy app source code
COPY . .
# Expose port and start application
#EXPOSE 3000

#CMD ["npm", "start"]

# build the folder
RUN npm run build

# Handle Nginx
FROM nginx
#COPY --from=builder /usr/src/app /usr/share/nginx/html
COPY --from=builder /usr/src/app /var/www/myapp
COPY ./docker/nginx/site.conf /etc/nginx/conf.d/default.conf

