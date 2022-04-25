// Initializes the `ValidateIdplrAccount` service on path `/validate-idplr-account`
const { ValidateIdplrAccount } = require('./validate-idplr-account.class');
const hooks = require('./validate-idplr-account.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/validate-idplr-account', new ValidateIdplrAccount(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('validate-idplr-account');

  service.hooks(hooks);
};
