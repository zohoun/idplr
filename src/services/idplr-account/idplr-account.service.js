// Initializes the `idplrAccount` service on path `/idplr-account`
const { IdplrAccount } = require('./idplr-account.class');
const createModel = require('../../models/idplr-account.model');
const hooks = require('./idplr-account.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/idplr-account', new IdplrAccount(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('idplr-account');

  service.hooks(hooks);
};
