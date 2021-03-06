// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const validateIdplrAccount = require('../allNeed/validateIdplrAccount');
const fkill = (...args) =>
    import ('fkill').then(({ default: fetch }) => fetch(...args));
// eslint-disable-next-line no-unused-vars
var CronJob = require('cron').CronJob;

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        var job = new CronJob('0 0,6,12,18,24,30,36,42,48,54 * * * *', async function() {
            try {
                await fkill("chrome.exe", { signoreCase: true, true: true, force: true });
                sleep(10000)
            } catch (error) {
                console.log({ error });
            }

            const email = await context.app.service('idplr-account').find({
                query: {
                    isValidate: false,
                    isCreated: true,
                    $limit: 4,
                }
            });
            if (email.data && email.data.length > 0) {
                validateIdplrAccount(email.data, context.app);
            }

        }, null, true, 'America/Los_Angeles');
        job.start();
        context.result = "Service démarré";
        return context;
    };
};