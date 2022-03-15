# Criando imagen docker pro Backend 
# Copiar imagem node do dockerhub para ter uma base
FROM node 

# Criar pasta dentro do Docker como diretório padrão
WORKDIR /app/backend

# Copiar package.json para o WORKDIR
COPY package.json ./

# Instalar dependências
RUN npm install

# Copia todos os arquivos com exceção dos adicionados 
# no .dockerignore para o  WORKDIR
COPY . .

# Expõe porta 3333
EXPOSE 3333

# Roda npm run dev na máquina do Docker
CMD ["npm", "run", "dev"]
