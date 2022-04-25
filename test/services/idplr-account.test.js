const assert = require('assert');
const app = require('../../src/app');

describe('\'idplrAccount\' service', () => {
  it('registered the service', () => {
    const service = app.service('idplr-account');

    assert.ok(service, 'Registered the service');
  });
});
