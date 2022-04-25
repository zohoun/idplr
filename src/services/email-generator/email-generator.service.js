// Initializes the `EmailGenerator` service on path `/email-generator`
const { EmailGenerator } = require('./email-generator.class');
const createModel = require('../../models/email-generator.model');
const hooks = require('./email-generator.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/email-generator', new EmailGenerator(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('email-generator');

  service.hooks(hooks);
};
