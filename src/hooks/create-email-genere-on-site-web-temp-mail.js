// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const createEmailOnTempEmailSiteEweb = require('../allNeed/createEmailOnTempEmailSiteEweb');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const email = await context.app.service('email-generator').find({
      query: {
        isValidate: false
      }
    });
    console.log({ email });
    let message = '';
    if (email.data && email.data.length > 0) {
      createEmailOnTempEmailSiteEweb(email.data, context.app);
      message = 'Processus lancé avec succès';
    }
    message = message == '' ? 'Aucun compe en attente' : message;
    context.result = message;
    return context;
  };
};
