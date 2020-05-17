FROM node:12

WORKDIR /usr/src/app

ENV port 8080
ENV HOST 0.0.0.0

COPY package.json ./

RUN npm install --only=production

# Copy local nuxt code to the container
COPY . .

# Build production app
RUN npm run buils

# Start the service
CMD npm start