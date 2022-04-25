const emailGenerator = require('./email-generator/email-generator.service.js');
const idplrAccount = require('./idplr-account/idplr-account.service.js');
const createEmailGenereOnSiteWebTempMail = require('./create-email-genere-on-site-web-temp-mail/create-email-genere-on-site-web-temp-mail.service.js');
const lunchCreationPendingAccount = require('./lunch-creation-pending-account/lunch-creation-pending-account.service.js');
const validateIdplrAccount = require('./validate-idplr-account/validate-idplr-account.service.js');
const demarrejobcreationFakeEmail = require('./demarrejobcreation-fake-email/demarrejobcreation-fake-email.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(emailGenerator);
  app.configure(idplrAccount);
  app.configure(createEmailGenereOnSiteWebTempMail);
  app.configure(lunchCreationPendingAccount);
  app.configure(validateIdplrAccount);
  app.configure(demarrejobcreationFakeEmail);
};
