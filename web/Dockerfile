FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install --force && \
    npm run build

FROM nginx:alpine
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html/
COPY --chown=root:root ./default.conf /etc/nginx/conf.d
