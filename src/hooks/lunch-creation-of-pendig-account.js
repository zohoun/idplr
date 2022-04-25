// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const lunchBrowserAndCreateAccount = require('../allNeed/lunchBrowserAndCreateAccount');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const account = await context.app.service('idplr-account').find({
      query: {
        isCreated: false,
        isRefused: false,
        $limit: 6,
      }
    });
    let message = '';
    if (account.data && account.data.length > 0) {
      lunchBrowserAndCreateAccount(account.data, context.app);
      message = 'Processus lancé avec succès';
    }
    message = message == '' ? 'Aucun compe en attente' : message;
    context.result = message;
    return context;
  };
};
