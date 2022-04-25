

const lunchCreationOfPendigAccount = require('../../hooks/lunch-creation-of-pendig-account');

module.exports = {
  before: {
    all: [],
    find: [lunchCreationOfPendigAccount()],
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
