

const createEmailGenereOnSiteWebTempMail = require('../../hooks/create-email-genere-on-site-web-temp-mail');

module.exports = {
  before: {
    all: [],
    find: [createEmailGenereOnSiteWebTempMail()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
