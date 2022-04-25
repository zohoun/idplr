/* eslint-disable linebreak-style */
/* eslint-disable no-empty */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
var shell = require('shelljs');
const randomUseragent = require('random-useragent');

// const output = execSync(`tmac -n Ethernet -m ${randomMac} -re`, { encoding: 'utf-8' }); // the default is 'buffer'
// console.log('Output was:\n', output, randomMac);
const genUsername = require('unique-username-generator');
var generator = require('secure-random-password');
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
// var objShell = new ActiveXObject("Shell.Application");
module.exports = async function validateIdplrAccount(accounts, app) {
  if (accounts && accounts.length > 0) {
    try {
      let browsers = [];
      await Promise.all(accounts.map(async (element)=>{
        const port = element.port;
        const infoArray = element.fakeEmail.split('@');
        const username = infoArray[0];
        const domaine = infoArray[1];
        console.log( element.fakeEmail);
        const userAgent = '--user-agent='+randomUseragent.getRandom(function (ua) {
          return ua.browserName === 'Chrome' && parseFloat(ua.browserVersion) >=100;
        });
        const browser = await puppeteer.launch({
          headless: false,
          // slowMo: 100,
          defaultViewport: null,
          ignoreHTTPSErrors: true,
          args: [
            '--start-maximized',
            '--no-sandbox', '--disable-dev-shm-usage', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials',
            '--proxy-server=socks5://127.0.0.1:' + port
          ]
        });
        browsers.push(browser);
        sleep(15000);
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://generator.email/');
        await page.bringToFront();
        await page.waitForSelector('#userName');
        await page.$eval('#userName', (el,username) => el.value = username, username);
        await page.type('#userName', ' ');
        await page.$eval('#domainName2', (el,domaine) => {el.value = domaine; el.onchange();}, domaine);
        await page.click('#refresh > button');
        await page.waitForSelector('#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > p:nth-child(4) > a');
        const url = await page.$eval('#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > p:nth-child(6)', (el) => {return el.innerText;});
        console.log({url});
        // await page.goto('https://www.idplr.com/members/signup/f1?em=DQGHbO1nszlrD0dHRI4c'); 
        const page2 = await browser.newPage();
        await page2.goto(url);
        
        await page2.waitFor(30 * 1000);
        // wait for new page to open
        await page2.goto(url);
        await page2.waitForSelector('#name_f');
        let pseudo = genUsername.generateUsername('', 3);
        pseudo = username.replace(/-/mg,'');
        let firstName = genUsername.generateUsername();
        firstName=firstName.replace(/-/mg,'');
        let lastName = genUsername.generateUsername();
        lastName = lastName.replace(/-/mg,'');
        var password = generator.randomPassword({length: 12, characters: [{ characters: generator.upper, length: 4},{ characters: generator.digits, length: 2 }, {characters:generator.lower, length: 4} ] });

        await page2.type('#name_f', firstName);
        await page2.type('#name_l', lastName);
        await page2.type('#login-0', pseudo);
        await page2.type('#pass-0', password);
        await page2.type('#pass-confirm', password);
        sleep(2000);
        await page2.click('#_qf_page-2_next-0');
        await page2.waitForSelector('body > div.am-layout.am-common > div.am-body > div > div.am-body-content > div.am-body-content-content > div.am-receipt > div > table > thead > tr');
        element.isValidate = true;
        element.firstName = firstName;
        element.lastName = lastName;
        element.userName = pseudo;
        element.password = password;
        await app.service('idplr-account').patch(element._id, element);
        
      }));
      for (let i = 0; i < browsers.length; i++) {
        const browser = browsers[i];
        await browser.close();
      }
      await app.service('lunch-creation-pending-account').find();
      
    } catch (error) {
      console.log(error);
    }
  }

};