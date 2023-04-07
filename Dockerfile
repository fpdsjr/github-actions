FROM node:18.12-bullseye-slim

ARG NEXT_PUBLIC_API_URL=https://open-api.tvnsports.com.br/api/v1
ARG NEXT_PUBLIC_CURRENT_DOMAIN=https://canalvoleibrasil.cbv.com.br
ARG NEXT_PUBLIC_BASE_URL=https://canalvoleibrasil.cbv.com.br

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_CURRENT_DOMAIN=$NEXT_PUBLIC_CURRENT_DOMAIN
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]