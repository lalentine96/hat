From node:14

WORKDIR /usr/src/app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
RUN groupadd -g 666 satan && useradd -r -u 666 -g satan satan
USER satan

CMD ["serve", "-s", "build"]
