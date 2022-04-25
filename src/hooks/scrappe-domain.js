// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    puppeteer.use(pluginStealth());

    const browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=360,500', '--window-position=000,000', '--no-sandbox', '--disable-dev-shm-usage', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials']
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://generator.email/');
    const feedHandle = await page.$('#newselect > div > div ');
    const arr= await feedHandle.$$eval(
      'div',
      nodes => nodes.map(n => n.innerText)
    );
    context.data.domaine = arr;
    return context;
  };
};
