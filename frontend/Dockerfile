FROM nginx:alpine

# Copia seus arquivos (HTML, JS, etc) para o diretório público do NGINX
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
