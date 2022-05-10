const fkill = (...args) => import('fkill').then(({default: fetch}) => fetch(...args));
const puppeteer = require('puppeteer-extra');
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
      currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
(async()=>{
  let browser = await puppeteer.launch({
  headless: false,
  slowMo: 80,
  defaultViewport: null,
  ignoreHTTPSErrors: true
});

sleep(15000);
let page = await browser.newPage();
await Promise.all([
  page.goto('https://www.idplr.com/members/aff/go/zohoun'),
  page.waitForNavigation({waitUntil: 'networkidle2'})
]);
try {
  await fkill("chrome.exe",{signoreCase: true, true: true, force : true});
} catch (error) {
  console.log({error});
}

sleep(15000);
browser = await puppeteer.launch({
  headless: false,
  slowMo: 80,
  defaultViewport: null,
  ignoreHTTPSErrors: true
});

sleep(15000);
page = await browser.newPage();
await Promise.all([
  page.goto('https://www.idplr.com/members/aff/go/zohoun'),
  page.waitForNavigation({waitUntil: 'networkidle2'})
]);
})()
