FROM node:20

USER root

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

RUN apt-get update && apt-get install -y \
    wget gnupg ca-certificates fonts-liberation \
    libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdrm2 \
    libgbm1 libgtk-3-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 \
    libxdamage1 libxrandr2 xdg-utils --no-install-recommends \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

  # Instala o Chrome versão 138 (usada pelo Puppeteer v21.x)
RUN wget -q https://storage.googleapis.com/chrome-for-testing-public/138.0.7204.168/linux64/chrome-linux64.zip \
  && unzip chrome-linux64.zip \
  && mv chrome-linux64 /opt/chrome \
  && ln -s /opt/chrome/chrome /usr/bin/google-chrome \
  && rm chrome-linux64.zip

RUN mkdir -p /usr/src/app/res

COPY scraper-script.js ./

CMD ["node", "scraper-script.js"]
