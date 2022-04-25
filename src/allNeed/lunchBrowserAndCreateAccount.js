/* eslint-disable linebreak-style */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const randomUseragent = require('random-useragent');
// var randomMac = require('random-mac');
// const output = execSync(`tmac -n Ethernet -m ${randomMac} -re`, { encoding: 'utf-8' }); // the default is 'buffer'
// console.log('Output was:\n', output, randomMac);
// var objShell = new ActiveXObject("Shell.Application");
// bjShell.ShellExecute("cmd.exe", "cd C: C:\\cd c:\\ext_file main.exe test.txt", "C:\\WINDOWS\\system32", "open", 1);
// objShell.ShellExecute("cmd.exe", `C: tmac -n Ethernet -m ${randomMac} -re`, "C: \\WINDOWS\\ system32 ", "open ", "1");

// var cmd = require('node-cmd');
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const arrayPosition = ['--window-position=000,000', '--window-position=360,000', '--window-position=720,000', '--window-position=000,500', '--window-position=360,500', '--window-position=720,500'];
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: '92f2f86ffc226783191508dc6f26fdb9' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);
module.exports = async function lunchBrowserAndCreateAccount(accounts, app) {
  if (accounts && accounts.length > 0) {
    try {
      const lastPort = 9709;
      const listAccount = await app.service('idplr-account').find({
        query: {
          isCreated: true,
          $limit: 1,
          $sort: {
            port: -1
          }
        }
      });
      let browsers = [];
      let nbReussi = 0;
      await Promise.all(accounts.map(async (element, index) => {
        const port = listAccount.data.length > 0 ? parseFloat(listAccount.data[0].port) + index + 1 : 9216 + index + 1;
        console.log({port});
        if (port <= lastPort) {
          const userAgent = '--user-agent='+randomUseragent.getRandom(function (ua) {
            return ua.browserName === 'Chrome' && parseFloat(ua.browserVersion) >=100;
          });
          // '--proxy-server=socks5://127.0.0.1:' + port
          const browser = await puppeteer.launch({
            headless: false,
            slowMo: 150,
            defaultViewport: null,
            ignoreHTTPSErrors: true,
            args: [
              '--start-maximized',
              '--no-sandbox', '--disable-features=IsolateOrigins', userAgent,' --disable-site-isolation-trials',
              '--proxy-server=socks5://127.0.0.1:' + port
            ]
            ,executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
          });
          browsers.push(browser);
          sleep(15000);
          const page = await browser.newPage();
          await page.setDefaultNavigationTimeout(0);
          await page.goto('https://www.idplr.com/members/aff/go/zohoun');
          try {

            await page.bringToFront();
            await page.waitForSelector('#sp-menu > div > nav > ul > li:nth-child(6) > a');
            await page.click('#sp-menu > div > nav > ul > li:nth-child(6) > a');
            await page.waitForSelector('#sppb-addon-1606480018648 > div > h1');
            await page.click('#sppb-addon-1557072176682 > div > div > ul > li:nth-child(2)');
            sleep(1000);
            const yourHref = await page.$eval('#btn-1557072087425', anchor => anchor.getAttribute('href'));
            // await page.click('#btn-1557072087425');
            await page.waitFor(3 * 1000);  // wait for new page to open
            // const pages = await browser.pages();  // get all pages
            
            // const page2 = pages[pages.length - 1];
            const page2 =await browser.newPage();
            //Randomize viewport size
            // await page2.setViewport({
            //   // width: 1920 + Math.floor(Math.random() * 100),
            //   // height: 3000 + Math.floor(Math.random() * 100),
            //   deviceScaleFactor: 1,
            //   hasTouch: false,
            //   isLandscape: false,
            //   isMobile: false,
            // });
            await page2.setJavaScriptEnabled(true);
            await page2.setDefaultNavigationTimeout(0);
    
            //Skip images/styles/fonts loading for performance
            await page2.setRequestInterception(true);
            page2.on('request', (req) => {
              if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
                req.abort();
              } else {
                req.continue();
              }
            });
    
            await page2.evaluateOnNewDocument(() => {
              // Pass webdriver check
              Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
              });
            });

            await page2.evaluateOnNewDocument(() => {
              // Pass chrome check
              window.chrome = {
                runtime: {},
                // etc.
              };
            });
  
            await page2.evaluateOnNewDocument(() => {
              //Pass notifications check
              const originalQuery = window.navigator.permissions.query;
              return window.navigator.permissions.query = (parameters) => (
                parameters.name === 'notifications' ?
                  Promise.resolve({ state: Notification.permission }) :
                  originalQuery(parameters)
              );
            });
  
            await page2.evaluateOnNewDocument(() => {
              // Overwrite the `plugins` property to use a custom getter.
              Object.defineProperty(navigator, 'plugins', {
                // This just needs to have `length > 0` for the current test,
                // but we could mock the plugins too if necessary.
                get: () => [1, 2, 3, 4, 5],
              });
            });
  
            await page2.evaluateOnNewDocument(() => {
              // Overwrite the `languages` property to use a custom getter.
              Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
              });
            });
            await page2.setDefaultNavigationTimeout(0);
            await page2.goto(yourHref, { waitUntil: 'networkidle2',timeout: 0 } );
            await page2.waitForSelector('#email-0');
            await page2.type('#email-0', element.fakeEmail);
            await page2.type('#email-confirm', element.fakeEmail);

            sleep(15000);
            try {
              let frames = await page2.frames();
              const recaptchaFrame = frames.find(frame => frame.url().includes('api2/anchor'));

              const exist = await recaptchaFrame.$('#recaptcha-anchor', () => true).catch(() => false);
              console.log({ exist });
              if (exist) {
                await page2.solveRecaptchas();
                await Promise.all([
                  page2.click('#_qf_page-0_next-0'),
                  page2.waitForNavigation({waitUntil: 'networkidle2'})
              ]);
                sleep(15000);
                const exists = await page2.$eval('body > div.am-layout.am-common > div.am-body > div > div.am-body-content > div.am-body-content-content > div > div.am-info.am-login-text', () => true).catch(() => false);
                if (!exists) {
                  console.log({ exists });
                  element.port = port;
                  element.isCreated = true;
                  await app.service('idplr-account').patch(element._id, element);
                  nbReussi = nbReussi + 1;
                }
              }

              return true;
            } catch (error) {
              return false;
            }


          } catch (error) {
            element.isRefused = true;
            console.log(error);
            // await app.service('idplr-account').patch(element._id, element);

            // await browser.close()
          }
        } else {
        }
      }));
      sleep(100000);
      for (let i = 0; i < browsers.length; i++) {
        const browser = browsers[i];
        await browser.close();
      }
      
      if (nbReussi > 0) {
        await app.service('validate-idplr-account').find();
      }
      else{
        await app.service('lunch-creation-pending-account').find();
      }
      

    } catch (error) {
      console.log(error);
    }
  }

};