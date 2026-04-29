FROM nginx:alpine
# Özel konfigürasyonu kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Kodları kopyala
COPY . /usr/share/nginx/html
EXPOSE 80
