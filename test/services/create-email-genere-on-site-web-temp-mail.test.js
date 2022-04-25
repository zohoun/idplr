const assert = require('assert');
const app = require('../../src/app');

describe('\'createEmailGenereOnSiteWebTempMail\' service', () => {
  it('registered the service', () => {
    const service = app.service('create-email-genere-on-site-web-temp-mail');

    assert.ok(service, 'Registered the service');
  });
});
