FROM node:10.19.0
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
#COPY package*.json ./
COPY package*.json ./usr/src/app/
# Install dependencies
RUN npm install
# Copy app source code
COPY . .
# Expose port and start application
EXPOSE 3000

CMD ["npm", "start"]
