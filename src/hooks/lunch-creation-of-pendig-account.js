// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const lunchBrowserAndCreateAccount = require('../allNeed/lunchBrowserAndCreateAccount');
// eslint-disable-next-line no-unused-vars
var CronJob = require('cron').CronJob;
const fkill = (...args)=> import ('fkill').then(({default:fetch})=>fetch(...args));
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
module.exports = (options = {}) => {
  return async context => {
    var job = new CronJob('0 0,7,14,21,28,35,42,49 * * * *', async function() {
      try {
      await fkill('chromium.exe',{silent: true})
      sleep(50000)
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
      } catch (error) {
        console.log({error});
      }
    }, null, true, 'America/Los_Angeles');
    job.start();
    context.result = 'Processus lancé';
    return context;
  };
};
