# Imagem base
FROM node:18

# Criar diretório da aplicação
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código
COPY . .

# Expor porta usada pelo Render
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
