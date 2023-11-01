FROM node:16.14-alpine
WORKDIR /app-frontend

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]
CMD ["start"]

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações