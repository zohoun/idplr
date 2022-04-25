/* eslint-disable linebreak-style */


const fakeEmailGenerator = require('../../hooks/fake-email-generator');

const scrappeDomain = require('../../hooks/scrappe-domain');

module.exports = {
  before: {
    all: [],
    find: [ ],
    get: [],
    create: [scrappeDomain(), fakeEmailGenerator()],
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
