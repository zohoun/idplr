// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var CronJob = require('cron').CronJob;
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    var job = new CronJob('0,15,30,45 * * * * *', function() {
      console.log('You will see this message every second');
      context.app.service('create-email-genere-on-site-web-temp-mail').find();
    }, null, true, 'America/Los_Angeles');
    job.start();
    return context;
  };
};
