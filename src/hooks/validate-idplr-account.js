// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const validateIdplrAccount = require('../allNeed/validateIdplrAccount');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const email = await context.app.service('idplr-account').find({
      query: {
        isValidate: false,
        isCreated: true,
        $limit: 6,
      }
    });
    console.log({ email });
    let message = '';
    if (email.data && email.data.length > 0) {
      validateIdplrAccount(email.data, context.app);
      message = 'Processus lancé avec succès';
    }
    message = message == '' ? 'Aucun compe en attente' : message;
    context.result = message;
    return context;
  };
};
