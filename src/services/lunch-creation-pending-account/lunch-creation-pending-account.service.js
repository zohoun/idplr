// Initializes the `lunchCreationPendingAccount` service on path `/lunch-creation-pending-account`
const { LunchCreationPendingAccount } = require('./lunch-creation-pending-account.class');
const hooks = require('./lunch-creation-pending-account.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/lunch-creation-pending-account', new LunchCreationPendingAccount(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lunch-creation-pending-account');

  service.hooks(hooks);
};
