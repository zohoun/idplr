const assert = require('assert');
const app = require('../../src/app');

describe('\'lunchCreationPendingAccount\' service', () => {
  it('registered the service', () => {
    const service = app.service('lunch-creation-pending-account');

    assert.ok(service, 'Registered the service');
  });
});
