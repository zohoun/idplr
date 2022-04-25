// Initializes the `demarrejobcreationFakeEmail` service on path `/demarrejobcreation-fake-email`
const { DemarrejobcreationFakeEmail } = require('./demarrejobcreation-fake-email.class');
const hooks = require('./demarrejobcreation-fake-email.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/demarrejobcreation-fake-email', new DemarrejobcreationFakeEmail(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('demarrejobcreation-fake-email');

  service.hooks(hooks);
};
