# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /app
# Accept API URL from docker-compose
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Stage 2: Nginx runtime
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy React build output
COPY --from=build /app/build ./

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
