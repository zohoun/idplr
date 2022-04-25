const assert = require('assert');
const app = require('../../src/app');

describe('\'demarrejobcreationFakeEmail\' service', () => {
  it('registered the service', () => {
    const service = app.service('demarrejobcreation-fake-email');

    assert.ok(service, 'Registered the service');
  });
});
