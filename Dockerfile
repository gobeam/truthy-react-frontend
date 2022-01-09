FROM node:14 as build-deps

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build


FROM nginx:1.21-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]