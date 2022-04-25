const assert = require('assert');
const app = require('../../src/app');

describe('\'ValidateIdplrAccount\' service', () => {
  it('registered the service', () => {
    const service = app.service('validate-idplr-account');

    assert.ok(service, 'Registered the service');
  });
});
