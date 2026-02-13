FROM node

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

#docker kill $(docker ps -q) && docker build -t three . && docker run -p 5173:5173 three

EXPOSE 5173