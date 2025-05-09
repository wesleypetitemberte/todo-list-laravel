# Use uma imagem base do Node.js
FROM node:16-alpine

# Defina o diretório de trabalho no container
WORKDIR /var/www/html

# Copie os arquivos do projeto para o container
COPY . .

# Instale as dependências do projeto
RUN npm install

# Exponha a porta que o servidor usará
EXPOSE 5442

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]

