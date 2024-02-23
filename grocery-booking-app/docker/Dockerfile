FROM node:alpine as development


WORKDIR /home/user/


COPY grocery-booking-app/*.json ./

COPY grocery-booking-app/config/nginx.conf ./

RUN npm install


COPY grocery-booking-app/src/ ./src/


FROM nginx:alpine as prod


RUN rm -rf /usr/share/nginx/html/*

RUN npm run build

COPY --from=development /home/user/dist/grocery-booking-app/browser /usr/share/nginx/html


COPY grocery-booking-app/config/nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]