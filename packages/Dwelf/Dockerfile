FROM node:14.14.0-alpine as common-build-stage

COPY . ./app

WORKDIR /app

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN echo @edge http://nl.alpinelinux.org/alpine/v3.8/community >> /etc/apk/repositories && \
  echo @v3.8 http://nl.alpinelinux.org/alpine/v3.8/main >> /etc/apk/repositories && \
  apk add --update --no-cache \
  chromium@v3.8 \
  nss@v3.8 \
  python3 python3-dev musl-dev libffi-dev openssl-dev make gcc py3-pip openssh-client \
  dumb-init curl make gcc g++ python linux-headers binutils-gold gnupg libstdc++

RUN npm install

EXPOSE 3333

COPY ./init.sh /init.sh

RUN chmod +x /init.sh

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

ENTRYPOINT ["/init.sh"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]