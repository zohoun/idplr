const assert = require('assert');
const app = require('../../src/app');

describe('\'EmailGenerator\' service', () => {
  it('registered the service', () => {
    const service = app.service('email-generator');

    assert.ok(service, 'Registered the service');
  });
});
