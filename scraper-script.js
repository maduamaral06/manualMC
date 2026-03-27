const { waitForDebugger } = require('inspector');
const puppeteer = require('puppeteer');

//const LAST_URL_PATH = path.join(__dirname, '../res/last-datasheet-url.json');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/opt/chrome/chrome', // caminho do Chrome no container
    headless: true,           // testa com true
    args: ['--no-sandbox'],
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

  await page.goto('https://www.intelbras.com/pt-br/software-de-seguranca-eletronica-defense-ia-lite', {
    waitUntil: 'networkidle2',  // espera carregar rede quase ociosa
    timeout: 60000
  });

  console.log(' Aguardando o botão de download da ficha técnica aparecer...');
  try {
    await page.waitForSelector('a[data-ga-action="download-especificacoes-tecnicas"]', { timeout: 45000 });

    const pdfURL = await page.evaluate(() => {
      const link = document.querySelector('a[data-ga-action="download-especificacoes-tecnicas"]');
      return link ? link.href : null;
    });

    if (pdfURL) {
      const fs = require('fs');
      // const path = require('path');
      // const outputPath = path.resolve(__dirname, 'res/pdf-link.json');
      try {
        fs.writeFileSync("/usr/src/app/res/pdf-link.json", JSON.stringify({ datasheetURL: pdfURL }, null, 2), { flag: 'w' });
        if (pdfURL.startsWith('http:')) {
          const secureURL = pdfURL.replace(/^http:/, 'https:');
          fs.writeFileSync("/usr/src/app/res/pdf-link.json", JSON.stringify({ datasheetURL: secureURL }, null, 2), { flag: 'w' });
          console.log(" URL convertida para HTTPS.");
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(" Arquivo realmente escrito!");
      } catch (err) {
        console.error(" Erro ao gravar o arquivo:", err.message);
      }

      console.log('PDF encontrado e salvo:', pdfURL);
      const written = fs.readFileSync("/usr/src/app/res/pdf-link.json", 'utf8');
      console.log(' Conteúdo gravado:\n', written);
    } else {
      console.error(' Link não encontrado no DOM final.');
    }
  } catch (err) {
    console.error(' Timeout ao esperar o seletor:', err.message);
    await page.screenshot({ path: 'debug-timeout.png', fullPage: true });
    const html = await page.content();
    require('fs').writeFileSync('debug-timeout.html', html);
  }

  await browser.close();
})();
