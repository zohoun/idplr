

// Initializes the `createEmailGenereOnSiteWebTempMail` service on path `/create-email-genere-on-site-web-temp-mail`
const { CreateEmailGenereOnSiteWebTempMail } = require('./create-email-genere-on-site-web-temp-mail.class');
const hooks = require('./create-email-genere-on-site-web-temp-mail.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/create-email-genere-on-site-web-temp-mail', new CreateEmailGenereOnSiteWebTempMail(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('create-email-genere-on-site-web-temp-mail');

  service.hooks(hooks);
  
};
