// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const lunchBrowserAndCreateAccount = require('../allNeed/lunchBrowserAndCreateAccount');
const fkill = (...args) => import('fkill').then(({default: fetch}) => fetch(...args));
// eslint-disable-next-line no-unused-vars
var CronJob = require('cron').CronJob;
 
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
      currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
module.exports = (options = {}) => {
  return async context => {

    var job = new CronJob('0 0,8,16,24,32,40,48 * * * *', async function() {
      try {
        await fkill("chrome.exe",{signoreCase: true, true: true, force : true});
        sleep(10000)
      } catch (error) {
        console.log({error});
      }
      
      const account = await context.app.service('idplr-account').find({
        query: {
          isCreated: false,
          isRefused: false,
          $limit: 6,
        }
      });
      if (account.data && account.data.length > 0) {
        lunchBrowserAndCreateAccount(account.data, context.app);
      }
      
    }, null, true, 'America/Los_Angeles');
    job.start();
    context.result = "Service démarré";
    return context;
  };
};
