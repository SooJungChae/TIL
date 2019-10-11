### 1. Build ###
FROM node:10.16.3 AS build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
# Expose all Node.js binaries to PATH env variables
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install --silent --no-doc --no-ri
RUN npm install react-scripts@3.0.1 -g --silent --no-doc --no-ri
# Copy all sources
COPY . .
RUN npm run build


### 2. Production ###
# Run the app with web server
FROM nginx:1.13.12-alpine
# Copy all build directory to Nginx directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
# Start server that not run as a daemon
CMD ["nginx", "-g", "daemon off;"]

